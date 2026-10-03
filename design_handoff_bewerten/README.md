# Handoff: /bewerten (Tour bewerten) redesign

## Overview
Redesign of `https://zuzapragtour.de/bewerten`, the page guests reach after a tour (QR code on site + link in follow-up email). Goal: get as many **5-star Google reviews** as possible, with TripAdvisor as secondary option. The old page had ~8 sections and a star-rating gate; the new page is one short screen: headline → Google CTA → TripAdvisor CTA → optional text helper → private feedback line.

Audience: German / Austrian / Swiss guests, mostly 45+, affluent. All copy is **German only** (the page does not need EN).

Two approved designs:
- **Desktop (≥ 768px)**: `Bewerten Desktop.dc.html` — clean Swiss grotesk layout, two columns.
- **Mobile (< 768px)**: `Bewerten Mobil.dc.html` with `variant="foto"` (default) — warmer: cream background, hero photo, rounded buttons, serif italic accents. Variants `portrait` / `brief` in that file are NOT approved; implement only `foto`.

> Note: desktop and mobile intentionally differ (desktop = cooler ivory, square buttons; mobile = cream, rounded, photo hero). If you want them unified later, port the mobile warmth to desktop — confirm with the owner first.

## About the Design Files
The `.dc.html` files are **design references built in HTML** (open them directly in a browser; `support.js` must sit next to them). They show the intended look and behaviour — they are not production code. Recreate them in the existing app in this repo: `prague-tour-guide/` (Next.js app router in `app/`, screens in `src/screens/`, Tailwind config in `tailwind.config.js`, brand constants in `src/brand.ts`, UI text in `src/utils/translations.ts`). The current live `/bewerten` page is not in `main`; find its source (other branch) or create:
- `app/bewerten/page.tsx` (metadata: title `Bewerten Sie Ihre Tour · Zuza Prague Tours`, robots `noindex, nofollow` — keep as on live site)
- `src/screens/BewertenPage.tsx`

The page should NOT render the global site Header/Footer — it has its own minimal header/footer (see below). Keep the existing footer link "Tour bewerten" → `/bewerten`.

## Fidelity
**High-fidelity.** Final colors, type, spacing, copy and interactions. Recreate pixel-accurately using Tailwind (add the tokens below to `tailwind.config.js` or use arbitrary values).

## Links (exact)
- Google review: `https://share.google/o68FfevojsSVDpK47`
- TripAdvisor review: `https://www.tripadvisor.de/UserReview-g274707-d10450040-Zuza_Prague_Tours-Prague_Bohemia.html`
- WhatsApp: `https://wa.me/420721231933`
- E-Mail: `mailto:zuzanamanova@email.cz`
- Phone: `tel:+420721231933`
- Home `https://zuzapragtour.de/`, `/privacy`, `/terms`
All external CTAs: `target="_blank" rel="noopener"`. Pull phone/email/TripAdvisor from `BRAND` in `src/brand.ts`; add `googleReview` + `tripadvisorReview` to `BRAND`.

**Important policy note:** do NOT reintroduce the old star gate (asking for stars first and hiding public review links from unhappy guests). Google forbids review gating. Both platforms must always be visible; private feedback is offered only as an extra line.

---

## Screen 1 — Mobile (< 768px) — `Bewerten Mobil.dc.html`, variant `foto`
Container: `max-width: 480px; margin: 0 auto; min-height: 100vh; background #F7F0E4; overflow: hidden; display:flex; flex-direction:column`. Font: Hanken Grotesk (UI), EB Garamond (italic accents).

### 1. Hero photo (position: relative)
- `<img src=mala-strana>` full width, `height: 340px; object-fit: cover; object-position: center 35%`. Alt: „Blick über die Dächer der Kleinseite auf St. Nikolaus“.
- Overlay header, absolute top, `padding 16px 18px`, `background: linear-gradient(rgba(30,20,12,.45), rgba(30,20,12,0))`, flex space-between:
  - Logo text „Zuza & Pragtour“ 15px/600 #FFFFFF, links to home.
  - Pill „4,9 ★ · 514 Bewertungen“ 13px/500 #FFFFFF, bg `rgba(30,20,12,.35)`, padding 5px 10px, radius 999px.
