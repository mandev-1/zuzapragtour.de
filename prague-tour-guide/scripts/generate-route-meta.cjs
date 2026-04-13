/*
  Prebuild: generate route-meta.json consumed by the Netlify Edge Function
  that rewrites <title>, <meta>, and OG tags for each route so crawlers
  (which never execute JS) see page-specific metadata.
*/
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const BLOG_TS = path.join(ROOT, 'src', 'utils', 'blogData.ts');
const BLOG_TR = path.join(ROOT, 'src', 'utils', 'blogTranslations.ts');
const OUT = path.join(ROOT, 'netlify', 'edge-functions', 'route-meta.json');

const SITE = 'https://zuzapragtour.de';
const OG_IMAGE = `${SITE}/images/charles-bridge-hero-1600.jpg`;

function readBlogPosts() {
  const src = fs.readFileSync(BLOG_TS, 'utf8');
  const match = src.match(/export const blogPosts[^=]*=\s*(\[[\s\S]*?\]);/);
  if (!match) throw new Error('Could not locate blogPosts array');
  const code = `const data = ${match[1]}; data;`;
  const posts = vm.runInNewContext(code, {}, { timeout: 2000 });
  if (!Array.isArray(posts)) throw new Error('Parsed blogPosts is not an array');
  return posts;
}

function unescape(str) {
  return str.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\');
}

function readTranslationValue(src, key) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(
    `['"]${escaped}['"]\\s*:\\s*\\{\\s*en\\s*:\\s*(['"\`])([\\s\\S]*?)\\1\\s*,\\s*de\\s*:\\s*(['"\`])([\\s\\S]*?)\\3\\s*,?\\s*\\}`,
  );
  const m = src.match(re);
  if (!m) return null;
  return { en: unescape(m[2]), de: unescape(m[4]) };
}

