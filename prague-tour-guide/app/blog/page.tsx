import type { Metadata } from 'next';
import BlogPage from '../../src/screens/BlogPage';
import { BRAND } from '../../src/brand';
import { blogPosts } from '../../src/utils/blogData';
import { blogTranslations } from '../../src/utils/blogTranslations';
import { journalContent } from '../../src/utils/journalGenerated';

// Resolve a title key to readable German text (strip <em>) for structured data.
const resolveTitle = (key: string): string => {
  const entry = (journalContent as any)[key] || (blogTranslations as any)[key];
  return ((entry && (entry.de || entry.en)) || key).replace(/<[^>]+>/g, '');
};

export const metadata: Metadata = {
  title: { absolute: 'Prag Reiseblog – Insider-Tipps & Reisegeschichten auf Deutsch | ZuzaPragTour' },
  description:
    'Prag Insider-Tipps von einer staatlich zertifizierten Stadtführerin: Touristenfallen vermeiden, beste Restaurants abseits der Altstadt, geheime Sehenswürdigkeiten und praktische Reisetipps – auf Deutsch.',
  keywords: [
    'Prag Reisetipps', 'Prag Insider Tipps', 'Prag Reiseblog', 'Prag Stadtführung',
    'Prag Geheimtipps', 'Prag Touristenfallen', 'Prag Restaurants Empfehlung',
    'Karlsbrücke Tipps', 'Prager Altstadt', 'Prag deutsch', 'Prag Sehenswürdigkeiten',
    'böhmische Küche', 'Prag Urlaub Tipps',
  ],
  alternates: {
    canonical: `${BRAND.domain}/blog`,
    languages: { de: `${BRAND.domain}/blog`, en: `${BRAND.domain}/blog` },
  },
  openGraph: {
    title: 'Prag Reiseblog – Insider-Tipps auf Deutsch | ZuzaPragTour',
    description: 'Ehrliche Prag-Tipps von einer Pragerin: Restaurants, Geheimtipps, Touristenfallen und mehr.',
    url: `${BRAND.domain}/blog`,
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Prag Reiseblog – Briefe aus Praha',
  description: 'Insider-Tipps, Reisegeschichten und ehrliche Empfehlungen für Prag-Reisende – von einer staatlich zertifizierten Stadtführerin.',
  url: `${BRAND.domain}/blog`,
  inLanguage: 'de',
  author: {
    '@type': 'Person',
    name: 'Ing. Zuzana Manová',
    url: `${BRAND.domain}/zuzana-manova`,
    jobTitle: 'Staatlich zertifizierte Stadtführerin',
    knowsAbout: ['Prag', 'Böhmische Geschichte', 'Jüdisches Viertel Prag', 'Moderne Architektur Prag'],
  },
  publisher: {
    '@type': 'Organization',
    name: 'ZuzaPragTour',
    url: BRAND.domain,
  },
  blogPost: blogPosts.slice(0, 10).map((p) => ({
    '@type': 'BlogPosting',
    headline: resolveTitle(p.titleKey),
    url: `${BRAND.domain}/blog/${p.slug}`,
    datePublished: p.date,
    author: { '@type': 'Person', name: p.author },
    keywords: p.tagsDe?.join(', ') ?? p.tags.join(', '),
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPage />
    </>
  );
}
