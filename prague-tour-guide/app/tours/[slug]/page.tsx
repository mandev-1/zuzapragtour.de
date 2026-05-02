import type { Metadata } from 'next';
import TourPage from '../../../src/screens/TourPage';
import { tours } from '../../../src/data/tours';
import { translations } from '../../../src/utils/translations';
import { BRAND } from '../../../src/brand';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const tour of tours) {
    params.push({ slug: tour.slug });
    if (tour.slugDe) params.push({ slug: tour.slugDe });
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const tour = tours.find((t) => t.slug === slug || t.slugDe === slug);
  if (!tour) return {};

  const lang = tour.slugDe === slug ? 'de' : 'en';
  const tr = translations[tour.seoTitleKey as keyof typeof translations];
  const title = tr ? (lang === 'de' ? tr.de : tr.en) : slug;
  const descTr = translations[tour.descriptionKey as keyof typeof translations];
  const desc = descTr ? (lang === 'de' ? descTr.de : descTr.en) : '';
  const canonical = `${BRAND.domain}/tours/${slug}`;

  return {
    title,
    description: desc,
    alternates: {
      canonical,
      languages: {
        de: `${BRAND.domain}/tours/${tour.slugDe ?? tour.slug}`,
        en: `${BRAND.domain}/tours/${tour.slug}`,
      },
    },
    openGraph: {
      title,
      description: desc,
      url: canonical,
      type: 'website',
      images: tour.image ? [{ url: `${BRAND.domain}${tour.image}` }] : [],
    },
  };
}

export default function Page() {
  return <TourPage />;
}
