import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { getTourBySlug } from '../data/tours';
import { getTourPageSchema } from '../utils/seo';

const SITE = 'https://zuzapragtour.de';

const TourPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();

  const tour = slug ? getTourBySlug(slug) : undefined;

  if (!tour) {
    return (
      <div className="mx-auto max-w-2xl px-8 py-24 text-center">
        <h1 className="mb-4 font-headline text-3xl text-primary">Tour not found</h1>
        <p className="mb-8 text-on-surface-variant">
          This tour page does not exist. Please check the URL or browse all tours.
        </p>
        <Link to="/tours" className="rounded-lg bg-primary px-6 py-3 font-semibold text-on-primary hover:opacity-90">
          {t('tourpage.allTours' as any)}
        </Link>
      </div>
    );
  }

  // seoTitle is the keyword-rich H1 text — brand suffix added separately for <title>
  const h1Text = t(tour.seoTitleKey as any);
  const pageTitle = `${h1Text} | Zuza Prague Tours`;
  const description = t(tour.descriptionKey as any);
  const canonicalSlug = language === 'de' && tour.slugDe ? tour.slugDe : tour.slug;
  const canonical = `${SITE}/tours/${canonicalSlug}`;
  const imageUrl = `${SITE}${tour.image}`;

  const faqsForSchema = tour.faqKeys.map((fk) => ({
    question: t(fk.qKey as any),
    answer: t(fk.aKey as any),
  }));

  const schema = getTourPageSchema({
    name: t(tour.titleKey as any),
    description,
    duration: t(tour.durationKey as any),
    durationMinutes: tour.durationMinutes,
    image: imageUrl,
    url: canonical,
    faqs: faqsForSchema,
  });

  const bookDest = `/book?tour=${encodeURIComponent(t(tour.titleKey as any))}#contact-title`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="en" href={`${SITE}/tours/${tour.slug}`} />
        <link rel="alternate" hrefLang="de" href={`${SITE}/tours/${tour.slugDe}`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE}/tours/${tour.slug}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Hero */}
      <div className="relative h-72 overflow-hidden md:h-96">
        <img
          src={tour.image}
          alt={t(tour.titleKey as any)}
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 md:px-12">
          <motion.h1
            className="font-headline text-3xl font-bold text-white drop-shadow-lg md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {h1Text}
          </motion.h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-on-surface-variant">
          <Link to="/tours" className="hover:text-primary transition-colors">
            {t('tourpage.allTours' as any)}
          </Link>
          <span>/</span>
          <span className="text-on-surface">{t(tour.titleKey as any)}</span>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Intro paragraphs */}
            <div className="prose prose-lg max-w-none space-y-5 text-on-surface-variant">
              <p className="text-lg leading-relaxed">{t(tour.body1Key as any)}</p>
              <p className="leading-relaxed">{t(tour.body2Key as any)}</p>
              <p className="leading-relaxed">{t(tour.body3Key as any)}</p>
            </div>

            {/* Highlights */}
            <div className="mt-10">
              <h2 className="mb-4 font-headline text-2xl text-primary">
                {t('tourpage.highlights' as any)}
              </h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {tour.highlightKeys.map((key) => (
                  <li key={key} className="flex items-start gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined mt-0.5 text-lg text-green-700">
                      check_circle
                    </span>
                    <span>{t(key as any)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What's included */}
            <div className="mt-10">
              <h2 className="mb-4 font-headline text-2xl text-primary">
                {t('tourpage.included' as any)}
              </h2>
              <ul className="space-y-3">
                {tour.includedKeys.map((key) => (
                  <li key={key} className="flex items-start gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined mt-0.5 text-lg text-primary">
                      verified
                    </span>
                    <span>{t(key as any)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h2 className="mb-6 font-headline text-2xl text-primary">
                {t('tourpage.faq' as any)}
              </h2>
              <div className="space-y-4">
                {tour.faqKeys.map(({ qKey, aKey }) => (
                  <details
                    key={qKey}
                    className="group rounded-xl border border-outline-variant/20 bg-surface-container-lowest"
                  >
                    <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-headline text-base text-on-surface">
                      {t(qKey as any)}
                      <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">
                        expand_more
                      </span>
                    </summary>
                    <p className="px-6 pb-5 leading-relaxed text-on-surface-variant">
                      {t(aKey as any)}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-4 rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-md">
              {/* Tour meta */}
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-xl text-primary">schedule</span>
                  <div>
                    <p className="font-semibold text-on-surface">{t('tourpage.duration' as any)}</p>
                    <p className="text-on-surface-variant">{t(tour.durationKey as any)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-xl text-primary">translate</span>
                  <div>
                    <p className="font-semibold text-on-surface">{t('tourpage.language' as any)}</p>
                    <p className="text-on-surface-variant">{t('tourpage.languageValue' as any)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-xl text-primary">group</span>
                  <div>
                    <p className="font-semibold text-on-surface">{t('tourpage.groupSize' as any)}</p>
                    <p className="text-on-surface-variant">{t('tourpage.groupSizeValue' as any)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-xl text-primary">pin_drop</span>
                  <div>
                    <p className="font-semibold text-on-surface">{t('tourpage.meetingPoint' as any)}</p>
                    <p className="text-on-surface-variant">{t(tour.meetingPointKey as any)}</p>
                  </div>
                </div>
              </div>

              {/* Rating badge */}
              <div className="rounded-xl bg-surface-container-low px-4 py-3 text-center">
                <div className="flex items-center justify-center gap-1 text-primary">
                  {[1,2,3,4,5].map((i) => (
                    <span key={i} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <p className="mt-1 text-xs text-on-surface-variant">
                  4.9 / 5 · 14 Bewertungen · TripAdvisor
                </p>
              </div>

              <div className="border-t border-outline-variant/20 pt-4">
                <p className="mb-4 text-center font-headline text-lg font-semibold text-primary">
                  {t('tour.price' as any)}
                </p>
                <Link
                  to={bookDest}
                  className="block w-full rounded-lg bg-primary px-5 py-3 text-center font-semibold text-on-primary shadow-sm hover:opacity-90 active:opacity-80 transition-opacity"
                >
                  {t('tourpage.bookCta' as any)}
                </Link>
                <Link
                  to="/contact"
                  className="mt-3 block w-full rounded-lg border border-primary px-5 py-3 text-center font-semibold text-primary hover:bg-primary/5 transition-colors"
                >
                  {t('tourpage.enquiryCta' as any)}
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-16 rounded-2xl bg-surface-container-low px-8 py-10 text-center">
          <h2 className="mb-3 font-headline text-2xl text-primary">
            {t(tour.titleKey as any)}
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-on-surface-variant">
            {t(tour.descriptionKey as any)}
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to={bookDest}
              className="rounded-lg bg-primary px-8 py-3 font-semibold text-on-primary shadow hover:opacity-90 transition-opacity"
            >
              {t('tourpage.bookCta' as any)}
            </Link>
            <Link
              to="/tours"
              className="rounded-lg border border-outline-variant/40 px-8 py-3 font-semibold text-on-surface hover:bg-surface-container transition-colors"
            >
              {t('tourpage.allTours' as any)}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourPage;
