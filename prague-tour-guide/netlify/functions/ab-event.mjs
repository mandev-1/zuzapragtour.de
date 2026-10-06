// POST /api/ab-event — counts one event of the homepage A/B test
// (src/config/abTest.ts). Anonymous by design: every event is an empty blob
// whose key holds only day / variant / device / event / page and a random id —
// no IP, no user agent, no visitor ID. Separate keys mean concurrent writes
// never overwrite each other; ab-results.mjs counts them.
import { getStore } from '@netlify/blobs';

const EVENTS = new Set(['visitor', 'view', 'whatsapp', 'call', 'email', 'form', 'tour', 'enquiry']);
const BOT = /bot|crawl|spider|slurp|lighthouse|headless/i;

export default async (req) => {
  if (req.method !== 'POST') return new Response(null, { status: 405 });
  if (BOT.test(req.headers.get('user-agent') || '')) return new Response(null, { status: 204 });

  let body;
  try {
    body = JSON.parse(await req.text());
  } catch {
    return new Response(null, { status: 400 });
  }
  const variant = body?.v;
  const event = body?.e;
  if ((variant !== 'a' && variant !== 'b') || !EVENTS.has(event)) return new Response(null, { status: 400 });
  const device = body.d === 'm' ? 'm' : 'd';
  const page = body.p === 'home' ? 'home' : 'other';

  const day = new Date().toISOString().slice(0, 10);
  await getStore('ab-home').set(`${day}/${variant}/${device}/${event}/${page}/${crypto.randomUUID()}`, '1');
  return new Response(null, { status: 204 });
};

export const config = { path: '/api/ab-event' };
