'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const ScrollToTopInner: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hash = typeof window !== 'undefined' ? window.location.hash : '';

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const id = hash.replace(/^#/, '');
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
        return true;
      }
      return false;
    };

    if (tryScroll()) return;

    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (tryScroll() || attempts > 40) clearInterval(timer);
    }, 50);

    return () => clearInterval(timer);
  }, [pathname, searchParams, hash]);

  return null;
};

const ScrollToTop: React.FC = () => (
  <Suspense fallback={null}>
    <ScrollToTopInner />
  </Suspense>
);

export default ScrollToTop;
