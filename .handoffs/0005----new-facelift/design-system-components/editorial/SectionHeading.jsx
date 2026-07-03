import React from 'react';

/**
 * SectionHeading — eyebrow + serif headline pairing used to open
 * nearly every section. The headline renders in Italiana display;
 * wrap a word in <em> (or pass `emphasis`) for the Cormorant italic
 * burgundy accent. Optional `lead` sets supporting copy.
 */
export function SectionHeading({
  eyebrow,
  eyebrowTone = 'brass',
  eyebrowIcon,
  title,
  emphasis,
  lead,
  align = 'left',
  onDark = false,
  className = '',
  style = {},
}) {
  return (
    <div
      className={`zpt-section-heading ${className}`}
      style={{ textAlign: align, maxWidth: align === 'center' ? '44rem' : undefined, marginInline: align === 'center' ? 'auto' : undefined, ...style }}
    >
      {eyebrow && (
        <div style={{ marginBottom: '0.5rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            fontFamily: 'var(--font-sans)', fontSize: 'var(--text-eyebrow)', fontWeight: 500,
            letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase',
            color: onDark ? 'var(--gold-lamp)' : eyebrowTone === 'burgundy' ? 'var(--burgundy)' : eyebrowTone === 'gold' ? 'var(--gold-olive)' : 'var(--brass-deep)',
          }}>
            {eyebrowIcon && <span className="material-symbols-outlined" style={{ fontSize: 13, fontVariationSettings: "'FILL' 1" }}>{eyebrowIcon}</span>}
            {eyebrow}
          </span>
        </div>
      )}
      <h2 style={{
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-display-md)',
        fontWeight: 400,
        lineHeight: 'var(--leading-tight)',
        letterSpacing: '0.005em',
        color: onDark ? 'var(--paper)' : 'var(--ink)',
      }}>
        {title}
        {emphasis && (
          <> <em style={{ fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontWeight: 400, color: onDark ? 'var(--gold-lamp)' : 'var(--burgundy)' }}>{emphasis}</em></>
        )}
      </h2>
      {lead && (
        <p style={{
          margin: '1rem 0 0',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          lineHeight: 'var(--leading-relaxed)',
          color: onDark ? 'var(--stone-300)' : 'var(--ink-mute)',
          maxWidth: '40rem',
          marginInline: align === 'center' ? 'auto' : undefined,
        }}>
          {lead}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
