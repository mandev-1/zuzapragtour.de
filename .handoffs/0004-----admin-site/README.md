# Handoff: Zuza Prague Tours — Marketing Site + Journal CMS

## Overview
**Zuza Prague Tours** is the personal website of *Ing. Zuzana Manová*, a German-speaking, certified private tour guide in Prague (guiding since 1986). The product sells one premium, personal thing: bespoke private walking tours, told by one expert.

This handoff covers **two apps**:
1. **Public site** — a warm, editorial marketing + journal website (Home, Touren, Tour-Detail, Über Zuzana, Journal index, Article, Kontakt).
2. **Admin / Journal CMS** — a login-gated content manager for the journal (dashboard, block-based article editor, and a Leaflet map builder).

The brand voice is **German, formal (*Sie*)**, understated luxury, **no emoji ever**. An English variant uses British spelling.

---

## About the design files
The files in this bundle are **design references**, not a drop-in production codebase:

- **`reference-implementation/`** — the *canonical* site as **plain HTML/CSS/JS** (+ a React variant under `app/` and `journal/`). This is the source of truth for layout, copy, spacing and interactions. It is self-contained and runnable (open `index.html`). **Read this first.**
- **`design-system-components/`** — the design system's component **source** (`.jsx` + `.prompt.md` + `.d.ts`) for core, editorial, marketing and **admin** components. Use these to recreate components 1:1, especially for the admin CMS.
- **`prototypes/`** — what was built in the design tool this round: a **single-page-app** consolidation of the public site (`Zuza Prague Tours.dc.html`) and the **admin login gate** (`Admin-Zuza-Blog-Site.dc.html`). These use a proprietary streaming runtime (`<x-dc>` / `support.js`) — **do not port that runtime**; use them only as a reference for structure, copy, inline-style token values, the SPA routing model, and the admin login I added.

**Your task:** recreate these designs 1:1 in a real codebase using its established patterns. If no codebase exists yet, **Next.js + React** is the natural choice (the canonical site is a Next.js / CRA hybrid). Match the reference pixel-for-pixel using the design tokens below.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, imagery and interactions are all specified. Recreate the UI pixel-perfectly. Every value below is exact and also lives in `reference-implementation/tokens/`.

---

## Recommended architecture
- **Public site:** Next.js (App Router) + React, statically rendered. Pages map 1:1 to the reference HTML files. The journal is data-driven (see Content model). Maps use **Leaflet 1.9.4** + CARTO "Positron" tiles.
- **Admin CMS:** a separate React app/route. Components already exist in `design-system-components/admin/` (`AdminShell`, `AdminSuite`, `ArticleTable`, `ArticleEditor`, `MapBuilder`). Wire them to a real backend (the reference seeds in-memory data).
- **Two deployables / Netlify:** deploy the public site and the admin as **two separate Netlify sites** under one root domain with different subdomains (e.g. `zuzapragtour.de` and `admin.zuzapragtour.de`). One Git repo is fine — create two Netlify sites with different **base directories**. A given exact hostname can only belong to one Netlify site; different subdomains → different sites. Prefer Netlify DNS on the apex so subdomains + SSL auto-provision.
- **Auth (important):** the admin login in the prototype is **cosmetic** (any submit logs in). Before exposing the admin publicly, put **real authentication** in front of it (Netlify Identity / password protection, or your own auth provider). Do not ship the cosmetic gate as security.

---

## Design tokens (exact)

