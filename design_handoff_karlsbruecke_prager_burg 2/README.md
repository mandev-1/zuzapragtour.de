# Handoff: Karlsbrücke und Prager Burg (Stadtführung-Artikel, mobile first)

## Overview

Landing article for private Prague tours in German. It targets three search terms: **Prag Stadtführer**, **Karlsbrücke** and **Prager Burg**. The page is written as a marketing article and follows an AIDA flow:

1. **Attention**: H1, lead text, hero photo, two CTAs
2. **Interest**: three trust facts (since 1986, certified guide, TripAdvisor rating)
3. **Desire**: Karlsbrücke block, Prager Burg block, suggested route, guest quote
4. **Objections**: FAQ
5. **Action**: CTA block with booking form, email, WhatsApp and phone; mobile sticky contact bar

All CTAs go to the existing booking form (`/book#contact-title`) or to email (`mailto:zuzanamanova@email.cz`, with a prefilled subject).

## About the Design Files

The files in this bundle are **design references created in HTML**. They are prototypes that show the intended look and behaviour. They are not production code to copy directly.

The task is to **recreate these HTML designs in the target codebase's existing environment**, using its established patterns and libraries. For this project that is the Next.js / React / Tailwind app in `prague-tour-guide/` (branch `zuzapragtour.de`). Use the existing `Header.tsx` and `Footer.tsx` components instead of the hand-written header and footer in the HTML, and use the existing translation and routing setup.

Source of truth for copy and layout: `Karlsbruecke Prager Burg Artikel v2.dc.html`. The file opens directly in a browser. `support.js` must sit next to it.

## Fidelity

**High-fidelity (hifi).** Colours, type, spacing, radii and interactions are final. Recreate them pixel-close, using the codebase's own tokens where they match. Where a value below has no matching token, use the value given here.

## Screens / Views

There is one screen: the article page. Proposed route: `/karlsbruecke-prager-burg` (to be confirmed).

Max content width is 1100px for the article body (72rem = 1152px for the footer). Horizontal padding is 20px on all sizes. Vertical section spacing is `clamp(56px, 10vh, 88px)`. Layout is single column by default and reflows to two columns through `grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr))`. There are no fixed breakpoints in the design, except the mobile sticky bar (see below).

### 1. Header
- **Purpose:** brand and navigation.
- **Layout:** flex row, wraps. The brand sits left, the "Tour buchen" button sits right. The nav is a full-width row below (wraps).
- **Brand:** "Zuza & Pragtour", Italiana 22px, letter-spacing 0.02em, `&` in Cormorant Garamond italic. `flex-shrink: 0; white-space: nowrap`. Without the nowrap, the brand wraps and overlaps the nav.
- **Button "Tour buchen":** `/book#contact-title`, min-height 44px, radius 4px, background #6B1F2A, hover #4F1620, padding 0 14px, Inter Tight 14px / 600, white text.
- **Nav links:** Touren (`/tours`), Über Zuzana (`/zuzana-manova`), Journal (`/blog`), Kontakt (`/contact`). Inter Tight 12px / 500, uppercase, letter-spacing 0.14em, gap 20px.
- **Border:** bottom 1px #D9CFBC, padding 14px 20px.
- **Mobile menu:** the design uses an inline link row. The repo's `Header.tsx` uses a full-screen burger menu under 1024px. Use the burger from the repo. Keep the same nav items and order.

