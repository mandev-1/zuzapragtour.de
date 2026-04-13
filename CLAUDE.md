# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from `prague-tour-guide/`:

```bash
npm start          # Dev server (uses legacy OpenSSL provider)
npm run build      # Production build (auto-generates + pings sitemap)
npm test           # Jest tests via React Scripts
npm run new:blog   # Scaffold a new post in blogData.ts + blogTranslations.ts (see below)
```

The build pipeline hooks:
- **pre-build**: `scripts/generate-sitemap.js` — regenerates `public/sitemap.xml` from blog data
- **post-build**: `scripts/ping-sitemaps.js` — notifies Google/Bing of sitemap updates

## Architecture

**React 18 + TypeScript SPA** for a professional Prague tour guide (Zuzana Manova). Toolchain: React Scripts (CRA), Tailwind CSS 3, Framer Motion, React Router v6, React Helmet Async.

### Routing (App.tsx)

Top-level router wraps everything in `HelmetProvider` and `LanguageProvider`. Routes map to page wrappers in `src/pages/` (which manage SEO meta tags via Helmet) that render core components from `src/components/`.

### Bilingual i18n (EN/DE)

Custom lightweight translation system — **no i18next or external library**.

- `src/utils/translations.ts` — 1500+ line object mapping translation keys to `{en, de}` string pairs. This is the source of truth for all UI text.
- `src/utils/blogTranslations.ts` — Extended blog post translations (titles, excerpts, full HTML content for 14+ posts).
- `src/utils/blogData.ts` — `BlogPost` interface and metadata array (slug, date, image, etc.).
- `src/context/LanguageContext.tsx` — React Context with `useLanguage()` hook exposing `{ language, setLanguage, t }`. Defaults to German (`de`), persisted in `localStorage` as `zpt.lang`.

When adding new translatable text: add a key to `translations.ts` with both `en` and `de` values, then use `t('your.key')` in components.

### Blog Subsystem

Blog posts are data-driven. Metadata lives in `blogData.ts`; full bilingual content (including HTML) lives in `blogTranslations.ts`. `BlogPostPage.tsx` resolves the slug from the URL, looks up data + translations, and renders with full SEO markup (structured data via `src/utils/seo.ts`).

**Adding a post (Git → Netlify):** Run from `prague-tour-guide/`:

`npm run new:blog -- --slug=your-url-slug --date=YYYY-MM-DD --image=/images/your-hero.jpg --title-en="..." --title-de="..." --excerpt-en="..." --excerpt-de="..." [--slug-de=german-slug] [--tags="tag1,tag2"]`

Use `--dry-run` to preview. Then add the image under `public/images/`, replace the draft HTML in `blog.postN.content`, run `npm run build`, commit, and push. Netlify (repo-linked) rebuilds from the private GitHub repo automatically—no CMS required. Optional later: [Decap CMS](https://decapcms.org/) with the GitHub backend to edit Markdown in-browser while still committing to the same repo.

### Styling

Tailwind CSS with a custom theme defined in `tailwind.config.js`: Prague-themed reds/golds/dark blues, custom fonts ("Noto Serif" for headings/body, "Plus Jakarta Sans" for labels). Global styles in `src/index.css`; component-specific overrides in `src/styles/blog-content.css`.

### SEO

- `React Helmet Async` manages `<head>` meta tags per page/post.
- `src/utils/seo.ts` generates JSON-LD structured data (schema.org).
- Sitemap is auto-generated from blog data at build time.
- `public/robots.txt` and `netlify.toml` handle crawl/deployment config.

### TripAdvisor Integration

`src/constants/tripAdvisor.ts` holds widget config. `src/components/TripAdvisorWidget.tsx` renders the embed.

## Key Files for Content Changes

| What to change | Where |
|---|---|
| UI text / labels | `src/utils/translations.ts` |
| Blog post content | `src/utils/blogTranslations.ts` |
| Blog post metadata (slugs, dates, images) | `src/utils/blogData.ts` |
| Tour descriptions / pricing | `src/components/Tours.tsx` + `translations.ts` |
| Contact info | `src/components/Contact.tsx` + `translations.ts` |
| Color palette / fonts | `tailwind.config.js` |
