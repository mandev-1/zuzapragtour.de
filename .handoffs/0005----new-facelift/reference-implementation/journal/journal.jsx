/* Zuza Prague Tours — Editorial Journal article (single post recreation) */
const DSJ = window.ZuzaPragueToursDesignSystem_748186;
const { PullQuote: PQ, Callout: CO, Ornament: OR, Button: BtnJ } = DSJ;
const IMGJ = '../assets/images/';

function Masthead() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid var(--rule)', background: 'rgba(245,239,228,0.9)', backdropFilter: 'blur(10px)' }}>
      <div style={{ maxWidth: 'var(--shell)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 32, padding: '18px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
          <span>Prag · Mai 2026</span>
          <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: 999, background: 'var(--burgundy)' }} />
          <span>Editorial №&nbsp;47</span>
        </div>
        <a style={{ textAlign: 'center', fontFamily: 'var(--font-italic)', fontSize: 24, fontStyle: 'italic', letterSpacing: '0.01em', color: 'var(--ink)', textDecoration: 'none' }}>
          Zuza <span style={{ color: 'var(--burgundy)' }}>&amp;</span> Pragtour
        </a>
        <nav style={{ display: 'flex', justifyContent: 'flex-end', gap: 28, fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
          <a>Touren</a><a>Journal</a><a>Über</a><a>Reservieren</a>
        </nav>
      </div>
    </header>
  );
}

function P({ children }) {
  return <p style={{ fontFamily: 'var(--font-body)', fontSize: 19, lineHeight: 1.72, color: 'var(--ink-soft)', margin: '0 0 1.5em' }}>{children}</p>;
}

