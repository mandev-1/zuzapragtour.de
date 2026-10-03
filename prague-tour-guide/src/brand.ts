/**
 * brand.ts — PER-BRANCH file.
 *
 * This is the ONLY file (besides Home.tsx, tailwind.config.js,
 * public/index.html, and package.json) that differs between
 * zuzapragtour.de and pragkenner.de.
 *
 * All shared code imports from here — never hardcode the domain,
 * brand name, or contact info elsewhere.
 */

export const BRAND = {
  /** Human-readable site name shown in titles and schema */
  siteName: 'Zuza Prague Tours',

  /** Root URL — no trailing slash */
  domain: 'https://zuzapragtour.de',

  /** Schema.org @id anchors */
  businessId: 'https://zuzapragtour.de/#business',
  guideId:    'https://zuzapragtour.de/#guide',

  /** Contact */
  personName:   'Ing. Zuzana Manová',
  phone:        '+420 721 231 933',
  phoneRaw:     '+420721231933',
  email:        'zuzanamanova@email.cz',

  /** Social / review platforms */
  tripadvisor:
    'https://www.tripadvisor.de/Attraction_Review-g274707-d10450040-Reviews-Zuza_Prague_Tours-Prague_Bohemia.html',
  /** TripAdvisor "write a review" deep link (used by the /bewerten funnel) */
  tripadvisorWriteReview:
    'https://www.tripadvisor.de/UserReview-g274707-d10450040-Zuza_Prague_Tours-Prague_Bohemia.html',
  /**
   * Google "write a review" deep link — opens the star/review dialog for
   * Zuzana's Google Business Profile directly (signed-out guests sign in
   * first, then land in the dialog).
   * Profile: "Zuza Prag Tours - Prag Exklusiv Touren & Private Stadtführungen",
   * kg id /g/11w4f9s10x, feature id 0x470b95d12da0ddcd:0xbb028007db6bfdb6.
   * The Place ID is that feature id protobuf+base64-encoded; check it with
   * https://www.google.com/maps/place/?q=place_id:ChIJzd2gLdGVC0cRtv1r2weAArs
   */
  googleReview: 'https://search.google.com/local/writereview?placeid=ChIJzd2gLdGVC0cRtv1r2weAArs',
  /** Public profile share link (shows the listing, not the review dialog). */
  googleProfile: 'https://share.google/o68FfevojsSVDpK47',
  tourhq:    'https://www.tourhq.com/guide/CZ56896/zuzana-manova',
  instagram: 'https://www.instagram.com/erlebnis_tour_prag/',

  /** Geo */
  city:    'Prague',
  country: 'CZ',
  lat:     50.0755,
  lng:     14.4378,

  /** Hero OG image (absolute URL) */
  ogImage: 'https://zuzapragtour.de/images/charles-bridge-hero-1600.jpg',
} as const;
