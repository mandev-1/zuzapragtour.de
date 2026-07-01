import React from 'react';
import type { Block, Lang } from '../../types/journal';
import { getL, setL } from '../../lib/journal';

type MapBlock = Extract<Block, { t: 'map' }>;

/* Load Leaflet (CSS + JS) from CDN once, shared across every map instance. */
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
    if (s && w.L) { resolve(w.L); return; }
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
  String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' } as Record<string, string>)[c]);

const CSS = `
.zpt-map-builder{font-family:var(--font-sans);color:var(--ink)}
.zpt-map-builder *{box-sizing:border-box}
.zmb-grid{display:grid;gap:1.1rem}
.zmb-grid.is-edit{grid-template-columns:1.2fr .8fr}
.zmb-stage{position:relative;isolation:isolate;border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--rule);background:var(--ivory-deep)}
.zmb-loading{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:.5rem;color:var(--ink-mute);font-size:12px;z-index:1;pointer-events:none}
.zmb-cap{margin:.7rem 0 0;font-family:var(--font-body);font-style:italic;font-size:12.5px;color:var(--ink-mute);line-height:1.5;padding-left:.9rem;border-left:1px solid var(--brass)}
.zpt-map-builder .leaflet-container{font-family:var(--font-sans);background:var(--ivory-deep)}
.zpt-map-builder .jmark{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:var(--burgundy);color:var(--ivory);font-family:var(--font-display);font-size:14px;box-shadow:0 2px 8px rgba(107,31,42,.5);border:2px solid var(--paper)}
.zpt-map-builder .leaflet-popup-content-wrapper{background:var(--paper);color:var(--ink);border-radius:3px;box-shadow:var(--shadow-lg)}
.zpt-map-builder .leaflet-popup-content{margin:.7rem .9rem}
.zpt-map-builder .pop-t{font-family:var(--font-display);font-size:1.05rem;color:var(--ink);display:block}
.zpt-map-builder .pop-n{font-family:var(--font-body);font-size:.82rem;color:var(--ink-mute);margin-top:.2rem;display:block;line-height:1.45}
.zpt-map-builder .leaflet-popup-tip{background:var(--paper)}
.zpt-map-builder .leaflet-bar a{color:var(--ink);background:var(--paper)}
.zpt-map-builder .leaflet-bar a:hover{background:var(--ivory-deep)}
.zmb-embed{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.7rem;text-align:center;padding:1.5rem;background:repeating-linear-gradient(45deg,var(--paper),var(--paper) 12px,var(--paper-warm) 12px,var(--paper-warm) 24px)}
.zmb-embed .material-symbols-outlined{font-size:40px;color:var(--brass)}
.zmb-embed p{margin:0;font-size:12px;color:var(--ink-mute);max-width:32ch}
.zmb-iframe{width:100%;height:100%;border:0;display:block}
.zmb-ctrl{display:flex;flex-direction:column;gap:.85rem;min-width:0}
.zmb-seg{display:inline-flex;background:var(--stone-100);border-radius:var(--radius-md);padding:3px;align-self:flex-start}
.zmb-seg button{border:0;background:transparent;border-radius:calc(var(--radius-md) - 2px);padding:.4rem .8rem;font-family:var(--font-sans);font-size:12px;font-weight:500;color:var(--ink-mute);cursor:pointer}
.zmb-seg button.is-on{background:#fff;color:var(--ink);box-shadow:var(--shadow-xs)}
.zmb-toggles{display:flex;gap:1.2rem}
.zmb-tog{display:inline-flex;align-items:center;gap:.5rem;font-size:12px;color:var(--ink-soft);cursor:pointer}
.zmb-tog input{accent-color:var(--burgundy);width:15px;height:15px}
.zmb-lbl{font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-mute)}
.zmb-stops{display:flex;flex-direction:column;gap:.55rem;max-height:240px;overflow:auto;padding-right:2px}
.zmb-stop{display:flex;gap:.6rem;align-items:flex-start;background:#fff;border:1px solid var(--rule);border-radius:var(--radius-md);padding:.6rem}
.zmb-stop.is-on{border-color:var(--burgundy);box-shadow:0 0 0 2px rgba(107,31,42,.12)}
.zmb-num{width:22px;height:22px;border-radius:999px;background:var(--burgundy);color:var(--ivory);font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
.zmb-fields{flex:1;min-width:0;display:flex;flex-direction:column;gap:.35rem}
.zmb-fields input,.zmb-fields textarea{width:100%;border:0;border-bottom:1px solid transparent;font-family:var(--font-sans);font-size:13px;color:var(--ink);background:transparent;padding:1px 0;outline:0;resize:none}
.zmb-fields input{font-weight:600}
.zmb-fields textarea{font-size:11.5px;color:var(--ink-mute);line-height:1.45}
.zmb-fields input:focus,.zmb-fields textarea:focus{border-bottom-color:var(--rule)}
.zmb-coord{font-size:10px;color:var(--stone-400);font-family:ui-monospace,monospace}
.zmb-x{border:0;background:transparent;color:var(--stone-400);cursor:pointer;padding:2px;border-radius:var(--radius-sm)}
.zmb-x:hover{color:var(--error);background:rgba(186,26,26,.08)}
.zmb-x .material-symbols-outlined{font-size:17px}
.zmb-add{display:inline-flex;align-items:center;justify-content:center;gap:.4rem;border:1px dashed var(--brass);background:rgba(168,134,84,.06);color:var(--brass-deep);border-radius:var(--radius-md);padding:.6rem;font-family:var(--font-sans);font-size:12px;font-weight:500;cursor:pointer;transition:background var(--dur-fast) var(--ease-out)}
.zmb-add:hover{background:rgba(168,134,84,.14)}
.zmb-add .material-symbols-outlined{font-size:17px}
.zmb-hint{font-size:11px;color:var(--ink-mute);line-height:1.5}
.zmb-capin{width:100%;border:1px solid var(--rule);border-radius:var(--radius-md);background:#fff;font-family:var(--font-body);font-style:italic;font-size:12.5px;color:var(--ink-soft);padding:.5rem .65rem;outline:0;resize:vertical}
.zmb-capin:focus{border-color:var(--ink)}
.zmb-list{margin-top:.9rem;display:grid;grid-template-columns:1fr 1fr;gap:.5rem 1.5rem}
.zmb-li{display:flex;gap:.6rem;align-items:baseline;font-size:12px;color:var(--ink-mute)}
.zmb-li b{font-family:var(--font-italic);font-style:italic;color:var(--burgundy);font-size:15px}
.zmb-li span b{font-family:var(--font-sans);font-style:normal;color:var(--ink);font-weight:600;font-size:12px}
@media(max-width:760px){.zmb-grid.is-edit{grid-template-columns:1fr}.zmb-list{grid-template-columns:1fr}}
`;

