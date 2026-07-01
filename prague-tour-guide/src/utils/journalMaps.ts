// ============================================================================
// journalMaps.ts — client-side hydration of journal map blocks.
//
// renderBlocks emits `<div class="jmap-wrap" data-jmap="<json>"><div class="jmap">`
// placeholders. After a journal article mounts, mountJournalMaps() turns each
// into a real Leaflet map (CARTO Positron tiles, numbered burgundy markers,
// optional dashed walking route) — matching the admin MapBuilder and the 0004
// reference. Leaflet is loaded once from CDN, so the static site keeps no npm
// dependency. `mode: 'embed'` renders a supplied iframe instead.
// ============================================================================

interface JMapPoint {
  coord: [number, number];
  label?: string;
  note?: string;
}
interface JMapSpec {
  mode?: 'illustrated' | 'embed';
  route?: boolean;
  embedUrl?: string;
  points: JMapPoint[];
}

let leafletPromise: Promise<any> | null = null;

function loadLeaflet(): Promise<any> {
  const w = window as any;
  if (typeof window !== 'undefined' && w.L) return Promise.resolve(w.L);
  if (leafletPromise) return leafletPromise;
  leafletPromise = new Promise((resolve, reject) => {
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
    let s = document.getElementById('leaflet-js') as HTMLScriptElement | null;
    if (s && w.L) {
      resolve(w.L);
      return;
    }
    if (!s) {
      s = document.createElement('script');
      s.id = 'leaflet-js';
      s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      document.head.appendChild(s);
    }
    s.addEventListener('load', () => resolve(w.L));
    s.addEventListener('error', reject);
  });
  return leafletPromise;
}

const esc = (s: any) =>
  String(s == null ? '' : s).replace(/[&<>"]/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' } as Record<string, string>)[c]
  );

function initMap(node: HTMLElement, spec: JMapSpec) {
  const L = (window as any).L;
  if (!L) return;
  const map = L.map(node, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map);

  const pts = spec.points || [];
  const latlngs: [number, number][] = [];
  pts.forEach((p, i) => {
    if (!p.coord) return;
    const icon = L.divIcon({
      className: 'jmark-wrap',
      html: '<span class="jmark">' + (i + 1) + '</span>',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15],
    });
    L.marker(p.coord, { icon })
      .addTo(map)
      .bindPopup(
        '<span class="pop-t">' + (i + 1) + '. ' + esc(p.label) + '</span>' +
          (p.note ? '<span class="pop-n">' + esc(p.note) + '</span>' : '')
      );
    latlngs.push(p.coord);
  });

  if (spec.route && latlngs.length > 1) {
    L.polyline(latlngs, { color: '#6B1F2A', weight: 3, opacity: 0.85, dashArray: '1 9', lineCap: 'round' }).addTo(map);
  }
  if (latlngs.length > 1) map.fitBounds(latlngs, { padding: [45, 45], maxZoom: 16 });
  else if (latlngs.length === 1) map.setView(latlngs[0], 14);
  setTimeout(() => map.invalidateSize(), 60);
}

/** Hydrate every `.jmap-wrap[data-jmap]` inside `root` into a live map. */
export function mountJournalMaps(root: HTMLElement | null) {
  if (!root || typeof window === 'undefined') return;
  const wraps = Array.from(root.querySelectorAll<HTMLElement>('.jmap-wrap[data-jmap]'));
  if (!wraps.length) return;

  wraps.forEach((wrap) => {
    if (wrap.dataset.jmapInit === '1') return;
    const node = wrap.querySelector<HTMLElement>('.jmap');
    if (!node) return;

    let spec: JMapSpec;
    try {
      spec = JSON.parse(wrap.dataset.jmap || '{}');
    } catch {
      return;
    }
    wrap.dataset.jmapInit = '1';

    if (spec.mode === 'embed') {
      if (spec.embedUrl) {
        const f = document.createElement('iframe');
        f.className = 'jmap-iframe';
        f.src = spec.embedUrl;
        f.title = 'Karte';
        f.loading = 'lazy';
        node.appendChild(f);
      }
      return;
    }

    loadLeaflet()
      .then(() => initMap(node, spec))
      .catch(() => {
        // CDN blocked / offline — leave the stop list (already rendered) as the fallback.
      });
  });
}
