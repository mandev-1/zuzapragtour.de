import React from 'react';
import { getSiteStats, type SiteStats, type StatCounter, type StatGoal } from '../../lib/api';

/**
 * StatsPanel — the public site's own anonymous analytics
 * (prague-tour-guide/src/utils/analytics.ts): every click, the ways guests get
 * in touch, which pages and sources lead to a contact, and the paths visitors
 * take. A visit = one browser tab; a contact = WhatsApp, phone, e-mail or a
 * sent enquiry form.
 */

const CSS = `
.zst{font-family:var(--font-sans);color:var(--ink);max-width:1120px;padding:1.4rem 0 4rem;display:flex;flex-direction:column;gap:1.6rem}
.zst *{box-sizing:border-box}
.zst h3{font-family:var(--font-display);font-size:1.3rem;font-weight:400;margin:0 0 .2rem}
.zst p.sub{font-size:12.5px;color:var(--ink-mute);margin:0 0 .9rem;line-height:1.5}
.zst-card{border:1px solid var(--rule);border-radius:var(--radius-lg);background:#fff;box-shadow:var(--shadow-xs);padding:1.1rem 1.2rem}
.zst-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.6rem}
.zst-scroll{overflow-x:auto}
.zst table{width:100%;border-collapse:collapse;font-size:13px}
.zst th,.zst td{text-align:right;padding:.5rem .6rem;border-bottom:1px solid var(--rule-soft);font-variant-numeric:tabular-nums;vertical-align:top}
.zst th.l,.zst td.l{text-align:left}
.zst th{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-mute);white-space:nowrap}
.zst tr.key td{font-weight:700;background:rgba(168,134,84,.06)}
.zst td small{display:block;font-family:ui-monospace,monospace;font-size:10.5px;color:var(--ink-mute);margin-top:.1rem;word-break:break-all}
.zst .muted{color:var(--stone-400)}
.zst-row{display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.zst-tools{display:flex;gap:.6rem;flex-wrap:wrap;align-items:center}
.zst-seg{display:inline-flex;border:1px solid var(--rule);border-radius:var(--radius-md);overflow:hidden;background:#fff}
.zst-seg button{border:0;background:none;padding:.45rem .7rem;font-family:var(--font-sans);font-size:12px;font-weight:600;color:var(--ink-soft);cursor:pointer}
.zst-seg button+button{border-left:1px solid var(--rule)}
.zst-seg button.on{background:var(--ink);color:var(--ivory)}
.zst-btn{display:inline-flex;align-items:center;gap:.35rem;border:1px solid var(--rule);background:#fff;border-radius:var(--radius-md);padding:.45rem .75rem;font-family:var(--font-sans);font-size:12px;font-weight:600;color:var(--ink-soft);cursor:pointer}
.zst-btn:hover{border-color:var(--burgundy);color:var(--burgundy)}
.zst-btn .material-symbols-outlined{font-size:15px}
.zst-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:1rem}
.zst-kpi{border:1px solid var(--rule);border-radius:var(--radius-lg);background:#fff;padding:.9rem 1rem}
.zst-kpi b{display:block;font-family:var(--font-display);font-size:1.9rem;font-weight:400;line-height:1.1;font-variant-numeric:tabular-nums}
.zst-kpi span{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-mute)}
.zst-kpi em{display:block;font-style:normal;font-size:11.5px;color:var(--ink-mute);margin-top:.3rem}
.zst-rate{display:inline-flex;align-items:center;gap:.45rem;justify-content:flex-end;white-space:nowrap}
.zst-rate i{display:inline-block;height:6px;border-radius:3px;background:var(--brass);min-width:2px}
.zst-cat{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.06em;padding:.12rem .45rem;border-radius:999px;background:var(--stone-100);color:var(--ink-soft);white-space:nowrap}
.zst-cat.whatsapp{background:#E3F1E6;color:#25633A}.zst-cat.phone,.zst-cat.email{background:#EAE6F3;color:#4A3D7A}.zst-cat.form{background:#F6E7E2;color:var(--burgundy)}.zst-cat.enquiry{background:var(--burgundy);color:#fff}.zst-cat.tour{background:#F3ECDD;color:var(--brass-deep)}
.zst-chips{display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:.8rem}
.zst-chips button{border:1px solid var(--rule);background:#fff;border-radius:999px;padding:.3rem .7rem;font-family:var(--font-sans);font-size:12px;color:var(--ink-soft);cursor:pointer}
.zst-chips button.on{border-color:var(--ink);background:var(--ink);color:var(--ivory)}
.zst-search{border:1px solid var(--rule);border-radius:var(--radius-md);padding:.4rem .6rem;font-family:var(--font-sans);font-size:12.5px;min-width:200px}
.zst-path{display:flex;flex-wrap:wrap;align-items:center;gap:.25rem;text-align:left}
.zst-path span{font-size:12px;padding:.1rem .45rem;border-radius:4px;background:var(--stone-100)}
.zst-path span.goal{background:#E3F1E6;color:#25633A;font-weight:700}
.zst-path i{font-style:normal;color:var(--stone-400);font-size:11px}
.zst-bars{display:flex;gap:2px;height:90px;padding-top:.4rem}
.zst-bars div{flex:1;display:flex;flex-direction:column;justify-content:flex-end;min-width:3px;position:relative}
.zst-bars .v{background:var(--stone-200);border-radius:2px 2px 0 0}
.zst-bars .c{background:var(--burgundy);border-radius:2px 2px 0 0;margin-top:1px}
.zst-axis{display:flex;justify-content:space-between;font-size:10.5px;color:var(--ink-mute);margin-top:.3rem}
.zst-more{margin-top:.7rem}
.zst-err{border:1px solid rgba(107,31,42,.3);background:rgba(107,31,42,.05);border-radius:var(--radius-md);padding:.8rem 1rem;font-size:13px;color:var(--burgundy)}
.zst-note{font-size:12px;color:var(--ink-mute);line-height:1.55}
.zst-note code{font-family:ui-monospace,monospace;background:var(--stone-100);padding:0 .3rem;border-radius:3px}
`;

