export interface TourFAQItem {
  qKey: string;
  aKey: string;
}

export interface TourDef {
  id: string;
  slug: string;
  slugDe: string;
  image: string;
  titleKey: string;
  seoTitleKey: string;
  durationKey: string;
  descriptionKey: string;
  body1Key: string;
  body2Key: string;
  body3Key: string;
  meetingPointKey: string;
  includedKeys: string[];
  highlightKeys: string[];
  faqKeys: TourFAQItem[];
  durationMinutes: number;
}

export const tours: TourDef[] = [
  {
    id: 'castle',
    slug: 'prague-castle',
    slugDe: 'prager-burg',
    image: '/images/prague-castle.jpg',
    titleKey: 'tour.castle.title',
    seoTitleKey: 'tour.castle.seoTitle',
    durationKey: 'tour.castle.duration',
    descriptionKey: 'tour.castle.description',
    body1Key: 'tour.castle.body1',
    body2Key: 'tour.castle.body2',
    body3Key: 'tour.castle.body3',
    meetingPointKey: 'tour.castle.meetingPoint',
    includedKeys: ['tour.castle.inc1', 'tour.castle.inc2', 'tour.castle.inc3', 'tour.castle.inc4'],
    highlightKeys: ['tour.castle.h1', 'tour.castle.h2', 'tour.castle.h3', 'tour.castle.h4'],
    faqKeys: [
      { qKey: 'tour.castle.faq1.q', aKey: 'tour.castle.faq1.a' },
      { qKey: 'tour.castle.faq2.q', aKey: 'tour.castle.faq2.a' },
      { qKey: 'tour.castle.faq3.q', aKey: 'tour.castle.faq3.a' },
      { qKey: 'tour.castle.faq4.q', aKey: 'tour.castle.faq4.a' },
    ],
    durationMinutes: 210,
  },
  {
    id: 'oldtown',
    slug: 'old-town-jewish-quarter',
    slugDe: 'altstadt-juedisches-viertel',
    image: '/images/blog-jewish-quarter-2-min.jpg',
    titleKey: 'tour.oldtown.title',
    seoTitleKey: 'tour.oldtown.seoTitle',
    durationKey: 'tour.oldtown.duration',
    descriptionKey: 'tour.oldtown.description',
    body1Key: 'tour.oldtown.body1',
    body2Key: 'tour.oldtown.body2',
    body3Key: 'tour.oldtown.body3',
    meetingPointKey: 'tour.oldtown.meetingPoint',
    includedKeys: ['tour.oldtown.inc1', 'tour.oldtown.inc2', 'tour.oldtown.inc3', 'tour.oldtown.inc4'],
    highlightKeys: ['tour.oldtown.h1', 'tour.oldtown.h2', 'tour.oldtown.h3', 'tour.oldtown.h4'],
    faqKeys: [
      { qKey: 'tour.oldtown.faq1.q', aKey: 'tour.oldtown.faq1.a' },
      { qKey: 'tour.oldtown.faq2.q', aKey: 'tour.oldtown.faq2.a' },
      { qKey: 'tour.oldtown.faq3.q', aKey: 'tour.oldtown.faq3.a' },
      { qKey: 'tour.oldtown.faq4.q', aKey: 'tour.oldtown.faq4.a' },
    ],
    durationMinutes: 180,
  },
  {
    id: 'custom',
    slug: 'custom-private-tour',
    slugDe: 'individuelle-privattour',
    image: '/images/blog-night-prague-min.jpg',
    titleKey: 'tour.custom.title',
    seoTitleKey: 'tour.custom.seoTitle',
    durationKey: 'tour.custom.duration',
    descriptionKey: 'tour.custom.description',
    body1Key: 'tour.custom.body1',
    body2Key: 'tour.custom.body2',
    body3Key: 'tour.custom.body3',
    meetingPointKey: 'tour.custom.meetingPoint',
    includedKeys: ['tour.custom.inc1', 'tour.custom.inc2', 'tour.custom.inc3', 'tour.custom.inc4'],
    highlightKeys: ['tour.custom.h1', 'tour.custom.h2', 'tour.custom.h3', 'tour.custom.h4'],
    faqKeys: [
      { qKey: 'tour.custom.faq1.q', aKey: 'tour.custom.faq1.a' },
      { qKey: 'tour.custom.faq2.q', aKey: 'tour.custom.faq2.a' },
      { qKey: 'tour.custom.faq3.q', aKey: 'tour.custom.faq3.a' },
      { qKey: 'tour.custom.faq4.q', aKey: 'tour.custom.faq4.a' },
    ],
    durationMinutes: 180,
  },
  {
    id: 'hidden',
    slug: 'hidden-prague',
    slugDe: 'verstecktes-prag',
    image: '/images/blog-hidden-gems-min.jpg',
    titleKey: 'tour.hidden.title',
    seoTitleKey: 'tour.hidden.seoTitle',
    durationKey: 'tour.hidden.duration',
    descriptionKey: 'tour.hidden.description',
    body1Key: 'tour.hidden.body1',
    body2Key: 'tour.hidden.body2',
    body3Key: 'tour.hidden.body3',
    meetingPointKey: 'tour.hidden.meetingPoint',
    includedKeys: ['tour.hidden.inc1', 'tour.hidden.inc2', 'tour.hidden.inc3', 'tour.hidden.inc4'],
    highlightKeys: ['tour.hidden.h1', 'tour.hidden.h2', 'tour.hidden.h3', 'tour.hidden.h4'],
    faqKeys: [
      { qKey: 'tour.hidden.faq1.q', aKey: 'tour.hidden.faq1.a' },
      { qKey: 'tour.hidden.faq2.q', aKey: 'tour.hidden.faq2.a' },
      { qKey: 'tour.hidden.faq3.q', aKey: 'tour.hidden.faq3.a' },
      { qKey: 'tour.hidden.faq4.q', aKey: 'tour.hidden.faq4.a' },
    ],
    durationMinutes: 150,
  },
  {
    id: 'german',
    slug: 'prague-german-heritage',
    slugDe: 'prag-deutsches-erbe',
    image: '/images/prague-castle-cathedral.jpg',
    titleKey: 'tour.german.title',
    seoTitleKey: 'tour.german.seoTitle',
    durationKey: 'tour.german.duration',
    descriptionKey: 'tour.german.description',
    body1Key: 'tour.german.body1',
    body2Key: 'tour.german.body2',
    body3Key: 'tour.german.body3',
    meetingPointKey: 'tour.german.meetingPoint',
    includedKeys: ['tour.german.inc1', 'tour.german.inc2', 'tour.german.inc3', 'tour.german.inc4'],
    highlightKeys: ['tour.german.h1', 'tour.german.h2', 'tour.german.h3', 'tour.german.h4'],
    faqKeys: [
      { qKey: 'tour.german.faq1.q', aKey: 'tour.german.faq1.a' },
      { qKey: 'tour.german.faq2.q', aKey: 'tour.german.faq2.a' },
      { qKey: 'tour.german.faq3.q', aKey: 'tour.german.faq3.a' },
      { qKey: 'tour.german.faq4.q', aKey: 'tour.german.faq4.a' },
    ],
    durationMinutes: 165,
  },
  {
    id: 'havel',
    slug: 'vaclav-havel-tour',
    slugDe: 'vaclav-havel-tour-prag',
    image: '/images/havel-tour.jpg',
    titleKey: 'tour.havel.title',
    seoTitleKey: 'tour.havel.seoTitle',
    durationKey: 'tour.havel.duration',
    descriptionKey: 'tour.havel.description',
    body1Key: 'tour.havel.body1',
    body2Key: 'tour.havel.body2',
    body3Key: 'tour.havel.body3',
    meetingPointKey: 'tour.havel.meetingPoint',
    includedKeys: ['tour.havel.inc1', 'tour.havel.inc2', 'tour.havel.inc3', 'tour.havel.inc4'],
    highlightKeys: ['tour.havel.h1', 'tour.havel.h2', 'tour.havel.h3', 'tour.havel.h4'],
    faqKeys: [
      { qKey: 'tour.havel.faq1.q', aKey: 'tour.havel.faq1.a' },
      { qKey: 'tour.havel.faq2.q', aKey: 'tour.havel.faq2.a' },
      { qKey: 'tour.havel.faq3.q', aKey: 'tour.havel.faq3.a' },
      { qKey: 'tour.havel.faq4.q', aKey: 'tour.havel.faq4.a' },
    ],
    durationMinutes: 165,
  },
];

/** Resolve a URL slug (EN or DE) to a TourDef */
export function getTourBySlug(slug: string): TourDef | undefined {
  return tours.find((t) => t.slug === slug || t.slugDe === slug);
}