### Color — warm, paper-based
Grounds: `--ivory #F5EFE4`, `--ivory-deep #EDE4D3`, `--paper #FAF6EC`, `--paper-warm #F5F1EA`, `--canvas #FBF9F5`, `--canvas-alt #F5F3EF`, `--canvas-mute #EFEEEA`. Inner pages use a near-white `#FCFBF8`.
Ink/type: `--ink #1A1714`, `--ink-2 #1B1C1A`, `--ink-soft #3A332C`, `--ink-mute #6B6055`, `--ink-warm #58413F`.
Primary burgundy: `--burgundy #6B1F2A`, `--burgundy-deep #4F1620`. Marketing crimson gradient: `--crimson #6C0008` → `--crimson-bright #8E1B1B` (`--grad-burgundy: linear-gradient(135deg,#6C0008,#8E1B1B)`). Button accent `--accent #8A1F1F` / hover `#6E1818`.
Brass/gold: `--brass #A88654`, `--brass-deep #8C6A3C`, `--gold-olive #7B5800`, `--gold-lamp #FDC34D` (gold on dark).
Decorative: `--rose #E0BFBC`, `--sage #8A9282` (rare).
Hairlines: `--rule #D9CFBC`, `--rule-soft #E8DFCC`. Stone neutral scale `--stone-50 #FAF8F4` … `--stone-900 #1A1613`.
Success `#3F6B4A`, error `#BA1A1A`. Cool colors are essentially absent.

### Typography — serif-led, four voices
- **Italiana** → `--font-display` (high-contrast display serif: headlines, big numerals). Weight 400 only.
- **Libre Caslon Text** → `--font-body` (running text, set ~19px / line-height 1.72).
- **Cormorant Garamond** → `--font-italic` (italic accent: sub-heads, pull quotes, the one emphasized word in a headline — always burgundy).
- **Inter Tight** → `--font-sans` (eyebrows, labels, buttons, all UI).
- Legacy marketing register: **Noto Serif** (`--font-headline`) + **Plus Jakarta Sans** (`--font-label`) — used by `TourRow`/`ReviewCard`.
- All six are Google Fonts (loaded live). Icons: **Material Symbols Outlined** (variable font, FILL 0 default; the rating star is FILL 1 in `--gold-olive`).
- Fluid display sizes: `--text-display-xl clamp(2.75rem,5vw+1rem,4.5rem)`, `-lg clamp(2.25rem,4vw+.75rem,3.5rem)`, `-md clamp(1.75rem,2.5vw+.75rem,2.5rem)`. Eyebrow 11px, `letter-spacing .18em`, uppercase. Display tracking −0.025em.
- **Signature move:** a serif headline with one word swapped to burgundy Cormorant italic (e.g. *"Prag, erzählt mit **Leidenschaft**"*).

### Spacing / radii / shadows / motion
4px spacing scale (`--space-1 .25rem` … `--space-28 7rem`). Sections breathe at `clamp(3rem,7vh,7rem)` vertical padding. Layout shells: marketing `max-width:1240px` (`padding-inline:clamp(1.5rem,5vw,5rem)`), prose `720px`, masthead `1320px`.
Radii: `--radius-md .375rem` (6px buttons/inputs), `--radius-lg .5rem` (8px images), `--radius-xl .75rem` (12px cards), `--radius-2xl 1.5rem` (24px feature panel), `--radius-pill 999px`.
Shadows are soft, warm, low: `--shadow-md 0 8px 24px rgba(26,23,20,.08)`, `--shadow-lg 0 18px 40px rgba(26,23,20,.12)`, `--shadow-xl 0 24px 60px rgba(26,23,20,.18)`, `--shadow-cta 0 18px 40px rgba(108,0,8,.20)`.
Motion: easing `--ease-out cubic-bezier(.16,1,.3,1)`; durations `.2s / .3s / .6s`, image zoom `.7s`. Restrained — fades + short upward slides on scroll-reveal; image hover `scale(1.05–1.1)`; link/title hover = color shift to burgundy, not movement. Hero uses a slow Ken-Burns zoom (`scale(1.08)→1` over ~18s).

> Exact values live in `reference-implementation/tokens/{colors,typography,spacing,fonts}.css` and `styles.css`. Lift from there.

---

## Borders, rules & surfaces
Hairlines over heavy borders: 1px `--rule` dividers everywhere. Accent rules are colored *left* borders — 2px burgundy on pull quotes, 3px brass on callouts. Numbered, hairline-separated lists are the brand's signature content pattern (tours, article sections). Dark sections invert to `--ink` ground with `--gold-lamp` eyebrows. Heroes use atmospheric Prague photography under a paper/ink scrim (`linear-gradient(to top, rgba(20,16,12,.78), transparent 42%)` and/or left-to-right). Sticky header is translucent with `backdrop-filter: blur(16px) saturate(140%)`.

