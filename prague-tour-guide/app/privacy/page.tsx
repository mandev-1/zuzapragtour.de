import type { Metadata } from 'next';
import PrivacyPage from '../../src/screens/PrivacyPage';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Zuza Prague Tours',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PrivacyPage />;
}
