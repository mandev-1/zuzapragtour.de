# Google AdSense

Publisher ID: **`ca-pub-4497386236985187`**

AdSense is wired into the site but shows **house-ad placeholders** until you create
the ad units in the AdSense dashboard and paste their slot IDs into the config.
Nothing looks broken before then.

## What's already in place

| Piece | File | Purpose |
|---|---|---|
| Loader script | `app/layout.tsx` | Loads `adsbygoogle.js` on every page (via `next/script`, `afterInteractive`). Required for verification + serving. |
| `ads.txt` | `public/ads.txt` | Authorized-sellers file at `/ads.txt` (required by AdSense). Contains `google.com, pub-4497386236985187, DIRECT, f08c47fec0942fa0`. |
| Config | `src/config/adsense.ts` | Publisher ID, `ADSENSE_ENABLED` master switch, and the `ADSENSE_SLOTS` map. |
| Ad unit component | `src/components/AdSlot.tsx` | Renders one `<ins class="adsbygoogle">` unit and calls `adsbygoogle.push({})` once. |
| Placements | `src/components/Blog.tsx` | Three journal slots (see below), each falling back to a house placeholder when its slot ID is empty. |

## Journal ad placements

All three live on `/blog` only (the conversion pages — tours, contact, booking —
carry no ads). They are ratio-reserved, so filling them causes no layout shift.

| Placement | Geometry | Config key | Where |
|---|---|---|---|
| Billboard | 970×250 | `journalBillboard` | Below the featured article |
| Native in-grid | 3:2 | `journalNative` | Article grid, cell 5 |
| Footer leaderboard | 728×90 | `journalFooter` | Between the journal CTA band and the site footer |

## To go live (what you need to do)

1. **Add the site in AdSense** and let it verify — the loader script + `ads.txt`
   (already deployed) are what it checks. `ads.txt` propagation can take a day or two.
2. **Create the ad units**: AdSense → *Ads → By ad unit → Display ads*. Create one
   per placement (Responsive is fine). Each gets a numeric **slot ID**.
3. **Paste the slot IDs** into `src/config/adsense.ts` → `ADSENSE_SLOTS`
   (`journalBillboard`, `journalNative`, `journalFooter`). Redeploy. Each placement
   automatically switches from the house placeholder to the real ad.

## Switches

- **Turn AdSense off entirely:** `ADSENSE_ENABLED = false` in `src/config/adsense.ts`
  (stops loading the script).
- **Turn the journal placements off:** `SHOW_ADS = false` at the top of
  `src/components/Blog.tsx` (removes the three slots; the grid closes up).

## Notes / cautions

- **Do NOT rely on Auto Ads** unless you want ads on *every* page (tours, kontakt,
  booking included). Auto Ads is a dashboard toggle that ignores these manual
  placements. This setup uses manual units to keep ads confined to the journal.
- The `<ins>` fills its ratio-reserved container; you may want to fine-tune each
  unit's format in the dashboard to best match 970×250 / 3:2 / 728×90.
- Consider whether display ads fit the premium, private-guide brand — they're
  confined to the editorial journal here, away from the booking funnel.
