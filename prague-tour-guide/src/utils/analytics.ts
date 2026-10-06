/**
 * Click & user-flow analytics (own, anonymous, no third parties).
 *
 * Every page view and every click on a link or button is sent to
 * netlify/functions/track.mjs; the admin "Klicks & Wege" tab shows the counts,
 * what converts and the most common paths.
 *
 * Privacy: nothing is stored on the visitor's device. A visit ("session") is a
 * random ID held in memory only — it lives as long as the tab and is gone on a
 * reload. No IP addresses, no user agents, no cross-visit identity.
 *
 * Own visits: open any page with `?track=off` once per device/browser to stop
 * counting yourself (`?track=on` undoes it).
 */
export type TrackKind = 'page' | 'click' | 'enquiry';
export type ClickCategory = 'whatsapp' | 'phone' | 'email' | 'form' | 'tour' | 'anchor' | 'nav' | 'external' | 'button';

const OPT_OUT_KEY = 'zpt_notrack';
const MOBILE_MAX = 899;

const SESSION =
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID().replace(/-/g, '').slice(0, 12)
    : (Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).slice(0, 12);
let seq = 0;

/** True on devices where the owner opened `?track=off` (also mutes the A/B test counts). */
export function trackingOff(): boolean {
  try {
    const flag = new URLSearchParams(window.location.search).get('track');
    if (flag === 'off') localStorage.setItem(OPT_OUT_KEY, '1');
    if (flag === 'on') localStorage.removeItem(OPT_OUT_KEY);
    return localStorage.getItem(OPT_OUT_KEY) === '1';
  } catch {
    return false;
  }
}

/** Send one event. `cat` and `label` describe a click; `area` is where on the page. */
export function track(kind: TrackKind, data: { cat?: string; label?: string; area?: string; ref?: string } = {}): void {
  if (typeof window === 'undefined' || navigator.webdriver || trackingOff()) return;
  const root = document.documentElement.dataset; // A/B variant, mirrored from the cookie by AbTracker
  const body = JSON.stringify({
    s: SESSION,
    n: seq++,
    k: kind,
    c: data.cat ?? '',
    l: (data.label ?? '').slice(0, 60),
    a: (data.area ?? data.ref ?? '').slice(0, 40),
    p: window.location.pathname.slice(0, 80),
    d: window.innerWidth <= MOBILE_MAX ? 'm' : 'd',
    v: root.abQa ? '' : root.ab || '',
  });
  try {
    if (!navigator.sendBeacon?.('/api/track', body)) {
      fetch('/api/track', { method: 'POST', body, keepalive: true }).catch(() => {});
    }
  } catch {
    /* measuring must never break the page */
  }
}

/** Visible text of a link/button without icon ligatures ("chat", "arrow_forward"). */
function visibleText(el: Element): string {
  let out = '';
  el.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) out += node.textContent;
    else if (node instanceof Element && !node.classList.contains('material-symbols-outlined') && node.getAttribute('aria-hidden') !== 'true') {
      out += ' ' + visibleText(node);
    }
  });
  return out.replace(/\s+/g, ' ').trim();
}

/** Where on the page: an explicit data-track-section, else the nearest id, else header/footer/nav/main. */
function areaOf(el: Element): string {
  const tagged = el.closest('[data-track-section]') as HTMLElement | null;
  if (tagged) return tagged.dataset.trackSection || '';
  const withId = el.closest('[id]');
  if (withId && withId.id !== '__next') return withId.id;
  return el.closest('header, footer, nav, main')?.tagName.toLowerCase() || '';
}

/** Category + readable label of a clicked link or button, or null for non-interactive clicks. */
export function describeClick(target: EventTarget | null): { cat: ClickCategory; label: string; area: string } | null {
  const el = (target as Element | null)?.closest?.('a[href], button, [role="button"]');
  if (!el) return null;
  const named = (el.closest('[data-track]') as HTMLElement | null)?.dataset.track;
  const text = named || el.getAttribute('aria-label') || visibleText(el);
  const area = areaOf(el);

  if (el instanceof HTMLAnchorElement) {
    const href = el.getAttribute('href') || '';
    const url = el.href;
    let cat: ClickCategory;
    let label = text;
    if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(url)) cat = 'whatsapp';
    else if (url.startsWith('tel:')) cat = 'phone';
    else if (url.startsWith('mailto:')) cat = 'email';
    else if (/\/tours\/[^/?#]+/.test(url)) {
      cat = 'tour';
      label = named || url.match(/\/tours\/([^/?#]+)/)![1]; // group by tour, whatever the link text
    } else if (/\/(book|contact)(#|\?|$)/.test(url)) cat = 'form';
    else if (href.startsWith('#')) cat = 'anchor';
    else if (el.host && el.host !== window.location.host) {
      cat = 'external';
      label = named || el.host.replace(/^www\./, '');
    } else cat = 'nav';
    return { cat, label: label || el.pathname || href, area };
  }
  return { cat: 'button', label: text || 'button', area };
}
