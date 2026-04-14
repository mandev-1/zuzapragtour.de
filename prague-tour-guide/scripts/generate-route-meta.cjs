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
const CONTENT_OUT = path.join(ROOT, 'netlify', 'edge-functions', 'route-content.json');

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

/**
 * Find the index of the next unescaped backtick in `src` starting at `fromPos`.
 * Returns -1 if none found.
 */
function findClosingBacktick(src, fromPos) {
  let pos = fromPos;
  while (pos < src.length) {
    const bt = src.indexOf('`', pos);
    if (bt === -1) return -1;
    // If the char before is a backslash it's escaped — keep searching
    if (bt > 0 && src[bt - 1] === '\\') {
      pos = bt + 1;
    } else {
      return bt;
    }
  }
  return -1;
}

/**
 * Extract { en, de } template-literal content for a given translation key.
 * Handles multi-KB HTML strings reliably via index-based slicing (not regex).
 */
function readContentValue(src, key) {
  const keyStr = `'${key}'`;
  const keyPos = src.indexOf(keyStr);
  if (keyPos === -1) return null;

  const slice = src.slice(keyPos);

  // --- English value ---
  const enMarker = 'en: `';
  const enOpen = slice.indexOf(enMarker);
  if (enOpen === -1) return null;
  const enStart = enOpen + enMarker.length;
  const enEnd = findClosingBacktick(slice, enStart);
  if (enEnd === -1) return null;
  const enContent = slice.slice(enStart, enEnd);

  // --- German value (must come after the en closing backtick) ---
  const afterEn = slice.slice(enEnd + 1);
  const deMarker = 'de: `';
  const deOpen = afterEn.indexOf(deMarker);
  if (deOpen === -1) return null;
  const deStart = deOpen + deMarker.length;
  const deEnd = findClosingBacktick(afterEn, deStart);
  if (deEnd === -1) return null;
  const deContent = afterEn.slice(deStart, deEnd);

  return { en: enContent, de: deContent };
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
      title: 'Zuzana Manová | Deutschsprachige Prag-Expertin & Stadtf\u00fchrerin \u2013 ZuzaPragTour',
      description:
        'Zuzana Manová \u2013 deutschsprachige Prag-Expertin & Spezialistin f\u00fcr private Stadtf\u00fchrungen seit 1986. Zertifizierte F\u00fchrungen durch Altstadt, Karlsbr\u00fccke, Prager Burg & J\u00fcdisches Viertel. \u00dcber 40 Jahre Erfahrung. Jetzt buchen!',
      ogTitle: 'Zuzana Manová | Deutschsprachige Prag-Expertin & Stadtf\u00fchrerin',
      ogDescription:
        'Zuzana Manová \u2013 deutschsprachige Prag-Expertin & Spezialistin f\u00fcr Stadtf\u00fchrungen seit 1986.',
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
    '/zuzana-manova': {
      title: 'Zuzana Manová \u2013 Deutschsprachige Prag-Expertin & Spezialistin | Zuza Prague Tours',
      description:
        'Ing. Zuzana Manová \u2013 Ihre deutschsprachige Prag-Expertin und Spezialistin seit 1986. Zertifizierte Stadtf\u00fchrerin, akkreditiert beim J\u00fcdischen Museum. Private F\u00fchrungen auf Deutsch und Englisch.',
      ogTitle: 'Zuzana Manová \u2013 Deutschsprachige Prag-Expertin & Spezialistin',
      ogDescription:
        'Deutschsprachige Prag-Expertin mit \u00fcber 40 Jahren Erfahrung. Spezialistin f\u00fcr Stadtf\u00fchrungen auf Deutsch und Englisch.',
      ogImage: `${SITE}/images/zuzana-portrait.jpg`,
      ogUrl: `${SITE}/zuzana-manova`,
      canonical: `${SITE}/zuzana-manova`,
      ogType: 'profile',
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

  // ── Tour subpage routes ────────────────────────────────────────────────────
  const tourDefs = [
    {
      slug: 'prague-castle', slugDe: 'prager-burg', image: '/images/prague-castle.jpg',
      titleEn: 'Prague Castle Private Tour in German & English | Zuza Prague Tours',
      titleDe: 'Prager Burg – Private Stadtführung Prag auf Deutsch | Zuza Prague Tours',
      descEn: 'Explore Prague Castle complex, St. Vitus Cathedral, and Golden Lane with a certified private guide. Skip queues, hear real stories, see the view nobody photographs.',
      descDe: 'Erkunden Sie Prager Burgkomplex, Veitsdom und Goldenes Gässchen mit einer zertifizierten Privatführerin. Warteschlangen umgehen, echte Geschichten hören, den Aussichtspunkt finden, den niemand fotografiert.',
    },
    {
      slug: 'old-town-jewish-quarter', slugDe: 'altstadt-juedisches-viertel', image: '/images/blog-jewish-quarter-2-min.jpg',
      titleEn: 'Old Town & Jewish Quarter Private Tour in German & English | Zuza Prague Tours',
      titleDe: 'Altstadt & Jüdisches Viertel – Prag Privatführung auf Deutsch | Zuza Prague Tours',
      descEn: 'Walk medieval Old Town, Astronomical Clock, and Jewish Quarter with a Jewish-Museum-accredited guide. Private tour in German and English.',
      descDe: 'Mittelalterliche Altstadt, Astronomische Uhr und Jüdisches Viertel mit einer vom Jüdischen Museum akkreditierten Führerin. Privattour auf Deutsch und Englisch.',
    },
    {
      slug: 'custom-private-tour', slugDe: 'individuelle-privattour', image: '/images/blog-night-prague-min.jpg',
      titleEn: 'Custom Private Prague Tour — Tailored to You | Zuza Prague Tours',
      titleDe: 'Individuelle Privattour Prag – maßgeschneiderte Stadtführung auf Deutsch | Zuza Prague Tours',
      descEn: 'Design your own Prague tour — history, architecture, food, Kafka, or a mix. Private guide, flexible pace, personal route planned together in advance.',
      descDe: 'Gestalten Sie Ihre eigene Prag-Tour — Geschichte, Architektur, Essen, Kafka oder eine Mischung. Privatführung, flexibles Tempo, persönliche Route gemeinsam im Voraus geplant.',
    },
    {
      slug: 'hidden-prague', slugDe: 'verstecktes-prag', image: '/images/blog-hidden-gems-min.jpg',
      titleEn: 'Hidden Prague Private Tour — Secret Spots & Local Gems | Zuza Prague Tours',
      titleDe: 'Verstecktes Prag – Private Führung abseits der Touristenpfade | Zuza Prague Tours',
      descEn: 'Skip the tourist trail. Secret courtyards, hidden gardens, and local spots that most visitors never find — private tour with a guide who has been collecting these places since 1986.',
      descDe: 'Den Touristenpfad verlassen. Versteckte Innenhöfe, geheime Gärten und lokale Orte, die die meisten Besucher nie finden — Privattour mit einer Führerin, die diese Orte seit 1986 sammelt.',
    },
    {
      slug: 'prague-german-heritage', slugDe: 'prag-deutsches-erbe', image: '/images/prague-castle-cathedral.jpg',
      titleEn: 'Prague German Heritage Private Tour | Zuza Prague Tours',
      titleDe: 'Prag Deutsches Erbe – Privatführung auf Deutsch | Zuza Prague Tours',
      descEn: 'Trace 700 years of German culture in Prague — Kafka, Mozart, Habsburg rulers, and an honest look at 20th-century history. Private tour with a bilingual Czech guide.',
      descDe: '700 Jahre deutsches Kulturerbe in Prag — Kafka, Mozart, Habsburger Herrscher und ein ehrlicher Blick auf die Geschichte des 20. Jahrhunderts. Privattour mit einer zweisprachigen tschechischen Führerin.',
    },
    {
      slug: 'vaclav-havel-tour', slugDe: 'vaclav-havel-tour-prag', image: '/images/havel-tour.jpg',
      titleEn: 'Václav Havel Tour Prague — Velvet Revolution Private Tour | Zuza Prague Tours',
      titleDe: 'Václav-Havel-Tour Prag – Private Stadtführung Samtene Revolution | Zuza Prague Tours',
      descEn: 'Follow Václav Havel\'s story through Prague — Wenceslas Square, the Velvet Revolution sites, and the Lucerna passage. Your guide was there in November 1989.',
      descDe: 'Václav Havels Geschichte durch Prag verfolgen — Wenzelsplatz, Schauplätze der Samtenen Revolution und die Lucerna-Passage. Ihre Führerin war im November 1989 dabei.',
    },
  ];

  const tourRoutes = {};
  for (const td of tourDefs) {
    tourRoutes[`/tours/${td.slug}`] = {
      title: td.titleEn,
      description: td.descEn,
      ogTitle: td.titleEn,
      ogDescription: td.descEn,
      ogImage: `${SITE}${td.image}`,
      ogUrl: `${SITE}/tours/${td.slug}`,
      canonical: `${SITE}/tours/${td.slug}`,
      ogType: 'website',
    };
    if (td.slugDe) {
      tourRoutes[`/tours/${td.slugDe}`] = {
        title: td.titleDe,
        description: td.descDe,
        ogTitle: td.titleDe,
        ogDescription: td.descDe,
        ogImage: `${SITE}${td.image}`,
        ogUrl: `${SITE}/tours/${td.slugDe}`,
        canonical: `${SITE}/tours/${td.slugDe}`,
        ogType: 'website',
      };
    }
  }
  Object.assign(staticRoutes, tourRoutes);
  console.log(`Tour routes added: ${Object.keys(tourRoutes).length} slugs`);

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

  // ── route-content.json ──────────────────────────────────────────────────
  // Maps each blog slug to pre-rendered article HTML for static injection
  // by the edge function so crawlers see real content without JavaScript.
  const contentRoutes = {};
  let contentHit = 0;
  let contentMiss = 0;

  for (const post of posts) {
    if (!post.contentKey) continue;

    const contentVal = readContentValue(blogTrSrc, post.contentKey);
    if (!contentVal) {
      console.warn(`  ⚠ No content found for ${post.slug} (key: ${post.contentKey})`);
      contentMiss++;
      continue;
    }

    const titleVal = readTranslationValue(blogTrSrc, post.titleKey);
    const postImage = post.image ? `${SITE}${post.image}` : OG_IMAGE;

    // English slug → English HTML
    contentRoutes[post.slug] = {
      title: titleVal ? titleVal.en : '',
      html: contentVal.en,
      author: post.author || '',
      date: post.date || '',
      image: postImage,
    };

    // German slug → German HTML
    if (post.slugDe) {
      contentRoutes[post.slugDe] = {
        title: titleVal ? titleVal.de : '',
        html: contentVal.de,
        author: post.author || '',
        date: post.date || '',
        image: postImage,
      };
    }

    contentHit++;
  }

  fs.writeFileSync(CONTENT_OUT, JSON.stringify(contentRoutes), 'utf8');
  const contentCount = Object.keys(contentRoutes).length;
  const kb = Math.round(fs.statSync(CONTENT_OUT).size / 1024);
  console.log(
    `Route content generated: ${contentHit} posts (${contentCount} slugs, ${kb} KB) -> ${path.relative(ROOT, CONTENT_OUT)}${contentMiss ? ` | ${contentMiss} posts missing content` : ''}`
  );
}

try {
  generate();
} catch (err) {
  console.error('generate-route-meta failed:', err);
  process.exitCode = 1;
}
