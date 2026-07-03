/* Zuza Prague Tours — Tours & Book screens + App shell */
const { useState: useStateB } = React;
const DSB = window.ZuzaPragueToursDesignSystem_748186;
const { Button: BtnB, Icon: IconB, Eyebrow: EyebrowB, SectionHeading: SHB, Field: FieldB } = DSB;

const TOURS_FULL = [
  { roman: 'I', title: 'Die Prager Burg & St.-Veits-Dom', duration: '3,5 Stunden', tags: ['Privatführung', 'Tiefgang'], desc: 'Tausend Jahre Macht, Glaube und Architektur auf dem größten zusammenhängenden Burgareal der Welt.' },
  { roman: 'II', title: 'Altstadt & Jüdisches Viertel', duration: '4 Stunden', tags: ['Private Gruppe', 'Akkreditiert'], desc: 'Das mittelalterliche Herz Prags und das bewegende Erbe des Josefov, geführt mit Museums-Akkreditierung.' },
  { roman: 'III', title: 'Individuelle Privattour', duration: 'Flexibel', tags: ['Maßgeschneidert'], desc: 'Sagen Sie mir, was Sie interessiert, und ich baue den Rundgang darum. Wenn Sie es noch nicht wissen, umso besser.' },
  { roman: 'IV', title: 'Verstecktes Prag', duration: '2,5 Stunden', tags: ['Versteckte Juwelen'], desc: 'Höfe, Gassen und Geschichten abseits der Touristenpfade — das Prag, das die Einheimischen lieben.' },
  { roman: 'V', title: 'Prag & deutsches Erbe', duration: '2,75 Stunden', tags: ['Deutschsprachig'], desc: 'Auf den Spuren der deutschsprachigen Geschichte Prags, von Kafka bis zur Prager deutschen Literatur.' },
];

function ToursScreen({ go }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', color: 'var(--ink)' }}>
      <header style={{ maxWidth: 'var(--shell-editorial)', margin: '0 auto', padding: '4rem 2.5rem 3rem' }}>
        <EyebrowB tone="mute" style={{ marginBottom: 24 }}>Touren · Privatführungen</EyebrowB>
        <h1 style={{ margin: '0 0 2rem', maxWidth: '44rem', fontFamily: 'var(--font-display)', fontSize: 'var(--text-display-lg)', fontWeight: 400, lineHeight: 1.1, color: 'var(--ink)' }}>Jede Tour beginnt mit Ihrer Neugier.</h1>
        <p style={{ margin: 0, maxWidth: '36rem', fontFamily: 'var(--font-body)', fontSize: 'var(--text-lg)', lineHeight: 1.6, color: 'var(--stone-700)' }}>Keine festen Skripte, keine Massen. Nur Sie, Prag und vierzig Jahre Geschichten. Wählen Sie einen Ausgangspunkt — den Rest gestalten wir gemeinsam.</p>
      </header>
      <section style={{ maxWidth: 'var(--shell-editorial)', margin: '0 auto', padding: '0 2.5rem 5rem' }}>
        <div style={{ borderTop: '1px solid var(--stone-200)' }}>
          {TOURS_FULL.map((t) => (
            <article key={t.roman} style={{ display: 'grid', gridTemplateColumns: '4rem minmax(0,1fr) auto', gap: 40, borderBottom: '1px solid var(--stone-200)', padding: '3.5rem 0' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 20, color: 'var(--stone-400)' }}>{t.roman}.</div>
              <div style={{ maxWidth: '44rem' }}>
                <h2 style={{ margin: '0 0 0.75rem', fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 400, lineHeight: 1.15, color: 'var(--ink)' }}>{t.title}</h2>
                <p style={{ margin: '0 0 1.25rem', fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', lineHeight: 1.7, color: 'var(--stone-700)' }}>{t.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--stone-500)' }}>
                  <span>{t.duration}</span>
                  {t.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: 12 }}>
                <a onClick={() => go('book')} style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, color: 'var(--accent)', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 4, whiteSpace: 'nowrap' }}>Anfrage senden →</a>
                <a style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--stone-500)', cursor: 'pointer', whiteSpace: 'nowrap' }}>Tour ansehen</a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
        <div style={{ maxWidth: 'var(--shell-editorial)', margin: '0 auto', padding: '5rem 2.5rem', textAlign: 'center' }}>
          <EyebrowB tone="onDark" style={{ marginBottom: 16, color: 'var(--stone-400)' }}>Bereit zu beginnen?</EyebrowB>
          <h2 style={{ margin: '0 auto 1.5rem', maxWidth: '40rem', fontFamily: 'var(--font-display)', fontSize: 'var(--text-display-md)', fontWeight: 400, color: 'var(--paper)' }}>Erzählen Sie mir, was Sie interessiert.</h2>
          <BtnB variant="onDark" onClick={() => go('book')}>Tour buchen</BtnB>
        </div>
      </section>
    </div>
  );
}

