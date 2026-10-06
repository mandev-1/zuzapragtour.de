'use client';

/**
 * Counts homepage A/B test events (src/config/abTest.ts) — anonymously, only
 * for visitors who were assigned a variant on `/`:
 * - `visitor` once per browser, `view` on every homepage load;
 * - clicks on WhatsApp / phone / e-mail links, the enquiry form and tour pages,
 *   anywhere on the site (so a homepage → tour page → WhatsApp path counts).
 * Form submissions are counted as `enquiry` in Contact.tsx.
 */

import React from 'react';
import { usePathname } from 'next/navigation';
import { getAbVariant, syncAbAttribute, trackAb, type AbEvent } from '../config/abTest';

const SEEN_KEY = 'zpt_ab_seen';

function eventForLink(href: string): AbEvent | null {
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return 'whatsapp';
  if (href.startsWith('tel:')) return 'call';
  if (href.startsWith('mailto:')) return 'email';
  if (/\/(book|contact)(#|\?|$)/.test(href)) return 'form';
  if (/\/tours\/[^/?#]+/.test(href)) return 'tour';
  return null;
}

export default function AbTracker() {
  const pathname = usePathname();

  React.useEffect(() => {
    syncAbAttribute();
    const v = getAbVariant();
    if (!v || pathname !== '/') return;
    try {
      if (localStorage.getItem(SEEN_KEY) !== v) {
        localStorage.setItem(SEEN_KEY, v);
        trackAb('visitor');
      }
    } catch {
      /* storage blocked: skip the unique count */
    }
    trackAb('view');
  }, [pathname]);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      const event = eventForLink(a.href);
      if (event) trackAb(event);
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
