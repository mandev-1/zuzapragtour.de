// POST /api/track — stores one page view / click / enquiry of the site's own
// analytics (src/utils/analytics.ts). Anonymous by design: every event is an
// empty blob whose key holds day, a random per-tab visit id, the event's
// sequence number and what happened — no IP, no user agent. Separate keys mean
// concurrent writes never overwrite each other; stats.mjs aggregates them.
import { getStore } from '@netlify/blobs';

const STORE = 'site-stats'; // also read by stats.mjs
const KINDS = new Set(['page', 'click', 'enquiry']);
const CATS = new Set(['', 'whatsapp', 'phone', 'email', 'form', 'tour', 'anchor', 'nav', 'external', 'button']);
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
  const device = b.d === 'm' ? 'm' : 'd';
  const variant = b.v === 'a' || b.v === 'b' ? b.v : '-';
  const page = b.p.length > 1 ? b.p.replace(/\/+$/, '') : '/';

  const day = new Date().toISOString().slice(0, 10);
  const key = [
    `e/${day}/${b.s}/${String(seq).padStart(4, '0')}`,
    b.k,
    device,
    variant,
    b.c || '-',
    field(page, 80),
    field(b.a, 40),
    field(b.l, 60), // last: if a very long label hits the 600-byte key limit, only it gets cut
  ].join('|');
  await getStore(STORE).set(key.slice(0, 600), '');
  return new Response(null, { status: 204 });
};

export const config = { path: '/api/track' };
