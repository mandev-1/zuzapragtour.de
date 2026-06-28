## SEO Priority Actions — 2026-04-25

1. **`/book`, `/privacy`, `/terms` — add `noindex`, remove from sitemap.**
   These three pages have zero ranking potential and dilute crawl budget. Add `<meta name="robots" content="noindex, follow">` to each page component and remove the corresponding `<url>` blocks from `generate-sitemap.js`.

2. **Translate 4 high-value EN-only blog posts to German.**
   Ten posts have no DE slug and therefore no hreflang, weaker reach for the primary German-speaking audience. Highest-priority candidates:
   - `/blog/jewish-quarter-history-and-heritage`
   - `/blog/klementinum-baroque-library-prague`
   - `/blog/strahov-monastery-prague`
   - `/blog/vaclav-havel-tour-prague`

3. **`/blog/what-to-do-in-prague-in-november-2025` — update or noindex.**
   The title and slug contain "2025" — already past, and will decay in rankings. Either rewrite as an evergreen page (`was-tun-in-prag-im-november`) or add `noindex` to prevent it from dragging down crawl quality.

4. **`/contact` title — too generic.**
   Current: "Contact & Booking — Prague Tour Guide | ZuzaPragTour"
   Suggested DE: "Prag Führung anfragen – Zuzana Manová | ZuzaPragTour"
   Suggested EN: "Book a Prague Tour — Contact Zuzana Manová | ZuzaPragTour"

5. **Verify `/blog` page description.**
   The description pulls from the `blog.subtitle` translation key. Confirm this is specific and keyword-rich (e.g. "Insider-Tipps, Stadtführer-Wissen und Reiseinformationen für Prag — von einer zertifizierten Prag-Expertin") rather than a short placeholder string.

6. **`ogImage` field now supported on blog posts.**
   Post 30 (Bootsfahrt) already uses it. For any post where the card thumbnail is not ideal for WhatsApp/Facebook sharing (too square, too busy, wrong crop), add an `ogImage` field in `blogData.ts` pointing to a better 1200×630 image. The `BlogPostPage` will use it automatically.
