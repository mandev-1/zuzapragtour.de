import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'font-label text-sm leading-relaxed transition-colors',
    isActive
      ? 'border-b-2 border-primary pb-1 font-semibold text-primary'
      : 'text-slate-700 hover:text-primary',
  ].join(' ');

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  const close = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 z-50 flex w-full max-w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 py-4 shadow-sm backdrop-blur-md md:px-8">
      <Link
        to="/"
        className="font-headline text-xl font-bold text-primary md:text-2xl"
        onClick={close}
      >
        Zuza Prague Tours
      </Link>

      <nav className="hidden items-center gap-6 md:flex md:gap-8">
        <NavLink to="/" className={linkClass} end>
          {t('nav.home')}
        </NavLink>
        <NavLink to="/tours" className={linkClass}>
          {t('nav.tours')}
        </NavLink>
        <Link
          to={{ pathname: '/', hash: '#about' }}
          className="font-label text-sm text-slate-700 transition-colors hover:text-primary"
        >
          {t('nav.about')}
        </Link>
        <NavLink to="/blog" className={linkClass}>
          {t('nav.blog')}
        </NavLink>
        <NavLink to="/contact" className={linkClass}>
          {t('nav.contact')}
        </NavLink>
        <a
          href="tel:+420721231933"
          className="font-label text-sm text-slate-700 hover:text-primary"
        >
          +420 721 231 933
        </a>
        <button
          type="button"
          className="rounded-md border border-slate-300 bg-white px-2 py-1 font-label text-xs font-semibold text-slate-800 transition-colors hover:border-primary hover:text-primary"
          onClick={toggleLanguage}
          aria-label="Switch language"
        >
          {language === 'de' ? 'EN' : 'DE'}
        </button>
        <Link
          to="/book#contact-title"
          className="rounded-lg bg-primary px-5 py-2.5 font-label text-sm font-semibold text-on-primary transition-opacity hover:opacity-90 active:scale-95"
        >
          {t('contact.booking.header.title')}
        </Link>
      </nav>

      <div className="flex items-center gap-2 md:hidden">
        <button
          type="button"
          className="rounded-md border border-slate-300 bg-white px-2 py-1 font-label text-xs font-semibold text-slate-800"
          onClick={toggleLanguage}
          aria-label="Switch language"
        >
          {language === 'de' ? 'EN' : 'DE'}
        </button>
        <button
          type="button"
          className="relative flex h-10 w-10 flex-col items-center justify-center rounded-md border border-slate-200 bg-white"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-5 bg-slate-800 transition-transform ${isMenuOpen ? 'translate-y-1.5 rotate-45' : ''}`}
          />
          <span className={`my-1 block h-0.5 w-5 bg-slate-800 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span
            className={`block h-0.5 w-5 bg-slate-800 transition-transform ${isMenuOpen ? '-translate-y-1.5 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-slate-200 bg-white px-4 py-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-1">
            <NavLink to="/" className={linkClass} end onClick={close}>
              {t('nav.home')}
            </NavLink>
            <NavLink to="/tours" className={linkClass} onClick={close}>
              {t('nav.tours')}
            </NavLink>
            <Link
              to={{ pathname: '/', hash: '#about' }}
              className="py-2 font-label text-sm text-slate-700 hover:text-primary"
              onClick={close}
            >
              {t('nav.about')}
            </Link>
            <NavLink to="/blog" className={linkClass} onClick={close}>
              {t('nav.blog')}
            </NavLink>
            <NavLink to="/contact" className={linkClass} onClick={close}>
              {t('nav.contact')}
            </NavLink>
            <a href="tel:+420721231933" className="py-2 font-label text-sm text-slate-700">
              +420 721 231 933
            </a>
            <Link
              to="/book#contact-title"
              className="mt-2 rounded-lg bg-primary py-3 text-center font-semibold text-on-primary"
              onClick={close}
            >
              {t('contact.booking.header.title')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