function Article() {
  return (
    <div style={{ background: 'var(--ivory)', minHeight: '100vh' }}>
      <Masthead />

      {/* Hero */}
      <div style={{ maxWidth: 'var(--shell)', margin: '0 auto', padding: '4rem 48px 0' }}>
        <div style={{ maxWidth: '52rem' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--brass-deep)', marginBottom: 24 }}>
            <span>Reiseführer</span><span style={{ width: 18, height: 1, background: 'var(--brass)' }} /><span>9 Minuten Lesezeit</span>
          </div>
          <h1 style={{ margin: '0 0 1.5rem', fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
            Die beste Zeit, um <em style={{ fontFamily: 'var(--font-italic)', fontStyle: 'italic', color: 'var(--burgundy)' }}>Prag</em> zu besuchen
          </h1>
          <p style={{ margin: '0 0 2rem', fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontSize: 24, lineHeight: 1.4, color: 'var(--ink-mute)' }}>
            Jede Jahreszeit erzählt eine andere Geschichte. Hier ist, wann die Stadt sich Ihnen am ehrlichsten zeigt.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 40, borderBottom: '1px solid var(--rule)' }}>
            <img src={IMGJ + 'zuzana-portrait.jpg'} alt="Zuzana" style={{ width: 44, height: 44, borderRadius: 999, objectFit: 'cover', objectPosition: 'center 20%' }} />
            <div>
              <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Zuzana Manová</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>Zertifizierte Stadtführerin</p>
            </div>
          </div>
        </div>
        <figure style={{ margin: '3rem 0 0' }}>
          <img src={IMGJ + 'autumn-prague.jpg'} alt="Prag im Herbst" style={{ width: '100%', height: 480, objectFit: 'cover', borderRadius: 2 }} />
          <figcaption style={{ marginTop: 12, paddingLeft: 16, borderLeft: '1px solid var(--brass)', fontFamily: 'var(--font-body)', fontSize: 14, fontStyle: 'italic', color: 'var(--ink-mute)' }}>Die Altstadt im Oktoberlicht — meine liebste Stunde des Jahres.</figcaption>
        </figure>
      </div>

      {/* Body */}
      <article style={{ maxWidth: '44rem', margin: '0 auto', padding: '3.5rem 24px 2rem' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 19, lineHeight: 1.72, color: 'var(--ink-soft)', margin: '0 0 1.5em' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '5.4em', fontWeight: 500, lineHeight: 0.85, float: 'left', margin: '0.05em 0.08em 0 -0.04em', color: 'var(--burgundy)' }}>P</span>
          rag verändert sich mit dem Licht. Im Frühnebel des März wirkt die Karlsbrücke wie eine Radierung; im Hochsommer glüht sie golden und ist voller Menschen. Nach vierzig Jahren weiß ich: Es gibt keine falsche Zeit — nur unterschiedliche Städte.
        </p>
        <P>Die meisten Reiseführer empfehlen Mai und September. Sie haben nicht unrecht. Aber sie verschweigen, dass der Januar seine eigene, stille Schönheit hat — wenn die Touristen fort sind und der Schnee die Dächer der Kleinseite glättet.</P>

        <PQ attribution="Zuzana">
          Kommen Sie im November. Die Stadt gehört dann wieder denen, die sie lieben.
        </PQ>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 400, lineHeight: 1.2, color: 'var(--ink)', margin: '2em 0 0.75em' }}>
          Frühling, wenn die Gärten <em style={{ fontFamily: 'var(--font-italic)', fontStyle: 'italic', color: 'var(--burgundy)' }}>erwachen</em>
        </h2>
        <P>Die Palastgärten unter der Burg öffnen Anfang April. Es ist die Zeit, in der ich meine längsten Touren plane — fünf Stunden, weil man einfach nicht aufhören möchte zu gehen.</P>

        <CO label="Tipp für Frühbucher">
          Die Burggärten sind <strong>vor 10 Uhr</strong> fast leer. Beginnen Sie dort, bevor die Reisegruppen eintreffen.
        </CO>

        <OR />

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 400, lineHeight: 1.2, color: 'var(--ink)', margin: '2em 0 0.75em' }}>
          Winter, die <em style={{ fontFamily: 'var(--font-italic)', fontStyle: 'italic', color: 'var(--burgundy)' }}>ehrlichste</em> Jahreszeit
        </h2>
        <P>Wenn Sie Prag wirklich kennenlernen möchten, kommen Sie zwischen Dreikönig und Ostern. Die Cafés gehören wieder den Einheimischen, und die Geschichten, die ich erzähle, hallen in leeren Gassen nach.</P>
      </article>

      {/* Reservation strip */}
      <div style={{ maxWidth: '44rem', margin: '0 auto 4rem', padding: '0 24px' }}>
        <div style={{ background: 'var(--paper)', border: '1px solid var(--rule)', textAlign: 'center', padding: 40 }}>
          <h3 style={{ margin: '0 0 1em', fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontSize: 24, fontWeight: 500, color: 'var(--burgundy)' }}>Möchten Sie Prag in Ihrer Jahreszeit sehen?</h3>
          <p style={{ margin: '0 0 1.5rem', fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--ink-mute)' }}>Begrenzte Verfügbarkeit für private Führungen. Schreiben Sie mir, und wir finden den richtigen Tag.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <BtnJ variant="accent" style={{ borderRadius: 'var(--radius-pill)' }}>Tour reservieren</BtnJ>
            <BtnJ variant="link" style={{ color: 'var(--burgundy)' }}>Alle Touren ansehen</BtnJ>
          </div>
        </div>
      </div>

      {/* Related */}
      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: 'var(--shell)', margin: '0 auto', padding: '4rem 48px' }}>
          <p style={{ margin: '0 0 2rem', fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>Weiterlesen im Journal</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }}>
            {[['hidden-gems.jpg', 'Versteckte Höfe der Altstadt', 'Sieben Innenhöfe, die kein Reiseführer kennt.'],
              ['kafka.jpg', 'Auf Kafkas Spuren', 'Ein Spaziergang durch das deutsche Prag.'],
              ['night-prague.jpg', 'Prag nach Einbruch der Dunkelheit', 'Warum die Stadt nachts am schönsten ist.']].map(([img, t, d]) => (
              <a key={t} style={{ cursor: 'pointer', textDecoration: 'none' }}>
                <img src={IMGJ + img} alt="" style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 2, marginBottom: 16 }} />
                <h4 style={{ margin: '0 0 0.5rem', fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, color: 'var(--ink)' }}>{t}</h4>
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.55, color: 'var(--ink-mute)' }}>{d}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Article />);
