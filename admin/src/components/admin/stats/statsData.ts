// @ts-nocheck — ported 1:1 from design_handoff_admin_dashboard/admin-stats.js
/**
 * Data layer of the dashboard "Kliky a poptávky". Same shape and aggregation
 * as the handoff's mock layer (admin-stats.js), but fed with the real
 * anonymous visits of zuzapragtour.de:
 *   site  netlify/functions/track.mjs   stores events
 *   site  netlify/functions/visits.mjs  returns them per visit and UTC day
 *   admin netlify/functions/visits.mjs  auth-gated proxy (+ ?catalog=1)
 * Visits are placed on Prague calendar days (day 0 = today), so "dnes",
 * hours and weekdays are Zuzana's local time.
 */

const TZ = 'Europe/Prague';

// Filled from the site's /stats-catalog.json (see loadCatalog).
let TOURS = [];
let ARTICLES = [];
let ART = {};
let TOUR = {};
const ALIAS = { blog: {}, tours: {} };

const GOALS = ['enquiry', 'email', 'whatsapp', 'phone'];
const GOAL_META = {
  enquiry: { label: 'Formular gesendet', short: 'Formular', icon: 'edit_note', color: '#6B1F2A', bg: '#F6E7E2' },
  email: { label: 'E-Mail geöffnet', short: 'E-Mail', icon: 'mail', color: '#4A3D7A', bg: '#EAE6F3' },
  whatsapp: { label: 'WhatsApp geöffnet', short: 'WhatsApp', icon: 'chat', color: '#25633A', bg: '#E3F1E6' },
  phone: { label: 'Telefonnummer getippt', short: 'Telefon', icon: 'call', color: '#8C6A3C', bg: '#F3ECDD' },
};
const CATS = {
  whatsapp: { label: 'WhatsApp', bg: '#E3F1E6', fg: '#25633A' },
  email: { label: 'E-Mail', bg: '#EAE6F3', fg: '#4A3D7A' },
  phone: { label: 'Telefon', bg: '#F3ECDD', fg: '#8C6A3C' },
  form: { label: 'Zur Anfrage', bg: '#F6E7E2', fg: '#6B1F2A' },
  enquiry: { label: 'Formular gesendet', bg: '#6B1F2A', fg: '#FFFFFF' },
  tour: { label: 'Tour', bg: '#EDE4D3', fg: '#58413F' },
  nav: { label: 'Navigation', bg: '#F0EBE2', fg: '#3A332C' },
  anchor: { label: 'Sprung', bg: '#F0EBE2', fg: '#3A332C' },
  external: { label: 'Extern', bg: '#F0EBE2', fg: '#645849' },
  button: { label: 'Schaltfläche', bg: '#F0EBE2', fg: '#645849' },
};
// Page areas = data-track-section names, or the id of the nearest section on the site.
const AREAS = {
  de: { hero: 'Hero oben', header: 'Kopfzeile', footer: 'Fußzeile', 'sticky-bar': 'Leiste unten (Handy)', 'closing-cta': 'Schluss-Aufruf', reviews: 'Bewertungen', gallery: 'Galerie', tours: 'Tourenliste', 'blog-promo': 'Journal-Popup', 'contact-direct': 'Direktkontakt', form: 'Formular', article: 'Artikeltext', 'article-cta': 'Kasten unter dem Artikel', sources: 'Quellen', related: 'Weitere Artikel', 'booking-card': 'Buchungskarte', 'related-tours': 'Weitere Touren', tripadvisor: 'TripAdvisor-Box', main: 'Seiteninhalt', booking: 'Buchungsformular', contact: 'Kontaktformular' },
  cs: { hero: 'Hero nahoře', header: 'Hlavička', footer: 'Patička', 'sticky-bar': 'Lišta dole (mobil)', 'closing-cta': 'Závěrečná výzva', reviews: 'Recenze', gallery: 'Galerie', tours: 'Seznam prohlídek', 'blog-promo': 'Popup Journalu', 'contact-direct': 'Přímý kontakt', form: 'Formulář', article: 'Text článku', 'article-cta': 'Box pod článkem', sources: 'Zdroje', related: 'Další články', 'booking-card': 'Rezervační karta', 'related-tours': 'Další prohlídky', tripadvisor: 'Box TripAdvisor', main: 'Obsah stránky', booking: 'Rezervační formulář', contact: 'Kontaktní formulář',
    // sections of the mobile homepage (A/B variant B) and other ids on the site
    'fuer-wen': 'Pro koho (mobil)', touren: 'Seznam prohlídek (mobil)', stimmen: 'Recenze (mobil)', zuzana: 'O Zuzaně (mobil)', anfrage: 'Poptávka (mobil)', about: 'O Zuzaně', allreviews: 'Recenze', 'mobile-menu': 'Mobilní menu', nav: 'Navigace', top: 'Hero nahoře',
    'tour-altstadt': 'Karta: Staré Město', 'tour-burg': 'Karta: Hrad', 'tour-erbe': 'Karta: Německé dědictví', 'tour-havel': 'Karta: Havel', 'tour-versteckt': 'Karta: Skrytá Praha', 'tour-individuell': 'Karta: Na míru' },
};
const PAGE_NAMES = {
  de: { '/': 'Startseite', '/tours': 'Touren', '/blog': 'Journal', '/book': 'Buchungsanfrage', '/contact': 'Kontakt', '/zuzana-manova': 'Über Zuzana', '/bewerten': 'Bewerten', '/privacy': 'Datenschutz', '/terms': 'AGB' },
  cs: { '/': 'Úvodní stránka', '/tours': 'Prohlídky', '/blog': 'Journal', '/book': 'Rezervace / poptávka', '/contact': 'Kontakt', '/zuzana-manova': 'O Zuzaně', '/bewerten': 'Hodnocení', '/privacy': 'Ochrana údajů', '/terms': 'Obchodní podmínky' },
};
const GOAL_L = {
  cs: { enquiry: ['Formulář odeslán', 'Formulář'], email: ['E-mail otevřen', 'E-mail'], whatsapp: ['WhatsApp otevřen', 'WhatsApp'], phone: ['Klepnuto na telefon', 'Telefon'] },
  de: { enquiry: ['Formular gesendet', 'Formular'], email: ['E-Mail geöffnet', 'E-Mail'], whatsapp: ['WhatsApp geöffnet', 'WhatsApp'], phone: ['Telefonnummer getippt', 'Telefon'] },
};
const CAT_L = {
  cs: { whatsapp: 'WhatsApp', email: 'E-mail', phone: 'Telefon', form: 'K poptávce', enquiry: 'Formulář odeslán', tour: 'Prohlídka', nav: 'Navigace', anchor: 'Skok', external: 'Externí', button: 'Tlačítko' },
  de: { whatsapp: 'WhatsApp', email: 'E-Mail', phone: 'Telefon', form: 'Zur Anfrage', enquiry: 'Formular gesendet', tour: 'Tour', nav: 'Navigation', anchor: 'Sprung', external: 'Extern', button: 'Schaltfläche' },
};

