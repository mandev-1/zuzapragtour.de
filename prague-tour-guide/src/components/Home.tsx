'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import TripAdvisorWidget from './TripAdvisorWidget';
import TourHqWidget from './TourHqWidget';

/* ─── Static review data ─────────────────────────────────────── */
const REVIEWS = [
  {
    de: {
      quote: 'Zuzanas persönliche Geschichte mit der Stadt macht diese Führung zu etwas völlig Einzigartigem. Absolut unvergesslich.',
      author: 'Thomas K.',
      source: 'TripAdvisor',
    },
    en: {
      quote: "Zuzana's personal connection to the city makes this tour something truly unique. Absolutely unforgettable.",
      author: 'David M.',
      source: 'TripAdvisor',
    },
  },
  {
    de: {
      quote: 'Ein absolutes Highlight unserer Europareise. Ihr Wissen über Architektur und Geschichte ist unübertroffen, und sie hält die Energie lebendig und mitreißend.',
      author: 'Monika H.',
      source: 'TourHQ Verifiziert',
    },
    en: {
      quote: 'An absolute highlight of our European trip. Her knowledge of architecture and history is unmatched, and she keeps the energy alive.',
      author: 'Sarah Jenkins',
      source: 'TourHQ Verified',
    },
  },
  {
    de: {
      quote: 'Perfekt für unsere Familie. Sie hat es geschafft, die Kinder mit lokalen Legenden zu faszinieren, während sie den Erwachsenen eine Meisterklasse in böhmischer Geschichte gab.',
      author: 'Familie Schneider',
      source: 'Private Buchung',
    },
    en: {
      quote: 'Perfect for our family. She managed to fascinate the kids with local legends while giving the adults a masterclass in Bohemian history.',
      author: 'The Thompsons',
      source: 'Private Booking',
    },
  },
];

/* ─── Tour rows ──────────────────────────────────────────────── */
const TOURS_DE = [
  {
    num: '01',
    title: 'Altstadt & Jüdisches Viertel',
    duration: '4 Stunden',
    meta: 'Private Gruppe',
    desc: 'Ein tiefes Eintauchen in das mittelalterliche Herz Prags, auf den Spuren von 1.000 Jahren Legenden und Überlieferungen.',
    slug: 'old-town-jewish-quarter',
  },
  {
    num: '02',
    title: 'Das alchemistische Prag',
    duration: '3 Stunden',
    meta: 'Versteckte Juwelen',
    desc: 'Entdecken Sie die mystische und geheimnisvolle Seite der Prager Geschichte, von der Astrologie bis zur Alchemie.',
    slug: 'alchemy-mysterious-prague',
  },
  {
    num: '03',
    title: 'Böhmische Kunst & Architektur',
    duration: '5 Stunden',
    meta: 'Expertenfokus',
    desc: 'Ein kuratierter Spaziergang durch Jugendstil, Kubismus und die barocke Pracht der Kleinseite.',
    slug: 'art-architecture-baroque',
  },
];

const TOURS_EN = [
  {
    num: '01',
    title: 'Old Town & Jewish Quarter',
    duration: '4 hours',
    meta: 'Private group',
    desc: 'A deep dive into the medieval heart of Prague, tracing 1,000 years of legends and lore.',
    slug: 'old-town-jewish-quarter',
  },
  {
    num: '02',
    title: 'Alchemical Prague',
    duration: '3 hours',
    meta: 'Hidden gems',
    desc: "Discover the mystical and mysterious side of Prague's history, from astrology to alchemy.",
    slug: 'alchemy-mysterious-prague',
  },
  {
    num: '03',
    title: 'Bohemian Art & Architecture',
    duration: '5 hours',
    meta: 'Expert focus',
    desc: 'A curated walk through Art Nouveau, Cubism, and the baroque splendour of Malá Strana.',
    slug: 'art-architecture-baroque',
  },
];

