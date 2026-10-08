/* ============================================================================
   generate-journal.cjs — build the public site's view of the CMS articles.

   Reads every content/journal/*.json (the source of truth the admin commits)
   and emits src/utils/journalGenerated.ts:
     - journalPosts:   BlogPost[]  (metadata, merged into blogPosts)
     - journalContent: Record<key, {de?,en?}>  (title/excerpt/date/content,
                       the content pre-rendered to HTML per language)

   This normalizes block articles into the EXISTING (BlogPost + translations)
   model, so the rendering layer treats them like any legacy post — only maps
   need client hydration. Runs in `prebuild` (and `npm run gen:journal`).

   Drafts and not-yet-due scheduled posts are excluded from the public output.
   ============================================================================ */

const fs = require('fs');
const path = require('path');
const { renderBlocks, loc, stripTags } = require('./render-blocks.cjs');

const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'journal');
// Pages that use the article template outside /blog (e.g. /sehenswuerdigkeiten-prag).
const PAGES_DIR = path.join(ROOT, 'content', 'pages');
// Portrait in the mobile contact card of `floatingCta` articles.
const AVATAR = '/images/hero/zuzana-avatar-192.jpg';
const OUT_FILE = path.join(ROOT, 'src', 'utils', 'journalGenerated.ts');

const DEFAULT_AUTHOR = 'Ing. Zuzana Manová';

function readArticles(dir = CONTENT_DIR) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const full = path.join(dir, f);
      try {
        return JSON.parse(fs.readFileSync(full, 'utf8'));
      } catch (e) {
        throw new Error(`Invalid JSON in ${path.relative(ROOT, full)}: ${e.message}`);
      }
    });
}

/** Is this article live on the public site right now? */
function isPublic(a) {
  if (a.status === 'published') return true;
  if (a.status === 'scheduled' && a.date) {
    // Due once its date has arrived (date-only compare, UTC-ish).
    return new Date(a.date).getTime() <= Date.now();
  }
  return false;
}

/** Decode the HTML entities authored HTML commonly contains (for plain-text output). */
function decodeEntities(s) {
  return String(s)
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_m, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, '&');
}

function langFlag(languages) {
  const set = new Set(languages || ['de']);
  if (set.has('de') && set.has('en')) return 'both';
  if (set.has('en')) return 'en';
  return 'de';
}

function dateLabel(a, lang) {
  if (a.dateDisplay && a.dateDisplay[lang]) return a.dateDisplay[lang];
  if (a.dateDisplay && a.dateDisplay.de) return a.dateDisplay.de;
  return a.date || '';
}

