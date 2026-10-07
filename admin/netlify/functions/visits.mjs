// GET /.netlify/functions/visits?from=YYYY-MM-DD&to=YYYY-MM-DD — auth-gated.
// Fetches the anonymous visits for the dashboard "Kliky a poptávky" from the
// public site (prague-tour-guide/netlify/functions/visits.mjs).
// GET /.netlify/functions/visits?catalog=1 — the site's tour and article titles
// (prague-tour-guide/app/stats-catalog.json).
//
// Needs STATS_KEY (or the older AB_RESULTS_KEY) set to the same value on both
// Netlify sites; optional PUBLIC_SITE_URL (defaults to https://zuzapragtour.de).
import { verify } from '../lib/auth.mjs';

const json = (statusCode, obj) => ({ statusCode, headers: { 'Content-Type': 'application/json' }, body: typeof obj === 'string' ? obj : JSON.stringify(obj) });
const isDay = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s || '');

export const handler = async (event) => {
  if (!verify(event.headers.cookie, process.env.SESSION_SECRET)) return json(401, { error: 'Nepřihlášeno.' });

  const site = (process.env.PUBLIC_SITE_URL || 'https://zuzapragtour.de').replace(/\/$/, '');
  const q = event.queryStringParameters || {};
  try {
    if (q.catalog) {
      const r = await fetch(`${site}/stats-catalog.json`);
      if (!r.ok) return json(502, { error: `Katalog článků: web odpovídá ${r.status}.` });
      return json(200, await r.text());
    }
    const key = process.env.STATS_KEY || process.env.AB_RESULTS_KEY;
    if (!key) return json(500, { error: 'STATS_KEY není nastaven (Netlify → admin site → Environment variables).' });
    const params = new URLSearchParams();
    if (isDay(q.from)) params.set('from', q.from);
    if (isDay(q.to)) params.set('to', q.to);
    const r = await fetch(`${site}/api/visits?${params}`, { headers: { 'x-stats-key': key } });
    if (!r.ok) {
      return json(502, { error: r.status === 401 ? 'Klíč nesedí: STATS_KEY musí být na obou sitech stejný.' : `Web odpovídá ${r.status}.` });
    }
    return json(200, await r.text());
  } catch {
    return json(502, { error: 'Web není dostupný.' });
  }
};
