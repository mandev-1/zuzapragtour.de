# Handoff: Editorial Blog Article — Zuza & Pragtour

## Overview

A high-fidelity redesign of the Zuza Pragtour blog article page, in an "old-world Prague meets luxury travel" aesthetic, targeting affluent German-speaking readers (40+). Replaces the existing generic blog template with a magazine-style editorial layout that builds trust, reads as expensive/refined, and converts via a sticky right-rail "reach me" CTA.

The reference post is `Prague Visitor Pass: Drei Gründe dagegen` — a long-form article. The design is built so this post and any future post can use the same primitives.

## About the Design Files

The files in this bundle are **design references created in HTML** — a working prototype showing intended look and behavior, **not production code to copy directly**. The task is to **recreate this design in the existing Next.js + Tailwind codebase** at `prague-tour-guide/`, using its established patterns (App Router, MDX-ish blog data flow, `next/font`, `next/image`, the existing component conventions).

Do not lift the raw CSS into the Next app. Translate the design into:
- Tailwind theme tokens (colors, fontFamily, spacing) in `tailwind.config.js`
- A small set of reusable React components (`<Article>`, `<Grund>`, `<PullQuote>`, `<Callout>`, `<CostTable>`, `<ReachCard>`, `<Ornament>`, `<RelatedGrid>`, `<Newsletter>`, `<ReservationStrip>`)
- Fonts loaded via `next/font/google`
- Real images via `next/image` replacing the gradient placeholders

## Fidelity

**High-fidelity.** Final colors, typography, spacing, and interactions are pinned. Recreate pixel-perfectly using the codebase's existing libraries and patterns.

## Files in this bundle

- `Prague Blog.html` — the reference design. Open this in a browser to see the target.
- `tweaks.jsx` / `tweaks-panel.jsx` — the runtime tweaks panel used during design exploration. **Do not port these to production.** They exist only to let stakeholders flip variables (accent color, font pair, column width, drop cap) during review.

---

## Design Tokens

### Color palette (Tailwind extend → `colors`)

| Token | Hex | Use |
|---|---|---|
| `ivory` | `#F5EFE4` | Primary page background |
| `ivory.deep` | `#EDE4D3` | Alt background |
| `paper` | `#FAF6EC` | Card backgrounds (callout, cost table, reach card) |
| `ink` | `#1A1714` | Primary text, dark sections (newsletter, footer) |
| `ink.soft` | `#3A332C` | Body text |
| `ink.mute` | `#6B6055` | Meta, captions, tertiary text |
| `rule` | `#D9CFBC` | Borders |
| `rule.soft` | `#E8DFCC` | Inner borders |
| `burgundy` | `#6B1F2A` | Primary accent — links, CTAs, active TOC, pull-quote bar |
| `burgundy.deep` | `#4F1620` | CTA hover |
| `brass` | `#A88654` | Secondary accent — ornaments, kickers, gilt details |
| `brass.deep` | `#8C6A3C` | Brass on light backgrounds |
| `sage` | `#8A9282` | Tertiary, used sparingly |

Selection color: burgundy bg + ivory text.

### Typography

Three font families, loaded via `next/font/google`:

```ts
import { Italiana, Libre_Caslon_Text, Cormorant_Garamond, Inter_Tight } from 'next/font/google'

const italiana       = Italiana({ weight: '400', subsets: ['latin'], variable: '--font-display' })
const libreCaslon    = Libre_Caslon_Text({ weight: ['400','700'], style: ['normal','italic'], subsets: ['latin'], variable: '--font-body' })
const cormorant      = Cormorant_Garamond({ weight: ['400','500','600'], style: ['normal','italic'], subsets: ['latin'], variable: '--font-italic' })
const interTight     = Inter_Tight({ weight: ['400','500','600'], subsets: ['latin'], variable: '--font-sans' })
```

Map to Tailwind `fontFamily`:
- `display` → Italiana — for h1, h2, brand mark, big section numbers, related-card titles. **Italiana has no italic;** for italic emphasis use `italic`.
- `body` → Libre Caslon Text — paragraphs, lists, captions
- `italic` → Cormorant Garamond — italic emphasis (`<em>` inside headings, pull-quotes, h3, author name, "&" amp in brand mark, italic accents)
- `sans` → Inter Tight — UI: kickers, meta, CTAs, TOC, share buttons, tags, footer columns

