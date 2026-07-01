import { verify } from '../lib/auth.mjs';

export const handler = async (event) => ({
  statusCode: 200,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ authed: verify(event.headers.cookie, process.env.SESSION_SECRET) }),
});
