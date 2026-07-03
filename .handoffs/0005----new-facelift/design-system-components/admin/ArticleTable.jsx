import React from 'react';

const STATUS = {
  published: { label: 'Veröffentlicht', cls: 'is-pub' },
  draft: { label: 'Entwurf', cls: 'is-draft' },
  scheduled: { label: 'Geplant', cls: 'is-sched' },
};

const CSS = `
.zpt-article-table{font-family:var(--font-sans);color:var(--ink);max-width:1180px}
.zpt-article-table *{box-sizing:border-box}
.zat-bar{display:flex;align-items:center;justify-content:space-between;gap:1rem;margin:1.6rem 0 1.1rem;flex-wrap:wrap}
.zat-filters{display:inline-flex;background:#fff;border:1px solid var(--rule);border-radius:var(--radius-pill);padding:3px}
.zat-fil{display:inline-flex;align-items:center;gap:.45rem;border:0;background:transparent;border-radius:var(--radius-pill);padding:.5rem .95rem;font-family:var(--font-sans);font-size:12px;font-weight:500;color:var(--ink-mute);cursor:pointer;transition:background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out)}
.zat-fil span{font-size:10px;font-weight:600;color:var(--ink-mute);background:var(--stone-100);border-radius:999px;padding:1px 7px}
.zat-fil:hover{color:var(--ink)}
.zat-fil.is-on{background:var(--ink);color:var(--ivory)}
.zat-fil.is-on span{background:rgba(245,239,228,.2);color:var(--ivory)}
.zat-search{display:inline-flex;align-items:center;gap:.5rem;background:#fff;border:1px solid var(--rule);border-radius:var(--radius-md);padding:.55rem .85rem;min-width:240px}
.zat-search .material-symbols-outlined{font-size:18px;color:var(--ink-mute)}
.zat-search input{border:0;outline:0;background:transparent;font-family:var(--font-sans);font-size:13px;color:var(--ink);width:100%}
.zat-table{background:#fff;border:1px solid var(--rule);border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-xs)}
.zat-h,.zat-row{display:grid;grid-template-columns:1fr 140px 120px 96px 108px;align-items:center;gap:1rem;padding:0 1.25rem}
.zat-h{height:42px;border-bottom:1px solid var(--rule);background:var(--stone-50)}
.zat-h span{font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-mute)}
.zat-row{min-height:80px;border-bottom:1px solid var(--rule-soft);cursor:pointer;transition:background var(--dur-fast) var(--ease-out)}
.zat-row:last-child{border-bottom:0}
.zat-row:hover{background:var(--stone-50)}
.zat-art{display:flex;align-items:center;gap:1rem;min-width:0;padding:.8rem 0}
.zat-thumb{width:74px;height:54px;border-radius:var(--radius-md);flex-shrink:0;background-color:var(--stone-200);background-size:cover;background-position:center;box-shadow:inset 0 0 0 1px rgba(26,23,20,.08)}
.zat-meta{min-width:0}
.zat-cat{display:block;font-size:9px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--brass-deep);margin-bottom:2px}
.zat-meta b{display:block;font-family:var(--font-display);font-size:17px;font-weight:400;color:var(--ink);line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.zat-meta b em{font-family:var(--font-italic);font-style:italic;color:var(--burgundy)}
.zat-meta i{display:block;font-style:normal;font-size:11.5px;color:var(--ink-mute);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:42ch}
.zat-pill{display:inline-flex;align-items:center;gap:.4rem;font-size:11px;font-weight:600;padding:.3rem .65rem;border-radius:var(--radius-pill)}
.zat-pill::before{content:"";width:6px;height:6px;border-radius:999px;background:currentColor}
.zat-pill.is-pub{color:#3F6B4A;background:rgba(63,107,74,.12)}
.zat-pill.is-draft{color:var(--stone-600);background:var(--stone-100)}
.zat-pill.is-sched{color:var(--brass-deep);background:rgba(168,134,84,.15)}
.zat-dim{font-size:12.5px;color:var(--ink-mute)}
.zat-act{display:flex;align-items:center;gap:.15rem;justify-content:flex-end;opacity:0;transition:opacity var(--dur-fast) var(--ease-out)}
.zat-row:hover .zat-act{opacity:1}
.zat-act button{width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:0;background:transparent;border-radius:var(--radius-md);color:var(--ink-mute);cursor:pointer;transition:background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out)}
.zat-act button:hover{background:var(--stone-100);color:var(--ink)}
.zat-act button.danger:hover{background:rgba(186,26,26,.1);color:var(--error)}
.zat-act .material-symbols-outlined{font-size:18px}
.zat-empty{padding:3rem;text-align:center;color:var(--ink-mute);font-size:13px}
`;

