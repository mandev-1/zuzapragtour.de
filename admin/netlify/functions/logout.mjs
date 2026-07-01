import { cookie } from '../lib/auth.mjs';

export const handler = async () => ({
  statusCode: 200,
  headers: { 'Content-Type': 'application/json', 'Set-Cookie': cookie('', 0) },
  body: JSON.stringify({ ok: true }),
});
