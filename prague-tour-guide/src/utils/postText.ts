// Text of a blog / journal post field (title, excerpt, date, content, …) by
// its key from blogData (titleKey, excerptKey, contentKey, …).
//
// Kept out of translations.ts on purpose: these two modules hold the full HTML
// of every article (~700 KB). Only the journal pages import this file, so the
// homepage, tours and contact pages no longer download them.
import { blogTranslations } from './blogTranslations';
import { journalContent } from './journalGenerated';

type Lang = 'de' | 'en';
const legacy = blogTranslations as Record<string, { de?: string; en?: string } | undefined>;
const journal = journalContent as Record<string, { de?: string; en?: string } | undefined>;

export function postText(key: string, language: Lang): string {
  // German-only journal articles fall back to `de` so an English visitor still
  // sees the article rather than the raw key.
  const j = journal[key];
  if (j) return j[language] || j.de || key;
  return legacy[key]?.[language] || key;
}
