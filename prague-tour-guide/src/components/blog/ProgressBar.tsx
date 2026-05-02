'use client';

import React from 'react';

/**
 * Fixed 2px reading-progress bar at the top of the viewport.
 * Burgundy fill, transparent rail. Tracks document scroll percentage.
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
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5 bg-transparent"
    >
      <div
        className="h-full bg-burgundy transition-[width] duration-100 ease-linear"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};

export default ProgressBar;
