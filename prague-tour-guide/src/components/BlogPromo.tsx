import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const PROMO_SLUG = 'vaclav-havel-tour-prague';
const DISMISS_KEY = 'zpt.promo.dismissed';

const BlogPromo: React.FC = () => {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const [visible, setVisible] = React.useState(false);
  const [exiting, setExiting] = React.useState(false);

  const isHidden =
    pathname === '/' ||
    pathname === `/blog/${PROMO_SLUG}`;

  React.useEffect(() => {
    if (isHidden) return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    const timer = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(timer);
  }, [isHidden]);

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExiting(true);
    sessionStorage.setItem(DISMISS_KEY, '1');
    setTimeout(() => setVisible(false), 300);
  };

  if (isHidden || !visible) return null;

  const title =
    language === 'de'
      ? 'Václav Havel in Prag'
      : 'Václav Havel in Prague';

  const subtitle =
    language === 'de'
      ? 'Ein Spaziergang der Freiheit →'
      : 'A Walking Tour of Freedom →';

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 w-72 overflow-hidden rounded-xl shadow-xl ring-1 ring-black/10 transition-all duration-300 sm:w-80 ${
        exiting ? 'translate-y-4 scale-95 opacity-0' : 'animate-[slideUp_0.4s_ease-out]'
      }`}
    >
      <Link to={`/blog/${PROMO_SLUG}`} className="group block">
        <div className="relative h-32 overflow-hidden">
          <img
            src="/images/blog-havel.jpg"
            alt={title}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-0.5 font-label text-[10px] font-bold uppercase tracking-wider text-on-primary">
            {language === 'de' ? 'Empfohlen' : 'Featured'}
          </span>
        </div>
        <div className="bg-surface-container-lowest px-4 pb-4 pt-3">
          <p className="font-headline text-sm leading-snug text-on-surface">{title}</p>
          <p className="mt-0.5 font-label text-xs text-primary">{subtitle}</p>
        </div>
      </Link>
      <button
        onClick={dismiss}
        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/40 text-white/90 backdrop-blur-sm transition-colors hover:bg-black/60"
        aria-label="Close"
      >
        <span className="text-sm leading-none">&times;</span>
      </button>
    </div>
  );
};

export default BlogPromo;
