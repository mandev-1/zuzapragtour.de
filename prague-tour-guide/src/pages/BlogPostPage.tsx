import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { blogPosts } from '../utils/blogData';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();

  // Find the blog post by slug
  const post = blogPosts.find((p: any) => p.slug === slug || p.slugDe === slug);

  // If post not found, redirect to blog page
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{t(post.titleKey as any)} | Zuza Prague Tours Blog</title>
        <meta name="description" content={t(post.excerptKey as any)} />
        <meta
          name="keywords"
          content={`${(language === 'de' && post.tagsDe ? post.tagsDe : post.tags).join(', ')}, ${
            language === 'de' ? 'Prag Touren, Prag Reiseführer' : 'Prague tours, Prague guide'
          }${
            language === 'de'
              ? ', geführte Tour Prag für Deutsche, private Prag-Touren mit deutschem Guide'
              : ''
          }`}
        />
  <link rel="canonical" href={`https://zuzapragtour.de/blog/${language === 'de' && (post as any).slugDe ? (post as any).slugDe : post.slug}`} />
        <meta property="og:title" content={`${t(post.titleKey as any)} | Zuza Prague Tours`} />
        <meta property="og:description" content={t(post.excerptKey as any)} />
  <meta property="og:url" content={`https://zuzapragtour.de/blog/${language === 'de' && (post as any).slugDe ? (post as any).slugDe : post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        {(language === 'de' && post.tagsDe ? post.tagsDe : post.tags).map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: t(post.titleKey as any),
            description: t(post.excerptKey as any),
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: language,
            author: {
              '@type': 'Person',
              name: post.author,
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://zuzapragtour.de/blog/${language === 'de' && (post as any).slugDe ? (post as any).slugDe : post.slug}`,
            },
            image: post.id === '12' || post.id === '13'
              ? [
                  `https://zuzapragtour.de${post.image}`,
                  post.id === '12'
                    ? 'https://zuzapragtour.de/images/blog-kafka-2.jpg'
                    : 'https://zuzapragtour.de/images/blog-winter-cathedral.png'
                ]
              : `https://zuzapragtour.de${post.image}`,
            url: `https://zuzapragtour.de/blog/${language === 'de' && (post as any).slugDe ? (post as any).slugDe : post.slug}`,
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: t('nav.home' as any),
                item: 'https://zuzapragtour.de/'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: t('nav.blog' as any),
                item: 'https://zuzapragtour.de/blog'
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: t(post.titleKey as any),
                item: `https://zuzapragtour.de/blog/${language === 'de' && (post as any).slugDe ? (post as any).slugDe : post.slug}`
              }
            ]
          })}
        </script>
        {post.slug === 'what-to-do-in-prague-in-november-2025' && (
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name:
                    language === 'de'
                      ? 'Ist November eine gute Zeit für Prag?'
                      : 'Is November a good time to visit Prague?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text:
                      language === 'de'
                        ? 'Ja—weniger Menschen, gute Verfügbarkeiten und viele Konzerte & Ausstellungen. Warme Kleidung und bequeme Schuhe sind empfehlenswert.'
                        : 'Yes—fewer crowds, better availability, and lots of concerts & exhibitions. Dress warm and wear comfortable shoes.'
                  }
                },
                {
                  '@type': 'Question',
                  name:
                    language === 'de'
                      ? 'Was kann man in Prag im November machen?'
                      : 'What can you do in Prague in November?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text:
                      language === 'de'
                        ? 'Klassik- und Jazzkonzerte, Galerien & Museen, Abendspaziergänge an der Moldau und gemütliche Cafés. Events finden Sie im verlinkten Novemberkalender.'
                        : 'Classical and jazz concerts, galleries & museums, evening riverside walks, and cozy cafés. See the linked November events calendar for what’s on.'
                  }
                },
                {
                  '@type': 'Question',
                  name:
                    language === 'de'
                      ? 'Wie ist das Wetter in Prag im November?'
                      : 'What is the weather like in Prague in November?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text:
                      language === 'de'
                        ? 'Meist kühl (5–10°C) mit frühem Sonnenuntergang. Schichten, Regenjacke und rutschfeste Schuhe sind sinnvoll.'
                        : 'Generally cool (5–10°C) with early sunsets. Pack layers, a rain jacket, and good shoes for cobblestones.'
                  }
                }
              ]
            })}
          </script>
        )}
      </Helmet>

      <article className="blog-post">
        <div className="blog-post-header">
          <div className="container">
            <Link to="/blog" className="back-link">
              ← {t('blog.backToBlog')}
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>{t(post.titleKey as any)}</h1>
              <div className="blog-post-meta">
                <span className="blog-post-date">{t(post.dateKey as any)}</span>
                <span className="blog-post-author">By {post.author}</span>
              </div>
              <div className="blog-post-tags">
                {(language === 'de' && post.tagsDe ? post.tagsDe : post.tags).map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="blog-post-content">
          <div className="container">
            <motion.div
              className="content-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Featured Image */}
              <div className="blog-featured-image">
                <img 
                  src={post.image} 
                  alt={t(post.titleKey as any)}
                  loading="eager"
                />
                {post.image === '/images/klementinum-tower.jpg' && (
                  <div className="image-credit">Photo: Roman Boed</div>
                )}
              </div>

              {/* This will be replaced with actual content from API/CMS */}
              <div className="blog-content">
                {post.contentKey ? (
                  <div dangerouslySetInnerHTML={{ __html: t(post.contentKey as any) }} />
                ) : (
                  <>
                    <p className="lead">{t(post.excerptKey as any)}</p>
                    
                    <h2>Full Content Coming Soon</h2>
                    <p>
                      This blog post is currently being written. Check back soon for the complete article!
                    </p>
                    
                    <div className="blog-cta-box">
                      <h3>Ready to Explore Prague?</h3>
                      <p>
                        Don't wait to discover Prague's wonders! Book a personalized tour with Ing. Zuzana Manová.
                      </p>
                      <div className="cta-buttons">
                        <Link to="/contact#contact-title" className="btn btn-primary">
                          {t('hero.contactMe')}
                        </Link>
                        <Link to="/tours" className="btn btn-outline">
                          {t('hero.exploreTours')}
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="blog-post-footer">
                <div className="share-section">
                  <h3>Share This Post</h3>
                  <div className="share-buttons">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=https://zuzapragtour.de/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn facebook"
                    >
                      📘 Facebook
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=https://zuzapragtour.de/blog/${post.slug}&text=${encodeURIComponent(t(post.titleKey as any))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn twitter"
                    >
                      🐦 Twitter
                    </a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(t(post.titleKey as any))} https://zuzapragtour.de/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn whatsapp"
                    >
                      💬 WhatsApp
                    </a>
                  </div>
                </div>

                <div className="author-box">
                  <h3>{t('blog.aboutBox.title')}</h3>
                  <div className="author-info">
                    <div className="author-avatar">ZM</div>
                    <div>
                      <h4>{post.author}</h4>
                      <p>
                        {t('about.intro')}
                      </p>
                      <Link to="/contact#contact-title" className="btn btn-small btn-outline">
                        {t('about.cta')}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="related-posts">
          <div className="container">
            <h2>More Prague Insights</h2>
            <div className="blog-grid">
              {blogPosts
                .filter((p) => p.id !== post.id)
                .slice(0, 3)
                .map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.id}
                    className="blog-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="blog-card-image">
                      <img 
                        src={relatedPost.image} 
                        alt={t(relatedPost.titleKey as any)}
                        loading="lazy"
                      />
                    </div>
                    <div className="blog-card-content">
                      <span className="blog-date">{t(relatedPost.dateKey as any)}</span>
                      <h3>{t(relatedPost.titleKey as any)}</h3>
                      <p>{t(relatedPost.excerptKey as any)}</p>
                      <Link to={`/blog/${language === 'de' && (relatedPost as any).slugDe ? (relatedPost as any).slugDe : relatedPost.slug}`} className="blog-read-more">
                        {t('blog.readMore')} →
                      </Link>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPostPage;
