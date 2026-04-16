import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import type { TranslationKey } from '../utils/translations';
import TripAdvisorWidget from './TripAdvisorWidget';
import TourHqWidget from './TourHqWidget';

const pub = (path: string) => `${process.env.PUBLIC_URL}${path}`;

// Portrait for the hero — use a real professional photograph of Zuzana.
// If /images/zuzana-hero.jpg doesn't exist yet, falls back to the existing portrait.
const PORTRAIT_SRC = pub('/images/zuzana-portrait.jpg');

type TeaserTour = {
  titleKey: TranslationKey;
  durationKey: TranslationKey;
  image: string;
  popular: boolean;
};

const TEASER_TOURS: TeaserTour[] = [
  {
    titleKey: 'tour.oldtown.title',
    durationKey: 'tour.oldtown.duration',
    image: '/images/blog-jewish-quarter-2-min.jpg',
    popular: true,
  },
  {
    titleKey: 'tour.castle.title',
    durationKey: 'tour.castle.duration',
    image: '/images/prague-castle.jpg',
    popular: false,
  },
  {
    titleKey: 'tour.custom.title',
    durationKey: 'tour.custom.duration',
    image: '/images/blog-night-prague-min.jpg',
    popular: false,
  },
];

const TESTIMONIAL = {
  de: {
    quote:
      'Zuzanas persönliche Geschichte mit der Stadt macht diese Führung zu etwas völlig Einzigartigem. Absolut unvergesslich.',
    author: 'Michael T., USA',
    platform: 'TripAdvisor',
  },
  en: {
    quote:
      "Zuzana's personal connection to the city makes this tour something truly unique. Absolutely unforgettable.",
    author: 'Michael T., USA',
    platform: 'TripAdvisor',
  },
};

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const testimonial = TESTIMONIAL[language === 'en' ? 'en' : 'de'];

  React.useEffect(() => {
    if (window.location.hash === '#about') {
      window.setTimeout(() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }
  }, []);

  return (
    <div className="bg-surface">
      <section className="border-b border-stone-200 bg-paper">
        <div className="mx-auto max-w-editorial px-5 py-16 md:px-10 md:py-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-16">
            {/* Copy */}
            <div>
              <motion.p
                className="mb-6 font-eyebrow text-eyebrow uppercase text-stone-500"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {t('home.badge')}
              </motion.p>

              <motion.h1
                className="mb-8 font-headline text-display-xl text-ink"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
              >
                {t('home.hero.line1')}
                <span className="block italic text-stone-600">{t('home.hero.line2')}</span>
              </motion.h1>

              <motion.p
                className="mb-10 max-w-prose-narrow font-body text-prose-lg text-stone-700"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                {t('hero.subtitle')}
              </motion.p>

              <motion.div
                className="flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <Link
                  to="/book#contact-title"
                  className="rounded-md bg-ink px-7 py-3.5 font-label text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
                >
                  {t('hero.sendEnquiry')}
                </Link>
                <Link
                  to="/tours"
                  className="font-label text-sm text-stone-600 underline-offset-4 hover:text-ink hover:underline"
                >
                  {t('hero.exploreTours')} →
                </Link>
              </motion.div>

              {/* Trust stats row — editorial, no icons */}
              <motion.dl
                className="mt-14 grid grid-cols-3 gap-6 border-t border-stone-200 pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div>
                  <dt className="font-eyebrow text-eyebrow uppercase text-stone-500">
                    {t('home.meta1')}
                  </dt>
                  <dd className="mt-2 font-headline text-2xl text-ink md:text-3xl">40+</dd>
                </div>
                <div>
                  <dt className="font-eyebrow text-eyebrow uppercase text-stone-500">TripAdvisor</dt>
                  <dd className="mt-2 font-headline text-2xl text-ink md:text-3xl">4,9</dd>
                </div>
                <div>
                  <dt className="font-eyebrow text-eyebrow uppercase text-stone-500">
                    {t('home.meta2')}
                  </dt>
                  <dd className="mt-2 font-headline text-2xl text-ink md:text-3xl">1–6</dd>
                </div>
              </motion.dl>
            </div>

            {/* Portrait */}
            <motion.div
              className="relative mx-auto w-full max-w-md md:max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="aspect-[4/5] overflow-hidden rounded-sm bg-stone-200">
                <img
                  src={PORTRAIT_SRC}
                  alt="Zuzana Manová"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: 'center 40%' }}
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 hidden max-w-[220px] bg-paper p-4 ring-1 ring-stone-200 md:block">
                <p className="font-eyebrow text-eyebrow uppercase text-stone-500">
                  {t('about.badge.line1')}
                </p>
                <p className="mt-1 font-body text-sm text-stone-700">
                  {t('about.badge.line2')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 md:py-16">
        <div className="mb-12">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-headline text-xl text-primary sm:text-2xl md:text-3xl">{t('home.tours.teaser.title')}</h2>
            <Link
              to="/tours"
              className="shrink-0 font-label text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              {t('home.tours.teaser.viewAll')} →
            </Link>
          </div>
          {/* Mobile: horizontal scroll snap. Desktop: 3-col grid */}
          <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
            {TEASER_TOURS.map((tour, i) => (
              <motion.div
                key={tour.titleKey}
                className="relative flex w-[72vw] flex-none flex-col overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest shadow-sm transition-shadow hover:shadow-md sm:w-auto"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                {tour.popular && (
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-3 py-0.5 font-label text-xs font-bold text-on-primary">
                    {t('tour.badge.popular')}
                  </span>
                )}
                <div className="h-44 overflow-hidden">
                  <img
                    src={pub(tour.image)}
                    alt={t(tour.titleKey)}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-1 font-headline text-lg text-primary">{t(tour.titleKey)}</h3>
                  <div className="mb-4 flex items-center gap-1.5 font-label text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-base">schedule</span>
                    {t(tour.durationKey)}
                  </div>
                  <Link
                    to={`/book?tour=${encodeURIComponent(t(tour.titleKey))}#contact-title`}
                    className="mt-auto rounded-lg border-2 border-primary px-4 py-2 text-center font-label text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-on-primary"
                  >
                    {t('tour.sendEnquiry')}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div
          id="about"
          className="mb-20 scroll-mt-28 overflow-hidden rounded-2xl bg-surface-container-low shadow-lg md:flex md:flex-row"
        >
          {/* Portrait — large, roughly half-width on desktop */}
          <div className="relative flex-none md:w-[44%]">
            <img
              className="h-72 w-full object-cover sm:h-80 md:h-full md:min-h-[26rem]"
              style={{
                /* Face is in the lower third of this image — anchor there on mobile,
                   shift up slightly on desktop where the full height shows more */
                objectPosition: 'center 42%',
              }}
              src={pub('/images/zuzana-portrait.jpg')}
              alt="Zuzana Manová"
            />
            {/* Certification badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-full bg-secondary/95 px-4 py-2 shadow-md backdrop-blur-sm">
              <span className="material-symbols-outlined text-lg text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="font-label text-xs font-bold leading-tight text-on-primary">
                {t('about.badge.line1')}<br />{t('about.badge.line2')}
              </span>
            </div>
          </div>

          {/* Copy */}
          <div className="flex flex-col justify-center space-y-5 p-8 md:p-10 lg:p-12">
            <h2 className="font-headline text-2xl text-on-surface md:text-3xl lg:text-4xl">
              {t('home.section.story.title')}
            </h2>
            <p className="leading-relaxed text-on-surface-variant">{t('about.intro')}</p>
            <p className="leading-relaxed text-on-surface-variant">{t('about.expertise')}</p>
            <p className="leading-relaxed text-on-surface-variant">{t('about.promise')}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/tours"
                className="rounded-lg bg-primary px-6 py-3 font-label text-sm font-semibold text-on-primary shadow-sm transition-opacity hover:opacity-90 active:scale-[0.98]"
              >
                {t('hero.exploreTours')}
              </Link>
              <Link
                to="/zuzana-manova"
                className="rounded-lg border-2 border-primary px-6 py-3 font-label text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-on-primary"
              >
                {t('nav.zuzana')}
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-20 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {[
            { image: '/images/prague-castle.jpg', title: t('features.historic.title'), desc: t('features.historic.desc') },
            { image: '/images/blog-jewish-quarter-2-min.jpg', title: t('features.groups.title'), desc: t('features.groups.desc') },
            { image: '/images/blog-hidden-gems-min.jpg', title: t('features.expert.title'), desc: t('features.expert.desc') },
            { image: '/images/blog-hidden-gems-2-min.jpg', title: t('features.gems.title'), desc: t('features.gems.desc') },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              className="overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest shadow-sm"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              viewport={{ once: true }}
            >
              <div className="h-36 overflow-hidden sm:h-40">
                <img src={pub(f.image)} alt={f.title} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-4">
                <h3 className="mb-1 font-headline text-base text-primary">{f.title}</h3>
                <p className="text-sm leading-relaxed text-on-surface-variant">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-20 space-y-8">
          <h3 className="font-headline text-2xl text-primary">{t('home.gallery.title')}</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <div className="col-span-2 row-span-2 md:col-span-2 md:row-span-2">
              <img
                className="h-full min-h-[12rem] w-full rounded-lg object-cover"
                src={pub('/images/prague-castle.jpg')}
                alt=""
              />
            </div>
            <div className="h-40 md:h-48">
              <img
                className="h-full w-full rounded-lg object-cover"
                src={pub('/images/charles-bridge-2-min.jpg')}
                alt=""
              />
            </div>
            <div className="h-40 md:h-48">
              <img
                className="h-full w-full rounded-lg object-cover"
                src={pub('/images/old-town-square.jpg')}
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-8">
          <h3 className="font-headline text-2xl text-primary">{t('home.reviews.groupTitle')}</h3>

          <blockquote className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
            <p className="mb-4 text-lg italic leading-relaxed text-on-surface-variant">
              <span aria-hidden="true">&ldquo;</span>
              {testimonial.quote}
              <span aria-hidden="true">&rdquo;</span>
            </p>
            <footer className="font-label text-sm text-on-surface-variant">
              — {testimonial.author}
              <span className="ml-2 text-secondary">· {testimonial.platform} ★★★★★</span>
            </footer>
          </blockquote>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-8">
            <div className="space-y-4">
              <h4 className="font-headline text-lg text-primary md:text-xl">{t('home.tripadvisor.sectionTitle')}</h4>
              <TripAdvisorWidget />
            </div>
            <div className="space-y-4">
              <h4 className="font-headline text-lg text-primary md:text-xl">{t('home.tourhq.sectionTitle')}</h4>
              <TourHqWidget />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
