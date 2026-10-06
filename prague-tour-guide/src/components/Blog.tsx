'use client';

/**
 * Blog — journal index, v4 (design_handoff_blog_winter_mobile · Blog Journal v4).
 *
 * A full-bleed hero for the featured post (pinned, else newest), the
 * "Briefe aus Praha." intro with category pills, author line and search, then
 * the article grid: cards with a wide card at every 7th position and one ad
 * slot. Desktop pages through 14 posts at a time (real ?page=N links that JS
 * intercepts); below 720px the cards become compact rows and the pager gives
 * way to "Weitere Artikel laden". Closes with "Über dieses Journal" and a CTA.
 * Layout lives in src/styles/journal-index.css.
 */

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { blogPosts } from '../utils/blogData';
import { postText } from '../utils/postText';
import { BRAND } from '../brand';
import AdSlot from './AdSlot';
import { ADSENSE_ENABLED, ADSENSE_SLOTS } from '../config/adsense';
import { AVATAR_SRC } from './site/Portrait';

const CATEGORIES_DE = ['Alle', 'Praktischer Rat', 'Geschichte', 'Restaurants', 'Prag erleben'];
const CATEGORIES_EN = ['All', 'Practical Tips', 'History', 'Restaurants', 'Experience Prague'];
const FALLBACK_CATEGORY = 4; // "Prag erleben"

/** Category match order: a hit in the title wins, then tags/excerpt (reverse order). */
const CATEGORY_RE: [number, RegExp][] = [
  [3, /restaurant|food|essen|küche|cuisine|kaffee|coffee|wein|wine|kulinar|bier|beer|svíčková|náplavka|spirituosen|spirits|trdelník/i],
  [2, /geschichte|history|kultur|culture|jüdisch|jewish|bibliothek|library|revolution|architektur|klementinum|königin|museum|velvet|havel|kafka/i],
  [1, /reisetipp|praktisch|practical|tip|pass|budget|transport|hotel|planung|planning|ticket|karte|visa|geld|money/i],
];

const MONTHS_DE = ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.'];
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const PER_PAGE = 14;
const MOBILE_QUERY = '(max-width: 719px)';

/* Journal ad inventory: one slot in the grid (970×250 desktop, 300×250 mobile),
   carrying the required "ANZEIGE" label. Flip to false to hide it. */
const SHOW_ADS = true;

function readTimeMin(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(' ').filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

const stripTags = (s: string) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');

function thumbOf(src: string): string {
  const dir = src.substring(0, src.lastIndexOf('/'));
  const file = src.substring(src.lastIndexOf('/') + 1).replace(/\.png$/i, '.jpg');
  return `${dir}/thumbs/${file}`;
}

/** Hero title split: an <em> in the title decides; otherwise after the first ": " or " – ". */
function heroSegments(titleHtml: string | undefined, title: string): { text: string; em: boolean }[] {
  if (titleHtml && /<em>/i.test(titleHtml)) {
    return titleHtml
      .split(/(<em>[\s\S]*?<\/em>)/i)
      .filter(Boolean)
      .map((part) => {
        const m = part.match(/^<em>([\s\S]*?)<\/em>$/i);
        return { text: stripTags(m ? m[1] : part), em: !!m };
      });
  }
  let cut = title.indexOf(': ');
  cut = cut >= 0 ? cut + 2 : title.indexOf(' – ') >= 0 ? title.indexOf(' – ') + 3 : -1;
  if (cut < 0) return [{ text: title, em: false }];
  return [
    { text: title.slice(0, cut), em: false },
    { text: title.slice(cut), em: true },
  ];
}

/** Matches `(max-width: 719px)`; false during SSR and the first render. */
function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return mobile;
}

