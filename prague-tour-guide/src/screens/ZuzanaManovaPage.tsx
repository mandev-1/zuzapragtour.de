'use client';

/**
 * ZuzanaManovaPage — "About Zuzana", premium quiet-luxury editorial direction.
 *
 * Port of the 0003 handoff mockup (ui_kits/website/site/zuzana.html) onto the
 * real app: a PageBanner, an offset-brass-framed portrait beside a burgundy
 * Cormorant standfirst + bio, a dark stat band, a credentials grid, the
 * "what I offer" tour list, a philosophy quote and the FAQ — all driven by the
 * existing translation keys (zm.*, about/hero.*) and the real /book + /tours
 * routes. Shared primitives come from SiteUI; section reveals use <Reveal>.
 */

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import type { TranslationKey } from '../utils/translations';
import { BRAND } from '../brand';
import {
  PageBanner,
  SectionHeading,
  Kicker,
  Btn,
  Reveal,
  SHELL,
} from '@/src/components/site/SiteUI';

/* ── Stat band (mockup z-stats) ───────────────────────────────── */
const STATS: { n: string; de: string; en: string }[] = [
  { n: '40+', de: 'Jahre Erfahrung', en: 'Years guiding' },
  { n: '4,9k', de: 'Touren kuratiert', en: 'Tours curated' },
  { n: '5,0', de: 'Sterne Bewertung', en: 'Star rating' },
  { n: '1986', de: 'Seit dem Jahr', en: 'Guiding since' },
];

/* ── Credentials (real copy from zm.cred.*) ───────────────────── */
const CREDS: { icon: string; titleKey: TranslationKey; descKey: TranslationKey }[] = [
  { icon: 'verified', titleKey: 'zm.cred.1.title', descKey: 'zm.cred.1.desc' },
  { icon: 'history_edu', titleKey: 'zm.cred.2.title', descKey: 'zm.cred.2.desc' },
  { icon: 'translate', titleKey: 'zm.cred.3.title', descKey: 'zm.cred.3.desc' },
];

const TOUR_KEYS: TranslationKey[] = ['zm.tour.1', 'zm.tour.2', 'zm.tour.3', 'zm.tour.4'];

const FAQ_KEYS: { q: TranslationKey; a: TranslationKey }[] = [
  { q: 'zm.faq.q1', a: 'zm.faq.a1' },
  { q: 'zm.faq.q2', a: 'zm.faq.a2' },
  { q: 'zm.faq.q3', a: 'zm.faq.a3' },
  { q: 'zm.faq.q4', a: 'zm.faq.a4' },
  { q: 'zm.faq.q5', a: 'zm.faq.a5' },
];

