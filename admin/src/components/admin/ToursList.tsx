import React from 'react';
import { listTours, mediaUrl, type TourItem } from '../../lib/api';

const PUBLIC_ORIGIN = 'https://zuzapragtour.de';
const fmtDur = (min?: number) => (!min ? '' : min % 60 === 0 ? `${min / 60} h` : `${Math.floor(min / 60)} h ${min % 60} min`);
const plain = (s: string) => (s || '').replace(/<[^>]+>/g, '');

const CSS = `
.ztl{font-family:var(--font-sans);color:var(--ink);max-width:1180px;padding:1.4rem 0 4rem}
.ztl *{box-sizing:border-box}
.ztl-note{display:flex;align-items:center;gap:.6rem;background:rgba(168,134,84,.08);border:1px solid var(--rule-soft);border-left:3px solid var(--brass);border-radius:var(--radius-md);padding:.7rem 1rem;font-size:12.5px;color:var(--ink-soft);margin:0 0 1.3rem}
.ztl-note .material-symbols-outlined{font-size:18px;color:var(--brass-deep)}
.ztl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.1rem}
.ztl-card{border:1px solid var(--rule);border-radius:var(--radius-lg);overflow:hidden;background:#fff;box-shadow:var(--shadow-xs);display:flex;flex-direction:column}
.ztl-thumb{width:100%;aspect-ratio:16/9;background:var(--stone-200) center/cover}
.ztl-b{padding:.9rem 1rem 1.1rem;display:flex;flex-direction:column;gap:.5rem;flex:1}
.ztl-top{display:flex;align-items:center;justify-content:space-between;gap:.6rem}
.ztl-dur{display:inline-flex;align-items:center;gap:.3rem;font-size:11px;font-weight:600;color:var(--brass-deep)}
.ztl-dur .material-symbols-outlined{font-size:15px}
.ztl-lang{font-size:8px;letter-spacing:.1em;background:var(--stone-100);color:var(--ink-mute);border-radius:3px;padding:1px 5px}
.ztl-title{font-family:var(--font-display);font-size:1.25rem;font-weight:400;line-height:1.2;color:var(--ink);margin:0}
.ztl-title em{font-family:var(--font-italic);font-style:italic;color:var(--burgundy)}
.ztl-desc{font-size:12.5px;line-height:1.55;color:var(--ink-mute);margin:0;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.ztl-slugs{display:flex;flex-direction:column;gap:2px;margin-top:.2rem}
.ztl-slug{font-size:11px;color:var(--ink-mute);font-family:ui-monospace,monospace}
.ztl-links{display:flex;gap:.6rem;margin-top:.5rem}
.ztl-link{display:inline-flex;align-items:center;gap:.3rem;font-size:11px;font-weight:600;color:var(--burgundy);text-decoration:none}
.ztl-link:hover{text-decoration:underline}
.ztl-link .material-symbols-outlined{font-size:14px}
.ztl-state{padding:3rem;text-align:center;color:var(--ink-mute);font-size:13px;border:1px dashed var(--rule);border-radius:var(--radius-lg);background:#fff}
`;

/** ToursList — read-only overview of the tour pages (defined in code). */
export function ToursList() {
  const [tours, setTours] = React.useState<TourItem[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let alive = true;
    listTours()
      .then((list) => { if (alive) setTours(list); })
      .catch((e) => { if (alive) setError(String(e.message || e)); });
    return () => { alive = false; };
  }, []);

  return (
    <div className="ztl">
      <style>{CSS}</style>
      <div className="ztl-note">
        <span className="material-symbols-outlined">info</span>
        Touren werden derzeit im Code gepflegt (<code>src/data/tours.ts</code>) — diese Übersicht ist schreibgeschützt.
      </div>

      {error && <div className="ztl-state">Touren konnten nicht geladen werden ({error}).</div>}
      {!error && tours === null && <div className="ztl-state">Touren werden geladen …</div>}
      {!error && tours !== null && tours.length === 0 && <div className="ztl-state">Keine Touren gefunden.</div>}

      {!error && tours && tours.length > 0 && (
        <div className="ztl-grid">
          {tours.map((t) => (
            <div className="ztl-card" key={t.id}>
              <div className="ztl-thumb" style={{ backgroundImage: t.image ? `url(${mediaUrl(t.image)})` : 'none' }} />
              <div className="ztl-b">
                <div className="ztl-top">
                  <span className="ztl-dur"><span className="material-symbols-outlined">schedule</span>{t.duration?.de || fmtDur(t.durationMinutes)}</span>
                  <span className="ztl-lang">{t.title?.en ? 'DE · EN' : 'DE'}</span>
                </div>
                <h3 className="ztl-title" dangerouslySetInnerHTML={{ __html: t.title?.de || t.id }} />
                <p className="ztl-desc">{plain(t.description?.de || '')}</p>
                <div className="ztl-slugs">
                  {t.slugDe && <span className="ztl-slug">DE · /tours/{t.slugDe}</span>}
                  {t.slug && <span className="ztl-slug">EN · /tours/{t.slug}</span>}
                </div>
                <div className="ztl-links">
                  {t.slugDe && <a className="ztl-link" href={`${PUBLIC_ORIGIN}/tours/${t.slugDe}`} target="_blank" rel="noopener noreferrer"><span className="material-symbols-outlined">open_in_new</span>DE ansehen</a>}
                  {t.slug && <a className="ztl-link" href={`${PUBLIC_ORIGIN}/tours/${t.slug}`} target="_blank" rel="noopener noreferrer"><span className="material-symbols-outlined">open_in_new</span>EN ansehen</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ToursList;
