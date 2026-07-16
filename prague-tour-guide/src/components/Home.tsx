'use client';

/**
 * Home — premium "quiet-luxury editorial" homepage (0003 direction).
 *
 * Cinematic full-bleed Vltava hero (Ken-Burns + corner seal) under the
 * transparent-over-photo Header, a faint-star manifesto band, an interactive
 * tour list (left) ↔ sticky preview (right) driven by the REAL tour catalogue
 * (src/data/tours.ts), an about band with an offset brass portrait frame, a
 * dark gallery, hairline-column reviews (+ the live TripAdvisor/TourHQ widgets),
 * and a full-bleed burgundy CTA. Built on the shared SiteUI primitives.
 */

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { tours } from '../data/tours';
import TripAdvisorWidget from './TripAdvisorWidget';
import TourHqWidget from './TourHqWidget';
import { Kicker, Reveal, Btn, ULink, Stat, SHELL } from './site/SiteUI';

/* ─── Static testimonial data ────────────────────────────────── */
const REVIEWS = [
  { de: { quote: 'Zuzanas persönliche Geschichte mit der Stadt macht diese Führung zu etwas völlig Einzigartigem. Absolut unvergesslich.', who: 'Thomas K.', src: 'TripAdvisor' },
    en: { quote: "Zuzana's personal connection to the city makes this tour something truly unique. Absolutely unforgettable.", who: 'David M.', src: 'TripAdvisor' } },
  { de: { quote: 'Ein absolutes Highlight unserer Europareise. Ihr Wissen über Architektur und Geschichte ist unübertroffen.', who: 'Monika H.', src: 'TourHQ Verifiziert' },
    en: { quote: 'An absolute highlight of our European trip. Her knowledge of architecture and history is unmatched.', who: 'Sarah Jenkins', src: 'TourHQ Verified' } },
  { de: { quote: 'Perfekt für unsere Familie. Sie hat die Kinder mit lokalen Legenden fasziniert.', who: 'Familie Schneider', src: 'Private Buchung' },
    en: { quote: 'Perfect for our family. She fascinated the kids with local legends.', who: 'The Thompsons', src: 'Private Booking' } },
];

