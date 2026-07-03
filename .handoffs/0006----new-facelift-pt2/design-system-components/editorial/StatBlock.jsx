import React from 'react';

/**
 * StatBlock — a single headline metric: large Italiana numeral in
 * burgundy above a tracked uppercase label. Used in the about strip
 * (40+ years, 4.9k tours, 5.0 rating).
 */
export function StatBlock({ value, label, onDark = false, className = '', style = {} }) {
  return (
    <div className={`zpt-statblock ${className}`} style={style}>
      <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, lineHeight: 1, color: onDark ? 'var(--gold-lamp)' : 'var(--burgundy)' }}>
        {value}
      </p>
      <p style={{ margin: '0.4rem 0 0', fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: onDark ? 'var(--stone-300)' : 'var(--ink-warm)' }}>
        {label}
      </p>
    </div>
  );
}

export default StatBlock;
