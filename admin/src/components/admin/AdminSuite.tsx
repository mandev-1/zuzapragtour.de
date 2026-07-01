import React from 'react';
import { AdminShell } from './AdminShell';
import { ArticleTable } from './ArticleTable';
import { ArticleEditor } from './ArticleEditor';
import { MediaLibrary } from './MediaLibrary';
import { ToursList } from './ToursList';
import { ReviewsPanel } from './ReviewsPanel';
import { ArticleGenerator } from './ArticleGenerator';
import { DuplicateDialog } from './DuplicateDialog';
import type { JournalArticle, Lang } from '../../types/journal';
import { SEED } from '../../data/seed';
import { blankArticle, clone, titlePlain, setL, getL } from '../../lib/journal';

const PUBLIC_ORIGIN = 'https://zuzapragtour.de';

const CSS = `
.zpt-admin-suite{height:100vh;font-family:var(--font-sans)}
.zsuite-btn{display:inline-flex;align-items:center;gap:.45rem;font-family:var(--font-sans);font-size:12px;font-weight:600;letter-spacing:.03em;border-radius:var(--radius-md);padding:.6rem 1rem;cursor:pointer;border:1px solid transparent;transition:background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out)}
.zsuite-btn .material-symbols-outlined{font-size:17px}
.zsuite-btn.primary{background:var(--burgundy);color:var(--ivory)}
.zsuite-btn.primary:hover{background:var(--burgundy-deep)}
.zsuite-btn.primary:disabled{opacity:.55;cursor:default}
.zsuite-btn.ghost{background:#fff;border-color:var(--rule);color:var(--ink-soft)}
.zsuite-btn.ghost:hover{border-color:var(--ink);color:var(--ink)}
.zsuite-pill{display:inline-flex;align-items:center;gap:.4rem;font-size:11px;font-weight:600;padding:.45rem .75rem;border-radius:var(--radius-pill)}
.zsuite-pill::before{content:"";width:6px;height:6px;border-radius:999px;background:currentColor}
.zsuite-pill.published{color:#3F6B4A;background:rgba(63,107,74,.12)}
.zsuite-pill.draft{color:var(--stone-600);background:var(--stone-100)}
.zsuite-pill.scheduled{color:var(--brass-deep);background:rgba(168,134,84,.15)}
.zsuite-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--ink);color:var(--ivory);font-family:var(--font-sans);font-size:13px;padding:.7rem 1.2rem;border-radius:var(--radius-pill);box-shadow:var(--shadow-lg);z-index:90;display:flex;align-items:center;gap:.5rem;animation:zsuite-rise var(--dur-base) var(--ease-out)}
.zsuite-toast.err{background:var(--error)}
.zsuite-toast .material-symbols-outlined{font-size:18px;color:var(--gold-lamp)}
@keyframes zsuite-rise{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}
`;

const STATUS_LABEL: Record<JournalArticle['status'], string> = { published: 'Veröffentlicht', draft: 'Entwurf', scheduled: 'Geplant' };

export interface AdminSuiteProps {
  onLogout: () => void;
  /** Phase 3: load articles from the repo. Falls back to local SEED. */
  load?: () => Promise<JournalArticle[]>;
  /** Phase 4: persist an article (GitHub commit). originalSlug set on rename. */
  save?: (doc: JournalArticle, originalSlug?: string) => Promise<{ ok: boolean; error?: string }>;
  remove?: (slug: string) => Promise<{ ok: boolean; error?: string }>;
}

/**
 * AdminSuite — the full journal admin: a curation dashboard (ArticleTable) and
 * the bilingual block ArticleEditor inside the AdminShell chrome. Holds all
 * state and orchestrates the two surfaces. `load`/`save` wire real persistence
 * (Phases 3–4); without them it runs on local seed state.
 */
