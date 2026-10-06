# Handoff: Homepage, mobile (v2): "sell more tours to German guests"

## Overview
This is a redesign of the **mobile** homepage (`/`, `src/components/Home.tsx`) on the `zuzapragtour.de` branch. The goal is more tour enquiries from German‑speaking guests (DE/AT/CH). The design focuses on four audiences: seniors, first‑time visitors, guests interested in 20th‑century history (GDR, Havel, 1989) and corporate groups. WhatsApp is the primary enquiry channel and prices stay "auf Anfrage".

**No new facts were added.** Every claim comes from text that already exists on the site, mostly `src/utils/translations.ts`. The source key is listed next to each string below. Only headings, button labels and the prefilled WhatsApp messages are new microcopy.

Scope: viewports **below 900 px**. The current tour hover-preview layout starts at 900 px. The desktop layout is **out of scope**: keep today's desktop, or ask the owner before you change it. The header (`Header.tsx`) and its mobile menu stay **unchanged**.

## About the Design Files
The files in this bundle are **design references created in HTML**. They are prototypes that show the intended look and behaviour, not production code to copy. The task is to **recreate the design in the existing Next.js + Tailwind codebase** (`prague-tour-guide/`). Use its existing patterns: the `SiteUI` primitives (`Kicker`, `ULink`, `Btn`, `SHELL`), the Tailwind tokens in `tailwind.config.js`, `next/font` families, the `t()` translations and `BRAND` from `src/brand.ts`.

- `Startseite Mobil v2.dc.html` is the new design. Open it directly in a browser, or open `Startseite Mobil v2-Vorschau.dc.html` to see it in a 390 × 844 frame next to today's page.
- `Startseite Mobil.dc.html` is a faithful rebuild of **today's** mobile homepage, included for comparison.
- In the `.dc.html` files, inline styles hold the exact values. The `{{ … }}` holes are filled by the small logic class at the bottom of each file.

## Fidelity
**High‑fidelity.** Colours, typography, spacing and copy are final. Recreate them pixel‑accurately with the existing tokens and components. All measurements below are at a 390 px viewport. `clamp()` values are given in full so they scale like the prototype.

---

## Page structure (top → bottom)
| # | Section | id | Background |
|---|---|---|---|
| – | Header (unchanged, fixed, transparent over hero → solid) | – | – |
| 1 | Hero | `top` | photo + dark gradient |
| 2 | „Welche Tour passt zu Ihnen?" (audience tiles) | `fuer-wen` | paper `#FAF6EC` |
| 3 | Tours (6 cards) | `tours` | paper, 1 px top rule |
| 4 | Reviews + guest photos | `reviews` | ink `#1A1714` |
| 5 | About Zuzana (short) | `about` | ivory‑deep `#EDE4D3` |
| 6 | Enquiry: 3 steps + CTA | `anfrage` | photo + burgundy gradient |
| 7 | Footer (restyled) | `footer` | paper, 1 px top rule |
| – | Sticky WhatsApp bar (new overlay) | – | translucent paper |

The page measures about 6 500 px tall at 390 × 844 (≈ 7.7 screens), against about 8 340 px today.

**Removed from the mobile page**
- The manifesto band. Its quote moved into About.
- The hover/`activeTour` highlight in the tour list.
- The SEO tour titles in the list. Keep them for `<title>`/meta.
- The About stats (40+, 4,9k, 5,0).
- The `about.expertise` and `about.promise` paragraphs. They remain on `/zuzana-manova`.
- The 4‑tile gallery grid, now a photo strip.
- The TripAdvisor and TourHQ widget cards, now two links.
- The hero link „Touren erkunden".
- The CTA paragraph „Begrenzte Verfügbarkeit…".

---

## Shared patterns
- **SHELL**: `max-width:1240px; margin-inline:auto; padding-inline:clamp(1.5rem,5vw,5rem)` (= 24 px on phones). This is the existing `SHELL`.
- **Kicker**: the existing `<Kicker>`. Inter Tight 11 px/500, uppercase, letter‑spacing 0.28em, gap 0.9rem, with a leading 28 × 1 px line.
  - On light backgrounds: text `#8C6A3C` (brass‑deep) and line `rgba(168,134,84,.7)`.
  - On dark backgrounds (`tone="lamp"`): text and line `#FDC34D`.
