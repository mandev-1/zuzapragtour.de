'use client';

/**
 * TourPage — single tour detail, 0005 "quiet-luxury editorial" facelift.
 *
 * Rebuilt 1:1 from the handoff prototype (Zuza Prague Tours.dc.html · #/tour):
 * (1) an image hero (74svh) under a single top scrim, a premium eyebrow
 * breadcrumb (gold rule · "Touren" · "Privatführung Nr. NN"), the SEO H1 and a
 * 1.05rem gold-icon meta row; (2) a two-column body — burgundy Cormorant lead
 * over a 64px brass hairline, intro prose at 1.1rem, a numbered "Was wir sehen"
 * itinerary whose rows lift onto a white card on hover, plus the retained
 * (restyled) "Im Preis enthalten" list and FAQ accordion; (3) a sticky frosted-
 * glass booking card (gold capsule, definition list, ★★★★★ trust row, big
 * burgundy CTA, lock line, phone/WhatsApp block); (4) a related-tours strip.
 *
 * Real data/routes/i18n preserved: SEO H1 (seoTitleKey), the canonical booking
 * link (/book?tour=<title>#contact-title), and the route metadata (owned by the
 * app/tours/[slug]/page.tsx wrapper — untouched here).
 */

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { getTourBySlug, tours } from '../data/tours';
import { BRAND } from '../brand';
import { Kicker, Btn, Reveal, Stars, GLASS_CARD_STYLE, SHELL } from '../components/site/SiteUI';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
const WA = `https://wa.me/${BRAND.phoneRaw.replace(/[^0-9]/g, '')}`;

