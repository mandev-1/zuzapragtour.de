import type { MetadataRoute } from 'next';
import { BRAND } from '../src/brand';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/book', '/privacy', '/terms'] },
    sitemap: `${BRAND.domain}/sitemap.xml`,
  };
}
