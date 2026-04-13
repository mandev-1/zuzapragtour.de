/*
  Prebuild sitemap generator
  - Reads src/utils/blogData.ts (blogPosts)
  - Generates public/sitemap.xml with core pages + per-post URLs and image tags
*/
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const BLOG_TS = path.join(ROOT, 'src', 'utils', 'blogData.ts');
const SITEMAP_XML = path.join(ROOT, 'public', 'sitemap.xml');
const SITE = 'https://zuzapragtour.de';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function fileISOTime(p) {
  try {
    const stat = fs.statSync(p);
    return new Date(stat.mtimeMs).toISOString().slice(0, 10);
  } catch {
    return null;
  }
}

function latestISOFromFiles(files) {
  const dates = files
    .map(f => fileISOTime(f))
    .filter(Boolean)
    .sort();
  return dates.length ? dates[dates.length - 1] : todayISO();
}

function readBlogPosts() {
  const src = fs.readFileSync(BLOG_TS, 'utf8');
  const match = src.match(/export const blogPosts[^=]*=\s*(\[[\s\S]*?\]);/);
  if (!match) {
    throw new Error('Could not locate blogPosts array in blogData.ts');
  }
  const arrLiteral = match[1];
  const code = `const data = ${arrLiteral}; data;`;
  const posts = vm.runInNewContext(code, {}, { timeout: 1000 });
  if (!Array.isArray(posts)) {
    throw new Error('Parsed blogPosts is not an array');
  }
  return posts.map(p => ({
    slug: p.slug,
    slugDe: p.slugDe || null,
    date: p.date || todayISO(),
    image: p.image || null,
    titleKey: p.titleKey || '',
  }));
}

function urlBlock(loc, { lastmod, changefreq, priority, image, hreflang } = {}) {
  let xml = `  <url>\n    <loc>${loc}</loc>\n`;
  if (lastmod) xml += `    <lastmod>${lastmod}</lastmod>\n`;
  if (changefreq) xml += `    <changefreq>${changefreq}</changefreq>\n`;
  if (priority) xml += `    <priority>${priority}</priority>\n`;
  if (hreflang) {
    for (const { lang, href } of hreflang) {
      xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />\n`;
    }
  }
  if (image && image.loc) {
    xml += `    <image:image>\n`;
    xml += `      <image:loc>${image.loc}</image:loc>\n`;
    if (image.title) xml += `      <image:title>${image.title}</image:title>\n`;
    xml += `    </image:image>\n`;
  }
  xml += `  </url>`;
  return xml;
}

function generate() {
  const posts = readBlogPosts();
  const pageFiles = {
    '/': [
      path.join(ROOT, 'src', 'pages', 'HomePage.tsx'),
      path.join(ROOT, 'src', 'components', 'Home.tsx'),
      path.join(ROOT, 'public', 'index.html'),
    ],
    '/privacy': [path.join(ROOT, 'src', 'pages', 'PrivacyPage.tsx')],
    '/terms': [path.join(ROOT, 'src', 'pages', 'TermsPage.tsx')],
    '/tours': [
      path.join(ROOT, 'src', 'pages', 'ToursPage.tsx'),
      path.join(ROOT, 'src', 'components', 'Tours.tsx'),
    ],
    '/contact': [
      path.join(ROOT, 'src', 'pages', 'ContactPage.tsx'),
      path.join(ROOT, 'src', 'components', 'Contact.tsx'),
    ],
    '/blog': [
      path.join(ROOT, 'src', 'pages', 'BlogPage.tsx'),
      path.join(ROOT, 'src', 'components', 'Blog.tsx'),
      path.join(ROOT, 'src', 'utils', 'blogData.ts'),
    ],
    '/book': [path.join(ROOT, 'src', 'pages', 'BookPage.tsx')],
  };
  const pageLastMod = Object.fromEntries(
    Object.entries(pageFiles).map(([route, files]) => [route, latestISOFromFiles(files)])
  );

  const parts = [];
  parts.push('<?xml version="1.0" encoding="UTF-8"?>');
  parts.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  parts.push('        xmlns:xhtml="http://www.w3.org/1999/xhtml"');
  parts.push('        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">');
  parts.push('');
  // Core pages
  parts.push(urlBlock(`${SITE}/`, { lastmod: pageLastMod['/'], changefreq: 'weekly', priority: '1.0' }));
  parts.push(urlBlock(`${SITE}/privacy`, { lastmod: pageLastMod['/privacy'], changefreq: 'yearly', priority: '0.3' }));
  parts.push(urlBlock(`${SITE}/terms`, { lastmod: pageLastMod['/terms'], changefreq: 'yearly', priority: '0.3' }));
  parts.push(urlBlock(`${SITE}/tours`, { lastmod: pageLastMod['/tours'], changefreq: 'weekly', priority: '0.9' }));
  parts.push(urlBlock(`${SITE}/contact`, { lastmod: pageLastMod['/contact'], changefreq: 'monthly', priority: '0.8' }));
  parts.push(urlBlock(`${SITE}/blog`, { lastmod: pageLastMod['/blog'], changefreq: 'weekly', priority: '0.9' }));
  parts.push(urlBlock(`${SITE}/book`, { lastmod: pageLastMod['/book'], changefreq: 'weekly', priority: '0.85' }));

  // Blog posts (EN + DE variants with hreflang)
  parts.push('');
  posts.forEach(p => {
    const enLoc = `${SITE}/blog/${p.slug}`;
    const deLoc = p.slugDe ? `${SITE}/blog/${p.slugDe}` : null;
    const image = p.image ? { loc: `${SITE}${p.image}`, title: '' } : null;

    const hreflangEN = deLoc
      ? [{ lang: 'en', href: enLoc }, { lang: 'de', href: deLoc }, { lang: 'x-default', href: enLoc }]
      : null;

    parts.push(urlBlock(enLoc, { lastmod: p.date, changefreq: 'monthly', priority: '0.85', image, hreflang: hreflangEN }));

    if (deLoc) {
      const hreflangDE = [{ lang: 'en', href: enLoc }, { lang: 'de', href: deLoc }, { lang: 'x-default', href: enLoc }];
      parts.push(urlBlock(deLoc, { lastmod: p.date, changefreq: 'monthly', priority: '0.85', image, hreflang: hreflangDE }));
    }
  });

  parts.push('');
  parts.push('</urlset>');

  const xml = parts.join('\n');
  fs.writeFileSync(SITEMAP_XML, xml, 'utf8');
  console.log(`Sitemap updated with ${posts.length} blog posts -> ${path.relative(ROOT, SITEMAP_XML)}`);
}

try {
  generate();
} catch (err) {
  console.error('generate-sitemap failed:', err);
  process.exitCode = 1;
}
