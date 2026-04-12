import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="home">
      <motion.section
        className="hero"
        style={{
          background: `linear-gradient(135deg, rgba(185, 28, 28, 0.85) 0%, rgba(220, 38, 38, 0.85) 50%, rgba(153, 27, 27, 0.85) 100%), url(${process.env.PUBLIC_URL}/images/charles-bridge-min.jpg) center center`,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content">
          <h1>{t('hero.title')}</h1>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>
          <div className="hero-buttons">
            <Link to="/tours" className="btn btn-primary">
              {t('hero.exploreTours')}
            </Link>
            <Link to="/contact#contact-title" className="btn btn-secondary">
              {t('hero.contactMe')}
            </Link>
          </div>
        </div>
      </motion.section>

      <section className="features">
        <div className="container">
          <motion.div
            className="feature-grid"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="feature-card">
              <div className="feature-icon">🏰</div>
              <h3>{t('features.historic.title')}</h3>
              <p>{t('features.historic.desc')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>{t('features.groups.title')}</h3>
              <p>{t('features.groups.desc')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🗣️</div>
              <h3>{t('features.expert.title')}</h3>
              <p>{t('features.expert.desc')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>{t('features.gems.title')}</h3>
              <p>{t('features.gems.desc')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="about-preview">
        <div className="container">
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>{t('about.title')}</h2>
            <p>
              {t('about.intro')}
            </p>
            <p>
              {t('about.expertise')}
            </p>
            <p>
              {t('about.promise')}
            </p>
            <Link to="/contact#contact-title" className="btn btn-outline">
              {t('about.cta')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Zuzana - Photo Section */}
      <section className="about-photo-section">
        <div className="container">
          <motion.div
            className="about-photo-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="about-photo-image">
              <img 
                src="/images/zuzana-portrait.jpg" 
                alt="Ing. Zuzana Manová - Prague Tour Guide"
                className="portrait-image"
              />
            </div>
            <div className="about-photo-content">
              <h2>{t('about.photoTitle')}</h2>
              <p className="about-subtitle">{t('about.photoSubtitle')}</p>
              <ul className="credentials-list">
                <li>✓ {t('about.credential1')}</li>
                <li>✓ {t('about.credential2')}</li>
                <li>✓ {t('about.credential3')}</li>
                <li>✓ {t('about.credential4')}</li>
              </ul>
              <Link to="/contact#contact-title" className="btn btn-primary">
                {t('hero.contactMe')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>{t('cta.title')}</h2>
            <p>{t('cta.subtitle')}</p>
            <div className="cta-buttons">
              <a href="tel:+420721231933" className="btn btn-primary">
                📞 {t('cta.call')}
              </a>
              <a
                href="https://wa.me/420721231933"
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 {t('cta.whatsapp')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;