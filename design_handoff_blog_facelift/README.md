# Handoff: Journal facelift, new pillar page, winter merge, floating CTAs

## Overview
Seven German pages for zuzapragtour.de. Goal: get articles out of Google's "Crawled – currently not indexed" state by adding real depth (personal experience, practical facts, FAQ, internal links), removing duplicates, and adding booking/contact calls to action on every page.

| Design file | URL | Type | Content JSON |
|---|---|---|---|
| Blog Strahov Kloster.dc.html | /blog/strahov-monastery-prague | facelift | content/journal/strahov-monastery-prague.json |
| Blog Was kann man in Prag machen.dc.html | /blog/was-kann-man-in-prag-machen | facelift (+ Golem paragraph) | content/journal/was-kann-man-in-prag-machen.json |
| Blog Waldstein Garten.dc.html | /blog/wallenstein-garden-prague | facelift | content/journal/wallenstein-garden-prague.json |
| Blog Kleinseite Karlsbruecke Geheimtipps.dc.html | /blog/tropfsteinwand-mala-strana-karlsbruecke-geheimtipps | facelift, now a 2 km walk | content/journal/tropfsteinwand-mala-strana-karlsbruecke-geheimtipps.json |
| Blog Prag im Winter.dc.html | /blog/prag-im-winter | **merge** of prag-winter-fotomomente + prag-winter-geniesser | content/journal/prag-im-winter.json |
| Blog Prag besichtigen Stadtfuehrer.dc.html | /blog/prag-besichtigen-stadtfuehrer | new article (not yet handed off) | content/journal/prag-besichtigen-stadtfuehrer.json |
| Sehenswuerdigkeiten Prag.dc.html (+ Sehenswuerdigkeiten Karte.html) | **/sehenswuerdigkeiten-prag** (site root, not /blog) | new pillar page | content/pages/sehenswuerdigkeiten-prag.json |

`Blog Journal v4.dc.html` is included only to show the updated index: the two winter cards are now one card pointing to `prag-im-winter`.

## About the design files
The `.dc.html` files are **HTML design references**, not production code. Open them in a browser with `support.js` next to them. Recreate them in the existing site (React, `BlogPostPage`, `scripts/render-blocks.cjs`, `scripts/generate-journal.cjs`), reusing the header, footer, author bar and CTA components the Journal already has. The JSON files follow the repo's existing `content/journal/*.json` block model (`t`, `html.de`, …). A few new fields and block types are listed below. Render them from JSON; don't hard-code the HTML.

## Fidelity
High fidelity. German copy is final and must be used verbatim. Colors, type, spacing and behavior are final.

## Required changes outside the templates
1. **`status: "published"`** in every JSON. Strahov and Was-kann-man were `draft` in the repo, which is the likely reason they weren't indexed. Check the other non-indexed posts for the same thing.
2. **New field `updated` / `updatedDisplay`** (ISO date + "Aktualisiert am 7. Oktober 2026"). Show it as a badge in the author bar and write it as `dateModified` in the Article JSON-LD and `<lastmod>` in the sitemap. The original `date` stays as first publication date ("Erstmals veröffentlicht am …").
3. **301 redirects** (Netlify `_redirects` syntax; translate if hosting differs):
   ```
   /blog/prag-winter-fotomomente  /blog/prag-im-winter  301
   /blog/prag-winter-geniesser    /blog/prag-im-winter  301
   ```
   `prag-im-winter.json` carries `redirectFrom` with both paths. Delete the two old JSON files, their JSON-LD files and their sitemap entries.
4. **Root route `/sehenswuerdigkeiten-prag`**: the page uses the article template but lives outside `/blog`. JSON has `path` and `canonical`. Breadcrumb is "Start › Sehenswürdigkeiten" and "Journal" is **not** active in the nav.
5. **Map**: copy `Sehenswuerdigkeiten Karte.html` to `public/maps/sehenswuerdigkeiten-prag.html`. It is embedded as an iframe (see block `map`). The page loads Leaflet 1.9.4 with SRI hashes and OSM tiles; keep the "© OpenStreetMap contributors" attribution.
6. **Titles and meta**: each design file has `<title>` and `<meta name="description">` in its head. Use them as `seoTitle` / description. The H1 and the SEO title differ on purpose.
7. **FAQ JSON-LD**: every `faq` block should produce `FAQPage` structured data, as existing posts already do.

