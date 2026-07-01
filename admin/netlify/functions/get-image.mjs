// GET /.netlify/functions/get-image?file=<name> — serves a public-site image
// SAME-ORIGIN so previews work in the admin. Local dev: streams the file from
// the sibling repo folder (so not-yet-deployed images show too). Production:
// 302-redirects to the live image. Only serves files in /images, name-validated.
import fs from 'node:fs';
import path from 'node:path';

const LOCAL_DIR = path.resolve(process.cwd(), '../prague-tour-guide/public/images');
const PUBLIC_ORIGIN = 'https://zuzapragtour.de';
const TYPES = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif', '.svg': 'image/svg+xml',
};

export const handler = async (event) => {
  const raw = (event.queryStringParameters && event.queryStringParameters.file) || '';
  const file = raw.replace(/^\/images\//, '').replace(/^\//, '');
  if (!/^[\w.-]+\.(jpe?g|png|webp|avif|gif|svg)$/i.test(file)) {
    return { statusCode: 400, body: 'Invalid file' };
  }
  const local = path.join(LOCAL_DIR, file);
  if (path.dirname(local) === LOCAL_DIR && fs.existsSync(local)) {
    const buf = fs.readFileSync(local);
    const ext = path.extname(file).toLowerCase();
    return {
      statusCode: 200,
      headers: { 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Cache-Control': 'public, max-age=300' },
      body: buf.toString('base64'),
      isBase64Encoded: true,
    };
  }
  return { statusCode: 302, headers: { Location: `${PUBLIC_ORIGIN}/images/${file}` } };
};
