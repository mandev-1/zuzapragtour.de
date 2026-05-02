'use client';

import React from 'react';
import Link from 'next/link';

interface MastheadProps {
  /** Edition meta string, e.g. "Prag · Mai 2026" */
  edition?: string;
  /** Editorial number, e.g. "Editorial №\u00a047" */
  issue?: string;
}

/**
 * Sticky editorial masthead. Three columns on desktop:
 *   meta (left) · brand mark (centered) · nav (right).
 *
 * Drops to single-row brand-only on mobile (≤720px).
 */
const Masthead: React.FC<MastheadProps> = ({
  edition = 'Prag · Mai 2026',
  issue = 'Editorial №\u00a047',
}) => {
  return (
    <header className="article-masthead sticky top-0 z-50 border-b border-rule bg-ivory/90 backdrop-blur-md">
      <div className="mx-auto grid max-w-shell grid-cols-1 items-center gap-8 px-6 py-[18px] md:grid-cols-[1fr_auto_1fr] md:px-12">
        <div className="hidden items-center gap-6 font-sans text-[11px] uppercase tracking-[0.18em] text-ink-mute md:flex">
          <span>{edition}</span>
          <span aria-hidden="true" className="inline-block h-1 w-1 rounded-full bg-burgundy" />
          <span>{issue}</span>
        </div>
        <Link
          href="/blog"
          className="text-center font-italic text-[24px] italic tracking-[0.01em] text-ink no-underline"
        >
          Zuza <span className="text-burgundy">&amp;</span> Pragtour
        </Link>
        <nav className="hidden justify-end gap-7 font-sans text-[12px] uppercase tracking-[0.1em] text-ink-soft md:flex">
          <Link href="/tours" className="transition-colors hover:text-burgundy">
            Touren
          </Link>
          <Link href="/blog" className="transition-colors hover:text-burgundy">
            Journal
          </Link>
          <Link href="/zuzana-manova" className="transition-colors hover:text-burgundy">
            Über
          </Link>
          <Link href="/book" className="transition-colors hover:text-burgundy">
            Reservieren
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Masthead;
