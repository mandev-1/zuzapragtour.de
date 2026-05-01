import React from 'react';
import { Helmet } from 'react-helmet-async';
import Blog from '../components/Blog';
import { useLanguage } from '../context/LanguageContext';
import { BRAND } from '../brand';

const BlogPage: React.FC = () => {
  const { t, language } = useLanguage();

  const title =
    language === 'de'
      ? 'Prag Reiseblog — Tipps & Geschichten | ZuzaPragTour'
      : 'Prague Travel Blog — Tips & Stories | ZuzaPragTour';

  const description = t('blog.subtitle');
  const keywords =
    language === 'de'
      ? 'Prag Blog, Prag Tipps, Prag Reiseführer, Prag Reise, Prag Insider, geführte Tour Prag für Deutsche, private Prag-Touren mit deutschem Guide'
      : 'Prague blog, Prague tips, Prague travel guide, Prague insights, Czech Republic travel';

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={`${BRAND.domain}/blog`} />
        <link rel="alternate" hrefLang="de" href={`${BRAND.domain}/blog`} />
        <link rel="alternate" hrefLang="en" href={`${BRAND.domain}/blog`} />
        <link rel="alternate" hrefLang="x-default" href={`${BRAND.domain}/blog`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${BRAND.domain}/blog`} />
      </Helmet>
      <Blog />
    </>
  );
};

export default BlogPage;
