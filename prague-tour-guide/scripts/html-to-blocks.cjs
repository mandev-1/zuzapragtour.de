/* ============================================================================
   html-to-blocks.cjs — convert ONE legacy post into a block-based journal
   article. Gradual migration aid (no big bang): pick a post, review the JSON,
   then refine in the admin editor.

     node scripts/html-to-blocks.cjs --post=30
     node scripts/html-to-blocks.cjs --post=30 --readtime="9 Min." --dry-run

   Reads the existing HTML content + metadata from src/utils/blogTranslations.ts
   and src/utils/blogData.ts, parses the HTML into blocks (heuristic), zips the
   German + English versions into bilingual blocks when their structure matches,
   and writes content/journal/<slug>.json.

   It is heuristic: it handles the common patterns (lead/p/h2/blockquote/figure/
   callout/cost-table/list/ornament) and warns on anything uncertain. Always
   eyeball the result and finish in the editor.
   ============================================================================ */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TL = fs.readFileSync(path.join(ROOT, 'src/utils/blogTranslations.ts'), 'utf8');
const BD = fs.readFileSync(path.join(ROOT, 'src/utils/blogData.ts'), 'utf8');

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = /^--([^=]+)(?:=(.*))?$/.exec(a);
    return m ? [m[1], m[2] === undefined ? true : m[2]] : [a, true];
  })
);
const N = args.post;
if (!N) { console.error('Usage: node scripts/html-to-blocks.cjs --post=<number> [--readtime="9 Min."] [--dry-run]'); process.exit(1); }

// ── extract translation entries ──────────────────────────────────────────────
function tlBacktick(key) {
  const at = TL.indexOf(`'${key}'`);
  if (at === -1) return null;
  const seg = TL.slice(at);
  const en = /en:\s*`([\s\S]*?)`/.exec(seg);
  const de = /de:\s*`([\s\S]*?)`/.exec(seg);
  return { en: en ? en[1] : null, de: de ? de[1] : null };
}
function tlQuoted(key) {
  const at = TL.indexOf(`'${key}'`);
  if (at === -1) return null;
  const seg = TL.slice(at, at + 4000);
  const grab = (lang) => {
    const re = new RegExp(lang + ":\\s*(['\"])((?:\\\\.|(?!\\1).)*)\\1");
    const m = re.exec(seg);
    return m ? m[2].replace(/\\'/g, "'").replace(/\\"/g, '"') : null;
  };
  return { en: grab('en'), de: grab('de') };
}

const content = tlBacktick(`blog.post${N}.content`);
if (!content || (!content.de && !content.en)) { console.error(`No content found for blog.post${N}.content`); process.exit(1); }
const titleTL = tlQuoted(`blog.post${N}.title`) || {};
const excerptTL = tlQuoted(`blog.post${N}.excerpt`) || {};
const dateTL = tlQuoted(`blog.post${N}.date`) || {};

// ── extract metadata from blogData.ts ────────────────────────────────────────
const ci = BD.indexOf(`'blog.post${N}.content'`);
const meta = {};
if (ci !== -1) {
  const open = BD.lastIndexOf('{', ci);
  const close = BD.indexOf('},', ci);
  const obj = BD.slice(open, close === -1 ? BD.length : close);
  const get = (re) => { const m = re.exec(obj); return m ? m[1] : undefined; };
  meta.slug = get(/\bslug:\s*'([^']+)'/);
  meta.slugDe = get(/\bslugDe:\s*'([^']+)'/);
  meta.image = get(/\bimage:\s*'([^']+)'/);
  meta.ogImage = get(/\bogImage:\s*'([^']+)'/);
  meta.date = get(/\bdate:\s*'([^']+)'/);
  meta.language = get(/\blanguage:\s*'([^']+)'/) || 'de';
  meta.author = get(/\bauthor:\s*'([^']+)'/) || 'Ing. Zuzana Manová';
  meta.titleHtml = get(/\btitleHtml:\s*'((?:\\.|[^'])*)'/);
  meta.titleHtmlDe = get(/\btitleHtmlDe:\s*'((?:\\.|[^'])*)'/);
  const arr = (name) => {
    const m = new RegExp(name + ':\\s*\\[([\\s\\S]*?)\\]').exec(obj);
    return m ? [...m[1].matchAll(/'((?:\\.|[^'])*)'/g)].map((x) => x[1].replace(/\\'/g, "'")) : undefined;
  };
  meta.tags = arr('tags');
  meta.tagsDe = arr('tagsDe');
}

