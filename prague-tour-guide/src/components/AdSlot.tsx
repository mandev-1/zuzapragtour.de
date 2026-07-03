'use client';

import React from 'react';
import { ADSENSE_CLIENT } from '../config/adsense';

type AdSlotProps = {
  /** Numeric ad-unit slot ID from the AdSense dashboard. */
  slot: string;
  /** AdSense format; 'auto' = responsive display unit. */
  format?: string;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * A single Google AdSense display unit. Renders the <ins> element and asks
 * AdSense to fill it exactly once — guarded against React StrictMode
 * double-invoke and re-mounts via the element's own data-adsbygoogle-status.
 * The loader script is injected once, site-wide, in app/layout.tsx.
 */
const AdSlot: React.FC<AdSlotProps> = ({ slot, format = 'auto', responsive = true, className = '', style }) => {
  const insRef = React.useRef<HTMLModElement | null>(null);

  React.useEffect(() => {
    const el = insRef.current;
    if (!el || el.getAttribute('data-adsbygoogle-status')) return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      /* Loader not ready yet — the queued push resolves when adsbygoogle.js loads. */
    }
  }, [slot]);

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle ${className}`}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  );
};

export default AdSlot;