const pageFromUrl = () => {
  const n = parseInt(new URLSearchParams(window.location.search).get('page') ?? '1', 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
};

const Blog: React.FC = () => {
  const { t, language } = useLanguage();
  const de = language === 'de';
  const categories = de ? CATEGORIES_DE : CATEGORIES_EN;
  const [activeFilter, setActiveFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageState, setPageState] = useState(1);
  const [batches, setBatches] = useState(1);
  const isMobile = useIsMobile();
  const listRef = React.useRef<HTMLElement>(null);

  // ?page=N is the crawlable pager URL; read it after mount, follow back/forward.
  React.useEffect(() => {
    const sync = () => setPageState(pageFromUrl());
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const items = React.useMemo(() => {
    const months = de ? MONTHS_DE : MONTHS_EN;
    return [...blogPosts]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((post) => {
        const title = stripTags(postText(post.titleKey, language));
        const excerpt = postText(post.excerptKey, language);
        const hay = [...post.tags, ...(post.tagsDe ?? []), excerpt].join(' ');
        const explicit = post.category ? CATEGORIES_DE.indexOf(post.category) : -1;
        const hit =
          CATEGORY_RE.find(([, re]) => re.test(title)) ?? [...CATEGORY_RE].reverse().find(([, re]) => re.test(hay));
        const ci = explicit > 0 ? explicit : hit ? hit[0] : FALLBACK_CATEGORY;
        const content = post.contentKey ? postText(post.contentKey, language) : '';
        const mins = content ? readTimeMin(content) : 0;
        const dateLabel = postText(post.dateKey, language);
        const dm = /^(\d{4})-(\d{2})-(\d{2})/.exec(post.date);
        const dateShort = dm ? (de ? `${+dm[3]}. ${months[+dm[2] - 1]} ${dm[1]}` : `${months[+dm[2] - 1]} ${+dm[3]}, ${dm[1]}`) : dateLabel;
        const read = mins >= 3 ? (de ? `Lesezeit ${mins} Min.` : `${mins} min read`) : '';
        return {
          post,
          title,
          titleHtml: (de ? post.titleHtmlDe : post.titleHtml) || undefined,
          excerpt,
          hay: `${hay} ${title}`.toLowerCase(),
          ci,
          mins,
          dateLabel,
          meta: [dateLabel, read].filter(Boolean).join(' · '),
          metaShort: [dateShort, read].filter(Boolean).join(' · '),
          href: `/blog/${de && post.slugDe ? post.slugDe : post.slug}`,
          thumb: thumbOf(post.image),
          full: post.image,
        };
      });
  }, [t, de]);
  type Item = (typeof items)[number];

  const q = searchQuery.trim().toLowerCase();
  const isFiltering = activeFilter !== 0 || q !== '';
  const filtered = items.filter((it) => (activeFilter === 0 || it.ci === activeFilter) && (!q || it.hay.includes(q)));
  const lead: Item | null = isFiltering ? null : items.find((it) => it.post.pinned) ?? items[0] ?? null;
  const list = isFiltering ? filtered : filtered.filter((it) => it !== lead);

  const pageCount = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const page = isMobile ? 1 : Math.min(pageState, pageCount);
  const featured = page === 1 ? lead : null;
  const shown = Math.min(list.length, batches * PER_PAGE);
  const slice = isMobile ? list.slice(0, shown) : list.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  type Cell = { kind: 'post'; it: Item; wide: boolean; first: boolean } | { kind: 'ad' };
  const cells: Cell[] = slice.map((it, i) => ({ kind: 'post', it, wide: i % 7 === 3, first: i === 0 }));
  if (SHOW_ADS && !isFiltering && cells.length > 7) cells.splice(7, 0, { kind: 'ad' });

  const resetPaging = () => {
    setBatches(1);
    setPageState(1);
    if (window.location.search) window.history.replaceState(null, '', window.location.pathname);
  };
  const pickCategory = (i: number, e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveFilter(i);
    resetPaging();
    // Mobile: bring the tapped pill to the middle of the scrolling row.
    const pill = e.currentTarget;
    const row = pill.parentElement;
    if (row && row.scrollWidth > row.clientWidth) {
      row.scrollTo({ left: pill.offsetLeft - (row.clientWidth - pill.offsetWidth) / 2, behavior: 'smooth' });
    }
  };
  const goPage = (n: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState(null, '', n > 1 ? `?page=${n}` : window.location.pathname);
    setPageState(n);
    const el = listRef.current;
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: 'smooth' });
  };
  const loadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    setBatches((b) => b + 1);
  };

  // Pager numbers: first, last and the neighbours of the current page.
  const pageNums: number[] = [];
  for (let n = 1; n <= pageCount; n++) if (n === 1 || n === pageCount || Math.abs(n - page) <= 1) pageNums.push(n);
  const pageHref = (n: number) => (n > 1 ? `/blog?page=${n}` : '/blog');

  const listHeading = isFiltering
    ? `${filtered.length} ${de ? 'Artikel' : filtered.length === 1 ? 'article' : 'articles'}${activeFilter ? ` ${de ? 'in' : 'in'} ${categories[activeFilter]}` : ''}`
    : page > 1
      ? de ? 'Ältere Artikel' : 'Older articles'
      : de ? 'Neueste Artikel' : 'Latest articles';

  const heroMeta = featured
    ? [featured.mins >= 3 ? (de ? `${featured.mins} Min. Lesezeit` : `${featured.mins} min read`) : '', featured.dateLabel].filter(Boolean).join(' · ')
    : '';

  return (
    <div className="journal-page journal-index text-journal-ink antialiased">
      {/* ── Hero: featured post, full bleed ─────────────────────── */}
      {featured && (
        <Link
          href={featured.href}
          className="jx-hero"
          aria-label={`${featured.title} – ${categories[featured.ci]}. ${de ? 'Artikel lesen' : 'Read article'}.`}
        >
          <Image src={featured.full} alt="" fill priority sizes="100vw" className="jx-hero__img" />
          <div className="jx-hero__scrim" aria-hidden="true" />
          <div className="jx-hero__inner">
            <div className="jx-hero__col">
              <div className="jx-hero__labels">
                <span className="jx-hero__pill">
                  {featured === items[0] ? (de ? 'Neuester Beitrag' : 'Latest post') : de ? 'Empfohlener Beitrag' : 'Featured post'}
                </span>
                <span className="jx-hero__cat">{categories[featured.ci]}</span>
              </div>
              <h2 className="jx-hero__title">
                {heroSegments(featured.titleHtml, featured.title).map((s, i) =>
                  s.em ? <em key={i}>{s.text}</em> : <span key={i}>{s.text}</span>
                )}
              </h2>
              <p className="jx-hero__excerpt">{featured.excerpt}</p>
              <div className="jx-hero__actions">
                <span className="jx-hero__read">
                  {de ? 'Artikel lesen' : 'Read article'}
                  <svg className="jx-hero__arrow" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
                {heroMeta && <span className="jx-hero__meta">{heroMeta}</span>}
              </div>
            </div>
          </div>
        </Link>
      )}

      <div className="jx-shell">
        {/* ── Intro: H1, filters, author, search ─────────────────── */}
        <div className="jx-intro">
          <div className="jx-intro__main">
            <h1 className="jx-intro__h1">
              {de ? 'Briefe aus' : 'Letters from'} <em>Praha</em>.
            </h1>
            <div className="jx-chips">
              {categories.map((cat, i) => (
                <button key={cat} type="button" className="jx-chip" aria-pressed={activeFilter === i} onClick={(e) => pickCategory(i, e)}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="jx-intro__side">
            <div className="jx-author">
              <img src={AVATAR_SRC} alt="" />
              <div>
                {de ? 'Persönlich geschrieben von' : 'Personally written by'}
                <br />
                <b>Ing. Zuzana Manová</b> · {items.length} {de ? 'Beiträge' : 'articles'}
              </div>
            </div>
            <label className="jx-search">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5C5650" strokeWidth="2" aria-hidden="true" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-5-5" />
              </svg>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  resetPaging();
                }}
                aria-label={de ? 'Im Journal suchen' : 'Search the journal'}
                placeholder={de ? 'Im Journal suchen…' : 'Search the journal…'}
              />
            </label>
          </div>
        </div>

        {/* ── Article list ───────────────────────────────────────── */}
        <section ref={listRef} className="jx-list">
          <div className="jx-list__head">
            <h2>{listHeading}</h2>
            {pageCount > 1 && !isFiltering && (
              <span className="jx-list__info">{de ? `Seite ${page} von ${pageCount}` : `Page ${page} of ${pageCount}`}</span>
            )}
          </div>

          {list.length === 0 && <p className="jx-empty">{de ? 'Keine Artikel gefunden.' : 'No articles found.'}</p>}

          <div className="jx-grid">
            {cells.map((cell, idx) => {
              if (cell.kind === 'ad') {
                return (
                  <div key={`ad-${idx}`} className="jx-ad">
                    <div className="jx-ad__label">{de ? 'Anzeige' : 'Advertisement'}</div>
                    <div id="ad-journal-billboard" className="jx-ad__box">
                      {ADSENSE_ENABLED && ADSENSE_SLOTS.journalBillboard ? (
                        <AdSlot slot={ADSENSE_SLOTS.journalBillboard} />
                      ) : (
                        <span>
                          {de ? 'Ihre Werbung hier — ' : 'Your ad here — '}
                          <a href={`mailto:${BRAND.email}`}>{de ? 'Mediadaten anfragen' : 'request media kit'}</a>
                        </span>
                      )}
                    </div>
                  </div>
                );
              }
              const { it, wide, first } = cell;
              const img = wide && /\.jpe?g$/i.test(it.full) ? it.full : it.thumb;
              return (
                <Link key={it.post.id} href={it.href} className={`${wide ? 'jx-wide' : 'jx-card'}${first ? ' is-first' : ''}`}>
                  <div className="jx-card__media">
                    <Image src={img} alt="" fill sizes={wide ? '(max-width: 1160px) 100vw, 600px' : '(max-width: 719px) 112px, 360px'} className="object-cover" loading="lazy" />
                  </div>
                  <div className="jx-card__body">
                    <div className="jx-card__cat">{categories[it.ci]}</div>
                    <h3 className="jx-card__title">{it.title}</h3>
                    <p className="jx-card__excerpt">{it.excerpt}</p>
                    <div className="jx-card__meta">
                      <span className="jx-long">{it.meta}</span>
                      <span className="jx-short">{it.metaShort}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {pageCount > 1 && (
            <nav className="jx-pager" aria-label={de ? 'Seitennavigation' : 'Pagination'}>
              <a href={pageHref(page - 1)} onClick={goPage(page - 1)} className="jx-pager__step" aria-disabled={page === 1}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
                {de ? 'Zurück' : 'Previous'}
              </a>
              <div className="jx-pager__nums">
                {pageNums.map((n, k) => (
                  <React.Fragment key={n}>
                    {k > 0 && n - pageNums[k - 1] > 1 && <span className="jx-pager__gap" aria-hidden="true">…</span>}
                    <a
                      href={pageHref(n)}
                      onClick={goPage(n)}
                      className="jx-pager__num"
                      aria-current={n === page ? 'page' : undefined}
                      aria-label={de ? `Seite ${n}` : `Page ${n}`}
                    >
                      {n}
                    </a>
                  </React.Fragment>
                ))}
              </div>
              <a href={pageHref(page + 1)} onClick={goPage(page + 1)} className="jx-pager__step" aria-disabled={page === pageCount}>
                {de ? 'Weiter' : 'Next'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
              </a>
            </nav>
          )}

          {shown < list.length && (
            <div className="jx-more">
              <a href={pageHref(batches + 1)} onClick={loadMore} className="jx-more__btn">
                {de ? 'Weitere Artikel laden' : 'Load more articles'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
              </a>
              <div className="jx-more__info">
                {shown + (featured ? 1 : 0)} {de ? 'von' : 'of'} {list.length + (featured ? 1 : 0)} {de ? 'Artikeln' : 'articles'}
              </div>
            </div>
          )}
        </section>

        {/* ── About this journal ─────────────────────────────────── */}
        <section className="jx-about">
          <h2>{de ? 'Über dieses Journal' : 'About this journal'}</h2>
          <div className="jx-about__text">
            {de ? (
              <>
                <p>
                  Dieses Journal ist kein Reiseführer im klassischen Sinn. Es ist die Sammlung dessen, was ich meinen Gästen sage – bevor die
                  Tour beginnt, wenn niemand zuhört, und wenn sie am Ende fragen: „Wohin wirklich?“ Ich bin in Prag geboren, an der
                  Karls-Universität ausgebildet und staatlich zertifizierte Stadtführerin. Prag ist nicht mein Job. Es ist meine Stadt.
                </p>
                <p>
                  Die Artikel behandeln, was die großen Reiseportale weglassen: welche Wechselstuben Sie meiden sollten, welche Restaurants in
                  Vinohrady und Karlín wirklich kochen und warum die Karlsbrücke um 6 Uhr morgens eine andere Stadt ist als um 14 Uhr. Alles
                  auf Deutsch, alles aus erster Hand.
                </p>
              </>
            ) : (
              <>
                <p>
                  This journal is not a travel guide in the conventional sense. It is the collection of what I tell my guests – before the
                  tour starts, when nobody is listening, and when they ask at the end: “Where should we really go?” I was born in Prague,
                  trained at Charles University and am a state-certified guide. Prague is not my job. It is my city.
                </p>
                <p>
                  The articles cover what the big travel portals leave out: which exchange booths to avoid, which restaurants in Vinohrady
                  and Karlín actually cook, and why Charles Bridge at 6am is a different city than at 2pm. All first-hand.
                </p>
              </>
            )}
          </div>
        </section>

        <aside className="jx-cta">
          <div className="jx-cta__text">
            <div className="jx-cta__title">{de ? 'Prag mit Zuzana erleben' : 'Experience Prague with Zuzana'}</div>
            <p>
              {de
                ? 'Private Stadtführungen auf Deutsch, in Ihrem Tempo. Unverbindlich anfragen oder direkt anrufen: '
                : 'Private walking tours at your own pace. Send a no-obligation enquiry or call directly: '}
              <a href={`tel:${BRAND.phoneRaw}`}>{BRAND.phone}</a>
            </p>
          </div>
          <Link href="/book#contact-title" className="jx-cta__btn">
            {de ? 'Tour anfragen' : 'Request a tour'}
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default Blog;
