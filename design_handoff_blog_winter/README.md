# Handoff: Journal – „Prag im Winter“ (two articles + Journal index update)

## Overview
Two new German-language Journal articles for zuzapragtour.de (Zuza & Pragtour, private tours by Ing. Zuzana Manová). Both are about Prague in winter and cover the same five topics: Advent and Christmas concerts, opera and classical music, fine dining (Michelin), private palaces and libraries, and wellness (Prague spa and Karlsbad). They target two different audiences:

| | Article A | Article B |
|---|---|---|
| Title | Prag im Winter: zehn Erlebnisse mit Fotomoment – und fünf Mythen im Faktencheck | Prag im Winter: zehn Erlebnisse für Genießer – und fünf Mythen im Faktencheck |
| Audience | Affluent millennials who photograph / post on Instagram (CH, DE, AT) | Active, affluent seniors: Swiss, Germans from the former GDR, Austrians |
| Angle | Photo spot, best light, booking rules for every entry; „Ein Wintertag mit der Kamera“ plan | Step-free access, timing, cloakroom, holidays; Mozart quote; GDR embassy story 1989 |
| Suggested slug | `/blog/prag-winter-fotomomente` | `/blog/prag-winter-geniesser` |
| Date / reading time | 5. Oktober 2026 · 16 min | 5. Oktober 2026 · 17 min |
| Category | Prag erleben | Prag erleben |

Both articles use the same structure: the overview ranking table comes first, then 10 detailed entries, 5 fact-checked myths, practical tips, a dates table, an FAQ, a CTA for a private tour and a list of sources. The Journal index lists both as regular posts. The history article „Zehn Orte mit Geschichte“ stays featured.

## About the Design Files
The `.dc.html` files in this bundle are **design references made in HTML**. They show the intended look and content; they are not production code to copy. Open them in a browser with `support.js` in the same folder. `support.js` is only the preview runtime. Never deploy it.

The task is to **recreate these designs in the existing site codebase** (repo `mandev-1/zuzapragtour.de`, branch `zuzapragtour.de`, app in `prague-tour-guide/`) using its existing patterns. That means the blog post template in `src/screens/BlogPostPage.tsx`, the components in `src/components/blog/*` and `src/styles/blog-content.css`. The new article components (summary box, ranking table, myth table, entry section, fact-check box, practical rows, FAQ, sources) were first specified in `design_handoff_blog_orte`. If that article is already implemented, reuse its components and add only what is new here: the time-plan table, the dates table and the FAQ block.

## Fidelity
**High fidelity.** Copy (German, final, verbatim), colors, typography, spacing and component structure are all final. Recreate them pixel-accurately with the codebase's own components. The design is for desktop (≥ 1160 px), and everything reflows with flex-wrap and `clamp()` down to mobile. The complete copy is also in `content/*.md` for import into a CMS or MDX.

## Screens / Views

### 1. Article page (A and B share one template)
**Purpose:** a long-form article that a reader skims through the ranking table, then reads in depth or jumps from via anchors.

**Page frame**
- `body`: background `#FFFFFF`, text `#1A1714`, font smoothing antialiased, `::selection` background `#DCE6F2`. `html { scroll-behavior: smooth }`.
- Global links: `a { color:#11457E; text-decoration:none }`, `a:hover { color:#0B3360 }`.
- **Site header** (existing Header component): sticky, top 0, z-index 50, white background, 1 px bottom border `#E4DFD6`. Inner container max-width 1160 px, padding 0 20 px, min-height 64 px, flex with wrap, space-between, gap 10 px 24 px.
  - Logo „Zuza & Pragtour“: Newsreader 24/600, letter-spacing −0.01em.
  - Nav: Hanken Grotesk 15/500, gap 6 px 22 px. The active item „Journal“ is `#1A1714` with a 2 px bottom border `#6B1F2A` and padding 4 px 0. Other items are `#5C5650`, hover `#1A1714`.
  - Button „Tour buchen“: background `#6B1F2A`, white, padding 9 px 16 px, radius 4, weight 600, hover `#4F1620`.
