The dark ink footer that closes every marketing page — the live site's `.footer`, as a component. Brand block (tagline + "Touren ansehen" CTA + gold TripAdvisor rating), up to three link columns, and a legal bottom bar. Ships with the exact site content as defaults, so `<SiteFooter />` renders the real footer.

```jsx
<SiteFooter />

// Repurpose the columns / legal line
<SiteFooter
  columns={[{ title: 'Kontakt', items: [{ label: 'WhatsApp', href: 'https://wa.me/420721231933', external: true }] }]}
  copyright="© 2026 Zuza Prague Tours"
/>
```

Every slot (tagline, cta, rating, columns, bottomLinks) accepts null to omit it. Collapses to two columns under 820px and one under 600px. Pair with `SiteHeader`.