interface StagePoint { coord: [number, number]; label: string; note: string }
interface StageData { mode?: string; route?: boolean; points: StagePoint[]; embedUrl?: string }

function MapStage({ data, height }: { data: StageData; height: number }) {
  const elRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<any>(null);
  const layerRef = React.useRef<any>(null);
  const dataRef = React.useRef(data);
  dataRef.current = data;
  const mapKey = JSON.stringify({ p: data.points, r: !!data.route, m: data.mode });
  const [ready, setReady] = React.useState(typeof window !== 'undefined' && !!(window as any).L);

  React.useEffect(() => {
    let alive = true;
    loadLeaflet().then(() => { if (alive) setReady(true); }).catch(() => {});
    return () => { alive = false; };
  }, []);

  const drawNow = () => {
    const L = (window as any).L;
    const map = mapRef.current;
    const lg = layerRef.current;
    const d = dataRef.current;
    if (!L || !map || !lg) return;
    lg.clearLayers();
    const pts = d.points || [];
    const latlngs: [number, number][] = [];
    pts.forEach((p, i) => {
      if (!p.coord) return;
      const icon = L.divIcon({ className: 'jmark-wrap', html: '<span class="jmark">' + (i + 1) + '</span>', iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -15] });
      L.marker(p.coord, { icon })
        .addTo(lg)
        .bindPopup('<span class="pop-t">' + (i + 1) + '. ' + esc(p.label) + '</span>' + (p.note ? '<span class="pop-n">' + esc(p.note) + '</span>' : ''));
      latlngs.push(p.coord);
    });
    if (d.route && latlngs.length > 1) {
      L.polyline(latlngs, { color: '#6B1F2A', weight: 3, opacity: 0.85, dashArray: '1 9', lineCap: 'round' }).addTo(lg);
    }
    if (latlngs.length > 1) map.fitBounds(latlngs, { padding: [45, 45], maxZoom: 16 });
    else if (latlngs.length === 1) map.setView(latlngs[0], 14);
  };

  React.useEffect(() => {
    if (data.mode === 'embed') {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
      return undefined;
    }
    if (!ready || !elRef.current || mapRef.current) return undefined;
    const L = (window as any).L;
    const map = L.map(elRef.current, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; OpenStreetMap &copy; CARTO', subdomains: 'abcd', maxZoom: 19 }).addTo(map);
    mapRef.current = map;
    layerRef.current = L.layerGroup().addTo(map);
    drawNow();
    setTimeout(() => { if (mapRef.current) mapRef.current.invalidateSize(); }, 80);
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, data.mode]);

  React.useEffect(() => () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { if (mapRef.current) drawNow(); }, [mapKey]);

  if (data.mode === 'embed') {
    return (
      <div className="zmb-stage" style={{ height }}>
        {data.embedUrl ? (
          <iframe className="zmb-iframe" src={data.embedUrl} title="Karte" loading="lazy"></iframe>
        ) : (
          <div className="zmb-embed">
            <span className="material-symbols-outlined">map</span>
            <p>Eingebettete Karte — fügen Sie eine Einbettungs-URL hinzu (Google Maps oder Mapy.cz).</p>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="zmb-stage" style={{ height }}>
      {!ready && <div className="zmb-loading"><span className="material-symbols-outlined">map</span>Karte wird geladen …</div>}
      <div ref={elRef} style={{ position: 'absolute', inset: 0 }}></div>
    </div>
  );
}

export interface MapBuilderProps {
  data: MapBlock;
  lang: Lang;
  editable?: boolean;
  onChange?: (next: MapBlock) => void;
  height?: number;
}

/**
 * MapBuilder — the journal map block on real Leaflet (CARTO Positron), exactly
 * as the published article: numbered burgundy markers, on-brand popups and an
 * optional dashed route. `editable` adds the stop list, route/list toggles,
 * caption and an embed mode. Point labels, notes and the caption are edited in
 * the active language (`lang`); coordinates are shared across languages.
 */
export function MapBuilder({ data, lang, editable = false, onChange, height }: MapBuilderProps) {
  const [active, setActive] = React.useState<number | null>(null);
  const data0 = (data || {}) as Partial<MapBlock>;
  const d: MapBlock = { mode: 'illustrated', route: true, list: true, caption: '', embedUrl: '', ...data0, points: data0.points || [] } as MapBlock;
  const patch = (next: Partial<MapBlock>) => onChange && onChange({ ...d, ...next } as MapBlock);
  const setPointField = (i: number, key: 'label' | 'note', val: string) =>
    patch({ points: d.points.map((p, j) => (j === i ? { ...p, [key]: setL(p[key], lang, val) } : p)) });
  const addStop = () => {
    const base = d.points[d.points.length - 1];
    const coord: [number, number] = base
      ? [+(base.coord[0] + 0.0016).toFixed(4), +(base.coord[1] + 0.0022).toFixed(4)]
      : [50.0875, 14.4213];
    patch({ points: [...d.points, { coord, label: { de: 'Neuer Ort' }, note: { de: '' } }] });
  };
  const removeStop = (i: number) => patch({ points: d.points.filter((_, j) => j !== i) });
  const stageH = height || (editable ? 360 : 300);

  const stageData: StageData = {
    mode: d.mode,
    route: d.route,
    embedUrl: d.embedUrl,
    points: d.points.map((p) => ({ coord: p.coord, label: getL(p.label, lang), note: getL(p.note, lang) })),
  };
  const capText = getL(d.caption, lang);

  return (
    <div className="zpt-map-builder">
      <style>{CSS}</style>
      <div className={`zmb-grid ${editable ? 'is-edit' : ''}`}>
        <div>
          <MapStage data={stageData} height={stageH} />
          {capText && !editable && <p className="zmb-cap">{capText}</p>}
        </div>

        {editable && (
          <div className="zmb-ctrl">
            <div className="zmb-seg">
              <button type="button" className={d.mode !== 'embed' ? 'is-on' : ''} onClick={() => patch({ mode: 'illustrated' })}>Interaktive Karte</button>
              <button type="button" className={d.mode === 'embed' ? 'is-on' : ''} onClick={() => patch({ mode: 'embed' })}>Einbettung</button>
            </div>

            {d.mode !== 'embed' ? (
              <>
                <div className="zmb-toggles">
                  <label className="zmb-tog"><input type="checkbox" checked={!!d.route} onChange={(e) => patch({ route: e.target.checked })} />Route</label>
                  <label className="zmb-tog"><input type="checkbox" checked={!!d.list} onChange={(e) => patch({ list: e.target.checked })} />Liste anzeigen</label>
                </div>
                <div>
                  <div className="zmb-lbl" style={{ marginBottom: 6 }}>Stationen · {d.points.length} · {lang.toUpperCase()}</div>
                  <div className="zmb-stops">
                    {d.points.map((p, i) => (
                      <div key={i} className={`zmb-stop ${active === i ? 'is-on' : ''}`} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
                        <div className="zmb-num">{i + 1}</div>
                        <div className="zmb-fields">
                          <input value={getL(p.label, lang)} onChange={(e) => setPointField(i, 'label', e.target.value)} placeholder="Bezeichnung" />
                          <textarea rows={2} value={getL(p.note, lang)} onChange={(e) => setPointField(i, 'note', e.target.value)} placeholder="Notiz für Besucher…"></textarea>
                          <span className="zmb-coord">{p.coord ? p.coord[0] + ', ' + p.coord[1] : ''}</span>
                        </div>
                        <button type="button" className="zmb-x" title="Entfernen" onClick={() => removeStop(i)}><span className="material-symbols-outlined">close</span></button>
                      </div>
                    ))}
                  </div>
                  <button type="button" className="zmb-add" style={{ marginTop: 8, width: '100%' }} onClick={addStop}>
                    <span className="material-symbols-outlined">add_location_alt</span>Station hinzufügen
                  </button>
                  <p className="zmb-hint" style={{ marginTop: 6 }}>Koordinaten stammen aus der Station davor — feinjustieren Sie [lat, lng] später.</p>
                </div>
                <div>
                  <div className="zmb-lbl" style={{ marginBottom: 6 }}>Bildunterschrift · {lang.toUpperCase()}</div>
                  <textarea className="zmb-capin" rows={2} value={capText} onChange={(e) => patch({ caption: setL(d.caption, lang, e.target.value) })} placeholder="Kurze Beschreibung der Karte…"></textarea>
                </div>
              </>
            ) : (
              <div>
                <div className="zmb-lbl" style={{ marginBottom: 6 }}>Einbettungs-URL</div>
                <textarea className="zmb-capin" rows={3} value={d.embedUrl || ''} onChange={(e) => patch({ embedUrl: e.target.value })} placeholder="https://www.google.com/maps/embed?… oder Mapy.cz Einbettungslink"></textarea>
                <p className="zmb-hint" style={{ marginTop: 8 }}>Fügen Sie einen Einbettungslink von Google Maps oder Mapy.cz ein.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {!editable && d.mode !== 'embed' && d.list && d.points.length > 0 && (
        <div className="zmb-list">
          {d.points.map((p, i) => (
            <div key={i} className="zmb-li">
              <b>{i + 1}</b>
              <span><b>{getL(p.label, lang)}</b>{getL(p.note, lang) ? ' — ' + getL(p.note, lang) : ''}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MapBuilder;
