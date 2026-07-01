import React from 'react';

/**
 * Eyebrow — the tracked, uppercase kicker that sits above headings.
 * Tone controls color: 'brass' (default, on paper), 'burgundy',
 * 'gold' (marketing), 'onDark' (stone-on-ink), 'mute'.
 */
export function Eyebrow({ children, tone = 'brass', icon, as = 'span', className = '', style = {}, ...rest }) {
  const colors = {
    brass: 'var(--brass-deep)',
    burgundy: 'var(--burgundy)',
    gold: 'var(--gold-olive)',
    onDark: 'var(--gold-lamp)',
    mute: 'var(--ink-mute)',
  };
  const Tag = as;
  return (
    <Tag
      className={`zpt-eyebrow ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-eyebrow)',
        fontWeight: 500,
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: colors[tone],
        ...style,
      }}
      {...rest}
    >
      {icon && <span className="material-symbols-outlined" style={{ fontSize: 13, fontVariationSettings: "'FILL' 1" }}>{icon}</span>}
      {children}
    </Tag>
  );
}

export default Eyebrow;
