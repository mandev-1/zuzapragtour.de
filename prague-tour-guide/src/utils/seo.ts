import { BRAND } from '../brand';

export const NAP = {
  businessName: BRAND.siteName,
  personName:   BRAND.personName,
  phone:        BRAND.phone,
  email:        BRAND.email,
  url:          BRAND.domain,
  city:         BRAND.city,
  country:      BRAND.country,
  lat:          BRAND.lat,
  lng:          BRAND.lng,
  tripadvisor:  BRAND.tripadvisor,
  tourhq:       BRAND.tourhq,
  instagram:    BRAND.instagram,
} as const;

export function getHomePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TravelAgency',
        '@id': BRAND.businessId,
        name: BRAND.siteName,
        alternateName: 'Zuza Prag Tours',
        description:
          'Expert and specialist tour guide service in Prague. German- and English-speaking certified guided tours of Prague Castle, Old Town, Jewish Quarter, and more. Deutschsprachige Prag-Expertin Ing. Zuzana Manová since 1986.',
        url: BRAND.domain,
        telephone: BRAND.phone,
        email: BRAND.email,
        image: `${BRAND.domain}/images/zuzana-portrait.jpg`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: BRAND.city,
          addressRegion:   BRAND.city,
          addressCountry:  BRAND.country,
        },
        geo: {
          '@type':     'GeoCoordinates',
          latitude:    BRAND.lat,
          longitude:   BRAND.lng,
        },
        priceRange: '€€',
        areaServed: {
          '@type': 'City',
          name:    'Prague',
          sameAs:  'https://en.wikipedia.org/wiki/Prague',
        },
        knowsLanguage: ['de', 'en', 'cs'],
        founder: { '@id': BRAND.guideId },
        sameAs: [BRAND.tripadvisor, BRAND.tourhq, BRAND.instagram],
      },
      {
        '@type':       'Person',
        '@id':         BRAND.guideId,
        name:          BRAND.personName,
        jobTitle:      'Certified Tour Guide',
        description:
          'Professional Prague tour guide since 1986 with 40+ years of experience. Certified by the Czech Republic and accredited by the Jewish Museum in Prague.',
        url:       BRAND.domain,
        image:     `${BRAND.domain}/images/zuzana-portrait.jpg`,
        telephone: BRAND.phone,
        email:     BRAND.email,
        knowsLanguage: ['de', 'en', 'cs'],
        worksFor: { '@id': BRAND.businessId },
        hasCredential: [
          {
            '@type':              'EducationalOccupationalCredential',
            name:                 'Czech Republic Certified Tour Guide',
            credentialCategory:   'Professional License',
          },
          {
            '@type':              'EducationalOccupationalCredential',
            name:                 'Jewish Museum in Prague Accreditation',
            credentialCategory:   'Specialist Certification',
            recognizedBy: {
              '@type': 'Organization',
              name:    'Jewish Museum in Prague',
              url:     'https://www.jewishmuseum.cz',
            },
          },
        ],
        sameAs: [BRAND.tripadvisor, BRAND.tourhq, BRAND.instagram],
      },
    ],
  };
}

interface TourSchemaInput {
  name:        string;
  description: string;
  duration:    string;
  image:       string;
}

export function getTouristTripSchema(tours: TourSchemaInput[]) {
  return {
    '@context': 'https://schema.org',
    '@type':    'ItemList',
    name:       `Prague Walking Tours by ${BRAND.siteName}`,
    itemListElement: tours.map((tour, i) => ({
      '@type':    'ListItem',
      position:   i + 1,
      item: {
        '@type':           'TouristTrip',
        name:              tour.name,
        description:       tour.description,
        image:             `${BRAND.domain}${tour.image}`,
        touristType:       'Sightseeing',
        availableLanguage: ['de', 'en'],
        duration:          tour.duration,
        provider: { '@id': BRAND.businessId },
        guide:    { '@id': BRAND.guideId },
        offers: {
          '@type':       'Offer',
          url:           `${BRAND.domain}/book`,
          availability:  'https://schema.org/InStock',
          priceCurrency: 'EUR',
        },
      },
    })),
  };
}

interface FAQItem {
  question: string;
  answer:   string;
}

export function getFAQSchema(faqs: FAQItem[]) {
  return {
    '@context':  'https://schema.org',
    '@type':     'FAQPage',
    mainEntity:  faqs.map((faq) => ({
      '@type': 'Question',
      name:    faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text:    faq.answer,
      },
    })),
  };
}

export interface TourPageSchemaInput {
  name:             string;
  description:      string;
  duration:         string;
  durationMinutes:  number;
  image:            string;
  url:              string;
  faqs:             { question: string; answer: string }[];
}