## New / extended block types (JSON)
- `overview` (exists): `items[]` with `n`, `title`, `desc`, `href`.
- `h2.sub`: optional meta line under an H2 (Hanken 15 px `#5C5650`), e.g. "Beste Zeit: … · frei".
- `h2.free` (Sehenswürdigkeiten only): boolean. Render the badge "Kostenlos" (bg `#EEF3F9`, text `#11457E`, 700) or "Eintritt" (bg `#F6F4EF`, text `#5C5650`, 600). Badge padding 2px 8px, radius 3px.
- `facts`: two-column rows (label 10rem/700, value flex). Optional `title` and `note`.
- `myth` (winter): `verdict` (Falsch / Plausibel / Roman / Stimmt / Sage) + `html`. Same box as the Orte handoff's legend box: bg `#F6F4EF`, 3px top border in verdict color, padding 18px 22px 20px.
- `quote`: Newsreader italic, attribution `by` in Hanken 15 px.
- `gallery`: two portrait images side by side, `grid-template-columns: repeat(auto-fit, minmax(240px,1fr))`, gap 12px, each `aspect-ratio: 4/5; object-fit: cover; radius 6px`, one caption below.
- `image`: `layout:"side"` means a 360 px image with the caption beside it. Otherwise full column width.
- `map`: iframe `src`, 100 % width, height `clamp(340px,60vw,500px)`, 1px border `#E4DFD6`, radius 6px, `loading="lazy"`.
- `p.lead` at the end = closing CTA text with a link to `/book…`. Render it as the CTA aside (see below).

## Layout (shared article template)
- Header: sticky, white, 1px bottom `#E4DFD6`, min-height 64px, container 1160px, padding 0 20px.
- Article header column max-width 860px, centered. Breadcrumb Hanken 14 `#5C5650`. Kicker Hanken 16/700 `#11457E`. H1 Newsreader 600 `clamp(2.1rem,4.6vw,3.2rem)`/1.12, letter-spacing −0.012em, `text-wrap:balance`. Dek Hanken 500 `clamp(1.12rem,1.6vw,1.25rem)`/1.5.
- Author bar: 1px rules top and bottom, 44px round portrait, name 15/700, role 15 `#5C5650`. On the right, a column:
  - **Update badge**: `inline-flex`, padding 3px 9px, bg `#EEF3F9`, radius 3px, Hanken 14/700 `#11457E`, with a 6px dot `#11457E`. Text "Aktualisiert am …".
  - Below it, 14px `#5C5650`: "Erstmals veröffentlicht am … · Lesezeit N Minuten". The new pages Sehenswürdigkeiten and Stadtführer show only the publication date.
- Hero: max-width 1160px, `max-height:600–620px; object-fit:cover`. Caption in the 860 column, 14px `#5C5650`, credit `#8A847D`.
- Body: 860px column, Newsreader 20/1.65, `font-variant-numeric: oldstyle-nums`, paragraph margin-bottom 1.1em.
- Section H2: Newsreader 600 `clamp(1.75rem,3.2vw,2.25rem)`/1.16. Numbered articles prefix the number in `#6B1F2A`. Sections have padding-top 48px and `scroll-margin-top:72px`.
- Key-facts box "Das Wichtigste in Kürze": bg `#EEF3F9`, 3px top `#11457E`, padding 20px 22px, bullets Hanken 17/1.55.
- Tip box "Mein Tipp" / "Zuzanas Tipp": bg `#F6F4EF`, label 15/700 `#6B1F2A`.
- **CTA aside** (1–2 per article): bg `#F6F4EF`, padding 22px, flex-wrap, gap 16px 24px. Title Hanken 15/700. Text 16/1.5: "… Unverbindlich anfragen, auf WhatsApp schreiben, eine E-Mail senden oder anrufen: +420 721 231 933". Button bg `#6B1F2A` (hover `#4F1620`), white 15/600, padding 12px 20px, radius 4px.
- FAQ: 1px rules, question Hanken 18/700, answer 17/1.55 `#2F2A26`.
- Sources: 3px top rule `#1A1714`, H2 Hanken 20/700, ordered list 15/1.55.

### Photos (Prag im Winter)
Hero: `blog-winter-ots.png`. Column-width figures are `aspect-ratio:3/2; object-fit:cover; radius 6px`, caption 10px below. Strahov uses the Theological Hall photo. Advent uses the Trdelník photo, placed directly after the 2nd paragraph (before the myth boxes). Fotoplan has a gallery (cathedral + Charles Bridge at night). Praktisch has a gallery (wet stairs + tram).

## Floating contact UI (all 6 facelifted/new pages; not Stadtführer)
Three viewport-dependent variants. All share one visibility rule and one animation.

**Visibility rule** (evaluated on scroll and resize, passive listener):
`show = heroFigure.bottom < 0.35 × innerHeight` **and** no in-article CTA aside (any `article aside` containing a `/book` link) intersects the viewport **and** `footer.top ≥ innerHeight + 200`.

**Animation** (applied to the opacity, filter and transform properties):
- hidden: `opacity:0; filter:blur(10px); transform:translateY(14px); pointer-events:none`
- shown: `opacity:1; filter:blur(0); transform:none; pointer-events:auto`
- desktop: `transition: opacity .7s ease, filter .7s ease, transform .7s cubic-bezier(.16,1,.3,1)`; mobile .6s.

