import React from 'react';

const NS = 'ZuzaPragueToursDesignSystem_748186';

/* Seed = the real journal, lifted from journal-content-*.js (Zuzana's voice,
   real coordinates). Mixed statuses so the dashboard reads true. */
const SEED = [
  {
    slug: 'beste-reisezeit', category: 'Reiseführer', status: 'published', date: 'Mai 2026', readTime: '9 Min.',
    title: 'Die beste Zeit, um <em>Prag</em> zu besuchen', titlePlain: 'Die beste Zeit, um Prag zu besuchen',
    cardBlurb: 'Jede Jahreszeit erzählt eine andere Geschichte — und warum der November mein Geheimtipp ist.',
    hero: 'autumn-prague.jpg', heroCap: 'Die Altstadt im Oktoberlicht — meine liebste Stunde des Jahres.',
    standfirst: 'Jede Jahreszeit erzählt eine andere Geschichte. Hier ist, wann die Stadt sich Ihnen am ehrlichsten zeigt.',
    related: ['48-stunden-prag', 'versteckte-hoefe'],
    blocks: [
      { t: 'p', html: 'Prag verändert sich mit dem Licht. Im Frühnebel des März wirkt die Karlsbrücke wie eine Radierung; im Hochsommer glüht sie golden und ist voller Menschen. Nach vierzig Jahren weiß ich: Es gibt keine falsche Zeit — nur unterschiedliche Städte.' },
      { t: 'h2', html: 'Frühling, wenn die Gärten <em>erwachen</em>' },
      { t: 'p', html: 'Die Palastgärten unter der Burg öffnen Anfang April. Flieder über barocken Terrassen, und noch genug Ruhe, um sie zu genießen.' },
      { t: 'callout', label: 'Tipp für Frühbucher', html: '<p>Die Burggärten sind <strong>vor 10 Uhr</strong> fast leer. Beginnen Sie dort, bevor die Reisegruppen eintreffen.</p>' },
      { t: 'h2', html: 'Herbst, die <em>fotogenste</em> Jahreszeit' },
      { t: 'p', html: 'Oktober ist mein persönlicher Favorit. Das Laub auf der Kampa-Insel, der Dunst über der Moldau, das tiefe Licht auf den Sandsteinfassaden.' },
      { t: 'quote', html: 'Kommen Sie im November. Die Stadt gehört dann wieder denen, die sie lieben.', by: 'Zuzana' },
      { t: 'map', title: 'Meine Lieblingsorte durchs Jahr', mode: 'illustrated', route: false, list: true, caption: 'Vier Orte, die in ihrer jeweiligen Saison am schönsten sind.', points: [
        { coord: [50.0897, 14.4060], label: 'Wallenstein-Garten', note: 'Frühling: barocke Terrassen, vor 10 Uhr fast leer.' },
        { coord: [50.0855, 14.4080], label: 'Kampa-Insel', note: 'Herbst: Laub an der Moldau, das schönste Licht der Stadt.' },
        { coord: [50.0835, 14.3954], label: 'Petřín-Hügel', note: 'Sommer: Obstgärten und kühle Höhenluft über der Stadt.' },
        { coord: [50.0640, 14.4178], label: 'Vyšehrad', note: 'Winter: still, weit, fast ohne Touristen.' },
      ] },
      { t: 'ornament' },
      { t: 'p', html: 'Wenn Sie mir sagen, wann Sie kommen, baue ich die Route um die Jahreszeit herum. Das ist der Unterschied zwischen einer Tour und <em>Ihrer</em> Tour.' },
    ],
  },
  {
    slug: '48-stunden-prag', category: 'Reiserouten', status: 'published', date: 'April 2026', readTime: '11 Min.',
    title: '48 Stunden in <em>Prag</em>', titlePlain: '48 Stunden in Prag',
    cardBlurb: 'Ein durchdachter Spaziergang für ein Wochenende — von der Burg bis zur Moldau, ohne Hetze.',
    hero: 'vltava-bridges-hero.jpg', heroCap: 'Die Moldau und ihre Brücken — das Rückgrat jeder guten Prag-Route.',
    standfirst: 'Zwei Tage reichen für das Wesentliche — wenn man die Reihenfolge richtig wählt und früh aufsteht.',
    related: ['prager-burg', 'versteckte-hoefe'],
    blocks: [
      { t: 'p', html: 'Die häufigste Frage, die ich höre: „Wir haben nur ein Wochenende — was sollen wir sehen?" Hier ist die Route, die ich Freunden gebe. Sie folgt nicht der Landkarte, sondern dem Licht und den Menschenmengen.' },
      { t: 'h2', html: 'Tag eins — die <em>Höhen</em>' },
      { t: 'p', html: 'Beginnen Sie oben, auf der Prager Burg, möglichst vor 9 Uhr. Von dort führt der Weg bergab durch die Kleinseite, über die Karlsbrücke bis in die Altstadt.' },
      { t: 'callout', label: 'Reihenfolge ist alles', html: '<p>Gehen Sie <strong>von oben nach unten</strong> und <strong>von Ost nach West am Morgen</strong> — die Sonne im Rücken, die Menge vor Ihnen.</p>' },
      { t: 'map', title: 'Tag 1 · von der Burg zur Altstadt', mode: 'illustrated', route: true, list: true, caption: 'Bergab und ostwärts: rund 3,5 km, gut einen halben Tag mit Pausen.', points: [
        { coord: [50.0911, 14.4016], label: 'Prager Burg', note: '8:30 Uhr, vor dem Andrang.' },
        { coord: [50.0879, 14.4030], label: 'Kleinseitner Ring', note: 'St.-Niklas-Kirche, dann hinab zum Fluss.' },
        { coord: [50.0865, 14.4114], label: 'Karlsbrücke', note: 'Am Vormittag noch begehbar. Ostwärts laufen.' },
        { coord: [50.0875, 14.4213], label: 'Altstädter Ring', note: 'Astronomische Uhr, Teynkirche, Mittagspause.' },
      ] },
      { t: 'quote', html: 'Zwei Tage sind genug, um sich zu verlieben. Sie sind nie genug, um zu gehen.', by: 'Zuzana' },
    ],
  },
  {
    slug: 'prager-burg', category: 'Wahrzeichen', status: 'published', date: 'März 2026', readTime: '10 Min.',
    title: 'Die Prager Burg: ein <em>Rundgang</em>', titlePlain: 'Die Prager Burg: ein Rundgang',
    cardBlurb: 'Tausend Jahre auf einem Hügel — wie man den größten Burgkomplex der Welt richtig erläuft.',
    hero: 'st-vitus-night.png', heroCap: 'Der St.-Veits-Dom bei Nacht — das Herz der Burg.',
    standfirst: 'Der größte zusammenhängende Burgkomplex der Welt lässt sich nicht „abhaken". Aber er lässt sich lesen.',
    related: ['48-stunden-prag'],
    blocks: [
      { t: 'p', html: 'Die Prager Burg ist kein Gebäude, sondern eine kleine Stadt: Kirchen, Paläste, Gassen und Gärten, gewachsen über elf Jahrhunderte.' },
      { t: 'callout', label: 'Praktisches', html: '<ul><li><strong>Vor 10 Uhr</strong> oder nach 15 Uhr ist es am ruhigsten.</li><li>Der Zugang zum Areal ist frei, die Innenräume sind kostenpflichtig.</li></ul>' },
      { t: 'costTable', title: 'Eintritt (Richtwerte)', rows: [{ k: 'Rundgang B', v: '250 Kč' }, { k: 'Ermäßigt', v: '125 Kč' }, { k: 'Areal', v: 'frei' }] },
      { t: 'map', title: 'Rundgang über das Burgareal', mode: 'illustrated', route: true, list: true, caption: 'Von Ost nach West, leicht bergab — etwa 1,5 km.', points: [
        { coord: [50.0894, 14.3984], label: 'Hradschiner Platz', note: 'Start am Haupttor mit der Wachablösung.' },
        { coord: [50.0909, 14.4006], label: 'St.-Veits-Dom', note: 'Mucha-Fenster und Wenzelskapelle.' },
        { coord: [50.0920, 14.4045], label: 'Goldenes Gässchen', note: 'Kafkas Schreibstube, Nr. 22.' },
      ] },
      { t: 'quote', html: 'Eine Burg ist kein Stein. Sie ist die Summe der Menschen, die durch sie hindurchgingen.', by: 'Zuzana' },
    ],
  },
  {
    slug: 'josefov', category: 'Geschichte', status: 'draft', date: '—', readTime: '12 Min.',
    title: 'Josefov: das <em>jüdische</em> Viertel', titlePlain: 'Josefov: das jüdische Viertel',
    cardBlurb: 'Sechs Synagogen, ein alter Friedhof und tausend Jahre Geschichte — geführt mit Akkreditierung.',
    hero: 'josefov.jpg', heroCap: 'Die Klausen-Synagoge am Alten Jüdischen Friedhof.',
    standfirst: 'Das kleinste Viertel Prags trägt die schwerste Geschichte. Es will langsam gelesen werden.',
    related: ['versteckte-hoefe'],
    blocks: [
      { t: 'p', html: 'Josefov ist auf der Karte winzig — ein paar Gassen zwischen Altstädter Ring und Fluss. Doch kein anderer Teil Prags verlangt so viel Aufmerksamkeit.' },
      { t: 'h2', html: 'Was das <em>Museum</em> umfasst' },
      { t: 'p', html: 'Die meisten Stätten teilen sich ein Kombiticket: die Pinkas-Synagoge, der Alte Jüdische Friedhof, die Klausen-, die Maisel- und die prächtige Spanische Synagoge.' },
      { t: 'callout', label: 'Vor dem Besuch', html: '<ul><li><strong>Schabbat</strong> sind die Stätten geschlossen.</li><li>Männer erhalten am Eingang eine <strong>Kippa</strong>.</li></ul>' },
    ],
  },
  {
    slug: 'versteckte-hoefe', category: 'Verstecktes Prag', status: 'scheduled', date: 'Juli 2026', readTime: '8 Min.',
    title: 'Versteckte <em>Höfe</em> & Passagen', titlePlain: 'Versteckte Höfe und Passagen',
    cardBlurb: 'Sieben Innenhöfe und Durchgänge, die kein Reiseführer kennt — und wie Sie hineinkommen.',
    hero: 'hidden-gems.jpg', heroCap: 'Ein stiller Innenhof, wenige Schritte vom Trubel entfernt.',
    standfirst: 'Die Prager Altstadt hat ein zweites, verborgenes Erdgeschoss — wenn man weiß, durch welche Tür man geht.',
    related: ['kaffeehaeuser'],
    blocks: [
      { t: 'p', html: 'Prag ist eine Stadt der Durchgänge. Hinter unscheinbaren Fassaden öffnen sich Höfe und Passagen, die kaum ein Tagesbesucher je sieht.' },
      { t: 'callout', label: 'Knigge für Höfe', html: '<ul><li>Sind die Tore offen, ist der Hof meist <strong>tagsüber zugänglich</strong>.</li><li>Wohnhöfe sind privat — <strong>leise sein</strong>.</li></ul>' },
      { t: 'map', title: 'Höfe & Passagen der Altstadt', mode: 'illustrated', route: true, list: false, caption: 'Ein loser Rundgang; die Stationen liegen wenige Gehminuten auseinander.', points: [
        { coord: [50.0865, 14.4163], label: 'Klementinum', note: 'Barocke Höfe und die schönste Bibliothek der Stadt.' },
        { coord: [50.0879, 14.4283], label: 'Repräsentationshaus', note: 'Jugendstil-Innenhof und Café, oft übersehen.' },
        { coord: [50.0820, 14.4255], label: 'Lucerna-Passage', note: 'Das auf dem Kopf hängende Pferd von David Černý.' },
      ] },
      { t: 'quote', html: 'Die schönsten Orte Prags haben keine Schilder. Sie haben nur offene Türen.', by: 'Zuzana' },
    ],
  },
  {
    slug: 'kaffeehaeuser', category: 'Kulinarik', status: 'draft', date: '—', readTime: '7 Min.',
    title: 'Prager <em>Kaffeehäuser</em>, die zählen', titlePlain: 'Prager Kaffeehäuser, die zählen',
    cardBlurb: 'Wo die Stadt noch denkt und schreibt — fünf Häuser fernab der Souvenirläden.',
    hero: 'kafka.jpg', heroCap: 'Marmor, Messing und Zeitungen an Holzstäben.',
    standfirst: 'Ein gutes Kaffeehaus ist in Prag kein Café, sondern eine Haltung.',
    related: ['versteckte-hoefe'],
    blocks: [
      { t: 'p', html: 'Das Wiener Erbe lebt in Prag in seinen Kaffeehäusern weiter — hohe Decken, Marmortische, Zeitungen an Holzstäben und der unausgesprochene Vertrag, dass man bleiben darf, solange man möchte.' },
      { t: 'h2', html: 'Wo ich selbst <em>sitze</em>' },
      { t: 'p', html: 'Nach einer Tour setze ich mich am liebsten dorthin, wo die Kellner einen noch grüßen. Diese Häuser sind keine Kulisse — sie arbeiten noch.' },
    ],
  },
];

