'use client';

/**
 * Blog — journal index, 0006 "premium editorial" facelift.
 *
 * Rebuilt from the handoff prototype (Zuza Prague Tours.dc.html · #/journal) to
 * match the rest of the facelifted site: global chrome (premium-inner ground),
 * a left-aligned banner with a byline trust row, a featured newest article in
 * the brand's brass offset frame (gold "Neuester Beitrag" capsule + Cormorant
 * italic standfirst), real-link post cards with clock-icon meta, and a dark
 * "Kontakt aufnehmen" CTA band.
 *
 * Kept from the previous journal (owner's call): the category filter + search,
 * and the SEO "Über dieses Journal" editorial block — both restyled into the
 * new language. Real data/routes/i18n preserved.
 */

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { blogPosts } from '../utils/blogData';
import { BRAND } from '../brand';
import { Kicker, Btn, Reveal, SHELL } from './site/SiteUI';
import AdSlot from './AdSlot';
import { ADSENSE_SLOTS } from '../config/adsense';

const CATEGORIES_DE = ['Alle', 'Praktischer Rat', 'Geschichte', 'Restaurants'];
const CATEGORIES_EN = ['All', 'Practical Tips', 'History', 'Restaurants'];

function readTimeMin(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(' ').filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

const CATEGORY_RE: Record<number, RegExp> = {
  1: /reisetipp|praktisch|practical|tip|pass|budget|transport|hotel|planung|planning|ticket|karte|visa/i,
  2: /geschichte|history|kultur|culture|jüdisch|jewish|bibliothek|library|revolution|architektur|klementinum|königin|museum|velvet/i,
  3: /restaurant|food|essen|küche|cuisine|kaffee|coffee|wein|wine|kulinar|bier|beer|svíčková|náplavka|spirituosen|spirits|trdelník/i,
};

/* Journal ad inventory (German-market compliant — every slot carries the
   required "ANZEIGE" microlabel). Flip to false to hide all slots; the grid
   closes up with no gaps. In production, replace the reserved boxes with your
   ad-server tags at the same ids/geometry (ratio-reserved → no layout shift). */
const SHOW_ADS = true;

const Blog: React.FC = () => {
  const { t, language } = useLanguage();
  const de = language === 'de';
  const [activeFilter, setActiveFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const sortedPosts = React.useMemo(
    () => [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)),
    []
  );

  const categories = de ? CATEGORIES_DE : CATEGORIES_EN;

  const filteredPosts = React.useMemo(() => {
    let posts = sortedPosts;
    if (activeFilter !== 0) {
      const re = CATEGORY_RE[activeFilter];
      posts = posts.filter((p) => {
        const haystack = [...p.tags, ...((p as any).tagsDe ?? []), t(p.titleKey as any), t(p.excerptKey as any)].join(' ');
        return re.test(haystack);
      });
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      posts = posts.filter((p) => {
        const haystack = [t(p.titleKey as any), t(p.excerptKey as any), ...p.tags, ...((p as any).tagsDe ?? [])].join(' ').toLowerCase();
        return haystack.includes(q);
      });
    }
    return posts;
  }, [sortedPosts, activeFilter, searchQuery, t]);

  const isFiltering = activeFilter !== 0 || searchQuery.trim() !== '';
  const featured = isFiltering ? null : sortedPosts[0];
  const gridPosts = isFiltering ? filteredPosts : filteredPosts.filter((p) => p !== featured);

  // Interleave a single native ad at grid cell 5 (only unfiltered, enough posts).
  type GridItem = { ad: false; post: (typeof gridPosts)[number] } | { ad: true };
  const gridItems: GridItem[] = gridPosts.map((post) => ({ ad: false as const, post }));
  if (SHOW_ADS && !isFiltering && gridItems.length > 4) gridItems.splice(4, 0, { ad: true as const });

  function thumbOf(src: string): string {
    const dir = src.substring(0, src.lastIndexOf('/'));
    const file = src.substring(src.lastIndexOf('/') + 1).replace(/\.png$/i, '.jpg');
    return `${dir}/thumbs/${file}`;
  }
  function postHref(post: (typeof blogPosts)[number]) {
    return `/blog/${de && (post as any).slugDe ? (post as any).slugDe : post.slug}`;
  }
  function catOf(post: (typeof blogPosts)[number]): string {
    return (de ? (post as any).tagsDe?.[0] ?? post.tags?.[0] : post.tags?.[0]) ?? (de ? 'Journal' : 'Journal');
  }
  function minsOf(post: (typeof blogPosts)[number]): number | null {
    const content = post.contentKey ? t(post.contentKey as any) : '';
    return content ? readTimeMin(content) : null;
  }
  function metaOf(post: (typeof blogPosts)[number], withLese = false): string {
    const mins = minsOf(post);
    const date = t(post.dateKey as any);
    const read = mins ? `${mins} Min.${withLese ? (de ? ' Lesezeit' : ' read') : ''}` : '';
    return [read, date].filter(Boolean).join(' · ');
  }

  return (
    <div className="blog-index-facelift premium-inner text-ink antialiased">

      {/* ── Banner: eyebrow + H1 + intro + byline trust row ────── */}
      <header className="border-b border-rule pb-[clamp(2.5rem,5vh,4rem)] pt-[clamp(2.5rem,6vw,4.5rem)]">
        <div className={SHELL}>
          <Kicker>{de ? 'Reise-Journal · Seit 2014' : 'Travel Journal · Since 2014'}</Kicker>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,6vw,4.4rem)] font-normal leading-[1.04] tracking-[-0.015em] text-ink [text-wrap:balance] [&_em]:font-italic [&_em]:italic [&_em]:text-burgundy">
            {de ? <>Briefe aus <em>Praha</em>.</> : <>Letters from <em>Praha</em>.</>}
          </h1>
          <p className="mt-[1.4rem] max-w-[42rem] font-body text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.65] text-ink-soft">
            {de
              ? 'Reise-Notizen, Restaurant-Empfehlungen abseits der Pfade und kleine Geschichten aus zwölf Jahren Stadtführungen — von einer Pragerin, auf Deutsch.'
              : 'Travel notes, off-the-beaten-path restaurant picks, and small stories from twelve years of guiding — from a native Praguer.'}
          </p>
          <div className="mt-[1.7rem] flex flex-wrap items-center gap-[0.9rem] border-t border-rule-soft pt-[1.4rem]">
            <img src="/images/zuzana-portrait.jpg" alt="" className="h-[42px] w-[42px] rounded-full object-cover [object-position:center_18%]" loading="lazy" />
            <span className="font-sans text-[0.98rem] text-ink-soft">
              {de ? 'Persönlich geschrieben von ' : 'Personally written by '}
              <b className="font-semibold text-ink">Ing. Zuzana Manová</b>
            </span>
            <span aria-hidden className="h-[15px] w-px bg-rule" />
            <span className="whitespace-nowrap font-sans text-[0.98rem] text-ink-soft">
              {sortedPosts.length} {de ? 'Beiträge · Zuletzt erschienen' : 'articles · Last published'} {t(sortedPosts[0].dateKey as any)}
            </span>
          </div>
        </div>
      </header>

      <section className={`${SHELL} py-[clamp(2.5rem,5vh,4rem)] pb-[clamp(4rem,9vh,7rem)]`}>

        {/* ── Featured (newest) ──────────────────────────────── */}
        {featured && (
          <Reveal>
            <Link
              href={postHref(featured)}
              aria-label={`${t(featured.titleKey as any)} — ${catOf(featured)}. ${de ? 'Artikel lesen' : 'Read article'}.`}
              className="grid grid-cols-1 items-center gap-[clamp(2rem,5vw,4rem)] border-b border-rule pb-[clamp(2.5rem,5vh,4rem)] no-underline min-[860px]:grid-cols-[1.15fr_0.85fr]"
            >
              <div className="group relative">
                <div className="relative z-[1] aspect-[16/11] overflow-hidden rounded-lg bg-ivory-deep shadow-[0_8px_24px_rgba(26,23,20,0.08)]">
                  <Image src={featured.image} alt="" fill sizes="(max-width: 860px) 100vw, 55vw" className="object-cover transition-transform duration-[900ms] ease-brand group-hover:scale-[1.04]" />
                </div>
                <div aria-hidden className="absolute z-0 rounded-lg border border-brass" style={{ inset: '14px -14px -14px 14px' }} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-[0.9rem]">
                  <span className="whitespace-nowrap rounded-full border border-[rgba(123,88,0,0.35)] px-[0.8rem] py-[0.35rem] font-sans text-[11.5px] font-semibold uppercase tracking-[0.14em] text-gold-olive">
                    {de ? 'Neuester Beitrag' : 'Latest post'}
                  </span>
                  <span className="inline-flex items-center gap-[0.6rem] whitespace-nowrap font-sans text-[11.5px] uppercase tracking-[0.2em] text-brass-deep">
                    <span aria-hidden className="h-px w-[22px] bg-brass" />
                    {catOf(featured)}
                  </span>
                </div>
                <h2
                  className="mb-4 mt-[1.1rem] font-display text-[clamp(2.2rem,4.4vw,3.4rem)] font-normal leading-[1.06] tracking-[-0.015em] text-ink [&_em]:font-italic [&_em]:italic [&_em]:text-burgundy"
                  dangerouslySetInnerHTML={{ __html: (de ? (featured as any).titleHtmlDe : (featured as any).titleHtml) || t(featured.titleKey as any) }}
                />
                <p className="mb-[1.3rem] max-w-[32rem] font-italic text-[clamp(1.15rem,1.8vw,1.35rem)] italic leading-[1.55] text-ink-soft">
                  {t(featured.excerptKey as any)}
                </p>
                <div className="mb-[1.6rem] flex items-center gap-[0.5rem] whitespace-nowrap font-sans text-[1rem] text-ink-soft">
                  <span className="material-symbols-outlined text-[18px] text-brass-deep" aria-hidden>schedule</span>
                  {metaOf(featured, true)}
                </div>
                <span className="inline-flex items-center gap-[0.6rem] whitespace-nowrap border-b border-ink pb-[4px] font-sans text-[13px] font-semibold uppercase tracking-[0.15em] text-ink transition-colors duration-300 ease-brand group-hover:border-burgundy group-hover:text-burgundy">
                  {de ? 'Artikel lesen' : 'Read article'}
                  <span className="material-symbols-outlined text-[17px]" aria-hidden>arrow_forward</span>
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* ── Ad: billboard (970×250, ratio-reserved) ────────── */}
        {SHOW_ADS && featured && (
          <div className="mt-[clamp(2rem,4vh,3rem)] border-y border-rule bg-[#F5F3EF] px-4 pb-6 pt-4 text-center">
            <div className="mb-[0.85rem] font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-mute">
              {de ? 'Anzeige' : 'Advertisement'}
            </div>
            <div
              id="ad-journal-billboard"
              className="mx-auto grid aspect-[970/250] w-full max-w-[970px] place-items-center overflow-hidden rounded-md border border-rule bg-paper"
            >
              {ADSENSE_SLOTS.journalBillboard ? (
                <AdSlot slot={ADSENSE_SLOTS.journalBillboard} />
              ) : (
                <span className="px-4 font-sans text-[0.95rem] text-ink-mute">
                  {de ? (
                    <>Ihre Werbung hier — <a href="mailto:zuzanamanova@email.cz" className="text-burgundy underline-offset-2 hover:underline">Mediadaten anfragen</a></>
                  ) : (
                    <>Your ad here — <a href="mailto:zuzanamanova@email.cz" className="text-burgundy underline-offset-2 hover:underline">request media kit</a></>
                  )}
                </span>
              )}
            </div>
          </div>
        )}

        {/* ── Filter + search (kept, restyled) ───────────────── */}
        <div className={`flex flex-wrap items-center justify-between gap-6 border-b border-rule py-[1.4rem] ${featured ? 'mt-[clamp(2rem,4vh,3rem)]' : ''}`}>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(i)}
                className={`rounded-full border px-4 py-2 font-sans text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 ${
                  activeFilter === i ? 'border-burgundy text-burgundy' : 'border-transparent text-ink-soft hover:text-burgundy'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2.5 border-b border-rule pb-1.5" style={{ width: 300 }}>
            <span className="material-symbols-outlined text-[18px] text-ink-mute" aria-hidden>search</span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={de ? 'Im Journal suchen…' : 'Search the journal…'}
              className="flex-1 bg-transparent font-body text-[15px] text-ink outline-none placeholder:text-ink-mute"
            />
          </label>
        </div>

        {/* ── Grid ───────────────────────────────────────────── */}
        {gridPosts.length === 0 && (
          <p className="py-16 text-center font-italic text-[18px] italic text-ink-mute">
            {de ? 'Keine Artikel gefunden.' : 'No articles found.'}
          </p>
        )}
        <div className="mt-[clamp(2.5rem,5vh,4rem)] grid grid-cols-1 gap-x-[clamp(1.6rem,3vw,2.6rem)] gap-y-[clamp(2.5rem,5vh,3.5rem)] sm:grid-cols-2 lg:grid-cols-3">
          {gridItems.map((it, idx) =>
            it.ad ? (
              /* Native in-grid ad slot (3:2, ratio-reserved) */
              <div key={`ad-${idx}`} className="flex flex-col rounded-lg border border-rule bg-[#F5F3EF] p-4 pb-[1.15rem]">
                <div className="mb-[0.8rem] text-center font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-mute">
                  {de ? 'Anzeige' : 'Advertisement'}
                </div>
                <div id="ad-journal-native" className="grid aspect-[3/2] place-items-center overflow-hidden rounded-md border border-rule bg-paper">
                  {ADSENSE_SLOTS.journalNative ? (
                    <AdSlot slot={ADSENSE_SLOTS.journalNative} />
                  ) : (
                    <span className="px-3 text-center font-sans text-[0.9rem] text-ink-mute">{de ? 'Werbeplatz' : 'Ad space'}</span>
                  )}
                </div>
                {!ADSENSE_SLOTS.journalNative && (
                  <div className="mt-[0.85rem] text-center font-sans text-[0.92rem] leading-[1.5] text-ink-mute">
                    {de ? (
                      <>Ihre Werbung im Journal — <a href="mailto:zuzanamanova@email.cz" className="text-burgundy underline-offset-2 hover:underline">Mediadaten anfragen</a></>
                    ) : (
                      <>Your ad in the journal — <a href="mailto:zuzanamanova@email.cz" className="text-burgundy underline-offset-2 hover:underline">request media kit</a></>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Reveal as="article" key={it.post.id}>
                <Link
                  href={postHref(it.post)}
                  aria-label={`${t(it.post.titleKey as any)} — ${catOf(it.post)}. ${de ? 'Artikel lesen' : 'Read article'}.`}
                  className="group flex h-full flex-col no-underline"
                >
                  <div className="mb-[1.1rem] aspect-[3/2] overflow-hidden rounded-lg bg-ivory-deep">
                    <div className="relative h-full w-full transition-transform duration-[800ms] ease-brand group-hover:scale-[1.05]">
                      <Image src={thumbOf(it.post.image)} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" loading="lazy" />
                    </div>
                  </div>
                  <span className="font-sans text-[11.5px] font-semibold uppercase tracking-[0.18em] text-brass-deep">{catOf(it.post)}</span>
                  <h3
                    className="mb-2 mt-[0.55rem] font-display text-[1.55rem] font-normal leading-[1.16] text-ink [&_em]:font-italic [&_em]:italic [&_em]:text-burgundy"
                    dangerouslySetInnerHTML={{ __html: (de ? (it.post as any).titleHtmlDe : (it.post as any).titleHtml) || t(it.post.titleKey as any) }}
                  />
                  <p className="mb-4 font-body text-[1.02rem] leading-[1.62] text-ink-soft">{t(it.post.excerptKey as any)}</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-[0.45rem] font-sans text-[0.95rem] text-ink-soft">
                      <span className="material-symbols-outlined text-[16px] text-brass-deep" aria-hidden>schedule</span>
                      {metaOf(it.post)}
                    </span>
                    <span className="inline-flex items-center gap-[0.45rem] whitespace-nowrap border-b border-ink pb-[3px] font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-300 ease-brand group-hover:border-burgundy group-hover:text-burgundy">
                      {de ? 'Weiterlesen' : 'Read on'}
                      <span className="material-symbols-outlined text-[15px]" aria-hidden>arrow_forward</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          )}
        </div>
      </section>

      {/* ── SEO editorial block (kept, restyled) ───────────────── */}
      <section className="border-t border-rule">
        <div className={`${SHELL} py-[clamp(3rem,7vh,5rem)]`}>
          <div className="grid gap-[clamp(2rem,5vw,3.5rem)] md:grid-cols-[1fr_1.6fr]">
            <div>
              <Kicker>{de ? 'Über dieses Journal' : 'About this Journal'}</Kicker>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.4rem)] font-normal leading-[1.1] tracking-[-0.01em] text-ink [&_em]:font-italic [&_em]:italic [&_em]:text-burgundy">
                {de ? <>Prag — ehrlich, <em>auf Deutsch</em></> : <>Prague — honest, <em>in German</em></>}
              </h2>
            </div>
            <div className="space-y-5 font-body text-[1.075rem] leading-[1.78] text-ink-soft">
              {de ? (
                <>
                  <p>
                    Dieses Journal ist kein Reiseführer im klassischen Sinn. Es ist die Sammlung dessen, was ich meinen
                    Gästen sage — bevor die Tour beginnt, wenn niemand zuhört, und wenn sie am Ende fragen: „Wohin wirklich?"
                    Ich bin in Prag geboren, an der Karls-Universität ausgebildet, seit über einem Jahrzehnt staatlich
                    zertifizierte Stadtführerin. Prag ist nicht mein Job. Es ist meine Stadt.
                  </p>
                  <p>
                    Die Artikel hier behandeln, was die großen Reiseportale weglassen: welche Wechselstuben Sie meiden
                    sollten, warum der Trdelník keine böhmische Tradition ist, welche Restaurants in Vinohrady und Karlín
                    wirklich kochen — und warum die Karlsbrücke um 6 Uhr morgens eine andere Stadt ist als um 14 Uhr.
                    Prag Insider-Tipps, Touristenfallen, böhmische Küche, versteckte Sehenswürdigkeiten und die Geschichten
                    hinter den Fassaden der Prager Altstadt.
                  </p>
                  <p>Alles auf Deutsch. Alles aus erster Hand.</p>
                </>
              ) : (
                <>
                  <p>
                    This journal is not a travel guide in the conventional sense. It is the collection of what I tell my
                    guests — before the tour starts, when nobody is listening, and when they ask at the end: "Where should
                    we really go?" I was born in Prague, trained at Charles University, and have been a state-certified
                    guide for over a decade. Prague is not my job. It is my city.
                  </p>
                  <p>
                    The articles here cover what the big travel portals leave out: which exchange booths to avoid, why
                    Trdelník is not a Bohemian tradition, which restaurants in Vinohrady and Karlín actually cook —
                    and why Charles Bridge at 6am is a different city than at 2pm.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Dark CTA band ──────────────────────────────────────── */}
      <section className="bg-ink text-ivory">
        <div className={`${SHELL} py-[clamp(3.5rem,8vh,5.5rem)] text-center`}>
          <span className="inline-flex items-center justify-center gap-[0.9rem] font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
            <span aria-hidden className="h-px w-7 bg-brass" />
            {de ? 'Bleiben Sie in Verbindung' : 'Stay in touch'}
            <span aria-hidden className="h-px w-7 bg-brass" />
          </span>
          <h2 className="mx-auto mt-[1.1rem] max-w-[24ch] font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-normal leading-[1.08] tracking-[-0.015em] text-ivory">
            {de ? (
              <>Planen Sie einen Besuch? Lassen Sie uns <em className="font-italic italic text-gold-lamp">sprechen</em>.</>
            ) : (
              <>Planning a visit? Let’s <em className="font-italic italic text-gold-lamp">talk</em>.</>
            )}
          </h2>
          <div className="mt-[1.6rem] flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
            <Btn href="/contact#contact-title" variant="cream" arrow>
              {de ? 'Kontakt aufnehmen' : 'Get in touch'}
            </Btn>
            <a href={`tel:${BRAND.phoneRaw}`} className="border-b border-ivory/55 pb-[3px] font-sans text-[1.15rem] font-semibold text-ivory transition-colors duration-300 hover:border-ivory">
              {BRAND.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ── Ad: footer leaderboard — light band that breaks up the two dark CTA bands ── */}
      {SHOW_ADS && (
        <section className="bg-[#F5F3EF]">
          <div className={`${SHELL} py-[clamp(2rem,4vh,3rem)] text-center`}>
            <div className="mb-[0.85rem] font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-mute">
              {de ? 'Anzeige' : 'Advertisement'}
            </div>
            <div
              id="ad-journal-footer"
              className="mx-auto grid aspect-[728/90] w-full max-w-[728px] place-items-center overflow-hidden rounded-md border border-rule bg-paper"
            >
              {ADSENSE_SLOTS.journalFooter ? (
                <AdSlot slot={ADSENSE_SLOTS.journalFooter} />
              ) : (
                <span className="px-4 text-center font-sans text-[0.95rem] text-ink-mute">
                  {de ? (
                    <>Ihre Werbung hier — <a href="mailto:zuzanamanova@email.cz" className="text-burgundy underline-offset-2 hover:underline">Mediadaten anfragen</a></>
                  ) : (
                    <>Your ad here — <a href="mailto:zuzanamanova@email.cz" className="text-burgundy underline-offset-2 hover:underline">request media kit</a></>
                  )}
                </span>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Blog;
