'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { blogPosts } from '../utils/blogData';
import Masthead from './blog/Masthead';
import ReservationStrip from './blog/ReservationStrip';

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

const Blog: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const sortedPosts = React.useMemo(
    () => [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)),
    []
  );

  const categories = language === 'de' ? CATEGORIES_DE : CATEGORIES_EN;

  const filteredPosts = React.useMemo(() => {
    let posts = sortedPosts;

    if (activeFilter !== 0) {
      const re = CATEGORY_RE[activeFilter];
      posts = posts.filter(p => {
        const haystack = [
          ...p.tags,
          ...((p as any).tagsDe ?? []),
          t(p.titleKey as any),
          t(p.excerptKey as any),
        ].join(' ');
        return re.test(haystack);
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      posts = posts.filter(p => {
        const haystack = [
          t(p.titleKey as any),
          t(p.excerptKey as any),
          ...p.tags,
          ...((p as any).tagsDe ?? []),
        ].join(' ').toLowerCase();
        return haystack.includes(q);
      });
    }

    return posts;
  }, [sortedPosts, activeFilter, searchQuery, t]);

  const isFiltering = activeFilter !== 0 || searchQuery.trim() !== '';
  const featured = isFiltering ? null : (sortedPosts.find(p => p.id === '35') ?? sortedPosts[0]);
  const gridPosts = isFiltering ? filteredPosts : filteredPosts.filter(p => p !== featured);

  function thumbOf(src: string): string {
    const dir = src.substring(0, src.lastIndexOf('/'));
    const file = src.substring(src.lastIndexOf('/') + 1).replace(/\.png$/i, '.jpg');
    return `${dir}/thumbs/${file}`;
  }

  function postHref(post: (typeof blogPosts)[number]) {
    return `/blog/${language === 'de' && (post as any).slugDe ? (post as any).slugDe : post.slug}`;
  }

  return (
    <div className="blog-index-root min-h-screen bg-ivory">
      <Masthead />

      {/* Index hero */}
      <section className="mx-auto max-w-shell border-b border-rule px-6 pb-[60px] pt-[100px] text-center md:px-12">
        <div className="mb-7 inline-flex items-center gap-[14px] font-sans text-[11px] uppercase tracking-[0.3em] text-burgundy before:block before:h-px before:w-7 before:bg-burgundy after:block after:h-px after:w-7 after:bg-burgundy">
          {language === 'de' ? 'Reise-Journal · Seit 2014' : 'Travel Journal · Since 2014'}
        </div>
        <h1 className="m-0 mb-7 font-display text-[clamp(56px,8vw,116px)] font-normal leading-[1.0] tracking-[0.005em] text-ink [&_em]:font-italic [&_em]:italic [&_em]:tracking-[-0.005em] [&_em]:text-burgundy">
          {language === 'de' ? <>Briefe aus <em>Praha</em>.</> : <>Letters from <em>Praha</em>.</>}
        </h1>
        <p className="mx-auto mb-10 max-w-[56ch] font-italic text-[22px] italic leading-[1.5] text-ink-soft">
          {language === 'de'
            ? 'Reise-Notizen, Restaurant-Empfehlungen abseits der Pfade und kleine Geschichten aus zwölf Jahren Stadtführungen — von einer Pragerin, auf Deutsch.'
            : 'Travel notes, off-the-beaten-path restaurant picks, and small stories from twelve years of guiding — from a native Praguer.'}
        </p>
        <div className="flex justify-center gap-10 font-sans text-[11px] uppercase tracking-[0.18em] text-ink-mute">
          <span><strong className="font-medium text-ink">{sortedPosts.length}</strong> {language === 'de' ? 'Artikel' : 'Articles'}</span>
          <span><strong className="font-medium text-ink">9</strong> {language === 'de' ? 'Kategorien' : 'Categories'}</span>
          <span>{language === 'de' ? 'Aktualisiert ' : 'Updated '}<strong className="font-medium text-ink">{language === 'de' ? 'wöchentlich' : 'weekly'}</strong></span>
        </div>
      </section>

      {/* Filter bar */}
      <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-6 border-b border-rule px-6 py-8 md:px-12">
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(i)}
              className={`border px-4 py-2 font-sans text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 ${
                activeFilter === i
                  ? 'border-burgundy text-burgundy'
                  : 'border-transparent text-ink-soft hover:text-burgundy'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2.5 border-b border-rule pb-1.5" style={{ width: 320 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="shrink-0 text-ink-mute">
            <circle cx="11" cy="11" r="7" /><path d="M21 21l-5-5" />
          </svg>
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={language === 'de' ? 'Im Journal suchen…' : 'Search the journal…'}
            className="flex-1 bg-transparent font-italic text-[15px] italic text-ink outline-none placeholder:text-ink-mute"
          />
        </label>
      </div>

      {/* Featured article */}
      {featured && (
        <section className="mx-auto max-w-shell" style={{ padding: '80px 48px 0px' }}>
          <Link href={postHref(featured)} className="grid items-center gap-16 no-underline md:grid-cols-[1.2fr_1fr]">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={featured.image}
                alt={t(featured.titleKey as any)}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.01]"
              />
            </div>
            <div>
              <span className="mb-6 inline-block border-b border-burgundy pb-1 font-sans text-[10px] uppercase tracking-[0.28em] text-burgundy">
                {language === 'de' ? 'Aktuelle Empfehlung' : 'Featured'}
              </span>
              <h2
                className="mb-6 max-w-[14ch] font-display text-[56px] font-normal leading-[1.05] tracking-[0.005em] text-ink [&_em]:font-italic [&_em]:italic [&_em]:tracking-[-0.005em] [&_em]:text-burgundy"
                dangerouslySetInnerHTML={{
                  __html:
                    (language === 'de' ? (featured as any).titleHtmlDe : (featured as any).titleHtml) ||
                    t(featured.titleKey as any),
                }}
              />
              <p className="mb-8 font-italic text-[19px] italic leading-[1.5] text-ink-soft">
                {t(featured.excerptKey as any)}
              </p>
              <div className="flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.12em] text-ink-mute">
                <span>{featured.author}</span>
                <span className="text-rule">·</span>
                <span>{t(featured.dateKey as any)}</span>
                <span className="ml-auto border-b border-burgundy pb-0.5 text-burgundy">
                  {language === 'de' ? 'Artikel lesen →' : 'Read article →'}
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Ornament divider */}
      <div className="mx-auto flex max-w-shell items-center justify-center gap-5 py-[60px]" aria-hidden="true">
        <span className="block h-px w-[100px] bg-brass opacity-50" />
        <span className="font-sans text-[11px] uppercase tracking-[0.28em] text-ink-mute">
          {language === 'de' ? 'Alle Beiträge' : 'All Articles'}
        </span>
        <span className="block h-px w-[100px] bg-brass opacity-50" />
      </div>

      {/* Article grid */}
      <section className="mx-auto max-w-shell px-6 pb-[100px] md:px-12">
        {gridPosts.length === 0 && (
          <p className="py-16 text-center font-italic text-[18px] italic text-ink-mute">
            {language === 'de' ? 'Keine Artikel gefunden.' : 'No articles found.'}
          </p>
        )}
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {gridPosts.map((post) => (
            <Link key={post.id} href={postHref(post)} className="group no-underline">
              <div className="mb-[22px] aspect-[4/3] overflow-hidden">
                <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
                  <Image
                    src={thumbOf(post.image)}
                    alt={t(post.titleKey as any)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="mb-3 font-sans text-[10px] uppercase tracking-[0.24em] text-burgundy">
                {(() => {
                  const tag = language === 'de'
                    ? ((post as any).tagsDe?.[0] ?? post.tags?.[0] ?? '')
                    : (post.tags?.[0] ?? '');
                  const content = post.contentKey ? t(post.contentKey as any) : '';
                  const mins = content ? readTimeMin(content) : null;
                  return mins ? `${tag} · ${mins} min` : tag;
                })()}
              </div>
              <h3
                className="mb-3.5 font-display text-[28px] font-normal leading-[1.15] tracking-[0.005em] text-ink [&_em]:font-italic [&_em]:italic [&_em]:tracking-[-0.005em] [&_em]:text-burgundy"
                dangerouslySetInnerHTML={{
                  __html:
                    (language === 'de' ? (post as any).titleHtmlDe : (post as any).titleHtml) ||
                    t(post.titleKey as any),
                }}
              />
              <p className="mb-[18px] font-body text-[15px] leading-[1.55] text-ink-soft">
                {t(post.excerptKey as any)}
              </p>
              <div className="flex justify-between border-t border-rule pt-3.5 font-sans text-[11px] uppercase tracking-[0.1em] text-ink-mute">
                <span>{post.author.split(' ').slice(-1)[0]}</span>
                <span>{t(post.dateKey as any)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter band */}
      <div className="relative mx-auto mb-[60px] max-w-shell border border-rule-soft bg-paper px-12 py-16 text-center before:absolute before:bottom-3 before:left-3 before:top-3 before:w-px before:bg-brass before:opacity-40 after:absolute after:bottom-3 after:right-3 after:top-3 after:w-px after:bg-brass after:opacity-40">
        <div className="mb-4 font-sans text-[11px] uppercase tracking-[0.3em] text-brass-deep">
          {language === 'de' ? 'Das Pragtour-Journal' : 'The Pragtour Journal'}
        </div>
        <h3 className="mx-auto mb-3.5 max-w-[24ch] font-display text-[44px] font-normal leading-[1.15] tracking-[0.005em] text-ink [&_em]:font-italic [&_em]:italic [&_em]:tracking-[-0.005em] [&_em]:text-burgundy">
          {language === 'de' ? <>Briefe aus <em>Praha</em>, einmal monatlich.</> : <>Letters from <em>Praha</em>, once a month.</>}
        </h3>
        <p className="mx-auto mb-7 max-w-[52ch] font-italic text-[17px] italic text-ink-soft">
          {language === 'de'
            ? 'Reise-Notizen, Restaurant-Empfehlungen abseits der Pfade und kleine Geschichten aus zwölf Jahren Stadtführungen — direkt in Ihren Posteingang.'
            : 'Travel notes, off-the-beaten-path restaurant picks, and small stories — straight to your inbox.'}
        </p>
        <form
          className="mx-auto flex max-w-[460px] border-b border-ink"
          onSubmit={e => {
            e.preventDefault();
            const btn = (e.currentTarget as HTMLFormElement).querySelector('button');
            if (btn) btn.textContent = language === 'de' ? 'Bestätigt ✓' : 'Confirmed ✓';
          }}
        >
          <input
            type="email"
            placeholder={language === 'de' ? 'Ihre E-Mail-Adresse' : 'Your email address'}
            className="flex-1 bg-transparent py-3 font-body text-[16px] italic text-ink outline-none placeholder:italic placeholder:text-ink-mute"
          />
          <button type="submit" className="bg-transparent py-3 pl-5 font-sans text-[11px] uppercase tracking-[0.2em] text-burgundy transition-colors hover:text-burgundy-deep">
            {language === 'de' ? 'Abonnieren →' : 'Subscribe →'}
          </button>
        </form>
      </div>

      <ReservationStrip />

      {/* Footer */}
      <footer className="bg-ink px-6 pb-10 pt-[80px] text-ivory md:px-12">
        <div className="mx-auto grid max-w-shell gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="mb-4 font-italic text-[30px] italic text-ivory">
              Zuza <em className="not-italic text-brass">&amp;</em> Pragtour
            </p>
            <p className="max-w-[32ch] font-italic text-[16px] italic leading-[1.5] text-ivory/60">
              {language === 'de'
                ? 'Private Stadtführungen für anspruchsvolle Reisende. Seit 2014. Auf Deutsch, in Prag.'
                : 'Private city tours for discerning travellers. Since 2014. In German, in Prague.'}
            </p>
          </div>
          {[
            {
              heading: language === 'de' ? 'Touren' : 'Tours',
              links: [
                [language === 'de' ? 'Altstadt & Burg' : 'Old Town & Castle', '/tours'],
                [language === 'de' ? 'Jüdisches Viertel' : 'Jewish Quarter', '/tours'],
                [language === 'de' ? 'Kulinarisches Prag' : 'Culinary Prague', '/tours'],
                [language === 'de' ? 'Privattour nach Maß' : 'Custom Tour', '/book'],
              ],
            },
            {
              heading: 'Journal',
              links: [
                [language === 'de' ? 'Reisetipps' : 'Travel Tips', '/blog'],
                ['Restaurants', '/blog'],
                [language === 'de' ? 'Geschichte' : 'History', '/blog'],
                ['Newsletter', '/contact'],
              ],
            },
            {
              heading: 'Kontakt',
              links: [
                ['zuzana@zuzapragtour.de', '/contact'],
                [language === 'de' ? 'Reservieren' : 'Book a tour', '/book'],
                ['Instagram', '/contact'],
                [language === 'de' ? 'Über mich' : 'About me', '/zuzana-manova'],
              ],
            },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="mb-[18px] font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-brass">
                {heading}
              </h4>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                {links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="font-body text-[16px] text-ivory/75 no-underline transition-colors hover:text-brass">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-[60px] flex max-w-shell justify-between border-t border-brass/20 pt-6 font-sans text-[11px] uppercase tracking-[0.1em] text-ivory/40">
          <span>© 2014–2026 Zuza &amp; Pragtour</span>
          <span>Praha 1 · Česká republika</span>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
