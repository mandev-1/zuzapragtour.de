# Handoff: Admin-Dashboard „Kliky a poptávky“ (zuzapragtour.de)

## Overview
Internes Admin-Dashboard für Zuzana Manová (Inhaberin/Redakteurin). Zeigt anonym gemessene Besuche, Klicks und Kontakte (Formular, E-Mail, WhatsApp, Telefon) der Website zuzapragtour.de. Oberfläche auf **Tschechisch**, die Website selbst ist deutsch (Button-Labels, Tour-Namen und Formularwerte bleiben deshalb deutsch).

Sidebar-Bereich **Kliky a poptávky** ist aufklappbar (Chevron) und hat vier Unterbereiche:
1. **Celý web** – bestehendes Dashboard mit 6 Tabs (Přehled, Živě, Obsah, Tlačítka, Návštěvy, Cesty a zdroje)
2. **WhatsApp tlačítko** – wer auf WhatsApp-Buttons klickt, wo, wann, über welchen Weg
3. **Formuláře** – wer die Formularseiten (/book, /contact) öffnet, woher, und wie es ausgeht
4. **Túry** – welche Tourseiten interessieren und woher die Besucher kommen

## About the Design Files
Die Dateien in diesem Bundle sind **Design-Referenzen in HTML** – Prototypen, die Aussehen und Verhalten zeigen, kein Produktionscode. Aufgabe ist, sie im bestehenden Codebase (`prague-tour-guide`, siehe `github.md` im Projekt; Astro/React + Netlify Functions) mit dessen Mustern nachzubauen. `Admin Dashboard v2.dc.html` öffnet sich direkt im Browser (benötigt `support.js` und `admin-stats.js` im selben Ordner).

## Fidelity
**High-fidelity.** Farben, Typografie, Abstände und Interaktionen sind final. Pixelgenau nachbauen.

## Datenmodell (wichtig)
`admin-stats.js` ist eine **Mock-Datenschicht**. Sie simuliert Besuche mit dem Event-Modell aus `src/utils/analytics.ts` und aggregiert wie `netlify/functions/stats.mjs`.

Ein Besuch (`visit`): `{ id, day (0 = heute), hour, minute, dev ('m'|'d'), ref (Referrer-Host oder ''), ev: Event[] }`
Events:
- `{ k:'page', p:'/pfad', t:Sekunden, depth?:25|50|75|100 }`
- `{ k:'click', c:Kategorie, l:Label, a:Seitenbereich, p:'/pfad' }` – Kategorien: whatsapp, email, phone, form, tour, nav, anchor, external, button
- `{ k:'enquiry', c:'enquiry', l:gewählte Tour, a:'booking'|'contact', p }`

Ziele (Kontakt): `enquiry`, sowie Klicks mit `c` ∈ {whatsapp, phone, email}.

**Backend-Anforderungen für die neuen Unterbereiche:** Sie brauchen Daten **auf Session-Ebene** (geordnete Event-Liste pro Besuch), nicht nur Zähler. Zusätzlich noch nicht gemessen und in `analytics.ts`/`track.mjs` zu ergänzen: Stunde des Besuchs, Lesetiefe, Verweildauer pro Seite. Keine Cookies, keine IPs – „Besuch“ = ein Browser-Tab (sessionStorage-ID). Eigene Besuche ausschließen über `?track=off`.

Alle Berechnungen der neuen Ansichten stehen in der Logic-Klasse der DC-Datei: `visitsIn`, `visDen`, `evTimes`, `waList`, `formList`, `tourList`, `waVals`, `formVals`, `toursVals`. Sie respektieren die globalen Filter (Zeitraum, Gerät, Quelle) und berechnen den Vorperiodenvergleich mit denselben Funktionen (`off = 1`).

## Screens / Views

### Globaler Rahmen
- **Sidebar** 236px, `#1A1714`, sticky, volle Höhe. Unter ≤980px Viewport: kompakte Icon-Sidebar 62px.
  - Item „Kliky a poptávky“: aktiv `background rgba(168,134,84,0.16)`, Icon `insights` in `#A88654`. Rechts Chevron-Button 24×24 (`expand_less`/`expand_more`) klappt die Unterpunkte (State `navOpen`, Default offen; Navigation in einen Unterbereich öffnet ihn immer).
  - Unterpunkte: eingerückt `margin-left 21px`, je `padding 7px 10px 7px 15px`, 12.5px, `border-left 2px` (inaktiv `rgba(245,239,228,0.14)`, aktiv `#A88654`), aktiv Text `#F5EFE4` 600 + Hintergrund `rgba(245,239,228,0.08)`, inaktiv Text `rgba(245,239,228,0.62)`.
  - Kompakt-Sidebar: zusätzliche Icons `chat`, `edit_note`, `tour` (44×40).
