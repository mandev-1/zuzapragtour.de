// POST /.netlify/functions/generate-article — auth-gated. Drafts a journal
// article from keywords/topic using the Anthropic API, returned in our block
// schema. Needs env ANTHROPIC_API_KEY (+ optional ANTHROPIC_MODEL).
// Body: { topic: string, bilingual?: boolean, notes?: string }
import { verify } from '../lib/auth.mjs';

const json = (statusCode, obj) => ({ statusCode, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj) });
const DEFAULT_MODEL = 'claude-sonnet-4-6';

const CATEGORIES = ['Reiseführer', 'Reiserouten', 'Wahrzeichen', 'Geschichte', 'Verstecktes Prag', 'Kultur', 'Kulinarik'];

const SYSTEM =
  'Du bist Ing. Zuzana Manová, staatlich zertifizierte Prager Stadtführerin mit über 40 Jahren Erfahrung. ' +
  'Du schreibst persönliche, warme, sachkundige Journal-Artikel über Prag in der Ich-Form, in gepflegtem, ' +
  'formellem Deutsch (Sie-Form). Konkrete Orte, Zeiten und Tipps aus echter Erfahrung. Kein Marketing-Geschwätz, ' +
  'keine Emojis, keine erfundenen Fakten.';

function userPrompt({ topic, bilingual, notes }) {
  return [
    `Schreibe einen Journal-Artikel über: ${topic}`,
    notes ? `Zusätzliche Hinweise/Blickwinkel: ${notes}` : '',
    bilingual ? 'Der Artikel ist ZWEISPRACHIG (Deutsch + Englisch).' : 'Der Artikel ist NUR auf Deutsch.',
    '',
    'Gib AUSSCHLIESSLICH ein einziges JSON-Objekt zurück — kein Markdown, keine Erklärung, keine Code-Fences.',
    'Form:',
    '{',
    '  "slug": "kurzer-kebab-slug",            // nur a-z 0-9 Bindestrich',
    bilingual ? '  "slugDe": "deutscher-kebab-slug",' : '',
    `  "languages": ${bilingual ? '["de","en"]' : '["de"]'},`,
    '  "status": "draft",',
    `  "category": "einer von: ${CATEGORIES.join(', ')}",`,
    `  "title": { "de": "Titel mit <em>einem</em> Akzentwort"${bilingual ? ', "en": "Title with <em>one</em> accent word"' : ''} },`,
    `  "excerpt": { "de": "1–2 Sätze Vorspann"${bilingual ? ', "en": "1–2 sentence standfirst"' : ''} },`,
    `  "tags": { "de": ["schlagwort", "..."]${bilingual ? ', "en": ["keyword", "..."]' : ''} },`,
    '  "blocks": [',
    `    { "t": "p", "lead": true, "html": { "de": "Einleitung …"${bilingual ? ', "en": "Intro …"' : ''} } },`,
    `    { "t": "h2", "html": { "de": "Abschnittstitel"${bilingual ? ', "en": "Section title"' : ''} } },`,
    `    { "t": "p", "html": { "de": "Fließtext …"${bilingual ? ', "en": "Body …"' : ''} } },`,
    `    { "t": "callout", "label": { "de": "Tipp"${bilingual ? ', "en": "Tip"' : ''} }, "html": { "de": "<p>Praktischer Hinweis.</p>"${bilingual ? ', "en": "<p>A practical tip.</p>"' : ''} } },`,
    `    { "t": "quote", "by": "Zuzana", "html": { "de": "Ein einprägsamer Satz."${bilingual ? ', "en": "A memorable line."' : ''} } },`,
    '    { "t": "ornament" }',
    '  ]',
    '}',
    '',
    'Regeln: 7–11 Blöcke mit mehreren h2-Abschnitten, mindestens einem callout und meist einem quote; ' +
      'schließe mit einem ornament und einem persönlichen Schlussabsatz. In html-Feldern nur <strong>, <em>, <a href> verwenden. ' +
      (bilingual ? 'Jedes Textfeld MUSS "de" UND "en" enthalten.' : 'Nur "de"-Felder, keine "en"-Felder.'),
  ]
    .filter(Boolean)
    .join('\n');
}

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'neuer-artikel';
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  if (!verify(event.headers.cookie, process.env.SESSION_SECRET)) return json(401, { error: 'Nicht angemeldet.' });
  if (!process.env.ANTHROPIC_API_KEY) return json(400, { error: 'KI nicht konfiguriert (ANTHROPIC_API_KEY fehlt).' });

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Ungültige Daten.' });
  }
  if (!body.topic || !String(body.topic).trim()) return json(400, { error: 'Thema / Stichwörter fehlen.' });
  const bilingual = !!body.bilingual;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || DEFAULT_MODEL,
        max_tokens: 8000,
        temperature: 0.7,
        system: SYSTEM,
        messages: [{ role: 'user', content: userPrompt({ topic: String(body.topic).trim(), bilingual, notes: body.notes && String(body.notes).trim() }) }],
      }),
    });
    if (!r.ok) return json(502, { error: `KI-Fehler (${r.status}): ${(await r.text()).slice(0, 300)}` });
    const data = await r.json();
    const text = (data.content || []).map((c) => c.text || '').join('');
    const s = text.indexOf('{');
    const e = text.lastIndexOf('}');
    if (s === -1 || e === -1) return json(502, { error: 'KI-Antwort ohne JSON.' });

    let article;
    try {
      article = JSON.parse(text.slice(s, e + 1));
    } catch {
      return json(502, { error: 'KI-Antwort konnte nicht gelesen werden.' });
    }

    // Normalize + guard.
    article.slug = /^[a-z0-9-]+$/.test(article.slug || '') ? article.slug : slugify(article.slug || body.topic);
    if (article.slugDe && !/^[a-z0-9-]+$/.test(article.slugDe)) article.slugDe = slugify(article.slugDe);
    article.languages = bilingual ? ['de', 'en'] : ['de'];
    article.status = 'draft';
    article.date = new Date().toISOString().slice(0, 10);
    article.author = article.author || 'Ing. Zuzana Manová';
    if (!Array.isArray(article.blocks)) article.blocks = [];
    if (!article.title) article.title = { de: body.topic };
    if (!CATEGORIES.includes(article.category)) article.category = 'Reiseführer';

    return json(200, { article });
  } catch (err) {
    return json(502, { error: String((err && err.message) || err) });
  }
};
