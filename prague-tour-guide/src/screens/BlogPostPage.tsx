'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { blogPosts } from '../utils/blogData';
import ProgressBar from '../components/blog/ProgressBar';
import Hero from '../components/blog/Hero';
import HeroImage from '../components/blog/HeroImage';
import Article from '../components/blog/Article';
import TableOfContents, { TocItem } from '../components/blog/TableOfContents';
import RailCard from '../components/blog/RailCard';
import RelatedGrid, { RelatedItem } from '../components/blog/RelatedGrid';
import Masthead from '../components/blog/Masthead';
import ArticleFooter from '../components/blog/ArticleFooter';

function extractHeadings(html: string): { id: string; text: string }[] {
  const matches = Array.from(html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi));
  return matches.map((m, i) => ({
    id: `heading-${i}`,
    text: m[1].replace(/<[^>]+>/g, '').trim(),
  }));
}

function injectHeadingIds(html: string): string {
  let i = 0;
  return html.replace(/<h2([^>]*)>/gi, (_match, attrs: string) => {
    if (/\bid\s*=/.test(attrs)) return `<h2${attrs}>`;
    const id = `heading-${i++}`;
    return `<h2 id="${id}"${attrs}>`;
  });
}

function toRomanIndex(i: number): string {
  if (i === 0) return 'i';
  if (i === 1) return '1';
  if (i === 2) return '2';
  if (i === 3) return '3';
  if (i === 4) return 'iv';
  return 'v';
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
    const label = isGrunde
      ? (GRUND_LABELS_DE[sectionIdx] ?? `Abschnitt ${roman}`)
      : (ABSCHNITT_LABELS[sectionIdx] ?? `Abschnitt ${roman}`);
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

  const post = blogPosts.find((p: any) => p.slug === slug || p.slugDe === slug);

  const rawContent = post?.contentKey ? t(post.contentKey as any) : '';
  const processedContent = React.useMemo(
    () => processGrundSections(injectHeadingIds(rawContent)),
    [rawContent]
  );
  const headings = React.useMemo(() => extractHeadings(rawContent), [rawContent]);

  if (!post) {
    notFound();
  }

  const tocItems: TocItem[] = headings.map((h, i) => ({ id: h.id, label: h.text, index: toRomanIndex(i) }));

  const relatedItems: RelatedItem[] = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3)
    .map((p) => ({
      id: p.id,
      href: `/blog/${language === 'de' && (p as any).slugDe ? (p as any).slugDe : p.slug}`,
      image: { src: p.image, alt: t(p.titleKey as any) },
      title: t(p.titleKey as any),
      meta: t(p.dateKey as any),
    }));

  const sidebar = (
    <>
      <RailCard
        image={{ src: '/images/old-town-square.jpg', alt: t('blog.featuredTour.title' as any) }}
        kicker="EMPFOHLENE TOUR"
        title={t('blog.featuredTour.title' as any)}
        body={t('blog.featuredTour.desc' as any)}
        cta={{ label: t('blog.featuredTour.cta' as any), href: '/book#contact-title', fullWidth: true }}
      />
      <RailCard
        kicker="Kontakt"
        title={t('blog.newsletter.title' as any)}
        body={t('blog.newsletter.blurb' as any)}
        cta={{ label: t('blog.newsletter.cta' as any), href: '/contact#contact-title', fullWidth: true }}
      />
    </>
  );

  return (
    <div className="article-layout-root min-h-screen bg-ivory">
      <Masthead />

      <ProgressBar />

      <Hero
        title={t(post.titleKey as any)}
        titleHtml={language === 'de' ? post.titleHtmlDe : post.titleHtml}
        deck={t(post.excerptKey as any)}
        authorName={post.author}
        publishedDate={t(post.dateKey as any)}
        authorMeta="Lizenzierte Stadtführerin · 12 min Lesezeit"
      />

      <HeroImage
        src={post.image}
        alt={t(post.titleKey as any)}
        credit={post.image === '/images/klementinum-tower.jpg' ? 'Photo: Roman Boed' : undefined}
      />

      <Article
        toc={tocItems.length > 1 ? <TableOfContents items={tocItems} /> : undefined}
        sidebar={sidebar}
      >
        <div className="blog-content">
          {post.contentKey ? (
            <div dangerouslySetInnerHTML={{ __html: processedContent }} />
          ) : (
            <>
              <p className="lead">{t(post.excerptKey as any)}</p>
              <div className="blog-cta-box">
                <h3>{t('blog.cta.defaultTitle' as any)}</h3>
                <p>{t('blog.cta.defaultBody' as any)}</p>
                <div className="cta-buttons">
                  <Link href="/book#contact-title" className="btn btn-primary">
                    {t('hero.sendEnquiry' as any)}
                  </Link>
                  <Link href="/contact#contact-title" className="btn btn-outline">
                    {t('blog.cta.askQuestion' as any)}
                  </Link>
                </div>
              </div>
            </>
          )}
          <ArticleFooter
            tags={language === 'de' ? ((post as any).tagsDe ?? post.tags) : post.tags}
            author={{
              portraitInitial: 'Z',
              kicker: language === 'de' ? 'Über die Autorin' : 'About the Author',
              name: 'Ing. Zuzana Manová',
              bio: language === 'de'
                ? 'In Prag geboren und aufgewachsen. Staatlich geprüfte Stadtführerin mit Tausenden von Touren und tiefem Fachwissen über die Geschichte und Architektur der Stadt. Studium der Geschichte mit Spezialisierung auf moderne Architektur. Zertifiziert für das Jüdische Viertel.'
                : 'Born and raised in Prague. State-certified tour guide with thousands of tours and deep expertise in the city\'s history and architecture. Degree in history with a specialisation in modern architecture. Certified guide for the Jewish Quarter.',
              credentials: language === 'de'
                ? ['In Prag geboren & aufgewachsen', 'Staatlich zertifiziert', 'Jüdisches Viertel — Zertifikat', 'Moderne Architektur']
                : ['Born & raised in Prague', 'State-certified guide', 'Jewish Quarter — certified', 'Modern architecture'],
            }}
          />
        </div>
      </Article>

      <RelatedGrid items={relatedItems} />
    </div>
  );
};

export default BlogPostPage;
