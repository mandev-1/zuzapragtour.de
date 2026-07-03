import React from 'react';

/**
 * ReviewCard — testimonial card: italic serif quote, then an avatar
 * (initial in a stone disc) with the author name and tracked source.
 */
export function ReviewCard({ quote, author, source, className = '', style = {} }) {
  const initial = (author || '?').trim().charAt(0);
  return (
    <div
      className={`zpt-review-card ${className}`}
      style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        background: 'var(--canvas)', padding: '1.5rem', borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-md)', ...style,
      }}
    >
      <p style={{ margin: '0 0 1.5rem', fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: 14, lineHeight: 1.6, color: 'var(--ink-warm)' }}>
        &ldquo;{quote}&rdquo;
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: 40, height: 40, borderRadius: 999, background: '#E4E2DE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14, color: 'var(--ink-warm)' }}>{initial}</span>
        </div>
        <div>
          <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 12, color: 'var(--ink-2)' }}>{author}</p>
          {source && <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-olive)' }}>{source}</p>}
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
