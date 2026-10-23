import React from 'react';
import { AdminShell, QuickSearch, type NavGroup, type MobileTab, type SearchItem } from './AdminShell';
import { ArticleTable } from './ArticleTable';
import { ArticleEditor } from './ArticleEditor';
import { MediaLibrary } from './MediaLibrary';
import { ToursList } from './ToursList';
import { ReviewsPanel } from './ReviewsPanel';
import { AbTestPanel } from './AbTestPanel';
import { StatsDashboard } from './stats/StatsDashboard';
import { ArticleGenerator } from './ArticleGenerator';
import { DuplicateDialog } from './DuplicateDialog';
import { Overview, type OverviewHandle, type Range } from './Overview';
import { PlannedModule } from './PlannedModule';
import type { JournalArticle, Lang } from '../../types/journal';
import { SEED } from '../../data/seed';
import { blankArticle, clone, titlePlain, setL } from '../../lib/journal';
import { parseRoute, buildUrl, type Route, type View, type StatsSub, type StatsTab, type ArticleFilter } from '../../lib/route';

const PUBLIC_ORIGIN = 'https://zuzapragtour.de';

const CSS = `
.zsuite-toast{position:fixed;right:25px;bottom:25px;background:#20232B;color:#fff;font-family:var(--font-sans);font-size:12px;font-weight:650;padding:13px 17px;border-radius:13px;box-shadow:0 14px 34px #0002;z-index:90;display:flex;align-items:center;gap:10px;animation:zsuite-rise .25s var(--ease-out)}
.zsuite-toast.err{background:#8F2E3B}
.zsuite-toast .material-symbols-outlined{font-size:18px;color:#9BE3C6}
.zsuite-toast.err .material-symbols-outlined{color:#FFCAD8}
@keyframes zsuite-rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:900px){.zsuite-toast{left:15px;right:15px;bottom:calc(92px + env(safe-area-inset-bottom))}}
`;


const STATUS_LABEL: Record<JournalArticle['status'], string> = { published: 'Publikováno', draft: 'Koncept', scheduled: 'Naplánováno' };

const GROUPS: NavGroup[] = [
  { title: 'Pracovní prostor', items: [
    { key: 'overview', label: 'Přehled', icon: 'grid_view' },
    { key: 'analytics', label: 'Analytika webu', icon: 'monitoring', sub: [{ key: 'all', label: 'Kliky a poptávky' }, { key: 'wa', label: 'WhatsApp tlačítko' }, { key: 'tours', label: 'Zájem o túry' }] },
    { key: 'enquiries', label: 'Poptávky', icon: 'forum' },
    { key: 'bookings', label: 'Rezervace', icon: 'calendar_month', tag: 'PLÁN' },
    { key: 'clients', label: 'Klienti', icon: 'group', tag: 'PLÁN' },
  ] },
  { title: 'Správa webu', items: [
    { key: 'tours', label: 'Prohlídky', icon: 'map' },
    { key: 'journal', label: 'Obsah a články', icon: 'article' },
    { key: 'media', label: 'Média', icon: 'photo_library' },
    { key: 'reviews', label: 'Hodnocení', icon: 'star' },
    { key: 'abtest', label: 'A/B testy', icon: 'science' },
  ] },
  { title: 'Vyhledávače', items: [
    { key: 'ext-google', label: 'Search Console', icon: 'travel_explore', href: 'https://search.google.com/search-console?resource_id=sc-domain%3Azuzapragtour.de' },
    { key: 'ext-bing', label: 'Bing Webmaster', icon: 'manage_search', href: 'https://www.bing.com/webmasters?tid=8418aeb9-d5a2-4e97-9624-fa821e35e04b' },
  ] },
  { title: 'Systém', items: [{ key: 'settings', label: 'Nastavení', icon: 'settings', tag: 'PLÁN' }] },
];
const MOBILE_TABS: MobileTab[] = [
  { key: 'overview', label: 'Přehled', icon: 'grid_view' },
  { key: 'analytics', label: 'Analytika', icon: 'monitoring' },
  { key: 'enquiries', label: 'Poptávky', icon: 'forum' },
  { key: 'more', label: 'Více', icon: 'menu' },
];
const LABEL: Record<string, string> = Object.fromEntries(GROUPS.flatMap((g) => g.items.map((i) => [i.key, i.label])));
const SUBTITLE: Partial<Record<View, string>> = {
  overview: 'Tvůj přehled o tom, co se na webu děje a kde vznikají příležitosti.',
  media: 'Obrázky ve složce /images a kde se používají.',
  tours: 'Prohlídky, jak jsou na webu (jen ke čtení).',
  reviews: 'Žádosti o hodnocení, Google a další platformy.',
  abtest: 'Úvodní stránka na mobilu: varianta A proti B.',
  bookings: 'Kalendář a stav rezervací.',
  clients: 'Profily hostů a historie komunikace.',
  settings: 'Připojené služby, přístup a datové zdroje.',
};

