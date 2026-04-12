import React from 'react';
import { Helmet } from 'react-helmet-async';
import Tours from '../components/Tours';
import { useLanguage } from '../context/LanguageContext';

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
      </Helmet>
      <Tours />
    </>
  );
};

export default ToursPage;