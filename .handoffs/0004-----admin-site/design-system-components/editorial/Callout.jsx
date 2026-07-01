import React from 'react';

/**
 * Callout — paper aside with a 3px brass left rule and a tracked
 * uppercase label preceded by a short brass dash. Body in serif.
 */
export function Callout({ label = 'Vorab in einer Zeile', children, className = '', style = {} }) {
  return (
    <aside
      className={`zpt-callout ${className}`}
      style={{
        margin: '2.5em 0',
        padding: '1.75rem 2rem',
        background: 'var(--paper)',
        border: '1px solid var(--rule-soft)',
        borderLeft: '3px solid var(--brass)',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.625rem', fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 500, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--brass-deep)' }}>
        <span aria-hidden="true" style={{ display: 'block', height: 1, width: 14, background: 'var(--brass)' }} />
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
        {children}
      </div>
    </aside>
  );
}

export default Callout;
