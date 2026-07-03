# Handoff: Zuza Prague Tours — Marketing Site + Journal CMS

## Overview
**Zuza Prague Tours** is the personal website of *Ing. Zuzana Manová*, a German-speaking, certified private tour guide in Prague (guiding since 1986). The product sells one premium, personal thing: bespoke private walking tours, told by one expert.

This handoff covers **two apps**:
1. **Public site** — a warm, editorial marketing + journal website (Home, Touren, Tour-Detail, Über Zuzana, Journal index, Article, Kontakt).
2. **Admin / Journal CMS** — a login-gated content manager for the journal (dashboard, block-based article editor, and a Leaflet map builder).

The brand voice is **German, formal (*Sie*)**, understated luxury, **no emoji ever**. An English variant uses British spelling.

**Primary audience:** culturally curious German travellers roughly **50–70**. The conversion surfaces (Touren, Tour-Detail, Kontakt) are deliberately optimized for this demographic — see *Audience & conversion UX* below. Those choices are intentional; do not "normalize" them back to compact styling.

---

## About the design files
The files in this bundle are **design references**, not a drop-in production codebase:

- **`reference-implementation/`** — the *canonical* site as **plain HTML/CSS/JS** (+ a React variant under `app/` and `journal/`). This is the source of truth for layout, copy, spacing and interactions. It is self-contained and runnable (open `index.html`). **Read this first.**
- **`design-system-components/`** — the design system's component **source** (`.jsx` + `.prompt.md` + `.d.ts`) for core, editorial, marketing and **admin** components. Use these to recreate components 1:1, especially for the admin CMS.
- **`prototypes/`** — what was built in the design tool: a **single-page-app** consolidation of the public site (`Zuza Prague Tours.dc.html`) and the **admin login gate** (`Admin-Zuza-Blog-Site.dc.html`). **The SPA is ahead of `reference-implementation/` in several places** — premium home, facelifted Touren + Tour-Detail, a senior-optimized Kontakt flow, live Leaflet maps, and five extra 2026 journal articles (`journal-content-4.js`, 20 articles total). Where the two disagree, **the prototype wins**. These files use a proprietary streaming runtime (`<x-dc>` / `support.js`) — **do not port that runtime**; use them as the reference for structure, copy, inline-style token values, interactions and the SPA routing model.

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

### 1. Home (`prototypes/` SPA `#/` — premium direction; `reference-implementation/index.html` is the older pass)
- **Hero** (full-viewport): background photo (`charles-bridge-hero.jpg`, dusk) with Ken-Burns + top/left scrim. Eyebrow "ZERTIFIZIERTE PRAG-EXPERTIN" (gold-lamp rule). H1 Italiana `clamp(3.2rem,8.5vw,7rem)`, ivory, one word *Prag* in ivory Cormorant italic: "Entdecken Sie *Prag*, vertraulich." Sub (Libre Caslon, rgba ivory). Two CTAs: a **cream outline** button "Anfrage senden →" (1px ivory border, fills ivory/ink on hover — no burgundy on the photo) + underlined cream link "Touren ansehen". A circular "Certified / Prague / Est. 1986" seal bottom-right (132px, 1px ivory ring, blur). Header is **transparent over the hero, turns solid/glass after ~70% viewport scroll**.
- **Manifesto band**: centered italic Cormorant pull line "„Prag ist eine vielschichtige Geschichte — *lassen Sie uns diese gemeinsam lesen.*"" with signature "— Ing. Zuzana Manová" — clean paper ground (the premium pass removed the faint ★★★★★ watermark).
- **Selected experiences**: section head (eyebrow + Italiana H2 "Jede Tour beginnt mit Ihrer *Neugier*." + note) over a 2-col grid: left = a semantic `<ul>` of five real `<a href>` tour rows — the **active** row (hover *or* keyboard focus) lifts onto a white card (`--surface-card` + `--shadow-lg`, 8px radius, padding slide), numeral + title recolor burgundy and an arrow slides in; inactive numerals are **brass-deep** (AA contrast); each link has a full aria-label and a 2px burgundy focus ring. Right = sticky 4:5 preview image (soft shadow) that crossfades per active row (.7s), `aria-hidden` because it duplicates the list.
- **About strip** (ivory-deep ground): portrait (`zuzana-portrait.jpg`) with a brass 1px frame offset behind it; body with eyebrow, Italiana H2 "Prag, erzählt mit *Leidenschaft*.", a burgundy Cormorant lead line, body copy, a 3-up stat row (40+, 4,9k, 5,0) and a "Mehr über Zuzana →" link.
- **Gallery** (ink ground): gold-lamp eyebrow, H2 "Augenblicke *unterwegs*", a 4-cell masonry grid (one wide-tall, slow zoom on hover).
- **Reviews**: centered olive ★★★★★, eyebrow, H2 "Worte meiner Gäste", a **hairline-ruled 3-column grid** — italic quote, author, source per column, separated by 1px `--rule` verticals (no cards).
- **CTA** (burgundy/ink photo overlay): "Bereit, Prag zu *entdecken*?" + cream outline button + phone link.

