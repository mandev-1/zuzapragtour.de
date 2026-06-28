'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';

const PROMO_SLUG = 'vaclav-havel-tour-prague';
const STORAGE_CLICKED = 'zpt.promo.havel.clicked';
const STORAGE_LAST_SHOWN = 'zpt.promo.havel.lastShown';
const ONE_HOUR_MS = 60 * 60 * 1000;
const SHOW_DELAY_MS = 4000;

function hasClickedArticle(): boolean {
  try { return localStorage.getItem(STORAGE_CLICKED) === '1'; } catch { return false; }
}

function wasShownWithinLastHour(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_LAST_SHOWN);
    if (!raw) return false;
    const last = parseInt(raw, 10);
    if (Number.isNaN(last)) return false;
    return Date.now() - last < ONE_HOUR_MS;
  } catch { return false; }
}

function markShown(): void {
  try { localStorage.setItem(STORAGE_LAST_SHOWN, String(Date.now())); } catch { /* ignore */ }
}

function markClicked(): void {
  try { localStorage.setItem(STORAGE_CLICKED, '1'); } catch { /* ignore */ }
}

const BlogPromo: React.FC = () => {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [visible, setVisible] = React.useState(false);
  const [exiting, setExiting] = React.useState(false);

  const isHidden = pathname === '/' || pathname === `/blog/${PROMO_SLUG}`;

  React.useEffect(() => {
    if (isHidden) return;
    if (hasClickedArticle()) return;
    if (wasShownWithinLastHour()) return;
    const timer = window.setTimeout(() => {
      setVisible(true);
      markShown();
    }, SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [isHidden]);

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExiting(true);
    setTimeout(() => setVisible(false), 300);
  };

  if (isHidden || !visible) return null;

  const title    = language === 'de' ? 'Václav Havel in Prag'          : 'Václav Havel in Prague';
  const subtitle = language === 'de' ? 'Ein Spaziergang der Freiheit →' : 'A Walking Tour of Freedom →';
  const eyebrow  = language === 'de' ? 'Leseempfehlung'                 : 'Featured';

  return (
    <div className={`fixed bottom-5 right-5 z-40 w-72 overflow-hidden bg-paper shadow-md ring-1 ring-stone-200 transition-all duration-300 sm:w-80 ${exiting ? 'translate-y-4 scale-95 opacity-0' : 'animate-[slideUp_0.4s_ease-out]'}`}>
      <Link href={`/blog/${PROMO_SLUG}`} className="group block" onClick={() => markClicked()}>
        <div className="relative h-28 overflow-hidden">
          <img src="/images/blog-havel.jpg" alt={title} className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        <div className="px-4 pb-4 pt-3">
          <p className="mb-1 font-eyebrow text-eyebrow uppercase text-stone-400">{eyebrow}</p>
          <p className="font-headline text-sm leading-snug text-ink">{title}</p>
          <p className="mt-0.5 font-label text-xs text-stone-500">{subtitle}</p>
        </div>
      </Link>
      <button onClick={dismiss} className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/30 text-white/90 backdrop-blur-sm transition-colors hover:bg-black/50" aria-label="Close">
        <span className="text-sm leading-none">&times;</span>
      </button>
    </div>
  );
};

export default BlogPromo;
