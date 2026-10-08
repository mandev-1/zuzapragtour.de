import type { Metadata } from 'next';
import BlogPostPage from '../../src/screens/BlogPostPage';
import { journalPages, journalContent } from '../../src/utils/journalGenerated';
import { getArticleSchema } from '../../src/utils/seo';
import { BRAND } from '../../src/brand';

/**
 * /sehenswuerdigkeiten-prag — pillar page in the article template, outside
 * /blog (content/pages/sehenswuerdigkeiten-prag.json, design_handoff_blog_facelift).
 */
const page = journalPages.find((p) => p.path === '/sehenswuerdigkeiten-prag')!;
const plain = (key?: string) => (key ? journalContent[key]?.de ?? '' : '').replace(/<[^>]+>/g, '');
const canonical = page.canonical ?? `${BRAND.domain}${page.path}`;
const headline = plain(page.titleKey);
const title = page.seo?.de?.title || headline;
const description = page.seo?.de?.description || plain(page.excerptKey);

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical, languages: { de: canonical } },
  openGraph: {
    title,
    description,
    url: canonical,
    type: 'article',
    images: page.ogImage || page.image ? [{ url: `${BRAND.domain}${page.ogImage || page.image}` }] : [],
  },
};

export default function SehenswuerdigkeitenPage() {
  const jsonLd = getArticleSchema({
    headline,
    description: plain(page.dekKey) || description,
    url: canonical,
    lang: 'de',
    date: page.date,
    dateModified: page.updated,
    image: page.ogImage || page.image ? `${BRAND.domain}${page.ogImage || page.image}` : undefined,
    about: page.about,
    faqs: page.faq?.de?.map((f) => ({ question: f.q, answer: f.a })),
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPostPage page={page} />
    </>
  );
}