export interface AdminSuiteProps {
  onLogout: () => void;
  /** Phase 3: load articles from the repo. Falls back to local SEED. */
  load?: () => Promise<JournalArticle[]>;
  /** Phase 4: persist an article (GitHub commit). originalSlug set on rename. */
  save?: (doc: JournalArticle, originalSlug?: string) => Promise<{ ok: boolean; error?: string }>;
  remove?: (slug: string) => Promise<{ ok: boolean; error?: string }>;
}

/**
 * AdminSuite — Zuza Control Center: holds all state and routes the views
 * (overview, analytics, articles + editor, media, tours, reviews, A/B test,
 * planned modules) inside the AdminShell chrome. `load`/`save`/`remove` wire
 * real persistence (GitHub commits); without them it runs on local seed state.
 */
export function AdminSuite({ onLogout, load, save, remove }: AdminSuiteProps) {
  // The URL is the source of truth on load and on back/forward (see lib/route.ts).
  const initial = React.useMemo(() => parseRoute(), []);
  const [articles, setArticles] = React.useState<JournalArticle[]>(() => clone(SEED));
  const [view, setView] = React.useState<View>(initial.view === 'editor' ? 'journal' : initial.view);
  const [statsSub, setStatsSub] = React.useState<StatsSub>(initial.statsSub);
  const [statsTab, setStatsTab] = React.useState<StatsTab>(initial.statsTab);
  const [range, setRange] = React.useState<number>(initial.range || 30);
  const [editing, setEditing] = React.useState<JournalArticle | null>(null);
  const [editingOrig, setEditingOrig] = React.useState<string | undefined>(undefined);
  const [activeLang, setActiveLang] = React.useState<Lang>('de');
  const [filter, setFilter] = React.useState<ArticleFilter>(initial.filter);
  const [query, setQuery] = React.useState(initial.query);
  const [routeReady, setRouteReady] = React.useState(initial.view !== 'editor');
  const [busy, setBusy] = React.useState(false);
  const [gen, setGen] = React.useState(false);
  const [dup, setDup] = React.useState<JournalArticle | null>(null);
  const [search, setSearch] = React.useState(false);
  const [toast, setToast] = React.useState<{ msg: string; err?: boolean } | null>(null);
  const toastTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const overviewRef = React.useRef<OverviewHandle>(null);
  const snapshot = React.useRef('');       // editor content as last opened/saved
  const replaceNext = React.useRef(false); // next URL change replaces instead of pushing
  const lastUrl = React.useRef(window.location.pathname + window.location.search);

  const flash = React.useCallback((msg: string, err = false) => {
    setToast({ msg, err });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  /* ── editor open / dirty tracking ── */
  const dirty = view === 'editor' && !!editing && JSON.stringify(editing) !== snapshot.current;
  const dirtyRef = React.useRef(false);
  dirtyRef.current = dirty;
  const confirmLeave = () => !dirtyRef.current || window.confirm('Článek má neuložené změny. Opravdu odejít bez uložení?');

  const startEditing = (doc: JournalArticle, orig: string | undefined, lang: Lang = 'de') => {
    snapshot.current = orig ? JSON.stringify(doc) : '';
    setEditing(doc); setEditingOrig(orig); setActiveLang(lang); setView('editor');
    window.scrollTo({ top: 0 });
  };
  const findArticle = (list: JournalArticle[], slug: string) => list.find((x) => x.slug === slug || x.slugDe === slug);
  const openEditor = (slug: string, list: JournalArticle[] = articles, lang: Lang = 'de') => {
    const a = findArticle(list, slug);
    if (a) startEditing(clone(a), a.slug, lang);
    return !!a;
  };
  const newArticle = () => startEditing(blankArticle(), undefined);
  // User-triggered opens ask before discarding unsaved edits of the open article.
  const userOpen = (slug: string) => { if (view === 'editor' && !confirmLeave()) return; openEditor(slug); };
  const userNew = () => { if (view === 'editor' && !confirmLeave()) return; newArticle(); };

  /** Applies a parsed route (initial deep link or back/forward). */
  const applyRoute = (r: Route, list: JournalArticle[]) => {
    setStatsSub(r.statsSub); setStatsTab(r.statsTab); setFilter(r.filter); setQuery(r.query);
    if (r.range) setRange(r.range);
    if (r.view === 'editor') {
      if (r.isNew) { newArticle(); return; }
      if (r.slug && editing && editingOrig === r.slug && view === 'editor') { setActiveLang(r.lang || 'de'); return; }
      if (r.slug && openEditor(r.slug, list, r.lang)) return;
      flash(`Článek „${r.slug}“ nebyl nalezen.`, true);
      replaceNext.current = true;
      setView('journal');
      return;
    }
    setView(r.view);
  };

  // Load real articles when a loader is provided, then resolve a deep link into the editor.
  React.useEffect(() => {
    let alive = true;
    const done = (list: JournalArticle[]) => {
      if (!alive) return;
      if (initial.view === 'editor') { replaceNext.current = true; applyRoute(initial, list); }
      setRouteReady(true);
    };
    if (!load) { done(articles); return; }
    load()
      .then((list) => { if (alive && Array.isArray(list)) { setArticles(list); done(list); } })
      .catch(() => { if (alive) { flash('Články se nepodařilo načíst.', true); done(articles); } });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── state → URL ── */
  const url = buildUrl(view === 'editor'
    ? { view, slug: editingOrig, isNew: !editingOrig, lang: activeLang }
    : { view, statsSub, statsTab, range, filter, query });
  React.useEffect(() => {
    if (!routeReady) return;
    const cur = window.location.pathname + window.location.search;
    if (url === cur) { lastUrl.current = url; return; }
    const samePath = url.split('?')[0] === cur.split('?')[0];
    if (samePath || replaceNext.current) window.history.replaceState(null, '', url);
    else window.history.pushState(null, '', url);
    replaceNext.current = false;
    lastUrl.current = url;
  }, [url, routeReady]);

  /* ── URL → state (back / forward) ── */
  const popRef = React.useRef<() => void>(() => {});
  popRef.current = () => {
    const next = parseRoute();
    const leavingEditor = view === 'editor' && !(next.view === 'editor' && next.slug && next.slug === editingOrig);
    if (leavingEditor && !confirmLeave()) { window.history.pushState(null, '', lastUrl.current); return; }
    setSearch(false);
    replaceNext.current = true;
    applyRoute(next, articles);
  };
  React.useEffect(() => {
    const onPop = () => popRef.current();
    const onUnload = (e: BeforeUnloadEvent) => { if (dirtyRef.current) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('popstate', onPop);
    window.addEventListener('beforeunload', onUnload);
    return () => { window.removeEventListener('popstate', onPop); window.removeEventListener('beforeunload', onUnload); };
  }, []);

  const isStats = view === 'analytics' || view === 'enquiries';

  // ⌘K / Ctrl+K opens quick search (the analytics page keeps its own palette).
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && !isStats) { e.preventDefault(); setSearch((x) => !x); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isStats]);

  const navigate = (key: string, sub?: string, opts?: { tab?: string; filter?: string }) => {
    if (view === 'editor' && key !== 'editor' && !confirmLeave()) return;
    if (key === 'analytics') {
      setStatsSub((sub as StatsSub) || 'all');
      setStatsTab((opts?.tab as StatsTab) || 'overview');
    }
    if (key === 'journal' && opts?.filter) setFilter(opts.filter as ArticleFilter);
    setView(key as View);
    window.scrollTo({ top: 0 });
  };
  /** href of a sidebar / tab item, so links can be opened in a new tab. */
  const hrefOf = (key: string, sub?: string) => buildUrl(key === 'analytics' ? { view: 'analytics', statsSub: (sub as StatsSub) || 'all' } : { view: key as View });
  const articleHref = (slug: string) => buildUrl({ view: 'editor', slug });

  // The analytics page can switch its own sub-view (palette, links): mirror it in the sidebar.
  const onStatsView = React.useCallback((v: string) => {
    if (v === 'forms') setView('enquiries');
    else { setView('analytics'); setStatsSub(v as StatsSub); }
  }, []);

  const persist = async (doc: JournalArticle, close: boolean, label: string) => {
    if (save) {
      setBusy(true);
      const res = await save(doc, editingOrig).catch(() => ({ ok: false, error: 'Chyba sítě.' }));
      setBusy(false);
      if (!res.ok) { flash(res.error || 'Uložení se nepovedlo.', true); return false; }
    }
    setArticles((list) => {
      let next = list.slice();
      if (editingOrig && editingOrig !== doc.slug) next = next.filter((x) => x.slug !== editingOrig);
      const i = next.findIndex((x) => x.slug === doc.slug);
      if (i === -1) next = [doc, ...next];
      else next[i] = doc;
      return next;
    });
    snapshot.current = JSON.stringify(doc);
    if (!close) replaceNext.current = true;
    setEditingOrig(doc.slug);
    flash(label);
    if (close) { setView('journal'); setEditing(null); }
    return true;
  };

  const onSave = () => { if (editing) persist(editing, false, save ? 'Uloženo a commitnuto' : 'Uloženo'); };
  const onPublish = () => {
    if (!editing) return;
    const pub = { ...editing, status: 'published' as const };
    setEditing(pub);
    persist(pub, true, 'Publikováno');
  };
  const onPreview = () => {
    if (!editing) return;
    const slug = activeLang === 'de' && editing.slugDe ? editing.slugDe : editing.slug;
    window.open(`${PUBLIC_ORIGIN}/blog/${slug}`, '_blank', 'noopener');
  };
  // Branch a new edition: a copy at a new slug (e.g. "…-2027") that supersedes the
  // current one. The existing article stays live; the edition opens as a draft.
  const slugify = (s: string) => s.toLowerCase().replace(/-\d{4}$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const newEdition = async () => {
    if (!editing) return;
    const y = new Date(editing.date).getFullYear();
    const label = window.prompt('Označení nové edice (např. rok):', String(isNaN(y) ? new Date().getFullYear() : y + 1));
    if (!label || !label.trim()) return;
    const ok = await persist(editing, false, 'Aktuální verze uložena');
    if (ok === false) return;
    const suffix = slugify(label);
    const copy = clone(editing);
    copy.supersedes = editing.slug;
    copy.slug = `${slugify(editing.slug)}-${suffix}`;
    if (editing.slugDe) copy.slugDe = `${slugify(editing.slugDe)}-${suffix}`;
    copy.edition = label.trim();
    copy.status = 'draft';
    copy.date = new Date().toISOString().slice(0, 10);
    startEditing(copy, undefined);
    flash(`Nová edice „${label.trim()}“, původní článek zůstává`);
  };
  const requestDuplicate = (slug: string) => {
    const a = articles.find((x) => x.slug === slug);
    if (a) setDup(a);
  };
  const doDuplicate = (title: string, slug: string) => {
    if (!dup) return;
    const copy = clone(dup);
    copy.slug = slug;
    delete copy.slugDe;
    delete copy.edition;
    delete copy.supersedes;
    copy.title = setL(dup.title, 'de', title);
    copy.status = 'draft';
    copy.date = new Date().toISOString().slice(0, 10);
    setDup(null);
    startEditing(copy, undefined);
    flash('Kopie vytvořena, můžeš ji upravit');
  };
  const del = async (slug: string) => {
    if (!window.confirm('Opravdu smazat tento článek?')) return;
    if (remove) {
      setBusy(true);
      const res = await remove(slug).catch(() => ({ ok: false, error: 'Chyba sítě.' }));
      setBusy(false);
      if (!res.ok) { flash(res.error || 'Smazání se nepovedlo.', true); return; }
    }
    setArticles((l) => l.filter((x) => x.slug !== slug));
    flash('Článek smazán');
  };

  /* ── header per view ── */
  const isEditor = view === 'editor' && !!editing;
  const published = articles.filter((a) => a.status === 'published').length;
  const plural = (n: number, a: string, b: string, c: string) => (n === 1 ? a : n >= 2 && n <= 4 ? b : c);
  let title: string | undefined;
  let subtitle: React.ReactNode;
  let actions: React.ReactNode = null;
  if (isEditor && editing) {
    title = titlePlain(editing) || 'Bez názvu';
    actions = (
      <>
        <span className={`zcc-status ${editing.status}`}>{STATUS_LABEL[editing.status]}{editing.edition ? ` · ${editing.edition}` : ''}</span>
        <button type="button" className="zcc-btn ghost" onClick={onPreview} title="Náhled"><span className="material-symbols-outlined">visibility</span><span className="t">Náhled</span></button>
        {editingOrig && <button type="button" className="zcc-btn ghost" disabled={busy} onClick={newEdition} title="Nová edice"><span className="material-symbols-outlined">call_split</span><span className="t">Nová edice</span></button>}
        <button type="button" className="zcc-btn ghost" disabled={busy} onClick={onSave} title="Uložit"><span className="material-symbols-outlined">save</span><span className="t">{busy ? 'Ukládá se…' : 'Uložit'}</span></button>
        <button type="button" className="zcc-btn primary" disabled={busy} onClick={onPublish}><span className="material-symbols-outlined">publish</span>Publikovat</button>
      </>
    );
  } else if (view === 'overview') {
    title = 'Všechno pod kontrolou';
    subtitle = SUBTITLE.overview;
    actions = (
      <>
        <button type="button" className="zcc-btn ghost" onClick={() => overviewRef.current?.exportCsv()}><span className="material-symbols-outlined">download</span>Export</button>
        <button type="button" className="zcc-btn primary" onClick={newArticle}><span className="material-symbols-outlined">add</span>Nový článek</button>
      </>
    );
  } else if (view === 'journal') {
    title = 'Obsah a články';
    subtitle = `${articles.length} ${plural(articles.length, 'článek', 'články', 'článků')} · ${published} ${plural(published, 'publikovaný', 'publikované', 'publikovaných')} · uložení = commit do GitHubu`;
    actions = (
      <>
        <button type="button" className="zcc-btn ghost" onClick={() => setGen(true)}><span className="material-symbols-outlined">auto_awesome</span>Z klíčových slov</button>
        <button type="button" className="zcc-btn primary" onClick={newArticle}><span className="material-symbols-outlined">add</span>Nový článek</button>
      </>
    );
  } else if (!isStats) {
    title = LABEL[view] || '';
    subtitle = SUBTITLE[view];
  }
  const navKey = isEditor ? 'journal' : view;
  const crumb = isEditor ? 'Obsah a články' : view === 'analytics' ? 'Analytika webu' : LABEL[view] || 'Přehled';

  React.useEffect(() => {
    const base = 'Zuza Control Center';
    const page = isEditor && editing ? (titlePlain(editing) || 'Nový článek') + ' · Články' : view === 'overview' ? '' : crumb;
    document.title = page ? `${page} · ${base}` : base;
  }, [isEditor, editing?.title, view, crumb]);

  /* ── quick search ── */
  const searchItems: SearchItem[] = [
    { id: 'act-new', label: 'Nový článek', hint: 'Akce', icon: 'add', run: userNew },
    { id: 'act-gen', label: 'Článek z klíčových slov', hint: 'Akce · AI koncept', icon: 'auto_awesome', run: () => { setView('journal'); setGen(true); } },
    ...GROUPS.flatMap((g) => g.items.flatMap((it) => [
      it.href
        ? { id: 'nav-' + it.key, label: it.label, hint: (it.key === 'ext-google' ? 'Google' : 'Bing Webmaster Tools') + ' · otevře novou kartu', icon: it.icon, run: () => { window.open(it.href, '_blank', 'noopener,noreferrer'); } }
        : { id: 'nav-' + it.key, label: it.label, hint: 'Sekce · ' + g.title + (it.tag ? ' · v plánu' : ''), icon: it.icon, run: () => navigate(it.key) },
      ...(it.sub || []).slice(1).map((s) => ({ id: `nav-${it.key}-${s.key}`, label: s.label, hint: 'Sekce · ' + it.label, icon: it.icon, run: () => navigate(it.key, s.key) })),
    ])),
    ...articles.map((a) => ({ id: 'art-' + a.slug, label: titlePlain(a) || a.slug, hint: `Článek · ${STATUS_LABEL[a.status]} · ${a.date}`, icon: 'article', run: () => userOpen(a.slug) })),
  ];

  let content: React.ReactNode;
  if (isEditor && editing) {
    content = (
      <ArticleEditor
        doc={editing}
        onChange={setEditing}
        activeLang={activeLang}
        onLang={setActiveLang}
        articles={articles.filter((a) => a.slug !== editing.slug).map((a) => ({ slug: a.slug, title: titlePlain(a) || a.slug }))}
      />
    );
  } else if (isStats) {
    content = (
      <StatsDashboard
        embedded
        tab={statsTab}
        onTab={setStatsTab}
        range={range}
        onRange={setRange}
        view={view === 'enquiries' ? 'forms' : statsSub}
        onView={onStatsView}
        onNavigate={(k: string) => navigate(k === 'articles' ? 'journal' : k)}
      />
    );
  } else if (view === 'overview') {
    content = <Overview ref={overviewRef} articles={articles} go={navigate} onOpenArticle={userOpen} onNotify={flash} range={([7, 30, 90].includes(range) ? range : 30) as Range} onRange={setRange} />;
  } else if (view === 'media') content = <MediaLibrary onNotify={flash} articles={articles} onOpenArticle={userOpen} />;
  else if (view === 'tours') content = <ToursList />;
  else if (view === 'reviews') content = <ReviewsPanel />;
  else if (view === 'abtest') content = <AbTestPanel />;
  else if (view === 'bookings' || view === 'clients' || view === 'settings') content = <PlannedModule id={view} onBack={() => navigate('overview')} />;
  else {
    content = (
      <ArticleTable
        articles={articles}
        query={query}
        onQuery={setQuery}
        filter={filter}
        onFilter={(f) => setFilter(f as ArticleFilter)}
        onEdit={userOpen}
        linkOf={articleHref}
        onDuplicate={requestDuplicate}
        onDelete={del}
      />
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <AdminShell
        groups={GROUPS}
        active={navKey}
        activeSub={view === 'analytics' ? statsSub : undefined}
        onNavigate={(k, s) => navigate(k, s)}
        hrefOf={hrefOf}
        mobileTabs={MOBILE_TABS}
        crumb={crumb}
        title={title}
        subtitle={subtitle}
        actions={actions}
        back={isEditor ? { label: 'Zpět na články', onClick: () => { if (editing) persist(editing, true, 'Uloženo'); } } : undefined}
        mode={isStats ? 'bare' : isEditor ? 'sticky' : 'page'}
        onSearch={() => setSearch(true)}
        onLogout={onLogout}
      >
        {content}
      </AdminShell>
      {search && <QuickSearch items={searchItems} onClose={() => setSearch(false)} />}
      {gen && (
        <ArticleGenerator
          onClose={() => setGen(false)}
          onCreated={(a) => { setGen(false); startEditing(a, undefined); flash('Koncept vytvořen, zkontroluj ho prosím'); }}
        />
      )}
      {dup && (
        <DuplicateDialog
          source={dup}
          taken={(s) => articles.some((a) => a.slug === s || a.slugDe === s)}
          onClose={() => setDup(null)}
          onConfirm={doDuplicate}
        />
      )}
      {toast && (
        <div className={`zsuite-toast ${toast.err ? 'err' : ''}`} role="status">
          <span className="material-symbols-outlined">{toast.err ? 'error' : 'check_circle'}</span>
          {toast.msg}
        </div>
      )}
    </>
  );
}

export default AdminSuite;
