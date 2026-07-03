import React from 'react';

/**
 * Field — labelled form control matching the editorial contact form.
 * Renders a stacked label + input (or textarea). Hairline border that
 * darkens to ink on focus. Set `as="textarea"` for the message field.
 */
export function Field({
  label,
  name,
  type = 'text',
  as = 'input',
  required = false,
  placeholder,
  rows = 4,
  hint,
  className = '',
  style = {},
  ...rest
}) {
  const controlStyle = {
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--stone-200)',
    background: 'transparent',
    padding: '0.75rem 1rem',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    color: 'var(--ink)',
    outline: 'none',
    transition: 'border-color var(--dur-fast) var(--ease-out)',
    resize: as === 'textarea' ? 'none' : undefined,
  };
  const onFocus = (e) => { e.target.style.borderColor = 'var(--ink)'; };
  const onBlur = (e) => { e.target.style.borderColor = 'var(--stone-200)'; };

  return (
    <label className={`zpt-field ${className}`} style={{ display: 'block', ...style }}>
      {label && (
        <span style={{ display: 'block', marginBottom: '0.375rem', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--stone-700)' }}>
          {label}{required && ' *'}
        </span>
      )}
      {as === 'textarea' ? (
        <textarea name={name} rows={rows} required={required} placeholder={placeholder} style={controlStyle} onFocus={onFocus} onBlur={onBlur} {...rest} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} style={controlStyle} onFocus={onFocus} onBlur={onBlur} {...rest} />
      )}
      {hint && <span style={{ display: 'block', marginTop: '0.375rem', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--stone-400)' }}>{hint}</span>}
    </label>
  );
}

export default Field;
