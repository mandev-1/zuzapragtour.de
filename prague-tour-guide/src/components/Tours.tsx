import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Tours: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  type TourCard = {
    id: number;
    titleKey: any;
    descriptionKey: any;
    durationKey: any;
    image: string;
    highlightKeys: readonly string[];
  };

  const toursData: TourCard[] = [
    {
      id: 1,
      titleKey: 'tour.castle.title' as const,
      descriptionKey: 'tour.castle.description' as const,
      durationKey: 'tour.castle.duration' as const,
      image: '/images/prague-castle.jpg',
      highlightKeys: ['tour.castle.h1', 'tour.castle.h2', 'tour.castle.h3', 'tour.castle.h4'] as const,
    },
    {
      id: 2,
      titleKey: 'tour.oldtown.title' as const,
      descriptionKey: 'tour.oldtown.description' as const,
      durationKey: 'tour.oldtown.duration' as const,
      image: '/images/blog-jewish-quarter-2-min.jpg',
      highlightKeys: ['tour.oldtown.h1', 'tour.oldtown.h2', 'tour.oldtown.h3', 'tour.oldtown.h4'] as const,
    },
    {
      id: 3,
      titleKey: 'tour.hidden.title' as const,
      descriptionKey: 'tour.hidden.description' as const,
      durationKey: 'tour.hidden.duration' as const,
      image: '/images/blog-hidden-gems-min.jpg',
      highlightKeys: ['tour.hidden.h1', 'tour.hidden.h2', 'tour.hidden.h3', 'tour.hidden.h4'] as const,
    },
    {
      id: 4,
      titleKey: 'tour.german.title' as const,
      descriptionKey: 'tour.german.description' as const,
      durationKey: 'tour.german.duration' as const,
      image: '/images/prague-castle-cathedral.jpg',
      highlightKeys: ['tour.german.h1', 'tour.german.h2', 'tour.german.h3', 'tour.german.h4'] as const,
    },
    {
      id: 5,
      titleKey: 'tour.custom.title' as const,
      descriptionKey: 'tour.custom.description' as const,
      durationKey: 'tour.custom.duration' as const,
      image: '/images/blog-night-prague-min.jpg',
      highlightKeys: ['tour.custom.h1', 'tour.custom.h2', 'tour.custom.h3', 'tour.custom.h4'] as const,
    },
    {
      id: 6,
      titleKey: 'tour.havel.title' as const,
      descriptionKey: 'tour.havel.description' as const,
      durationKey: 'tour.havel.duration' as const,
      image: '/images/havel-tour.jpg',
      highlightKeys: ['tour.havel.h1', 'tour.havel.h2', 'tour.havel.h3', 'tour.havel.h4'] as const,
    },
  ];

  return (
    <div className="tours">
      <div className="tours-header">
        <h1>{t('tours.header.title')}</h1>
        <p>{t('tours.header.subtitle')}</p>
      </div>

      <div className="container">
        <div className="tours-grid">
          {toursData.map((tour, index) => (
            <motion.div
              key={tour.id}
              className="tour-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
                {(() => {
                  const dest = `/book?tour=${encodeURIComponent(t(tour.titleKey))}#contact-title`;
                  return (
                    <div
                      className="tour-card-image"
                      role="button"
                      tabIndex={0}
                      onClick={() => navigate(dest)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          navigate(dest);
                        }
                      }}
                    >
                      <img src={tour.image} alt={t(tour.titleKey)} loading="lazy" />
                    </div>
                  );
                })()}
              <div className="tour-card-header">
                <h3>{t(tour.titleKey)}</h3>
                <div className="tour-meta">
                  <span className="tour-duration">⏱️ {t(tour.durationKey)}</span>
                </div>
              </div>
              <p className="tour-description">{t(tour.descriptionKey)}</p>
              <div className="tour-highlights">
                <h4>{t('tour.highlights')}</h4>
                <ul>
                  {tour.highlightKeys.map((key, idx) => (
                    <li key={idx}>✓ {t(key as any)}</li>
                  ))}
                </ul>
              </div>
              {(() => {
                const dest = `/book?tour=${encodeURIComponent(t(tour.titleKey))}#contact-title`;
                return (
                  <div
                    className="tour-footer"
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(dest)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate(dest);
                      }
                    }}
                  >
                <p className="tour-price">{t('tour.price')}</p>
                <Link
                  to={dest}
                  className="btn btn-primary btn-small"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t('tour.bookNow')}
                </Link>
                  </div>
                );
              })()}
            </motion.div>
          ))}
        </div>
      </div>

      <section className="tour-info">
        <div className="container">
          <motion.div
            className="info-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="info-card">
              <h3>👥 {t('tourinfo.groups.title')}</h3>
              <p>{t('tourinfo.groups.desc')}</p>
            </div>
            <div className="info-card">
              <h3>🗣️ {t('tourinfo.languages.title')}</h3>
              <p>{t('tourinfo.languages.desc')}</p>
            </div>
            <div className="info-card">
              <h3>📅 {t('tourinfo.booking.title')}</h3>
              <p>{t('tourinfo.booking.desc')}</p>
            </div>
            <div className="info-card">
              <h3>🌦️ {t('tourinfo.weather.title')}</h3>
              <p>{t('tourinfo.weather.desc')}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Tours;