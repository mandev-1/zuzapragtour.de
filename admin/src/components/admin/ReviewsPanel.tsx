import React from 'react';
import { getReviewInfo, type ReviewInfo } from '../../lib/api';

const stars = (n?: number) => (n ? '★★★★★☆☆☆☆☆'.slice(5 - Math.round(n), 10 - Math.round(n)) : '');

const CSS = `
.zrv{font-family:var(--font-sans);color:var(--ink);max-width:1000px;padding:1.4rem 0 4rem;display:flex;flex-direction:column;gap:1.8rem}
.zrv *{box-sizing:border-box}
.zrv-sec h3{font-family:var(--font-display);font-size:1.3rem;font-weight:400;margin:0 0 .2rem;color:var(--ink)}
.zrv-sec p.sub{font-size:12.5px;color:var(--ink-mute);margin:0 0 1rem}
.zrv-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1rem}
.zrv-card{border:1px solid var(--rule);border-radius:var(--radius-lg);background:#fff;box-shadow:var(--shadow-xs);padding:1.1rem 1.2rem;display:flex;flex-direction:column;gap:.6rem}
.zrv-ph{display:flex;align-items:center;justify-content:space-between;gap:.5rem}
.zrv-ph b{font-family:var(--font-display);font-size:1.15rem;font-weight:400}
.zrv-rating{display:flex;align-items:baseline;gap:.5rem}
.zrv-rating .n{font-family:var(--font-display);font-size:1.8rem;color:var(--ink)}
.zrv-rating .s{color:var(--brass);font-size:15px;letter-spacing:1px}
.zrv-rating .t{font-size:12px;color:var(--ink-mute)}
.zrv-note{font-size:12px;color:var(--ink-mute);line-height:1.5;background:rgba(168,134,84,.07);border-radius:var(--radius-md);padding:.55rem .7rem}
.zrv-links{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.2rem}
.zrv-btn{display:inline-flex;align-items:center;gap:.35rem;border:1px solid var(--rule);background:#fff;border-radius:var(--radius-md);padding:.45rem .75rem;font-family:var(--font-sans);font-size:12px;font-weight:600;color:var(--ink-soft);text-decoration:none;cursor:pointer}
.zrv-btn:hover{border-color:var(--burgundy);color:var(--burgundy)}
.zrv-btn.primary{background:var(--burgundy);color:var(--ivory);border-color:var(--burgundy)}
.zrv-btn.primary:hover{background:var(--burgundy-deep);color:var(--ivory)}
.zrv-btn .material-symbols-outlined{font-size:15px}
.zrv-asks{display:flex;flex-direction:column;gap:.5rem}
.zrv-ask{display:flex;align-items:center;gap:.8rem;border:1px solid var(--rule);border-radius:var(--radius-md);background:#fff;padding:.6rem .85rem}
.zrv-ask .material-symbols-outlined{color:var(--brass-deep);font-size:19px}
.zrv-ask .w{flex:1;min-width:0}
.zrv-ask b{display:block;font-size:13px;font-weight:600;color:var(--ink)}
.zrv-ask small{display:block;font-size:11px;color:var(--ink-mute);font-family:ui-monospace,monospace}
.zrv-tags{display:flex;gap:.35rem;flex-wrap:wrap}
.zrv-tag{font-size:10px;font-weight:600;color:var(--brass-deep);background:rgba(168,134,84,.14);border-radius:var(--radius-pill);padding:.15rem .5rem}
.zrv-reviews{display:flex;flex-direction:column;gap:.7rem}
.zrv-review{border:1px solid var(--rule);border-radius:var(--radius-md);background:#fff;padding:.8rem .95rem}
.zrv-rh{display:flex;align-items:center;gap:.6rem;margin-bottom:.35rem}
.zrv-rh img{width:30px;height:30px;border-radius:999px;object-fit:cover}
.zrv-rh b{font-size:13px}
.zrv-rh .s{color:var(--brass);font-size:13px;margin-left:auto}
.zrv-rh .when{font-size:11px;color:var(--ink-mute)}
.zrv-review p{margin:0;font-size:13px;line-height:1.6;color:var(--ink-soft)}
.zrv-state{padding:2rem;text-align:center;color:var(--ink-mute);font-size:13px;border:1px dashed var(--rule);border-radius:var(--radius-lg);background:#fff}
`;

