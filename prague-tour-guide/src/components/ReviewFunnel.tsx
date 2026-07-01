'use client';

/**
 * ReviewFunnel — the /bewerten page (0003 glassmorphic direction).
 *
 * Mobile-first, chrome-light funnel handed to guests after a tour. Its job:
 * convert a happy guest into a public Google / TripAdvisor review with minimum
 * friction, route unhappy guests to a private channel (while keeping a visible
 * "leave a public review anyway" link for review-gating compliance — DO NOT
 * remove it), and add progressive persuasion below the fold: a personal
 * thank-you, how-to, a copy-to-clipboard review helper, a note, social proof,
 * a recommend-a-friend share dialog, and a sticky mobile CTA dock.
 *
 * Styling lives in src/styles/review-funnel.css (scoped under .review-funnel-root);
 * the global Header/Footer are hidden for this route via src/index.css. Stars
 * and platform logos are inline SVG to avoid icon-font flash on the conversion
 * control. German-only by design (direct-link, noindex).
 */

import React from 'react';
import { BRAND } from '../brand';
import { Reveal } from './site/SiteUI';

const STAR = 'M12 2l2.9 6.2 6.8.7-5 4.6 1.4 6.7L12 17.8 5.9 20.2l1.4-6.7-5-4.6 6.8-.7z';
const WA_DIRECT = `https://wa.me/${BRAND.phoneRaw.replace(/[^0-9]/g, '')}`;
const SHARE_URL = BRAND.domain;
const SHARE_MSG = `Ich kann Zuzana als private Stadtführerin in Prag wärmstens empfehlen! ${SHARE_URL}`;

const CHIPS: { label: string; phrase: string }[] = [
  { label: 'Zuzanas Geschichten', phrase: 'Zuzanas Geschichten und ihre Leidenschaft' },
  { label: 'Jüdisches Viertel', phrase: 'die Tour durch das Jüdische Viertel' },
  { label: 'Versteckte Höfe', phrase: 'die versteckten Höfe abseits der Touristenpfade' },
  { label: 'Ihr Wissen', phrase: 'ihr tiefes Wissen über Geschichte und Architektur' },
  { label: 'Auf Deutsch', phrase: 'die Führung auf Deutsch' },
  { label: 'Für Familien', phrase: 'wie gut es für unsere Familie gepasst hat' },
];
const DRAFT_BASE = 'Eine wundervolle Privatführung durch Prag mit Zuzana.';
function buildDraft(picked: boolean[]): string {
  const phrases = CHIPS.filter((_, i) => picked[i]).map((c) => c.phrase);
  let t = DRAFT_BASE;
  if (phrases.length) {
    const list = phrases.length === 1 ? phrases[0] : phrases.slice(0, -1).join(', ') + ' und ' + phrases[phrases.length - 1];
    t += ' Besonders in Erinnerung geblieben sind mir ' + list + '.';
  }
  return t + ' Von Herzen zu empfehlen!';
}

/* ── Inline logos / glyphs ────────────────────────────────────── */
const LogoGoogleColor = () => (
  <svg className="rf-logo" viewBox="0 0 48 48" aria-hidden>
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.2 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.3-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 7.1 29.5 5 24 5 16.3 5 9.7 9.3 6.3 14.7z" transform="translate(0 -2)" />
    <path fill="#4CAF50" d="M24 45c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 36 26.7 37 24 37c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 40.6 16.2 45 24 45z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C39.9 36.5 45 31 45 24c0-1.2-.1-2.3-.4-3.5z" />
  </svg>
);
const LogoGoogleMono = () => (
  <svg className="rf-logo" viewBox="0 0 48 48" aria-hidden>
    <path fill="#fff" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.2 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.3-.4-3.5z" />
  </svg>
);
const LogoTripAdvisor = () => (
  <svg className="rf-logo" viewBox="0 0 48 48" aria-hidden>
    <circle cx="24" cy="24" r="22" fill="#34E0A1" />
    <circle cx="15" cy="24" r="6" fill="#fff" /><circle cx="33" cy="24" r="6" fill="#fff" />
    <circle cx="15" cy="24" r="2.6" fill="#000" /><circle cx="33" cy="24" r="2.6" fill="#000" />
    <path d="M9 17c3-3.5 7-5 15-5s12 1.5 15 5" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);