const GALLERY = [
  { src: '/images/guest-tourguide.jpg', de: 'Zuzana mit Gästen', en: 'Zuzana with guests', cls: 'col-span-2 row-span-2', delay: 0 },
  { src: '/images/guest-night.jpeg', de: 'Prag bei Nacht', en: 'Prague at night', cls: '', delay: 80 },
  { src: '/images/guest-food.jpeg', de: 'Böhmische Küche', en: 'Bohemian cuisine', cls: '', delay: 160 },
  { src: '/images/boat-vltava.jpg', de: 'Boot auf der Moldau', en: 'Boat on the Vltava', cls: 'col-span-2', delay: 80 },
];

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const de = language !== 'en';
  const reviews = REVIEWS.map((r) => (de ? r.de : r.en));
  const [activeTour, setActiveTour] = React.useState(0);

  React.useEffect(() => {
    if (window.location.hash === '#about') {
      window.setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
    }
  }, []);

  return (
    <div className="home-premium-root bg-paper text-ink antialiased">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <picture>
            {/* Desktop hero */}
            <source media="(min-width: 768px)" srcSet="/images/prague-old-town-square-tourist.jpg" />
            {/* Mobile keeps the Vltava-bridges hero */}
            <img
              src="/images/vltava-bridges-hero.jpg"
              alt={de ? 'Prag im goldenen Abendlicht' : 'Prague in golden evening light'}
              className="absolute inset-0 h-full w-full animate-kenburns object-cover [object-position:center_42%] motion-reduce:animate-none"
              fetchPriority="high"
            />
          </picture>
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(20,16,12,0.78) 0%, rgba(20,16,12,0.12) 42%, rgba(20,16,12,0.18) 100%), linear-gradient(to right, rgba(20,16,12,0.55) 0%, transparent 55%)' }}
          />
        </div>

        <div className="absolute bottom-[clamp(3rem,7vh,6rem)] right-[clamp(1.5rem,5vw,5rem)] z-[2] hidden h-[132px] w-[132px] place-items-center rounded-full border border-ivory/40 text-center font-sans text-[9px] uppercase leading-[2.1] tracking-[0.22em] text-ivory backdrop-blur-[2px] sm:grid">
          <div>
            Certified
            <span className="my-[0.1rem] block font-display text-2xl tracking-normal">Prague</span>
            Est. 1986
          </div>
        </div>

        <div className={`relative z-[2] w-full pb-[clamp(3rem,7vh,6rem)] pt-32 ${SHELL}`}>
          <span className="mb-7 inline-flex items-center gap-[0.9rem] font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-ivory">
            <span className="h-px w-7 bg-gold-lamp" aria-hidden />
            {de ? 'Zertifizierte Prag-Expertin' : 'Certified Prague Expert'}
          </span>
          <h1 className="m-0 font-display text-[clamp(3.2rem,8.5vw,7rem)] font-normal leading-[0.98] tracking-[-0.02em] text-ivory [text-wrap:balance]">
            {de ? <>Entdecken Sie<br /><em className="font-italic italic">Prag</em>, äusserst interessant.</> : <>Discover<br /><em className="font-italic italic">Prague</em>, privately.</>}
          </h1>
          <p className="mb-[2.6rem] mt-[1.8rem] max-w-[32rem] font-body text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.6] text-ivory/90">
            {de
              ? 'Private Stadtführungen mit Zuzana Manová — vierzig Jahre Geschichten, für ein Publikum von einem.'
              : 'Private city tours with Zuzana Manová — forty years of stories, for an audience of one.'}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Btn href="/book#contact-title" variant="cream" arrow>{t('hero.sendEnquiry')}</Btn>
            <ULink href="/tours" onDark arrow={false}>{t('hero.exploreTours')}</ULink>
          </div>
        </div>
      </section>

      {/* ── Manifesto (faint star geometry behind the quote) ─── */}
      <section className={`relative overflow-hidden py-[clamp(3.25rem,6vh,4.75rem)] text-center ${SHELL}`}>
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center gap-[clamp(0.75rem,3vw,2.25rem)] text-brass opacity-[0.08]">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="text-[clamp(3.25rem,11vw,8rem)] leading-none">★</span>
          ))}
        </div>
        <div className="relative z-[1]">
          <Kicker center>{de ? 'Eine persönliche Einladung' : 'A personal invitation'}</Kicker>
          <p className="mx-auto mt-4 max-w-[44rem] font-italic text-[clamp(1.45rem,2.6vw,2.1rem)] italic leading-[1.32] text-ink">
            {de
              ? <>„Prag ist eine vielschichtige Geschichte — <em className="text-burgundy">lassen Sie uns diese gemeinsam lesen.</em>“</>
              : <>“Prague is a layered story — <em className="text-burgundy">let us read it together.</em>”</>}
          </p>
          <div className="mt-[1.1rem] font-sans text-[11px] uppercase tracking-[0.24em] text-ink-mute">— Ing. Zuzana Manová</div>
        </div>
      </section>

      {/* ── Tours (real catalogue: list ↔ sticky preview) ────── */}
      <section id="tours" className="border-t border-rule py-[clamp(3rem,7vh,6rem)] pb-[clamp(4rem,9vh,7rem)]">
        <div className={SHELL}>
          <div className="mb-[clamp(2.5rem,5vh,4rem)] flex flex-wrap items-end justify-between gap-8">
            <div>
              <Kicker>{t('home.tours.teaser.title')}</Kicker>
              <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-normal leading-[1.04] tracking-[-0.015em]">
                {de ? <>Jede Tour beginnt<br />mit Ihrer <em className="font-italic italic text-burgundy">Neugier</em>.</> : <>Every tour begins<br />with your <em className="font-italic italic text-burgundy">curiosity</em>.</>}
              </h2>
            </div>
            <p className="max-w-[24rem] font-body text-base leading-[1.65] text-ink-mute">
              {de
                ? 'Maßgeschneiderte Routen für anspruchsvolle Reisende — Authentizität, Geschichte und der lokale Puls der Stadt.'
                : 'Tailor-made routes for discerning travellers — authenticity, history and the local pulse of the city.'}
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-[clamp(2rem,5vw,4.5rem)] min-[900px]:grid-cols-[1.05fr_0.95fr]">
            <ul className="m-0 list-none border-t border-rule p-0">
              {tours.map((tr, i) => {
                const active = activeTour === i;
                const title = t(tr.titleKey as any);
                return (
                  <li key={tr.id} className="border-b border-rule">
                    <Link
                      href={`/tours/${de ? tr.slugDe : tr.slug}`}
                      aria-label={`${title} — ${t(tr.durationKey as any)}. ${de ? 'Details ansehen' : 'View details'}.`}
                      onMouseEnter={() => setActiveTour(i)}
                      onFocus={() => setActiveTour(i)}
                      className={`group mx-[-1.2rem] my-[0.4rem] grid grid-cols-[auto_1fr_auto_auto] items-center gap-6 rounded-lg px-[1.2rem] py-[1.55rem] no-underline transition-[background-color,box-shadow] duration-300 ease-brand ${active ? 'bg-[#FDFAF3] shadow-[0_18px_40px_rgba(26,23,20,0.12)]' : 'bg-transparent shadow-none'}`}
                    >
                      <span className={`w-[2.2rem] font-display text-base transition-colors duration-300 ${active ? 'text-burgundy' : 'text-brass-deep'}`}>{String(i + 1).padStart(2, '0')}</span>
                      <span className={`min-w-0 font-display text-[clamp(1.35rem,2.2vw,1.9rem)] font-normal leading-[1.12] transition-colors duration-300 ${active ? 'text-burgundy' : 'text-ink'}`}>{title}</span>
                      <span className="hidden whitespace-nowrap font-sans text-[10.5px] uppercase tracking-[0.18em] text-ink-mute min-[900px]:inline">{t(tr.durationKey as any)}</span>
                      <span aria-hidden className={`material-symbols-outlined text-[18px] transition-[opacity,transform] duration-300 ${active ? 'translate-x-0 text-burgundy opacity-100' : '-translate-x-1.5 text-brass-deep opacity-0'}`}>arrow_forward</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div aria-hidden className="sticky top-[120px] hidden aspect-[4/5] overflow-hidden rounded-lg bg-ivory-deep shadow-[0_18px_40px_rgba(26,23,20,0.12)] min-[900px]:block">
              {tours.map((tr, i) => (
                <figure key={tr.id} className={`absolute inset-0 m-0 transition-opacity duration-700 ease-brand ${activeTour === i ? 'opacity-100' : 'opacity-0'}`}>
                  <img src={tr.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(20,16,12,0.72)] to-transparent px-[1.6rem] pb-[1.4rem] pt-[2.4rem] font-italic text-[1.1rem] italic text-ivory">{t(tr.descriptionKey as any)}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────── */}
      <section id="about" className="bg-ivory-deep py-[clamp(4rem,9vh,7rem)]">
        <div className={`${SHELL} grid grid-cols-1 items-center gap-[clamp(2.5rem,6vw,5.5rem)] min-[820px]:grid-cols-[0.92fr_1.08fr]`}>
          <Reveal className="relative">
            <div className="absolute border border-brass" style={{ top: '14px', right: '-14px', bottom: '-14px', left: '14px' }} aria-hidden />
            <img src="/images/zuzana-portrait.jpg" alt="Zuzana Manová" loading="lazy" className="relative aspect-[4/5] w-full object-cover [object-position:center_18%]" />
          </Reveal>

          <div>
            <Reveal><Kicker>{de ? 'Lernen Sie Zuzana kennen' : 'Meet Zuzana'}</Kicker></Reveal>
            <Reveal delay={80}>
              <h2 className="mb-[1.6rem] mt-4 font-display text-[clamp(2.2rem,4vw,3.2rem)] font-normal leading-[1.04] tracking-[-0.015em]">
                {de ? <>Prag, erzählt mit <em className="font-italic italic text-burgundy">Leidenschaft</em>.</> : <>Prague, told with <em className="font-italic italic text-burgundy">passion</em>.</>}
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mb-[1.6rem] font-italic text-[1.55rem] italic leading-[1.45] text-burgundy">{t('about.intro')}</p>
            </Reveal>
            <Reveal delay={160}>
              <p className="mb-[1.2rem] font-body text-[1.075rem] leading-[1.78] text-ink-soft">{t('about.expertise')}</p>
              <p className="mb-[1.2rem] font-body text-[1.075rem] leading-[1.78] text-ink-soft">{t('about.promise')}</p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-[2.4rem] flex flex-wrap gap-[clamp(1.5rem,4vw,3.5rem)] border-t border-rule pt-8">
                <Stat n="40+" label={de ? 'Jahre Erfahrung' : 'Years guiding'} />
                <Stat n="4,9k" label={de ? 'Touren kuratiert' : 'Tours curated'} />
                <Stat n="5,0" label={de ? 'Sterne Bewertung' : 'Star rating'} />
              </div>
              <div className="mt-8">
                <ULink href="/zuzana-manova">{de ? 'Mehr über Zuzana' : 'More about Zuzana'}</ULink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────── */}
      <section className="bg-ink py-[clamp(4rem,9vh,7rem)] text-ivory">
        <div className={SHELL}>
          <Reveal><Kicker tone="lamp">{de ? 'Von meinen Gästen' : 'From my guests'}</Kicker></Reveal>
          <Reveal delay={80}>
            <h2 className="mt-[0.8rem] font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.04] tracking-[-0.015em] text-ivory">
              {de ? <>Augenblicke <em className="font-italic italic text-gold-lamp">unterwegs</em></> : <>Moments <em className="font-italic italic text-gold-lamp">along the way</em></>}
            </h2>
          </Reveal>
          <div className="mt-[clamp(2rem,4vh,3rem)] grid auto-rows-[170px] grid-cols-2 gap-[14px] min-[760px]:auto-rows-[230px] min-[760px]:grid-cols-4">
            {GALLERY.map((g) => (
              <Reveal as="figure" key={g.src} delay={g.delay} className={`group relative m-0 overflow-hidden ${g.cls}`}>
                <img src={g.src} alt={de ? g.de : g.en} loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] ease-brand group-hover:scale-[1.07]" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews (hairline columns + verified widgets) ────── */}
      <section className="border-t border-rule py-[clamp(4rem,9vh,7rem)]">
        <div className={SHELL}>
          <div className="mb-[clamp(2.5rem,5vh,4rem)] text-center">
            <div className="mb-5 flex justify-center gap-[5px] text-gold-olive">
              {[0, 1, 2, 3, 4].map((s) => (
                <span key={s} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </div>
            <Kicker center>{de ? 'Unvergessliche Erinnerungen' : 'Unforgettable memories'}</Kicker>
            <h2 className="mt-[0.8rem] font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.04] tracking-[-0.015em]">
              {de ? 'Worte meiner Gäste' : 'Words from my guests'}
            </h2>
          </div>

          <div className="grid grid-cols-1 border-t border-rule min-[820px]:grid-cols-3">
            {reviews.map((review, i) => (
              <Reveal
                key={i}
                delay={i * 80}
                className={`flex flex-col px-[clamp(1.4rem,2.5vw,2.4rem)] py-[2.6rem] ${i < reviews.length - 1 ? 'border-b border-rule min-[820px]:border-b-0 min-[820px]:border-r' : ''}`}
              >
                <p className="mb-[1.8rem] flex-1 font-italic text-[1.2rem] italic leading-[1.5] text-ink">„{review.quote}“</p>
                <div className="font-sans text-xs font-semibold tracking-[0.04em] text-ink">{review.who}</div>
                <div className="mt-[0.35rem] font-sans text-[10px] uppercase tracking-[0.2em] text-brass-deep">{review.src}</div>
              </Reveal>
            ))}
          </div>

          <div className="mt-[clamp(2.5rem,5vh,4rem)] grid grid-cols-1 gap-8 border-t border-rule pt-[clamp(2.5rem,5vh,4rem)] lg:grid-cols-2">
            <TripAdvisorWidget />
            <TourHqWidget />
          </div>
        </div>
      </section>

      {/* ── CTA (full-bleed) ─────────────────────────────────── */}
      <section className="relative overflow-hidden py-[clamp(5rem,13vh,9rem)] text-center text-ivory">
        <div className="absolute inset-0 z-0">
          <img src="/images/charles-bridge-statue.jpg" alt="" aria-hidden className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(79,22,32,0.82), rgba(20,16,12,0.86))' }} />
        </div>
        <div className={`relative z-[2] ${SHELL}`}>
          <Kicker center tone="lamp">{de ? 'Zertifizierte Expertin · 40 Jahre' : 'Certified Expert · 40 Years'}</Kicker>
          <h2 className="mx-auto mb-[1.6rem] mt-[1.4rem] max-w-[18ch] font-display text-[clamp(2.4rem,5vw,4rem)] font-normal leading-[1.04] tracking-[-0.015em] text-ivory">
            {de ? <>Bereit, Prag zu <em className="font-italic italic text-ivory">entdecken</em>?</> : <>Ready to <em className="font-italic italic text-ivory">discover</em> Prague?</>}
          </h2>
          <p className="mx-auto mb-[2.6rem] max-w-[38rem] font-body text-[1.1rem] leading-[1.65] text-ivory/80">
            {de
              ? 'Begrenzte Verfügbarkeit für private Buchungen. Kontaktieren Sie Zuzana noch heute, um Ihre individuelle Reiseroute zu planen.'
              : 'Limited availability for private bookings. Contact Zuzana today to plan your personal itinerary.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Btn href="/book#contact-title" variant="cream" arrow>{t('hero.sendEnquiry')}</Btn>
            <ULink href="tel:+420721231933" onDark arrow={false}>+420 721 231 933</ULink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
