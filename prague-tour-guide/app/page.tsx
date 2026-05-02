import type { Metadata } from 'next';
import HomePage from '../src/screens/HomePage';
import { BRAND } from '../src/brand';

export const metadata: Metadata = {
  title: { absolute: 'Prag-Stadtführerin Zuzana Manová | ZuzaPragTour' },
  description:
    'Zuzana Manová – deutschsprachige Prag-Expertin & Spezialistin für private Stadtführungen seit 1986. Zertifizierte Führungen durch Altstadt, Karlsbrücke, Prager Burg & Jüdisches Viertel. Über 40 Jahre Erfahrung. Jetzt buchen!',
  alternates: {
    canonical: `${BRAND.domain}/`,
    languages: { de: `${BRAND.domain}/`, en: `${BRAND.domain}/` },
  },
  openGraph: {
    title: 'Prag-Stadtführerin Zuzana Manová | ZuzaPragTour',
    description:
      'Zuzana Manová – deutschsprachige Prag-Expertin & Spezialistin für private Stadtführungen seit 1986.',
    url: `${BRAND.domain}/`,
    images: [{ url: BRAND.ogImage, width: 1600, height: 1029 }],
    type: 'website',
  },
};

export default function Page() {
  return <HomePage />;
}