// Strip an outer .blog-content / .blog-post-content wrapper div if the whole
// body is wrapped in one (several legacy posts are).
function unwrap(html) {
  const h = (html || '').trim();
  const m = /^<div[^>]*class="[^"]*(?:blog-content|blog-post-content)[^"]*"[^>]*>([\s\S]*)<\/div>\s*$/.exec(h);
  return m ? m[1].trim() : h;
}

// ── HTML → top-level nodes (depth-tracking splitter) ─────────────────────────
function topLevelNodes(html) {
  const s = (html || '').trim();
  const nodes = [];
  let i = 0;
  while (i < s.length) {
    if (s[i] !== '<') { const nx = s.indexOf('<', i); const t = s.slice(i, nx === -1 ? s.length : nx); if (t.trim()) nodes.push({ tag: 'p', attrs: '', html: t.trim() }); if (nx === -1) break; i = nx; continue; }
    const open = /^<([a-zA-Z0-9]+)([^>]*?)(\/?)>/.exec(s.slice(i));
    if (!open) { i++; continue; }
    const tag = open[1].toLowerCase();
    const attrs = open[2] || '';
    if (open[3] === '/' || ['br', 'hr', 'img'].includes(tag)) { nodes.push({ tag, attrs, html: '' }); i += open[0].length; continue; }
    let depth = 1; let j = i + open[0].length;
    while (j < s.length && depth > 0) {
      const no = s.indexOf('<' + tag, j);
      const nc = s.indexOf('</' + tag + '>', j);
      if (nc === -1) { depth = 0; j = s.length; break; }
      if (no !== -1 && no < nc && /[ >/\n\t]/.test(s[no + 1 + tag.length] || '>')) { depth++; j = no + 1 + tag.length; }
      else { depth--; j = nc + tag.length + 3; if (depth === 0) { const outer = s.slice(i, j); nodes.push({ tag, attrs, html: outer.replace(/^<[^>]+>/, '').replace(new RegExp('</' + tag + '>$'), '') }); } }
    }
    i = j;
  }
  return nodes;
}

const clsOf = (attrs) => (/class="([^"]*)"/.exec(attrs || '') || [])[1] || '';

