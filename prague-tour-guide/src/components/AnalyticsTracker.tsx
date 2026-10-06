'use client';

/**
 * Sends page views and every link/button click to our own anonymous analytics
 * (src/utils/analytics.ts). Form submissions are tracked in Contact.tsx.
 */

import React from 'react';
import { usePathname } from 'next/navigation';
import { describeClick, track } from '../utils/analytics';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const first = React.useRef(true);

  React.useEffect(() => {
    // The first page view of a visit carries where the visitor came from (host only).
    let ref = '';
    if (first.current) {
      first.current = false;
      try {
        const host = document.referrer ? new URL(document.referrer).host.replace(/^www\./, '') : '';
        ref = host && host !== window.location.host ? host : '';
      } catch {
        /* unparsable referrer */
      }
    }
    track('page', { ref });
  }, [pathname]);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const click = describeClick(e.target);
      if (click) track('click', click);
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
