'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { isPragkennerSite } from '../config/siteBrand';
import { BRAND } from '../brand';

/** Primary nav — premium 0003 design. /blog is labelled "Journal". */
const NAV: { href: string; key?: string; label?: string }[] = [
  { href: '/tours', key: 'nav.tours' },
  { href: '/zuzana-manova', key: 'nav.zuzana' },
  { href: '/blog', label: 'Journal' },
  { href: '/contact', key: 'nav.contact' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { t, language } = useLanguage();
  const de = language === 'de';
  const pathname = usePathname();
  const close = () => setIsMenuOpen(false);

  // Mobile menu (design_handoff_blog_winter_mobile §3A): a full-screen panel
  // under the header. While open the page can't scroll; Escape or reaching the
  // desktop breakpoint closes it.
  const headerRef = React.useRef<HTMLElement>(null);
  const [panelTop, setPanelTop] = React.useState(0);
  React.useEffect(() => {
    if (!isMenuOpen) return;
    setPanelTop(headerRef.current?.getBoundingClientRect().bottom ?? 0);
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onDesktop = () => {
      if (desktop.matches) setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onDesktop);
    return () => {
      root.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onDesktop);
    };
  }, [isMenuOpen]);

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

  // Journal articles (design_handoff_blog_orte): the header slides away while the
  // guest reads downwards and comes back on any upward scroll.
  const isArticle = (pathname ?? '').startsWith('/blog/');
  const [hidden, setHidden] = React.useState(false);
  React.useEffect(() => {
    setHidden(false);
    if (!isArticle) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 6) return; // ignore jitter / momentum bounce
      setHidden(y > lastY && y > 80);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isArticle]);
  const hide = hidden && !isMenuOpen;

  const isActive = (href: string) => pathname === href || (href !== '/' && (pathname ?? '').startsWith(href));
  const navLabel = (n: (typeof NAV)[number]) => (n.label ? n.label : t(n.key as any));

  const linkClass = (active: boolean) =>
    `font-sans text-[12px] uppercase tracking-[0.14em] transition-colors duration-200 ${
      light ? (active ? 'text-ivory' : 'text-ivory/80 hover:text-ivory') : active ? 'text-ink' : 'text-ink-mute hover:text-ink'
    }`;

  const brand = (
    <Link href="/" className="flex min-w-0 items-center gap-3 lg:shrink-0" onClick={close}>
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
        <span
          className={`min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-display text-[clamp(19px,5.4vw,24px)] tracking-[0.02em] transition-colors duration-300 lg:text-[1.35rem] ${
            light ? 'text-ivory' : 'text-ink'
          }`}
        >
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

  // Mobile: "Tour buchen" stays one tap away next to a 44px menu button.
  const mobileActions = (
    <div className="flex shrink-0 items-center gap-1 lg:hidden">
      <Link
        href="/book#contact-title"
        onClick={close}
        className="flex min-h-[40px] items-center whitespace-nowrap rounded-[4px] bg-journal-burgundy px-[clamp(10px,3.6vw,14px)] font-hanken text-[clamp(13px,3.8vw,14px)] font-semibold text-white no-underline transition-colors hover:bg-journal-burgundy-hover hover:text-white"
      >
        {t('contact.booking.header.title')}
      </Link>
      <button
        type="button"
        className={`-mr-[10px] grid h-11 w-11 place-items-center border-0 bg-transparent p-0 ${light ? 'text-ivory' : 'text-ink'}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        aria-label={isMenuOpen ? (de ? 'Menü schließen' : 'Close menu') : de ? 'Menü öffnen' : 'Open menu'}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d={isMenuOpen ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} />
        </svg>
      </button>
    </div>
  );

  // Rendered outside <header>: its backdrop-filter / transform would otherwise
  // trap this fixed panel inside the header box.
  const mobileMenu = (
    <nav
      id="mobile-menu"
      aria-label={de ? 'Menü' : 'Menu'}
      aria-hidden={!isMenuOpen}
      style={{ top: panelTop }}
      className={`fixed inset-x-0 bottom-0 z-[49] overflow-y-auto overscroll-contain bg-white px-5 pb-8 pt-2 transition-[opacity,transform,visibility] duration-200 ease-out lg:hidden ${
        isMenuOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1.5 opacity-0'
      }`}
    >
      <div className="flex flex-col">
        {NAV.map((n) => {
          const active = isActive(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              onClick={close}
              aria-current={active ? 'page' : undefined}
              className={`flex min-h-[60px] items-center justify-between border-b border-journal-rule font-news text-[26px] font-medium no-underline ${
                active ? 'text-journal-burgundy hover:text-journal-burgundy' : 'text-journal-ink hover:text-journal-ink'
              }`}
            >
              {navLabel(n)}
              {active && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-journal-burgundy" />}
            </Link>
          );
        })}
      </div>
      <Link
        href="/book#contact-title"
        onClick={close}
        className="mt-7 flex min-h-[52px] items-center justify-center rounded-[4px] bg-journal-burgundy font-hanken text-[16px] font-semibold text-white no-underline hover:bg-journal-burgundy-hover hover:text-white"
      >
        {t('contact.booking.header.title')}
      </Link>
      <div className="mt-[10px] grid grid-cols-2 gap-[10px]">
        <a
          href={`tel:${BRAND.phoneRaw}`}
          className="flex min-h-[48px] items-center justify-center rounded-[4px] border border-[#D9D3C9] font-hanken text-[15px] font-semibold text-journal-ink no-underline"
        >
          {de ? 'Anrufen' : 'Call'}
        </a>
        <a
          href={`https://wa.me/${BRAND.phoneRaw.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[48px] items-center justify-center rounded-[4px] border border-[#D9D3C9] font-hanken text-[15px] font-semibold text-journal-ink no-underline"
        >
          WhatsApp
        </a>
      </div>
    </nav>
  );

  return (
    <>
      <header
        ref={headerRef}
        onFocusCapture={() => setHidden(false)}
        className={`fixed top-0 z-50 w-full transition-[background-color,border-color,padding,transform] duration-300 ${
          light
            ? 'border-b border-transparent bg-transparent'
            : 'border-b border-rule/70 bg-[rgba(250,246,236,0.82)] backdrop-blur-[16px] backdrop-saturate-150'
        } ${hide ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div
          className={`flex flex-nowrap items-center justify-between gap-x-[clamp(8px,3vw,24px)] px-[clamp(1.5rem,5vw,5rem)] py-[0.6rem] transition-[padding] duration-300 ${
            light ? 'lg:py-[1.5rem]' : 'lg:py-[1.05rem]'
          }`}
        >
          {brand}
          {desktopNav}
          {mobileActions}
        </div>
      </header>
      {mobileMenu}
    </>
  );
};

export default Header;
