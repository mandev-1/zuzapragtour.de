# zuzapragtour.de — Single Source of Truth

How this repo actually works, verified against the code on **2026-10-09**. If this file and any other doc disagree, trust the code first, then this file. Update this file when you change how something works.

> **Other docs are partly stale.** `CLAUDE.md` still describes the old CRA / React Router / Helmet setup and the old `new:blog` flow. The `prague-tour-guide/*.md` docs (`DEPLOYMENT.md`, `NODE_VERSION_FIX.md`, `GERMAN_LANGUAGE_STATUS.md`, `TRANSLATION_AND_BLOG_COMPLETE.md`, `EMAIL_TO_BLOG_PIPELINE.md`, `README.md`) are from the CRA era and are historical only. See [Doc trust map](#doc-trust-map).

---

## 1. The business

- **Zuza Prague Tours**: the one-person private tour business of **Ing. Zuzana Manová**, a state-certified Prague guide since 1986, accredited by the Jewish Museum for the Jewish Quarter.
- **Audience:** German-speaking travellers (DE/AT/CH), mostly 45–70 and affluent. **German is the primary language**; English is secondary and uses British spelling.
- **Voice:** formal German (*Sie*), understated luxury, **no emoji ever**, Material Symbols icons only.
- **Conversion:** enquiries via WhatsApp (primary), the `/book` form (Netlify Forms), email and phone. Prices are "auf Anfrage" (on request). There is no online payment.
- **Reviews:** TripAdvisor (the main proof, ~300+ reviews) and the Google Business Profile. `/bewerten` is the post-tour review funnel (QR code + follow-up email), focused on getting Google reviews.
- **Contact, domains and profile links** live in one place: `prague-tour-guide/src/brand.ts` (`BRAND`). Never hardcode them elsewhere.

## 2. Repo map

| Path | What it is | Status |
|---|---|---|
| `prague-tour-guide/` | **Public site**: Next.js 14 App Router, static export | live, main work area |
| `admin/` | **Admin CMS** (Vite + React SPA + Netlify Functions) at `admin.zuzapragtour.de` | live |
| `netlify.toml` (root) | Netlify config for the **public** site (base `prague-tour-guide`) | live |
| `.handoffs/0001…0007` | Archived design handoffs (implemented) + the Astro migration plan (0007, deferred) | reference |
| `design_handoff_*/` (root) | Newer design handoffs: `.dc.html` prototypes + README | reference; `design_handoff_karlsbruecke_prager_burg` is **not implemented yet** |
| `lang-graph/` | Python LangGraph SEO agent: Search Console → Claude brief → email (weekly). Model hardcoded in `report.py` (`claude-sonnet-4-6`) | **never set up** as of 2026-10-09: no `.env`, no service-account key, no cron or container |
| `image-compressor/` | Node script for compressing images before they go into `public/images` | tool |
| `zuzapragtour.de-Coverage-Drilldown-*` | Search Console coverage export (CSV) | data |
| `TBD.md` | Owner's backlog: `/book` conversion ideas, platforms (Viator/GYG/Google), SEO keywords | backlog |
| `urls-links-2026-25-04.md` | SEO action list from 2026-04-25 | backlog, partly done |
| `WEBSITE_QUESTIONS.md` | Original Q&A with Zuzana (bio facts, tours, payment) | source facts |
| `.ssot/SSoT.md` | this file | |

**Git:** remote `github.com/mandev-1/zuzapragtour.de` (private). The working and deploy branch is **`zuzapragtour.de`** (also the default branch). `pragkenner.de` is a second brand's branch, **last touched 2026-04-22 and far behind**. `main`, `redesign`, `1.1.0` and `copilot/*` are old.

## 3. Public site (`prague-tour-guide/`)

### Stack
- **Next.js 14 App Router with `output: 'export'`**: fully static HTML in `out/`, `images.unoptimized`, `trailingSlash: false`.
- React 18, TypeScript, Tailwind 3, Framer Motion. Fonts via `next/font/google` in `app/layout.tsx` (Italiana for the display/LCP text, Libre Caslon, Cormorant, Inter Tight, Hanken Grotesk, EB Garamond, Newsreader, plus legacy Noto Serif and Plus Jakarta). Only Italiana is preloaded.
- Design tokens: `src/styles/site-tokens.css` (CSS vars: ivory/paper, ink, burgundy `#6B1F2A`, blue `#11457E`…) and `tailwind.config.js`. Fonts are owned by `next/font`; don't redefine `--font-*`.
- `app/*/page.tsx` are thin wrappers that set `metadata` / `generateMetadata` and render a `'use client'` screen from `src/screens/`.

### Routes
`/`, `/tours`, `/tours/[slug]` (EN + DE slug per tour), `/blog`, `/blog/[slug]` (EN slug + optional DE slug), `/sehenswuerdigkeiten-prag` (pillar page from `content/pages/`), `/prag/karlsbruecke` (landing page, see below), `/zuzana-manova`, `/contact`, `/book`, `/bewerten`, `/privacy`, `/terms`.
Generated: `/sitemap.xml` (`app/sitemap.ts`), `/robots.txt` (`app/robots.ts`, disallows `/book` `/privacy` `/terms`), `/llms.txt` (`app/llms.txt/route.ts`, built from tours + journal; `public/llms-full.txt` is hand-written), `/stats-catalog.json` (titles for the admin stats dashboard).

### Commands (run in `prague-tour-guide/`)
```bash
npm run dev          # generate-journal + next dev
npm run build        # prebuild → next build → postbuild
npm run gen:journal  # regenerate src/utils/journalGenerated.ts from content/
npm run thumbs       # public/images/thumbs/ (macOS sips)
npm run images       # public/images/sized/ AVIF+WebP (macOS sips + cwebp)
```
- **prebuild:** `generate-thumbnails.cjs` → `generate-responsive-images.cjs` → `generate-journal.cjs`.
- **postbuild:** `ping-sitemaps.js` (Google/Bing sitemap ping + IndexNow; key file `public/5cb4…txt`).
- **Don't run `npm run build` while `npm run dev` is running.** They share `.next/` and the dev server breaks.
- Netlify builds on **Linux**: the thumbnail and responsive-image scripts **skip there**. So `public/images/thumbs/`, `public/images/sized/` and `src/data/responsiveImages.json` **must be generated on a Mac and committed**.
- No test suite exists (the `npm test` in CLAUDE.md is gone).

### Language (DE/EN)
- Custom system, no i18n library. `src/context/LanguageContext.tsx` → `useLanguage()` → `{ language, setLanguage, t }`. The default is `de`; the choice is stored in `localStorage['zpt.lang']` and applied **after mount**.
- UI strings: `src/utils/translations.ts` (`{ en, de }` per key, ~2300 lines). Tour copy lives here too (`tour.<id>.*`).
- Article text is **not** in `translations.ts`. It goes through `src/utils/postText.ts`, which reads legacy `blogTranslations.ts` and generated `journalGenerated.ts`, so that only journal pages download the article bodies.
- **Consequence:** prerendered HTML is always German. English `<title>` tags exist via `generateMetadata`, but the English body text appears only client-side. (Measured in `.handoffs/0007----astro-migration/`.)

### Content: two article systems side by side

**A) Journal (CMS, the current way)**: `content/journal/<slug>.json` and `content/pages/<slug>.json`
- Schema: `src/types/journal.ts` (`JournalArticle`, `Block`). **Must stay byte-identical to `admin/src/types/journal.ts`** (it currently is).
- Block types: `p`, `h2`, `h3`, `quote`, `callout`, `image`, `costTable`, `list`, `facts`, `faq` (also emitted as FAQPage JSON-LD), `chapter`, `factcheck`, `myth`, `overview`, `gallery`, `cta`, `links`, `map`, `ornament`.
- **Rule (decided 2026-10-09): every article in `content/` is German-only.** That means `languages: ["de"]`, no `en` text, and **one German `slug` with no `slugDe`**. A German-only article with two slugs serves the same German page at two self-canonical URLs, which is duplicate content. When a draft gets published, drop its English text. When an English slug gets retired, add it to `redirectFrom` + a 301 in `netlify.toml` (done for Strahov and Waldstein).
- `Localized` = a plain string (same in both languages) or `{ de, en? }`. The schema still allows English; the rule above is a content decision, not something the code enforces.
- `layout: 'v2'` = facelift template (serif section headings; CTA and "Weiterlesen" are blocks; no author footer or related grid).
- `status`: `published` | `draft` | `scheduled` (goes live when its `date` arrives, **at the next build**). Drafts never reach the public output.
- Pipeline: `scripts/generate-journal.cjs` → `scripts/render-blocks.cjs` renders blocks to HTML that matches `src/styles/blog-content.css` → writes `src/utils/journalGenerated.ts` (`journalPosts`, `journalContent`, `journalPages`). **That file is generated; never edit it by hand.**
- Map blocks become `<div data-jmap>` placeholders, which `src/utils/journalMaps.ts` turns into Leaflet + CARTO maps (key in `src/config/maps.ts`, kept in sync with `admin/src/lib/maps.ts`).
- Current state: 39 journal files. **8 are published, all German-only.** The 31 drafts are legacy posts migrated by `html-to-blocks.cjs` and still carry `de+en` + English text, because the converter zips both languages. Until a draft is published, the legacy version (with its English URL) keeps serving that post.
- The filename must equal the `slug` (`<slug>.json`): the admin reads and writes by that name.
- `redirectFrom` on an article must be mirrored as a 301 in root `netlify.toml` (example: the winter merge into `/blog/prag-im-winter`).