- **Section H2**: Italiana (`font-display`), `clamp(2.1rem,4vw,3.2rem)` (33.6 px), weight 400, line‑height 1.04, letter‑spacing −0.015em, `margin-top:14px` below the kicker.
  - Accent `<em>`: Cormorant Garamond italic (`font-italic italic`). Colour `#6B1F2A` on light, `#FDC34D` in reviews, ivory in the enquiry section.
- **Primary button (on dark)**: full width, min‑height 56 px, flex centred, gap 10 px, padding 0 20 px, background `#F5EFE4`, text `#1A1714`, Inter Tight 13 px/600, uppercase, letter‑spacing 0.16em, radius 0, `chat` icon 20 px. Hover: background `#FFFFFF`.
- **Text link with underline**: inline‑flex, min‑height 44 px, gap 8 px, Inter Tight 12 px/600, uppercase, letter‑spacing 0.14–0.16em, `border-bottom:1px solid currentColor`.
- **Icons**: Material Symbols Outlined from the existing self‑hosted subset. Used: `arrow_forward`, `call`, `chat`, `check`, `open_in_new`, `star` (FILL 1 for stars). All of them are already in `public/fonts/material-symbols-subset.woff2`.
- **Touch targets**: every interactive element is at least 44 px tall.

---

## 1 · Hero
- **Section**: `position:relative; display:flex; align-items:flex-end; min-height:100svh; overflow:hidden`. Keep today's `<picture>` (Vltava hero on mobile, `object-position:center 42%`) and the Ken Burns animation.
- **Overlay** (changed: darker at the bottom for the larger CTA block):
  `linear-gradient(to top, rgba(20,16,12,.84) 0%, rgba(20,16,12,.2) 48%, rgba(20,16,12,.18) 100%), linear-gradient(to right, rgba(20,16,12,.5) 0%, transparent 60%)`
- **Content**: SHELL; padding‑top 112 px; padding‑bottom `clamp(2.25rem,5vh,4.5rem)`.

| Element | Spec | Copy (DE) | Source |
|---|---|---|---|
| Eyebrow | Kicker, text `#F5EFE4`, line `#FDC34D`, margin‑bottom 22 px | Stadtführerin seit 1986 | new (fact: `zm.cred.1.desc`) |
| H1 | Italiana `clamp(3rem,13vw,6.5rem)` (50.7 px @390, 48 px @360), 400, lh 0.98, ls −0.02em, `#F5EFE4`, `text-wrap:balance` | Prag privat entdecken. *Auf Deutsch.* (the second sentence is a Cormorant italic `<em>`) | new (EN today: "Discover Prague, privately.") |
| Sub | margin‑top 1.25rem, max‑width 32rem, Libre Caslon `clamp(1.05rem,1.4vw,1.25rem)`, lh 1.6, `rgba(245,239,228,.92)` | Persönlich geführt von Ing. Zuzana Manová – vierzig Jahre Geschichten, die Sie in keinem Reiseführer finden. | from today's hero sub + `zm.hero.subtitle` |
| Proof list | margin‑top 1.25rem, flex‑wrap, gap 8 px 20 px, Inter Tight 13.5 px/500, lh 1.4, ivory; icon 17 px `#FDC34D`, gap 7 px | ★ 4,9 auf TripAdvisor · ✓ Privat – nur Ihre Gruppe | `footer.tripadvisor.trustLine`, `tourpage.groupSizeValue` |
| CTA | primary button, margin‑top 1.75rem | Per WhatsApp anfragen | new (cf. `contact.booking.phone.whatsapp`) |
| Microline | margin‑top 12 px, centred, Cormorant italic 18 px, lh 1.35, `rgba(245,239,228,.88)` | Ich antworte in der Regel innerhalb von 24 Stunden. | `hero.responsePromise` |

