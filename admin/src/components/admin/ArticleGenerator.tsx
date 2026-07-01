import React from 'react';
import { generateArticle } from '../../lib/api';
import type { JournalArticle } from '../../types/journal';

const CSS = `
.zag-overlay{position:fixed;inset:0;background:rgba(26,23,20,.42);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center;z-index:70;padding:1.5rem}
.zag{width:560px;max-width:100%;background:#fff;border-radius:var(--radius-xl);box-shadow:var(--shadow-xl);overflow:hidden;font-family:var(--font-sans)}
.zag-h{display:flex;align-items:center;justify-content:space-between;padding:1.1rem 1.3rem;border-bottom:1px solid var(--rule)}
.zag-h b{font-family:var(--font-display);font-size:1.35rem;font-weight:400}
.zag-h .material-symbols-outlined{color:var(--brass-deep)}
.zag-iconbtn{width:32px;height:32px;border:0;background:transparent;border-radius:var(--radius-md);color:var(--ink-mute);cursor:pointer;display:flex;align-items:center;justify-content:center}
.zag-iconbtn:hover{background:var(--stone-100);color:var(--ink)}
.zag-b{padding:1.2rem 1.3rem;display:flex;flex-direction:column;gap:1rem}
.zag-field label{display:block;font-size:11px;font-weight:600;letter-spacing:.04em;color:var(--ink-mute);margin-bottom:.35rem}
.zag-field textarea{width:100%;box-sizing:border-box;border:1px solid var(--rule);border-radius:var(--radius-md);background:#fff;padding:.7rem .8rem;font-family:var(--font-sans);font-size:14px;color:var(--ink);outline:0;resize:vertical;line-height:1.5}
.zag-field textarea:focus{border-color:var(--ink)}
.zag-row{display:flex;align-items:center;gap:.6rem}
.zag-row label{display:inline-flex;align-items:center;gap:.5rem;font-size:13px;color:var(--ink-soft);cursor:pointer}
.zag-row input{accent-color:var(--burgundy);width:16px;height:16px}
.zag-err{font-size:12.5px;color:var(--error);background:rgba(186,26,26,.07);border-radius:var(--radius-md);padding:.55rem .8rem}
.zag-note{font-size:11.5px;color:var(--ink-mute);line-height:1.5}
.zag-f{display:flex;align-items:center;justify-content:flex-end;gap:.6rem;padding:.9rem 1.3rem;border-top:1px solid var(--rule);background:var(--stone-50)}
.zag-btn{display:inline-flex;align-items:center;gap:.45rem;border-radius:var(--radius-md);padding:.6rem 1.1rem;font-family:var(--font-sans);font-size:13px;font-weight:600;cursor:pointer;border:1px solid transparent}
.zag-btn.ghost{background:#fff;border-color:var(--rule);color:var(--ink-soft)}
.zag-btn.ghost:hover{border-color:var(--ink);color:var(--ink)}
.zag-btn.primary{background:var(--burgundy);color:var(--ivory)}
.zag-btn.primary:hover{background:var(--burgundy-deep)}
.zag-btn.primary:disabled{opacity:.6;cursor:default}
.zag-btn .material-symbols-outlined{font-size:17px}
.zag-spin{width:15px;height:15px;border:2px solid rgba(245,239,228,.4);border-top-color:var(--ivory);border-radius:50%;animation:zag-rot .7s linear infinite}
@keyframes zag-rot{to{transform:rotate(360deg)}}
`;

/**
 * ArticleGenerator — draft an article from keywords/topic via the Anthropic API
 * (generate-article function). On success the draft opens in the editor.
 */
export function ArticleGenerator({ onClose, onCreated }: { onClose: () => void; onCreated: (a: JournalArticle) => void }) {
  const [topic, setTopic] = React.useState('');
  const [bilingual, setBilingual] = React.useState(true);
  const [notes, setNotes] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const run = async () => {
    if (!topic.trim() || busy) return;
    setBusy(true);
    setError(null);
    const res = await generateArticle({ topic: topic.trim(), bilingual, notes: notes.trim() || undefined });
    setBusy(false);
    if (res.ok && res.article) onCreated(res.article);
    else setError(res.error || 'Fehlgeschlagen.');
  };

  return (
    <div className="zag-overlay" onClick={busy ? undefined : onClose}>
      <div className="zag" onClick={(e) => e.stopPropagation()}>
        <style>{CSS}</style>
        <div className="zag-h">
          <b><span className="material-symbols-outlined" style={{ verticalAlign: '-4px', marginRight: 6 }}>auto_awesome</span>Aus Stichwörtern erstellen</b>
          <button type="button" className="zag-iconbtn" onClick={onClose} disabled={busy}><span className="material-symbols-outlined">close</span></button>
        </div>
        <div className="zag-b">
          <div className="zag-field">
            <label>Thema / Stichwörter</label>
            <textarea rows={2} autoFocus value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="z. B. Die schönsten Aussichtspunkte in Prag abseits der Touristen" />
          </div>
          <div className="zag-field">
            <label>Blickwinkel / Notizen (optional)</label>
            <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="z. B. Fokus auf Frühmorgens, persönliche Erlebnisse, konkrete Orte mit Öffnungszeiten" />
          </div>
          <div className="zag-row">
            <label><input type="checkbox" checked={bilingual} onChange={(e) => setBilingual(e.target.checked)} /> Zweisprachig (Deutsch + Englisch)</label>
          </div>
          {error && <div className="zag-err">{error}</div>}
          <div className="zag-note">Erzeugt einen <b>Entwurf</b> in Zuzanas Stimme, den Sie danach im Editor prüfen und veröffentlichen. Erfordert einen konfigurierten KI-Schlüssel (ANTHROPIC_API_KEY).</div>
        </div>
        <div className="zag-f">
          <button type="button" className="zag-btn ghost" onClick={onClose} disabled={busy}>Abbrechen</button>
          <button type="button" className="zag-btn primary" onClick={run} disabled={busy || !topic.trim()}>
            {busy ? <><span className="zag-spin" />Schreibt…</> : <><span className="material-symbols-outlined">auto_awesome</span>Entwurf erstellen</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArticleGenerator;
