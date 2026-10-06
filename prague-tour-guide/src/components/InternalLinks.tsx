'use client';

/**
 * Plain <a href="/…"> links — mostly inside article HTML from the journal and
 * blogTranslations — would reload the whole page. Route them like next/link
 * instead: faster for the guest, and the visit stays one visit for our
 * analytics (src/utils/analytics.ts keeps it in memory only).
 *
 * next/link handles its own clicks first (and calls preventDefault), so only
 * plain anchors reach this listener on window.
 */

import React from 'react';
import { useRouter } from 'next/navigation';

export default function InternalLinks() {
  const router = useRouter();

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;

      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (/\.[a-z0-9]+$/i.test(url.pathname) || url.pathname.startsWith('/api/')) return; // files, feeds, functions
      if (url.pathname === window.location.pathname && url.search === window.location.search) return; // same page / #anchor

      e.preventDefault();
      router.push(url.pathname + url.search + url.hash);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [router]);

  return null;
}
