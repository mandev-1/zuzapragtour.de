# Zuza Prague Tours — Full Handoff Package

Everything needed to run, review, and re-implement the **Zuza Prague Tours** web stack: the complete premium marketing site, the mobile-first review funnel, and the underlying design system (tokens, fonts, components, brand guide).

This package is a **self-contained, offline-runnable copy** of the built stack. Open any HTML file directly in a browser — all stylesheets, scripts, fonts (via Google Fonts CDN), and images resolve through relative paths.

> **Brand:** zuzapragtour.de — the personal site of *Ing. Zuzana Manová*, a German-speaking, certified private Prague tour guide (since 1986). Premium, editorial, German-language.
> **Source of truth repo:** `github.com/mandev-1/zuzapragtour.de` (private Next.js app). The design tokens here were lifted from its `tailwind.config.js`, `app/layout.tsx`, and `blog-content.css`.

---

## 1. What's in this package

```
handoff/
├── README.md                      ← you are here (master doc)
├── styles.css                     ← design-system entry point (links the tokens)
├── tokens/                        ← CSS custom properties + @font-face
│   ├── colors.css  typography.css  spacing.css  fonts.css
├── assets/images/                 ← all real Prague photography + Zuzana portrait
├── _ds_bundle.js                  ← compiled React component library (powers home.html)
├── ui_kits/website/
│   ├── site/                      ← ★ THE PRODUCTION SITE (9 pages, plain HTML/CSS/JS)
│   ├── review-funnel.html         ← ★ THE REVIEW FUNNEL (mobile-first, self-contained)
│   ├── home.html                  ← earlier faithful home recreation (uses _ds_bundle.js)
│   ├── home-premium.html          ← earlier premium home (basis of site/index.html)
│   └── site-home.jsx / site-app.jsx  ← earlier React version of the marketing screens
└── docs/
    ├── DESIGN_SYSTEM_GUIDE.md     ← full brand guide: content voice, visual foundations, iconography
    ├── COMPONENTS_SOURCE.md       ← React source (.jsx + .d.ts + usage) for every component
    └── REVIEW_FUNNEL_SPEC.md      ← detailed funnel implementation spec + token-mapping table
```

**The two canonical, production-bound deliverables are `ui_kits/website/site/` and `ui_kits/website/review-funnel.html`.** The other files under `ui_kits/website/` are earlier explorations kept for reference; `site/` is the evolved, final direction.

---

## 2. How to run it (offline)

No build step. Open in any modern browser:

- **Full site** → `ui_kits/website/site/index.html` (then click through the nav — every page, tour, and footer link works).
- **Review funnel** → `ui_kits/website/review-funnel.html`.
- **Design-system reference** → `docs/DESIGN_SYSTEM_GUIDE.md` (brand guide) and `docs/COMPONENTS_SOURCE.md` (component source).