---

## Screens / Views — Public site

### 1. Home (`reference-implementation/index.html`)
- **Hero** (full-viewport): background photo (`vltava-bridges-hero.jpg`) with Ken-Burns + top/left scrim. Eyebrow "ZERTIFIZIERTE PRAG-EXPERTIN" (gold-lamp rule). H1 Italiana `clamp(3.2rem,8.5vw,7rem)`, ivory, one word *Prag* in ivory Cormorant italic: "Entdecken Sie *Prag*, vertraulich." Sub (Libre Caslon, rgba ivory). Two CTAs: primary burgundy-gradient "Anfrage senden →" + underlined cream link "Touren ansehen". A circular "Certified / Prague / Est. 1986" seal bottom-right (132px, 1px ivory ring, blur). Header is **transparent over the hero, turns solid/glass after ~70% viewport scroll**.
- **Manifesto band**: centered italic Cormorant pull line "„Prag ist eine vielschichtige Geschichte — *lassen Sie uns diese gemeinsam lesen.*"" with a faint oversized ★★★★★ behind it (brass, opacity .08), signature "— Ing. Zuzana Manová".
- **Selected experiences**: section head (eyebrow + Italiana H2 "Jede Tour beginnt mit Ihrer *Neugier*." + note) over a 2-col grid: left = numbered tour list (01–05, hairline rows, hover lifts row to white and recolors numeral+title burgundy); right = sticky 4:5 preview image that swaps as you hover each row (opacity crossfade .7s) with an italic caption.
- **About strip** (ivory-deep ground): portrait (`zuzana-portrait.jpg`) with a brass 1px frame offset behind it; body with eyebrow, Italiana H2 "Prag, erzählt mit *Leidenschaft*.", a burgundy Cormorant lead line, body copy, a 3-up stat row (40+, 4,9k, 5,0) and a "Mehr über Zuzana →" link.
- **Gallery** (ink ground): gold-lamp eyebrow, H2 "Augenblicke *unterwegs*", a 4-cell masonry grid (one wide-tall, slow zoom on hover).
- **Reviews**: centered olive ★★★★★, eyebrow, H2 "Worte meiner Gäste", 3 testimonial cards (italic quote, author, source).
- **CTA** (burgundy/ink photo overlay): "Bereit, Prag zu *entdecken*?" + paper button + phone link.

### 2. Touren — list (`tours.html`)
Page-banner (inner pages: warm-white ground `#FCFBF8`, ~7rem top padding to clear the fixed solid header, eyebrow + big Italiana H1 + sub, hairline bottom). Then 6 editorial rows, **alternating image left/right** (`grid-template-columns:1fr 1fr`, image 5:4, zoom on hover), each with brass numeral, Italiana H2, uppercase chips (pill, hairline; gold variant for "Beliebt"/"Museums-Akkreditiert"/"Maßgeschneidert"), description, and a "Details ansehen →" underline link. Closes with a dark CTA band. (Tour 6 "Individuelle Privattour" links to Kontakt; others to the tour detail.)

### 3. Tour detail (`tour-detail.html`)
Image hero (74vh) with bottom scrim, breadcrumb "Touren / …", Italiana H1, meta row with Material icons (schedule / group / translate). Two-column body: left = burgundy Cormorant lead + paragraphs + a numbered "Was wir sehen" itinerary (Roman numerals I–V, brass, hairline rows); right = a **sticky frosted-glass booking card** (`backdrop-filter: blur(18px)`, 1px hairline, soft shadow) with a definition list (Dauer / Gruppe / Treffpunkt / Sprache), a full-width burgundy "Anfrage senden →" button and a "or call" line. Closes with a "Vielleicht auch interessant" 3-card related grid. (The prototype parameterizes this per tour; only the castle tour has a full itinerary — others show lead + a single on-brand paragraph.)