function generate() {
  const posts = readBlogPosts();
  const blogTrSrc = fs.readFileSync(BLOG_TR, 'utf8');

  const staticRoutes = {
    '/': {
      title: 'Zuza Prague Tours \u2013 Zertifizierte deutschsprachige Stadtf\u00fchrerin in Prag | Zuzana Manova',
      description:
        'Entdecken Sie Prag mit einer zertifizierten, deutschsprachigen Stadtf\u00fchrerin \u2013 \u00fcber 40 Jahre Erfahrung! Private Stadtf\u00fchrungen, individuelle Touren & Insider-Tipps zu Altstadt, Karlsbr\u00fccke und Prager Burg. Jetzt Ihre deutsch gef\u00fchrte Prag-Tour buchen!',
      ogTitle: 'Zuza Prague Tours \u2013 Deutschsprachige zertifizierte Stadtf\u00fchrerin',
      ogDescription:
        'Erleben Sie Prag mit einer deutschsprachigen Expertin. Private und individuelle Stadtf\u00fchrungen \u2013 pers\u00f6nlich und authentisch.',
      ogImage: OG_IMAGE,
      ogUrl: `${SITE}/`,
      canonical: `${SITE}/`,
      ogType: 'website',
    },
    '/tours': {
      title: 'Prague Tours - Castle, Old Town & Custom Tours | Zuza Prague Tours',
      description:
        'Choose from Prague Castle tours, Old Town walking tours, Jewish Quarter explorations, or create your custom Prague experience. Small groups, expert local guide, personalized service.',
      ogTitle: 'Prague Tours - Expert Guided Experiences',
      ogDescription: "Explore Prague's best attractions with a local expert guide.",
      ogImage: OG_IMAGE,
      ogUrl: `${SITE}/tours`,
      canonical: `${SITE}/tours`,
      ogType: 'website',
    },
    '/contact': {
      title: 'Kontakt \u2013 Tour in Prag buchen | +420 721 231 933',
      description:
        'Kontaktieren Sie Zuzana zur Buchung Ihrer Prag-Tour. Rufen Sie an unter +420 721 231 933, WhatsApp oder E-Mail. Schnelle Antwort innerhalb von 24 Stunden.',
      ogTitle: 'Kontakt \u2013 Tour in Prag buchen | +420 721 231 933',
      ogDescription:
        'Kontaktieren Sie Zuzana zur Buchung Ihrer Prag-Tour. +420 721 231 933.',
      ogImage: OG_IMAGE,
      ogUrl: `${SITE}/contact`,
      canonical: `${SITE}/contact`,
      ogType: 'website',
    },
    '/book': {
      title: 'Tour buchen \u2013 Zuza Prague Tours',
      description:
        'Buchen Sie Ihre Tour in Prag. Nutzen Sie das Formular oder schreiben Sie mir per WhatsApp.',
      ogTitle: 'Tour buchen \u2013 Zuza Prague Tours',
      ogDescription:
        'Buchen Sie Ihre Tour in Prag. Nutzen Sie das Formular oder schreiben Sie mir per WhatsApp.',
      ogImage: OG_IMAGE,
      ogUrl: `${SITE}/book`,
      canonical: `${SITE}/book`,
      ogType: 'website',
    },
    '/blog': {
      title: 'Prag Reiseblog | Zuza Prague Tours',
      description: 'Tipps, Geschichten und Einblicke \u00fcber die Erkundung Prags',
      ogTitle: 'Prag Reiseblog | Zuza Prague Tours',
      ogDescription: 'Tipps, Geschichten und Einblicke \u00fcber die Erkundung Prags',
      ogImage: OG_IMAGE,
      ogUrl: `${SITE}/blog`,
      canonical: `${SITE}/blog`,
      ogType: 'website',
    },
    '/privacy': {
      title: 'Datenschutz | Zuza Prague Tours',
      description:
        'Datenschutzerkl\u00e4rung: Verarbeitung personenbezogener Daten bei Zuza Prague Tours (Ing. Zuzana Manov\u00e1).',
      ogTitle: 'Datenschutz | Zuza Prague Tours',
      ogDescription:
        'Datenschutzerkl\u00e4rung: Verarbeitung personenbezogener Daten bei Zuza Prague Tours.',
      ogImage: OG_IMAGE,
      ogUrl: `${SITE}/privacy`,
      canonical: `${SITE}/privacy`,
      ogType: 'website',
    },
    '/terms': {
      title: 'AGB | Zuza Prague Tours',
      description:
        'Allgemeine Gesch\u00e4ftsbedingungen f\u00fcr private Stadtf\u00fchrungen und Touren mit Zuza Prague Tours.',
      ogTitle: 'AGB | Zuza Prague Tours',
      ogDescription:
        'Allgemeine Gesch\u00e4ftsbedingungen f\u00fcr private Stadtf\u00fchrungen und Touren mit Zuza Prague Tours.',
      ogImage: OG_IMAGE,
      ogUrl: `${SITE}/terms`,
      canonical: `${SITE}/terms`,
      ogType: 'website',
    },
  };

  const blogRoutes = {};

  for (const post of posts) {
    const titleVal = readTranslationValue(blogTrSrc, post.titleKey);
    const excerptVal = readTranslationValue(blogTrSrc, post.excerptKey);
    if (!titleVal || !excerptVal) {
      console.warn(`  ⚠ Missing translation for post ${post.id} (${post.slug}), skipping`);
      continue;
    }

    const postImage = post.image ? `${SITE}${post.image}` : OG_IMAGE;

    // English slug -> English meta
    blogRoutes[post.slug] = {
      title: `${titleVal.en} | Zuza Prague Tours`,
      description: excerptVal.en,
      ogTitle: `${titleVal.en} | Zuza Prague Tours`,
      ogDescription: excerptVal.en,
      ogImage: postImage,
      ogUrl: `${SITE}/blog/${post.slug}`,
      canonical: `${SITE}/blog/${post.slug}`,
      ogType: 'article',
      articleAuthor: post.author,
      articleDate: post.date,
    };

    // German slug -> German meta
    if (post.slugDe) {
      blogRoutes[post.slugDe] = {
        title: `${titleVal.de} | Zuza Prague Tours`,
        description: excerptVal.de,
        ogTitle: `${titleVal.de} | Zuza Prague Tours`,
        ogDescription: excerptVal.de,
        ogImage: postImage,
        ogUrl: `${SITE}/blog/${post.slugDe}`,
        canonical: `${SITE}/blog/${post.slugDe}`,
        ogType: 'article',
        articleAuthor: post.author,
        articleDate: post.date,
      };
    }
  }

  const data = { static: staticRoutes, blog: blogRoutes };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(data, null, 2), 'utf8');

  const slugCount = Object.keys(blogRoutes).length;
  const staticCount = Object.keys(staticRoutes).length;
  console.log(
    `Route meta generated: ${staticCount} static + ${slugCount} blog slugs -> ${path.relative(ROOT, OUT)}`
  );
}

try {
  generate();
} catch (err) {
  console.error('generate-route-meta failed:', err);
  process.exitCode = 1;
}