const TourPage: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const { t, language } = useLanguage();
  const de = language !== 'en';

  // Dynamic i18n keys come in as plain strings; the t() union can't see them.
  const tx = (key: string): string => t(key as any);

  const tour = slug ? getTourBySlug(slug) : undefined;

  /* ── Not found ─────────────────────────────────────────────── */
  if (!tour) {
    return (
      <div className="premium-inner">
        <div className={`${SHELL} py-[clamp(4rem,12vh,8rem)] text-center`}>
          <Kicker center>{de ? 'Nicht gefunden' : 'Not found'}</Kicker>
          <h1 className="mx-auto mt-5 max-w-[20ch] font-display text-[clamp(2.2rem,5vw,3.4rem)] font-normal leading-[1.05] tracking-[-0.015em] text-ink">
            {de ? 'Diese Tour existiert nicht.' : 'This tour does not exist.'}
          </h1>
          <p className="mx-auto mt-5 max-w-[34rem] font-body text-[1.05rem] leading-[1.7] text-ink-mute">
            {de
              ? 'Bitte überprüfen Sie die Adresse oder sehen Sie sich alle Touren an.'
              : 'Please check the URL or browse all tours.'}
          </p>
          <div className="mt-9 flex justify-center">
            <Btn href="/tours" variant="solid" arrow>
              {de ? 'Alle Touren' : 'All tours'}
            </Btn>
          </div>
        </div>
      </div>
    );
  }

  const heroTitle = tx(tour.seoTitleKey);
  const shortTitle = tx(tour.titleKey);
  const description = tx(tour.descriptionKey);
  const duration = tx(tour.durationKey);
  const meetingPoint = tx(tour.meetingPointKey);
  const languageValue = tx('tourpage.languageValue');
  const groupValue = tx('tourpage.groupSizeValue');
  const num = String(tours.findIndex((x) => x.id === tour.id) + 1).padStart(2, '0');

  // Canonical booking link — preserved exactly (title query + #contact-title).
  const bookDest = `/book?tour=${encodeURIComponent(shortTitle)}#contact-title`;

  const heroMeta: { icon: string; label: string }[] = [
    { icon: 'schedule', label: duration },
    { icon: 'group', label: groupValue },
    { icon: 'translate', label: languageValue },
  ];

  const cardRows: { dt: string; dd: string }[] = [
    { dt: de ? 'Dauer' : 'Duration', dd: duration },
    { dt: de ? 'Gruppe' : 'Group', dd: groupValue },
    { dt: de ? 'Treffpunkt' : 'Meeting point', dd: meetingPoint },
    { dt: de ? 'Sprache' : 'Language', dd: languageValue },
  ];

  const related = tours.filter((x) => x.id !== tour.id && x.id !== 'custom').slice(0, 3);

  return (
    <div className="premium-inner">
      {/* ── Hero band ────────────────────────────────────────── */}
      <section className="relative flex min-h-[74svh] items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={tour.image}
            alt={shortTitle}
            className="h-full w-full animate-kenburns object-cover motion-reduce:animate-none"
            fetchPriority="high"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(20,16,12,0.82) 0%, rgba(20,16,12,0.15) 55%, rgba(20,16,12,0.30) 100%)',
            }}
            aria-hidden
          />
        </div>

        <div className={`relative z-[2] w-full pb-[clamp(2.5rem,6vh,4.5rem)] pt-[clamp(2rem,5vh,3.5rem)] ${SHELL}`}>
          <nav
            aria-label={de ? 'Pfad' : 'Breadcrumb'}
            className="mb-[1.4rem] flex flex-wrap items-center gap-[0.9rem] font-sans text-[11px] font-medium uppercase tracking-[0.28em]"
          >
            <span aria-hidden className="h-px w-7 bg-gold-lamp/80" />
            <Link href="/tours" className="text-ivory/[0.78] no-underline transition-colors duration-300 hover:text-ivory">
              {de ? 'Touren' : 'Tours'}
            </Link>
            <span aria-hidden className="text-ivory/45">·</span>
            <span className="text-gold-lamp">{de ? `Privatführung Nr. ${num}` : `Private tour no. ${num}`}</span>
          </nav>

          <h1 className="m-0 max-w-[18ch] font-display text-[clamp(2.6rem,6vw,5rem)] font-normal leading-[1.02] tracking-[-0.02em] text-ivory">
            {heroTitle}
          </h1>

          <div className="mt-[1.6rem] flex flex-wrap gap-x-8 gap-y-[1.4rem]">
            {heroMeta.map((m) => (
              <span key={m.icon} className="inline-flex items-center gap-[0.55rem] font-sans text-[1.05rem] text-ivory/[0.94]">
                <span className="material-symbols-outlined text-[19px] text-gold-lamp" aria-hidden>
                  {m.icon}
                </span>
                {m.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Body + sticky booking card ───────────────────────── */}
      <section className="pb-[clamp(4rem,9vh,7rem)] pt-[clamp(3rem,7vh,6rem)]">
        <div className={SHELL}>
          <div className="grid grid-cols-1 items-start gap-[clamp(2.5rem,5vw,5rem)] min-[900px]:grid-cols-[1fr_360px]">
            {/* Narrative */}
            <div>
              <Reveal>
                <p className="m-0 font-italic text-[clamp(1.5rem,2.6vw,2rem)] italic leading-[1.42] text-burgundy">
                  {description}
                </p>
                <div aria-hidden className="mb-[1.8rem] mt-6 h-px w-16 bg-brass" />

                <div className="space-y-[1.3rem] font-body text-[1.1rem] leading-[1.78] text-ink-soft">
                  <p className="m-0">{tx(tour.body1Key)}</p>
                  <p className="m-0">{tx(tour.body2Key)}</p>
                  <p className="m-0">{tx(tour.body3Key)}</p>
                </div>
              </Reveal>

              {/* "Was wir sehen" — numbered itinerary, rows lift on hover */}
              <Reveal className="mt-[clamp(2.6rem,5vh,3.6rem)]">
                <Kicker>{de ? 'Der Rundgang' : 'The walk'}</Kicker>
                <h2 className="mt-[0.8rem] font-display text-[clamp(1.7rem,2.8vw,2.2rem)] font-normal leading-[1.16] tracking-[-0.01em] text-ink">
                  {de ? 'Was wir sehen' : 'What we’ll see'}
                </h2>
                <ol className="mt-6 list-none p-0">
                  {tour.highlightKeys.map((key, i) => (
                    <li key={key} className="border-t border-rule last:border-b">
                      <div className="mx-[-1.2rem] my-[0.35rem] grid grid-cols-[2.6rem_1fr] gap-[1.1rem] rounded-lg px-[1.2rem] py-[1.15rem] transition-[background-color,box-shadow] duration-300 ease-brand hover:bg-white hover:shadow-[0_8px_24px_rgba(26,23,20,0.08)]">
                        <span className="font-display text-[1.1rem] text-brass-deep" aria-hidden>
                          {ROMAN[i] ?? String(i + 1)}
                        </span>
                        <span className="font-sans text-[1.05rem] font-semibold leading-[1.45] text-ink">
                          {tx(key)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>

              {/* Im Preis enthalten — retained content, restyled hairline list */}
              <Reveal className="mt-[clamp(2.6rem,5vh,3.6rem)]">
                <h2 className="font-display text-[clamp(1.7rem,2.8vw,2.2rem)] font-normal leading-[1.16] tracking-[-0.01em] text-ink">
                  {tx('tourpage.included')}
                </h2>
                <ul className="mt-6 list-none p-0">
                  {tour.includedKeys.map((key) => (
                    <li
                      key={key}
                      className="flex items-start gap-3 border-t border-rule py-[0.95rem] font-body text-[1rem] leading-[1.55] text-ink-soft last:border-b"
                    >
                      <span className="material-symbols-outlined mt-[1px] shrink-0 text-[18px] text-brass-deep" aria-hidden>
                        check
                      </span>
                      <span>{tx(key)}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* FAQ — retained content, restyled accordion */}
              <Reveal className="mt-[clamp(2.6rem,5vh,3.6rem)]">
                <h2 className="font-display text-[clamp(1.7rem,2.8vw,2.2rem)] font-normal leading-[1.16] tracking-[-0.01em] text-ink">
                  {tx('tourpage.faq')}
                </h2>
                <div className="mt-6 border-t border-rule">
                  {tour.faqKeys.map(({ qKey, aKey }) => (
                    <details key={qKey} className="group border-b border-rule">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-[1.15rem] font-display text-[1.15rem] font-normal leading-[1.3] text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                        <span>{tx(qKey)}</span>
                        <span
                          className="material-symbols-outlined mt-[2px] shrink-0 text-[20px] text-brass-deep transition-transform duration-300 ease-brand group-open:rotate-45"
                          aria-hidden
                        >
                          add
                        </span>
                      </summary>
                      <p className="m-0 pb-[1.3rem] pr-7 font-body text-[1rem] leading-[1.7] text-ink-soft">
                        {tx(aKey)}
                      </p>
                    </details>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Sticky frosted-glass booking card */}
            <aside className="min-[900px]:sticky min-[900px]:top-[100px]">
              <Reveal>
                <div style={GLASS_CARD_STYLE} className="p-[1.8rem]">
                  <span className="mb-[1.1rem] inline-flex items-center gap-[0.45rem] rounded-full border border-[rgba(123,88,0,0.35)] px-[0.85rem] py-[0.4rem] font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-olive">
                    <span className="material-symbols-outlined text-[14px]" aria-hidden>verified</span>
                    {de ? 'Zertifizierte Expertin · Seit 1986' : 'Certified expert · Since 1986'}
                  </span>

                  <h2 className="m-0 mb-[0.35rem] font-display text-[1.55rem] font-normal leading-[1.15] text-ink">
                    {de ? 'Diese Tour buchen' : 'Book this tour'}
                  </h2>
                  <p className="m-0 mb-[1.4rem] font-sans text-[1rem] text-ink-soft">
                    {de ? 'Privatführung · unverbindlich anfragen' : 'Private tour · enquire without obligation'}
                  </p>

                  <dl className="m-0 mb-6 grid gap-[0.9rem]">
                    {cardRows.map((row, i) => (
                      <div
                        key={row.dt}
                        className={`flex items-baseline justify-between gap-4 ${
                          i < cardRows.length - 1 ? 'border-b border-rule-soft pb-[0.9rem]' : ''
                        }`}
                      >
                        <dt className="font-sans text-[11.5px] uppercase tracking-[0.14em] text-ink-mute">{row.dt}</dt>
                        <dd className="m-0 text-right font-sans text-[1.05rem] text-ink">{row.dd}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mb-[0.9rem] flex flex-wrap items-center justify-center gap-[0.5rem]">
                    <Stars size={15} />
                    <span className="font-sans text-[0.92rem] text-ink-soft">
                      {de ? '5,0 von 5 · über 4.900 Gäste' : '5.0 of 5 · over 4,900 guests'}
                    </span>
                  </div>

                  <Btn href={bookDest} variant="solid" arrow className="mb-[0.9rem] w-full justify-center">
                    {de ? 'Unverbindliche Anfrage senden' : 'Send a no-obligation enquiry'}
                  </Btn>

                  <p className="m-0 mb-[1.1rem] flex items-center justify-center gap-[0.4rem] font-sans text-[0.9rem] text-ink-soft">
                    <span className="material-symbols-outlined text-[15px] text-brass-deep" aria-hidden>lock</span>
                    {de ? 'Kostenlos & ohne Verpflichtung' : 'Free & without obligation'}
                  </p>

                  <div className="border-t border-rule-soft pt-[1.05rem] text-center">
                    <div className="font-sans text-[0.98rem] text-ink-soft">
                      {de ? 'Lieber persönlich?' : 'Prefer to speak in person?'}
                    </div>
                    <a
                      href={`tel:${BRAND.phoneRaw}`}
                      className="mt-[0.3rem] inline-block font-sans text-[1.25rem] font-semibold text-burgundy no-underline"
                    >
                      {BRAND.phone}
                    </a>
                    <div className="mt-[0.25rem] font-sans text-[0.92rem] text-ink-mute">
                      {de ? 'auch per ' : 'also via '}
                      <a href={WA} target="_blank" rel="noopener noreferrer" className="text-burgundy">
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Related tours ────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-ivory-deep py-[clamp(3.5rem,8vh,6rem)]">
          <div className={SHELL}>
            <Reveal>
              <Kicker>{de ? 'Vielleicht auch interessant' : 'You might also like'}</Kicker>
              <h2 className="mt-[0.8rem] font-display text-[clamp(1.8rem,3.2vw,2.5rem)] font-normal leading-[1.08] tracking-[-0.015em] text-ink">
                {de ? (
                  <>
                    Weitere Wege durch <em className="font-italic italic text-burgundy">Prag</em>
                  </>
                ) : (
                  <>
                    More ways through <em className="font-italic italic text-burgundy">Prague</em>
                  </>
                )}
              </h2>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-[1.6rem] sm:grid-cols-2 min-[860px]:grid-cols-3">
              {related.map((r, i) => {
                const rSlug = de ? r.slugDe : r.slug;
                const rTitle = tx(r.titleKey);
                return (
                  <Reveal as="article" key={r.id} delay={i * 80}>
                    <Link
                      href={`/tours/${rSlug}`}
                      className="group block h-full overflow-hidden rounded-lg border border-rule bg-white no-underline transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(26,23,20,0.12)]"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={r.image}
                          alt=""
                          loading="lazy"
                          className="h-[190px] w-full object-cover transition-transform duration-[800ms] ease-brand group-hover:scale-[1.05]"
                        />
                      </div>
                      <div className="px-[1.35rem] pb-[1.45rem] pt-[1.25rem]">
                        <h3 className="m-0 mb-[0.45rem] font-display text-[1.35rem] font-normal leading-[1.2] text-ink">
                          {rTitle}
                        </h3>
                        <div className="flex items-center gap-[0.45rem] font-sans text-[0.95rem] text-ink-soft">
                          <span className="material-symbols-outlined text-[16px] text-brass-deep" aria-hidden>
                            schedule
                          </span>
                          {tx(r.durationKey)} · {de ? 'Privat' : 'Private'}
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default TourPage;