- **Header** sticky, `rgba(252,251,248,0.94)` + `backdrop-filter: blur(10px)`, Unterkante `1px #D9CFBC`.
  - In Unterbereichen: Eyebrow-Link „Kliky a poptávky ›“ (10.5px, 700, letter-spacing .16em, uppercase, `#8C6A3C`, hover `#6B1F2A`) → zurück zu „Celý web“.
  - H1 Italiana 30px: „Kliky a *poptávky*“ / „WhatsApp *tlačítko*“ (em `#25633A`) / „Poptávkové *formuláře*“ (em `#6B1F2A`) / „Zájem o *túry*“ (em `#8C6A3C`). Em = Cormorant Garamond italic 500.
  - Filterzeile (Gerät, Zeitraum 7/30/90/365, Quelle, Toggle „Porovnat s předchozím obdobím“) gilt in allen Bereichen.
  - Tabs nur in „Celý web“; sonst ersetzt durch 16px Abstand.
- **Content** max-width 1320px, padding `24px clamp(16px,3vw,32px) 64px`, Abschnitte mit `gap 22px`.
- **Karte**: `#FFFFFF`, `1px solid #D9CFBC`, radius 10px, `box-shadow 0 1px 2px rgba(26,23,20,0.04)`, padding `20px 22px`. H3 Italiana 23px/1.15; Beschreibung 12.5px/1.5 `#6B6055`.
- **KPI-Karte**: padding `14px 16px 10px`; Label 10px 700 uppercase .12em `#6B6055`; Wert Italiana 36px; Sub 11.5px; Delta-Pill 11px 700 (grün `#E3F1E6/#25633A`, rot `#F5E6E6/#8A1F1F`, neutral `#F0EBE2/#6B6055`); Sparkline 120×32 SVG. Grid `repeat(auto-fit, minmax(min(100%,190px),1fr))`, gap 14px.
- **Tabellen**: Kopf 10px 700 uppercase .12em `#6B6055`, Unterkante `#D9CFBC`; Zeilen padding 10px, Trenner `#E8DFCC`, hover `#FAF6EC`. Breite Tabellen in `overflow-x:auto` mit `min-width`.
- **Rate-Zelle**: Balken 6px hoch, Breite `min(conv/n/max,1)·48px`, Farbe `#A88654`; bei n<10 grau (`#E0D8C9`, Text `#A89880`), Tooltip „X z Y“.
- **Filter-Chips**: pill, 12px, aktiv `#1A1714`/`#F5EFE4`, inaktiv weiß mit `#D9CFBC` Rand; Zähler 11px opacity .6.
- Footer-Hinweis zur anonymen Messung bleibt in allen Bereichen.

