/* Zuza Prague Tours — Journal content (1/3). Articles 1–5.
   Real, practical Prague guides in Zuzana's voice. Map points use
   real coordinates [lat, lng]; route:true draws a walking line. */
window.JOURNAL = window.JOURNAL || [];
window.JOURNAL.push(

{
  slug: 'beste-reisezeit',
  category: 'Reiseführer',
  title: 'Die beste Zeit, um <em>Prag</em> zu besuchen',
  titlePlain: 'Die beste Zeit, um Prag zu besuchen',
  cardBlurb: 'Jede Jahreszeit erzählt eine andere Geschichte — und warum der November mein Geheimtipp ist.',
  readTime: '9 Min.',
  date: 'Mai 2026',
  hero: 'autumn-prague.jpg',
  heroCap: 'Die Altstadt im Oktoberlicht — meine liebste Stunde des Jahres.',
  standfirst: 'Jede Jahreszeit erzählt eine andere Geschichte. Hier ist, wann die Stadt sich Ihnen am ehrlichsten zeigt.',
  meta: [ { k: 'Saison', v: 'Ganzjährig' }, { k: 'Beste Monate', v: 'Mai · Sep · Nov' }, { k: 'Tageszeit', v: 'Früh' }, { k: 'Niveau', v: 'Gemütlich' } ],
  railFacts: { title: 'Auf einen Blick', items: [ { k: 'Frühling', v: 'Gärten erwachen' }, { k: 'Sommer', v: 'Früh starten' }, { k: 'Herbst', v: 'Bestes Licht' }, { k: 'Winter', v: 'Am ruhigsten' } ] },
  blocks: [
    { t: 'p', first: true, html: 'Prag verändert sich mit dem Licht. Im Frühnebel des März wirkt die Karlsbrücke wie eine Radierung; im Hochsommer glüht sie golden und ist voller Menschen. Nach vierzig Jahren weiß ich: Es gibt keine falsche Zeit — nur unterschiedliche Städte.' },
    { t: 'p', html: 'Die meisten Reiseführer empfehlen Mai und September, und sie haben nicht unrecht. Doch sie verschweigen, dass jede Jahreszeit ihren eigenen Vorzug hat — wenn man weiß, wann man wohin geht.' },
    { t: 'h2', html: 'Frühling, wenn die Gärten <em>erwachen</em>' },
    { t: 'p', html: 'Die Palastgärten unter der Burg öffnen Anfang April. Es ist die Zeit, in der ich meine längsten Touren plane — fünf Stunden, weil man einfach nicht aufhören möchte zu gehen. Flieder über barocken Terrassen, und noch genug Ruhe, um sie zu genießen.' },
    { t: 'callout', label: 'Tipp für Frühbucher', html: '<p>Die Burggärten und der Wallenstein-Garten sind <strong>vor 10 Uhr</strong> fast leer. Beginnen Sie dort, bevor die Reisegruppen eintreffen.</p>' },
    { t: 'h2', html: 'Sommer — früh oder gar nicht' },
    { t: 'p', html: 'Der Juli ist warm und voll. Mein Rat: Starten Sie um 8 Uhr. Bis die Tagesausflügler die Altstadt erreichen, haben wir die Karlsbrücke bereits hinter uns und sitzen im Schatten eines Hofes. Am späten Nachmittag gehört die Stadt dann wieder den Flaneuren.' },
    { t: 'h2', html: 'Herbst, die <em>fotogenste</em> Jahreszeit' },
    { t: 'p', html: 'Oktober ist mein persönlicher Favorit. Das Laub auf der Kampa-Insel, der Dunst über der Moldau, das tiefe Licht auf den Sandsteinfassaden. Die Sommerhitze ist fort, die Weihnachtsmenge noch nicht da.' },
    { t: 'quote', html: 'Kommen Sie im November. Die Stadt gehört dann wieder denen, die sie lieben.', by: 'Zuzana' },
    { t: 'h2', html: 'Winter, die ehrlichste Stadt' },
    { t: 'p', html: 'Zwischen Dreikönig und Ostern gehören die Cafés wieder den Einheimischen, und die Geschichten, die ich erzähle, hallen in leeren Gassen nach. Ziehen Sie sich warm an, planen Sie Pausen in alten Kaffeehäusern ein — und lassen Sie sich Zeit.' },
    { t: 'map', title: 'Meine Lieblingsorte durchs Jahr', route: false, list: true, cap: 'Vier Orte, die in ihrer jeweiligen Saison am schönsten sind. Tippen Sie auf einen Punkt.', points: [
      { coord: [50.0897, 14.4060], label: 'Wallenstein-Garten', note: 'Frühling: barocke Terrassen, frei zugänglich, vor 10 Uhr fast leer.' },
      { coord: [50.0855, 14.4080], label: 'Kampa-Insel', note: 'Herbst: Laub an der Moldau, das schönste Licht der Stadt.' },
      { coord: [50.0835, 14.3954], label: 'Petřín-Hügel', note: 'Sommer: Obstgärten und kühle Höhenluft über der Stadt.' },
      { coord: [50.0640, 14.4178], label: 'Vyšehrad', note: 'Winter: still, weit, fast ohne Touristen — meine Wintertour.' }
    ] },
    { t: 'ornament' },
    { t: 'p', html: 'Wenn Sie mir sagen, wann Sie kommen, baue ich die Route um die Jahreszeit herum. Das ist der Unterschied zwischen einer Tour und <em>Ihrer</em> Tour.' }
  ],
  related: ['48-stunden-prag', 'aussichtspunkte', 'versteckte-hoefe']
},

{
  slug: '48-stunden-prag',
  category: 'Reiserouten',
  title: '48 Stunden in <em>Prag</em>',
  titlePlain: '48 Stunden in Prag',
  cardBlurb: 'Ein durchdachter Spaziergang für ein Wochenende — von der Burg bis zur Moldau, ohne Hetze.',
  readTime: '11 Min.',
  date: 'April 2026',
  hero: 'vltava-bridges-hero.jpg',
  heroCap: 'Die Moldau und ihre Brücken — das Rückgrat jeder guten Prag-Route.',
  standfirst: 'Zwei Tage reichen für das Wesentliche — wenn man die Reihenfolge richtig wählt und früh aufsteht.',
  meta: [ { k: 'Dauer', v: '2 Tage' }, { k: 'Strecke', v: '~7 km' }, { k: 'Beste Zeit', v: 'Mai–Okt' }, { k: 'Niveau', v: 'Aktiv' } ],
  railFacts: { title: 'Auf einen Blick', items: [ { k: 'Tag 1', v: 'Die Höhen' }, { k: 'Tag 2', v: 'Die Tiefe' }, { k: 'Start', v: 'Vor 9 Uhr' }, { k: 'Tickets', v: 'Vorab buchen' } ] },
  blocks: [
    { t: 'p', first: true, html: 'Die häufigste Frage, die ich höre: „Wir haben nur ein Wochenende — was sollen wir sehen?“ Hier ist die Route, die ich Freunden gebe. Sie folgt nicht der Landkarte, sondern dem Licht und den Menschenmengen.' },
    { t: 'h2', html: 'Tag eins — die <em>Höhen</em>' },
    { t: 'p', html: 'Beginnen Sie oben, auf der Prager Burg, möglichst vor 9 Uhr. Von dort führt der Weg bergab durch die Kleinseite, über die Karlsbrücke (die am Morgen noch atmen kann) bis in die Altstadt. So gehen Sie mit dem Strom statt gegen ihn — und gegen das Licht.' },
    { t: 'callout', label: 'Reihenfolge ist alles', html: '<p>Die meisten Besucher laufen die Strecke andersherum und stehen mittags im Gedränge auf der Brücke. Gehen Sie <strong>von oben nach unten</strong> und <strong>von Ost nach West am Morgen</strong> — die Sonne im Rücken, die Menge vor Ihnen.</p>' },
    { t: 'map', title: 'Tag 1 · von der Burg zur Altstadt', route: true, list: true, cap: 'Bergab und ostwärts: rund 3,5 km, gut einen halben Tag mit Pausen.', points: [
      { coord: [50.0911, 14.4016], label: 'Prager Burg', note: '8:30 Uhr, vor dem Andrang. St.-Veits-Dom zuerst.' },
      { coord: [50.0879, 14.4030], label: 'Kleinseitner Ring', note: 'St.-Niklas-Kirche, dann hinab Richtung Fluss.' },
      { coord: [50.0863, 14.4067], label: 'Lennon-Mauer', note: 'Ein kurzer Abstecher auf der Kampa-Insel.' },
      { coord: [50.0865, 14.4114], label: 'Karlsbrücke', note: 'Am Vormittag noch begehbar. Ostwärts laufen.' },
      { coord: [50.0875, 14.4213], label: 'Altstädter Ring', note: 'Astronomische Uhr, Teynkirche, Mittagspause.' }
    ] },
    { t: 'h2', html: 'Tag zwei — die <em>Tiefe</em>' },
    { t: 'p', html: 'Der zweite Tag gehört den Schichten unter der Oberfläche: das jüdische Viertel Josefov am Morgen (akkreditierte Führung empfohlen), das Pulver­tor und das Jugendstil-Repräsentationshaus, und am Nachmittag ein Aufstieg auf den Petřín für den Blick zurück über alles, was Sie gesehen haben.' },
    { t: 'p', html: 'Wer noch Kraft hat, schließt mit einem Spaziergang nach Vyšehrad ab — der zweiten Burg der Stadt, fast ohne Touristen, mit dem Friedhof der tschechischen Dichter und Komponisten.' },
    { t: 'quote', html: 'Zwei Tage sind genug, um sich zu verlieben. Sie sind nie genug, um zu gehen.', by: 'Zuzana' },
    { t: 'ornament' },
    { t: 'p', html: 'Diese Route lässt sich in jede Richtung dehnen oder stauchen. Schreiben Sie mir, wie viel Zeit Sie haben — und wie schnell Sie gehen.' }
  ],
  related: ['prager-burg', 'aussichtspunkte', 'karlsbruecke-statuen']
},

{
  slug: 'prager-burg',
  category: 'Wahrzeichen',
  title: 'Die Prager Burg: ein <em>Rundgang</em>',
  titlePlain: 'Die Prager Burg: ein Rundgang',
  cardBlurb: 'Tausend Jahre auf einem Hügel — wie man den größten Burgkomplex der Welt richtig erläuft.',
  readTime: '10 Min.',
  date: 'März 2026',
  hero: 'st-vitus-night.png',
  heroCap: 'Der St.-Veits-Dom bei Nacht — das Herz der Burg.',
  standfirst: 'Der größte zusammenhängende Burgkomplex der Welt lässt sich nicht „abhaken“. Aber er lässt sich lesen.',
  meta: [ { k: 'Areal', v: 'Größtes der Welt' }, { k: 'Dauer', v: '2–3 Std.' }, { k: 'Beste Zeit', v: 'Vor 10 Uhr' }, { k: 'Niveau', v: 'Etwas Steigung' } ],
  railFacts: { title: 'Auf einen Blick', items: [ { k: 'Gegründet', v: '9. Jahrhundert' }, { k: 'Dom', v: 'St. Veit' }, { k: 'Ticket', v: '2 Tage gültig' }, { k: 'Areal', v: 'Eintritt frei' } ] },
  blocks: [
    { t: 'p', first: true, html: 'Die Prager Burg ist kein Gebäude, sondern eine kleine Stadt: Kirchen, Paläste, Gassen und Gärten, gewachsen über elf Jahrhunderte. Wer ohne Plan hineingeht, sieht alles und versteht nichts. Wer die Schichten kennt, liest tausend Jahre an einem Vormittag.' },
    { t: 'h2', html: 'Früh kommen, oben <em>beginnen</em>' },
    { t: 'p', html: 'Seien Sie zur Öffnung da. Der erste Burghof ist still, die Wachablösung noch ungestört. Von dort arbeiten wir uns durch die Höfe bis zum St.-Veits-Dom — und treten ein, bevor die Reisegruppen die Tore füllen.' },
    { t: 'callout', label: 'Praktisches', html: '<p>Mehrere Rundgang-Tickets, gültig zwei Tage; der Zugang zum Areal selbst ist frei, die Innenräume sind kostenpflichtig.</p><ul><li><strong>Sicherheitskontrolle</strong> an den Eingängen — etwas Zeit einplanen.</li><li><strong>Vor 10 Uhr</strong> oder nach 15 Uhr ist es am ruhigsten.</li><li>Preise und Öffnungszeiten ändern sich saisonal — ich prüfe sie vor jeder Tour.</li></ul>' },
    { t: 'map', title: 'Rundgang über das Burgareal', route: true, list: true, cap: 'Von Ost nach West, leicht bergab — etwa 1,5 km, zwei bis drei Stunden mit Innenräumen.', points: [
      { coord: [50.0894, 14.3984], label: 'Hradschiner Platz', note: 'Start am Haupttor mit der Wachablösung.' },
      { coord: [50.0909, 14.4006], label: 'St.-Veits-Dom', note: 'Mucha-Fenster, Wenzelskapelle, das Grab des hl. Johannes Nepomuk.' },
      { coord: [50.0908, 14.4022], label: 'Alter Königspalast', note: 'Der Vladislav-Saal und der Ort des Prager Fenstersturzes.' },
      { coord: [50.0911, 14.4030], label: 'St.-Georgs-Basilika', note: 'Die älteste erhaltene Kirche der Burg, romanisch und schlicht.' },
      { coord: [50.0920, 14.4045], label: 'Goldenes Gässchen', note: 'Winzige Häuschen, Alchemisten-Legenden, Kafkas Schreibstube (Nr. 22).' }
    ] },
    { t: 'h2', html: 'Das eine Fenster, das man <em>nicht</em> verpassen darf' },
    { t: 'p', html: 'Im St.-Veits-Dom, links vom Eingang, leuchtet ein Glasfenster von Alfons Mucha. Es ist kein mittelalterliches Glas, sondern Jugendstil von 1931 — und im Nachmittagslicht beginnt es zu glühen. Die meisten laufen daran vorbei. Wir nicht.' },
    { t: 'quote', html: 'Eine Burg ist kein Stein. Sie ist die Summe der Menschen, die durch sie hindurchgingen.', by: 'Zuzana' },
    { t: 'ornament' },
    { t: 'p', html: 'Die Burg lohnt eine eigene, ruhige Tour — gerade weil so viele sie im Eiltempo durchqueren. Lassen Sie uns die Zeit nehmen, die sie verdient.' }
  ],
  related: ['48-stunden-prag', 'mala-strana', 'aussichtspunkte']
},

{
  slug: 'josefov',
  category: 'Geschichte',
  title: 'Josefov: das <em>jüdische</em> Viertel',
  titlePlain: 'Josefov: das jüdische Viertel',
  cardBlurb: 'Sechs Synagogen, ein alter Friedhof und tausend Jahre Geschichte — geführt mit Akkreditierung.',
  readTime: '12 Min.',
  date: 'Februar 2026',
  hero: 'josefov.jpg',
  heroCap: 'Die Klausen-Synagoge am Alten Jüdischen Friedhof.',
  standfirst: 'Das kleinste Viertel Prags trägt die schwerste Geschichte. Es will langsam gelesen werden.',
  meta: [ { k: 'Stätten', v: '6' }, { k: 'Dauer', v: '2–3 Std.' }, { k: 'Geschlossen', v: 'Schabbat' }, { k: 'Niveau', v: 'Gemütlich' } ],
  railFacts: { title: 'Auf einen Blick', items: [ { k: 'Verwaltung', v: 'Jüd. Museum' }, { k: 'Ticket', v: 'Kombiticket' }, { k: 'Kippa', v: 'Am Eingang' }, { k: 'Fotos', v: 'Teils untersagt' } ] },
  blocks: [
    { t: 'p', first: true, html: 'Josefov ist auf der Karte winzig — ein paar Gassen zwischen Altstädter Ring und Fluss. Doch kein anderer Teil Prags verlangt so viel Aufmerksamkeit. Hier liegen tausend Jahre jüdischen Lebens, jüdischer Gelehrsamkeit und jüdischen Leids dicht beieinander.' },
    { t: 'p', html: 'Ich führe dieses Viertel mit der Akkreditierung des Jüdischen Museums in Prag. Das ist kein Formalismus — es bedeutet, dass ich die Räume betreten und ihre Geschichten mit der nötigen Sorgfalt erzählen darf.' },
    { t: 'h2', html: 'Was das <em>Museum</em> umfasst' },
    { t: 'p', html: 'Die meisten Stätten gehören zum Jüdischen Museum und teilen sich ein Kombiticket: die Pinkas-Synagoge mit den Namen der 80.000 böhmischen und mährischen Opfer der Schoa, der Alte Jüdische Friedhof mit seinen verschobenen Grabsteinen, die Klausen-, die Maisel- und die prächtige Spanische Synagoge.' },
    { t: 'callout', label: 'Vor dem Besuch', html: '<ul><li>Die <strong>Alt-Neu-Synagoge</strong> wird separat verwaltet und hat eigene Zeiten.</li><li><strong>Freitagnachmittag und samstags</strong> (Schabbat) sind die Stätten geschlossen.</li><li>Männer erhalten am Eingang eine <strong>Kippa</strong>; um respektvolle Kleidung wird gebeten.</li><li>Fotografieren ist in mehreren Innenräumen nicht gestattet.</li></ul>' },
    { t: 'map', title: 'Die Stationen von Josefov', route: true, list: true, cap: 'Ein kompakter Rundgang von etwa 1 km — aber planen Sie zwei bis drei Stunden ein.', points: [
      { coord: [50.0902, 14.4181], label: 'Alt-Neu-Synagoge', note: 'Europas älteste aktive Synagoge, um 1270. Heimat der Golem-Legende.' },
      { coord: [50.0897, 14.4167], label: 'Pinkas-Synagoge', note: 'Die handgeschriebenen Namen der Schoa-Opfer. Der stillste Raum Prags.' },
      { coord: [50.0888, 14.4170], label: 'Alter Jüdischer Friedhof', note: 'Bis zu zwölf Schichten Gräber, über 12.000 Steine.' },
      { coord: [50.0905, 14.4196], label: 'Spanische Synagoge', note: 'Maurischer Prunk im Inneren — atemberaubend restauriert.' }
    ] },
    { t: 'quote', html: 'Hier spricht man nicht über Steine. Man spricht über Menschen, die einmal hier wohnten.', by: 'Zuzana' },
    { t: 'h2', html: 'Der <em>Golem</em> und die Wahrheit dahinter' },
    { t: 'p', html: 'Jeder kennt die Legende vom Golem, den Rabbi Löw aus Moldau-Lehm geformt haben soll. Ich erzähle sie gern — aber ich erzähle auch, warum eine verfolgte Gemeinde eine Geschichte über einen unbesiegbaren Beschützer brauchte. Legenden sind selten nur Legenden.' },
    { t: 'ornament' },
    { t: 'p', html: 'Josefov ist kein Ort zum Abhaken. Wenn Sie es mit mir besuchen, gehen wir langsam und sprechen leise. Manche Geschichten verlangen das.' }
  ],
  related: ['48-stunden-prag', 'kafka', 'versteckte-hoefe'],
  note: 'Fotos des jüdischen Viertels sind Eigentum des Jüdischen Museums in Prag und sollten in Produktion entsprechend gekennzeichnet werden.'
},

{
  slug: 'versteckte-hoefe',
  category: 'Verstecktes Prag',
  title: 'Versteckte <em>Höfe</em> & Passagen',
  titlePlain: 'Versteckte Höfe und Passagen',
  cardBlurb: 'Sieben Innenhöfe und Durchgänge, die kein Reiseführer kennt — und wie Sie hineinkommen.',
  readTime: '8 Min.',
  date: 'Januar 2026',
  hero: 'hidden-gems.jpg',
  heroCap: 'Ein stiller Innenhof, wenige Schritte vom Trubel entfernt.',
  standfirst: 'Die Prager Altstadt hat ein zweites, verborgenes Erdgeschoss — wenn man weiß, durch welche Tür man geht.',
  meta: [ { k: 'Strecke', v: '~2 km' }, { k: 'Dauer', v: '2 Std.' }, { k: 'Beste Zeit', v: 'Vormittag' }, { k: 'Niveau', v: 'Gemütlich' } ],
  railFacts: { title: 'Auf einen Blick', items: [ { k: 'Höfe', v: 'Tagsüber offen' }, { k: 'Wohnhöfe', v: 'Privat — leise' }, { k: 'Licht', v: 'Früh am besten' }, { k: 'Eintritt', v: 'Frei' } ] },
  blocks: [
    { t: 'p', first: true, html: 'Prag ist eine Stadt der Durchgänge. Hinter unscheinbaren Fassaden öffnen sich Höfe, Glasdach-Passagen und Gärten, die kaum ein Tagesbesucher je sieht. Man muss nur den Mut haben, durch eine offene Tür zu gehen.' },
    { t: 'h2', html: 'Die Kunst, eine <em>Tür</em> zu öffnen' },
    { t: 'p', html: 'Viele dieser Höfe sind tagsüber öffentlich zugänglich, auch wenn nichts es ankündigt. Das Repräsentationshaus, die Klementinum-Höfe, die Passagen rund um den Wenzelsplatz — sie alle verbergen Ruheinseln zwei Schritte neben dem Strom.' },
    { t: 'callout', label: 'Knigge für Höfe', html: '<ul><li>Sind die Tore offen, ist der Hof in der Regel <strong>tagsüber zugänglich</strong>.</li><li>Wohnhöfe sind privat — <strong>leise sein</strong>, nicht in Fenster fotografieren.</li><li>Die schönsten Lichtmomente sind <strong>am frühen Vormittag</strong>.</li></ul>' },
    { t: 'map', title: 'Höfe & Passagen der Altstadt', route: true, list: true, cap: 'Ein loser Rundgang; die meisten Stationen liegen wenige Gehminuten auseinander.', points: [
      { coord: [50.0865, 14.4163], label: 'Klementinum', note: 'Barocke Höfe und die schönste Bibliothek der Stadt.' },
      { coord: [50.0872, 14.4205], label: 'Passagen am Altstädter Ring', note: 'Glasüberdachte Durchgänge zwischen den Gassen.' },
      { coord: [50.0879, 14.4283], label: 'Repräsentationshaus', note: 'Jugendstil-Innenhof und Café, oft übersehen.' },
      { coord: [50.0820, 14.4255], label: 'Passagen am Wenzelsplatz', note: 'Lucerna-Passage mit dem auf dem Kopf hängenden Pferd.' }
    ] },
    { t: 'quote', html: 'Die schönsten Orte Prags haben keine Schilder. Sie haben nur offene Türen.', by: 'Zuzana' },
    { t: 'p', html: 'Mein Favorit bleibt die Lucerna-Passage mit David Černýs Skulptur des heiligen Wenzel, der auf einem toten, kopfüber hängenden Pferd reitet — eine ironische Antwort auf das berühmte Reiterstandbild draußen auf dem Platz.' },
    { t: 'ornament' },
    { t: 'p', html: 'Auf meinen Touren durch das verborgene Prag verbringen wir mehr Zeit abseits der Hauptgassen als auf ihnen. Genau dort beginnt die Stadt zu flüstern.' }
  ],
  related: ['kaffeehaeuser', 'mala-strana', 'jugendstil-kubismus']
}

);
