'use client';

/**
 * BlogPostPage — long-form article, journal redesign (design_handoff_blog_orte).
 *
 * A single 860px reading column on a white page: breadcrumb · blue kicker ·
 * Newsreader H1 · Hanken dek · author bar (portrait, role, date, reading time),
 * a 1160px hero figure with caption + credit, then the prose (blog-content.css),
 * the closing CTA panel, an optional source list and the author bio/tags footer
 * (E-E-A-T). Related articles close the page.
 *
 * Prose comes from either the journal block renderer (scripts/render-blocks.cjs)
 * or legacy hand-authored HTML (blogTranslations.ts); both are styled by the same
 * blog-content.css. Journal maps are hydrated client-side.
 */

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { blogPosts } from '../utils/blogData';
import { postText } from '../utils/postText';
import ProgressBar from '../components/blog/ProgressBar';
import BackToTop from '../components/blog/BackToTop';
import ArticleFooter from '../components/blog/ArticleFooter';
import { BRAND } from '../brand';
import { mountJournalMaps } from '../utils/journalMaps';
import { AVATAR_SRC } from '../components/site/Portrait';

function readTimeMin(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(' ').filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Give every <h2> without an explicit id a stable `heading-N` anchor. */
function injectHeadingIds(html: string): string {
  let i = 0;
  return html.replace(/<h2([^>]*)>/gi, (_match, attrs: string) => {
    if (/\bid\s*=/.test(attrs)) return `<h2${attrs}>`;
    const id = `heading-${i++}`;
    return `<h2 id="${id}"${attrs}>`;
  });
}

const BlogPostPage: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const { t, language } = useLanguage();
  const de = language === 'de';

  const post = blogPosts.find((p: any) => p.slug === slug || p.slugDe === slug);

  const isJournal = !!post?.isJournal;
  const rawContent = post?.contentKey ? postText(post.contentKey, language) : '';
  const processedContent = React.useMemo(() => injectHeadingIds(rawContent), [rawContent]);

  const contentRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (isJournal) mountJournalMaps(contentRef.current);
  }, [processedContent, isJournal]);

  if (!post) {
    notFound();
  }

  const catOf = (p: (typeof blogPosts)[number]): string =>
    (de ? p.category ?? p.tagsDe?.[0] ?? p.tags?.[0] : p.tags?.[0] ?? p.category) ?? 'Journal';

  const category = catOf(post);
  const kicker = post.kickerKey ? postText(post.kickerKey, language) : '';
  const readMins = rawContent ? readTimeMin(rawContent) : null;
  const date = postText(post.dateKey, language);
  const titlePlain = postText(post.titleKey, language);
  const titleHtml = de ? post.titleHtmlDe : post.titleHtml;
  const standfirst = postText(post.dekKey ?? post.excerptKey, language);
  const heroCap = post.heroCapKey ? postText(post.heroCapKey, language) : '';
  const sourcesHtml = post.sourcesKey ? postText(post.sourcesKey, language) : '';
  const cta = post.cta?.[language] ?? post.cta?.de;

  const relatedItems = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3)
    .map((p) => ({
      id: p.id,
      href: `/blog/${de && p.slugDe ? p.slugDe : p.slug}`,
      img: p.image,
      title: postText(p.titleKey, language).replace(/<[^>]+>/g, ''),
      cat: catOf(p),
      blurb: postText(p.excerptKey, language),
    }));

  const h1Class =
    'mb-0 mt-[6px] font-news text-[clamp(2.1rem,4.6vw,3.2rem)] font-semibold leading-[1.12] tracking-[-0.012em] text-journal-ink [text-wrap:balance] [&_em]:italic';

  return (
    <div className="journal-page bg-white px-5 text-journal-ink antialiased">
      <ProgressBar />
      <BackToTop />

      <article>
        {/* ── Header (860 column) ─────────────────────────────────── */}
        <header className="mx-auto max-w-[860px] pt-[clamp(28px,5vw,48px)]">
          <div className="font-hanken text-[14px] text-journal-mute">
            <Link href="/blog" className="text-journal-mute no-underline hover:text-journal-ink">Journal</Link>{' '}
            <span aria-hidden="true">›</span> {category}
          </div>
          {kicker && (
            <div className="mt-[22px] font-hanken text-[16px] font-bold text-journal-blue">{kicker}</div>
          )}
          {titleHtml ? (
            <h1 className={`${kicker ? '' : 'mt-[22px] '}${h1Class}`} dangerouslySetInnerHTML={{ __html: titleHtml }} />
          ) : (
            <h1 className={`${kicker ? '' : 'mt-[22px] '}${h1Class}`}>{titlePlain}</h1>
          )}
          {standfirst && (
            <p className="mb-0 mt-[18px] font-hanken text-[clamp(1.12rem,1.6vw,1.25rem)] font-medium leading-[1.5] text-journal-ink [text-wrap:pretty]">
              {standfirst}
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-journal-rule py-4">
            <div className="flex items-center gap-3">
              <img src={AVATAR_SRC} alt="" className="h-11 w-11 rounded-full object-cover" />
              <div className="font-hanken text-[15px] leading-[1.4]">
                <div className="font-bold text-journal-ink">Ing. Zuzana Manová</div>
                <div className="text-journal-mute">
                  {de ? 'Staatlich geprüfte Stadtführerin, Prag' : 'State-certified tour guide, Prague'}
                </div>
              </div>
            </div>
            <div className="ml-auto text-right font-hanken text-[14px] leading-[1.4] text-journal-mute">
              {date}
              {readMins && (
                <>
                  <br />
                  {de ? `Lesezeit ${readMins} Minuten` : `${readMins} min read`}
                </>
              )}
            </div>
          </div>
        </header>

        {/* ── Hero figure (1160) ──────────────────────────────────── */}
        {post.image && !post.noHero && (
          <figure className="mx-auto mb-0 mt-7 max-w-[1160px]">
            <img
              src={post.image}
              alt={titlePlain}
              className="block h-auto max-h-[620px] w-full object-cover [object-position:center_30%]"
            />
            {(heroCap || post.heroCredit) && (
              <figcaption className="mx-auto mt-[10px] max-w-[860px] font-hanken text-[14px] leading-[1.45] text-journal-mute">
                {heroCap && <span dangerouslySetInnerHTML={{ __html: heroCap }} />}
                {post.heroCredit && (
                  <span className="text-journal-faint">
                    {heroCap ? ' ' : ''}
                    {de ? 'Bild' : 'Photo'}: {post.heroCredit}
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        )}

        {/* ── Body (860) ──────────────────────────────────────────── */}
        <div className="mx-auto mt-8 max-w-[860px] pb-[clamp(3rem,7vh,4.5rem)]">
          <div className="blog-content" data-track-section="article">
            {post.contentKey ? (
              <div ref={contentRef} dangerouslySetInnerHTML={{ __html: processedContent }} />
            ) : (
              <p>{standfirst}</p>
            )}
          </div>

          {/* Closing CTA */}
          <aside data-track-section="article-cta" className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 bg-journal-panel p-[22px]">
            <div className="min-w-0 flex-[1_1_300px]">
              <div className="font-hanken text-[15px] font-bold text-journal-ink">
                {cta?.title ?? (de ? 'Prag mit Zuzana erleben' : 'Experience Prague with Zuzana')}
              </div>
              <p className="m-0 mt-[6px] font-hanken text-[16px] leading-[1.5] text-journal-ink">
                {cta?.text ? (
                  <span dangerouslySetInnerHTML={{ __html: `${cta.text} ` }} />
                ) : de ? (
                  'Private Stadtführungen auf Deutsch, in Ihrem Tempo. Unverbindlich anfragen oder direkt anrufen: '
                ) : (
                  'Private walking tours at your own pace. Send a no-obligation enquiry or call directly: '
                )}
                <a href={`tel:${BRAND.phoneRaw}`} className="font-semibold text-journal-ink underline underline-offset-[3px] hover:text-journal-ink">
                  {BRAND.phone}
                </a>
              </p>
            </div>
            <Link
              href="/book#contact-title"
              className="shrink-0 rounded-[4px] bg-journal-burgundy px-5 py-3 font-hanken text-[15px] font-semibold text-white no-underline transition-colors hover:bg-journal-burgundy-hover hover:text-white"
            >
              {cta?.button ?? (de ? 'Tour anfragen' : 'Request a tour')}
            </Link>
          </aside>

          {sourcesHtml && (
            <section data-track-section="sources" className="mt-14 border-t-[3px] border-journal-ink pt-[14px] font-hanken">
              <h2 className="m-0 text-[20px] font-bold text-journal-ink">{de ? 'Quellen' : 'Sources'}</h2>
              <ol className="journal-sources" dangerouslySetInnerHTML={{ __html: sourcesHtml }} />
            </section>
          )}

          <ArticleFooter
            tags={de ? (post.tagsDe ?? post.tags) : post.tags}
            author={{
              portrait: { src: AVATAR_SRC, alt: 'Ing. Zuzana Manová' },
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
      </article>

      {/* ── Related ───────────────────────────────────────────────── */}
      {relatedItems.length > 0 && (
        <section data-track-section="related" className="mx-auto max-w-[1160px] border-t border-journal-rule pb-[clamp(3.5rem,8vh,5rem)] pt-10">
          <h2 className="m-0 font-hanken text-[20px] font-bold text-journal-ink">
            {de ? 'Weiterlesen im Journal' : 'More from the journal'}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 min-[860px]:grid-cols-3">
            {relatedItems.map((r) => (
              <Link key={r.id} href={r.href} className="group flex flex-col text-journal-ink no-underline">
                <div className="relative mb-4 aspect-[3/2] overflow-hidden rounded-lg bg-journal-panel">
                  <Image src={r.img} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" loading="lazy" />
                </div>
                <span className="font-hanken text-[14px] font-bold text-journal-blue">{r.cat}</span>
                <h3 className="m-0 mb-2 mt-[6px] font-news text-[22px] font-semibold leading-[1.2] text-journal-ink group-hover:text-journal-blue-hover">{r.title}</h3>
                <p className="m-0 font-hanken text-[15px] leading-[1.5] text-journal-mute">{r.blurb}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPostPage;
