import React from 'react';
import { Helmet } from 'react-helmet-async';
import Tours from '../components/Tours';
import { useLanguage } from '../context/LanguageContext';
import { getTouristTripSchema, getFAQSchema } from '../utils/seo';

const toursForSchema = [
  {
    name: 'Prague Castle & Royal District',
    description: 'Guided tour of Prague Castle complex, St. Vitus Cathedral, Golden Lane, and the Royal Garden.',
    duration: 'PT3H30M',
    image: '/images/prague-castle.jpg',
  },
  {
    name: 'Old Town & Jewish Quarter',
    description:
      'Walking tour through medieval Old Town, Astronomical Clock, Charles Bridge, and the historic Jewish Quarter with a certified specialist.',
    duration: 'PT3H30M',
    image: '/images/blog-jewish-quarter-2-min.jpg',
  },
  {
    name: 'Hidden Prague',
    description: 'Off-the-beaten-path tour of secret gardens, hidden courtyards, and local spots most tourists never find.',
    duration: 'PT3H',
    image: '/images/blog-hidden-gems-min.jpg',
  },
  {
    name: "Prague's German Heritage",
    description: "Tour highlighting Prague's rich German cultural heritage from medieval times to modern history.",
    duration: 'PT3H30M',
    image: '/images/prague-castle-cathedral.jpg',
  },
  {
    name: 'Václav Havel Tour: Sites of Freedom',
    description: "Walk through Prague's modern history following Václav Havel. Visit key places of the Velvet Revolution.",
    duration: 'PT3H',
    image: '/images/havel-tour.jpg',
  },
  {
    name: 'Custom Private Tour',
    description: 'Fully personalized Prague tour tailored to your interests: history, architecture, food, literature, or a mix.',
    duration: 'PT3H',
    image: '/images/blog-night-prague-min.jpg',
  },
];

const ToursPage: React.FC = () => {
  const { language } = useLanguage();

  const description =
    language === 'de'
      ? 'Wählen Sie zwischen Führungen Prager Burg, Altstadt-Rundgängen, Erkundungen des Jüdischen Viertels oder stellen Sie Ihre individuelle Prag-Tour zusammen. Kleine Gruppen, lokale Expertin, persönlicher Service. Geführte Tour Prag für Deutsche – private Prag-Touren mit deutschem Guide.'
      : "Choose from Prague Castle tours, Old Town walking tours, Jewish Quarter explorations, or create your custom Prague experience. Small groups, expert local guide, personalized service.";

  const keywords =
    language === 'de'
      ? 'Prag Führung, Prager Burg Tour, Altstadt Prag Führung, Jüdisches Viertel Tour, Prag Stadtführung, private Prag Tour, individuelle Prag Tour, Prag Sehenswürdigkeiten, geführte Tour Prag für Deutsche, private Prag-Touren mit deutschem Guide'
      : 'Prague Castle tour, Old Town Prague tour, Jewish Quarter tour, Prague walking tours, private Prague tours, custom Prague tours, Prague sightseeing tours';

  const tourSchema = getTouristTripSchema(toursForSchema);

  const toursFAQ = getFAQSchema([
    {
      question: 'What languages do you offer tours in?',
      answer:
        'Tours are available in German, English, and Czech. German is the primary touring language, most popular with visitors from Germany, Austria, and Switzerland.',
    },
    {
      question: 'How long do the tours last?',
      answer:
        'Most tours last between 3 and 4 hours. Custom tours can be shorter (2 hours) or longer (up to 6 hours) depending on your interests and schedule.',
    },
    {
      question: 'Can I book a private tour?',
      answer:
        'Yes, all tours are private. Zuzana guides every tour personally. She works with individuals, couples, families, and groups of up to 50 people.',
    },
    {
      question: 'What is the Jewish Quarter certification?',
      answer:
        'Zuzana holds a special accreditation from the Jewish Museum in Prague, authorizing her to provide in-depth guided tours of the Jewish Quarter, including the synagogues, the Old Jewish Cemetery, and the museum collections.',
    },
    {
      question: 'How far in advance should I book?',
      answer:
        'Booking 2 to 4 weeks in advance is recommended, especially during peak season (April through October). Last-minute bookings are sometimes possible if there is availability.',
    },
  ]);

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>Prague Tours - Castle, Old Town & Custom Tours | Zuza Prague Tours</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href="https://zuzapragtour.de/tours" />
        <meta property="og:title" content="Prague Tours - Expert Guided Experiences" />
        <meta
          property="og:description"
          content={
            language === 'de'
              ? 'Entdecken Sie Prags Highlights mit einer lokalen, zertifizierten Expertin.'
              : "Explore Prague's best attractions with a local expert guide."
          }
        />
        <meta property="og:url" content="https://zuzapragtour.de/tours" />
        <script type="application/ld+json">{JSON.stringify(tourSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(toursFAQ)}</script>
      </Helmet>
      <Tours />
    </>
  );
};

export default ToursPage;