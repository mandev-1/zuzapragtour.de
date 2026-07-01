'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { isPragkennerSite } from '../config/siteBrand';

/** Primary nav — premium 0003 design. /blog is labelled "Journal". */
const NAV: { href: string; key?: string; label?: string }[] = [
  { href: '/tours', key: 'nav.tours' },
  { href: '/zuzana-manova', key: 'nav.zuzana' },
  { href: '/blog', label: 'Journal' },
  { href: '/contact', key: 'nav.contact' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();
  const close = () => setIsMenuOpen(false);

  // Transparent over the cinematic home hero; turns glassy-solid once the guest
  // scrolls past it. Every other page (and the open mobile menu) ships solid.
  const isHome = pathname === '/';
  const [solid, setSolid] = React.useState(!isHome);
  React.useEffect(() => {
    if (!isHome) {
      setSolid(true);
      return;
    }
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);
  const light = isHome && !solid && !isMenuOpen;

  const isActive = (href: string) => pathname === href || (href !== '/' && (pathname ?? '').startsWith(href));
  const navLabel = (n: (typeof NAV)[number]) => (n.label ? n.label : t(n.key as any));

  const linkClass = (active: boolean) =>
    `font-sans text-[12px] uppercase tracking-[0.14em] transition-colors duration-200 ${
      light ? (active ? 'text-ivory' : 'text-ivory/80 hover:text-ivory') : active ? 'text-ink' : 'text-ink-mute hover:text-ink'
    }`;

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
        <span className={`font-display text-[1.35rem] tracking-[0.02em] transition-colors duration-300 ${light ? 'text-ivory' : 'text-ink'}`}>
          Zuza <b className="font-normal">&amp;</b> Pragtour
        </span>
      )}
    </Link>
  );

  const desktopNav = (
    <nav className="hidden items-center gap-[2.4rem] lg:flex">
      {NAV.map((n) => (
        <Link key={n.href} href={n.href} className={linkClass(isActive(n.href))}>
          {navLabel(n)}
        </Link>
      ))}
      <Link
        href="/book#contact-title"
        className={`border px-[1.3rem] py-[0.7rem] font-sans text-[12px] uppercase tracking-[0.14em] transition-colors duration-300 ${
          light ? 'border-ivory/55 text-ivory hover:bg-ivory hover:text-ink' : 'border-ink text-ink hover:bg-ink hover:text-paper'
        }`}
      >
        {t('contact.booking.header.title')}
      </Link>
    </nav>
  );

  const hamburger = (
    <button
      type="button"
      className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-expanded={isMenuOpen}
      aria-label="Menu"
    >
      <span className={`h-px w-6 transition-transform ${light ? 'bg-ivory' : 'bg-ink'} ${isMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
      <span className={`h-px w-6 transition-opacity ${light ? 'bg-ivory' : 'bg-ink'} ${isMenuOpen ? 'opacity-0' : ''}`} />
      <span className={`h-px w-6 transition-transform ${light ? 'bg-ivory' : 'bg-ink'} ${isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
    </button>
  );

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-[background-color,border-color,padding] duration-300 ${
        light
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-rule/70 bg-[rgba(250,246,236,0.82)] backdrop-blur-[16px] backdrop-saturate-150'
      }`}
    >
      <div
        className={`flex items-center justify-between px-[clamp(1.5rem,5vw,5rem)] transition-[padding] duration-300 ${
          light ? 'py-[1.5rem]' : 'py-[1.05rem]'
        }`}
      >
        {brand}
        {desktopNav}
        {hamburger}
      </div>

      {isMenuOpen && (
        <div className="border-t border-rule bg-[rgba(250,246,236,0.97)] backdrop-blur-[16px] lg:hidden">
          <div className="flex flex-col">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="border-b border-rule-soft px-[clamp(1.5rem,5vw,5rem)] py-[1.1rem] font-sans text-[13px] uppercase tracking-[0.14em] text-ink"
                onClick={close}
              >
                {navLabel(n)}
              </Link>
            ))}
            <Link
              href="/book#contact-title"
              className="px-[clamp(1.5rem,5vw,5rem)] py-[1.1rem] font-sans text-[13px] uppercase tracking-[0.14em] text-burgundy"
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