### WhatsApp tlačítko
1. **KPIs (5)**: Kliky na WhatsApp (Δ, Sparkline grün) · Míra kliku = Besuche mit WA-Klick / Besuche (Δ in p. b.) · Podíl na kontaktech = WA-Besuche / Besuche mit Kontakt (Δ) · Z mobilu · Doba do kliku = Median Sekunden vom Besuchsstart bis zum ersten WA-Klick.
2. **Kde na WhatsApp klikají** – Tabelle je Platzierung (Label + Bereich + Seite). Spalten `minmax(170px,1.3fr) minmax(170px,1.5fr) 56px 104px 110px 112px`: Tlačítko („Label“ / Bereich) · Stránka (Name / Typ · URL) · Kliky · Mobil · počítač (Zahlen + 40px Balken) · Podíl kliků (grüner Balken bis 56px) · Klikne z návštěv = eindeutige Besuche mit Klick / Besuche, die die Seite sahen (max 0.25).
3. **Kdo na WhatsApp kliká** – eine Karte mit Grid `minmax(min(100%,280px),1fr)`, gap `26px 36px`, sechs Blöcke mit Eyebrow-Titel (10.5px 700 uppercase .16em `#8C6A3C`) und Balkenzeilen (Label, „n · Anteil“, 5px Balken relativ zum Max, optionale Unterzeile 11px): Zařízení · Odkud přišli (Quellgruppe + Top-2-Hosts + Klickrate je Quelle) · Čím návštěva začala · Prohlídka, kterou si předtím prohlíželi · Co předtím četli (Top 5 Artikel + „Žádný článek“) · Na kolikáté stránce klikli (1/2/3/4+), mit Hinweis wie viele Klicks nach Öffnen des Formulars kamen.
4. **Kdy klikají** (flex 1 1 360px): Satz mit stärkstem 3-Stunden-Fenster und Wochentag; 24 Stundenbalken (Höhe 96px, gap 2px, Grün mit Deckkraft 0.3–1.0 je Wert), Labels alle 3 Std.; 7 Wochentagsbalken (64px).
5. **Cesta ke kliku** (flex 1.4 1 440px): Top 8 Seitenfolgen bis „✓ WhatsApp“ als Chips (wie „Cesty webem“).
6. **Jednotlivé kliky**: Chips nach Seitentyp des Klicks („Z úvodní stránky“, „Z prohlídek“, „Z formuláře“…); Zeilen `100px 24px 120px minmax(0,1fr) 150px 72px 140px`: Kdy · Gerät-Icon · Zdroj (Farbpunkt + Host) · Cesta (letzte 4 Seiten, Klickseite grün hervorgehoben, „+N“ davor) · Tlačítko (Bereich / „Label“) · Do kliku · Zájem o prohlídku. 30 pro Seite, „Zobrazit dalších 30“. Zeile öffnet die bestehende Besuchs-Schublade.

### Formuláře
1. **KPIs (5)**: Otevřeli formulář (% aller Besuche) · Odeslali (Rezervace / Kontakt) · Dokončení (p. b.) · Ozvali se jinak (WA/Tel/E-Mail nach Öffnen, ohne Absenden) · Bez kontaktu (Delta invertiert: Anstieg = rot).
2. **Odkud na formulář přišli** – Segment-Toggle „podle tlačítka / podle stránky“. Spalten `minmax(0,1fr) 76px 76px 90px 112px`: Odkud (Chip + Label, Unterzeile) · Otevřeli · Odeslali (`#6B1F2A`) · Ozvali se jinak (`#25633A`) · Dokončení (max 0.3). „Přímý vstup“ = Formular war Einstiegsseite. Erst 10 Zeilen, dann „Zobrazit všech N“.
3. **Kdo formulář otevírá** (flex 1 1 420px) – Gruppen Zařízení / Zdroj návštěvy / Čím návštěva začala; je Zeile Otevřeli, Odeslali, Dokončení.
4. **Jak to dopadlo** – Balken (10px) für: Odeslali formulář, WhatsApp, Zavolali, E-mail, Pokračovali jinam, Zavřeli web rovnou na formuláři; Hinweisbox `#FAF6EC` mit Median-Verweildauer gesendet vs. nicht gesendet.
5. **Co poptávají** – gewählte Tour im gesendeten Formular („Ich bin noch unentschlossen“ → „Ještě neví“, „(ohne Tour)“ → „Bez prohlídky“, grau).
6. **Jednotlivé návštěvy formuláře** – Chips Vše/Odeslali/Ozvali se jinak/Bez kontaktu; Spalten `100px 24px 120px minmax(0,1fr) 140px 84px 110px`: Kdy · Gerät · Zdroj · Cesta na formulář (letzte 3 Seiten + Chip „Rezervace“/„Kontakt“ in `#F6E7E2/#6B1F2A`, darunter „přes „Label“ · Bereich“) · Zájem · Na formuláři · Výsledek-Pill.

### Túry
1. **KPIs (4)**: Zobrazení prohlídek · Návštěv s prohlídkou · Kontakt potom · Poptávky na prohlídku (Formular mit genau dieser Tour gewählt).
2. **Které túry lidi zajímají** – Spalten `minmax(200px,1fr) 150px 64px 72px 72px 72px 112px`: Túra (Titel / URL) · Zobrazení (Balken `#8C6A3C` + Zahl) · Vstupem (Einstiege) · Ø čas (Median) · Poptávky · WA / tel. · Kontakt potom. Klick auf Zeile wählt die Tour (linker Rand 3px `#6B1F2A`, Hintergrund `#FAF6EC`), erneuter Klick hebt auf.
3. **Odkud na túru přišli** – Kopf: Eyebrow, Name (Italiana 30px) bzw. „Všechny prohlídky“, Button „Všechny túry“ bei Auswahl. Fünf Blöcke: Z jaké stránky přišli · Přes jaké tlačítko · Zdroj návštěvy · Co udělali potom · Zařízení.