### 2. Touren — list (`prototypes/` SPA `#/tours`)
Page-banner (inner pages: warm-white ground `#FCFBF8`, ~7rem top padding to clear the fixed solid header, eyebrow + big Italiana H1 + sub, **★★★★★ "5,0 von 5 · über 4.900 Gäste seit 1986" trust row**, hairline bottom). Then 6 editorial rows, **alternating image left/right** (`grid-template-columns:1fr 1fr`, image 5:4 with `--shadow-md`, zoom on hover), each a **real `<a href>`** (aria-label, 3px burgundy focus ring) with: brass-deep numeral + brass rule + optional **gold flag capsule** (Beliebt / Museums-Akkreditiert / Maßgeschneidert, 11.5px pill), Italiana H2, a readable meta line (1rem normal case with a small `schedule` icon — "3,5 Stunden · Privatführung"), description at 1.1rem, and a 13px "Details ansehen →" underline link that turns burgundy on hover. Closes with a dark band: cream outline "Unverbindliche Anfrage" + a large (1.15rem) phone link. Tour 6 "Individuelle Privattour" links to Kontakt and **preselects itself** in the form; others go to the tour detail.

### 3. Tour detail (`prototypes/` SPA `#/tour/<slug>`)
Image hero (74vh) with bottom scrim; breadcrumb is a premium eyebrow nav (gold rule + "Touren" link · "Privatführung Nr. 01" in gold-lamp); Italiana H1; meta row at **1.05rem normal case** with 19px gold Material icons (schedule / group / translate). Two-column body: left = burgundy Cormorant lead (1.5–2rem) over a 64px brass hairline, paragraphs at 1.1rem, then "DER RUNDGANG" eyebrow + "Was wir sehen" display heading and a numbered itinerary (Roman numerals I–V in brass-deep) whose rows **lift onto a white card with `--shadow-md` on hover**. Right = a **sticky frosted-glass booking card** (`backdrop-filter: blur(18px)`, 1px hairline, soft shadow): gold "Zertifizierte Expertin · Seit 1986" capsule, 1.55rem Italiana title, definition list (labels 11.5px uppercase, values 1.05rem), ★★★★★ "5,0 von 5 · über 4.900 Gäste" line, a large full-width burgundy "Unverbindliche Anfrage senden →" (navigates to Kontakt **with this tour preselected**), a lock "Kostenlos & ohne Verpflichtung" line, and "Lieber persönlich?" with a 1.25rem phone link + WhatsApp. Closes with "Vielleicht auch interessant" eyebrow + "Weitere Wege durch *Prag*" heading and 3 related link-cards (real hrefs, aria-labels, hover lift + `--shadow-lg`, clock-icon meta at 0.95rem). Only the castle tour has a full itinerary — others show lead + a single on-brand paragraph.

### 4. Über Zuzana (`zuzana.html`)
Page-banner. Intro: portrait (brass frame) + eyebrow + burgundy Cormorant lead + body + "Eine Tour anfragen" button. Dark stat band (40+, 4,9k, 5,0, 1986 in gold-lamp). Credentials: 3 cards (Material icons `verified` / `history_edu` / `translate`, Italiana titles). Philosophy quote band (ivory-deep, big italic blockquote + sig). Closing CTA.

### 5. Journal index (`blog.html`)
Page-banner "Geschichten aus *Prag*." Featured lead article (16:11 image left, category eyebrow with brass tick, Italiana H2, blurb, "X Min. Lesezeit · Date"). Then a 3-col post grid (3:2 images, category, Italiana H3, blurb, meta). Dark newsletter/contact CTA band.

