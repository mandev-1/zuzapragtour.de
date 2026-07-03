/**
 * Google AdSense configuration.
 *
 * The publisher ID is live. The per-placement slot IDs must be created in the
 * AdSense dashboard (Ads → By ad unit → Display ads) and pasted below — until a
 * slot ID is filled in, that journal placement shows a house-ad placeholder
 * instead of a real ad, so nothing looks broken pre-launch. See docs/adsense.md.
 */

/** AdSense publisher ID (data-ad-client / loader ?client=). */
export const ADSENSE_CLIENT = 'ca-pub-4497386236985187';

/** Master switch — set to false to stop loading AdSense entirely. */
export const ADSENSE_ENABLED = true;

/**
 * Placement → ad-unit slot ID (the numeric string AdSense gives each unit).
 * Empty string = unit not created yet → house placeholder is shown instead.
 */
export const ADSENSE_SLOTS: {
  journalBillboard: string;
  journalNative: string;
  journalFooter: string;
} = {
  journalBillboard: '', // 970×250, after the featured article
  journalNative: '', //    3:2, in the article grid (cell 5)
  journalFooter: '', //    728×90, footer leaderboard between the two dark bands
};
