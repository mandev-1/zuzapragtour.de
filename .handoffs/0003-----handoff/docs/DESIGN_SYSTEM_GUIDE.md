# Zuza Prague Tours — Design System

A warm, editorial design system for **Zuza Prague Tours** — the personal website of *Ing. Zuzana Manová*, a German-speaking, certified private tour guide in Prague who has been guiding visitors since 1986. The brand sells a single, premium, deeply personal product: bespoke private walking tours of Prague, told by one expert with forty years of stories.

The system reproduces the look and voice of the live site at **https://zuzapragtour.de** and powers two surfaces: the **marketing website** and a refined **editorial journal**.

---

## Sources

Everything here was lifted from the brand's own code and live site — not invented. Explore these to go deeper:

- **Live site:** https://zuzapragtour.de (German). Tours, About, Blog, Book.
- **Source repository (private):** `github.com/mandev-1/zuzapragtour.de` — a Next.js / Create-React-App hybrid. Key files used:
  - `prague-tour-guide/tailwind.config.js` — the canonical color, font, type-scale and radius tokens.
  - `prague-tour-guide/src/index.css` + `src/styles/blog-content.css` — base styles and the full editorial article CSS (drop caps, pull quotes, callouts, ornaments, cost tables).
  - `prague-tour-guide/app/layout.tsx` — the four `next/font/google` families (Italiana, Libre Caslon Text, Cormorant Garamond, Inter Tight) + Material Symbols.
  - `prague-tour-guide/src/components/{Home,Tours,Contact,Footer,Header}.tsx` — the marketing surfaces.
  - `prague-tour-guide/src/components/blog/*` — `Masthead`, `PullQuote`, `Callout`, `Ornament`, `Grund`, `CostTable` editorial primitives.
  - `prague-tour-guide/src/brand.ts` + `src/data/tours.ts` — brand facts and tour catalogue.

> Note: the repo also contains a sibling brand, `pragkenner.de`, which shares this codebase. This design system represents **zuzapragtour.de** only.

The reader is encouraged to browse the repository for richer context before producing new work — the article CSS and tour copy in particular are deep wells of brand voice.

---

## Content fundamentals

**Language.** Primary language is **German**, addressed formally with *Sie* (never *du*). An English variant exists, written in British spelling ("travellers", "splendour"). When in doubt, write German.

**Voice.** First-person, from Zuzana herself. Warm, confident, quietly authoritative — a lifelong expert who has nothing to prove. She speaks *to* you, not at you:
- *"Sagen Sie mir, was Sie interessiert, und ich baue den Rundgang darum."*
- *"Ich habe vierzig Jahre Meinungen darüber, wohin ich Sie mitnehmen sollte."*
- *"Prag ist eine vielschichtige Geschichte, lassen Sie uns diese gemeinsam lesen."*

**Tone.** Understated luxury, not tourist-brochure. Specific over generic ("Schulklassen, Familien, Vorständen, Filmteams und dem einen oder anderen Diplomaten" rather than "all kinds of groups"). Sensory and seasonal. Never breathless, never salesy — scarcity is implied gently ("Begrenzte Verfügbarkeit für private Buchungen"), never shouted.

**Casing.** Headlines are sentence case in German (nouns capitalised per German grammar). Eyebrows and small labels are **UPPERCASE** with wide tracking. Numerals in tour lists use two digits (`01`, `02`) or Roman (`I`, `II`).

**Emoji.** None. Ever. The brand is a print magazine, not a chat. Iconography is the restrained Material Symbols set only.

**Vibe in three words:** editorial, personal, certified.

---

## Visual foundations

**Palette.** Warm and paper-based. Ivory/cream grounds (`#FBF9F5` canvas, `#FAF6EC` paper, `#F5EFE4` ivory) under near-black ink type (`#1A1714`). The single brand accent is **deep burgundy** (`#6B1F2A`, with a brighter crimson `#6C0008→#8E1B1B` gradient on marketing CTAs). The secondary accent is **brass / antique gold** (`#A88654` rules and ornaments, `#7B5800` olive eyebrows, `#FDC34D` lamp gold on dark). A warm-grey *stone* scale handles UI neutrals; a dusty *rose* (`#E0BFBC`) appears as decorative numerals/dividers on the homepage. Cool colors are essentially absent (one rarely-used sage).

**Typography.** Serif-led, four voices:
- **Italiana** — high-contrast display serif for headlines and big numerals.
- **Libre Caslon Text** — body serif, set generously at 19px / 1.72 for reading.
- **Cormorant Garamond** — italic accent for sub-heads, pull quotes and emphasis words (always burgundy).
- **Inter Tight** — the only sans; used exclusively for eyebrows, labels, buttons and UI.
- Legacy marketing pages also use **Noto Serif** (headline) + **Plus Jakarta Sans** (label); these are preserved as `--font-headline` / `--font-label`.

