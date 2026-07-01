import type { Metadata } from 'next';
import ReviewFunnel from '../../src/components/ReviewFunnel';
import { BRAND } from '../../src/brand';

export const metadata: Metadata = {
  title: { absolute: 'Bewerten Sie Ihre Tour · Zuza Prague Tours' },
  description:
    'Hat Ihnen Ihre private Prag-Führung mit Zuzana Manová gefallen? Hinterlassen Sie in einer Minute eine Bewertung bei Google oder TripAdvisor.',
  // Direct-link funnel handed to guests after a tour — not meant for search.
  robots: { index: false, follow: false },
  alternates: { canonical: `${BRAND.domain}/bewerten` },
};

export default function Page() {
  return <ReviewFunnel />;
}
