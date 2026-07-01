// GET /.netlify/functions/review-info — auth-gated. Aggregates the review setup:
// the platforms + deep links (from the repo config), where reviews are requested
// across the site, and — if a Google Places key is configured — the live Google
// rating + recent reviews. Local dev reads the repo files off disk; prod via GitHub.
import fs from 'node:fs';
import path from 'node:path';
import { verify } from '../lib/auth.mjs';
import { getText } from '../lib/github.mjs';

const json = (statusCode, obj) => ({ statusCode, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj) });
const PUBLIC_ROOT = path.resolve(process.cwd(), '../prague-tour-guide');

async function readSrc(rel) {
  const local = path.join(PUBLIC_ROOT, rel);
  if (fs.existsSync(local)) return fs.readFileSync(local, 'utf8');
  return (await getText(`prague-tour-guide/${rel}`)) || '';
}
const grab = (src, re) => { const m = re.exec(src); return m ? m[1] : ''; };

// Files that plausibly host a review CTA, and how to label them.
const ASK_FILES = [
  ['src/components/ReviewFunnel.tsx', 'Bewertungs-Funnel · /bewerten'],
  ['src/components/Footer.tsx', 'Footer'],
  ['src/components/Home.tsx', 'Startseite'],
  ['src/components/Contact.tsx', 'Kontakt'],
  ['src/components/TripAdvisorWidget.tsx', 'TripAdvisor-Widget'],
  ['src/screens/ZuzanaManovaPage.tsx', 'Über-Zuzana-Seite'],
];

function platformsIn(text) {
  const p = [];
  if (/googleReview|writereview\?placeid|search\.google.*review/i.test(text)) p.push('Google');
  if (/tripadvisor/i.test(text)) p.push('TripAdvisor');
  if (/tourhq/i.test(text)) p.push('TourHQ');
  if (/wa\.me|whatsapp/i.test(text)) p.push('WhatsApp');
  if (/\/bewerten/i.test(text) && !p.length) p.push('Funnel-Link');
  return p;
}

async function fetchGoogle() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return { configured: false };
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=rating,user_ratings_total,reviews,url,name&reviews_sort=newest&key=${key}`;
    const r = await fetch(url);
    const d = await r.json();
    if (d.status !== 'OK') return { configured: true, error: d.status + (d.error_message ? ` — ${d.error_message}` : '') };
    const res = d.result || {};
    return {
      configured: true,
      rating: res.rating,
      total: res.user_ratings_total,
      url: res.url,
      reviews: (res.reviews || []).map((rv) => ({
        author: rv.author_name,
        rating: rv.rating,
        text: rv.text,
        when: rv.relative_time_description,
        photo: rv.profile_photo_url,
      })),
    };
  } catch (e) {
    return { configured: true, error: String((e && e.message) || e) };
  }
}

export const handler = async (event) => {
  if (!verify(event.headers.cookie, process.env.SESSION_SECRET)) return json(401, { error: 'Nicht angemeldet.' });
  try {
    const brand = await readSrc('src/brand.ts');
    const ta = await readSrc('src/constants/tripAdvisor.ts');
    const th = await readSrc('src/constants/tourHq.ts');

    const platforms = {
      google: {
        profileUrl: grab(brand, /googleReview:\s*'([^']+)'/),
        ...(await fetchGoogle()),
      },
      tripadvisor: {
        listingUrl: grab(brand, /tripadvisor:\s*'([^']+)'/) || grab(ta, /TRIPADVISOR_LISTING_URL\s*=\s*'([^']+)'/),
        writeUrl: grab(brand, /tripadvisorWriteReview:\s*'([^']+)'/),
        locationId: grab(ta, /TRIPADVISOR_LOCATION_ID\s*=\s*'([^']+)'/),
      },
      tourhq: { url: grab(th, /TOURHQ_GUIDE_URL[\s\S]*?'([^']+)'/) },
    };

    const asks = [];
    for (const [rel, label] of ASK_FILES) {
      const text = await readSrc(rel).catch(() => '');
      const ps = platformsIn(text);
      if (ps.length) asks.push({ where: label, file: rel, platforms: ps });
    }

    return json(200, { platforms, asks });
  } catch (e) {
    return json(500, { error: String((e && e.message) || e) });
  }
};