### 4. Über Zuzana (`zuzana.html`)
Page-banner. Intro: portrait (brass frame) + eyebrow + burgundy Cormorant lead + body + "Eine Tour anfragen" button. Dark stat band (40+, 4,9k, 5,0, 1986 in gold-lamp). Credentials: 3 cards (Material icons `verified` / `history_edu` / `translate`, Italiana titles). Philosophy quote band (ivory-deep, big italic blockquote + sig). Closing CTA.

### 5. Journal index (`blog.html`)
Page-banner "Geschichten aus *Prag*." Featured lead article (16:11 image left, category eyebrow with brass tick, Italiana H2, blurb, "X Min. Lesezeit · Date"). Then a 3-col post grid (3:2 images, category, Italiana H3, blurb, meta). Dark newsletter/contact CTA band.

### 6. Article (`article.html` + `journal.js`)
Prose column (`max-width:720px`). Header: breadcrumb, kicker "Category · X Lesezeit", Italiana H1 (with the burgundy-italic emphasized word via `<em>`), Cormorant standfirst, byline (round portrait + name + "Zertifizierte Stadtführerin · Date"), and a meta facts bar. Full-bleed-ish 16:9 hero figure + italic caption. Body is a **block renderer** (see Content model) inside a 2-column layout with a **sticky rail** (scroll-spy "Inhalt" TOC + an "Auf einen Blick" facts box + a "Tour anfragen" button). Includes a **reading-progress bar** (top) and a **back-to-top** button. Foot CTA + "Weiterlesen im Journal" 3-card grid.
- **Maps** are real **Leaflet** on CARTO Positron tiles: numbered **burgundy circular markers** (30px, 2px paper border, soft shadow), on-brand popups (`.pop-t` Italiana title + `.pop-n` body), an optional **dashed burgundy walking route** (`dashArray:'1 9'`, weight 3, `#6B1F2A`), auto-`fitBounds`. Each map can also show its numbered stop list. See `MapBuilder.jsx` and the `.jmap/.jmark/.leaflet-*` CSS in `article.css`.

### 7. Kontakt (`kontakt.html`)
Page-banner. Two columns: left = eyebrow + Cormorant lead + intro + a contact detail list (Material icons call/chat/mail/schedule, "< 24 h" response). Right = a **frosted-glass enquiry form** (Field inputs: Name, E-Mail, a tour `<select>`, Wunschtermin, Nachricht textarea) → on submit shows a **success state** (check_circle, "Anfrage gesendet", thank-you). Cosmetic in the prototype; wire to email/CRM in production.

---

## Screens / Views — Admin CMS (`design-system-components/admin/`)
Mounted full-screen as `<AdminSuite imageBase="/assets/images/" />`. All state lives in `AdminSuite`; new/edit/duplicate/delete, save and publish are wired with toasts (in-memory in the reference — replace with API calls).

- **Login gate** (built in `prototypes/Admin-Zuza-Blog-Site.dc.html`): full-screen centered paper card over a dark Prague-night photo + burgundy/ink scrim. Small wordmark, eyebrow "REDAKTION · INTERNER BEREICH", Italiana H1 "Journal-Verwaltung", sub, Field E-Mail + Field Passwort, "Angemeldet bleiben" checkbox + "Passwort vergessen?", full-width burgundy "Anmelden →", a `lock` footnote. On submit → reveal `AdminSuite`. **Replace with real auth.**
- **AdminShell** (chrome): dark ink left sidebar (brand, nav: Artikel / Mediathek / Touren / Bewertungen / Einstellungen, signed-in user) + sticky top bar (`z-index:50`) with breadcrumb, page title/subtitle and an actions slot.
- **ArticleTable** (dashboard): status filters (Veröffentlicht / Entwurf / Geplant — colored `zsuite-pill`), search, rows with hero thumb, title, category, status, date, and row actions (edit / duplicate / delete). "Neuer Artikel" primary action.
- **ArticleEditor**: block-based editor. Article body blocks beside a metadata sidebar (status, slug, category, date, read time, featured image, SEO). An **insert palette** adds: paragraph, heading, pull-quote, callout, image, cost table, ornament, **map**. Save / Veröffentlichen with toasts.
- **MapBuilder** (modal, `.zpe-overlay` `z-index:60`): "Karte bearbeiten" — a live Leaflet map (same renderer as the public article), an "Interaktive Karte / Einbettung" toggle, Route + "Liste anzeigen" checkboxes, an editable station list ([lat,lng] + label + note, add/remove/reorder), and a caption field. "Fertig" closes it.

