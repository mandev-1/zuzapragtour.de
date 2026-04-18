import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import type { TranslationKey } from '../utils/translations';
import TripAdvisorWidget from './TripAdvisorWidget';
import TourHqWidget from './TourHqWidget';

const pub = (path: string) => `${process.env.PUBLIC_URL}${path}`;
const PORTRAIT_SRC = pub('/images/zuzana-portrait.jpg');

type TeaserTour = {
  titleKey: TranslationKey;
  durationKey: TranslationKey;
};

const TEASER_TOURS: TeaserTour[] = [
  { titleKey: 'tour.oldtown.title', durationKey: 'tour.oldtown.duration' },
  { titleKey: 'tour.castle.title',  durationKey: 'tour.castle.duration'  },
  { titleKey: 'tour.custom.title',  durationKey: 'tour.custom.duration'  },
];

const TESTIMONIAL = {
  de: {
    quote: 'Zuzanas persönliche Geschichte mit der Stadt macht diese Führung zu etwas völlig Einzigartigem. Absolut unvergesslich.',
    author: 'Michael T., USA',
    platform: 'TripAdvisor',
  },
  en: {
    quote: "Zuzana's personal connection to the city makes this tour something truly unique. Absolutely unforgettable.",
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
    <div className="bg-paper">

      {/* ── Hero ─────────────────────────────────────────────── */}
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

              <motion.dl
                className="mt-14 grid grid-cols-3 gap-6 border-t border-stone-200 pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div>
                  <dt className="font-eyebrow text-eyebrow uppercase text-stone-500">{t('home.meta1')}</dt>
                  <dd className="mt-2 font-headline text-2xl text-ink md:text-3xl">40+</dd>
                </div>
                <div>
                  <dt className="font-eyebrow text-eyebrow uppercase text-stone-500">TripAdvisor</dt>
                  <dd className="mt-2 font-headline text-2xl text-ink md:text-3xl">4,9</dd>
                </div>
                <div>
                  <dt className="font-eyebrow text-eyebrow uppercase text-stone-500">{t('home.meta2')}</dt>
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
                <p className="font-eyebrow text-eyebrow uppercase text-stone-500">{t('about.badge.line1')}</p>
                <p className="mt-1 font-body text-sm text-stone-700">{t('about.badge.line2')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Tour teaser ──────────────────────────────────────── */}
      <section className="border-b border-stone-200">
        <div className="mx-auto max-w-editorial px-5 py-14 md:px-10 md:py-20">
          <div className="mb-8 flex items-baseline justify-between">
            <p className="font-eyebrow text-eyebrow uppercase text-stone-500">
              {t('home.tours.teaser.title')}
            </p>
            <Link
              to="/tours"
              className="font-label text-sm text-stone-500 underline-offset-4 hover:text-ink hover:underline"
            >
              {t('home.tours.teaser.viewAll')} →
            </Link>
          </div>

          <ol className="divide-y divide-stone-200">
            {TEASER_TOURS.map((tour, i) => (
              <motion.li
                key={tour.titleKey}
                className="flex items-start gap-6 py-7 first:pt-0 last:pb-0"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.15) }}
                viewport={{ once: true, margin: '-60px' }}
              >
                <span className="w-8 shrink-0 font-headline text-2xl text-stone-300 md:text-3xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-headline text-lg text-ink md:text-xl">{t(tour.titleKey)}</h3>
                  <p className="mt-0.5 font-body text-sm text-stone-500">{t(tour.durationKey)}</p>
                </div>
                <Link
                  to={`/book?tour=${encodeURIComponent(t(tour.titleKey))}#contact-title`}
                  className="shrink-0 font-label text-sm text-stone-500 underline-offset-4 hover:text-ink hover:underline"
                >
                  {t('tour.sendEnquiry')} →
                </Link>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────── */}
      <section id="about" className="scroll-mt-28 border-b border-stone-200 bg-paper-warm">
        <div className="mx-auto grid max-w-editorial grid-cols-1 gap-10 px-5 py-16 md:grid-cols-[260px_1fr] md:gap-16 md:px-10 md:py-20">

          {/* Portrait */}
          <div className="mx-auto w-full max-w-[260px] md:mx-0">
            <div className="aspect-[4/5] overflow-hidden rounded-sm bg-stone-200">
              <img
                src={pub('/images/zuzana-portrait.jpg')}
                alt="Zuzana Manová"
                className="h-full w-full object-cover"
                style={{ objectPosition: 'center 42%' }}
                loading="lazy"
              />
            </div>
            <p className="mt-3 font-eyebrow text-eyebrow uppercase text-stone-400">{t('about.badge.line1')}</p>
            <p className="font-eyebrow text-eyebrow uppercase text-stone-400">{t('about.badge.line2')}</p>
          </div>

          {/* Copy */}
          <div className="flex flex-col justify-center">
            <motion.h2
              className="mb-7 font-headline text-display-md text-ink"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '-60px' }}
            >
              {t('home.section.story.title')}
            </motion.h2>
            <div className="space-y-4 font-body text-prose text-stone-700 leading-relaxed">
              <p>{t('about.intro')}</p>
              <p>{t('about.expertise')}</p>
              <p>{t('about.promise')}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-5">
              <Link
                to="/tours"
                className="font-label text-sm text-stone-600 underline-offset-4 hover:text-ink hover:underline"
              >
                {t('hero.exploreTours')} →
              </Link>
              <Link
                to="/zuzana-manova"
                className="font-label text-sm text-stone-600 underline-offset-4 hover:text-ink hover:underline"
              >
                {t('nav.zuzana')} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────── */}
      <section className="border-b border-stone-200">
        <div className="mx-auto max-w-editorial px-5 py-14 md:px-10 md:py-20">
          <p className="mb-6 font-eyebrow text-eyebrow uppercase text-stone-500">
            {t('home.gallery.title')}
          </p>
          <div className="grid grid-cols-3 gap-1">
            <div className="col-span-2 row-span-2">
              <img
                className="h-full w-full object-cover"
                style={{ minHeight: '14rem' }}
                src={pub('/images/prague-castle.jpg')}
                alt=""
                loading="lazy"
              />
            </div>
            <div>
              <img
                className="h-full w-full object-cover"
                style={{ aspectRatio: '1/1' }}
                src={pub('/images/charles-bridge-2-min.jpg')}
                alt=""
                loading="lazy"
              />
            </div>
            <div>
              <img
                className="h-full w-full object-cover"
                style={{ aspectRatio: '1/1' }}
                src={pub('/images/old-town-square.jpg')}
                alt=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-editorial px-5 py-16 md:px-10 md:py-20">

          {/* Pull quote */}
          <motion.blockquote
            className="mb-14 border-l-2 border-stone-300 pl-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-60px' }}
          >
            <p className="font-headline text-2xl italic leading-snug text-ink md:text-3xl">
              <span aria-hidden="true">&ldquo;</span>
              {testimonial.quote}
              <span aria-hidden="true">&rdquo;</span>
            </p>
            <footer className="mt-5 font-eyebrow text-eyebrow uppercase text-stone-500">
              — {testimonial.author} · {testimonial.platform}
            </footer>
          </motion.blockquote>

          {/* Widget strip */}
          <div className="border-t border-stone-200 pt-10">
            <p className="mb-8 font-eyebrow text-eyebrow uppercase text-stone-500">
              {t('home.reviews.groupTitle')}
            </p>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <TripAdvisorWidget />
              <TourHqWidget />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
