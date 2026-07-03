'use client';

/**
 * BlogPostPage — long-form article, 0006 "premium editorial" facelift.
 *
 * Rebuilt from the handoff prototype (Zuza Prague Tours.dc.html · #/article) to
 * match the rest of the facelifted site: global chrome (premium-inner ground),
 * a left-aligned editorial header (breadcrumb · kicker · Italiana H1 · Cormorant
 * standfirst · portrait byline) over a full-width 16:9 hero figure, then a
 * 1080px two-column body — prose (max 680px) beside a sticky rail holding the
 * numbered scroll-spy TOC, an "Auf einen Blick" facts card and the phone-first
 * CTA block. Closes on an ivory-deep foot CTA and a "Weiterlesen im Journal"
 * related grid.
 *
 * The prose content system (blog-content.css, block/Grund rendering, Leaflet
 * maps) and the retained author-bio/tags footer (E-E-A-T) are preserved; only
 * the shell around them changes.
 */

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { blogPosts } from '../utils/blogData';
import ProgressBar from '../components/blog/ProgressBar';
import BackToTop from '../components/blog/BackToTop';
import TableOfContents, { TocItem } from '../components/blog/TableOfContents';
import ArticleFooter from '../components/blog/ArticleFooter';
import { Kicker, Btn, btnClass } from '../components/site/SiteUI';
import { BRAND } from '../brand';
import { mountJournalMaps } from '../utils/journalMaps';

function readTimeMin(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(' ').filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function extractHeadings(html: string): { id: string; text: string }[] {
  const matches = Array.from(html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi));
  return matches.map((m, i) => ({ id: `heading-${i}`, text: m[1].replace(/<[^>]+>/g, '').trim() }));
}

function injectHeadingIds(html: string): string {
  let i = 0;
  return html.replace(/<h2([^>]*)>/gi, (_match, attrs: string) => {
    if (/\bid\s*=/.test(attrs)) return `<h2${attrs}>`;
    const id = `heading-${i++}`;
    return `<h2 id="${id}"${attrs}>`;
  });
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
const GRUND_LABELS_DE = ['Erster Grund', 'Zweiter Grund', 'Dritter Grund', 'Vierter Grund', 'Fünfter Grund', 'Sechster Grund'];
const ABSCHNITT_LABELS = ['Erster Abschnitt', 'Zweiter Abschnitt', 'Dritter Abschnitt', 'Vierter Abschnitt', 'Fünfter Abschnitt'];

function processGrundSections(html: string): string {
  const isGrunde = /<h2[^>]*>\s*\d+\./i.test(html);
  let h2Count = 0;
  let sectionIdx = 0;
  return html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_match, attrs: string, content: string) => {
    h2Count++;
    if (h2Count === 1) return `<h2${attrs}>${content}</h2>`;
    const roman = ROMAN[sectionIdx] ?? String(sectionIdx + 1);
    const label = isGrunde ? (GRUND_LABELS_DE[sectionIdx] ?? `Abschnitt ${roman}`) : (ABSCHNITT_LABELS[sectionIdx] ?? `Abschnitt ${roman}`);
    const cleanContent = content.replace(/^\s*\d+\.\s*/, '');
    sectionIdx++;
    const ornament = `<div class="artikel-ornament" aria-hidden="true"><span class="artikel-ornament-line"></span><span class="artikel-ornament-glyph">❦</span><span class="artikel-ornament-line"></span></div>`;
    return `${ornament}<div class="grund-marker-row"><span class="grund-numeral">${roman}.</span><div><span class="grund-label">${label}</span><h2${attrs} class="grund-title">${cleanContent}</h2></div></div>`;
  });
}