## Interactions & Behavior
- Unterbereich wechseln setzt Schublade, Hover und Chart-Hover zurück. „N lidé právě na webu“ und Tabs führen immer zu „Celý web“.
- ⌘K-Palette enthält „Přejít na: WhatsApp tlačítko / Formuláře / Túry“.
- CSV-Button exportiert im jeweiligen Unterbereich: einzelne WA-Klicks, Formularbesuche bzw. Tour-Aufrufe (Semikolon-getrennt, UTF-8 BOM).
- Live-Ticker läuft nur im Tab „Živě“ von „Celý web“.
- Leerzustände: grauer Text `#A89880`, 13px.

## State Management
Neu: `view` ('all'|'wa'|'forms'|'tours'), `navOpen`, `dh` (Chart-Hover), `wf`, `wlimit`, `ff`, `flimit`, `fsMode` ('btn'|'page'), `fsLimit`, `tsel` (Tour-Slug|null). Bestehend: `tab`, `range`, `dev`, `src`, `cmp`, `drawer` usw. Prop `startTab` akzeptiert zusätzlich „WhatsApp tlačítko“, „Formuláře“, „Túry“.
Berechnungen per Filterschlüssel `range|dev|src` memoisiert.

## Design Tokens
- Hintergrund `#FBF9F5`, Karte `#FFFFFF`, Sidebar `#1A1714`
- Text `#1A1714`, `#3A332C`, sekundär `#6B6055`, deaktiviert `#A89880`
- Linien `#D9CFBC`, `#E8DFCC`; Flächen `#F5F1EA`, `#F0EBE2`, `#FAF6EC`, `#FAF8F4`
- Akzent Weinrot `#6B1F2A` (hover `#4F1620`), Gold `#A88654`, Bronze `#8C6A3C`
- Ziele: Formular `#6B1F2A`/`#F6E7E2` · E-Mail `#4A3D7A`/`#EAE6F3` · WhatsApp `#25633A`/`#E3F1E6` · Telefon `#8C6A3C`/`#F3ECDD`
- Quellen: Suche `#1A1714`, Direkt `#A89880`, Social `#B5654A`, Bewertungen `#5E7A5A`, KI `#3D5A80`
- Schrift: Italiana (Titel/Zahlen), Cormorant Garamond italic 500 (Akzentwort), Inter Tight 400–700 (UI, Basis 14px), Material Symbols Outlined (Icons)
- Radien: 4, 6, 8, 10, 999px. Schatten: `0 1px 2px rgba(26,23,20,0.04)`

## Assets
Keine Bilder. Icons: Google Material Symbols Outlined (`insights`, `chat`, `edit_note`, `tour`, `smartphone`, `computer`, `expand_less/more` …).

## Screenshots
Aufgenommen bei ca. 900px Breite (kompakte Sidebar), Zeitraum 30 Tage, Mock-Daten.
- `screenshots/01-admin.png` – Celý web, Tab Přehled
- `screenshots/02-admin.png` – WhatsApp tlačítko, oben (KPIs, Platzierungen)
- `screenshots/03-admin.png` – WhatsApp tlačítko, „Kdo na WhatsApp kliká“
- `screenshots/04-admin.png` – Formuláře, oben (KPIs, „Odkud na formulář přišli“)
- `screenshots/05-admin.png` – Formuláře, Segmente und Ausgang
- `screenshots/06-admin.png` – Túry, oben (KPIs, Tour-Tabelle)
- `screenshots/07-admin.png` – Túry, „Odkud na túru přišli“

## Files
- `Admin Dashboard v2.dc.html` – komplettes Dashboard (Template + Logic-Klasse)
- `admin-stats.js` – Mock-Daten und Aggregation (Form der erwarteten API)
- `support.js` – Laufzeit nur für die Vorschau, nicht übernehmen
