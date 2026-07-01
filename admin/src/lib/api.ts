// Client helpers for the Netlify Functions backing the admin.
import type { JournalArticle } from '../types/journal';

const fn = (name: string) => `/.netlify/functions/${name}`;

/**
 * Same-origin URL for previewing a public-site image inside the admin. Routes
 * through the get-image function so local (not-yet-deployed) images render too.
 * Stored article `src` values stay as plain `/images/...` paths — this is only
 * for display.
 */
export const mediaUrl = (src: string): string => {
  if (!src) return '';
  if (/^https?:/.test(src)) return src;
  const name = src.replace(/^\/images\//, '').replace(/^\//, '');
  // Dev: route through get-image so local (not-yet-deployed) images render.
  // Prod: load deployed images straight from the public origin (no function call).
  if (import.meta.env.DEV) return fn('get-image') + `?file=${encodeURIComponent(name)}`;
  return `https://zuzapragtour.de/images/${name}`;
};

export async function checkSession(): Promise<boolean> {
  try {
    const r = await fetch(fn('session'), { credentials: 'same-origin' });
    const d = await r.json();
    return !!d.authed;
  } catch {
    return false;
  }
}

export async function login(password: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const r = await fetch(fn('login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ password }),
    });
    if (r.ok) return { ok: true };
    const d = await r.json().catch(() => ({}));
    return { ok: false, error: d.error || 'Anmeldung fehlgeschlagen.' };
  } catch {
    return { ok: false, error: 'Netzwerkfehler.' };
  }
}

export async function logout(): Promise<void> {
  try {
    await fetch(fn('logout'), { method: 'POST', credentials: 'same-origin' });
  } catch {
    /* ignore */
  }
}

export async function listArticles(): Promise<JournalArticle[]> {
  const r = await fetch(fn('list-articles'), { credentials: 'same-origin' });
  if (!r.ok) {
    const d = await r.json().catch(() => ({}));
    throw new Error(d.error || 'Laden fehlgeschlagen.');
  }
  const d = await r.json();
  return (d.articles || []) as JournalArticle[];
}

export async function getArticle(slug: string): Promise<JournalArticle | null> {
  const r = await fetch(fn('get-article') + `?slug=${encodeURIComponent(slug)}`, { credentials: 'same-origin' });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error('Laden fehlgeschlagen.');
  const d = await r.json();
  return (d.article as JournalArticle) || null;
}

export async function saveArticle(article: JournalArticle, originalSlug?: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const r = await fetch(fn('save-article'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ article, originalSlug }),
    });
    if (r.ok) return { ok: true };
    const d = await r.json().catch(() => ({}));
    return { ok: false, error: d.error || 'Speichern fehlgeschlagen.' };
  } catch {
    return { ok: false, error: 'Netzwerkfehler.' };
  }
}

export interface MediaItem {
  path: string; // e.g. /images/charles-bridge-statue.jpg
  name: string;
  size: number; // bytes
}

export async function listImages(): Promise<MediaItem[]> {
  const r = await fetch(fn('list-images'), { credentials: 'same-origin' });
  if (!r.ok) {
    const d = await r.json().catch(() => ({}));
    throw new Error(d.error || 'Bilder konnten nicht geladen werden.');
  }
  const d = await r.json();
  return (d.images || []) as MediaItem[];
}

export interface TourItem {
  id: string;
  slug?: string;
  slugDe?: string;
  image?: string;
  durationMinutes?: number;
  title: { en: string; de: string };
  description: { en: string; de: string };
  duration: { en: string; de: string };
}

export interface GoogleReview { author: string; rating: number; text: string; when: string; photo?: string }
export interface ReviewInfo {
  platforms: {
    google: { profileUrl?: string; configured?: boolean; rating?: number; total?: number; url?: string; error?: string; reviews?: GoogleReview[] };
    tripadvisor: { listingUrl?: string; writeUrl?: string; locationId?: string };
    tourhq: { url?: string };
  };
  asks: { where: string; file: string; platforms: string[] }[];
}

export async function getReviewInfo(): Promise<ReviewInfo> {
  const r = await fetch(fn('review-info'), { credentials: 'same-origin' });
  if (!r.ok) {
    const d = await r.json().catch(() => ({}));
    throw new Error(d.error || 'Bewertungsdaten konnten nicht geladen werden.');
  }
  return (await r.json()) as ReviewInfo;
}

export async function listTours(): Promise<TourItem[]> {
  const r = await fetch(fn('list-tours'), { credentials: 'same-origin' });
  if (!r.ok) {
    const d = await r.json().catch(() => ({}));
    throw new Error(d.error || 'Touren konnten nicht geladen werden.');
  }
  const d = await r.json();
  return (d.tours || []) as TourItem[];
}

export async function generateArticle(input: { topic: string; bilingual: boolean; notes?: string }): Promise<{ ok: boolean; article?: JournalArticle; error?: string }> {
  try {
    const r = await fetch(fn('generate-article'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(input),
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) return { ok: false, error: d.error || 'Erzeugung fehlgeschlagen.' };
    return { ok: true, article: d.article as JournalArticle };
  } catch {
    return { ok: false, error: 'Netzwerkfehler.' };
  }
}

export async function deleteArticle(slug: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const r = await fetch(fn('delete-article'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ slug }),
    });
    if (r.ok) return { ok: true };
    const d = await r.json().catch(() => ({}));
    return { ok: false, error: d.error || 'Löschen fehlgeschlagen.' };
  } catch {
    return { ok: false, error: 'Netzwerkfehler.' };
  }
}
