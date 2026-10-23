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
import { Overview, type OverviewHandle } from './Overview';
import { PlannedModule } from './PlannedModule';
import type { JournalArticle, Lang } from '../../types/journal';
import { SEED } from '../../data/seed';
import { blankArticle, clone, titlePlain, setL } from '../../lib/journal';

const PUBLIC_ORIGIN = 'https://zuzapragtour.de';

const CSS = `
.zsuite-toast{position:fixed;right:25px;bottom:25px;background:#20232B;color:#fff;font-family:var(--font-sans);font-size:12px;font-weight:650;padding:13px 17px;border-radius:13px;box-shadow:0 14px 34px #0002;z-index:90;display:flex;align-items:center;gap:10px;animation:zsuite-rise .25s var(--ease-out)}
.zsuite-toast.err{background:#8F2E3B}
.zsuite-toast .material-symbols-outlined{font-size:18px;color:#9BE3C6}
.zsuite-toast.err .material-symbols-outlined{color:#FFCAD8}
@keyframes zsuite-rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:900px){.zsuite-toast{left:15px;right:15px;bottom:calc(92px + env(safe-area-inset-bottom))}}
`;

type View = 'overview' | 'analytics' | 'enquiries' | 'bookings' | 'clients' | 'tours' | 'journal' | 'media' | 'reviews' | 'abtest' | 'settings' | 'editor';
type StatsSub = 'all' | 'wa' | 'tours';

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
  const [articles, setArticles] = React.useState<JournalArticle[]>(() => clone(SEED));
  const [view, setView] = React.useState<View>('overview');
  const [statsSub, setStatsSub] = React.useState<StatsSub>('all');
  const [statsTab, setStatsTab] = React.useState<string | undefined>(undefined);
  const [statsKey, setStatsKey] = React.useState(0);
  const [editing, setEditing] = React.useState<JournalArticle | null>(null);
  const [editingOrig, setEditingOrig] = React.useState<string | undefined>(undefined);
  const [activeLang, setActiveLang] = React.useState<Lang>('de');
  const [filter, setFilter] = React.useState('all');
  const [query, setQuery] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [gen, setGen] = React.useState(false);
  const [dup, setDup] = React.useState<JournalArticle | null>(null);
  const [search, setSearch] = React.useState(false);
  const [toast, setToast] = React.useState<{ msg: string; err?: boolean } | null>(null);
  const toastTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const overviewRef = React.useRef<OverviewHandle>(null);

  const flash = React.useCallback((msg: string, err = false) => {
    setToast({ msg, err });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  // Load real articles when a loader is provided.
  React.useEffect(() => {
    if (!load) return;
    let alive = true;
    load()
      .then((list) => { if (alive && Array.isArray(list)) setArticles(list); })
      .catch(() => { if (alive) flash('Články se nepodařilo načíst.', true); });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const navigate = React.useCallback((key: string, sub?: string, opts?: { tab?: string; filter?: string }) => {
    if (key === 'analytics') {
      setStatsSub((sub as StatsSub) || 'all');
      if (opts?.tab) { setStatsTab(opts.tab); setStatsKey((k) => k + 1); }
    }
    if (key === 'journal' && opts?.filter) setFilter(opts.filter);
    setView(key as View);
    window.scrollTo({ top: 0 });
  }, []);

  // The analytics page can switch its own sub-view (palette, links): mirror it in the sidebar.
  const onStatsView = React.useCallback((v: string) => {
    if (v === 'forms') setView('enquiries');
    else { setView('analytics'); setStatsSub(v as StatsSub); }
  }, []);

  const openEditor = (slug: string) => {
    const a = articles.find((x) => x.slug === slug);
    if (a) { setEditing(clone(a)); setEditingOrig(a.slug); setActiveLang('de'); setView('editor'); window.scrollTo({ top: 0 }); }
  };
  const newArticle = () => { setEditing(blankArticle()); setEditingOrig(undefined); setActiveLang('de'); setView('editor'); window.scrollTo({ top: 0 }); };

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
    setEditing(copy);
    setEditingOrig(undefined);
    setActiveLang('de');
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
    setEditing(copy);
    setEditingOrig(undefined);
    setActiveLang('de');
    setView('editor');
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

  /* ── quick search ── */
  const searchItems: SearchItem[] = [
    { id: 'act-new', label: 'Nový článek', hint: 'Akce', icon: 'add', run: newArticle },
    { id: 'act-gen', label: 'Článek z klíčových slov', hint: 'Akce · AI koncept', icon: 'auto_awesome', run: () => { setView('journal'); setGen(true); } },
    ...GROUPS.flatMap((g) => g.items.flatMap((it) => [
      it.href
        ? { id: 'nav-' + it.key, label: it.label, hint: (it.key === 'ext-google' ? 'Google' : 'Bing Webmaster Tools') + ' · otevře novou kartu', icon: it.icon, run: () => { window.open(it.href, '_blank', 'noopener,noreferrer'); } }
        : { id: 'nav-' + it.key, label: it.label, hint: 'Sekce · ' + g.title + (it.tag ? ' · v plánu' : ''), icon: it.icon, run: () => navigate(it.key) },
      ...(it.sub || []).slice(1).map((s) => ({ id: `nav-${it.key}-${s.key}`, label: s.label, hint: 'Sekce · ' + it.label, icon: it.icon, run: () => navigate(it.key, s.key) })),
    ])),
    ...articles.map((a) => ({ id: 'art-' + a.slug, label: titlePlain(a) || a.slug, hint: `Článek · ${STATUS_LABEL[a.status]} · ${a.date}`, icon: 'article', run: () => openEditor(a.slug) })),
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
        key={statsKey}
        embedded
        startTab={statsTab}
        view={view === 'enquiries' ? 'forms' : statsSub}
        onView={onStatsView}
        onNavigate={(k: string) => navigate(k === 'articles' ? 'journal' : k)}
      />
    );
  } else if (view === 'overview') {
    content = <Overview ref={overviewRef} articles={articles} go={navigate} onOpenArticle={openEditor} onNotify={flash} />;
  } else if (view === 'media') content = <MediaLibrary onNotify={flash} articles={articles} onOpenArticle={openEditor} />;
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
        onFilter={setFilter}
        onEdit={openEditor}
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
          onCreated={(a) => { setGen(false); setEditing(a); setEditingOrig(undefined); setActiveLang('de'); setView('editor'); flash('Koncept vytvořen, zkontroluj ho prosím'); }}
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