- `main`: padding 0 20 px.
- **Footer** (existing Footer component): margin-top 72 px, background `#F6F4EF`, top border 1 px `#E4DFD6`.

**Article header** (column max-width 860 px, centered, padding-top `clamp(28px,5vw,48px)`)
- Breadcrumb „Journal › Prag erleben“: Hanken 14 px `#5C5650`. „Journal“ links to the index, hover `#1A1714`.
- Kicker „Prag im Winter“: margin-top 22 px, Hanken 16/700 `#11457E`.
- H1: margin-top 6 px, Newsreader 600, `clamp(2.1rem,4.6vw,3.2rem)`, line-height 1.12, letter-spacing −0.012em, `text-wrap: balance`.
- Dek: margin-top 18 px, Hanken 500, `clamp(1.12rem,1.6vw,1.25rem)`, line-height 1.5, `text-wrap: pretty`.
- Author bar: margin-top 24 px, padding 16 px 0, 1 px top and bottom borders `#E4DFD6`, flex with wrap, gap 12 px 20 px.
  - Portrait: 44×44 px, round, `object-fit:cover; object-position:center 18%`.
  - Name „Ing. Zuzana Manová“: Hanken 15/700, line-height 1.4. Role „Staatlich geprüfte Stadtführerin, Prag“: 15 px `#5C5650`.
  - Right block (`margin-left:auto`, right-aligned): Hanken 14 px `#5C5650`, line-height 1.4. Date, line break, „Lesezeit N Minuten“.
- There is no full-width hero image. Article A starts the body with a side figure; Article B has none.

**Body column**: max-width 860 px, centered, margin-top 32 px. Newsreader 20 px, line-height 1.65, `#1A1714`, `font-variant-numeric: oldstyle-nums`. Paragraphs have margin 0 0 1.1em and `text-wrap: pretty`.

**Components, in page order**
1. **Side figure** (A: top of body; B: inside entry 7 and in the tips section). Margin 28 px 0, flex with wrap, `align-items:flex-end`, gap 12 px 24 px.
   - Image: `flex:0 1 360px`, max-width 360 px, height auto, radius 8 px.
   - Caption: `flex:1 1 220px`, Hanken 14 px, line-height 1.45, `#5C5650`. Optional credit „Bild: …“ in `#8A847D`.
2. **Summary box „Das Wichtigste in Kürze“**: margin 0 0 2em, padding 20 px 22 px, background `#EEF3F9`, 3 px top border `#11457E`.
   - Label: Hanken 15/700 `#11457E`.
   - List: `ul` with margin-top 12 px and padding-left 20 px, Hanken 17 px, line-height 1.55, 6 px between items. 3 bullets.
3. **Intro**: 2 paragraphs.
4. **Pull quote** (B only, Mozart 1787): margin 1.6em 0.
   - Quote: Newsreader italic, `clamp(1.5rem,2.6vw,1.9rem)`, line-height 1.3.
   - Attribution: margin-top 10 px, Hanken 15 px `#5C5650`.
5. **Section heading** (used for overview, myths, tips, plan and FAQ): Hanken 24/700, line-height 1.25, `scroll-margin-top:80px`.
   - Margin is 2em 0 0.3em for the overview and myth headings, and 2.4em 0 0.4em for the later sections.
   - Optional subline: margin 0 0 0.6em, Hanken 15 px `#5C5650`.
6. **Ranking table „Die zehn Erlebnisse im Überblick“** (id `ueberblick`): 2 px top border `#1A1714`, Hanken. Each row is an `<a href="#e-N">` with flex wrap, baseline alignment, gap 4 px 16 px, padding 12 px 0, 1 px bottom border `#E4DFD6`, text `#1A1714`.
   - Number: 28 px wide, 16/700, tabular figures, `#6B1F2A`.
   - Name: `flex:1 1 240px`, 17/600, line-height 1.4.
   - Short description: `flex:1 1 300px`, 16 px, line-height 1.45, `#5C5650`.
