'use client';

/**
 * Tours — premium "quiet-luxury editorial" tours index (0005 facelift).
 *
 * Rebuilt 1:1 from the handoff prototype (Zuza Prague Tours.dc.html · #/tours):
 * an inner-page banner with the ★★★★★ trust row, then six editorial rows —
 * each a single real <a> (aria-label, burgundy focus ring) with a rounded,
 * soft-shadowed 5:4 image (zoom on hover, alternating left/right), a brass-deep
 * numeral + brass hairline rule + optional gold flag capsule, an Italiana H2, a
 * readable `schedule`-icon meta line, the description at 1.1rem, and a single
 * "Details ansehen →" underline affordance. Closes on a dark band with a cream
 * outline CTA + a large phone link.
 *
 * Real data/routes/i18n preserved: rows link to /tours/<slug> (the bespoke tour
 * deep-links to /book with itself preselected); SEO H1 stays `tours.page.heading`.
 */

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import type { TranslationKey } from '../utils/translations';
import { tours } from '../data/tours';
import { BRAND } from '../brand';
import { Kicker, Btn, Reveal, Stars, SHELL } from './site/SiteUI';

/* Per-tour positioning badge (premium microcopy from the mockup, bilingual).
   `gold` renders the antique-brass flag capsule; the rest fold into the meta line. */
const BADGES: Record<string, { de: string; en: string; gold?: boolean }> = {
  castle: { de: 'Beliebt', en: 'Most popular', gold: true },
  oldtown: { de: 'Museums-akkreditiert', en: 'Museum-accredited', gold: true },
  custom: { de: 'Maßgeschneidert', en: 'Bespoke', gold: true },
  hidden: { de: 'Abseits der Pfade', en: 'Off the beaten path' },
  german: { de: 'Deutschsprachig', en: 'German-language' },
  havel: { de: 'Moderne Geschichte', en: 'Modern history' },
};