type Device = 'all' | 'm' | 'd';

const GOALS: { key: StatGoal; label: string }[] = [
  { key: 'whatsapp', label: 'WhatsApp geöffnet' },
  { key: 'phone', label: 'Telefonnummer getippt' },
  { key: 'email', label: 'E-Mail geöffnet' },
  { key: 'enquiry', label: 'Anfrageformular gesendet' },
];

const CATS: Record<string, string> = {
  whatsapp: 'WhatsApp',
  phone: 'Telefon',
  email: 'E-Mail',
  form: 'Anfrageseite',
  tour: 'Tour',
  nav: 'Navigation',
  anchor: 'Sprung',
  external: 'Extern',
  button: 'Schaltfläche',
  enquiry: 'Anfrage gesendet',
};
const CONTACT_CATS = new Set(['whatsapp', 'phone', 'email', 'enquiry']);

const PAGE_NAMES: Record<string, string> = {
  '/': 'Startseite',
  '/tours': 'Touren',
  '/blog': 'Journal',
  '/book': 'Buchungsanfrage',
  '/contact': 'Kontakt',
  '/zuzana-manova': 'Über Zuzana',
  '/bewerten': 'Bewerten',
  '/privacy': 'Datenschutz',
  '/terms': 'AGB',
};
function pageName(path: string): string {
  if (PAGE_NAMES[path]) return PAGE_NAMES[path];
  const m = path.match(/^\/(tours|blog)\/(.+)$/);
  if (m) {
    const words = decodeURIComponent(m[2]).replace(/-/g, ' ');
    return `${m[1] === 'tours' ? 'Tour' : 'Artikel'}: ${words.charAt(0).toUpperCase()}${words.slice(1)}`;
  }
  return path;
}

const RANGES = [7, 30, 90, 365];

const count = (c: number[] | undefined, dev: Device) => (!c ? 0 : dev === 'm' ? c[0] || 0 : dev === 'd' ? c[1] || 0 : (c[0] || 0) + (c[1] || 0));
const converted = (c: StatCounter | undefined, dev: Device) => (!c ? 0 : dev === 'm' ? c[2] : dev === 'd' ? c[3] : c[2] + c[3]);
const fmt = (n: number) => n.toLocaleString('de-DE');
const pct = (n: number) => `${(n * 100).toFixed(1).replace('.', ',')} %`;

/** Contact rate with a small bar; grey when there are too few visits to mean much. */
function Rate({ hits, of, max = 0.3 }: { hits: number; of: number; max?: number }) {
  if (!of) return <span className="muted">–</span>;
  const r = hits / of;
  return (
    <span className={`zst-rate${of < 10 ? ' muted' : ''}`} title={`${hits} von ${of}`}>
      <i style={{ width: `${Math.min(r / max, 1) * 48}px` }} />
      {pct(r)}
    </span>
  );
}

