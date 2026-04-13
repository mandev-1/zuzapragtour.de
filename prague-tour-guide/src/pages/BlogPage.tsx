import React from 'react';
import { Helmet } from 'react-helmet-async';
import Blog from '../components/Blog';
import { useLanguage } from '../context/LanguageContext';

const BlogPage: React.FC = () => {
  const { t, language } = useLanguage();

  const description = language === 'de' ? t('blog.subtitle') : t('blog.subtitle');
  const keywords =
    language === 'de'
      ? 'Prag Blog, Prag Tipps, Prag Reiseführer, Prag Reise, Prag Insider, geführte Tour Prag für Deutsche, private Prag-Touren mit deutschem Guide'
      : 'Prague blog, Prague tips, Prague travel guide, Prague insights, Czech Republic travel';

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{t('blog.title')} | Zuza Prague Tours</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
  <link rel="canonical" href="https://zuzapragtour.de/blog" />
        <meta property="og:title" content={`${t('blog.title')} | Zuza Prague Tours`} />
        <meta property="og:description" content={description} />
  <meta property="og:url" content="https://zuzapragtour.de/blog" />
      </Helmet>
      <Blog />
    </>
  );
};

export default BlogPage;
