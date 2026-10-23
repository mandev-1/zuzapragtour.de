// URL ↔ admin state. Every view has its own address so refresh, back/forward,
// bookmarks and "open in new tab" work:
//
//   /                                 Přehled                    ?obdobi=7|90
//   /analytika                        Kliky a poptávky (tab Přehled)
//   /analytika/zive|obsah|tlacitka|navstevy|zdroje   its tabs     ?obdobi=7|90|365
//   /analytika/whatsapp|tury          sub-views WhatsApp tlačítko / Zájem o túry
//   /poptavky                         Formuláře (enquiry forms)
//   /clanky                           article list               ?stav=publikovane|koncepty|naplanovane&hledat=…
//   /clanky/novy                      new article
//   /clanky/<slug>                    editor                     ?jazyk=en
//   /media /prohlidky /hodnoceni /ab-test /rezervace /klienti /nastaveni
//
// Path prefixes must stay in sync with the rewrites in admin/netlify.toml.

export type View = 'overview' | 'analytics' | 'enquiries' | 'bookings' | 'clients' | 'tours' | 'journal' | 'media' | 'reviews' | 'abtest' | 'settings' | 'editor';
export type StatsSub = 'all' | 'wa' | 'tours';
export type StatsTab = 'overview' | 'live' | 'content' | 'buttons' | 'visits' | 'flows';
export type ArticleFilter = 'all' | 'published' | 'draft' | 'scheduled';

export interface Route {
  view: View;
  statsSub: StatsSub;
  statsTab: StatsTab;
  range?: number;
  filter: ArticleFilter;
  query: string;
  slug?: string;   // editor: existing article
  isNew?: boolean; // editor: /clanky/novy
  lang?: 'de' | 'en';
}

const VIEW_SEG: Record<Exclude<View, 'overview' | 'editor'>, string> = {
  analytics: 'analytika', enquiries: 'poptavky', bookings: 'rezervace', clients: 'klienti', tours: 'prohlidky',
  journal: 'clanky', media: 'media', reviews: 'hodnoceni', abtest: 'ab-test', settings: 'nastaveni',
};
const SEG_VIEW = Object.fromEntries(Object.entries(VIEW_SEG).map(([v, s]) => [s, v])) as Record<string, View>;
const TAB_SEG: Record<Exclude<StatsTab, 'overview'>, string> = { live: 'zive', content: 'obsah', buttons: 'tlacitka', visits: 'navstevy', flows: 'zdroje' };
const SEG_TAB = Object.fromEntries(Object.entries(TAB_SEG).map(([t, s]) => [s, t])) as Record<string, StatsTab>;
const SUB_SEG: Record<Exclude<StatsSub, 'all'>, string> = { wa: 'whatsapp', tours: 'tury' };
const SEG_SUB = Object.fromEntries(Object.entries(SUB_SEG).map(([t, s]) => [s, t])) as Record<string, StatsSub>;
const FILTER_SEG: Record<Exclude<ArticleFilter, 'all'>, string> = { published: 'publikovane', draft: 'koncepty', scheduled: 'naplanovane' };
const SEG_FILTER = Object.fromEntries(Object.entries(FILTER_SEG).map(([f, s]) => [s, f])) as Record<string, ArticleFilter>;
export const RANGES = [7, 30, 90, 365];
export const NEW_SLUG = 'novy';

export function parseRoute(loc: { pathname: string; search: string } = window.location): Route {
  const parts = loc.pathname.split('/').filter(Boolean).map(decodeURIComponent);
  const q = new URLSearchParams(loc.search);
  const r = Number(q.get('obdobi'));
  const route: Route = {
    view: 'overview', statsSub: 'all', statsTab: 'overview', filter: SEG_FILTER[q.get('stav') || ''] || 'all', query: q.get('hledat') || '',
    range: RANGES.includes(r) ? r : undefined,
  };
  const [first, second] = parts;
  if (!first) return route;
  const view = SEG_VIEW[first];
  if (!view) return route; // unknown path → overview
  route.view = view;
  if (view === 'analytics' && second) {
    if (SEG_SUB[second]) route.statsSub = SEG_SUB[second];
    else if (SEG_TAB[second]) route.statsTab = SEG_TAB[second];
  }
  if (view === 'journal' && second) {
    route.view = 'editor';
    if (second === NEW_SLUG) route.isNew = true;
    else route.slug = second;
    route.lang = q.get('jazyk') === 'en' ? 'en' : 'de';
  }
  return route;
}

/** Path + query for a state. Pass only what the view uses. */
export function buildUrl(r: Partial<Route> & { view: View }): string {
  const q = new URLSearchParams();
  let path = '/';
  if (r.view === 'editor') {
    path = '/clanky/' + (r.isNew || !r.slug ? NEW_SLUG : encodeURIComponent(r.slug));
    if (r.lang === 'en') q.set('jazyk', 'en');
  } else if (r.view !== 'overview') {
    path = '/' + VIEW_SEG[r.view];
    if (r.view === 'analytics') {
      if (r.statsSub && r.statsSub !== 'all') path += '/' + SUB_SEG[r.statsSub];
      else if (r.statsTab && r.statsTab !== 'overview') path += '/' + TAB_SEG[r.statsTab];
    }
    if (r.view === 'journal') {
      if (r.filter && r.filter !== 'all') q.set('stav', FILTER_SEG[r.filter]);
      if (r.query && r.query.trim()) q.set('hledat', r.query.trim());
    }
  }
  if ((r.view === 'overview' || r.view === 'analytics' || r.view === 'enquiries') && r.range && r.range !== 30) q.set('obdobi', String(r.range));
  const s = q.toString();
  return path + (s ? '?' + s : '');
}

/** Plain left click without modifiers → handle in the app; otherwise let the browser open a new tab. */
export const isPlainClick = (e: React.MouseEvent) => e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
