# Journal-Verwaltung — Admin CMS (`admin.zuzapragtour.de`)

A login-gated content manager for the Zuza Prague Tours journal. **Separate** Vite + React + TS SPA, deployed as its **own Netlify site** from this same repo (base directory `admin/`). 1:1 with the 0004 handoff design.

> A hostname belongs to exactly one Netlify site, so the public site (`zuzapragtour.de`, base `prague-tour-guide/`) and this admin (`admin.zuzapragtour.de`, base `admin/`) must be two sites.

## Stack
- **Vite + React 18 + TypeScript** SPA. CSS is the reference design system verbatim (`src/styles/tokens/*` + `styles.css`) — same tokens/fonts as the public site.
- **Auth:** password gate via Netlify Function (`netlify/functions/login`), HMAC-signed HTTP-only session cookie (`netlify/lib/auth.mjs`). Single user.
- **Editor:** bilingual (DE / per-article EN) block editor — paragraph, heading, pull-quote, callout, image, cost table, map, ornament — with an image picker and the Leaflet MapBuilder. `AdminSuite` → `ArticleTable` (dashboard) + `ArticleEditor`.
- **Persistence (live):** articles are JSON files at `prague-tour-guide/content/journal/<slug>.json`. The functions read/write them via the GitHub Contents API; a commit triggers the public Netlify site to rebuild (its prebuild regenerates the journal data and renders the blocks). Functions: `list-articles`, `get-article`, `save-article`, `delete-article`, `list-images`.
- **Data model:** the bilingual `JournalArticle`/`Block` schema in `src/types/journal.ts` is the contract — **kept byte-for-byte identical** in `prague-tour-guide/src/types/journal.ts`.
- **Maps:** Leaflet 1.9.4 + CARTO Positron (MapBuilder here; `src/utils/journalMaps.ts` on the public site).

## Local development
```bash
cd admin
npm install
# UI only (login + saving won't work — no functions):
npm run dev                     # http://localhost:5174
# UI + Functions (auth; editor runs on local seed if GitHub isn't configured):
ADMIN_PASSWORD=test SESSION_SECRET=dev-secret npx netlify dev   # http://localhost:8888
# To exercise real reads/commits locally, also export a GitHub token + repo:
ADMIN_PASSWORD=test SESSION_SECRET=dev-secret \
  GITHUB_TOKEN=ghp_xxx GITHUB_REPO=mandev-1/zuzapragtour.de GITHUB_BRANCH=zuzapragtour.de \
  npx netlify dev
```
Log in with the `ADMIN_PASSWORD` you set. Without `GITHUB_*`, the dashboard falls back to local seed articles so the editor is still usable; saving will report that GitHub isn't configured.

## Deploy — create the 2nd Netlify site
1. Netlify → **Add new site → Import from Git** → same repo.
2. **Base directory:** `admin`  ·  **Build command:** `npm run build`  ·  **Publish directory:** `dist` (all relative to `admin/`; `admin/netlify.toml` also declares these).
3. **Environment variables** (Site settings → Environment):
   - `ADMIN_PASSWORD` — the admin login password.
   - `SESSION_SECRET` — a long random string (signs the session cookie).
   - `GITHUB_TOKEN` — fine-grained PAT with **Contents: read & write** on `mandev-1/zuzapragtour.de`.
   - `GITHUB_REPO` = `mandev-1/zuzapragtour.de`.
   - `GITHUB_BRANCH` = the branch the public site builds from (e.g. `zuzapragtour.de`).
   - `ANTHROPIC_API_KEY` — *(optional)* enables the **"Aus Stichwörtern"** AI draft generator. `ANTHROPIC_MODEL` overrides the model (default `claude-sonnet-4-6`).
4. **Subdomain + SSL:** Site → Domain management → add custom domain `admin.zuzapragtour.de`.
   - Best path: keep the apex on **Netlify DNS**; then add the `admin` subdomain to this site and Netlify auto-creates the record + provisions Let's Encrypt SSL.
   - On external DNS: add a `CNAME admin → <this-site>.netlify.app`, then "Verify"/provision SSL in Netlify.

## Status
- ✅ Scaffold (Vite/TS), 1:1 tokens + fonts, `netlify.toml`, noindex headers.
- ✅ **AdminShell** (sidebar + sticky top bar) ported 1:1.
- ✅ **Auth:** working password gate (login/session/logout functions + client) + LoginGate UI.
- ✅ **Editor:** ArticleTable + bilingual ArticleEditor (8 block types, insert palette) + MapBuilder + ImagePicker.
- ✅ **Persistence:** `list-articles` / `get-article` / `save-article` / `delete-article` / `list-images` wired to the GitHub Contents API. Save → commit → public rebuild.
- ✅ **Block → public-blog bridge:** the public site renders blocks via `prague-tour-guide/scripts/render-blocks.cjs` (build) + `src/utils/journalMaps.ts` (maps). Migration aid: `prague-tour-guide/scripts/html-to-blocks.cjs --post=N`.

## Migrating legacy posts (gradual)
The 36 legacy posts keep working as-is. Convert one to blocks on demand:
```bash
cd ../prague-tour-guide
node scripts/html-to-blocks.cjs --post=30 --dry-run   # preview
node scripts/html-to-blocks.cjs --post=30             # writes content/journal/<slug>.json (status: draft)
```
Then open it in the admin, review (it lands as a draft), finish any English, and publish.

## Constraints (preserve)
- **z-index ladder:** content `10` < sticky bars `50` < editor modal overlay `60` < toast `90`. Floating controls stay below `50` and out of the top-bar zone.
- **No emoji**, German formal (*Sie*), Material Symbols only.
- The reference prototypes' proprietary `<x-dc>` runtime is **not** ported — only structure/copy/tokens.
