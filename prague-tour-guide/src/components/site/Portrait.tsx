import React from 'react';

/** Small round avatar of Zuzana (192 px square crop around the face, ~11 KB). */
export const AVATAR_SRC = '/images/hero/zuzana-avatar-192.jpg';

const WIDTHS = [360, 640, 900];
const srcSet = (ext: string) => WIDTHS.map((w) => `/images/hero/zuzana-portrait-${w}.${ext} ${w}w`).join(', ');

/**
 * Zuzana's portrait as responsive AVIF/WebP (360/640/900 w) instead of the
 * 287 KB original, which stays as the fallback. `sizes` must describe the
 * rendered width so phones pick the small file.
 */
export function Portrait({
  alt,
  sizes,
  className,
  style,
  loading = 'lazy',
  fetchPriority,
}: {
  alt: string;
  sizes: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
}) {
  return (
    <picture>
      <source type="image/avif" sizes={sizes} srcSet={srcSet('avif')} />
      <source type="image/webp" sizes={sizes} srcSet={srcSet('webp')} />
      <img src="/images/zuzana-portrait.jpg" alt={alt} className={className} style={style} loading={loading} fetchPriority={fetchPriority} />
    </picture>
  );
}