Type scale (use as-is, all in px):
| Element | Family | Size | Weight | Line | Letter-spacing |
|---|---|---|---|---|---|
| Hero title | display | clamp(44, 5.4vw, 78) | 400 | 1.05 | +0.005em |
| Hero deck | italic | 22 | 400 | 1.5 | 0 |
| h2 / grund title | display | 32–34 | 400 | 1.15–1.2 | +0.005em |
| h2 em / grund-title em | italic | inherit | 400 italic | inherit | -0.005em |
| h3 | italic | 24 | 500 italic | 1.3 | 0 |
| Body paragraph | body | 19 | 400 | 1.72 | 0 |
| Pull quote | italic | 30 | 400 italic | 1.3 | -0.005em |
| Reach card title | display | 22 | 400 | 1.2 | +0.005em |
| Newsletter title | display | 38 | 400 | 1.2 | +0.005em |
| Related card title | display | 22 | 400 | 1.25 | +0.01em |
| Reservation strip text | italic | 34 | 400 italic | – | 0 |
| Author name | italic | 30 | 400 italic | 1.15 | 0 |
| Big "I/II/III" markers | display | 64 | 400 | 0.9 | +0.02em (color: burgundy) |
| Kicker / overline | sans | 11 | 500 | – | 0.24em uppercase |
| Meta | sans | 11–13 | 400/500 | 1.4 | 0.1em uppercase |
| Caption | body italic | 14 | 400 | 1.5 | 0 |
| Drop cap | display | 5.4em (of paragraph) | 500 | 0.85 | float left, color burgundy |

Body uses `font-feature-settings: "kern", "liga", "onum"` (oldstyle numerals); `text-wrap: pretty`; `hanging-punctuation: first last`.

### Spacing & layout

- Page max-width: **1320px**
- Article shell grid: `200px | 1fr | 260px` (TOC | article | right-rail), gap **56px**, padding `100px 48px 80px`
- Article body max-width (`--measure`): **660px**
- Mobile breakpoint: 1100px (TOC + right-rail collapse, article goes full-width)
- Section vertical rhythm: ~5em between numbered "Gründe", ~2.5em around callouts, ~3em around figures, ~4em around ornament dividers
- Image bleeds: `wide` extends image -120px each side beyond column; `full` extends to the page edge

### Borders & dividers

- All horizontal/vertical rules: `1px solid rule (#D9CFBC)`
- Pull quote: `2px solid burgundy` left border
- Callout: `1px solid rule.soft` + `3px solid brass` left border
- Cost table: `1px solid ink` top + bottom; rows separated by `1px dotted rule`
- Section ornament divider: 80px brass line · ❦ glyph (display italic 24px) · 80px brass line, centered, brass at 50% opacity for the lines
- Reach card has a nested inner border at 8px inset (decorative double-frame)

### Iconography

- Inline SVG, 1.6px stroke, currentColor
- 13–14px in share/contact rows, 16–18px elsewhere
- Use only line icons (no filled), simple geometry

---

## Page anatomy (top to bottom)

### 1. Reading progress bar
- Fixed top, full width, **2px** tall, transparent rail, **burgundy** fill, width = scroll percentage. Update on `scroll`.

### 2. Masthead (sticky)
- Sticky top, `1px solid rule` bottom border, ivory bg with `backdrop-filter: blur(8px)`
- Inner: `max-w-[1320px]`, padding `18px 48px`
- Three-column grid: meta · centered logo · nav (right-aligned)
- **Meta** (left): "Prag · Mai 2026 · • · Editorial №&nbsp;47" — sans 11px, 0.18em tracking, uppercase, `ink.mute`, dot is 4×4 burgundy circle
- **Logo** (center): "Zuza & Pragtour" — italic family, 24px, 0.01em tracking, italic, ampersand in burgundy
- **Nav** (right): Touren · Reisen · Journal · Über · Reservieren — sans 12px, 0.1em tracking, uppercase, `ink.soft`, hover → burgundy

### 3. Hero
- Padding `80px 48px 60px`, max-w 1320px, centered
- **Kicker**: 36×1px burgundy line + "Reise-Journal · Praktischer Rat", sans 11px 0.24em uppercase burgundy
- **Title**: display 78px max, 1.05 line, max-width 16ch. `<em>` segment in Cormorant italic, burgundy
- **Deck**: italic 22px, `ink.soft`, max 52ch
- **Byline row**: top border `1px solid rule`, max-w 660px. 44px brass-gradient avatar with italic "Z", then name (sans 13px 500) + "Lizenzierte Stadtführerin · 12 min Lesezeit" (sans 13px mute). Right-aligned: "Veröffentlicht am" + date.

