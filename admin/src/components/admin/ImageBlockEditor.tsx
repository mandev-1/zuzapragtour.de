import React from 'react';
import type { Block, Lang } from '../../types/journal';
import { getL, setL } from '../../lib/journal';
import { mediaUrl } from '../../lib/api';

type ImageBlock = Extract<Block, { t: 'image' }>;

const ASPECTS: [string, string][] = [
  ['', 'Original'],
  ['3/2', '3:2'],
  ['16/9', '16:9'],
  ['4/3', '4:3'],
  ['1/1', '1:1'],
];

const CSS = `
.zib{display:flex;flex-direction:column;gap:.6rem}
.zib-empty{aspect-ratio:3/2;border-radius:var(--radius-lg);background:var(--stone-100);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.5rem;border:1px dashed var(--stone-300);color:var(--ink-mute)}
.zib-empty .material-symbols-outlined{font-size:30px;color:var(--stone-400)}
.zib-empty button{border:1px solid var(--rule);background:#fff;border-radius:var(--radius-md);padding:.4rem .8rem;font-family:var(--font-sans);font-size:12px;color:var(--ink-soft);cursor:pointer}
.zib-stage{position:relative;width:100%;border-radius:var(--radius-lg);overflow:hidden;background:var(--stone-100)}
.zib-stage.is-crop{cursor:crosshair}
.zib-stage img{display:block;width:100%}
.zib-stage.is-crop img{position:absolute;inset:0;height:100%;object-fit:cover}
.zib-focus{position:absolute;width:22px;height:22px;border-radius:999px;border:2px solid #fff;box-shadow:0 0 0 1.5px rgba(107,31,42,.9),0 1px 6px rgba(0,0,0,.4);transform:translate(-50%,-50%);pointer-events:none}
.zib-focus::after{content:"";position:absolute;inset:7px;border-radius:999px;background:var(--burgundy)}
.zib-tools{display:flex;align-items:center;justify-content:space-between;gap:.6rem;flex-wrap:wrap}
.zib-ars{display:inline-flex;background:var(--stone-100);border-radius:var(--radius-md);padding:3px;gap:2px}
.zib-ars button{border:0;background:transparent;border-radius:calc(var(--radius-md) - 2px);padding:.35rem .6rem;font-family:var(--font-sans);font-size:11px;font-weight:600;color:var(--ink-mute);cursor:pointer}
.zib-ars button.is-on{background:#fff;color:var(--burgundy);box-shadow:var(--shadow-xs)}
.zib-acts{display:inline-flex;align-items:center;gap:.6rem}
.zib-acts button{border:1px solid var(--rule);background:#fff;border-radius:var(--radius-md);padding:.4rem .75rem;font-family:var(--font-sans);font-size:12px;color:var(--ink-soft);cursor:pointer}
.zib-acts button:hover{border-color:var(--ink);color:var(--ink)}
.zib-hint{font-size:11px;color:var(--ink-mute)}
.zib-field{display:flex;flex-direction:column;gap:.2rem}
.zib-field label{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-mute)}
.zib-field input{border:1px solid var(--rule);border-radius:var(--radius-md);background:#fff;padding:.5rem .6rem;font-family:var(--font-sans);font-size:13px;color:var(--ink);outline:0}
.zib-field input:focus{border-color:var(--ink)}
.zib-cap input{font-family:var(--font-body);font-style:italic;color:var(--ink-soft)}
`;

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

export interface ImageBlockEditorProps {
  block: ImageBlock;
  lang: Lang;
  onChange: (patch: Partial<ImageBlock>) => void;
  onPick: () => void;
}

/**
 * ImageBlockEditor — image block with a non-destructive crop: pick an aspect
 * ratio and drag the focal point (stored as object-position), plus alt text and
 * caption. All of it (src, aspect, focus, alt, cap) lives on the block, so it
 * saves with the article and renders identically on the public site.
 */
export function ImageBlockEditor({ block: b, lang, onChange, onPick }: ImageBlockEditorProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);
  const focus = b.focus || { x: 50, y: 50 };
  const cropped = !!b.aspect;

  const setFocusFromEvent = (e: React.MouseEvent) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    onChange({ focus: { x: clamp(((e.clientX - r.left) / r.width) * 100), y: clamp(((e.clientY - r.top) / r.height) * 100) } });
  };

  if (!b.src) {
    return (
      <div className="zib">
        <style>{CSS}</style>
        <div className="zib-empty">
          <span className="material-symbols-outlined">add_photo_alternate</span>
          <button type="button" onClick={onPick}>Bild wählen</button>
        </div>
      </div>
    );
  }

  return (
    <div className="zib">
      <style>{CSS}</style>
      <div
        ref={stageRef}
        className={`zib-stage ${cropped ? 'is-crop' : ''}`}
        style={cropped ? { aspectRatio: b.aspect } : undefined}
        onMouseDown={cropped ? (e) => { dragging.current = true; setFocusFromEvent(e); } : undefined}
        onMouseMove={cropped ? (e) => { if (dragging.current) setFocusFromEvent(e); } : undefined}
        onMouseUp={() => { dragging.current = false; }}
        onMouseLeave={() => { dragging.current = false; }}
      >
        <img src={mediaUrl(b.src)} alt="" draggable={false} style={cropped ? { objectPosition: `${focus.x}% ${focus.y}%` } : undefined} />
        {cropped && <span className="zib-focus" style={{ left: `${focus.x}%`, top: `${focus.y}%` }} />}
      </div>

      <div className="zib-tools">
        <div className="zib-ars">
          {ASPECTS.map(([v, l]) => (
            <button key={v || 'orig'} type="button" className={(b.aspect || '') === v ? 'is-on' : ''} onClick={() => onChange({ aspect: v || undefined })}>
              {l}
            </button>
          ))}
        </div>
        <div className="zib-acts">
          {cropped && <span className="zib-hint">Ziehen zum Ausrichten</span>}
          <button type="button" onClick={onPick}>Ersetzen</button>
        </div>
      </div>

      <div className="zib-field">
        <label>Alt-Text · {lang.toUpperCase()} (Barrierefreiheit / SEO)</label>
        <input value={getL(b.alt, lang)} onChange={(e) => onChange({ alt: setL(b.alt, lang, e.target.value) })} placeholder="Was zeigt das Bild?" />
      </div>
      <div className="zib-field zib-cap">
        <label>Bildunterschrift · {lang.toUpperCase()}</label>
        <input value={getL(b.cap, lang)} onChange={(e) => onChange({ cap: setL(b.cap, lang, e.target.value) })} placeholder="Optionale Bildunterschrift…" />
      </div>
    </div>
  );
}

export default ImageBlockEditor;
