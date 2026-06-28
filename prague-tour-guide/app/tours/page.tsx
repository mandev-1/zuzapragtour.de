import type { Metadata } from 'next';
import ToursPage from '../../src/screens/ToursPage';
import { BRAND } from '../../src/brand';

export const metadata: Metadata = {
  title: { absolute: 'Prag Stadtführungen auf Deutsch | ZuzaPragTour' },
  description:
    'Private Prag-Touren auf Deutsch mit Stadtführerin Zuzana Manová. Prager Burg, Altstadt & Jüdisches Viertel oder Privattour. Zertifizierte Expertin seit 1986.',
  alternates: {
    canonical: `${BRAND.domain}/tours`,
    languages: { de: `${BRAND.domain}/tours`, en: `${BRAND.domain}/tours` },
  },
  openGraph: {
    title: 'Prag Stadtführungen auf Deutsch | ZuzaPragTour',
    description: 'Private Prag-Touren auf Deutsch mit Stadtführerin Zuzana Manová.',
    url: `${BRAND.domain}/tours`,
    type: 'website',
  },
};

export default function Page() {
  return <ToursPage />;
}
