// POST /api/track — stores one page view / click / enquiry / copy / page leave of the
// site's own analytics (src/utils/analytics.ts). Anonymous by design: every
// event is an empty blob whose key holds day, a random per-tab visit id, the
// event's sequence number, the time it arrived and what happened — no IP, no
// user agent. Separate keys mean concurrent writes never overwrite each other;
// visits.mjs reads them.
//
// Key (v2): e/<UTC day>/<visit>/<seq>|kind|device|variant|category|time|seconds|depth|page|area|label
// (v1 keys, before 2026-10-07, lack time|seconds|depth.)
import { getStore } from '@netlify/blobs';

const STORE = 'site-stats'; // also read by visits.mjs
const KINDS = new Set(['page', 'click', 'enquiry', 'leave', 'copy']);
const CATS = new Set(['', 'whatsapp', 'phone', 'email', 'form', 'tour', 'anchor', 'nav', 'external', 'button']);
const DEPTHS = new Set([0, 25, 50, 75, 100]);
const BOT = /bot|crawl|spider|slurp|lighthouse|headless|preview/i;

const field = (value, max) => encodeURIComponent(String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max));

export default async (req) => {
  if (req.method !== 'POST') return new Response(null, { status: 405 });
  if (BOT.test(req.headers.get('user-agent') || '')) return new Response(null, { status: 204 });

  let b;
  try {
    b = JSON.parse(await req.text());
  } catch {
    return new Response(null, { status: 400 });
  }
  const seq = Number(b?.n);
  if (
    typeof b?.s !== 'string' || !/^[a-z0-9]{8,16}$/.test(b.s) ||
    !Number.isInteger(seq) || seq < 0 || seq > 9999 ||
    !KINDS.has(b.k) || !CATS.has(b.c ?? '') ||
    typeof b.p !== 'string' || !b.p.startsWith('/')
  ) {
    return new Response(null, { status: 400 });
  }
  // A copy is a copied e-mail address or phone number.
  if (b.k === 'copy' && b.c !== 'email' && b.c !== 'phone') return new Response(null, { status: 400 });
  // A page leave reports how long the page was visible and, on articles, how far it was read.
  const secs = b.k === 'leave' ? Math.round(Number(b.t)) : 0;
  const depth = b.k === 'leave' ? Number(b.dp || 0) : 0;
  if (b.k === 'leave' && (!Number.isFinite(secs) || secs < 0 || secs > 86400 || !DEPTHS.has(depth) || !/^\d{1,4}$/.test(String(b.l)))) {
    return new Response(null, { status: 400 });
  }
  const device = b.d === 'm' ? 'm' : 'd';
  const variant = b.v === 'a' || b.v === 'b' ? b.v : '-';
  const page = b.p.length > 1 ? b.p.replace(/\/+$/, '') : '/';

  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  const key = [
    `e/${day}/${b.s}/${String(seq).padStart(4, '0')}`,
    b.k,
    device,
    variant,
    b.c || '-',
    Math.floor(now.getTime() / 1000).toString(36),
    secs.toString(36),
    depth,
    field(page, 80),
    field(b.a, 40),
    field(b.l, 60), // last: if a very long label hits the 600-byte key limit, only it gets cut
  ].join('|');
  await getStore(STORE).set(key.slice(0, 600), '');
  return new Response(null, { status: 204 });
};

export const config = { path: '/api/track' };
