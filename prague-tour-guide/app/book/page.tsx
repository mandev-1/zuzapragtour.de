import type { Metadata } from 'next';
import BookPage from '../../src/screens/BookPage';

export const metadata: Metadata = {
  title: 'Tour buchen | Zuza Prague Tours',
  description: 'Private Prag-Tour mit Zuzana Manová buchen.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <BookPage />;
}
