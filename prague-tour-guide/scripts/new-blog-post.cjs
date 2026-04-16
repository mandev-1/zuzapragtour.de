#!/usr/bin/env node
/**
 * Scaffolds a new bilingual blog post: prepends metadata in blogData.ts and
 * inserts translation keys in blogTranslations.ts (before // Post 14…).
 *
 * Usage:
 *   node scripts/new-blog-post.cjs --slug=my-post --date=2026-04-12 --image=/images/x.jpg \
 *     --title-en="..." --title-de="..." --excerpt-en="..." --excerpt-de="..." \
 *     [--slug-de=mein-beitrag] [--tags="a,b,c"] [--tags-de="..."] [--dry-run]
 *
 * Then: add hero image to public/images, flesh out blog.postN.content in blogTranslations.ts,
 * run npm run build, git commit & push (Netlify deploys from the repo).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BLOG_DATA = path.join(ROOT, 'src', 'utils', 'blogData.ts');
const BLOG_TRANS = path.join(ROOT, 'src', 'utils', 'blogTranslations.ts');

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const eq = a.indexOf('=');
    if (eq !== -1) {
      const k = a.slice(2, eq).replace(/-/g, '');
      out[k] = a.slice(eq + 1);
    } else {
      const k = a.slice(2).replace(/-/g, '');
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        out[k] = next;
        i++;
      } else {
        out[k] = true;
      }
    }
  }
  return out;
}

function nextPostId(src) {
  const ids = [];
  const re = /id:\s*'(\d+)'/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    ids.push(parseInt(m[1], 10));
  }
  if (!ids.length) throw new Error('No id: fields found in blogData.ts');
  return String(Math.max(...ids) + 1);
}

function escapeStr(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function escapeTpl(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function formatDateLabels(iso) {
  const [y, mo, d] = iso.split('-').map(Number);
  if (!y || !mo || !d) throw new Error(`Invalid --date (use YYYY-MM-DD): ${iso}`);
  const utc = Date.UTC(y, mo - 1, d);
  const en = new Date(utc).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
  const de = new Date(utc).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
  return { en, de };
}

function formatTagLines(tags, indent) {
  const pad = ' '.repeat(indent);
  return tags.map((t) => `${pad}'${escapeStr(t)}',`).join('\n');
}

function buildBlogDataBlock(args, id, postKey) {
  const tags = args.tags
    ? args.tags.split(',').map((s) => s.trim()).filter(Boolean)
    : ['Prague travel blog', 'Visit Prague'];
  const tagsDe = args.tagsde
    ? args.tagsde.split(',').map((s) => s.trim()).filter(Boolean)
    : [...tags];

  const slugDeLine = args.slugde
    ? `    slugDe: '${escapeStr(args.slugde)}',\n`
    : '';

  return `  {
    id: '${id}',
    slug: '${escapeStr(args.slug)}',
${slugDeLine}    titleKey: 'blog.${postKey}.title',
    excerptKey: 'blog.${postKey}.excerpt',
    dateKey: 'blog.${postKey}.date',
    date: '${escapeStr(args.date)}',
    image: '${escapeStr(args.image)}',
    contentKey: 'blog.${postKey}.content',
    author: 'Ing. Zuzana Manová',
    tags: [
${formatTagLines(tags, 6)}
    ],
    tagsDe: [
${formatTagLines(tagsDe, 6)}
    ],
    language: 'both',
  },
`;
}

function buildTranslationsBlock(args, postKey, dateEn, dateDe) {
  const ctaEn = `<div class="blog-cta-box">
  <h3>Ready to explore Prague?</h3>
  <p>Draft — replace this paragraph with your closing pitch. Keep or edit the buttons below.</p>
  <div class="cta-buttons">
    <a class="btn btn-primary" href="/book#contact-title">Send enquiry</a>
    <a class="btn btn-outline" href="/contact#contact-title">Ask a question</a>
  </div>
</div>`;
  const ctaDe = `<div class="blog-cta-box">
  <h3>Bereit, Prag zu erkunden?</h3>
  <p>Entwurf — ersetzen Sie diesen Absatz durch Ihren Abschlusstext. Die Buttons unten können Sie anpassen.</p>
  <div class="cta-buttons">
    <a class="btn btn-primary" href="/book#contact-title">Anfrage senden</a>
    <a class="btn btn-outline" href="/contact#contact-title">Frage stellen</a>
  </div>
</div>`;
  const stubEn = `<h2>${escapeTpl(args.titleen)}</h2>
<p class="lead">Draft — replace with your full article HTML in blogTranslations.ts.</p>
${ctaEn}`;
  const stubDe = `<h2>${escapeTpl(args.titlede)}</h2>
<p class="lead">Entwurf — vollständigen Artikel-HTML-Text in blogTranslations.ts einfügen.</p>
${ctaDe}`;

  return `  // Post ${postKey.replace('post', '')} (new)
  'blog.${postKey}.title': {
    en: '${escapeStr(args.titleen)}',
    de: '${escapeStr(args.titlede)}',
  },
  'blog.${postKey}.excerpt': {
    en: '${escapeStr(args.excerpten)}',
    de: '${escapeStr(args.excerptde)}',
  },
  'blog.${postKey}.date': {
    en: '${escapeStr(dateEn)}',
    de: '${escapeStr(dateDe)}',
  },
  'blog.${postKey}.content': {
    en: \`${escapeTpl(stubEn)}\`,
    de: \`${escapeTpl(stubDe)}\`,
  },
`;
}

function main() {
  const raw = parseArgs(process.argv);
  const dryRun = raw.dryrun === true;

  const required = ['slug', 'date', 'image', 'titleen', 'titlede', 'excerpten', 'excerptde'];
  const missing = required.filter((k) => !raw[k]);
  if (missing.length) {
    console.error('Missing required flags: ' + missing.join(', '));
    console.error('\nExample:\n  npm run new:blog -- --slug=my-topic --date=2026-04-12 \\\n    --image=/images/blog-my-topic.jpg --title-en="Title" --title-de="Titel" \\\n    --excerpt-en="Short EN" --excerpt-de="Kurz DE" [--slug-de=mein-thema] [--tags="a,b"] [--dry-run]');
    process.exit(1);
  }

  let dataSrc = fs.readFileSync(BLOG_DATA, 'utf8');
  const transSrc = fs.readFileSync(BLOG_TRANS, 'utf8');

  const id = nextPostId(dataSrc);
  const postKey = `post${id}`;
  const { en: dateEn, de: dateDe } = formatDateLabels(raw.date);

  const dataBlock = buildBlogDataBlock(raw, id, postKey);
  const transBlock = buildTranslationsBlock(raw, postKey, dateEn, dateDe);

  const dataNeedle = 'export const blogPosts: BlogPost[] = [\n';
  const dataIdx = dataSrc.indexOf(dataNeedle);
  if (dataIdx === -1) throw new Error('blogData.ts: could not find blogPosts array opening');

  const transNeedle = '\n  // Post 14 (Top places to visit right now)';
  const transIdx = transSrc.indexOf(transNeedle);
  if (transIdx === -1) {
    throw new Error(
      'blogTranslations.ts: anchor comment not found (expected before Post 14). Update transNeedle in new-blog-post.cjs.'
    );
  }

  const outData = dataSrc.slice(0, dataIdx + dataNeedle.length) + dataBlock + dataSrc.slice(dataIdx + dataNeedle.length);
  const outTrans = transSrc.slice(0, transIdx) + '\n' + transBlock + transSrc.slice(transIdx);

  if (dryRun) {
    console.log('--- blogData.ts (insert after array open) ---\n');
    console.log(dataBlock);
    console.log('--- blogTranslations.ts (insert before Post 14) ---\n');
    console.log(transBlock);
    console.log(`\nNext id: ${id}  keys: blog.${postKey}.*`);
    return;
  }

  fs.writeFileSync(BLOG_DATA, outData, 'utf8');
  fs.writeFileSync(BLOG_TRANS, outTrans, 'utf8');
  console.log(`Wrote new post id ${id} (${postKey}). Edit HTML in blogTranslations.ts, add ${raw.image.replace(/^\//, 'public/')}, then: npm run build && git add -A && git commit -m "blog: add ${raw.slug}" && git push`);
}

main();
