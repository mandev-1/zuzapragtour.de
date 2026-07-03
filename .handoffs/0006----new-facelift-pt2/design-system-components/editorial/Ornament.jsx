import React from 'react';

/**
 * Ornament — centered section divider: two brass hairlines flanking a
 * small italic glyph (default the Cormorant ❦ fleuron).
 */
export function Ornament({ glyph = '❦', className = '', style = {} }) {
  const line = { display: 'block', width: 80, height: 1, background: 'var(--brass)', opacity: 0.5 };
  return (
    <div className={`zpt-ornament ${className}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, margin: '3.5rem 0', ...style }}>
      <span aria-hidden="true" style={line} />
      <span aria-hidden="true" style={{ fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontSize: 24, color: 'var(--brass)' }}>{glyph}</span>
      <span aria-hidden="true" style={line} />
    </div>
  );
}

export default Ornament;
