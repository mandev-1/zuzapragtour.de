import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import type { TranslationKey } from '../utils/translations';
import { tours } from '../data/tours';

const Tours: React.FC = () => {
  const { t, language } = useLanguage();

  const toursData = tours.map((tour, index) => ({
    id: index + 1,
    slug: language === 'de' && tour.slugDe ? tour.slugDe : tour.slug,
    titleKey: tour.titleKey,
    descriptionKey: tour.descriptionKey,
    durationKey: tour.durationKey,
    highlightKeys: tour.highlightKeys,
  }));

  /** Covers all entries in `tours` (currently 7). */
  const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Editorial hero — quiet, serif, no image, no color band */}
      <header className="mx-auto max-w-editorial px-6 pb-12 pt-16 md:px-10 md:pb-20 md:pt-24">
        <p className="mb-6 font-eyebrow text-eyebrow uppercase text-stone-500">
          {/* TODO: i18n — "Touren" */}
          Touren
        </p>
        <h1 className="mb-8 max-w-prose font-headline text-display-lg text-ink">
          {t('tours.page.heading')}
        </h1>
        <p className="max-w-prose-narrow font-body text-prose-lg text-stone-700">
          {t('tours.page.lead')}
        </p>
      </header>

      {/* Editorial tour list — numbered entries, prose-forward, one CTA each */}
      <section className="mx-auto max-w-editorial px-6 pb-16 md:px-10 md:pb-24">
        <div className="border-t border-stone-200">
          {toursData.map((tour, index) => {
            const tourDest = `/tours/${tour.slug}`;
            const bookDest = `/book?tour=${encodeURIComponent(
              t(tour.titleKey as TranslationKey),
            )}#contact-title`;

            return (
              <motion.article
                key={tour.id}
                className="grid grid-cols-[3rem_1fr] gap-6 border-b border-stone-200 py-10 md:grid-cols-[5rem_1fr_auto] md:gap-10 md:py-14"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.2) }}
                viewport={{ once: true, margin: '-80px' }}
              >
                <div className="font-serif text-xl text-stone-400 md:text-2xl">
                  {roman[index]}.
                </div>

                <div className="col-span-1 md:max-w-prose">
                  <Link to={tourDest} className="group block">
                    <h2 className="mb-3 font-headline text-2xl leading-tight text-ink transition-colors group-hover:text-accent md:text-3xl">
                      {t(tour.titleKey as TranslationKey)}
                    </h2>
                  </Link>
                  <p className="mb-4 font-body text-prose text-stone-700">
                    {t(tour.descriptionKey as TranslationKey)}
                  </p>
                  <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 font-eyebrow text-eyebrow uppercase text-stone-500">
                    <span>{t(tour.durationKey as TranslationKey)}</span>
                    {tour.highlightKeys.slice(0, 2).map((key) => (
                      <span key={key}>{t(key as TranslationKey)}</span>
                    ))}
                  </div>
                </div>

                <div className="col-span-2 mt-2 flex items-center gap-6 md:col-span-1 md:mt-0 md:flex-col md:items-end md:justify-center md:gap-3">
                  <Link
                    to={bookDest}
                    className="font-label text-sm font-medium text-accent underline-offset-4 hover:underline"
                  >
                    {/* TODO: i18n — "Anfrage senden" */}
                    Anfrage senden →
                  </Link>
                  <Link
                    to={tourDest}
                    className="font-label text-sm text-stone-500 underline-offset-4 hover:text-ink hover:underline"
                  >
                    {/* TODO: i18n — "Mehr lesen" */}
                    Mehr lesen
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Footer CTA — single, quiet, editorial */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-editorial px-6 py-20 text-center md:px-10 md:py-28">
          <p className="mb-4 font-eyebrow text-eyebrow uppercase text-stone-400">
            {/* TODO: i18n — "Schreiben Sie Zuzana" */}
            Schreiben Sie Zuzana
          </p>
          <h2 className="mx-auto mb-6 max-w-prose font-headline text-display-md text-paper">
            {/* TODO: i18n — "Jede Tour beginnt mit einem Gespräch." */}
            Jede Tour beginnt mit einem Gespräch.
          </h2>
          <p className="mx-auto mb-10 max-w-prose-narrow font-body text-prose text-stone-300">
            {/* TODO: i18n */}
            Erzählen Sie mir, wer Sie sind und was Sie in Prag interessiert. Ich antworte persönlich
            — meist innerhalb eines Tages.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <Link
              to="/book#contact-title"
              className="inline-flex items-center justify-center rounded-md bg-paper px-8 py-3.5 font-label text-sm font-medium text-ink transition-colors hover:bg-stone-100"
            >
              {/* TODO: i18n */}
              Anfrage senden →
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-2 py-3.5 font-label text-sm text-stone-300 underline-offset-4 hover:text-paper hover:underline"
            >
              {/* TODO: i18n — "Oder per WhatsApp" */}
              Oder per WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tours;