const BlogPostPage: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const { t, language } = useLanguage();
  const de = language === 'de';

  const post = blogPosts.find((p: any) => p.slug === slug || p.slugDe === slug);

  const isJournal = !!(post as any)?.isJournal;
  const rawContent = post?.contentKey ? t(post.contentKey as any) : '';
  const processedContent = React.useMemo(() => {
    const withIds = injectHeadingIds(rawContent);
    return isJournal ? withIds : processGrundSections(withIds);
  }, [rawContent, isJournal]);
  const headings = React.useMemo(() => extractHeadings(rawContent), [rawContent]);

  const contentRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (isJournal) mountJournalMaps(contentRef.current);
  }, [processedContent, isJournal]);

  if (!post) {
    notFound();
  }

  const catOf = (p: (typeof blogPosts)[number]): string =>
    (de ? (p as any).tagsDe?.[0] ?? p.tags?.[0] : p.tags?.[0]) ?? 'Journal';

  const category = catOf(post);
  const readMins = rawContent ? readTimeMin(rawContent) : null;
  const date = t(post.dateKey as any);
  const titlePlain = t(post.titleKey as any);
  const titleHtml = de ? (post as any).titleHtmlDe : (post as any).titleHtml;
  const standfirst = t(post.excerptKey as any);

  const tocItems: TocItem[] = headings.map((h, i) => ({ id: h.id, label: h.text, index: String(i + 1).padStart(2, '0') }));

  const facts: { k: string; v: string }[] = [
    { k: de ? 'Kategorie' : 'Category', v: category },
    ...(readMins ? [{ k: de ? 'Lesezeit' : 'Read time', v: `${readMins} Min.` }] : []),
    { k: de ? 'Veröffentlicht' : 'Published', v: date },
    { k: de ? 'Sprache' : 'Language', v: de ? 'Deutsch' : 'English' },
  ];

  const relatedItems = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3)
    .map((p) => ({
      id: p.id,
      href: `/blog/${de && (p as any).slugDe ? (p as any).slugDe : p.slug}`,
      img: p.image,
      title: t(p.titleKey as any),
      cat: catOf(p),
      blurb: t(p.excerptKey as any),
    }));

  const H1 = titleHtml ? (
    <h1
      className="m-0 font-display text-[clamp(2.4rem,5vw,3.8rem)] font-normal leading-[1.06] tracking-[-0.02em] text-ink [&_em]:font-italic [&_em]:italic [&_em]:font-normal [&_em]:text-burgundy"
      dangerouslySetInnerHTML={{ __html: titleHtml }}
    />
  ) : (
    <h1 className="m-0 font-display text-[clamp(2.4rem,5vw,3.8rem)] font-normal leading-[1.06] tracking-[-0.02em] text-ink">
      {titlePlain}
    </h1>
  );

  return (
    <div className="premium-inner text-ink antialiased">
      <ProgressBar />
      <BackToTop />

      <article>
        {/* ── Header (1080 shell, left-aligned over the 720 prose column) ── */}
        <header className="mx-auto max-w-[1080px] px-[clamp(1.5rem,5vw,2rem)] pt-[clamp(2rem,5vw,3.5rem)]">
          <div className="max-w-[720px]">
            <div className="mb-[1.4rem] inline-flex items-center gap-[0.5rem] font-sans text-[11px] uppercase tracking-[0.18em] text-ink-mute">
              <Link href="/blog" className="text-burgundy no-underline transition-colors hover:text-burgundy-deep">Journal</Link>
              <span aria-hidden>/</span>
              <span>{category}</span>
            </div>
            <div className="mb-[1.1rem] flex items-center gap-[0.7rem] font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-brass-deep">
              <span>{category}</span>
              {readMins && (
                <>
                  <span aria-hidden className="h-px w-[18px] bg-brass" />
                  <span>{readMins} Min. {de ? 'Lesezeit' : 'read'}</span>
                </>
              )}
            </div>
            {H1}
            {standfirst && (
              <p className="mb-[1.8rem] mt-[1.4rem] font-italic text-[clamp(1.3rem,2.2vw,1.7rem)] italic leading-[1.45] text-ink-soft">
                {standfirst}
              </p>
            )}
            <div className="flex items-center gap-[0.9rem] border-b border-rule pb-[1.8rem]">
              <img src="/images/zuzana-portrait.jpg" alt="Ing. Zuzana Manová" className="h-[46px] w-[46px] shrink-0 rounded-full object-cover [object-position:center_18%]" />
              <div>
                <div className="font-sans text-[0.92rem] font-semibold text-ink">Ing. Zuzana Manová</div>
                <div className="font-sans text-[11px] tracking-[0.04em] text-ink-mute">
                  {de ? 'Zertifizierte Stadtführerin' : 'Certified city guide'} · {date}
                </div>
              </div>
            </div>
          </div>

          {/* Hero figure */}
          <figure className="m-0 mt-[2.4rem]">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-ivory-deep">
              <Image src={post.image} alt={titlePlain} fill priority sizes="(max-width: 1080px) 100vw, 1080px" className="object-cover" />
            </div>
          </figure>
        </header>

        {/* ── Body: prose + sticky rail ─────────────────────────────── */}
        <div className="mx-auto max-w-[1080px] px-[clamp(1.5rem,5vw,2rem)] pb-[clamp(3rem,7vh,5rem)] pt-[clamp(2.5rem,6vh,4rem)]">
          <div className="grid grid-cols-1 items-start gap-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-[minmax(0,1fr)_260px]">
            {/* Prose */}
            <div className="w-full max-w-[680px]">
              <div className="blog-content">
                {post.contentKey ? (
                  <div ref={contentRef} dangerouslySetInnerHTML={{ __html: processedContent }} />
                ) : (
                  <p className="lead">{standfirst}</p>
                )}
                <ArticleFooter
                  tags={de ? ((post as any).tagsDe ?? post.tags) : post.tags}
                  author={{
                    portraitInitial: 'Z',
                    kicker: de ? 'Über die Autorin' : 'About the Author',
                    name: 'Ing. Zuzana Manová',
                    bio: de
                      ? 'In Prag geboren und aufgewachsen. Staatlich geprüfte Stadtführerin mit Tausenden von Touren und tiefem Fachwissen über die Geschichte und Architektur der Stadt. Studium der Geschichte mit Spezialisierung auf moderne Architektur. Zertifiziert für das Jüdische Viertel.'
                      : 'Born and raised in Prague. State-certified tour guide with thousands of tours and deep expertise in the city\'s history and architecture. Degree in history with a specialisation in modern architecture. Certified guide for the Jewish Quarter.',
                    credentials: de
                      ? ['In Prag geboren & aufgewachsen', 'Staatlich zertifiziert', 'Jüdisches Viertel — Zertifikat', 'Moderne Architektur']
                      : ['Born & raised in Prague', 'State-certified guide', 'Jewish Quarter — certified', 'Modern architecture'],
                  }}
                />
              </div>
            </div>

            {/* Sticky rail: TOC + facts + phone-first CTA */}
            <aside className="hidden flex-col gap-[1.6rem] lg:sticky lg:top-[100px] lg:flex">
              {tocItems.length > 1 && <TableOfContents items={tocItems} />}

              <div className="relative z-10 overflow-hidden rounded-lg border border-rule bg-white">
                <div className="border-b border-rule px-[1.2rem] py-[0.9rem] font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-brass-deep">
                  {de ? 'Auf einen Blick' : 'At a glance'}
                </div>
                <div className="px-[1.2rem] pb-[0.8rem] pt-[0.4rem]">
                  {facts.map((f) => (
                    <div key={f.k} className="flex justify-between gap-4 border-b border-rule-soft py-[0.65rem] last:border-b-0">
                      <span className="font-sans text-[0.95rem] text-ink-soft">{f.k}</span>
                      <span className="text-right font-sans text-[0.95rem] font-semibold text-ink">{f.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Link href="/book#contact-title" className={`${btnClass('solid')} w-full justify-center`}>
                  {de ? 'Unverbindlich anfragen' : 'Enquire — no obligation'}
                  <span className="material-symbols-outlined text-[17px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden>arrow_forward</span>
                </Link>
                <p className="m-0 mt-[0.7rem] flex items-center justify-center gap-[0.4rem] font-sans text-[0.9rem] text-ink-soft">
                  <span className="material-symbols-outlined text-[15px] text-brass-deep" aria-hidden>lock</span>
                  {de ? 'Kostenlos & ohne Verpflichtung' : 'Free & without obligation'}
                </p>
                <div className="mt-[0.9rem] border-t border-rule-soft pt-[0.9rem] text-center">
                  <div className="font-sans text-[0.92rem] text-ink-soft">{de ? 'Lieber persönlich?' : 'Prefer to talk?'}</div>
                  <a href={`tel:${BRAND.phoneRaw}`} className="mt-[0.25rem] inline-block font-sans text-[1.15rem] font-semibold text-burgundy no-underline">
                    {BRAND.phone}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* ── Foot CTA ──────────────────────────────────────────────── */}
      <section className="bg-ivory-deep py-[clamp(3.5rem,8vh,6rem)]">
        <div className="mx-auto max-w-[720px] px-[clamp(1.5rem,5vw,2rem)] text-center">
          <h3 className="m-0 mb-[0.9rem] font-display text-[clamp(1.7rem,3vw,2.3rem)] font-normal leading-[1.1] text-ink">
            {de ? 'Möchten Sie das selbst erleben?' : 'Want to experience it yourself?'}
          </h3>
          <p className="mx-auto mb-[1.8rem] max-w-[36rem] font-body text-[1.05rem] leading-[1.7] text-ink-soft">
            {de
              ? 'Begrenzte Verfügbarkeit für private Führungen. Schreiben Sie mir, und wir finden den richtigen Tag.'
              : 'Limited availability for private tours. Write to me, and we\'ll find the right day.'}
          </p>
          <div className="flex justify-center">
            <Btn href="/book#contact-title" variant="solid" arrow>
              {de ? 'Tour anfragen' : 'Request a tour'}
            </Btn>
          </div>
        </div>
      </section>

      {/* ── Related ───────────────────────────────────────────────── */}
      {relatedItems.length > 0 && (
        <section className="py-[clamp(3.5rem,8vh,6rem)]">
          <div className="mx-auto max-w-[1240px] px-[clamp(1.5rem,5vw,5rem)]">
            <Kicker>{de ? 'Weiterlesen im Journal' : 'More from the journal'}</Kicker>
            <div className="mt-8 grid grid-cols-1 gap-[clamp(1.6rem,3vw,2.6rem)] sm:grid-cols-2 min-[860px]:grid-cols-3">
              {relatedItems.map((r) => (
                <Link key={r.id} href={r.href} className="group flex flex-col no-underline">
                  <div className="mb-4 aspect-[3/2] overflow-hidden rounded-lg bg-ivory-deep">
                    <div className="relative h-full w-full transition-transform duration-[800ms] ease-brand group-hover:scale-[1.05]">
                      <Image src={r.img} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" loading="lazy" />
                    </div>
                  </div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-brass-deep">{r.cat}</span>
                  <h4 className="m-0 mb-2 mt-[0.5rem] font-display text-[1.35rem] font-normal leading-[1.16] text-ink">{r.title}</h4>
                  <p className="m-0 font-body text-[0.95rem] leading-[1.6] text-ink-mute">{r.blurb}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPostPage;
