import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Zuza Prague Tours
          </motion.span>
        </Link>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            {t('nav.home')}
          </Link>
          <Link to="/tours" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            {t('nav.tours')}
          </Link>
          <Link to="/blog" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            {t('nav.blog')}
          </Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            {t('nav.contact')}
          </Link>
          <a href="tel:+420721231933" className="nav-link phone-link">
            📞 +420 721 231 933
          </a>
          <button 
            className="lang-toggle" 
            onClick={toggleLanguage}
            aria-label="Switch language"
          >
            {language === 'de' ? '🇬🇧 EN' : '🇩🇪 DE'}
          </button>
        </nav>

        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;