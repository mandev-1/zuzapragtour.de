// POST /.netlify/functions/save-article — auth-gated. Persists a journal article
// (local file in dev, GitHub commit → public rebuild in prod).
// Body: { article: JournalArticle, originalSlug?: string }  (originalSlug → rename).
import { verify } from '../lib/auth.mjs';
import { saveArticle } from '../lib/store.mjs';

const json = (statusCode, obj) => ({ statusCode, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj) });
const slugRe = /^[a-z0-9-]+$/;

function validate(a) {
  if (!a || typeof a !== 'object') return 'Kein Artikel übermittelt.';
  if (!a.slug || !slugRe.test(a.slug)) return 'Ungültiger Slug (nur a–z, 0–9, Bindestrich).';
  if (a.slugDe && !slugRe.test(a.slugDe)) return 'Ungültiger deutscher Slug.';
  if (!a.title) return 'Titel fehlt.';
  if (!a.date) return 'Datum fehlt.';
  if (!Array.isArray(a.languages) || a.languages.length === 0) return 'Sprache fehlt.';
  if (!Array.isArray(a.blocks)) return 'Inhalt (blocks) fehlt.';
  return null;
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  if (!verify(event.headers.cookie, process.env.SESSION_SECRET)) return json(401, { error: 'Nicht angemeldet.' });

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Ungültige Daten.' });
  }
  const article = payload.article || payload;
  const err = validate(article);
  if (err) return json(400, { error: err });

  try {
    const res = await saveArticle(article, payload.originalSlug);
    return json(200, { ok: true, commit: res.commit });
  } catch (e) {
    return json(500, { error: String((e && e.message) || e) });
  }
};
