import React from 'react';
import StatsApi from './stats/statsData';
import { SRC } from './stats/StatsDashboard';
import type { JournalArticle } from '../../types/journal';
import { titlePlain } from '../../lib/journal';

/* ============================================================
   Overview — the Control Center home ("Přehled").
   Layout and look from zuza-control-center-v2.html; every number
   is real: visits and contacts come from the site's own anonymous
   tracking (statsData.ts → /api/visits), the to-do list from the
   journal articles.
   ============================================================ */

const S: any = StatsApi;
type Range = 7 | 30 | 90;
type ChartKey = 'visits' | 'conv' | 'enquiry';

export type GoFn = (key: string, sub?: string, opts?: { tab?: string; filter?: string }) => void;

export interface OverviewHandle { exportCsv: () => void }
export interface OverviewProps {
  articles: JournalArticle[];
  go: GoFn;
  onOpenArticle: (slug: string) => void;
  onNotify: (msg: string, err?: boolean) => void;
}

const CSS = `
.zov{font-family:var(--font-sans);color:var(--ink)}
.zov *{box-sizing:border-box}
.zov .material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 350,'GRAD' 0,'opsz' 20}
.zov-filters{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-bottom:18px;flex-wrap:wrap}
.zov-fl,.zov-fr{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.zov-flabel{color:#9B9DA5;font-size:11px;font-weight:700}
.zov-fgroup{display:flex;align-items:center;gap:2px;background:#ECEDF2;border:1px solid #E9EAF0;border-radius:12px;padding:4px}
.zov-f{background:transparent;border:0;border-radius:8px;padding:7px 12px;color:#8B8E97;font-weight:750;font-size:11px;cursor:pointer;font-family:inherit}
.zov-f:hover{background:#F9F7F9}
.zov-f.is-on{color:#2D3038;background:#fff;box-shadow:0 2px 5px #2222220D}
.zov-live{background:#E5F5EF;color:#16866A;border-radius:100px;padding:8px 11px;font-size:10.5px;font-weight:800;display:flex;align-items:center;gap:6px;border:0;cursor:pointer;font-family:inherit}
.zov-live::before{content:'';height:6px;width:6px;border-radius:50%;background:#16866A}
.zov-live.is-err{background:#FFF0F0;color:#C65E68}
.zov-live.is-err::before{background:#C65E68}
.zov-live.is-wait{background:#F1F2F5;color:#7B808B}
.zov-live.is-wait::before{background:#A2A6B0}
.zov-switch{border:0;background:none;display:flex;align-items:center;gap:8px;color:#6F747E;font-size:11px;font-weight:650;padding:5px 0;cursor:pointer;font-family:inherit}
.zov-track{height:19px;width:32px;background:#DBDDE4;border-radius:15px;padding:3px;transition:background .2s}
.zov-knob{display:block;width:13px;height:13px;background:#fff;border-radius:50%;box-shadow:0 2px 4px #0002;transition:transform .2s}
.zov-switch.is-on .zov-track{background:#722C48}
.zov-switch.is-on .zov-knob{transform:translateX(13px)}
.zov-err{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #F3D9DD;border-radius:16px;padding:14px 16px;margin-bottom:16px;font-size:12px;color:#8A4A55}
.zov-err .material-symbols-outlined{color:#C65E68}
.zov-err button{margin-left:auto}

.zov-metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-bottom:16px}
.zov-metric{min-height:154px;position:relative;background:#fff;border:1px solid #ECEEF2;border-radius:19px;padding:20px 20px 17px;overflow:hidden;box-shadow:var(--shadow-card);transition:transform .2s,box-shadow .2s;text-align:left;font-family:inherit;color:inherit;cursor:pointer;width:100%}
.zov-metric:hover{transform:translateY(-3px);box-shadow:0 14px 35px #14182712}
.zov-mhead{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:11px;color:#7B808B;font-weight:700}
.zov-micon{width:30px;height:30px;border-radius:10px;background:#F4F5F8;display:grid;place-items:center;color:#79818D;flex-shrink:0}
.zov-micon .material-symbols-outlined{font-size:18px}
.zov-metric.is-primary .zov-micon{background:#F5E9EE;color:#83425E}
.zov-mnum{font-size:clamp(25px,2.3vw,35px);font-weight:780;letter-spacing:-1.5px;margin:14px 0 3px;font-variant-numeric:tabular-nums}
.zov-msub{display:flex;align-items:center;gap:8px;font-size:10px;color:#9A9DA5;position:relative;z-index:1}
.zov-delta{display:inline-flex;align-items:center;gap:3px;border-radius:6px;padding:4px 6px;font-size:10px;font-weight:800;white-space:nowrap}
.zov-delta .material-symbols-outlined{font-size:13px}
.zov-delta.up{color:#18866A;background:#E5F5EF}
.zov-delta.down{color:#C65E68;background:#FFF0F0}
.zov-delta.flat{color:#7B808B;background:#F1F2F5}
.zov-spark{position:absolute;width:96px;height:38px;right:18px;bottom:46px;opacity:.9}

.zov-grid{display:grid;grid-template-columns:minmax(0,1.67fr) minmax(300px,1fr);gap:16px;margin-bottom:16px}
.zov-grid.b{grid-template-columns:minmax(0,1.33fr) minmax(320px,1fr)}
.zov-card{background:#fff;border:1px solid #ECEEF2;border-radius:21px;box-shadow:var(--shadow-card);min-width:0;padding:23px 23px 21px}
.zov-chead{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:18px}
.zov-chead h2{font-size:15px;font-weight:800;letter-spacing:-.36px;margin:0 0 5px}
.zov-chead p{font-size:11px;color:#989BA5;margin:0;line-height:1.45}
.zov-caction{display:flex;align-items:center;gap:5px;color:#8A4862;font-size:11px;font-weight:800;background:none;border:0;padding:2px 0;white-space:nowrap;cursor:pointer;font-family:inherit}
.zov-caction .material-symbols-outlined{font-size:15px}
.zov-caction:hover{text-decoration:underline}
.zov-chips{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}
.zov-chip{border:1px solid #E8E9ED;background:#fff;border-radius:8px;padding:6px 9px;font-size:10.5px;font-weight:750;color:#989AA4;cursor:pointer;font-family:inherit}
.zov-chip.is-on{background:#702E47;border-color:#702E47;color:#fff}
.zov-legend{display:flex;align-items:center;gap:14px;color:#8A8D96;font-size:10px;font-weight:650;margin-top:11px}
.zov-ldot{height:7px;width:7px;display:inline-block;border-radius:50%;background:#7A334E;margin-right:5px}
.zov-ldot.gray{background:#C6C6CE}
.zov-chart{position:relative;width:100%;height:229px;min-height:180px}
.zov-chart svg{width:100%;height:100%;overflow:visible;display:block}
.zov-marker{position:absolute;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;background:#78314E;border:3px solid #fff;box-shadow:0 2px 6px #78314E40;pointer-events:none}
.zov-empty{position:absolute;inset:0;display:grid;place-items:center;color:#A2A6B0;font-size:12px}
.zov-tip{position:absolute;top:20px;pointer-events:none;background:#1E2027;color:#fff;border-radius:10px;padding:10px 12px;font-size:11px;box-shadow:0 12px 30px #0002;z-index:2;line-height:1.5;white-space:nowrap}
.zov-tip strong{font-size:13px}
.zov-tip span{color:#C5BAC1}
.zov-xl{display:flex;justify-content:space-between;margin-top:2px;font-size:10px;color:#AAADB4;padding-left:4px}
.zov-cfoot{border-top:1px solid #F0F0F2;margin-top:17px;padding-top:14px;display:flex;justify-content:space-between;align-items:center;gap:8px;color:#9A9BA2;font-size:10.5px;flex-wrap:wrap}
.zov-cfoot>span{display:flex;align-items:center;gap:5px}
.zov-cfoot .material-symbols-outlined{font-size:15px}
.zov-insight{color:#497E6E;font-weight:700}
.zov-insight.down{color:#B5525D}

.zov-donutbox{display:flex;align-items:center;gap:25px;margin:9px 0 19px}
.zov-donutwrap{width:156px;height:156px;position:relative;flex-shrink:0;display:grid;place-items:center}
.zov-donut{width:156px;height:156px;transform:rotate(-90deg)}
.zov-dmid{position:absolute;display:flex;flex-direction:column;align-items:center;justify-content:center}
.zov-dmid strong{font-size:26px;letter-spacing:-1px;line-height:1.3;font-variant-numeric:tabular-nums}
.zov-dmid span{font-size:10px;color:#A1A3AA}
.zov-srcs{flex:1;display:flex;flex-direction:column;gap:14px;min-width:0}
.zov-src{display:flex;align-items:center;justify-content:space-between;gap:10px;color:#4D505A;font-size:11px;font-weight:650}
.zov-src span{display:flex;align-items:center;gap:7px;min-width:0}
.zov-src b{font-size:11px;color:#292C34;white-space:nowrap}
.zov-sdot{width:9px;height:9px;border-radius:3px;flex-shrink:0}
.zov-sfoot{display:flex;gap:8px;align-items:center;border-top:1px solid #F0F0F2;padding-top:15px;color:#969BA5;font-size:10.5px;line-height:1.6}
.zov-sfoot .material-symbols-outlined{font-size:15px;color:#9A6278}

.zov-acts{display:flex;flex-direction:column}
.zov-act{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #F1F1F3}
.zov-act:last-child{border-bottom:0;padding-bottom:0}
.zov-aicon{height:37px;width:37px;display:grid;place-items:center;border-radius:12px;background:#EFF6F2;color:#218B66;flex-shrink:0}
.zov-aicon .material-symbols-outlined{font-size:18px}
.zov-aicon.wine{background:#F7EDF0;color:#87445D}
.zov-aicon.gold{background:#FCF5EA;color:#B68645}
.zov-aicon.gray{background:#F1F2F5;color:#6F747E}
.zov-ainfo{flex:1;min-width:0}
.zov-ainfo strong{display:block;font-size:11.5px;font-weight:750;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.zov-ainfo span{color:#A3A5AE;font-size:10.5px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.zov-atime{font-size:10px;color:#A8ABB2;flex-shrink:0;text-align:right}
.zov-none{color:#A2A6B0;font-size:12px;padding:14px 0}

.zov-attn{background:linear-gradient(160deg,#32232E,#261D27 80%);color:#fff;border:0;position:relative;overflow:hidden}
.zov-attn::before{content:'';position:absolute;height:240px;width:240px;border-radius:50%;background:#813C5B;filter:blur(65px);opacity:.22;right:-100px;top:-140px;pointer-events:none}
.zov-attn .zov-chead h2{color:#fff}
.zov-attn .zov-chead p{color:#A59AA4}
.zov-atag{background:#483440;color:#EDC5D1;border-radius:50px;padding:5px 8px;font-size:9px;font-weight:800;letter-spacing:.06em;white-space:nowrap}
.zov-aitems{position:relative;display:flex;flex-direction:column;gap:10px;margin-top:20px}
.zov-aitem{display:flex;gap:10px;align-items:center;padding:13px;border:1px solid #50404D;background:#3E303B;border-radius:13px;color:inherit;text-align:left;font-family:inherit;cursor:pointer;width:100%;transition:background .2s}
.zov-aitem:hover{background:#463541}
.zov-aiicon{height:30px;width:30px;background:#654350;border-radius:9px;display:grid;place-items:center;color:#FFCAD8;flex-shrink:0}
.zov-aiicon .material-symbols-outlined{font-size:16px}
.zov-aitem strong{display:block;color:#fff;font-size:11.5px;font-weight:750;margin-bottom:3px}
.zov-aitem small{display:block;font-size:10px;color:#BDADB9}
.zov-aitem .arr{margin-left:auto;color:#B49CA9;font-size:16px}
.zov-acta{position:relative;width:100%;margin-top:16px;color:#392632;background:#fff;border:0;border-radius:11px;padding:11px;font-weight:800;font-size:11px;display:flex;justify-content:center;align-items:center;gap:7px;cursor:pointer;font-family:inherit}
.zov-acta:hover{background:#F6EAF0}
.zov-acta .material-symbols-outlined{font-size:16px}

@media(max-width:1250px){.zov-donutbox{gap:10px}.zov-donutwrap,.zov-donut{width:124px;height:124px}.zov-srcs{gap:12px}.zov-src{font-size:10.5px}.zov-card{padding:20px}.zov-metrics{gap:11px}.zov-metric{padding:17px 16px}.zov-spark{width:70px;opacity:.55}}
@media(max-width:1080px){.zov-grid,.zov-grid.b{grid-template-columns:minmax(0,1.25fr) minmax(285px,1fr)}.zov-spark{display:none}.zov-mnum{font-size:28px}}
@media(max-width:740px){.zov-grid,.zov-grid.b{grid-template-columns:1fr}.zov-metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.zov-spark{display:block;width:64px;height:32px}.zov-fr{display:none}.zov-chart{height:240px}.zov-donutbox{justify-content:center;gap:30px}.zov-donutwrap,.zov-donut{width:150px;height:150px}.zov-srcs{max-width:230px}}
@media(max-width:510px){.zov-filters{margin-bottom:14px}.zov-metrics{gap:10px;margin-bottom:11px}.zov-metric{min-height:144px;border-radius:17px;padding:14px}.zov-mhead{font-size:10px;line-height:1.3}.zov-micon{width:27px;height:27px}.zov-mnum{font-size:26px;margin:13px 0 3px;letter-spacing:-1px}.zov-msub{font-size:9px;gap:4px;flex-wrap:wrap}.zov-delta{font-size:9px;padding:3px 4px}.zov-spark{width:46px;height:28px;right:12px;bottom:44px;opacity:.5}.zov-grid,.zov-grid.b{gap:11px;margin-bottom:11px}.zov-card{border-radius:17px;padding:18px}.zov-chead h2{font-size:14px}.zov-chead{flex-wrap:wrap}.zov-chips{justify-content:flex-start}.zov-chart{height:200px}.zov-cfoot{font-size:9.5px}.zov-donutbox{margin-top:5px;gap:12px}.zov-donutwrap,.zov-donut{width:126px;height:126px}.zov-srcs{gap:11px}.zov-src{font-size:10px}.zov-dmid strong{font-size:23px}}
`;

