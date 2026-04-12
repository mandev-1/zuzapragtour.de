import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Contact from '../components/Contact';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const useQuery = () => new URLSearchParams(useLocation().search);

const BookPage: React.FC = () => {
  const { language } = useLanguage();
  const query = useQuery();
  const selectedTour = useMemo(() => query.get('tour') || '', [query]);

  const pageTitle = language === 'de'
    ? 'Tour buchen – Zuza Prague Tours'
    : 'Book a Tour – Zuza Prague Tours';
  const pageDesc = language === 'de'
    ? 'Buchen Sie Ihre Tour in Prag. Nutzen Sie das Formular oder schreiben Sie mir per WhatsApp.'
    : 'Book your Prague tour. Use the form or message me on WhatsApp.';

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href="https://zuzapragtour.de/book" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content="https://zuzapragtour.de/book" />
      </Helmet>
      <Contact variant="booking" selectedTourTitle={selectedTour} />
    </>
  );
};

export default BookPage;