- Portrait `zuzana.jpg` absolute `left:20px; bottom:-40px`, 84×84, radius 50%, `border: 4px solid #F7F0E4`, `box-shadow: 0 6px 16px -6px rgba(60,35,20,.35)`.

### 2. Intro (`padding: 56px 20px 0`)
- Line: „Zuzana Manová · “ + „Zertifizierte Stadtführerin“ (second part #2C4F8F). 13px, #6B5A4C.
- H1 (margin-top 14px): „Wie war Ihre Tour “ + italic „mit mir?“. Base: Hanken 38px/500, line-height 1.04, letter-spacing −0.03em, `text-wrap: balance`. Italic part: EB Garamond 400 italic 44px, letter-spacing −0.01em, color #A3231B.
- P (margin-top 12px): „Danke, dass Sie Prag mit mir entdeckt haben. Ihre Zufriedenheit ist mir wichtig.“ 18px/1.5, #4A3D33.

### 3. CTA section (`padding: 30px 20px 32px`, flex column)
- Lead (margin-bottom 16px): „Fünf Sterne von Ihnen helfen mir sehr – bewerten Sie mich auf “ + „Google“ (#A3231B) + „!“. 20px/500, line-height 1.3, letter-spacing −0.01em.
- **Google button** (primary): flex space-between, `min-height: 92px; padding: 16px 20px; border-radius: 16px; background: #A3231B; color: #fff; box-shadow: 0 14px 26px -14px rgba(163,35,27,.8)`. Active: bg #8A1C15, `transform: scale(.99)`.
  - Left column, gap 5px: „★★★★★“ 17px, letter-spacing .12em, color #FFE7A8 · „Jetzt bei Google bewerten“ 21px/600, ls −0.015em · „Mit Ihrem Google-Konto · dauert 1 Minute“ 13px #FBE3E1.
  - Right: 40×40 circle `rgba(255,255,255,.16)` with „→“ 20px.
  - This element is observed for the sticky bar (see Interactions).
- **TripAdvisor button** (margin-top 10px): `min-height: 64px; padding: 12px 20px; radius 16px; bg #2C4F8F; color #fff`. Active bg #223F74. Text: „Oder bei TripAdvisor bewerten“ 17px/600 · „Mit Ihrem TripAdvisor-Konto“ 13px #DCE5F4. Right „→“ 20px.
- **Text helper card** (margin-top 24px): bg #FFFBF4, `border: 1px solid #EADCC6; radius 16px; padding 0 18px`.
  - Toggle button (full width, min-height 60px): „Brauchen Sie Inspiration?“ 16px/600 + sub „Ein Textvorschlag zum Kopieren“ 13px #6B5A4C; right 32×32 circle bg #F3E4DC, color #A3231B, „+“ / „−“.
  - Expanded (padding 2px 0 18px, gap 14px):
    - Chips (flex-wrap, gap 8px): min-height 40px, padding 0 14px, radius 999px, 14px/500. Off: bg #FFFBF4, text #4A3D33, border #E0CFB8. On: bg #2C4F8F, text #fff, border #2C4F8F.
    - Suggestion box: padding 14px 16px, radius 12px, bg #F7F0E4, EB Garamond italic 18px/1.5, #2A211B, wrapped in „ … “.
    - Copy button: full width, min-height 48px, radius 12px, `border 1px solid #A3231B`, 15px/600 #A3231B. Label „Vorschlag kopieren“ → „Kopiert ✓“ for 1.8s.
- Private feedback (margin-top 20px): „War etwas nicht so, wie Sie es sich gewünscht haben? Schreiben Sie mir persönlich per WhatsApp oder E-Mail.“ 15px/1.6 #4A3D33; links „WhatsApp“, „E-Mail“ in #2C4F8F (underlined).

### 4. Ornament (padding 4px 20px 26px, centered column, gap 10px)
Row (gap 14px): 48×1px line #D9C7AE · flower 18px (red stroke, blue center) · flower 26px (blue stroke, red center) · flower 18px (red, blue center) · line. Below: „Vielen Dank und bis bald in Prag“ EB Garamond italic 19px #6B5A4C.

### 5. Footer
`padding 20px 20px 28px; border-top 1px solid #E3D6C2;` centered, 13px #6B5A4C, gap 8px. Line 1 „Zuza Prague Tours · Ing. Zuzana Manová“. Line 2 links (gap 14px, wrap): „+420 721 231 933“, „E-Mail“, „Datenschutz“, „AGB“.

### 6. Sticky Google bar (only after main Google button scrolled above viewport)
`position: sticky; bottom: 0; z-index: 5; padding: 10px 12px calc(10px + env(safe-area-inset-bottom)); background: rgba(247,240,228,.94); backdrop-filter: blur(8px); border-top: 1px solid #E3D6C2`. Inner link: min-height 52px, radius 14px, bg #A3231B, #fff, 16px/600, centered „★★★★★“ (#FFE7A8, ls .08em) + „Bei Google bewerten“, gap 10px. Consider a 200ms fade/slide-up on appear.

---

## Screen 2 — Desktop (≥ 768px) — `Bewerten Desktop.dc.html`
Root bg #FAF8F4, color #1A1613, Hanken Grotesk, `min-height:100vh; overflow:hidden`, flex column.

- **Header**: padding `22px clamp(20px,5vw,64px)`, space-between. „Zuza & Pragtour“ 16px/600; „4,9 / 5 · 514 Bewertungen“ 14px/500 #2C4F8F, tabular nums.
- **Main**: `max-width 1200px; margin 0 auto; padding clamp(24px,6vw,80px) clamp(20px,5vw,64px) clamp(40px,6vw,96px); display grid; grid-template-columns: repeat(auto-fit, minmax(min(100%,380px),1fr)); gap clamp(40px,7vw,104px); align-items start; position relative`.
  - Watermark flowers (absolute, pointer-events none, z 0): red stroke #A3231B, 520×520, stroke-width .5 (in 48-unit viewBox), opacity .09, rotate(18deg), `top:-40px; right:-120px`. Blue #2C4F8F, 300×300, stroke .6, opacity .10, rotate(−12deg), `bottom:-60px; left:-90px`. Both sections above at `position:relative; z-index:1`.
  - **Left column** (gap 28px): flower 96px (red stroke 1, blue filled center) · H1 „Wie war Ihre Tour mit mir?“ `clamp(40px,6vw,72px)`/500, lh 1, ls −0.035em · P „Ihre Zufriedenheit ist mir wichtig.“ 19px/1.55 #453d33 · Portrait 52×52 (square) + „Zuzana Manová“ 14px/600 + „Zertifizierte Stadtführerin, Prag“ 14px #2C4F8F.
  - **Right column**:
    - Lead (mb 24px): „Fünf Sterne von Ihnen helfen mir sehr – bewerten Sie mich auf Google!“ (Google in #A3231B), `clamp(22px,2.4vw,28px)`/500, lh 1.25.
    - Google button: min-height 96px, padding 18px 26px, bg #A3231B, #fff, square corners, shadow `0 10px 24px -12px rgba(163,35,27,.7)`. Hover: bg #8A1C15, translateY(−2px), shadow `0 16px 30px -12px rgba(163,35,27,.8)`, transition .2s. Content: „★★★★★“ 18px ls .12em · „Jetzt bei Google bewerten“ `clamp(22px,2.2vw,26px)`/600 · „Mit Ihrem Google-Konto · dauert 1 Minute“ 14px #FBE3E1 · right „→“ 30px.
    - TripAdvisor button (mt 12px): min-height 72px, padding 14px 26px, bg #2C4F8F; hover bg #223F74 + translateY(−2px). „Oder bei TripAdvisor bewerten“ 19px/600 · „Mit Ihrem TripAdvisor-Konto“ 14px #DCE5F4 · „→“ 24px.
    - 28px spacer, then helper row: border-top + border-bottom 1px #c7bba6; button grid `40px 1fr auto`, min-height 72px: „Tipp“ 14px/600 #2C4F8F · „Formulierungshilfe“ 18px/500 · „+/−“ 22px #A3231B. Expanded panel padding `0 0 24px 52px`: chips (square, padding 8px 13px, 14px/500; off border #c7bba6 text #453d33; on bg/border #2C4F8F text #FAF8F4), suggestion 17px/1.55, copy link 14px/600 #A3231B.
    - Private feedback: padding `24px 0 0 52px`, 15px/1.6 #453d33, links #2C4F8F.
- **Ornament**: centered row, padding 8px 0 28px, gap 18px: 72px line #c7bba6 · flower 22 · flower 30 (blue, red center) · flower 22 · line.
- **Footer**: padding `22px clamp(20px,5vw,64px)`, border-top 1px #e0d8c9, 13px #645849, space-between: „Zuza Prague Tours · +420 721 231 933 · zuzanamanova@email.cz“ | „Datenschutz“ „AGB“.

## Flower ornament (shared SVG component)
`viewBox="0 0 48 48"`, `fill="none"`, five ellipses `cx=24 cy=13 rx=6 ry=10` rotated 0/72/144/216/288° around (24,24), plus `circle cx=24 cy=24 r=3.5` (center can be filled). Props: `size`, `stroke`, `strokeWidth`, `centerFill`. Make it one `<Flower />` component; `aria-hidden="true"`.

## Interactions & Behavior
- CTAs are plain external links (new tab). Optional: fire analytics events `review_click_google` / `review_click_tripadvisor`.
- Helper toggle: opens/closes panel (mobile and desktop). Default closed.
- Chips: multi-select toggles; suggestion text updates live:
  `"Eine wundervolle Privatführung durch Prag mit Zuzana." + [selected sentences in fixed order] + "Von Herzen zu empfehlen!"` joined with spaces.
  | Chip label | Sentence |
  |---|---|
  | Zuzanas Geschichten | Ihre Geschichten haben die Stadt für uns lebendig gemacht. |
  | Jüdisches Viertel | Besonders bewegend war der Rundgang durch das Jüdische Viertel. |
  | Versteckte Höfe | Sie hat uns Höfe und Gassen gezeigt, die wir allein nie gefunden hätten. |
  | Ihr Wissen | Ihr Wissen über Geschichte und Architektur ist beeindruckend. |
  | Auf Deutsch | Die Führung auf Deutsch war angenehm und sehr gut verständlich. |
  | Für Familien | Auch unsere Kinder waren begeistert und haben gerne zugehört. |
- Copy: `navigator.clipboard.writeText(text)` (catch errors silently); label → „Kopiert ✓“ for 1800ms.
- Sticky bar (mobile): `IntersectionObserver` on the main Google button; show bar when `!isIntersecting && boundingClientRect.top < 0`.
- Breakpoint: `< 768px` mobile layout, `≥ 768px` desktop layout (Tailwind `md:`). Hit targets ≥ 44px.

## State
`helperOpen: boolean`, `selectedChips: string[]`, `copied: boolean` (auto-reset timer), `showSticky: boolean` (mobile only). Client component (`'use client'`). No data fetching.

## Design Tokens
Desktop: bg #FAF8F4 · ink #1A1613 · text-2 #453d33 · mute #645849 · rule #c7bba6 · rule-soft #e0d8c9
Mobile (warm): bg #F7F0E4 · card #FFFBF4 · ink #2A211B · text-2 #4A3D33 · mute #6B5A4C · card border #EADCC6 · chip border #E0CFB8 · rule #E3D6C2 · ornament line #D9C7AE · icon bg #F3E4DC
Shared: red #A3231B (hover/active #8A1C15) · blue #2C4F8F (hover #223F74) · gold stars #FFE7A8 · on-red sub #FBE3E1 · on-blue sub #DCE5F4
Fonts: Hanken Grotesk 400/500/600; EB Garamond 400/500 + italic (mobile accents). Load via `next/font/google`.
Radius: desktop 0 · mobile buttons/cards 16px, inner 12px, sticky 14px, chips/pills 999px.
Shadows: Google desktop `0 10px 24px -12px rgba(163,35,27,.7)`; Google mobile `0 14px 26px -14px rgba(163,35,27,.8)`; portrait `0 6px 16px -6px rgba(60,35,20,.35)`.

## Assets
- `img/zuzana.jpg` — from `prague-tour-guide/public/images/thumbs/zuzana-portrait.jpg` (already in repo; use that path).
- `img/mala-strana.png` — from `image-compressor/in/photo-guests-mala-strana.jpeg`, rotated upright and resized to 675×900. For production: run it through the repo's `image-compressor`, export WebP/JPEG ~1200px wide into `public/images/bewerten-mala-strana.jpg`, and use `next/image` with `priority`.

## Files
- `Bewerten Desktop.dc.html` — desktop reference
- `Bewerten Mobil.dc.html` — mobile reference (use `variant="foto"`, the default)
- `support.js` — runtime needed to open the references in a browser
- `img/` — assets
