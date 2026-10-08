// @ts-nocheck — ported 1:1 from the Logic class of
// design_handoff_admin_dashboard/Admin Dashboard v2.dc.html. Changes against
// the prototype: real data (statsData.ts) instead of the mock layer, a polled
// live feed instead of the simulated ticker, real event times in visit
// timelines, a working "Obnovit", and the sidebar wired to the admin.
import React from 'react';
import Stats from './statsData';
import { DashboardView, DASHBOARD_CSS } from './DashboardView';

const h = React.createElement;
const fmt = (n) => Math.round(n || 0).toLocaleString('cs-CZ');
const pct = (a, b) => (b ? ((a / b) * 100).toFixed(1).replace('.', ',') + ' %' : '–');
const pc1 = (x) => x.toFixed(1).replace('.', ',');
const dl = (d) => d.getDate() + '. ' + (d.getMonth() + 1) + '.';
const two = (n) => String(n).padStart(2, '0');
const hm = (d) => two(d.getHours()) + ':' + two(d.getMinutes());
const clip = (s, n) => (s && s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s || '');
const dur = (s) => (s < 60 ? s + ' s' : Math.floor(s / 60) + ' min' + (s % 60 ? ' ' + (s % 60) + ' s' : ''));
const mmss = (s) => Math.floor(s / 60) + ':' + two(s % 60);
const plural = (n, a, b, c) => (n === 1 ? a : n >= 2 && n <= 4 ? b : c);
const dateCz = (s) => { const p = s.split('-').map(Number); return p[2] + '. ' + p[1] + '. ' + p[0]; };
const chunk = (arr, step) => { const out = []; for (let i = 0; i < arr.length; i += step) out.push(arr.slice(i, i + step)); return out; };
const DOW = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'];
const WEEK = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
const CONTACT = { whatsapp: 1, phone: 1, email: 1 };
const GOALS = ['enquiry', 'email', 'whatsapp', 'phone'];
const GM = {
  enquiry: { l: 'Formulář odeslán', s: 'Formulář', c: '#6B1F2A', bg: '#F6E7E2', i: 'edit_note' },
  email: { l: 'E-mail otevřen', s: 'E-mail', c: '#4A3D7A', bg: '#EAE6F3', i: 'mail' },
  whatsapp: { l: 'WhatsApp otevřen', s: 'WhatsApp', c: '#25633A', bg: '#E3F1E6', i: 'chat' },
  phone: { l: 'Klepnuto na telefon', s: 'Telefon', c: '#8C6A3C', bg: '#F3ECDD', i: 'call' },
};
const OWN = { email: 'otevře e-mailový program', phone: 'otevře aplikaci Telefon', whatsapp: 'otevře WhatsApp' };
const SRC = { search: ['Vyhledávače', '#1A1714'], direct: ['Přímo', '#A89880'], social: ['Sociální sítě', '#B5654A'], review: ['Recenzní weby', '#5E7A5A'], ai: ['AI asistenti', '#3D5A80'], other: ['Ostatní', '#D9CFBC'] };
const SRC_OPTS = [['all', 'Všechny zdroje'], ['search', 'Vyhledávače'], ['direct', 'Přímo'], ['social', 'Sociální sítě'], ['review', 'Recenze'], ['ai', 'AI']];
const KIND = { article: 'Článek', tour: 'Prohlídka', home: 'Úvodní stránka', other: 'Ostatní' };
const TABS = [['overview', 'Přehled', 'space_dashboard'], ['live', 'Živě', 'sensors'], ['content', 'Obsah', 'auto_stories'], ['buttons', 'Tlačítka', 'touch_app'], ['visits', 'Návštěvy', 'groups'], ['flows', 'Cesty a zdroje', 'alt_route']];
const TAB_PROP = { 'Přehled': 'overview', 'Živě': 'live', 'Obsah': 'content', 'Tlačítka': 'buttons', 'Návštěvy': 'visits', 'Cesty a zdroje': 'flows' };
const RANGES = [[7, '7 dní'], [30, '30 dní'], [90, '90 dní'], [365, '1 rok']];
const DEVS = [['all', 'Vše'], ['m', 'Mobil'], ['d', 'Počítač']];
const BF = [['all', 'Vše'], ['contact', 'Kontakt'], ['form', 'K poptávce'], ['tour', 'Prohlídky'], ['nav', 'Navigace'], ['external', 'Externí'], ['other', 'Ostatní']];
const VF = [['all', 'Vše'], ['conv', 'S kontaktem'], ['form', 'Odeslaný formulář'], ['read', 'Četli článek'], ['bounce', 'Odešli hned']];
const MAPS = {
  home: { label: 'Úvodní stránka', path: '/', match: (p) => p === '/', areas: ['header', 'hero', 'tours', 'gallery', 'reviews', 'closing-cta', 'footer', 'sticky-bar', 'blog-promo'] },
  tour: { label: 'Prohlídka', path: '/tours/prager-burg', match: (p) => p.startsWith('/tours/'), areas: ['header', 'hero', 'booking-card', 'related-tours', 'tripadvisor', 'footer'] },
  article: { label: 'Článek', path: '/blog/…', match: (p) => p.startsWith('/blog/'), areas: ['header', 'article', 'article-cta', 'related', 'sources', 'footer'] },
  form: { label: 'Poptávka', path: '/book', match: (p) => p === '/book' || p === '/contact', areas: ['header', 'contact-direct', 'form', 'main', 'footer'] },
};
const SPEED = { Pomalu: 4200, 'Normálně': 2600, Rychle: 1200 };
const GOAL_STEP = { '✓ Formular gesendet': 'enquiry', '✓ Anfrage gesendet': 'enquiry', '✓ E-Mail': 'email', '✓ WhatsApp': 'whatsapp', '✓ Anruf': 'phone' };
const bfOf = (c) => (CONTACT[c] ? 'contact' : c === 'form' || c === 'tour' || c === 'nav' || c === 'external' ? c : 'other');
const isGoal = (e) => e.k === 'enquiry' || (e.k === 'click' && !!CONTACT[e.c]);
const goalOf = (e) => (e.k === 'enquiry' ? 'enquiry' : e.c);
const zg = () => ({ enquiry: 0, email: 0, whatsapp: 0, phone: 0 });
const seg = (opts, cur, set) => opts.map(([k, label], i) => ({ label, bg: k === cur ? '#1A1714' : '#FFFFFF', fg: k === cur ? '#F5EFE4' : '#3A332C', sep: i ? '1px solid #D9CFBC' : '0', onClick: () => set(k) }));
const VIEW_PROP = { 'WhatsApp tlačítko': 'wa', 'Formuláře': 'forms', 'Túry': 'tours' };
const isForm = (p) => p === '/book' || p === '/contact';
const pgType = (p) => (p === '/' ? 'home' : p.startsWith('/tours/') ? 'tour' : isForm(p) ? 'form' : p.startsWith('/blog/') ? 'article' : 'other');
const ENTRY_L = { article: 'Článkem', tour: 'Stránkou prohlídky', home: 'Úvodní stránkou', form: 'Rovnou formulářem', other: 'Jinou stránkou' };
const PT_FROM = { home: 'Z úvodní stránky', tour: 'Z prohlídek', form: 'Z formuláře', article: 'Z článků', other: 'Odjinud' };
const OUT = {
  enquiry: ['Odeslali formulář', '#6B1F2A', '#F6E7E2', '#6B1F2A', 'Odeslal'],
  whatsapp: ['Napsali přes WhatsApp', '#25633A', '#E3F1E6', '#25633A', 'WhatsApp'],
  phone: ['Zavolali', '#8C6A3C', '#F3ECDD', '#8C6A3C', 'Telefon'],
  email: ['Napsali e-mail', '#4A3D7A', '#EAE6F3', '#4A3D7A', 'E-mail'],
  away: ['Pokračovali jinam, bez kontaktu', '#A89880', '#F0EBE2', '#6B6055', 'Odešel jinam'],
  left: ['Zavřeli web rovnou na formuláři', '#D9CFBC', '#F5F1EA', '#6B6055', 'Zavřel web'],
};
const FF = [['all', 'Vše'], ['sent', 'Odeslali'], ['direct', 'Ozvali se jinak'], ['none', 'Bez kontaktu']];
const TQ_L = { 'Ich bin noch unentschlossen': 'Ještě neví', '(ohne Tour)': 'Bez prohlídky' };
const WEEK_FULL = ['pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota', 'neděle'];
const median = (arr) => { if (!arr.length) return 0; const s = arr.slice().sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const dedupe = (ps) => ps.filter((p, i) => p !== ps[i - 1]);
const squeeze = (ps) => (ps.length > 5 ? ps.slice(0, 2).concat(['…'], ps.slice(-2)) : ps);
const chipF = (on) => ({ bg: on ? '#1A1714' : '#FFFFFF', fg: on ? '#F5EFE4' : '#3A332C', bd: on ? '#1A1714' : '#D9CFBC' });

export class StatsDashboard extends React.Component<any, any> {
  static defaultProps = { startTab: 'Přehled', compareDefault: true };
  state = { ready: false, tab: null, range: 30, dev: 'all', src: 'all', cmp: null, w: 1280, hover: -1, drawer: null, hmMode: 'visits', bf: 'all', bq: '', bmode: 'label', bsort: 'n', blimit: 25, mapPage: 'home', mapArea: null, aq: '', asort: 'views', scHover: null, vf: 'all', vlimit: 40, pconv: true, plimit: 10, skConv: true, palette: false, pq: '', psel: 0, live: [], liveN: 4, liveHist: [3, 4, 4, 5, 4, 3, 4, 5, 6, 5, 4, 4], loading: false, error: '', stamp: new Date(), view: null, navOpen: true, dh: -1, wf: 'all', wlimit: 30, ff: 'all', flimit: 30, fsMode: 'btn', fsLimit: 10, tsel: null };

  componentDidMount() {
    this._resize = () => this.setState({ w: window.innerWidth });
    this._key = (e) => this.onKey(e);
    window.addEventListener('resize', this._resize);
    window.addEventListener('keydown', this._key);
    this._resize();
    this.load(false);
  }
  componentDidUpdate(_pp, ps) {
    if (ps.range !== this.state.range) this.load(false);
    const live = (s) => (s.view || 'all') === 'all' && (s.tab || 'overview') === 'live';
    if (live(ps) !== live(this.state)) this.poll();
  }
  /** Loads what the current range (and the previous period) needs; `refresh` re-reads today. */
  async load(refresh) {
    const st = this.state, need = (st.range < 365 ? st.range * 2 : st.range) + 1;
    clearTimeout(this._lv);
    try {
      await Stats.ensure(need, refresh);
      const n = Stats.activeVisits(5).length;
      this.setState((s) => ({ ready: true, error: '', loading: false, stamp: new Date(), live: this.buildLive(), liveN: n, liveHist: s.liveHist.concat([n]).slice(-40) }));
      clearTimeout(this._fr);
      this._fr = setTimeout(() => this.forceUpdate(), 1900);
    } catch (e) {
      this.setState({ error: e.message || 'Statistiku se nepodařilo načíst.', loading: false });
    }
    this.poll();
  }
  /** Re-reads today every 10 s on the Živě tab, otherwise every minute. */
  poll() {
    clearTimeout(this._lv);
    const fast = this.view() === 'all' && this.tab() === 'live';
    this._lv = setTimeout(() => this.load(true), fast ? 10000 : 60000);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
    window.removeEventListener('keydown', this._key);
    clearTimeout(this._fr); clearTimeout(this._lv);
  }
  onKey(e) {
    const st = this.state;
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); this.setState({ palette: !st.palette, pq: '', psel: 0 }); return; }
    if (e.key === 'Escape') { if (st.palette) this.setState({ palette: false }); else if (st.drawer) this.setState({ drawer: null }); return; }
    if (!st.palette) return;
    const items = this._pItems || [];
    if (e.key === 'ArrowDown') { e.preventDefault(); this.setState({ psel: Math.min(items.length - 1, st.psel + 1) }); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); this.setState({ psel: Math.max(0, st.psel - 1) }); }
    else if (e.key === 'Enter' && items[st.psel]) { e.preventDefault(); items[st.psel].run(); }
  }

  buildLive() {
    const ds = Stats.dataset(), all = [];
    ds.visits.filter((v) => v.day <= 1).forEach((v) => v.ev.forEach((e, i) => all.push({ v, e, key: v.fullId + '|' + i, at: (v.start + (e.at || 0)) * 1000 })));
    all.sort((x, y) => y.at - x.at);
    const first = !this._seen, seen = this._seen || new Set(), now = Date.now();
    const out = all.slice(0, 40).map((x) => Object.assign(this.liveItem(x, x.at), { fresh: !first && !seen.has(x.key) ? now : 0 }));
    all.slice(0, 40).forEach((x) => seen.add(x.key));
    this._seen = seen;
    return out;
  }
  liveItem(x, at) {
    const S = Stats, v = x.v, e = x.e, goal = isGoal(e);
    let icon, color, ibg, text;
    if (e.k === 'page') { const art = e.p.startsWith('/blog/'); icon = art ? 'menu_book' : 'visibility'; color = '#3A332C'; ibg = '#F0EBE2'; text = (art ? 'Čte „' : 'Prohlíží „') + clip(S.pageName(e.p, 'cs'), 58) + '“'; }
    else if (goal) { const g = goalOf(e); icon = GM[g].i; color = GM[g].c; ibg = GM[g].bg; text = g === 'enquiry' ? 'Odeslal formulář · ' + e.l : GM[g].l + ' · ' + S.areaName(e.a, 'cs'); }
    else if (e.k === 'copy') { icon = 'content_copy'; color = GM[e.c].c; ibg = GM[e.c].bg; text = (e.c === 'email' ? 'Zkopíroval e-mail' : 'Zkopíroval telefon') + ' · ' + S.areaName(e.a, 'cs'); }
    else { icon = 'ads_click'; color = '#8C6A3C'; ibg = '#F3ECDD'; text = 'Klikl na „' + clip(S.clickLabel(e.c, e.l), 40) + '“ · ' + S.areaName(e.a, 'cs'); }
    this._lk = (this._lk || 0) + 1;
    return { k: this._lk, at, icon, color, ibg, text, goal, dev: v.dev === 'm' ? 'smartphone' : 'computer', sub: (v.dev === 'm' ? 'Mobil' : 'Počítač') + ' · ' + (v.ref || 'přímo') + ' · návštěva #' + v.id, page: e.k === 'page' ? e.p : null };
  }
  get S() { return Stats; }
  tab() { return this.state.tab || TAB_PROP[this.props.startTab] || 'overview'; }
  view() { return this.state.view || VIEW_PROP[this.props.startTab] || 'all'; }
  go(view) { return () => this.setState({ view, navOpen: true, drawer: null, hover: -1, dh: -1 }); }
  cmpOn() { const st = this.state; return st.range < 365 && (st.cmp != null ? st.cmp : this.props.compareDefault !== false); }
  filt() { const s = this.state.src; return s === 'all' ? null : (v) => this.S.srcGroup(v.ref) === s; }
  agg() {
    const st = this.state, k = st.range + '|' + st.dev + '|' + st.src + '|' + Stats.version;
    if (this._ak !== k) {
      const S = this.S, ds = S.dataset(), f = this.filt();
      this._ak = k; this._c = {};
      this._a = S.aggregate(ds, st.range, st.dev, { filter: f });
      this._p = st.range < 365 ? S.aggregate(ds, st.range, st.dev, { offset: st.range, filter: f }) : null;
    }
    return this._a;
  }
  memo(k, fn) { if (!(k in this._c)) this._c[k] = fn(); return this._c[k]; }

  groups(mode) {
    return this.memo('g' + mode, () => {
      const map = {};
      for (const c of Object.values(this._a.clicks)) {
        if (c.cat === 'enquiry') continue;
        const key = mode === 'label' ? c.cat + '\t' + c.label : [c.cat, c.label, c.area, c.page].join('\t');
        const g = map[key] || (map[key] = { key, mode, cat: c.cat, label: c.label, n: 0, m: 0, d: 0, conv: 0, after: zg(), places: [] });
        g.n += c.n; g.m += c.m; g.d += c.d; g.conv += c.conv;
        for (const x in c.after) g.after[x] += c.after[x];
        g.places.push(c);
      }
      const list = Object.values(map);
      list.forEach((g) => g.places.sort((x, y) => y.n - x.n));
      return list.sort((x, y) => y.n - x.n || x.label.localeCompare(y.label));
    });
  }
  articles() {
    return this.memo('art', () => {
      const a = this._a, by = {};
      for (const c of Object.values(a.clicks)) {
        if (!c.page.startsWith('/blog/') || c.cat === 'enquiry') continue;
        const b = by[c.page] || (by[c.page] = { clicks: 0, tour: 0, form: 0, formSent: 0, list: [] });
        b.clicks += c.n;
        if (c.cat === 'tour') b.tour += c.n;
        if (c.cat === 'form') { b.form += c.n; b.formSent += c.after.enquiry; }
        b.list.push(c);
      }
      return this.S.ARTICLES.map((art) => {
        const p = '/blog/' + art.slug, pg = a.pages[p];
        return Object.assign({ art, p, views: pg ? pg.n : 0, conv: pg ? pg.conv : 0, after: pg ? pg.after : zg(), entries: a.entries[p] ? a.entries[p].n : 0, depth: a.depth[p] || { n: 0, b: [0, 0, 0, 0], time: 0 }, days: a.pageDays[p] || [] }, by[p] || { clicks: 0, tour: 0, form: 0, formSent: 0, list: [] });
      });
    });
  }
  sessList() {
    return this.memo('sess', () => {
      const S = this.S, st = this.state;
      return S.sessions(S.dataset(), st.range, st.dev, this.filt()).map((v) => {
        const pages = v.ev.filter((e) => e.k === 'page'), g = v.ev.find(isGoal);
        return { v, pages, goal: g ? goalOf(g) : null, dur: pages.reduce((s, e) => s + (e.t || 0), 0), read: pages.some((e) => e.p.startsWith('/blog/')), form: v.ev.some((e) => e.k === 'enquiry'), bounce: pages.length <= 1 && v.ev.every((e) => e.k === 'page') };
      });
    });
  }

  rate(conv, n, max) {
    if (!n) return { rate: '–', rateW: '0px', rateColor: '#A89880', rateBar: '#E0D8C9', rateTitle: '' };
    const weak = n < 10;
    return { rate: pct(conv, n), rateW: Math.max(2, Math.min(conv / n / max, 1) * 48) + 'px', rateColor: weak ? '#A89880' : '#1A1714', rateBar: weak ? '#E0D8C9' : '#A88654', rateTitle: conv + ' z ' + n + (weak ? ' – zatím málo vypovídající' : '') };
  }
  own() { return { rate: 'je kontakt', rateW: '0px', rateColor: '#6B6055', rateBar: 'transparent', rateTitle: 'Tento klik je sám kontaktem' }; }
  chip(cat) { const S = this.S, c = S.CATS[cat] || S.CATS.button; return { catLabel: S.CAT_L.cs[cat] || S.CAT_L.cs.button, chipBg: c.bg, chipFg: c.fg }; }
  short(p) { return (p.startsWith('/tours/') ? 'Prohlídka: ' : '') + this.S.pageName(p, 'cs'); }
  openBtn(g) { return () => this.setState({ drawer: { type: 'button', key: g.key, mode: g.mode } }); }
  openArt(slug) { return () => this.setState({ drawer: { type: 'article', slug } }); }

  btnRow(g) {
    const S = this.S, own = !!CONTACT[g.cat], p0 = g.places[0], one = g.places.length === 1, wp = g.after.whatsapp + g.after.phone;
    const cell = (v) => (own ? '–' : fmt(v)), col = (v, c) => (own || !v ? '#A89880' : c);
    return Object.assign(this.chip(g.cat), {
      label: clip(S.clickLabel(g.cat, g.label), 64),
      where: one ? S.areaName(p0.area, 'cs') : g.places.length + ' míst',
      whereSub: one ? clip(S.pageName(p0.page, 'cs'), 40) : 'většinou ' + S.areaName(p0.area, 'cs') + ' · ' + clip(S.pageName(p0.page, 'cs'), 26),
      n: fmt(g.n), m: fmt(g.m), d: fmt(g.d), mW: (g.n ? (g.m / g.n) * 100 : 0) + '%',
      f: cell(g.after.enquiry), fC: col(g.after.enquiry, '#6B1F2A'), e: cell(g.after.email), eC: col(g.after.email, '#4A3D7A'), wp: cell(wp), wpC: col(wp, '#25633A'),
      open: this.openBtn(g),
    }, own ? this.own() : this.rate(g.conv, g.n, 0.5));
  }
  artLite(r) { return Object.assign({ title: clip(r.art.title, 70), meta: r.art.cat, views: fmt(r.views), conv: fmt(r.conv), convC: r.conv ? '#1A1714' : '#A89880', open: this.openArt(r.art.slug) }, this.rate(r.conv, r.views, 0.1)); }
  artRow(r) {
    const d = r.depth;
    return Object.assign({
      title: r.art.title, meta: r.art.cat + ' · ' + dateCz(r.art.date),
      views: fmt(r.views), spark: this.spark(this.pts(r.days, 30), '#8C6A3C', 100, 22), entries: fmt(r.entries),
      depthSegs: [0, 1, 2, 3].map((i) => ({ w: (d.n ? (d.b[i] / d.n) * 100 : 0) + '%', bg: ['#E8DFCC', '#C7BBA6', '#A88654', '#6B1F2A'][i] })),
      readAll: d.n ? pct(d.b[3], d.n) : '–', avgTime: d.n ? dur(Math.round(d.time / d.n)) : '–',
      tour: fmt(r.tour), form: fmt(r.form), conv: fmt(r.conv), convC: r.conv ? '#1A1714' : '#A89880',
      chans: GOALS.filter((g) => r.after[g]).map((g) => ({ t: GM[g].s + ' ' + r.after[g], bg: GM[g].bg, fg: GM[g].c })),
      open: this.openArt(r.art.slug),
    }, this.rate(r.conv, r.views, 0.1));
  }
  steps(key, mark) {
    const S = this.S;
    return key.split(' › ').map((s, i) => {
      const g = GOAL_STEP[s], ell = s === '…', me = s === mark;
      return { arrow: i ? 'inline' : 'none', text: g ? '✓ ' + GM[g].s : ell ? '…' : clip(this.short(s), 34), full: g ? GM[g].l : ell ? 'zkráceno' : S.pageName(s, 'cs') + ' — ' + s, bg: g ? GM[g].bg : ell ? 'transparent' : me ? '#EDE4D3' : '#F0EBE2', fg: g ? GM[g].c : '#1A1714', fw: g || me ? '700' : '400' };
    });
  }

  pts(arr, max) { if (arr.length <= max) return arr; return chunk(arr, Math.ceil(arr.length / max)).map((b) => b.reduce((s, x) => s + x, 0)); }
  spark(vals, color, w, hh) {
    w = w || 120; hh = hh || 32;
    const v = vals.length > 1 ? vals : [0].concat(vals.length ? vals : [0]);
    const max = Math.max(1e-9, ...v), n = v.length;
    const d = v.map((x, i) => (i ? 'L' : 'M') + ((i / (n - 1)) * w).toFixed(1) + ' ' + (hh - 2 - (x / max) * (hh - 6)).toFixed(1)).join(' ');
    return h('svg', { viewBox: '0 0 ' + w + ' ' + hh, preserveAspectRatio: 'none', style: { width: '100%', height: hh, display: 'block' } },
      h('path', { d: d + ' L' + w + ' ' + hh + ' L0 ' + hh + ' Z', fill: color, opacity: 0.1 }),
      h('path', { d, fill: 'none', stroke: color, strokeWidth: 1.6, vectorEffect: 'non-scaling-stroke', strokeLinejoin: 'round' }));
  }
  trendChart(a, p) {
    const step = a.days > 90 ? 7 : 1;
    const B = chunk(a.series, step).map((b) => ({ from: b[0].date, to: b[b.length - 1].date, v: b.reduce((s, x) => s + x.visits, 0), g: GOALS.reduce((o, k) => ((o[k] = b.reduce((s, x) => s + x.goals[k], 0)), o), {}) }));
    const P = p ? chunk(p.series, step).map((b) => b.reduce((s, x) => s + x.visits, 0)) : null;
    const n = B.length, W = 860, H = 250, L = 38, R = 8, T = 12, A = 160, CB = 40, G = 18;
    const maxV = Math.max(1, ...B.map((b) => b.v), ...(P || [0])), maxG = Math.max(1, ...B.map((b) => GOALS.reduce((s, k) => s + b.g[k], 0)));
    const xw = (W - L - R) / n, x = (i) => L + xw * (i + 0.5), y = (v) => T + A - (v / maxV) * A;
    const line = (vals) => vals.map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1)).join(' ');
    const hov = this.state.hover, k = [];
    [0, 0.5, 1].forEach((f, i) => { const yy = T + A - f * A; k.push(h('line', { key: 'g' + i, x1: L, x2: W - R, y1: yy, y2: yy, stroke: '#E8DFCC' }), h('text', { key: 't' + i, x: L - 6, y: yy + 3.5, textAnchor: 'end', fontSize: 10, fill: '#6B6055' }, fmt(maxV * f))); });
    const vl = line(B.map((b) => b.v));
    k.push(h('path', { key: 'area', d: vl + ' L' + x(n - 1).toFixed(1) + ' ' + (T + A) + ' L' + x(0).toFixed(1) + ' ' + (T + A) + ' Z', fill: '#A88654', opacity: 0.13 }));
    if (P) k.push(h('path', { key: 'prev', d: line(P.slice(0, n)), fill: 'none', stroke: '#A89880', strokeWidth: 1.5, strokeDasharray: '4 4' }));
    k.push(h('path', { key: 'line', d: vl, fill: 'none', stroke: '#8C6A3C', strokeWidth: 2, strokeLinejoin: 'round' }));
    const cb = T + A + G;
    k.push(h('line', { key: 'cb', x1: L, x2: W - R, y1: cb, y2: cb, stroke: '#C7BBA6' }), h('text', { key: 'cbl', x: L - 6, y: cb + 12, textAnchor: 'end', fontSize: 10, fill: '#6B6055' }, 'kont.'));
    const bw = Math.max(1, xw - (n > 60 ? 1 : 3));
    B.forEach((b, i) => { let yy = cb + 1; GOALS.forEach((g) => { const hh = (b.g[g] / maxG) * CB; if (hh > 0) { k.push(h('rect', { key: 'c' + i + g, x: x(i) - bw / 2, y: yy, width: bw, height: hh, fill: GM[g].c, opacity: hov < 0 || hov === i ? 1 : 0.35 })); yy += hh; } }); });
    if (B[hov]) k.push(h('line', { key: 'xh', x1: x(hov), x2: x(hov), y1: T, y2: cb + CB, stroke: '#1A1714', strokeDasharray: '2 3' }), h('circle', { key: 'dot', cx: x(hov), cy: y(B[hov].v), r: 4.5, fill: '#FFFFFF', stroke: '#8C6A3C', strokeWidth: 2 }));
    B.forEach((b, i) => k.push(h('rect', { key: 'h' + i, x: L + xw * i, y: 0, width: xw, height: H, fill: 'transparent', onMouseEnter: () => { if (this.state.hover !== i) this.setState({ hover: i }); } })));
    [0, Math.floor(n / 2), n - 1].forEach((i, j) => k.push(h('text', { key: 'x' + j, x: x(i), y: H - 2, textAnchor: j === 0 ? 'start' : j === 2 ? 'end' : 'middle', fontSize: 10, fill: '#6B6055' }, j === 2 && step === 1 ? 'dnes' : dl(B[i].from))));
    const hb = B[hov];
    let info;
    if (hb) {
      const tot = GOALS.reduce((s, g) => s + hb.g[g], 0);
      info = (step === 1 ? DOW[hb.from.getDay()] + ' ' + dl(hb.from) : dl(hb.from) + ' – ' + dl(hb.to)) + ': ' + fmt(hb.v) + ' návštěv' + (P && P[hov] != null ? ' (předtím ' + fmt(P[hov]) + ')' : '') + ' · ' + (tot ? tot + ' ' + plural(tot, 'kontakt', 'kontakty', 'kontaktů') + ' – ' + GOALS.filter((g) => hb.g[g]).map((g) => GM[g].s + ' ' + hb.g[g]).join(', ') : 'žádný kontakt');
    } else info = (step === 1 ? 'Po dnech' : 'Po týdnech') + ' · průměrně ' + fmt(a.visits / n) + ' návštěv' + (P ? ' · přerušovaná čára = předchozí období' : '') + '. Najeďte myší na graf.';
    return { trendSvg: h('svg', { viewBox: '0 0 ' + W + ' ' + H, style: { width: '100%', height: 'auto', display: 'block' }, onMouseLeave: () => this.setState({ hover: -1 }) }, k), trendInfo: info };
  }
  donut(items) {
    const size = 136, thick = 20, tot = items.reduce((s, x) => s + x.v, 0) || 1, R = size / 2, r = R - thick, k = [];
    let a0 = -Math.PI / 2;
    const pt = (rad, ang) => (R + rad * Math.cos(ang)).toFixed(2) + ' ' + (R + rad * Math.sin(ang)).toFixed(2);
    items.forEach((it, i) => {
      const a1 = a0 + (it.v / tot) * Math.PI * 2 - 0.0001, lg = a1 - a0 > Math.PI ? 1 : 0;
      if (it.v > 0) k.push(h('path', { key: i, d: 'M' + pt(R, a0) + ' A' + R + ' ' + R + ' 0 ' + lg + ' 1 ' + pt(R, a1) + ' L' + pt(r, a1) + ' A' + r + ' ' + r + ' 0 ' + lg + ' 0 ' + pt(r, a0) + ' Z', fill: it.color, stroke: '#FFFFFF', strokeWidth: 1.5 }));
      a0 = a1 + 0.0001;
    });
    return h('svg', { viewBox: '0 0 ' + size + ' ' + size, style: { width: size, height: size, display: 'block', flexShrink: 0 } }, k);
  }
  scatter(rows) {
    const pts = rows.filter((r) => r.views > 0);
    if (!pts.length) return null;
    const W = 860, H = 330, L = 50, R = 16, T = 26, B = 34;
    const vs = pts.map((r) => r.views).sort((x, y) => x - y), med = vs[Math.floor(vs.length / 2)];
    const minV = Math.max(1, vs[0]), maxV = Math.max(minV * 2, vs[vs.length - 1]);
    const tv = pts.reduce((s, r) => s + r.views, 0), tc = pts.reduce((s, r) => s + r.conv, 0), avg = tv ? tc / tv : 0;
    const maxR = Math.max(0.03, ...pts.map((r) => r.conv / r.views)) * 1.15;
    const X = (v) => L + ((Math.log(v) - Math.log(minV)) / (Math.log(maxV) - Math.log(minV))) * (W - L - R);
    const Y = (q) => T + (1 - q / maxR) * (H - T - B);
    const qx = X(med), qy = Y(avg), k = [];
    k.push(h('rect', { key: 'q1', x: qx, y: T, width: W - R - qx, height: qy - T, fill: '#E3F1E6', opacity: 0.55 }), h('rect', { key: 'q2', x: qx, y: qy, width: W - R - qx, height: H - B - qy, fill: '#F5E6E6', opacity: 0.55 }));
    [0, 0.5, 1].forEach((f, i) => { const yy = Y(maxR * f); k.push(h('line', { key: 'gy' + i, x1: L, x2: W - R, y1: yy, y2: yy, stroke: '#E8DFCC' }), h('text', { key: 'ty' + i, x: L - 6, y: yy + 3.5, textAnchor: 'end', fontSize: 10, fill: '#6B6055' }, pc1(maxR * f * 100) + ' %')); });
    [5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000].filter((v) => v >= minV && v <= maxV).forEach((v) => k.push(h('text', { key: 'tx' + v, x: X(v), y: H - B + 16, textAnchor: 'middle', fontSize: 10, fill: '#6B6055' }, fmt(v))));
    k.push(h('line', { key: 'qx', x1: qx, x2: qx, y1: T, y2: H - B, stroke: '#A89880', strokeDasharray: '3 4' }), h('line', { key: 'qy', x1: L, x2: W - R, y1: qy, y2: qy, stroke: '#A89880', strokeDasharray: '3 4' }));
    [['Skryté poklady', L + 8, T + 14, 'start'], ['Hvězdy', W - R - 8, T + 14, 'end'], ['Provoz bez efektu', W - R - 8, H - B - 8, 'end'], ['Zatím slabé', L + 8, H - B - 8, 'start']].forEach(([t, xx, yy, an], i) => k.push(h('text', { key: 'ql' + i, x: xx, y: yy, textAnchor: an, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', fill: '#8C6A3C' }, t.toUpperCase())));
    k.push(h('text', { key: 'ax', x: W - R, y: H - 2, textAnchor: 'end', fontSize: 10, fill: '#6B6055' }, 'zobrazení →'), h('text', { key: 'ay', x: 2, y: 10, fontSize: 10, fill: '#6B6055' }, '↑ míra kontaktu'));
    let label = null;
    pts.slice().sort((x, y) => x.conv - y.conv).forEach((r) => {
      const on = this.state.scHover === r.art.slug, cx = X(r.views), cy = Y(r.conv / r.views);
      k.push(h('circle', { key: r.art.slug, cx, cy, r: 4 + Math.sqrt(r.conv) * 3.2, fill: r.conv ? '#6B1F2A' : '#A89880', fillOpacity: on ? 0.95 : 0.55, stroke: on ? '#1A1714' : '#FFFFFF', strokeWidth: on ? 2 : 1, style: { cursor: 'pointer' }, onMouseEnter: () => this.setState({ scHover: r.art.slug }), onClick: this.openArt(r.art.slug) }, h('title', null, r.art.title)));
      if (on) label = h('text', { key: 'lbl', x: cx > W * 0.7 ? cx - 12 : cx + 12, y: cy - 10, textAnchor: cx > W * 0.7 ? 'end' : 'start', fontSize: 11.5, fontWeight: 600, fill: '#1A1714', stroke: '#FFFFFF', strokeWidth: 3, paintOrder: 'stroke' }, clip(r.art.title, 46));
    });
    if (label) k.push(label);
    return h('svg', { viewBox: '0 0 ' + W + ' ' + H, style: { width: '100%', height: 'auto', display: 'block' }, onMouseLeave: () => this.setState({ scHover: null }) }, k);
  }
  sankey(a, onlyConv) {
    const fl = Object.entries(a.flows).map(([key, n]) => { const [s, e, o] = key.split('|'); return { s, e, o, n }; }).filter((f) => !onlyConv || f.o !== 'none');
    const total = fl.reduce((x, f) => x + f.n, 0);
    if (!total) return h('div', { style: { padding: '16px 0', fontSize: 12.5, color: '#A89880' } }, 'V tomto období žádná data.');
    const KEYS = [['search', 'direct', 'social', 'review', 'ai', 'other'], ['article', 'tour', 'home', 'other'], ['enquiry', 'email', 'whatsapp', 'phone', 'none']];
    const W = 880, NW = 12, GAP = 14, MINH = 28, X = [170, 440, 700], scale = 300 / total;
    const cols = KEYS.map((keys, ci) => { const tot = {}; fl.forEach((f) => { const kk = [f.s, f.e, f.o][ci]; tot[kk] = (tot[kk] || 0) + f.n; }); return { ks: keys.filter((kk) => tot[kk]), tot }; });
    const pos = cols.map((c) => { let yy = 0; const o = {}; c.ks.forEach((kk) => { const hh = Math.max(2, c.tot[kk] * scale); o[kk] = { y: yy, h: hh, inO: 0, outO: 0 }; yy += Math.max(hh, MINH) + GAP; }); return { o, used: yy - GAP }; });
    const H = Math.max(...pos.map((p) => p.used));
    pos.forEach((p) => { const sh = (H - p.used) / 2; Object.values(p.o).forEach((nd) => (nd.y += sh)); });
    const k = [];
    const band = (key, x0, y0, x1, y1, hh, color, title) => { const xm = (x0 + x1) / 2; k.push(h('path', { key, d: 'M' + x0 + ' ' + y0 + ' C' + xm + ' ' + y0 + ' ' + xm + ' ' + y1 + ' ' + x1 + ' ' + y1 + ' L' + x1 + ' ' + (y1 + hh) + ' C' + xm + ' ' + (y1 + hh) + ' ' + xm + ' ' + (y0 + hh) + ' ' + x0 + ' ' + (y0 + hh) + ' Z', fill: color, opacity: 0.35 }, h('title', null, title))); };
    const sum = (fn) => { const m = {}; fl.forEach((f) => { const kk = fn(f); m[kk] = (m[kk] || 0) + f.n; }); return m; };
    const l1 = sum((f) => f.s + '|' + f.e), l2 = sum((f) => f.e + '|' + f.o);
    const oName = (o) => (o === 'none' ? 'Bez kontaktu' : GM[o].s), oColor = (o) => (o === 'none' ? '#C7BBA6' : GM[o].c);
    cols[0].ks.forEach((s) => cols[1].ks.forEach((e) => { const n = l1[s + '|' + e]; if (!n) return; const hh = n * scale, A = pos[0].o[s], Bn = pos[1].o[e]; band('a' + s + e, X[0] + NW, A.y + A.outO, X[1], Bn.y + Bn.inO, hh, SRC[s][1], SRC[s][0] + ' → ' + KIND[e] + ': ' + fmt(n)); A.outO += hh; Bn.inO += hh; }));
    cols[1].ks.forEach((e) => cols[2].ks.forEach((o) => { const n = l2[e + '|' + o]; if (!n) return; const hh = n * scale, A = pos[1].o[e], Bn = pos[2].o[o]; band('b' + e + o, X[1] + NW, A.y + A.outO, X[2], Bn.y + Bn.inO, hh, oColor(o), KIND[e] + ' → ' + oName(o) + ': ' + fmt(n)); A.outO += hh; Bn.inO += hh; }));
    const lab = [(kk) => SRC[kk][0], (kk) => KIND[kk], oName], colr = [(kk) => SRC[kk][1], () => '#8C6A3C', oColor];
    cols.forEach((c, ci) => c.ks.forEach((kk) => {
      const nd = pos[ci].o[kk], tx = ci === 0 ? X[0] - 8 : X[ci] + NW + 8, an = ci === 0 ? 'end' : 'start', cy = nd.y + nd.h / 2;
      k.push(h('rect', { key: 'n' + ci + kk, x: X[ci], y: nd.y, width: NW, height: nd.h, rx: 2, fill: colr[ci](kk) }),
        h('text', { key: 'l' + ci + kk, x: tx, y: cy - 1, textAnchor: an, fontSize: 12, fontWeight: 600, fill: '#1A1714', stroke: '#FFFFFF', strokeWidth: 3, paintOrder: 'stroke' }, lab[ci](kk)),
        h('text', { key: 'v' + ci + kk, x: tx, y: cy + 13, textAnchor: an, fontSize: 11, fill: '#6B6055', stroke: '#FFFFFF', strokeWidth: 3, paintOrder: 'stroke' }, fmt(c.tot[kk]) + ' · ' + pct(c.tot[kk], total)));
    }));
    ['ZDROJ', 'PRVNÍ STRÁNKA', 'VÝSLEDEK'].forEach((t, i) => k.push(h('text', { key: 'ct' + i, x: i === 0 ? X[0] + NW : X[i], y: -12, textAnchor: i === 0 ? 'end' : 'start', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', fill: '#8C6A3C' }, t)));
    return h('svg', { viewBox: '0 -28 ' + W + ' ' + (H + 44), style: { width: '100%', minWidth: 640, height: 'auto', display: 'block' } }, k);
  }

  insights(a, p) {
    const out = [], arts = this.articles().filter((r) => r.views > 0), avg = a.visits ? a.conv / a.visits : 0;
    if (p && p.conv) {
      const d = (a.conv - p.conv) / p.conv;
      out.push({ icon: d >= 0 ? 'trending_up' : 'trending_down', bg: d >= 0 ? '#E3F1E6' : '#F5E6E6', fg: d >= 0 ? '#25633A' : '#8A1F1F', title: 'Kontakty ' + (d >= 0 ? '+' : '−') + pc1(Math.abs(d) * 100) + ' % proti předchozímu období', text: fmt(a.conv) + ' návštěv s kontaktem proti ' + fmt(p.conv) + ' v předchozích ' + a.days + ' dnech. Návštěv je ' + fmt(a.visits) + ' (předtím ' + fmt(p.visits) + ').', action: 'Návštěvy s kontaktem', run: () => this.setState({ tab: 'visits', vf: 'conv' }) });
    }
    const leak = arts.filter((r) => r.views >= 30).sort((x, y) => x.conv / x.views - y.conv / y.views || y.views - x.views)[0];
    if (leak) out.push({ icon: 'water_drop', bg: '#F5E6E6', fg: '#8A1F1F', title: 'Hodně čtenářů, málo kontaktů', text: '„' + clip(leak.art.title, 60) + '“ má ' + fmt(leak.views) + ' zobrazení, ale jen ' + fmt(leak.conv) + ' ' + plural(leak.conv, 'kontakt', 'kontakty', 'kontaktů') + '. Do konce ho dočte ' + pct(leak.depth.b[3], leak.depth.n) + ' čtenářů – výzvu k akci by stálo za to posunout výš.', action: 'Otevřít článek', run: this.openArt(leak.art.slug) });
    const star = arts.filter((r) => r.views >= 15 && r.conv > 0).sort((x, y) => y.conv / y.views - x.conv / x.views)[0];
    if (star) out.push({ icon: 'auto_awesome', bg: '#E3F1E6', fg: '#25633A', title: 'Článek, který prodává', text: '„' + clip(star.art.title, 60) + '“ převádí ' + pct(star.conv, star.views) + ' čtenářů na kontakt' + (avg ? ', to je ' + pc1(star.conv / star.views / avg) + '× víc než průměr webu' : '') + '.', action: 'Detail článku', run: this.openArt(star.art.slug) });
    if (a.formViews) out.push({ icon: 'edit_note', bg: '#F6E7E2', fg: '#6B1F2A', title: 'Formulář dokončí ' + pct(a.formSent, a.formViews), text: fmt(a.formViews) + ' návštěv otevřelo stránku s poptávkou, ' + fmt(a.formSent) + ' formulář odeslalo a ' + fmt(a.formViews - a.formSent) + ' odešlo bez odeslání' + (a.formCopied ? ', z toho ' + fmt(a.formCopied) + ' ' + plural(a.formCopied, 'si zkopíroval', 'si zkopírovali', 'si zkopírovalo') + ' e-mail nebo telefon' : '') + '.', action: 'Návštěvy s formulářem', run: () => this.setState({ tab: 'visits', vf: 'form' }) });
    if (a.m && a.d) {
      const worse = a.convM / a.m < a.convD / a.d;
      out.push({ icon: 'smartphone', bg: '#F0EBE2', fg: '#3A332C', title: 'Mobil vs. počítač', text: 'Na mobilu skončí kontaktem ' + pct(a.convM, a.m) + ' návštěv, na počítači ' + pct(a.convD, a.d) + '. ' + (worse ? 'Mobil zaostává – stojí za kontrolu lišta dole a tlačítko WhatsApp.' : 'Mobil převádí lépe než počítač.'), action: 'Mapa kliků', run: () => this.setState({ tab: 'buttons', mapPage: 'home' }) });
    }
    return out.slice(0, 4);
  }

  overviewVals(a, p) {
    const st = this.state, step = a.days > 90 ? 7 : a.days > 30 ? 3 : 1;
    const ser = (fn) => chunk(a.series, step).map((b) => b.reduce((s, x) => s + fn(x), 0));
    const rateSer = chunk(a.series, step).map((b) => { const v = b.reduce((s, x) => s + x.visits, 0); return v ? b.reduce((s, x) => s + x.conv, 0) / v : 0; });
    const wp = (o) => o.goals.whatsapp + o.goals.phone;
    const K = [
      ['Návštěvy', a.visits, p ? p.visits : null, ser((x) => x.visits), '#8C6A3C', fmt(a.visits), 'mobil ' + pct(a.m, a.visits) + ' · ' + pc1(a.visits ? a.pageviews / a.visits : 0) + ' str. na návštěvu', 0],
      ['S kontaktem', a.conv, p ? p.conv : null, ser((x) => x.conv), '#6B1F2A', fmt(a.conv), 'návštěv z ' + fmt(a.visits), 0],
      ['Míra konverze', a.visits ? a.conv / a.visits : 0, p ? (p.visits ? p.conv / p.visits : 0) : null, rateSer, '#3A332C', pct(a.conv, a.visits), 'návštěv skončí kontaktem', 1],
      ['Formuláře', a.goals.enquiry, p ? p.goals.enquiry : null, ser((x) => x.goals.enquiry), '#6B1F2A', fmt(a.goals.enquiry), 'odesláno · ' + pct(a.formSent, a.formViews) + ' otevřených', 0],
      ['E-maily', a.goals.email, p ? p.goals.email : null, ser((x) => x.goals.email), '#4A3D7A', fmt(a.goals.email), (a.copies.email ? 'kliknutí · ' + fmt(a.copies.email) + ' zkopírováno' : 'kliků na e-mailovou adresu'), 0],
      ['WhatsApp a telefon', wp(a), p ? wp(p) : null, ser(wp), '#25633A', fmt(wp(a)), 'WhatsApp ' + fmt(a.goals.whatsapp) + (a.copies.phone ? ' · tel. ' + fmt(a.goals.phone) + ' · ' + fmt(a.copies.phone) + ' zkop.' : ' · telefon ' + fmt(a.goals.phone)), 0],
    ];
    const kpis = K.map(([label, cur, prv, s, color, value, sub, isRate]) => {
      const o = { label, value, sub, spark: this.spark(s, color), showDelta: 'none', delta: '', dbg: 'transparent', dfg: '#6B6055' };
      if (prv != null) {
        const d = isRate ? (cur - prv) * 100 : prv ? ((cur - prv) / prv) * 100 : cur ? 100 : 0, up = d > 0.05, dn = d < -0.05;
        Object.assign(o, { showDelta: 'inline-flex', delta: (up ? '▲ ' : dn ? '▼ ' : '') + pc1(Math.abs(d)) + (isRate ? ' p. b.' : ' %'), dbg: up ? '#E3F1E6' : dn ? '#F5E6E6' : '#F0EBE2', dfg: up ? '#25633A' : dn ? '#8A1F1F' : '#6B6055' });
      }
      return o;
    });
    const F = [['Návštěvy', a.visits], ['Četli článek nebo prohlídku', a.sawContent], ['Otevřeli stránku s poptávkou', a.formViews], ['Odeslali formulář', a.formSent]];
    const funnel = F.map(([label, n], i) => ({ label, n: fmt(n), share: pct(n, a.visits), w: Math.max(1.5, Math.sqrt(a.visits ? n / a.visits : 0) * 100) + '%', color: ['#D9CFBC', '#A88654', '#8C6A3C', '#6B1F2A'][i], step: i ? '→ ' + pct(n, F[i - 1][1]) + ' z předchozího kroku' : 'všechny návštěvy v období' }));
    const hmData = st.hmMode === 'conv' ? a.hoursConv : a.hours, hmax = Math.max(1, ...hmData.map((r) => Math.max(...r)));
    const heat = WEEK.map((d, wi) => ({ day: d, cells: hmData[wi].map((v, hr) => ({ bg: v ? 'rgba(107,31,42,' + (0.07 + 0.88 * (v / hmax)).toFixed(3) + ')' : '#F5F1EA', title: d + ' ' + two(hr) + ':00 – ' + fmt(a.hours[wi][hr]) + ' návštěv, ' + fmt(a.hoursConv[wi][hr]) + ' kontaktů' })) }));
    const peak = (m) => { let b = [0, 0, -1]; m.forEach((r, wi) => r.forEach((v, hr) => { if (v > b[2]) b = [wi, hr, v]; })); return WEEK[b[0]] + ' kolem ' + b[1] + ':00'; };
    const srcRows = Object.entries(a.src).sort((x, y) => y[1].n - x[1].n);
    return Object.assign({
      kpis, insights: this.insights(a, p), funnel,
      funnelDirect: fmt(a.directVisits) + ' návštěv se ozvalo napřímo – e-mailem, přes WhatsApp nebo telefonem (' + pct(a.directVisits, a.visits) + '). Tyto kontakty formulářem neprocházejí.',
      prevLegend: p ? 'flex' : 'none',
      heat, hourLabels: Array.from({ length: 24 }, (_, i) => (i % 3 ? '' : String(i))),
      heatNote: 'Nejvíc návštěv: ' + peak(a.hours) + ' · nejvíc kontaktů: ' + peak(a.hoursConv) + '.',
      hmOpts: seg([['visits', 'Návštěvy'], ['conv', 'Kontakty']], st.hmMode, (k) => this.setState({ hmMode: k })),
      donutSvg: this.donut(srcRows.map(([k, v]) => ({ v: v.n, color: (SRC[k] || SRC.other)[1] }))),
      srcLegend: srcRows.map(([k, v]) => ({ label: (SRC[k] || SRC.other)[0], color: (SRC[k] || SRC.other)[1], share: pct(v.n, a.visits), rate: pct(v.conv, v.n) + ' návštěv s kontaktem', pick: () => this.setState({ src: k, hover: -1 }) })),
      topButtons: this.groups('label').slice(0, 6).map((g) => this.btnRow(g)),
      topArticles: this.articles().filter((r) => r.views > 0).sort((x, y) => y.conv - x.conv || y.views - x.views).slice(0, 6).map((r) => this.artLite(r)),
      goButtons: () => this.setState({ tab: 'buttons', hover: -1 }), goContent: () => this.setState({ tab: 'content', hover: -1 }),
    }, this.trendChart(a, p));
  }

  liveVals() {
    const st = this.state, ds = this.S.dataset(), now = Date.now(), nowMin = this.S.nowMinute(), pages = {};
    this.S.activeVisits(5).forEach((v) => { const lp = v.ev.slice().reverse().find((e) => e.k === 'page'); if (lp) pages[lp.p] = (pages[lp.p] || 0) + 1; });
    const pr = Object.entries(pages).sort((x, y) => y[1] - x[1]).slice(0, 6), pmax = pr.length ? pr[0][1] : 1;
    const today = ds.visits.filter((v) => v.day === 0 && v.hour * 60 + v.minute <= nowMin && v.ev.some(isGoal)).sort((x, y) => y.hour - x.hour || y.minute - x.minute).slice(0, 8)
      .map((v) => { const g = goalOf(v.ev.find(isGoal)); return { time: two(v.hour) + ':' + two(v.minute), label: GM[g].s, bg: GM[g].bg, fg: GM[g].c, sub: (v.ref || 'přímo') + ' · vstup: ' + clip(this.short(v.ev[0].p), 40), open: () => this.setState({ drawer: { type: 'visit', id: v.id, day: v.day } }) }; });
    return {
      live: st.live.map((x) => { const t = new Date(x.at); return { time: hm(t) + ':' + two(t.getSeconds()), icon: x.icon, color: x.color, ibg: x.ibg, text: x.text, sub: x.sub, dev: x.dev, fw: x.goal ? '700' : '500', bg: x.fresh && now - x.fresh < 1800 ? '#FBF3DD' : x.goal ? '#FBF7F4' : 'transparent' }; }),
      liveSpark: this.spark(st.liveHist, '#25633A', 240, 48), liveWord: plural(st.liveN, 'člověk', 'lidé', 'lidí'),
      livePages: pr.map(([pp, n]) => ({ title: this.short(pp), n, w: (n / pmax) * 100 + '%' })),
      todayContacts: today, todayEmpty: !today.length,
    };
  }

  contentVals() {
    const st = this.state, all = this.articles(), q = st.aq.trim().toLowerCase();
    const rk = (r) => (r.views >= 15 ? r.conv / r.views : -1 + r.views / 1e6), rd = (r) => (r.depth.n >= 10 ? r.depth.b[3] / r.depth.n : -1 + r.depth.n / 1e6);
    const sorter = { views: (x, y) => y.views - x.views, conv: (x, y) => y.conv - x.conv || y.views - x.views, rate: (x, y) => rk(y) - rk(x), read: (x, y) => rd(y) - rd(x) }[st.asort];
    const rows = all.filter((r) => !q || (r.art.title + ' ' + r.art.cat + ' ' + r.art.slug).toLowerCase().includes(q)).sort(sorter);
    const top = all.slice().sort((x, y) => y.views - x.views)[0], best = all.slice().sort((x, y) => y.conv - x.conv || y.views - x.views)[0];
    const deep = all.filter((r) => r.depth.n >= 15).sort((x, y) => rd(y) - rd(x))[0], hov = all.find((r) => r.art.slug === st.scHover);
    const ins = [
      { label: 'Nejčtenější', title: top.art.title, value: fmt(top.views), note: 'zobrazení · ' + pct(top.conv, top.views) + ' pak s kontaktem', open: this.openArt(top.art.slug) },
      { label: 'Nejčastěji vede ke kontaktu', title: best.art.title, value: fmt(best.conv), note: plural(best.conv, 'kontakt', 'kontakty', 'kontaktů') + ' při ' + fmt(best.views) + ' zobrazeních', open: this.openArt(best.art.slug) },
    ];
    if (deep) ins.push({ label: 'Nejvíc dočtený', title: deep.art.title, value: pct(deep.depth.b[3], deep.depth.n), note: 'čtenářů došlo až na konec · průměrně ' + dur(Math.round(deep.depth.time / deep.depth.n)), open: this.openArt(deep.art.slug) });
    return {
      aInsights: ins, scatterSvg: this.scatter(all),
      scatterInfo: hov ? hov.art.title + ' — ' + fmt(hov.views) + ' zobrazení · ' + fmt(hov.conv) + ' ' + plural(hov.conv, 'kontakt', 'kontakty', 'kontaktů') + ' · míra ' + pct(hov.conv, hov.views) + (hov.depth.n ? ' · dočteno ' + pct(hov.depth.b[3], hov.depth.n) : '') : 'Najeďte na kruh pro detail, kliknutím otevřete článek.',
      aRows: rows.map((r) => this.artRow(r)), aEmpty: !rows.length,
      aq: st.aq, onAq: (e) => this.setState({ aq: e.target.value }),
      aSortOpts: seg([['views', 'Zobrazení'], ['conv', 'Kontakty'], ['rate', 'Míra'], ['read', 'Dočtenost']], st.asort, (k) => this.setState({ asort: k })),
    };
  }

  mapVals(a) {
    const st = this.state, S = this.S, M = MAPS[st.mapPage], by = {};
    const cl = Object.values(a.clicks).filter((c) => c.cat !== 'enquiry' && M.match(c.page));
    cl.forEach((c) => { const x = by[c.area] || (by[c.area] = { n: 0, conv: 0, btn: {} }); x.n += c.n; x.conv += c.conv; const bk = c.cat + '\t' + c.label, b = x.btn[bk] || (x.btn[bk] = { cat: c.cat, label: c.label, n: 0, conv: 0 }); b.n += c.n; b.conv += c.conv; });
    const total = cl.reduce((s, c) => s + c.n, 0), max = Math.max(1, ...Object.values(by).map((x) => x.n));
    const order = M.areas.concat(Object.keys(by).filter((k) => M.areas.indexOf(k) < 0));
    const sel = st.mapArea && by[st.mapArea] ? st.mapArea : Object.keys(by).sort((x, y) => by[y].n - by[x].n)[0];
    const views = Object.entries(a.pages).filter(([pp]) => M.match(pp)).reduce((s, [, v]) => s + v.n, 0), sx = by[sel] || { n: 0, conv: 0, btn: {} };
    return {
      mapOpts: seg(Object.keys(MAPS).map((k) => [k, MAPS[k].label]), st.mapPage, (k) => this.setState({ mapPage: k, mapArea: null })),
      mapPath: M.path,
      mapRows: order.map((k) => { const x = by[k] || { n: 0, conv: 0, btn: {} }, f = x.n / max; return { name: S.areaName(k, 'cs'), n: fmt(x.n), share: pct(x.n, total), bg: x.n ? 'rgba(107,31,42,' + (0.05 + f * 0.75).toFixed(3) + ')' : '#FAF8F4', fg: f > 0.55 ? '#FFFFFF' : '#1A1714', h: { header: '46px', footer: '52px', 'sticky-bar': '46px', 'blog-promo': '52px', hero: '120px', article: '150px' }[k] || '82px', outline: k === sel ? '2px solid #1A1714' : '0 solid transparent', btns: Object.values(x.btn).sort((pp, qq) => qq.n - pp.n).slice(0, 3).map((b) => ({ t: clip(S.clickLabel(b.cat, b.label), 28) + ' · ' + fmt(b.n) })), enter: () => { if (this.state.mapArea !== k) this.setState({ mapArea: k }); } }; }),
      mapSelName: sel ? S.areaName(sel, 'cs') : '–',
      mapSelSub: fmt(sx.n) + ' kliků · ' + pct(sx.n, total) + ' všech kliků na stránce · ' + pct(sx.conv, sx.n) + ' pak kontakt',
      mapSelBtns: Object.values(sx.btn).sort((pp, qq) => qq.n - pp.n).slice(0, 8).map((b) => Object.assign(this.chip(b.cat), { label: clip(S.clickLabel(b.cat, b.label), 40), n: fmt(b.n) }, CONTACT[b.cat] ? this.own() : this.rate(b.conv, b.n, 0.5))),
      mapNote: fmt(total) + ' kliků při ' + fmt(views) + ' zobrazeních stránek typu „' + M.label + '“.',
    };
  }

  buttonsVals() {
    const st = this.state, S = this.S, groups = this.groups(st.bmode), q = st.bq.trim().toLowerCase();
    const hay = (g) => (S.clickLabel(g.cat, g.label) + ' ' + g.places.map((c) => S.areaName(c.area, 'cs') + ' ' + S.pageName(c.page, 'cs') + ' ' + c.page).join(' ')).toLowerCase();
    const searched = q ? groups.filter((g) => hay(g).includes(q)) : groups, counts = {};
    searched.forEach((g) => { const f = bfOf(g.cat); counts[f] = (counts[f] || 0) + 1; });
    let rows = st.bf === 'all' ? searched : searched.filter((g) => bfOf(g.cat) === st.bf);
    if (st.bsort === 'rate') { const rk = (g) => (CONTACT[g.cat] ? -2 : g.n >= 10 ? g.conv / g.n : -1 + g.n / 1e6); rows = rows.slice().sort((x, y) => rk(y) - rk(x)); }
    if (st.bsort === 'form') rows = rows.slice().sort((x, y) => y.after.enquiry - x.after.enquiry || y.n - x.n);
    const rest = Math.max(0, rows.length - st.blimit);
    return {
      bFilters: BF.map(([k, label]) => { const on = st.bf === k; return { label, count: k === 'all' ? searched.length : counts[k] || 0, bg: on ? '#1A1714' : '#FFFFFF', fg: on ? '#F5EFE4' : '#3A332C', bd: on ? '#1A1714' : '#D9CFBC', onClick: () => this.setState({ bf: k, blimit: 25 }) }; }),
      bRows: rows.slice(0, st.blimit).map((g) => this.btnRow(g)), bEmpty: !rows.length, bMore: rest > 0,
      bMoreLabel: rest <= 25 ? 'Zobrazit všech ' + rest + ' dalších' : 'Zobrazit dalších 25 (zbývá ' + rest + ')', bShowMore: () => this.setState({ blimit: st.blimit + 25 }),
      bSummary: fmt(rows.length) + (st.bmode === 'label' ? ' tlačítek a odkazů' : ' míst') + ' · ' + fmt(rows.reduce((s, g) => s + g.n, 0)) + ' kliků',
      bModeOpts: seg([['label', 'podle tlačítka'], ['place', 'podle tlačítka a místa']], st.bmode, (k) => this.setState({ bmode: k, blimit: 25 })),
      bq: st.bq, onBq: (e) => this.setState({ bq: e.target.value, blimit: 25 }),
      sortN: () => this.setState({ bsort: 'n' }), sortRate: () => this.setState({ bsort: 'rate' }), sortForm: () => this.setState({ bsort: 'form' }),
      sN: st.bsort === 'n' ? ' ↓' : '', sR: st.bsort === 'rate' ? ' ↓' : '', sF: st.bsort === 'form' ? ' ↓' : '',
    };
  }

  visitsVals() {
    const st = this.state, S = this.S, ds = S.dataset(), list = this.sessList();
    const test = { all: () => true, conv: (s) => !!s.goal, form: (s) => s.form, read: (s) => s.read, bounce: (s) => s.bounce };
    const rows = list.filter(test[st.vf] || test.all);
    const when = (v) => (v.day === 0 ? 'dnes' : v.day === 1 ? 'včera' : dl(ds.dates[v.day])) + ' ' + two(v.hour) + ':' + two(v.minute);
    return {
      vFilters: VF.map(([k, label]) => { const on = st.vf === k; return { label, count: fmt(list.filter(test[k]).length), bg: on ? '#1A1714' : '#FFFFFF', fg: on ? '#F5EFE4' : '#3A332C', bd: on ? '#1A1714' : '#D9CFBC', onClick: () => this.setState({ vf: k, vlimit: 40 }) }; }),
      vRows: rows.slice(0, st.vlimit).map((s) => {
        const o = s.goal ? GM[s.goal] : null, g = S.srcGroup(s.v.ref);
        return { when: when(s.v), dev: s.v.dev === 'm' ? 'smartphone' : 'computer', src: s.v.ref || 'přímo', srcColor: (SRC[g] || SRC.other)[1], steps: s.pages.slice(0, 4).map((e, i) => ({ t: clip(this.short(e.p), 26), arrow: i ? 'inline' : 'none', bg: e.p.startsWith('/blog/') ? '#EDE4D3' : '#F0EBE2' })), more: s.pages.length > 4 ? '+' + (s.pages.length - 4) : '', moreD: s.pages.length > 4 ? 'inline' : 'none', pagesN: fmt(s.pages.length), dur: dur(s.dur), outcome: o ? o.s : s.bounce ? 'Odešel hned' : 'Bez kontaktu', obg: o ? o.bg : '#F5F1EA', ofg: o ? o.c : '#6B6055', open: () => this.setState({ drawer: { type: 'visit', id: s.v.id, day: s.v.day } }) };
      }),
      vEmpty: !rows.length, vMore: rows.length > st.vlimit, vMoreLabel: 'Zobrazit dalších 40 (zbývá ' + fmt(rows.length - st.vlimit) + ')', vShowMore: () => this.setState({ vlimit: st.vlimit + 40 }),
      vSummary: fmt(rows.length) + ' návštěv · ' + fmt(rows.filter((s) => s.goal).length) + ' s kontaktem',
    };
  }

  flowsVals(a) {
    const st = this.state, S = this.S;
    const rows = Object.entries(a.paths).filter(([, v]) => !st.pconv || v.conv > 0).sort((x, y) => y[1].n - x[1].n || x[0].localeCompare(y[0]));
    const tr = (label, sub, v) => Object.assign({ label, sub, n: fmt(v.n), conv: fmt(v.conv) }, this.rate(v.conv, v.n, 0.1));
    return {
      skOpts: seg([[true, 'Jen návštěvy s kontaktem'], [false, 'Všechny návštěvy']], st.skConv, (k) => this.setState({ skConv: k })),
      sankeySvg: this.sankey(a, st.skConv),
      pModeOpts: seg([[true, 'Cesty ke kontaktu'], [false, 'Všechny cesty']], st.pconv, (k) => this.setState({ pconv: k, plimit: 10 })),
      pRows: rows.slice(0, st.plimit).map(([k, v]) => ({ n: fmt(v.n), steps: this.steps(k) })),
      pEmpty: !rows.length, pMore: rows.length > st.plimit, pMoreLabel: 'Zobrazit dalších 25 (zbývá ' + fmt(rows.length - st.plimit) + ')', pShowMore: () => this.setState({ plimit: st.plimit + 25 }),
      refRows: Object.entries(a.refs).sort((x, y) => y[1].n - x[1].n).slice(0, 12).map(([k, v]) => tr(k || 'Přímo / neznámé', (SRC[S.srcGroup(k)] || SRC.other)[0], v)),
      entryRows: Object.entries(a.entries).sort((x, y) => y[1].n - x[1].n).slice(0, 12).map(([k, v]) => tr(clip(S.pageName(k, 'cs'), 52), S.pageKind(k, 'cs') + ' · ' + k, v)),
    };
  }

  drawerVM() {
    const dr = this.state.drawer;
    if (!dr) return null;
    const S = this.S, a = this._a;
    const base = { showAfter: false, after: [], showList: false, list: [], listEmpty: false, showPaths: false, paths: [], pathsEmpty: false, showDepth: false, depth: [], showChart: false, chart: null, showTimeline: false, timeline: [], hasLink: false, href: '', kpis: [] };
    const afterRows = (after, total, conv) => GOALS.map((g) => ({ label: GM[g].l, n: fmt(after[g]), w: (total ? (after[g] / total) * 100 : 0) + '%', color: GM[g].c })).concat([{ label: 'Bez kontaktu', n: fmt(total - conv), w: (total ? ((total - conv) / total) * 100 : 0) + '%', color: '#C7BBA6' }]);
    if (dr.type === 'button') {
      const g = this.groups(dr.mode).find((x) => x.key === dr.key);
      if (!g) return Object.assign(base, { catLabel: 'Tlačítko', chipBg: '#F0EBE2', chipFg: '#3A332C', title: 'V tomto období žádné kliky', sub: 'Zvolte delší období nebo jiný filtr.' });
      const own = !!CONTACT[g.cat], p0 = g.places[0], one = g.places.length === 1;
      return Object.assign(base, this.chip(g.cat), {
        title: S.clickLabel(g.cat, g.label), sub: one ? S.areaName(p0.area, 'cs') + ' · ' + S.pageName(p0.page, 'cs') : 'Na ' + g.places.length + ' místech webu',
        kpis: [
          { label: 'Kliky', value: fmt(g.n), note: 'mobil ' + fmt(g.m) + ' · počítač ' + fmt(g.d) },
          own ? { label: 'Kontakt', value: 'přímo', note: 'klik ' + OWN[g.cat] } : { label: 'Kontakt potom', value: fmt(g.conv), note: pct(g.conv, g.n) + ' kliků' },
          own ? { label: 'Na mobilu', value: pct(g.m, g.n), note: 'kliků' } : { label: 'Formulář potom', value: fmt(g.after.enquiry), note: 'odeslané poptávky' },
        ],
        showAfter: !own, afterTitle: 'Co se stalo po kliku', after: own ? [] : afterRows(g.after, g.n, g.conv),
        showList: true, listTitle: one ? 'Místo' : 'Kde tlačítko je', listHead: 'Stránka · oblast',
        list: g.places.map((c) => Object.assign({ chipDisplay: 'none', catLabel: '', chipBg: 'transparent', chipFg: 'inherit', title: clip(S.pageName(c.page, 'cs'), 52), sub: S.areaName(c.area, 'cs') + ' · ' + c.page, n: fmt(c.n) }, own ? this.own() : this.rate(c.conv, c.n, 0.5))),
      });
    }
    if (dr.type === 'article') {
      const r = this.articles().find((x) => x.art.slug === dr.slug);
      if (!r) return null;
      const d = r.depth, reached = [0, 1, 2, 3].map((i) => d.b.slice(i).reduce((s, x) => s + x, 0));
      const paths = Object.entries(a.paths).filter(([k]) => k.split(' › ').indexOf(r.p) >= 0).sort((x, y) => (y[1].conv > 0) - (x[1].conv > 0) || y[1].n - x[1].n).slice(0, 6).map(([k, v]) => ({ n: fmt(v.n), steps: this.steps(k, r.p) }));
      const list = r.list.slice().sort((x, y) => y.n - x.n).slice(0, 12).map((c) => Object.assign(this.chip(c.cat), { chipDisplay: 'inline-block', title: clip(S.clickLabel(c.cat, c.label), 52), sub: S.areaName(c.area, 'cs'), n: fmt(c.n) }, CONTACT[c.cat] ? this.own() : this.rate(c.conv, c.n, 0.5)));
      return Object.assign(base, {
        catLabel: 'Článek', chipBg: '#EDE4D3', chipFg: '#58413F', title: r.art.title, sub: r.art.cat + ' · publikováno ' + dateCz(r.art.date), hasLink: true, href: 'https://zuzapragtour.de/blog/' + r.art.slug,
        kpis: [
          { label: 'Zobrazení', value: fmt(r.views), note: 'z toho ' + fmt(r.entries) + ' jako vstup' },
          { label: 'Kontakt potom', value: fmt(r.conv), note: pct(r.conv, r.views) + ' čtenářů' },
          { label: 'Ø čas čtení', value: d.n ? dur(Math.round(d.time / d.n)) : '–', note: d.n ? 'dočteno ' + pct(d.b[3], d.n) : 'bez dat' },
        ],
        showDepth: d.n > 0, depth: reached.map((n, i) => ({ label: 'Došli do ' + (i + 1) * 25 + ' %', n: pct(n, d.n), w: (d.n ? (n / d.n) * 100 : 0) + '%', color: ['#C7BBA6', '#A88654', '#8C6A3C', '#6B1F2A'][i] })),
        showChart: r.days.length > 1, chart: this.spark(this.pts(r.days, 60), '#8C6A3C', 520, 90),
        showAfter: true, afterTitle: 'Co čtenáři udělali potom', after: afterRows(r.after, r.views, r.conv),
        showList: true, listTitle: 'Na co tu čtenáři klikají', listHead: 'Tlačítko · oblast', list, listEmpty: !list.length,
        showPaths: true, paths, pathsEmpty: !paths.length,
      });
    }
    const ds = S.dataset(), v = ds.visits.find((x) => x.id === dr.id && x.day === dr.day);
    if (!v) return null;
    let sec = 0, pStart = 0, pT = 0;
    const tl = [], blank = { showDepth: 'none', depthW: '0%' };
    v.ev.forEach((e) => {
      if (e.k === 'page') {
        pStart = e.at != null ? Math.max(sec, e.at) : sec; pT = e.t || 10; sec = pStart + pT;
        tl.push({ at: mmss(pStart), icon: e.p.startsWith('/blog/') ? 'menu_book' : 'description', color: '#3A332C', ibg: '#F0EBE2', fw: '600', title: S.pageName(e.p, 'cs'), sub: S.pageKind(e.p, 'cs') + ' · ' + dur(pT) + (e.depth ? ' · dočteno ' + e.depth + ' %' : ''), showDepth: e.depth ? 'block' : 'none', depthW: (e.depth || 0) + '%' });
      } else {
        const at = mmss(e.at != null ? e.at : Math.min(sec, pStart + Math.round(pT * 0.75)));
        if (isGoal(e)) { const g = goalOf(e); tl.push(Object.assign({ at, icon: GM[g].i, color: GM[g].c, ibg: GM[g].bg, fw: '700', title: g === 'enquiry' ? 'Odeslal formulář' : GM[g].l, sub: g === 'enquiry' ? 'Prohlídka: ' + e.l + ' · ' + S.areaName(e.a, 'cs') : S.areaName(e.a, 'cs') + ' · „' + clip(e.l, 40) + '“' }, blank)); }
        else if (e.k === 'copy') tl.push(Object.assign({ at, icon: 'content_copy', color: GM[e.c].c, ibg: GM[e.c].bg, fw: '600', title: e.c === 'email' ? 'Zkopíroval e-mailovou adresu' : 'Zkopíroval telefonní číslo', sub: S.areaName(e.a, 'cs') + ' · označil a zkopíroval, neklikl' }, blank));
        else tl.push(Object.assign({ at, icon: 'ads_click', color: '#8C6A3C', ibg: '#F3ECDD', fw: '500', title: 'Klik: „' + clip(S.clickLabel(e.c, e.l), 50) + '“', sub: S.areaName(e.a, 'cs') + ' · ' + (S.CAT_L.cs[e.c] || '') }, blank));
      }
    });
    const g0 = v.ev.find(isGoal), goal = g0 ? goalOf(g0) : null, pages = v.ev.filter((e) => e.k === 'page').length;
    tl.push(Object.assign({ at: mmss(sec), icon: goal ? 'check_circle' : 'logout', color: goal ? '#25633A' : '#A89880', ibg: goal ? '#E3F1E6' : '#F5F1EA', fw: '600', title: goal ? 'Konec návštěvy · kontakt navázán' : 'Odešel z webu', sub: '' }, blank));
    return Object.assign(base, {
      catLabel: 'Návštěva', chipBg: '#F0EBE2', chipFg: '#3A332C', title: 'Návštěva #' + v.id,
      sub: (v.dev === 'm' ? 'Mobil' : 'Počítač') + ' · ' + (v.ref || 'přímo') + ' · ' + (v.day === 0 ? 'dnes' : v.day === 1 ? 'včera' : dl(ds.dates[v.day])) + ' v ' + two(v.hour) + ':' + two(v.minute),
      kpis: [{ label: 'Stránky', value: fmt(pages), note: 'zobrazeno' }, { label: 'Doba', value: dur(sec), note: 'na webu celkem' }, { label: 'Výsledek', value: goal ? GM[goal].s : '–', note: goal ? 'první kontakt' : 'bez kontaktu' }],
      showTimeline: true, timeline: tl,
    });
  }

  paletteVals() {
    const st = this.state, S = this.S, q = st.pq.trim().toLowerCase();
    const tabItems = TABS.map(([k, l, i]) => ({ icon: i, title: 'Přejít na: ' + l, sub: 'Záložka', run: () => this.setState({ view: 'all', tab: k, palette: false, drawer: null }) }))
      .concat([['wa', 'WhatsApp tlačítko', 'chat'], ['forms', 'Formuláře', 'edit_note'], ['tours', 'Túry', 'map']].map(([k, l, i]) => ({ icon: i, title: 'Přejít na: ' + l, sub: 'Podsekce Kliky a poptávky', run: () => this.setState({ view: k, navOpen: true, palette: false, drawer: null }) })));
    const artItems = this.articles().slice().sort((x, y) => y.views - x.views).map((r) => ({ icon: 'article', title: r.art.title, sub: 'Článek · ' + fmt(r.views) + ' zobrazení · ' + fmt(r.conv) + ' ' + plural(r.conv, 'kontakt', 'kontakty', 'kontaktů'), run: () => this.setState({ palette: false, drawer: { type: 'article', slug: r.art.slug } }) }));
    const btnItems = this.groups('label').slice(0, 150).map((g) => ({ icon: 'ads_click', title: S.clickLabel(g.cat, g.label), sub: 'Tlačítko · ' + (S.CAT_L.cs[g.cat] || '') + ' · ' + fmt(g.n) + ' kliků', run: () => this.setState({ palette: false, drawer: { type: 'button', key: g.key, mode: 'label' } }) }));
    const res = q ? tabItems.concat(artItems, btnItems).filter((it) => (it.title + ' ' + it.sub).toLowerCase().includes(q)).slice(0, 12) : tabItems.concat(artItems.slice(0, 4), btnItems.slice(0, 4));
    this._pItems = res;
    return {
      pItems: res.map((it, i) => ({ icon: it.icon, title: it.title, sub: it.sub, run: it.run, bg: i === st.psel ? '#F5EFE4' : 'transparent', enter: () => { if (this.state.psel !== i) this.setState({ psel: i }); } })),
      pEmpty: !res.length, pq: st.pq, onPq: (e) => this.setState({ pq: e.target.value, psel: 0 }),
      pRef: (el) => { if (el && document.activeElement !== el) el.focus(); },
    };
  }

  visitsIn(off) {
    return this.memo('vis' + off, () => {
      const st = this.state, S = this.S, f = this.filt(), nm = S.nowMinute(), lo = off * st.range, hi = lo + st.range;
      return S.dataset().visits.filter((v) => v.day >= lo && v.day < hi && (st.dev === 'all' || v.dev === st.dev) && (!f || f(v)) && S.happened(v, nm));
    });
  }
  visDen() {
    return this.memo('den', () => {
      const S = this.S, o = { V: 0, cv: 0, dev: {}, src: {}, ent: {}, page: {} }, inc = (m, k) => (m[k] = (m[k] || 0) + 1);
      this.visitsIn(0).forEach((v) => {
        o.V++; if (v.ev.some(isGoal)) o.cv++;
        inc(o.dev, v.dev); inc(o.src, S.srcGroup(v.ref)); inc(o.ent, pgType(v.ev[0].p));
        new Set(v.ev.filter((e) => e.k === 'page').map((e) => e.p)).forEach((p) => inc(o.page, p));
      });
      return o;
    });
  }
  evTimes(v) {
    if (v.ev.every((e) => e.at != null)) return v.ev.map((e) => e.at);
    let sec = 0, pStart = 0, pT = 0;
    return v.ev.map((e) => { if (e.k === 'page') { pStart = sec; pT = e.t || 10; sec += pT; return pStart; } return Math.min(sec, pStart + Math.round(pT * 0.75)); });
  }
  waList(off) {
    return this.memo('wa' + off, () => {
      const out = [];
      this.visitsIn(off).forEach((v) => {
        let at = null, seen = false;
        v.ev.forEach((e, i) => {
          if (e.k !== 'click' || e.c !== 'whatsapp') return;
          at = at || this.evTimes(v);
          const pages = v.ev.slice(0, i).filter((x) => x.k === 'page'), tours = pages.filter((x) => x.p.startsWith('/tours/'));
          out.push({ v, e, at: at[i], pages, tour: tours.length ? tours[tours.length - 1].p.slice(7) : null, arts: Array.from(new Set(pages.filter((x) => x.p.startsWith('/blog/')).map((x) => x.p))), formSeen: pages.some((x) => isForm(x.p)), firstWa: !seen });
          seen = true;
        });
      });
      return out;
    });
  }
  formList(off) {
    return this.memo('fl' + off, () => {
      const out = [];
      this.visitsIn(off).forEach((v) => {
        const i = v.ev.findIndex((e) => e.k === 'page' && isForm(e.p));
        if (i < 0) return;
        const btn = i > 0 && v.ev[i - 1].k === 'click' ? v.ev[i - 1] : null, before = v.ev.slice(0, i).filter((x) => x.k === 'page'), rest = v.ev.slice(i + 1);
        const sent = rest.find((x) => x.k === 'enquiry') || null, direct = sent ? null : rest.find((x) => x.k === 'click' && CONTACT[x.c]), tours = before.filter((x) => x.p.startsWith('/tours/'));
        out.push({ v, page: v.ev[i].p, t: v.ev[i].t || 0, btn, from: btn ? btn.p : null, before, entry: v.ev[0].p, tour: tours.length ? tours[tours.length - 1].p.slice(7) : null, sent, outcome: sent ? 'enquiry' : direct ? direct.c : rest.some((x) => x.k === 'page') ? 'away' : 'left', copied: v.ev.some((x) => x.k === 'copy') });
      });
      return out;
    });
  }
  tourList(off) {
    return this.memo('tl' + off, () => {
      const out = [];
      this.visitsIn(off).forEach((v) => {
        const seen = new Set();
        v.ev.forEach((e, i) => {
          if (e.k !== 'page' || !e.p.startsWith('/tours/') || seen.has(e.p)) return;
          seen.add(e.p);
          const slug = e.p.slice(7), btn = i > 0 && v.ev[i - 1].k === 'click' ? v.ev[i - 1] : null, g = v.ev.slice(i + 1).find(isGoal);
          out.push({ v, slug, t: e.t || 0, entry: i === 0, btn, from: btn ? btn.p : null, goal: g ? goalOf(g) : null, enq: g && g.k === 'enquiry' && g.l === this.tourName(slug) });
        });
      });
      return out;
    });
  }
  toursVals(cmp) {
    const st = this.state, S = this.S, T = this.tourList(0), P = cmp ? this.tourList(1) : null, D = this.visDen();
    const uvOf = (arr) => new Set(arr.map((x) => x.v)).size, conv = (arr) => uvOf(arr.filter((x) => x.goal));
    const tv = uvOf(T), tc = conv(T), enq = T.filter((x) => x.enq).length;
    const p1 = P ? { tv: uvOf(P), tc: conv(P), enq: P.filter((x) => x.enq).length, V: this.visitsIn(1).length } : null;
    const tKpis = [
      this.kpi('Zobrazení prohlídek', fmt(T.length), 'v ' + fmt(tv) + ' návštěvách', T.length, P && P.length, 0, ''),
      this.kpi('Návštěv s prohlídkou', pct(tv, D.V), 'otevřelo aspoň jednu prohlídku', D.V ? tv / D.V : 0, p1 && (p1.V ? p1.tv / p1.V : 0), 1, ''),
      this.kpi('Kontakt potom', pct(tc, tv), fmt(tc) + ' návštěv se pak ozvalo', tv ? tc / tv : 0, p1 && (p1.tv ? p1.tc / p1.tv : 0), 1, ''),
      this.kpi('Poptávky na prohlídku', fmt(enq), 'formulář s vybranou prohlídkou', enq, p1 && p1.enq, 0, ''),
    ];
    const by = {}; T.forEach((x) => (by[x.slug] || (by[x.slug] = [])).push(x));
    const slugs = Object.keys(by).sort((a, b) => by[b].length - by[a].length), mx = slugs.length ? by[slugs[0]].length : 1;
    const sel = st.tsel && by[st.tsel] ? st.tsel : null, L = sel ? by[sel] : T, n = L.length;
    const bar = (label, cnt, m, color, sub) => ({ label, n: fmt(cnt), share: pct(cnt, n), w: (cnt / Math.max(1, m)) * 100 + '%', color, sub: sub || '', subD: sub ? 'block' : 'none' });
    const block = (title, keyOf, lab, col, sub, lim) => { const o = {}; L.forEach((x) => { const k = keyOf(x); (o[k] || (o[k] = [])).push(x); }); const ks = Object.keys(o).sort((a, b) => o[b].length - o[a].length).slice(0, lim || 8), m = ks.length ? o[ks[0]].length : 1; return { title, rows: ks.map((k) => bar(lab(k), o[k].length, m, col(k), sub ? sub(k, o[k]) : '')) }; };
    const fromKey = (x) => (x.entry ? '' : x.from || '?');
    const fromLab = (k) => (!k ? 'Přímo na stránku prohlídky' : k === '?' ? 'Neznámé' : k.startsWith('/tours/') ? 'Jiná prohlídka: ' + this.tourName(k.slice(7)) : clip(S.pageName(k, 'cs'), 56));
    const fromCol = (k) => (!k ? '#1A1714' : k.startsWith('/blog/') ? '#A88654' : k.startsWith('/tours/') ? '#58413F' : '#8C6A3C');
    const goalK = (x) => x.goal || 'none';
    const tWho = [
      block('Z jaké stránky přišli', fromKey, fromLab, fromCol, (k, arr) => (!k ? 'první stránka návštěvy · nejčastěji ' + (arr[0].v.ref ? Object.entries(arr.reduce((o, x) => ((o[x.v.ref || 'přímo'] = (o[x.v.ref || 'přímo'] || 0) + 1), o), {})).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([h]) => h).join(', ') : 'přímo') : S.pageKind(k, 'cs'))),
      block('Přes jaké tlačítko', (x) => (x.btn ? x.btn.l + '\t' + x.btn.a : ''), (k) => (k ? '„' + clip(S.clickLabel('tour', k.split('\t')[0]), 40) + '“ · ' + S.areaName(k.split('\t')[1], 'cs') : 'Bez kliku – vstup z vyhledávače, odkazu…'), (k) => (k ? '#8C6A3C' : '#D9CFBC')),
      block('Zdroj návštěvy', (x) => S.srcGroup(x.v.ref), (k) => (SRC[k] || SRC.other)[0], (k) => (SRC[k] || SRC.other)[1], null, 6),
      block('Co udělali potom', goalK, (k) => (k === 'none' ? 'Bez kontaktu' : GM[k].l), (k) => (k === 'none' ? '#D9CFBC' : GM[k].c), null, 5),
      block('Zařízení', (x) => x.v.dev, (k) => (k === 'm' ? 'Mobil' : 'Počítač'), (k) => (k === 'm' ? '#25633A' : '#3A332C')),
    ];
    return {
      tKpis,
      tRows: slugs.map((s) => { const a = by[s], c = conv(a), on = s === sel; return Object.assign({ title: this.tourName(s), url: '/tours/' + s, n: fmt(a.length), w: (a.length / mx) * 100 + '%', entries: fmt(a.filter((x) => x.entry).length), time: dur(median(a.map((x) => x.t))), enq: fmt(a.filter((x) => x.enq).length), enqC: a.some((x) => x.enq) ? '#6B1F2A' : '#A89880', wa: fmt(a.filter((x) => x.goal === 'whatsapp' || x.goal === 'phone').length), bg: on ? '#FAF6EC' : 'transparent', bl: on ? '#6B1F2A' : 'transparent', pick: () => this.setState({ tsel: on ? null : s }) }, this.rate(c, uvOf(a), 0.3)); }),
      tEmpty: !slugs.length,
      tSelName: sel ? this.tourName(sel) : 'Všechny prohlídky', tSelSub: fmt(n) + ' zobrazení' + (sel ? ' · klikněte znovu na řádek pro všechny prohlídky' : ' · vyberte řádek v tabulce pro jednu prohlídku'),
      tClear: () => this.setState({ tsel: null }), tClearD: sel ? 'inline-flex' : 'none', tWho,
    };
  }
  tourName(slug) { const t = this.S.TOUR[slug]; return t ? t.title : slug; }
  whenV(v) { const ds = this.S.dataset(); return (v.day === 0 ? 'dnes' : v.day === 1 ? 'včera' : dl(ds.dates[v.day])) + ' ' + two(v.hour) + ':' + two(v.minute); }
  daySeries(items, off, dayOf, fa, fb) {
    const r = this.state.range, ds = this.S.dataset(), base = off * r;
    const arr = Array.from({ length: r }, (_, j) => ({ date: ds.dates[base + r - 1 - j] || ds.dates[0], a: 0, b: 0 }));
    items.forEach((x) => { const j = r - 1 - (dayOf(x) - base); if (arr[j]) { arr[j].a += fa(x); if (fb) arr[j].b += fb(x); } });
    return arr;
  }
  kpi(label, value, sub, cur, prv, isRate, spark, invert) {
    const o = { label, value, sub, spark: spark || '', showDelta: 'none', delta: '', dbg: 'transparent', dfg: '#6B6055' };
    if (prv != null) {
      const d = isRate ? (cur - prv) * 100 : prv ? ((cur - prv) / prv) * 100 : cur ? 100 : 0, up = d > 0.05, dn = d < -0.05, good = invert ? dn : up, bad = invert ? up : dn;
      Object.assign(o, { showDelta: 'inline-flex', delta: (up ? '▲ ' : dn ? '▼ ' : '') + pc1(Math.abs(d)) + (isRate ? ' p. b.' : ' %'), dbg: good ? '#E3F1E6' : bad ? '#F5E6E6' : '#F0EBE2', dfg: good ? '#25633A' : bad ? '#8A1F1F' : '#6B6055' });
    }
    return o;
  }
  dayChart(cur, prev, o) {
    const step = cur.length > 90 ? 7 : 1;
    const B = chunk(cur, step).map((b) => ({ from: b[0].date, to: b[b.length - 1].date, a: b.reduce((s, x) => s + x.a, 0), b: b.reduce((s, x) => s + x.b, 0) }));
    const P = prev ? chunk(prev, step).map((b) => b.reduce((s, x) => s + x.a, 0)) : null;
    const n = B.length, W = 860, H = 190, L = 34, R = 8, T = 10, A = 156;
    const max = Math.max(1, ...B.map((b) => b.a), ...(P || [0]));
    const xw = (W - L - R) / n, x = (i) => L + xw * (i + 0.5), y = (v) => T + A - (v / max) * A, bw = Math.min(46, Math.max(1, xw - (n > 60 ? 1 : 3)));
    const hov = this.state.dh, k = [];
    [0, 0.5, 1].forEach((f, i) => { const yy = T + A - f * A; k.push(h('line', { key: 'g' + i, x1: L, x2: W - R, y1: yy, y2: yy, stroke: '#E8DFCC' }), h('text', { key: 't' + i, x: L - 6, y: yy + 3.5, textAnchor: 'end', fontSize: 10, fill: '#6B6055' }, fmt(max * f))); });
    B.forEach((b, i) => {
      const op = hov < 0 || hov === i ? 1 : 0.4;
      if (b.a) k.push(h('rect', { key: 'a' + i, x: x(i) - bw / 2, y: y(b.a), width: bw, height: T + A - y(b.a), fill: o.colA, opacity: op }));
      if (o.colB && b.b) k.push(h('rect', { key: 'b' + i, x: x(i) - bw / 2, y: y(b.b), width: bw, height: T + A - y(b.b), fill: o.colB, opacity: op }));
    });
    if (P) k.push(h('path', { key: 'prev', d: P.slice(0, n).map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1)).join(' '), fill: 'none', stroke: o.prevC || '#A89880', strokeWidth: 1.4, strokeDasharray: '4 4' }));
    B.forEach((b, i) => k.push(h('rect', { key: 'h' + i, x: L + xw * i, y: 0, width: xw, height: H, fill: 'transparent', onMouseEnter: () => { if (this.state.dh !== i) this.setState({ dh: i }); } })));
    [0, Math.floor(n / 2), n - 1].forEach((i, j) => k.push(h('text', { key: 'x' + j, x: x(i), y: H - 2, textAnchor: j === 0 ? 'start' : j === 2 ? 'end' : 'middle', fontSize: 10, fill: '#6B6055' }, j === 2 && step === 1 ? 'dnes' : dl(B[i].from))));
    const hb = B[hov], when = (b) => (step === 1 ? DOW[b.from.getDay()] + ' ' + dl(b.from) : dl(b.from) + ' – ' + dl(b.to));
    const info = hb ? when(hb) + ': ' + o.say(hb.a, hb.b) + (P && P[hov] != null ? ' (předtím ' + fmt(P[hov]) + ')' : '') : (step === 1 ? 'Po dnech' : 'Po týdnech') + ' · ' + o.total + (P ? ' · přerušovaná čára = předchozí období' : '') + '. Najeďte myší na graf.';
    return { svg: h('svg', { viewBox: '0 0 ' + W + ' ' + H, style: { width: '100%', height: 'auto', display: 'block' }, onMouseLeave: () => this.setState({ dh: -1 }) }, k), info };
  }

  waVals(cmp) {
    const st = this.state, S = this.S, ds = S.dataset(), A = this.waList(0), P = cmp ? this.waList(1) : null, D = this.visDen();
    const uvOf = (arr) => new Set(arr.map((c) => c.v)).size, kl = (x) => plural(x, 'klik', 'kliky', 'kliků');
    const n = A.length, uv = uvOf(A), m = A.filter((c) => c.v.dev === 'm').length, firsts = A.filter((c) => c.firstWa);
    let p1 = null;
    if (P) { const pv = this.visitsIn(1), pu = uvOf(P), cv = pv.filter((v) => v.ev.some(isGoal)).length; p1 = { n: P.length, rate: pv.length ? pu / pv.length : 0, share: cv ? pu / cv : 0 }; }
    const step = st.range > 90 ? 7 : st.range > 30 ? 3 : 1, sum = (arr, k) => chunk(arr, step).map((b) => b.reduce((s, x) => s + x[k], 0));
    const dA = this.daySeries(A, 0, (c) => c.v.day, () => 1, (c) => (c.firstWa ? 1 : 0)), dV = this.memo('dayV', () => this.daySeries(this.visitsIn(0), 0, (v) => v.day, () => 1));
    const sA = sum(dA, 'a'), sU = sum(dA, 'b'), sV = sum(dV, 'a');
    const waKpis = [
      this.kpi('Kliky na WhatsApp', fmt(n), uv ? 'v ' + fmt(uv) + ' ' + plural(uv, 'návštěvě', 'návštěvách', 'návštěvách') : 'žádná návštěva', n, p1 && p1.n, 0, this.spark(sA, '#25633A')),
      this.kpi('Míra kliku', pct(uv, D.V), 'návštěv klikne na WhatsApp', D.V ? uv / D.V : 0, p1 && p1.rate, 1, this.spark(sU.map((u, i) => (sV[i] ? u / sV[i] : 0)), '#3A332C')),
      this.kpi('Podíl na kontaktech', pct(uv, D.cv), 'návštěv s kontaktem kliklo na WhatsApp', D.cv ? uv / D.cv : 0, p1 && p1.share, 1, ''),
      this.kpi('Z mobilu', pct(m, n), 'mobil ' + fmt(m) + ' · počítač ' + fmt(n - m), 0, null, 0, ''),
      this.kpi('Doba do kliku', firsts.length ? dur(median(firsts.map((c) => c.at))) : '–', 'medián od příchodu na web', 0, null, 0, ''),
    ];
    const ch = this.dayChart(dA, P ? this.daySeries(P, 1, (c) => c.v.day, () => 1) : null, { colA: '#25633A', say: (a) => fmt(a) + ' ' + kl(a), total: 'celkem ' + fmt(n) + ' ' + kl(n) });
    const pl = {};
    A.forEach((c) => { const k = c.e.l + '\t' + c.e.a + '\t' + c.e.p, g = pl[k] || (pl[k] = { label: c.e.l, area: c.e.a, page: c.e.p, n: 0, m: 0, vs: new Set() }); g.n++; if (c.v.dev === 'm') g.m++; g.vs.add(c.v); });
    const places = Object.values(pl).sort((x, y) => y.n - x.n), pmax = places.length ? places[0].n : 1;
    const grp = (keyOf) => { const o = {}; A.forEach((c) => { const k = keyOf(c); (o[k] || (o[k] = [])).push(c); }); return o; };
    const top = (arr, keyOf, k) => { const o = {}; arr.forEach((c) => { const x = keyOf(c); if (x) o[x] = (o[x] || 0) + 1; }); return Object.keys(o).sort((x, y) => o[y] - o[x]).slice(0, k); };
    const bar = (label, cnt, mx, color, sub) => ({ label, n: fmt(cnt), share: pct(cnt, n), w: (cnt / Math.max(1, mx)) * 100 + '%', color, sub: sub || '', subD: sub ? 'block' : 'none' });
    const rows = (o, order, lab, col, sub) => { const ks = (order || Object.keys(o).sort((x, y) => o[y].length - o[x].length)).filter((k) => o[k]), mx = Math.max(1, ...ks.map((k) => o[k].length)); return ks.map((k) => bar(lab(k), o[k].length, mx, col(k), sub ? sub(k, o[k]) : '')); };
    const byDev = grp((c) => c.v.dev), bySrc = grp((c) => S.srcGroup(c.v.ref)), byEnt = grp((c) => pgType(c.v.ev[0].p)), byTour = grp((c) => c.tour || '');
    const artN = {}; let noArt = 0;
    A.forEach((c) => { if (!c.arts.length) noArt++; c.arts.forEach((p) => (artN[p] = (artN[p] || 0) + 1)); });
    const artK = Object.keys(artN).sort((x, y) => artN[y] - artN[x]).slice(0, 5), amx = Math.max(1, noArt, ...artK.map((k) => artN[k]));
    const pb = [0, 0, 0, 0]; A.forEach((c) => pb[Math.min(3, Math.max(0, c.pages.length - 1))]++);
    const formSeen = A.filter((c) => c.formSeen).length;
    const waWho = [
      { title: 'Zařízení', rows: rows(byDev, ['m', 'd'], (k) => (k === 'm' ? 'Mobil' : 'Počítač'), (k) => (k === 'm' ? '#25633A' : '#3A332C'), (k, arr) => 'klikne ' + pct(uvOf(arr), D.dev[k] || 0) + ' návštěv z ' + (k === 'm' ? 'mobilu' : 'počítače')) },
      { title: 'Odkud přišli', rows: rows(bySrc, null, (k) => (SRC[k] || SRC.other)[0], (k) => (SRC[k] || SRC.other)[1], (k, arr) => { const hs = top(arr, (c) => c.v.ref, 2).join(', '); return (hs ? hs + ' · ' : '') + 'klikne ' + pct(uvOf(arr), D.src[k] || 0) + ' návštěv'; }) },
      { title: 'Čím návštěva začala', rows: rows(byEnt, null, (k) => ENTRY_L[k], () => '#8C6A3C', (k, arr) => { const t = top(arr, (c) => c.v.ev[0].p, 1)[0]; return (k !== 'home' && k !== 'form' && t ? clip(this.short(t), 38) + ' · ' : '') + 'klikne ' + pct(uvOf(arr), D.ent[k] || 0) + ' návštěv'; }) },
      { title: 'Prohlídka, kterou si předtím prohlíželi', rows: rows(byTour, null, (k) => (k ? this.tourName(k) : 'Žádnou prohlídku neotevřeli'), (k) => (k ? '#A88654' : '#D9CFBC'), (k, arr) => { if (!k) return ''; const here = arr.filter((c) => c.e.p === '/tours/' + k).length; return here ? 'z toho ' + fmt(here) + ' přímo na její stránce' : ''; }) },
      { title: 'Co předtím četli', rows: artK.map((k) => bar(clip(S.pageName(k, 'cs'), 56), artN[k], amx, '#A88654')).concat(noArt ? [bar('Žádný článek', noArt, amx, '#D9CFBC')] : []) },
      { title: 'Na kolikáté stránce klikli', rows: ['Hned na první stránce', 'Na druhé', 'Na třetí', 'Na čtvrté a další'].map((l, i) => bar(l, pb[i], Math.max(...pb), '#3A332C')) },
    ].map((c, i) => Object.assign(c, { note: i === 5 && formSeen ? fmt(formSeen) + ' ' + kl(formSeen) + ' přišlo od návštěv, které předtím otevřely formulář.' : '', noteD: i === 5 && formSeen ? 'block' : 'none' }));
    const hrs = new Array(24).fill(0), wds = new Array(7).fill(0);
    A.forEach((c) => { hrs[c.v.hour]++; wds[(ds.dates[c.v.day].getDay() + 6) % 7]++; });
    const hmx = Math.max(1, ...hrs), wmx = Math.max(1, ...wds), barOf = (v, mx) => ({ h: v ? Math.max(4, (v / mx) * 100) + '%' : '2px', bg: v ? 'rgba(37,99,58,' + (0.3 + 0.7 * (v / mx)).toFixed(3) + ')' : '#E8DFCC' });
    let bh = 0, bs = -1;
    for (let hh = 0; hh < 24; hh++) { const s3 = hrs[hh] + hrs[(hh + 1) % 24] + hrs[(hh + 2) % 24]; if (s3 > bs) { bs = s3; bh = hh; } }
    const bd = wds.indexOf(Math.max(...wds));
    const pathN = {};
    A.forEach((c) => { const k = squeeze(dedupe(c.pages.map((e) => e.p))).concat(['✓ WhatsApp']).join(' › '); pathN[k] = (pathN[k] || 0) + 1; });
    const types = {}; A.forEach((c) => { const t = pgType(c.e.p); types[t] = (types[t] || 0) + 1; });
    const wf = st.wf !== 'all' && !types[st.wf] ? 'all' : st.wf;
    const list = (wf === 'all' ? A : A.filter((c) => pgType(c.e.p) === wf)).slice().sort((x, y) => x.v.day - y.v.day || y.v.hour - x.v.hour || y.v.minute - x.v.minute || y.at - x.at);
    return {
      waKpis, waChart: ch.svg, waChartInfo: ch.info, prevLegend: P ? 'flex' : 'none',
      waPlaces: places.map((g) => Object.assign({ label: '„' + g.label + '“', where: S.areaName(g.area, 'cs'), page: clip(S.pageName(g.page, 'cs'), 48), kind: S.pageKind(g.page, 'cs') + ' · ' + g.page, n: fmt(g.n), m: fmt(g.m), d: fmt(g.n - g.m), mW: (g.m / g.n) * 100 + '%', share: pct(g.n, n), shareW: Math.max(2, (g.n / pmax) * 56) + 'px' }, this.rate(g.vs.size, D.page[g.page] || 0, 0.25))),
      waEmpty: !n, waWho,
      hourLabels: Array.from({ length: 24 }, (_, i) => (i % 3 ? '' : String(i))),
      waHours: hrs.map((v, i) => Object.assign({ title: two(i) + ':00–' + two(i) + ':59 · ' + fmt(v) + ' ' + kl(v) }, barOf(v, hmx))),
      waDays: WEEK.map((d, i) => Object.assign({ day: d, title: WEEK_FULL[i] + ' · ' + fmt(wds[i]) + ' ' + kl(wds[i]) }, barOf(wds[i], wmx))),
      waWhenNote: n ? 'Nejvíc kliků mezi ' + bh + ' a ' + ((bh + 3) % 24) + ' h (' + pct(bs, n) + ' všech), nejsilnější den je ' + WEEK_FULL[bd] + '.' : 'V tomto období žádné kliky.',
      waPaths: Object.entries(pathN).sort((x, y) => y[1] - x[1] || x[0].localeCompare(y[0])).slice(0, 8).map(([k, c]) => ({ n: fmt(c), steps: this.steps(k) })),
      waFilters: [['all', 'Vše']].concat(['home', 'tour', 'form', 'article', 'other'].filter((t) => types[t]).map((t) => [t, PT_FROM[t]])).map(([k, label]) => Object.assign({ label, count: fmt(k === 'all' ? n : types[k]), onClick: () => this.setState({ wf: k, wlimit: 30 }) }, chipF(wf === k))),
      waRows: list.slice(0, st.wlimit).map((c) => {
        const ps = dedupe(c.pages.map((e) => e.p)), last = ps.slice(-4), g = S.srcGroup(c.v.ref), cut = ps.length > 4;
        return {
          when: this.whenV(c.v), dev: c.v.dev === 'm' ? 'smartphone' : 'computer', src: c.v.ref || 'přímo', srcColor: (SRC[g] || SRC.other)[1],
          more: cut ? '+' + (ps.length - 4) : '', moreD: cut ? 'inline' : 'none',
          steps: last.map((p, i) => { const end = i === last.length - 1; return { t: clip(this.short(p), 26), arrow: i || cut ? 'inline' : 'none', bg: end ? '#E3F1E6' : p.startsWith('/blog/') ? '#EDE4D3' : '#F0EBE2', fg: end ? '#25633A' : '#1A1714', fw: end ? '700' : '400' }; }),
          btn: S.areaName(c.e.a, 'cs'), btnSub: '„' + c.e.l + '“', after: dur(c.at),
          tour: c.tour ? this.tourName(c.tour) : '–', tourC: c.tour ? '#1A1714' : '#A89880',
          open: () => this.setState({ drawer: { type: 'visit', id: c.v.id, day: c.v.day } }),
        };
      }),
      waListEmpty: !list.length, waMore: list.length > st.wlimit, waMoreLabel: 'Zobrazit dalších 30 (zbývá ' + fmt(list.length - st.wlimit) + ')', waShowMore: () => this.setState({ wlimit: st.wlimit + 30 }),
      waSummary: fmt(list.length) + ' ' + kl(list.length) + ' · ' + fmt(uvOf(list)) + ' návštěv',
    };
  }

  formVals(cmp) {
    const st = this.state, S = this.S, F = this.formList(0), P = cmp ? this.formList(1) : null, D = this.visDen();
    const stat = (list) => { const o = { opened: list.length, sent: 0, direct: 0, none: 0, by: {} }; list.forEach((f) => { o.by[f.outcome] = (o.by[f.outcome] || 0) + 1; if (f.outcome === 'enquiry') o.sent++; else if (CONTACT[f.outcome]) o.direct++; else o.none++; }); return o; };
    const s0 = stat(F), s1 = P ? stat(P) : null, by = (k) => s0.by[k] || 0;
    const step = st.range > 90 ? 7 : st.range > 30 ? 3 : 1, sum = (arr, k) => chunk(arr, step).map((b) => b.reduce((s, x) => s + x[k], 0));
    const dF = this.daySeries(F, 0, (f) => f.v.day, () => 1, (f) => (f.outcome === 'enquiry' ? 1 : 0)), sO = sum(dF, 'a'), sS = sum(dF, 'b');
    const kinds = { booking: 0, contact: 0 };
    F.forEach((f) => { if (f.sent) kinds[f.sent.a] = (kinds[f.sent.a] || 0) + 1; });
    const fKpis = [
      this.kpi('Otevřeli formulář', fmt(s0.opened), pct(s0.opened, D.V) + ' všech návštěv', s0.opened, s1 && s1.opened, 0, this.spark(sO, '#8C6A3C')),
      this.kpi('Odeslali', fmt(s0.sent), 'Rezervace ' + fmt(kinds.booking) + ' · Kontakt ' + fmt(kinds.contact), s0.sent, s1 && s1.sent, 0, this.spark(sS, '#6B1F2A')),
      this.kpi('Dokončení', pct(s0.sent, s0.opened), 'otevřených formulářů odesláno', s0.opened ? s0.sent / s0.opened : 0, s1 && (s1.opened ? s1.sent / s1.opened : 0), 1, this.spark(sS.map((x, i) => (sO[i] ? x / sO[i] : 0)), '#3A332C')),
      this.kpi('Ozvali se jinak', fmt(s0.direct), 'WhatsApp ' + fmt(by('whatsapp')) + ' · tel. ' + fmt(by('phone')) + ' · e-mail ' + fmt(by('email')), s0.direct, s1 && s1.direct, 0, ''),
      this.kpi('Bez kontaktu', fmt(s0.none), pct(s0.none, s0.opened) + ' otevřených formulářů', s0.none, s1 && s1.none, 0, '', true),
    ];
    const ch = this.dayChart(dF, P ? this.daySeries(P, 1, (f) => f.v.day, () => 1) : null, { colA: '#C7BBA6', colB: '#6B1F2A', prevC: '#1A1714', say: (a, b) => fmt(a) + ' otevřeli · ' + fmt(b) + ' odeslali', total: 'celkem ' + fmt(s0.opened) + ' otevřeli, ' + fmt(s0.sent) + ' odeslali' });
    const byBtn = st.fsMode === 'btn', src = {};
    F.forEach((f) => {
      const k = !f.btn ? '' : byBtn ? f.btn.c + '\t' + f.btn.l + '\t' + f.btn.a : f.from;
      const g = src[k] || (src[k] = { k, btn: f.btn, page: f.from, n: 0, sent: 0, direct: 0, sub: {} });
      g.n++; if (f.outcome === 'enquiry') g.sent++; else if (CONTACT[f.outcome]) g.direct++;
      const sk = !f.btn ? f.v.ref || 'přímo' : byBtn ? f.from : S.clickLabel(f.btn.c, f.btn.l);
      g.sub[sk] = (g.sub[sk] || 0) + 1;
    });
    const srcRows = Object.values(src).sort((x, y) => y.n - x.n || x.k.localeCompare(y.k));
    const fSrcRows = srcRows.slice(0, st.fsLimit).map((g) => {
      const subs = Object.keys(g.sub).sort((x, y) => g.sub[y] - g.sub[x]);
      let hd, sub;
      if (!g.k) { hd = { catLabel: 'Přímý vstup', chipBg: '#F0EBE2', chipFg: '#3A332C', label: 'Formulář byl první stránkou návštěvy' }; sub = 'nejčastěji ' + subs.slice(0, 3).join(', '); }
      else if (byBtn) { hd = Object.assign(this.chip(g.btn.c), { label: '„' + S.clickLabel(g.btn.c, g.btn.l) + '“ · ' + S.areaName(g.btn.a, 'cs') }); sub = subs.length === 1 ? S.pageKind(subs[0], 'cs') + ': ' + clip(S.pageName(subs[0], 'cs'), 50) : 'na ' + subs.length + ' stránkách · nejvíc ' + clip(this.short(subs[0]), 40); }
      else { const art = g.page.startsWith('/blog/'); hd = { catLabel: S.pageKind(g.page, 'cs'), chipBg: art ? '#EDE4D3' : '#F0EBE2', chipFg: art ? '#58413F' : '#3A332C', label: clip(S.pageName(g.page, 'cs'), 70) }; sub = 'přes ' + subs.slice(0, 2).map((x) => '„' + clip(x, 32) + '“').join(', '); }
      return Object.assign(hd, { sub, n: fmt(g.n), sent: fmt(g.sent), sentC: g.sent ? '#6B1F2A' : '#A89880', direct: fmt(g.direct), directC: g.direct ? '#25633A' : '#A89880' }, this.rate(g.sent, g.n, 0.3));
    });
    const segR = (keyOf, lab, order) => { const o = {}; F.forEach((f) => { const k = keyOf(f), g = o[k] || (o[k] = { n: 0, sent: 0 }); g.n++; if (f.outcome === 'enquiry') g.sent++; }); return (order || Object.keys(o).sort((x, y) => o[y].n - o[x].n)).filter((k) => o[k]).map((k) => Object.assign({ label: lab(k), share: pct(o[k].n, s0.opened) + ' otevření', n: fmt(o[k].n), sent: fmt(o[k].sent) }, this.rate(o[k].sent, o[k].n, 0.3))); };
    const OK = ['enquiry', 'whatsapp', 'phone', 'email', 'away', 'left'], omx = Math.max(1, ...OK.map(by));
    const tS = F.filter((f) => f.outcome === 'enquiry').map((f) => f.t), tN = F.filter((f) => f.outcome !== 'enquiry').map((f) => f.t);
    const cpN = F.filter((f) => f.outcome !== 'enquiry' && f.copied).length;
    const fOutNote = (tS.length ? 'Kdo formulář odeslal, strávil na stránce medián ' + dur(median(tS)) + '. ' : '') + (tN.length ? 'Kdo ho neodeslal, odešel z ní po ' + dur(median(tN)) + '.' : '') + (cpN ? ' ' + fmt(cpN) + ' ' + plural(cpN, 'návštěva formulář neodeslala', 'návštěvy formulář neodeslaly', 'návštěv formulář neodeslalo') + ', ale ' + plural(cpN, 'zkopírovala', 'zkopírovaly', 'zkopírovalo') + ' si e-mail nebo telefon – nejspíš napsali napřímo.' : '');
    const tq = {}; F.forEach((f) => { if (f.sent) tq[f.sent.l] = (tq[f.sent.l] || 0) + 1; });
    const tk = Object.keys(tq).sort((x, y) => tq[y] - tq[x]), tmx = tk.length ? tq[tk[0]] : 1;
    const fTest = { all: () => true, sent: (f) => f.outcome === 'enquiry', direct: (f) => !!CONTACT[f.outcome], none: (f) => f.outcome === 'away' || f.outcome === 'left' };
    const list = F.filter(fTest[st.ff] || fTest.all).sort((x, y) => x.v.day - y.v.day || y.v.hour - x.v.hour || y.v.minute - x.v.minute);
    return {
      fKpis, fChart: ch.svg, fChartInfo: ch.info, prevLegend: P ? 'flex' : 'none',
      fsModeOpts: seg([['btn', 'podle tlačítka'], ['page', 'podle stránky']], st.fsMode, (k) => this.setState({ fsMode: k, fsLimit: 10 })),
      fSrcRows, fSrcEmpty: !srcRows.length, fsMore: srcRows.length > st.fsLimit, fsMoreLabel: 'Zobrazit všech ' + fmt(srcRows.length), fsShowMore: () => this.setState({ fsLimit: 999 }),
      fSeg: [
        { head: 'Zařízení', rows: segR((f) => f.v.dev, (k) => (k === 'm' ? 'Mobil' : 'Počítač'), ['m', 'd']) },
        { head: 'Zdroj návštěvy', rows: segR((f) => S.srcGroup(f.v.ref), (k) => (SRC[k] || SRC.other)[0]) },
        { head: 'Čím návštěva začala', rows: segR((f) => pgType(f.entry), (k) => ENTRY_L[k]) },
      ],
      fOut: OK.map((k) => ({ label: OUT[k][0], n: fmt(by(k)), share: pct(by(k), s0.opened), w: (by(k) ? Math.max(1.5, (by(k) / omx) * 100) : 0) + '%', color: OUT[k][1] })),
      fOutNote, fOutNoteD: fOutNote ? 'block' : 'none',
      fTours: tk.map((k) => ({ label: TQ_L[k] || k, n: fmt(tq[k]), share: pct(tq[k], s0.sent), w: (tq[k] / tmx) * 100 + '%', color: TQ_L[k] ? '#C7BBA6' : '#6B1F2A' })), fToursEmpty: !tk.length,
      fFilters: FF.map(([k, label]) => Object.assign({ label, count: fmt(F.filter(fTest[k]).length), onClick: () => this.setState({ ff: k, flimit: 30 }) }, chipF(st.ff === k))),
      fRows: list.slice(0, st.flimit).map((f) => {
        const ps = dedupe(f.before.map((e) => e.p)), cut = ps.length > 3, last = ps.slice(-3), g = S.srcGroup(f.v.ref), o = OUT[f.outcome];
        const steps = last.map((p, i) => ({ t: clip(this.short(p), 24), arrow: i || cut ? 'inline' : 'none', bg: p.startsWith('/blog/') ? '#EDE4D3' : '#F0EBE2', fg: '#1A1714', fw: '400' }))
          .concat([{ t: f.page === '/book' ? 'Rezervace' : 'Kontakt', arrow: last.length ? 'inline' : 'none', bg: '#F6E7E2', fg: '#6B1F2A', fw: '700' }]);
        return {
          when: this.whenV(f.v), dev: f.v.dev === 'm' ? 'smartphone' : 'computer', src: f.v.ref || 'přímo', srcColor: (SRC[g] || SRC.other)[1],
          steps, more: cut ? '+' + (ps.length - 3) : '', moreD: cut ? 'inline' : 'none',
          via: f.btn ? 'přes „' + clip(S.clickLabel(f.btn.c, f.btn.l), 36) + '“ · ' + S.areaName(f.btn.a, 'cs') : 'přímý vstup' + (f.v.ref ? ' z ' + f.v.ref : ''),
          tour: f.sent ? TQ_L[f.sent.l] || f.sent.l : f.tour ? this.tourName(f.tour) : '–', tourSub: f.sent ? 've formuláři' : f.tour ? 'prohlížel si' : '', tourSubD: f.sent || f.tour ? 'block' : 'none', tourC: f.sent || f.tour ? '#1A1714' : '#A89880',
          t: dur(f.t), outcome: o[4], obg: o[2], ofg: o[3],
          open: () => this.setState({ drawer: { type: 'visit', id: f.v.id, day: f.v.day } }),
        };
      }),
      fListEmpty: !list.length, fMore: list.length > st.flimit, fMoreLabel: 'Zobrazit dalších 30 (zbývá ' + fmt(list.length - st.flimit) + ')', fShowMore: () => this.setState({ flimit: st.flimit + 30 }),
      fSummary: fmt(list.length) + ' návštěv · ' + fmt(list.filter(fTest.sent).length) + ' odeslalo',
    };
  }

  exportCsv() {
    if (!this.state.ready) return;
    const st = this.state, S = this.S, a = this.agg(), tab = this.tab(), ds = S.dataset();
    const iso = (d) => d.getFullYear() + '-' + two(d.getMonth() + 1) + '-' + two(d.getDate());
    let head, rows, name;
    const view = this.view(), dt = (v) => [iso(ds.dates[v.day]), two(v.hour) + ':' + two(v.minute), v.dev === 'm' ? 'mobil' : 'počítač', v.ref || 'přímo'];
    if (view === 'wa') { name = 'whatsapp'; head = ['ID návštěvy', 'Datum', 'Čas', 'Zařízení', 'Zdroj', 'Vstupní stránka', 'Stránka s klikem', 'Oblast', 'Tlačítko', 'Sekund do kliku', 'Stránek před klikem', 'Prohlídka předtím', 'Cesta']; rows = this.waList(0).map((c) => [c.v.id].concat(dt(c.v), [c.v.ev[0].p, c.e.p, S.areaName(c.e.a, 'cs'), c.e.l, c.at, c.pages.length, c.tour ? this.tourName(c.tour) : '', c.pages.map((e) => e.p).join(' > ')])); }
    else if (view === 'forms') { name = 'formulare'; head = ['ID návštěvy', 'Datum', 'Čas', 'Zařízení', 'Zdroj', 'Vstupní stránka', 'Předchozí stránka', 'Tlačítko', 'Oblast tlačítka', 'Formulář', 'Sekund na formuláři', 'Výsledek', 'Poptaná prohlídka', 'Cesta']; rows = this.formList(0).map((f) => [f.v.id].concat(dt(f.v), [f.entry, f.from || '', f.btn ? f.btn.l : '', f.btn ? S.areaName(f.btn.a, 'cs') : '', f.page, f.t, OUT[f.outcome][0], f.sent ? f.sent.l : '', f.before.map((e) => e.p).join(' > ')])); }
    else if (view === 'tours') { name = 'tury'; head = ['ID návštěvy', 'Datum', 'Čas', 'Zařízení', 'Zdroj', 'Prohlídka', 'Vstup na web touto stránkou', 'Předchozí stránka', 'Tlačítko', 'Oblast tlačítka', 'Sekund na stránce', 'Potom']; rows = this.tourList(0).map((x) => [x.v.id].concat(dt(x.v), [this.tourName(x.slug), x.entry ? 'ano' : 'ne', x.from || '', x.btn ? S.clickLabel(x.btn.c, x.btn.l) : '', x.btn ? S.areaName(x.btn.a, 'cs') : '', x.t, x.goal ? GM[x.goal].l : ''])); }
    else if (tab === 'content') { name = 'clanky'; head = ['Článek', 'URL', 'Zobrazení', 'Vstupy', 'Dočteno do konce', 'Ø čas (s)', 'Klik na prohlídku', 'Klik na poptávku', 'Kontakt potom', 'Formulář', 'E-mail', 'WhatsApp', 'Telefon']; rows = this.articles().map((r) => [r.art.title, '/blog/' + r.art.slug, r.views, r.entries, r.depth.n ? (r.depth.b[3] / r.depth.n).toFixed(3) : '', r.depth.n ? Math.round(r.depth.time / r.depth.n) : '', r.tour, r.form, r.conv, r.after.enquiry, r.after.email, r.after.whatsapp, r.after.phone]); }
    else if (tab === 'buttons') { name = 'tlacitka'; head = ['Tlačítko', 'Typ', 'Oblast', 'Stránka', 'Kliky', 'Mobil', 'Počítač', 'Kontakt potom', 'Formulář', 'E-mail', 'WhatsApp', 'Telefon']; rows = Object.values(a.clicks).filter((c) => c.cat !== 'enquiry').sort((x, y) => y.n - x.n).map((c) => [S.clickLabel(c.cat, c.label), S.CAT_L.cs[c.cat] || c.cat, S.areaName(c.area, 'cs'), c.page, c.n, c.m, c.d, c.conv, c.after.enquiry, c.after.email, c.after.whatsapp, c.after.phone]); }
    else if (tab === 'visits') { name = 'navstevy'; head = ['ID', 'Datum', 'Čas', 'Zařízení', 'Zdroj', 'Stránky', 'Doba (s)', 'Výsledek', 'Cesta']; rows = this.sessList().map((s) => [s.v.id, iso(ds.dates[s.v.day]), two(s.v.hour) + ':' + two(s.v.minute), s.v.dev === 'm' ? 'mobil' : 'počítač', s.v.ref || 'přímo', s.pages.length, s.dur, s.goal ? GM[s.goal].s : '', s.pages.map((e) => e.p).join(' > ')]); }
    else if (tab === 'flows') { name = 'zdroje'; head = ['Zdroj', 'Skupina', 'Návštěvy', 'S kontaktem']; rows = Object.entries(a.refs).sort((x, y) => y[1].n - x[1].n).map(([k, v]) => [k || 'přímo', (SRC[S.srcGroup(k)] || SRC.other)[0], v.n, v.conv]); }
    else { name = 'prehled'; head = ['Den', 'Návštěvy', 'S kontaktem', 'Formulář', 'E-mail', 'WhatsApp', 'Telefon']; rows = a.series.map((s) => [iso(s.date), s.visits, s.conv, s.goals.enquiry, s.goals.email, s.goals.whatsapp, s.goals.phone]); }
    const esc = (x) => { const s = String(x == null ? '' : x); return /[";\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
    const url = URL.createObjectURL(new Blob(['\ufeff' + [head].concat(rows).map((r) => r.map(esc).join(';')).join('\n')], { type: 'text/csv;charset=utf-8' }));
    const el = document.createElement('a');
    el.href = url; el.download = 'zuzapragtour-' + name + '-' + st.range + 'd.csv';
    document.body.appendChild(el); el.click(); el.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  nav(key) { return () => this.props.onNavigate && this.props.onNavigate(key); }

  render() {
    const V = this.renderVals();
    return h(React.Fragment, null, h('style', null, DASHBOARD_CSS), h(DashboardView, { V }));
  }

  renderVals() {
    const st = this.state, tab = this.tab(), view = this.view(), cmpOn = this.cmpOn(), compact = st.w < 980;
    const sn = (k) => (view === k ? { line: '#A88654', fg: '#F5EFE4', fw: '600', bg: 'rgba(245,239,228,0.08)' } : { line: 'rgba(245,239,228,0.14)', fg: 'rgba(245,239,228,0.62)', fw: '400', bg: 'transparent' });
    const vals = {
      sideWide: !compact, sideCompact: compact,
      goAll: this.go('all'), goWa: this.go('wa'), goForms: this.go('forms'),
      toggleNav: (e) => { if (e && e.stopPropagation) e.stopPropagation(); this.setState({ navOpen: !this.state.navOpen }); },
      navOpen: st.navOpen, navChevron: st.navOpen ? 'expand_less' : 'expand_more',
      sn: { all: sn('all'), wa: sn('wa'), forms: sn('forms'), tours: sn('tours') }, goTours: this.go('tours'),
      hAll: view === 'all', hSub: view !== 'all', hWa: view === 'wa', hForms: view === 'forms', hTours: view === 'tours', showTabs: view === 'all', noTabs: view !== 'all',
      showWa: false, showForms: false, showTours: false,
      tabs: TABS.map(([k, l, i]) => ({ label: l, icon: i, fg: k === tab ? '#1A1714' : '#6B6055', line: k === tab ? '#6B1F2A' : 'transparent', onClick: () => this.setState({ tab: k, drawer: null, hover: -1 }) })),
      devOpts: seg(DEVS, st.dev, (k) => this.setState({ dev: k, hover: -1 })),
      rangeOpts: seg(RANGES, st.range, (k) => this.setState({ range: k, hover: -1 })),
      srcOpts: seg(SRC_OPTS, st.src, (k) => this.setState({ src: k, hover: -1 })),
      cmpTrack: cmpOn ? '#25633A' : '#D9CFBC', cmpKnob: cmpOn ? '15px' : '2px', cmpFg: st.range === 365 ? '#A89880' : '#3A332C',
      cmpTitle: st.range === 365 ? 'Pro 1 rok není předchozí období v datech' : 'Změna proti stejně dlouhému předchozímu období',
      toggleCmp: () => { if (this.state.range < 365) this.setState({ cmp: !this.cmpOn() }); },
      liveDot: h('span', { style: { width: 8, height: 8, borderRadius: 999, background: '#25633A', display: 'inline-block', flexShrink: 0, animation: 'zptPulse 1.8s ease-out infinite' } }),
      liveN: st.liveN, liveLabel: st.liveN + ' ' + plural(st.liveN, 'člověk', 'lidé', 'lidí') + ' právě na webu',
      goLive: () => this.setState({ view: 'all', tab: 'live', drawer: null }),
      openPalette: () => this.setState({ palette: true, pq: '', psel: 0 }),
      closePalette: () => this.setState({ palette: false }),
      exportCsv: () => this.exportCsv(),
      refresh: () => { if (this.state.loading) return; this.setState({ loading: true }); this.load(true); },
      refreshLabel: st.loading ? 'Načítá se …' : 'Obnovit',
      notReady: !st.ready, subtitle: st.error || 'Statistika se načítá …',
      showOverview: false, showLive: false, showContent: false, showButtons: false, showVisits: false, showFlows: false,
      drawerOpen: false, dv: {}, palette: false,
      closeDrawer: () => this.setState({ drawer: null }),
      navArticles: this.nav('articles'), navMedia: this.nav('media'), navTours: this.nav('tours'), navReviews: this.nav('reviews'), navAbtest: this.nav('abtest'), navSettings: this.nav('settings'),
    };
    if (!st.ready || !this.S) return vals;
    const a = this.agg(), p = cmpOn ? this._p : null;
    Object.assign(vals, {
      subtitle: dl(a.from) + ' – ' + dl(a.to) + ' ' + a.to.getFullYear() + (st.src !== 'all' ? ' · jen ' + SRC[st.src][0].toLowerCase() : '') + ' · stav v ' + hm(st.stamp) + (st.error ? ' · ' + st.error : ''),
      showWa: view === 'wa', showForms: view === 'forms', showTours: view === 'tours',
    });
    const t = view === 'all' ? tab : null;
    Object.assign(vals, { showOverview: t === 'overview', showLive: t === 'live', showContent: t === 'content', showButtons: t === 'buttons', showVisits: t === 'visits', showFlows: t === 'flows' });
    if (t === 'overview') Object.assign(vals, this.overviewVals(a, p));
    if (t === 'live') Object.assign(vals, this.liveVals());
    if (t === 'content') Object.assign(vals, this.contentVals());
    if (t === 'buttons') Object.assign(vals, this.mapVals(a), this.buttonsVals());
    if (t === 'visits') Object.assign(vals, this.visitsVals());
    if (t === 'flows') Object.assign(vals, this.flowsVals(a));
    if (view === 'wa') Object.assign(vals, this.waVals(!!p));
    if (view === 'forms') Object.assign(vals, this.formVals(!!p));
    if (view === 'tours') Object.assign(vals, this.toursVals(!!p));
    if (st.palette) Object.assign(vals, { palette: true }, this.paletteVals());
    const dv = this.drawerVM();
    vals.drawerOpen = !!dv;
    vals.dv = dv || {};
    return vals;
  }
}

export default StatsDashboard;
