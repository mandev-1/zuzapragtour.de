// Article storage — abstracts WHERE journal articles live.
//   Local dev (`netlify dev`, cwd = admin/): read/write the sibling repo's
//     content/journal/*.json directly on disk — so the editor works (and shows
//     migrated drafts) without a GitHub token, and saves land as file edits you
//     commit yourself.
//   Production: read/write via the GitHub Contents API; a commit triggers the
//     public Netlify site to rebuild.
import fs from 'node:fs';
import path from 'node:path';
import { JOURNAL_DIR, listDir, getJson, putJson, deleteFile } from './github.mjs';

const PUBLIC_ROOT = path.resolve(process.cwd(), '../prague-tour-guide');
const LOCAL_DIR = path.join(PUBLIC_ROOT, 'content/journal');
export const isLocal = fs.existsSync(PUBLIC_ROOT);

const localFile = (slug) => path.join(LOCAL_DIR, `${slug}.json`);
const readLocal = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

export async function listArticles() {
  if (isLocal) {
    if (!fs.existsSync(LOCAL_DIR)) return [];
    return fs
      .readdirSync(LOCAL_DIR)
      .filter((f) => f.endsWith('.json'))
      .map((f) => readLocal(path.join(LOCAL_DIR, f)));
  }
  const entries = (await listDir(JOURNAL_DIR)).filter((e) => e.name.endsWith('.json'));
  const out = [];
  for (const e of entries) {
    const g = await getJson(`${JOURNAL_DIR}/${e.name}`);
    if (g && g.json) out.push(g.json);
  }
  return out;
}

export async function getArticle(slug) {
  if (isLocal) {
    const f = localFile(slug);
    return fs.existsSync(f) ? readLocal(f) : null;
  }
  const g = await getJson(`${JOURNAL_DIR}/${slug}.json`);
  return g ? g.json : null;
}

export async function saveArticle(article, originalSlug) {
  if (isLocal) {
    fs.mkdirSync(LOCAL_DIR, { recursive: true });
    fs.writeFileSync(localFile(article.slug), JSON.stringify(article, null, 2) + '\n', 'utf8');
    if (originalSlug && originalSlug !== article.slug && fs.existsSync(localFile(originalSlug))) {
      fs.unlinkSync(localFile(originalSlug));
    }
    return { ok: true, commit: 'local' };
  }
  const p = `${JOURNAL_DIR}/${article.slug}.json`;
  const existing = await getJson(p);
  const res = await putJson(p, article, `journal: ${existing ? 'update' : 'create'} ${article.slug}`, existing ? existing.sha : undefined);
  if (originalSlug && originalSlug !== article.slug) {
    const op = `${JOURNAL_DIR}/${originalSlug}.json`;
    const old = await getJson(op);
    if (old) await deleteFile(op, `journal: rename ${originalSlug} → ${article.slug}`, old.sha);
  }
  return { ok: true, commit: res && res.commit && res.commit.sha };
}

export async function removeArticle(slug) {
  if (isLocal) {
    const f = localFile(slug);
    if (fs.existsSync(f)) fs.unlinkSync(f);
    return { ok: true };
  }
  const op = `${JOURNAL_DIR}/${slug}.json`;
  const old = await getJson(op);
  if (!old) return { ok: true };
  await deleteFile(op, `journal: delete ${slug}`, old.sha);
  return { ok: true };
}
