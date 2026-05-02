import React from 'react';

/**
 * Centred decorative divider — two 80px brass lines at 50% opacity
 * flanking a ❦ glyph in italic display. Aria-hidden.
 */
const Ornament: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="my-[4em] flex items-center justify-center gap-4 text-brass"
    >
      <span className="block h-px w-20 bg-brass opacity-50" />
      <span className="font-display text-[24px] italic leading-none">❦</span>
      <span className="block h-px w-20 bg-brass opacity-50" />
    </div>
  );
};

export default Ornament;
