'use client';

/**
 * BewertenPage — /bewerten, the page guests reach after a tour (QR code on
 * site + link in the follow-up email). One short screen whose only job is a
 * 5-star Google review, with TripAdvisor as the secondary option.
 *
 * Design: design_handoff_bewerten/ — desktop (≥ md) is the cool ivory,
 * square-cornered two-column layout; mobile (< md) is the warm cream "foto"
 * variant with a hero photo. Both layouts render and CSS picks one; they
 * share a single piece of state.
 *
 * POLICY: no review gating. Google forbids asking for stars first and hiding
 * the public links from unhappy guests, so both platforms are always visible
 * and private feedback is only an extra line. Do not reintroduce a star gate.
 *
 * German-only by design (direct-link, noindex). The global Header/Footer are
 * hidden for this route via `.bewerten-root` in src/index.css.
 */

import React from 'react';
import Link from 'next/link';
import { BRAND } from '../brand';

const RATING_SHORT = '4,9 ★ · 514 Bewertungen';
const RATING_LONG = '4,9 / 5 · 514 Bewertungen';
const WHATSAPP = `https://wa.me/${BRAND.phoneRaw.replace(/[^0-9]/g, '')}`;
const MAIL = `mailto:${BRAND.email}`;
const TEL = `tel:${BRAND.phoneRaw}`;

const CHIPS: { key: string; label: string; sentence: string }[] = [
  { key: 'stories', label: 'Zuzanas Geschichten', sentence: 'Ihre Geschichten haben die Stadt für uns lebendig gemacht.' },
  { key: 'jewish', label: 'Jüdisches Viertel', sentence: 'Besonders bewegend war der Rundgang durch das Jüdische Viertel.' },
  { key: 'courts', label: 'Versteckte Höfe', sentence: 'Sie hat uns Höfe und Gassen gezeigt, die wir allein nie gefunden hätten.' },
  { key: 'know', label: 'Ihr Wissen', sentence: 'Ihr Wissen über Geschichte und Architektur ist beeindruckend.' },
  { key: 'de', label: 'Auf Deutsch', sentence: 'Die Führung auf Deutsch war angenehm und sehr gut verständlich.' },
  { key: 'family', label: 'Für Familien', sentence: 'Auch unsere Kinder waren begeistert und haben gerne zugehört.' },
];

/** Sentences always follow CHIPS order, regardless of click order. */
function buildSuggestion(selected: string[]): string {
  const picked = CHIPS.filter((c) => selected.includes(c.key)).map((c) => c.sentence);
  return ['Eine wundervolle Privatführung durch Prag mit Zuzana.', ...picked, 'Von Herzen zu empfehlen!'].join(' ');
}

const RED = '#A3231B';
const BLUE = '#2C4F8F';

/** Five-petal ornament shared by both layouts. Without `centerFill` the
 *  center circle is outlined in the petal colour (watermark use). */
