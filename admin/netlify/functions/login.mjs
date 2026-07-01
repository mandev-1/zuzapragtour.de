import crypto from 'node:crypto';
import { makeToken, cookie, MAX_AGE } from '../lib/auth.mjs';

const json = (statusCode, obj, extraHeaders = {}) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json', ...extraHeaders },
  body: JSON.stringify(obj),
});

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const secret = process.env.SESSION_SECRET;
  const expected = process.env.ADMIN_PASSWORD;
  if (!secret || !expected) {
    return json(500, { error: 'Server nicht konfiguriert (ADMIN_PASSWORD / SESSION_SECRET fehlen).' });
  }

  let password = '';
  try {
    password = JSON.parse(event.body || '{}').password || '';
  } catch {
    /* ignore */
  }

  const a = Buffer.from(String(password));
  const b = Buffer.from(expected);
  const ok = a.length === b.length && crypto.timingSafeEqual(a, b);
  if (!ok) return json(401, { error: 'Falsches Passwort.' });

  return json(200, { ok: true }, { 'Set-Cookie': cookie(makeToken(secret), MAX_AGE) });
};
