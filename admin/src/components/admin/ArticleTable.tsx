import React from 'react';
import type { JournalArticle, ArticleStatus } from '../../types/journal';
import { getL, titlePlain, readTimeLabelFor, dateLabel, isBilingual } from '../../lib/journal';
import { mediaUrl } from '../../lib/api';

const STATUS: Record<ArticleStatus, { label: string; cls: string }> = {
  published: { label: 'Publikováno', cls: 'is-pub' },
  draft: { label: 'Koncept', cls: 'is-draft' },
  scheduled: { label: 'Naplánováno', cls: 'is-sched' },
};

const CSS = `
.zpt-article-table{font-family:var(--font-sans);color:var(--ink)}
.zpt-article-table *{box-sizing:border-box}
.zat-bar{display:flex;align-items:center;justify-content:space-between;gap:1rem;margin:0 0 18px;flex-wrap:wrap}
.zat-filters{display:inline-flex;gap:2px;background:#ECEDF2;border:1px solid #E9EAF0;border-radius:12px;padding:4px;flex-wrap:wrap}
.zat-fil{display:inline-flex;align-items:center;gap:.45rem;border:0;background:transparent;border-radius:8px;padding:7px 12px;font-family:var(--font-sans);font-size:11px;font-weight:750;color:#8B8E97;cursor:pointer;transition:background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out)}
.zat-fil span{font-size:9.5px;font-weight:750;color:#9A9DA5;background:rgba(255,255,255,.6);border-radius:6px;padding:1px 6px}
.zat-fil:hover{color:#2D3038}
.zat-fil.is-on{background:#fff;color:#2D3038;box-shadow:0 2px 5px #2222220D}
.zat-fil.is-on span{background:#F5E9EE;color:#83425E}
.zat-search{display:inline-flex;align-items:center;gap:.5rem;background:#fff;border:1px solid var(--rule);border-radius:11px;height:37px;padding:0 .85rem;min-width:240px}
.zat-search .material-symbols-outlined{font-size:18px;color:var(--ink-mute)}
.zat-search input{border:0;outline:0;background:transparent;font-family:var(--font-sans);font-size:13px;color:var(--ink);width:100%}
.zat-table{background:#fff;border:1px solid #ECEEF2;border-radius:21px;overflow:hidden;box-shadow:var(--shadow-card)}
.zat-h,.zat-row{display:grid;grid-template-columns:1fr 140px 120px 96px 108px;align-items:center;gap:1rem;padding:0 1.25rem}
.zat-h{height:46px;border-bottom:1px solid #EFF0F4;background:#fff}
.zat-h span{font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#9195A0}
.zat-row{min-height:80px;border-bottom:1px solid var(--rule-soft);cursor:pointer;transition:background var(--dur-fast) var(--ease-out)}
.zat-row:last-child{border-bottom:0}
.zat-row:hover{background:#FAFAFC}
.zat-art{display:flex;align-items:center;gap:1rem;min-width:0;padding:.8rem 0}
.zat-thumb{width:74px;height:54px;border-radius:12px;flex-shrink:0;background-color:var(--stone-200);background-size:cover;background-position:center;box-shadow:inset 0 0 0 1px rgba(21,25,38,.08)}
.zat-meta{min-width:0}
.zat-cat{display:flex;align-items:center;gap:.45rem;font-size:9.5px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#9B6A7A;margin-bottom:4px}
.zat-lang{font-size:8px;letter-spacing:.1em;background:var(--stone-100);color:var(--ink-mute);border-radius:3px;padding:1px 5px}
.zat-meta b{display:block;font-family:var(--font-title);font-size:14px;color:var(--ink);line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:var(--weight-title);letter-spacing:-.025em}
.zat-meta b em{font-style:normal;color:var(--accent)}
.zat-meta i{display:block;font-style:normal;font-size:11.5px;color:var(--ink-mute);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:42ch}
.zat-pill{display:inline-flex;align-items:center;gap:.4rem;font-size:10px;font-weight:750;padding:5px 8px;border-radius:8px}
.zat-pill::before{content:"";width:6px;height:6px;border-radius:999px;background:currentColor}
.zat-pill.is-pub{color:#16866A;background:#E6F5EF}
.zat-pill.is-draft{color:#7B7F88;background:#F1F2F5}
.zat-pill.is-sched{color:#A87833;background:#FFF4E6}
.zat-dim{font-size:12.5px;color:var(--ink-mute)}
.zat-act{display:flex;align-items:center;gap:.15rem;justify-content:flex-end;opacity:0;transition:opacity var(--dur-fast) var(--ease-out)}
.zat-row:hover .zat-act{opacity:1}
.zat-act button{width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:0;background:transparent;border-radius:var(--radius-md);color:var(--ink-mute);cursor:pointer;transition:background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out)}
.zat-act button:hover{background:var(--stone-100);color:var(--ink)}
.zat-act button.danger:hover{background:rgba(194,65,79,.1);color:var(--error)}
.zat-act .material-symbols-outlined{font-size:18px}
.zat-empty{padding:3rem;text-align:center;color:var(--ink-mute);font-size:13px}
@media(hover:none){.zat-act{opacity:1}}
@media(max-width:740px){.zat-h{display:none}.zat-row{grid-template-columns:minmax(0,1fr) auto;gap:.6rem;padding:0 1rem}.zat-row>div:nth-child(3),.zat-row>div:nth-child(4),.zat-row>.zat-act{display:none}.zat-search{min-width:0;flex:1}.zat-meta i{max-width:none}.zat-bar{flex-direction:column;align-items:stretch}.zat-filters{align-self:flex-start}}
@media(max-width:510px){.zat-thumb{width:54px;height:44px;border-radius:10px}.zat-art{gap:.75rem}.zat-pill{font-size:9px;padding:4px 6px}.zat-pill::before{display:none}}
`;

