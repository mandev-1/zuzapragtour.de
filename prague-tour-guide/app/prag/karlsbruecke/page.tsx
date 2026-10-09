import type { Metadata } from 'next';
import KarlsbrueckePage, { KARLSBRUECKE_FAQ } from '../../../src/screens/KarlsbrueckePage';
import { getArticleSchema } from '../../../src/utils/seo';
import { BRAND } from '../../../src/brand';

/** /prag/karlsbruecke: landing page (design_handoff_karlsbruecke_prager_burg). */
const url = `${BRAND.domain}/prag/karlsbruecke`;
const title = 'Karlsbrücke und Prager Burg mit Stadtführerin';
const description =
  'Private Stadtführung Prag auf Deutsch: Karlsbrücke und Prager Burg mit einer zertifizierten Expertin. Jetzt Tour anfragen.';
const image = `${BRAND.domain}/images/hero/prague-hero-1600.jpg`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url, languages: { de: url } },
  openGraph: { title, description, url, type: 'article', images: [{ url: image }] },
};

export default function Page() {
  const jsonLd = getArticleSchema({
    headline: 'Karlsbrücke und Prager Burg mit einer Stadtführerin erleben',
    description,
    url,
    lang: 'de',
    date: '2026-10-09',
    image,
    about: ['Karlsbrücke', 'Prager Burg'],
    faqs: KARLSBRUECKE_FAQ.map((f) => ({ question: f.q, answer: f.a })),
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <KarlsbrueckePage />
    </>
  );
}
