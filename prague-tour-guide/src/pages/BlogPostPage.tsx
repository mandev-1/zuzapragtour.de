import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { blogPosts } from '../utils/blogData';
import { BRAND } from '../brand';

function extractHeadings(html: string): { id: string; text: string }[] {
  const matches = Array.from(html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi));
  return matches.map((m, i) => ({
    id: `heading-${i}`,
    text: m[1].replace(/<[^>]+>/g, '').trim(),
  }));
}

/** Add stable ids to h2 for TOC; preserve existing attributes (e.g. class). */
function injectHeadingIds(html: string): string {
  let i = 0;
  return html.replace(/<h2([^>]*)>/gi, (_match, attrs: string) => {
    if (/\bid\s*=/.test(attrs)) {
      return `<h2${attrs}>`;
    }
    const id = `heading-${i++}`;
    return `<h2 id="${id}"${attrs}>`;
  });
}

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const [activeHeading, setActiveHeading] = React.useState('');
  const [readProgress, setReadProgress] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const articleRef = React.useRef<HTMLElement>(null);

  const post = blogPosts.find((p: any) => p.slug === slug || p.slugDe === slug);

  const rawContent = post?.contentKey ? t(post.contentKey as any) : '';
  const processedContent = React.useMemo(() => injectHeadingIds(rawContent), [rawContent]);
  const headings = React.useMemo(() => extractHeadings(rawContent), [rawContent]);

  React.useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const scrolled = Math.max(0, -top);
      const total = height - window.innerHeight;
      setReadProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [post?.id]);

  React.useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          const sorted = [...visible].sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveHeading(sorted[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const deSlug: string | undefined = (post as any).slugDe;
  const deUrl = deSlug ? `${BRAND.domain}/blog/${deSlug}` : null;
  const enUrl = `${BRAND.domain}/blog/${post.slug}`;
  // Canonical always resolves to the DE version when one exists (DE is primary)
  const canonicalUrl = deUrl ?? enUrl;
  // True when the visitor landed on the EN slug but a DE version exists → noindex
  const isEnUrlWithDe = slug === post.slug && !!deSlug;

  const slugForUrl =
    language === 'de' && deSlug ? deSlug : post.slug;
  const postAbsoluteUrl = `${BRAND.domain}/blog/${slugForUrl}`;
  const currentTags = language === 'de' && post.tagsDe ? post.tagsDe : post.tags;

  const jsonLdImage =
    post.id === '12' || post.id === '13'
      ? [
          `${BRAND.domain}${post.image}`,
          post.id === '12'
            ? `${BRAND.domain}/images/blog-kafka-2.jpg`
            : `${BRAND.domain}/images/blog-winter-cathedral.png`,
        ]
      : `${BRAND.domain}${post.image}`;

  const pinterestShare = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
    postAbsoluteUrl
  )}&description=${encodeURIComponent(t(post.titleKey as any))}`;

  const handleNativeShare = async () => {
    const title = t(post.titleKey as any);
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title, url: postAbsoluteUrl });
        return;
      }
      await navigator.clipboard.writeText(postAbsoluteUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        await navigator.clipboard.writeText(postAbsoluteUrl);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch {
        /* ignore */
      }
    }
  };

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{t(post.titleKey as any)} | {BRAND.siteName}</title>
        <meta name="description" content={t(post.excerptKey as any)} />
        <meta
          name="keywords"
          content={`${currentTags.join(', ')}, ${
            language === 'de'
              ? 'Prag Touren, Prag Reiseführer, geführte Tour Prag für Deutsche, private Prag-Touren mit deutschem Guide'
              : 'Prague tours, Prague guide'
          }`}
        />
        {/* DE is always canonical when a DE version exists. EN URL gets noindex. */}
        <link rel="canonical" href={canonicalUrl} />
        {isEnUrlWithDe && <meta name="robots" content="noindex, follow" />}
        <link rel="alternate" hrefLang="en" href={enUrl} />
        {deUrl && <link rel="alternate" hrefLang="de" href={deUrl} />}
        {/* x-default points to DE when available — site primary language is German */}
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
        <meta property="og:title" content={`${t(post.titleKey as any)} | ${BRAND.siteName}`} />
        <meta property="og:description" content={t(post.excerptKey as any)} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`${BRAND.domain}${post.image}`} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        {currentTags.map((tag: string, i: number) => (
          <meta key={i} property="article:tag" content={tag} />
        ))}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: t(post.titleKey as any),
            description: t(post.excerptKey as any),
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: language,
            author: { '@type': 'Person', name: post.author },
            image: jsonLdImage,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${BRAND.domain}/blog/${slugForUrl}`,
            },
            url: `${BRAND.domain}/blog/${slugForUrl}`,
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: t('nav.home' as any),
                item: `${BRAND.domain}/`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: t('nav.blog' as any),
                item: `${BRAND.domain}/blog`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: t(post.titleKey as any),
                item: `${BRAND.domain}/blog/${slugForUrl}`,
              },
            ],
          })}
        </script>
        {post.slug === 'what-to-do-in-prague-in-november-2025' && (
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name:
                    language === 'de'
                      ? 'Ist November eine gute Zeit für Prag?'
                      : 'Is November a good time to visit Prague?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text:
                      language === 'de'
                        ? 'Ja—weniger Menschen, gute Verfügbarkeiten und viele Konzerte & Ausstellungen. Warme Kleidung und bequeme Schuhe sind empfehlenswert.'
                        : 'Yes—fewer crowds, better availability, and lots of concerts & exhibitions. Dress warm and wear comfortable shoes.',
                  },
                },
                {
                  '@type': 'Question',
                  name:
                    language === 'de'
                      ? 'Was kann man in Prag im November machen?'
                      : 'What can you do in Prague in November?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text:
                      language === 'de'
                        ? 'Klassik- und Jazzkonzerte, Galerien & Museen, Abendspaziergänge an der Moldau und gemütliche Cafés. Events finden Sie im verlinkten Novemberkalender.'
                        : 'Classical and jazz concerts, galleries & museums, evening riverside walks, and cozy cafés. See the linked November events calendar for what’s on.',
                  },
                },
                {
                  '@type': 'Question',
                  name:
                    language === 'de'
                      ? 'Wie ist das Wetter in Prag im November?'
                      : 'What is the weather like in Prague in November?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text:
                      language === 'de'
                        ? 'Meist kühl (5–10°C) mit frühem Sonnenuntergang. Schichten, Regenjacke und rutschfeste Schuhe sind sinnvoll.'
                        : 'Generally cool (5–10°C) with early sunsets. Pack layers, a rain jacket, and good shoes for cobblestones.',
                  },
                },
              ],
            })}
          </script>
        )}
      </Helmet>

      <div className="pointer-events-none fixed left-0 top-20 z-30 h-0.5 w-full bg-primary/20">
        <div
          className="h-full bg-primary transition-all duration-75"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <article className="min-h-screen bg-white" ref={articleRef}>
        {/* Tag strip (Stitch: pill row under site header) */}
        <section className="border-b border-stone-100 bg-stone-50/70 py-3 sm:py-4">
          <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-1.5 px-4 sm:gap-2 sm:px-6">
            {currentTags.map((tag: string, i: number) => (
              <span
                key={i}
                className="rounded-full bg-stone-200/90 px-2 py-0.5 font-label text-[0.65rem] font-medium leading-snug text-on-surface sm:px-3 sm:py-1 sm:text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        <div
          className={`mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:items-start lg:gap-10 ${
            headings.length > 1
              ? 'lg:grid-cols-[220px_minmax(0,1fr)_280px]'
              : 'lg:grid-cols-[minmax(0,1fr)_280px]'
          }`}
        >
          {/* TOC — desktop */}
          {headings.length > 1 && (
            <aside className="sticky top-28 hidden lg:block">
              <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
                <h2 className="font-headline text-base font-bold text-on-surface">{t('blog.tocTitle' as any)}</h2>
                <nav className="mt-3">
                  <ol className="list-decimal space-y-2 pl-4 text-sm text-stone-700">
                    {headings.map((h, i) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className={
                            activeHeading === h.id
                              ? 'font-semibold text-primary hover:underline'
                              : 'text-stone-700 hover:text-primary hover:underline'
                          }
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            </aside>
          )}

          {/* Main column */}
          <motion.div
            className="min-w-0"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {headings.length > 1 && (
              <details className="mb-6 rounded-lg border border-stone-200 bg-white p-4 shadow-sm lg:hidden">
                <summary className="cursor-pointer font-headline text-base font-bold text-on-surface">
                  {t('blog.tocTitle' as any)}
                </summary>
                <nav className="mt-3">
                  <ol className="list-decimal space-y-2 pl-4 text-sm text-stone-700">
                    {headings.map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="text-primary hover:underline">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </details>
            )}

            <nav className="mb-4 flex flex-wrap items-center gap-2 font-label text-xs text-stone-500">
              <Link to="/" className="hover:text-primary">
                {t('nav.home' as any)}
              </Link>
              <span>›</span>
              <Link to="/blog" className="hover:text-primary">
                {t('nav.blog' as any)}
              </Link>
              <span>›</span>
              <span className="line-clamp-1 text-stone-600">{t(post.titleKey as any)}</span>
            </nav>

            <h1 className="font-headline text-2xl font-bold leading-snug text-on-surface md:text-3xl lg:text-[2rem]">
              {t(post.titleKey as any)}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-2 font-label text-sm text-stone-600">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-label text-xs font-bold text-primary">
                  ZM
                </div>
                <span className="font-medium text-on-surface">{post.author}</span>
              </div>
              <span className="text-stone-400">·</span>
              <span>{t(post.dateKey as any)}</span>
              {language === 'en' && (post as any).slugDe && (
                <>
                  <span className="text-stone-400">·</span>
                  <Link to={`/blog/${(post as any).slugDe}`} className="text-primary hover:underline">
                    DE
                  </Link>
                </>
              )}
              {language === 'de' && (
                <>
                  <span className="text-stone-400">·</span>
                  <Link to={`/blog/${post.slug}`} className="text-primary hover:underline">
                    EN
                  </Link>
                </>
              )}
            </div>

            <figure className="mt-8 overflow-hidden rounded-xl border border-stone-200/80 shadow-sm">
              <img
                src={post.image}
                alt={t(post.titleKey as any)}
                className="h-auto max-h-[28rem] w-full object-cover object-top"
                loading="eager"
              />
              {post.image === '/images/klementinum-tower.jpg' && (
                <figcaption className="px-4 py-2 font-label text-xs text-on-surface-variant">
                  Photo: Roman Boed
                </figcaption>
              )}
            </figure>

            <div className="blog-content mt-8">
              {post.contentKey ? (
                <div dangerouslySetInnerHTML={{ __html: processedContent }} />
              ) : (
                <>
                  <p className="lead">{t(post.excerptKey as any)}</p>
                  <div className="blog-cta-box">
                    <h3>{t('blog.cta.defaultTitle' as any)}</h3>
                    <p>{t('blog.cta.defaultBody' as any)}</p>
                    <div className="cta-buttons">
                      <Link to="/book#contact-title" className="btn btn-primary">
                        {t('hero.sendEnquiry' as any)}
                      </Link>
                      <Link to="/contact#contact-title" className="btn btn-outline">
                        {t('blog.cta.askQuestion' as any)}
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postAbsoluteUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[#1877f2] px-4 py-2 font-label text-xs font-semibold text-white hover:opacity-90"
              >
                Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postAbsoluteUrl)}&text=${encodeURIComponent(t(post.titleKey as any))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[#1da1f2] px-4 py-2 font-label text-xs font-semibold text-white hover:opacity-90"
              >
                Twitter
              </a>
              <a
                href={pinterestShare}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[#e60023] px-4 py-2 font-label text-xs font-semibold text-white hover:opacity-90"
              >
                Pinterest
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${t(post.titleKey as any)} ${postAbsoluteUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[#25d366] px-4 py-2 font-label text-xs font-semibold text-white hover:opacity-90"
              >
                WhatsApp
              </a>
              <button
                type="button"
                onClick={handleNativeShare}
                className="rounded-md bg-stone-500 px-4 py-2 font-label text-xs font-semibold text-white hover:opacity-90"
              >
                {copied ? '✓' : t('blog.shareMore' as any)}
              </button>
            </div>

            {related.length > 0 && (
              <section className="mt-14 border-t border-stone-200 pt-10">
                <h2 className="font-headline text-xl font-bold text-on-surface">{t('blog.related' as any)}</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {related.map((rel, i) => (
                    <motion.div
                      key={rel.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.06 }}
                      viewport={{ once: true }}
                    >
                      <Link
                        to={`/blog/${language === 'de' && (rel as any).slugDe ? (rel as any).slugDe : rel.slug}`}
                        className="group flex gap-3 rounded-lg border border-stone-200 bg-white p-3 shadow-sm transition hover:border-primary/30 hover:bg-stone-50"
                      >
                        <img
                          src={rel.image}
                          alt={t(rel.titleKey as any)}
                          className="h-14 w-14 shrink-0 rounded-md object-cover"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <p className="line-clamp-3 font-label text-xs font-semibold leading-snug text-on-surface group-hover:text-primary">
                            {t(rel.titleKey as any)}
                          </p>
                          <p className="mt-1 font-label text-[11px] text-stone-500">{t(rel.dateKey as any)}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </motion.div>

          {/* Right sidebar — Stitch: featured tour + newsletter */}
          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
              <img
                src="/images/old-town-square.jpg"
                alt={t('blog.featuredTour.title' as any)}
                className="h-28 w-full rounded-md object-cover"
                loading="lazy"
              />
              <h3 className="font-headline mt-3 text-lg font-bold leading-snug text-on-surface">
                {t('blog.featuredTour.title' as any)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{t('blog.featuredTour.desc' as any)}</p>
              <Link
                to="/book#contact-title"
                className="mt-4 inline-block rounded-full bg-primary px-5 py-2.5 text-center font-label text-sm font-semibold text-on-primary transition-opacity hover:opacity-90"
              >
                {t('blog.featuredTour.cta' as any)}
              </Link>
            </div>

            <div className="rounded-lg border border-stone-200 bg-stone-100/90 p-4">
              <h3 className="font-headline text-lg font-bold text-on-surface">{t('blog.newsletter.title' as any)}</h3>
              <p className="mt-1 text-sm text-stone-600">{t('blog.newsletter.blurb' as any)}</p>
              <Link
                to="/contact#contact-title"
                className="mt-4 block w-full rounded-full bg-primary py-2.5 text-center font-label text-sm font-semibold text-on-primary transition-opacity hover:opacity-90"
              >
                {t('blog.newsletter.cta' as any)}
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
};

export default BlogPostPage;
