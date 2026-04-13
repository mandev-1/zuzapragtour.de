import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the window on client-side navigation. Without this, React Router
 * keeps the previous scroll position (e.g. long blog post → book page stays scrolled down).
 * URLs with #hash scroll to that element after the target route has painted.
 */
const ScrollToTop: React.FC = () => {
  const { pathname, search, hash } = useLocation();

  React.useLayoutEffect(() => {
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
      if (tryScroll() || attempts > 40) {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