function pageName(p, lang) {
  const pn = PAGE_NAMES[lang] || PAGE_NAMES.de;
  if (pn[p]) return pn[p];
  let m = p.match(/^\/blog\/(.+)$/);
  if (m) return ART[m[1]] ? ART[m[1]].title : m[1];
  m = p.match(/^\/tours\/(.+)$/);
  if (m) return TOUR[m[1]] ? TOUR[m[1]].title : m[1];
  return p;
}
const KIND = { cs: ['Článek', 'Prohlídka', 'Stránka'], de: ['Artikel', 'Tour', 'Seite'] };
const pageKind = (p, lang) => (KIND[lang] || KIND.de)[p.startsWith('/blog/') ? 0 : p.startsWith('/tours/') ? 1 : 2];
const areaName = (a, lang) => (AREAS[lang] || AREAS.de)[a] || a || '–';
const clickLabel = (cat, label) => (cat === 'tour' && TOUR[label] ? TOUR[label].title : label);
const isGoal = (e) => e.k === 'enquiry' || (e.k === 'click' && (e.c === 'whatsapp' || e.c === 'phone' || e.c === 'email'));
const goalOf = (e) => (e.k === 'enquiry' ? 'enquiry' : e.c);
const srcGroup = (h) => (!h ? 'direct' : /google|bing|duckduckgo|ecosia|yahoo|seznam|qwant|startpage/.test(h) ? 'search' : /instagram|facebook|pinterest|t\.co|twitter|x\.com|linkedin|tiktok|youtube/.test(h) ? 'social' : /tripadvisor|tourhq|getyourguide|viator/.test(h) ? 'review' : /chatgpt|openai|perplexity|gemini|claude|copilot/.test(h) ? 'ai' : 'other');

