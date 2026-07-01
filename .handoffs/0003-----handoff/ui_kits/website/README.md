# Website UI kit — Zuza Prague Tours marketing site

An interactive recreation of the three core marketing surfaces of **zuzapragtour.de**:

- **Home** — photographic hero with the floating portrait card, "Selected Experiences" numbered tour list, About strip with stat blocks, dark guest-photo gallery, three-up reviews, and the burgundy gradient final CTA.
- **Tours** — the quiet editorial numbered list of tours (Roman numerals, hairline dividers, no color band), closing on the dark CTA.
- **Book** — the contact/booking form with the sidebar (direct-to-Zuzana intro, contact details, review) and a success state.

The top nav switches screens; the **Tour buchen** / **Anfrage senden** buttons jump to Book.

## Files
- `index.html` — entry; loads the DS bundle + both script files, mounts `<App>`.
- `site-home.jsx` — shared `Header` / `Footer` and the `Home` screen (exposed on `window.ZPTSite`).
- `site-app.jsx` — `ToursScreen`, `BookScreen`, and the `App` shell that wires navigation.

## Composes these DS components
`Button`, `Icon`, `Eyebrow`, `Badge`, `SectionHeading`, `StatBlock`, `TourRow`, `ReviewCard`, `Field`.

## Notes
- Real Prague photography is pulled from `../../assets/images/`.
- This is a cosmetic recreation — forms don't submit; screen state is local React state.

## Additional standalone pages (premium direction)
- `home.html` — faithful standalone recreation of the live `/` homepage (uses the DS bundle).
- `home-premium.html` — an elevated "quiet-luxury editorial" direction for the homepage (self-contained; links `styles.css` only). Italiana display type, cinematic hero, interactive tour-preview, hairline rules, restrained motion, mobile menu.
- `review-funnel.html` — a **mobile-first review-collection funnel** to convert guests met on tours into Google / TripAdvisor reviewers. Self-contained. Star-rating entry that routes 4–5★ to public review buttons and 1–3★ to private feedback (WhatsApp/email); progressive persuasion for anyone who keeps scrolling (how-to steps, a copy-to-clipboard review helper, a personal note, social proof, and other ways to help); sticky mobile CTA dock. **Before use:** replace `REPLACE_WITH_GOOGLE_PLACE_ID` in the inline `LINKS` config with Zuzana's real Google Business Profile place ID.
