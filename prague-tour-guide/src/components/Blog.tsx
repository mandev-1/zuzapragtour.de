import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { blogPosts } from '../utils/blogData';

const Blog: React.FC = () => {
  const { t, language } = useLanguage();
  const sortedPosts = React.useMemo(() => {
    return [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  }, []);

  return (
    <div className="blog">
      <div className="blog-header">
        <h1>{t('blog.title')}</h1>
        <p>{t('blog.subtitle')}</p>
      </div>

      <div className="container">
        <div className="blog-grid">
          {sortedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="blog-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="blog-card-image">
                <img 
                  src={post.image} 
                  alt={t(post.titleKey as any)}
                  loading="lazy"
                />
              </div>
              <div className="blog-card-content">
                <span className="blog-date">{t(post.dateKey as any)}</span>
                <h2>{t(post.titleKey as any)}</h2>
                <p>{t(post.excerptKey as any)}</p>
                <Link to={`/blog/${language === 'de' && (post as any).slugDe ? (post as any).slugDe : post.slug}`} className="blog-read-more">
                  {t('blog.readMore')} →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <section className="blog-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>{t('cta.title')}</h2>
            <p>{t('cta.subtitle')}</p>
            <a href="/contact" className="btn btn-primary">
              {t('hero.contactMe')}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
