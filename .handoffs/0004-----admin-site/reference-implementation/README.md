# Zuza Prague Tours — Website

The complete, self-contained website for **Zuza Prague Tours** (Ing. Zuzana Manová, German-speaking certified private guide in Prague). Moved out of the design-system project into its own dedicated project — every dependency it needs (styles, tokens, compiled component bundle, photography) travels with it, so it runs anywhere with no external links back to the design system.

German throughout, addressed formally (*Sie*). Cosmetic recreation: forms show a success state rather than submitting; external links (TripAdvisor / Instagram / WhatsApp) point to real destinations.

---

## Entry point

Open **`index.html`** — the homepage of the full multi-page site.

## Structure

### Main site (project root) — the primary deliverable
A complete, navigable 9-page site. Plain HTML/CSS/JS; shares one stylesheet (`site.css`) + one script (`site.js`) that injects the header and footer into every page.

| File | What it is |
|---|---|
| `index.html` | Home — cinematic hero, manifesto, tour list ↔ preview, about, gallery, reviews, CTA |
| `tours.html` | Tours list — editorial alternating image/text rows |
| `tour-detail.html` | Single tour — hero, itinerary, sticky glass booking card, related |
| `zuzana.html` | About Zuzana — portrait, stats, credentials, philosophy |
| `blog.html` | Journal index — featured article + post grid |
| `article.html` | Long-form article — drop cap, pull quote, callout, ornament |
| `kontakt.html` | Contact & booking — enquiry form with success state |
| `privacy.html` | Datenschutz |
| `terms.html` | AGB |
| `review-funnel.html` | Mobile-first review-collection funnel (linked from every footer as “Bewertung abgeben”) |

Supporting files: `site.css`, `site.js`, `article.css`, `journal.js`, `journal-content-1‑3.js`.

> **Before using the review funnel:** replace `REPLACE_WITH_GOOGLE_PLACE_ID` in the inline `LINKS` config in `review-funnel.html` with Zuzana's real Google Business Profile place ID.

### `app/` — interactive React recreation
The marketing site as a single-page React app (Home → Tours → Book), plus two standalone homepage directions.

| File | What it is |
|---|---|
| `app/index.html` | Entry — mounts the interactive Home/Tours/Book app |
| `app/home.html` | Standalone React `/` homepage |
| `app/home-premium.html` | Elevated “quiet-luxury editorial” homepage (self-contained) |
| `app/site-home.jsx`, `app/site-app.jsx` | App source |

### `journal/` — editorial long-form layout
| File | What it is |
|---|---|
| `journal/index.html` | Article layout — masthead, drop cap, pull quotes, callouts, ornaments |
| `journal/journal.jsx` | Source |

### Shared foundation (copied from the design system)
- `styles.css` — single entry point; `@import`s the four token files.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `fonts.css` (fonts + Material Symbols load live from the Google CDN).
- `_ds_bundle.js` — compiled design-system components (Button, Icon, TourRow, ReviewCard, …) used by the `app/` and `journal/` React pages.
- `assets/images/` — Prague photography and the Zuzana portrait.

---

## Notes
- The main site (project root) is pure HTML/CSS/JS and needs **only** `styles.css`, `site.css`, `site.js`, the journal JS, and `assets/images/`. It does not use `_ds_bundle.js`.
- The `app/` and `journal/` pages load `_ds_bundle.js` for the design-system components.
- Scroll-reveal fades depend on a live, visible browser; a `@media (scripting: none)` fallback keeps all content visible if JS is disabled.
