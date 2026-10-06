'use client';

/**
 * HomeMobileV2 — the new mobile homepage (design_handoff_home_mobile), shown
 * below 900px to visitors in variant B of the homepage A/B test (see
 * src/config/abTest.ts). Desktop keeps the existing Home in both variants.
 *
 * Hero with a WhatsApp CTA → "Welche Tour passt zu Ihnen?" tiles → six tour
 * cards (each with its own WhatsApp enquiry) → reviews + guest photos → short
 * About → 3-step enquiry → its own footer, plus a sticky WhatsApp bar.
 * Section ids differ from Home's (both are in the DOM; CSS hides one).
 */

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { tours } from '../data/tours';
import { BRAND } from '../brand';
import { REVIEWS, GALLERY } from './Home';
import HomeHeroPicture from './HomeHeroPicture';
import { Kicker, SHELL } from './site/SiteUI';
import { Portrait } from './site/Portrait';

/** Tour cards in the order of the design, with in-page anchors and thumbnails. */
const TOUR_CARDS: { id: string; anchor: string; thumb: string }[] = [
  { id: 'oldtown', anchor: 'tour-altstadt', thumb: '/images/thumbs/blog-jewish-quarter-2-min.jpg' },
  { id: 'castle', anchor: 'tour-burg', thumb: '/images/thumbs/prague-castle.jpg' },
  { id: 'german', anchor: 'tour-erbe', thumb: '/images/thumbs/prague-castle-cathedral.jpg' },
  { id: 'havel', anchor: 'tour-havel', thumb: '/images/thumbs/havel-tour.jpg' },
  { id: 'hidden', anchor: 'tour-versteckt', thumb: '/images/thumbs/blog-hidden-gems-min.jpg' },
  { id: 'custom', anchor: 'tour-individuell', thumb: '/images/thumbs/blog-night-prague-min.jpg' },
];

const AUDIENCE: { key: string; anchor: string }[] = [
  { key: 'first', anchor: 'tour-burg' },
  { key: 'pace', anchor: 'tour-altstadt' },
  { key: 'history', anchor: 'tour-erbe' },
  { key: 'groups', anchor: 'tour-individuell' },
];

/** The 4 guest photos as a strip (480px thumbnails are plenty at 160–220px). */
const STRIP = [
  { src: '/images/thumbs/guest-tourguide.jpg', w: 220 },
  { src: '/images/thumbs/guest-night.jpeg', w: 160 },
  { src: '/images/thumbs/guest-food.jpeg', w: 160 },
  { src: '/images/thumbs/boat-vltava.jpg', w: 220 },
];

