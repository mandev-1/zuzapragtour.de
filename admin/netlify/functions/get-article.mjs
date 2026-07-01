// GET /.netlify/functions/get-article?slug=… — auth-gated. One article, fresh.
import { verify } from '../lib/auth.mjs';
import { getArticle } from '../lib/store.mjs';

const json = (statusCode, obj) => ({ statusCode, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj) });
const slugRe = /^[a-z0-9-]+$/;

export const handler = async (event) => {
  if (!verify(event.headers.cookie, process.env.SESSION_SECRET)) return json(401, { error: 'Nicht angemeldet.' });
  const slug = (event.queryStringParameters && event.queryStringParameters.slug) || '';
  if (!slugRe.test(slug)) return json(400, { error: 'Ungültiger Slug.' });
  try {
    const article = await getArticle(slug);
    return article ? json(200, { article }) : json(404, { error: 'Artikel nicht gefunden.' });
  } catch (e) {
    return json(500, { error: String((e && e.message) || e) });
  }
};
