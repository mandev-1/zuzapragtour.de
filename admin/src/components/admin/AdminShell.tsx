import React from 'react';

export interface AdminNavItem {
  key: string;
  label: string;
  icon: string;
}
export interface AdminUser {
  name: string;
  initials: string;
  role: string;
}
export interface AdminShellProps {
  brand?: React.ReactNode;
  nav?: AdminNavItem[];
  active?: string;
  onNavigate?: (key: string) => void;
  navLabel?: string;
  breadcrumb?: React.ReactNode;
  onBreadcrumb?: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  user?: AdminUser;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_NAV: AdminNavItem[] = [
  { key: 'articles', label: 'Artikel', icon: 'article' },
  { key: 'media', label: 'Medien', icon: 'photo_library' },
  { key: 'tours', label: 'Touren', icon: 'map' },
  { key: 'reviews', label: 'Bewertungen', icon: 'star' },
  { key: 'settings', label: 'Einstellungen', icon: 'settings' },
];

const CSS = `
.zpt-admin-shell{display:grid;grid-template-columns:248px 1fr;height:100vh;overflow:hidden;background:var(--canvas);color:var(--ink);font-family:var(--font-sans)}
.zpt-admin-shell *{box-sizing:border-box}
.zas-side{background:var(--ink);color:var(--ivory);display:flex;flex-direction:column;padding:1.5rem 1rem;height:100vh;overflow:auto}
.zas-brand{font-family:var(--font-display);font-size:1.3rem;line-height:1.1;padding:.4rem .6rem 1.3rem;display:flex;flex-direction:column;gap:.25rem}
.zas-brand b{font-weight:400;color:var(--brass)}
.zas-brand small{font-family:var(--font-sans);font-size:9px;letter-spacing:.26em;text-transform:uppercase;color:rgba(245,239,228,.4)}
.zas-nav{display:flex;flex-direction:column;gap:.15rem;margin-top:.4rem}
.zas-navi{display:flex;align-items:center;gap:.85rem;padding:.7rem .75rem;border:0;border-radius:var(--radius-md);background:transparent;color:rgba(245,239,228,.72);font-family:var(--font-sans);font-size:13px;letter-spacing:.01em;cursor:pointer;text-align:left;transition:background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out)}
.zas-navi .material-symbols-outlined{font-size:19px}
.zas-navi:hover{background:rgba(245,239,228,.07);color:var(--ivory)}
.zas-navi.is-active{background:rgba(168,134,84,.16);color:var(--ivory)}
.zas-navi.is-active .material-symbols-outlined{color:var(--brass)}
.zas-navlabel{font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:rgba(245,239,228,.3);padding:.4rem .75rem .35rem;margin-top:.6rem}
.zas-user{margin-top:auto;display:flex;align-items:center;gap:.7rem;padding:.9rem .7rem .3rem;border-top:1px solid rgba(245,239,228,.12)}
.zas-ava{width:34px;height:34px;border-radius:999px;background:var(--burgundy);color:var(--ivory);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;flex-shrink:0;letter-spacing:.04em}
.zas-user b{display:block;font-size:12px;font-weight:600;color:var(--ivory)}
.zas-user small{display:block;font-size:10px;color:rgba(245,239,228,.45)}
.zas-main{display:flex;flex-direction:column;height:100vh;min-width:0}
.zas-top{display:flex;align-items:flex-end;justify-content:space-between;gap:1.5rem;padding:1.5rem 2.2rem 1.25rem;border-bottom:1px solid var(--rule);background:#FCFBF8;flex-shrink:0;position:sticky;top:0;z-index:50}
.zas-crumb{display:inline-flex;align-items:center;gap:.35rem;font-size:11px;letter-spacing:.03em;color:var(--ink-mute);margin-bottom:.5rem;background:none;border:0;padding:0;cursor:pointer;font-family:var(--font-sans)}
.zas-crumb:hover{color:var(--burgundy)}
.zas-crumb .material-symbols-outlined{font-size:15px}
.zas-head h1{margin:0;font-family:var(--font-display);font-size:1.85rem;font-weight:400;line-height:1.08;color:var(--ink);letter-spacing:-.01em}
.zas-head h1 em{font-family:var(--font-italic);font-style:italic;color:var(--burgundy)}
.zas-head p{margin:.35rem 0 0;font-size:13px;color:var(--ink-mute)}
.zas-actions{display:flex;align-items:center;gap:.6rem;flex-shrink:0}
.zas-body{flex:1;overflow:auto;min-width:0}
@media(max-width:920px){.zpt-admin-shell{grid-template-columns:62px 1fr}.zas-brand small,.zas-navlabel,.zas-navi .zas-t,.zas-user div{display:none}.zas-brand{font-size:0;align-items:center}.zas-brand b{font-size:1.3rem}.zas-navi{justify-content:center}.zas-user{justify-content:center}}
`;

/**
 * AdminShell — chrome for the CMS: a dark ink sidebar (brand, nav, user) and a
 * sticky top bar (breadcrumb, title, actions slot). Sticky bar is z-index 50;
 * keep any floating control below it. Ported 1:1 from the 0004 reference.
 */
export function AdminShell({
  brand,
  nav = DEFAULT_NAV,
  active = 'articles',
  onNavigate,
  navLabel = 'Verwaltung',
  breadcrumb,
  onBreadcrumb,
  title,
  subtitle,
  actions,
  user = { name: 'Zuzana Manová', initials: 'ZM', role: 'Inhaberin & Redakteurin' },
  children,
  className = '',
  style = {},
}: AdminShellProps) {
  return (
    <div className={`zpt-admin-shell ${className}`} style={style}>
      <style>{CSS}</style>
      <aside className="zas-side">
        <div className="zas-brand">
          <span>{brand || (<>Zuza <b>&amp;</b> Pragtour</>)}</span>
          <small>Redaktion</small>
        </div>
        <div className="zas-navlabel">{navLabel}</div>
        <nav className="zas-nav">
          {nav.map((n) => (
            <button
              key={n.key}
              type="button"
              className={`zas-navi ${n.key === active ? 'is-active' : ''}`}
              onClick={() => onNavigate && onNavigate(n.key)}
            >
              <span className="material-symbols-outlined">{n.icon}</span>
              <span className="zas-t">{n.label}</span>
            </button>
          ))}
        </nav>
        <div className="zas-user">
          <div className="zas-ava">{user.initials}</div>
          <div>
            <b>{user.name}</b>
            <small>{user.role}</small>
          </div>
        </div>
      </aside>
      <div className="zas-main">
        <header className="zas-top">
          <div className="zas-head">
            {breadcrumb && (
              <button type="button" className="zas-crumb" onClick={onBreadcrumb}>
                <span className="material-symbols-outlined">arrow_back</span>
                {breadcrumb}
              </button>
            )}
            {typeof title === 'string' ? (
              <h1 dangerouslySetInnerHTML={{ __html: title }} />
            ) : (
              <h1>{title}</h1>
            )}
            {subtitle && <p>{subtitle}</p>}
          </div>
          <div className="zas-actions">{actions}</div>
        </header>
        <div className="zas-body">{children}</div>
      </div>
    </div>
  );
}

export default AdminShell;