### 6. Article (`article.html` + `journal.js`)
Prose column (`max-width:720px`). Header: breadcrumb, kicker "Category · X Lesezeit", Italiana H1 (with the burgundy-italic emphasized word via `<em>`), Cormorant standfirst, byline (round portrait + name + "Zertifizierte Stadtführerin · Date"), and a meta facts bar. Full-bleed-ish 16:9 hero figure + italic caption. Body is a **block renderer** (see Content model) inside a 2-column layout with a **sticky rail** (scroll-spy "Inhalt" TOC + an "Auf einen Blick" facts box + a "Tour anfragen" button). Includes a **reading-progress bar** (top) and a **back-to-top** button. Foot CTA + "Weiterlesen im Journal" 3-card grid.
- **Maps** are real **Leaflet** on CARTO Positron tiles: numbered **burgundy circular markers** (30px, 2px paper border, soft shadow), on-brand popups (`.pop-t` Italiana title + `.pop-n` body), an optional **dashed burgundy walking route** (`dashArray:'1 9'`, weight 3, `#6B1F2A`), auto-`fitBounds`. Each map can also show its numbered stop list. See `MapBuilder.jsx` and the `.jmap/.jmark/.leaflet-*` CSS in `article.css`.

### 7. Kontakt (`prototypes/` SPA `#/kontakt` — senior-optimized conversion flow)
Page-banner. Two columns.
**Left:** eyebrow + Cormorant lead + intro; a **portrait trust card** (72px round Zuzana photo + "Ihre persönliche Ansprechpartnerin — zertifiziert, deutschsprachig, seit 1986" on `--surface-card`); contact rows with 22px burgundy icons — labels 11.5px uppercase, values 1.1rem, **phone 1.25rem semibold**, response "< 24 h".
**Right — the frosted-glass enquiry card:** header "**Unverbindliche Anfrage**" (1.55rem Italiana) + "Kostenlos und ohne Verpflichtung — Zuzana antwortet Ihnen persönlich." Then **three numbered steps** (Italiana numerals in brass-deep, 1.15rem step titles):
1. **"Welche Tour interessiert Sie?"** — reassurance line ("Eine Auswahl genügt …"), then a **single-column stacked radio list** (7 options incl. "Ich bin noch unentschlossen — Zuzana berät Sie gern"): 64px white rows, visible 26px ring + 13px dot radio, title 1.08rem, meta 0.92rem normal case; selected = burgundy ring/border + `#FDFBF7` tint + shadow + filled `check_circle` right; 3px burgundy focus ring; real `<input type=radio>` in a labelled radiogroup, select bound to **label onClick + input onChange** (a React quirk — keep both).
2. **"Wie erreiche ich Sie?"** — "\* Pflichtfeld — alles andere ist freiwillig." Stacked large inputs (labels 1rem/500, input text 1.05rem serif, ~52px tall, `--stone-400` borders for 3:1 contrast, burgundy focus border + soft glow, `autocomplete` attrs): Ihr Name\*, Ihre E-Mail-Adresse\*, Telefon *(freiwillig — falls Sie einen Rückruf wünschen)*.
3. **"Ihre Wünsche" (freiwillig)** — Wunschtermin ("z. B. Mai 2026 — oder noch offen") + Nachricht textarea.
Then: ★★★★★ "5,0 von 5 · über 4.900 Gäste seit 1986", a **large full-width "Unverbindliche Anfrage senden →"** (lg), lock line "Unverbindlich & kostenlos · Ihre Daten werden vertraulich behandelt", and a phone-first block: "Sie möchten lieber persönlich sprechen?" + **1.35rem phone link** + "Ich spreche Deutsch — auch per WhatsApp."
**Success state:** 52px filled check, "Vielen Dank für Ihre Anfrage!" (2.1rem), 24h expectation at 1.15rem, and "Sie haben es eilig?" + phone. Cosmetic in the prototype; wire to email/CRM in production. Booking CTAs elsewhere **deep-link here with the tour preselected** (`selectedTour`).

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

