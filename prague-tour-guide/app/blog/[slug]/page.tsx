import type { Metadata } from 'next';
import BlogPostPage from '../../../src/screens/BlogPostPage';
import { blogPosts } from '../../../src/utils/blogData';
import { blogTranslations } from '../../../src/utils/blogTranslations';
import { journalContent } from '../../../src/utils/journalGenerated';
import { getArticleSchema } from '../../../src/utils/seo';
import { BRAND } from '../../../src/brand';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const post of blogPosts) {
    params.push({ slug: post.slug });
    if (post.slugDe) params.push({ slug: post.slugDe });
  }
  return params;
}

/** Post + the plain-text strings its <head> needs, in the page's language. */
function resolve(slug: string) {
  const post = blogPosts.find((p) => p.slug === slug || p.slugDe === slug);
  if (!post) return null;

  // German-only articles have no slugDe, so their single slug is German too.
  const lang: 'de' | 'en' = post.slugDe === slug || post.language === 'de' ? 'de' : 'en';
  const tr = { ...blogTranslations, ...journalContent } as Record<string, { en?: string; de?: string }>;
  // Prefer the page's language, fall back to the other one; titles may carry <em>.
  const pick = (key?: string) => {
    const e = key ? tr[key] : undefined;
    return ((lang === 'de' ? e?.de : e?.en) || e?.de || e?.en || '').replace(/<[^>]+>/g, '');
  };
  const seo = post.seo?.[lang] ?? post.seo?.de;
  const headline = pick(post.titleKey) || post.slug;
  const excerpt = pick(post.excerptKey);
  return {
    post,
    lang,
    headline,
    title: seo?.title || headline,
    description: seo?.description || excerpt,
    dek: pick(post.dekKey) || excerpt,
    canonical: `${BRAND.domain}/blog/${slug}`,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = resolve(params.slug);
  if (!r) return {};
  const { post, title, description, canonical } = r;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages:
        post.language === 'de'
          ? { de: `${BRAND.domain}/blog/${post.slug}` }
          : {
              de: `${BRAND.domain}/blog/${post.slugDe ?? post.slug}`,
              en: `${BRAND.domain}/blog/${post.slug}`,
            },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      images: post.image ? [{ url: `${BRAND.domain}${post.image}` }] : [],
    },
  };
}

export default function Page({ params }: Props) {
  const r = resolve(params.slug);
  const jsonLd =
    r &&
    getArticleSchema({
      headline: r.headline,
      description: r.dek,
      url: r.canonical,
      lang: r.lang,
      date: r.post.date,
      image: r.post.image ? `${BRAND.domain}${r.post.image}` : undefined,
      about: r.post.about,
      faqs: (r.post.faq?.[r.lang] ?? r.post.faq?.de)?.map((f) => ({ question: f.q, answer: f.a })),
    });
  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <BlogPostPage />
    </>
  );
}
