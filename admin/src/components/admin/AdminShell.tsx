import React from 'react';
import { isPlainClick } from '../../lib/route';

/* ============================================================
   AdminShell — "Zuza Control Center" chrome.
   Built from zuza-control-center-v2.html (Concept 02): a dark
   grouped sidebar, a sticky glass topbar (breadcrumbs, quick
   search, avatar), an eyebrow + title intro, and on phones a
   floating bottom tab bar plus a slide-in drawer.
   The window scrolls; sidebar and topbar stay put.
   z-index ladder (SSoT): content < sticky bars 50 < modal 60 < toast 90.
   ============================================================ */

export interface NavSub { key: string; label: string }
/** `href` makes the item an external link that opens in a new tab. */
export interface NavItem { key: string; label: string; icon: string; tag?: string; sub?: NavSub[]; href?: string }
export interface NavGroup { title: string; items: NavItem[] }
export interface MobileTab { key: string; sub?: string; label: string; icon: string }

export interface AdminShellProps {
  groups: NavGroup[];
  active: string;
  activeSub?: string;
  onNavigate: (key: string, sub?: string) => void;
  /** Address of a nav item: items render as real links (⌘/Ctrl-click opens a new tab). */
  hrefOf: (key: string, sub?: string) => string;
  mobileTabs: MobileTab[];
  crumb: string;
  eyebrow?: string;
  /** Plain text, or trusted HTML from an article title (may contain <em>). */
  title?: string;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  back?: { label: string; onClick: () => void };
  /** page = intro scrolls with content · sticky = intro pins under the topbar (editor) · bare = no intro, no padding (stats). */
  mode?: 'page' | 'sticky' | 'bare';
  onSearch: () => void;
  onLogout: () => void;
  children?: React.ReactNode;
}

