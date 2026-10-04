// ============================================================================
// Shared journal/article schema — the contract between the admin CMS editor and
// the public site renderer.
//
// IMPORTANT: keep this file byte-for-byte identical in BOTH places:
//   prague-tour-guide/src/types/journal.ts   (public site — renders blocks)
//   admin/src/types/journal.ts               (admin editor — edits blocks)
//
// A localizable value is `Localized`: either a plain string (same text in both
// languages — e.g. a price "250 Kč" or coordinates) or { de, en? }. When `en`
// is absent the article is German-only for that field; renderers fall back to
// `de`. Article-level `languages` is the source of truth for which languages an
// article actually publishes.
// ============================================================================

export type Lang = 'de' | 'en';

/** Same in both languages (plain string) OR localized per language. */
export type Localized = string | { de: string; en?: string };

export interface MapPoint {
  coord: [number, number]; // [lat, lng]
  label?: Localized;
  note?: Localized;
}

/**
 * Fact-check verdict tone — drives the badge colour.
 * refuted = burgundy (Widerlegt), open = blue (Ungeklärt),
 * unproven = muted grey (Unbelegt / Ohne Grundlage / Sage).
 */
export type Verdict = 'refuted' | 'open' | 'unproven';

/** One row of an `overview` block — an in-page link to a chapter. */
export interface OverviewItem {
  /** Link target, usually an in-page anchor like '#ort-1'. */
  href: string;
  /** Number shown in the left column ('index' variant only). */
  n?: string;
  /** Place name ('index') or the quoted claim ('claims'). */
  title: Localized;
  /** Short description ('index') or the chapter reference, e.g. 'Ort 2' ('claims'). */
  desc?: Localized;
  /** 'claims' variant: verdict tone + badge text. */
  verdict?: Verdict;
  verdictLabel?: Localized;
}

export type Block =
  | { t: 'p'; html: Localized; lead?: boolean }
  /** `id` = optional in-page anchor (e.g. 'praktisch'); otherwise heading-N is assigned. */
  | { t: 'h2'; html: Localized; id?: string }
  | { t: 'quote'; html: Localized; by?: string }
  | { t: 'callout'; label?: Localized; html: Localized; list?: Localized[] }
  | {
      t: 'image';
      src: string;
      cap?: Localized;
      alt?: Localized;
      /** Photo credit, rendered after the caption as "Bild: …" / "Photo: …". */
      credit?: string;
      /** full = column width (default) · medium = max 480px, caption below ·
       *  side = max 360px, caption beside (portrait photos). */
      layout?: 'full' | 'medium' | 'side';
      /** Crop aspect ratio, e.g. '3/2' | '16/9' | '4/3' | '1/1'. Omitted = natural. */
      aspect?: string;
      /** Focal point 0–100 (object-position) used when cropped. Default 50/50. */
      focus?: { x: number; y: number };
    }
  | { t: 'costTable'; title?: Localized; rows: { k: Localized; v: Localized }[]; note?: Localized }
  | { t: 'list'; ordered?: boolean; items: Localized[] }
  /** Key/value rows (e.g. Anfahrt, Eintritt). Header row only when `title` is set. */
  | { t: 'facts'; title?: Localized; items: { k: Localized; v: Localized }[] }
  /** Numbered chapter head: label row ('Ort 1' · meta) over a serif H2. */
  | { t: 'chapter'; id?: string; label: Localized; meta?: Localized; html: Localized }
  /** Legend / claim box with a verdict badge. */
  | { t: 'factcheck'; label?: Localized; verdict: Verdict; verdictLabel: Localized; claim: Localized; html: Localized }
  /** Linked overview list. 'index' = numbered places · 'claims' = claims + verdict badges. */
  | { t: 'overview'; variant: 'index' | 'claims'; id?: string; title?: Localized; intro?: Localized; items: OverviewItem[] }
  | {
      t: 'map';
      title?: Localized;
      mode?: 'illustrated' | 'embed';
      route?: boolean;
      list?: boolean;
      caption?: Localized;
      embedUrl?: string;
      points: MapPoint[];
    }
  | { t: 'ornament' };

export type BlockType = Block['t'];

export type ArticleStatus = 'published' | 'draft' | 'scheduled';

export interface JournalArticle {
  /** URL slug (primary / English when bilingual). */
  slug: string;
  /** Optional separate German slug. */
  slugDe?: string;
  /** Languages this article publishes. ['de'] = German-only, ['de','en'] = bilingual. */
  languages: Lang[];
  status: ArticleStatus;
  /** ISO date (YYYY-MM-DD) — used for sorting and <time>. */
  date: string;
  /** Human display date per language, e.g. { de: 'Mai 2026', en: 'May 2026' }. */
  dateDisplay?: { de?: string; en?: string };
  category?: string;
  /** Line above the title (e.g. 'Prager Geschichte'). Defaults to the category. */
  kicker?: Localized;
  /** Reading-time label per language, or a single shared string. */
  readTime?: { de?: string; en?: string } | string;
  /** Hero image path, absolute under /images (e.g. '/images/autumn-prague.jpg'). */
  hero?: string;
  heroCap?: Localized;
  /** Hero photo credit, e.g. 'Unsplash+' → "Bild: Unsplash+". */
  heroCredit?: string;
  /** Title — HTML allowed (an <em> renders the burgundy-italic accent word). */
  title: Localized;
  /** Standfirst / teaser — also used as card blurb + SEO meta description. */
  excerpt?: Localized;
  tags?: { de?: string[]; en?: string[] };
  /** Defaults to 'Ing. Zuzana Manová' when omitted. */
  author?: string;
  ogImage?: string;
  /** Edition label for a revision published alongside the old one, e.g. "2027". */
  edition?: string;
  /** Slug of the previous edition this article supersedes (kept live). */
  supersedes?: string;
  /** Source list (HTML allowed, one entry per item), shown after the closing CTA. */
  sources?: Localized[];
  blocks: Block[];
}