function Page({ path }: { path: string }) {
  return (
    <>
      {pageName(path)}
      {pageName(path) !== path && <small>{path}</small>}
    </>
  );
}

/** Sorted rows of a counter map for the selected device. */
function rowsOf(map: Record<string, StatCounter>, dev: Device) {
  return Object.entries(map)
    .map(([key, c]) => ({ key, n: count(c, dev), conv: converted(c, dev), c }))
    .filter((r) => r.n > 0)
    .sort((a, b) => b.n - a.n || a.key.localeCompare(b.key));
}

function ShowMore({ total, shown, onMore }: { total: number; shown: number; onMore: () => void }) {
  if (total <= shown) return null;
  return (
    <button type="button" className="zst-btn zst-more" onClick={onMore}>
      {total - shown <= 25 ? `Alle ${total - shown} weiteren anzeigen` : `25 weitere anzeigen (noch ${total - shown})`}
    </button>
  );
}

function ConversionTable({ title, sub, head, map, dev, label }: { title: string; sub: string; head: string; map: Record<string, StatCounter>; dev: Device; label: (key: string) => React.ReactNode }) {
  const [limit, setLimit] = React.useState(10);
  const rows = rowsOf(map, dev);
  return (
    <div className="zst-card">
      <h3>{title}</h3>
      <p className="sub">{sub}</p>
      <div className="zst-scroll">
        <table>
          <thead>
            <tr><th className="l">{head}</th><th>Besuche</th><th>mit Kontakt</th><th>Quote</th></tr>
          </thead>
          <tbody>
            {rows.slice(0, limit).map((r) => (
              <tr key={r.key}>
                <td className="l">{label(r.key)}</td><td>{fmt(r.n)}</td><td>{fmt(r.conv)}</td><td><Rate hits={r.conv} of={r.n} /></td>
              </tr>
            ))}
            {!rows.length && <tr><td className="l muted" colSpan={4}>Noch keine Daten.</td></tr>}
          </tbody>
        </table>
      </div>
      <ShowMore total={rows.length} shown={limit} onMore={() => setLimit((l) => l + 25)} />
    </div>
  );
}

