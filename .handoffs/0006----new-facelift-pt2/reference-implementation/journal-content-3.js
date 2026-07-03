/* Zuza Prague Tours — Journal content (3/3). Articles 11–15. */
window.JOURNAL = window.JOURNAL || [];
window.JOURNAL.push(

{
  slug: 'prag-mit-kindern',
  category: 'Familien',
  title: 'Prag mit <em>Kindern</em>',
  titlePlain: 'Prag mit Kindern',
  cardBlurb: 'Ein Tag voller Entdeckungen — Spiegellabyrinth, Standseilbahn, Inseln und Legenden, die Kinder fesseln.',
  readTime: '8 Min.',
  date: 'Juni 2026',
  hero: 'guest-tourguide.jpg',
  heroCap: 'Prag wird zum Abenteuer, wenn man es als Geschichte erzählt.',
  standfirst: 'Kinder brauchen keine Jahreszahlen — sie brauchen Drachen, Ritter und Geheimgänge. Davon hat Prag reichlich.',
  meta: [
    { k: 'Geeignet', v: 'Ab ca. 4 J.' }, { k: 'Dauer', v: 'Halber Tag' }, { k: 'Strecke', v: '~2 km + Bahn' }, { k: 'Niveau', v: 'Entspannt' }
  ],
  railFacts: { title: 'Auf einen Blick', items: [
    { k: 'Standseilbahn', v: 'Mit Tramticket' }, { k: 'Spiegellabyrinth', v: 'Ca. 90 CZK' }, { k: 'Zoo Troja', v: 'Eigener Halbtag' }, { k: 'Pausen', v: 'Reichlich Eis' }
  ] },
  blocks: [
    { t: 'p', first: true, html: 'Ich habe Generationen von Kindern durch Prag geführt, und eines habe ich gelernt: Eine Tour mit Kindern erzählt dieselbe Stadt — nur durch andere Augen. Die Astronomische Uhr ist kein technisches Wunder, sondern ein Theater aus Figuren. Die Burg ist kein Machtzentrum, sondern ein Drachenversteck.' },
    { t: 'h2', html: 'Oben anfangen — mit der <em>Bahn</em>' },
    { t: 'p', html: 'Die Standseilbahn auf den Petřín ist schon das erste Abenteuer. Oben warten ein begehbarer Aussichtsturm (299 Stufen — eine Mutprobe!) und ein Spiegellabyrinth, das garantiert für Gelächter sorgt. Von hier geht es bergab, mit Pausen für Eis.' },
    { t: 'callout', label: 'Mit Kindern unterwegs', html: '<p>Ein paar Dinge, die den Tag retten:</p>', list: [
      '<strong>Tempo drosseln:</strong> ein Vormittag, drei Höhepunkte — nicht mehr.',
      '<strong>Legenden statt Daten:</strong> Golem, Drachen und der Wassermann der Moldau wirken Wunder.',
      '<strong>Der Zoo Troja</strong> verdient einen eigenen halben Tag — er zählt zu den schönsten Europas.'
    ] },
    { t: 'map', title: 'Ein kindgerechter Tag', route: false, list: true, cap: 'Locker geplant, mit viel Luft für Pausen. Der Zoo liegt nördlich und lohnt einen eigenen Ausflug.', points: [
      { coord: [50.0848, 14.3960], label: 'Spiegellabyrinth Petřín', note: 'Verzerrspiegel und ein Mini-Schlachtgemälde — großer Spaß.' },
      { coord: [50.0835, 14.3954], label: 'Aussichtsturm Petřín', note: '299 Stufen oder Aufzug — der „kleine Eiffelturm“.' },
      { coord: [50.0855, 14.4080], label: 'Kampa-Insel', note: 'Wiese zum Toben, Krabben-Skulpturen, Blick aufs Wasser.' },
      { coord: [50.1015, 14.4340], label: 'Technisches Nationalmuseum', note: 'Flugzeuge, Lokomotiven, Autos zum Staunen — bei Regen ideal.' }
    ] },
    { t: 'quote', html: 'Erzähl einem Kind von einem Drachen, und es wird sich an die Burg ein Leben lang erinnern.', by: 'Zuzana' },
    { t: 'ornament' },
    { t: 'p', html: 'Ich passe Tempo, Länge und Geschichten dem Alter Ihrer Kinder an. Sagen Sie mir, wie alt sie sind — den Rest übernehme ich.' }
  ],
  related: ['aussichtspunkte', 'prager-burg', '48-stunden-prag']
},

{
  slug: 'kutna-hora',
  category: 'Tagesausflug',
  title: 'Tagesausflug nach <em>Kutná Hora</em>',
  titlePlain: 'Tagesausflug nach Kutná Hora',
  cardBlurb: 'Eine Stunde von Prag: das berühmte Knochenhaus und eine der schönsten Kathedralen Böhmens.',
  readTime: '9 Min.',
  date: 'Mai 2026',
  hero: 'boat-vltava.jpg',
  heroCap: 'Hinaus aus Prag — nach Böhmen, ins mittelalterliche Silberland.',
  standfirst: 'Im Mittelalter machte Silber Kutná Hora fast so reich wie Prag. Heute ist es der lohnendste Tagesausflug der Stadt.',
  meta: [
    { k: 'Entfernung', v: '~70 km' }, { k: 'Anfahrt', v: 'Zug, ~55 Min.' }, { k: 'Dauer', v: 'Ganzer Tag' }, { k: 'Beste Zeit', v: 'Mai–Sept' }
  ],
  railFacts: { title: 'Anreise & Praktisches', items: [
    { k: 'Ab', v: 'Praha hl. n.' }, { k: 'Umsteigen', v: 'Kutná Hora hl. n.' }, { k: 'Ossarium', v: 'Sedlec' }, { k: 'UNESCO', v: 'Seit 1995' }
  ] },
  blocks: [
    { t: 'p', first: true, html: 'Eine knappe Stunde mit dem Zug, und Sie stehen in einer Stadt, die einst Königen das Silber für ihre Münzen lieferte. Kutná Hora ist UNESCO-Welterbe — und ein perfekter Kontrast zur Großstadt: mittelalterliche Gassen, eine Kathedrale wie aus Spitze, und ein Ort, der niemanden kalt lässt.' },
    { t: 'h2', html: 'Das <em>Knochenhaus</em> von Sedlec' },
    { t: 'p', html: 'Die Beinhaus-Kapelle in Sedlec ist mit den Gebeinen von etwa 40.000 Menschen geschmückt — ein Kronleuchter aus allen Knochen des menschlichen Körpers, Girlanden aus Schädeln. Es klingt makaber, ist aber zutiefst andächtig: ein mittelalterliches Nachdenken über die Gleichheit im Tod.' },
    { t: 'callout', label: 'So planen Sie den Tag', html: '<p>Die Anreise ist einfacher, als sie klingt:</p>', list: [
      '<strong>Zug</strong> ab Prag Hauptbahnhof bis Kutná Hora hl. n. (~55 Min.).',
      'Vom Bahnhof ein <strong>Lokalzug oder kurzer Fußweg</strong> nach Sedlec (Ossarium).',
      'Dann <strong>Bus oder Spaziergang</strong> ins historische Zentrum zur St.-Barbara-Kathedrale.',
      'Ein <strong>Kombiticket</strong> deckt mehrere Stätten ab.'
    ] },
    { t: 'map', title: 'Die Stationen in Kutná Hora', route: true, list: true, cap: 'Vom Ossarium in Sedlec ins Zentrum — Bus oder ein längerer Spaziergang verbinden beide.', points: [
      { coord: [49.9607, 15.2885], label: 'Beinhaus Sedlec', note: 'Die berühmte Knochen-Kapelle. Früh kommen, sie ist klein.' },
      { coord: [49.9618, 15.2876], label: 'Kathedrale Mariä Himmelfahrt', note: 'Sedlec — gotisch-barock, frisch restauriert, gleich nebenan.' },
      { coord: [49.9484, 15.2682], label: 'Welscher Hof', note: 'Die mittelalterliche Münzprägestätte im Zentrum.' },
      { coord: [49.9447, 15.2628], label: 'St.-Barbara-Kathedrale', note: 'Das Meisterwerk — drei zeltartige Türme, dem Bergbau geweiht.' }
    ] },
    { t: 'quote', html: 'Kutná Hora zeigt, was Prag hätte sein können — und macht die Rückkehr in die Hauptstadt umso schöner.', by: 'Zuzana' },
    { t: 'ornament' },
    { t: 'p', html: 'Ich begleite Sie gern für den ganzen Tag — von der Zugfahrt bis zum letzten Turm. So wird aus einem Ausflug eine Geschichte mit rotem Faden.' }
  ],
  related: ['beste-reisezeit', '48-stunden-prag', 'prager-burg']
},

{
  slug: 'weihnachtsmaerkte',
  category: 'Saison',
  title: 'Prager <em>Weihnachtsmärkte</em>',
  titlePlain: 'Prager Weihnachtsmärkte',
  cardBlurb: 'Glühwein, Trdelník und Lichterglanz — ein Winterführer durch die schönsten Märkte der Stadt.',
  readTime: '7 Min.',
  date: 'November 2025',
  hero: 'night-prague.jpg',
  heroCap: 'Der Altstädter Ring im Advent — Prags hellste Wochen.',
  standfirst: 'Im Advent wird Prag zur Bühne. Hier sind die Märkte, die sich lohnen — und einer, den nur Einheimische kennen.',
  meta: [
    { k: 'Saison', v: 'Ende Nov–6. Jan' }, { k: 'Märkte', v: '5 große' }, { k: 'Beste Zeit', v: 'Werktags abends' }, { k: 'Niveau', v: 'Gemütlich' }
  ],
  railFacts: { title: 'Gut zu wissen', items: [
    { k: 'Glühwein', v: 'Svařák' }, { k: 'Spezialität', v: 'Trdelník, Klobása' }, { k: 'Bezahlen', v: 'Bargeld & Karte' }, { k: 'Wärmstens', v: 'Handschuhe!' }
  ] },
  blocks: [
    { t: 'p', first: true, html: 'Von Ende November bis zum Dreikönigstag verwandeln Lichterketten, Tannenduft und der Dampf über den Glühweinkesseln die Stadt. Die großen Märkte sind ein Fest — aber das Geheimnis liegt darin, zu wissen, wann man wohin geht.' },
    { t: 'h2', html: 'Der <em>große</em> und der <em>schöne</em>' },
    { t: 'p', html: 'Der Markt auf dem Altstädter Ring ist der größte und festlichste, mit einem riesigen Baum und der Kulisse der Teynkirche. Der Markt auf dem Wenzelsplatz ist praktischer und nahe den Geschäften. Doch mein Favorit liegt höher oben.' },
    { t: 'callout', label: 'Mein Lieblingsmarkt', html: '<p>Der kleine Markt <strong>auf dem Burgareal</strong> (St.-Georgs-Platz) ist der stimmungsvollste: weniger Gedränge, Blick über die Dächer und im Dunkeln festlich beleuchtet. Verbinden Sie ihn mit einer späten Burgtour.</p>' },
    { t: 'map', title: 'Die Weihnachtsmärkte der Stadt', route: false, list: true, cap: 'Fünf Märkte, alle gut zu Fuß oder mit der Tram verbunden.', points: [
      { coord: [50.0875, 14.4213], label: 'Altstädter Ring', note: 'Der große, festliche — Baum, Bühne, Teynkirche.' },
      { coord: [50.0820, 14.4255], label: 'Wenzelsplatz', note: 'Praktisch, zentral, nahe den Geschäften.' },
      { coord: [50.0888, 14.4283], label: 'Platz der Republik', note: 'Vor dem Repräsentationshaus, etwas ruhiger.' },
      { coord: [50.0905, 14.4030], label: 'Prager Burg', note: 'Mein Favorit: klein, hoch gelegen, am stimmungsvollsten.' },
      { coord: [50.0753, 14.4378], label: 'Náměstí Míru', note: 'Der Markt der Einheimischen in Vinohrady.' }
    ] },
    { t: 'quote', html: 'Trinken Sie den ersten Glühwein nicht auf dem größten Platz. Trinken Sie ihn dort, wo die Prager ihn trinken.', by: 'Zuzana' },
    { t: 'ornament' },
    { t: 'p', html: 'Eine Adventstour bei Einbruch der Dunkelheit ist etwas Besonderes — die Märkte, die Lichter, die Geschichten. Schreiben Sie mir früh; der Dezember ist schnell ausgebucht.' }
  ],
  related: ['beste-reisezeit', 'aussichtspunkte', 'kaffeehaeuser']
},

{
  slug: 'jugendstil-kubismus',
  category: 'Architektur',
  title: 'Jugendstil & <em>Kubismus</em>',
  titlePlain: 'Jugendstil und Kubismus',
  cardBlurb: 'Ein Architektur-Spaziergang durch Prags kühnstes Jahrhundert — von Mucha bis zur kubistischen Fassade.',
  readTime: '10 Min.',
  date: 'April 2026',
  hero: 'autumn-prague.jpg',
  heroCap: 'Prag trägt sein 20. Jahrhundert offen zur Schau — wenn man hinsieht.',
  standfirst: 'Prag besitzt etwas, das keine andere Stadt hat: kubistische Architektur. Dazu Jugendstil in seiner reinsten Form.',
  meta: [
    { k: 'Epoche', v: '1900–1925' }, { k: 'Strecke', v: '~3 km' }, { k: 'Dauer', v: '2,5 Std.' }, { k: 'Einzigartig', v: 'Kubismus' }
  ],
  railFacts: { title: 'Auf einen Blick', items: [
    { k: 'Jugendstil', v: 'Mucha, Obecní dům' }, { k: 'Kubismus', v: 'Gočár, Janák' }, { k: 'Nur in Prag', v: 'Kubist. Bauten' }, { k: 'Café', v: 'Grand Orient' }
  ] },
  blocks: [
    { t: 'p', first: true, html: 'Anfang des 20. Jahrhunderts war Prag eine Stadt im Aufbruch. Der Jugendstil schmückte ihre Boulevards mit Blüten und goldenen Mosaiken — und dann taten junge tschechische Architekten etwas, das es nirgendwo sonst gab: Sie übersetzten den Kubismus der Malerei in Stein.' },
    { t: 'h2', html: 'Das <em>Jugendstil</em>-Juwel' },
    { t: 'p', html: 'Das Repräsentationshaus (Obecní dům) ist Gesamtkunstwerk pur: Mosaiken, Mosaike, ein Konzertsaal mit Mucha-Bezug und ein Café, in dem die Zeit stehen geblieben ist. Nebenan steht der gotische Pulverturm — der Kontrast ist das eigentliche Erlebnis.' },
    { t: 'callout', label: 'Was Kubismus in Architektur heißt', html: '<p>Statt glatter Wände: <strong>geknickte, kristalline Flächen</strong>, schräge Fenster, kantige Details — sogar Möbel und ein Café. Das <strong>Haus zur Schwarzen Madonna</strong> ist das berühmteste Beispiel und beherbergt heute das einzige kubistische Café der Welt.</p>' },
    { t: 'map', title: 'Architektur-Spaziergang', route: true, list: true, cap: 'Von der Jugendstil-Pracht zur kubistischen Kühnheit — rund 3 km durch die Neustadt.', points: [
      { coord: [50.0879, 14.4283], label: 'Repräsentationshaus', note: 'Jugendstil-Gesamtkunstwerk neben dem Pulverturm.' },
      { coord: [50.0873, 14.4258], label: 'Haus zur Schwarzen Madonna', note: 'Kubismus pur — mit dem Grand Café Orient im ersten Stock.' },
      { coord: [50.0833, 14.4270], label: 'Mucha-Museum', note: 'Die goldenen Plakate des Jugendstil-Meisters.' },
      { coord: [50.0834, 14.4213], label: 'Kubistische Laterne', note: 'Die einzige kubistische Straßenlaterne der Welt, am Jungmann-Platz.' },
      { coord: [50.0832, 14.4355], label: 'Hauptbahnhof', note: 'Die alte Jugendstil-Halle von Josef Fanta, oft übersehen.' }
    ] },
    { t: 'quote', html: 'Andere Städte haben Kubismus an die Wand gehängt. Prag hat darin gewohnt.', by: 'Zuzana' },
    { t: 'ornament' },
    { t: 'p', html: 'Diese Tour ist für alle, die schon „die Brücke und die Burg“ gesehen haben und Prags überraschendere Seite suchen. Ich zeige Ihnen die Stadt, an der die meisten vorbeigehen.' }
  ],
  related: ['kaffeehaeuser', 'versteckte-hoefe', 'kafka']
},

{
  slug: 'essen-wie-einheimische',
  category: 'Kulinarik',
  title: 'Wo <em>Einheimische</em> essen',
  titlePlain: 'Wo Einheimische essen',
  cardBlurb: 'Abseits der Touristenfallen am Ring: die Viertel und Gerichte, die Prag wirklich ausmachen.',
  readTime: '8 Min.',
  date: 'März 2026',
  hero: 'guest-food.jpeg',
  heroCap: 'Böhmische Küche, ehrlich serviert — abseits der Hauptplätze.',
  standfirst: 'Die Regel ist einfach: Je näher am Altstädter Ring, desto schlechter und teurer das Essen. Gehen wir also weiter.',
  meta: [
    { k: 'Faustregel', v: '2 Tram-Stopps weg' }, { k: 'Viertel', v: 'Karlín, Vinohrady' }, { k: 'Mittagsmenü', v: 'Polední menu' }, { k: 'Niveau', v: 'Genießen' }
  ],
  railFacts: { title: 'Tisch-Knigge', items: [
    { k: 'Trinkgeld', v: '~10 %' }, { k: 'Mittags', v: 'Bestes Preis-Wert' }, { k: 'Bier', v: 'Erst „ano“ sagen' }, { k: 'Reservieren', v: 'Abends ratsam' }
  ] },
  blocks: [
    { t: 'p', first: true, html: 'Ich werde oft gefragt, wo man „echt tschechisch“ isst. Meine Antwort beginnt immer mit einer Richtung: weg vom Altstädter Ring. Zwei, drei Tramstopps genügen, und die Preise halbieren sich, während die Qualität steigt.' },
    { t: 'h2', html: 'Die <em>Viertel</em>, nicht die Adressen' },
    { t: 'p', html: 'Konkrete Lokale kommen und gehen — deshalb gebe ich Ihnen lieber die Viertel an die Hand. <strong>Karlín</strong> ist Prags Feinschmecker-Bezirk geworden; <strong>Vinohrady</strong> ist elegant und entspannt; <strong>Žižkov</strong> hat die meisten Kneipen pro Kopf in Europa; <strong>Holešovice</strong> ist jung und kreativ, mit einer Markthalle in einer alten Fabrik.' },
    { t: 'callout', label: 'Was Sie probieren sollten', html: '<p>Jenseits von Gulasch und Knödel:</p>', list: [
      '<strong>Svíčková:</strong> Rinderlende in Rahmsoße mit Preiselbeeren — das Nationalgericht.',
      '<strong>Chlebíčky:</strong> belegte Brötchen, das tschechische Fingerfood.',
      '<strong>Polední menu:</strong> das günstige Mittagsmenü, das die Einheimischen lieben.',
      '<strong>Ein „desítka“:</strong> ein leichtes 10°-Bier, perfekt zum Mittag.'
    ] },
    { t: 'map', title: 'Die Genussviertel Prags', route: false, list: true, cap: 'Keine Adressen, sondern Reviere — fragen Sie mich vor Ort nach dem tagesaktuellen Tipp.', points: [
      { coord: [50.0930, 14.4490], label: 'Karlín', note: 'Prags Feinschmecker-Viertel — moderne Bistros und Bäckereien.' },
      { coord: [50.0775, 14.4380], label: 'Vinohrady', note: 'Elegant und ruhig: Weinbars, Brunch, Parks.' },
      { coord: [50.0875, 14.4500], label: 'Žižkov', note: 'Die Kneipenhochburg — bodenständig und lebendig.' },
      { coord: [50.0680, 14.4150], label: 'Náplavka', note: 'Die Moldau-Uferpromenade mit Samstags-Bauernmarkt.' }
    ] },
    { t: 'quote', html: 'Eine Stadt schmeckt man nicht auf ihrem Hauptplatz. Man schmeckt sie dort, wo sie wohnt.', by: 'Zuzana' },
    { t: 'ornament' },
    { t: 'p', html: 'Eine kulinarische Runde lässt sich wunderbar mit einem Spaziergang verbinden. Sagen Sie mir, was Sie mögen — und ob Sie Bier oder Wein bevorzugen.' }
  ],
  related: ['kaffeehaeuser', 'versteckte-hoefe', 'beste-reisezeit']
}

);