> **z-index ladder to preserve:** content `10` < sticky bars `50` < editor modal overlay `60` < toast `90`. Any custom floating control (e.g. a logout button) must sit **below 50** and out of the top-bar zone.

---

## Interactions & behavior
- **Header**: transparent over the home hero; switches to solid frosted glass once the hero is ~scrolled past (use an IntersectionObserver sentinel, not a scroll-position hack, so it works regardless of scroll container). Inner pages ship solid. Links recolor to ink/ivory on hover; nav CTA is an outline that fills on hover.
- **Scroll-reveal**: sections fade + slide up ~26px on enter (IntersectionObserver, staggered ~40–60ms; always have a fail-safe that reveals everything so nothing can get stuck hidden).
- **Home tour list ↔ preview**: hovering/focusing a row sets the active preview image (opacity crossfade .7s).
- **Image hover**: scale 1.05–1.1 over .7–.9s inside `overflow:hidden`.
- **Links (`ulink`)**: uppercase Inter Tight with an arrow that nudges on hover; underline present.
- **Forms**: inputs darken border to ink on focus; submit shows an inline success state (no real network in the reference).
- **Article**: reading-progress bar tracks scroll; sticky TOC scroll-spies the current `<h2>`; back-to-top appears after one viewport; smooth-scroll to headings with header offset.
- **Routing**: the canonical site is multi-page (`<a href>`). The prototype `Zuza Prague Tours.dc.html` shows an alternative **SPA** model with hash routes (`#/tours`, `#/tour/<slug>`, `#/zuzana`, `#/journal`, `#/article/<slug>`, `#/kontakt`) + scroll-to-top on route change. Choose per your stack (Next.js routes recommended).
- **Reduced motion / no-JS**: disable Ken-Burns and reveals; never leave content hidden.

## State management
- **Public site:** mostly static. Local state for: header solid/transparent, active home-preview index, mobile menu, contact-form success, article reading-progress + active TOC id.
- **Journal:** read the article dataset (below); index lists all, article view selects by slug, related = explicit `related` slugs (fallback to fill 3). **Dedupe by slug** at consumption.
- **Admin:** `articles[]`, current `view` (`list`|`editor`), `editing` doc, status filter, search query, toast. Editor is controlled via `doc` + `onChange`. New/edit/duplicate/delete/save/publish mutate the list. Replace the in-memory seed with real fetch/persist.

---

## Content model

### Article (journal) — `reference-implementation/journal-content-{1,2,3}.js`
15 real articles. Each: `slug, category, title` (HTML, may contain `<em>`), `titlePlain, cardBlurb, readTime, date, hero` (filename), `heroCap, standfirst, meta:[{k,v}], railFacts:{title,items:[{k,v}]}, related:[slug], blocks:[…]`.
Block types (`b.t`): `p` (`html`, optional `first` for drop-cap), `h2` (`html`), `quote` (`html`, `by`), `callout` (`label`, `html`, optional `list:[html]`), `list` (`items:[html]`), `facts` (`title`, `items:[{k,v}]`), `figure` (`img`, `alt`, `cap`), `gallery` (`images:[{img,alt}]`, `cap`), `ornament`, `map` (`title`, `route:bool`, `list:bool`, `cap`, `points:[{coord:[lat,lng], label, note}]`). Admin also uses `costTable` (`title`, `rows:[{k,v}]`).
> The content files run `window.JOURNAL = window.JOURNAL || []; window.JOURNAL.push(...)`. In a real app, import them as data modules instead.

### Tours
6 tours (01–05 + "Individuelle Privattour"). Fields used by the prototype: `slug, num, title, dur, metaShort, cardImg, detailHero, chips:[[label,goldFlag]], group, meet, language, lead, desc, intro:[paragraph], itinerary:[[romanNumeral,title,desc]]` (castle only). See `prototypes/Zuza Prague Tours.dc.html` logic and `tours.html`.

