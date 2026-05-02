/** Build-time brand variant (set in Netlify per site / branch). */
export type SiteBrand = 'zuza' | 'pragkenner';

export const SITE_BRAND: SiteBrand =
  process.env.NEXT_PUBLIC_SITE_BRAND === 'pragkenner' ? 'pragkenner' : 'zuza';

export const isPragkennerSite = SITE_BRAND === 'pragkenner';
