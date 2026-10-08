'use client';

/**
 * Sends page views, every link/button click, copied e-mail addresses / phone
 * numbers and — when a page is left or the
 * tab is hidden — how long the page was visible and how far an article was
 * read, to our own anonymous analytics (src/utils/analytics.ts). Form
 * submissions are tracked in Contact.tsx.
 */

import React from 'react';
import { usePathname } from 'next/navigation';
import { areaOf, describeClick, track } from '../utils/analytics';

interface PageView {
  seq: number;
  path: string;
  visibleMs: number;
  since: number | null; // visible since (ms) or null while hidden
  reach: number; // furthest share of the article body seen, 0–1
}

/** Read depth buckets used by the dashboard: 25 / 50 / 75 / 100 % of the article. */
const depthOf = (reach: number) => (reach >= 0.95 ? 100 : reach >= 0.75 ? 75 : reach >= 0.5 ? 50 : 25);

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const first = React.useRef(true);
  const view = React.useRef<PageView | null>(null);

  /** Report the current page's visible time (and read depth on articles). */
  const report = React.useCallback(() => {
    const v = view.current;
    if (!v || v.seq < 0) return;
    const now = performance.now();
    const ms = v.visibleMs + (v.since != null ? now - v.since : 0);
    const article = v.path.startsWith('/blog/');
    track('leave', { label: String(v.seq), path: v.path, seconds: ms / 1000, depth: article ? depthOf(v.reach) : 0 });
  }, []);

  const measureDepth = React.useCallback(() => {
    const v = view.current;
    if (!v || !v.path.startsWith('/blog/')) return;
    const body = document.querySelector('.blog-content');
    if (!body) return;
    const r = body.getBoundingClientRect();
    if (r.height <= 0) return;
    v.reach = Math.max(v.reach, Math.min(1, (window.innerHeight - r.top) / r.height));
  }, []);

  React.useEffect(() => {
    // Close the previous page view, then start this one.
    if (view.current) report();

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
    const seq = track('page', { ref });
    view.current = { seq, path: pathname, visibleMs: 0, since: document.visibilityState === 'visible' ? performance.now() : null, reach: 0 };
    const t = window.setTimeout(measureDepth, 800); // short articles may be fully visible without scrolling
    return () => window.clearTimeout(t);
  }, [pathname, report, measureDepth]);

  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        measureDepth();
      });
    };
    const onHide = () => {
      const v = view.current;
      if (!v) return;
      if (v.since != null) {
        v.visibleMs += performance.now() - v.since;
        v.since = null;
        report(); // a later leave of the same view overwrites this one with a longer time
      }
    };
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') onHide();
      else if (view.current && view.current.since == null) view.current.since = performance.now();
    };
    const onClick = (e: MouseEvent) => {
      const click = describeClick(e.target);
      if (click) track('click', click);
    };
    // Copying the e-mail address or phone number instead of tapping it (Ctrl+C,
    // context menu, select → Copy on phones). "Copy link address" fires no event.
    // Only the kind is sent, never the copied text.
    const onCopy = () => {
      const sel = document.getSelection();
      const text = sel?.toString() || '';
      const cat = /@/.test(text) ? 'email' : /\+?\d[\d\s]{7,}/.test(text) ? 'phone' : '';
      if (!cat) return;
      const node = sel?.anchorNode instanceof Element ? sel.anchorNode : sel?.anchorNode?.parentElement;
      track('copy', { cat, label: 'kopie', area: node ? areaOf(node) : '' });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('copy', onCopy);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onHide);
    document.addEventListener('click', onClick, { capture: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onHide);
      document.removeEventListener('click', onClick, { capture: true });
      document.removeEventListener('copy', onCopy);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [report, measureDepth]);

  return null;
}
