import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const TripAdvisorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
    <circle cx="24" cy="24" r="24" fill="#34E0A1" />
    <circle cx="14" cy="24" r="6" fill="white" />
    <circle cx="34" cy="24" r="6" fill="white" />
    <circle cx="14" cy="24" r="3" fill="#000" />
    <circle cx="34" cy="24" r="3" fill="#000" />
    <path d="M9 18C9 18 12 10 24 10C36 10 39 18 39 18" stroke="black" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="#E1306C" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" stroke="#E1306C" strokeWidth="1.5" />
    <circle cx="17.5" cy="6.5" r="1" fill="#E1306C" />
  </svg>
);

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full">
      <div className="bg-primary py-10 text-on-primary">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-8 md:flex-row">
          <div>
            <p className="font-label text-xs font-bold uppercase tracking-widest text-on-primary/60">
              {t('footer.cta.eyebrow')}
            </p>
            <h3 className="mt-1 font-headline text-2xl md:text-3xl">{t('footer.cta.title')}</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:justify-end">
            <a
              href="tel:+420721231933"
              className="inline-flex items-center gap-2 rounded-lg bg-on-primary/10 px-5 py-2.5 font-label text-sm font-semibold text-on-primary ring-1 ring-on-primary/20 transition-colors hover:bg-on-primary/20"
            >
              <span className="material-symbols-outlined text-base">call</span>
              +420 721 231 933
            </a>
            <a
              href="https://wa.me/420721231933"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-on-primary/10 px-5 py-2.5 font-label text-sm font-semibold text-on-primary ring-1 ring-on-primary/20 transition-colors hover:bg-on-primary/20"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              WhatsApp
            </a>
            <Link
              to="/book#contact-title"
              className="inline-flex items-center gap-2 rounded-lg bg-secondary-container px-5 py-2.5 font-label text-sm font-semibold text-on-secondary-container transition-opacity hover:opacity-90"
            >
              {t('contact.booking.header.title')}
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-8">
          <a
            href="https://www.tripadvisor.de/Attraction_Review-g274707-d10450040-Reviews-Zuza_Prague_Tours-Prague_Bohemia.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <TripAdvisorIcon className="h-5 w-5 flex-shrink-0" />
            <span className="font-label text-sm font-semibold text-slate-700">
              {t('footer.tripadvisor.trustLine')}
            </span>
          </a>

          <span className="hidden h-4 w-px bg-slate-200 md:block" aria-hidden />

          <a
            href="https://www.tourhq.com/guide/CZ56896/zuzana-manova"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary font-label text-xs font-bold text-on-primary">
              T
            </span>
            <span className="font-label text-sm font-semibold text-slate-700">{t('footer.tourhq.badge')}</span>
          </a>

          <span className="hidden h-4 w-px bg-slate-200 md:block" aria-hidden />

          <a
            href="https://www.instagram.com/erlebnis_tour_prag/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <InstagramIcon className="flex-shrink-0" />
            <span className="font-label text-sm font-semibold text-slate-700">@erlebnis_tour_prag</span>
          </a>

          <span className="hidden h-4 w-px bg-slate-200 md:block" aria-hidden />

          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-base text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
              aria-hidden
            >
              verified
            </span>
            <span className="font-label text-sm text-slate-600">{t('footer.certified')}</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 py-14 text-slate-400">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <span className="mb-3 block font-headline text-xl text-white">Zuza Prague Tours</span>
            <p className="mb-5 font-label text-sm leading-relaxed text-slate-400">{t('footer.tagline')}</p>
            <a
              href="https://www.tripadvisor.de/Attraction_Review-g274707-d10450040-Reviews-Zuza_Prague_Tours-Prague_Bohemia.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1.5 font-label text-xs text-slate-300 ring-1 ring-slate-700 transition-colors hover:bg-slate-700"
            >
              <span className="text-secondary-container">★★★★★</span>
              <span>{t('footer.reviewCount')}</span>
            </a>
          </div>

          <div className="space-y-4">
            <h4 className="font-label text-xs font-bold uppercase tracking-widest text-slate-300">{t('footer.contact')}</h4>
            <div className="flex flex-col gap-2.5 font-label text-sm">
              <a href="tel:+420721231933" className="flex items-center gap-2 text-slate-400 transition-colors hover:text-white">
                <span className="material-symbols-outlined text-sm">call</span>
                +420 721 231 933
              </a>
              <a
                href="mailto:zuzanamanova@email.cz"
                className="flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
              >
                <span className="material-symbols-outlined text-sm">mail</span>
                zuzanamanova@email.cz
              </a>
              <a
                href="https://wa.me/420721231933"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                WhatsApp
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-label text-xs font-bold uppercase tracking-widest text-slate-300">{t('footer.quicklinks')}</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: '/', label: t('nav.home') },
                { to: '/tours', label: t('nav.tours') },
                { to: '/zuzana-manova', label: t('nav.zuzana') },
                { to: '/blog', label: t('nav.blog') },
                { to: '/contact#contact-title', label: t('nav.contact') },
                { to: '/book#contact-title', label: t('contact.booking.header.title') },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="font-label text-sm text-slate-400 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4 md:col-span-1">
            <h4 className="font-label text-xs font-bold uppercase tracking-widest text-slate-300">{t('footer.follow')}</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.tripadvisor.de/Attraction_Review-g274707-d10450040-Reviews-Zuza_Prague_Tours-Prague_Bohemia.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg bg-slate-800 px-3 py-2.5 ring-1 ring-slate-700 transition-colors hover:bg-slate-700"
              >
                <TripAdvisorIcon className="h-4 w-4 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-label text-xs font-semibold text-white">TripAdvisor</p>
                  <p className="font-label text-xs text-slate-500">{t('reviews.tripadvisor')}</p>
                </div>
              </a>

              <a
                href="https://www.tourhq.com/guide/CZ56896/zuzana-manova"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg bg-slate-800 px-3 py-2.5 ring-1 ring-slate-700 transition-colors hover:bg-slate-700"
              >
                <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary font-label text-[10px] font-bold text-on-primary">
                  T
                </span>
                <div className="min-w-0">
                  <p className="font-label text-xs font-semibold text-white">TourHQ</p>
                  <p className="font-label text-xs text-slate-500">{t('footer.tourhq.sub')}</p>
                </div>
              </a>

              <a
                href="https://www.instagram.com/erlebnis_tour_prag/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg bg-slate-800 px-3 py-2.5 ring-1 ring-slate-700 transition-colors hover:bg-slate-700"
              >
                <InstagramIcon className="h-4 w-4 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-label text-xs font-semibold text-white">Instagram</p>
                  <p className="font-label text-xs text-slate-500">@erlebnis_tour_prag</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-slate-800 px-8 pt-8 md:flex-row">
          <p className="font-label text-xs text-slate-500">
            © {currentYear} Zuza Prague Tours – Zuzana Manová. {t('footer.rights')}
          </p>
          <div className="flex gap-4">
            <Link
              to="/privacy"
              className="font-label text-xs text-slate-500 underline-offset-4 hover:text-slate-300 hover:underline"
            >
              {t('footer.privacy')}
            </Link>
            <span className="text-slate-700">·</span>
            <Link
              to="/terms"
              className="font-label text-xs text-slate-500 underline-offset-4 hover:text-slate-300 hover:underline"
            >
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