/* ─── Component ──────────────────────────────────────────────── */
const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const de = language !== 'en';
  const tours  = de ? TOURS_DE  : TOURS_EN;
  const reviews = REVIEWS.map(r => de ? r.de : r.en);

  React.useEffect(() => {
    if (window.location.hash === '#about') {
      window.setTimeout(() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }
  }, []);

  return (
    <div className="bg-[#fbf9f5] text-[#1b1c1a]">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center pt-16 pb-16 overflow-hidden">

        {/* Background image + scrim */}
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src={'/images/charles-bridge-hero-1600.jpg'}
            alt={t('home.hero.imageAlt')}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf9f5] via-[#fbf9f5]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">

          {/* Copy */}
          <div className="space-y-6">
            {/* Eyebrow pill */}
            <div className="inline-flex items-center space-x-2 bg-[#7b5800]/10 px-3 py-1 rounded-full font-bold text-xs tracking-widest uppercase text-[#7b5800]">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1", fontSize: '14px' }}
              >
                star
              </span>
              <span>{de ? 'Zertifizierte Expertin' : 'Certified Expert'}</span>
            </div>

            {/* H1 */}
            <h1 className="font-headline text-5xl md:text-7xl leading-tight font-bold text-[#1b1c1a]">
              {de ? (
                <>
                  Entdecken Sie <br />
                  <span className="italic text-[#6c0008]">Prag</span><br />
                  <span className="italic text-[#1b1c1a]">mit Zuzana Manová</span>
                </>
              ) : (
                <>
                  Discover <br />
                  <span className="italic text-[#6c0008]">Prague</span><br />
                  <span className="italic text-[#1b1c1a]">with Zuzana Manová</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-[#58413f] max-w-lg font-body leading-relaxed">
              {t('hero.subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book#contact-title"
                className="flex items-center justify-center gap-2 rounded-md px-8 py-3 text-lg font-bold text-white shadow-lg shadow-[#6c0008]/20"
                style={{ background: 'linear-gradient(135deg, #6c0008 0%, #8e1b1b 100%)' }}
              >
                {t('hero.sendEnquiry')}
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
              </Link>
              <Link
                href="/tours"
                className="flex items-center justify-center rounded-md bg-white/80 backdrop-blur-md border border-[#e0bfbc]/30 text-[#1b1c1a] px-8 py-3 text-lg font-semibold hover:bg-white transition-all"
              >
                {t('hero.exploreTours')}
              </Link>
            </div>
          </div>

          {/* Portrait card (desktop only) */}
          <div className="hidden lg:block relative">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#7b5800]/10 rounded-full blur-3xl" />
            <div className="relative z-10 bg-white p-4 rounded-xl shadow-2xl rotate-2 max-w-sm mx-auto">
              <img
                src={'/images/zuzana-portrait.jpg'}
                alt="Zuzana Manová"
                className="rounded-lg aspect-[4/5] object-cover w-full"
                style={{ objectPosition: 'center 20%' }}
              />
              <div
                className="absolute -bottom-6 -right-6 p-4 rounded-lg shadow-xl text-white max-w-[240px]"
                style={{ background: 'linear-gradient(135deg, #6c0008 0%, #8e1b1b 100%)' }}
              >
                <p className="font-headline italic text-base leading-snug">
                  {de
                    ? '"Prag ist eine vielschichtige Geschichte, lassen Sie uns diese gemeinsam lesen."'
                    : '"Prague is a layered story — let us read it together."'}
                </p>
                <p className="text-xs uppercase tracking-widest mt-2 opacity-80">— Zuzana</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tour Highlights ──────────────────────────────────── */}
      <section className="py-12 bg-[#f5f3ef]" id="tours">
        <div className="max-w-7xl mx-auto px-6">

          {/* Heading row */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="font-bold tracking-[0.2em] uppercase text-sm block mb-2 text-[#7b5800]">
                {t('home.tours.teaser.title')}
              </span>
              <h2 className="font-headline text-4xl font-bold text-[#1b1c1a]">
                {de ? 'Ausgewählte Erlebnisse' : 'Selected Experiences'}
              </h2>
            </div>
            <p className="font-body text-sm text-[#58413f] max-w-md leading-relaxed">
              {de
                ? 'Maßgeschneiderte Routen für anspruchsvolle Reisende, mit Fokus auf Authentizität, Geschichte und dem lokalen Puls der Stadt.'
                : 'Tailor-made routes for discerning travellers, focused on authenticity, history and the local pulse of the city.'}
            </p>
          </div>

          {/* Tour rows */}
          <div className="grid grid-cols-1 gap-1">
            {tours.map((tour, i) => (
              <div
                key={tour.num}
                className={`group bg-[#fbf9f5] py-6 px-8 flex flex-col md:flex-row justify-between items-center transition-all hover:bg-white${i < tours.length - 1 ? ' border-b border-[#e0bfbc]/20' : ''}`}
              >
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                  <span className="text-3xl font-headline italic text-[#e0bfbc] group-hover:text-[#6c0008] transition-colors">
                    {tour.num}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-[#6c0008] transition-colors">
                      {tour.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#7b5800]">
                        <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>schedule</span>
                        {tour.duration}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#58413f]">
                        <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>group</span>
                        {tour.meta}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <p className="hidden lg:block text-[#58413f] max-w-xs text-xs leading-relaxed font-body">
                    {tour.desc}
                  </p>
                  <Link
                    href={`/book?tour=${encodeURIComponent(tour.title)}#contact-title`}
                    className="text-[#6c0008] font-bold flex items-center gap-1 text-sm whitespace-nowrap"
                  >
                    {de ? 'Details' : 'Details'}
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform" style={{ fontSize: '18px' }}>chevron_right</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Zuzana ─────────────────────────────────────── */}
      <section className="py-12 overflow-hidden" id="about">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Portrait column */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-xl overflow-hidden aspect-[3/4] relative z-10 shadow-2xl bg-[#eae8e4]">
                <img
                  className="w-full h-full object-cover"
                  src={'/images/zuzana-portrait.jpg'}
                  alt="Zuzana Manová"
                  style={{ objectPosition: 'center 20%' }}
                  loading="lazy"
                />
              </div>
              {/* Decorative border offset */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 border-4 border-[#7b5800]/20 rounded-lg -z-0" />
              {/* Watermark */}
              <div className="absolute top-1/2 -left-10 -translate-y-1/2 hidden xl:block">
                <span className="font-headline italic select-none text-[#e4e2de]/50"
                  style={{ fontSize: '8rem', lineHeight: 1 }}>
                  Zuzana
                </span>
              </div>
            </div>

            {/* Copy column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="font-bold tracking-[0.2em] uppercase text-sm text-[#6c0008]">
                  {de ? 'Lernen Sie Zuzana kennen' : 'Meet Zuzana'}
                </span>
                <h2 className="font-headline text-4xl font-bold text-[#1b1c1a] leading-tight">
                  {de
                    ? <>Prag, erzählt mit <span className="italic font-normal">Leidenschaft</span></>
                    : <>Prague, told with <span className="italic font-normal">passion</span></>}
                </h2>
              </div>

              <div className="space-y-4 text-base text-[#58413f] font-body leading-relaxed">
                <p>{t('about.intro')}</p>
                <p>{t('about.expertise')}</p>
                <p>{t('about.promise')}</p>
              </div>

              {/* Stat grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                <div>
                  <p className="font-headline text-2xl text-[#6c0008] font-bold">40+</p>
                  <p className="text-[10px] uppercase tracking-widest text-[#58413f] font-bold">
                    {de ? 'Jahre Erfahrung' : 'Years guiding'}
                  </p>
                </div>
                <div>
                  <p className="font-headline text-2xl text-[#6c0008] font-bold">4,9k</p>
                  <p className="text-[10px] uppercase tracking-widest text-[#58413f] font-bold">
                    {de ? 'Touren kuratiert' : 'Tours curated'}
                  </p>
                </div>
                <div>
                  <p className="font-headline text-2xl text-[#6c0008] font-bold">5,0</p>
                  <p className="text-[10px] uppercase tracking-widest text-[#58413f] font-bold">
                    {de ? 'Sterne Bewertung' : 'Star rating'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── City Gallery ─────────────────────────────────────── */}
      <section className="py-12 bg-[#1b1c1a] text-[#fbf9f5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10 space-y-2">
            <span className="font-bold tracking-[0.2em] uppercase text-sm text-[#fdc34d]">
              {de ? 'Von meinen Gästen' : 'From my guests'}
            </span>
            <h2 className="font-headline text-4xl font-bold italic">
              {de ? 'Fotos von unseren Touren' : 'Photos from our tours'}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ height: 600 }}>
            <div className="col-span-2 row-span-2 overflow-hidden relative group rounded-lg">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={'/images/guest-photo-tourguide.jpg'}
                alt="Zuzana with guests on a Prague tour"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#6c0008]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="overflow-hidden relative group rounded-lg">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={'/images/guest-photo-night.jpeg'}
                alt="Prague at night"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden relative group rounded-lg">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={'/images/guest-photo-food.jpeg'}
                alt="Czech food on a Prague tour"
                loading="lazy"
              />
            </div>
            <div className="col-span-2 overflow-hidden relative group rounded-lg">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={'/images/blog-boat-prague.jpg'}
                alt="Boat on the Vltava river in Prague"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof ─────────────────────────────────────── */}
      <section className="py-12 bg-[#efeeea]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10 space-y-2">
            {/* Stars */}
            <div className="flex justify-center items-center gap-2 text-[#7b5800] mb-2">
              {[1,2,3,4,5].map(s => (
                <span
                  key={s}
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1", fontSize: '18px' }}
                >
                  star
                </span>
              ))}
            </div>
            <h2 className="font-headline text-3xl font-bold text-[#1b1c1a]">
              {de ? 'Unvergessliche Erinnerungen' : 'Unforgettable Memories'}
            </h2>
            <p className="text-[#58413f] uppercase tracking-widest text-[10px] font-bold">
              {t('home.reviews.groupTitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {reviews.map((review, i) => (
              <div key={i} className="bg-[#fbf9f5] p-6 rounded-xl shadow-lg shadow-[#1b1c1a]/5 flex flex-col justify-between">
                <p className="text-[#58413f] font-body italic mb-6 text-sm leading-relaxed">
                  "{review.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e4e2de] flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-sm text-[#58413f]">{review.author[0]}</span>
                  </div>
                  <div>
                    <p className="font-bold text-xs">{review.author}</p>
                    <p className="text-[9px] text-[#7b5800] font-bold uppercase tracking-widest">{review.source}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Widget strip */}
          <div className="border-t border-[#e0bfbc] pt-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <TripAdvisorWidget />
              <TourHqWidget />
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div
          className="max-w-5xl mx-auto rounded-[1.5rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #6c0008 0%, #8e1b1b 100%)' }}
        >
          {/* Texture overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden rounded-[1.5rem]">
            <img
              className="w-full h-full object-cover mix-blend-overlay"
              src={'/images/prague-castle.jpg'}
              alt=""
              aria-hidden="true"
              loading="lazy"
            />
          </div>

          <div className="relative z-10 space-y-6">
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-white leading-tight">
              {de ? <>Bereit, Prag <br /> zu entdecken?</> : <>Ready to discover <br /> Prague?</>}
            </h2>
            <p className="text-base text-white/80 max-w-2xl mx-auto font-body">
              {de
                ? 'Begrenzte Verfügbarkeit für private Buchungen. Kontaktieren Sie Zuzana noch heute, um Ihre individuelle Reiseroute zu planen.'
                : 'Limited availability for private bookings. Contact Zuzana today to plan your personal itinerary.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book#contact-title"
                className="bg-white text-[#6c0008] px-8 py-3 rounded-md text-base font-bold hover:bg-[#fbf9f5] transition-all shadow-xl"
              >
                {t('hero.sendEnquiry')}
              </Link>
              <Link
                href="/tours"
                className="bg-transparent border border-white/40 text-white px-8 py-3 rounded-md text-base font-bold hover:bg-white/10 transition-all"
              >
                {t('hero.exploreTours')}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