export interface ArticleTableProps {
  articles: JournalArticle[];
  query: string;
  onQuery: (q: string) => void;
  filter: string;
  onFilter: (f: string) => void;
  onEdit: (slug: string) => void;
  onDelete: (slug: string) => void;
  onDuplicate: (slug: string) => void;
}

/**
 * ArticleTable — the journal dashboard: status filter pills with live counts, a
 * search field, and a table of articles. Clicking a row opens the editor.
 * Ported 1:1 from the 0004 reference, adapted to the bilingual JournalArticle
 * model (titles/blurbs resolve to German for the dashboard).
 */
export function ArticleTable({ articles, query, onQuery, filter, onFilter, onEdit, onDelete, onDuplicate }: ArticleTableProps) {
  const counts = articles.reduce(
    (m, a) => {
      m.all += 1;
      m[a.status] = (m[a.status] || 0) + 1;
      return m;
    },
    { all: 0, published: 0, draft: 0, scheduled: 0 } as Record<string, number>
  );
  const filters: [string, string][] = [
    ['all', 'Vše'],
    ['published', 'Publikované'],
    ['draft', 'Koncepty'],
    ['scheduled', 'Naplánované'],
  ];
  const q = query.trim().toLowerCase();
  const rows = articles.filter(
    (a) =>
      (filter === 'all' || a.status === filter) &&
      (!q || titlePlain(a).toLowerCase().includes(q) || (a.category || '').toLowerCase().includes(q))
  );

  return (
    <div className="zpt-article-table">
      <style>{CSS}</style>
      <div className="zat-bar">
        <div className="zat-filters">
          {filters.map(([k, l]) => (
            <button key={k} type="button" className={`zat-fil ${filter === k ? 'is-on' : ''}`} onClick={() => onFilter(k)}>
              {l}
              <span>{counts[k] || 0}</span>
            </button>
          ))}
        </div>
        <div className="zat-search">
          <span className="material-symbols-outlined">search</span>
          <input value={query} onChange={(e) => onQuery(e.target.value)} placeholder="Hledat článek…" />
        </div>
      </div>
      <div className="zat-table">
        <div className="zat-h">
          <span>Článek</span>
          <span>Stav</span>
          <span>Datum</span>
          <span>Čtení</span>
          <span></span>
        </div>
        {rows.map((a) => {
          const st = STATUS[a.status] || STATUS.draft;
          return (
            <div className="zat-row" key={a.slug} onClick={() => onEdit(a.slug)}>
              <div className="zat-art">
                <div className="zat-thumb" style={{ backgroundImage: a.hero ? `url(${mediaUrl(a.hero)})` : 'none' }}></div>
                <div className="zat-meta">
                  <span className="zat-cat">
                    {a.category}
                    <span className="zat-lang">{isBilingual(a) ? 'DE · EN' : 'DE'}</span>
                    {a.edition && <span className="zat-lang">Ed. {a.edition}</span>}
                  </span>
                  <b dangerouslySetInnerHTML={{ __html: getL(a.title, 'de') || titlePlain(a) }}></b>
                  <i>{getL(a.excerpt, 'de')}</i>
                </div>
              </div>
              <div>
                <span className={`zat-pill ${st.cls}`}>{st.label}</span>
              </div>
              <div className="zat-dim">{dateLabel(a, 'de')}</div>
              <div className="zat-dim">{readTimeLabelFor(a, 'de')}</div>
              <div className="zat-act" onClick={(e) => e.stopPropagation()}>
                <button type="button" title="Upravit" onClick={() => onEdit(a.slug)}>
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button type="button" title="Duplikovat" onClick={() => onDuplicate(a.slug)}>
                  <span className="material-symbols-outlined">content_copy</span>
                </button>
                <button type="button" className="danger" title="Smazat" onClick={() => onDelete(a.slug)}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          );
        })}
        {rows.length === 0 && <div className="zat-empty">Žádné články nenalezeny.</div>}
      </div>
    </div>
  );
}

export default ArticleTable;