7. **Myth table „Fünf Mythen im Faktencheck“** (id `mythen`): 2 px top border `#1A1714`. Rows are `<a href="#e-N">` with flex wrap, gap 6 px 16 px, padding 12 px 0, 1 px bottom border.
   - Claim: `flex:1 1 380px`, Newsreader 19 px italic, line-height 1.4.
   - Right side (gap 12 px): verdict badge, then „Nr. N“ in Hanken 14 px `#5C5650`, no wrapping.
8. **Entry section ×10**: `id="e-1"` … `"e-10"`, padding-top 48 px, `scroll-margin-top:72px`.
   - Label row: flex wrap, gap 4 px 14 px, padding-bottom 10 px, 2 px bottom border `#1A1714`. „Nr. N“ in Hanken 16/700 `#6B1F2A`, then the meta line in 15/500 `#5C5650`.
   - H2: margin 16 px 0 14 px, Newsreader 600, `clamp(1.75rem,3.2vw,2.25rem)`, line-height 1.16, letter-spacing −0.01em, balance.
   - 2–3 body paragraphs. Inline links are `#11457E` with an underline 1 px thick, offset 3 px.
   - Optional side figure (component 1).
   - Optional **fact-check box**: margin-top 8 px, padding 18 px 22 px 20 px, background `#F6F4EF`, 3 px top border in the verdict color.
     - Header row: flex wrap, gap 8 px 14 px. „Mythos im Faktencheck“ in Hanken 14/700, then the badge.
     - Claim: margin-top 10 px, Newsreader 22 px italic, line-height 1.35.
     - Explanation: margin-top 10 px, Hanken 17 px, line-height 1.55.
   - **Practical rows**: margin-top 22 px, 1 px top border `#E4DFD6`, Hanken 16 px, line-height 1.5. Each row has flex wrap, gap 2 px 16 px, padding 10 px 0 and a 1 px bottom border. Label `flex:0 0 8.5rem`, weight 700. Value `flex:1 1 280px`. Labels used: Fotomoment, Beste Zeit, Anfahrt, Danach, Ablauf, Reservieren, Garderobe, Plätze, Lage, Führungen, Gut zu wissen, Besichtigung, Dauer, Wege, Hirtenmesse, Auch gut.
9. **Time plan „Ein Wintertag mit der Kamera“** (A only, id `fotoplan`): margin 0.6em 0 2em, 2 px top border `#1A1714`, Hanken 16 px, line-height 1.5. Rows look like practical rows, but the time column is `flex:0 0 4.5rem`, bold, with tabular figures. 6 rows, from 8:00 to 19:00.
10. **Tips** (id `praktisch`): an intro paragraph, then an `ol` with padding-left 1.4em. Items have padding-left 4 px and 0.8em between them, and each starts with a lead phrase in `<strong>` weight 600. 7 items. In B there is a side figure (tram) between the intro and the list.
11. **Dates table „Wintertermine 2026/27“**: margin 1.6em 0 2em, Hanken 16 px, line-height 1.45.
    - Title: padding-bottom 8 px, 2 px bottom border `#1A1714`, 15/700.
    - Rows: flex wrap, space-between, gap 4 px 16 px, padding 9 px 0, 1 px bottom border. Value weight 600.
    - Note: margin-top 8 px, 14 px `#5C5650`.