Display type is fluid (`clamp()`), 44–72px at the hero. Eyebrows are 11px, uppercase, `0.18em` tracked. A signature move: a serif headline with one word swapped to burgundy Cormorant italic (*"Prag, erzählt mit **Leidenschaft**"*).

**Backgrounds & imagery.** Large, atmospheric **photography** of Prague — Charles Bridge at dusk, the castle, autumn streets, guest snapshots. Imagery is warm-toned and golden, never cold or black-and-white. Heroes use a left-to-right paper-colored scrim (`linear-gradient(to right, canvas, transparent)`) so type stays legible over photos. The dark gallery/CTA sections invert to ink ground. No stock-art illustration, no abstract gradient meshes — just gradient *scrims* over real photos and the one burgundy CTA gradient.

**Layout.** Centered editorial shells: `~72rem` for marketing, `1320px` masthead, `44rem` prose column. Generous vertical rhythm (sections at 48–112px padding). Numbered, hairline-separated lists are the brand's signature content pattern (tours, article sections). Sticky translucent header with `backdrop-blur`.

**Borders & rules.** Hairlines over heavy borders — 1px `--rule` (`#D9CFBC`) dividers everywhere. Accent rules are colored *left* borders: 2px burgundy on pull quotes, 3px brass on callouts. Corner radii are mostly small (6px buttons/inputs, 8px images, 12px cards); the one exception is the 24px feature CTA panel and full pills on blog buttons & badges.

**Shadows.** Soft, low, warm-neutral (`rgba(26,23,20,…)`). Cards sit on `--shadow-md`; the floating portrait card uses `--shadow-xl` with a 2° rotation. The burgundy CTA carries a tinted glow (`--shadow-cta`).

**Motion.** Restrained. Fades and short upward slides on scroll (framer-motion `opacity/y` reveals, ~0.4–0.5s). Gallery images zoom slowly on hover (`scale(1.1)` over 0.7s). The `chevron_right` on tour links nudges 3px right on hover. Easing is a gentle `cubic-bezier(0.16,1,0.3,1)`.

**States.** Hover = color shift, not movement: links go burgundy, tour rows lift from canvas to white and recolor their numeral/title, outline buttons fill with ink. Inputs darken their border to ink on focus. There are no aggressive transforms or bounces. Press states are simple opacity.

**Transparency & blur.** Used sparingly and purposefully: the sticky header (`bg/90 + backdrop-blur`), the frosted secondary hero button (`white/80 + blur`), and image scrims. Otherwise surfaces are solid.

---

## Iconography

The brand uses **Material Symbols Outlined** (Google's variable icon font) exclusively — loaded from the Google Fonts CDN in `tokens/fonts.css`. There is **no** custom SVG icon set, no PNG icons, no emoji, no unicode-glyph icons.

- Default axis: weight 400, `opsz 24`, `FILL 0` (outline). The rating **star** is the one consistently *filled* glyph (`FILL 1`), rendered in olive gold.
- Icons are small and supportive — 12–20px — sitting inline beside eyebrows, metadata and links. Never decorative-large, never multicolor.
- Glyphs in active use: `star`, `schedule`, `group`, `place`, `call`, `arrow_forward`, `chevron_right`, `open_in_new`.
- The few brand SVGs in the codebase are third-party logos (TripAdvisor, Instagram) drawn as tiny inline marks in the footer — reproduce those as small inline SVG when needed; they are not part of the icon system.

Use the `Icon` component (a Material Symbols wrapper) for all iconography — never hand-roll an SVG.

> **Font substitution note:** all six text families are Google Fonts and are loaded live from the Google CDN — no local font binaries were bundled, so there is no substitution. If you need them offline, download Italiana, Libre Caslon Text, Cormorant Garamond, Inter Tight, Noto Serif and Plus Jakarta Sans from Google Fonts.

---

## Index — what's in this system

**Foundations**
- `styles.css` — root entry point (import this one file). It `@import`s:
- `tokens/colors.css` — palette + semantic surface/intent aliases + signature gradient.
- `tokens/typography.css` — font families, fluid display sizes, type ramp, tracking.
- `tokens/spacing.css` — spacing scale, radii, shadows, layout shells, motion.
- `tokens/fonts.css` — Google Fonts + Material Symbols `@import`s and the icon base class.

**Components** (`window.ZuzaPragueToursDesignSystem_748186.*`)
- `components/core/` — **Button**, **Icon**, **Eyebrow**, **Badge**, **Field**.
- `components/editorial/` — **SectionHeading**, **PullQuote**, **Callout**, **Ornament**, **StatBlock**.
- `components/marketing/` — **TourRow**, **ReviewCard**.

**UI kits**
- `ui_kits/website/` — the marketing site: interactive **Home → Tours → Book** recreation.
- `ui_kits/journal/` — the editorial long-form **article** layout.

**Guidelines** — `guidelines/*.card.html` foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.

**Assets** — `assets/images/` real Prague photography and the Zuzana portrait, imported from the repo.

**Skill** — `SKILL.md` makes this folder usable as a downloadable Claude Code Agent Skill.