/* ── Catalog ─────────────────────────────────────────────────────────── */

function setCatalog(cat) {
  TOURS = (cat.tours || []).map((t) => ({ slug: t.slug, title: t.title }));
  ARTICLES = (cat.articles || []).map((a, i) => ({ slug: a.slug, title: a.title, cat: a.cat, date: a.date, i }));
  ART = Object.fromEntries(ARTICLES.map((a) => [a.slug, a]));
  TOUR = Object.fromEntries(TOURS.map((t) => [t.slug, t]));
  ALIAS.blog = {};
  ALIAS.tours = {};
  (cat.articles || []).forEach((a) => (a.aliases || []).forEach((x) => (ALIAS.blog[x] = a.slug)));
  (cat.tours || []).forEach((t) => (t.aliases || []).forEach((x) => (ALIAS.tours[x] = t.slug)));
  api.TOURS = TOURS;
  api.ARTICLES = ARTICLES;
  api.ART = ART;
  api.TOUR = TOUR;
}

/** English URL slugs count as the German page (the catalog lists both). */
function normPath(p) {
  if (!p) return '/';
  p = p.length > 1 ? p.replace(/\/+$/, '') : p;
  let m = p.match(/^\/blog\/(.+)$/);
  if (m && ALIAS.blog[m[1]]) return '/blog/' + ALIAS.blog[m[1]];
  m = p.match(/^\/tours\/(.+)$/);
  if (m && ALIAS.tours[m[1]]) return '/tours/' + ALIAS.tours[m[1]];
  return p;
}
const normTour = (slug) => ALIAS.tours[slug] || slug;

/* ── Dataset ─────────────────────────────────────────────────────────── */

const DAY_MS = 864e5;
const partsFmt = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
/** Prague calendar date + time of a unix timestamp (seconds). */
function prague(ts) {
  const o = {};
  partsFmt.formatToParts(new Date(ts * 1000)).forEach((x) => (o[x.type] = x.value));
  return { ymd: o.year + '-' + o.month + '-' + o.day, hour: Number(o.hour) % 24, minute: Number(o.minute) };
}
const ymdNum = (ymd) => Date.UTC(+ymd.slice(0, 4), +ymd.slice(5, 7) - 1, +ymd.slice(8, 10)) / DAY_MS;

let DS = null;
const loadedUtc = new Set(); // UTC days fetched
const visitsByKey = new Map(); // `${utcDay}|${id}` → visit
let version = 0;

function emptyDataset() {
  const now = new Date();
  const today = prague(now.getTime() / 1000).ymd;
  const dates = [];
  for (let d = 0; d < 800; d++) {
    const t = new Date(Date.UTC(+today.slice(0, 4), +today.slice(5, 7) - 1, +today.slice(8, 10)) - d * DAY_MS);
    dates[d] = new Date(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()); // local Date for that Prague day
  }
  return { visits: [], dates, now, today };
}

