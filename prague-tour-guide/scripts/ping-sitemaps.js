const https = require('https');

const SITEMAP_URL = 'https://zuzapragtour.de/sitemap.xml';
const targets = [
  `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
];

function get(url) {
  return new Promise((resolve) => {
    https
      .get(url, (res) => {
        res.resume();
        res.on('end', resolve);
      })
      .on('error', resolve);
  });
}

(async () => {
  for (const url of targets) {
    try {
      console.log('Pinging', url);
      await get(url);
    } catch (e) {
      // ignore
    }
  }
  console.log('Sitemap ping completed');
})();