### 4. Hero image
- Full-width within 1240px max, **16:9**
- Currently a placeholder gradient with diagonal pinstripe overlay + monospace caption ("Astronomische Uhr · Altstädter Ring · Praha"). Replace with real photography via `next/image` on production.

### 5. Article shell — three-column grid

#### 5a. Left rail — Sticky TOC
- Sticky `top-100`
- "In diesem Artikel" label: sans 10px 0.2em uppercase mute, bottom border rule
- List items: `padding-left: 12px` + `border-left: 1px solid rule`. Active state: burgundy text + 2px burgundy border. Roman/letter index ("i", "1"–"3", "iv", "v") in display italic brass, 13px, mr-2.
- Active link is set via scroll position — find the section with the largest `offsetTop ≤ scrollY + 200` and toggle `.active`.

#### 5b. Center — Article body (max-width 660px)
Body content uses these primitives (in order of appearance in the reference):

**`<DropCapParagraph>`** — first paragraph; `::first-letter` is display 500, 5.4em, 0.85 line, float-left, margin `0.05em 0.08em 0 -0.04em`, color burgundy, lining numerals.

**`<Callout variant="info|tip|warning">`** — `28px 32px` padding, paper bg, rule.soft border, brass left border 3px. Label: sans 10px 0.24em uppercase brass-deep with 14×1px brass dash before. Body: body 17px, 1.6 line.

**`<Ornament>`** — `4em` vertical margin, centered flex, 16px gap. Two 80px brass lines at 50% opacity flanking a `❦` (display italic 24px, full opacity).

**`<Grund number="I" label="Erster Grund" title="…">`** — the structural backbone. `5em 0 4em` margin. Marker row: large display number (64px burgundy, +0.02em tracking) baseline-aligned with a stacked label ("Erster Grund" — sans 11px 0.24em uppercase mute) + h2 grund-title (display 32px). Bottom border `1px solid rule` under marker row, 20px padding-bottom.

**`<CostTable>`** — `paper` bg, `1px solid ink` top+bottom, 32px padding. Title row: sans 11px 0.24em uppercase mute. Rows: grid `1fr auto`, body 17px label / display 500 20px tabular-nums amount, separator `1px dotted rule`. Total row: `1px solid ink` top, weight 600, amount in burgundy 24px. Footer note: italic 14px mute.

**`<PullQuote attribution="…">`** — `3em -40px` margin (breaks left out of column), 40px left padding, `2px solid burgundy` left border. Decorative `„` glyph absolute top-left, display 100px brass at 0.3 opacity. Quote text: italic family, 30px, 1.3 line. Attribution: sans 11px 0.2em uppercase mute, prefixed with em-dash.

**`<Figure variant="contained|wide|full" src caption credit>`** — `3em 0` margin. `wide` = -120px each side; `full` = breaks to page edges. Image is 3:2 in ref. Caption: body italic 14px mute, `padding-left: 16px` + `1px solid brass` left border, max 64ch. Credit: sans 10px 0.16em uppercase mute, opacity 0.7, ml-3.

**`<UnorderedList>`** — body 19px, 1.6 line. Markers replaced with em-dash in brass (`::before { content: "—" }`).

**Headings** inside content: h2 from Grund, plus h3 (italic family, 24px, italic, 500). Use `<em>` for in-heading italic emphasis (auto-routed to Cormorant italic, burgundy).

**Anchor links**: burgundy color, `text-decoration-color: brass`, 1px thickness, 4px underline-offset. Hover → burgundy-deep with burgundy underline.

**`<Newsletter>` (inline)** — `4em 0` margin, ink bg, 60px×48px padding. Two 1px brass vertical lines at 16px inset on left/right (`::before`/`::after`) — decorative frame. Centered content. Form is a borderless email input + button on a single `1px solid brass` bottom border. Submit changes button to "Bestätigt ✓".

**`<ArticleFooter>`** — `5em` margin-top, `1px solid rule` top, 32px padding-top
- **Tags**: sans 11px 0.12em uppercase, 6×14 padding, `1px solid rule`. Hover → burgundy border + text.
- **AuthorBio**: 36px padding, paper bg, rule.soft border, `120px 1fr` grid, 32px gap. Round 120×120 portrait (brass gradient + italic "Z" placeholder). Right column: kicker → italic 30px name → body 16px credentials paragraph → flex-wrap row of credentials with 5px brass dot bullets.