function classify(node) {
  const cls = clsOf(node.attrs);
  const tag = node.tag;
  const html = (node.html || '').trim();
  if (tag === 'p') return { t: 'p', lead: /\blead\b/.test(cls), html };
  if (tag === 'h2' || tag === 'h3') return { t: 'h2', html };
  if (tag === 'blockquote') {
    const cite = /<cite[^>]*>([\s\S]*?)<\/cite>/.exec(html);
    let body = html.replace(/<cite[\s\S]*?<\/cite>/, '').trim().replace(/^<p>/, '').replace(/<\/p>$/, '').trim();
    return { t: 'quote', html: body, by: cite ? cite[1].replace(/<[^>]+>/g, '').replace(/^—\s*/, '').trim() : undefined };
  }
  if (tag === 'figure' || /blog-inline-image/.test(cls)) {
    const src = (/<img[^>]*\bsrc="([^"]*)"/.exec(html) || [])[1] || '';
    const cap = (/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/.exec(html) || [])[1];
    return { t: 'image', src, cap: cap ? cap.trim() : undefined };
  }
  if (tag === 'ul' || tag === 'ol') {
    const items = [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((m) => m[1].trim());
    return { t: 'list', ordered: tag === 'ol', items };
  }
  if (/artikel-ornament/.test(cls)) return { t: 'ornament' };
  if (/blog-cta-box/.test(cls)) return null; // public renderer supplies its own CTA
  if (/callout-box|did-you-know/.test(cls)) {
    const label = (/(?:__label|<h4)[^>]*>([\s\S]*?)<\//.exec(html) || [])[1];
    let text = html.replace(/<(?:p class="callout-box__label"|h4)[\s\S]*?<\/(?:p|h4)>/, '');
    const inner = /callout-box__text[^>]*>([\s\S]*?)<\/div>\s*$/.exec(text);
    return { t: 'callout', label: label ? label.trim() : undefined, html: (inner ? inner[1] : text).trim() };
  }
  if (/cost-table/.test(cls)) {
    const header = (/cost-table-header[^>]*>([\s\S]*?)<\//.exec(html) || [])[1];
    const rows = [...html.matchAll(/cost-table-label[^>]*>([\s\S]*?)<\/span>[\s\S]*?cost-table-amount[^>]*>([\s\S]*?)<\/span>/g)].map((m) => ({ k: m[1].trim(), v: m[2].trim() }));
    return { t: 'costTable', title: header ? header.trim() : undefined, rows };
  }
  return html ? { t: 'p', html } : null;
}

// ── localize / merge de+en ───────────────────────────────────────────────────
const L = (de, en) => {
  if (de == null && en == null) return undefined;
  if (en == null) return { de: de || '' };
  if ((de || '') === (en || '')) return de || '';
  return { de: de || '', en: en || '' };
};
function merge(d, e) {
  switch (d.t) {
    case 'p': return { t: 'p', ...(d.lead ? { lead: true } : {}), html: L(d.html, e && e.html) };
    case 'h2': return { t: 'h2', html: L(d.html, e && e.html) };
    case 'quote': return { t: 'quote', html: L(d.html, e && e.html), ...(d.by ? { by: d.by } : {}) };
    case 'callout': return { t: 'callout', label: L(d.label, e && e.label), html: L(d.html, e && e.html) };
    case 'image': return { t: 'image', src: d.src, ...(d.cap || (e && e.cap) ? { cap: L(d.cap, e && e.cap) } : {}) };
    case 'costTable': return { t: 'costTable', title: L(d.title, e && e.title), rows: d.rows.map((r, i) => ({ k: L(r.k, e && e.rows && e.rows[i] && e.rows[i].k), v: L(r.v, e && e.rows && e.rows[i] && e.rows[i].v) })) };
    case 'list': return { t: 'list', ...(d.ordered ? { ordered: true } : {}), items: d.items.map((it, i) => L(it, e && e.items && e.items[i])) };
    default: return d;
  }
}

const deBlocks = topLevelNodes(unwrap(content.de)).map(classify).filter(Boolean);
const enNodes = content.en ? topLevelNodes(unwrap(content.en)).map(classify).filter(Boolean) : null;
let blocks;
const bilingual = !!(content.en && meta.language === 'both');
if (bilingual && enNodes && enNodes.length === deBlocks.length) {
  blocks = deBlocks.map((d, i) => merge(d, enNodes[i]));
} else {
  if (bilingual) console.warn(`⚠ DE/EN block counts differ (de=${deBlocks.length}, en=${enNodes ? enNodes.length : 0}); writing German blocks only — translate in the editor.`);
  blocks = deBlocks.map((d) => merge(d, null));
}

// ── assemble the article ─────────────────────────────────────────────────────
const languages = meta.language === 'both' ? ['de', 'en'] : meta.language === 'en' ? ['en'] : ['de'];
const hasEn = languages.includes('en');
const slug = meta.slug || `post-${N}`;
const titleDe = meta.titleHtmlDe || titleTL.de || `Artikel ${N}`;
const titleEn = meta.titleHtml || titleTL.en;
const title = L(titleDe, hasEn ? titleEn : null);
const article = {
  slug,
  ...(meta.slugDe && meta.slugDe !== slug ? { slugDe: meta.slugDe } : {}),
  languages,
  status: 'draft', // migrated posts land as drafts for review
  date: meta.date || new Date().toISOString().slice(0, 10),
  dateDisplay: { de: dateTL.de || '', ...(hasEn ? { en: dateTL.en || '' } : {}) },
  category: 'Reiseführer',
  readTime: { de: args.readtime || '', ...(hasEn ? { en: '' } : {}) },
  hero: meta.image || '',
  title: typeof title === 'string' ? { de: title } : title,
  excerpt: L(excerptTL.de, hasEn ? excerptTL.en : null) || { de: excerptTL.de || '' },
  ...(meta.tags || meta.tagsDe ? { tags: { de: meta.tagsDe, en: meta.tags } } : {}),
  author: meta.author,
  ...(meta.ogImage ? { ogImage: meta.ogImage } : {}),
  blocks,
};

const outDir = path.join(ROOT, 'content', 'journal');
const outFile = path.join(outDir, `${slug}.json`);
const out = JSON.stringify(article, null, 2) + '\n';

console.log(`\n── post ${N} → ${slug} ── ${languages.join('+')} · ${blocks.length} blocks · status=draft`);
console.log(`   blocks: ${blocks.map((b) => b.t).join(', ')}`);
if (args['dry-run']) { console.log('\n(dry-run) JSON preview:\n'); console.log(out); process.exit(0); }
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, out, 'utf8');
console.log(`\n✓ wrote content/journal/${slug}.json (status: draft — review in the editor, then publish)\n`);
