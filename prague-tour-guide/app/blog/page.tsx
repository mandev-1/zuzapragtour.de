import type { Metadata } from 'next';
import BlogPage from '../../src/screens/BlogPage';
import { BRAND } from '../../src/brand';

export const metadata: Metadata = {
  title: { absolute: 'Prag Reiseblog – Tipps & Geschichten | ZuzaPragTour' },
  description:
    'Prag Insider-Tipps, Reisegeschichten und Stadtführer-Empfehlungen von Zuzana Manová – deutschsprachige Prag-Expertin seit 1986.',
  alternates: {
    canonical: `${BRAND.domain}/blog`,
    languages: { de: `${BRAND.domain}/blog`, en: `${BRAND.domain}/blog` },
  },
  openGraph: {
    title: 'Prag Reiseblog – Tipps & Geschichten | ZuzaPragTour',
    url: `${BRAND.domain}/blog`,
    type: 'website',
  },
};

export default function Page() {
  return <BlogPage />;
}
