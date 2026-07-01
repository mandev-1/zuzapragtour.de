// GET /.netlify/functions/list-images — auth-gated. Lists the public site's
// /images directory so the editor + media library can browse it.
// Local dev (`netlify dev`): reads the sibling repo folder directly, so it works
// without a GitHub token. Production: reads via the GitHub Contents API.
import fs from 'node:fs';
import path from 'node:path';
import { verify } from '../lib/auth.mjs';
import { listDir } from '../lib/github.mjs';

const json = (statusCode, obj) => ({ statusCode, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj) });
const RE = /\.(jpe?g|png|webp|avif|gif|svg)$/i;
const GH_DIR = 'prague-tour-guide/public/images';
const LOCAL_DIR = path.resolve(process.cwd(), '../prague-tour-guide/public/images');

export const handler = async (event) => {
  if (!verify(event.headers.cookie, process.env.SESSION_SECRET)) return json(401, { error: 'Nicht angemeldet.' });
  try {
    let images;
    if (fs.existsSync(LOCAL_DIR)) {
      // Local dev — read straight off disk (no token needed).
      images = fs
        .readdirSync(LOCAL_DIR)
        .filter((n) => RE.test(n))
        .map((n) => ({ path: `/images/${n}`, name: n, size: fs.statSync(path.join(LOCAL_DIR, n)).size }));
    } else {
      // Production — read via the GitHub Contents API.
      images = (await listDir(GH_DIR))
        .filter((e) => RE.test(e.name))
        .map((e) => ({ path: `/images/${e.name}`, name: e.name, size: e.size || 0 }));
    }
    images.sort((a, b) => a.name.localeCompare(b.name));
    return json(200, { images });
  } catch (e) {
    return json(500, { error: String((e && e.message) || e) });
  }
};
