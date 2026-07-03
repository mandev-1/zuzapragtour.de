import React from 'react';

/**
 * Button — the brand's primary action control.
 *
 * Variants map to the two registers seen on the live site:
 *  · primary  → burgundy signature gradient + soft glow (marketing CTAs)
 *  · accent   → solid accent burgundy
 *  · ink      → solid near-black (editorial forms & quiet CTAs)
 *  · outline  → hairline ink border, fills ink on hover
 *  · onDark   → paper fill for dark sections
 *  · link     → underlined accent text link
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconLeading = false,
  href,
  type = 'button',
  disabled = false,
  fullWidth = false,
  className = '',
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.8125rem' },
    md: { padding: '0.75rem 1.5rem', fontSize: '0.9375rem' },
    lg: { padding: '0.875rem 2rem', fontSize: '1.0625rem' },
  };

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: fullWidth ? '100%' : 'auto',
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    lineHeight: 1.1,
    letterSpacing: '0.005em',
    textDecoration: 'none',
    border: '1px solid transparent',
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.55 : 1,
    transition: 'background-color var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out), opacity var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
    whiteSpace: 'nowrap',
    ...sizes[size],
  };

  const variants = {
    primary: { background: 'var(--grad-burgundy)', color: '#fff', boxShadow: 'var(--shadow-cta)' },
    accent:  { background: 'var(--accent)', color: 'var(--paper)' },
    ink:     { background: 'var(--ink)', color: 'var(--paper)' },
    outline: { background: 'transparent', color: 'var(--ink)', borderColor: 'var(--ink)' },
    onDark:  { background: 'var(--paper)', color: 'var(--ink)' },
    link:    { background: 'transparent', color: 'var(--accent)', padding: 0, borderRadius: 0, textUnderlineOffset: '4px', textDecoration: 'underline', textDecorationColor: 'var(--brass)' },
  };

  const styles = { ...base, ...variants[variant], ...style };

  const glyph = icon ? (
    <span className="material-symbols-outlined" style={{ fontSize: size === 'lg' ? 20 : 18 }}>{icon}</span>
  ) : null;

  const content = (
    <>
      {iconLeading && glyph}
      {children}
      {!iconLeading && glyph}
    </>
  );

  const Tag = href ? 'a' : 'button';
  const tagProps = href ? { href } : { type, disabled };

  return (
    <Tag className={`zpt-button ${className}`} style={styles} {...tagProps} {...rest}>
      {content}
    </Tag>
  );
}

export default Button;
