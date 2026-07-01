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

export type Block =
  | { t: 'p'; html: Localized; lead?: boolean }
  | { t: 'h2'; html: Localized }
  | { t: 'quote'; html: Localized; by?: string }
  | { t: 'callout'; label?: Localized; html: Localized; list?: Localized[] }
  | {
      t: 'image';
      src: string;
      cap?: Localized;
      alt?: Localized;
      /** Crop aspect ratio, e.g. '3/2' | '16/9' | '4/3' | '1/1'. Omitted = natural. */
      aspect?: string;
      /** Focal point 0–100 (object-position) used when cropped. Default 50/50. */
      focus?: { x: number; y: number };
    }
  | { t: 'costTable'; title?: Localized; rows: { k: Localized; v: Localized }[] }
  | { t: 'list'; ordered?: boolean; items: Localized[] }
  | { t: 'facts'; title?: Localized; items: { k: Localized; v: Localized }[] }
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
  /** Reading-time label per language, or a single shared string. */
  readTime?: { de?: string; en?: string } | string;
  /** Hero image path, absolute under /images (e.g. '/images/autumn-prague.jpg'). */
  hero?: string;
  heroCap?: Localized;
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
  blocks: Block[];
}