## 2 · „Welche Tour passt zu Ihnen?"
- **Section**: padding `clamp(3rem,7vh,5rem) 0 clamp(2.5rem,6vh,4rem)`, SHELL.
- **Kicker**: „Ihre Prag-Reise" (new). **H2**: „Welche Tour passt *zu Ihnen*?" (new).
- **Grid**: `margin-top:24px; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px`.
- **Tile** (`<a>` to an in‑page anchor): flex column, `justify-content:space-between`, gap 14 px, min‑height 132 px, border 1 px `#D9CFBC`, background `#FDFAF3`, padding 16 px 14 px. Hover: border `#A88654`.
  - Title: Italiana 22 px, lh 1.1, `#1A1714`.
  - Bottom row: flex, `align-items:flex-end`, `justify-content:space-between`, gap 8 px. Libre Caslon 14 px, lh 1.4, `#6B6055`, then `arrow_forward` 17 px `#8C6A3C`.

| Tile title | Sub line | Target | Fact source |
|---|---|---|---|
| Zum ersten Mal in Prag | Burg und Altstadt an einem Tag | `#tour-burg` | `tour.castle.faq4.a` |
| In Ihrem Tempo | Weitgehend flache Wege, ohne Hetze | `#tour-altstadt` | `tour.oldtown.faq2.a`, `tour.castle.faq3.a` |
| Geschichte bis 1989 | Deutsches Erbe und Havel-Tour | `#tour-erbe` | tours `german`, `havel` |
| Firmen & Gruppen | Bis zu 50 Personen | `#tour-individuell` | `tours.faq.a3`, `tourinfo.groups.desc` |