export function AdminSuite({ onLogout, load, save, remove }: AdminSuiteProps) {
  const [articles, setArticles] = React.useState<JournalArticle[]>(() => clone(SEED));
  const [view, setView] = React.useState<'list' | 'editor' | 'media' | 'tours' | 'reviews'>('list');
  const [editing, setEditing] = React.useState<JournalArticle | null>(null);
  const [editingOrig, setEditingOrig] = React.useState<string | undefined>(undefined);
  const [activeLang, setActiveLang] = React.useState<Lang>('de');
  const [filter, setFilter] = React.useState('all');
  const [query, setQuery] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [gen, setGen] = React.useState(false);
  const [dup, setDup] = React.useState<JournalArticle | null>(null);
  const [toast, setToast] = React.useState<{ msg: string; err?: boolean } | null>(null);
  const toastTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const flash = (msg: string, err = false) => {
    setToast({ msg, err });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };

  // Load real articles when a loader is provided (Phase 3).
  React.useEffect(() => {
    if (!load) return;
    let alive = true;
    load()
      .then((list) => { if (alive && Array.isArray(list)) setArticles(list); })
      .catch(() => { if (alive) flash('Artikel konnten nicht geladen werden.', true); });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openEditor = (slug: string) => {
    const a = articles.find((x) => x.slug === slug);
    if (a) { setEditing(clone(a)); setEditingOrig(a.slug); setActiveLang('de'); setView('editor'); }
  };
  const newArticle = () => { setEditing(blankArticle()); setEditingOrig(undefined); setActiveLang('de'); setView('editor'); };

  const persist = async (doc: JournalArticle, close: boolean, label: string) => {
    if (save) {
      setBusy(true);
      const res = await save(doc, editingOrig).catch(() => ({ ok: false, error: 'Netzwerkfehler.' }));
      setBusy(false);
      if (!res.ok) { flash(res.error || 'Speichern fehlgeschlagen.', true); return false; }
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
    if (close) { setView('list'); setEditing(null); }
    return true;
  };

  const onSave = () => { if (editing) persist(editing, false, save ? 'Gespeichert & committet' : 'Gespeichert'); };
  const onPublish = () => {
    if (!editing) return;
    const pub = { ...editing, status: 'published' as const };
    setEditing(pub);
    persist(pub, true, 'Veröffentlicht');
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
    const label = window.prompt('Bezeichnung der neuen Edition (z. B. Jahr):', String(isNaN(y) ? new Date().getFullYear() : y + 1));
    if (!label || !label.trim()) return;
    const ok = await persist(editing, false, 'Aktuelle Fassung gesichert');
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
    flash(`Neue Edition „${label.trim()}“ — das Original bleibt bestehen`);
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
    flash('Kopie erstellt — jetzt bearbeiten');
  };
  const del = async (slug: string) => {
    if (!window.confirm('Diesen Artikel löschen?')) return;
    if (remove) {
      setBusy(true);
      const res = await remove(slug).catch(() => ({ ok: false, error: 'Netzwerkfehler.' }));
      setBusy(false);
      if (!res.ok) { flash(res.error || 'Löschen fehlgeschlagen.', true); return; }
    }
    setArticles((l) => l.filter((x) => x.slug !== slug));
    flash('Artikel gelöscht');
  };

  const isEditor = view === 'editor' && !!editing;
  const isMedia = view === 'media';
  const isTours = view === 'tours';
  const isReviews = view === 'reviews';
  const actions = isEditor && editing ? (
    <>
      <span className={`zsuite-pill ${editing.status}`}>{STATUS_LABEL[editing.status]}{editing.edition ? ` · ${editing.edition}` : ''}</span>
      <button type="button" className="zsuite-btn ghost" onClick={onPreview}><span className="material-symbols-outlined">visibility</span>Vorschau</button>
      {editingOrig && <button type="button" className="zsuite-btn ghost" disabled={busy} onClick={newEdition}><span className="material-symbols-outlined">call_split</span>Neue Edition</button>}
      <button type="button" className="zsuite-btn ghost" disabled={busy} onClick={onSave}>{busy ? 'Speichert…' : 'Speichern'}</button>
      <button type="button" className="zsuite-btn primary" disabled={busy} onClick={onPublish}><span className="material-symbols-outlined">publish</span>Veröffentlichen</button>
    </>
  ) : (
    <>
      <button type="button" className="zsuite-btn ghost" onClick={onLogout}><span className="material-symbols-outlined">logout</span>Abmelden</button>
      {!isMedia && !isTours && !isReviews && <button type="button" className="zsuite-btn ghost" onClick={() => setGen(true)}><span className="material-symbols-outlined">auto_awesome</span>Aus Stichwörtern</button>}
      {!isMedia && !isTours && !isReviews && <button type="button" className="zsuite-btn primary" onClick={newArticle}><span className="material-symbols-outlined">add</span>Neuer Artikel</button>}
    </>
  );

  return (
    <div className="zpt-admin-suite">
      <style>{CSS}</style>
      <AdminShell
        active={isReviews ? 'reviews' : isTours ? 'tours' : isMedia ? 'media' : 'articles'}
        breadcrumb={isEditor ? 'Zurück zum Journal' : undefined}
        onBreadcrumb={() => { if (editing) persist(editing, true, 'Gespeichert'); }}
        onNavigate={(k) => {
          if (k === 'articles') setView('list');
          else if (k === 'media') setView('media');
          else if (k === 'tours') setView('tours');
          else if (k === 'reviews') setView('reviews');
          else flash('„' + k + '“ — Artikel, Medien, Touren und Bewertungen sind eingerichtet');
        }}
        title={isEditor && editing ? (titlePlain(editing) || 'Unbenannt') : isMedia ? 'Medien' : isTours ? 'Touren' : isReviews ? 'Bewertungen' : 'Journal'}
        subtitle={
          isEditor
            ? 'Artikel bearbeiten'
            : isMedia
              ? 'Bilder im Ordner /images'
              : isTours
                ? 'Tour-Übersicht (read-only)'
                : isReviews
                  ? 'Bewertungs-Aufrufe & Plattformen'
                  : `${articles.length} Artikel · ${articles.filter((a) => a.status === 'published').length} veröffentlicht`
        }
        actions={actions}
      >
        {isEditor && editing ? (
          <ArticleEditor
            doc={editing}
            onChange={setEditing}
            activeLang={activeLang}
            onLang={setActiveLang}
            articles={articles.filter((a) => a.slug !== editing.slug).map((a) => ({ slug: a.slug, title: titlePlain(a) || a.slug }))}
          />
        ) : isMedia ? (
          <MediaLibrary onNotify={flash} articles={articles} onOpenArticle={openEditor} />
        ) : isTours ? (
          <ToursList />
        ) : isReviews ? (
          <ReviewsPanel />
        ) : (
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
        )}
      </AdminShell>
      {gen && (
        <ArticleGenerator
          onClose={() => setGen(false)}
          onCreated={(a) => { setGen(false); setEditing(a); setEditingOrig(undefined); setActiveLang('de'); setView('editor'); flash('Entwurf erstellt — bitte prüfen'); }}
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
        <div className={`zsuite-toast ${toast.err ? 'err' : ''}`}>
          <span className="material-symbols-outlined">{toast.err ? 'error' : 'check_circle'}</span>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

export default AdminSuite;
