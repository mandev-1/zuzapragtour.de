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
      : 'Zuzana Manová | Private Prague Tours – ZuzaPragTour';

  const description =
    language === 'de'
      ? 'Zuzana Manová – deutschsprachige Prag-Expertin & Spezialistin für private Stadtführungen seit 1986. Zertifizierte Führungen durch Altstadt, Karlsbrücke, Prager Burg & Jüdisches Viertel. Über 40 Jahre Erfahrung. Jetzt buchen!'
      : 'Zuzana Manová – your private Prague tour guide since 1986. Certified expert tours of Prague Castle, Old Town, Jewish Quarter, and hidden gems. 40+ years of experience. Book your personal tour today!';

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
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zuzapragtour.de/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(homeSchema)}</script>
      </Helmet>
      <Home />
    </>
  );
};

export default HomePage;