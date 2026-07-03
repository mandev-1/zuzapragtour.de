/* Zuza Prague Tours — Marketing website UI kit
   Composes the design-system primitives into the live site's three core
   surfaces: Home, Tours, and Book. Interactive nav switches screens. */
const { useState } = React;
const DS = window.ZuzaPragueToursDesignSystem_748186;
const { Button, Icon, Eyebrow, Badge, SectionHeading, StatBlock, TourRow, ReviewCard, Field } = DS;

const IMG = '../assets/images/';

const NAV = [
  { id: 'home', label: 'Startseite' },
  { id: 'tours', label: 'Touren' },
  { id: 'book', label: 'Tour buchen' },
];

/* ── Shared chrome ───────────────────────────────────────────── */
function Header({ screen, go }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid var(--stone-200)', background: 'rgba(250,246,236,0.95)', backdropFilter: 'blur(10px)' }}>
      <div style={{ maxWidth: 'var(--shell-editorial)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem' }}>
        <a onClick={() => go('home')} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
          <span style={{ width: 32, height: 32, borderRadius: 999, background: 'var(--ink)', color: 'var(--paper)', fontFamily: 'var(--font-headline)', fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Z</span>
          <span style={{ fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--ink)' }}>Zuzana Manová</span>
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['tours', 'home'].map(() => null)}
          <a onClick={() => go('tours')} style={navLink(screen === 'tours')}>Touren</a>
          <a style={navLink(false)}>Über Zuzana</a>
          <a style={navLink(false)}>Blog</a>
          <a style={navLink(false)}>Kontakt</a>
          <a href="tel:+420721231933" style={navLink(false)}>+420 721 231 933</a>
          <Button variant="outline" size="sm" onClick={() => go('book')}>Tour buchen</Button>
        </nav>
      </div>
    </header>
  );
}
function navLink(active) {
  return { fontFamily: 'var(--font-label)', fontSize: 14, letterSpacing: '0.01em', color: active ? 'var(--ink)' : 'var(--stone-500)', cursor: 'pointer', textDecoration: 'none' };
}

function Footer({ go }) {
  return (
    <footer>
      <div style={{ background: 'var(--ink)' }}>
        <div style={{ maxWidth: 'var(--shell-editorial)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between', padding: '3rem 2rem' }}>
          <div>
            <Eyebrow tone="mute" style={{ color: 'var(--stone-500)' }}>Zertifizierte Expertin · 40 Jahre Erfahrung</Eyebrow>
            <h3 style={{ margin: '0.5rem 0 0', fontFamily: 'var(--font-headline)', fontSize: 'var(--text-display-md)', color: 'var(--paper)' }}>Bereit, Prag zu entdecken?</h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
            <a href="tel:+420721231933" style={{ fontFamily: 'var(--font-label)', fontSize: 14, color: 'var(--stone-300)', textDecoration: 'none' }}>+420 721 231 933</a>
            <span style={{ color: 'var(--stone-600)' }}>·</span>
            <a style={{ fontFamily: 'var(--font-label)', fontSize: 14, color: 'var(--stone-300)', textDecoration: 'none', cursor: 'pointer' }}>WhatsApp</a>
            <Button variant="accent" size="sm" onClick={() => go('book')}>Tour buchen</Button>
          </div>
        </div>
      </div>
      <div style={{ background: 'var(--paper)' }}>
        <div style={{ maxWidth: 'var(--shell-editorial)', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 32, padding: '3rem 2rem' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-headline)', fontSize: 18, color: 'var(--ink)' }}>Zuza Prague Tours</span>
            <p style={{ margin: '0.75rem 0 1.25rem', fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6, color: 'var(--stone-600)', maxWidth: '22rem' }}>Erleben Sie Prag mit Ihrer deutschsprachigen Expertin und Spezialistin für Prag-Führungen.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-label)', fontSize: 12, color: 'var(--stone-500)' }}>
              <Icon name="star" fill size={14} color="var(--gold-olive)" /> 4,9 ★ TripAdvisor · @erlebnis_tour_prag
            </div>
          </div>
          <div>
            <h4 style={footH()}>Kontakt</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a style={footLink()}>+420 721 231 933</a>
              <a style={footLink()}>zuzanamanova@email.cz</a>
              <a style={footLink()}>WhatsApp</a>
            </div>
          </div>
          <div>
            <h4 style={footH()}>Schnelllinks</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a onClick={() => go('home')} style={footLink()}>Startseite</a>
              <a onClick={() => go('tours')} style={footLink()}>Touren</a>
              <a style={footLink()}>Über Zuzana</a>
              <a onClick={() => go('book')} style={footLink()}>Tour buchen</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--stone-200)' }}>
          <div style={{ maxWidth: 'var(--shell-editorial)', margin: '0 auto', display: 'flex', justifyContent: 'space-between', padding: '1.25rem 2rem' }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-label)', fontSize: 12, color: 'var(--stone-400)' }}>© 2026 Zuza Prague Tours – Zuzana Manová. Alle Rechte vorbehalten</p>
            <div style={{ display: 'flex', gap: 16, fontFamily: 'var(--font-label)', fontSize: 12, color: 'var(--stone-400)' }}><span>Datenschutz</span>·<span>AGB</span></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
function footH() { return { fontFamily: 'var(--font-label)', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--stone-400)', margin: '0 0 1rem' }; }
function footLink() { return { fontFamily: 'var(--font-label)', fontSize: 14, color: 'var(--stone-600)', textDecoration: 'none', cursor: 'pointer' }; }

/* ── Home ────────────────────────────────────────────────────── */
const TOURS = [
  { num: '01', title: 'Altstadt & Jüdisches Viertel', duration: '4 Stunden', meta: 'Private Gruppe', desc: 'Ein tiefes Eintauchen in das mittelalterliche Herz Prags, auf den Spuren von 1.000 Jahren Legenden.' },
  { num: '02', title: 'Das alchemistische Prag', duration: '3 Stunden', meta: 'Versteckte Juwelen', desc: 'Entdecken Sie die mystische Seite der Prager Geschichte, von der Astrologie bis zur Alchemie.' },
  { num: '03', title: 'Böhmische Kunst & Architektur', duration: '5 Stunden', meta: 'Expertenfokus', desc: 'Ein kuratierter Spaziergang durch Jugendstil, Kubismus und die barocke Pracht der Kleinseite.' },
];
const REVIEWS = [
  { quote: 'Zuzanas persönliche Geschichte mit der Stadt macht diese Führung zu etwas völlig Einzigartigem. Absolut unvergesslich.', author: 'Thomas K.', source: 'TripAdvisor' },
  { quote: 'Ein absolutes Highlight unserer Europareise. Ihr Wissen über Architektur und Geschichte ist unübertroffen.', author: 'Monika H.', source: 'TourHQ Verifiziert' },
  { quote: 'Perfekt für unsere Familie. Sie hat die Kinder mit lokalen Legenden fasziniert.', author: 'Familie Schneider', source: 'Private Buchung' },
];

function Home({ go }) {
  return (
    <div style={{ background: 'var(--canvas)', color: 'var(--ink-2)' }}>
      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '78vh', display: 'flex', alignItems: 'center', overflow: 'hidden', padding: '4rem 0' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={IMG + 'charles-bridge-hero.jpg'} alt="Karlsbrücke" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--canvas), rgba(251,249,245,0.6) 45%, transparent)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 'var(--shell-editorial)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center', width: '100%', padding: '0 2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Badge variant="gold" icon="star">Zertifizierte Expertin</Badge>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-headline)', fontSize: 'clamp(2.5rem,5vw,4.25rem)', lineHeight: 1.08, fontWeight: 700, color: 'var(--ink-2)' }}>
              Entdecken Sie<br /><em style={{ fontStyle: 'italic', color: 'var(--crimson)' }}>Prag</em><br /><em style={{ fontStyle: 'italic' }}>mit Zuzana Manová</em>
            </h1>
            <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 20, lineHeight: 1.55, color: 'var(--ink-warm)', maxWidth: '32rem' }}>Erleben Sie die Magie Prags mit den Augen einer zertifizierten lokalen Expertin.</p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Button variant="primary" size="lg" icon="arrow_forward" onClick={() => go('book')}>Anfrage senden</Button>
              <Button variant="onDark" size="lg" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(224,191,188,0.3)' }} onClick={() => go('tours')}>Touren erkunden</Button>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: -48, left: -48, width: 256, height: 256, background: 'rgba(123,88,0,0.10)', borderRadius: 999, filter: 'blur(48px)' }} />
            <div style={{ position: 'relative', zIndex: 10, background: '#fff', padding: 16, borderRadius: 12, boxShadow: 'var(--shadow-xl)', transform: 'rotate(2deg)', maxWidth: 360, margin: '0 auto' }}>
              <img src={IMG + 'zuzana-portrait.jpg'} alt="Zuzana Manová" style={{ borderRadius: 8, aspectRatio: '4/5', objectFit: 'cover', objectPosition: 'center 20%', width: '100%', display: 'block' }} />
              <div style={{ position: 'absolute', bottom: -24, right: -24, padding: 16, borderRadius: 8, boxShadow: 'var(--shadow-lg)', color: '#fff', maxWidth: 240, background: 'var(--grad-burgundy)' }}>
                <p style={{ margin: 0, fontFamily: 'var(--font-headline)', fontStyle: 'italic', fontSize: 16, lineHeight: 1.35 }}>&ldquo;Prag ist eine vielschichtige Geschichte, lassen Sie uns diese gemeinsam lesen.&rdquo;</p>
                <p style={{ margin: '0.5rem 0 0', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', opacity: 0.8 }}>— Zuzana</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tours */}
      <section style={{ padding: '3rem 0', background: 'var(--canvas-alt)' }}>
        <div style={{ maxWidth: 'var(--shell-editorial)', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, gap: 24, flexWrap: 'wrap' }}>
            <SectionHeading eyebrow="Beliebte Touren" eyebrowTone="gold" title="Ausgewählte Erlebnisse" />
            <p style={{ margin: 0, maxWidth: '28rem', fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6, color: 'var(--ink-warm)' }}>Maßgeschneiderte Routen für anspruchsvolle Reisende, mit Fokus auf Authentizität, Geschichte und dem lokalen Puls der Stadt.</p>
          </div>
          <div style={{ display: 'grid', gap: 4 }}>
            {TOURS.map((t, i) => <TourRow key={t.num} {...t} description={t.desc} onClick={() => go('book')} href="#" last={i === TOURS.length - 1} />)}
          </div>
        </div>
      </section>

      {/* About */}
      <section style={{ padding: '4rem 0' }}>
        <div style={{ maxWidth: 'var(--shell-editorial)', margin: '0 auto', display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 48, alignItems: 'center', padding: '0 2rem' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: -40, transform: 'translateY(-50%)', zIndex: 0, pointerEvents: 'none' }}>
              <span style={{ fontFamily: 'var(--font-headline)', fontStyle: 'italic', fontSize: '8rem', lineHeight: 1, color: 'rgba(228,226,222,0.5)', userSelect: 'none' }}>Zuzana</span>
            </div>
            <div style={{ position: 'relative', zIndex: 10, borderRadius: 12, overflow: 'hidden', aspectRatio: '3/4', boxShadow: 'var(--shadow-xl)', background: '#eae8e4' }}>
              <img src={IMG + 'zuzana-portrait.jpg'} alt="Zuzana Manová" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
            </div>
            <div style={{ position: 'absolute', bottom: -24, right: -24, width: 192, height: 192, border: '4px solid rgba(123,88,0,0.2)', borderRadius: 8, zIndex: 0 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHeading eyebrow="Lernen Sie Zuzana kennen" eyebrowTone="burgundy" title="Prag, erzählt mit" emphasis="Leidenschaft" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.65, color: 'var(--ink-warm)' }}>
              <p style={{ margin: 0 }}>Ich bin Ing. Zuzana Manová – deutschsprachige Prag-Expertin und zertifizierte Stadtführerin. Seit 1986 führe ich Besucher durch Prag.</p>
              <p style={{ margin: 0 }}>Als Spezialistin für Prager Geschichte besitze ich die offizielle tschechische Zertifizierung und eine Akkreditierung des Jüdischen Museums in Prag.</p>
            </div>
            <div style={{ display: 'flex', gap: 40, paddingTop: 8 }}>
              <StatBlock value="40+" label="Jahre Erfahrung" />
              <StatBlock value="4,9k" label="Touren kuratiert" />
              <StatBlock value="5,0" label="Sterne Bewertung" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ padding: '3.5rem 0', background: 'var(--ink)', color: 'var(--paper)' }}>
        <div style={{ maxWidth: 'var(--shell-editorial)', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <SectionHeading eyebrow="Von meinen Gästen" title="Fotos von unseren Touren" align="center" onDark />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gridAutoRows: '180px', gap: 16 }}>
            <div style={galCell(2, 2)}><img src={IMG + 'guest-tourguide.jpg'} style={galImg()} alt="" /></div>
            <div style={galCell(1, 1)}><img src={IMG + 'guest-night.jpeg'} style={galImg()} alt="" /></div>
            <div style={galCell(1, 1)}><img src={IMG + 'guest-food.jpeg'} style={galImg()} alt="" /></div>
            <div style={galCell(2, 1)}><img src={IMG + 'boat-vltava.jpg'} style={galImg()} alt="" /></div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ padding: '3.5rem 0', background: 'var(--canvas-mute)' }}>
        <div style={{ maxWidth: 'var(--shell-editorial)', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 8 }}>
              {[0,1,2,3,4].map(i => <Icon key={i} name="star" fill size={18} color="var(--gold-olive)" />)}
            </div>
            <SectionHeading title="Unvergessliche Erinnerungen" align="center" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {REVIEWS.map((r, i) => <ReviewCard key={i} {...r} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '3.5rem 2rem' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', borderRadius: 'var(--radius-2xl)', padding: '4rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', background: 'var(--grad-burgundy)' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}><img src={IMG + 'prague-castle.jpg'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'overlay' }} /></div>
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-headline)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>Bereit, Prag zu entdecken?</h2>
            <p style={{ margin: 0, maxWidth: '36rem', fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(255,255,255,0.85)' }}>Begrenzte Verfügbarkeit für private Buchungen. Kontaktieren Sie Zuzana noch heute, um Ihre individuelle Reiseroute zu planen.</p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button variant="onDark" style={{ color: 'var(--crimson)' }} onClick={() => go('book')}>Anfrage senden</Button>
              <Button variant="link" style={{ color: '#fff', textDecorationColor: 'rgba(255,255,255,0.5)', padding: '0.75rem 1rem' }} onClick={() => go('tours')}>Touren erkunden</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
function galCell(c, r) { return { gridColumn: `span ${c}`, gridRow: `span ${r}`, overflow: 'hidden', borderRadius: 8 }; }
function galImg() { return { width: '100%', height: '100%', objectFit: 'cover' }; }

window.ZPTSite = { Header, Footer, Home };
