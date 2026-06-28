import React from 'react';

interface PullQuoteProps {
  children: React.ReactNode;
  attribution?: string;
}

/**
 * Pull quote with a 2px burgundy left rule and decorative „ glyph
 * positioned in the upper-left at brass / 30% opacity.
 */
const PullQuote: React.FC<PullQuoteProps> = ({ children, attribution }) => {
  return (
    <blockquote className="relative my-[3em] -mx-0 border-l-2 border-burgundy py-1 pl-10 lg:-mx-10">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-[0.15em] left-[0.05em] font-display text-[100px] leading-none text-brass opacity-30"
      >
        „
      </span>
      <p className="m-0 mb-4 font-italic text-[30px] font-normal italic leading-[1.3] tracking-[-0.005em] text-ink">
        {children}
      </p>
      {attribution && (
        <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-ink-mute">
          — {attribution}
        </div>
      )}
    </blockquote>
  );
};

export default PullQuote;
