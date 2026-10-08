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
  /** 'rank' variant: show the note in blue (e.g. "kostenlos"). */
  tone?: 'blue';
}

export type Block =
  | { t: 'p'; html: Localized; lead?: boolean }
  /** `id` = optional in-page anchor (e.g. 'praktisch'); otherwise heading-N is assigned.
   *  `sub` = optional grey subline under the heading. */
  | {
      t: 'h2';
      html: Localized;
      id?: string;
      sub?: Localized;
      /** Serif section heading opening a chapter (layout 'v2'); numbers as <span class="j-num">1.</span>. */
      section?: boolean;
      /** Section only: free-entry badge before the subline — true "Kostenlos", false "Eintritt". */
      free?: boolean;
      /** Section only: space above in px (default 48). */
      pad?: number;
    }
  | { t: 'h3'; html: Localized }
  | { t: 'quote'; html: Localized; by?: string }
  /** Default = blue "Das Wichtigste in Kürze" box · 'tip' = paper box with a burgundy label ("Mein Tipp"). */
  | { t: 'callout'; label?: Localized; html: Localized; list?: Localized[]; variant?: 'tip' }
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
  /** Key/value rows (e.g. Anfahrt, Eintritt); values may contain links. Header row
   *  only when `title` is set. 'schedule' = time plan (narrow time column, ink rule). */
  | {
      t: 'facts';
      title?: Localized;
      items: { k: Localized; v: Localized }[];
      /** 'schedule' = time plan · 'v2' = facelift rows (10rem label column). */
      variant?: 'schedule' | 'v2';
      /** v2 only: label width (default '10rem'), row padding px (10), margin (CSS), 'ink' = 2px dark top rule. */
      look?: { key?: string; pad?: number; margin?: string; rule?: 'ink' };
      /** Small grey line under the rows. */
      note?: Localized;
    }
  /** Questions and answers; also emitted as FAQPage structured data. */
  /** 'v2' = facelift look (light top rule, sans answers). */
  | { t: 'faq'; items: { q: Localized; a: Localized }[]; variant?: 'v2' }
  /** Numbered chapter head: label row ('Ort 1' · meta) over a serif H2. */
  | { t: 'chapter'; id?: string; label: Localized; meta?: Localized; html: Localized }
  /** Legend / claim box with a verdict badge. */
  | { t: 'factcheck'; label?: Localized; verdict: Verdict; verdictLabel: Localized; claim: Localized; html: Localized }
  /** Legend box of the facelift handoff; verdict text (Falsch / Plausibel / Roman / Stimmt / Sage)
   *  sets the colour. First <p> of `html` is the claim. Rendered like `factcheck`. */
  | { t: 'myth'; verdict: string; html: Localized; label?: Localized }
  /** Linked overview list. 'index' = numbered places · 'claims' = claims + verdict badges ·
   *  'toc' = name + description, no number · 'rank' = number · name · short note on the right. */
  | { t: 'overview'; variant: 'index' | 'claims' | 'toc' | 'rank'; id?: string; title?: Localized; intro?: Localized; items: OverviewItem[] }
  /** Two (or more) portrait photos side by side with one caption. `pos` = object-position. */
  | { t: 'gallery'; images: { src: string; alt?: Localized; pos?: string }[]; cap?: Localized; credit?: string }
  /** Booking call to action inside the article (the closing one, or one in between). */
  | { t: 'cta'; title: Localized; html: Localized; button: Localized; href?: string; /** 2em above instead of 2.4em */ tight?: boolean }
  /** "Weiterlesen": a titled list of links. */
  | { t: 'links'; title?: Localized; items: { href: string; text: Localized }[] }
  | {
      t: 'map';
      /** Embedded map page (iframe), e.g. '/maps/sehenswuerdigkeiten-prag.html'. Without it, `points` draw a map. */
      src?: string;
      title?: Localized;
      mode?: 'illustrated' | 'embed';
      route?: boolean;
      list?: boolean;
      caption?: Localized;
      embedUrl?: string;
      /** Empty for an embedded map page (`src`). */
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
  /** 'v2' = facelift template (design_handoff_blog_facelift): serif section headings,
   *  closing CTA and "Weiterlesen" as blocks, no author footer or related grid. */
  layout?: 'v2';
  /** ISO date (YYYY-MM-DD) of first publication — used for sorting and <time>. */
  date: string;
  /** Human display date per language, e.g. { de: 'Mai 2026', en: 'May 2026' }. */
  dateDisplay?: { de?: string; en?: string };
  /** Show the date as "Veröffentlicht am …" (pages without an update). */
  datePrefix?: boolean;
  /** ISO date of the last substantial update → update badge, dateModified, sitemap lastmod. */
  updated?: string;
  /** e.g. { de: 'Aktualisiert am 7. Oktober 2026' }. */
  updatedDisplay?: { de?: string; en?: string };
  /** Old URLs that 301 to this article (netlify.toml). */
  redirectFrom?: string[];
  /** Pages only (content/pages): site path outside /blog and its canonical URL. */
  path?: string;
  canonical?: string;
  category?: string;
  /** Line above the title (e.g. 'Prager Geschichte'). Defaults to the category. */
  kicker?: Localized;
  /** Reading-time label per language, or a single shared string. */
  readTime?: { de?: string; en?: string } | string;
  /** Hero image path, absolute under /images (e.g. '/images/autumn-prague.jpg'). */
  hero?: string;
  /** Card / social image for articles without a hero (the page then shows none). */
  thumb?: string;
  /** Keep this article in the featured slot of the journal index. */
  pinned?: boolean;
  heroCap?: Localized;
  /** Hero photo credit, e.g. 'Unsplash+' → "Bild: Unsplash+". */
  heroCredit?: string;
  heroAlt?: Localized;
  /** Hero crop: object-position and max height in px (default 'center 30%', 620). */
  heroLook?: { pos?: string; maxH?: number };
  /** Floating contact card / chip / mobile bar and the mobile inline card. */
  floatingCta?: boolean;
  /** Title — HTML allowed (an <em> renders the burgundy-italic accent word). */
  title: Localized;
  /** Teaser — card blurb, and the dek + meta description unless set below. */
  excerpt?: Localized;
  /** Longer standfirst under the title on the article page. Defaults to excerpt. */
  dek?: Localized;
  /** SEO overrides: <title> (site suffix is appended) and meta description. */
  seoTitle?: Localized;
  seoDescription?: Localized;
  /** Closing CTA panel texts; the phone number is appended to `text`. */
  cta?: { title?: Localized; text?: Localized; button?: Localized };
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
  /** Heading of the source list (default "Quellen"). */
  sourcesTitle?: Localized;
  blocks: Block[];
}
