'use client';

/**
 * TourPage — single tour detail, premium "quiet-luxury editorial" direction.
 *
 * Faithful port of .handoffs/0003.../ui_kits/website/site/tour-detail.html,
 * adapted to the real app: it keeps the real tour data (getTourBySlug), the
 * bilingual translations, the canonical booking link pattern
 * (/book?tour=<title>#contact-title) and the route metadata (owned by the
 * app/tours/[slug]/page.tsx wrapper — untouched here).
 *
 * Layout: (1) a full-bleed hero band — the tour image under a dual ink scrim,
 * Italiana title + a Material-Symbols meta row; (2) the narrative (italic
 * burgundy lead + prose), a numbered "Was wir sehen" highlights list, the
 * "Im Preis enthalten" list and an FAQ accordion; (3) a sticky glass booking
 * card aside; (4) a related-tours strip drawn from the other tours.
 */

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { getTourBySlug, tours } from '../data/tours';
import { BRAND } from '../brand';
import { Kicker, Btn, Reveal, SHELL } from '../components/site/SiteUI';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

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

  // Canonical booking link — preserved exactly (title query + #contact-title).
  const bookDest = `/book?tour=${encodeURIComponent(shortTitle)}#contact-title`;

  const heroMeta: { icon: string; label: string }[] = [
    { icon: 'schedule', label: duration },
    { icon: 'group', label: de ? 'Private Gruppe' : 'Private group' },
    { icon: 'translate', label: languageValue },
  ];

  const cardRows: { dt: string; dd: string }[] = [
    { dt: de ? 'Dauer' : 'Duration', dd: duration },
    { dt: de ? 'Gruppe' : 'Group', dd: groupValue },
    { dt: de ? 'Sprache' : 'Language', dd: languageValue },
  ];

  const related = tours.filter((x) => x.id !== tour.id).slice(0, 3);

  return (
    <div className="premium-inner">
      {/* ── Hero band ────────────────────────────────────────── */}
      <section className="relative flex min-h-[68svh] items-end overflow-hidden md:min-h-[74svh]">
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
                'linear-gradient(to top, rgba(20,16,12,0.84) 0%, rgba(20,16,12,0.18) 55%, rgba(20,16,12,0.32) 100%), linear-gradient(to right, rgba(20,16,12,0.55) 0%, transparent 60%)',
            }}
            aria-hidden
          />
        </div>

        <div className={`relative z-[2] w-full pb-[clamp(2.5rem,6vh,4.5rem)] pt-[clamp(2rem,5vh,3.5rem)] ${SHELL}`}>
          <nav
            aria-label={de ? 'Brotkrümelnavigation' : 'Breadcrumb'}
            className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-[11px] uppercase tracking-[0.18em] text-ivory/70"
          >
            <Link href="/tours" className="transition-colors duration-300 hover:text-ivory">
              {de ? 'Touren' : 'Tours'}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ivory/90">{shortTitle}</span>
          </nav>

          <h1 className="m-0 max-w-[18ch] font-display text-[clamp(2.6rem,6vw,5rem)] font-normal leading-[1.02] tracking-[-0.02em] text-ivory">
            {heroTitle}
          </h1>

          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
            {heroMeta.map((m) => (
              <span
                key={m.icon}
                className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.12em] text-ivory/90"
              >
                <span className="material-symbols-outlined text-[17px] text-gold-lamp" aria-hidden>
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
          <div className="grid grid-cols-1 items-start gap-[clamp(2.5rem,5vw,4rem)] min-[900px]:grid-cols-[1fr_360px]">
            {/* Narrative */}
            <div>
              <Reveal>
                <p className="m-0 font-italic text-[clamp(1.4rem,2.4vw,1.9rem)] italic leading-[1.45] text-burgundy">
                  {description}
                </p>
              </Reveal>

              <Reveal delay={80}>
                <div className="mt-[1.8rem] space-y-[1.3rem] font-body text-[1.075rem] leading-[1.78] text-ink-soft">
                  <p className="m-0">{tx(tour.body1Key)}</p>
                  <p className="m-0">{tx(tour.body2Key)}</p>
                  <p className="m-0">{tx(tour.body3Key)}</p>
                </div>
              </Reveal>

              {/* Highlights — numbered hairline list */}
              <Reveal className="mt-[clamp(2.6rem,5vh,3.6rem)]">
                <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.1rem)] font-normal leading-[1.12] tracking-[-0.01em] text-ink">
                  {de ? (
                    <>
                      Was wir <em className="font-italic italic text-burgundy">sehen</em>
                    </>
                  ) : (
                    <>
                      What we&rsquo;ll <em className="font-italic italic text-burgundy">see</em>
                    </>
                  )}
                </h2>
                <ol className="mt-6 list-none p-0">
                  {tour.highlightKeys.map((key, i) => (
                    <li
                      key={key}
                      className="grid grid-cols-[2.4rem_1fr] gap-[1.1rem] border-t border-rule py-[1.1rem] last:border-b"
                    >
                      <span className="font-display text-[1.1rem] leading-[1.5] text-brass" aria-hidden>
                        {ROMAN[i] ?? String(i + 1)}
                      </span>
                      <span className="font-sans text-[0.98rem] font-semibold leading-[1.45] text-ink">
                        {tx(key)}
                      </span>
                    </li>
                  ))}
                </ol>
              </Reveal>

              {/* What's included */}
              <Reveal className="mt-[clamp(2.6rem,5vh,3.6rem)]">
                <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.1rem)] font-normal leading-[1.12] tracking-[-0.01em] text-ink">
                  {tx('tourpage.included')}
                </h2>
                <ul className="mt-6 list-none p-0">
                  {tour.includedKeys.map((key) => (
                    <li
                      key={key}
                      className="flex items-start gap-3 border-t border-rule py-[0.95rem] font-body text-[0.98rem] leading-[1.55] text-ink-soft last:border-b"
                    >
                      <span className="material-symbols-outlined mt-[1px] shrink-0 text-[18px] text-brass" aria-hidden>
                        check
                      </span>
                      <span>{tx(key)}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* FAQ */}
              <Reveal className="mt-[clamp(2.6rem,5vh,3.6rem)]">
                <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.1rem)] font-normal leading-[1.12] tracking-[-0.01em] text-ink">
                  {tx('tourpage.faq')}
                </h2>
                <div className="mt-6 border-t border-rule">
                  {tour.faqKeys.map(({ qKey, aKey }) => (
                    <details key={qKey} className="group border-b border-rule">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-[1.15rem] font-display text-[1.15rem] font-normal leading-[1.3] text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                        <span>{tx(qKey)}</span>
                        <span
                          className="material-symbols-outlined mt-[2px] shrink-0 text-[20px] text-brass transition-transform duration-300 ease-brand group-open:rotate-45"
                          aria-hidden
                        >
                          add
                        </span>
                      </summary>
                      <p className="m-0 pb-[1.3rem] pr-7 font-body text-[0.98rem] leading-[1.7] text-ink-soft">
                        {tx(aKey)}
                      </p>
                    </details>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Sticky glass booking card (direct grid child so it travels the
                full body height; the Reveal transform is a safe descendant) */}
            <aside className="min-[900px]:sticky min-[900px]:top-[110px]">
              <Reveal>
                <div className="rounded-xl border border-rule bg-paper/70 p-[1.8rem] shadow-[0_16px_44px_rgba(26,23,20,0.10)] backdrop-blur-[18px]">
                    <h2 className="m-0 font-display text-[1.4rem] font-normal leading-[1.15] text-ink">
                      {shortTitle}
                    </h2>
                    <p className="mb-6 mt-[0.4rem] font-sans text-[11px] uppercase tracking-[0.16em] text-ink-mute">
                      {de ? 'Privatführung · auf Anfrage' : 'Private tour · on request'}
                    </p>

                    <dl className="m-0 mb-5">
                      {cardRows.map((row) => (
                        <div
                          key={row.dt}
                          className="flex items-baseline justify-between gap-4 border-b border-rule-soft py-[0.7rem] last:border-b-0"
                        >
                          <dt className="font-sans text-[11px] uppercase tracking-[0.14em] text-ink-mute">
                            {row.dt}
                          </dt>
                          <dd className="m-0 text-right font-sans text-[0.92rem] text-ink">{row.dd}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mb-6 border-t border-rule-soft pt-[0.9rem]">
                      <div className="mb-[0.35rem] font-sans text-[11px] uppercase tracking-[0.14em] text-ink-mute">
                        {tx('tourpage.meetingPoint')}
                      </div>
                      <p className="m-0 font-body text-[0.92rem] leading-[1.5] text-ink-soft">{meetingPoint}</p>
                    </div>

                    <Btn href={bookDest} variant="solid" arrow className="w-full justify-center">
                      {tx('tourpage.enquiryCta')}
                    </Btn>

                    <p className="mt-3 text-center font-sans text-xs tracking-[0.02em] text-ink-mute">
                      {de ? 'oder rufen Sie an: ' : 'or call: '}
                      <a
                        href={`tel:${BRAND.phoneRaw}`}
                        className="text-burgundy underline-offset-2 transition-colors duration-300 hover:underline"
                      >
                        {BRAND.phone}
                      </a>
                    </p>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Related tours ────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="border-t border-rule bg-ivory-deep py-[clamp(3.5rem,8vh,6rem)]">
          <div className={SHELL}>
            <Reveal>
              <Kicker>{de ? 'Vielleicht auch interessant' : 'You might also like'}</Kicker>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-normal leading-[1.08] tracking-[-0.015em] text-ink">
                {de ? (
                  <>
                    Weitere private <em className="font-italic italic text-burgundy">Touren</em>
                  </>
                ) : (
                  <>
                    More private <em className="font-italic italic text-burgundy">tours</em>
                  </>
                )}
              </h2>
            </Reveal>

            <div className="mt-[clamp(1.8rem,4vh,2.6rem)] grid grid-cols-1 gap-[1.6rem] sm:grid-cols-2 min-[860px]:grid-cols-3">
              {related.map((r, i) => {
                const rSlug = de ? r.slugDe : r.slug;
                const rTitle = tx(r.titleKey);
                return (
                  <Reveal as="article" key={r.id} delay={i * 80}>
                    <Link
                      href={`/tours/${rSlug}`}
                      className="group block h-full overflow-hidden rounded-lg border border-rule bg-paper transition-colors duration-300 ease-brand hover:border-brass"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={r.image}
                          alt={rTitle}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[800ms] ease-brand group-hover:scale-[1.05]"
                        />
                      </div>
                      <div className="px-[1.3rem] pb-[1.4rem] pt-[1.2rem]">
                        <h3 className="m-0 font-display text-[1.25rem] font-normal leading-[1.2] text-ink">
                          {rTitle}
                        </h3>
                        <div className="mt-[0.45rem] font-sans text-[10px] uppercase tracking-[0.16em] text-brass-deep">
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
