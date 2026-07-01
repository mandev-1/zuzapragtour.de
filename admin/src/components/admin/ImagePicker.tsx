import React from 'react';
import { listImages, mediaUrl, type MediaItem } from '../../lib/api';

const CSS = `
.zip-overlay{position:fixed;inset:0;background:rgba(26,23,20,.42);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center;z-index:70;padding:1.5rem}
.zip{width:760px;max-width:100%;max-height:86vh;display:flex;flex-direction:column;background:#fff;border-radius:var(--radius-xl);box-shadow:var(--shadow-xl);overflow:hidden;font-family:var(--font-sans)}
.zip-h{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem 1.2rem;border-bottom:1px solid var(--rule)}
.zip-h b{font-family:var(--font-display);font-size:1.2rem;font-weight:400}
.zip-search{display:inline-flex;align-items:center;gap:.5rem;background:var(--stone-50);border:1px solid var(--rule);border-radius:var(--radius-md);padding:.45rem .7rem;min-width:200px}
.zip-search input{border:0;outline:0;background:transparent;font-family:var(--font-sans);font-size:13px;width:100%}
.zip-search .material-symbols-outlined{font-size:17px;color:var(--ink-mute)}
.zip-body{overflow:auto;padding:1.1rem;display:grid;grid-template-columns:repeat(4,1fr);gap:.7rem}
@media(max-width:620px){.zip-body{grid-template-columns:repeat(2,1fr)}}
.zip-cell{border:1px solid var(--rule);border-radius:var(--radius-md);overflow:hidden;cursor:pointer;background:var(--stone-100);transition:border-color var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out)}
.zip-cell:hover{border-color:var(--burgundy);transform:translateY(-1px)}
.zip-cell .thumb{width:100%;aspect-ratio:3/2;background:var(--stone-200) center/cover}
.zip-cell .name{font-size:10px;color:var(--ink-mute);padding:.35rem .45rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.zip-state{padding:2.4rem;text-align:center;color:var(--ink-mute);font-size:13px;grid-column:1/-1}
.zip-f{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.8rem 1.2rem;border-top:1px solid var(--rule);background:var(--stone-50)}
.zip-btn{border:1px solid var(--rule);background:#fff;border-radius:var(--radius-md);padding:.5rem .9rem;font-family:var(--font-sans);font-size:12px;color:var(--ink-soft);cursor:pointer}
.zip-btn:hover{border-color:var(--ink);color:var(--ink)}
.zip-iconbtn{width:32px;height:32px;border:0;background:transparent;border-radius:var(--radius-md);color:var(--ink-mute);cursor:pointer;display:flex;align-items:center;justify-content:center}
.zip-iconbtn:hover{background:var(--stone-100);color:var(--ink)}
`;

export interface ImagePickerProps {
  current?: string;
  onPick: (src: string) => void;
  onClose: () => void;
}

/** Modal grid of the public site's /images, with a manual-path fallback. */
export function ImagePicker({ current, onPick, onClose }: ImagePickerProps) {
  const [images, setImages] = React.useState<MediaItem[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [q, setQ] = React.useState('');

  React.useEffect(() => {
    let alive = true;
    listImages()
      .then((list) => { if (alive) setImages(list); })
      .catch((e) => { if (alive) setError(String(e.message || e)); });
    return () => { alive = false; };
  }, []);

  const manual = () => {
    const next = window.prompt('Bildpfad (z. B. /images/charles-bridge-statue.jpg)', current || '/images/');
    if (next) { onPick(next.trim()); onClose(); }
  };

  const filtered = (images || []).filter((it) => !q || it.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="zip-overlay" onClick={onClose}>
      <div className="zip" onClick={(e) => e.stopPropagation()}>
        <div className="zip-h">
          <b>Bild wählen</b>
          <div className="zip-search">
            <span className="material-symbols-outlined">search</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Dateiname…" />
          </div>
          <button type="button" className="zip-iconbtn" onClick={onClose}><span className="material-symbols-outlined">close</span></button>
        </div>
        <div className="zip-body">
          {error && <div className="zip-state">Bildliste nicht verfügbar ({error}).<br />Nutzen Sie „Pfad eingeben“.</div>}
          {!error && images === null && <div className="zip-state">Bilder werden geladen …</div>}
          {!error && images !== null && filtered.length === 0 && <div className="zip-state">Keine Bilder gefunden.</div>}
          {filtered.map((it) => (
            <button key={it.path} type="button" className="zip-cell" onClick={() => { onPick(it.path); onClose(); }}>
              <div className="thumb" style={{ backgroundImage: `url(${mediaUrl(it.path)})` }} />
              <div className="name">{it.name}</div>
            </button>
          ))}
        </div>
        <div className="zip-f">
          <span style={{ fontSize: 11, color: 'var(--ink-mute)' }}>{images ? `${images.length} Bilder` : ''}</span>
          <button type="button" className="zip-btn" onClick={manual}>Pfad manuell eingeben…</button>
        </div>
      </div>
    </div>
  );
}

export default ImagePicker;
