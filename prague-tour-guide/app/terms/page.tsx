import type { Metadata } from 'next';
import TermsPage from '../../src/screens/TermsPage';

export const metadata: Metadata = {
  title: 'Nutzungsbedingungen | Zuza Prague Tours',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <TermsPage />;
}
