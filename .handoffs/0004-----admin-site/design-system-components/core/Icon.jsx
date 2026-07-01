import React from 'react';

/**
 * Icon — thin wrapper over the Material Symbols Outlined webfont.
 * Pass the glyph `name` (e.g. "schedule"). `fill` toggles the solid
 * variant (used for the gold star); `size` is in px.
 */
export function Icon({ name, size = 20, fill = false, weight, color, className = '', style = {}, ...rest }) {
  const fvs = [
    `'FILL' ${fill ? 1 : 0}`,
    weight ? `'wght' ${weight}` : null,
    `'opsz' 24`,
  ].filter(Boolean).join(', ');

  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontSize: size, color, fontVariationSettings: fvs, ...style }}
      aria-hidden="true"
      {...rest}
    >
      {name}
    </span>
  );
}

export default Icon;
