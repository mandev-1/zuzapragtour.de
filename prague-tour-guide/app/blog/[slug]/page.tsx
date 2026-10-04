import type { Metadata } from 'next';
import BlogPostPage from '../../../src/screens/BlogPostPage';
import { blogPosts } from '../../../src/utils/blogData';
import { blogTranslations } from '../../../src/utils/blogTranslations';
import { journalContent } from '../../../src/utils/journalGenerated';
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const post = blogPosts.find((p) => p.slug === slug || p.slugDe === slug);
  if (!post) return {};

  // German-only articles have no slugDe, so their single slug is German too.
  const lang = post.slugDe === slug || post.language === 'de' ? 'de' : 'en';
  const tr = { ...blogTranslations, ...journalContent } as Record<string, { en?: string; de?: string }>;
  // Prefer the page's language, fall back to the other one; titles may carry <em>.
  const pick = (key: string) => {
    const e = tr[key];
    return ((lang === 'de' ? e?.de : e?.en) || e?.de || e?.en || '').replace(/<[^>]+>/g, '');
  };
  const title = pick(post.titleKey) || post.slug;
  const excerpt = pick(post.excerptKey);
  const canonical = `${BRAND.domain}/blog/${slug}`;

  return {
    title,
    description: excerpt,
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
      description: excerpt,
      url: canonical,
      type: 'article',
      images: post.image ? [{ url: `${BRAND.domain}${post.image}` }] : [],
    },
  };
}

export default function Page() {
  return <BlogPostPage />;
}