const CSS = `
.zcc{--zcc-sticky-top:80px;display:flex;min-height:100vh;background:var(--canvas);color:var(--ink);font-family:var(--font-sans);font-size:14px}
.zcc *{box-sizing:border-box}
.zcc .material-symbols-outlined{font-size:19px;font-variation-settings:'FILL' 0,'wght' 350,'GRAD' 0,'opsz' 20}
.zcc button{font-family:inherit}

/* sidebar */
.zcc-side{position:sticky;top:0;display:flex;flex-direction:column;width:250px;flex-shrink:0;height:100vh;background:var(--aside);color:#F6F4F6;padding:28px 15px 20px;overflow-y:auto;z-index:50}
.zcc-brand{display:flex;align-items:center;gap:11px;padding:0 12px 34px;border:0;background:none;color:inherit;cursor:pointer;text-align:left}
.zcc-mark{width:37px;height:37px;border-radius:12px;background:linear-gradient(145deg,#D8A7B8 0%,#7A2D48 55%,#53203C 100%);display:grid;place-items:center;color:#fff;font-size:25px;font-weight:800;letter-spacing:-.12em;box-shadow:0 5px 22px #9C436241;flex-shrink:0}
.zcc-mark span{transform:translate(-2px,-1px)}
.zcc-bname{display:block;font-size:17px;font-weight:800;letter-spacing:-.7px;line-height:1.05}
.zcc-bname i{font-style:normal;color:#CB9CAC}
.zcc-bsub{display:block;margin-top:5px;font-size:9px;letter-spacing:2px;color:#A6A7AE;font-weight:700}
.zcc-group{margin-bottom:22px}
.zcc-gtitle{font-size:10px;letter-spacing:1.7px;font-weight:750;color:#696C77;padding:0 13px;margin-bottom:12px;text-transform:uppercase}
.zcc-item{width:100%;display:flex;align-items:center;gap:12px;color:#A1A3AD;padding:11px 12px;border:0;background:none;border-radius:12px;font-weight:600;text-align:left;cursor:pointer;transition:background .2s,color .2s;font-size:12.5px;margin:3px 0;min-height:43px}
.zcc-item .material-symbols-outlined{color:#80828F}
.zcc-item:hover{color:#fff;background:#262830}
.zcc-item.is-on{color:#fff;background:#343039}
.zcc-item.is-on .material-symbols-outlined{color:#ECB2C5}
a.zcc-item,a.zcc-subi,a.zcc-tab,a.zcc-brand{text-decoration:none}
.zcc-ext{margin-left:auto;display:flex}
.zcc-item .zcc-ext .material-symbols-outlined{font-size:15px;color:#5E616C}
.zcc-item:hover .zcc-ext .material-symbols-outlined{color:#ECB2C5}
.zcc-tag{margin-left:auto;background:#2D2F38;color:#7F838C;font-size:9px;font-weight:700;padding:3px 6px;border-radius:5px;letter-spacing:.04em}
.zcc-subs{display:flex;flex-direction:column;margin:2px 0 6px 25px;padding-left:12px;border-left:1px solid #30323A}
.zcc-subi{display:block;border:0;background:none;color:#8A8C97;text-align:left;font-size:11.5px;font-weight:600;padding:7px 10px;border-radius:9px;cursor:pointer}
.zcc-subi:hover{color:#fff;background:#262830}
.zcc-subi.is-on{color:#F7D1DE;background:#2B2A31}
.zcc-bottom{margin-top:auto;border-top:1px solid #30323A;padding-top:15px}
.zcc-help{margin:0 2px 16px;background:linear-gradient(140deg,#392936,#27262C);border:1px solid #49313F;border-radius:14px;padding:14px;color:#F7E7EF}
.zcc-help .hi{width:26px;height:26px;border-radius:9px;background:#633748;display:grid;place-items:center;margin-bottom:8px}
.zcc-help .hi .material-symbols-outlined{font-size:15px}
.zcc-help b{font-size:12px}
.zcc-help p{font-size:10.5px;line-height:1.55;color:#C3B0B9;margin:6px 0 0}
.zcc-profile{display:flex;align-items:center;gap:10px;padding:9px 5px;color:#fff}
.zcc-ava{width:34px;height:34px;display:grid;place-items:center;border-radius:12px;background:#692C43;color:#fff;font-size:11px;font-weight:800;flex-shrink:0}
.zcc-profile strong{display:block;font-size:11.5px}
.zcc-profile small{display:block;color:#797E8B;font-size:10px;margin-top:3px}
.zcc-out{margin-left:auto;width:32px;height:32px;border:0;border-radius:10px;background:transparent;color:#777987;display:grid;place-items:center;cursor:pointer}
.zcc-out:hover{background:#262830;color:#fff}

/* main */
.zcc-main{flex:1;min-width:0}
.zcc-top{height:80px;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0 clamp(20px,3.15vw,52px);border-bottom:1px solid #E8EAF0;background:rgba(255,255,255,.83);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);position:sticky;top:0;z-index:50}
.zcc-crumbs{display:flex;align-items:center;gap:11px;color:#9A9DA5;font-size:12px;font-weight:600;min-width:0}
.zcc-crumbs strong{color:#34343C;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.zcc-crumbs .sl{color:#C9CBD0}
.zcc-tact{display:flex;align-items:center;gap:12px}
.zcc-kbd{height:37px;min-width:194px;display:flex;align-items:center;justify-content:space-between;gap:8px;border:1px solid var(--rule);background:#fff;padding:0 13px;border-radius:11px;color:#9A9DA7;font-size:11.5px;font-weight:650;cursor:pointer}
.zcc-kbd span{display:flex;align-items:center;gap:8px}
.zcc-kbd .material-symbols-outlined{font-size:16px}
.zcc-kbd kbd{font-family:inherit;font-size:10px;border:1px solid #E4E4E9;border-radius:5px;padding:3px 5px;color:#A2A3AA}
.zcc-iconbtn{height:37px;width:38px;border:1px solid var(--rule);background:#fff;border-radius:11px;display:grid;place-items:center;color:#535765;cursor:pointer}
.zcc-ham,.zcc-sbtn{display:none}
.zcc-vdiv{height:23px;width:1px;background:#E6E7EC}
.zcc-mini{height:34px;width:34px;border-radius:11px;background:#6A2945;color:#fff;display:grid;place-items:center;font-size:11px;font-weight:800}
.zcc-content{max-width:1680px;margin:0 auto;padding:35px clamp(20px,3.15vw,52px) 60px}
.zcc-content.is-bare{max-width:none;padding:0}
.zcc-eyebrow{display:flex;align-items:center;gap:9px;text-transform:uppercase;letter-spacing:1.65px;font-size:10px;font-weight:800;color:#9B6A7A}
.zcc-eyebrow .dot{width:6px;height:6px;border-radius:50%;background:#C26C87}
.zcc-eyebrow .sl{color:#C9CBD1;margin:0 4px}
.zcc-back{display:inline-flex;align-items:center;gap:5px;border:0;background:none;padding:0;color:#8A4862;font-size:11px;font-weight:800;cursor:pointer;text-transform:uppercase;letter-spacing:1.4px}
.zcc-back .material-symbols-outlined{font-size:15px}
.zcc-back:hover{text-decoration:underline}
.zcc-intro{display:flex;justify-content:space-between;align-items:flex-end;gap:25px;margin:10px 0 26px}
.zcc-intro h1{font-size:clamp(27px,2.6vw,39px);letter-spacing:-1.65px;line-height:1.16;font-weight:790;margin:0 0 7px}
.zcc-intro h1 em{font-style:normal;color:#87415E}
.zcc-intro h1 .pt{color:#A96A81}
.zcc-intro p{font-size:13px;color:#83858E;margin:0;line-height:1.6}
.zcc-iact{display:flex;align-items:center;gap:9px;flex-wrap:wrap;justify-content:flex-end}
.zcc-head.is-sticky{position:sticky;top:var(--zcc-sticky-top);z-index:45;background:rgba(246,247,249,.92);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);margin:-35px calc(-1 * clamp(20px,3.15vw,52px)) 0;padding:16px clamp(20px,3.15vw,52px) 0;border-bottom:1px solid #E8EAF0}
.zcc-head.is-sticky .zcc-intro{margin:6px 0 14px;align-items:center}
.zcc-head.is-sticky h1{font-size:clamp(20px,1.9vw,27px);letter-spacing:-.9px;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.zcc-head.is-sticky .zcc-intro>div:first-child{min-width:0;flex:1}
.zcc-head.is-sticky .zcc-iact{flex-shrink:0;flex-wrap:nowrap}
.zcc-head.is-sticky + .zcc-body{margin-top:0}
.zcc-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;color:#A0A2AB;font-size:10px;padding:22px 1px 0}
.zcc-foot span{display:flex;align-items:center;gap:5px}
.zcc-foot .material-symbols-outlined{font-size:14px}

/* buttons shared by the views */
.zcc-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:12px;padding:11px 16px;font-size:12px;font-weight:750;cursor:pointer;border:1px solid transparent;white-space:nowrap;transition:transform .18s,background .18s,border-color .18s,color .18s}
.zcc-btn .material-symbols-outlined{font-size:17px}
.zcc-btn.primary{background:#6A243E;color:#fff;box-shadow:0 7px 18px #6A243E20}
.zcc-btn.primary:hover{transform:translateY(-2px);background:#4D172B}
.zcc-btn.primary:disabled{opacity:.55;cursor:default;transform:none}
.zcc-btn.ghost{background:#fff;border-color:#E7E8ED;color:#454954;border-radius:11px;padding:10px 13px;font-size:11.5px}
.zcc-btn.ghost:hover{background:#F9F7F9;border-color:#D9DBE2}
.zcc-btn.ghost:disabled{opacity:.55;cursor:default}
.zcc-status{display:inline-flex;align-items:center;gap:6px;border-radius:100px;padding:8px 11px;font-size:10.5px;font-weight:800;white-space:nowrap}
.zcc-status::before{content:'';height:6px;width:6px;border-radius:50%;background:currentColor}
.zcc-status.published{background:#E6F5EF;color:#16866A}
.zcc-status.draft{background:#F1F2F5;color:#6F747E}
.zcc-status.scheduled{background:#FFF4E6;color:#A87833}

/* mobile nav + drawer */
.zcc-tabs,.zcc-drawer,.zcc-dback{display:none}
@media(max-width:1250px){.zcc-side{width:223px}}
@media(max-width:1080px){
  .zcc-side{width:75px;padding:24px 12px}
  .zcc-side .zcc-brand{padding:0 7px 28px}
  .zcc-side .zcc-bcopy,.zcc-side .zcc-gtitle,.zcc-side .zcc-item .lbl,.zcc-side .zcc-tag,.zcc-side .zcc-ext,.zcc-side .zcc-help,.zcc-side .zcc-pcopy,.zcc-side .zcc-subs{display:none}
  .zcc-side .zcc-item{justify-content:center;padding:11px}
  .zcc-side .zcc-group{margin-bottom:15px}
  .zcc-side .zcc-profile{flex-direction:column}
  .zcc-side .zcc-out{margin:0}
}
@media(max-width:900px){
  .zcc{--zcc-sticky-top:69px}
  .zcc-side{display:none}
  .zcc-top{padding:0 24px;height:69px}
  .zcc-ham{display:grid}
  .zcc-crumbs{margin-right:auto;margin-left:4px}
  .zcc-content{padding:29px 24px 110px}
  .zcc-content.is-bare{padding:0 0 96px}
  .zcc-head.is-sticky{margin:-29px -24px 0;padding:12px 24px 0}
  .zcc-tabs{display:grid;position:fixed;left:14px;right:14px;bottom:calc(12px + env(safe-area-inset-bottom));height:65px;background:#1C1E25;border-radius:18px;grid-template-columns:repeat(4,1fr);z-index:50;box-shadow:0 16px 45px #12131C4F;overflow:hidden}
  .zcc-tab{background:none;border:0;color:#828490;display:flex;align-items:center;flex-direction:column;justify-content:center;gap:4px;font-size:9px;font-weight:750;cursor:pointer}
  .zcc-tab .material-symbols-outlined{font-size:21px}
  .zcc-tab.is-on{color:#F7D1DE}
  .zcc-drawer{display:flex;position:fixed;inset:0 0 0 auto;background:#1B1D23;width:min(320px,85vw);z-index:59;transform:translateX(100%);transition:transform .25s;flex-direction:column;overflow:auto;padding:25px 20px;box-shadow:-25px 0 60px #0003;color:#fff;visibility:hidden}
  .zcc-drawer.is-open{transform:translateX(0);visibility:visible}
  .zcc-dback.is-open{display:block;position:fixed;inset:0;background:#0008;z-index:58}
  .zcc-dhead{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}
  .zcc-dlogo{font-weight:800;font-size:18px}
  .zcc-dlogo i{font-style:normal;color:#D89CAF}
  .zcc-dclose{background:#30333C;color:#fff;border:0;border-radius:11px;width:34px;height:34px;display:grid;place-items:center;cursor:pointer}
  .zcc-drawer .zcc-group{margin-bottom:12px}
  .zcc-drawer .zcc-profile{margin-top:auto;border-top:1px solid #30323A;padding-top:15px}
}
@media(max-width:740px){.zcc-intro{align-items:flex-start}.zcc-head.is-sticky .zcc-iact{gap:6px}.zcc-head.is-sticky .zcc-btn.ghost .t{display:none}.zcc-head.is-sticky .zcc-btn.ghost{padding:10px 11px}.zcc-head.is-sticky .zcc-status{padding:7px 9px}}
@media(max-width:510px){
  .zcc-content{padding:24px 15px 108px}
  .zcc-top{padding:0 17px}
  .zcc-tact{gap:8px}
  .zcc-kbd{display:none}
  .zcc-sbtn{display:grid}
  .zcc-crumbs{font-size:11px}
  .zcc-crumbs .ws,.zcc-crumbs .sl{display:none}
  .zcc-vdiv{display:none}
  .zcc-head.is-sticky{margin:-24px -15px 0;padding:10px 15px 0}
  .zcc-intro{margin:9px 0 24px;display:block}
  .zcc-intro h1{font-size:30px;letter-spacing:-1.1px}
  .zcc-intro p{font-size:11.5px}
  .zcc-iact{margin-top:18px;justify-content:flex-start}
  .zcc-head.is-sticky .zcc-intro{display:block}
  .zcc-head.is-sticky .zcc-iact{margin-top:10px}
  .zcc-head.is-sticky h1{font-size:20px}
  .zcc-foot{flex-direction:column;align-items:flex-start;font-size:9px}
}
`;