const Tours: React.FC = () => {
  const { t, language } = useLanguage();
  const de = language !== 'en';

  return (
    <div className="premium-inner text-ink antialiased">
      {/* ── Page banner (eyebrow + SEO H1 + sub + trust row) ───── */}
      <header className="border-b border-rule pb-[clamp(2.5rem,5vh,4rem)] pt-[clamp(2.5rem,6vw,4.5rem)]">
        <div className={SHELL}>
          <Kicker>{t('tours.page.kicker')}</Kicker>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,6vw,4.4rem)] font-normal leading-[1.04] tracking-[-0.015em] text-ink [text-wrap:balance]">
            {t('tours.page.heading')}
          </h1>
          <p className="mt-[1.4rem] max-w-[40rem] font-body text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.65] text-ink-soft">
            {t('tours.page.lead')}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-[0.55rem]">
            <Stars size={16} />
            <span className="font-sans text-[0.98rem] text-ink-soft">
              {de ? '5,0 von 5 · über 4.900 Gäste seit 1986' : '5.0 of 5 · over 4,900 guests since 1986'}
            </span>
          </div>
        </div>
      </header>

      {/* ── Tours — alternating editorial rows ─────────────────── */}
      <section className={`${SHELL} py-[clamp(2.5rem,5vh,4rem)] pb-[clamp(4rem,9vh,7rem)]`}>
        {tours.map((tour, index) => {
          const slug = de && tour.slugDe ? tour.slugDe : tour.slug;
          const title = t(tour.titleKey as TranslationKey);
          const duration = t(tour.durationKey as TranslationKey);
          const badge = BADGES[tour.id];
          const goldFlag = badge?.gold ? (de ? badge.de : badge.en) : null;
          const secondary = badge && !badge.gold ? (de ? badge.de : badge.en) : de ? 'Privatführung' : 'Private tour';
          const facts = `${duration} · ${secondary}`;

          const isCustom = tour.id === 'custom';
          const dest = isCustom
            ? `/book?tour=${encodeURIComponent(title)}#contact-title`
            : `/tours/${slug}`;
          const cta = isCustom ? (de ? 'Anfrage senden' : 'Send enquiry') : de ? 'Details ansehen' : 'View details';
          const ariaLabel = `${title} — ${facts}. ${cta}.`;

          const flip = index % 2 === 1; // even rows (0-indexed odd): image on the right
          const isLast = index === tours.length - 1;

          return (
            <Reveal key={tour.id}>
              <Link
                href={dest}
                aria-label={ariaLabel}
                className={`group grid grid-cols-1 items-center gap-[clamp(2rem,5vw,4.5rem)] border-t border-rule py-[clamp(2.5rem,5vh,4rem)] text-inherit no-underline min-[820px]:grid-cols-2 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[-3px] focus-visible:outline-burgundy ${
                  isLast ? 'border-b border-rule' : ''
                }`}
              >
                {/* Media — rounded, soft-shadowed, zoom on hover */}
                <div className={flip ? 'min-[820px]:order-2' : ''}>
                  <div className="aspect-[5/4] overflow-hidden rounded-lg bg-ivory-deep shadow-[0_8px_24px_rgba(26,23,20,0.08)]">
                    <img
                      src={tour.image}
                      alt=""
                      loading={index === 0 ? 'eager' : 'lazy'}
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-brand group-hover:scale-[1.05] motion-reduce:transition-none"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-[0.9rem]">
                    <span className="font-display text-[1.05rem] tracking-[0.1em] text-brass-deep">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span aria-hidden className="h-px w-[34px] bg-brass/70" />
                    {goldFlag && (
                      <span className="inline-flex items-center rounded-full border border-[rgba(123,88,0,0.35)] px-[0.8rem] py-[0.35rem] font-sans text-[11.5px] font-semibold uppercase tracking-[0.14em] text-gold-olive">
                        {goldFlag}
                      </span>
                    )}
                  </div>

                  <h2 className="mt-[0.9rem] font-display text-[clamp(1.9rem,3.4vw,2.8rem)] font-normal leading-[1.06] tracking-[-0.015em] text-ink">
                    {title}
                  </h2>

                  <div className="my-[1rem] flex items-center gap-[0.5rem] font-sans text-[1rem] text-ink-soft">
                    <span className="material-symbols-outlined text-[18px] text-brass-deep" aria-hidden>
                      schedule
                    </span>
                    {facts}
                  </div>

                  <p className="mb-[1.7rem] max-w-[34rem] font-body text-[1.1rem] leading-[1.72] text-ink-soft">
                    {t(tour.descriptionKey as TranslationKey)}
                  </p>

                  <span className="inline-flex items-center gap-[0.6rem] border-b border-ink pb-[4px] font-sans text-[13px] font-semibold uppercase tracking-[0.15em] text-ink transition-colors duration-300 ease-brand group-hover:border-burgundy group-hover:text-burgundy">
                    {cta}
                    <span className="material-symbols-outlined text-[17px]" aria-hidden>
                      arrow_forward
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </section>

      {/* ── Closing CTA — quiet dark band ──────────────────────── */}
      <section className="bg-ink text-ivory">
        <div className={`${SHELL} py-[clamp(4rem,9vh,6.5rem)] text-center`}>
          <span className="inline-flex items-center justify-center gap-[0.9rem] font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
            <span aria-hidden className="h-px w-7 bg-brass" />
            {de ? 'Bereit zu beginnen?' : 'Ready to begin?'}
            <span aria-hidden className="h-px w-7 bg-brass" />
          </span>
          <h2 className="mx-auto mt-[1.2rem] max-w-[24ch] font-display text-[clamp(2rem,4vw,3.2rem)] font-normal leading-[1.06] tracking-[-0.015em] text-ivory">
            {de ? (
              <>
                Erzählen Sie mir, was Sie{' '}
                <em className="font-italic italic text-gold-lamp">interessiert</em>.
              </>
            ) : (
              <>
                Tell me what <em className="font-italic italic text-gold-lamp">intrigues</em> you.
              </>
            )}
          </h2>
          <div className="mt-[1.8rem] flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
            <Btn href="/book#contact-title" variant="cream" arrow>
              {de ? 'Unverbindliche Anfrage' : 'Send an enquiry'}
            </Btn>
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="border-b border-ivory/55 pb-[3px] font-sans text-[1.15rem] font-semibold text-ivory transition-colors duration-300 hover:border-ivory"
            >
              {BRAND.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tours;