/* ── formatting ─────────────────────────────────────────────────── */

const fmt = (n: number) => Math.round(n || 0).toLocaleString('cs-CZ');
const dec = (n: number, d = 1) => n.toFixed(d).replace('.', ',');
const dl = (d: Date) => d.getDate() + '. ' + (d.getMonth() + 1) + '.';
const WD = ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'];
const plural = (n: number, one: string, few: string, many: string) => (n === 1 ? one : n >= 2 && n <= 4 ? few : many);
const hmFmt = new Intl.DateTimeFormat('cs-CZ', { timeZone: 'Europe/Prague', hour: '2-digit', minute: '2-digit' });

type Delta = { txt: string; dir: 'up' | 'down' | 'flat' };
function relDelta(cur: number, prev: number): Delta {
  if (!prev) return cur ? { txt: 'nově', dir: 'up' } : { txt: 'beze změny', dir: 'flat' };
  const d = ((cur - prev) / prev) * 100;
  if (Math.abs(d) < 0.05) return { txt: '0 %', dir: 'flat' };
  return { txt: (d > 0 ? '+' : '−') + dec(Math.abs(d)) + ' %', dir: d > 0 ? 'up' : 'down' };
}
function ppDelta(cur: number, prev: number): Delta {
  const d = cur - prev;
  if (Math.abs(d) < 0.05) return { txt: '0 p. b.', dir: 'flat' };
  return { txt: (d > 0 ? '+' : '−') + dec(Math.abs(d)) + ' p. b.', dir: d > 0 ? 'up' : 'down' };
}

