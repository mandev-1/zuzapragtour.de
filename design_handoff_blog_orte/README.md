# Handoff: Journal-Artikel „Zehn Orte mit Geschichte – und fünf Prager Legenden im Faktencheck“

## Overview
New German-language article for the Journal on zuzaprague (Zuza & Pragtour). Ten historic places in Prague, ordered top-down (Hradschin → Neustadt) so visitors walk mostly downhill; five legends fact-checked inline; per-place practical rows (access, tickets, opening) and a closing section of tips for guests 65+. The article is also the new featured (newest) entry on the Journal index.

Suggested slug: `/blog/zehn-orte-mit-geschichte-prag-legenden` · Date: 4. Oktober 2026 · Category: Geschichte · Reading time: 14 min.

## About the design files
`Blog Prag Orte mit Geschichte.dc.html` is an HTML design reference (prototype), not production code. Open it in a browser with `support.js` next to it. Recreate it in the site’s existing blog template/stack, reusing the header, footer, author bar and CTA components already used by the other Journal articles (e.g. the Visitor Pass ranking article).

## Fidelity
High fidelity: final copy (German, verbatim), colors, typography, spacing and component structure are final. Target desktop layout described below; everything reflows with flex-wrap on small screens.

## Desktop layout (viewport ≥ 1160 px)
- **Site header**: sticky, white, 1px bottom rule `#E4DFD6`, min-height 64px, container max-width 1160px, padding 0 20px. “Journal” active (2px bottom border `#6B1F2A`).
- **Article header** (column max-width 860px, centered, top padding clamp(28px,5vw,48px)):
  - Breadcrumb “Journal › Geschichte”, Hanken Grotesk 14px `#5C5650`.
  - Kicker “Prager Geschichte”, 16px/700 `#11457E`, 22px above.
  - H1 Newsreader 600, clamp(2.1rem,4.6vw,3.2rem), line-height 1.12, letter-spacing −0.012em, text-wrap balance.
  - Dek Hanken 500, clamp(1.12rem,1.6vw,1.25rem)/1.5.
  - Author bar: 1px rules top/bottom, 44px round portrait, name 15/700, role 15 `#5C5650`; date + reading time right-aligned 14px.
- **Hero figure**: max-width 1160px, `max-height:620px; object-fit:cover; object-position:center 30%`. Caption in 860 column, 14px `#5C5650`, credit `#8A847D`.
- **Body column**: max-width 860px; Newsreader 20px / 1.65, `font-variant-numeric: oldstyle-nums`; paragraph margin-bottom 1.1em.

### Components (in order)
1. **Kurz-Box** “Das Wichtigste in Kürze”: bg `#EEF3F9`, 3px top border `#11457E`, padding 20px 22px; label 15/700 blue; bullets Hanken 17/1.55.
2. **Pull quote** (Kafka 1902): Newsreader italic clamp(1.5rem,2.6vw,1.9rem)/1.3; attribution Hanken 15px `#5C5650`.
3. **Overview list** “Die zehn Orte im Überblick”: H2 Hanken 24/700; 2px top rule `#1A1714`; each row is an anchor to `#ort-N`: number column 28px (16/700 `#6B1F2A`, tabular nums), name 17/600, description 16px `#5C5650`; rows 12px vertical padding, 1px bottom rule `#E4DFD6`.
4. **Legend overview** “Fünf Legenden im Faktencheck”: claim in Newsreader 19 italic; verdict badge + “Ort N” (14px `#5C5650`).
5. **Place section** ×10 (`id="ort-1"` … `"ort-10"`, padding-top 48px, `scroll-margin-top:72px`):
   - Label row: “Ort N” 16/700 `#6B1F2A` + district/date 15/500 `#5C5650`, 2px bottom rule `#1A1714`.
   - H2 Newsreader 600, clamp(1.75rem,3.2vw,2.25rem)/1.16.
   - Body paragraphs.
   - Optional **figure**: portrait images 360px wide with caption beside (flex, wraps below on mobile); landscape images max 480px with caption below. Radius 8px.
   - Optional **Legend box**: bg `#F6F4EF`, 3px top border in verdict color, padding 18px 22px 20px; header “Legende im Faktencheck” 14/700 + badge; claim Newsreader 22 italic; explanation Hanken 17/1.55.
   - **Practical rows**: 1px rules; label column 8.5rem (16/700), value flex 1 (16/1.5).
