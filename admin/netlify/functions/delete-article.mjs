// POST /.netlify/functions/delete-article — auth-gated. Removes an article
// (local file in dev, GitHub delete → public rebuild in prod). Body: { slug }.
import { verify } from '../lib/auth.mjs';
import { removeArticle } from '../lib/store.mjs';

const json = (statusCode, obj) => ({ statusCode, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj) });
const slugRe = /^[a-z0-9-]+$/;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  if (!verify(event.headers.cookie, process.env.SESSION_SECRET)) return json(401, { error: 'Nicht angemeldet.' });

  let slug;
  try {
    slug = JSON.parse(event.body || '{}').slug;
  } catch {
    return json(400, { error: 'Ungültige Daten.' });
  }
  if (!slug || !slugRe.test(slug)) return json(400, { error: 'Ungültiger Slug.' });

  try {
    await removeArticle(slug);
    return json(200, { ok: true });
  } catch (e) {
    return json(500, { error: String((e && e.message) || e) });
  }
};
