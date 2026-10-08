// GET /.netlify/functions/ab-results — auth-gated. Fetches the homepage A/B
// test counts from the public site (prague-tour-guide/netlify/functions/
// ab-results.mjs), which keeps them in its own Netlify Blobs store.
//
// Needs STATS_KEY (or the older AB_RESULTS_KEY) set to the same value on both
// Netlify sites; optional
// PUBLIC_SITE_URL (defaults to https://zuzapragtour.de).
import { verify } from '../lib/auth.mjs';

const json = (statusCode, obj) => ({ statusCode, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj) });

export const handler = async (event) => {
  if (!verify(event.headers.cookie, process.env.SESSION_SECRET)) return json(401, { error: 'Nepřihlášeno.' });

  const key = process.env.STATS_KEY || process.env.AB_RESULTS_KEY;
  if (!key) return json(500, { error: 'STATS_KEY není nastaven (Netlify → admin site → Environment variables).' });

  const site = (process.env.PUBLIC_SITE_URL || 'https://zuzapragtour.de').replace(/\/$/, '');
  try {
    const r = await fetch(`${site}/api/ab-results`, { headers: { 'x-ab-key': key } });
    const body = await r.json().catch(() => ({}));
    if (!r.ok) {
      return json(502, {
        error: r.status === 401 ? 'Klíč nesedí: STATS_KEY musí být na obou sitech stejný.' : `Web odpovídá ${r.status}.`,
      });
    }
    return json(200, body);
  } catch {
    return json(502, { error: 'Web není dostupný.' });
  }
};
