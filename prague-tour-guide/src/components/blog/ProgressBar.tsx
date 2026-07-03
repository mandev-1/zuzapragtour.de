'use client';

import React from 'react';

/**
 * Fixed 3px reading-progress bar pinned to the very top of the viewport
 * (above the header). Burgundy fill, transparent rail. Tracks document
 * scroll percentage via a passive scroll listener.
 */
const ProgressBar: React.FC = () => {
  const [pct, setPct] = React.useState(0);

  React.useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const next = max > 0 ? (h.scrollTop / max) * 100 : 0;
      setPct(next);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[110] h-[3px] bg-transparent"
    >
      <div
        className="h-full bg-burgundy transition-[width] duration-100 ease-linear"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};

export default ProgressBar;