function Icon({ name, size, fill, className = '' }: { name: string; size: number; fill?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined shrink-0 ${className}`}
      style={{ fontSize: size, ...(fill ? { fontVariationSettings: "'FILL' 1" } : {}) }}
    >
      {name}
    </span>
  );
}

const PRIMARY_ON_DARK =
  'flex min-h-[56px] items-center justify-center gap-[10px] bg-ivory px-5 font-sans text-[13px] font-semibold uppercase tracking-[0.16em] text-ink no-underline transition-colors duration-300 ease-brand hover:bg-white hover:text-ink';
const H2 = 'm-0 mt-[14px] font-display text-[clamp(2.1rem,4vw,3.2rem)] font-normal leading-[1.04] tracking-[-0.015em]';

const HomeMobileV2: React.FC = () => {
  const { t, language } = useLanguage();
  const de = language !== 'en';
  const reviews = REVIEWS.map((r) => (de ? r.de : r.en));
  const waBase = `https://wa.me/${BRAND.phoneRaw.replace(/\D/g, '')}?text=`;
  const waGeneral = waBase + encodeURIComponent(t('home.m.waMsg' as any));
  const waTour = (name: string) => waBase + encodeURIComponent(t('home.m.waMsgTour' as any).replace('{name}', name));

  // Sticky WhatsApp bar: after the hero (same threshold as the solid header)
  // and until the enquiry section comes into view.
  const enquiryRef = React.useRef<HTMLElement>(null);
  const [showBar, setShowBar] = React.useState(false);
  React.useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      const end = enquiryRef.current;
      setShowBar(window.scrollY > vh * 0.7 && (!end || end.getBoundingClientRect().top > vh - 40));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="bg-paper text-ink antialiased">
      {/* ── 1 · Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <HomeHeroPicture alt={de ? 'Prag im goldenen Abendlicht' : 'Prague in golden evening light'} />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(20,16,12,0.84) 0%, rgba(20,16,12,0.2) 48%, rgba(20,16,12,0.18) 100%), linear-gradient(to right, rgba(20,16,12,0.5) 0%, transparent 60%)',
            }}
          />
        </div>
        <div className={`relative z-[2] ${SHELL} pb-[clamp(2.25rem,5vh,4.5rem)] pt-[112px]`}>
          <span className="mb-[22px] inline-flex items-center gap-[0.9rem] font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-ivory">
            <span aria-hidden="true" className="h-px w-7 bg-gold-lamp" />
            {t('home.m.eyebrow' as any)}
          </span>
          <h1 className="m-0 font-display text-[clamp(3rem,13vw,6.5rem)] font-normal leading-[0.98] tracking-[-0.02em] text-ivory [text-wrap:balance]">
            {t('home.m.h1' as any)} <em className="font-italic italic">{t('home.m.h1Em' as any)}</em>
          </h1>
          <p className="m-0 mt-5 max-w-[32rem] font-body text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.6] text-ivory/[0.92]">
            {t('home.m.sub' as any)}
          </p>
          <ul className="m-0 mt-5 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 font-sans text-[13.5px] font-medium leading-[1.4] text-ivory">
            <li className="flex items-center gap-[7px]">
              <Icon name="star" size={17} fill className="text-gold-lamp" />
              {t('home.m.proofRating' as any)}
            </li>
            <li className="flex items-center gap-[7px]">
              <Icon name="check" size={17} className="text-gold-lamp" />
              {t('home.m.proofPrivate' as any)}
            </li>
          </ul>
          <div className="mt-7">
            <a href={waGeneral} target="_blank" rel="noopener noreferrer" className={PRIMARY_ON_DARK}>
              <Icon name="chat" size={20} />
              {t('home.m.ctaWhatsapp' as any)}
            </a>
            <p className="m-0 mt-3 text-center font-italic text-[18px] italic leading-[1.35] text-ivory/[0.88]">
              {t('hero.responsePromise')}
            </p>
          </div>
        </div>
      </section>

      {/* ── 2 · Welche Tour passt zu Ihnen? ──────────────────────── */}
      <section id="fuer-wen" className="pb-[clamp(2.5rem,6vh,4rem)] pt-[clamp(3rem,7vh,5rem)]">
        <div className={SHELL}>
          <Kicker>{t('home.m.audience.kicker' as any)}</Kicker>
          <h2 className={H2}>
            {t('home.m.audience.title' as any)} <em className="font-italic italic text-burgundy">{t('home.m.audience.titleEm' as any)}</em>?
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-[10px]">
            {AUDIENCE.map((a) => (
              <a
                key={a.key}
                href={`#${a.anchor}`}
                className="flex min-h-[132px] flex-col justify-between gap-[14px] border border-rule bg-[#FDFAF3] px-[14px] py-4 no-underline transition-colors duration-300 ease-brand hover:border-brass"
              >
                <span className="font-display text-[22px] leading-[1.1] text-ink">{t(`home.m.audience.${a.key}.title` as any)}</span>
                <span className="flex items-end justify-between gap-2 font-body text-[14px] leading-[1.4] text-ink-mute">
                  {t(`home.m.audience.${a.key}.sub` as any)}
                  <Icon name="arrow_forward" size={17} className="text-brass-deep" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 · Tours ────────────────────────────────────────────── */}
      <section id="touren" className="border-t border-rule py-[clamp(3rem,7vh,5rem)]">
        <div className={SHELL}>
          <Kicker>{t('home.tours.teaser.title')}</Kicker>
          <h2 className={H2}>
            {t('home.m.tours.title' as any)} <em className="font-italic italic text-burgundy">{t('home.m.tours.titleEm' as any)}</em>.
          </h2>
          <p className="m-0 mt-[14px] font-body text-[16px] leading-[1.6] text-ink-mute">{t('home.m.tours.sub' as any)}</p>
          <ul className="m-0 mt-[22px] list-none border-t border-rule p-0">
            {TOUR_CARDS.map((card) => {
              const tour = tours.find((x) => x.id === card.id);
              if (!tour) return null;
              const name = t(`tour.${card.id}.shortTitle` as any);
              const href = `/tours/${de ? tour.slugDe : tour.slug}`;
              return (
                <li
                  key={card.id}
                  id={card.anchor}
                  className="grid scroll-mt-[84px] grid-cols-[104px_minmax(0,1fr)] items-start gap-4 border-b border-rule pb-[14px] pt-5"
                >
                  <Link href={href} tabIndex={-1} aria-hidden="true">
                    <img src={card.thumb} alt="" loading="lazy" className="block h-[132px] w-[104px] rounded-[4px] bg-ivory-deep object-cover" />
                  </Link>
                  <div className="min-w-0">
                    <Link href={href} className="block font-display text-[24px] leading-[1.08] text-ink no-underline">
                      {name}
                    </Link>
                    <div className="mt-[7px] font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-brass-deep">
                      {t(tour.durationKey as any)}
                    </div>
                    <p className="m-0 mt-[7px] font-body text-[14.5px] leading-[1.5] text-ink-soft">{t(`tour.${card.id}.homePlaces` as any)}</p>
                    <div className="mt-2 flex items-start gap-[6px] font-sans text-[13.5px] font-medium leading-[1.35] text-burgundy">
                      <Icon name="check" size={17} />
                      {t(`tour.${card.id}.homeBenefit` as any)}
                    </div>
                    <a
                      href={waTour(name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-[2px] inline-flex min-h-[44px] items-center gap-2 border-b border-ink pt-2 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-ink no-underline"
                    >
                      <Icon name="chat" size={18} />
                      {t('home.m.tours.ask' as any)}
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── 4 · Reviews ──────────────────────────────────────────── */}
      <section id="stimmen" className="bg-ink py-[clamp(3.5rem,8vh,6rem)] text-ivory">
        <div className={SHELL}>
          <Kicker tone="lamp">{t('home.m.reviews.kicker' as any)}</Kicker>
          <h2 className={`${H2} text-ivory`}>
            {t('home.m.reviews.title' as any)} <em className="font-italic italic text-gold-lamp">{t('home.m.reviews.titleEm' as any)}</em>
          </h2>
          <a
            href={BRAND.tripadvisor}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-[44px] flex-wrap items-center gap-x-3 gap-y-[6px] font-sans text-[15px] font-medium text-ivory no-underline hover:text-ivory"
          >
            <span aria-hidden="true" className="flex gap-[2px] text-gold-lamp">
              {[0, 1, 2, 3, 4].map((i) => (
                <Icon key={i} name="star" size={18} fill />
              ))}
            </span>
            {t('home.m.reviews.rating' as any)}
          </a>
        </div>
        <div className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[clamp(1.5rem,5vw,5rem)] pb-[2px] [scroll-padding-inline:clamp(1.5rem,5vw,5rem)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {reviews.map((r) => (
            <figure
              key={r.who}
              className="m-0 flex max-w-[360px] flex-[0_0_82%] snap-start flex-col justify-between gap-5 border border-ivory/[0.18] px-5 py-[22px]"
            >
              <blockquote className="m-0 font-italic text-[20px] italic leading-[1.45] text-ivory">„{r.quote}“</blockquote>
              <figcaption>
                <div className="font-sans text-[13px] font-semibold tracking-[0.04em] text-ivory">{r.who}</div>
                <div className="mt-1 font-sans text-[10px] uppercase tracking-[0.2em] text-gold-lamp">{r.src}</div>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-3 flex gap-[10px] overflow-x-auto px-[clamp(1.5rem,5vw,5rem)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {STRIP.map((img, i) => (
            <img
              key={img.src}
              src={img.src}
              alt={de ? GALLERY[i].de : GALLERY[i].en}
              loading="lazy"
              className="h-[160px] flex-none object-cover"
              style={{ width: img.w }}
            />
          ))}
        </div>
        <div className={`${SHELL} mt-[22px] flex flex-wrap gap-x-[26px] gap-y-1`}>
          {[
            { href: BRAND.tripadvisor, label: t('home.m.reviews.all' as any) },
            { href: BRAND.tourhq, label: t('home.m.reviews.tourhq' as any) },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-[6px] font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-ivory no-underline hover:text-ivory"
            >
              {l.label}
              <Icon name="open_in_new" size={15} />
            </a>
          ))}
        </div>
      </section>

      {/* ── 5 · About Zuzana ─────────────────────────────────────── */}
      <section id="zuzana" className="bg-ivory-deep py-[clamp(3.5rem,8vh,6rem)]">
        <div className={SHELL}>
          <div className="relative mr-3">
            <div aria-hidden="true" className="absolute bottom-[-12px] left-3 right-[-12px] top-3 border border-brass" />
            <Portrait
              alt="Zuzana Manová"
              sizes="calc(100vw - 60px)"
              className="relative block aspect-[4/3] w-full object-cover [object-position:center_40%]"
            />
          </div>
          <div className="mt-[38px]">
            <Kicker>{t('home.m.about.kicker' as any)}</Kicker>
          </div>
          <h2 className={H2}>
            {t('home.m.about.title' as any)} <em className="font-italic italic text-burgundy">{t('home.m.about.titleEm' as any)}</em>.
          </h2>
          <p className="m-0 mt-4 font-body text-[16.5px] leading-[1.65] text-ink-soft">{t('home.m.about.text' as any)}</p>
          <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
            {[1, 2, 3, 4].map((n) => (
              <li key={n} className="grid grid-cols-[22px_minmax(0,1fr)] gap-[10px] font-body text-[15.5px] leading-[1.5] text-ink">
                <Icon name="check" size={19} className="mt-[2px] text-brass-deep" />
                {t(`home.m.about.point${n}` as any)}
              </li>
            ))}
          </ul>
          <p className="m-0 mt-[26px] font-italic text-[22px] italic leading-[1.35] text-burgundy">„{t('home.m.about.quote' as any)}“</p>
          <Link
            href="/zuzana-manova"
            className="mt-[18px] inline-flex min-h-[44px] items-center gap-2 border-b border-ink font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-ink no-underline"
          >
            {t('home.m.about.more' as any)}
            <Icon name="arrow_forward" size={16} />
          </Link>
        </div>
      </section>

      {/* ── 6 · Enquiry ──────────────────────────────────────────── */}
      <section id="anfrage" ref={enquiryRef} className="relative overflow-hidden py-[clamp(3.75rem,9vh,6.5rem)] text-ivory">
        <div className="absolute inset-0 z-0">
          <picture>
            <source type="image/avif" srcSet="/images/hero/charles-bridge-statue-900.avif" />
            <source type="image/webp" srcSet="/images/hero/charles-bridge-statue-900.webp" />
            <img src="/images/thumbs/charles-bridge-statue.jpg" alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover" />
          </picture>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(79,22,32,0.86), rgba(20,16,12,0.92))' }} />
        </div>
        <div className={`relative z-[2] ${SHELL}`}>
          <Kicker tone="lamp">{t('home.m.enquiry.kicker' as any)}</Kicker>
          <h2 className="m-0 mt-[14px] font-display text-[clamp(2.3rem,5vw,4rem)] font-normal leading-[1.04] tracking-[-0.015em] text-ivory">
            {t('home.m.enquiry.title' as any)} <em className="font-italic italic">{t('home.m.enquiry.titleEm' as any)}</em>?
          </h2>
          <ol className="m-0 mt-6 list-none border-t border-ivory/20 p-0">
            {[1, 2, 3].map((n) => (
              <li key={n} className="grid grid-cols-[40px_minmax(0,1fr)] gap-[10px] border-b border-ivory/20 py-[18px]">
                <span className="font-display text-[30px] leading-none text-gold-lamp">{n}</span>
                <div>
                  <div className="font-display text-[23px] leading-[1.15] text-ivory">{t(`home.m.steps.${n}.title` as any)}</div>
                  <p className="m-0 mt-[6px] font-body text-[15px] leading-[1.55] text-ivory/[0.86]">{t(`home.m.steps.${n}.text` as any)}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-[26px]">
            <a href={waGeneral} target="_blank" rel="noopener noreferrer" className={PRIMARY_ON_DARK}>
              <Icon name="chat" size={20} />
              {t('home.m.ctaWhatsapp' as any)}
            </a>
            <div className="mt-2 flex flex-wrap justify-center gap-x-[26px]">
              <a
                href={`tel:${BRAND.phoneRaw}`}
                className="inline-flex min-h-[44px] items-center gap-2 font-sans text-[14px] font-medium text-ivory no-underline hover:text-ivory"
              >
                <Icon name="call" size={18} className="text-gold-lamp" />
                {BRAND.phone}
              </a>
              <Link
                href="/book#contact-title"
                className="inline-flex min-h-[44px] items-center font-sans text-[14px] font-medium text-ivory underline underline-offset-4 hover:text-ivory"
              >
                {t('home.m.formLink' as any)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7 · Footer (variant B, mobile; replaces the global footer) ── */}
      <footer className="border-t border-rule bg-paper">
        <div className={`${SHELL} pb-5 pt-10`}>
          <div className="font-display text-[26px] tracking-[0.02em] text-ink">
            Zuza <b className="font-normal">&amp;</b> Pragtour
          </div>
          <p className="m-0 mt-2 max-w-[30rem] font-body text-[15px] leading-[1.6] text-ink-mute">{t('footer.tagline')}</p>
          <div className="mt-[26px] grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-5">
            <div>
              <h2 className="m-0 font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-brass-deep">{t('footer.contact')}</h2>
              <div className="mt-[6px] flex flex-col font-sans text-[15px] leading-[1.4]">
                <a href={`tel:${BRAND.phoneRaw}`} className="py-[10px] text-ink-soft no-underline">{BRAND.phone}</a>
                <a href={`https://wa.me/${BRAND.phoneRaw.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="py-[10px] text-ink-soft no-underline">
                  WhatsApp
                </a>
                <a href={`mailto:${BRAND.email}`} className="py-[10px] text-ink-soft no-underline [overflow-wrap:anywhere]">{BRAND.email}</a>
              </div>
            </div>
            <div>
              <h2 className="m-0 font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-brass-deep">{t('footer.quicklinks')}</h2>
              <div className="mt-[6px] flex flex-col font-sans text-[15px] leading-[1.4]">
                {[
                  { href: '/tours', label: t('nav.tours') },
                  { href: '/zuzana-manova', label: t('nav.zuzana') },
                  { href: '/blog', label: 'Journal' },
                  { href: '/contact#contact-title', label: t('nav.contact') },
                  { href: '/book#contact-title', label: t('contact.booking.header.title') },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="py-[10px] text-ink-soft no-underline">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-[18px] flex flex-wrap gap-x-[22px] font-sans text-[14px]">
            {[
              { href: BRAND.tripadvisor, label: 'TripAdvisor' },
              { href: BRAND.tourhq, label: 'TourHQ' },
              { href: BRAND.instagram, label: 'Instagram' },
            ].map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center text-ink-soft no-underline">
                {l.label}
              </a>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-[2px] border-t border-rule pt-[14px] font-sans text-[12.5px] leading-[1.5] text-ink-mute">
            <p className="m-0">
              © {new Date().getFullYear()} Zuza Prague Tours – Zuzana Manová. {t('footer.rights')}
            </p>
            <div className="flex flex-wrap gap-x-[18px]">
              {[
                { href: '/privacy', label: t('footer.privacy') },
                { href: '/terms', label: t('footer.terms') },
                { href: '/bewerten', label: t('footer.review') },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="inline-flex min-h-[40px] items-center text-ink-mute no-underline">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Room for the sticky bar so it never covers the legal links. */}
        <div aria-hidden="true" className="h-[76px]" />
      </footer>

      {/* ── Sticky WhatsApp bar ──────────────────────────────────── */}
      {showBar && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(217,207,188,0.9)] bg-[rgba(250,246,236,0.94)] px-[clamp(1rem,4vw,1.5rem)] pb-[calc(10px+env(safe-area-inset-bottom))] pt-[10px] backdrop-blur-[12px]">
          <a
            href={waGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[52px] items-center justify-center gap-[10px] rounded-[4px] bg-burgundy font-sans text-[15px] font-semibold text-white no-underline transition-colors hover:bg-burgundy-deep hover:text-white"
          >
            <Icon name="chat" size={20} />
            {t('home.m.ctaWhatsapp' as any)}
          </a>
        </div>
      )}
    </div>
  );
};

export default HomeMobileV2;
