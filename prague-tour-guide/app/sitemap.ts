import type { MetadataRoute } from 'next';
import { blogPosts } from '../src/utils/blogData';
import { journalPages } from '../src/utils/journalGenerated';
import { tours } from '../src/data/tours';
import { BRAND } from '../src/brand';

const BASE = BRAND.domain;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/tours`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/zuzana-manova`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/prag/karlsbruecke`, lastModified: new Date('2026-10-09'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  // lastmod = last substantial update, else first publication.
  const lastmod = (p: { date: string; updated?: string }) => new Date(p.updated ?? p.date);

  const pageRoutes: MetadataRoute.Sitemap = journalPages.map((page) => ({
    url: `${BASE}${page.path}`,
    lastModified: lastmod(page),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.flatMap((post) => {
    const entries: MetadataRoute.Sitemap = [
      {
        url: `${BASE}/blog/${post.slug}`,
        lastModified: lastmod(post),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
    ];
    if (post.slugDe) {
      entries.push({
        url: `${BASE}/blog/${post.slugDe}`,
        lastModified: lastmod(post),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
    return entries;
  });

  const tourRoutes: MetadataRoute.Sitemap = tours.flatMap((tour) => {
    const entries: MetadataRoute.Sitemap = [
      {
        url: `${BASE}/tours/${tour.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    ];
    if (tour.slugDe) {
      entries.push({
        url: `${BASE}/tours/${tour.slugDe}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
    return entries;
  });

  return [...staticRoutes, ...pageRoutes, ...tourRoutes, ...blogRoutes];
}
