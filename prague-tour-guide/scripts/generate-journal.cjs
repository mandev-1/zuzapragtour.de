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
const { renderBlocks, loc } = require('./render-blocks.cjs');

const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'journal');
const OUT_FILE = path.join(ROOT, 'src', 'utils', 'journalGenerated.ts');

const DEFAULT_AUTHOR = 'Ing. Zuzana Manová';

function readArticles() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const full = path.join(CONTENT_DIR, f);
      try {
        return JSON.parse(fs.readFileSync(full, 'utf8'));
      } catch (e) {
        throw new Error(`Invalid JSON in content/journal/${f}: ${e.message}`);
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
  const journalContent = {};

  for (const a of articles) {
    if (!a.slug) throw new Error('Journal article missing slug');
    const languages = a.languages && a.languages.length ? a.languages : ['de'];
    const hasEn = languages.includes('en');
    const key = (suffix) => `journal.${a.slug}.${suffix}`;

    journalContent[key('title')] = { de: loc(a.title, 'de'), en: hasEn ? loc(a.title, 'en') : undefined };
    journalContent[key('excerpt')] = { de: loc(a.excerpt, 'de'), en: hasEn ? loc(a.excerpt, 'en') : undefined };
    journalContent[key('date')] = { de: dateLabel(a, 'de'), en: dateLabel(a, 'en') };
    journalContent[key('content')] = {
      de: editionNote(a, 'de') + renderBlocks(a.blocks, 'de'),
      en: hasEn ? editionNote(a, 'en') + renderBlocks(a.blocks, 'en') : undefined,
    };

    journalPosts.push({
      id: `j-${a.slug}`,
      slug: a.slug,
      slugDe: a.slugDe,
      titleKey: key('title'),
      excerptKey: key('excerpt'),
      dateKey: key('date'),
      date: a.date,
      image: a.hero || '',
      ogImage: a.ogImage || a.hero || undefined,
      contentKey: key('content'),
      titleHtml: hasEn ? loc(a.title, 'en') : undefined,
      titleHtmlDe: loc(a.title, 'de'),
      author: a.author || DEFAULT_AUTHOR,
      tags: (a.tags && a.tags.en) || [],
      tagsDe: (a.tags && a.tags.de) || undefined,
      language: langFlag(languages),
      isJournal: true,
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
    'export const journalContent: Record<string, { de?: string; en?: string }> = ' +
    JSON.stringify(journalContent, null, 2) +
    ';\n';

  fs.writeFileSync(OUT_FILE, body, 'utf8');
  console.log(`[generate-journal] ${journalPosts.length} article(s) → src/utils/journalGenerated.ts`);
}

build();
