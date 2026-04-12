// SEO Utilities for Prague Tour Guide Website

export const structuredData = {
  tourGuide: {
    '@context': 'https://schema.org',
    '@type': 'TouristInformationCenter',
    name: 'Zuza Prague Tours',
    description: 'Professional Prague tour guide services with local expert Zuzana Manova',
  url: 'https://zuzapragtour.de',
    telephone: '+420-721-231-933',
    email: 'zuzanamanova@email.cz',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Prague',
      addressCountry: 'CZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '50.0755',
      longitude: '14.4378',
    },
    priceRange: '€€',
    knowsLanguage: ['Czech', 'English', 'German'],
  },

  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Zuza Prague Tours',
  image: 'https://zuzapragtour.de/images/logo.jpg',
  '@id': 'https://zuzapragtour.de',
  url: 'https://zuzapragtour.de',
    telephone: '+420-721-231-933',
    email: 'zuzanamanova@email.cz',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '',
      addressLocality: 'Prague',
      postalCode: '',
      addressCountry: 'CZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.0755,
      longitude: 14.4378,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: [
      'https://www.facebook.com/zuzapragtours',
      'https://www.instagram.com/zuzapragtours',
    ],
  },
};

export const defaultMeta = {
  title: 'Zuza Prague Tours - Expert Prague Tour Guide | Zuzana Manova',
  description:
    'Discover Prague with Zuzana, your local expert tour guide. Private and small group tours of Prague Castle, Old Town, Jewish Quarter, and hidden gems. Book today!',
  keywords:
    'Prague tour guide, Prague tours, Prague Castle, Old Town Prague, Jewish Quarter, private tours, walking tours, Prague sightseeing, Czech Republic tours, Zuzana Manova',
  author: 'Zuzana Manova',
  ogType: 'website',
  ogImage: 'https://zuzapragtour.de/images/og-image.jpg',
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
    contact: 'Contact Zuzana to book your Prague tour. Call +420 721 231 933, WhatsApp, or email zuzanamanova@email.cz. Quick response within 24 hours.',
  };

  return descriptions[pageName] || defaultMeta.description;
};