// GET /api/stats?days=30 — aggregated clicks, conversions and visitor paths of
// the site's own analytics (track.mjs) for the admin (admin/netlify/functions/
// stats.mjs proxies here). Requires the header `x-stats-key` to match
// STATS_KEY (or the older AB_RESULTS_KEY), set to the same value on this site
// and on the admin site.
//
// A "visit" is one browser tab from the first page view until it is closed or
// reloaded. A visit "converts" when it taps WhatsApp, phone or e-mail, or sends
// the enquiry form. Finished days are aggregated once and cached in the store
// (agg/v1/<day>), so only today and yesterday are counted from raw events.
import { getStore } from '@netlify/blobs';

const STORE = 'site-stats'; // written by track.mjs
const AGG = 'agg/v1/';
const CONTACT = new Set(['whatsapp', 'phone', 'email']);
const GOAL_NAMES = { whatsapp: 'WhatsApp', phone: 'Anruf', email: 'E-Mail', enquiry: 'Anfrage gesendet' };
const MAX_STEPS = 6;
const CAP = { clicks: 600, entries: 200, refs: 120, pages: 300, paths: 300 };

function dec(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    try {
      return decodeURIComponent(s.replace(/%[0-9a-f]?$/i, '')); // label cut mid-escape at the key limit
    } catch {
      return s;
    }
  }
}

const isGoal = (e) => e.k === 'enquiry' || (e.k === 'click' && CONTACT.has(e.c));
const goalOf = (e) => (e.k === 'enquiry' ? 'enquiry' : e.c);

/**
 * Counters are [mobile, desktop, mobileConverted, desktopConverted]: how often
 * something happened and how often the visit converted afterwards (or at all,
 * for entry pages, sources and paths).
 */
function bump(map, key, dev, converted) {
  const c = (map[key] ??= [0, 0, 0, 0]);
  c[dev]++;
  if (converted) c[dev + 2]++;
}

function cap(map, n) {
  const entries = Object.entries(map);
  if (entries.length <= n) return map;
  return Object.fromEntries(entries.sort((x, y) => y[1][0] + y[1][1] - (x[1][0] + x[1][1])).slice(0, n));
}

/** Turns one day's raw event keys into counts. */
function aggregate(day, keys) {
  const visits = new Map();
  for (const key of keys) {
    const [head, k, d, , c, page, area, label = ''] = key.split('|');
    const [, , visit, n] = head.split('/');
    if (!visit || !page) continue;
    const list = visits.get(visit) ?? [];
    list.push({ n: Number(n), k, d, c: c === '-' ? '' : c, p: dec(page), a: dec(area), l: dec(label) });
    visits.set(visit, list);
  }

  const agg = { day, visits: [0, 0, 0, 0], pageviews: [0, 0], bounces: [0, 0], goals: {}, clicks: {}, entries: {}, refs: {}, pages: {}, paths: {} };
  for (const events of visits.values()) {
    events.sort((x, y) => x.n - y.n);
    const dev = events[0].d === 'm' ? 0 : 1;
    const firstGoal = events.findIndex(isGoal);
    let lastGoal = -1;
    events.forEach((e, i) => isGoal(e) && (lastGoal = i));
    const converted = firstGoal !== -1;
    const firstPage = events.find((e) => e.k === 'page');

    agg.visits[dev]++;
    if (converted) agg.visits[dev + 2]++;
    bump(agg.entries, (firstPage ?? events[0]).p, dev, converted);
    bump(agg.refs, firstPage?.a || '', dev, converted);

    const seen = new Set();
    const steps = [];
    let pageviews = 0;
    events.forEach((e, i) => {
      const convertsLater = lastGoal >= i;
      if (e.k === 'page') {
        pageviews++;
        if (!seen.has(e.p)) {
          seen.add(e.p);
          bump(agg.pages, e.p, dev, convertsLater);
        }
        if ((!converted || i < firstGoal) && steps[steps.length - 1] !== e.p) steps.push(e.p);
      } else {
        // Sent forms are listed with the clicks, by chosen tour.
        bump(agg.clicks, [e.k === 'enquiry' ? 'enquiry' : e.c, e.l, e.a, e.p].join('\t'), dev, convertsLater);
      }
      if (isGoal(e)) (agg.goals[goalOf(e)] ??= [0, 0])[dev]++;
    });
    agg.pageviews[dev] += pageviews;
    if (pageviews <= 1 && events.every((e) => e.k === 'page')) agg.bounces[dev]++;

    const path = steps.length > MAX_STEPS ? [...steps.slice(0, 2), '…', ...steps.slice(-3)] : steps;
    if (converted) path.push(`✓ ${GOAL_NAMES[goalOf(events[firstGoal])]}`);
    bump(agg.paths, path.join(' › ') || '(ohne Seitenaufruf)', dev, converted);
  }
  for (const [name, n] of Object.entries(CAP)) agg[name] = cap(agg[name], n);
  return agg;
}

async function dayStats(store, day, cacheable) {
  if (cacheable) {
    const cached = await store.get(AGG + day, { type: 'json' });
    if (cached) return cached;
  }
  const { blobs } = await store.list({ prefix: `e/${day}/` });
  const agg = aggregate(day, blobs.map((b) => b.key));
  if (cacheable) await store.setJSON(AGG + day, agg);
  return agg;
}

const addArr = (into, from) => from.forEach((v, i) => (into[i] = (into[i] || 0) + v));
function mergeMap(into, from) {
  for (const [k, v] of Object.entries(from)) addArr((into[k] ??= []), v);
}

export default async (req) => {
  const secret = process.env.STATS_KEY || process.env.AB_RESULTS_KEY;
  if (!secret || req.headers.get('x-stats-key') !== secret) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  const n = Math.min(Math.max(parseInt(new URL(req.url).searchParams.get('days') || '30', 10) || 30, 1), 365);
  const today = new Date();
  const days = Array.from({ length: n }, (_, i) => new Date(today.getTime() - i * 86400000).toISOString().slice(0, 10)).reverse();

  const store = getStore(STORE);
  const results = [];
  for (let i = 0; i < days.length; i += 8) {
    // Today and yesterday may still change; older days are final and cached.
    const batch = days.slice(i, i + 8);
    results.push(...(await Promise.all(batch.map((day) => dayStats(store, day, day < days[days.length - 2])))));
  }

  const totals = { visits: [], pageviews: [], bounces: [], goals: {}, clicks: {}, entries: {}, refs: {}, pages: {}, paths: {} };
  for (const agg of results) {
    for (const k of ['visits', 'pageviews', 'bounces']) addArr(totals[k], agg[k]);
    for (const k of ['goals', 'clicks', 'entries', 'refs', 'pages', 'paths']) mergeMap(totals[k], agg[k]);
  }
  for (const [name, max] of Object.entries(CAP)) totals[name] = cap(totals[name], max);

  return Response.json(
    {
      generatedAt: new Date().toISOString(),
      from: days[0],
      to: days[days.length - 1],
      series: results.map(({ day, visits, pageviews, goals }) => ({ day, visits, pageviews, goals })),
      totals,
    },
    { headers: { 'cache-control': 'no-store' } },
  );
};

export const config = { path: '/api/stats' };
