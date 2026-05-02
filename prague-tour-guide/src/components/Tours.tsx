'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import type { TranslationKey } from '../utils/translations';
import { tours } from '../data/tours';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

const Tours: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Hero — quiet editorial, no color band, no image */}
      <header className="mx-auto max-w-editorial px-5 pb-12 pt-16 md:px-10 md:pb-20 md:pt-24">
        <p className="mb-6 font-eyebrow text-eyebrow uppercase text-stone-500">
          {t('tours.page.kicker')}
        </p>
        <h1 className="mb-8 max-w-prose font-headline text-display-lg text-ink">
          {t('tours.page.heading')}
        </h1>
        <p className="max-w-prose-narrow font-body text-prose-lg text-stone-700">
          {t('tours.page.lead')}
        </p>
      </header>

      {/* Tours — numbered editorial list */}
      <section className="mx-auto max-w-editorial px-5 pb-16 md:px-10 md:pb-24">
        <div className="border-t border-stone-200">
          {tours.map((tour, index) => {
            const slug = language === 'de' && tour.slugDe ? tour.slugDe : tour.slug;
            const tourDest = `/tours/${slug}`;
            const bookDest = `/book?tour=${encodeURIComponent(
              t(tour.titleKey as TranslationKey),
            )}#contact-title`;

            return (
              <motion.article
                key={tour.id}
                className="grid grid-cols-[2.5rem_1fr] gap-x-5 gap-y-4 border-b border-stone-200 py-10 md:grid-cols-[4rem_minmax(0,1fr)_auto] md:gap-x-10 md:py-14"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.2) }}
                viewport={{ once: true, margin: '-60px' }}
              >
                {/* Numeral */}
                <div className="font-serif text-lg text-stone-400 md:text-xl">
                  {ROMAN[index]}.
                </div>

                {/* Body */}
                <div className="min-w-0 md:max-w-prose">
                  <Link href={tourDest} className="group block">
                    <h2 className="mb-3 font-headline text-2xl leading-tight text-ink transition-colors group-hover:text-accent md:text-[1.75rem]">
                      {t(tour.titleKey as TranslationKey)}
                    </h2>
                  </Link>
                  <p className="mb-5 font-body text-prose text-stone-700">
                    {t(tour.descriptionKey as TranslationKey)}
                  </p>
                  <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 font-eyebrow text-eyebrow uppercase text-stone-500">
                    <span>{t(tour.durationKey as TranslationKey)}</span>
                    {tour.highlightKeys.slice(0, 2).map((key) => (
                      <span key={key}>{t(key as TranslationKey)}</span>
                    ))}
                  </div>
                </div>

                {/* CTAs — right rail on desktop, below body on mobile */}
                <div className="col-span-2 flex items-center gap-6 md:col-span-1 md:flex-col md:items-end md:justify-center md:gap-3">
                  <Link
                    href={bookDest}
                    className="font-label text-sm font-medium text-accent underline-offset-4 hover:underline"
                  >
                    {t('tour.sendEnquiry')} →
                  </Link>
                  <Link
                    href={tourDest}
                    className="font-label text-sm text-stone-500 underline-offset-4 hover:text-ink hover:underline"
                  >
                    {t('tours.exploreTour')}
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Footer CTA — dark section, one page-level call-to-action */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-editorial px-5 py-20 text-center md:px-10 md:py-28">
          <p className="mb-4 font-eyebrow text-eyebrow uppercase text-stone-400">
            {t('cta.subtitle')}
          </p>
          <h2 className="mx-auto mb-6 max-w-prose font-headline text-display-md text-paper">
            {t('cta.title')}
          </h2>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <Link
              href="/book#contact-title"
              className="rounded-md bg-paper px-8 py-3.5 font-label text-sm font-medium text-ink transition-colors hover:bg-stone-100"
            >
              {t('contact.booking.header.title')}
            </Link>
            <a
              href="https://wa.me/420721231933"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-3.5 font-label text-sm text-stone-300 underline-offset-4 hover:text-paper hover:underline"
            >
              {t('cta.whatsapp')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tours;
