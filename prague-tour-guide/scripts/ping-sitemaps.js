const https = require('https');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
const SITE = (pkg.homepage || 'https://zuzapragtour.de').replace(/\/$/, '');
const SITEMAP_URL = `${SITE}/sitemap.xml`;
const INDEXNOW_KEY = '0ba5d917a5ee483c9c875df26cd223d0';

/* ── 1. Sitemap ping (Google + Bing) ───────────────────────────── */

function get(url) {
  return new Promise((resolve) => {
    https
      .get(url, (res) => { res.resume(); res.on('end', resolve); })
      .on('error', resolve);
  });
}

async function pingSitemaps() {
  const targets = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  ];
  for (const url of targets) {
    try {
      console.log('Pinging', url);
      await get(url);
    } catch (_) { /* ignore */ }
  }
  console.log('Sitemap ping completed');
}

/* ── 2. IndexNow bulk submission ───────────────────────────────── */

function collectAllUrls() {
  const ROOT = path.join(__dirname, '..');
  const BLOG_TS = path.join(ROOT, 'src', 'utils', 'blogData.ts');

  const urls = [
    `${SITE}/`,
    `${SITE}/tours`,
    `${SITE}/contact`,
    `${SITE}/book`,
    `${SITE}/blog`,
    `${SITE}/privacy`,
    `${SITE}/terms`,
  ];

  try {
    const src = fs.readFileSync(BLOG_TS, 'utf8');
    const match = src.match(/export const blogPosts[^=]*=\s*(\[[\s\S]*?\]);/);
    if (match) {
      const posts = vm.runInNewContext(`const data = ${match[1]}; data;`, {}, { timeout: 1000 });
      for (const p of posts) {
        urls.push(`${SITE}/blog/${p.slug}`);
        if (p.slugDe) urls.push(`${SITE}/blog/${p.slugDe}`);
      }
    }
  } catch (e) {
    console.warn('Could not read blog posts for IndexNow:', e.message);
  }

  return urls;
}

function postJson(url, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const parsed = new URL(url);
    const opts = {
      hostname: parsed.hostname,
      path: parsed.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = https.request(opts, (res) => {
      let text = '';
      res.on('data', (d) => { text += d; });
      res.on('end', () => resolve({ status: res.statusCode, body: text }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function submitIndexNow() {
  const urls = collectAllUrls();
  const payload = {
    host: 'zuzapragtour.de',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`IndexNow → ${endpoint} (${urls.length} URLs)`);
      const result = await postJson(endpoint, payload);
      console.log(`  Response: ${result.status}`);
    } catch (e) {
      console.warn(`  Failed: ${e.message}`);
    }
  }
  console.log('IndexNow submission completed');
}

/* ── Run ───────────────────────────────────────────────────────── */

(async () => {
  await pingSitemaps();
  await submitIndexNow();
})();