#### 5c. Right rail — Sticky reach card + share

The big addition. Sticky `top-100`, 24px gap between blocks.

**`<ReachCard>`** — the conversion engine.
- Container: `paper` bg, `1px solid rule`, 28px×24px padding
- Decorative inner frame: absolutely-positioned `1px solid rule.soft` at 8px inset (the "double frame" expensive look)
- Content (relative-positioned inside):
  - Kicker: sans 9px 0.26em uppercase brass-deep with 14×1px brass dash before — "Persönlich erreichen"
  - Portrait: 84×84 round, brass gradient, italic "Z" placeholder, **3px ivory border + 0 0 0 1px rule outer ring**
  - Title: display 22px — "Fragen zu Ihrem *Prag-Aufenthalt?*" (em → Cormorant italic burgundy)
  - Body: body 14px, 1.55 line — "Schreiben Sie mir direkt. Ich antworte persönlich, meist innerhalb von 24 Stunden — auf Deutsch."
  - **Primary CTA**: full-width burgundy button, ivory text, 13×16 padding, sans 11px 0.2em uppercase — "Nachricht schreiben →". Hover → burgundy-deep.
  - Divider: 1px rule, 18px vertical margin
  - Contact list: sans 11px column. Each row is a flex link with 13px brass icon + text. Hover → burgundy. Email + phone.

**`<ShareBlock>`**
- Label: sans 10px 0.2em uppercase mute, 1px rule bottom border
- Row of four 32×32 round share buttons (email, copy link, print, save). 1px rule border, hover → burgundy + 4% burgundy bg
- Save count: "247 Leser haben diesen Artikel gespeichert" — sans 10px 0.06em mute, **strong** in ink

### 6. Related articles
- `max-w-1320`, 80px margin-top + 1px rule top, 80px×48px padding
- Header row: italic 40px "Weiterlesen" (italic family) ←→ "Gesamtes Journal →" link (sans 11px 0.2em uppercase burgundy, 1px burgundy bottom border)
- Grid: 3 columns desktop, 1 column mobile, 40px gap
- Card: 4:3 image (gradient placeholder), 20px gap to text, kicker (sans 10px 0.24em uppercase burgundy), title (display 22px with em→italic burgundy), meta. Image scales to 1.02 on hover (400ms).

### 7. Reservation strip (full-bleed band)
- Burgundy bg, 50px×48px padding
- Inner row: italic 34px text "Bereit, *Prag* richtig zu erleben?" (em → display 34px brass, normal style) ←→ ivory CTA "Privattour reservieren →" (sans 12px 0.2em uppercase burgundy text). Hover → brass bg + ivory text.

### 8. Footer
- Ink bg, ivory text, 80px×48px padding, 80px margin-top
- 4-column grid `1.4fr 1fr 1fr 1fr`, 48px gap
- Brand col: italic 30px "Zuza *&* Pragtour" + italic 16px tagline at 60% opacity, max 32ch
- Other cols: h4 sans 11px 0.24em uppercase brass; ul of body 16px links at 75% opacity, hover → brass
- Bottom row: 60px margin-top, 24px padding-top, `1px solid rgba(168,134,84,0.2)` top border. © + location, sans 11px 0.1em uppercase at 40% opacity.

---

## Behavior

### Scroll progress bar
- Listen on `window` scroll (passive). `pct = scrollTop / (scrollHeight - clientHeight) * 100`. Set `progressBar.style.width = pct + '%'`.

### TOC active state
- On scroll, find the section whose `offsetTop` ≤ `scrollY + 200` and is highest. Toggle `.active` on the matching `<a href="#id">`. Use `IntersectionObserver` instead in production for perf (rootMargin `-200px 0px -70% 0px`).

### Masthead
- `position: sticky; top: 0;` — no JS required.

### Newsletter form
- On submit, prevent default and replace button text with "Bestätigt ✓". Real impl: hit your existing newsletter endpoint.

### Sticky rails
- `position: sticky; top: 100px;` on both `.toc` and `.right-rail`. Browser handles it.

