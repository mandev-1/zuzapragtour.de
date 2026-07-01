// GET /.netlify/functions/list-articles — auth-gated. Every journal article,
// newest first. Local dev reads content/journal/*.json off disk; prod via GitHub.
import { verify } from '../lib/auth.mjs';
import { listArticles } from '../lib/store.mjs';

const json = (statusCode, obj) => ({ statusCode, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj) });

export const handler = async (event) => {
  if (!verify(event.headers.cookie, process.env.SESSION_SECRET)) return json(401, { error: 'Nicht angemeldet.' });
  try {
    const articles = await listArticles();
    articles.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
    return json(200, { articles });
  } catch (e) {
    return json(500, { error: String((e && e.message) || e) });
  }
};
