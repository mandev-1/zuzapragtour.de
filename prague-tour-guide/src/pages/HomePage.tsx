import React from 'react';
import { Helmet } from 'react-helmet-async';
import Home from '../components/Home';
import { useLanguage } from '../context/LanguageContext';
import { getHomePageSchema } from '../utils/seo';

const HomePage: React.FC = () => {
  const { language } = useLanguage();

  const title =
    language === 'de'
      ? 'Zuzana Manová | Deutschsprachige Prag-Expertin & Stadtführerin – ZuzaPragTour'
      : 'Zuzana Manová | Private Prague Tours & Expert Guide – ZuzaPragTour';

  const description =
    language === 'de'
      ? 'Zuzana Manová – deutschsprachige Prag-Expertin & Spezialistin für private Stadtführungen seit 1986. Zertifizierte Führungen durch Altstadt, Karlsbrücke, Prager Burg & Jüdisches Viertel. Über 40 Jahre Erfahrung. Jetzt buchen!'
      : 'Zuzana Manová – certified Prague expert guide and specialist since 1986. Private tours of Prague Castle, Old Town, Jewish Quarter, and hidden gems. German & English. Book your tour today!';

  const keywords =
    language === 'de'
      ? 'Prag Expertin, Prag Spezialistin, deutschsprachige Stadtführerin Prag, Prag Reiseführerin deutsch, Prag Tour deutsch, Prager Burg Führung, Altstadt Prag Tour, Jüdisches Viertel Prag, private Prag Touren, Prag Stadtführung, geführte Tour Prag für Deutsche, private Prag-Touren mit deutschem Guide'
      : 'Prague tour guide, Prague expert guide, Prague tours, Prague Castle tour, Old Town Prague, Jewish Quarter Prague, private Prague tours, Prague walking tours, Prague specialist guide, Czech Republic tours';

  const homeSchema = getHomePageSchema();

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href="https://zuzapragtour.de/" />
        <link rel="alternate" hrefLang="de" href="https://zuzapragtour.de/" />
        <link rel="alternate" hrefLang="en" href="https://zuzapragtour.de/" />
        <link rel="alternate" hrefLang="x-default" href="https://zuzapragtour.de/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zuzapragtour.de/" />
        <meta property="og:image" content="https://zuzapragtour.de/images/charles-bridge-hero-1600.jpg" />
        <meta property="og:image:width" content="1600" />
        <meta property="og:image:height" content="1029" />
        <meta
          property="og:image:alt"
          content="Charles Bridge and Prague — Zuza Prague Tours"
        />
        <meta property="og:locale" content={language === 'de' ? 'de_DE' : 'en_US'} />
        <meta property="og:locale:alternate" content={language === 'de' ? 'en_US' : 'de_DE'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://zuzapragtour.de/images/charles-bridge-hero-1600.jpg" />
        <script type="application/ld+json">{JSON.stringify(homeSchema)}</script>
      </Helmet>
      <Home />
    </>
  );
};

export default HomePage;