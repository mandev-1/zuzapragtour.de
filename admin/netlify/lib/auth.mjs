// Stateless HMAC-signed session for the single-user admin gate.
// Not in netlify/functions/, so Netlify does NOT treat it as an endpoint;
// esbuild bundles it into the functions that import it.
import crypto from 'node:crypto';

export const COOKIE = 'zpt_admin';
export const MAX_AGE = 60 * 60 * 12; // 12 hours (seconds)

const sign = (exp, secret) => crypto.createHmac('sha256', secret).update(String(exp)).digest('hex');

export function makeToken(secret) {
  const exp = Date.now() + MAX_AGE * 1000;
  return `${exp}.${sign(exp, secret)}`;
}

export function verify(cookieHeader, secret) {
  if (!cookieHeader || !secret) return false;
  const m = String(cookieHeader).match(new RegExp(`${COOKIE}=([^;]+)`));
  if (!m) return false;
  const [exp, mac] = m[1].split('.');
  if (!exp || !mac || Number(exp) < Date.now()) return false;
  const expected = sign(Number(exp), secret);
  try {
    return crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected));
  } catch {
    return false;
  }
}

export const cookie = (token, maxAge) =>
  `${COOKIE}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAge}`;
