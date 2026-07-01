import React from 'react';
import type { JournalArticle } from '../../types/journal';
import { titlePlain } from '../../lib/journal';

const slugify = (s: string) =>
  s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const CSS = `
.zdup-overlay{position:fixed;inset:0;background:rgba(26,23,20,.42);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center;z-index:72;padding:1.5rem}
.zdup{width:500px;max-width:100%;background:#fff;border-radius:var(--radius-xl);box-shadow:var(--shadow-xl);overflow:hidden;font-family:var(--font-sans)}
.zdup-h{display:flex;align-items:center;justify-content:space-between;padding:1.1rem 1.3rem;border-bottom:1px solid var(--rule)}
.zdup-h b{font-family:var(--font-display);font-size:1.3rem;font-weight:400}
.zdup-iconbtn{width:32px;height:32px;border:0;background:transparent;border-radius:var(--radius-md);color:var(--ink-mute);cursor:pointer;display:flex;align-items:center;justify-content:center}
.zdup-iconbtn:hover{background:var(--stone-100);color:var(--ink)}
.zdup-b{padding:1.1rem 1.3rem;display:flex;flex-direction:column;gap:.9rem}
.zdup-src{font-size:13px;color:var(--ink-soft);line-height:1.5}
.zdup-src b{color:var(--ink)}
.zdup-field label{display:block;font-size:11px;font-weight:600;letter-spacing:.04em;color:var(--ink-mute);margin-bottom:.3rem}
.zdup-field input{width:100%;box-sizing:border-box;border:1px solid var(--rule);border-radius:var(--radius-md);background:#fff;padding:.6rem .75rem;font-family:var(--font-sans);font-size:14px;color:var(--ink);outline:0}
.zdup-field input:focus{border-color:var(--ink)}
.zdup-slug{display:flex;align-items:center;border:1px solid var(--rule);border-radius:var(--radius-md);background:#fff;padding:0 .3rem 0 .7rem}
.zdup-slug:focus-within{border-color:var(--ink)}
.zdup-slug .pre{font-size:13px;color:var(--stone-400);white-space:nowrap}
.zdup-slug input{border:0}
.zdup-err{font-size:12px;color:var(--error)}
.zdup-f{display:flex;align-items:center;justify-content:flex-end;gap:.6rem;padding:.9rem 1.3rem;border-top:1px solid var(--rule);background:var(--stone-50)}
.zdup-btn{display:inline-flex;align-items:center;gap:.4rem;border-radius:var(--radius-md);padding:.55rem 1.1rem;font-family:var(--font-sans);font-size:13px;font-weight:600;cursor:pointer;border:1px solid transparent}
.zdup-btn.ghost{background:#fff;border-color:var(--rule);color:var(--ink-soft)}
.zdup-btn.ghost:hover{border-color:var(--ink);color:var(--ink)}
.zdup-btn.primary{background:var(--burgundy);color:var(--ivory)}
.zdup-btn.primary:hover{background:var(--burgundy-deep)}
.zdup-btn.primary:disabled{opacity:.55;cursor:default}
.zdup-btn .material-symbols-outlined{font-size:16px}
`;

export interface DuplicateDialogProps {
  source: JournalArticle;
  taken: (slug: string) => boolean;
  onClose: () => void;
  onConfirm: (title: string, slug: string) => void;
}

/** Confirm + name a duplicate before creating it. */
export function DuplicateDialog({ source, taken, onClose, onConfirm }: DuplicateDialogProps) {
  const srcTitle = titlePlain(source) || source.slug;
  const [title, setTitle] = React.useState(`${srcTitle} (Kopie)`);
  const [slug, setSlug] = React.useState(`${slugify(source.slug)}-kopie`);
  const [slugTouched, setSlugTouched] = React.useState(false);

  const onTitle = (v: string) => {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
  };

  const cleanSlug = slugify(slug);
  const err =
    !title.trim() ? 'Titel fehlt.' :
    !cleanSlug ? 'Slug fehlt.' :
    taken(cleanSlug) ? 'Dieser Slug ist bereits vergeben.' :
    '';

  const submit = () => { if (!err) onConfirm(title.trim(), cleanSlug); };

  return (
    <div className="zdup-overlay" onClick={onClose}>
      <div className="zdup" onClick={(e) => e.stopPropagation()}>
        <style>{CSS}</style>
        <div className="zdup-h">
          <b>Artikel duplizieren</b>
          <button type="button" className="zdup-iconbtn" onClick={onClose}><span className="material-symbols-outlined">close</span></button>
        </div>
        <div className="zdup-b">
          <div className="zdup-src">Eine Kopie von <b>„{srcTitle}"</b> erstellen. Das Original bleibt unverändert; die Kopie wird als <b>Entwurf</b> angelegt.</div>
          <div className="zdup-field">
            <label>Titel des neuen Artikels</label>
            <input autoFocus value={title} onChange={(e) => onTitle(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') submit(); }} />
          </div>
          <div className="zdup-field">
            <label>Slug (URL)</label>
            <div className="zdup-slug">
              <span className="pre">/blog/</span>
              <input value={slug} onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }} onKeyDown={(e) => { if (e.key === 'Enter') submit(); }} />
            </div>
          </div>
          {err && <div className="zdup-err">{err}</div>}
        </div>
        <div className="zdup-f">
          <button type="button" className="zdup-btn ghost" onClick={onClose}>Abbrechen</button>
          <button type="button" className="zdup-btn primary" onClick={submit} disabled={!!err}><span className="material-symbols-outlined">content_copy</span>Duplizieren</button>
        </div>
      </div>
    </div>
  );
}

export default DuplicateDialog;
