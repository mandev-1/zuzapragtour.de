// Editor-side helpers for the bilingual block model.
import type { Lang, Localized, Block, JournalArticle, BlockType } from '../types/journal';

export const CATEGORIES = [
  'Reiseführer',
  'Reiserouten',
  'Wahrzeichen',
  'Geschichte',
  'Verstecktes Prag',
  'Kultur',
  'Kulinarik',
];

export interface BlockMeta {
  t: BlockType;
  label: string;
  icon: string;
  desc: string;
}

export const BLOCK_TYPES: BlockMeta[] = [
  { t: 'p', label: 'Absatz', icon: 'notes', desc: 'Fließtext' },
  { t: 'h2', label: 'Überschrift', icon: 'title', desc: 'Abschnitt' },
  { t: 'quote', label: 'Zitat', icon: 'format_quote', desc: 'Pull-Quote' },
  { t: 'callout', label: 'Hinweis', icon: 'lightbulb', desc: 'Tipp-Box' },
  { t: 'image', label: 'Bild', icon: 'image', desc: 'Foto + Unterschrift' },
  { t: 'costTable', label: 'Kostentabelle', icon: 'table_rows', desc: 'Preise' },
  { t: 'map', label: 'Karte', icon: 'map', desc: 'Tour-Stationen' },
  { t: 'ornament', label: 'Zierde', icon: 'auto_awesome', desc: 'Trenner' },
];

/**
 * Strict editor getter — unlike the public renderer this does NOT fall back from
 * en→de, so an untranslated English field shows empty (prompting a translation)
 * rather than silently echoing the German.
 */
export function getL(v: Localized | undefined, lang: Lang): string {
  if (v == null) return '';
  if (typeof v === 'string') return v; // shared value — shows in both languages
  return v[lang] ?? '';
}

/** Set one language on a Localized value, promoting a plain string to { de, en }. */
export function setL(v: Localized | undefined, lang: Lang, val: string): Localized {
  const cur: { de?: string; en?: string } =
    v && typeof v === 'object' ? { ...v } : typeof v === 'string' ? { de: v } : {};
  cur[lang] = val;
  return cur as Localized;
}

export function titlePlain(a: JournalArticle, lang: Lang = 'de'): string {
  return getL(a.title, lang).replace(/<[^>]+>/g, '').trim();
}

export function readTimeLabel(rt: JournalArticle['readTime'], lang: Lang): string {
  if (!rt) return '';
  if (typeof rt === 'string') return rt;
  return rt[lang] ?? rt.de ?? rt.en ?? '';
}

const WORDS_PER_MIN = 200;
const stripText = (s: string) => s.replace(/<[^>]+>/g, ' ');
const locLoose = (v: Localized | undefined, lang: Lang) => getL(v, lang) || getL(v, 'de');

/** Extract the readable text of a block in one language, for word counting. */
function blockText(b: any, lang: Lang): string {
  switch (b.t) {
    case 'p':
    case 'h2':
    case 'quote':
      return stripText(locLoose(b.html, lang));
    case 'callout':
      return stripText(locLoose(b.label, lang)) + ' ' + stripText(locLoose(b.html, lang)) +
        (b.list ? ' ' + b.list.map((x: any) => stripText(locLoose(x, lang))).join(' ') : '');
    case 'image':
      return stripText(locLoose(b.cap, lang));
    case 'list':
      return (b.items || []).map((x: any) => stripText(locLoose(x, lang))).join(' ');
    case 'costTable':
    case 'facts':
      return (b.title ? stripText(locLoose(b.title, lang)) + ' ' : '') +
        (b.rows || b.items || []).map((r: any) => stripText(locLoose(r.k, lang)) + ' ' + stripText(locLoose(r.v, lang))).join(' ');
    case 'map':
      return (b.points || []).map((p: any) => stripText(locLoose(p.label, lang)) + ' ' + stripText(locLoose(p.note, lang))).join(' ');
    default:
      return '';
  }
}

/** Estimated reading minutes from the article's word count (~200 wpm, min 1). */
export function computeReadMinutes(a: JournalArticle, lang: Lang): number {
  let words = 0;
  for (const b of a.blocks || []) {
    const t = blockText(b, lang).trim();
    if (t) words += t.split(/\s+/).filter(Boolean).length;
  }
  return Math.max(1, Math.round(words / WORDS_PER_MIN));
}

/** Stored reading-time label if set, otherwise the computed estimate. */
export function readTimeLabelFor(a: JournalArticle, lang: Lang): string {
  const stored = readTimeLabel(a.readTime, lang);
  if (stored && stored.trim()) return stored;
  const m = computeReadMinutes(a, lang);
  return lang === 'de' ? `${m} Min.` : `${m} min`;
}

export function dateLabel(a: JournalArticle, lang: Lang): string {
  return (a.dateDisplay && (a.dateDisplay[lang] || a.dateDisplay.de)) || a.date || '';
}

export function isBilingual(a: JournalArticle): boolean {
  return (a.languages || []).includes('en');
}

/** A fresh block of the given type, German text by default (English left empty). */
export function freshBlock(t: BlockType): Block {
  switch (t) {
    case 'h2':
      return { t: 'h2', html: { de: 'Neue Überschrift' } };
    case 'quote':
      return { t: 'quote', html: { de: 'Ein Satz, der bleibt …' }, by: 'Zuzana' };
    case 'callout':
      return { t: 'callout', label: { de: 'Hinweis' }, html: { de: '<p>Ein praktischer Hinweis für Ihre Gäste.</p>' } };
    case 'image':
      return { t: 'image', src: '', cap: { de: 'Bildunterschrift' } };
    case 'costTable':
      return { t: 'costTable', title: { de: 'Was es kostet' }, rows: [{ k: { de: 'Eintritt' }, v: '250 Kč' }, { k: { de: 'Führung' }, v: { de: 'auf Anfrage' } }] };
    case 'map':
      return {
        t: 'map',
        title: { de: 'Karte' },
        mode: 'illustrated',
        route: true,
        list: true,
        caption: { de: '' },
        points: [
          { coord: [50.0875, 14.4213], label: { de: 'Altstädter Ring' }, note: { de: 'Astronomische Uhr und Teynkirche.' } },
          { coord: [50.0865, 14.4114], label: { de: 'Karlsbrücke' }, note: { de: 'Am frühen Morgen am schönsten.' } },
        ],
      };
    case 'ornament':
      return { t: 'ornament' };
    default:
      return { t: 'p', html: { de: 'Neuer Absatz — hier schreiben …' } };
  }
}

/** A blank draft article ready for the editor. */
export function blankArticle(): JournalArticle {
  const today = new Date().toISOString().slice(0, 10);
  const stamp = Date.now().toString(36).slice(-4);
  return {
    slug: `neuer-artikel-${stamp}`,
    languages: ['de'],
    status: 'draft',
    date: today,
    dateDisplay: { de: '' },
    category: 'Reiseführer',
    readTime: { de: '' },
    hero: '',
    heroCap: { de: '' },
    title: { de: 'Unbenannter Artikel' },
    excerpt: { de: 'Beginnen Sie hier mit dem Vorspann …' },
    tags: { de: [] },
    author: 'Ing. Zuzana Manová',
    blocks: [{ t: 'p', lead: true, html: { de: 'Erzählen Sie Ihre Geschichte …' } }],
  };
}

export const clone = <T,>(o: T): T => JSON.parse(JSON.stringify(o));
