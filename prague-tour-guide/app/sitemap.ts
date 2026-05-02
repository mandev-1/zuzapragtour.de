import type { MetadataRoute } from 'next';
import { blogPosts } from '../src/utils/blogData';
import { tours } from '../src/data/tours';
import { BRAND } from '../src/brand';

const BASE = BRAND.domain;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/tours`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/zuzana-manova`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.flatMap((post) => {
    const entries: MetadataRoute.Sitemap = [
      {
        url: `${BASE}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
    ];
    if (post.slugDe) {
      entries.push({
        url: `${BASE}/blog/${post.slugDe}`,
        lastModified: new Date(post.date),
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

  return [...staticRoutes, ...tourRoutes, ...blogRoutes];
}
