The brand's signature animated text link — uppercase, tracked Inter Tight on a 1px rule that retracts to the right on hover. Use for quiet navigational links and metadata links (footer, captions, "weiterlesen"), where a full `Button` would be too loud. Distinct from `Button variant="link"` (a static underline): this one animates and nudges its icon.

```jsx
<UnderlineLink href="tours.html" icon="arrow_forward">Meine Touren ansehen</UnderlineLink>
<UnderlineLink href="https://www.tripadvisor.de" color="var(--gold-lamp)">4,9 ★ TripAdvisor</UnderlineLink>
```

Color is inherited by default (`currentColor`), so it adapts to dark and light grounds; pass `color` to pin it. `icon` adds a trailing Material Symbol that translates up-and-right on hover.
