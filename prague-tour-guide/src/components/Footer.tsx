import React from 'react';
import './Footer.css';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Zuza Prague Tours</h3>
          <p>{t('footer.tagline')}</p>
        </div>

        <div className="footer-section">
          <h4>{t('footer.contact')}</h4>
          <p>
            <a href="tel:+420721231933">📞 +420 721 231 933</a>
          </p>
          <p>
            <a href="mailto:zuzanamanova@email.cz">✉️ zuzanamanova@email.cz</a>
          </p>
          <p>
            <a
              href="https://wa.me/420721231933"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp
            </a>
          </p>
        </div>

        <div className="footer-section">
          <h4>{t('footer.quicklinks')}</h4>
          <ul>
            <li><a href="/">{t('nav.home')}</a></li>
            <li><a href="/tours">{t('nav.tours')}</a></li>
            <li><a href="/blog">{t('nav.blog')}</a></li>
            <li><a href="/contact#contact-title">{t('nav.contact')}</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>{t('footer.follow')}</h4>
          <div className="social-links">

                        <a
              href="https://www.tripadvisor.de/Attraction_Review-g274707-d10450040-Reviews-Private_Stadtfuhrungen_mit_Zuzana-Prague_Bohemia.html"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TripAdvisor"
              title={t('reviews.tripadvisor')}
            >
              ⭐ 4.9 TripAdvisor
            </a>
            <a href="https://www.instagram.com/erlebnis_tour_prag/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              📷 Instagram
            </a>
            <a href="https://www.tourhq.com/guide/CZ56896/zuzana-manova" target="_blank" rel="noopener noreferrer" aria-label="TourHQ">
              🧭 TourHQ
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {currentYear} Zuza Prague Tours - Zuzana Manova. {t('footer.rights')}
        </p>
        <p className="footer-legal">
          <a href="/privacy">{t('footer.privacy')}</a> |{' '}
          <a href="/terms">{t('footer.terms')}</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;