/** One visit of the API (see visits.mjs; parts from several UTC days) → the handoff's visit model. */
function decodeVisit(parts, todayNum) {
  parts.sort((x, y) => x.raw[1] - y.raw[1]);
  const [id, start, dev, ab] = parts[0].raw;
  const when = prague(start);
  const day = todayNum - ymdNum(when.ymd);
  const ev = [];
  for (const { raw, strings } of parts) {
    const S = (i) => strings[i] ?? '';
    const shift = raw[1] - start;
    for (const r of raw[4]) {
      const [k, p, c, l, a, at, t, dp] = r;
      if (k === 'p') ev.push({ k: 'page', p: normPath(S(p)), t: t || undefined, depth: dp || undefined, at: at + shift, ref: S(a) });
      else if (k === 'e') ev.push({ k: 'enquiry', c: 'enquiry', l: S(l), a: S(a), p: normPath(S(p)), at: at + shift });
      else {
        const cat = S(c) || 'button';
        ev.push({ k: 'click', c: cat, l: cat === 'tour' ? normTour(S(l)) : S(l), a: S(a), p: normPath(S(p)), at: at + shift });
      }
    }
  }
  // Pages without a reported leave: time until the next page of the visit, if any.
  ev.forEach((e, i) => {
    if (e.k !== 'page' || e.t) return;
    const nextPage = ev.slice(i + 1).find((x) => x.k === 'page');
    if (nextPage && nextPage.at > e.at) e.t = nextPage.at - e.at;
  });
  // A visit always starts with a page view in the handoff model.
  if (!ev.length || ev[0].k !== 'page') ev.unshift({ k: 'page', p: ev[0] ? ev[0].p : '/', at: 0 });
  const ref = ev[0].ref || '';
  ev.forEach((e) => delete e.ref);
  return { id: String(id).slice(0, 6), fullId: id, day, hour: when.hour, minute: when.minute, start, dev, ab, ref, ev };
}

function rebuild() {
  const ds = DS || emptyDataset();
  const todayNum = ymdNum(ds.today);
  const byId = new Map();
  for (const x of visitsByKey.values()) {
    const list = byId.get(x.raw[0]) || [];
    list.push(x);
    byId.set(x.raw[0], list);
  }
  ds.visits = Array.from(byId.values()).map((parts) => decodeVisit(parts, todayNum)).filter((v) => v.day >= 0 && v.day < 800);
  ds.now = new Date();
  DS = ds;
  version++;
  api.version = version;
}

const utcDay = (t) => new Date(t).toISOString().slice(0, 10);

/** Fetch UTC days [from, to] in chunks of ≤ 31 days through the admin proxy. */
async function fetchDays(from, to, force) {
  const want = [];
  for (let t = Date.parse(to + 'T00:00:00Z'); utcDay(t) >= from; t -= DAY_MS) {
    const d = utcDay(t);
    if (force || !loadedUtc.has(d)) want.push(d);
  }
  if (!want.length) return false;
  want.sort();
  const chunks = [];
  for (let i = 0; i < want.length; i += 31) chunks.push([want[i], want[Math.min(i + 30, want.length - 1)]]);
  for (const [f, t] of chunks) {
    const r = await fetch(`/.netlify/functions/visits?from=${f}&to=${t}`, { credentials: 'same-origin' });
    const body = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(body.error || 'Statistiku se nepodařilo načíst.');
    for (const day of body.days || []) {
      for (const k of Array.from(visitsByKey.keys())) if (k.startsWith(day.day + '|')) visitsByKey.delete(k);
      (day.visits || []).forEach((raw) => visitsByKey.set(day.day + '|' + raw[0], { raw, strings: day.strings }));
      loadedUtc.add(day.day);
    }
  }
  return true;
}

let catalogLoaded = false;
async function loadCatalog() {
  if (catalogLoaded) return;
  const r = await fetch('/.netlify/functions/visits?catalog=1', { credentials: 'same-origin' });
  const body = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(body.error || 'Katalog článků se nepodařilo načíst.');
  setCatalog(body);
  catalogLoaded = true;
}