const CSS = `
.zpt-admin-suite{height:100vh;font-family:var(--font-sans)}
.zsuite-btn{display:inline-flex;align-items:center;gap:.45rem;font-family:var(--font-sans);font-size:12px;font-weight:600;letter-spacing:.03em;border-radius:var(--radius-md);padding:.6rem 1rem;cursor:pointer;border:1px solid transparent;transition:background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out)}
.zsuite-btn .material-symbols-outlined{font-size:17px}
.zsuite-btn.primary{background:var(--burgundy);color:var(--ivory)}
.zsuite-btn.primary:hover{background:var(--burgundy-deep)}
.zsuite-btn.ghost{background:#fff;border-color:var(--rule);color:var(--ink-soft)}
.zsuite-btn.ghost:hover{border-color:var(--ink);color:var(--ink)}
.zsuite-pill{display:inline-flex;align-items:center;gap:.4rem;font-size:11px;font-weight:600;padding:.45rem .75rem;border-radius:var(--radius-pill)}
.zsuite-pill::before{content:"";width:6px;height:6px;border-radius:999px;background:currentColor}
.zsuite-pill.published{color:#3F6B4A;background:rgba(63,107,74,.12)}
.zsuite-pill.draft{color:var(--stone-600);background:var(--stone-100)}
.zsuite-pill.scheduled{color:var(--brass-deep);background:rgba(168,134,84,.15)}
.zsuite-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.8rem;height:60vh;color:var(--ink-mute);text-align:center}
.zsuite-empty .material-symbols-outlined{font-size:44px;color:var(--stone-300)}
.zsuite-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--ink);color:var(--ivory);font-family:var(--font-sans);font-size:13px;padding:.7rem 1.2rem;border-radius:var(--radius-pill);box-shadow:var(--shadow-lg);z-index:90;display:flex;align-items:center;gap:.5rem;animation:zsuite-rise var(--dur-base) var(--ease-out)}
.zsuite-toast .material-symbols-outlined{font-size:18px;color:var(--gold-lamp)}
@keyframes zsuite-rise{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}
`;

