# Zdroje fotek

Evidence všech fotek v `public/images/`: odkud jsou, kdy jsme je získali a pod jakou licencí. Jeden řádek = jeden soubor. Složka `thumbs/` se generuje automaticky z originálů, proto tu není.

Tenhle soubor se na web nenasazuje (blokovaný v `netlify.toml`).

## Nová fotka

1. **Pojmenovat** tak, aby zůstal původní název: `<popis>-<zdroj>-original-name__<původní-název>.jpg`, např. `boat-vltava-boat-trip-pixabay-original-name__edusoft-prague-509921_1920.jpg`. Z původního názvu jde dohledat autor i originál.
2. **Přidat řádek** do tabulky níž: datum stažení, odkaz na stránku fotky (ne jen „Pixabay“) a licenci.
3. **Kredit**, pokud ho licence vyžaduje: v článku vyplnit `credit` (fotka v textu) nebo `heroCredit` (titulní fotka). Na kartách tour a na homepage se kredit nezobrazuje, takové fotky tam nedávat.
4. **Zkomprimovat** (`image-compressor`) na ~200–400 KB.

## Licence ve zkratce

Jen shrnutí. Platí vždy znění na odkazu ke dni stažení, proto zapisujeme datum a odkaz.

- **Pixabay**: [Pixabay Content License](https://pixabay.com/service/license-summary/). Zdarma i komerčně, kredit není nutný, úpravy jsou v pořádku. Nesmí se: prodávat neupravené kopie, nabízet fotky na jiných fotobankách, ukazovat rozpoznatelné lidi v negativním světle, používat značky a loga matoucím způsobem.
- **Unsplash**: [Unsplash License](https://unsplash.com/license). Zdarma i komerčně, kredit není nutný. Nesmí se: prodávat neupravené kopie, skládat z fotek podobnou nebo konkurenční službu. Placené **Unsplash+** má vlastní licenci, zapsat zvlášť.
- **Lidé na fotkách**: Pixabay ani Unsplash nemají jejich souhlas. Nevydávat je za naše hosty nebo reference.

## Legenda

- **Získáno**: datum stažení. `≤ datum` = první commit v gitu, skutečně stažené mohlo být dřív.
- **Kredit**: `–` není potřeba · **tučně** = povinný, přesně tenhle text musí být u fotky · `?` = nevíme.
- `?` kdekoliv = nevíme, doplnit. Originál neznámé fotky jde často najít přes Google Lens nebo TinEye.

## K vyřešení

- `klementinum-library-2.jpg`: screenshot cizí fotky z mapotic.com, práva nejasná. Nahradit.
- `blog-jewish-quarter-2-min.jpg`: na kartě tour (`src/data/tours.ts`) bez povinného kreditu. Vyměnit fotku, nebo kredit doplnit do karty.
- `old-town-square.jpg`: Unsplash+ (Getty Images), placená licence. Bez předplatného nahradit.
- Roman Boed (`blog-gardens-2.jpg`, `klementinum-tower.jpg`): dohledat originál a licenci.
- Fotky od hostů: ověřit, že máme souhlas.

## Fotky

| Soubor | Získáno | Zdroj | Autor | Originál | Licence | Kredit | Poznámka |
|---|---|---|---|---|---|---|---|
| `astronomical-clock-closeup-pixabay-original-name__ajale-astronomical-clock-2689116_1920.jpg` | 2026-10-04 | Pixabay | ajale | [pixabay 2689116](https://pixabay.com/photos/astronomical-clock-2689116/) | Pixabay Content License | – |  |
| `atriumflora-b.jpg` | ≤ 2026-04-13 | Atrium Flora | Atrium Flora | [ocflora.cz](https://www.ocflora.cz/) | ? | **Atrium Flora** | Ověřit podmínky použití. |
| `autumn-prague.jpg` | ≤ 2026-04-13 | Unsplash | Kristi Simko | [unsplash s8cEPRRbaSc](https://unsplash.com/photos/green-grass-field-with-trees-and-mountains-in-the-distance-s8cEPRRbaSc) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `best-tourguide-prag-thumbnail-early-2026.png` | ≤ 2026-04-25 | ? | ? | ? | ? | ? | Náhled pro sdílení (og:image). Vlastní grafika? |
| `bewerten-mala-strana.jpg` | ≤ 2026-10-03 | ? | ? | ? | ? | ? |  |
| `blog-autumn-prague.jpg` | ≤ 2026-04-13 | Unsplash | Kristi Simko | [unsplash s8cEPRRbaSc](https://unsplash.com/photos/green-grass-field-with-trees-and-mountains-in-the-distance-s8cEPRRbaSc) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `blog-best-time-min.jpg` | ≤ 2026-04-12 | Unsplash | Mikhail | luxkstn | [unsplash Mn5dlzaMa3Q](https://unsplash.com/photos/a-bridge-over-a-river-with-a-city-in-the-background-Mn5dlzaMa3Q) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `blog-boat-prague.jpg` | ≤ 2026-04-25 | ? | ? | ? | ? | ? |  |
| `blog-charles-bridge-dog-touch-point-gold-tourist-must-visit.jpg` | ≤ 2026-05-03 | ? | ? | ? | ? | ? |  |
| `blog-charles-bridge-statue-jesus-beautiful-statue-detail.jpg` | ≤ 2026-05-03 | ? | ? | ? | ? | ? |  |
| `blog-charles-bridge-statues-sunny-crowded-bridge.jpg` | ≤ 2026-05-03 | Unsplash | Park Guapo | [unsplash rcZW8u9YYpQ](https://unsplash.com/photos/a-group-of-people-walking-down-a-street-next-to-tall-buildings-rcZW8u9YYpQ) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `blog-day-trips.jpg` | ≤ 2026-04-13 | Unsplash | Olesia Libra | [unsplash DPv4](https://unsplash.com/photos/a-couple-of-people-that-are-walking-down-a-street-psg42e-DPv4) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `blog-food-prague.jpg` | ≤ 2026-04-13 | ? | ? | ? | ? | ? |  |
| `blog-gardens-2.jpg` | ≤ 2026-04-12 | ? | Roman Boed | ? | ? | **Roman Boed** | Kredit podle starého README. Pokud je z Flickru/Wikimedia pod CC BY, musí kredit uvádět i licenci. |
| `blog-gardens.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | – | Podle starého README kredit není potřeba. |
| `blog-havel-2.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `blog-havel.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `blog-hidden-gems-2-min.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `blog-hidden-gems-min.jpg` | ≤ 2026-04-12 | Unsplash | Jiri Horych | [unsplash qwQg](https://unsplash.com/photos/concrete-bridge-with-statues-on-side-YEDAyl-qwQg) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `blog-jewish-quarter-2-min.jpg` | ≤ 2026-04-12 | Židovské muzeum v Praze | Židovské muzeum v Praze | ? | se svolením, povinné uvést držitele práv | **© Jewish Museum in Prague** | ⚠ Použitá na kartě tour (src/data/tours.ts), kde se kredit nezobrazuje. |
| `blog-jewish-quarter-min.jpg` | ≤ 2026-04-12 | Židovské muzeum v Praze | Židovské muzeum v Praze | ? | se svolením, povinné uvést držitele práv | **© Jewish Museum in Prague** |  |
| `blog-kafka-2.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `blog-kafka.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `blog-night-prague-min.jpg` | ≤ 2026-04-12 | Unsplash | Maksim Kriukov | [unsplash 1I8fIU0sHys](https://unsplash.com/photos/brown-concrete-building-under-white-clouds-during-daytime-1I8fIU0sHys) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `blog-ots-terasa.png` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `blog-prague-castle.jpg` | ≤ 2026-04-13 | Unsplash | Alex Aghajanyan | [unsplash ZBmX7S5nBPs](https://unsplash.com/photos/cityscape-with-old-buildings-and-a-bridge-over-river-ZBmX7S5nBPs) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `blog-prague-money.jpg` | ≤ 2026-04-14 | ? | ? | ? | ? | ? |  |
| `blog-prague-tram-with-prague-castle.jpg` | ≤ 2026-04-16 | Unsplash | Denisa-Elena Ficau | [unsplash nqq1DrXaXuc](https://unsplash.com/photos/a-vintage-tram-travels-down-a-historic-european-street-nqq1DrXaXuc) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `blog-prague-tram.jpg` | ≤ 2026-04-16 | ? | ? | ? | ? | ? |  |
| `blog-prague-walk-normal.jpg` | ≤ 2026-04-14 | ? | ? | ? | ? | ? |  |
| `blog-prazsky-hrad-chandelier-top-square-regular-good-illustrative.jpg` | ≤ 2026-05-03 | ? | ? | ? | ? | ? |  |
| `blog-secret-of-secrets-prague.jpg` | ≤ 2026-04-13 | Unsplash | Robert Eklund | [unsplash DOvgKk](https://unsplash.com/photos/topless-man-sitting-on-boat-on-water-during-daytime-E9h_-DOvgKk) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `blog-spring-prague.jpg` | ≤ 2026-04-13 | Unsplash | Radek Kozák | [unsplash mMJ9tE](https://unsplash.com/photos/brown-and-white-concrete-house-7dZn-mMJ9tE) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `blog-summer-prague.jpg` | ≤ 2026-04-13 | Unsplash | Lizixi Zhu | [unsplash mPm7QLj9G50](https://unsplash.com/photos/a-picturesque-fountain-in-a-beautiful-garden-mPm7QLj9G50) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `blog-tropfsteinwand-zwei.png` | ≤ 2026-05-02 | ? | ? | ? | ? | ? |  |
| `blog-tropfsteinwand.png` | ≤ 2026-05-02 | ? | ? | ? | ? | ? |  |
| `blog-visitor-card-best-review-bad-product.png` | ≤ 2026-05-01 | ? | ? | ? | ? | ? |  |
| `blog-winter-cathedral.png` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `blog-winter-ots.png` | ≤ 2026-04-12 | Unsplash | Alisa Anton | [unsplash 4ZbGkCpGOE8](https://unsplash.com/photos/people-standing-near-road-beside-brown-castle-under-white-sky-during-daytime-4ZbGkCpGOE8) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `boat-vltava-boat-trip-pixabay-original-name__edusoft-prague-509921_1920.jpg` | 2026-10-04 | Pixabay | edusoft | [pixabay 509921](https://pixabay.com/photos/prague-509921/) | Pixabay Content License | – |  |
| `boat-vltava.jpg` | ≤ 2026-04-25 | ? | ? | ? | ? | ? |  |
| `charles-bridge-2-min.jpg` | ≤ 2026-04-12 | Unsplash | Cengiz Özarpat | [unsplash sDZ5LN2waJo](https://unsplash.com/photos/a-large-body-of-water-next-to-a-city-sDZ5LN2waJo) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `charles-bridge-aerial-night-heavy-portrait.jpg` | ≤ 2026-07-01 | Unsplash | Andrew Friedrich | [unsplash Gcg3G4](https://unsplash.com/photos/streets-at-night-1GT_-Gcg3G4) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `charles-bridge-from-top-beautiful-tourist-amazing-pixabay-original-name__rainhard2-prague-7594788_1920.jpg` | 2026-10-04 | Pixabay | rainhard2 | [pixabay 7594788](https://pixabay.com/photos/prague-7594788/) | Pixabay Content License | – |  |
| `charles-bridge-hero-1200.jpg` | ≤ 2026-04-13 | Unsplash | Emma Corti | [unsplash QpMmh7YCi9Y](https://unsplash.com/photos/charles-bridge-in-prague-over-the-vltava-river-QpMmh7YCi9Y) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `charles-bridge-hero-1600.jpg` | ≤ 2026-04-13 | Unsplash | Emma Corti | [unsplash QpMmh7YCi9Y](https://unsplash.com/photos/charles-bridge-in-prague-over-the-vltava-river-QpMmh7YCi9Y) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `charles-bridge-hero-800.jpg` | ≤ 2026-04-13 | Unsplash | Emma Corti | [unsplash QpMmh7YCi9Y](https://unsplash.com/photos/charles-bridge-in-prague-over-the-vltava-river-QpMmh7YCi9Y) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `charles-bridge-min.jpg` | ≤ 2026-04-12 | Unsplash | Emma Corti | [unsplash QpMmh7YCi9Y](https://unsplash.com/photos/charles-bridge-in-prague-over-the-vltava-river-QpMmh7YCi9Y) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `charles-bridge-nepomucky-detail.jpg` | ≤ 2026-07-01 | ? | ? | ? | ? | ? |  |
| `charles-bridge-prague-castle-portrait-solo.jpg` | ≤ 2026-07-01 | Unsplash | Zichao Zhang | [unsplash H0VE2QWRKl8](https://unsplash.com/photos/a-person-standing-on-a-bridge-over-water-with-buildings-in-the-background-H0VE2QWRKl8) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `charles-bridge-pretty-picture.jpg` | ≤ 2026-04-16 | Unsplash | Martin Krchnacek | [unsplash OyoaCpMCR0U](https://unsplash.com/photos/gray-concrete-bridge-near-buildings-OyoaCpMCR0U) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `charles-bridge-statue.jpg` | ≤ 2026-07-01 | ? | ? | ? | ? | ? |  |
| `couple-watching-vltava-prague-castle-cloudy-pixabay-original-name__tomasha73-bench-7227972_1920.jpg` | 2026-10-04 | Pixabay | tomasha73 | [pixabay 7227972](https://pixabay.com/photos/bench-7227972/) | Pixabay Content License | – |  |
| `guest-food.jpeg` | ≤ 2026-04-25 | hosté | ? | ? | svolení hostů | – | Ověřit souhlas s použitím na webu (i od lidí na fotce). |
| `guest-night.jpeg` | ≤ 2026-04-25 | hosté | ? | ? | svolení hostů | – | Ověřit souhlas s použitím na webu (i od lidí na fotce). |
| `guest-photo-food.jpeg` | ≤ 2026-04-25 | hosté | ? | ? | svolení hostů | – | Ověřit souhlas s použitím na webu (i od lidí na fotce). |
| `guest-photo-night.jpeg` | ≤ 2026-04-25 | hosté | ? | ? | svolení hostů | – | Ověřit souhlas s použitím na webu (i od lidí na fotce). |
| `guest-photo-tourguide.jpg` | ≤ 2026-04-25 | hosté | ? | ? | svolení hostů | – | Ověřit souhlas s použitím na webu (i od lidí na fotce). |
| `guest-tourguide.jpg` | ≤ 2026-04-25 | hosté | ? | ? | svolení hostů | – | Ověřit souhlas s použitím na webu (i od lidí na fotce). |
| `havel-tour.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `hidden-gems.jpg` | ≤ 2026-07-01 | Unsplash | Jiri Horych | [unsplash qwQg](https://unsplash.com/photos/concrete-bridge-with-statues-on-side-YEDAyl-qwQg) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `jewish-quarter.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `josefov.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `journal-thumb.png` | ≤ 2026-04-25 | ? | ? | ? | ? | ? | Vlastní grafika? |
| `kafka.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `klementinum-library-2.jpg` | ≤ 2026-04-12 | screenshot z mapotic.com | ? | [mapotic.com](https://www.mapotic.com/) | ? | ? | ⚠ Screenshot cizí fotky, práva nejasná. Zjištěno z metadat stažení. |
| `klementinum-library.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `klementinum-tower.jpg` | ≤ 2026-04-12 | ? | Roman Boed | ? | ? | **Roman Boed** | Kredit podle starého README. Pokud je z Flickru/Wikimedia pod CC BY, musí kredit uvádět i licenci. |
| `night-prague.jpg` | ≤ 2026-07-01 | Unsplash | Maksim Kriukov | [unsplash 1I8fIU0sHys](https://unsplash.com/photos/brown-concrete-building-under-white-clouds-during-daytime-1I8fIU0sHys) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `old-town-square-horse-carriage-dusk.jpg` | ≤ 2026-07-01 | Unsplash | Patrick Pahlke | [unsplash Bv16dG_FIkQ](https://unsplash.com/photos/a-large-building-with-a-large-tower-Bv16dG_FIkQ) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `old-town-square-statue.jpg` | ≤ 2026-07-01 | Unsplash | aes | [unsplash umWeLYJloGQ](https://unsplash.com/photos/a-statue-of-a-person-on-a-horse-umWeLYJloGQ) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `old-town-square.jpg` | ≤ 2026-04-12 | Unsplash+ | Getty Images | [unsplash XnIWbaujHec](https://unsplash.com/photos/old-town-square-with-the-church-of-our-lady-of-tyn-aerial-panorama-with-red-roofs-of-houses-in-prague-XnIWbaujHec) | ⚠ Unsplash+ License (placené předplatné) | – | ⚠ Bez aktivního předplatného Unsplash+ ji nesmíme používat. Dohledáno podle otisku obrázku 2026-10-08. |
| `photo-guests-madonna-breathtaking.jpeg` | ≤ 2026-04-26 | hosté | ? | ? | svolení hostů | – | Ověřit souhlas s použitím na webu (i od lidí na fotce). |
| `photo-guests-mala-strana-from-castle.jpeg` | ≤ 2026-04-26 | hosté | ? | ? | svolení hostů | – | Ověřit souhlas s použitím na webu (i od lidí na fotce). |
| `photo-guests-mala-strana.jpeg` | ≤ 2026-04-26 | hosté | ? | ? | svolení hostů | – | Ověřit souhlas s použitím na webu (i od lidí na fotce). |
| `photo-guests-troja-beautiful-zamek--view.jpeg` | ≤ 2026-04-26 | hosté | ? | ? | svolení hostů | – | Ověřit souhlas s použitím na webu (i od lidí na fotce). |
| `Pinkasovasynagoga-min.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `prague-castle-best.jpg` | ≤ 2026-04-16 | Unsplash | Raik Loesche | [unsplash lD6b_wEEg_Y](https://unsplash.com/photos/a-large-cathedral-with-a-clock-on-its-side-lD6b_wEEg_Y) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `prague-castle-cathedral.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `prague-castle-guards-tourist-sunny-day-top-pixabay-original-name__duernsteiner-prague-4925864_1920.jpg` | 2026-10-04 | Pixabay | duernsteiner | [pixabay 4925864](https://pixabay.com/photos/prague-4925864/) | Pixabay Content License | – |  |
| `prague-castle-heart-of-complex-pixabay-original-name__pierre9x6-prague-4313151_1920.jpg` | 2026-10-04 | Pixabay | pierre9x6 | [pixabay 4313151](https://pixabay.com/photos/prague-4313151/) | Pixabay Content License | – |  |
| `prague-castle-near-the-gardens-cobbled-pixabay-original-name__user32212-prague-1978333_1920.jpg` | 2026-10-04 | Pixabay | user32212 | [pixabay 1978333](https://pixabay.com/photos/prague-1978333/) | Pixabay Content License | – |  |
| `prague-castle.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `prague-cathedral-hq.jpg` | ≤ 2026-07-01 | Unsplash | Raik Loesche | [unsplash lD6b_wEEg_Y](https://unsplash.com/photos/a-large-cathedral-with-a-clock-on-its-side-lD6b_wEEg_Y) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `prague-hero.jpg` | ≤ 2026-07-01 | Unsplash | William Zhang | [unsplash 6En4WYsNYXM](https://unsplash.com/photos/charles-bridge-and-prague-castle-6En4WYsNYXM) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `prague-jewish-quarter-old-detail-image.jpg` | ≤ 2026-07-01 | Unsplash | 𝕡𝕒𝕨𝕤 𝕒𝕟𝕕 𝕡𝕣𝕚𝕟𝕥𝕤 | [unsplash d_MgqYwN_OY](https://unsplash.com/photos/old-european-building-with-red-tiled-roofs-and-lamp-post-d_MgqYwN_OY) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `prague-jewish-synagogue.jpg` | ≤ 2026-07-01 | Unsplash | Marie Bellando Mitjans | [unsplash hl3KNUS57wU](https://unsplash.com/photos/a-tall-building-with-a-clock-on-its-side-hl3KNUS57wU) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `prague-old-town-square-tourist.jpg` | ≤ 2026-07-01 | Unsplash | ian kelsall | [unsplash r_99s0uBXEs](https://unsplash.com/photos/people-walking-near-brown-concrete-building-during-daytime-r_99s0uBXEs) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `prague-old-town-view-summery.jpg` | ≤ 2026-07-01 | Unsplash | Nishank Saini | [unsplash mBv9wzfoM5E](https://unsplash.com/photos/historic-cityscape-with-church-spires-framed-by-green-foliage-mBv9wzfoM5E) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `prague-thousands-towers-sunset.jpg` | ≤ 2026-07-01 | Unsplash | Jiri Hajek | [unsplash cTkmpdx1OTw](https://unsplash.com/photos/a-view-of-a-city-from-a-distance-cTkmpdx1OTw) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `prague-view-from-petrin-cherry-blossom-dusk.jpg` | ≤ 2026-07-01 | Unsplash | Lukáš Konvica | [unsplash GFSV1653v7c](https://unsplash.com/photos/the-sun-is-setting-over-the-city-of-prague-GFSV1653v7c) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `st-vitus-night.png` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `stare-zamecke-schody-ceska-vlajka-beautiful-pixabay-original-name__user32212-prague-2211924_1920.jpg` | 2026-10-04 | Pixabay | user32212 | [pixabay 2211924](https://pixabay.com/photos/prague-2211924/) | Pixabay Content License | – |  |
| `stitch/optimized-about-section-variant-2-v2.jpg` | ≤ 2026-04-13 | export z Google Stitch | ? | ? | ? | ? | Původ obrázku v exportu nejasný. |
| `stitch/optimized-about-section-variant-2.jpg` | ≤ 2026-04-13 | export z Google Stitch | ? | ? | ? | ? | Původ obrázku v exportu nejasný. |
| `stitch/prague-tours-blog-header-variant-2.jpg` | ≤ 2026-04-13 | export z Google Stitch | ? | ? | ? | ? | Původ obrázku v exportu nejasný. |
| `strahov-monastery.jpg` | ≤ 2026-04-12 | Unsplash | Hieu Vu Minh | [unsplash o10](https://unsplash.com/photos/photo-of-library-with-religious-embossed-ceiling-He8-FZl-o10) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `vltava-bridges-hero.jpg` | ≤ 2026-07-01 | Unsplash | Mikhail | luxkstn | [unsplash Mn5dlzaMa3Q](https://unsplash.com/photos/a-bridge-over-a-river-with-a-city-in-the-background-Mn5dlzaMa3Q) | Unsplash License | – | Dohledáno podle otisku obrázku 2026-10-08. |
| `young-men-watching-prague-from-bench-viewpoint-view-prague-pixabay-original-name__viktorphotoczky-prague-7852835_1920.jpg` | 2026-10-04 | Pixabay | viktorphotoczky | [pixabay 7852835](https://pixabay.com/photos/prague-7852835/) | Pixabay Content License | – |  |
| `zuzana-portrait.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? | Portrét Zuzany: kdo fotil? |
