import React from 'react';

/**
 * Badge — small pill label. The brand's signature use is the tinted
 * "Zertifizierte Expertin" capsule with a gold star. Variants:
 *  · gold (default) — gold-on-tint capsule
 *  · burgundy — accent-tinted
 *  · solid — solid ink pill
 *  · outline — hairline outline pill
 */
export function Badge({ children, variant = 'gold', icon, className = '', style = {}, ...rest }) {
  const variants = {
    gold:     { background: 'rgba(123,88,0,0.10)', color: 'var(--gold-olive)' },
    burgundy: { background: 'var(--accent-soft)', color: 'var(--burgundy)' },
    solid:    { background: 'var(--ink)', color: 'var(--paper)' },
    outline:  { background: 'transparent', color: 'var(--ink-soft)', boxShadow: 'inset 0 0 0 1px var(--rule)' },
  };
  return (
    <span
      className={`zpt-badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.3rem 0.75rem',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-xs)',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {icon && <span className="material-symbols-outlined" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>{icon}</span>}
      {children}
    </span>
  );
}

export default Badge;