### Hover states (all transitions 0.2s ease)
- Links: color shift + decoration color shift
- Share buttons: border + text color → burgundy + 4% burgundy bg
- Tags: border + text → burgundy
- CTA buttons: bg → burgundy-deep (primary) or → brass+ivory (reservation)
- Related card image: `transform: scale(1.02)` over 400ms
- Footer links: color → brass

### Responsive
- ≤1100px: TOC + right-rail collapse to `display: none`. Article goes full-width up to `--measure`. Wide/full image bleeds become contained.
- ≤720px: Masthead meta + nav hide; logo only. Hero padding 40px×24px. Related grid → 1 col. Footer grid → 2 col. Author bio → 1 col stack. Reservation → vertical stack. Section number markers shrink.

---

## Component inventory (suggested for the Next codebase)

```
src/components/blog/
  Article.tsx              // wraps the 3-col shell, accepts toc, body, sidebar slots
  Masthead.tsx
  Hero.tsx                 // kicker + title + deck + byline
  HeroImage.tsx
  TableOfContents.tsx      // takes [{id,label,index}], handles active state
  ReachCard.tsx            // the right-rail CTA — see below for props
  ShareBlock.tsx
  Grund.tsx                // numbered section: <Grund number="I" label="…" title="…">{children}</Grund>
  PullQuote.tsx
  Callout.tsx              // variant: info | tip | warning
  CostTable.tsx            // takes rows[] + total + footnote
  Figure.tsx               // variant: contained | wide | full
  Ornament.tsx
  AuthorBio.tsx
  NewsletterCard.tsx
  RelatedGrid.tsx
  ReservationStrip.tsx
  Footer.tsx
  ProgressBar.tsx          // top scroll progress
  DropCap.tsx              // optional wrapper, or just an mdx p[0] override
```

`ReachCard` props: `{ portrait, kicker, title, body, primaryCta:{label,href}, contacts:[{icon,label,href}] }`. The kicker, title (with `<em>` support), body, and CTA are content; everything else is fixed styling.

For MDX/blog content, register the primitives as MDX components so post authors can write:
```mdx
<Grund number="I" label="Erster Grund" title="Was der Pass *tatsächlich* enthält">
  Body paragraphs…
  <CostTable rows={[...]} total={...} footnote="…" />
</Grund>

<PullQuote attribution="Familie K., München · Frühjahr 2026">
  Zwei Tage lang haben wir mit der App gekämpft…
</PullQuote>
```

---

## Assets to source

The reference uses placeholder gradients. For production:
- **Hero image** — Astronomische Uhr or Old Town Square at golden hour, 1240×697 (16:9), high-res
- **Inline figures** — Vltava/Karlsbrücke morning, Trdelník market, Prager Burg/Goldenes Gässchen evening (3:2)
- **Author portrait** (round) — Zuzana, 240×240 min for retina at 120px display
- **Reach card portrait** — same source as author, can crop tighter (168×168 min for 84px display)
- **Related card images** — three 4:3 photos matching the post topics

Run sourced photos through `006---zuzapragtour.de/image-compressor/` if you want consistent treatment.

---

## Notes & caveats

- **Italiana has no italic cut.** All italic emphasis routes to Cormorant Garamond (the `--font-italic` family). This is by design — it gives a contrast between the cool geometric Italiana and the warmer humanist Cormorant.
- The **drop cap** is the page's only `::first-letter` rule; it's automatic on `.article > p:first-of-type`. If you wrap the first paragraph in a different element, gate it on a `.dropcap` class instead.
- The **wide/full image bleed** uses negative margins relative to the column. If your article column lives in a constrained container, recompute these in JS or use CSS `margin-inline` with a CSS variable.
- The **share buttons** are dummy in the prototype. Wire up real share intents (`mailto:`, `navigator.clipboard`, `window.print()`, save-for-later if you have it).
- The **save count** ("247 Leser") should come from real data or be removed.
- The **CLAUDE.md** at the project root and the existing pipeline docs (`EMAIL_TO_BLOG_PIPELINE.md`, `TRANSLATION_AND_BLOG_COMPLETE.md`) should be reviewed before starting — the blog data flow may already define a content shape these components need to plug into.
- **German typography**: enable hanging punctuation, `text-wrap: pretty`, oldstyle figures (`onum`); use German quotation marks „…" in source content (already in the reference).
- **Accessibility**: all decorative ornaments use `aria-hidden="true"`. Keep that pattern. Make sure CTA contrast (ivory on burgundy = 7.4:1) and body contrast (ink-soft on ivory = 11.2:1) stay AA+.