## 3 · Tours
- **Section**: border‑top 1 px `#D9CFBC`, padding `clamp(3rem,7vh,5rem) 0`, SHELL.
- **Kicker**: „Ausgewählte Erlebnisse" (`home.tours.teaser.title`). **H2**: „Jede Tour beginnt mit Ihrer *Neugier*." (today's H2 without the `<br>`).
- **Sub**: margin‑top 14 px, Libre Caslon 16 px, lh 1.6, `#6B6055`. Copy: „Alle Touren sind privat – nur Ihre Gruppe. Preis auf Anfrage." (`tours.faq.a3`, `tour.price`).
- **List**: margin‑top 22 px, border‑top 1 px rule.
- **Card** (`<li id="tour-…">`): `scroll-margin-top:84px; display:grid; grid-template-columns:104px minmax(0,1fr); gap:16px; align-items:start; padding:20px 0 14px; border-bottom:1px solid #D9CFBC`.
  - Thumbnail: 104 × 132, `object-fit:cover`, radius 4 px, placeholder background `#EDE4D3`. It links to the tour page.
  - Title (link to the tour page): Italiana 24 px, lh 1.08, `#1A1714`.
  - Duration: margin‑top 7 px, Inter Tight 11 px/500, uppercase, letter‑spacing 0.16em, `#8C6A3C`.
  - Places: margin‑top 7 px, Libre Caslon 14.5 px, lh 1.5, `#3A332C`.
  - Benefit: margin‑top 8 px, flex, gap 6 px, Inter Tight 13.5 px/500, lh 1.35, `#6B1F2A`, `check` 17 px.
  - Ask link: „Diese Tour anfragen" (new), text link with underline in `#1A1714`, `chat` 18 px, margin‑top 2 px, padding‑top 8 px. It opens WhatsApp with the tour name (see Behaviour).

**New order and content.** Short titles need a new key, e.g. `tour.<id>.shortTitle`, because the DE `tour.<id>.title` is an SEO title.

| # | id | Short title (DE) | Duration | Places | Benefit | Thumb |
|---|---|---|---|---|---|---|
| 1 | `tour-altstadt` | Altstadt & Jüdisches Viertel | `tour.oldtown.duration` (3 Stunden) | Altstädter Ring, Astronomische Uhr, Jüdisches Viertel, Karlsbrücke (`tour.oldtown.h1–h4`) | Weitgehend flach, für die meisten Fitnessniveaus (`tour.oldtown.faq2.a`) | `/images/thumbs/blog-jewish-quarter-2-min.jpg` |
| 2 | `tour-burg` | Prager Burg | 3–4 Stunden (`tour.castle.duration`) | Höfe der Prager Burg, Veitsdom, Goldenes Gässchen (`h1–h3`) | Eintrittsstrategie ohne lange Wartezeit (`tour.castle.inc2`) | `/images/thumbs/prague-castle.jpg` |
| 3 | `tour-erbe` | Prags Deutsches Erbe | Flexibel (`tour.german.duration`) | Literarisches Prag: Kafka, Rilke und Mozarts Prag (`inc2`) | Ehrliche Darstellung der deutsch-tschechischen Geschichte (`inc4`, shortened) | `/images/thumbs/prague-castle-cathedral.jpg` |
| 4 | `tour-havel` | Václav-Havel-Tour | 2,5–3 Stunden (`tour.havel.duration`) | Wenzelsplatz, Národní, Laterna Magika, Lucerna-Passage (`h2`, `inc2`, `inc3`) | Augenzeugenbericht vom November 1989 durch Ihre Führerin (`inc1`) | `/images/thumbs/havel-tour.jpg` |
| 5 | `tour-versteckt` | Verstecktes Prag | 2–3 Stunden (`tour.hidden.duration`) | Geheime Gärten, versteckte Innenhöfe, lokale Cafés (`h1–h3`) | Café- oder Gebäckstopp bei Einheimischen inbegriffen (`inc3`) | `/images/blog-hidden-gems-min.jpg` |
| 6 | `tour-individuell` | Individuelle Privattour | Flexibel (`tour.custom.duration`) | Ihr Tempo, Ihre Interessen. Persönliche Routenplanung vor der Tour (`h2` + `inc1`) | Für Paare, Familien und Gruppen bis 50 Personen (`tours.faq.a3`) | `/images/thumbs/blog-night-prague-min.jpg` |

Tour links use the DE slugs from `tours.ts` (`/tours/{slugDe}`). Use the dedicated keys `tour.<id>.homePlaces` / `tour.<id>.homeBenefit` rather than slicing longer strings. EN text comes from the EN values of the listed source keys.

## 4 · Reviews (dark)
- **Section**: background `#1A1714`, text `#F5EFE4`, padding `clamp(3.5rem,8vh,6rem) 0`.
- **Kicker** (lamp): „Von meinen Gästen". **H2** (ivory): „Worte meiner *Gäste*", with the em in `#FDC34D`.
- **Rating link** (to the TripAdvisor listing): margin‑top 16 px, inline‑flex, flex‑wrap, min‑height 44 px, gap 6 px 12 px, Inter Tight 15 px/500 ivory. It shows 5 × `star` (18 px, FILL 1, `#FDC34D`, gap 2 px) and then „4,9 von 5 auf TripAdvisor" (`home.tripadvisor.badge.rating`). **Use only this figure on the page.** No review count, because the sources disagree.
- **Quote scroller**: margin‑top 20 px, flex, gap 12 px, `overflow-x:auto`, `scroll-snap-type:x mandatory`, padding‑inline = SHELL padding, `scroll-padding-inline` = SHELL padding. Hide the scrollbar (`scrollbar-width:none` plus `::-webkit-scrollbar{display:none}`).
  - Card (`<figure>`): `flex:0 0 82%; max-width:360px; scroll-snap-align:start`, flex column, `justify-content:space-between`, gap 20 px, border 1 px `rgba(245,239,228,.18)`, padding 22 px 20 px, radius 0.
  - Quote: Cormorant italic 20 px, lh 1.45, ivory, in „…" quotes. Name: Inter Tight 13 px/600, letter‑spacing 0.04em. Source: margin‑top 4 px, Inter Tight 10 px, uppercase, letter‑spacing 0.2em, `#FDC34D`.
  - Content: the 3 existing `REVIEWS` from `Home.tsx`, unchanged.
- **Photo strip**: margin‑top 12 px, flex, gap 10 px, `overflow-x:auto`, padding‑inline SHELL. The 4 `GALLERY` images, `object-fit:cover`:
  - guest‑tourguide 220 × 160
  - guest‑night 160 × 160
  - guest‑food 160 × 160
  - boat‑vltava 220 × 160
- **Links row**: margin‑top 22 px, flex‑wrap, gap 4 px 26 px. Two links with `open_in_new` (15 px), Inter Tight 12 px/600, uppercase, letter‑spacing 0.14em, ivory, min‑height 44 px:
  - „Alle Bewertungen", to the TripAdvisor listing.
  - „Profil auf TourHQ", to `BRAND.tourhq`.
  - These replace `TripAdvisorWidget` and `TourHqWidget` on mobile.

## 5 · About Zuzana
- **Section**: background `#EDE4D3`, padding `clamp(3.5rem,8vh,6rem) 0`, SHELL.
- **Portrait**: wrapper `position:relative; margin-right:12px`. Brass frame `position:absolute; top:12px; right:-12px; bottom:-12px; left:12px; border:1px solid #A88654`. Image `position:relative; width:100%; aspect-ratio:4/3; object-fit:cover; object-position:center 40%`.
- **Kicker** (margin‑top 38 px): „Lernen Sie Zuzana kennen". **H2**: „Prag, erzählt mit *Leidenschaft*."
- **Paragraph**: margin‑top 16 px, Libre Caslon 16.5 px, lh 1.65, `#3A332C`. It is the first two sentences of `about.intro`: „Ich bin Ing. Zuzana Manová – deutschsprachige Prag-Expertin und zertifizierte Stadtführerin. Seit 1986 führe ich Besucher durch Prag."
- **Checklist**: margin‑top 20 px, flex column, gap 12 px. Each item: grid 22 px | 1fr, gap 10 px, Libre Caslon 15.5 px, lh 1.5, `#1A1714`, `check` icon 19 px `#8C6A3C` (margin‑top 2 px). Items:
  1. Offizielle Stadtführerlizenz der Tschechischen Republik (`zm.faq.a4`)
  2. Akkreditiert am Jüdischen Museum in Prag (`zm.faq.a4`)
  3. Unterwegs mit Schulklassen, Familien, Vorständen und Filmteams (`about.expertise`)
  4. Im November 1989 bei den Demonstrationen auf dem Wenzelsplatz (`tour.havel.faq2.a`)
- **Quote**: margin‑top 26 px, Cormorant italic 22 px, lh 1.35, `#6B1F2A`: „Prag ist eine vielschichtige Geschichte — lassen Sie uns diese gemeinsam lesen." (today's manifesto)
- **Link**: margin‑top 18 px, text link with underline in ink: „Mehr über Zuzana", `arrow_forward` 16 px, to `/zuzana-manova`.

## 6 · Enquiry (`#anfrage`)
- **Section**: `position:relative; overflow:hidden`, padding `clamp(3.75rem,9vh,6.5rem) 0`, ivory text.
- **Background**: `charles-bridge-statue.jpg` (cover) with overlay `linear-gradient(rgba(79,22,32,.86), rgba(20,16,12,.92))`.
- **Kicker** (lamp): „Zertifizierte Expertin · 40 Jahre". **H2**: `clamp(2.3rem,5vw,4rem)` (36.8 px), „Bereit, Prag zu *entdecken*?" (both are today's copy).
- **Steps** (`<ol>`): margin‑top 24 px, border‑top 1 px `rgba(245,239,228,.2)`. Each item: grid 40 px | 1fr, gap 10 px, padding 18 px 0, border‑bottom 1 px `rgba(245,239,228,.2)`.
  - Number: Italiana 30 px, lh 1, `#FDC34D`.
  - Title: Italiana 23 px, lh 1.15.
  - Text: margin‑top 6 px, Libre Caslon 15 px, lh 1.55, `rgba(245,239,228,.86)`.

| # | Title (new) | Text | Source |
|---|---|---|---|
| 1 | Schreiben Sie mir | Ihr Wunschdatum, die Gruppengröße und Ihre Interessen – per WhatsApp, Telefon oder Formular. | `contact.booking.intro.text`, `contact.faq.a1` |
| 2 | Persönliche Antwort | Ich antworte in der Regel innerhalb von 24 Stunden, bestätige die Verfügbarkeit und passe die Tour für Sie an. | `hero.responsePromise`, `contact.booking.intro.text` |
| 3 | Wir treffen uns | Am Treffpunkt der Tour. Bei individuellen Touren in der Regel an Ihrem Hotel oder einem Wahrzeichen Ihrer Wahl. | `tour.custom.meetingPoint` |

- **CTA**: margin‑top 26 px, primary button „Per WhatsApp anfragen".
- **Secondary row**: margin‑top 8 px, flex‑wrap, centred, gap 0 26 px, min‑height 44 px each:
  - `call` icon 18 px `#FDC34D` with „+420 721 231 933" (`tel:`), Inter Tight 14 px/500.
  - „Lieber per Formular" (new): Inter Tight 14 px/500, underlined with offset 4 px, to `/book#contact-title`.

## 7 · Footer (restyled)
`Footer.tsx` is **site‑wide**. Either apply the new style everywhere (recommended, because the legacy Noto Serif / Plus Jakarta look is inconsistent on every page), or gate it to `/`. Keep today's rule that hides the dark CTA band on `/`.

- **Container**: background `#FAF6EC`, border‑top 1 px `#D9CFBC`, inner SHELL with padding 40 px top and 20 px bottom.
- **Wordmark**: „Zuza & Pragtour", Italiana 26 px, letter‑spacing 0.02em (the "&" in `font-weight:400`).
- **Tagline**: margin‑top 8 px, max‑width 30rem, Libre Caslon 15 px, lh 1.6, `#6B6055`. Copy: `footer.tagline`.
- **Link columns**: grid `minmax(0,1.2fr) minmax(0,0.8fr)`, gap 20 px, margin‑top 26 px.
  - Headings (h4): Inter Tight 11 px/500, uppercase, letter‑spacing 0.24em, `#8C6A3C`.
  - Lists: margin‑top 6 px, column. Links: Inter Tight 15 px, lh 1.4, `#3A332C`, padding 10 px 0. The email uses `overflow-wrap:anywhere`.
  - „Kontakt": phone, WhatsApp, email.
  - „Schnelllinks": Touren, Über Zuzana, Journal, Kontakt, Tour buchen. „Startseite" was dropped and „Blog" renamed to „Journal" to match the header.
- **Social row**: margin‑top 18 px, flex‑wrap, gap 0 22 px, Inter Tight 14 px, min‑height 44 px. Links: TripAdvisor · TourHQ · Instagram.
- **Legal**: margin‑top 16 px, padding‑top 14 px, border‑top 1 px rule, Inter Tight 12.5 px, lh 1.5, `#6B6055`.
  - First line: „© {year} Zuza Prague Tours – Zuzana Manová. Alle Rechte vorbehalten".
  - Then the links Datenschutz · AGB · Tour bewerten (gap 0 18 px, min‑height 40 px).
- **Bar spacer**: when the sticky bar is enabled, add a 76 px spacer at the very end so the bar never covers the legal links.

## Sticky WhatsApp bar (new)
- `position:fixed; left:0; right:0; bottom:0; z-index:40`. That is below the header (z‑50) and the menu (z‑49).
- Bar: border‑top 1 px `rgba(217,207,188,.9)`, background `rgba(250,246,236,.94)`, `backdrop-filter:blur(12px)`, padding `10px clamp(1rem,4vw,1.5rem) calc(10px + env(safe-area-inset-bottom))`.
- Button: min‑height 52 px, flex centred, gap 10 px, radius 4 px, background `#6B1F2A` (hover `#4F1620`), white Inter Tight 15 px/600 in sentence case, `chat` icon 20 px. Label: „Per WhatsApp anfragen".
- **Visibility**: `scrollY > 0.7 × innerHeight` (the same threshold at which the header turns solid), **and** the top of `#anfrage` is more than 40 px below the viewport bottom (`> innerHeight − 40`), **and** the mobile menu is closed. Otherwise the bar is not rendered.
  - Use scroll + resize listeners, or IntersectionObservers on the hero and `#anfrage`.
  - The prototype also polls every 300 ms. That poll is only a workaround for running inside an iframe preview; don't port it.
- `BlogPromo` is already hidden on `/`, so there is no overlap.

---

## Interactions & Behaviour
- **WhatsApp links**: `https://wa.me/${BRAND.phoneRaw.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`, opened in a new tab (`rel="noopener noreferrer"`).
  - General message (hero, enquiry, sticky bar): „Guten Tag Frau Manová, ich interessiere mich für eine private Stadtführung in Prag."
  - Per tour: „Guten Tag Frau Manová, ich interessiere mich für die Tour „{Kurzname}"." The name is the short title from the table above.
- **Audience tiles**: in‑page anchors to `#tour-…`. Smooth scroll already comes from `scroll-smooth` on `<html>`, and `scroll-margin-top:84px` on each card clears the fixed header.
- **Header and menu**: unchanged, transparent over the hero and solid after 70 % of the viewport.
- **Hover**:
  - Tiles: the border turns `#A88654`.
  - Light buttons: background `#FFFFFF`.
  - Burgundy buttons: background `#4F1620`.
  - The existing `ULink`/`Btn` transitions can be reused: 300 ms, `ease-brand cubic-bezier(.16,1,.3,1)`.
- **Optional**: wrap sections in the existing `<Reveal>` (it isn't shown in the static prototype).
- **Channel flag** (prototype tweak `channel`): keep a constant such as `PRIMARY_CHANNEL: 'whatsapp' | 'form'`. With `'form'`:
  - Primary buttons read „Anfrage senden" (`hero.sendEnquiry`) with `arrow_forward` and link to `/book#contact-title`.
  - The secondary link reads „Lieber per WhatsApp".
  - The tour ask links go to the form.
- **Optional flags**: `stickyBar` (default on) and `showAudience` (section 2, default on).

## State
- **Existing** (Header): `isMenuOpen`, `solid`.
- **New** (Home): `showBar` (boolean), derived from scroll position, the `#anfrage` position and `isMenuOpen`. The bar has to know whether the menu is open. Lift that state or use a context or event; the simplest way is to read `document.documentElement.style.overflow === 'hidden'`, which Header sets while the menu is open, but a shared context is cleaner.
- There is no data fetching. Tours come from `src/data/tours.ts` plus the new translation keys.

## Design tokens (all already in `tailwind.config.js` / `site-tokens.css`)
- **Colours**
  - paper `#FAF6EC`
  - ivory `#F5EFE4`
  - ivory‑deep `#EDE4D3`
  - card `#FDFAF3`
  - ink `#1A1714`
  - ink‑soft `#3A332C`
  - ink‑mute `#6B6055`
  - rule `#D9CFBC`
  - burgundy `#6B1F2A`
  - burgundy‑deep `#4F1620`
  - brass `#A88654`
  - brass‑deep `#8C6A3C`
  - gold‑lamp `#FDC34D`
  - Menu only (unchanged): journal‑rule `#E4DFD6`, border `#D9D3C9`.
- **Fonts**
  - Display: Italiana (`font-display`).
  - Italic accents: Cormorant Garamond (`font-italic`).
  - Body: Libre Caslon Text (`font-body`).
  - UI: Inter Tight (`font-sans`).
  - Mobile menu (unchanged): Newsreader and Hanken Grotesk.
- **Type sizes**: 10, 11, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 18, 20, 22, 23, 24, 26, 30 px, plus the H1/H2 clamps above.
- **Radii**: 0 (buttons, tiles, quote cards); 4 px (thumbnails, sticky‑bar button, header button).
- **Shadows**: none on the new page.

## Assets
All images already exist in `prague-tour-guide/public/images/`. The bundle's `img/` folder only holds copies for the HTML prototype:

| Prototype path | Repo path |
|---|---|
| `img/home/vltava-bridges-hero-1080.webp` | `/images/hero/vltava-bridges-hero-*.{avif,webp,jpg}` (keep today's `<picture>`) |
| `img/home/charles-bridge-statue.jpg` | `/images/charles-bridge-statue.jpg` |
| `img/home/guest-night.jpeg`, `guest-food.jpeg` | `/images/guest-night.jpeg`, `/images/guest-food.jpeg` |
| `img/blog/guest-photo-tourguide.jpg` | `/images/guest-tourguide.jpg` |
| `img/blog/blog-boat-prague.jpg` | `/images/boat-vltava.jpg` |
| `img/blog/zuzana-portrait.jpg` | `/images/zuzana-portrait.jpg` |
| `img/tours/*` | `/images/thumbs/*` (see the tours table), hidden gems `/images/blog-hidden-gems-min.jpg` |

## New translation keys (suggested names)
Every string needs DE + EN. EN values are suggestions; for strings with a source key, use that key's existing EN value.

| Key | DE | EN (suggested) |
|---|---|---|
| `home.m.eyebrow` | Stadtführerin seit 1986 | Guiding since 1986 |
| `home.m.h1` / `home.m.h1Em` | Prag privat entdecken. / Auf Deutsch. | Discover Prague privately. / In English. |
| `home.m.sub` | Persönlich geführt von Ing. Zuzana Manová – vierzig Jahre Geschichten, die Sie in keinem Reiseführer finden. | Personally guided by Ing. Zuzana Manová – forty years of stories you won't find in any guidebook. |
| `home.m.proofRating` / `home.m.proofPrivate` | 4,9 auf TripAdvisor / Privat – nur Ihre Gruppe | 4.9 on TripAdvisor / Private – just your group |
| `home.m.ctaWhatsapp` | Per WhatsApp anfragen | Ask on WhatsApp |
| `home.m.audience.kicker` / `.title` / `.titleEm` | Ihre Prag-Reise / Welche Tour passt / zu Ihnen | Your Prague trip / Which tour suits / you |
| `home.m.audience.{first,pace,history,groups}.{title,sub}` | see section 2 | – |
| `home.m.tours.sub` | Alle Touren sind privat – nur Ihre Gruppe. Preis auf Anfrage. | All tours are private – just your group. Price on request. |
| `home.m.tours.ask` | Diese Tour anfragen | Ask about this tour |
| `tour.<id>.shortTitle`, `.homePlaces`, `.homeBenefit` | see section 3 | from the source keys' EN values |
| `home.m.reviews.rating` / `.all` / `.tourhq` | 4,9 von 5 auf TripAdvisor / Alle Bewertungen / Profil auf TourHQ | 4.9 out of 5 on TripAdvisor / All reviews / TourHQ profile |
| `home.m.about.point1–4` | see section 5 | from the source keys' EN values |
| `home.m.steps.{1,2,3}.{title,text}` | see section 6 | – |
| `home.m.formLink` / `home.m.whatsappLink` | Lieber per Formular / Lieber per WhatsApp | Prefer the form / Prefer WhatsApp |
| `home.m.waMsg` / `home.m.waMsgTour` | see Behaviour | Hello Ms Manová, I'm interested in a private city tour in Prague. / … in the tour "{name}". |

## Files in this bundle
- `Startseite Mobil v2.dc.html`: the new mobile homepage (design reference). The props `channel`, `stickyBar` and `showAudience` are the flags described above.
- `Startseite Mobil v2-Vorschau.dc.html`: a review page with the new and today's page at 390 × 844 side by side, plus change notes in Czech.
- `Startseite Mobil.dc.html`: today's mobile homepage, rebuilt from `Home.tsx`, for comparison.
- `support.js`: the runtime for the `.dc.html` files.
- `img/`: image copies for the prototypes.
