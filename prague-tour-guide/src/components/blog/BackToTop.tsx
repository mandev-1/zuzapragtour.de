'use client';

import React from 'react';

/**
 * Round back-to-top button (48px, paper, hairline, soft shadow) pinned
 * bottom-right. Fades in after ~0.9 of a viewport of scroll; smooth-scrolls
 * to the top on click (respects prefers-reduced-motion). Sits below the
 * sticky header (z-40) so it never overlaps the top bar.
 */
const BackToTop: React.FC = () => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const y = document.scrollingElement?.scrollTop ?? window.scrollY;
      setShow(y > window.innerHeight * 0.9);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const smooth = !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Zurück nach oben"
      className={`fixed bottom-[18px] right-[18px] z-40 grid h-12 w-12 place-items-center rounded-full border border-rule bg-paper text-ink shadow-[0_8px_24px_rgba(26,23,20,0.08)] transition-opacity duration-300 ease-brand hover:border-ink focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-burgundy ${
        show ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <span className="material-symbols-outlined text-[22px]" aria-hidden>
        arrow_upward
      </span>
    </button>
  );
};

export default BackToTop;
