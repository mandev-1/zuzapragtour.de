Primary action control — use for any call-to-action (booking, enquiry, navigation). `primary` is the burgundy gradient hero/CTA button; `ink` and `outline` are the quieter editorial choices; `onDark` sits on the dark ink sections.

```jsx
<Button variant="primary" size="lg" icon="arrow_forward">Anfrage senden</Button>
<Button variant="outline">Touren erkunden</Button>
<Button variant="link" icon="chevron_right">Details</Button>
```

Variants: `primary` (gradient + glow), `accent` (solid burgundy), `ink` (solid near-black), `outline` (hairline, fills on hover), `onDark` (paper on dark), `link` (underlined text). Sizes: `sm` / `md` / `lg`. Pass `href` to render an anchor, `icon` for a trailing Material Symbol (`iconLeading` to flip side).
