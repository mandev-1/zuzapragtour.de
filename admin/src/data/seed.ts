// Local seed articles — used until the editor loads real articles from the repo
// (Phase 3, get-articles). Demonstrates a bilingual published article and a
// German-only draft so the dashboard reads true.
import type { JournalArticle } from '../types/journal';

export const SEED: JournalArticle[] = [
  {
    slug: 'best-time-to-visit-prague',
    slugDe: 'beste-reisezeit-prag',
    languages: ['de', 'en'],
    status: 'published',
    date: '2026-05-15',
    dateDisplay: { de: 'Mai 2026', en: 'May 2026' },
    category: 'Reiseführer',
    readTime: { de: '9 Min.', en: '9 min' },
    hero: '/images/autumn-prague.jpg',
    heroCap: { de: 'Die Altstadt im Oktoberlicht.', en: 'The Old Town in October light.' },
    title: { de: 'Die beste Zeit, um <em>Prag</em> zu besuchen', en: 'The Best Time to Visit <em>Prague</em>' },
    excerpt: {
      de: 'Jede Jahreszeit erzählt eine andere Geschichte. Hier ist, wann die Stadt sich am ehrlichsten zeigt.',
      en: 'Every season tells a different story. Here is when the city shows itself most honestly.',
    },
    tags: { de: ['Prag Reisezeit', 'Prag Jahreszeiten'], en: ['best time Prague', 'Prague seasons'] },
    author: 'Ing. Zuzana Manová',
    blocks: [
      {
        t: 'p',
        lead: true,
        html: {
          de: 'Prag verändert sich mit dem Licht. Nach vierzig Jahren weiß ich: Es gibt keine falsche Zeit — nur unterschiedliche Städte.',
          en: 'Prague changes with the light. After forty years I know there is no wrong time to come — only different cities.',
        },
      },
      { t: 'h2', html: { de: 'Herbst, die <em>fotogenste</em> Jahreszeit', en: 'Autumn, the most <em>photogenic</em> season' } },
      {
        t: 'p',
        html: {
          de: 'Oktober ist mein Favorit. Das Laub auf der Kampa-Insel, der Dunst über der Moldau, das tiefe Licht auf den Sandsteinfassaden.',
          en: 'October is my favourite. The leaves on Kampa Island, the haze over the Vltava, the low light on the sandstone façades.',
        },
      },
      { t: 'quote', by: 'Zuzana', html: { de: 'Kommen Sie im November.', en: 'Come in November.' } },
      { t: 'ornament' },
    ],
  },
  {
    slug: 'josefov',
    languages: ['de'],
    status: 'draft',
    date: '2026-03-10',
    dateDisplay: { de: 'März 2026' },
    category: 'Geschichte',
    readTime: { de: '12 Min.' },
    hero: '/images/josefov.jpg',
    heroCap: { de: 'Die Klausen-Synagoge am Alten Jüdischen Friedhof.' },
    title: { de: 'Josefov: das <em>jüdische</em> Viertel' },
    excerpt: { de: 'Das kleinste Viertel Prags trägt die schwerste Geschichte. Es will langsam gelesen werden.' },
    tags: { de: ['Josefov', 'Jüdisches Viertel Prag'] },
    author: 'Ing. Zuzana Manová',
    blocks: [
      {
        t: 'p',
        lead: true,
        html: { de: 'Josefov ist auf der Karte winzig — ein paar Gassen zwischen Altstädter Ring und Fluss. Doch kein anderer Teil Prags verlangt so viel Aufmerksamkeit.' },
      },
      { t: 'callout', label: { de: 'Vor dem Besuch' }, html: { de: '<ul><li>Am <strong>Schabbat</strong> sind die Stätten geschlossen.</li><li>Männer erhalten am Eingang eine <strong>Kippa</strong>.</li></ul>' } },
    ],
  },
];
