# Full Site — Zuza Prague Tours (premium, multi-page)

A complete, navigable recreation of **zuzapragtour.de** in the elevated "premium editorial" direction (Italiana display, glass chrome, faint geometry, warm-white ground). Every page is standalone HTML, shares one stylesheet + script, and links to the others with working navigation.

## Pages
| File | Route on live site | What it is |
|---|---|---|
| `index.html` | `/` | Home — cinematic hero, manifesto, tour list↔preview, about, gallery, reviews, CTA |
| `tours.html` | `/tours` | Tours list — editorial alternating image/text rows |
| `tour-detail.html` | `/tours/[slug]` | Single tour — hero, itinerary, sticky glass booking card, related |
| `zuzana.html` | `/zuzana-manova` | About Zuzana — portrait, stats, credentials, philosophy |
| `blog.html` | `/blog` | Journal index — featured article + post grid |
| `article.html` | `/blog/[slug]` | Long-form article — drop cap, pull quote, callout, ornament |
| `kontakt.html` | `/contact` + `/book` | Contact & booking — enquiry form with success state |
| `privacy.html` | `/privacy` | Datenschutz |
| `terms.html` | `/terms` | AGB |

## Shared foundation
- **`site.css`** — all chrome (header, footer, buttons, kickers, display type, page banner, reveal animation, mobile menu) + the warm-white + faint-geometry ground for inner pages. Links the design-system tokens at `../../../styles.css`.
- **`site.js`** — injects the header + footer into every page (so nav/footer stay consistent in one place), marks the current nav item, runs the solid-on-scroll header (home), scroll reveals (with a 1.5s fail-safe), and the mobile menu.

Each page sets `<body class="home|inner" data-page="…">`, an empty `<header class="nav" id="nav">`, and `<footer class="footer" id="footer">`; `site.js` fills them.

## Notes
- German only, per brief. All imagery from `../../../assets/images/`.
- The review funnel (`../review-funnel.html`) is linked from every footer ("Bewertung abgeben").
- Cosmetic recreation: the contact form doesn't submit (shows a success state); external links (TripAdvisor/Instagram/WhatsApp) point to real destinations.
- Scroll-reveal fades depend on a live, visible browser; offscreen/headless screenshot tools may show reveal content as blank — it renders correctly for users. A `@media (scripting: none)` fallback keeps all content visible if JS is disabled.