export function ReviewsPanel() {
  const [info, setInfo] = React.useState<ReviewInfo | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let alive = true;
    getReviewInfo()
      .then((d) => { if (alive) setInfo(d); })
      .catch((e) => { if (alive) setError(String(e.message || e)); });
    return () => { alive = false; };
  }, []);

  if (error) return <div className="zrv"><style>{CSS}</style><div className="zrv-state">Konnte nicht geladen werden ({error}).</div></div>;
  if (!info) return <div className="zrv"><style>{CSS}</style><div className="zrv-state">Wird geladen …</div></div>;

  const g = info.platforms.google;
  const ta = info.platforms.tripadvisor;
  const th = info.platforms.tourhq;

  return (
    <div className="zrv">
      <style>{CSS}</style>

      <div className="zrv-sec">
        <h3>Wo Sie um Bewertungen bitten</h3>
        <p className="sub">Stellen auf der Website, die Gäste zu einer Bewertung führen.</p>
        <div className="zrv-asks">
          {info.asks.length === 0 && <div className="zrv-state">Keine Bewertungs-Aufrufe gefunden.</div>}
          {info.asks.map((a) => (
            <div className="zrv-ask" key={a.file}>
              <span className="material-symbols-outlined">campaign</span>
              <div className="w">
                <b>{a.where}</b>
                <small>{a.file}</small>
              </div>
              <div className="zrv-tags">{a.platforms.map((p) => <span key={p} className="zrv-tag">{p}</span>)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="zrv-sec">
        <h3>Plattformen</h3>
        <p className="sub">Öffentliche Profile, auf denen Bewertungen entstehen.</p>
        <div className="zrv-cards">
          {/* Google */}
          <div className="zrv-card">
            <div className="zrv-ph"><b>Google</b></div>
            {g.rating ? (
              <div className="zrv-rating"><span className="n">{g.rating.toFixed(1)}</span><span className="s">{stars(g.rating)}</span><span className="t">{g.total} Bewertungen</span></div>
            ) : (
              <div className="zrv-note">
                {g.configured && g.error
                  ? `Google-API-Fehler: ${g.error}`
                  : 'Live-Bewertungen abrufen: GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID auf der Admin-Site setzen.'}
              </div>
            )}
            <div className="zrv-links">
              {g.profileUrl && <a className="zrv-btn" href={g.profileUrl} target="_blank" rel="noopener noreferrer"><span className="material-symbols-outlined">open_in_new</span>Profil</a>}
              {g.url && <a className="zrv-btn" href={g.url} target="_blank" rel="noopener noreferrer"><span className="material-symbols-outlined">reviews</span>Bewertungen</a>}
            </div>
          </div>

          {/* TripAdvisor */}
          <div className="zrv-card">
            <div className="zrv-ph"><b>TripAdvisor</b></div>
            <div className="zrv-note">Zuza Prague Tours · Standort-ID {ta.locationId || '—'}</div>
            <div className="zrv-links">
              {ta.listingUrl && <a className="zrv-btn" href={ta.listingUrl} target="_blank" rel="noopener noreferrer"><span className="material-symbols-outlined">reviews</span>Bewertungen ansehen</a>}
              {ta.writeUrl && <a className="zrv-btn primary" href={ta.writeUrl} target="_blank" rel="noopener noreferrer"><span className="material-symbols-outlined">edit</span>Bewerten</a>}
            </div>
          </div>

          {/* TourHQ */}
          {th.url && (
            <div className="zrv-card">
              <div className="zrv-ph"><b>TourHQ</b></div>
              <div className="zrv-note">Zuzanas Guide-Profil — Bewertungen &amp; Rating.</div>
              <div className="zrv-links">
                <a className="zrv-btn" href={th.url} target="_blank" rel="noopener noreferrer"><span className="material-symbols-outlined">open_in_new</span>Profil ansehen</a>
              </div>
            </div>
          )}
        </div>
      </div>

      {g.reviews && g.reviews.length > 0 && (
        <div className="zrv-sec">
          <h3>Neueste Google-Bewertungen</h3>
          <p className="sub">Live über die Google Places API (max. 5).</p>
          <div className="zrv-reviews">
            {g.reviews.map((r, i) => (
              <div className="zrv-review" key={i}>
                <div className="zrv-rh">
                  {r.photo && <img src={r.photo} alt="" referrerPolicy="no-referrer" />}
                  <b>{r.author}</b>
                  <span className="s">{stars(r.rating)}</span>
                  <span className="when">{r.when}</span>
                </div>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewsPanel;