12. **FAQ „Häufige Fragen“** (id `fragen`): a container with margin-top 0.6em and a 2 px top border `#1A1714`. Each item has padding 16 px 0 and a 1 px bottom border. Question is an H3 in Hanken 18/700, line-height 1.35. Answer is a body paragraph with margin-top 8 px. A has 5 questions, B has 6.
13. **Closing paragraph** and **CTA box**: margin-top 2em, padding 22 px, background `#F6F4EF`, flex wrap, `align-items:center`, gap 16 px 24 px.
    - Title „Prag im Winter mit Zuzana“: Hanken 15/700.
    - Text: Hanken 16 px, line-height 1.5, followed by the phone link `tel:+420721231933` (weight 600, underline offset 3 px).
    - Button „Private Tour anfragen“ links to `/book#contact-title`: background `#6B1F2A`, white, padding 12 px 20 px, radius 4, Hanken 15/600, hover `#4F1620`.
14. **Sources**: margin-top 56 px, padding-top 14 px, 3 px top border `#1A1714`, Hanken.
    - Heading „Quellen“: 20/700.
    - List: `ol` with margin-top 14 px and padding-left 1.4em, 15 px, line-height 1.55, `#2F2A26`, 6 px between items. Links are underlined (offset 3 px).

**Verdict badges**: Hanken 12.5 px/700, uppercase, letter-spacing 0.06em, 1.5 px solid border in the text color, radius 3 px, padding 2 px 8 px.
- Falsch: `#6B1F2A`
- Stimmt and Plausibel: `#11457E`
- Roman and Sage: `#5C5650`

**Content outline: Article A** (file `Blog Prag Winter Fotomomente.dc.html`)
| Nr. | Entry | Meta line | Myth (verdict) | Figure |
|---|---|---|---|---|
| 1 | Strahov-Bibliothek | Hradschin · seit 1143 | – | – |
| 2 | Lobkowicz-Palast | Prager Burg · täglich 13 Uhr | – | – |
| 3 | Staatsoper | Neustadt · eröffnet 1888 | – | – |
| 4 | Ständetheater | Altstadt · 29. Oktober 1787 | Ouvertüre in der Nacht vor der Premiere (Plausibel) | – |
| 5 | Rudolfinum | Altstadt · eröffnet 1885 | Mendelssohn auf dem Dach (Roman) | – |
| 6 | Weihnachtsmärkte und Hirtenmesse | Altstadt und Vinohrady · im Advent | Trdelník als Prager Spezialität (Falsch) | – |
| 7 | La Degustation Bohême Bourgeoise | Altstadt · Michelin-Stern seit 2012 | Böhmische Küche = Knödel (Falsch) | – |
| 8 | Gemeindehaus | Altstadt · eröffnet 1912 | – | – |
| 9 | Spa im Mandarin Oriental | Kleinseite · Kloster aus dem 14. Jahrhundert | Bierbäder als Kurtradition (Falsch) | – |
| 10 | Karlsbad | Westböhmen · rund zwei Stunden von Prag | – | – |

There is also a top side figure (winter cathedral). After the entries come the time plan (6 rows), 7 tips, the dates table, 5 FAQs, the CTA and 11 sources.

**Content outline: Article B** (file `Blog Prag Winter Genuss.dc.html`)
| Nr. | Entry | Meta line | Myth (verdict) | Figure |
|---|---|---|---|---|
| 1 | Staatsoper und Ständetheater | Neustadt und Altstadt · 1783 und 1888 | Ouvertüre (Plausibel) | – |
| 2 | Rudolfinum | Altstadt · 4. Januar 1896 | Mendelssohn (Roman) | – |
| 3 | Gemeindehaus | Altstadt · eröffnet 1912 | – | – |
| 4 | Lobkowicz-Palast | Prager Burg · täglich 13 Uhr | – | – |
| 5 | Deutsche Botschaft im Palais Lobkowicz | Kleinseite · 30. September 1989 | – | – |
| 6 | Strahov-Bibliothek | Hradschin · seit 1143 | – | – |
| 7 | Advent und Weihnachten | Ende November bis 6. Januar | Karpfen in der Badewanne (Stimmt) | winter cathedral |
| 8 | La Degustation Bohême Bourgeoise | Altstadt · Michelin-Stern seit 2012 | Böhmische Küche (Falsch) | – |
| 9 | Spa im Mandarin Oriental | Kleinseite · Kloster aus dem 14. Jahrhundert | – | – |
| 10 | Karlsbad | Westböhmen · rund zwei Stunden von Prag | Karl IV. und die Quelle (Sage) | – |

