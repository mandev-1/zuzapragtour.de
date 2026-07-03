import React from 'react';

/**
 * PullQuote — large italic quote with a 2px burgundy left rule and an
 * oversized decorative „ glyph at brass / 30% opacity.
 */
export function PullQuote({ children, attribution, className = '', style = {} }) {
  return (
    <blockquote
      className={`zpt-pullquote ${className}`}
      style={{ position: 'relative', margin: '3em 0', padding: '0.25rem 0 0.25rem 2.5rem', borderLeft: '2px solid var(--burgundy)', ...style }}
    >
      <span aria-hidden="true" style={{ position: 'absolute', top: '-0.15em', left: '0.05em', fontFamily: 'var(--font-display)', fontSize: 100, lineHeight: 1, color: 'var(--brass)', opacity: 0.3, pointerEvents: 'none' }}>„</span>
      <p style={{ margin: '0 0 1rem', fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontSize: 30, fontWeight: 400, lineHeight: 1.3, letterSpacing: '-0.005em', color: 'var(--ink)' }}>
        {children}
      </p>
      {attribution && (
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--ink-mute)' }}>
          — {attribution}
        </div>
      )}
    </blockquote>
  );
}

export default PullQuote;