const contacts = (g: any) => g.email + g.whatsapp + g.phone;
const rate = (a: any) => (a.visits ? (a.conv / a.visits) * 100 : 0);
const metricOf: Record<ChartKey, (s: any) => number> = {
  visits: (s) => s.visits,
  conv: (s) => s.conv,
  enquiry: (s) => s.goals.enquiry,
};
const CHART_L: Record<ChartKey, [string, string, string]> = {
  visits: ['Návštěvy', 'návštěv', 'Návštěvy webu'],
  conv: ['S kontaktem', 'návštěv s kontaktem', 'Návštěvy, které skončily kontaktem'],
  enquiry: ['Poptávky', 'odeslaných formulářů', 'Odeslané poptávkové formuláře'],
};

/** Sums a daily series into `n` buckets (for the sparklines). */
function buckets(series: any[], n: number, f: (s: any) => number) {
  const size = Math.max(1, Math.ceil(series.length / n)), out: number[] = [];
  for (let i = 0; i < series.length; i += size) out.push(series.slice(i, i + size).reduce((t, s) => t + f(s), 0));
  return out.length > 1 ? out : [out[0] || 0, out[0] || 0];
}
function sparkPath(values: number[], w: number, h: number, p: number) {
  const min = Math.min(...values), max = Math.max(...values), diff = max - min || 1;
  return values.map((n, i) => `${i ? 'L' : 'M'}${((i / (values.length - 1)) * w).toFixed(2)} ${(p + (1 - (n - min) / diff) * (h - p * 2)).toFixed(2)}`).join(' ');
}
const smooth = (pts: number[][]) => pts.reduce((r, p, i) => {
  if (i === 0) return `M ${p[0]} ${p[1]}`;
  const pre = pts[i - 1], mx = (pre[0] + p[0]) / 2;
  return r + ` C ${mx} ${pre[1]} ${mx} ${p[1]} ${p[0]} ${p[1]}`;
}, '');

