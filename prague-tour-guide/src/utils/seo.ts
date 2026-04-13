const BUSINESS_ID = 'https://zuzapragtour.de/#business';
const GUIDE_ID = 'https://zuzapragtour.de/#guide';

export const NAP = {
  businessName: 'Zuza Prague Tours',
  personName: 'Ing. Zuzana Manova',
  phone: '+420 721 231 933',
  email: 'zuzanamanova@email.cz',
  url: 'https://zuzapragtour.de',
  city: 'Prague',
  country: 'CZ',
  lat: 50.0755,
  lng: 14.4378,
  tripadvisor:
    'https://www.tripadvisor.de/Attraction_Review-g274707-d10450040-Reviews-Zuza_Prague_Tours-Prague_Bohemia.html',
  tourhq: 'https://www.tourhq.com/guide/CZ56896/zuzana-manova',
  instagram: 'https://www.instagram.com/erlebnis_tour_prag/',
} as const;

export function getHomePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TravelAgency',
        '@id': BUSINESS_ID,
        name: NAP.businessName,
        alternateName: 'Zuza Prag Tours',
        description:
          'Private certified tour guide service in Prague. German- and English-speaking guided tours of Prague Castle, Old Town, Jewish Quarter, and more. Run by Ing. Zuzana Manova since 1986.',
        url: NAP.url,
        telephone: NAP.phone,
        email: NAP.email,
        image: `${NAP.url}/images/zuzana-portrait.jpg`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: NAP.city,
          addressRegion: NAP.city,
          addressCountry: NAP.country,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: NAP.lat,
          longitude: NAP.lng,
        },
        priceRange: '€€',
        areaServed: {
          '@type': 'City',
          name: 'Prague',
          sameAs: 'https://en.wikipedia.org/wiki/Prague',
        },
        knowsLanguage: ['de', 'en', 'cs'],
        founder: { '@id': GUIDE_ID },
        sameAs: [NAP.tripadvisor, NAP.tourhq, NAP.instagram],
      },
      {
        '@type': 'Person',
        '@id': GUIDE_ID,
        name: NAP.personName,
        jobTitle: 'Certified Tour Guide',
        description:
          'Professional Prague tour guide since 1986 with 40+ years of experience. Certified by the Czech Republic and accredited by the Jewish Museum in Prague.',
        url: NAP.url,
        image: `${NAP.url}/images/zuzana-portrait.jpg`,
        telephone: NAP.phone,
        email: NAP.email,
        knowsLanguage: ['de', 'en', 'cs'],
        worksFor: { '@id': BUSINESS_ID },
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Czech Republic Certified Tour Guide',
            credentialCategory: 'Professional License',
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Jewish Museum in Prague Accreditation',
            credentialCategory: 'Specialist Certification',
            recognizedBy: {
              '@type': 'Organization',
              name: 'Jewish Museum in Prague',
              url: 'https://www.jewishmuseum.cz',
            },
          },
        ],
        sameAs: [NAP.tripadvisor, NAP.tourhq, NAP.instagram],
      },
    ],
  };
}

interface TourSchemaInput {
  name: string;
  description: string;
  duration: string;
  image: string;
}

export function getTouristTripSchema(tours: TourSchemaInput[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Prague Walking Tours by Zuza Prague Tours',
    itemListElement: tours.map((tour, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'TouristTrip',
        name: tour.name,
        description: tour.description,
        image: `${NAP.url}${tour.image}`,
        touristType: 'Sightseeing',
        availableLanguage: ['de', 'en'],
        duration: tour.duration,
        provider: { '@id': BUSINESS_ID },
        guide: { '@id': GUIDE_ID },
        offers: {
          '@type': 'Offer',
          url: `${NAP.url}/book`,
          availability: 'https://schema.org/InStock',
          priceCurrency: 'EUR',
        },
      },
    })),
  };
}

interface FAQItem {
  question: string;
  answer: string;
}

export function getFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export const defaultMeta = {
  title: 'Zuza Prague Tours - Expert Prague Tour Guide | Zuzana Manova',
  description:
    'Discover Prague with Zuzana, your local expert tour guide. Private and small group tours of Prague Castle, Old Town, Jewish Quarter, and hidden gems. Book today!',
  keywords:
    'Prague tour guide, Prague tours, Prague Castle, Old Town Prague, Jewish Quarter, private tours, walking tours, Prague sightseeing, Czech Republic tours, Zuzana Manova',
  author: 'Zuzana Manova',
  ogType: 'website',
  ogImage: 'https://zuzapragtour.de/images/charles-bridge-hero-1600.jpg',
  twitterCard: 'summary_large_image',
};

export const getPageTitle = (pageName: string) => {
  const titles: { [key: string]: string } = {
    home: 'Zuza Prague Tours - Expert Prague Tour Guide | Zuzana Manova',
    tours: 'Prague Tours - Castle, Old Town & Custom Tours | Zuza Prague Tours',
    contact: 'Contact Zuzana - Book Your Prague Tour | +420 721 231 933',
  };
  return titles[pageName] || defaultMeta.title;
};

export const getPageDescription = (pageName: string) => {
  const descriptions: { [key: string]: string } = {
    home: 'Discover Prague with Zuzana, your local expert tour guide. Private and small group tours of Prague Castle, Old Town, Jewish Quarter, and hidden gems. Book your personalized Prague tour today!',
    tours: 'Choose from Prague Castle tours, Old Town walking tours, Jewish Quarter explorations, or create your custom Prague experience. Small groups, expert local guide, personalized service.',
    contact:
      'Contact Zuzana to book your Prague tour. Call +420 721 231 933, WhatsApp, or email zuzanamanova@email.cz. Quick response within 24 hours.',
  };
  return descriptions[pageName] || defaultMeta.description;
};
