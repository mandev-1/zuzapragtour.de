/**
 * /llms.txt — site summary for AI agents and LLM crawlers (https://llmstxt.org).
 *
 * Generated at build time from the same data as the site (tours, journal), so
 * the article list never goes stale. Format: H1, blockquote summary, details,
 * then H2 sections of Markdown link lists — Lighthouse's "Agentic Browsing"
 * audit requires the H1 and real Markdown links. The longer hand-written
 * version stays in public/llms-full.txt.
 */
import { blogPosts } from '../../src/utils/blogData';
import { tours } from '../../src/data/tours';
import { translate } from '../../src/utils/translations';
import { postText } from '../../src/utils/postText';
import { journalPages } from '../../src/utils/journalGenerated';
import { BRAND } from '../../src/brand';

export const dynamic = 'force-static';

/** German text where it exists, English otherwise; tags and line breaks removed. */
function text(key: string, lookup: (key: string, lang: 'de' | 'en') => string = (k, l) => translate(k as any, l)): string {
  const de = lookup(key, 'de');
  const value = de && de !== key ? de : lookup(key, 'en');
  return value === key ? '' : value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

/** Escape characters that would break a Markdown link label. */
const label = (s: string) => s.replace(/([[\]])/g, '\\$1');

export function GET() {
  const url = (path: string) => `${BRAND.domain}${path}`;

  const tourLines = tours.map((tour) => {
    const duration = text(tour.durationKey);
    return `- [${label(text(tour.titleKey))}](${url(`/tours/${tour.slugDe}`)})${duration ? `: ${duration}, privat` : ''}`;
  });

  const pageLines = journalPages.map((page) => {
    const excerpt = text(page.excerptKey, postText);
    return `- [${label(text(page.titleKey, postText))}](${url(page.path ?? '/')})${excerpt ? `: ${excerpt}` : ''}`;
  });

  const articleLines = blogPosts
    .filter((post) => !post.noindex)
    .map((post) => {
      const excerpt = text(post.excerptKey, postText);
      return `- [${label(text(post.titleKey, postText))}](${url(`/blog/${post.slugDe ?? post.slug}`)})${excerpt ? `: ${excerpt}` : ''}`;
    });

  const body = `# ${BRAND.siteName}

> Private Stadtführungen in Prag auf Deutsch und Englisch mit ${BRAND.personName}, staatlich geprüfte Stadtführerin, seit 1986. Keine Agentur: Zuzana führt jede Tour selbst.

Zuza Prague Tours ist ein Ein-Personen-Betrieb in Prag. Alle Touren sind privat und werden auf die Gäste abgestimmt: keine festen Gruppen, kein Bus, das Tempo und die Wege richten sich nach den Gästen.

- Zertifizierungen: staatlich geprüfte Fremdenführerin (tschechische Berufslizenz); Akkreditierung des Jüdischen Museums Prag für Führungen im Jüdischen Viertel; Universitätsabschluss (Ing.)
- Sprachen: Deutsch und Englisch fließend, Tschechisch als Muttersprache
- Kontakt: Telefon und WhatsApp ${BRAND.phone}, E-Mail ${BRAND.email}

## Touren

${tourLines.join('\n')}

## Buchung und Kontakt

- [Tour anfragen](${url('/book')}): Anfrageformular, Antwort in der Regel innerhalb von 24 Stunden
- [Kontakt](${url('/contact')}): Telefon, WhatsApp und E-Mail
- [WhatsApp](https://wa.me/${BRAND.phoneRaw.replace(/\D/g, '')}): direkt schreiben
- [Über Zuzana Manová](${url('/zuzana-manova')}): Werdegang, Zertifizierungen, Arbeitsweise

## Prag planen

${pageLines.join('\n')}

## Journal

Reiseführer und Prag-Tipps auf Deutsch, alle von Zuzana Manová geschrieben. Übersicht: [Journal](${url('/blog')}).

${articleLines.join('\n')}

## Bewertungen und Profile

- [TripAdvisor](${BRAND.tripadvisor}): Bewertungen von Gästen
- [TourHQ](${BRAND.tourhq}): Guide-Profil
- [Instagram](${BRAND.instagram}): Fotos von den Touren

## Optional

- [Vollständige Informationen](${url('/llms-full.txt')}): ausführliche Fassung mit Tourbeschreibungen, Preisen und Gästeprofil
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
