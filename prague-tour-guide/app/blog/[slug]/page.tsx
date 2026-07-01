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

  const lang = post.slugDe === slug ? 'de' : 'en';
  // Some entries are single-language (e.g. a draft post with only `de`); the
  // reads below already guard with optional chaining + a fallback.
  const tr = { ...blogTranslations, ...journalContent } as Record<string, { en?: string; de?: string }>;
  const title = (lang === 'de' ? tr[post.titleKey]?.de : tr[post.titleKey]?.en) ?? post.slug;
  const excerpt = (lang === 'de' ? tr[post.excerptKey]?.de : tr[post.excerptKey]?.en) ?? '';
  const canonical = `${BRAND.domain}/blog/${slug}`;

  return {
    title,
    description: excerpt,
    alternates: {
      canonical,
      languages: {
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