There is also the Mozart pull quote. After the entries come the tips „Ohne Bergauf: praktische Hinweise für den Winter“ (tram figure plus 7 items), the dates table, 6 FAQs, the CTA and 13 sources.

The full verbatim copy is in the `.dc.html` files, and also in `content/prag-winter-fotomomente.md` and `content/prag-winter-geniesser.md`.

### 2. Journal index (existing `src/components/Blog.tsx`)
No visual changes. There are two data changes:
- Add both posts with date `2026-10-05`, the titles above, category „Prag erleben“ and these excerpts:
  - A: „Strahov nur mit Fotoerlaubnis, ein Spa über einer gotischen Kirche, ein Mittagskonzert auf der Burg und ein Sternemenü nach einem Kochbuch von 1894. Mit der Uhrzeit, zu der das Licht am besten ist.“
  - B: „Oper im Haus von Fellner & Helmer, ein Konzert um 13 Uhr, der Balkon der Botschaft von 1989 und ein Tag in Karlsbad. Zehn Erlebnisse für den Prager Winter, ohne steile Wege.“
- The featured slot normally shows the newest post. Add a `pinned` flag so that „Zehn Orte mit Geschichte“ stays featured. Prototype logic:
  ```js
  const lead = isFiltering ? null : (sorted.find(p => p.pinned) || sorted[0] || null);
  ```
  Thumbnails: A uses `blog-winter-cathedral.jpg` and B uses `blog-prazsky-hrad-chandelier-top-square-regular-good-illustrative.jpg`.

## Interactions & Behavior
- **Anchors and scrolling:** In-page anchors are `#ueberblick`, `#mythen`, `#e-1` … `#e-10`, `#fotoplan` (A), `#praktisch` and `#fragen`. Scrolling is smooth, and `scroll-margin-top` (72–80 px) keeps headings clear of the sticky header. The ranking and myth rows are whole-row links.
- **Hover states:**
  - Links: `#11457E` to `#0B3360`.
  - Nav and breadcrumb: `#5C5650` to `#1A1714`.
  - Buttons: `#6B1F2A` to `#4F1620`.
  - There are no transitions in the prototype. A 150 ms color transition is fine.
- **Responsive:**
  - All rows use flex-wrap. Below about 560 px, labels and values stack, and figure captions drop below the image.
  - H1, H2, dek and quote sizes use `clamp()`.
  - There are no fixed heights.
- **Optional CMS flags:** `showOverview` (default true) shows or hides the ranking table and the myth table. `showPractical` (default true) shows or hides the practical rows in every entry.
- There are no forms, loading or error states. The articles are static content.

## State Management
- **Articles:** no state. They render from content (the frontmatter flags above are optional).
- **Journal index:** keep the existing behavior (posts list, category filter, search, pagination). The only addition is the `pinned` boolean on posts.

## Design Tokens
- **Colors:**
  - ink `#1A1714`, body ink `#2F2A26`, muted `#5C5650`, faint `#8A847D`
  - blue `#11457E` (hover `#0B3360`), blue tint `#EEF3F9`, selection `#DCE6F2`
  - burgundy `#6B1F2A` (hover `#4F1620`)
  - rule `#E4DFD6`, warm panel `#F6F4EF`, page `#FFFFFF`
- **Fonts** (Google Fonts):
  - Newsreader: optical size 6..72, weights 400/500/600/700, italic 400. Used for headings, body and quotes.
  - Hanken Grotesk: weights 400/500/600/700. Used for UI, meta, tables, boxes and the FAQ.