### 2. Hero (Attention)
- **Breadcrumb:** "Start / Stadtführung Prag / Karlsbrücke und Prager Burg", Inter Tight 11px, uppercase, letter-spacing 0.16em, colour #8C6A3C.
- **Kicker:** "Prag Stadtführer auf Deutsch", Inter Tight 11px / 500, uppercase, letter-spacing 0.24em, colour #8C6A3C, preceded by a 28px × 1px line rgba(168,134,84,0.7). Margin-top 28px.
- **H1:** "Karlsbrücke und Prager Burg mit einer *Stadtführerin* erleben". Italiana `clamp(2.4rem, 8vw, 4.4rem)`, line-height 1.02, letter-spacing -0.02em, `text-wrap: balance`. The italic word is Cormorant Garamond italic, colour #6B1F2A.
- **Lead:** "Zwei Orte, die fast jeder Prag-Besucher sehen will. Mit einer zertifizierten Expertin sehen Sie dabei mehr als die Fotomotive." Cormorant Garamond italic `clamp(1.3rem, 3vw, 1.6rem)`, line-height 1.45, colour #6B1F2A. Margin-top 20px.
- **Byline:** "Von Ing. Zuzana Manová · Aktualisiert Oktober 2026". Inter Tight 11px, uppercase, letter-spacing 0.18em, colour #6B6055. Margin-top 14px. Update the date when the article is revised.
- **Hero image:** `img/vltava-bridges-hero-1080.webp`, aspect 4/3 (mobile), object-fit cover, radius 8px. Margin-top 28px. Alt: "Brücken über die Moldau in Prag am Abend".
- **CTA row:** flex-wrap, gap 12px, margin-top 28px. Two buttons, each `flex: 1 1 240px`:
  - Primary "Tour anfragen" + arrow icon → `/book#contact-title`. Background #6B1F2A, text #FFFFFF.
  - Secondary "E-Mail schreiben" → `mailto:zuzanamanova@email.cz?subject=Anfrage%20Karlsbr%C3%BCcke%20und%20Prager%20Burg`. 1px border #1A1714, text #1A1714.
  - Both: min-height 52px, radius 6px, padding 0 24px, Inter Tight 13px / 600, uppercase, letter-spacing 0.14em, centred.

### 3. Interest
- **H2:** "Was eine private Führung anders macht". Italiana `clamp(2rem, 6vw, 2.9rem)`, line-height 1.06, letter-spacing -0.015em.
- **Body:** "Eine Gruppe folgt meist einer Fahne und hört einen Satz pro Station. Bei einer privaten Tour bestimmen Sie das Tempo und die Fragen. Ich habe vierzig Jahre Erfahrung darin, Prag so zu erklären, dass es hängen bleibt." Libre Caslon Text 1.08rem, line-height 1.8, colour #3A332C. Margin-top 18px.
- **Fact cards:** three `li` in an auto-fit grid (min 240px), gap 12px, margin-top 28px. Each card: 1px #D9CFBC border, radius 8px, background #FDFAF3, padding 20px.
  - Value: Italiana 2rem, line-height 1, colour #6B1F2A. Values: "1986", "Zertifiziert", "4,9 / 5".
  - Text: 0.98rem, line-height 1.6, colour #3A332C, margin-top 10px. Texts: "Seit diesem Jahr führe ich Gäste durch Prag." / "Offizielle tschechische Stadtführer-Zertifizierung und Akkreditierung des Jüdischen Museums." / "Bewertung auf TripAdvisor aus 14 Bewertungen."

### 4. Desire
Two-column blocks (single column on mobile, `auto-fit` grid, gap `clamp(28px, 5vw, 56px)`).