const Icon = ({ n }: { n: string }) => <span className="material-symbols-outlined" aria-hidden="true">{n}</span>;

/* ── component ──────────────────────────────────────────────────── */

export const Overview = React.forwardRef<OverviewHandle, OverviewProps>(function Overview({ articles, go, onOpenArticle, onNotify }, ref) {
  const [range, setRange] = React.useState<Range>(30);
  const [compare, setCompare] = React.useState(false);
  const [chart, setChart] = React.useState<ChartKey>('visits');
  const [st, setSt] = React.useState<{ ready: boolean; loading: boolean; error: string; stamp: Date | null; ver: number }>({ ready: false, loading: true, error: '', stamp: null, ver: 0 });
  const [hover, setHover] = React.useState(-1);
  const svgRef = React.useRef<SVGSVGElement>(null);

  const load = React.useCallback((refresh: boolean) => {
    setSt((s) => ({ ...s, loading: true }));
    return S.ensure(range * 2 + 1, refresh)
      .then(() => setSt((s) => ({ ready: true, loading: false, error: '', stamp: new Date(), ver: s.ver + 1 })))
      .catch((e: Error) => setSt((s) => ({ ...s, loading: false, error: e.message || 'Statistiku se nepodařilo načíst.' })));
  }, [range]);

  React.useEffect(() => {
    load(false);
    const t = setInterval(() => load(true), 60000);
    return () => clearInterval(t);
  }, [load]);

  const agg = React.useMemo(() => {
    if (!st.ready) return null;
    const ds = S.dataset();
    return { a: S.aggregate(ds, range, 'all'), p: S.aggregate(ds, range, 'all', { offset: range }), ds };
  }, [st.ready, st.ver, range]);

  /* metric cards */
  const cards = agg ? (() => {
    const { a, p } = agg;
    return [
      { key: 'visits', label: 'Návštěvy webu', icon: 'visibility', value: fmt(a.visits), delta: relDelta(a.visits, p.visits), spark: buckets(a.series, 12, (s) => s.visits), color: '#9F7393', run: () => go('analytics') },
      { key: 'enquiry', label: 'Odeslané poptávky', icon: 'edit_note', value: fmt(a.goals.enquiry), delta: relDelta(a.goals.enquiry, p.goals.enquiry), spark: buckets(a.series, 12, (s) => s.goals.enquiry), color: '#812844', primary: true, run: () => go('enquiries') },
      { key: 'contacts', label: 'Klepnutí na kontakt', icon: 'call', value: fmt(contacts(a.goals)), delta: relDelta(contacts(a.goals), contacts(p.goals)), spark: buckets(a.series, 12, (s) => contacts(s.goals)), color: '#60A48B', run: () => go('analytics', 'all', { tab: 'Tlačítka' }) },
      { key: 'rate', label: 'Míra kontaktu', icon: 'percent', value: dec(rate(a)) + ' %', delta: ppDelta(rate(a), rate(p)), spark: buckets(a.series, 12, (s) => s.conv).map((c, i) => { const v = buckets(a.series, 12, (s) => s.visits)[i]; return v ? c / v : 0; }), color: '#A4A6B4', run: () => go('analytics', 'all', { tab: 'Návštěvy' }) },
    ];
  })() : [
    { key: 'visits', label: 'Návštěvy webu', icon: 'visibility' }, { key: 'enquiry', label: 'Odeslané poptávky', icon: 'edit_note', primary: true },
    { key: 'contacts', label: 'Klepnutí na kontakt', icon: 'call' }, { key: 'rate', label: 'Míra kontaktu', icon: 'percent' },
  ] as any[];

  /* chart */
  const W = 660, H = 225, L = 4, R = 645, T = 12, B = 208;
  const chartData = agg ? (() => {
    const f = metricOf[chart];
    const vals: number[] = agg.a.series.map(f), prev: number[] = agg.p.series.map(f);
    const max = Math.max(1, ...vals, ...(compare ? prev : [])) * 1.15;
    const x = (i: number) => L + ((R - L) * i) / Math.max(1, vals.length - 1);
    const y = (v: number) => B - (v / max) * (B - T);
    return { vals, prev, x, y, pts: vals.map((v, i) => [x(i), y(v)]), ppts: prev.map((v, i) => [x(i), y(v)]) };
  })() : null;
  const onMove = (e: React.MouseEvent) => {
    if (!chartData || !svgRef.current) return;
    const r = svgRef.current.getBoundingClientRect(), px = ((e.clientX - r.left) / r.width) * W;
    const n = chartData.vals.length;
    setHover(Math.max(0, Math.min(n - 1, Math.round(((px - L) / (R - L)) * (n - 1)))));
  };
  const xLabels = agg ? (() => {
    const s = agg.a.series, n = s.length, idx = [0, Math.round((n - 1) / 3), Math.round((2 * (n - 1)) / 3), n - 1];
    return idx.map((i, k) => (k === 3 ? 'Dnes' : dl(s[i].date)));
  })() : [];
  const total = (a: any) => (chart === 'visits' ? a.visits : chart === 'conv' ? a.conv : a.goals.enquiry);
  const trend = agg ? relDelta(total(agg.a), total(agg.p)) : null;

  /* sources donut */
  const sources = agg ? (() => {
    const total = agg.a.visits || 0;
    return Object.keys(SRC).map((k) => ({ k, label: (SRC as any)[k][0] as string, color: (SRC as any)[k][1] as string, n: agg.a.src[k] ? agg.a.src[k].n : 0 }))
      .filter((x) => x.n > 0).sort((x, y) => y.n - x.n)
      .map((x) => ({ ...x, pct: total ? (x.n / total) * 100 : 0 }));
  })() : [];
  const C = 2 * Math.PI * 47;
  let off = 0;

  /* activity feed: the latest meaningful events of the last 7 days */
  const activity = agg ? (() => {
    const out: any[] = [];
    for (const v of agg.ds.visits) {
      if (v.day > 7) continue;
      const dev = v.dev === 'm' ? 'mobil' : 'počítač';
      v.ev.forEach((e: any, i: number) => {
        const at = v.start + (e.at || 0);
        let it: any = null;
        if (e.k === 'enquiry') it = { icon: 'edit_note', tone: 'wine', title: 'Odeslaný poptávkový formulář', sub: (e.l || 'bez prohlídky') + ' · ' + dev };
        else if (e.k === 'click' && (e.c === 'email' || e.c === 'whatsapp' || e.c === 'phone')) it = { icon: e.c === 'email' ? 'mail' : e.c === 'phone' ? 'call' : 'chat', tone: 'wine', title: S.GOAL_L.cs[e.c][0], sub: S.pageName(e.p, 'cs') + ' · ' + S.areaName(e.a, 'cs') + ' · ' + dev };
        else if (e.k === 'copy') it = { icon: 'content_copy', tone: 'gold', title: e.c === 'email' ? 'Zkopírovaný e-mail' : 'Zkopírovaný telefon', sub: S.pageName(e.p, 'cs') + ' · ' + dev };
        else if (e.k === 'click' && e.c === 'tour') it = { icon: 'map', tone: 'gold', title: 'Klik na prohlídku · ' + S.clickLabel('tour', e.l), sub: S.pageName(e.p, 'cs') + ' · ' + S.areaName(e.a, 'cs') };
        else if (e.k === 'click' && e.c === 'form') it = { icon: 'ads_click', tone: 'wine', title: 'Klik na poptávku', sub: S.pageName(e.p, 'cs') + ' · ' + S.areaName(e.a, 'cs') };
        else if (e.k === 'page' && i === 0) it = { icon: e.p.startsWith('/blog/') ? 'menu_book' : 'visibility', tone: '', title: S.pageName(e.p, 'cs'), sub: 'Nová návštěva · ' + (v.ref || 'přímo') + ' · ' + dev };
        if (it) out.push({ ...it, at, day: v.day, key: v.fullId + '|' + i });
      });
    }
    out.sort((x, y) => y.at - x.at);
    return out.slice(0, 5).map((x) => ({ ...x, time: (x.day === 0 ? '' : x.day === 1 ? 'včera ' : dl(new Date(x.at * 1000)) + ' ') + hmFmt.format(new Date(x.at * 1000)) }));
  })() : [];

  /* needs attention */
  const drafts = articles.filter((a) => a.status === 'draft');
  const scheduled = articles.filter((a) => a.status === 'scheduled').sort((x, y) => (x.date < y.date ? -1 : 1));
  const attention: { icon: string; title: string; sub: string; run: () => void }[] = [];
  if (agg) {
    const n = agg.a.goals.enquiry;
    attention.push({ icon: 'mark_email_unread', title: `${fmt(n)} ${plural(n, 'odeslaná poptávka', 'odeslané poptávky', 'odeslaných poptávek')}`, sub: `Za ${range} dní · formulář dokončí ${agg.a.formViews ? dec((agg.a.formSent / agg.a.formViews) * 100) + ' %' : '–'} návštěv. Odpovědi v e-mailu.`, run: () => go('enquiries') });
  }
  if (scheduled.length) attention.push({ icon: 'event', title: `${scheduled.length} ${plural(scheduled.length, 'naplánovaný článek', 'naplánované články', 'naplánovaných článků')}`, sub: `Další: ${titlePlain(scheduled[0]) || scheduled[0].slug} · ${scheduled[0].date}`, run: () => onOpenArticle(scheduled[0].slug) });
  if (drafts.length) attention.push({ icon: 'edit_document', title: `${drafts.length} ${plural(drafts.length, 'rozepsaný článek', 'rozepsané články', 'rozepsaných článků')}`, sub: 'Koncepty čekají na dokončení a publikaci', run: () => go('journal', undefined, { filter: 'draft' }) });
  if (agg) {
    const d = ppDelta(rate(agg.a), rate(agg.p));
    if (d.dir === 'down') attention.push({ icon: 'trending_down', title: 'Ověřit pokles kontaktů', sub: `${d.txt} proti předchozím ${range} dnům`, run: () => go('analytics') });
    else attention.push({ icon: 'trending_up', title: d.dir === 'up' ? 'Míra kontaktu roste' : 'Míra kontaktu je stabilní', sub: `${d.txt} proti předchozím ${range} dnům`, run: () => go('analytics') });
  }

  /* CSV export */
  React.useImperativeHandle(ref, () => ({
    exportCsv: () => {
      if (!agg) { onNotify('Statistika ještě není načtená.', true); return; }
      const { a, p } = agg;
      const iso = (d: Date) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      const rows: (string | number)[][] = [
        ['Metrika', 'Hodnota', 'Předchozí období', 'Období'],
        ['Návštěvy webu', a.visits, p.visits, range + ' dní'],
        ['Odeslané poptávky', a.goals.enquiry, p.goals.enquiry, range + ' dní'],
        ['Klepnutí na kontakt', contacts(a.goals), contacts(p.goals), range + ' dní'],
        ['Míra kontaktu (%)', dec(rate(a), 2), dec(rate(p), 2), range + ' dní'],
        [],
        ['Den', 'Návštěvy', 'S kontaktem', 'Formulář', 'E-mail', 'WhatsApp', 'Telefon'],
        ...a.series.map((s: any) => [iso(s.date), s.visits, s.conv, s.goals.enquiry, s.goals.email, s.goals.whatsapp, s.goals.phone]),
      ];
      const esc = (x: unknown) => { const s = String(x ?? ''); return /[";\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
      const url = URL.createObjectURL(new Blob(['﻿' + rows.map((r) => r.map(esc).join(';')).join('\r\n')], { type: 'text/csv;charset=utf-8' }));
      const el = document.createElement('a');
      el.href = url; el.download = `zuzapragtour-prehled-${range}dni.csv`;
      document.body.appendChild(el); el.click(); el.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      onNotify('CSV export je připravený.');
    },
  }), [agg, range, onNotify]);

  const liveCls = st.error ? 'is-err' : !st.ready ? 'is-wait' : '';
  const liveTxt = st.error ? 'Data nedostupná · zkusit znovu' : !st.ready ? 'Načítá se…' : `Živá data · ${st.stamp ? hmFmt.format(st.stamp) : ''}`;

  return (
    <div className="zov">
      <style>{CSS}</style>
      <div className="zov-filters">
        <div className="zov-fl">
          <span className="zov-flabel">Období</span>
          <div className="zov-fgroup" role="group" aria-label="Období">
            {([7, 30, 90] as Range[]).map((d) => (
              <button type="button" key={d} className={`zov-f ${range === d ? 'is-on' : ''}`} aria-pressed={range === d} onClick={() => { setRange(d); setHover(-1); }}>{d} dní</button>
            ))}
          </div>
          <button type="button" className={`zov-live ${liveCls}`} onClick={() => load(true)} title="Obnovit data">{liveTxt}</button>
        </div>
        <div className="zov-fr">
          <button type="button" className={`zov-switch ${compare ? 'is-on' : ''}`} aria-pressed={compare} onClick={() => setCompare(!compare)}>
            <span className="zov-track"><span className="zov-knob" /></span>Porovnat s minulým obdobím
          </button>
        </div>
      </div>

      {st.error && (
        <div className="zov-err">
          <Icon n="cloud_off" />
          <span>Statistiku webu se nepodařilo načíst ({st.error}). Obsah a články fungují dál.</span>
          <button type="button" className="zcc-btn ghost" onClick={() => load(true)}>Zkusit znovu</button>
        </div>
      )}

      <div className="zov-metrics">
        {cards.map((c: any) => (
          <button type="button" key={c.key} className={`zov-metric ${c.primary ? 'is-primary' : ''}`} onClick={c.run} disabled={!c.run}>
            <div className="zov-mhead"><span>{c.label}</span><span className="zov-micon"><Icon n={c.icon} /></span></div>
            <div className="zov-mnum">{c.value ?? '–'}</div>
            <div className="zov-msub">
              {c.delta ? (<><span className={`zov-delta ${c.delta.dir}`}><Icon n={c.delta.dir === 'down' ? 'trending_down' : c.delta.dir === 'up' ? 'trending_up' : 'trending_flat'} />{c.delta.txt}</span> oproti minule</>) : <span>&nbsp;</span>}
            </div>
            {c.spark && (
              <svg className="zov-spark" viewBox="0 0 105 45" aria-hidden="true">
                <path d={sparkPath(c.spark, 105, 42, 4)} fill="none" stroke={c.color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        ))}
      </div>

      <div className="zov-grid">
        <section className="zov-card">
          <div className="zov-chead">
            <div>
              <h2>Vývoj návštěvnosti</h2>
              <p>{CHART_L[chart][2]} za posledních {range} dní</p>
              <div className="zov-legend">
                <span><i className="zov-ldot" />{CHART_L[chart][0]}</span>
                {compare && <span><i className="zov-ldot gray" />Předchozích {range} dní</span>}
              </div>
            </div>
            <div className="zov-chips">
              {(Object.keys(CHART_L) as ChartKey[]).map((k) => (
                <button type="button" key={k} className={`zov-chip ${chart === k ? 'is-on' : ''}`} onClick={() => { setChart(k); setHover(-1); }}>{CHART_L[k][0]}</button>
              ))}
            </div>
          </div>
          <div className="zov-chart" onMouseMove={onMove} onMouseLeave={() => setHover(-1)}>
            <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label={`${CHART_L[chart][2]} za ${range} dní`}>
              <defs>
                <linearGradient id="zovFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A35278" stopOpacity=".24" />
                  <stop offset="100%" stopColor="#A35278" stopOpacity=".008" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3].map((i) => { const yy = T + ((B - T) * i) / 3; return <line key={i} x1={L} x2={R} y1={yy} y2={yy} stroke="#F0F0F3" strokeWidth="1" vectorEffect="non-scaling-stroke" />; })}
              {chartData && (
                <>
                  <path d={`${smooth(chartData.pts)} L ${chartData.pts[chartData.pts.length - 1][0]} ${B} L ${chartData.pts[0][0]} ${B} Z`} fill="url(#zovFill)" />
                  {compare && <path d={smooth(chartData.ppts)} fill="none" stroke="#C6C6CE" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />}
                  <path d={smooth(chartData.pts)} fill="none" stroke="#78314E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                  {hover >= 0 && (
                    <>
                      <line x1={chartData.x(hover)} x2={chartData.x(hover)} y1={0} y2={H} stroke="#D4BDC6" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
                    </>
                  )}
                </>
              )}
            </svg>
            {chartData && hover >= 0 && <span className="zov-marker" style={{ left: `${(chartData.x(hover) / W) * 100}%`, top: `${(chartData.y(chartData.vals[hover]) / H) * 100}%` }} />}
            {!chartData && <div className="zov-empty">{st.error ? 'Data nejsou k dispozici' : 'Načítá se statistika…'}</div>}
            {chartData && hover >= 0 && agg && (
              <div className="zov-tip" style={{ left: `clamp(2px, calc(${(chartData.x(hover) / W) * 100}% - 60px), calc(100% - 150px))` }}>
                <span>{WD[agg.a.series[hover].date.getDay()]} {dl(agg.a.series[hover].date)}</span><br />
                <strong>{fmt(chartData.vals[hover])} {CHART_L[chart][1]}</strong>
                {compare && <><br /><span>předtím {fmt(chartData.prev[hover] || 0)}</span></>}
              </div>
            )}
          </div>
          <div className="zov-xl">{xLabels.map((x, i) => <span key={i}>{x}</span>)}</div>
          <div className="zov-cfoot">
            <span><Icon n="info" /> Anonymní měření bez cookies · časy v pražském čase</span>
            {trend && (
              <span className={`zov-insight ${trend.dir === 'down' ? 'down' : ''}`}>
                <Icon n={trend.dir === 'down' ? 'trending_down' : trend.dir === 'up' ? 'trending_up' : 'trending_flat'} />
                {trend.dir === 'up' ? `Trend se zlepšuje (${trend.txt})` : trend.dir === 'down' ? `Trend slábne (${trend.txt})` : 'Trend je stabilní'}
              </span>
            )}
          </div>
        </section>

        <section className="zov-card">
          <div className="zov-chead">
            <div><h2>Odkud lidé přicházejí</h2><p>Rozložení zdrojů návštěvnosti</p></div>
            <button type="button" className="zov-caction" onClick={() => go('analytics', 'all', { tab: 'Cesty a zdroje' })}>Detail <Icon n="arrow_forward" /></button>
          </div>
          <div className="zov-donutbox">
            <div className="zov-donutwrap">
              <svg className="zov-donut" viewBox="0 0 120 120" aria-label="Podíl návštěv podle zdroje">
                <circle cx="60" cy="60" r="47" fill="none" stroke="#F0F1F5" strokeWidth="13" />
                {sources.map((s) => {
                  const el = <circle key={s.k} cx="60" cy="60" r="47" fill="none" stroke={s.color} strokeWidth="13" strokeDasharray={`${((C * s.pct) / 100).toFixed(2)} ${C}`} strokeDashoffset={((-C * off) / 100).toFixed(2)} />;
                  off += s.pct;
                  return el;
                })}
              </svg>
              <div className="zov-dmid"><strong>{agg ? fmt(agg.a.visits) : '–'}</strong><span>návštěv</span></div>
            </div>
            <div className="zov-srcs">
              {sources.map((s) => (
                <div className="zov-src" key={s.k}><span><i className="zov-sdot" style={{ background: s.color }} />{s.label}</span><b>{dec(s.pct, s.pct < 10 ? 1 : 0)} %</b></div>
              ))}
              {agg && !sources.length && <div className="zov-none">Za toto období zatím žádné návštěvy.</div>}
            </div>
          </div>
          <div className="zov-sfoot">
            <Icon n="info" />
            <span>{sources.length ? `Nejvíc návštěv přichází ze zdroje „${sources[0].label}“ (${dec(sources[0].pct, 0)} %). Zdroj = odkazující web, přímo = bez odkazu.` : 'Zdroj = odkazující web, přímo = bez odkazu.'}</span>
          </div>
        </section>
      </div>

      <div className="zov-grid b">
        <section className="zov-card">
          <div className="zov-chead">
            <div><h2>Co se právě děje</h2><p>Poslední události a interakce návštěvníků</p></div>
            <button type="button" className="zov-caction" onClick={() => go('analytics', 'all', { tab: 'Živě' })}>Zobrazit vše <Icon n="arrow_forward" /></button>
          </div>
          <div className="zov-acts">
            {activity.map((x) => (
              <div className="zov-act" key={x.key}>
                <span className={`zov-aicon ${x.tone}`}><Icon n={x.icon} /></span>
                <div className="zov-ainfo"><strong>{x.title}</strong><span>{x.sub}</span></div>
                <span className="zov-atime">{x.time}</span>
              </div>
            ))}
            {agg && !activity.length && <div className="zov-none">Za posledních 7 dní žádné události.</div>}
            {!agg && <div className="zov-none">{st.error ? 'Události nejsou k dispozici.' : 'Načítá se…'}</div>}
          </div>
        </section>

        <section className="zov-card zov-attn">
          <div className="zov-chead">
            <div><h2>Vyžaduje pozornost</h2><p>Rychlý přehled toho, co je potřeba řešit</p></div>
            <span className="zov-atag">{attention.length} {plural(attention.length, 'BOD', 'BODY', 'BODŮ')}</span>
          </div>
          <div className="zov-aitems">
            {attention.map((x) => (
              <button type="button" className="zov-aitem" key={x.title} onClick={x.run}>
                <span className="zov-aiicon"><Icon n={x.icon} /></span>
                <div><strong>{x.title}</strong><small>{x.sub}</small></div>
                <span className="material-symbols-outlined arr" aria-hidden="true">arrow_forward</span>
              </button>
            ))}
          </div>
          <button type="button" className="zov-acta" onClick={() => go('enquiries')}>Přejít na poptávky <Icon n="arrow_forward" /></button>
        </section>
      </div>
    </div>
  );
});

export default Overview;