const Icon = ({ n }: { n: string }) => <span className="material-symbols-outlined" aria-hidden="true">{n}</span>;

type GoFn = (k: string, s?: string) => void;
type HrefFn = (k: string, s?: string) => string;
/** Click handler for an in-app link: plain click navigates in place, modified click is left to the browser. */
const linkClick = (go: GoFn, k: string, s?: string) => (e: React.MouseEvent) => { if (!isPlainClick(e)) return; e.preventDefault(); go(k, s); };

function NavGroups({ groups, active, activeSub, go, hrefOf }: { groups: NavGroup[]; active: string; activeSub?: string; go: GoFn; hrefOf: HrefFn }) {
  return (
    <>
      {groups.map((g) => (
        <div className="zcc-group" key={g.title}>
          <div className="zcc-gtitle">{g.title}</div>
          {g.items.map((it) => (
            <React.Fragment key={it.key}>
              {it.href ? (
                <a className="zcc-item" href={it.href} target="_blank" rel="noopener noreferrer" title={it.label + ' (nová karta)'}>
                  <Icon n={it.icon} />
                  <span className="lbl">{it.label}</span>
                  <span className="zcc-ext"><Icon n="open_in_new" /></span>
                </a>
              ) : (
              <a className={`zcc-item ${active === it.key ? 'is-on' : ''}`} href={hrefOf(it.key)} onClick={linkClick(go, it.key)} title={it.label} aria-current={active === it.key ? 'page' : undefined}>
                <Icon n={it.icon} />
                <span className="lbl">{it.label}</span>
                {it.tag && <span className="zcc-tag">{it.tag}</span>}
              </a>
              )}
              {it.sub && active === it.key && (
                <div className="zcc-subs">
                  {it.sub.map((s) => (
                    <a key={s.key} className={`zcc-subi ${(activeSub || it.sub![0].key) === s.key ? 'is-on' : ''}`} href={hrefOf(it.key, s.key)} onClick={linkClick(go, it.key, s.key)}>
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
    </>
  );
}

function Profile({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="zcc-profile">
      <div className="zcc-ava">ZM</div>
      <div className="zcc-pcopy">
        <strong>Zuzana Manová</strong>
        <small>Majitelka · administrátorka</small>
      </div>
      <button type="button" className="zcc-out" onClick={onLogout} title="Odhlásit se" aria-label="Odhlásit se">
        <Icon n="logout" />
      </button>
    </div>
  );
}

export function AdminShell(props: AdminShellProps) {
  const { groups, active, activeSub, onNavigate, hrefOf, mobileTabs, crumb, eyebrow, title, subtitle, actions, back, mode = 'page', onSearch, onLogout, children } = props;
  const [drawer, setDrawer] = React.useState(false);
  const go = (k: string, s?: string) => { setDrawer(false); onNavigate(k, s); };

  React.useEffect(() => {
    if (!drawer) return;
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setDrawer(false); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [drawer]);

  const head = mode !== 'bare' && (
    <div className={`zcc-head ${mode === 'sticky' ? 'is-sticky' : ''}`}>
      {back ? (
        <button type="button" className="zcc-back" onClick={back.onClick}><Icon n="arrow_back" />{back.label}</button>
      ) : (
        <div className="zcc-eyebrow"><span className="dot" /> Zuza Control Center <span className="sl">/</span> {eyebrow || crumb}</div>
      )}
      <div className="zcc-intro">
        <div>
          {title && <h1 dangerouslySetInnerHTML={{ __html: title + (mode === 'page' ? '<span class="pt">.</span>' : '') }} />}
          {subtitle && mode === 'page' && <p>{subtitle}</p>}
        </div>
        {actions && <div className="zcc-iact">{actions}</div>}
      </div>
    </div>
  );

  return (
    <div className="zcc">
      <style>{CSS}</style>
      <aside className="zcc-side" aria-label="Hlavní navigace">
        <a className="zcc-brand" href={hrefOf('overview')} onClick={linkClick(go, 'overview')}>
          <span className="zcc-mark"><span>z</span></span>
          <span className="zcc-bcopy"><span className="zcc-bname">zuza<i>.</i>control</span><span className="zcc-bsub">PRAGUE TOURS</span></span>
        </a>
        <NavGroups groups={groups} active={active} activeSub={activeSub} go={go} hrefOf={hrefOf} />
        <div className="zcc-bottom">
          <div className="zcc-help">
            <div className="hi"><Icon n="auto_awesome" /></div>
            <b>Jedno místo. Všechna data.</b>
            <p>Web, poptávky, obsah i hodnocení v jednom přehledu.</p>
          </div>
          <Profile onLogout={onLogout} />
        </div>
      </aside>

      <main className="zcc-main">
        <header className="zcc-top">
          <button type="button" className="zcc-iconbtn zcc-ham" onClick={() => setDrawer(true)} aria-label="Otevřít menu"><Icon n="menu" /></button>
          <div className="zcc-crumbs"><span className="ws">Control Center</span><span className="sl">/</span><strong>{crumb}</strong></div>
          <div className="zcc-tact">
            <button type="button" className="zcc-kbd" onClick={onSearch}><span><Icon n="search" />Rychlé hledání</span><kbd>⌘ K</kbd></button>
            <button type="button" className="zcc-iconbtn zcc-sbtn" onClick={onSearch} aria-label="Rychlé hledání"><Icon n="search" /></button>
            <span className="zcc-vdiv" />
            <span className="zcc-mini" title="Zuzana Manová">ZM</span>
          </div>
        </header>
        <div className={`zcc-content ${mode === 'bare' ? 'is-bare' : ''}`}>
          {head}
          <div className="zcc-body">{children}</div>
          {mode === 'page' && (
            <div className="zcc-foot">
              <span><Icon n="lock" /> Anonymní měření bez cookies · obsah se ukládá jako commit do GitHubu</span>
              <span>Zuza Prague Tours © {new Date().getFullYear()}</span>
            </div>
          )}
        </div>
      </main>

      <nav className="zcc-tabs" aria-label="Mobilní navigace">
        {mobileTabs.map((t) => {
          const on = t.key === 'more' ? drawer : !drawer && active === t.key && (!t.sub || t.sub === (activeSub || t.sub));
          return (
            t.key === 'more' ? (
              <button type="button" key="more" className={`zcc-tab ${on ? 'is-on' : ''}`} onClick={() => setDrawer(true)}><Icon n={t.icon} />{t.label}</button>
            ) : (
              <a key={t.key + (t.sub || '')} className={`zcc-tab ${on ? 'is-on' : ''}`} href={hrefOf(t.key, t.sub)} onClick={linkClick(go, t.key, t.sub)}><Icon n={t.icon} />{t.label}</a>
            )
          );
        })}
      </nav>
      <div className={`zcc-dback ${drawer ? 'is-open' : ''}`} onClick={() => setDrawer(false)} />
      <div className={`zcc-drawer ${drawer ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="zcc-dhead">
          <div className="zcc-dlogo">zuza<i>.</i>control</div>
          <button type="button" className="zcc-dclose" onClick={() => setDrawer(false)} aria-label="Zavřít menu"><Icon n="close" /></button>
        </div>
        <NavGroups groups={groups} active={active} activeSub={activeSub} go={go} hrefOf={hrefOf} />
        <Profile onLogout={onLogout} />
      </div>
    </div>
  );
}

/* ── Quick search (⌘K) ─────────────────────────────────────────── */

export interface SearchItem { id: string; label: string; hint: string; icon: string; run: () => void }

const SEARCH_CSS = `
.zcc-scrim{position:fixed;inset:0;background:#10121ACC;z-index:60;display:flex;align-items:flex-start;justify-content:center;padding:12vh 20px 20px;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);font-family:var(--font-sans)}
.zcc-modal{width:min(100%,520px);max-height:76vh;display:flex;flex-direction:column;border-radius:21px;background:#fff;box-shadow:0 25px 100px #0003;overflow:hidden}
.zcc-sfield{display:flex;align-items:center;gap:10px;padding:16px 18px;border-bottom:1px solid #EFF0F4}
.zcc-sfield .material-symbols-outlined{color:#9A9DA7;font-size:20px}
.zcc-sfield input{flex:1;border:0;outline:0;font:inherit;font-size:14px;color:#17191F;background:transparent}
.zcc-sfield kbd{font-family:inherit;font-size:10px;border:1px solid #E4E4E9;border-radius:5px;padding:3px 6px;color:#A2A3AA}
.zcc-slist{overflow:auto;padding:8px}
.zcc-sres{border:0;background:transparent;border-radius:12px;width:100%;display:flex;align-items:center;gap:12px;padding:11px 12px;color:#34343F;text-align:left;font:inherit;cursor:pointer}
.zcc-sres.is-on{background:#F6F1F3}
.zcc-sres .si{height:32px;width:32px;border-radius:10px;background:#F4F5F8;color:#79818D;display:grid;place-items:center;flex-shrink:0}
.zcc-sres.is-on .si{background:#F5E9EE;color:#83425E}
.zcc-sres .si .material-symbols-outlined{font-size:17px}
.zcc-sres b{display:block;font-size:12.5px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.zcc-sres small{display:block;font-size:10.5px;color:#9A9DA5;margin-top:2px}
.zcc-sres>div{min-width:0;flex:1}
.zcc-sempty{font-size:12px;color:#9A9DA5;padding:18px 12px}
`;

const fold = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export function QuickSearch({ items, onClose }: { items: SearchItem[]; onClose: () => void }) {
  const [q, setQ] = React.useState('');
  const [sel, setSel] = React.useState(0);
  const input = React.useRef<HTMLInputElement>(null);
  const fq = fold(q.trim());
  const list = (fq ? items.filter((x) => fold(x.label + ' ' + x.hint).includes(fq)) : items).slice(0, 12);
  React.useEffect(() => { input.current?.focus(); }, []);
  React.useEffect(() => { setSel(0); }, [q]);
  const key = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(list.length - 1, s + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); }
    else if (e.key === 'Enter' && list[sel]) { e.preventDefault(); onClose(); list[sel].run(); }
    else if (e.key === 'Escape') { e.preventDefault(); onClose(); }
  };
  return (
    <div className="zcc-scrim" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <style>{SEARCH_CSS}</style>
      <div className="zcc-modal" role="dialog" aria-modal="true" aria-label="Rychlé hledání">
        <div className="zcc-sfield">
          <span className="material-symbols-outlined">search</span>
          <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={key} placeholder="Sekce nebo článek…" aria-label="Hledat" />
          <kbd>Esc</kbd>
        </div>
        <div className="zcc-slist">
          {list.map((x, i) => (
            <button type="button" key={x.id} className={`zcc-sres ${i === sel ? 'is-on' : ''}`} onMouseEnter={() => setSel(i)} onClick={() => { onClose(); x.run(); }}>
              <span className="si"><span className="material-symbols-outlined">{x.icon}</span></span>
              <div><b dangerouslySetInnerHTML={{ __html: x.label }} /><small>{x.hint}</small></div>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#B0B3BB' }}>arrow_forward</span>
            </button>
          ))}
          {!list.length && <div className="zcc-sempty">Nic nenalezeno.</div>}
        </div>
      </div>
    </div>
  );
}

export default AdminShell;