**4a. Karlsbrücke**
- Image `img/guest-night.jpeg`, aspect 4/5, radius 8px. Caption "Die Brücke am Abend", Inter Tight 11px uppercase, #6B6055, margin-top 10px.
- Kicker "Karlsbrücke", H2 "Die Brücke erzählt mehr als ihre Fotos".
- Two paragraphs (1.08rem / 1.8, #3A332C). Text: "Der Bau der Karlsbrücke begann 1357 unter Karl IV. Sie ersetzte die Judithbrücke, die 1342 bei einem Hochwasser zerstört worden war. Auf ihr stehen 30 Heiligenstatuen, die meisten aus dem Barock." and "Ich zeige Ihnen, welche Figur welche Geschichte trägt, und erkläre die beiden Brückentürme. Die Kampa-Seite unter den Bögen zeige ich Ihnen auch, wenn Sie fotografieren möchten."

**4b. Prager Burg**
- **Image placeholder (must be replaced):** a dashed 1px #A88654 box, radius 8px, aspect 4/5, centred text "Foto: Prager Burg mit Veitsdom (noch zu ergänzen)", Inter Tight 12px, uppercase, letter-spacing 0.14em, colour #8C6A3C. Replace with a real photo, same aspect ratio, alt text "Prager Burg mit Veitsdom".
- Kicker "Prager Burg", H2 "Höfe, Dom und das Goldene Gässchen".
- Two paragraphs. Text: "Die Prager Burg ist einer der größten zusammenhängenden Burgkomplexe der Welt. Sie war über Jahrhunderte Sitz böhmischer Könige und beherbergt heute den Amtssitz des tschechischen Präsidenten." and "Wir besuchen den Veitsdom mit der Wenzelskapelle und gehen durch das Goldene Gässchen, dessen kleine Häuser im späten 16. Jahrhundert entstanden."

**4c. Route box**
- Background #EDE4D3, radius 8px, padding 24px, margin-top `clamp(40px, 7vh, 56px)`.
- Kicker "So kann der Tag aussehen" (Inter Tight 11px uppercase, #8C6A3C).
- Two paragraphs (1.05rem / 1.75). Text: "Man überquert die Karlsbrücke Richtung Kleinseite und steigt dann durch die Gassen bergauf. Die Nerudova-Straße führt zum Burgviertel hinauf. Der Anstieg ist moderat, der Weg führt über Kopfsteinpflaster. Mit Fotostopps und Erklärungen sollten Sie mehr Zeit einplanen." and "Tipp: Die Burg passt gut an den Vormittag. Die Brücke ist am späten Nachmittag und in der blauen Stunde besonders eindrucksvoll."

**4d. Guest quote**
- `blockquote`, margin-top `clamp(40px, 7vh, 56px)`, 1px top border #D9CFBC, padding-top 28px.
- Text: „Zuzanas persönliche Geschichte mit der Stadt macht diese Führung zu etwas völlig Einzigartigem. Absolut unvergesslich.“ Cormorant Garamond italic `clamp(1.4rem, 3.5vw, 1.8rem)`, line-height 1.4, colour #1A1714.
- Attribution "Thomas K. · TripAdvisor", Inter Tight 11px uppercase, letter-spacing 0.18em, #6B6055, margin-top 14px. This is a real review from the site's review set. Confirm the quote is still approved before launch.

### 5. FAQ (Objections)
- H2 "Häufige Fragen" (same H2 style as above).
- Accordion-style list rendered as static rows (no toggle in the design). Top border 1px #D9CFBC, each item padded 20px 0, bottom border 1px #D9CFBC.
- Four items. Question: 1.1rem / 700 / line-height 1.4. Answer: 1.02rem / 1.75, #3A332C, margin-top 8px.
  1. "Wird die Tour auf Deutsch gehalten?" / "Ja. Die Tour findet auf Deutsch statt und ist auf Ihre Fragen abgestimmt."
  2. "Lassen sich beide Orte an einem Tag besuchen?" / "Ja. Ich plane die Reihenfolge nach Ihrer Zeit, Ihrem Tempo und dem Licht."
  3. "Sind Eintrittskarten enthalten?" / "Nein. Wir klären vorab, welche Eintrittskarten sich für Ihre Zeit lohnen."
  4. "Kann ich die Route anpassen?" / "Ja. Sie sagen mir, was Sie interessiert, und wir planen den Rundgang gemeinsam."
- If you add an interactive accordion, mark up the answers so they are visible to search engines (e.g. `details`/`summary`), since FAQ text supports the keyword content.

### 6. Action (CTA block)
- Container: background #6B1F2A, radius 8px, padding `clamp(28px, 6vw, 48px) clamp(20px, 5vw, 40px)`, text #F5EFE4. Margin-top `clamp(56px, 10vh, 88px)`, max-width 1100px, horizontal padding 20px.
- Kicker "Private Tour Karlsbrücke und Prager Burg" (Inter Tight 11px uppercase, letter-spacing 0.24em, colour #FDC34D).
- H2 "Planen wir Ihren Tag in Prag", Italiana `clamp(2.2rem, 7vw, 3.2rem)`, colour #F5EFE4.
- Body: "Schreiben Sie mir Ihren Reisetermin und Ihre Wünsche. Ich melde mich mit einem Vorschlag für Ihre Route." 1.08rem / 1.75, colour rgba(245,239,228,0.92).
- Buttons (flex-wrap, gap 12px):
  - "Tour anfragen" → `/book#contact-title`. Background #F5EFE4, text #1A1714, hover background #FFFFFF.
  - "E-Mail schreiben" → same mailto as in the hero. 1px border #F5EFE4, text #F5EFE4, hover fill #F5EFE4 with text #1A1714.
- Text links below (gap 20px): "WhatsApp" → `https://wa.me/420721231933` (new tab), "+420 721 231 933" → `tel:+420721231933`. Both have a 1px underline at rgba(245,239,228,0.6).

### 7. Author box
- Top border 1px #D9CFBC, padding-top 28px, flex-wrap, gap 20px.
- Portrait `img/zuzana-portrait.jpg`, 88px circle, object-position center 18%.
- Name "Ing. Zuzana Manová" (Italiana 1.4rem). Bio: "Zertifizierte Stadtführerin und Expertin für das Jüdische Viertel. Seit 1986 führt sie Gäste durch Prag." (1rem / 1.7, #3A332C). Link "Über Zuzana" → `/zuzana-manova` (Inter Tight 12px / 600, uppercase, #6B1F2A).

### 8. Footer
The design includes a CTA band plus a footer. **In the repo, `Footer.tsx` already renders a dark CTA band on every page except `/`.** Use the repo footer and do not add a second band. The design's band is the same content as the repo's band. Check the translated copy and keep only one.

Structure of the footer (for reference):
- Background #FAF6EC, text #645849. Grid: four columns on desktop, `auto-fit minmax(200px, 1fr)`, gap 32px, padding 48px 20px, max-width 72rem.
  - Column 1: "Zuza Prague Tours" (Noto Serif 18px, #1A1714), tagline "Erleben Sie Prag mit Ihrer deutschsprachigen Expertin und Spezialistin für Prag-Führungen" (Libre Caslon 14px / 1.625), TripAdvisor link "4,9 ★ TripAdvisor", Instagram "@erlebnis_tour_prag".
  - Column 2: "Kontakt" heading (Plus Jakarta Sans 12px / 700, uppercase, letter-spacing 0.1em, #A89880). Phone, email, WhatsApp, 14px, padding 10px 0.
  - Column 3: "Schnelllinks": Startseite, Touren, Über Zuzana, Blog, Kontakt, Tour buchen.
  - Column 4: "Folgen Sie uns": TripAdvisor, TourHQ, Instagram, each with a 14px title and a 12px subline.
- Bottom bar: top border #E0D8C9, padding 20px. Copyright "© 2026 Zuza Prague Tours – Zuzana Manová. Alle Rechte vorbehalten" (12px, #A89880). Links: Datenschutz (`/privacy`), AGB (`/terms`), Tour bewerten (`/bewerten`), separated by `·` in #C7BBA6.

### 9. Mobile sticky contact bar
- Shown only below 768px (`matchMedia('(max-width: 767px)')`). Hidden at 768px and above.
- Position fixed, left 0, right 0, bottom 0, z-index 40. Background rgba(250,246,236,0.97). Top border 1px #D9CFBC. Padding `10px 12px calc(10px + env(safe-area-inset-bottom))`. Flex row, gap 8px.
- Items (min-height 48px, radius 6px, Inter Tight 13px / 600, uppercase, letter-spacing 0.1em):
  - "Tour anfragen" → `/book#contact-title`. Filled #6B1F2A, flex 1, white text.
  - "WhatsApp" → `https://wa.me/420721231933` (new tab). Outline 1px #1A1714.
  - "E-Mail" → same mailto. Outline 1px #1A1714.
- The article has `padding-bottom: 96px` on mobile so the bar does not cover the footer.

## Interactions & Behaviour
- **Hover:** primary buttons change #6B1F2A → #4F1620. Outline buttons invert (background #1A1714, text #FAF6EC). On dark CTA, the cream button goes to #FFFFFF, the outline button fills cream. Links use the default colour, no hover change in the design.
- **Scroll:** no scroll effects. The page is static.
- **Sticky bar:** appears on viewports below 768px. Reacts to viewport changes (listen to the media query's `change` event).
- **Anchors:** the design has no in-page navigation. Sections use `id` attributes (`aufmerksamkeit`, `interesse`, `verlangen`, `einwaende`, `handlung`) for analytics or future links.
- **Transitions:** none in the design. Add a 200ms colour transition on buttons if the codebase uses transitions.
- **Loading / error states:** none. The page is static content and images with alt text. Use `loading="lazy"` on images below the fold.
- **Forms:** no form on this page. Booking is handled by the existing form at `/book#contact-title`. Email opens the user's mail client with a prefilled subject.

## State Management
- None on the page. The only stateful piece is the mobile bar, which needs a single boolean from the media query. In React: `const [isMobile, setIsMobile] = useState(false)` plus an effect that subscribes to `matchMedia('(max-width: 767px)')`. Render the bar only when `isMobile` is true, or hide it with CSS and skip the state.
- No data fetching. All copy is static. Keep it in the page's translation files if the site translates pages; the site currently has German content only for this page.

## Design Tokens

**Colours**
| Token | Hex | Use |
|---|---|---|
| paper | #FAF6EC | page background |
| ink | #1A1714 | headings, outline button |
| body | #3A332C | body text |
| muted | #6B6055 | captions, byline |
| burgundy | #6B1F2A | primary button, accents, H1 italic |
| burgundy-hover | #4F1620 | primary hover |
| brass | #A88654 | rules, placeholder border |
| gold-kicker | #8C6A3C | kickers, breadcrumb |
| lamp | #FDC34D | kicker on dark |
| rule | #D9CFBC | section borders |
| card | #FDFAF3 | fact cards |
| sand | #EDE4D3 | route box |
| ivory | #F5EFE4 | text on dark |
| footer-text | #645849 | footer links |
| footer-muted | #A89880 | footer headings, copyright |
| footer-rule | #E0D8C9 | footer dividers |
| footer-link-soft | #857563 | footer social lines |
| footer-title | #453D33 | footer item titles |
| footer-sep | #C7BBA6 | separators |
| dark | #1A1714 | CTA band in footer |

**Typography**
| Role | Family | Size | Weight | Line height | Tracking |
|---|---|---|---|---|---|
| H1 | Italiana | clamp(2.4rem, 8vw, 4.4rem) | 400 | 1.02 | -0.02em |
| H2 | Italiana | clamp(2rem, 6vw, 2.9rem) | 400 | 1.06 | -0.015em |
| Lead | Cormorant Garamond italic | clamp(1.3rem, 3vw, 1.6rem) | 400 | 1.45 | 0 |
| Body | Libre Caslon Text | 1.08rem | 400 | 1.8 | 0 |
| Kicker | Inter Tight | 11px | 500 | — | 0.24em uppercase |
| Button | Inter Tight | 13px | 600 | — | 0.14em uppercase |
| Nav | Inter Tight | 12px | 500 | — | 0.14em uppercase |
| Question | Libre Caslon Text | 1.1rem | 700 | 1.4 | 0 |
| Footer | Plus Jakarta Sans | 12–14px | 400–700 | 16–20px | 0 |

**Spacing:** 4, 8, 10, 12, 14, 16, 20, 24, 28, 40, 48, 56, 72, 88px. Section gap `clamp(56px, 10vh, 88px)`.

**Radii:** 4px (header button), 6px (buttons), 8px (cards, images, CTA block).

**Shadows:** none on this page.

**Borders:** 1px solid, colours above.

## Assets
- `img/vltava-bridges-hero-1080.webp`: hero. Source: project file `img/home/vltava-bridges-hero-1080.webp`, the same image as the homepage hero.
- `img/guest-night.jpeg`: Karlsbrücke at night. Source: project file `img/home/guest-night.jpeg`, the same image as the homepage gallery.
- `img/zuzana-portrait.jpg`: portrait. Source: project file `img/blog/zuzana-portrait.jpg`.
- **Missing:** Prager Burg photo. Replace the dashed placeholder with a licensed photo of the castle and St Vitus Cathedral.
- Icons: Material Symbols Outlined, `arrow_forward` only. Load the same way as the homepage. If the codebase has an icon set, use it.
- Logo: text wordmark, no image.

## Copy, SEO, and Structured Data
- **Suggested `<title>`:** "Karlsbrücke und Prager Burg mit Stadtführerin | Zuza Prague Tours". Adjust after review.
- **Suggested meta description:** "Private Stadtführung Prag auf Deutsch: Karlsbrücke und Prager Burg mit einer zertifizierten Expertin. Jetzt Tour anfragen." Adjust after review.
- **H1** is the only H1. Keep H2 for each section.
- Consider `FAQPage` structured data for the four FAQ items, and `Person` for the author box.
- Update the "Aktualisiert" date when the content changes.

## Files
- `Karlsbruecke Prager Burg Artikel v2.dc.html`: the design. Source of truth for layout and copy. Open in a browser to view.
- `support.js`: runtime needed to open the design file. Not needed in the codebase.
- `img/`: images used by the design.

Related files in the project (not included here): `prague-tour-guide/src/components/Header.tsx`, `Footer.tsx`, `Home.tsx` (the repo versions to reuse).

## Implementation Checklist
1. Create the route (proposed `/karlsbruecke-prager-burg`) and link it from the tours index and the homepage keyword section.
2. Use `Header.tsx` and `Footer.tsx` instead of the design's header and footer. Confirm the mobile burger menu from the repo is used.
3. Replace the Prager Burg placeholder with a real photo.
4. Confirm the CTA band appears once (from `Footer.tsx`).
5. Check the mobile sticky bar does not cover the footer or the cookie banner, if one is present.
6. Test at 375px, 768px, 1024px and 1440px. Check the H1 wraps cleanly and the header nav does not overlap the brand.
