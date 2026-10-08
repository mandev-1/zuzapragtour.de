/**
 * Click & user-flow analytics (own, anonymous, no third parties).
 *
 * Every page view, every click on a link or button, every sent form, every
 * copied e-mail address or phone number and — when
 * a page is left — how long it was visible and how far an article was read are
 * sent to netlify/functions/track.mjs; the admin dashboard "Kliky a poptávky"
 * builds its numbers, paths and per-visit timelines from them.
 *
 * Privacy: no cookies, no IP addresses, no user agents, no cross-visit
 * identity. A visit is one browser tab: a random ID kept in sessionStorage,
 * which the browser deletes when the tab is closed.
 *
 * Own visits: open any page with `?track=off` once per device/browser to stop
 * counting yourself (`?track=on` undoes it).
 */
export type TrackKind = 'page' | 'click' | 'enquiry' | 'leave' | 'copy';
export type ClickCategory = 'whatsapp' | 'phone' | 'email' | 'form' | 'tour' | 'anchor' | 'nav' | 'external' | 'button';

const OPT_OUT_KEY = 'zpt_notrack';
const VISIT_KEY = 'zpt_visit';
const MOBILE_MAX = 899;

const randomId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID().replace(/-/g, '').slice(0, 12)
    : (Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).slice(0, 12);

/** This tab's visit: id + next sequence number, kept across reloads of the tab. */
let memory: { id: string; n: number } | null = null;
function nextSeq(): { id: string; n: number } {
  let v = memory;
  try {
    const stored = JSON.parse(sessionStorage.getItem(VISIT_KEY) || 'null');
    if (stored && typeof stored.id === 'string' && Number.isInteger(stored.n)) v = stored;
  } catch {
    /* storage blocked: the visit lives in memory only */
  }
  if (!v || v.n > 9999) v = { id: randomId(), n: 0 };
  const out = { id: v.id, n: v.n };
  memory = { id: v.id, n: v.n + 1 };
  try {
    sessionStorage.setItem(VISIT_KEY, JSON.stringify(memory));
  } catch {
    /* ignore */
  }
  return out;
}

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

/**
 * Send one event and return its sequence number (-1 when not sent). `cat` and
 * `label` describe a click; `area` is where on the page. A `leave` refers to
 * its page view by `label` (= that view's sequence number) and carries the
 * visible seconds and read depth; `path` overrides the current URL.
 */
export function track(
  kind: TrackKind,
  data: { cat?: string; label?: string; area?: string; ref?: string; path?: string; seconds?: number; depth?: number } = {},
): number {
  if (typeof window === 'undefined' || navigator.webdriver || trackingOff()) return -1;
  const root = document.documentElement.dataset; // A/B variant, mirrored from the cookie by AbTracker
  const { id, n } = nextSeq();
  const body = JSON.stringify({
    s: id,
    n,
    k: kind,
    c: data.cat ?? '',
    l: (data.label ?? '').slice(0, 60),
    a: (data.area ?? data.ref ?? '').slice(0, 40),
    p: (data.path ?? window.location.pathname).slice(0, 80),
    d: window.innerWidth <= MOBILE_MAX ? 'm' : 'd',
    v: root.abQa ? '' : root.ab || '',
    ...(kind === 'leave' ? { t: Math.round(data.seconds ?? 0), dp: data.depth ?? 0 } : {}),
  });
  try {
    if (!navigator.sendBeacon?.('/api/track', body)) {
      fetch('/api/track', { method: 'POST', body, keepalive: true }).catch(() => {});
    }
  } catch {
    /* measuring must never break the page */
  }
  return n;
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
export function areaOf(el: Element): string {
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
