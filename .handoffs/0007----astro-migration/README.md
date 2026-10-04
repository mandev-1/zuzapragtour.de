# Handoff: Migrate the public site from Next.js to Astro

**Status:** planned, not started. Scoped on 2026-10-04 and deferred until later.
**Scope:** `prague-tour-guide/` (public site) only. `admin/` (Vite CMS) and `netlify/functions/` are out of scope.
**Estimate:** about 4–6 dev days for the full version (option B). Most of that time goes on checking roughly 90 pages in both languages, not on writing code.

> Heads-up: `CLAUDE.md` still describes the old CRA / React Router / Helmet setup. The real stack is **Next.js 14 App Router with `output: 'export'`** (fully static, served from `out/` on Netlify). Trust the code over CLAUDE.md.

---

## 1. Why migrate

The site is about 90% static content: 36 journal articles, legacy posts and tour pages. Two measured problems come from the current architecture.

1. **All article text ships as JS on every page.** The chunk `out/_next/static/chunks/381-*.js` is **614 KB (205 KB gzip)**. It contains the article bodies and is loaded on **67 pages, homepage included**. The cause is that every screen is `'use client'` and imports `translations.ts` / `blogTranslations.ts` / `journalGenerated.ts` wholesale.
2. **English is invisible to crawlers.** `LanguageContext` picks the language from `localStorage` after mount, so the prerendered HTML is always German. Example: `/blog/autumn-in-prague` has an English `<title>` (from `generateMetadata`), but its `<h1>` and body are German. English text only appears after a visitor switches the language client-side.

How to re-measure:

```bash
# from prague-tour-guide/. Don't run this while `npm run dev` is running (they share .next/)
npm run build
ls -lS out/_next/static/chunks/*.js | head -5
grep -o '<title>[^<]*' out/blog/autumn-in-prague.html
grep -o '<h1[^>]*>[^<]*' out/blog/autumn-in-prague.html
```

### Decide this first: Astro, or fix it in Next?

Both problems can also be fixed inside Next by turning screens into server components and taking the language from the URL. That costs roughly half the effort. Choose Astro if the goal is a simpler, lighter stack for a content site. Fix it in Next if the goal is only to solve the two problems above. Whichever you pick, the core work in §3 (language from the URL, `lang` passed as a prop) is the same.

---

## 2. Current state (as of 2026-10-04)

| Area | What's there |
|---|---|
| Routes (`app/`) | `/`, `/tours`, `/tours/[slug]`, `/blog`, `/blog/[slug]`, `/contact`, `/book`, `/bewerten`, `/zuzana-manova`, `/privacy`, `/terms`, plus `sitemap.ts` and `robots.ts` |
| Route files | Thin wrappers that hold `metadata` / `generateMetadata` / `generateStaticParams` and render a screen from `src/screens/` |
| Components | 11 screens, about 12 components in `src/components/`, about 20 in `src/components/blog/`, and `site/SiteUI.tsx`. 28 files are `'use client'` |
| i18n | `src/context/LanguageContext.tsx` (`useLanguage()` → `{language, setLanguage, t}`) is used by 15 files. Default is `de`, persisted in `localStorage` as `zpt.lang` |
| Content | `src/utils/translations.ts` (2.2k lines), `blogTranslations.ts` (5.2k lines, legacy HTML posts), `blogData.ts` (metadata), `content/journal/*.json` (36 block articles). `scripts/generate-journal.cjs` turns these into `src/utils/journalGenerated.ts` |
| Next-specific imports | `next/link` ×17, `next/image` ×7, `next/navigation` ×7, `next/script` ×1, `next/font/google` (6 fonts in `app/layout.tsx`) |
| Bilingual slugs | Blog posts and tours already have separate `slug` (EN) and `slugDe` (DE). Both get prerendered, but both render German HTML |
| Brand variant | `NEXT_PUBLIC_SITE_BRAND=pragkenner` on the `pragkenner.de` branch (`src/config/siteBrand.ts`) |
| Netlify | Repo-root `netlify.toml`: `base = prague-tour-guide`, `publish = out`, cache header on `/_next/static/*`, scheduled `ingest` function, edge function `netlify/edge-functions/inject-meta.ts` on `/*` |

---

## 3. Target architecture (option B, the one worth doing)

- **Astro + `@astrojs/react`, static output.** Existing React `.tsx` components are reused. Astro renders them to HTML at build time with **zero JS** unless they carry a `client:*` directive, so most components do **not** need rewriting into `.astro`.
- **Language comes from the URL, not from `localStorage`.**
  - Blog posts and tours keep their current URLs. `slugDe` renders DE and `slug` renders EN, so no redirects are needed there.
  - Pages without their own slugs (`/`, `/tours`, `/blog`, `/contact`, `/book`, `/zuzana-manova`, `/bewerten`, `/privacy`, `/terms`) stay German at the current URL and get an EN twin under `/en/...`.
  - Replace `useLanguage()` with a `lang` prop plus a plain `t(lang, key)` helper. React context does **not** cross Astro islands, which is why the prop is needed.
  - The header language switch becomes a link to the counterpart URL. Build a `getAlternateUrl(lang, path)` helper from `blogData` / `tours` slug pairs.
  - Emit `hreflang` alternates and the canonical URL per page from the layout.