/**
 * Make sure the last `pragueDays` Prague days are loaded (UTC day before
 * included, as a Prague day starts at 22:00/23:00 UTC). `refresh` re-reads
 * today and yesterday.
 */
async function ensure(pragueDays, refresh) {
  await loadCatalog();
  if (!DS) DS = emptyDataset();
  const now = Date.now();
  const today = utcDay(now);
  let changed = false;
  if (refresh) changed = (await fetchDays(utcDay(now - DAY_MS), today, true)) || changed;
  changed = (await fetchDays(utcDay(now - pragueDays * DAY_MS), today, false)) || changed;
  if (changed || refresh || !DS.visits.length) {
    DS.today = prague(now / 1000).ymd;
    rebuild();
  }
  return DS;
}

function dataset() {
  return DS || (DS = emptyDataset());
}

/* ── Aggregation (unchanged from admin-stats.js) ─────────────────────── */

const zg = () => ({ enquiry: 0, email: 0, whatsapp: 0, phone: 0 });
function bump(map, key, dev, g, extra) {
  let c = map[key];
  if (!c) c = map[key] = Object.assign({ n: 0, m: 0, d: 0, conv: 0, after: zg() }, extra);
  c.n++; c[dev]++;
  if (g) { c.conv++; c.after[g]++; }
  return c;
}
const GOAL_PATH = { enquiry: 'Formular gesendet', email: 'E-Mail', whatsapp: 'WhatsApp', phone: 'Anruf' };

