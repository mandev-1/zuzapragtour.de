The marketing site's sticky top navigation — the `.nav` from the live site, as a component. Brand wordmark · links · bordered CTA, with a native hamburger menu under 860px. It is `position: fixed`, so give the page's first section top padding (or a hero behind it).

```jsx
// Homepage: transparent over the hero, glassy once scrolled
<SiteHeader solidOnScroll current="" />

// Inner page: solid from the top, current tab marked
<SiteHeader current="tours" />
```

`solidOnScroll` is the only behavioural switch: on for the homepage hero, off (default) everywhere else. Override `links`, `cta`, or `brand` to repurpose it; `current` takes a link `key` to mark the active tab. Pair with `SiteFooter`.