const STATUS_LABEL = { published: 'Veröffentlicht', draft: 'Entwurf', scheduled: 'Geplant' };
const clone = (o) => JSON.parse(JSON.stringify(o));

/**
 * AdminSuite — the full article admin & editor for the journal. Holds all
 * state and orchestrates the two surfaces: a curation dashboard
 * (ArticleTable) and a block-based ArticleEditor (with the MapBuilder),
 * inside the AdminShell chrome. Seeded with the real journal so it runs out
 * of the box; pass `articles` to supply your own. The single mount the
 * `templates/article-admin` template renders.
 */
export function AdminSuite({ articles: seed, imageBase = '../../assets/images/', className = '', style = {} }) {
  const NSx = (typeof window !== 'undefined' && window[NS]) || {};
  const { AdminShell, ArticleTable, ArticleEditor } = NSx;

  const [articles, setArticles] = React.useState(() => clone(seed || SEED));
  const [view, setView] = React.useState('list');
  const [editing, setEditing] = React.useState(null);
  const [filter, setFilter] = React.useState('all');
  const [query, setQuery] = React.useState('');
  const [toast, setToast] = React.useState(null);
  const toastTimer = React.useRef(null);

  const flash = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  const openEditor = (slug) => { const a = articles.find((x) => x.slug === slug); if (a) { setEditing(clone(a)); setView('editor'); } };
  const newArticle = () => {
    const doc = { slug: 'neuer-artikel-' + Date.now().toString(36).slice(-4), category: 'Reiseführer', status: 'draft', date: '—', readTime: '— Min.', title: 'Unbenannter Artikel', titlePlain: 'Unbenannter Artikel', cardBlurb: '', hero: '', heroCap: '', standfirst: 'Beginnen Sie hier mit dem Vorspann …', related: [], blocks: [{ t: 'p', html: 'Erzählen Sie Ihre Geschichte …' }] };
    setEditing(doc); setView('editor');
  };
  const persist = (close) => {
    setArticles((list) => {
      const i = list.findIndex((x) => x.slug === editing.slug);
      if (i === -1) return [editing, ...list];
      const next = list.slice(); next[i] = editing; return next;
    });
    if (close) { setView('list'); setEditing(null); }
  };
  const duplicate = (slug) => {
    const a = articles.find((x) => x.slug === slug); if (!a) return;
    const copy = clone(a); copy.slug = a.slug + '-kopie'; copy.status = 'draft'; copy.date = '—';
    copy.titlePlain = a.titlePlain + ' (Kopie)'; copy.title = a.title + ' (Kopie)';
    setArticles((l) => [copy, ...l]); flash('Artikel dupliziert');
  };
  const remove = (slug) => { setArticles((l) => l.filter((x) => x.slug !== slug)); flash('Artikel gelöscht'); };

  if (!AdminShell || !ArticleTable || !ArticleEditor) {
    return <div style={{ padding: 40, fontFamily: 'var(--font-sans)', color: 'var(--ink-mute)' }}>Lädt die Redaktions-Komponenten …</div>;
  }

  const isEditor = view === 'editor' && editing;
  const actions = isEditor ? (
    <>
      <span className={`zsuite-pill ${editing.status}`}>{STATUS_LABEL[editing.status]}</span>
      <button type="button" className="zsuite-btn ghost" onClick={() => flash('Vorschau geöffnet')}><span className="material-symbols-outlined">visibility</span>Vorschau</button>
      <button type="button" className="zsuite-btn ghost" onClick={() => { persist(false); flash('Gespeichert'); }}>Speichern</button>
      <button type="button" className="zsuite-btn primary" onClick={persistPublished}><span className="material-symbols-outlined">publish</span>Veröffentlichen</button>
    </>
  ) : (
    <button type="button" className="zsuite-btn primary" onClick={newArticle}><span className="material-symbols-outlined">add</span>Neuer Artikel</button>
  );

  // publish must persist the just-updated status; compute from latest editing
  function persistPublished() {
    setEditing((cur) => {
      const pub = { ...cur, status: 'published' };
      setArticles((list) => {
        const i = list.findIndex((x) => x.slug === pub.slug);
        if (i === -1) return [pub, ...list];
        const next = list.slice(); next[i] = pub; return next;
      });
      setView('list'); flash('Veröffentlicht'); return null;
    });
  }

  return (
    <div className={`zpt-admin-suite ${className}`} style={style}>
      <style>{CSS}</style>
      <AdminShell
        active="articles"
        breadcrumb={isEditor ? 'Zurück zum Journal' : undefined}
        onBreadcrumb={() => { persist(true); }}
        onNavigate={(k) => { if (k !== 'articles') flash('„' + k + '" — Demo: nur „Artikel" ist eingerichtet'); }}
        title={isEditor ? editing.titlePlain : 'Journal'}
        subtitle={isEditor ? 'Artikel bearbeiten' : articles.length + ' Artikel · ' + articles.filter((a) => a.status === 'published').length + ' veröffentlicht'}
        actions={actions}
      >
        {isEditor ? (
          <ArticleEditor doc={editing} onChange={setEditing} imageBase={imageBase} />
        ) : (
          <ArticleTable
            articles={articles}
            query={query} onQuery={setQuery}
            filter={filter} onFilter={setFilter}
            onEdit={openEditor} onDuplicate={duplicate} onDelete={remove}
            imageBase={imageBase}
          />
        )}
      </AdminShell>
      {toast && <div className="zsuite-toast"><span className="material-symbols-outlined">check_circle</span>{toast}</div>}
    </div>
  );
}

export default AdminSuite;
