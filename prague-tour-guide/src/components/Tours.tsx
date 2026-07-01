'use client';

/**
 * Tours — premium "quiet-luxury editorial" tours index.
 *
 * Faithful port of .handoffs/0003.../ui_kits/website/site/tours.html, wired to
 * the real app: a PageBanner header, then the six real tours from
 * src/data/tours.ts rendered as alternating image/text rows (image left, then
 * right, text opposite) with hairline separation, an Italiana title, a two-digit
 * numeral, sans uppercase meta chips (real duration + a positioning badge), the
 * real description, and the existing CTAs — a solid "Anfrage senden" button to
 * the Netlify-backed /book route and a "Tour entdecken" ULink to the tour's
 * detail page. Closes on a quiet dark CTA band.
 *
 * Real copy/data, routes (/tours/<slug>, /book?tour=…#contact-title), the
 * WhatsApp link and every translation key are preserved; only the presentation
 * shifts to the shared SiteUI vocabulary. The warm-white faint-geometry ground
 * is enabled by `premium-inner` on the root element.
 */

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import type { TranslationKey } from '../utils/translations';
import { tours } from '../data/tours';
import { Kicker, ULink, Btn, Reveal, PageBanner, SHELL } from '@/src/components/site/SiteUI';

/* Per-tour positioning badge (premium microcopy from the mockup, bilingual).
   `gold` renders the antique-brass accent chip; the rest are hairline chips. */
const BADGES: Record<string, { de: string; en: string; gold?: boolean }> = {
  castle: { de: 'Beliebt', en: 'Most popular', gold: true },
  oldtown: { de: 'Museums-akkreditiert', en: 'Museum-accredited', gold: true },
  custom: { de: 'Maßgeschneidert', en: 'Bespoke', gold: true },
  hidden: { de: 'Abseits der Pfade', en: 'Off the beaten path' },
  german: { de: 'Deutschsprachig', en: 'German-language' },
  havel: { de: 'Moderne Geschichte', en: 'Modern history' },
};

const CHIP_BASE =
  'inline-flex items-center rounded-full border px-[0.85rem] py-[0.4rem] font-sans text-[10px] uppercase tracking-[0.16em]';

const Tours: React.FC = () => {
  const { t, language } = useLanguage();
  const de = language !== 'en';

  return (
    <div className="premium-inner text-ink antialiased">
      <PageBanner
        kicker={t('tours.page.kicker')}
        title={t('tours.page.heading')}
        sub={t('tours.page.lead')}
      />

      {/* ── Tours — alternating editorial rows ─────────────────── */}
      <section className={`${SHELL} py-[clamp(3rem,7vh,6rem)]`}>
        {tours.map((tour, index) => {
          const slug = de && tour.slugDe ? tour.slugDe : tour.slug;
          const tourDest = `/tours/${slug}`;
          const title = t(tour.titleKey as TranslationKey);
          const bookDest = `/book?tour=${encodeURIComponent(title)}#contact-title`;
          const badge = BADGES[tour.id];
          const flip = index % 2 === 1; // every other row: image on the right
          const isLast = index === tours.length - 1;
          const mediaOrder = flip ? 'min-[820px]:order-2' : '';
          const textOrder = flip ? 'min-[820px]:order-1' : '';

          return (
            <Reveal
              as="article"
              key={tour.id}
              className={`group grid grid-cols-1 items-center gap-[clamp(2rem,5vw,4.5rem)] border-t border-rule py-[clamp(2.5rem,5vh,4rem)] min-[820px]:grid-cols-2 ${
                isLast ? 'border-b border-rule' : ''
              }`}
            >
              {/* Media */}
              <figure className={`relative m-0 overflow-hidden bg-ivory-deep ${mediaOrder}`}>
                <img
                  src={tour.image}
                  alt={title}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="aspect-[5/4] w-full object-cover transition-transform duration-[900ms] ease-brand group-hover:scale-[1.05] motion-reduce:transition-none"
                />
              </figure>

              {/* Text */}
              <div className={`min-w-0 ${textOrder}`}>
                <span className="font-display text-[1.05rem] tracking-[0.1em] text-brass">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h2 className="mt-[0.6rem]">
                  <Link
                    href={tourDest}
                    className="font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-normal leading-[1.08] tracking-[-0.015em] text-ink transition-colors duration-300 hover:text-burgundy"
                  >
                    {title}
                  </Link>
                </h2>

                {/* Meta chips — real duration + positioning badge */}
                <div className="mb-[1.2rem] mt-[1.1rem] flex flex-wrap items-center gap-[0.6rem]">
                  <span className={`${CHIP_BASE} border-rule text-ink-soft`}>
                    {t(tour.durationKey as TranslationKey)}
                  </span>
                  {badge && (
                    <span
                      className={`${CHIP_BASE} ${
                        badge.gold
                          ? 'border-[rgba(123,88,0,0.3)] text-gold-olive'
                          : 'border-rule text-ink-soft'
                      }`}
                    >
                      {de ? badge.de : badge.en}
                    </span>
                  )}
                </div>

                <p className="max-w-[34rem] font-body text-[1.05rem] leading-[1.7] text-ink-soft">
                  {t(tour.descriptionKey as TranslationKey)}
                </p>

                {/* CTAs — book (Netlify form) + explore detail */}
                <div className="mt-[1.6rem] flex flex-wrap items-center gap-x-7 gap-y-3">
                  <Btn href={bookDest} variant="solid" sm arrow>
                    {t('tour.sendEnquiry')}
                  </Btn>
                  <ULink href={tourDest}>{t('tours.exploreTour')}</ULink>
                </div>
              </div>
            </Reveal>
          );
        })}
      </section>

      {/* ── Closing CTA — quiet dark band ──────────────────────── */}
      <section className="bg-ink text-ivory">
        <div className={`${SHELL} py-[clamp(4rem,9vh,6.5rem)] text-center`}>
          <Kicker center tone="lamp">
            {de ? 'Bereit zu beginnen?' : 'Ready to begin?'}
          </Kicker>
          <h2 className="mx-auto mt-[1.2rem] max-w-[22ch] font-display text-[clamp(2rem,4vw,3.2rem)] font-normal leading-[1.06] tracking-[-0.015em] text-ivory">
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
          <p className="mx-auto mt-[1.4rem] max-w-[34rem] font-body text-[1.05rem] leading-[1.65] text-ivory/75">
            {t('cta.subtitle')}
          </p>
          <div className="mt-[2.2rem] flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
            <Btn href="/book#contact-title" variant="cream" arrow>
              {t('contact.booking.header.title')}
            </Btn>
            <ULink href="https://wa.me/420721231933" onDark>
              {t('cta.whatsapp')}
            </ULink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tours;
