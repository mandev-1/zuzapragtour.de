// GET /.netlify/functions/stats?days=30 — auth-gated. Fetches click, conversion
// and visitor-path statistics from the public site (prague-tour-guide/netlify/
// functions/stats.mjs), which keeps them in its own Netlify Blobs store.
//
// Needs STATS_KEY (or the older AB_RESULTS_KEY) set to the same value on both
// Netlify sites; optional PUBLIC_SITE_URL (defaults to https://zuzapragtour.de).
import { verify } from '../lib/auth.mjs';

const json = (statusCode, obj) => ({ statusCode, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj) });

export const handler = async (event) => {
  if (!verify(event.headers.cookie, process.env.SESSION_SECRET)) return json(401, { error: 'Nicht angemeldet.' });

  const key = process.env.STATS_KEY || process.env.AB_RESULTS_KEY;
  if (!key) return json(500, { error: 'STATS_KEY ist nicht gesetzt (Netlify → Admin-Site → Environment variables).' });

  const days = Math.min(Math.max(parseInt(event.queryStringParameters?.days || '30', 10) || 30, 1), 365);
  const site = (process.env.PUBLIC_SITE_URL || 'https://zuzapragtour.de').replace(/\/$/, '');
  try {
    const r = await fetch(`${site}/api/stats?days=${days}`, { headers: { 'x-stats-key': key } });
    const body = await r.json().catch(() => ({}));
    if (!r.ok) {
      return json(502, {
        error: r.status === 401 ? 'Schlüssel passt nicht: STATS_KEY muss auf beiden Sites gleich sein.' : `Website antwortet mit ${r.status}.`,
      });
    }
    return json(200, body);
  } catch {
    return json(502, { error: 'Website nicht erreichbar.' });
  }
};