export function getTourPageSchema(tour: TourPageSchemaInput) {
  const isoPT = `PT${tour.durationMinutes}M`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type':       'TouristTrip',
        '@id':         `${tour.url}#tour`,
        name:          tour.name,
        description:   tour.description,
        image:         tour.image,
        url:           tour.url,
        touristType:   { '@type': 'Audience', audienceType: 'Tourists' },
        availableLanguage: [
          { '@type': 'Language', name: 'German' },
          { '@type': 'Language', name: 'English' },
        ],
        duration: isoPT,
        provider: {
          '@type':    'LocalBusiness',
          '@id':      BRAND.businessId,
          name:       BRAND.siteName,
          telephone:  BRAND.phone,
          email:      BRAND.email,
          url:        BRAND.domain,
          image:      `${BRAND.domain}/images/zuzana-portrait.jpg`,
          address: {
            '@type':          'PostalAddress',
            addressLocality:  BRAND.city,
            addressRegion:    BRAND.city,
            addressCountry:   BRAND.country,
          },
          geo: {
            '@type':    'GeoCoordinates',
            latitude:   BRAND.lat,
            longitude:  BRAND.lng,
          },
          priceRange:    '€€',
          knowsLanguage: ['de', 'en', 'cs'],
          aggregateRating: {
            '@type':       'AggregateRating',
            ratingValue:   '4.9',
            reviewCount:   '14',
            bestRating:    '5',
            worstRating:   '1',
          },
          sameAs: [BRAND.tripadvisor, BRAND.tourhq, BRAND.instagram],
        },
        guide: {
          '@type':    'Person',
          '@id':      BRAND.guideId,
          name:       BRAND.personName,
          jobTitle:   'Certified Tour Guide',
          hasCredential: [
            {
              '@type':            'EducationalOccupationalCredential',
              name:               'Czech Republic Certified Tour Guide',
              credentialCategory: 'Professional License',
            },
            {
              '@type':            'EducationalOccupationalCredential',
              name:               'Jewish Museum in Prague Accreditation',
              credentialCategory: 'Specialist Certification',
            },
          ],
        },
        offers: {
          '@type':       'Offer',
          url:           `${BRAND.domain}/book`,
          availability:  'https://schema.org/InStock',
          priceCurrency: 'EUR',
          seller:        { '@id': BRAND.businessId },
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: tour.faqs.map((faq) => ({
          '@type': 'Question',
          name:    faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',  item: BRAND.domain },
          { '@type': 'ListItem', position: 2, name: 'Tours', item: `${BRAND.domain}/tours` },
          { '@type': 'ListItem', position: 3, name: tour.name, item: tour.url },
        ],
      },
    ],
  };
}

export const defaultMeta = {
  title:       `${BRAND.siteName} - Expert Prague Tour Guide | ${BRAND.personName}`,
  description:
    'Discover Prague with Zuzana, your local expert tour guide. Private and small group tours of Prague Castle, Old Town, Jewish Quarter, and hidden gems. Book today!',
  keywords:
    'Prague tour guide, Prague tours, Prague Castle, Old Town Prague, Jewish Quarter, private tours, walking tours, Prague sightseeing, Czech Republic tours, Zuzana Manová',
  author:      BRAND.personName,
  ogType:      'website',
  ogImage:     BRAND.ogImage,
  twitterCard: 'summary_large_image',
};

export const getPageTitle = (pageName: string) => {
  const titles: { [key: string]: string } = {
    home:    `${BRAND.siteName} - Expert Prague Tour Guide | ${BRAND.personName}`,
    tours:   `Prague Tours - Castle, Old Town & Custom Tours | ${BRAND.siteName}`,
    contact: `Contact Zuzana - Book Your Prague Tour | ${BRAND.phone}`,
  };
  return titles[pageName] || defaultMeta.title;
};

export const getPageDescription = (pageName: string) => {
  const descriptions: { [key: string]: string } = {
    home:
      'Discover Prague with Zuzana, your local expert tour guide. Private and small group tours of Prague Castle, Old Town, Jewish Quarter, and hidden gems. Book your personalized Prague tour today!',
    tours:
      'Choose from Prague Castle tours, Old Town walking tours, Jewish Quarter explorations, or create your custom Prague experience. Small groups, expert local guide, personalized service.',
    contact: `Contact Zuzana to book your Prague tour. Call ${BRAND.phone}, WhatsApp, or email ${BRAND.email}. Quick response within 24 hours.`,
  };
  return descriptions[pageName] || defaultMeta.description;
};
