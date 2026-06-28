import type { Metadata } from 'next';
import ZuzanaManovaPage from '../../src/screens/ZuzanaManovaPage';
import { BRAND } from '../../src/brand';

export const metadata: Metadata = {
  title: { absolute: 'Zuzana Manová – Prag-Stadtführerin | ZuzaPragTour' },
  description:
    'Lernen Sie Zuzana Manová kennen: zertifizierte Prager Stadtführerin seit 1986, spezialisiert auf deutschsprachige Privattouren durch Altstadt, Prager Burg & Jüdisches Viertel.',
  alternates: {
    canonical: `${BRAND.domain}/zuzana-manova`,
    languages: {
      de: `${BRAND.domain}/zuzana-manova`,
      en: `${BRAND.domain}/zuzana-manova`,
    },
  },
  openGraph: {
    title: 'Zuzana Manová – Prag-Stadtführerin | ZuzaPragTour',
    url: `${BRAND.domain}/zuzana-manova`,
    type: 'profile',
  },
};

export default function Page() {
  return <ZuzanaManovaPage />;
}