function Path({ value }: { value: string }) {
  const steps = value.split(' › ');
  return (
    <div className="zst-path">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          {i > 0 && <i>→</i>}
          <span className={s.startsWith('✓') ? 'goal' : ''} title={s}>{s.startsWith('/') ? pageName(s) : s}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

function PathsCard({ paths, dev }: { paths: Record<string, StatCounter>; dev: Device }) {
  const [onlyConverted, setOnlyConverted] = React.useState(true);
  const [limit, setLimit] = React.useState(15);
  const rows = rowsOf(paths, dev).filter((r) => !onlyConverted || r.conv > 0);
  return (
    <div className="zst-card">
      <div className="zst-row">
        <div>
          <h3>Wege durch die Website</h3>
          <p className="sub">Die Seitenfolge je Besuch (gleiche Seite hintereinander zählt einmal, lange Wege werden mit „…“ gekürzt). Grün = hier hat der Gast Kontakt aufgenommen.</p>
        </div>
        <div className="zst-seg">
          <button type="button" className={onlyConverted ? 'on' : ''} onClick={() => setOnlyConverted(true)}>Wege zum Kontakt</button>
          <button type="button" className={onlyConverted ? '' : 'on'} onClick={() => setOnlyConverted(false)}>Alle Wege</button>
        </div>
      </div>
      <div className="zst-scroll">
        <table>
          <thead>
            <tr><th className="l">Weg</th><th>Besuche</th></tr>
          </thead>
          <tbody>
            {rows.slice(0, limit).map((r) => (
              <tr key={r.key}><td className="l"><Path value={r.key} /></td><td>{fmt(r.n)}</td></tr>
            ))}
            {!rows.length && <tr><td className="l muted" colSpan={2}>Noch keine Daten.</td></tr>}
          </tbody>
        </table>
      </div>
      <ShowMore total={rows.length} shown={limit} onMore={() => setLimit((l) => l + 25)} />
    </div>
  );
}

function ClicksCard({ clicks, dev }: { clicks: Record<string, StatCounter>; dev: Device }) {
  const [cat, setCat] = React.useState('all');
  const [q, setQ] = React.useState('');
  const [limit, setLimit] = React.useState(25);
  const all = rowsOf(clicks, dev).map((r) => {
    const [c, label, area, page] = r.key.split('\t');
    return { ...r, cat: c, label, area, page };
  });
  const cats = Array.from(new Set(all.map((r) => r.cat))).sort((a, b) => Object.keys(CATS).indexOf(a) - Object.keys(CATS).indexOf(b));
  const needle = q.trim().toLowerCase();
  const rows = all.filter(
    (r) => (cat === 'all' || r.cat === cat) && (!needle || `${r.label} ${r.area} ${r.page} ${pageName(r.page)}`.toLowerCase().includes(needle)),
  );
  return (
    <div className="zst-card">
      <div className="zst-row">
        <div>
          <h3>Alle Klicks</h3>
          <p className="sub">
            Jeder Klick auf einen Link oder Button: was, wo auf der Seite (Bereich) und auf welcher Seite.
            „Kontakt danach“ = wie oft der Besuch danach noch WhatsApp, Telefon oder E-Mail genutzt oder das Formular gesendet hat.
          </p>
        </div>
        <input className="zst-search" type="search" placeholder="Suchen…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="zst-chips">
        <button type="button" className={cat === 'all' ? 'on' : ''} onClick={() => setCat('all')}>Alle</button>
        {cats.map((c) => (
          <button key={c} type="button" className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>{CATS[c] || c}</button>
        ))}
      </div>
      <div className="zst-scroll">
        <table>
          <thead>
            <tr>
              <th className="l">Klick</th><th className="l">Typ</th><th className="l">Bereich</th><th className="l">Seite</th>
              {dev === 'all' && <><th>Handy</th><th>Desktop</th></>}
              <th>Gesamt</th><th>Kontakt danach</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, limit).map((r) => (
              <tr key={r.key}>
                <td className="l">{r.cat === 'tour' ? pageName(`/tours/${r.label}`) : r.label || <span className="muted">(ohne Text)</span>}</td>
                <td className="l"><span className={`zst-cat ${r.cat}`}>{CATS[r.cat] || r.cat}</span></td>
                <td className="l">{r.area || <span className="muted">–</span>}</td>
                <td className="l"><Page path={r.page} /></td>
                {dev === 'all' && <><td>{fmt(r.c[0])}</td><td>{fmt(r.c[1])}</td></>}
                <td><b>{fmt(r.n)}</b></td>
                <td>{CONTACT_CATS.has(r.cat) ? <span className="muted">ist Kontakt</span> : <Rate hits={r.conv} of={r.n} max={0.5} />}</td>
              </tr>
            ))}
            {!rows.length && <tr><td className="l muted" colSpan={8}>Keine Klicks{needle || cat !== 'all' ? ' für diesen Filter' : ''}.</td></tr>}
          </tbody>
        </table>
      </div>
      <ShowMore total={rows.length} shown={limit} onMore={() => setLimit((l) => l + 25)} />
    </div>
  );
}

/** Where contacts happen: WhatsApp / phone / e-mail clicks grouped by page and page area. */
function ContactSpotsCard({ clicks, dev }: { clicks: Record<string, StatCounter>; dev: Device }) {
  const rows = rowsOf(clicks, dev)
    .map((r) => {
      const [c, label, area, page] = r.key.split('\t');
      return { ...r, cat: c, label, area, page };
    })
    .filter((r) => CONTACT_CATS.has(r.cat) || r.cat === 'form');
  const [limit, setLimit] = React.useState(12);
  return (
    <div className="zst-card">
      <h3>Wo Gäste Kontakt aufnehmen</h3>
      <p className="sub">WhatsApp-, Telefon- und E-Mail-Klicks, Klicks zur Anfrageseite und gesendete Formulare (mit gewählter Tour), nach Seite und Stelle. So sieht man, welcher Button wirklich genutzt wird.</p>
      <div className="zst-scroll">
        <table>
          <thead>
            <tr><th className="l">Button</th><th className="l">Seite · Bereich</th>{dev === 'all' && <><th>Handy</th><th>Desktop</th></>}<th>Gesamt</th></tr>
          </thead>
          <tbody>
            {rows.slice(0, limit).map((r) => (
              <tr key={r.key}>
                <td className="l"><span className={`zst-cat ${r.cat}`}>{CATS[r.cat]}</span> {r.label}</td>
                <td className="l"><Page path={r.page} />{r.area && <small>Bereich: {r.area}</small>}</td>
                {dev === 'all' && <><td>{fmt(r.c[0])}</td><td>{fmt(r.c[1])}</td></>}
                <td><b>{fmt(r.n)}</b></td>
              </tr>
            ))}
            {!rows.length && <tr><td className="l muted" colSpan={5}>Noch keine Kontakt-Klicks.</td></tr>}
          </tbody>
        </table>
      </div>
      <ShowMore total={rows.length} shown={limit} onMore={() => setLimit((l) => l + 25)} />
    </div>
  );
}