## Audience & conversion UX (50–70) — preserve these
The conversion surfaces were deliberately redesigned for older German travellers, applying sales psychology + accessibility research. Keep these patterns:
- **Type floor:** on conversion surfaces nothing meaningful below ~12px; form labels ≥ 1rem, values/meta ≥ 0.9–1.1rem, normal case instead of micro uppercase.
- **One decision at a time:** chunked, numbered steps; single-column stacked choices (vertical scanning beats grids); reassurance copy at each decision.
- **Familiar controls:** visible ring+dot radios that look like radios, real `<a href>` links, explicit selected states — no novel widgets.
- **Fewer required fields:** only Name + E-Mail required; German "\* Pflichtfeld" convention; everything else marked *freiwillig*.
- **Phone-first alternatives:** large tappable `tel:` links (1.15–1.35rem) near every CTA + WhatsApp; this demographic often prefers calling.
- **Trust at the decision point:** "unverbindlich & kostenlos", lock + data-privacy line, ★★★★★ + "über 4.900 Gäste seit 1986", Zuzana's face and certifications near forms.
- **Contrast & focus:** brass-deep (`#8C6A3C`) instead of brass on light grounds (AA); 3px burgundy focus rings; targets ≥ 44px (radio rows 64px).

---

## State management
- **Public site:** mostly static. Local state for: header solid/transparent, active home-preview index, mobile menu, contact-form success, article reading-progress + active TOC id.
- **Journal:** read the article dataset (below); index lists all, article view selects by slug, related = explicit `related` slugs (fallback to fill 3). At consumption, **dedupe by slug** then **sort newest-first** by parsing the German `date` ("Monat JJJJ") — see `_dkey` in the SPA logic.
- **Kontakt:** `selectedTour` (slug or `'unentschlossen'`) + `focusedTour` + `sent`. Booking CTAs on tour pages and the "Individuelle Privattour" row call `setState({selectedTour})` before navigating, so the form arrives preselected.
- **Admin:** `articles[]`, current `view` (`list`|`editor`), `editing` doc, status filter, search query, toast. Editor is controlled via `doc` + `onChange`. New/edit/duplicate/delete/save/publish mutate the list. Replace the in-memory seed with real fetch/persist.

---

## Content model

### Article (journal) — `reference-implementation/journal-content-{1,2,3}.js` + `prototypes/journal-content-4.js`
**20 real articles** — files 1–3 carry the original 15; `journal-content-4.js` adds five 2026 pieces written for the 50–70 audience (`prag-allein-als-frau`, `boehmische-baeder`, `prag-im-eigenen-tempo`, `klassische-musik-prag`, `boehmisches-glas-granate`). Display order is computed, not load order: **dedupe by slug, sort newest-first by German month-year**. Each: `slug, category, title` (HTML, may contain `<em>`), `titlePlain, cardBlurb, readTime, date, hero` (filename), `heroCap, standfirst, meta:[{k,v}], railFacts:{title,items:[{k,v}]}, related:[slug], blocks:[…]`.
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
- `prototypes/Zuza Prague Tours.dc.html` — SPA consolidation of the public site (hash routing, live Leaflet maps, premium home, facelifted Touren/Tour-Detail, senior-optimized Kontakt). **Current source of truth for UX.** Reference only.
- `prototypes/Admin-Zuza-Blog-Site.dc.html` — the admin **login gate** + mounted `AdminSuite`. Reference only.
- `prototypes/journal-content-{1,2,3,4}.js` — the 20-article dataset (4 = the five newest, 2026).

## Implementation checklist
1. Scaffold the public site in your framework; bring over tokens (`tokens/*.css`) as CSS variables / theme.
2. Load the six Google fonts + Material Symbols.
3. Build pages 1–7 to match the **prototype SPA** (fall back to `reference-implementation/` where the prototype has no equivalent); use `site.css`/`article.css` for precise values.
4. Build the journal from the 20-article dataset; **dedupe + newest-first sort**; implement the block renderer + Leaflet maps (CARTO Positron, burgundy markers, dashed route).
5. Preserve the **Audience & conversion UX** patterns exactly (radio-card tour picker, chunked form, phone-first blocks, trust rows, preselect deep-links).
6. Build the admin from `design-system-components/admin/` (or recreate); wire to a real API; add **real auth**.
7. Wire interactions (header transition, scroll-reveal, preview swap, reading progress/TOC, form success).
8. Deploy public + admin as two Netlify sites under one domain, different subdomains.
