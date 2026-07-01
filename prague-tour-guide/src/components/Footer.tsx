'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  // The home page renders its own full-bleed CTA section, so skip this
  // duplicate dark CTA band there (keep it on every other page).
  const isHome = usePathname() === '/';

  return (
    <footer className="w-full">
      {!isHome && (
      <div className="bg-ink">
        <div className="mx-auto flex max-w-editorial flex-col gap-6 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <p className="font-eyebrow text-eyebrow uppercase text-stone-500">{t('footer.cta.eyebrow')}</p>
            <h3 className="mt-1 font-headline text-display-md text-paper">{t('footer.cta.title')}</h3>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="tel:+420721231933" className="font-label text-sm text-stone-300 underline-offset-4 transition-colors hover:text-paper hover:underline">+420 721 231 933</a>
            <span className="text-stone-600" aria-hidden>·</span>
            <a href="https://wa.me/420721231933" target="_blank" rel="noopener noreferrer" className="font-label text-sm text-stone-300 underline-offset-4 transition-colors hover:text-paper hover:underline">WhatsApp</a>
            <span className="text-stone-600" aria-hidden>·</span>
            <Link href="/book#contact-title" className="rounded-md bg-accent px-5 py-2.5 font-label text-sm font-medium text-paper transition-colors hover:bg-accent-hover">
              {t('contact.booking.header.title')}
            </Link>
          </div>
        </div>
      </div>
      )}

      <div className="bg-paper">
        <div className="mx-auto grid max-w-editorial grid-cols-2 gap-8 px-5 py-12 md:grid-cols-4 md:px-10">
          <div className="col-span-2 md:col-span-1">
            <span className="mb-3 block font-headline text-lg text-ink">Zuza Prague Tours</span>
            <p className="mb-5 font-body text-sm leading-relaxed text-stone-600">{t('footer.tagline')}</p>
            <a href="https://www.tripadvisor.de/Attraction_Review-g274707-d10450040-Reviews-Zuza_Prague_Tours-Prague_Bohemia.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-label text-xs text-stone-500 transition-colors hover:text-ink">
              <TripAdvisorIcon className="h-4 w-4 flex-shrink-0" />
              {t('footer.tripadvisor.trustLine')}
            </a>
            <a href="https://www.instagram.com/erlebnis_tour_prag/" target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center gap-2 font-label text-xs text-stone-500 transition-colors hover:text-ink">
              <InstagramIcon className="flex-shrink-0" />
              @erlebnis_tour_prag
            </a>
          </div>

          <div className="space-y-4">
            <h4 className="font-label text-xs font-bold uppercase tracking-widest text-stone-400">{t('footer.contact')}</h4>
            <div className="flex flex-col gap-2 font-label text-sm">
              <a href="tel:+420721231933" className="text-stone-600 transition-colors hover:text-ink">+420 721 231 933</a>
              <a href="mailto:zuzanamanova@email.cz" className="text-stone-600 transition-colors hover:text-ink">zuzanamanova@email.cz</a>
              <a href="https://wa.me/420721231933" target="_blank" rel="noopener noreferrer" className="text-stone-600 transition-colors hover:text-ink">WhatsApp</a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-label text-xs font-bold uppercase tracking-widest text-stone-400">{t('footer.quicklinks')}</h4>
            <div className="flex flex-col gap-2">
              {[
                { href: '/',                       label: t('nav.home') },
                { href: '/tours',                  label: t('nav.tours') },
                { href: '/zuzana-manova',          label: t('nav.zuzana') },
                { href: '/blog',                   label: t('nav.blog') },
                { href: '/contact#contact-title',  label: t('nav.contact') },
                { href: '/book#contact-title',     label: t('contact.booking.header.title') },
                { href: '/bewerten',               label: t('footer.review') },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="font-label text-sm text-stone-600 underline-offset-4 transition-colors hover:text-ink hover:underline">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-label text-xs font-bold uppercase tracking-widest text-stone-400">{t('footer.follow')}</h4>
            <div className="flex flex-col gap-4">
              <a href="https://www.tripadvisor.de/Attraction_Review-g274707-d10450040-Reviews-Zuza_Prague_Tours-Prague_Bohemia.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-stone-600 transition-colors hover:text-ink">
                <TripAdvisorIcon className="h-4 w-4 flex-shrink-0" />
                <div>
                  <p className="font-label text-sm text-stone-700">TripAdvisor</p>
                  <p className="font-label text-xs text-stone-400">{t('reviews.tripadvisor')}</p>
                </div>
              </a>
              <a href="https://www.tourhq.com/guide/CZ56896/zuzana-manova" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-stone-600 transition-colors hover:text-ink">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stone-200 font-label text-[10px] font-bold text-stone-600">T</span>
                <div>
                  <p className="font-label text-sm text-stone-700">TourHQ</p>
                  <p className="font-label text-xs text-stone-400">{t('footer.tourhq.sub')}</p>
                </div>
              </a>
              <a href="https://www.instagram.com/erlebnis_tour_prag/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-stone-600 transition-colors hover:text-ink">
                <InstagramIcon className="h-4 w-4 flex-shrink-0" />
                <div>
                  <p className="font-label text-sm text-stone-700">Instagram</p>
                  <p className="font-label text-xs text-stone-400">@erlebnis_tour_prag</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-200">
          <div className="mx-auto flex max-w-editorial flex-col items-center justify-between gap-3 px-5 py-5 md:flex-row md:px-10">
            <p className="font-label text-xs text-stone-400">© {currentYear} Zuza Prague Tours – Zuzana Manová. {t('footer.rights')}</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="font-label text-xs text-stone-400 underline-offset-4 hover:text-ink hover:underline">{t('footer.privacy')}</Link>
              <span className="text-stone-300" aria-hidden>·</span>
              <Link href="/terms" className="font-label text-xs text-stone-400 underline-offset-4 hover:text-ink hover:underline">{t('footer.terms')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