const LogoWhatsApp = () => (
  <svg className="rf-logo" viewBox="0 0 24 24" aria-hidden>
    <path fill="#fff" d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm0 2a8 8 0 11-4.1 14.9l-.3-.2-2.8.7.8-2.7-.2-.3A8 8 0 0112 4zm-2.6 4.1c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.7s1.5-.6 1.8-1.3c.2-.6.2-1.2.1-1.3l-.7-.3s-1.2-.6-1.4-.7c-.2-.1-.4-.1-.5.1l-.7.9c-.1.1-.2.1-.4 0-.2-.1-1-.4-1.8-1.1-.7-.6-1.1-1.3-1.3-1.5-.1-.2 0-.3.1-.4l.3-.4.3-.4v-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4z" />
  </svg>
);
const IconShare = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#6B1F2A" strokeWidth="1.6" aria-hidden>
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
  </svg>
);
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#6B1F2A" strokeWidth="1.6" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="#6B1F2A" stroke="none" />
  </svg>
);
const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#6B1F2A" strokeWidth="1.6" aria-hidden>
    <path d="M12 21s-7-5.5-7-11a7 7 0 0114 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" />
  </svg>
);
const IconWhatsAppGreen = () => (
  <svg viewBox="0 0 24 24" aria-hidden>
    <path fill="#fff" d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm0 1.8a8.2 8.2 0 11-4.2 15.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 0112 3.8zm-2.5 4.2c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.5 1 2.7c.1.2 1.8 2.9 4.4 3.9 2.2.9 2.6.7 3.1.7s1.5-.6 1.7-1.2c.2-.6.2-1.1.2-1.2l-.7-.4s-1.1-.5-1.3-.6c-.2-.1-.4-.1-.5.1l-.7.9c-.1.1-.3.1-.4.1-.2-.1-1-.4-1.8-1.1-.7-.6-1.1-1.4-1.3-1.6-.1-.2 0-.3.1-.4l.3-.4.2-.4v-.4l-.6-1.6c-.2-.4-.4-.4-.5-.4z" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6.5 12 13l8.5-6.5" />
  </svg>
);
const IconCopy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" aria-hidden>
    <path d="M10 13.5a3.5 3.5 0 005 0l3-3a3.5 3.5 0 00-5-5l-1 1" />
    <path d="M14 10.5a3.5 3.5 0 00-5 0l-3 3a3.5 3.5 0 005 5l1-1" />
  </svg>
);
const StaticStar = () => (
  <svg viewBox="0 0 24 24" aria-hidden><path d={STAR} /></svg>
);