If you prefer a local server (recommended, so the icon font + bundle load without any file:// quirks):

```bash
cd handoff
python3 -m http.server 8000
# → http://localhost:8000/ui_kits/website/site/index.html
```

Fonts load from the Google Fonts CDN (internet required for fonts/icons); everything else is local.

---

## 3. The production site — `ui_kits/website/site/`

A navigable, premium ("quiet-luxury editorial") recreation of the live site. **German only.**

| File | Live route | What it is |
|---|---|---|
| `index.html` | `/` | Home — cinematic Vltava hero + corner seal, faint-star manifesto, interactive tour list↔preview, about, gallery, reviews, full-bleed CTA |
| `tours.html` | `/tours` | Tours list — editorial alternating image/text rows |
| `tour-detail.html` | `/tours/[slug]` | Single tour — hero, itinerary, sticky **glass** booking card, related |
| `zuzana.html` | `/zuzana-manova` | About — portrait, stats, credentials, philosophy |
| `blog.html` | `/blog` | Journal index — featured article + post grid |
| `article.html` | `/blog/[slug]` | Long-form article — drop cap, pull quote, callout, ornament; **desktop prose offset into the left ⅔ of a 3-col grid** |
| `kontakt.html` | `/contact` + `/book` | Contact & booking — enquiry form with success state; faint star accents |
| `privacy.html` | `/privacy` | Datenschutz |
| `terms.html` | `/terms` | AGB |

### Architecture
- **`site.css`** — all shared chrome (header, footer, buttons, kickers, display type, page banner, reveal animation, mobile menu) + the warm-white + faint-geometry ground for inner pages. Links the design-system tokens via `../../../styles.css`.
- **`site.js`** — injects the header + footer into every page (defined once), marks the current nav item, runs the solid-on-scroll header (home), scroll reveals (with a 1.5s fail-safe), and the mobile `<details>` menu.
- Each page declares `<body class="home|inner" data-page="…">`, an empty `<header class="nav" id="nav">`, and `<footer class="footer" id="footer">`; `site.js` fills them.

### Behavior notes
- It's a **cosmetic recreation**: the contact form shows a success state rather than emailing; external links (TripAdvisor / WhatsApp / Instagram) point to real destinations.
- Scroll-reveal fades require a live, visible browser; headless/offscreen screenshot tools may show reveal content blank — it renders for real users. A `@media (scripting: none)` fallback keeps all content visible if JS is off.
- The review funnel is linked from every footer ("Bewertung abgeben").

---

## 4. The review funnel — `ui_kits/website/review-funnel.html`

A mobile-first, self-contained page to convert guests met on a tour into Google / TripAdvisor reviewers. Star-rating entry routes 4–5★ to public review buttons and 1–3★ to private feedback; below the fold it adds progressive persuasion (how-to, copy-to-clipboard review helper, a personal note, social proof, a recommend-a-friend share dialog), with a sticky mobile CTA dock.

**Full implementation spec + the design-token mapping table → `docs/REVIEW_FUNNEL_SPEC.md`.** That doc is the most detailed in the package; read it before re-implementing the funnel.

**Config TODO before production:** replace `REPLACE_WITH_GOOGLE_PLACE_ID` in the funnel's inline `LINKS` object with Zuzana's real Google Business Profile place ID. The TripAdvisor URL is already wired.

**Compliance:** low ratings route to a private channel, but a visible "leave a public review anyway" link is intentionally kept on the 1–3★ path to stay within Google/TripAdvisor anti-gating policy — **do not remove it.**

---

## 5. The design system

Linked by one file: **`styles.css`** (it only `@import`s the token files — never edit rules into it directly).

**Colors** (`tokens/colors.css`) — warm paper grounds (`--canvas #FBF9F5`, `--paper #FAF6EC`, `--ivory #F5EFE4`), near-black ink type (`--ink #1A1714`), deep **burgundy** primary (`--burgundy #6B1F2A`; marketing gradient `--grad-burgundy #6C0008→#8E1B1B`), **brass/gold** accents (`--brass #A88654`, `--gold-olive #7B5800`, `--gold-lamp #FDC34D`), a warm-grey `--stone-*` UI scale, and hairline rules (`--rule #D9CFBC`).

**Type** (`tokens/typography.css`, `tokens/fonts.css`) — serif-led, four voices, all Google Fonts:
- `--font-display` **Italiana** (headlines, numerals)
- `--font-body` **Libre Caslon Text** (prose, ~19px / 1.72)
- `--font-italic` **Cormorant Garamond** (italic accents, always burgundy)
- `--font-sans` **Inter Tight** (eyebrows, labels, UI only)
- Legacy marketing voices preserved: `--font-headline` Noto Serif, `--font-label` Plus Jakarta Sans.

**Spacing / radii / shadows / motion** (`tokens/spacing.css`) — 4px base scale; small radii (6/8/12px, 24px feature panels, pills); soft warm low shadows; gentle `cubic-bezier(0.16,1,0.3,1)` easing.

**Icons** — **Material Symbols Outlined** (Google variable icon font), small (12–20px), beside eyebrows/links; the rating **star** is the one filled glyph (`FILL 1`, gold). No custom SVG icon set, no emoji. *(In the funnel, stars + platform logos are inline SVG to avoid icon-font flash on the conversion control.)*

**Components** — the React source (each with a `.d.ts` props contract and a `.prompt.md` usage note) is collected in **`docs/COMPONENTS_SOURCE.md`**; the compiled library is `_ds_bundle.js`, exposed at `window.ZuzaPragueToursDesignSystem_748186`. Self-contained (React only, styling via CSS custom properties).

**Full brand guide** (content voice, casing, tone, visual foundations, iconography, with examples) → **`docs/DESIGN_SYSTEM_GUIDE.md`.**

---

## 6. Implementing in the real Next.js repo

The site here is plain HTML/CSS so it's framework-agnostic and reviewable, but it maps cleanly onto `github.com/mandev-1/zuzapragtour.de` (`prague-tour-guide/`):

- **Tokens already exist** in the repo's `tailwind.config.js` (same burgundy, brass, ivory, ink, rule) and the four fonts are already wired in `app/layout.tsx` via `next/font/google`. The two gold tokens (`--gold-olive`, `--gold-lamp`) may need adding. The token-mapping table in `docs/REVIEW_FUNNEL_SPEC.md` lists the exact CSS-var → Tailwind-class correspondence.
- **Pages** → App Router routes (`app/<route>/page.tsx`). The funnel is best as `app/bewerten/page.tsx` + a `'use client'` component for the star/chip/share state.
- **Chrome** (`site.js`'s header/footer) → reuse the repo's existing `Header.tsx` / `Footer.tsx`; reuse its `TripAdvisorIcon` / `InstagramIcon` SVGs.
- **Reuse, don't re-implement, the primitives** — the repo already has tour data (`src/data/tours.ts`), brand facts (`src/brand.ts`), and blog editorial components (`src/components/blog/*`).
- Treat the HTML/CSS here as the **visual + interaction source of truth**; lift exact values rather than eyeballing.

### Config / wiring checklist before launch
- [ ] Funnel: drop in the real **Google review place ID**.
- [ ] Contact form: wire `kontakt.html`'s submit to a real email/Formspree/route handler (currently a success-state stub).
- [ ] Confirm the **TripAdvisor** write-review deep link.
- [ ] Image credits: the **Jewish Quarter / Josefov** photos are © **Jewish Museum in Prague** per the source repo's image notes — credit them if used in production.
- [ ] Keep the funnel's visible public-review link on the low-rating path (policy).

---

## 7. Assets & fonts

- **Images** (`assets/images/`) — the real brand photography, imported from the source repo. Same files exist in the repo at `prague-tour-guide/public/images/`.
- **Fonts** — all six families are Google Fonts, loaded live from the CDN in `tokens/fonts.css`; no local binaries are bundled. For an offline/self-hosted build, download Italiana, Libre Caslon Text, Cormorant Garamond, Inter Tight, Noto Serif, and Plus Jakarta Sans from Google Fonts.

---

*A developer who wasn't part of the original conversation should be able to run everything from section 2 and re-implement from sections 3–6 plus the two `docs/`. The HTML/CSS files are the visual source of truth for anything not spelled out.*