- **Type scale:**
  - Hanken: 12.5 (badge), 14, 15, 16, 17, 18, 20, 24 px.
  - Newsreader: 19, 20, 22 px, plus the H2, H1 and quote `clamp()` values listed above.
- **Spacing (px):** 2, 4, 6, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 40, 48, 56, 64, 72. Em-based values: 0.3em, 0.4em, 0.6em, 0.8em, 1.1em, 1.4em, 1.6em, 2em, 2.4em.
- **Borders:** 1 px `#E4DFD6` for row rules, 2 px `#1A1714` for table and section tops, 3 px for box tops (blue, verdict color or ink).
- **Radius:** 3 (badges), 4 (buttons), 8 (images), 9999 (portrait).
- **Shadows:** none.

## SEO / AI search (goal: Bing and ChatGPT search)
- `structured-data/prag-winter-fotomomente.jsonld` and `prag-winter-geniesser.jsonld` contain Article and FAQPage JSON-LD. Inject each one into `<head>` as `<script type="application/ld+json">`. The FAQ text must match the visible text exactly, so update both together.
- **Titles:**
  - A: „Prag im Winter: 10 Erlebnisse mit Fotomoment | Zuza Prague Tours“
  - B: „Prag im Winter für Genießer: Oper, Konzerte, Karlsbad | Zuza Prague Tours“
- **Meta descriptions:**
  - A: „Strahov-Bibliothek, Mittagskonzert auf der Burg, Sternemenü und Spa: zehn Winter-Erlebnisse in Prag mit Fotospots, Uhrzeiten und fünf Mythen im Faktencheck.“
  - B: „Oper, Mittagskonzert, Advent, Sternerestaurant und Kur in Karlsbad: zehn Winter-Erlebnisse in Prag mit kurzen Wegen, Tipps für Senioren und fünf Mythen im Faktencheck.“
- Use `lang="de"` and a canonical URL. Add the pages to the sitemap, submit it in Bing Webmaster Tools and enable IndexNow.
- Keep the author bar with her qualification on every article. It is the main trust signal.

## Assets
All images are in `img/blog/`. In the repo they live in `public/images/` and `public/images/thumbs/`.
- `zuzana-portrait.jpg`: author portrait, shown at 44 px round.
- `blog-winter-cathedral.jpg` (480×607, portrait): St. Vitus at night with the Christmas tree. Used as the side figure in A (top) and in B (entry 7), and as the Journal thumbnail for A. **It is too small for anything larger than 360 px. Please replace it with real winter photos.**
- `blog-prague-tram-with-prague-castle.jpg`: tram line 23 with the castle. Side figure in B's tips section. Credit „Zuza Prague Tours“.
- `blog-prazsky-hrad-chandelier-top-square-regular-good-illustrative.jpg` (1920×1080): Journal thumbnail for B. It is a summer photo; swap it for a winter one when available.
- There are no icons. Fonts come from Google Fonts.

## Files
- `Blog Prag Winter Fotomomente.dc.html`: Article A, the design reference.
- `Blog Prag Winter Genuss.dc.html`: Article B, the design reference.
- `Blog Journal v4.dc.html` plus `data/journal-posts.json`: the Journal index with both posts and the `pinned` change. Thumbnails of older posts are not bundled, so they show as broken images. That's expected.
- `content/*.md`: verbatim copy of both articles as Markdown.
- `structured-data/*.jsonld`: JSON-LD for both articles.
- `img/blog/*`: images used by the articles.
- `support.js`: preview runtime only.

## Open points before publishing
- **Christmas market dates:** the city hasn't announced the 2026 dates yet. The text says „Ende November bis Anfang Januar“.
- **Michelin star:** re-check La Degustation's star once a year. The text says „seit 2012“.
- **Winter photos:** there is only one real winter photo (see Assets).