/* ── Component ────────────────────────────────────────────────── */
const ReviewFunnel: React.FC = () => {
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  const [forcePublic, setForcePublic] = React.useState(false);
  const [picked, setPicked] = React.useState<boolean[]>(() => CHIPS.map(() => false));
  const [dockShown, setDockShown] = React.useState(false);
  const [toast, setToast] = React.useState('');
  const [toastShown, setToastShown] = React.useState(false);
  const [shareOpen, setShareOpen] = React.useState(false);

  const dockForced = React.useRef(false);
  const resultRef = React.useRef<HTMLDivElement | null>(null);
  const toastTimer = React.useRef<number | undefined>(undefined);

  const draft = buildDraft(picked);
  const showPositive = rating >= 4 || forcePublic;
  const hint = rating === 0
    ? 'Tippen Sie auf die Sterne · dauert nur 1 Minute'
    : rating >= 4 ? 'Wunderbar — danke!' : 'Danke für Ihr Feedback.';

  const ping = (msg: string) => {
    setToast(msg);
    setToastShown(true);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastShown(false), 1900);
  };

  const rate = (v: number) => {
    setRating(v);
    setHover(0);
    setForcePublic(false);
    dockForced.current = true;
    setDockShown(true);
    window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
  };

  React.useEffect(() => {
    const onScroll = () => {
      if (!dockForced.current && window.scrollY > window.innerHeight * 0.9) setDockShown(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShareOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  React.useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const copyDraft = async () => {
    try {
      await navigator.clipboard.writeText(draft);
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = draft; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
      } catch { /* ignore */ }
    }
    ping('Vorschlag kopiert — jetzt einfügen');
  };

  const copyShareLink = async () => {
    try { await navigator.clipboard.writeText(SHARE_URL); } catch { /* ignore */ }
    ping('Link kopiert');
    setShareOpen(false);
  };

  return (
    <div className="review-funnel-root">
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <div className="rf-top">
        <div className="rf-top__in">
          <span className="rf-top__brand">Zuza <b>&amp;</b> Pragtour</span>
          <span className="rf-top__rating">
            <svg viewBox="0 0 24 24" aria-hidden><path d={STAR} fill="#7B5800" /></svg>
            4,9 · 514 Bewertungen
          </span>
        </div>
      </div>

      <main className="rf-wrap">
        {/* ── Hero / the ask ────────────────────────────────────── */}
        <section className="rf-hero" id="top">
          <img className="rf-avatar" src="/images/zuzana-portrait.jpg" alt="Zuzana Manová" />
          <span className="rf-kicker solo">Schön, dass wir uns getroffen haben</span>
          <h1 className="rf-display">Wie war Ihr Tag in <em>Prag</em>?</h1>
          <p className="rf-hero__sub">Ihre Meinung bedeutet mir sehr viel — und sie hilft dem nächsten Reisenden, den Weg zu mir zu finden.</p>

          <div className="rf-stars" role="radiogroup" aria-label="Bewertung">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                type="button"
                className={`rf-star ${v <= (hover || rating) ? 'on' : ''}`}
                aria-label={`${v} ${v === 1 ? 'Stern' : 'Sterne'}`}
                onMouseEnter={() => setHover(v)}
                onMouseLeave={() => setHover(0)}
                onClick={() => rate(v)}
              >
                <svg viewBox="0 0 24 24"><path d={STAR} /></svg>
              </button>
            ))}
          </div>
          <p className="rf-hint">{hint}</p>

          <div ref={resultRef} className={`rf-result ${rating > 0 ? 'open' : ''}`}>
            {showPositive ? (
              <div className="rf-panel">
                <h2 className="rf-display">Das freut mich von <em>Herzen</em>.</h2>
                <p>Würden Sie sich eine Minute nehmen und es mit anderen teilen? Wählen Sie einfach eine Plattform:</p>
                <div className="rf-stack">
                  <a className="rf-btn rf-btn--burgundy" href={BRAND.googleReview} target="_blank" rel="noopener noreferrer"><LogoGoogleColor /> Bei Google bewerten</a>
                  <a className="rf-btn rf-btn--ink" href={BRAND.tripadvisorWriteReview} target="_blank" rel="noopener noreferrer"><LogoTripAdvisor /> Auf TripAdvisor bewerten</a>
                </div>
                <p className="rf-micro">Kein Konto? Beide Plattformen führen Sie in Sekunden durch die Anmeldung.</p>
              </div>
            ) : (
              <div className="rf-panel">
                <h2 className="rf-display">Danke für Ihre <em>Ehrlichkeit</em>.</h2>
                <p>Es ist mir wichtig, dass Sie zufrieden sind. Schreiben Sie mir bitte direkt — ich möchte verstehen, was ich besser machen kann.</p>
                <div className="rf-stack">
                  <a className="rf-btn rf-btn--burgundy" href={WA_DIRECT} target="_blank" rel="noopener noreferrer"><LogoWhatsApp /> Direkt über WhatsApp</a>
                  <a className="rf-btn rf-btn--outline" href={`mailto:${BRAND.email}`}>Per E-Mail schreiben</a>
                </div>
                {/* Kept visible on purpose — review-gating compliance. Do not remove. */}
                <button type="button" className="rf-alt" onClick={() => setForcePublic(true)}>Trotzdem eine öffentliche Bewertung abgeben →</button>
              </div>
            )}
          </div>
        </section>

        {/* ── Personal thank-you ────────────────────────────────── */}
        <Reveal as="section" className="rf-thanks">
          <span className="rf-kicker solo">Ein persönliches Wort</span>
          <h2 className="rf-display rf-thanks__title">Danke, dass Sie mit mir durch <em>Prag</em> gegangen sind.</h2>
          <p className="rf-thanks__body">Es war mir eine echte Freude, Ihnen meine Stadt zu zeigen. Ihre Neugier, Ihre Fragen und Ihre Gesellschaft haben diesen Tag zu etwas Besonderem gemacht — ich hoffe, Sie nehmen ein paar Geschichten mit nach Hause, die bleiben.</p>
          <p className="rf-thanks__sign">Von Herzen,</p>
          <p className="rf-thanks__name">Zuzana</p>
        </Reveal>

        <div className="rf-divider" />

        {/* ── How it works ──────────────────────────────────────── */}
        <Reveal as="section">
          <span className="rf-kicker">In drei Schritten</span>
          <h2 className="rf-display rf-h2">So hinterlassen Sie eine Bewertung</h2>
          <ol className="rf-steps">
            {[
              ['Plattform wählen', 'Google oder TripAdvisor — ganz wie Sie möchten.'],
              ['Fünf Sterne vergeben', 'Ein Tipp genügt. Ein Konto ist meist schon vorhanden.'],
              ['Ein paar Worte schreiben', 'Zwei, drei Sätze reichen völlig. Brauchen Sie Inspiration? Siehe unten.'],
            ].map(([title, desc], i) => (
              <li key={title} className="rf-step">
                <span className="rf-step__n">{i + 1}</span>
                <div><p className="rf-step__t">{title}</p><p className="rf-step__d">{desc}</p></div>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="rf-divider" />

        {/* ── Write helper ──────────────────────────────────────── */}
        <Reveal as="section">
          <span className="rf-kicker">Eine kleine Hilfe</span>
          <h2 className="rf-display rf-h2" style={{ marginBottom: '1.2rem' }}>Nicht sicher, was Sie schreiben sollen?</h2>
          <div className="rf-helper">
            <p className="rf-muted" style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.55 }}>
              Tippen Sie an, was Ihnen in Erinnerung geblieben ist — ich stelle einen Vorschlag zusammen, den Sie kopieren und anpassen können.
            </p>
            <div className="rf-chips">
              {CHIPS.map((c, i) => (
                <button key={c.label} type="button" aria-pressed={picked[i]} className={`rf-chip ${picked[i] ? 'on' : ''}`} onClick={() => setPicked((p) => p.map((v, j) => (j === i ? !v : v)))}>
                  {c.label}
                </button>
              ))}
            </div>
            <textarea readOnly value={draft} aria-label="Bewertungsvorschlag" />
            <div className="rf-helper__row">
              <button type="button" className="rf-btn rf-btn--burgundy" onClick={copyDraft}>Vorschlag kopieren</button>
            </div>
          </div>
        </Reveal>

        <div className="rf-divider" />

        {/* ── Note from Zuzana ──────────────────────────────────── */}
        <Reveal as="section" className="rf-note">
          <span className="rf-kicker solo">Warum es zählt</span>
          <blockquote>„Als unabhängige Führerin habe ich kein Marketing-Budget — nur Ihre Worte. Jede Bewertung hilft einem weiteren Reisenden, mich zu <em>finden</em>.“</blockquote>
          <div className="rf-sig">
            <img src="/images/zuzana-portrait.jpg" alt="Zuzana Manová" />
            <div><div className="n">Zuzana Manová</div><div className="r">Zertifizierte Stadtführerin</div></div>
          </div>
        </Reveal>

        <div className="rf-divider" />

        {/* ── Social proof ──────────────────────────────────────── */}
        <Reveal as="section">
          <div className="rf-proof">
            <div className="big">4,9</div>
            <div className="stars-static">
              {[0, 1, 2, 3, 4].map((i) => <StaticStar key={i} />)}
            </div>
            <div className="count">514 Bewertungen · Sie sind in guter Gesellschaft</div>
            <div className="quotes">
              <div className="q"><p>„Absolut unvergesslich. Zuzanas Verbindung zur Stadt ist einzigartig.“</p><span className="who">Thomas K. · TripAdvisor</span></div>
              <div className="q"><p>„Ein Highlight unserer Europareise. Ihr Wissen ist unübertroffen.“</p><span className="who">Monika H. · TourHQ</span></div>
            </div>
          </div>
        </Reveal>

        <div className="rf-divider" />

        {/* ── Other ways to help ────────────────────────────────── */}
        <Reveal as="section">
          <span className="rf-kicker">Noch mehr helfen?</span>
          <h2 className="rf-display rf-h2">Weitere kleine Gesten</h2>
          <div className="rf-ways">
            <button type="button" className="rf-way" onClick={() => setShareOpen(true)}>
              <span className="rf-way__ic"><IconShare /></span>
              <span><span className="rf-way__t">Die Seite teilen</span><span className="rf-way__d">Empfehlen Sie Zuzana an Reisefreunde.</span></span>
              <span className="rf-way__arrow">→</span>
            </button>
            <a className="rf-way" href={BRAND.instagram} target="_blank" rel="noopener noreferrer">
              <span className="rf-way__ic"><IconInstagram /></span>
              <span><span className="rf-way__t">Auf Instagram folgen</span><span className="rf-way__d">@erlebnis_tour_prag</span></span>
              <span className="rf-way__arrow">→</span>
            </a>
            <a className="rf-way" href={`${BRAND.domain}/tours`}>
              <span className="rf-way__ic"><IconPin /></span>
              <span><span className="rf-way__t">Eine weitere Tour</span><span className="rf-way__d">Kommen Sie für eine andere Seite Prags zurück.</span></span>
              <span className="rf-way__arrow">→</span>
            </a>
          </div>
        </Reveal>

        <footer className="rf-foot">
          <p>Zuza Prague Tours · Ing. Zuzana Manová</p>
          <p><a href={`tel:${BRAND.phoneRaw}`}>{BRAND.phone}</a> · <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></p>
          <p style={{ marginTop: '0.8rem', color: 'var(--stone-400)' }}>© 2026 · Vielen Dank für Ihren Besuch in Prag.</p>
        </footer>
      </main>

      {/* ── Sticky dock (mobile) ────────────────────────────────── */}
      <div className={`rf-dock ${dockShown ? 'show' : ''}`}>
        <a className="rf-btn rf-btn--burgundy" href={BRAND.googleReview} target="_blank" rel="noopener noreferrer"><LogoGoogleMono /> Google</a>
        <a className="rf-btn rf-btn--ink" href={BRAND.tripadvisorWriteReview} target="_blank" rel="noopener noreferrer"><LogoTripAdvisor /> TripAdvisor</a>
      </div>

      {/* ── Toast ─────────────────────────────────────────────── */}
      <div aria-live="polite" className={`rf-toast ${toastShown ? 'show' : ''}`}>{toast || ' '}</div>

      {/* ── Share / recommend dialog ──────────────────────────── */}
      <div className={`rf-sheet ${shareOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="rf-share-title" aria-hidden={!shareOpen}>
        <div className="rf-sheet__scrim" onClick={() => setShareOpen(false)} />
        <div className="rf-sheet__card">
          <button type="button" className="rf-sheet__close" aria-label="Schließen" onClick={() => setShareOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
          <span className="rf-kicker solo">Weiterempfehlen</span>
          <h2 id="rf-share-title">Kennen Sie jemanden, der <em>Prag</em> besucht?</h2>
          <p>Empfehlen Sie mich einem Freund oder einer Freundin — die schönste Art, Danke zu sagen.</p>
          <div className="rf-share-list">
            <a className="rf-share-opt" href={`https://wa.me/?text=${encodeURIComponent(SHARE_MSG)}`} target="_blank" rel="noopener noreferrer" onClick={() => window.setTimeout(() => setShareOpen(false), 120)}>
              <span className="rf-share-opt__ic wa"><IconWhatsAppGreen /></span>
              <span className="rf-share-opt__txt"><span className="rf-share-opt__t">Per WhatsApp empfehlen</span><span className="rf-share-opt__d">An Freunde senden, die Prag besuchen</span></span>
              <span className="material-symbols-outlined">open_in_new</span>
            </a>
            <a className="rf-share-opt" href={`mailto:?subject=${encodeURIComponent('Eine Empfehlung für Prag')}&body=${encodeURIComponent(SHARE_MSG)}`} onClick={() => window.setTimeout(() => setShareOpen(false), 120)}>
              <span className="rf-share-opt__ic mail"><IconMail /></span>
              <span className="rf-share-opt__txt"><span className="rf-share-opt__t">Per E-Mail empfehlen</span><span className="rf-share-opt__d">Eine persönliche Empfehlung schreiben</span></span>
              <span className="material-symbols-outlined">open_in_new</span>
            </a>
            <button type="button" className="rf-share-opt" onClick={copyShareLink}>
              <span className="rf-share-opt__ic copy"><IconCopy /></span>
              <span className="rf-share-opt__txt"><span className="rf-share-opt__t">Link kopieren</span><span className="rf-share-opt__d">zuzapragtour.de</span></span>
              <span className="material-symbols-outlined">content_copy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewFunnel;
