// GET /.netlify/functions/list-tours — auth-gated. Read-only tour overview.
// Tours are defined in code (prague-tour-guide/src/data/tours.ts) with text in
// translations.ts. This parses the tour metadata and resolves each tour's
// bilingual title/description/duration. Local dev reads the files off disk;
// production reads them via the GitHub Contents API.
import fs from 'node:fs';
import path from 'node:path';
import { verify } from '../lib/auth.mjs';
import { getText } from '../lib/github.mjs';

const json = (statusCode, obj) => ({ statusCode, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj) });

const LOCAL_TOURS = path.resolve(process.cwd(), '../prague-tour-guide/src/data/tours.ts');
const LOCAL_TL = path.resolve(process.cwd(), '../prague-tour-guide/src/utils/translations.ts');
const GH_TOURS = 'prague-tour-guide/src/data/tours.ts';
const GH_TL = 'prague-tour-guide/src/utils/translations.ts';

async function readSrc(localPath, ghPath) {
  if (fs.existsSync(localPath)) return fs.readFileSync(localPath, 'utf8');
  return (await getText(ghPath)) || '';
}

// Resolve a translations.ts key to { en, de } (values are quoted strings).
function tlQuoted(src, key) {
  const at = src.indexOf(`'${key}'`);
  if (at === -1) return { en: '', de: '' };
  const seg = src.slice(at, at + 6000);
  const grab = (lang) => {
    const re = new RegExp(lang + ":\\s*(['\"])((?:\\\\.|(?!\\1).)*)\\1");
    const m = re.exec(seg);
    return m ? m[2].replace(/\\(['"])/g, '$1') : '';
  };
  return { en: grab('en'), de: grab('de') };
}

export const handler = async (event) => {
  if (!verify(event.headers.cookie, process.env.SESSION_SECRET)) return json(401, { error: 'Nicht angemeldet.' });
  try {
    const toursSrc = await readSrc(LOCAL_TOURS, GH_TOURS);
    const tlSrc = await readSrc(LOCAL_TL, GH_TL);
    // Tour objects each start with `id: '...'` (the interface uses `id: string;`, no quote → not matched).
    const ids = [...toursSrc.matchAll(/\n\s*id:\s*'([^']+)'/g)];
    const tours = ids.map((m, i) => {
      const obj = toursSrc.slice(m.index, i + 1 < ids.length ? ids[i + 1].index : toursSrc.length);
      const get = (re) => { const x = re.exec(obj); return x ? x[1] : undefined; };
      const titleKey = get(/\btitleKey:\s*'([^']+)'/);
      const descKey = get(/\bdescriptionKey:\s*'([^']+)'/);
      const durKey = get(/\bdurationKey:\s*'([^']+)'/);
      const durMin = get(/\bdurationMinutes:\s*(\d+)/);
      return {
        id: m[1],
        slug: get(/\bslug:\s*'([^']+)'/),
        slugDe: get(/\bslugDe:\s*'([^']+)'/),
        image: get(/\bimage:\s*'([^']+)'/),
        durationMinutes: durMin ? Number(durMin) : undefined,
        title: titleKey ? tlQuoted(tlSrc, titleKey) : { en: '', de: '' },
        description: descKey ? tlQuoted(tlSrc, descKey) : { en: '', de: '' },
        duration: durKey ? tlQuoted(tlSrc, durKey) : { en: '', de: '' },
      };
    });
    return json(200, { tours });
  } catch (e) {
    return json(500, { error: String((e && e.message) || e) });
  }
};