const ZuzanaManovaPage: React.FC = () => {
  const { t, language } = useLanguage();
  const de = language !== 'en';

  return (
    <div className="premium-inner font-body text-ink antialiased">

      {/* ── Banner ───────────────────────────────────────────── */}
      <PageBanner
        kicker={de ? 'Lernen Sie Zuzana kennen' : 'Meet Zuzana'}
        title={
          de ? (
            <>Prag, erzählt mit <em className="font-italic italic text-burgundy">Leidenschaft</em>.</>
          ) : (
            <>Prague, told with <em className="font-italic italic text-burgundy">passion</em>.</>
          )
        }
      />

      {/* ── Intro: portrait + standfirst + bio + CTA ─────────── */}
      <section className="pt-[clamp(3rem,6vh,5rem)] pb-[clamp(3.5rem,7vh,5.5rem)]">
        <div className={`${SHELL} grid grid-cols-1 items-center gap-[clamp(2.5rem,6vw,5.5rem)] min-[860px]:grid-cols-[0.85fr_1.15fr]`}>
          {/* Portrait with offset brass frame */}
          <Reveal className="relative">
            <div
              className="absolute border border-brass"
              style={{ top: '16px', right: '-16px', bottom: '-16px', left: '16px' }}
              aria-hidden
            />
            <img
              src="/images/zuzana-portrait.jpg"
              alt={de ? 'Ing. Zuzana Manová, zertifizierte Prager Stadtführerin' : 'Ing. Zuzana Manová, certified Prague tour guide'}
              className="relative aspect-[4/5] w-full object-cover"
              style={{ objectPosition: 'center 16%' }}
              fetchPriority="high"
            />
          </Reveal>

          <div>
            <Reveal>
              <Kicker>{BRAND.personName}</Kicker>
            </Reveal>
            <Reveal delay={80}>
              <p className="mb-[1.4rem] mt-[1.1rem] font-italic text-[clamp(1.5rem,2.6vw,2.1rem)] italic leading-[1.4] text-burgundy">
                {t('zm.hero.subtitle')}
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p className="mb-[1.2rem] font-body text-[1.075rem] leading-[1.8] text-ink-soft">{t('zm.bio.p1')}</p>
              <p className="mb-[1.2rem] font-body text-[1.075rem] leading-[1.8] text-ink-soft">{t('zm.bio.p2')}</p>
            </Reveal>
            <Reveal delay={200}>
              <p className="font-body text-[1.075rem] leading-[1.8] text-ink-soft">{t('zm.bio.p3')}</p>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-[1.8rem]">
                <Btn href="/book#contact-title" variant="solid" arrow>
                  {de ? 'Eine Tour anfragen' : 'Request a tour'}
                </Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Stat band (dark) ─────────────────────────────────── */}
      <section className="bg-ink py-[clamp(3rem,6vh,4.5rem)] text-ivory">
        <div className={`${SHELL} grid grid-cols-2 gap-x-6 gap-y-10 text-center min-[680px]:grid-cols-4`}>
          {STATS.map((s, i) => (
            <Reveal key={s.n} delay={i * 70}>
              <div className="font-display text-[clamp(2.4rem,4vw,3.4rem)] leading-none text-gold-lamp">{s.n}</div>
              <div className="mt-[0.7rem] font-sans text-[10px] uppercase tracking-[0.2em] text-ivory/60">
                {de ? s.de : s.en}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Credentials ──────────────────────────────────────── */}
      <section className="py-[clamp(3.5rem,8vh,6rem)]">
        <div className={SHELL}>
          <Reveal>
            <SectionHeading kicker={de ? 'Qualifikationen' : 'Qualifications'}>
              {de ? (
                <>Warum mit einer <em className="font-italic italic text-burgundy">zertifizierten</em> Expertin</>
              ) : (
                <>Why choose a <em className="font-italic italic text-burgundy">certified</em> expert</>
              )}
            </SectionHeading>
          </Reveal>
          <div className="mt-[clamp(2rem,4vh,2.6rem)] grid grid-cols-1 gap-[1.4rem] min-[760px]:grid-cols-3">
            {CREDS.map((c, i) => (
              <Reveal as="article" key={c.icon} delay={i * 80} className="border border-rule bg-white p-[1.8rem]">
                <span className="material-symbols-outlined text-[26px] text-burgundy" aria-hidden>{c.icon}</span>
                <h3 className="mb-[0.5rem] mt-[1rem] font-display text-[1.35rem] font-normal text-ink">{t(c.titleKey)}</h3>
                <p className="font-body text-[0.98rem] leading-[1.6] text-ink-mute">{t(c.descKey)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── What I offer + tour links ────────────────────────── */}
      <section className="border-t border-rule py-[clamp(3.5rem,7vh,5.5rem)]">
        <div className={`${SHELL} grid grid-cols-1 gap-[clamp(2rem,5vw,4rem)] min-[860px]:grid-cols-[0.92fr_1.08fr] min-[860px]:items-start`}>
          <Reveal>
            <SectionHeading kicker={de ? 'Private Touren' : 'Private tours'}>
              {t('zm.offer.title')}
            </SectionHeading>
            <p className="mt-[1.6rem] font-body text-[1.075rem] leading-[1.8] text-ink-soft">{t('zm.offer.p1')}</p>
            <p className="mt-[1.2rem] font-body text-[1.075rem] leading-[1.8] text-ink-soft">{t('zm.offer.p2')}</p>
          </Reveal>
          <Reveal delay={120} className="border-t border-rule min-[860px]:mt-[3.4rem]">
            {TOUR_KEYS.map((key) => (
              <Link
                key={key}
                href="/tours"
                className="group flex items-center justify-between gap-5 border-b border-rule py-[1.25rem]"
              >
                <span className="font-display text-[clamp(1.15rem,1.8vw,1.45rem)] font-normal leading-[1.15] text-ink transition-colors duration-300 group-hover:text-burgundy">
                  {t(key)}
                </span>
                <span className="material-symbols-outlined shrink-0 text-[18px] text-brass transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                  arrow_forward
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Philosophy quote ─────────────────────────────────── */}
      <section className="bg-ivory-deep py-[clamp(4rem,9vh,7rem)] text-center">
        <div className={SHELL}>
          <Reveal>
            <Kicker center>{de ? 'Eine persönliche Philosophie' : 'A personal philosophy'}</Kicker>
          </Reveal>
          <Reveal delay={80}>
            <blockquote className="mx-auto mt-[1.6rem] max-w-[44rem] font-italic text-[clamp(1.6rem,3vw,2.4rem)] italic leading-[1.4] text-ink">
              {de ? (
                <>„Prag ist eine vielschichtige Geschichte — <em className="text-burgundy">lassen Sie uns diese gemeinsam lesen.</em>“</>
              ) : (
                <>“Prague is a layered story — <em className="text-burgundy">let us read it together.</em>”</>
              )}
            </blockquote>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-[1.8rem] font-sans text-[11px] uppercase tracking-[0.24em] text-ink-mute">
              — {BRAND.personName}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="border-t border-rule py-[clamp(3.5rem,7vh,5.5rem)]">
        <div className="mx-auto w-full max-w-[860px] px-[clamp(1.5rem,5vw,5rem)]">
          <Reveal>
            <SectionHeading kicker={de ? 'Gut zu wissen' : 'Good to know'}>
              {t('zm.faq.title')}
            </SectionHeading>
          </Reveal>
          <Reveal delay={80} className="mt-[clamp(2rem,4vh,2.6rem)] border-t border-rule">
            {FAQ_KEYS.map(({ q, a }) => (
              <details key={q} className="group border-b border-rule">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-[1.4rem] font-display text-[clamp(1.1rem,1.6vw,1.3rem)] font-normal text-ink [&::-webkit-details-marker]:hidden">
                  {t(q)}
                  <span className="material-symbols-outlined shrink-0 text-[20px] text-brass transition-transform duration-300 group-open:rotate-180" aria-hidden>
                    expand_more
                  </span>
                </summary>
                <p className="pb-[1.4rem] font-body text-[1rem] leading-[1.7] text-ink-mute">{t(a)}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────── */}
      <section className="border-t border-rule py-[clamp(4rem,9vh,6.5rem)] text-center">
        <div className={SHELL}>
          <Reveal>
            <Kicker center>{de ? 'Bereit, sich kennenzulernen?' : 'Ready to meet?'}</Kicker>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mx-auto mt-[1.2rem] max-w-[22ch] font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.08] tracking-[-0.015em] text-ink">
              {t('zm.cta.title')}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mx-auto mt-[1.1rem] max-w-[40rem] font-body text-[1.1rem] leading-[1.65] text-ink-mute">
              {t('zm.cta.subtitle')}
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-[2rem] flex justify-center">
              <Btn href="/book#contact-title" variant="solid" arrow>
                {t('hero.sendEnquiry')}
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default ZuzanaManovaPage;