function TrendCard({ series, dev }: { series: SiteStats['series']; dev: Device }) {
  const points = series.map((s) => ({
    day: s.day,
    visits: count(s.visits, dev),
    contacts: GOALS.reduce((sum, g) => sum + count(s.goals[g.key], dev), 0),
  }));
  const max = Math.max(1, ...points.map((p) => p.visits));
  return (
    <div className="zst-card">
      <h3>Verlauf</h3>
      <p className="sub">Grau = Besuche pro Tag, rot = Kontakte (WhatsApp, Telefon, E-Mail, Formular).</p>
      <div className="zst-bars">
        {points.map((p) => (
          <div key={p.day} title={`${p.day}: ${p.visits} Besuche, ${p.contacts} Kontakte`}>
            <span className="v" style={{ height: `${(Math.max(p.visits - p.contacts, 0) / max) * 100}%` }} />
            <span className="c" style={{ height: `${(Math.min(p.contacts, p.visits || p.contacts) / max) * 100}%` }} />
          </div>
        ))}
      </div>
      <div className="zst-axis"><span>{points[0]?.day}</span><span>{points[points.length - 1]?.day}</span></div>
    </div>
  );
}

export function StatsPanel() {
  const [days, setDays] = React.useState(30);
  const [dev, setDev] = React.useState<Device>('all');
  const [data, setData] = React.useState<SiteStats | null>(null);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(() => {
    setLoading(true);
    setError('');
    getSiteStats(days)
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [days]);
  React.useEffect(load, [load]);

  const t = data?.totals;
  const visits = count(t?.visits, dev);
  const convertedVisits = !t ? 0 : dev === 'm' ? t.visits[2] || 0 : dev === 'd' ? t.visits[3] || 0 : (t.visits[2] || 0) + (t.visits[3] || 0);
  const contacts = t ? GOALS.reduce((sum, g) => sum + count(t.goals[g.key], dev), 0) : 0;
  const formOpens = t
    ? Object.entries(t.clicks).reduce((sum, [k, c]) => sum + (k.startsWith('form\t') ? count(c, dev) : 0), 0)
    : 0;

  return (
    <div className="zst">
      <style>{CSS}</style>

      <div className="zst-row">
        <div>
          <h3>Klicks & Wege</h3>
          <p className="sub">
            Eigene, anonyme Messung auf zuzapragtour.de: jeder Klick, jede Kontaktaufnahme, Handy und Desktop getrennt.
            {data ? ` Zeitraum ${data.from} bis ${data.to}, Stand ${new Date(data.generatedAt).toLocaleString('de-DE')}.` : ''}
          </p>
        </div>
        <div className="zst-tools">
          <div className="zst-seg" role="group" aria-label="Gerät">
            {(['all', 'm', 'd'] as Device[]).map((d) => (
              <button key={d} type="button" className={dev === d ? 'on' : ''} onClick={() => setDev(d)}>{d === 'all' ? 'Alle' : d === 'm' ? 'Handy' : 'Desktop'}</button>
            ))}
          </div>
          <div className="zst-seg" role="group" aria-label="Zeitraum">
            {RANGES.map((r) => (
              <button key={r} type="button" className={days === r ? 'on' : ''} onClick={() => setDays(r)}>{r === 365 ? '1 Jahr' : `${r} Tage`}</button>
            ))}
          </div>
          <button type="button" className="zst-btn" onClick={load} disabled={loading}>
            <span className="material-symbols-outlined">refresh</span>{loading ? 'Lädt…' : 'Aktualisieren'}
          </button>
        </div>
      </div>

      {error && <div className="zst-err">{error}</div>}

      {data && t && (
        <>
          <div className="zst-kpis">
            <div className="zst-kpi"><span>Besuche</span><b>{fmt(visits)}</b>{dev === 'all' && <em>Handy {fmt(t.visits[0] || 0)} · Desktop {fmt(t.visits[1] || 0)}</em>}</div>
            <div className="zst-kpi"><span>Seitenaufrufe</span><b>{fmt(count(t.pageviews, dev))}</b><em>{visits ? `${(count(t.pageviews, dev) / visits).toFixed(1).replace('.', ',')} je Besuch` : '–'}</em></div>
            <div className="zst-kpi"><span>Kontakte</span><b>{fmt(contacts)}</b><em>WhatsApp, Telefon, E-Mail, Formular</em></div>
            <div className="zst-kpi"><span>Besuche mit Kontakt</span><b>{visits ? pct(convertedVisits / visits) : '–'}</b><em>{fmt(convertedVisits)} von {fmt(visits)}</em></div>
            <div className="zst-kpi"><span>Absprünge</span><b>{visits ? pct(count(t.bounces, dev) / visits) : '–'}</b><em>nur eine Seite, kein Klick</em></div>
          </div>

          <TrendCard series={data.series} dev={dev} />

          <div className="zst-grid">
            <div className="zst-card">
              <h3>Kontakte</h3>
              <p className="sub">Jeder Klick zählt, auch wenn jemand zweimal auf WhatsApp tippt.</p>
              <table>
                <thead>
                  <tr><th className="l">Art</th>{dev === 'all' && <><th>Handy</th><th>Desktop</th></>}<th>Gesamt</th></tr>
                </thead>
                <tbody>
                  {GOALS.map((g) => (
                    <tr key={g.key}>
                      <td className="l">{g.label}</td>
                      {dev === 'all' && <><td>{fmt(t.goals[g.key]?.[0] || 0)}</td><td>{fmt(t.goals[g.key]?.[1] || 0)}</td></>}
                      <td>{fmt(count(t.goals[g.key], dev))}</td>
                    </tr>
                  ))}
                  <tr className="key">
                    <td className="l">Kontakte gesamt</td>
                    {dev === 'all' && <><td>{fmt(GOALS.reduce((s, g) => s + (t.goals[g.key]?.[0] || 0), 0))}</td><td>{fmt(GOALS.reduce((s, g) => s + (t.goals[g.key]?.[1] || 0), 0))}</td></>}
                    <td>{fmt(contacts)}</td>
                  </tr>
                  <tr>
                    <td className="l muted">Anfrageseite geöffnet (noch kein Kontakt)</td>
                    {dev === 'all' && <><td className="muted" /><td className="muted" /></>}
                    <td className="muted">{fmt(formOpens)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ConversionTable
              title="Herkunft"
              sub="Woher die Besuche kamen (verweisende Website) und wie oft daraus ein Kontakt wurde."
              head="Quelle"
              map={t.refs}
              dev={dev}
              label={(k) => k || <span className="muted">Direkt / unbekannt</span>}
            />
          </div>

          <ContactSpotsCard clicks={t.clicks} dev={dev} />

          <div className="zst-grid">
            <ConversionTable
              title="Einstiegsseiten"
              sub="Die erste Seite eines Besuchs, z. B. ein Artikel aus Google, und wie oft der Besuch zu einem Kontakt führte."
              head="Seite"
              map={t.entries}
              dev={dev}
              label={(k) => <Page path={k} />}
            />
            <ConversionTable
              title="Seiten, die überzeugen"
              sub="Besuche, die eine Seite gesehen haben, und wie viele danach Kontakt aufgenommen haben."
              head="Seite"
              map={t.pages}
              dev={dev}
              label={(k) => <Page path={k} />}
            />
          </div>

          <PathsCard paths={t.paths} dev={dev} />

          <ClicksCard clicks={t.clicks} dev={dev} />
        </>
      )}

      <p className="zst-note">
        Anonym: keine Cookies, keine IP-Adressen, nichts wird auf dem Gerät gespeichert. Ein Besuch ist ein offener Browser-Tab; nach einem
        Neuladen beginnt ein neuer. Handy = Bildschirm unter 900 px. Eigene Besuche nicht mitzählen: auf jedem eigenen Gerät einmal{' '}
        <code>zuzapragtour.de/?track=off</code> öffnen (<code>?track=on</code> macht es rückgängig). Quoten unter 10 Besuchen sind grau, weil sie
        noch wenig aussagen.
      </p>
    </div>
  );
}

export default StatsPanel;
