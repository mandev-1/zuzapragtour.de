# Handoff: Review Funnel (`/bewerten`) + Premium Homepage Direction

## Overview

This package hands off two designs for **zuzapragtour.de** (Zuza Prague Tours — Ing. Zuzana Manová's private Prague tour business):

1. **Review Funnel** *(primary, net-new — ready to deploy as a new route)* — a mobile-first page Zuzana points guests to after a tour, to convert them into **Google** and **TripAdvisor** reviewers. Suggested route: **`/bewerten`** (or `/review`).
2. **Premium Homepage Direction** *(optional — a redesign of `/`)* — an elevated "quiet-luxury editorial" treatment of the existing homepage. Included as a reference for a future homepage refresh; **not** required to ship the funnel.

Both are built in the **exact visual language of the existing site** and map cleanly onto the repo's current stack.

---

## About the design files

The files in `prototypes/` are **design references created in plain HTML/CSS/JS** — they show the intended look and behavior. **They are not production code to paste in.** The task is to **recreate them inside the existing Next.js app** (`prague-tour-guide/`) using its established patterns: the App Router, React/TSX components in `src/components/`, Tailwind with the project's `tailwind.config.js` tokens, the `next/font` Google fonts already configured in `app/layout.tsx`, and Material Symbols (already loaded).

Open `prototypes/website/review-funnel.html` in a browser to see the funnel (it's self-contained — `styles.css`, `tokens/`, and `assets/images/` travel with it).

## Fidelity

**High-fidelity.** Final colors, typography, spacing, copy (German), and interactions. Recreate pixel-faithfully using the codebase's existing libraries. Every token below already exists in the repo, so this should be a close port, not a reinterpretation.

---

## How this maps onto the existing codebase

The prototype uses CSS custom properties. **Almost all of them already exist as Tailwind tokens** in `prague-tour-guide/tailwind.config.js` — use the Tailwind class, not a new variable:

| Prototype token | Value | Use the existing Tailwind class |
|---|---|---|
| `--burgundy` | `#6B1F2A` | `burgundy` (`bg-burgundy`, `text-burgundy`, `border-burgundy`) |
| `--burgundy-deep` | `#4F1620` | `burgundy-deep` |
| `--brass` | `#A88654` | `brass` |
| `--brass-deep` | `#8C6A3C` | `brass-deep` |
| `--ivory` | `#F5EFE4` | `ivory` |
| `--ivory-deep` | `#EDE4D3` | `ivory-deep` |
| `--paper` | `#FAF6EC` | `paper` |
| `--ink` | `#1A1714` | `ink` |
| `--ink-soft` | `#3A332C` | `ink-soft` |
| `--ink-mute` | `#6B6055` | `ink-mute` |
| `--rule` | `#D9CFBC` | `rule` |
| `--gold-olive` | `#7B5800` | *(homepage hero gold — add as `gold` if not present)* |
| `--gold-lamp` | `#FDC34D` | *(gallery/eyebrow-on-dark gold — add if not present)* |
| `--stone-400` | `#A89880` | `stone-400` |

Fonts (already wired in `app/layout.tsx` as CSS variables → Tailwind families):

| Prototype | Tailwind family | Google font |
|---|---|---|
| `--font-display` | `font-display` | **Italiana** |
| `--font-body` | `font-body` | **Libre Caslon Text** |
| `--font-italic` | `font-italic` | **Cormorant Garamond** |
| `--font-sans` | `font-sans` | **Inter Tight** |

> Net new work vs. the existing site: the **funnel logic** (star routing, clipboard helper, share, sticky dock) and **two gold tokens** if they aren't already in the config. Everything else is existing tokens + fonts.

---

## PART 1 — Review Funnel (`/bewerten`)

### Goal & funnel logic
A guest who just finished a tour opens this on their phone. The page's entire job is to get a public review with the least friction, while catching unhappy guests privately.

- **Above the fold = the ask.** Warm portrait, headline *"Wie war Ihr Tag in Prag?"*, and **5 large tappable stars**.
- **Routing on star tap:**
  - **4–5 stars →** reveal the **public** panel: big **Google** + **TripAdvisor** buttons.
  - **1–3 stars →** reveal the **private** panel: WhatsApp + email ("tell me directly so I can fix it"), **plus** a small "leave a public review anyway" link (kept visible on purpose — see Compliance note).
- **Everything below the fold = progressive persuasion** for anyone still scrolling.

### Screens / sections (top → bottom, single column)

**0. Top bar** (sticky, `bg-paper/92` + `backdrop-blur`, 1px `rule` bottom border)
- Left: wordmark "Zuza **&** Pragtour" (`&` in burgundy), `font-display` ~1.15rem.
- Right: trust line — gold star glyph + "4,9 · 514 Bewertungen", `font-sans` 12px `ink-soft`.

**1. Hero / the ask** (centered)
- Circular avatar `zuzana-portrait.jpg`, 84×84, `border-radius:999px`, ring `0 0 0 1px rule` + soft shadow, `object-position: center 18%`.
- Eyebrow (no leading rule): "Schön, dass wir uns getroffen haben" — `font-sans` 11px, `letter-spacing:.26em`, uppercase, `brass-deep`.
- H1 `font-display`, `clamp(2.1rem, 8.5vw, 3rem)`, line-height 1.06: **"Wie war Ihr Tag in *Prag*?"** — "Prag" in `font-italic` italic `burgundy`.
- Sub `font-body` 1.075rem / 1.6, `ink-soft`, max-width 30rem: "Ihre Meinung bedeutet mir sehr viel — und sie hilft dem nächsten Reisenden, den Weg zu mir zu finden."
- **Star rating** (see Components).
- Hint `font-sans` 12px `ink-mute`: "Tippen Sie auf die Sterne · dauert nur 1 Minute" (changes to "Wunderbar — danke!" / "Danke für Ihr Feedback." after rating).
- **Result panel** (revealed below the stars — see Components).

**2. How it works** — eyebrow "In drei Schritten", H2 "So hinterlassen Sie eine Bewertung". Three numbered steps (numeral in a 34px circle, 1px `brass` border, `burgundy` numeral, `font-display`):
1. *Plattform wählen* — "Google oder TripAdvisor — ganz wie Sie möchten."
2. *Fünf Sterne vergeben* — "Ein Tipp genügt. Ein Konto ist meist schon vorhanden."
3. *Ein paar Worte schreiben* — "Zwei, drei Sätze reichen völlig. Brauchen Sie Inspiration? Siehe unten."

**3. Write helper** (panel, `ivory-deep` bg, radius 12px) — eyebrow "Eine kleine Hilfe", H2 "Nicht sicher, was Sie schreiben sollen?"
- Intro line, then **chips** (toggle buttons, pill, 1px `rule`; selected = `bg-burgundy` `text-ivory`): "Zuzanas Geschichten", "Jüdisches Viertel", "Versteckte Höfe", "Ihr Wissen", "Auf Deutsch", "Für Familien". Each chip has a `data-p` phrase.
- A read-only `<textarea>` that assembles a suggested German review from the selected chips.
- "Vorschlag kopieren" button (`bg-burgundy`) → copies textarea to clipboard, shows a toast "Vorschlag kopiert — jetzt einfügen".

**4. Note from Zuzana** (centered) — eyebrow "Warum es zählt", italic blockquote `font-italic` `clamp(1.45rem,5.5vw,1.85rem)`: *"Als unabhängige Führerin habe ich kein Marketing-Budget — nur Ihre Worte. Jede Bewertung hilft einem weiteren Reisenden, mich zu finden."* ("finden" in burgundy). Signature row: 46px avatar + "Zuzana Manová" / "Zertifizierte Stadtführerin".

**5. Social proof** (dark card, `bg-ink`, radius 24px, centered) — big "4,9" in `gold-lamp` `font-display` `clamp(3rem,14vw,4rem)`, 5 gold static stars, "514 Bewertungen · Sie sind in guter Gesellschaft". Two short testimonials separated by 1px `rgba(245,239,228,.16)` top borders, italic quote in ivory + uppercase gold attribution ("Thomas K. · TripAdvisor", "Monika H. · TourHQ").

**6. Other ways to help** — eyebrow "Noch mehr helfen?", H2 "Weitere kleine Gesten". Three rows (1px `rule`, radius 8px, hover → `brass` border), each: 40px circular `ivory-deep` icon chip + title + description + "→":
- "Die Seite teilen" → native share / copy link.
- "Auf Instagram folgen" → `https://www.instagram.com/erlebnis_tour_prag/`.
- "Eine weitere Tour" → `https://zuzapragtour.de/tours`.

**7. Footer** (centered) — "Zuza Prague Tours · Ing. Zuzana Manová", phone + email links (burgundy), "© 2026 · Vielen Dank für Ihren Besuch in Prag."

**8. Sticky dock** (mobile only, `< 720px`) — fixed bottom bar, `bg-paper/95` + blur, 1px `rule` top. Two buttons: **Google** (`bg-burgundy`) + **TripAdvisor** (`bg-ink`). Slides up (`translateY 110% → 0`) once the user scrolls past ~90% of the viewport height, or immediately after they rate. Hidden on desktop.

### Components — exact specs

**Star (interactive), ×5**
- `<button>` wrapping an inline `<svg viewBox="0 0 24 24">` star path; 44×44, 6px padding.
- Default: `path { fill: transparent; stroke: brass; stroke-width: 1.4 }`.
- Selected (`.on`): `path { fill: gold-olive; stroke: gold-olive }`.
- Hover fills up to the hovered index; on `mouseleave` returns to the chosen rating; `:active` scales the svg to 0.9.
- **Use inline SVG, not the Material Symbols star** — this avoids any icon-font flash on the most important control. (The rest of the site may keep Material Symbols.)

**Buttons** — min-height 58px (44px is the floor; these are generous for thumbs), radius 6px, `font-sans` 1rem/600.
- `.btn--burgundy`: `bg-burgundy` `text-ivory`, shadow `0 10px 26px rgba(107,31,42,.22)`, hover `burgundy-deep`.
- `.btn--ink`: `bg-ink` `text-paper`, hover `ink-soft`.
- `.btn--outline`: `bg-white` `text-ink` 1px `rule`, hover `border-ink`.
- Active: `scale(.985)`.
- Platform buttons carry a 22px inline-SVG logo (Google 4-color "G", TripAdvisor green owl) — see the prototype for the exact SVG markup; reuse the repo's existing `TripAdvisorIcon` from `src/components/Footer.tsx`.

**Result panel** — 1px `rule`, `bg-white`, radius 12px, `shadow-md`, padding ~2rem. Reveals via `max-height` 0 → 1100px + opacity 0 → 1 (0.5s). H2 `font-display` 1.6rem. Two stacked buttons (`gap: .75rem`).

### Interactions & behavior
- **Star tap:** set rating → fill stars → show positive or constructive panel → show dock → smooth-scroll the panel into view (`block:'center'`, ~120ms after reveal).
- **"Trotzdem öffentlich bewerten" link** (constructive panel): swaps to the positive (public) panel.
- **Chips:** toggle `.on`; rebuild the textarea suggestion. Base sentence: *"Eine wundervolle Privatführung durch Prag mit Zuzana."* + if any chips: *" Besonders in Erinnerung geblieben sind mir <list with 'und'>."* + *" Von Herzen zu empfehlen!"*.
- **Copy:** `navigator.clipboard.writeText` with a `document.execCommand('copy')` fallback; toast confirmation.
- **Share:** `navigator.share` if available, else copy URL + toast.
- **Sticky dock:** appears on scroll > 90vh OR immediately after rating.
- **Reveals:** sections fade/translate in via IntersectionObserver, with a 1.6s fail-safe that forces all visible (and `prefers-reduced-motion` shows everything immediately). **Important:** keep this fail-safe so content can never get stuck hidden.

### State
- `rating: number` (0–5).
- `pickedChips: string[]` → derived suggestion text.
- `dockVisible: boolean`.
- No server state. In React, local `useState` is enough; no data fetching.

### Configuration the client must provide
- **Google review link** — the prototype has a placeholder `REPLACE_WITH_GOOGLE_PLACE_ID`. Use Zuzana's Google Business Profile "write a review" link, e.g. `https://search.google.com/local/writereview?placeid=<PLACE_ID>`. Put it in an env var / the existing `brand.ts` (e.g. `BRAND.googleReview`).
- **TripAdvisor link** — already known: `https://www.tripadvisor.de/UserReview-g274707-d10450040-Zuza_Prague_Tours-Prague_Bohemia.html` (verify it deep-links to the write-review flow; otherwise use the Attraction_Review URL already in `brand.ts`).

### Compliance note (please read)
Routing low ratings to a private channel is common, but **Google and TripAdvisor discourage "review gating"** (hiding the public option from unhappy guests). The design intentionally keeps a visible "leave a public review anyway" link on the 1–3★ path to stay within policy. **Do not remove it.** If legal/marketing prefers, show the public buttons to everyone regardless of rating.

### Suggested implementation (Next.js App Router)
- New route `app/bewerten/page.tsx` (+ metadata: noindex is fine — this is a direct-link funnel, not for search).
- A client component `src/components/ReviewFunnel.tsx` (`'use client'`) holding the star/chip/share state.
- Reuse `Header`/`Footer`? **No** — the funnel is intentionally chrome-light (its own slim top bar + footer). Keep it standalone for focus.
- Optional enhancement discussed with the client (not in the prototype yet): personalize via query params, e.g. `/bewerten?tour=Jüdisches%20Viertel&name=…` to greet the guest and pre-seed the helper; and a DE/EN toggle (the site already has an EN variant via `LanguageContext`).

---

## PART 2 — Premium Homepage Direction (optional)

`prototypes/website/home-premium.html` is an elevated redesign of `/`. It keeps all current content and copy but shifts the register from the current marketing layout to a quieter editorial one. Treat as a **direction to discuss**, not a spec to ship blindly.

Highlights to recreate if pursued:
- **Italiana** display headlines (vs. the current Noto Serif marketing headline) with burgundy **Cormorant** italic emphasis words.
- Cinematic full-bleed hero (`charles-bridge-hero.jpg`), slow Ken-Burns zoom, layered scrim, a "Certified · Prague · Est. 1986" circular seal, and a header that transitions transparent-over-photo → solid `paper` on scroll.
- A one-line italic manifesto band.
- **Interactive tours**: a numbered editorial list (left) paired with a sticky preview image (right) that swaps on hover/focus.
- About section on an `ivory-deep` band with a burgundy italic standfirst and an offset brass portrait frame.
- Reviews as hairline-separated columns (no cards); dark gallery band; full-bleed burgundy CTA.
- Restrained motion (fade-up reveals with the same fail-safe), animated underlines, `prefers-reduced-motion` respected.
- Mobile: native `<details>` hamburger menu, single-column stacks.

---

## Design tokens (reference)
See `tokens/` for the full set. Colors and fonts are listed in the mapping table above. Other values used:
- **Radii:** 6px (buttons/inputs), 8px (rows/images), 12px (panels/cards), 24px (feature cards / dark proof card), 999px (pills, avatars, step numerals).
- **Shadows:** soft & warm — `0 2px 8px rgba(26,23,20,.05)` (sm), `0 8px 24px rgba(26,23,20,.08)` (md), button glow `0 10px 26px rgba(107,31,42,.22)`.
- **Spacing:** 4px base; sections `clamp(2.75rem, 8vw, 4rem)` vertical; funnel column `max-width: 600px`.
- **Motion:** ease `cubic-bezier(0.16,1,0.3,1)`; durations 0.2s (fast) / 0.3s (base) / 0.5s (reveal/transition).

## Assets
All imagery already exists in the repo at `prague-tour-guide/public/images/`. The prototypes reference (copied here under `assets/images/` for convenience):
- `zuzana-portrait.jpg` — funnel avatar & signature.
- Homepage direction also uses: `charles-bridge-hero.jpg`, `prague-castle.jpg`, `jewish-quarter.jpg`, `night-prague.jpg`, `hidden-gems.jpg`, `kafka.jpg`, `guest-tourguide.jpg`, `guest-night.jpeg`, `guest-food.jpeg`, `boat-vltava.jpg`, `charles-bridge-statue.jpg`.

Icons: **Material Symbols Outlined** is already loaded site-wide for general UI. For the funnel's **stars and platform logos, use inline SVG** (in the prototype) to avoid icon-font flash on the conversion-critical control. Reuse the existing `TripAdvisorIcon`/`InstagramIcon` SVGs from `src/components/Footer.tsx`.

## Files in this bundle
- `prototypes/website/review-funnel.html` — the funnel reference (open in a browser).
- `prototypes/website/home-premium.html` — the premium homepage direction reference.
- `styles.css` + `tokens/` — the design-system CSS custom properties (source of the token values above).
- `assets/images/` — the imagery used by the prototypes.

> A developer who wasn't in the original conversation should be able to implement the funnel from this README alone. The HTML files are the visual source of truth for anything not spelled out here.