6. **Tips** “Ohne Bergauf…”: H2 Hanken 24/700; ordered list (7 items) with 600-weight lead-ins.
7. **Fare table**: 2px top-of-table rule, rows 9px padding with 1px rules, values 600 tabular nums; note 14px `#5C5650`.
8. **CTA aside**: bg `#F6F4EF`, padding 22px; button bg `#6B1F2A` (hover `#4F1620`), white 15/600, radius 4px, padding 12px 20px.
9. **Sources**: 3px top rule `#1A1714`, H2 Hanken 20/700, ordered list 15/1.55 `#2F2A26`, links underlined.
10. **Footer**: same as Journal.

### Verdict badges
Hanken 12.5px/700, uppercase, letter-spacing .06em, 1.5px solid border, radius 3px, padding 2px 8px.
- Widerlegt → `#6B1F2A`
- Ungeklärt → `#11457E`
- Unbelegt / Ohne Grundlage / Sage → `#5C5650`

## Interactions
- In-page anchors (`#ort-1`…`#ort-10`, `#ueberblick`, `#legenden`, `#praktisch`) with `scroll-behavior:smooth`; sections use `scroll-margin-top` so headings clear the sticky header.
- Link hover `#0B3360`; nav hover `#1A1714`.
- Optional CMS toggles used in the prototype: `showOverview` (both overview lists) and `showPractical` (practical rows per place). Both default on.

## Design tokens
- Ink `#1A1714`, body ink `#2F2A26`, muted `#5C5650`, faint `#8A847D`
- Blue `#11457E` (hover `#0B3360`), blue tint `#EEF3F9`, selection `#DCE6F2`
- Burgundy `#6B1F2A` (hover `#4F1620`)
- Rules `#E4DFD6`, warm panel `#F6F4EF`, page `#FFFFFF`
- Fonts (Google Fonts): Newsreader (opsz 6..72, 400/500/600/700, italic 400), Hanken Grotesk (400/500/600/700)

## Assets (img/blog/)
- `old-town-square.jpg` 1539×1192 — hero + Journal featured image. **Carries Unsplash+ watermarks: license it or replace before publishing.**
- `blog-prague-tram-with-prague-castle.jpg` 480×720 (Ort 2)
- `blog-tropfsteinwand.jpg` 480×559 (Ort 3)
- `blog-charles-bridge-statues-sunny-crowded-bridge.jpg` 480×275 (Ort 4)
- `blog-jewish-quarter-min.jpg` 480×338 (Ort 5)
- `zuzana-portrait.jpg` (author bar)

The 480px images must not be shown wider than their native size (portrait 360px, landscape 480px), as in the prototype.

## Journal index entry
Add to the posts source (newest → shown as featured):
```json
{
  "date": "2026-10-04",
  "dateLabel": "4. Oktober 2026",
  "title": "Zehn Orte mit Geschichte – und fünf Prager Legenden im Faktencheck",
  "excerpt": "Wo der Dreißigjährige Krieg begann, wo Mozart den Don Giovanni dirigierte und was am Golem auf dem Dachboden dran ist. Mit Wegen, die Ihnen die steilen Gassen ersparen.",
  "image": "img/blog/old-town-square.jpg",
  "mins": 14,
  "category": "Geschichte"
}
```

## Before publishing: check these facts on site
Prices and opening hours come from prague.eu (as of October 2026). Confirm locally: Senate palace weekend opening, Faust House ownership/access, Loreto carillon hours, Týn Church entrance and hours.

## Files
- `Blog Prag Orte mit Geschichte.dc.html` — design reference
- `support.js` — runtime needed to open the reference in a browser
- `img/blog/*` — images used
