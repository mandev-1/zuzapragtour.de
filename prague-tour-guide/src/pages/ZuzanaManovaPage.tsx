import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { NAP } from '../utils/seo';

const FAQ_KEYS = [
  { q: 'zm.faq.q1', a: 'zm.faq.a1' },
  { q: 'zm.faq.q2', a: 'zm.faq.a2' },
  { q: 'zm.faq.q3', a: 'zm.faq.a3' },
  { q: 'zm.faq.q4', a: 'zm.faq.a4' },
  { q: 'zm.faq.q5', a: 'zm.faq.a5' },
] as const;

const ZuzanaManovaPage: React.FC = () => {
  const { t, language } = useLanguage();

  const title =
    language === 'de'
      ? 'Zuzana Manová – Deutschsprachige Prag-Expertin & Spezialistin | Zuza Prague Tours'
      : 'Zuzana Manová – Private Prague Tour Guide & Expert | Zuza Prague Tours';

  const description =
    language === 'de'
      ? 'Ing. Zuzana Manová – Ihre deutschsprachige Prag-Expertin und Spezialistin seit 1986. Zertifizierte Stadtführerin, akkreditiert beim Jüdischen Museum. Private Führungen auf Deutsch und Englisch.'
      : 'Ing. Zuzana Manová – certified Prague expert and specialist guide since 1986. Accredited by the Jewish Museum. Private tours in German and English.';

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ing. Zuzana Manová',
    givenName: 'Zuzana',
    familyName: 'Manova',
    honorificPrefix: 'Ing.',
    jobTitle: language === 'de' ? 'Deutschsprachige Prag-Expertin & zertifizierte Stadtführerin' : 'Certified Expert Tour Guide in Prague',
    description:
      language === 'de'
        ? 'Deutschsprachige Prag-Expertin und Spezialistin für Stadtführungen seit 1986 mit über 40 Jahren Erfahrung.'
        : 'Professional Prague expert and specialist tour guide since 1986 with 40+ years of experience.',
    url: 'https://zuzapragtour.de/zuzana-manova',
    image: 'https://zuzapragtour.de/images/zuzana-portrait.jpg',
    telephone: NAP.phone,
    email: NAP.email,
    knowsLanguage: ['de', 'en', 'cs'],
    worksFor: { '@id': 'https://zuzapragtour.de/#business' },
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', name: 'Czech Republic Certified Tour Guide', credentialCategory: 'Professional License' },
      { '@type': 'EducationalOccupationalCredential', name: 'Jewish Museum in Prague Accreditation', credentialCategory: 'Specialist Certification', recognizedBy: { '@type': 'Organization', name: 'Jewish Museum in Prague', url: 'https://www.jewishmuseum.cz' } },
    ],
    knowsAbout: ['Prague history', 'Prague Castle', 'Jewish Quarter Prague', 'Czech Jewish heritage', 'Velvet Revolution', 'Václav Havel', 'Franz Kafka', 'Prague architecture'],
    sameAs: [NAP.tripadvisor, NAP.tourhq, NAP.instagram],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_KEYS.map(({ q, a }) => ({
      '@type': 'Question',
      name: t(q as any),
      acceptedAnswer: { '@type': 'Answer', text: t(a as any) },
    })),
  };

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://zuzapragtour.de/zuzana-manova" />
        <link rel="alternate" hrefLang="de" href="https://zuzapragtour.de/zuzana-manova" />
        <link rel="alternate" hrefLang="en" href="https://zuzapragtour.de/zuzana-manova" />
        <link rel="alternate" hrefLang="x-default" href="https://zuzapragtour.de/zuzana-manova" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://zuzapragtour.de/zuzana-manova" />
        <meta property="og:image" content="https://zuzapragtour.de/images/zuzana-portrait.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="bg-paper">

        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="border-b border-stone-200">
          <div className="mx-auto grid max-w-editorial grid-cols-1 gap-10 px-5 py-14 md:grid-cols-[1fr_280px] md:items-start md:gap-16 md:px-10 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-4 font-eyebrow text-eyebrow uppercase text-stone-500">
                {language === 'de' ? 'Stadtführerin · Prag' : 'Tour Guide · Prague'}
              </p>
              <h1 className="font-headline text-display-lg leading-snug text-ink">
                {t('zm.hero.h1')}
              </h1>
              <p className="mt-5 max-w-prose font-body text-prose text-stone-600">
                {t('zm.hero.subtitle')}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/book#contact-title"
                  className="rounded-md bg-ink px-6 py-3 font-label text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
                >
                  {t('hero.sendEnquiry')}
                </Link>
                <Link
                  to="/tours"
                  className="font-label text-sm text-stone-500 underline-offset-4 hover:text-ink hover:underline"
                >
                  {t('hero.exploreTours')} →
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="mt-2 md:mt-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="aspect-[4/5] overflow-hidden rounded-sm bg-stone-200">
                <img
                  src="/images/zuzana-portrait.jpg"
                  alt="Zuzana Manová, private Prague tour guide"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: 'center 20%' }}
                  fetchPriority="high"
                />
              </div>
              <p className="mt-3 font-eyebrow text-eyebrow uppercase text-stone-400">Ing. Zuzana Manová</p>
              <p className="font-eyebrow text-eyebrow uppercase text-stone-400">{t('about.badge.line1')}</p>
            </motion.div>
          </div>
        </section>

        {/* ── Bio ───────────────────────────────────────────── */}
        <section className="border-b border-stone-200">
          <div className="mx-auto max-w-prose px-5 py-14 md:px-10">
            <h2 className="mb-6 font-headline text-xl text-ink">{t('zm.bio.title')}</h2>
            <div className="space-y-5 font-body text-prose leading-relaxed text-stone-700">
              <p>{t('zm.bio.p1')}</p>
              <p>{t('zm.bio.p2')}</p>
              <p>{t('zm.bio.p3')}</p>
            </div>
          </div>
        </section>

        {/* ── Credentials ───────────────────────────────────── */}
        <section className="border-b border-stone-200 bg-paper-warm">
          <div className="mx-auto max-w-editorial px-5 py-12 md:px-10">
            <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {(['zm.cred.1', 'zm.cred.2', 'zm.cred.3'] as const).map((key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.07, 0.15) }}
                  viewport={{ once: true }}
                >
                  <dt className="mb-1 font-headline text-base text-ink">{t(`${key}.title` as any)}</dt>
                  <dd className="font-body text-sm text-stone-600">{t(`${key}.desc` as any)}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── What I offer ──────────────────────────────────── */}
        <section className="border-b border-stone-200">
          <div className="mx-auto max-w-prose px-5 py-14 md:px-10">
            <h2 className="mb-6 font-headline text-xl text-ink">{t('zm.offer.title')}</h2>
            <div className="space-y-5 font-body text-prose leading-relaxed text-stone-700">
              <p>{t('zm.offer.p1')}</p>
              <p>{t('zm.offer.p2')}</p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-0 sm:grid-cols-2">
              {(['zm.tour.1', 'zm.tour.2', 'zm.tour.3', 'zm.tour.4'] as const).map((key) => (
                <Link
                  key={key}
                  to="/tours"
                  className="block border-b border-stone-200 py-3.5 font-label text-sm text-ink transition-colors hover:text-accent"
                >
                  {t(key as any)} →
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────── */}
        <section className="border-b border-stone-200">
          <div className="mx-auto max-w-prose px-5 py-14 md:px-10">
            <h2 className="mb-8 font-headline text-xl text-ink">{t('zm.faq.title')}</h2>
            <div className="divide-y divide-stone-200">
              {FAQ_KEYS.map(({ q, a }) => (
                <details key={q} className="group py-1">
                  <summary className="cursor-pointer list-none py-4 font-headline text-base text-ink">
                    {t(q as any)}
                  </summary>
                  <p className="pb-4 font-body text-sm leading-relaxed text-stone-600">{t(a as any)}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className="bg-ink py-16">
          <div className="mx-auto max-w-prose px-5 text-center md:px-10">
            <h2 className="mb-3 font-headline text-2xl text-paper">{t('zm.cta.title')}</h2>
            <p className="mb-8 font-body text-prose text-stone-400">{t('zm.cta.subtitle')}</p>
            <Link
              to="/book#contact-title"
              className="inline-block rounded-md bg-accent px-8 py-4 font-label text-sm font-medium text-paper transition-colors hover:bg-accent-hover"
            >
              {t('hero.sendEnquiry')}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default ZuzanaManovaPage;
