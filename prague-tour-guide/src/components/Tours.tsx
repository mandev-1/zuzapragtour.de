import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import type { TranslationKey } from '../utils/translations';
import { tours } from '../data/tours';

const pub = (path: string) => `${process.env.PUBLIC_URL}${path}`;

const Tours: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const toursData = tours.map((tour, index) => ({
    id: index + 1,
    slug: language === 'de' && tour.slugDe ? tour.slugDe : tour.slug,
    tourId: tour.id,
    titleKey: tour.titleKey,
    descriptionKey: tour.descriptionKey,
    durationKey: tour.durationKey,
    image: tour.image,
    highlightKeys: tour.highlightKeys,
    isCustom: tour.id === 'custom',
  }));

  const regularTours = toursData.filter((x) => !x.isCustom);
  const customTour = toursData.find((x) => x.isCustom);

  const secondaryBadgeKey = (tourId: string): TranslationKey =>
    tourId === 'hidden' ? 'tours.badge.insider' : 'tours.badge.groupUpTo6';

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-24 md:pb-16">
      {/* Compact hero — maroon, minimal vertical padding on mobile */}
      <header className="bg-primary px-5 py-6 text-center md:py-8">
        <p className="mb-2 font-label text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-on-primary/65">
          {t('tours.page.kicker')}
        </p>
        <h1 className="mb-3 font-headline text-2xl leading-tight text-on-primary md:text-3xl lg:text-4xl">
          {t('tours.page.heading')}
        </h1>
        <p className="mx-auto max-w-xl font-label text-sm leading-relaxed text-on-primary/80 md:text-base">
          {t('tours.page.lead')}
        </p>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
        <p className="mb-4 font-label text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/45">
          {t('tours.section.popular')}
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {regularTours.map((tour, index) => {
            const bookDest = `/book?tour=${encodeURIComponent(t(tour.titleKey as TranslationKey))}#contact-title`;
            const tourDest = `/tours/${tour.slug}`;
            return (
              <motion.article
                key={tour.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a] shadow-lg transition-shadow hover:border-white/15 hover:shadow-xl"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  className="relative h-44 cursor-pointer overflow-hidden md:h-52"
                  onClick={() => navigate(tourDest)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigate(tourDest);
                    }
                  }}
                >
                  <img
                    src={pub(tour.image)}
                    alt={t(tour.titleKey as TranslationKey)}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-black/60 px-2.5 py-1 font-label text-xs font-medium text-white backdrop-blur-sm">
                      {t(tour.durationKey as TranslationKey)}
                    </span>
                    <span className="rounded-full bg-primary/90 px-2.5 py-1 font-label text-xs font-medium text-on-primary backdrop-blur-sm">
                      {t(secondaryBadgeKey(tour.tourId))}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-4 md:p-5">
                  <h2 className="mb-2 font-headline text-lg text-white md:text-xl">{t(tour.titleKey as TranslationKey)}</h2>
                  <p className="mb-4 flex-1 font-body text-sm leading-relaxed text-white/65">{t(tour.descriptionKey as TranslationKey)}</p>

                  <ul className="mb-5 space-y-1.5">
                    {tour.highlightKeys.map((key) => (
                      <li key={key} className="flex items-start gap-2 text-sm text-white/60">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {t(key as TranslationKey)}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={bookDest}
                    onClick={(e) => e.stopPropagation()}
                    className="mb-2 w-full rounded-xl border-2 border-white/70 bg-transparent py-3 text-center font-label text-sm font-semibold text-white transition-colors hover:bg-white/10 active:bg-white/15"
                  >
                    {t('tour.bookNow')}
                  </Link>
                  <Link
                    to={tourDest}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full rounded-xl border border-white/25 py-2.5 text-center font-label text-sm font-medium text-white/90 transition-colors hover:bg-white/5"
                  >
                    {t('tours.exploreTour')} →
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Custom tour — light card */}
        {customTour && (
          <motion.section
            className="mt-8 md:mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="mb-4 font-label text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/45">
              {t('tours.section.custom')}
            </p>
            <div className="rounded-2xl border border-neutral-300/80 bg-white p-5 shadow-md md:p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
                <div className="min-w-0 flex-1">
                  <h2 className="mb-2 font-headline text-xl text-primary md:text-2xl">
                    {t(customTour.titleKey as TranslationKey)}
                  </h2>
                  <p className="font-body text-sm leading-relaxed text-on-surface-variant md:text-base">
                    {t(customTour.descriptionKey as TranslationKey)}
                  </p>
                </div>
                <div className="flex w-full flex-col gap-2 md:w-56 md:shrink-0">
                  <Link
                    to={`/book?tour=${encodeURIComponent(t(customTour.titleKey as TranslationKey))}#contact-title`}
                    className="w-full rounded-xl bg-primary py-3 text-center font-label text-sm font-semibold text-on-primary transition-opacity hover:opacity-90"
                  >
                    {t('tours.custom.requestCta')}
                  </Link>
                  <Link
                    to={`/tours/${customTour.slug}`}
                    className="w-full rounded-xl border border-primary/35 py-2.5 text-center font-label text-sm font-medium text-primary transition-colors hover:bg-primary/5"
                  >
                    {t('tours.custom.learnMore')} →
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </div>

      {/* Info tiles — dark */}
      <section className="mx-auto max-w-6xl px-4 pb-8 md:px-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {[
            { icon: 'groups', title: t('tourinfo.groups.title'), desc: t('tourinfo.groups.desc') },
            { icon: 'translate', title: t('tourinfo.languages.title'), desc: t('tourinfo.languages.desc') },
            { icon: 'event_available', title: t('tourinfo.booking.title'), desc: t('tourinfo.booking.desc') },
            { icon: 'partly_cloudy_day', title: t('tourinfo.weather.title'), desc: t('tourinfo.weather.desc') },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/10 bg-[#1a1a1a] p-4 md:p-5"
            >
              <span className="material-symbols-outlined mb-2 block text-2xl text-secondary-container">{item.icon}</span>
              <h3 className="mb-1 font-headline text-sm text-white md:text-base">{item.title}</h3>
              <p className="font-label text-xs leading-relaxed text-white/55 md:text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ — dark */}
      <section className="mx-auto max-w-3xl px-4 pb-20 md:px-8 md:pb-24">
        <h2 className="mb-6 text-center font-headline text-2xl text-white md:text-3xl">{t('tours.faq.title')}</h2>
        <div className="space-y-3">
          {([
            { q: 'tours.faq.q1', a: 'tours.faq.a1' },
            { q: 'tours.faq.q2', a: 'tours.faq.a2' },
            { q: 'tours.faq.q3', a: 'tours.faq.a3' },
            { q: 'tours.faq.q4', a: 'tours.faq.a4' },
            { q: 'tours.faq.q5', a: 'tours.faq.a5' },
          ] as const).map(({ q, a }) => (
            <details key={q} className="group rounded-xl border border-white/10 bg-[#1a1a1a]">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-headline text-base text-white md:text-lg">
                {t(q as TranslationKey)}
                <span className="material-symbols-outlined ml-3 shrink-0 text-secondary-container transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <p className="px-5 pb-5 font-body text-sm leading-relaxed text-white/65 md:text-base">{t(a as TranslationKey)}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Sticky bottom CTA — mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0a0a0a]/95 px-4 py-3 backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <p className="min-w-0 flex-1 font-label text-xs leading-snug text-white/55">{t('tours.stickyCta.hint')}</p>
          <Link
            to="/book#contact-title"
            className="shrink-0 rounded-xl border border-white/50 bg-transparent px-4 py-2.5 font-label text-sm font-semibold text-white"
          >
            {t('tours.stickyCta.button')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tours;