function BookScreen() {
  const [sent, setSent] = useStateB(false);
  return (
    <div style={{ background: 'var(--paper)', paddingBottom: 96, minHeight: '100vh' }}>
      <div style={{ borderBottom: '1px solid var(--stone-200)', padding: '3.5rem 1.25rem', textAlign: 'center' }}>
        <EyebrowB tone="mute" style={{ marginBottom: 12 }}>Tour buchen</EyebrowB>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-display-md)', fontWeight: 400, color: 'var(--ink)' }}>Ihre Anfrage</h1>
        <p style={{ margin: '1rem auto 0', maxWidth: '40rem', fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--stone-600)' }}>Erzählen Sie mir von Ihrer Gruppe und Ihren Interessen. Ich melde mich in der Regel innerhalb von 24 Stunden.</p>
      </div>
      <div style={{ maxWidth: 'var(--shell-editorial)', margin: '0 auto', display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 64, padding: '4rem 2.5rem' }}>
        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <img src="../assets/images/zuzana-portrait.jpg" alt="Zuzana" style={{ width: 80, height: 80, borderRadius: 2, objectFit: 'cover', objectPosition: 'center 20%', flexShrink: 0 }} />
            <div>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--ink)' }}>Direkt mit Zuzana</h2>
              <p style={{ margin: '0.25rem 0 0', fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6, color: 'var(--stone-600)' }}>Keine Agentur, kein Callcenter — Sie schreiben mir, und ich antworte persönlich.</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, borderTop: '1px solid var(--stone-200)', paddingTop: 24 }}>
            {[['Telefon', '+420 721 231 933'], ['WhatsApp', 'Direkt schreiben'], ['E-Mail', 'zuzanamanova@email.cz'], ['Antwortzeit', 'In der Regel < 24 Stunden']].map(([k, v]) => (
              <div key={k}>
                <p style={{ margin: '0 0 2px', fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--stone-400)' }}>{k}</p>
                <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--ink)' }}>{v}</p>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--stone-200)', paddingTop: 24 }}>
            <blockquote style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic', lineHeight: 1.5, color: 'var(--ink)' }}>&ldquo;Die beste Reiseentscheidung, die wir getroffen haben.&rdquo;</blockquote>
            <p style={{ margin: '0.75rem 0 0', fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--stone-400)' }}>— Monika H.</p>
          </div>
        </div>
        {/* Form */}
        <div>
          {sent ? (
            <div style={{ border: '1px solid #cfe3d4', background: '#f1f7f2', padding: '3.5rem 1.5rem', textAlign: 'center' }}>
              <h2 style={{ margin: '0 0 0.5rem', fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--success)' }}>Anfrage gesendet!</h2>
              <p style={{ margin: '0 auto', maxWidth: '24rem', fontFamily: 'var(--font-body)', fontSize: 14, color: '#3f6b4a' }}>Vielen Dank! Ich melde mich in der Regel innerhalb von 24 Stunden bei Ihnen.</p>
            </div>
          ) : (
            <div style={{ border: '1px solid var(--stone-200)' }}>
              <div style={{ borderBottom: '1px solid var(--stone-200)', padding: '1rem 1.5rem' }}>
                <EyebrowB tone="mute">Anfrageformular</EyebrowB>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <FieldB label="Name" name="name" required placeholder="Ihr Name" />
                  <FieldB label="E-Mail" name="email" type="email" required placeholder="ihre@email.de" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <FieldB label="Wunschtermin" name="date" placeholder="z. B. Mai 2026" />
                  <FieldB label="Telefon (optional)" name="phone" type="tel" />
                </div>
                <FieldB label="Nachricht" name="message" as="textarea" rows={4} placeholder="Erzählen Sie mir von Ihrer Gruppe und was Sie in Prag sehen möchten…" />
                <BtnB variant="ink" fullWidth onClick={() => setSent(true)}>Anfrage senden</BtnB>
                <p style={{ margin: 0, textAlign: 'center', fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--stone-400)' }}>Ihre Daten sind sicher und werden nicht weitergegeben.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useStateB('home');
  const go = (s) => { setScreen(s); window.scrollTo({ top: 0 }); };
  const { Header, Footer, Home } = window.ZPTSite;
  return (
    <div>
      <Header screen={screen} go={go} />
      {screen === 'home' && <Home go={go} />}
      {screen === 'tours' && <ToursScreen go={go} />}
      {screen === 'book' && <BookScreen go={go} />}
      <Footer go={go} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
