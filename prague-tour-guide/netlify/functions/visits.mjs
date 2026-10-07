// GET /api/visits?from=YYYY-MM-DD&to=YYYY-MM-DD — every anonymous visit of the
// site's own analytics (track.mjs) in a range of UTC days (max 45), as ordered
// event lists. The admin dashboard "Kliky a poptávky" aggregates them itself.
// Requires the header `x-stats-key` to match STATS_KEY (or the older
// AB_RESULTS_KEY), set to the same value on this site and on the admin site.
//
// Response: { generatedAt, days: [{ day, strings, visits }] } where
//   visit = [id, startTime (unix s), device 'm'|'d', abVariant, events]
//   event = [kind 'p'|'c'|'e', page, category, label, area, secondsAfterStart, secondsOnPage, readDepth]
// page / category / label / area are indexes into that day's `strings`.
// Page leaves are folded into their page view (seconds on page, read depth).
// Finished days (older than yesterday) are built once and cached (vis/v2/<day>).
import { getStore } from '@netlify/blobs';

const STORE = 'site-stats'; // written by track.mjs
const CACHE = 'vis/v2/';
const MAX_DAYS = 45;
const KIND = { page: 'p', click: 'c', enquiry: 'e' };

function dec(s) {
  try {
    return decodeURIComponent(s || '');
  } catch {
    try {
      return decodeURIComponent(String(s).replace(/%[0-9a-f]?$/i, '')); // label cut mid-escape at the key limit
    } catch {
      return s || '';
    }
  }
}

/** One stored key → event, for both key versions (see track.mjs). */
function parse(key, day) {
  const parts = key.split('|');
  const [head, k, d, ab, c] = parts;
  const [, , visit, seq] = head.split('/');
  let ts, secs, depth, page, area, label;
  if (parts.length >= 11) {
    [ts, secs, depth, page, area, label] = [parseInt(parts[5], 36), parseInt(parts[6], 36), Number(parts[7]), parts[8], parts[9], parts[10]];
  } else {
    // v1: no time — order within the day by sequence number.
    ts = Math.floor(Date.parse(day + 'T12:00:00Z') / 1000) + Number(seq);
    [secs, depth, page, area, label] = [0, 0, parts[5], parts[6], parts[7]];
  }
  if (!visit || !page) return null;
  return { visit, n: Number(seq), k, d, ab: ab === '-' ? '' : ab, c: c === '-' ? '' : c, ts, secs, depth, p: dec(page), a: dec(area), l: dec(label) };
}

function build(day, keys) {
  const byVisit = new Map();
  for (const key of keys) {
    const e = parse(key, day);
    if (!e) continue;
    const list = byVisit.get(e.visit) ?? [];
    list.push(e);
    byVisit.set(e.visit, list);
  }
  const strings = [];
  const index = new Map();
  const S = (s) => {
    const v = s || '';
    if (!index.has(v)) {
      index.set(v, strings.length);
      strings.push(v);
    }
    return index.get(v);
  };
  const visits = [];
  for (const [id, list] of byVisit) {
    list.sort((x, y) => x.n - y.n);
    const pageAt = new Map(); // seq → event row of that page view
    const rows = [];
    const start = Math.min(...list.map((e) => e.ts));
    let dev = '';
    let ab = '';
    for (const e of list) {
      if (e.k === 'leave') {
        const row = pageAt.get(Number(e.l));
        if (row) {
          row[6] = Math.max(row[6], e.secs);
          row[7] = Math.max(row[7], e.depth);
        }
        continue;
      }
      if (!KIND[e.k]) continue;
      dev = dev || e.d;
      ab = ab || e.ab;
      const row = [KIND[e.k], S(e.p), S(e.k === 'enquiry' ? 'enquiry' : e.c), S(e.l), S(e.a), e.ts - start, 0, 0];
      if (e.k === 'page') pageAt.set(e.n, row);
      rows.push(row);
    }
    if (rows.length) visits.push([id, start, dev === 'm' ? 'm' : 'd', ab, rows]);
  }
  visits.sort((x, y) => x[1] - y[1]);
  return { day, strings, visits };
}

async function dayVisits(store, day, cacheable) {
  if (cacheable) {
    const cached = await store.get(CACHE + day, { type: 'json' });
    if (cached) return cached;
  }
  const { blobs } = await store.list({ prefix: `e/${day}/` });
  const out = build(day, blobs.map((b) => b.key));
  if (cacheable) await store.setJSON(CACHE + day, out);
  return out;
}

const isDay = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s || '');

export default async (req) => {
  const secret = process.env.STATS_KEY || process.env.AB_RESULTS_KEY;
  if (!secret || req.headers.get('x-stats-key') !== secret) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }
  const q = new URL(req.url).searchParams;
  const today = new Date().toISOString().slice(0, 10);
  const to = isDay(q.get('to')) && q.get('to') < today ? q.get('to') : today;
  const from = isDay(q.get('from')) && q.get('from') <= to ? q.get('from') : to;
  const days = [];
  for (let t = Date.parse(to + 'T00:00:00Z'); days.length < MAX_DAYS; t -= 86400000) {
    const d = new Date(t).toISOString().slice(0, 10);
    if (d < from) break;
    days.push(d);
  }
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  const store = getStore(STORE);
  const out = [];
  for (let i = 0; i < days.length; i += 8) {
    const batch = days.slice(i, i + 8);
    out.push(...(await Promise.all(batch.map((day) => dayVisits(store, day, day < yesterday)))));
  }
  return Response.json({ generatedAt: new Date().toISOString(), days: out.reverse() }, { headers: { 'cache-control': 'no-store' } });
};

export const config = { path: '/api/visits' };