const Flower: React.FC<{
  size: number;
  stroke: string;
  strokeWidth: number;
  centerFill?: string;
  className?: string;
}> = ({ size, stroke, strokeWidth, centerFill, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    stroke={stroke}
    strokeWidth={strokeWidth}
    aria-hidden="true"
    className={className}
  >
    {[0, 72, 144, 216, 288].map((deg) => (
      <ellipse key={deg} cx="24" cy="13" rx="6" ry="10" transform={deg ? `rotate(${deg} 24 24)` : undefined} />
    ))}
    <circle cx="24" cy="24" r="3.5" {...(centerFill ? { fill: centerFill, stroke: centerFill } : {})} />
  </svg>
);

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bewerten-blue';

const BewertenPage: React.FC = () => {
  const [helperOpen, setHelperOpen] = React.useState(false);
  const [selectedChips, setSelectedChips] = React.useState<string[]>([]);
  const [copied, setCopied] = React.useState(false);
  const [showSticky, setShowSticky] = React.useState(false);

  const mobileCtaRef = React.useRef<HTMLAnchorElement | null>(null);
  const copiedTimer = React.useRef<number | undefined>(undefined);

  const suggestion = buildSuggestion(selectedChips);

  // Mobile sticky bar: show once the main Google button has scrolled above
  // the viewport. On desktop the mobile layout is display:none, so the
  // observed element never reports top < 0 and the bar stays hidden.
  React.useEffect(() => {
    const el = mobileCtaRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => {
      setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => () => window.clearTimeout(copiedTimer.current), []);

  const toggleChip = (key: string) =>
    setSelectedChips((sel) => (sel.includes(key) ? sel.filter((k) => k !== key) : [...sel, key]));

  const copySuggestion = async () => {
    try {
      await navigator.clipboard.writeText(suggestion);
    } catch {
      // Older iOS / non-secure contexts: textarea fallback, then give up silently.
      try {
        const ta = document.createElement('textarea');
        ta.value = suggestion; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
      } catch { /* ignore */ }
    }
    setCopied(true);
    window.clearTimeout(copiedTimer.current);
    copiedTimer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  const copyLabel = copied ? 'Kopiert ✓' : 'Vorschlag kopieren';
  const helperIcon = helperOpen ? '−' : '+';

  const privateFeedback = (
    <>
      War etwas nicht so, wie Sie es sich gewünscht haben? Schreiben Sie mir persönlich per{' '}
      <a href={WHATSAPP} target="_blank" rel="noopener" className={`text-bewerten-blue underline ${focusRing}`}>WhatsApp</a>
      {' '}oder{' '}
      <a href={MAIL} className={`text-bewerten-blue underline ${focusRing}`}>E-Mail</a>.
    </>
  );

  return (
    <div className="bewerten-root font-hanken">
      {/* ════════════════ MOBILE (< md) — warm "foto" variant ════════════════ */}
      <div className="bg-bewerten-m-bg md:hidden">
        {/* No overflow-hidden here (the design file has it): it would make this
            a scroll container and pin the sticky Google bar to it, not the viewport. */}
        <div className="relative mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-bewerten-m-bg text-bewerten-m-ink">
          {/* 1. Hero photo */}
          <div className="relative">
            <img
              src="/images/bewerten-mala-strana.jpg"
              alt="Blick über die Dächer der Kleinseite auf St. Nikolaus"
              className="block h-[340px] w-full object-cover [object-position:center_35%]"
            />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-[linear-gradient(rgba(30,20,12,.45),rgba(30,20,12,0))] px-[18px] py-4">
              <Link href="/" className={`text-[15px] font-semibold text-white no-underline ${focusRing}`}>Zuza &amp; Pragtour</Link>
              <span className="rounded-full bg-[rgba(30,20,12,.35)] px-[10px] py-[5px] text-[13px] font-medium text-white">{RATING_SHORT}</span>
            </div>
            <img
              src="/images/thumbs/zuzana-portrait.jpg"
              alt="Zuzana Manová"
              className="absolute bottom-[-40px] left-5 h-[84px] w-[84px] rounded-full border-4 border-bewerten-m-bg object-cover [object-position:center_32%] shadow-[0_6px_16px_-6px_rgba(60,35,20,.35)]"
            />
          </div>

          {/* 2. Intro */}
          <header className="flex flex-col px-5 pt-14">
            <p className="m-0 text-[13px] text-bewerten-m-mute">
              Zuzana Manová · <span className="text-bewerten-blue">Zertifizierte Stadtführerin</span>
            </p>
            <h1 className="mt-[14px] text-[38px] font-medium leading-[1.04] tracking-[-0.03em] [text-wrap:balance]">
              Wie war Ihre Tour{' '}
              <em className="font-garamond text-[44px] font-normal italic tracking-[-0.01em] text-bewerten-red">mit mir?</em>
            </h1>
            <p className="mt-3 text-[18px] leading-[1.5] text-bewerten-m-text [text-wrap:pretty]">
              Danke, dass Sie Prag mit mir entdeckt haben. Ihre Zufriedenheit ist mir wichtig.
            </p>
          </header>

          {/* 3. CTAs */}
          <section className="flex flex-col px-5 pb-8 pt-[30px]">
            <p className="mb-4 text-[20px] font-medium leading-[1.3] tracking-[-0.01em] [text-wrap:pretty]">
              Fünf Sterne von Ihnen helfen mir sehr – bewerten Sie mich auf <span className="text-bewerten-red">Google</span>!
            </p>

            <a
              ref={mobileCtaRef}
              href={BRAND.googleReview}
              target="_blank"
              rel="noopener"
              className={`flex min-h-[92px] items-center justify-between gap-3 rounded-2xl bg-bewerten-red px-5 py-4 text-white no-underline shadow-[0_14px_26px_-14px_rgba(163,35,27,.8)] transition-[background-color,transform] duration-150 active:scale-[.99] active:bg-bewerten-red-hover ${focusRing}`}
            >
              <span className="flex flex-col gap-[5px]">
                <span aria-hidden="true" className="text-[17px] tracking-[0.12em] text-bewerten-gold">★★★★★</span>
                <span className="text-[21px] font-semibold tracking-[-0.015em]">Jetzt bei Google bewerten</span>
                <span className="text-[13px] text-bewerten-on-red">Mit Ihrem Google-Konto · dauert 1 Minute</span>
              </span>
              <span aria-hidden="true" className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white/[.16] text-[20px]">→</span>
            </a>

            <a
              href={BRAND.tripadvisorWriteReview}
              target="_blank"
              rel="noopener"
              className={`mt-[10px] flex min-h-[64px] items-center justify-between gap-3 rounded-2xl bg-bewerten-blue px-5 py-3 text-white no-underline transition-colors duration-150 active:bg-bewerten-blue-hover ${focusRing}`}
            >
              <span className="flex flex-col gap-[2px]">
                <span className="text-[17px] font-semibold">Oder bei TripAdvisor bewerten</span>
                <span className="text-[13px] text-bewerten-on-blue">Mit Ihrem TripAdvisor-Konto</span>
              </span>
              <span aria-hidden="true" className="text-[20px] leading-none">→</span>
            </a>

            {/* Text helper */}
            <div className="mt-6 rounded-2xl border border-bewerten-m-card-border bg-bewerten-m-card px-[18px]">
              <button
                type="button"
                onClick={() => setHelperOpen((o) => !o)}
                aria-expanded={helperOpen}
                aria-controls="bewerten-helper-m"
                className={`flex min-h-[60px] w-full cursor-pointer items-center gap-3 rounded-xl text-left text-bewerten-m-ink ${focusRing}`}
              >
                <span className="flex flex-1 flex-col gap-px">
                  <span className="text-[16px] font-semibold">Brauchen Sie Inspiration?</span>
                  <span className="text-[13px] text-bewerten-m-mute">Ein Textvorschlag zum Kopieren</span>
                </span>
                <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full bg-bewerten-m-icon-bg text-[20px] text-bewerten-red">{helperIcon}</span>
              </button>
              {helperOpen && (
                <div id="bewerten-helper-m" className="flex flex-col gap-[14px] pb-[18px] pt-[2px]">
                  <div className="flex flex-wrap gap-2">
                    {CHIPS.map((c) => {
                      const on = selectedChips.includes(c.key);
                      return (
                        <button
                          key={c.key}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleChip(c.key)}
                          className={`flex min-h-10 cursor-pointer items-center rounded-full border px-[14px] text-[14px] font-medium ${focusRing} ${
                            on
                              ? 'border-bewerten-blue bg-bewerten-blue text-white'
                              : 'border-bewerten-m-chip-border bg-bewerten-m-card text-bewerten-m-text'
                          }`}
                        >
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                  <p aria-live="polite" className="m-0 rounded-xl bg-bewerten-m-bg px-4 py-[14px] font-garamond text-[18px] italic leading-[1.5] text-bewerten-m-ink [text-wrap:pretty]">
                    „{suggestion}“
                  </p>
                  <button
                    type="button"
                    onClick={copySuggestion}
                    className={`flex min-h-12 w-full cursor-pointer items-center justify-center rounded-xl border border-bewerten-red text-[15px] font-semibold text-bewerten-red ${focusRing}`}
                  >
                    {copyLabel}
                  </button>
                </div>
              )}
            </div>

            <p className="mt-5 text-[15px] leading-[1.6] text-bewerten-m-text [text-wrap:pretty]">{privateFeedback}</p>
          </section>

          {/* 4. Ornament */}
          <div aria-hidden="true" className="flex flex-col items-center gap-[10px] px-5 pb-[26px] pt-1">
            <div className="flex items-center gap-[14px]">
              <span className="h-px w-12 bg-bewerten-m-ornament" />
              <Flower size={18} stroke={RED} strokeWidth={1.6} centerFill={BLUE} />
              <Flower size={26} stroke={BLUE} strokeWidth={1.3} centerFill={RED} />
              <Flower size={18} stroke={RED} strokeWidth={1.6} centerFill={BLUE} />
              <span className="h-px w-12 bg-bewerten-m-ornament" />
            </div>
            <span className="font-garamond text-[19px] italic text-bewerten-m-mute">Vielen Dank und bis bald in Prag</span>
          </div>

          {/* 5. Footer */}
          <footer className="flex flex-col items-center gap-2 border-t border-bewerten-m-rule px-5 pb-7 pt-5 text-center text-[13px] text-bewerten-m-mute">
            <span>Zuza Prague Tours · {BRAND.personName}</span>
            <span className="flex flex-wrap justify-center gap-[14px]">
              <a href={TEL} className={`text-bewerten-m-mute underline ${focusRing}`}>{BRAND.phone}</a>
              <a href={MAIL} className={`text-bewerten-m-mute underline ${focusRing}`}>E-Mail</a>
              <Link href="/privacy" className={`text-bewerten-m-mute underline ${focusRing}`}>Datenschutz</Link>
              <Link href="/terms" className={`text-bewerten-m-mute underline ${focusRing}`}>AGB</Link>
            </span>
          </footer>

          {/* 6. Sticky Google bar — only once the main button is scrolled past */}
          {showSticky && (
            <div className="sticky bottom-0 z-[5] animate-bewerten-sticky border-t border-bewerten-m-rule bg-[rgba(247,240,228,.94)] px-3 pb-[calc(10px+env(safe-area-inset-bottom))] pt-[10px] backdrop-blur-[8px] motion-reduce:animate-none">
              <a
                href={BRAND.googleReview}
                target="_blank"
                rel="noopener"
                className={`flex min-h-[52px] items-center justify-center gap-[10px] rounded-[14px] bg-bewerten-red text-[16px] font-semibold text-white no-underline active:bg-bewerten-red-hover ${focusRing}`}
              >
                <span aria-hidden="true" className="tracking-[0.08em] text-bewerten-gold">★★★★★</span>
                <span>Bei Google bewerten</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ════════════════ DESKTOP (≥ md) — cool ivory, two columns ════════════════ */}
      <div className="hidden min-h-screen flex-col overflow-hidden bg-bewerten-bg text-bewerten-ink md:flex">
        <header className="flex flex-wrap items-center justify-between gap-4 px-[clamp(20px,5vw,64px)] py-[22px]">
          <Link href="/" className={`text-[16px] font-semibold tracking-[-0.01em] text-bewerten-ink no-underline ${focusRing}`}>Zuza &amp; Pragtour</Link>
          <span className="text-[14px] font-medium tabular-nums text-bewerten-blue">{RATING_LONG}</span>
        </header>

        {/* div, not <main> — the root layout already wraps every page in <main> */}
        <div className="relative mx-auto box-border grid w-full max-w-[1200px] flex-1 grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-[clamp(40px,7vw,104px)] px-[clamp(20px,5vw,64px)] pb-[clamp(40px,6vw,96px)] pt-[clamp(24px,6vw,80px)]">
          {/* Watermark flowers */}
          <div aria-hidden="true" className="pointer-events-none absolute right-[-120px] top-[-40px] z-0 h-[520px] w-[520px] rotate-[18deg] opacity-[.09]">
            <Flower size={520} stroke={RED} strokeWidth={0.5} />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute bottom-[-60px] left-[-90px] z-0 h-[300px] w-[300px] rotate-[-12deg] opacity-10">
            <Flower size={300} stroke={BLUE} strokeWidth={0.6} />
          </div>

          {/* Left column */}
          <section className="relative z-[1] flex flex-col gap-7">
            <Flower size={96} stroke={RED} strokeWidth={1} centerFill={BLUE} />
            <h1 className="m-0 text-[clamp(40px,6vw,72px)] font-medium leading-none tracking-[-0.035em] [text-wrap:balance]">
              Wie war Ihre Tour mit mir?
            </h1>
            <p className="m-0 max-w-[26em] text-[19px] leading-[1.55] text-bewerten-text [text-wrap:pretty]">
              Ihre Zufriedenheit ist mir wichtig.
            </p>
            <div className="flex items-center gap-[14px]">
              <img
                src="/images/thumbs/zuzana-portrait.jpg"
                alt="Zuzana Manová"
                className="h-[52px] w-[52px] object-cover [object-position:center_32%]"
              />
              <div className="flex flex-col gap-[2px] text-[14px]">
                <span className="font-semibold">Zuzana Manová</span>
                <span className="text-bewerten-blue">Zertifizierte Stadtführerin, Prag</span>
              </div>
            </div>
          </section>

          {/* Right column */}
          <section className="relative z-[1] flex flex-col">
            <p className="mb-6 text-[clamp(22px,2.4vw,28px)] font-medium leading-[1.25] tracking-[-0.015em] text-bewerten-ink [text-wrap:pretty]">
              Fünf Sterne von Ihnen helfen mir sehr – bewerten Sie mich auf <span className="text-bewerten-red">Google</span>!
            </p>

            <a
              href={BRAND.googleReview}
              target="_blank"
              rel="noopener"
              className={`flex min-h-[96px] items-center justify-between gap-4 bg-bewerten-red px-[26px] py-[18px] text-white no-underline shadow-[0_10px_24px_-12px_rgba(163,35,27,.7)] transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-bewerten-red-hover hover:text-white hover:shadow-[0_16px_30px_-12px_rgba(163,35,27,.8)] motion-reduce:hover:translate-y-0 ${focusRing}`}
            >
              <span className="flex flex-col gap-[6px]">
                <span aria-hidden="true" className="text-[18px] tracking-[0.12em]">★★★★★</span>
                <span className="text-[clamp(22px,2.2vw,26px)] font-semibold tracking-[-0.015em]">Jetzt bei Google bewerten</span>
                <span className="text-[14px] text-bewerten-on-red">Mit Ihrem Google-Konto · dauert 1 Minute</span>
              </span>
              <span aria-hidden="true" className="text-[30px] leading-none">→</span>
            </a>

            <a
              href={BRAND.tripadvisorWriteReview}
              target="_blank"
              rel="noopener"
              className={`mt-3 flex min-h-[72px] items-center justify-between gap-4 bg-bewerten-blue px-[26px] py-[14px] text-white no-underline transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-bewerten-blue-hover hover:text-white motion-reduce:hover:translate-y-0 ${focusRing}`}
            >
              <span className="flex flex-col gap-[3px]">
                <span className="text-[19px] font-semibold">Oder bei TripAdvisor bewerten</span>
                <span className="text-[14px] text-bewerten-on-blue">Mit Ihrem TripAdvisor-Konto</span>
              </span>
              <span aria-hidden="true" className="text-[24px] leading-none">→</span>
            </a>

            <div className="h-7" />

            {/* Text helper */}
            <div className="border-y border-bewerten-rule">
              <button
                type="button"
                onClick={() => setHelperOpen((o) => !o)}
                aria-expanded={helperOpen}
                aria-controls="bewerten-helper-d"
                className={`grid min-h-[72px] w-full cursor-pointer grid-cols-[40px_1fr_auto] items-center gap-3 text-left text-bewerten-ink ${focusRing}`}
              >
                <span className="text-[14px] font-semibold text-bewerten-blue">Tipp</span>
                <span className="text-[18px] font-medium">Formulierungshilfe</span>
                <span aria-hidden="true" className="text-[22px] text-bewerten-red">{helperIcon}</span>
              </button>
              {helperOpen && (
                <div id="bewerten-helper-d" className="flex flex-col gap-[14px] pb-6 pl-[52px]">
                  <div className="flex flex-wrap gap-2">
                    {CHIPS.map((c) => {
                      const on = selectedChips.includes(c.key);
                      return (
                        <button
                          key={c.key}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleChip(c.key)}
                          className={`flex min-h-[44px] cursor-pointer items-center border px-[13px] py-2 text-[14px] font-medium ${focusRing} ${
                            on
                              ? 'border-bewerten-blue bg-bewerten-blue text-bewerten-bg'
                              : 'border-bewerten-rule bg-transparent text-bewerten-text'
                          }`}
                        >
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                  <p aria-live="polite" className="m-0 text-[17px] leading-[1.55] text-bewerten-ink [text-wrap:pretty]">{suggestion}</p>
                  <button
                    type="button"
                    onClick={copySuggestion}
                    className={`flex min-h-[44px] cursor-pointer items-center self-start text-[14px] font-semibold text-bewerten-red ${focusRing}`}
                  >
                    {copyLabel}
                  </button>
                </div>
              )}
            </div>

            <p className="m-0 pl-[52px] pt-6 text-[15px] leading-[1.6] text-bewerten-text [text-wrap:pretty]">{privateFeedback}</p>
          </section>
        </div>

        {/* Ornament */}
        <div aria-hidden="true" className="flex items-center justify-center gap-[18px] pb-7 pt-2">
          <span className="h-px w-[72px] bg-bewerten-rule" />
          <Flower size={22} stroke={RED} strokeWidth={1.4} centerFill={BLUE} />
          <Flower size={30} stroke={BLUE} strokeWidth={1.2} centerFill={RED} />
          <Flower size={22} stroke={RED} strokeWidth={1.4} centerFill={BLUE} />
          <span className="h-px w-[72px] bg-bewerten-rule" />
        </div>

        <footer className="flex flex-wrap justify-between gap-3 border-t border-bewerten-rule-soft px-[clamp(20px,5vw,64px)] py-[22px] text-[13px] text-bewerten-mute">
          <span>
            Zuza Prague Tours · <a href={TEL} className={`text-bewerten-mute underline ${focusRing}`}>{BRAND.phone}</a>
            {' · '}<a href={MAIL} className={`text-bewerten-mute underline ${focusRing}`}>{BRAND.email}</a>
          </span>
          <span className="flex gap-[14px]">
            <Link href="/privacy" className={`text-bewerten-mute underline ${focusRing}`}>Datenschutz</Link>
            <Link href="/terms" className={`text-bewerten-mute underline ${focusRing}`}>AGB</Link>
          </span>
        </footer>
      </div>
    </div>
  );
};

export default BewertenPage;
