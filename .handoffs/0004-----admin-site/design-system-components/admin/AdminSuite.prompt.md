The complete article admin & editor for the journal — a warm, on-brand CMS rather than a generic dashboard. Two surfaces inside the `AdminShell` chrome: a **curation dashboard** (`ArticleTable` — status filters, search, row actions) and a **block-based editor** (`ArticleEditor`) whose insert palette adds paragraphs, headings, pull-quotes, callouts, images, cost tables, ornaments and **maps**. The map block opens the `MapBuilder`, which renders tour stops from real `[lat,lng]` coordinates on a real Leaflet / OpenStreetMap (CARTO) map with an optional walking route (or a custom embed URL).

```jsx
// Runs out of the box on the seeded real journal
<AdminSuite />

// Or drive it with your own article set
<AdminSuite articles={myArticles} imageBase="/assets/images/" />
```

Mounted full-screen by the `templates/article-admin` template. The pieces are independently usable: `AdminShell` (chrome), `ArticleTable` (dashboard), `ArticleEditor` (controlled `doc`/`onChange`), `MapBuilder` (the map block, also fit for the public article page). All state lives in `AdminSuite`; new/edit/duplicate/delete, save and publish are wired with toasts.
