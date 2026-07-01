import React from 'react';
import { listImages, mediaUrl, type MediaItem } from '../../lib/api';
import type { JournalArticle } from '../../types/journal';
import { titlePlain } from '../../lib/journal';

const PUBLIC_ORIGIN = 'https://zuzapragtour.de';
const fmtSize = (b: number) => (b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB');

const STATUS_DOT: Record<string, string> = { published: '#3F6B4A', draft: 'var(--stone-500)', scheduled: 'var(--brass-deep)' };
const STATUS_LABEL: Record<string, string> = { published: 'Veröffentlicht', draft: 'Entwurf', scheduled: 'Geplant' };

interface Usage {
  article: JournalArticle;
  count: number;
  places: string[];
}

function usageOf(path: string, articles: JournalArticle[]): Usage[] {
  const out: Usage[] = [];
  for (const a of articles) {
    let count = 0;
    const places: string[] = [];
    if (a.hero === path) { count++; places.push('Titelbild'); }
    let inline = 0;
    for (const b of a.blocks || []) if ((b as any).t === 'image' && (b as any).src === path) inline++;
    if (inline) { count += inline; places.push(inline === 1 ? 'im Text' : `${inline}× im Text`); }
    if (count) out.push({ article: a, count, places });
  }
  return out;
}

const CSS = `
.zml{font-family:var(--font-sans);color:var(--ink);max-width:1180px;padding:1.4rem 0 4rem}
.zml *{box-sizing:border-box}
.zml-bar{display:flex;align-items:center;justify-content:space-between;gap:1rem;margin:0 0 1.2rem;flex-wrap:wrap}
.zml-search{display:inline-flex;align-items:center;gap:.5rem;background:#fff;border:1px solid var(--rule);border-radius:var(--radius-md);padding:.55rem .85rem;min-width:260px}
.zml-search .material-symbols-outlined{font-size:18px;color:var(--ink-mute)}
.zml-search input{border:0;outline:0;background:transparent;font-family:var(--font-sans);font-size:13px;color:var(--ink);width:100%}
.zml-count{font-size:12px;color:var(--ink-mute)}
.zml-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:1rem}
.zml-card{position:relative;border:1px solid var(--rule);border-radius:var(--radius-lg);overflow:hidden;background:#fff;box-shadow:var(--shadow-xs);transition:border-color var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out)}
.zml-card:hover{border-color:var(--brass);transform:translateY(-1px)}
.zml-thumb{position:relative;width:100%;aspect-ratio:3/2;background:var(--stone-200) center/cover;cursor:pointer}
.zml-badge{position:absolute;left:8px;bottom:8px;display:inline-flex;align-items:center;gap:.3rem;background:rgba(26,23,20,.78);color:var(--ivory);border-radius:var(--radius-pill);padding:.15rem .5rem;font-size:10px;font-weight:600;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}
.zml-badge .material-symbols-outlined{font-size:12px}
.zml-cap{display:flex;align-items:center;justify-content:space-between;gap:.5rem;padding:.55rem .7rem}
.zml-name{font-size:12px;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer}
.zml-size{font-size:10px;color:var(--ink-mute);flex-shrink:0}
.zml-actions{position:absolute;top:8px;right:8px;display:flex;gap:4px;opacity:0;transition:opacity var(--dur-fast) var(--ease-out)}
.zml-card:hover .zml-actions{opacity:1}
.zml-actions a,.zml-actions button{width:30px;height:30px;border:0;border-radius:var(--radius-md);background:rgba(26,23,20,.78);color:var(--ivory);display:flex;align-items:center;justify-content:center;cursor:pointer;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);text-decoration:none}
.zml-actions a:hover,.zml-actions button:hover{background:var(--burgundy)}
.zml-actions .material-symbols-outlined{font-size:16px}
.zml-state{padding:3rem;text-align:center;color:var(--ink-mute);font-size:13px;border:1px dashed var(--rule);border-radius:var(--radius-lg);background:#fff}
/* detail modal */
.zml-overlay{position:fixed;inset:0;background:rgba(26,23,20,.42);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center;z-index:70;padding:1.5rem}
.zml-modal{width:720px;max-width:100%;max-height:88vh;display:flex;flex-direction:column;background:#fff;border-radius:var(--radius-xl);box-shadow:var(--shadow-xl);overflow:hidden}
.zml-mh{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem 1.2rem;border-bottom:1px solid var(--rule)}
.zml-mh b{font-family:ui-monospace,monospace;font-size:13px;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.zml-iconbtn{width:32px;height:32px;border:0;background:transparent;border-radius:var(--radius-md);color:var(--ink-mute);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.zml-iconbtn:hover{background:var(--stone-100);color:var(--ink)}
.zml-mb{overflow:auto;display:grid;grid-template-columns:280px 1fr;gap:1.2rem;padding:1.2rem}
@media(max-width:640px){.zml-mb{grid-template-columns:1fr}}
.zml-preview{width:100%;aspect-ratio:3/2;border-radius:var(--radius-md);background:var(--stone-200) center/cover;border:1px solid var(--rule)}
.zml-side{min-width:0;display:flex;flex-direction:column;gap:.8rem}
.zml-metarow{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem 1rem;font-size:12px;color:var(--ink-mute)}
.zml-lnk{display:inline-flex;align-items:center;gap:.3rem;border:0;background:transparent;color:var(--burgundy);font-family:var(--font-sans);font-size:12px;font-weight:600;cursor:pointer;padding:0;text-decoration:none}
.zml-lnk:hover{text-decoration:underline}
.zml-lnk .material-symbols-outlined{font-size:15px}
.zml-usehead{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-mute);margin-top:.3rem}
.zml-empty{font-size:13px;color:var(--ink-mute);padding:.6rem 0}
.zml-uselist{display:flex;flex-direction:column;gap:.4rem;overflow:auto}
.zml-userow{display:flex;align-items:center;gap:.7rem;border:1px solid var(--rule);border-radius:var(--radius-md);background:#fff;padding:.55rem .7rem;cursor:pointer;text-align:left;transition:border-color var(--dur-fast) var(--ease-out),background var(--dur-fast) var(--ease-out)}
.zml-userow:hover{border-color:var(--burgundy);background:rgba(107,31,42,.03)}
.zml-dot{width:8px;height:8px;border-radius:999px;flex-shrink:0}
.zml-uinfo{flex:1;min-width:0}
.zml-uinfo b{display:block;font-family:var(--font-display);font-size:15px;font-weight:400;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.zml-uinfo small{display:block;font-size:11px;color:var(--ink-mute)}
.zml-ucount{font-size:11px;font-weight:600;color:var(--brass-deep);flex-shrink:0}
.zml-userow .go{font-size:17px;color:var(--ink-mute);flex-shrink:0}
`;

export interface MediaLibraryProps {
  onNotify?: (msg: string, err?: boolean) => void;
  /** All articles, for computing where each image is used. */
  articles?: JournalArticle[];
  /** Open an article in the editor by slug. */
  onOpenArticle?: (slug: string) => void;
}

/**
 * MediaLibrary — browse the public site's /images folder. Click an image to see
 * where it's used (which articles, hero vs. inline, with counts) and jump into
 * any of them. Hover actions copy the path or open the full image.
 */
export function MediaLibrary({ onNotify, articles = [], onOpenArticle }: MediaLibraryProps) {
  const [images, setImages] = React.useState<MediaItem[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [q, setQ] = React.useState('');
  const [sel, setSel] = React.useState<MediaItem | null>(null);

  React.useEffect(() => {
    let alive = true;
    listImages()
      .then((list) => { if (alive) setImages(list); })
      .catch((e) => { if (alive) setError(String(e.message || e)); });
    return () => { alive = false; };
  }, []);

  const copy = async (p: string) => {
    try {
      await navigator.clipboard.writeText(p);
      onNotify?.(`Pfad kopiert: ${p}`);
    } catch {
      onNotify?.(p);
    }
  };

  // Precompute usage counts per path (for the badge on each card).
  const useCount = React.useMemo(() => {
    const m: Record<string, number> = {};
    for (const a of articles) {
      if (a.hero) m[a.hero] = (m[a.hero] || 0) + 1;
      for (const b of a.blocks || []) if ((b as any).t === 'image' && (b as any).src) m[(b as any).src] = (m[(b as any).src] || 0) + 1;
    }
    return m;
  }, [articles]);

  const filtered = (images || []).filter((it) => !q || it.name.toLowerCase().includes(q.toLowerCase()));
  const usage = sel ? usageOf(sel.path, articles) : [];
  const total = usage.reduce((n, u) => n + u.count, 0);

  return (
    <div className="zml">
      <style>{CSS}</style>
      <div className="zml-bar">
        <div className="zml-search">
          <span className="material-symbols-outlined">search</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Bild suchen…" />
        </div>
        <div className="zml-count">{images ? `${filtered.length} von ${images.length} Bildern` : ''}</div>
      </div>

      {error && <div className="zml-state">Bilder konnten nicht geladen werden ({error}).<br />Prüfen Sie die GitHub-Konfiguration der Admin-Site.</div>}
      {!error && images === null && <div className="zml-state">Bilder werden geladen …</div>}
      {!error && images !== null && filtered.length === 0 && <div className="zml-state">Keine Bilder gefunden.</div>}

      {!error && filtered.length > 0 && (
        <div className="zml-grid">
          {filtered.map((it) => {
            const n = useCount[it.path] || 0;
            return (
              <div className="zml-card" key={it.path}>
                <div className="zml-actions">
                  <button type="button" title="Pfad kopieren" onClick={() => copy(it.path)}><span className="material-symbols-outlined">content_copy</span></button>
                  <a title="Öffnen" href={mediaUrl(it.path)} target="_blank" rel="noopener noreferrer"><span className="material-symbols-outlined">open_in_new</span></a>
                </div>
                <div className="zml-thumb" style={{ backgroundImage: `url(${mediaUrl(it.path)})` }} onClick={() => setSel(it)} title="Verwendung anzeigen">
                  {n > 0 && <span className="zml-badge"><span className="material-symbols-outlined">link</span>{n}×</span>}
                </div>
                <div className="zml-cap">
                  <span className="zml-name" title={it.name} onClick={() => setSel(it)}>{it.name}</span>
                  <span className="zml-size">{fmtSize(it.size)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {sel && (
        <div className="zml-overlay" onClick={() => setSel(null)}>
          <div className="zml-modal" onClick={(e) => e.stopPropagation()}>
            <div className="zml-mh">
              <b title={sel.path}>{sel.name}</b>
              <button type="button" className="zml-iconbtn" onClick={() => setSel(null)}><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="zml-mb">
              <div>
                <div className="zml-preview" style={{ backgroundImage: `url(${mediaUrl(sel.path)})` }} />
              </div>
              <div className="zml-side">
                <div className="zml-metarow">
                  <span>{fmtSize(sel.size)}</span>
                  <a className="zml-lnk" href={mediaUrl(sel.path)} target="_blank" rel="noopener noreferrer"><span className="material-symbols-outlined">open_in_new</span>Öffnen</a>
                  <button type="button" className="zml-lnk" onClick={() => copy(sel.path)}><span className="material-symbols-outlined">content_copy</span>Pfad kopieren</button>
                </div>
                <div className="zml-usehead">Verwendet: {total}× in {usage.length} Artikel{usage.length === 1 ? '' : 'n'}</div>
                {usage.length === 0 ? (
                  <div className="zml-empty">Noch nirgends verwendet.</div>
                ) : (
                  <div className="zml-uselist">
                    {usage.map((u) => (
                      <button
                        key={u.article.slug}
                        type="button"
                        className="zml-userow"
                        onClick={() => { if (onOpenArticle) onOpenArticle(u.article.slug); }}
                        title={STATUS_LABEL[u.article.status]}
                      >
                        <span className="zml-dot" style={{ background: STATUS_DOT[u.article.status] || 'var(--stone-500)' }} />
                        <span className="zml-uinfo">
                          <b>{titlePlain(u.article) || u.article.slug}</b>
                          <small>{u.places.join(' · ')}</small>
                        </span>
                        <span className="zml-ucount">{u.count}×</span>
                        <span className="material-symbols-outlined go">arrow_forward</span>
                      </button>
                    ))}
                  </div>
                )}
                {usage.length > 0 && (
                  <a className="zml-lnk" style={{ marginTop: 4 }} href={`${PUBLIC_ORIGIN}/blog/${usage[0].article.slugDe || usage[0].article.slug}`} target="_blank" rel="noopener noreferrer">
                    <span className="material-symbols-outlined">public</span>Erste Seite live ansehen
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MediaLibrary;