**B) Legacy posts (hand-authored)**: 37 entries in `src/utils/blogData.ts` (`rawBlogPosts`) with HTML in `src/utils/blogTranslations.ts` (`blog.postN.*`).
- `blogData.ts` merges `journalPosts` into `blogPosts`. `BlogPostPage` renders both the same way.
- To migrate one post: `node scripts/html-to-blocks.cjs --post=N [--dry-run]` writes a draft JSON, which you finish in the admin.
- `npm run new:blog` still scaffolds a **legacy** post. **Prefer creating new articles as journal JSON** (in the admin, or by hand in `content/journal/`).
- `scripts/import-dc-article.py` is a one-off importer for `.dc.html` design prototypes into journal JSON. Re-running it overwrites later edits.

### `/prag/karlsbruecke` (landing page)
- **A 1:1 port of `design_handoff_karlsbruecke_prager_burg`**, not the article template.
  - Markup: `src/screens/KarlsbrueckePage.tsx`. Styles: `src/styles/karlsbruecke-landing.css` (`kb-` classes, the prototype's exact values). Route + metadata + Article/FAQPage JSON-LD: `app/prag/karlsbruecke/page.tsx`.
  - Copy is hard-coded German, verbatim from the handoff. The FAQ array feeds both the page and the JSON-LD.
- **Deviations the handoff itself asks for:**
  - the site's `Header`/`Footer` (the footer's dark band replaces the design's band),
  - a real castle photo instead of the dashed placeholder.
- **Owner changes on top of the handoff (2026-10-09):** blue accents (`--kb-blue: #11457E`, the site's journal blue, and `--kb-blue-tint: #EEF3F9`) on the breadcrumb, kickers and labels, the fact-card values, the route box (tint and left rule) and the rule above the quote. Burgundy stays on the headline accent and the buttons.
- **Mobile sticky bar** (Tour anfragen · WhatsApp · E-Mail): pure CSS, below 768px only. `body:has(.kb-bar)` adds 96px bottom padding so the bar doesn't cover the footer. `BlogPromo` is hidden on `/prag/*` so they don't overlap.
- **CTAs** go to `/book?tour=Karlsbrücke und Prager Burg#contact-title`, so the form arrives pre-filled.
- **Images:**
  - hero: `images/hero/prague-hero-{640,1080,1600}.webp` + `prague-hero-1600.jpg` (fallback and share image), made from `prague-hero.jpg` (William Zhang, Unsplash): bridge and castle at dusk. It replaced the handoff's `vltava-bridges-hero` at the owner's request on 2026-10-09,
  - bridge block: `web/charles-bridge-night-empty-lesser-town-towers-4x5.webp`, a 4:5 crop of the Pixabay photo by luboshouska (empty bridge at night, both Kleinseite bridge towers),
  - castle block: `web/charles-bridge-from-top-…rainhard2-prague-7594788_1920.webp` (Pixabay), the view from the bridge tower over the bridge to the castle, cropped with `object-position: 40% 50%`.
- **Listed in** `app/sitemap.ts` and `app/llms.txt/route.ts` (static entries). It is linked from `/sehenswuerdigkeiten-prag` and "Was kann man in Prag machen".
- Don't add `export const dynamicParams = false` to dynamic routes. With `output: 'export'` it isn't needed, and in `next dev` it causes a bogus 500 "missing generateStaticParams()".

### Tours
`src/data/tours.ts`: six tours (`castle`, `oldtown`, `custom`, `hidden`, `german`, `havel`). Each has an EN `slug` and a DE `slugDe`. All copy goes through translation keys in `translations.ts`.

### Images
- Everything is in `public/images/` (+ `hero/`, `web/` optimized WebP, `thumbs/` and `sized/` generated).
- **Every new image needs a row in `public/images/ZDROJE.md`** (source, date, licence). The file is in Czech and has naming rules: `<desc>-<source>-original-name__<orig>.jpg`. Credit goes in a block's `credit` / the article's `heroCredit`. Images that require a credit must not go on tour cards or the homepage, because no credit is shown there. Compress to ~200–400 KB.
- Jewish Museum photos (`blog-jewish-quarter*`) require a copyright credit to the Jewish Museum in Prague.
- `<ResponsivePicture>` (`src/components/site/ResponsivePicture.tsx`) + `scripts/generate-responsive-images.cjs`: add an image to the script's `IMAGES` list to get AVIF/WebP `srcset`s. *(New as of 2026-10-09, still uncommitted.)*

### SEO
- Per-page metadata via the Next `metadata` / `generateMetadata` API. Article JSON-LD comes from `src/utils/seo.ts` (`getArticleSchema`, including FAQ and `about`).
- hreflang: bilingual posts link DE↔EN slugs; German-only posts carry `de` only.
- `www` → apex, and `zuzapragtours.de` (plural) → `zuzapragtour.de`, are 301 redirects (`netlify.toml`, `public/_redirects`).
- `/images/ZDROJE.md` and `/images/README.md` are forced to 404 in production.

### Homepage A/B test (running)
- Edge function `netlify/edge-functions/ab-home.ts` on `GET /` assigns `a`/`b` 50/50 (cookie `zpt_ab`, 60 days) and sets `<html data-ab>`.
- Both homepages ship in the same HTML (`src/screens/HomePage.tsx`). CSS in `src/styles/home-ab.css` shows `HomeMobileV2` only for variant B below 900px. Desktop is variant A for everyone.
- Use `?ab=a|b` to preview (sets `zpt_ab_qa`, which keeps the visit out of the counts) and `?ab=off` to reset. Bots always get A.
- Events go to `POST /api/ab-event` (`netlify/functions/ab-event.mjs`) and are stored in the Netlify Blobs store `ab-home`. They are read by `ab-results.mjs` (needs header `x-ab-key` = `STATS_KEY`).
- To stop the test, set `ENABLED = false` in the edge function, or ship the winner and delete the losing variant.

### Own analytics (anonymous, no cookies)
- `src/utils/analytics.ts` + `AnalyticsTracker` record page views, clicks (whatsapp/phone/email/form/tour…), enquiries, copied email or phone, time on page and read depth. Data goes to `POST /api/track` (`netlify/functions/track.mjs`) and the Blobs store `site-stats`.
- `GET /api/visits?from&to` (`visits.mjs`, max 45 days, needs header `x-stats-key` = `STATS_KEY`) feeds the admin dashboard "Kliky a poptávky" (Czech UI).
- To stop counting your own visits: open any page once per browser with `?track=off` (`?track=on` undoes it).

### AdSense
- Publisher `ca-pub-4497386236985187`. The verification meta tag is always present.
- The loader only runs when Netlify env `ADSENSE_ENABLED=true` (read at build time, so you must redeploy). Slot IDs in `src/config/adsense.ts` are empty, so placeholders show. See `docs/adsense.md`.

### Second brand: pragkenner.de
- `src/config/siteBrand.ts` reads `NEXT_PUBLIC_SITE_BRAND`. Root `netlify.toml` sets it to `pragkenner` for the branch `pragkenner.de`. `brand.ts` claims to be the "per-branch" file.
- In practice that branch is ~6 months behind and not maintained. Treat pragkenner as dormant unless told otherwise.

## 4. Admin CMS (`admin/` → admin.zuzapragtour.de)

- **Separate Netlify site** from the same repo: base `admin`, publish `dist`, own `admin/netlify.toml`, `noindex`, `X-Frame-Options: DENY`.
- Vite + React 18 + TS. Single user, password gate (`login` / `session` / `logout` functions, HMAC cookie via `netlify/lib/auth.mjs`).
- **Saving an article = a commit** of `prague-tour-guide/content/journal/<slug>.json` via the GitHub Contents API (`netlify/lib/github.mjs`). The commit triggers a rebuild of the public site. In local `netlify dev` it writes the files on disk instead (`netlify/lib/store.mjs`).
- Features:
  - block editor (DE + per-article EN), MapBuilder (Leaflet), image picker and media library, tours list
  - "Aus Stichwörtern" AI draft (`generate-article.mjs`, Anthropic API, default model `claude-sonnet-4-6`, override with `ANTHROPIC_MODEL`)
  - reviews panel (Google Places)
  - A/B panel and stats dashboard (proxy to the public site's `/api/ab-results` and `/api/visits`)
- Env (admin site): `ADMIN_PASSWORD`, `SESSION_SECRET`, `GITHUB_TOKEN`, `GITHUB_REPO=mandev-1/zuzapragtour.de`, `GITHUB_BRANCH=zuzapragtour.de`, `STATS_KEY` (same value as on the public site), optional `ANTHROPIC_API_KEY`/`ANTHROPIC_MODEL`, `GOOGLE_PLACES_API_KEY`/`GOOGLE_PLACE_ID`.
- Local dev: `cd admin && ADMIN_PASSWORD=test SESSION_SECRET=dev npx netlify dev` → http://localhost:8888
- UI rules: z-index ladder content 10 < sticky bars 50 < modal 60 < toast 90. No emoji.

## 5. Deploy and environment

- **Public site:** Netlify, repo-linked. Root `netlify.toml`: base `prague-tour-guide`, `npm run build`, publish `out`. Pushing to `zuzapragtour.de` deploys.
- Public site env: `STATS_KEY` (or legacy `AB_RESULTS_KEY`), `ADSENSE_ENABLED`, `NEXT_PUBLIC_SITE_BRAND` (pragkenner branch only).
- Netlify Forms: the `contact` and `booking` forms are declared hidden in `app/layout.tsx`. Submissions show up in the Netlify UI.
- Functions (`prague-tour-guide/netlify/functions/`): `track`, `visits`, `ab-event`, `ab-results` (live), `health` and `ingest` (**placeholder stubs**; `ingest` runs every 10 minutes via `[[scheduled]]` and does nothing).
- Edge functions: `ab-home` (live) and `inject-meta` (**live but stale**, see below).

## 6. How-tos

**Publish a new article**
1. Create it in the admin (or write `content/journal/<slug>.json` by hand).
2. Add the images to `public/images/` and a row to `ZDROJE.md`.
3. Set `status: published`.
4. If it was edited by hand: run `npm run gen:journal` and check it with `npm run dev`, then commit and push.
5. Hand-written edits must follow `src/types/journal.ts`.

**Change UI text:** edit `src/utils/translations.ts`, filling both `en` and `de`.

**Change contact info or profile links:** `src/brand.ts`.

**Add or change a tour:** `src/data/tours.ts` + the `tour.<id>.*` keys in `translations.ts`. Run `npm run images` if it uses a new image.

**Merge or rename an article URL:** set `redirectFrom` in the JSON **and** add a `[[redirects]]` 301 in root `netlify.toml`. Rename the file to the new slug, and update internal links (`grep -r "/blog/<old>" content src`).

**Publish a migrated draft:** set `languages: ["de"]`, delete the `en` values, keep only the German slug (use the old `slugDe` as `slug`, drop `slugDe`, rename the file). Add the old English slug to `redirectFrom` + `netlify.toml`, then set `status: published`. The legacy twin disappears automatically.

**Implement a design handoff:** the handoff README is the spec. `.dc.html` files are references to rebuild, not code to paste. Reuse `Header`/`Footer`, the `SiteUI` primitives (`Kicker`, `ULink`, `Btn`, `SHELL`), the tokens and `t()`.

## 7. Known issues (verified 2026-10-09)

1. **`inject-meta` edge function overwrites current titles with stale ones.**
   - It runs on every HTML page and rewrites `<title>`, description, OG and canonical from `netlify/edge-functions/route-meta.json`.
   - That file was generated on 2026-09-19 by `scripts/generate-route-meta.cjs`, which is **no longer part of the build**.
   - Live example: `/` serves "Zuzana Manová | Deutschsprachige Prag-Expertin…" instead of the title in `app/page.tsx`.
   - Live example: `/blog/strahov-monastery-prague` serves the old English title "Strahov Monastery: Quiet Views, Library, and Lore | Zuza Prague Tours".
   - Likely fix: remove the edge function (Next now emits correct metadata) or regenerate the JSON from current data.
2. ~~Placeholder OG tags in `app/layout.tsx`~~: **fixed 2026-10-09** (not deployed until pushed). The `your-site.com` placeholders are removed; every page now has a single set of OG tags from its own metadata.
3. **All article text ships as JS** (~614 KB chunk), and English is not in the static HTML. This is the motivation for the deferred Astro migration (`.handoffs/0007----astro-migration/`, ~4–6 dev days).
4. `ping-sitemaps.js`: Google's sitemap ping endpoint was retired in 2023, so that part is a no-op. IndexNow still works.
5. `scripts/generate-sitemap.js` is unused (`app/sitemap.ts` replaced it). `blogData.ts` still contains a fake "API" stub (`blogApi`, `exportBlogPostToJSON`) that nothing uses.
6. **macOS `sips` sometimes writes AVIFs that Chrome draws as fully transparent** (found 2026-10-09). The file loads and has the right size, but no pixels show. It happened with `charles-bridge-statue-1280/-1920` (the homepage closing-section backdrop vanished) and `prague-castle-1077` (castle tour card). Those three were re-encoded with ffmpeg (`libsvtav1`, `-crf 32`) and now render. `scripts/generate-responsive-images.cjs` still uses `sips`, so after `npm run images` / `images:force` or adding an image, check each new AVIF in Chrome, or switch the script's AVIF step to ffmpeg.

## 8. Open work and backlog

- **In progress (uncommitted as of 2026-10-09):** responsive AVIF/WebP images (`ResponsivePicture`, `generate-responsive-images.cjs`, `public/images/sized/`) plus edits to journal JSON, `Home*.tsx` and `ZDROJE.md`.
- **Done 2026-10-09:** `design_handoff_karlsbruecke_prager_burg`, live as `/prag/karlsbruecke` after push (1:1 port, see §3). The handoff checklist also asks for links from the tours index and a homepage "keyword section". The homepage has no such section yet, and the tours-index link is not done.
- **Deferred:** Astro migration (0007). Email-to-blog `ingest` pipeline (stub only).
- **Backlog:** `TBD.md` (`/book` form dropdowns, photo, sticky WhatsApp, listings on Viator/GetYourGuide/Google Business Profile, keyword list) and `urls-links-2026-25-04.md` (SEO items; the noindex/robots part is done).
- Finish the 31 draft journal migrations, or delete the ones that won't ship.

## Doc trust map

| Doc | Trust |
|---|---|
| Code | highest |
| this file | verified 2026-10-09 |
| `admin/README.md` | accurate |
| `public/images/ZDROJE.md` | accurate, required to maintain |
| `docs/adsense.md` | accurate |
| `.handoffs/0007…/README.md` | accurate analysis, plan deferred |
| `design_handoff_*/README.md`, `.handoffs/000x` | design specs; implemented unless noted in §8 |
| `CLAUDE.md` | **stale** (describes CRA); the image-licence rule is still valid |
| `prague-tour-guide/*.md`, `public/images/README.md` | **historical** (CRA era / old paths) |
