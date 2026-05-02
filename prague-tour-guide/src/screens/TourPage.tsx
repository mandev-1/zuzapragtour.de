'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { getTourBySlug } from '../data/tours';

const TourPage: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const { t } = useLanguage();

  const tour = slug ? getTourBySlug(slug) : undefined;

  if (!tour) {
    return (
      <div className="mx-auto max-w-prose px-5 py-24 text-center">
        <h1 className="mb-4 font-headline text-3xl text-ink">Tour not found</h1>
        <p className="mb-8 font-body text-stone-600">
          This tour page does not exist. Please check the URL or browse all tours.
        </p>
        <Link href="/tours" className="rounded-md bg-ink px-6 py-3 font-label text-sm font-medium text-paper hover:bg-ink-soft">
          {t('tourpage.allTours' as any)}
        </Link>
      </div>
    );
  }

  const h1Text = t(tour.seoTitleKey as any);
  const description = t(tour.descriptionKey as any);

  const bookDest = `/book?tour=${encodeURIComponent(t(tour.titleKey as any))}#contact-title`;

  return (
    <div>
      {/* Text hero */}
      <section className="border-b border-stone-200 bg-paper">
        <div className="mx-auto max-w-editorial px-5 py-12 md:px-10 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-3 font-eyebrow text-eyebrow uppercase text-stone-500">
              {t('tourpage.allTours' as any)} · {t(tour.durationKey as any)}
            </p>
            <h1 className="font-headline text-display-lg leading-snug text-ink">
              {h1Text}
            </h1>
            <p className="mt-5 max-w-prose font-body text-prose text-stone-600">
              {description}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-editorial px-5 py-12 md:px-10">

        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 font-label text-sm text-stone-400">
          <Link href="/tours" className="transition-colors hover:text-ink">
            {t('tourpage.allTours' as any)}
          </Link>
          <span>/</span>
          <span className="text-ink">{t(tour.titleKey as any)}</span>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">

          {/* ── Main content ──────────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="space-y-5 font-body text-prose leading-relaxed text-stone-700">
              <p>{t(tour.body1Key as any)}</p>
              <p>{t(tour.body2Key as any)}</p>
              <p>{t(tour.body3Key as any)}</p>
            </div>

            {/* Highlights */}
            <div className="mt-10">
              <h2 className="mb-5 font-headline text-xl text-ink">
                {t('tourpage.highlights' as any)}
              </h2>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {tour.highlightKeys.map((key) => (
                  <li key={key} className="flex items-start gap-3 font-body text-sm text-stone-700">
                    <span className="mt-1 shrink-0 text-stone-400">—</span>
                    <span>{t(key as any)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What's included */}
            <div className="mt-10">
              <h2 className="mb-5 font-headline text-xl text-ink">
                {t('tourpage.included' as any)}
              </h2>
              <ul className="space-y-2.5">
                {tour.includedKeys.map((key) => (
                  <li key={key} className="flex items-start gap-3 font-body text-sm text-stone-700">
                    <span className="mt-1 shrink-0 text-stone-400">—</span>
                    <span>{t(key as any)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h2 className="mb-6 font-headline text-xl text-ink">
                {t('tourpage.faq' as any)}
              </h2>
              <div className="divide-y divide-stone-200">
                {tour.faqKeys.map(({ qKey, aKey }) => (
                  <details key={qKey} className="group py-1">
                    <summary className="cursor-pointer list-none py-4 font-headline text-base text-ink">
                      {t(qKey as any)}
                    </summary>
                    <p className="pb-4 font-body text-sm leading-relaxed text-stone-600">
                      {t(aKey as any)}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* ── Sidebar ───────────────────────────────────────── */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-5 border-t border-stone-200 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">

              <div className="space-y-5">
                <div className="border-b border-stone-100 pb-4">
                  <p className="mb-0.5 font-eyebrow text-eyebrow uppercase text-stone-400">
                    {t('tourpage.duration' as any)}
                  </p>
                  <p className="font-body text-sm text-ink">{t(tour.durationKey as any)}</p>
                </div>
                <div className="border-b border-stone-100 pb-4">
                  <p className="mb-0.5 font-eyebrow text-eyebrow uppercase text-stone-400">
                    {t('tourpage.language' as any)}
                  </p>
                  <p className="font-body text-sm text-ink">{t('tourpage.languageValue' as any)}</p>
                </div>
                <div className="border-b border-stone-100 pb-4">
                  <p className="mb-0.5 font-eyebrow text-eyebrow uppercase text-stone-400">
                    {t('tourpage.groupSize' as any)}
                  </p>
                  <p className="font-body text-sm text-ink">{t('tourpage.groupSizeValue' as any)}</p>
                </div>
                <div className="border-b border-stone-100 pb-4">
                  <p className="mb-0.5 font-eyebrow text-eyebrow uppercase text-stone-400">
                    {t('tourpage.meetingPoint' as any)}
                  </p>
                  <p className="font-body text-sm text-ink">{t(tour.meetingPointKey as any)}</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={bookDest}
                  className="block w-full rounded-md bg-ink px-5 py-3 text-center font-label text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
                >
                  {t('tourpage.bookCta' as any)}
                </Link>
                <Link
                  href="/contact"
                  className="mt-3 block w-full text-center font-label text-sm text-stone-500 underline-offset-4 hover:text-ink hover:underline"
                >
                  {t('tourpage.enquiryCta' as any)}
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* ── Bottom CTA ────────────────────────────────────────── */}
        <div className="mt-16 bg-ink px-8 py-12 text-center md:px-12">
          <h2 className="mb-3 font-headline text-2xl text-paper">
            {t(tour.titleKey as any)}
          </h2>
          <p className="mx-auto mb-8 max-w-prose font-body text-sm text-stone-400">
            {t(tour.descriptionKey as any)}
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={bookDest}
              className="rounded-md bg-accent px-8 py-3 font-label text-sm font-medium text-paper transition-colors hover:bg-accent-hover"
            >
              {t('tourpage.bookCta' as any)}
            </Link>
            <Link
              href="/tours"
              className="font-label text-sm text-stone-400 underline-offset-4 hover:text-paper hover:underline"
            >
              {t('tourpage.allTours' as any)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPage;