1. **≥ 1400 px: side card.** `position:fixed; top:104px; left:calc(50% + 454px); width:clamp(220px, calc(50% - 478px), 290px); z-index:40`. Padding 22px 20px, bg `rgba(246,244,239,.94)` + `backdrop-filter:blur(8px)`, 3px top `#6B1F2A`, shadow `0 10px 30px rgba(26,23,20,.08)`. Contents:
   - 56px portrait, "Ing. Zuzana Manová" 15/700 and "Staatlich geprüfte Stadtführerin" 13 `#5C5650`.
   - Pitch in Newsreader 17/1.45: "Ich zeige Ihnen Prag persönlich, auf Deutsch und nur für Ihre eigene Gruppe."
   - Full-width button "Unverbindlich anfragen" → `/book#contact-title`.
   - A row with the phone number (700) on the left and WhatsApp (`#11457E`, 600) on the right.
   - The e-mail `zuzanamanova@email.cz` (14/600 `#11457E`).
2. **1024–1399 px: corner chip.** `position:fixed; right:24px; bottom:24px`, pill radius, padding 8px 18px 8px 8px, white 94 % + blur, 1px `#E4DFD6`, shadow `0 10px 30px rgba(26,23,20,.12)`, hover border `#6B1F2A`. Contents: 44px portrait, then "Prag mit Zuzana" 14/700 over "Private Tour anfragen" 13/600 `#6B1F2A`. Links to `/book#contact-title`.
3. **< 1024 px: bottom bar.** `position:fixed; left:0; right:0; bottom:0; z-index:45`, padding `10px 12px calc(10px + env(safe-area-inset-bottom))`, white 96 % + blur, 1px top `#E4DFD6`. Three equal-height (48px) buttons with gap 8px, Hanken 15/600:
   - "Tour anfragen" (flex-grow 1.6, bg `#6B1F2A`, white)
   - "WhatsApp" (`https://wa.me/420721231933`, 1px border `#E4DFD6`)
   - "E-Mail" (`mailto:zuzanamanova@email.cz`, 1px border `#E4DFD6`)

   There is no call button in the bar on purpose.

**Mobile inline card (< 1024 px only)**, inserted before the 3rd `<section>` of each article. It is an `aside` with a `/book` link, so the bar hides while it is visible.
- Box: bg `#F6F4EF`, 3px top `#6B1F2A`, padding 18px.
- 52px portrait, "Diese Orte mit Zuzana sehen" 16/700 and "Privat, auf Deutsch, in Ihrem Tempo" 14 `#5C5650`.
- 48px full-width button "Unverbindlich anfragen".
- A row of 44px secondary buttons: WhatsApp and E-Mail.

The converter skips this card in JSON, so render it from the template.

## Tracking
Fire the existing analytics events on every contact link: `tel:`, `mailto:`, WhatsApp and `/book`. Tag each event with an area value: `float-card`, `float-chip`, `mobile-bar`, `mobile-inline` or `article-cta`. This lets the admin dashboard compare them. Optional: a `copy` event for copied e-mail addresses or phone numbers (snippet in the chat history: `document.addEventListener('copy', …)` that classifies the copied text as email or phone).

## Design tokens
- Ink `#1A1714`, body ink `#2F2A26`, muted `#5C5650`, faint `#8A847D`, rule `#E4DFD6`, paper `#F6F4EF`
- Blue `#11457E` / hover `#0B3360` / tint `#EEF3F9`; burgundy `#6B1F2A` / hover `#4F1620`
- Fonts: Newsreader (400–700, italic 400) and Hanken Grotesk (400–700), both from Google Fonts
- Radii: 3px (badges), 4px (buttons), 6px (figures), 9999px (portraits, chip)

## Content notes for review (Zuzana)
- Opening hours and prices were left out or kept general on purpose. Verify: the Waldstein Garden season and hours; the Strahov photo fee; Karlsbrücke details (Horský's Sun/Saturn interpretation, the solstice line to St. Vitus, which piers and arches fell in 1890). All of these are flagged in the text as uncertain.
- On the Sehenswürdigkeiten page, positioning uses verifiable facts (private only, guides personally, state-licensed) rather than "beste Stadtführerin", because of the UWG risk. Add review count or rating if available.

## Assets
All in `img/`, taken from the repo's `public/images/` (map: `img/blog/x` → `/images/x`; `mala-strana.png` → `/images/photo-guests-mala-strana.jpeg`; `blog-tropfsteinwand.jpg` → `/images/blog-tropfsteinwand.png`). New in this handoff: `blog-winter-ots.png`, `blog-winter-cathedral.png` (higher resolution than the old thumb), `charles-bridge-aerial-night-heavy-portrait.jpg`, `night-prague.jpg`, `vltava-bridges-hero-1080.jpg`. `strahov-monastery.jpg` shows the **Theological Hall interior**, and its alt text is corrected accordingly.

## Files
- `*.dc.html`: design references (open them with `support.js`)
- `Sehenswuerdigkeiten Karte.html`: the map page that goes in the iframe
- `content/journal/*.json`, `content/pages/sehenswuerdigkeiten-prag.json`: content in the repo block model
- `img/`: images used
