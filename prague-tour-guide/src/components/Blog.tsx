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
    <div className="bg-white pb-16">
      <div className="border-b border-stone-100 bg-stone-50/70 py-14 text-center md:py-16">
        <h1 className="mb-4 font-headline text-4xl text-primary md:text-5xl">{t('blog.title')}</h1>
        <p className="mx-auto max-w-2xl text-lg text-stone-600">{t('blog.subtitle')}</p>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/blog/${language === 'de' && (post as any).slugDe ? (post as any).slugDe : post.slug}`}
                className="block"
              >
                <div className="h-52 overflow-hidden">
                  <img src={post.image} alt="" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                </div>
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <span className="mb-2 font-label text-sm font-medium text-secondary">{t(post.dateKey as any)}</span>
                <h2 className="mb-3 font-headline text-xl text-on-surface">
                  <Link
                    to={`/blog/${language === 'de' && (post as any).slugDe ? (post as any).slugDe : post.slug}`}
                    className="hover:text-primary"
                  >
                    {t(post.titleKey as any)}
                  </Link>
                </h2>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-on-surface-variant">{t(post.excerptKey as any)}</p>
                <Link
                  to={`/blog/${language === 'de' && (post as any).slugDe ? (post as any).slugDe : post.slug}`}
                  className="font-label font-semibold text-primary hover:underline"
                >
                  {t('blog.readMore')} →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <section className="border-t border-outline-variant/20 bg-primary py-16 text-on-primary">
        <div className="mx-auto max-w-3xl px-8 text-center">
          <h2 className="mb-4 font-headline text-3xl">{t('cta.title')}</h2>
          <p className="mb-8 text-lg opacity-95">{t('cta.subtitle')}</p>
          <Link to="/contact#contact-title" className="inline-block rounded-lg bg-secondary-container px-8 py-3 font-semibold text-on-secondary-container hover:opacity-95">
            {t('hero.contactMe')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Blog;
