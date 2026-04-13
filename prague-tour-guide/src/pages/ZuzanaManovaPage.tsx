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
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Czech Republic Certified Tour Guide',
        credentialCategory: 'Professional License',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Jewish Museum in Prague Accreditation',
        credentialCategory: 'Specialist Certification',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Jewish Museum in Prague',
          url: 'https://www.jewishmuseum.cz',
        },
      },
    ],
    knowsAbout: [
      'Prague history',
      'Prague Castle',
      'Jewish Quarter Prague',
      'Czech Jewish heritage',
      'Velvet Revolution',
      'Václav Havel',
      'Franz Kafka',
      'Prague architecture',
    ],
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
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://zuzapragtour.de/zuzana-manova" />
        <meta property="og:image" content="https://zuzapragtour.de/images/zuzana-portrait.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="bg-surface">
        {/* Hero */}
        <section className="border-b border-outline-variant/15 bg-surface-container-low">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-12 md:grid-cols-2 md:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-headline text-3xl leading-snug text-on-surface md:text-4xl lg:text-[2.6rem]">
                {t('zm.hero.h1')}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-on-surface-variant">
                {t('zm.hero.subtitle')}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/book#contact-title"
                  className="rounded-lg bg-primary px-6 py-3 font-label text-sm font-semibold text-on-primary shadow-md transition-opacity hover:opacity-90"
                >
                  {t('hero.sendEnquiry')}
                </Link>
                <Link
                  to="/tours"
                  className="rounded-lg border border-primary/30 px-6 py-3 font-label text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
                >
                  {t('hero.exploreTours')}
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <img
                src="/images/zuzana-portrait.jpg"
                alt="Zuzana Manová, private Prague tour guide"
                className="h-80 w-64 rounded-2xl object-cover object-[center_20%] shadow-lg ring-2 ring-primary/10 sm:h-96 sm:w-72"
              />
            </motion.div>
          </div>
        </section>

        {/* Bio */}
        <section className="mx-auto max-w-4xl px-6 py-14 md:py-16">
          <h2 className="mb-6 font-headline text-2xl text-primary">{t('zm.bio.title')}</h2>
          <div className="space-y-4 text-on-surface-variant leading-relaxed">
            <p>{t('zm.bio.p1')}</p>
            <p>{t('zm.bio.p2')}</p>
            <p>{t('zm.bio.p3')}</p>
          </div>
        </section>

        {/* Credentials */}
        <section className="border-y border-outline-variant/15 bg-surface-container-lowest">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-14 sm:grid-cols-3">
            {(['zm.cred.1', 'zm.cred.2', 'zm.cred.3'] as const).map((key, i) => (
              <motion.div
                key={key}
                className="text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <span
                  className="material-symbols-outlined mx-auto mb-3 block text-3xl text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {i === 0 ? 'verified' : i === 1 ? 'synagogue' : 'translate'}
                </span>
                <h3 className="mb-1 font-headline text-lg text-on-surface">{t(`${key}.title` as any)}</h3>
                <p className="text-sm text-on-surface-variant">{t(`${key}.desc` as any)}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* What I offer */}
        <section className="mx-auto max-w-4xl px-6 py-14 md:py-16">
          <h2 className="mb-6 font-headline text-2xl text-primary">{t('zm.offer.title')}</h2>
          <div className="space-y-4 text-on-surface-variant leading-relaxed">
            <p>{t('zm.offer.p1')}</p>
            <p>{t('zm.offer.p2')}</p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(['zm.tour.1', 'zm.tour.2', 'zm.tour.3', 'zm.tour.4'] as const).map((key) => (
              <Link
                key={key}
                to="/tours"
                className="flex items-center gap-3 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="material-symbols-outlined text-xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  map
                </span>
                <span className="font-label text-sm font-semibold text-on-surface">{t(key as any)}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-outline-variant/15 bg-surface-container-low">
          <div className="mx-auto max-w-3xl px-6 py-14 md:py-16">
            <h2 className="mb-8 text-center font-headline text-2xl text-primary">{t('zm.faq.title')}</h2>
            <div className="space-y-4">
              {FAQ_KEYS.map(({ q, a }) => (
                <details
                  key={q}
                  className="group rounded-xl border border-outline-variant/20 bg-surface-container-lowest"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-headline text-base text-on-surface">
                    {t(q as any)}
                    <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">
                      expand_more
                    </span>
                  </summary>
                  <p className="px-6 pb-5 leading-relaxed text-on-surface-variant">{t(a as any)}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-14 text-on-primary">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="mb-3 font-headline text-3xl">{t('zm.cta.title')}</h2>
            <p className="mb-8 text-lg opacity-95">{t('zm.cta.subtitle')}</p>
            <Link
              to="/book#contact-title"
              className="inline-block rounded-lg bg-surface-container-lowest px-8 py-4 font-label text-base font-semibold text-primary shadow-md transition-opacity hover:opacity-95"
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
