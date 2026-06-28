import type { Metadata } from 'next';
import ContactPage from '../../src/screens/ContactPage';
import { BRAND } from '../../src/brand';

export const metadata: Metadata = {
  title: { absolute: 'Kontakt – Prag-Stadtführerin Zuzana | ZuzaPragTour' },
  description:
    'Kontaktieren Sie Stadtführerin Zuzana Manová für private Prag-Touren auf Deutsch. Schnelle Antwort, persönliche Beratung.',
  alternates: {
    canonical: `${BRAND.domain}/contact`,
    languages: { de: `${BRAND.domain}/contact`, en: `${BRAND.domain}/contact` },
  },
  openGraph: {
    title: 'Kontakt – Prag-Stadtführerin Zuzana | ZuzaPragTour',
    url: `${BRAND.domain}/contact`,
    type: 'website',
  },
};

export default function Page() {
  return <ContactPage />;
}