function build() {
  const articles = readArticles().filter(isPublic);
  const pages = readArticles(PAGES_DIR).filter(isPublic);
  // Newest first; the merged blogPosts re-sorts too, but keep deterministic order.
  articles.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  // Cross-links between editions (a revision published alongside its predecessor).
  const bySlug = {};
  articles.forEach((a) => { bySlug[a.slug] = a; if (a.slugDe) bySlug[a.slugDe] = a; });
  const supersededBy = {};
  for (const a of articles) if (a.supersedes) supersededBy[a.supersedes] = a;
  function editionNote(a, lang) {
    const t = (de, en) => (lang === 'en' ? en : de);
    const parts = [];
    const newer = supersededBy[a.slug] || (a.slugDe && supersededBy[a.slugDe]);
    if (newer) {
      const href = '/blog/' + (lang === 'de' && newer.slugDe ? newer.slugDe : newer.slug);
      const lbl = newer.edition ? t('Ausgabe ', 'edition ') + newer.edition : t('neuere Ausgabe', 'newer edition');
      parts.push(t('Neuere Ausgabe verfügbar', 'A newer edition is available') + ': <a href="' + href + '">' + lbl + '</a>');
    }
    if (a.supersedes && bySlug[a.supersedes]) {
      const old = bySlug[a.supersedes];
      const href = '/blog/' + (lang === 'de' && old.slugDe ? old.slugDe : old.slug);
      parts.push(t('Frühere Ausgabe', 'Earlier edition') + ': <a href="' + href + '">' + t('ältere Fassung ansehen', 'view the older version') + '</a>');
    }
    return parts.length ? '<div class="blog-edition-note">' + parts.map((p) => '<span>' + p + '</span>').join('') + '</div>' : '';
  }

  const journalPosts = [];
  const journalPages = [];
  const journalContent = {};

  for (const a of [...articles, ...pages]) {
    const isPage = pages.includes(a);
    if (!a.slug) throw new Error('Journal article missing slug');
    const languages = a.languages && a.languages.length ? a.languages : ['de'];
    const hasEn = languages.includes('en');
    const key = (suffix) => `journal.${a.slug}.${suffix}`;

    journalContent[key('title')] = { de: loc(a.title, 'de'), en: hasEn ? loc(a.title, 'en') : undefined };
    journalContent[key('excerpt')] = { de: loc(a.excerpt, 'de'), en: hasEn ? loc(a.excerpt, 'en') : undefined };
    journalContent[key('date')] = { de: dateLabel(a, 'de'), en: dateLabel(a, 'en') };
    const opts = a.floatingCta ? { inlineCta: AVATAR } : undefined;
    journalContent[key('content')] = {
      de: editionNote(a, 'de') + renderBlocks(a.blocks, 'de', opts),
      en: hasEn ? editionNote(a, 'en') + renderBlocks(a.blocks, 'en', opts) : undefined,
    };
    // Optional header/footer fields, keyed like the rest so t() resolves them.
    const perLang = (fn) => ({ de: fn('de'), en: hasEn ? fn('en') : undefined });
    const sourcesHtml = (lang) => (a.sources || []).map((s) => '<li>' + loc(s, lang) + '</li>').join('');
    if (a.kicker) journalContent[key('kicker')] = perLang((l) => loc(a.kicker, l));
    if (a.dek) journalContent[key('dek')] = perLang((l) => loc(a.dek, l));
    if (a.heroCap) journalContent[key('heroCap')] = perLang((l) => loc(a.heroCap, l));
    if (a.sources && a.sources.length) journalContent[key('sources')] = perLang(sourcesHtml);

    // Structured data inputs (Article + FAQPage JSON-LD), plain text per language.
    const plain = (v, l) => decodeEntities(stripTags(loc(v, l))).replace(/\s+/g, ' ').trim();
    const faqItems = (a.blocks || []).filter((b) => b.t === 'faq').flatMap((b) => b.items || []);
    const places = (a.blocks || [])
      .filter((b) => b.t === 'overview' && (b.variant === 'index' || b.variant === 'rank' || !b.variant))
      .flatMap((b) => (b.items || []).map((it) => plain(it.title, 'de')));
    const seo = (l) => ({ title: plain(a.seoTitle, l) || undefined, description: plain(a.seoDescription, l) || undefined });
    const cta = (l) => ({ title: loc(a.cta.title, l) || undefined, text: loc(a.cta.text, l) || undefined, button: loc(a.cta.button, l) || undefined });

    const readMin = (l) => {
      const rt = typeof a.readTime === 'string' ? a.readTime : a.readTime && (a.readTime[l] || a.readTime.de);
      const m = String(rt || '').match(/\d+/);
      return m ? Number(m[0]) : undefined;
    };

    (isPage ? journalPages : journalPosts).push({
      id: `j-${a.slug}`,
      slug: a.slug,
      slugDe: a.slugDe,
      titleKey: key('title'),
      excerptKey: key('excerpt'),
      dateKey: key('date'),
      date: a.date,
      image: a.hero || a.thumb || '',
      ogImage: a.ogImage || a.hero || a.thumb || undefined,
      noHero: !a.hero || undefined,
      pinned: a.pinned || undefined,
      contentKey: key('content'),
      titleHtml: hasEn ? loc(a.title, 'en') : undefined,
      titleHtmlDe: loc(a.title, 'de'),
      author: a.author || DEFAULT_AUTHOR,
      tags: (a.tags && a.tags.en) || [],
      tagsDe: (a.tags && a.tags.de) || undefined,
      language: langFlag(languages),
      isJournal: true,
      category: a.category || undefined,
      kickerKey: a.kicker ? key('kicker') : undefined,
      heroCapKey: a.heroCap ? key('heroCap') : undefined,
      heroCredit: a.heroCredit || undefined,
      sourcesKey: a.sources && a.sources.length ? key('sources') : undefined,
      dekKey: a.dek ? key('dek') : undefined,
      seo: a.seoTitle || a.seoDescription ? perLang(seo) : undefined,
      cta: a.cta ? perLang(cta) : undefined,
      faq: faqItems.length ? perLang((l) => faqItems.map((it) => ({ q: plain(it.q, l), a: plain(it.a, l) }))) : undefined,
      about: places.length ? places : undefined,
      // Facelift template (layout 'v2') and update/redirect metadata.
      layout: a.layout || undefined,
      updated: a.updated || undefined,
      updatedDisplay: a.updatedDisplay ? perLang((l) => a.updatedDisplay[l] || a.updatedDisplay.de) : undefined,
      datePrefix: a.datePrefix || undefined,
      readMinutes: readMin('de'),
      heroAlt: a.heroAlt ? perLang((l) => plain(a.heroAlt, l)) : undefined,
      heroLook: a.heroLook || undefined,
      floatingCta: a.floatingCta || undefined,
      sourcesTitle: a.sourcesTitle ? perLang((l) => plain(a.sourcesTitle, l)) : undefined,
      hasCtaBlock: (a.blocks || []).some((b) => b.t === 'cta') || undefined,
      redirectFrom: a.redirectFrom && a.redirectFrom.length ? a.redirectFrom : undefined,
      path: isPage ? a.path || '/' + a.slug : undefined,
      canonical: a.canonical || undefined,
    });
  }

  const banner =
    '// AUTO-GENERATED by scripts/generate-journal.cjs — DO NOT EDIT.\n' +
    '// Source of truth: content/journal/*.json. Regenerate: `npm run gen:journal`.\n' +
    "import type { BlogPost } from './blogData';\n\n";

  const body =
    banner +
    'export const journalPosts: BlogPost[] = ' +
    JSON.stringify(journalPosts, null, 2) +
    ';\n\n' +
    '// Pages that use the article template outside /blog (content/pages/*.json).\n' +
    'export const journalPages: BlogPost[] = ' +
    JSON.stringify(journalPages, null, 2) +
    ';\n\n' +
    'export const journalContent: Record<string, { de?: string; en?: string }> = ' +
    JSON.stringify(journalContent, null, 2) +
    ';\n';

  fs.writeFileSync(OUT_FILE, body, 'utf8');
  console.log(`[generate-journal] ${journalPosts.length} article(s), ${journalPages.length} page(s) → src/utils/journalGenerated.ts`);
}

build();
