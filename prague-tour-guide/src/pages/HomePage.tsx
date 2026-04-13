import React from 'react';
import { Helmet } from 'react-helmet-async';
import Home from '../components/Home';
import { useLanguage } from '../context/LanguageContext';
import { getHomePageSchema } from '../utils/seo';

const HomePage: React.FC = () => {
  const { language } = useLanguage();

  const title =
    language === 'de'
      ? 'Exklusive deutsch geführte Prag-Stadtführungen | Zuza Prague Tours'
      : 'Zuza Prague Tours - Expert Prague Tour Guide | Zuzana Manova';

  const description =
    language === 'de'
      ? 'Entdecken Sie Prag mit einer zertifizierten deutschsprachigen Stadtführerin mit über 40 Jahren Erfahrung. Private und persönliche Prag-Touren – individuell, authentisch und mit Herz. Erkunden Sie Altstadt, Karlsbrücke und Prager Burg mit einer lokalen Expertin. Ideal für Paare, Familien & Gruppen. Jetzt Ihre deutsch geführte Prag-Stadtführung buchen!'
      : 'Discover Prague with Zuzana, your local expert tour guide. Private and small group tours of Prague Castle, Old Town, Jewish Quarter, and hidden gems. Book your personalized Prague tour today!';

  const keywords =
    language === 'de'
      ? 'Prag Reiseführerin, Prag Tour, Prager Burg Führung, Altstadt Prag Tour, Jüdisches Viertel Prag, private Prag Touren, Prag Stadtführung, Prag Sehenswürdigkeiten, geführte Tour Prag für Deutsche, private Prag-Touren mit deutschem Guide'
      : 'Prague tour guide, Prague tours, Prague Castle tour, Old Town Prague, Jewish Quarter Prague, private Prague tours, Prague walking tours, Prague sightseeing, Czech Republic tours';

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