/** days = range length (today included), dev = 'all' | 'm' | 'd'. */
function aggregate(ds, days, dev, opts) {
  opts = opts || {};
  const off = opts.offset || 0, filter = opts.filter, last = ds.dates[ds.dates.length - 1];
  const series = [];
  for (let d = days - 1; d >= 0; d--) series.push({ date: ds.dates[off + d] || last, visits: 0, conv: 0, goals: zg() });
  const out = { days, from: ds.dates[off + days - 1] || last, to: ds.dates[off] || last, visits: 0, m: 0, d: 0, pageviews: 0, bounces: 0, conv: 0, convM: 0, convD: 0, convFirst: zg(), goals: zg(), goalsM: zg(), goalsD: zg(), clicks: {}, pages: {}, entries: {}, refs: {}, paths: {}, formViews: 0, formSent: 0, enquiryTours: {}, enquiryForms: {}, series, hours: Array.from({ length: 7 }, () => new Array(24).fill(0)), hoursConv: Array.from({ length: 7 }, () => new Array(24).fill(0)), depth: {}, pageDays: {}, src: {}, entryKinds: {}, sawContent: 0, directVisits: 0, flows: {}, timeSum: 0 };
  for (const v of ds.visits) {
    if (v.day < off || v.day >= off + days || (dev !== 'all' && v.dev !== dev) || (filter && !filter(v))) continue;
    const ev = v.ev, dv = v.dev;
    const next = new Array(ev.length);
    let g = null;
    for (let i = ev.length - 1; i >= 0; i--) { if (isGoal(ev[i])) g = goalOf(ev[i]); next[i] = g; }
    const firstG = next[0];
    const s = series[days - 1 - (v.day - off)];
    out.visits++; out[dv]++; s.visits++;
    if (firstG) { out.conv++; out[dv === 'm' ? 'convM' : 'convD']++; out.convFirst[firstG]++; s.conv++; }
    bump(out.entries, ev[0].p, dv, firstG);
    bump(out.refs, v.ref, dv, firstG);
    const kind = ev[0].p.startsWith('/blog/') ? 'article' : ev[0].p.startsWith('/tours/') ? 'tour' : ev[0].p === '/' ? 'home' : 'other';
    const sg = srcGroup(v.ref), fk = sg + '|' + kind + '|' + (firstG || 'none');
    bump(out.src, sg, dv, firstG);
    bump(out.entryKinds, kind, dv, firstG);
    out.flows[fk] = (out.flows[fk] || 0) + 1;
    const wd = (ds.dates[v.day].getDay() + 6) % 7;
    if (v.hour != null) { out.hours[wd][v.hour]++; if (firstG) out.hoursConv[wd][v.hour]++; }
    if (ev.some((e) => e.k === 'page' && (e.p.startsWith('/blog/') || e.p.startsWith('/tours/')))) out.sawContent++;
    if (ev.some((e) => e.k === 'click' && (e.c === 'whatsapp' || e.c === 'phone' || e.c === 'email'))) out.directVisits++;
    const seen = new Set(), steps = [];
    let pv = 0, reached = false, sawForm = false, sent = false;
    ev.forEach((e, i) => {
      if (e.k === 'page') {
        pv++;
        out.timeSum += e.t || 0;
        if (e.depth) { const dp = out.depth[e.p] || (out.depth[e.p] = { n: 0, b: [0, 0, 0, 0], time: 0 }); dp.n++; dp.b[e.depth / 25 - 1]++; dp.time += e.t || 0; }
        if (!seen.has(e.p)) {
          seen.add(e.p);
          bump(out.pages, e.p, dv, next[i]);
          if (e.p.startsWith('/blog/')) (out.pageDays[e.p] || (out.pageDays[e.p] = new Array(days).fill(0)))[days - 1 - (v.day - off)]++;
        }
        if (!reached && steps[steps.length - 1] !== e.p) steps.push(e.p);
        if (e.p === '/book' || e.p === '/contact') sawForm = true;
      } else {
        const cat = e.k === 'enquiry' ? 'enquiry' : e.c;
        bump(out.clicks, [cat, e.l, e.a, e.p].join('\t'), dv, next[i], { cat, label: e.l, area: e.a, page: e.p });
      }
      if (isGoal(e)) {
        const gg = goalOf(e);
        out.goals[gg]++; (dv === 'm' ? out.goalsM : out.goalsD)[gg]++; s.goals[gg]++;
        reached = true;
        if (gg === 'enquiry') { sent = true; out.enquiryTours[e.l] = (out.enquiryTours[e.l] || 0) + 1; out.enquiryForms[e.a] = (out.enquiryForms[e.a] || 0) + 1; }
      }
    });
    out.pageviews += pv;
    if (pv <= 1 && ev.every((e) => e.k === 'page')) out.bounces++;
    if (sawForm) { out.formViews++; if (sent) out.formSent++; }
    const path = steps.length > 6 ? [...steps.slice(0, 2), '…', ...steps.slice(-3)] : steps;
    if (firstG) path.push('✓ ' + GOAL_PATH[firstG]);
    bump(out.paths, path.join(' › '), dv, firstG);
  }
  return out;
}

const nowMinute = () => { const p = prague(Date.now() / 1000); return p.hour * 60 + p.minute; };
const happened = (v, nm) => v.day > 0 || v.hour * 60 + v.minute <= nm;
function sessions(ds, days, dev, filter) {
  const nm = nowMinute();
  return ds.visits.filter((v) => v.day < days && happened(v, nm) && (dev === 'all' || v.dev === dev) && (!filter || filter(v)))
    .sort((a, b) => a.day - b.day || b.hour - a.hour || b.minute - a.minute);
}

/** Visits with any event in the last `minutes` minutes (for "právě na webu"). */
function activeVisits(minutes) {
  const ds = dataset(), cut = Date.now() / 1000 - minutes * 60;
  return ds.visits.filter((v) => v.day <= 1 && v.start + (v.ev.length ? v.ev[v.ev.length - 1].at || 0 : 0) >= cut);
}

const api = { TOURS, ARTICLES, ART, TOUR, GOALS, GOAL_META, GOAL_L, CATS, CAT_L, AREAS, pageName, pageKind, areaName, clickLabel, dataset, aggregate, sessions, srcGroup, happened, nowMinute, ensure, activeVisits, version };
export default api;
