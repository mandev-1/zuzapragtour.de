/**
 * Homepage A/B test (design_handoff_home_mobile): A = today's homepage,
 * B = the new mobile homepage (below 900px; desktop is the same in both).
 *
 * How it works
 * - netlify/edge-functions/ab-home.ts assigns a variant 50/50 on GET `/`,
 *   keeps it in the `zpt_ab` cookie and adds `data-ab="a|b"` to <html>.
 *   CSS (src/styles/home-v2.css) shows the matching homepage — no flicker.
 * - `?ab=a` / `?ab=b` forces a variant for previewing; such visits set
 *   `zpt_ab_qa` and are not counted.
 * - Events are counted anonymously (no IP, no IDs) by
 *   netlify/functions/ab-event.mjs; the admin shows the results.
 *
 * To end the test: set ENABLED = false in the edge function (everyone gets A),
 * or ship the winner and delete the loser.
 */

import { trackingOff } from '../utils/analytics';

export const AB_COOKIE = 'zpt_ab';
export const AB_QA_COOKIE = 'zpt_ab_qa';
/** Below this width variant B shows the new mobile homepage. */
export const AB_MOBILE_MAX = 899;

export type AbVariant = 'a' | 'b';
export type AbEvent = 'visitor' | 'view' | 'whatsapp' | 'call' | 'email' | 'form' | 'tour' | 'enquiry';

function readCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

/**
 * Only full page loads of `/` pass the edge function. A visitor who entered on
 * another page and then opens the homepage via client-side navigation has the
 * cookie but no data-ab yet — mirror it so the shown variant matches the count.
 */
export function syncAbAttribute(): void {
  const root = document.documentElement;
  if (root.dataset.ab) return;
  const v = readCookie(AB_COOKIE);
  if (v !== 'a' && v !== 'b') return;
  root.dataset.ab = v;
  if (readCookie(AB_QA_COOKIE)) root.dataset.abQa = '1';
}

/** The visitor's variant, or null when not in the test (or a QA preview). */
export function getAbVariant(): AbVariant | null {
  if (typeof document === 'undefined') return null;
  if (readCookie(AB_QA_COOKIE) || document.documentElement.dataset.abQa) return null;
  const v = document.documentElement.dataset.ab || readCookie(AB_COOKIE);
  return v === 'a' || v === 'b' ? v : null;
}

/** Count one event for the visitor's variant (no-op outside the test). */
export function trackAb(event: AbEvent): void {
  const v = getAbVariant();
  if (!v || trackingOff()) return;
  const body = JSON.stringify({
    v,
    e: event,
    d: window.innerWidth <= AB_MOBILE_MAX ? 'm' : 'd',
    p: window.location.pathname === '/' ? 'home' : 'other',
  });
  try {
    if (!navigator.sendBeacon?.('/api/ab-event', body)) {
      fetch('/api/ab-event', { method: 'POST', body, keepalive: true }).catch(() => {});
    }
  } catch {
    /* counting must never break the page */
  }
}
