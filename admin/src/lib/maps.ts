/**
 * CARTO basemap tiles (Positron / `light_all`) for the MapBuilder preview.
 *
 * CARTO serves real tiles only with an API key; without one every tile reads
 * "API KEY REQUIRED". The key is public by nature (it travels in every tile
 * request), so restrict it to the site's domains in the CARTO dashboard rather
 * than trying to hide it. Keep in sync with prague-tour-guide/src/config/maps.ts.
 */
export const CARTO_KEY = 'cb1_4axs_1_c5b5e64beb6849756289600a';

/** Leaflet URL template; `{r}` becomes `@2x` on retina screens. */
export const CARTO_TILES = `https://basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png?key=${CARTO_KEY}`;

export const CARTO_ATTRIBUTION = '&copy; OpenStreetMap &copy; CARTO';
