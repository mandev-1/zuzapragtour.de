import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Contact from '../components/Contact';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { BRAND } from '../brand';

const useQuery = () => new URLSearchParams(useLocation().search);

const BookPage: React.FC = () => {
  const { language } = useLanguage();
  const query = useQuery();
  const selectedTour = useMemo(() => query.get('tour') || '', [query]);

  const pageTitle = language === 'de'
    ? `Tour buchen – ${BRAND.siteName}`
    : `Book a Tour – ${BRAND.siteName}`;
  const pageDesc = language === 'de'
    ? 'Buchen Sie Ihre Tour in Prag. Nutzen Sie das Formular oder schreiben Sie mir per WhatsApp.'
    : 'Book your Prague tour. Use the form or message me on WhatsApp.';

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={`${BRAND.domain}/book`} />
        <link rel="alternate" hrefLang="de" href={`${BRAND.domain}/book`} />
        <link rel="alternate" hrefLang="en" href={`${BRAND.domain}/book`} />
        <link rel="alternate" hrefLang="x-default" href={`${BRAND.domain}/book`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={`${BRAND.domain}/book`} />
      </Helmet>
      <Contact variant="booking" selectedTourTitle={selectedTour} />
    </>
  );
};

export default BookPage;