---

## Design-system components (`design-system-components/`)
Each has `.jsx` source, a `.prompt.md` (usage + props) and `.d.ts`. Namespace `ZuzaPragueToursDesignSystem_748186`.
- **core/**: `Button` (variants `primary` gradient+glow / `accent` / `ink` / `outline` / `onDark` / `link`; sizes sm/md/lg; `icon`, `iconLeading`, `href`), `Icon` (Material Symbols wrapper; `name`, `size`, `fill`, `color`), `Eyebrow` (`tone` brass/burgundy/gold/onDark/mute, `icon`), `Badge` (`gold`/`burgundy`/`solid`/`outline`), `Field` (`label`, `as` input|textarea, `type`, `required`, `placeholder`, `rows`, `hint`).
- **editorial/**: `SectionHeading` (`eyebrow`, `title`, `emphasis`, `lead`, `align`, `onDark`), `PullQuote` (`attribution`), `Callout` (`label`), `Ornament` (`glyph`), `StatBlock` (`value`, `label`).
- **marketing/**: `TourRow` (numbered hover-reactive tour line), `ReviewCard` (`quote`, `author`, `source`).
- **admin/**: `AdminShell`, `AdminSuite`, `ArticleTable`, `ArticleEditor`, `MapBuilder` (see Admin section).
- Note the two registers: **editorial** (Italiana + burgundy, used across most of the site) and **marketing** (Noto Serif + crimson/rose, used by `TourRow`/`ReviewCard`). Keep them distinct.

## Assets (`reference-implementation/assets/images/` — 17 files)
Warm-toned Prague photography + the Zuzana portrait. Heroes/figures reference these by filename: `vltava-bridges-hero.jpg`, `charles-bridge-hero.jpg`, `charles-bridge-statue.jpg`, `prague-castle.jpg`, `st-vitus-night.png`, `night-prague.jpg`, `autumn-prague.jpg`, `boat-vltava.jpg`, `hidden-gems.jpg`, `jewish-quarter.jpg`, `josefov.jpg`, `kafka.jpg`, `guest-tourguide.jpg`, `guest-night.jpeg`, `guest-food.jpeg`, `zuzana-portrait.jpg`, `journal-thumb.png`. Replace with the client's licensed photography in production; the Josefov/Jewish-museum images may need attribution. No SVG icon set — use Material Symbols. Footer brand marks (TripAdvisor/Instagram) are tiny inline SVGs.

## Files in this bundle
- `reference-implementation/` — canonical site. Start at `index.html`; shared chrome in `site.js` (injects header/footer) + `site.css`; tokens in `tokens/` + `styles.css`; journal engine `journal.js` + `journal-content-{1,2,3}.js` + `article.css`; React variants in `app/` and `journal/`; its own `README.md` explains the structure.
- `design-system-components/` — component source (core / editorial / marketing / admin) + `*.prompt.md` usage docs + `*.card.html` specimens.
- `prototypes/Zuza Prague Tours.dc.html` — SPA consolidation of the public site (hash routing, live Leaflet maps, all interactions). Reference only.
- `prototypes/Admin-Zuza-Blog-Site.dc.html` — the admin **login gate** + mounted `AdminSuite`. Reference only.
- `prototypes/journal-content-{1,2,3}.js` — the 15-article dataset (same as reference).

## Implementation checklist
1. Scaffold the public site in your framework; bring over tokens (`tokens/*.css`) as CSS variables / theme.
2. Load the six Google fonts + Material Symbols.
3. Build pages 1–7 to match `reference-implementation/` exactly (use `site.css`/`article.css` for precise values).
4. Build the journal from the dataset; implement the block renderer + Leaflet maps (CARTO Positron, burgundy markers, dashed route).
5. Build the admin from `design-system-components/admin/` (or recreate); wire to a real API; add **real auth**.
6. Wire interactions (header transition, scroll-reveal, preview swap, reading progress/TOC, form success).
7. Deploy public + admin as two Netlify sites under one domain, different subdomains.
