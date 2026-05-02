'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { isPragkennerSite } from '../config/siteBrand';

const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ href, children, className, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && (pathname ?? '').startsWith(href));
  const defaultClass = [
    'font-label text-sm tracking-wide transition-colors',
    isActive ? 'text-ink' : 'text-stone-500 hover:text-ink',
  ].join(' ');
  return (
    <Link href={href} className={className ?? defaultClass} onClick={onClick}>
      {children}
    </Link>
  );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { t } = useLanguage();
  const close = () => setIsMenuOpen(false);

  const nav = (
    <nav className="hidden items-center gap-8 lg:flex">
      <NavLink href="/tours">{t('nav.tours')}</NavLink>
      <NavLink href="/zuzana-manova">{t('nav.zuzana')}</NavLink>
      <NavLink href="/blog">{t('nav.blog')}</NavLink>
      <NavLink href="/contact">{t('nav.contact')}</NavLink>
      <a
        href="tel:+420721231933"
        className="font-label text-sm tracking-wide text-stone-500 transition-colors hover:text-ink"
      >
        +420 721 231 933
      </a>
      <Link
        href="/book#contact-title"
        className="rounded-md border border-ink px-4 py-2 font-label text-sm text-ink transition-colors hover:bg-ink hover:text-paper"
      >
        {t('contact.booking.header.title')}
      </Link>
    </nav>
  );

  const brand = (
    <Link href="/" className="flex shrink-0 items-center gap-3" onClick={close}>
      {isPragkennerSite ? (
        <img
          src="/Vector.svg"
          alt="PragKenner"
          className="h-9 w-auto max-w-[min(100%,11rem)] object-contain object-right"
          width={124}
          height={109}
          decoding="async"
        />
      ) : (
        <>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-headline text-sm font-medium text-paper">
            Z
          </span>
          <span className="font-headline text-base font-medium tracking-tight text-ink sm:text-lg">
            Zuzana Manová
          </span>
        </>
      )}
    </Link>
  );

  const hamburger = (
    <button
      type="button"
      className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-expanded={isMenuOpen}
      aria-label="Menu"
    >
      <span className={`h-px w-5 bg-ink transition-transform ${isMenuOpen ? 'translate-y-1 rotate-45' : ''}`} />
      <span className={`h-px w-5 bg-ink transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
      <span className={`h-px w-5 bg-ink transition-transform ${isMenuOpen ? '-translate-y-[5px] -rotate-45' : ''}`} />
    </button>
  );

  return (
    <header className="fixed top-0 z-50 w-full border-b border-stone-200 bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-editorial items-center justify-between px-5 py-4 lg:px-8 lg:py-5">
        {isPragkennerSite ? <>{hamburger}{nav}{brand}</> : <>{brand}{nav}{hamburger}</>}
      </div>

      {isMenuOpen && (
        <div className="border-t border-stone-200 bg-paper lg:hidden">
          <div className="mx-auto flex max-w-editorial flex-col divide-y divide-stone-100 px-5 py-2">
            <NavLink href="/tours" className="py-4 font-label text-base text-ink" onClick={close}>{t('nav.tours')}</NavLink>
            <NavLink href="/zuzana-manova" className="py-4 font-label text-base text-ink" onClick={close}>{t('nav.zuzana')}</NavLink>
            <NavLink href="/blog" className="py-4 font-label text-base text-ink" onClick={close}>{t('nav.blog')}</NavLink>
            <NavLink href="/contact" className="py-4 font-label text-base text-ink" onClick={close}>{t('nav.contact')}</NavLink>
            <a href="tel:+420721231933" className="py-4 font-label text-base text-stone-600">+420 721 231 933</a>
            <Link
              href="/book#contact-title"
              className="my-3 rounded-md bg-ink py-3 text-center font-label text-sm text-paper"
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