/**
 * ArticleTable — the journal dashboard / curation surface: status filter
 * pills with live counts, a search field, and a table of articles (hero
 * thumbnail, title + category + blurb, status pill, date, read time and
 * row actions). Clicking a row opens it in the editor.
 */
export function ArticleTable({
  articles = [],
  query = '',
  onQuery,
  filter = 'all',
  onFilter,
  onEdit,
  onDelete,
  onDuplicate,
  imageBase = '',
  className = '',
  style = {},
}) {
  const counts = articles.reduce(
    (m, a) => { m.all += 1; m[a.status] = (m[a.status] || 0) + 1; return m; },
    { all: 0, published: 0, draft: 0, scheduled: 0 }
  );
  const filters = [['all', 'Alle'], ['published', 'Veröffentlicht'], ['draft', 'Entwürfe'], ['scheduled', 'Geplant']];
  const q = query.trim().toLowerCase();
  const rows = articles.filter(
    (a) =>
      (filter === 'all' || a.status === filter) &&
      (!q || (a.titlePlain || '').toLowerCase().includes(q) || (a.category || '').toLowerCase().includes(q))
  );

  return (
    <div className={`zpt-article-table ${className}`} style={style}>
      <style>{CSS}</style>
      <div className="zat-bar">
        <div className="zat-filters">
          {filters.map(([k, l]) => (
            <button key={k} type="button" className={`zat-fil ${filter === k ? 'is-on' : ''}`} onClick={() => onFilter && onFilter(k)}>
              {l}<span>{counts[k] || 0}</span>
            </button>
          ))}
        </div>
        <div className="zat-search">
          <span className="material-symbols-outlined">search</span>
          <input value={query} onChange={(e) => onQuery && onQuery(e.target.value)} placeholder="Artikel suchen…" />
        </div>
      </div>
      <div className="zat-table">
        <div className="zat-h">
          <span>Artikel</span><span>Status</span><span>Datum</span><span>Lesezeit</span><span></span>
        </div>
        {rows.map((a) => {
          const st = STATUS[a.status] || STATUS.draft;
          return (
            <div className="zat-row" key={a.slug} onClick={() => onEdit && onEdit(a.slug)}>
              <div className="zat-art">
                <div className="zat-thumb" style={{ backgroundImage: a.hero ? `url(${imageBase}${a.hero})` : 'none' }}></div>
                <div className="zat-meta">
                  <span className="zat-cat">{a.category}</span>
                  <b dangerouslySetInnerHTML={{ __html: a.title || a.titlePlain }}></b>
                  <i>{a.cardBlurb}</i>
                </div>
              </div>
              <div><span className={`zat-pill ${st.cls}`}>{st.label}</span></div>
              <div className="zat-dim">{a.date}</div>
              <div className="zat-dim">{a.readTime}</div>
              <div className="zat-act" onClick={(e) => e.stopPropagation()}>
                <button type="button" title="Bearbeiten" onClick={() => onEdit && onEdit(a.slug)}><span className="material-symbols-outlined">edit</span></button>
                <button type="button" title="Duplizieren" onClick={() => onDuplicate && onDuplicate(a.slug)}><span className="material-symbols-outlined">content_copy</span></button>
                <button type="button" className="danger" title="Löschen" onClick={() => onDelete && onDelete(a.slug)}><span className="material-symbols-outlined">delete</span></button>
              </div>
            </div>
          );
        })}
        {rows.length === 0 && <div className="zat-empty">Keine Artikel gefunden.</div>}
      </div>
    </div>
  );
}

export default ArticleTable;