- **Only interactive pieces become islands.** These are the files that hold state today:
  - `Header` (mobile menu, language switch) → `client:load`
  - `Contact`, `BookPage` form (Netlify Forms; `?tour=` prefill via `useSearchParams`) → `client:load`, or read `location.search` in a small script
  - `BewertenPage` (review funnel) → `client:load`
  - Blog: `TableOfContents` (scroll-spy), `ProgressBar`, `BackToTop`, `ShareBlock`, `NewsletterCard` → `client:idle` / `client:visible`
  - Journal maps: `src/utils/journalMaps.ts` (lazy-loads Leaflet) → small `<script>` or `client:visible`
  - `ScrollToTop`, `BlogPromo`, `AdSlot`, `TripAdvisorWidget`, `Blog` (index filters), `Home` (check what the state does), `SiteUI` (check which exports are stateful)
- **Articles render on the server.** `BlogPostPage`'s HTML processing (`injectHeadingIds`, `processGrundSections`, `extractHeadings`) runs at build time, and only the per-page HTML ships. This removes problem 1.

### Next → Astro mapping

| Next | Astro |
|---|---|
| `app/**/page.tsx` + `generateStaticParams` | `src/pages/**/*.astro` + `getStaticPaths` |
| `metadata` / `generateMetadata` | Props into a shared `BaseLayout.astro` that writes `<title>`, description, OG, canonical and hreflang |
| `app/layout.tsx` | `src/layouts/BaseLayout.astro`, including the **hidden Netlify Forms declarations** (`contact`, `booking`). Keep them, or form submissions break |
| `next/link` | `<a href>` |
| `next/image` (`unoptimized` anyway) | `<img>` (optionally `astro:assets` later) |
| `useParams` / `usePathname` | Props passed from the `.astro` page |
| `next/font/google` (Italiana, Libre Caslon Text, Cormorant Garamond, Inter Tight, Hanken Grotesk, EB Garamond) | `@fontsource/*` or Astro's fonts API. Keep the CSS variable names (`--font-display`, `--font-body`, `--font-italic`, `--font-sans`, `--font-hanken`, `--font-garamond`) |
| `next/script` (AdSense, gated by `ADSENSE_ENABLED`) | `<script async>` in the layout |
| `app/sitemap.ts`, `app/robots.ts` | `@astrojs/sitemap` (with i18n alternates) + `public/robots.txt` or an endpoint |
| `NEXT_PUBLIC_SITE_BRAND` | `PUBLIC_SITE_BRAND` (update `src/config/siteBrand.ts` and the Netlify branch env) |
| `out/` | `dist/` |

---

## 4. Plan

0. **Make the decision in §1**, then branch off `zuzapragtour.de`.
1. **Proof of concept (½–1 day).** Scaffold Astro next to the current app. Port `BaseLayout` and **one blog post** in both languages. Measure JS shipped and check that the EN URL has English HTML. Stop here if the gain isn't convincing.
2. **i18n refactor (1–1.5 days).** Add the `t(lang, key)` helper and pass `lang` as a prop through all 15 `useLanguage()` users. Build the alternate-URL helper. Delete `LanguageContext`.
3. **Pages (1–1.5 days).** Port every route, DE + EN. Use `getStaticPaths` for `/blog/[slug]` and `/tours/[slug]`, keeping today's exact slugs.
4. **Islands (½–1 day).** Add `client:*` to the interactive list above and strip `'use client'` / `next/*` imports.
5. **SEO and infra (½ day).** Sitemap with alternates, robots, canonical/hreflang, JSON-LD from `src/utils/seo.ts`, `netlify.toml` (`publish = "dist"`, cache header `/_astro/*`), brand env var.
6. **Verification (1 day).** Click through every page in DE and EN on both brands, submit both Netlify forms, check maps, TOC and AdSense, compare HTML `<title>` / `<h1>` / canonical against production, and run Lighthouse before and after.

## 5. Watch out for

- **URLs must not change** for existing pages and posts (traffic and backlinks). The only new URLs are `/en/...` for pages without their own slugs.
- **Returning EN visitors**: `zpt.lang=en` users will land on German root URLs. Decide whether to show a small "English version" hint. Don't auto-redirect, because that hurts crawling.
- **`netlify/edge-functions/inject-meta.ts`** runs on `/*` and injects meta from `route-meta.json` / `route-content.json`. `scripts/generate-route-meta.cjs` is no longer wired into `npm run build`, so that JSON may be stale. With correct meta in static HTML it is probably obsolete. Verify, then remove it (or keep it in sync).
- **`admin/src/types/journal.ts`** must stay byte-identical to `prague-tour-guide/src/types/journal.ts`. Don't change the block schema during the migration.
- **`generate-journal.cjs` / `generate-thumbnails.cjs`** are framework-agnostic. Keep them as pre-build steps. Moving journal JSON into Astro Content Collections is an optional later step, not part of this migration.
- **`new:blog`** writes into `blogData.ts` / `blogTranslations.ts`, which don't change, so it should keep working.
- Next also emits `.txt` RSC payload files next to each `.html` in `out/`. These disappear after the migration, which is expected.
- After the migration, update `CLAUDE.md` (commands, architecture, i18n section).
