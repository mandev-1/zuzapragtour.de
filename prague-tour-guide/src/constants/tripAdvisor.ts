/** Current TripAdvisor listing (Zuza Prague Tours). */
export const TRIPADVISOR_LISTING_URL =
  'https://www.tripadvisor.de/Attraction_Review-g274707-d10450040-Reviews-Zuza_Prague_Tours-Prague_Bohemia.html';

export const TRIPADVISOR_LOCATION_ID = '10450040';

/**
 * Must match the `uniq` query param — TripAdvisor injects into `#TA_selfserveprop{uniq}`.
 * If you regenerate code from the Widget Center, keep this in sync with their snippet.
 */
export const TRIPADVISOR_WIDGET_UNIQ = '501';

/**
 * Direct WidgetEmbed script (what the jscache `wejs` loader injects anyway).
 * Override with REACT_APP_TRIPADVISOR_WIDGET_SCRIPT = full script URL from Widget Center if needed.
 */
export function tripAdvisorWidgetEmbedSrc(lang: 'de' | 'en'): string {
  const fromEnv = process.env.REACT_APP_TRIPADVISOR_WIDGET_SCRIPT;
  if (fromEnv && fromEnv.length > 0) {
    return fromEnv;
  }
  const host = lang === 'de' ? 'https://www.tripadvisor.de' : 'https://www.tripadvisor.com';
  return `${host}/WidgetEmbed-selfserveprop?lang=${lang}&locationId=${TRIPADVISOR_LOCATION_ID}&display_version=2&uniq=${TRIPADVISOR_WIDGET_UNIQ}`;
}

/** DOM id TripAdvisor’s script looks up: `TA_selfserveprop` + uniq */
export function tripAdvisorContainerId(): string {
  return `TA_selfserveprop${TRIPADVISOR_WIDGET_UNIQ}`;
}
