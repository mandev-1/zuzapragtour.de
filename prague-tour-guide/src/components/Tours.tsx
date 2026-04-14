import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { tours } from '../data/tours';

const Tours: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Build card data from the shared tours array
  const toursData = tours.map((tour, index) => ({
    id: index + 1,
    slug: language === 'de' && tour.slugDe ? tour.slugDe : tour.slug,
    titleKey: tour.titleKey,
    descriptionKey: tour.descriptionKey,
    durationKey: tour.durationKey,
    image: tour.image,
    highlightKeys: tour.highlightKeys,
  }));

  return (
    <div className="bg-surface pb-16">
      <div className="border-b border-outline-variant/15 bg-surface-container-low py-16 text-center">
        <h1 className="mb-4 font-headline text-4xl text-primary md:text-5xl">{t('tours.header.title')}</h1>
        <p className="mx-auto max-w-2xl text-lg text-on-surface-variant">{t('tours.header.subtitle')}</p>
      </div>

      <div className="mx-auto max-w-6xl px-8 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {toursData.map((tour, index) => {
            const bookDest = `/book?tour=${encodeURIComponent(t(tour.titleKey as any))}#contact-title`;
            const tourDest = `/tours/${tour.slug}`;
            return (
              <motion.article
                key={tour.id}
                className="flex flex-col overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest shadow-md transition-shadow hover:shadow-lg"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  className="relative h-56 cursor-pointer overflow-hidden"
                  onClick={() => navigate(tourDest)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigate(tourDest);
                    }
                  }}
                >
                  <img src={tour.image} alt={t(tour.titleKey as any)} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="mb-2 font-headline text-xl text-primary">{t(tour.titleKey as any)}</h2>
                  <div className="mb-3 flex items-center gap-2 font-label text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-lg">schedule</span>
                    {t(tour.durationKey as any)}
                  </div>
                  <p className="mb-4 flex-1 text-on-surface-variant">{t(tour.descriptionKey as any)}</p>
                  <h3 className="mb-2 font-label text-sm font-bold uppercase tracking-wide text-secondary">{t('tour.highlights')}</h3>
                  <ul className="mb-6 space-y-2">
                    {tour.highlightKeys.map((key) => (
                      <li key={key} className="flex items-start gap-2 text-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-lg text-green-700">check_circle</span>
                        <span>{t(key as any)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-col gap-3 border-t border-outline-variant/20 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                      to={tourDest}
                      className="text-sm font-medium text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t('tourpage.allTours' as any).replace('← ', '')} →
                    </Link>
                    <Link
                      to={bookDest}
                      className="rounded-lg bg-primary px-5 py-2.5 text-center font-semibold text-on-primary hover:opacity-90"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t('tour.bookNow')}
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-8 pb-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: 'groups', title: t('tourinfo.groups.title'), desc: t('tourinfo.groups.desc') },
            { icon: 'translate', title: t('tourinfo.languages.title'), desc: t('tourinfo.languages.desc') },
            { icon: 'event_available', title: t('tourinfo.booking.title'), desc: t('tourinfo.booking.desc') },
            { icon: 'partly_cloudy_day', title: t('tourinfo.weather.title'), desc: t('tourinfo.weather.desc') },
          ].map((item) => (
            <div key={item.title} className="rounded-xl bg-surface-container-low p-6">
              <span className="material-symbols-outlined mb-2 text-2xl text-primary">{item.icon}</span>
              <h3 className="mb-2 font-headline text-lg text-on-surface">{item.title}</h3>
              <p className="text-sm text-on-surface-variant">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-8 pb-16">
        <h2 className="mb-8 text-center font-headline text-3xl text-primary">{t('tours.faq.title')}</h2>
        <div className="space-y-6">
          {([
            { q: 'tours.faq.q1', a: 'tours.faq.a1' },
            { q: 'tours.faq.q2', a: 'tours.faq.a2' },
            { q: 'tours.faq.q3', a: 'tours.faq.a3' },
            { q: 'tours.faq.q4', a: 'tours.faq.a4' },
            { q: 'tours.faq.q5', a: 'tours.faq.a5' },
          ] as const).map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-xl border border-outline-variant/20 bg-surface-container-lowest"
            >
              <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-headline text-lg text-on-surface">
                {t(q as any)}
                <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <p className="px-6 pb-5 leading-relaxed text-on-surface-variant">
                {t(a as any)}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tours;
