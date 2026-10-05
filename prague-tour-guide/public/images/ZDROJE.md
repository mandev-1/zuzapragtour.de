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
- `strahov-monastery.jpg`: AI obrázek (Gemini) skutečného místa. Zvážit nahrazení skutečnou fotkou.
- Roman Boed (`blog-gardens-2.jpg`, `klementinum-tower.jpg`): dohledat originál a licenci.
- Fotky od hostů: ověřit, že máme souhlas.

## Fotky

| Soubor | Získáno | Zdroj | Autor | Originál | Licence | Kredit | Poznámka |
|---|---|---|---|---|---|---|---|
| `astronomical-clock-closeup-pixabay-original-name__ajale-astronomical-clock-2689116_1920.jpg` | 2026-10-04 | Pixabay | ajale | [pixabay 2689116](https://pixabay.com/photos/astronomical-clock-2689116/) | Pixabay Content License | – |  |
| `atriumflora-b.jpg` | ≤ 2026-04-13 | Atrium Flora | Atrium Flora | [ocflora.cz](https://www.ocflora.cz/) | ? | **Atrium Flora** | Ověřit podmínky použití. |
| `autumn-prague.jpg` | ≤ 2026-04-13 | ? | ? | ? | ? | ? |  |
| `best-tourguide-prag-thumbnail-early-2026.png` | ≤ 2026-04-25 | ? | ? | ? | ? | ? | Náhled pro sdílení (og:image). Vlastní grafika? |
| `bewerten-mala-strana.jpg` | ≤ 2026-10-03 | ? | ? | ? | ? | ? |  |
| `blog-autumn-prague.jpg` | ≤ 2026-04-13 | ? | ? | ? | ? | ? |  |
| `blog-best-time-min.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `blog-boat-prague.jpg` | ≤ 2026-04-25 | ? | ? | ? | ? | ? |  |
| `blog-charles-bridge-dog-touch-point-gold-tourist-must-visit.jpg` | ≤ 2026-05-03 | ? | ? | ? | ? | ? |  |
| `blog-charles-bridge-statue-jesus-beautiful-statue-detail.jpg` | ≤ 2026-05-03 | ? | ? | ? | ? | ? |  |
| `blog-charles-bridge-statues-sunny-crowded-bridge.jpg` | ≤ 2026-05-03 | ? | ? | ? | ? | ? |  |
| `blog-day-trips.jpg` | ≤ 2026-04-13 | ? | ? | ? | ? | ? |  |
| `blog-food-prague.jpg` | ≤ 2026-04-13 | ? | ? | ? | ? | ? |  |
| `blog-gardens-2.jpg` | ≤ 2026-04-12 | ? | Roman Boed | ? | ? | **Roman Boed** | Kredit podle starého README. Pokud je z Flickru/Wikimedia pod CC BY, musí kredit uvádět i licenci. |
| `blog-gardens.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | – | Podle starého README kredit není potřeba. |
| `blog-havel-2.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `blog-havel.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `blog-hidden-gems-2-min.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `blog-hidden-gems-min.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `blog-jewish-quarter-2-min.jpg` | ≤ 2026-04-12 | Židovské muzeum v Praze | Židovské muzeum v Praze | ? | se svolením, povinné uvést držitele práv | **© Jewish Museum in Prague** | ⚠ Použitá na kartě tour (src/data/tours.ts), kde se kredit nezobrazuje. |
| `blog-jewish-quarter-min.jpg` | ≤ 2026-04-12 | Židovské muzeum v Praze | Židovské muzeum v Praze | ? | se svolením, povinné uvést držitele práv | **© Jewish Museum in Prague** |  |
| `blog-kafka-2.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `blog-kafka.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `blog-night-prague-min.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `blog-ots-terasa.png` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `blog-prague-castle.jpg` | ≤ 2026-04-13 | ? | ? | ? | ? | ? |  |
| `blog-prague-money.jpg` | ≤ 2026-04-14 | ? | ? | ? | ? | ? |  |
| `blog-prague-tram-with-prague-castle.jpg` | ≤ 2026-04-16 | ? | ? | ? | ? | ? |  |
| `blog-prague-tram.jpg` | ≤ 2026-04-16 | ? | ? | ? | ? | ? |  |
| `blog-prague-walk-normal.jpg` | ≤ 2026-04-14 | ? | ? | ? | ? | ? |  |
| `blog-prazsky-hrad-chandelier-top-square-regular-good-illustrative.jpg` | ≤ 2026-05-03 | ? | ? | ? | ? | ? |  |
| `blog-secret-of-secrets-prague.jpg` | ≤ 2026-04-13 | ? | ? | ? | ? | ? |  |
| `blog-spring-prague.jpg` | ≤ 2026-04-13 | ? | ? | ? | ? | ? |  |
| `blog-summer-prague.jpg` | ≤ 2026-04-13 | ? | ? | ? | ? | ? |  |
| `blog-tropfsteinwand-zwei.png` | ≤ 2026-05-02 | ? | ? | ? | ? | ? |  |
| `blog-tropfsteinwand.png` | ≤ 2026-05-02 | ? | ? | ? | ? | ? |  |
| `blog-visitor-card-best-review-bad-product.png` | ≤ 2026-05-01 | ? | ? | ? | ? | ? |  |
| `blog-winter-cathedral.png` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `blog-winter-ots.png` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `boat-vltava-boat-trip-pixabay-original-name__edusoft-prague-509921_1920.jpg` | 2026-10-04 | Pixabay | edusoft | [pixabay 509921](https://pixabay.com/photos/prague-509921/) | Pixabay Content License | – |  |
| `boat-vltava.jpg` | ≤ 2026-04-25 | ? | ? | ? | ? | ? |  |
| `charles-bridge-2-min.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `charles-bridge-aerial-night-heavy-portrait.jpg` | ≤ 2026-07-01 | ? | ? | ? | ? | ? |  |
| `charles-bridge-from-top-beautiful-tourist-amazing-pixabay-original-name__rainhard2-prague-7594788_1920.jpg` | 2026-10-04 | Pixabay | rainhard2 | [pixabay 7594788](https://pixabay.com/photos/prague-7594788/) | Pixabay Content License | – |  |
| `charles-bridge-hero-1200.jpg` | ≤ 2026-04-13 | ? | ? | ? | ? | ? | Zmenšenina charles-bridge-hero-1600.jpg. |
| `charles-bridge-hero-1600.jpg` | ≤ 2026-04-13 | ? | ? | ? | ? | ? |  |
| `charles-bridge-hero-800.jpg` | ≤ 2026-04-13 | ? | ? | ? | ? | ? | Zmenšenina charles-bridge-hero-1600.jpg. |
| `charles-bridge-min.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `charles-bridge-nepomucky-detail.jpg` | ≤ 2026-07-01 | ? | ? | ? | ? | ? |  |
| `charles-bridge-prague-castle-portrait-solo.jpg` | ≤ 2026-07-01 | ? | ? | ? | ? | ? |  |
| `charles-bridge-pretty-picture.jpg` | ≤ 2026-04-16 | ? | ? | ? | ? | ? |  |
| `charles-bridge-statue.jpg` | ≤ 2026-07-01 | ? | ? | ? | ? | ? |  |
| `couple-watching-vltava-prague-castle-cloudy-pixabay-original-name__tomasha73-bench-7227972_1920.jpg` | 2026-10-04 | Pixabay | tomasha73 | [pixabay 7227972](https://pixabay.com/photos/bench-7227972/) | Pixabay Content License | – |  |
| `guest-food.jpeg` | ≤ 2026-04-25 | hosté | ? | ? | svolení hostů | – | Ověřit souhlas s použitím na webu (i od lidí na fotce). |
| `guest-night.jpeg` | ≤ 2026-04-25 | hosté | ? | ? | svolení hostů | – | Ověřit souhlas s použitím na webu (i od lidí na fotce). |
| `guest-photo-food.jpeg` | ≤ 2026-04-25 | hosté | ? | ? | svolení hostů | – | Ověřit souhlas s použitím na webu (i od lidí na fotce). |
| `guest-photo-night.jpeg` | ≤ 2026-04-25 | hosté | ? | ? | svolení hostů | – | Ověřit souhlas s použitím na webu (i od lidí na fotce). |
| `guest-photo-tourguide.jpg` | ≤ 2026-04-25 | hosté | ? | ? | svolení hostů | – | Ověřit souhlas s použitím na webu (i od lidí na fotce). |
| `guest-tourguide.jpg` | ≤ 2026-04-25 | hosté | ? | ? | svolení hostů | – | Ověřit souhlas s použitím na webu (i od lidí na fotce). |
| `havel-tour.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `hidden-gems.jpg` | ≤ 2026-07-01 | ? | ? | ? | ? | ? |  |
| `jewish-quarter.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `josefov.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `journal-thumb.png` | ≤ 2026-04-25 | ? | ? | ? | ? | ? | Vlastní grafika? |
| `kafka.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `klementinum-library-2.jpg` | ≤ 2026-04-12 | screenshot z mapotic.com | ? | [mapotic.com](https://www.mapotic.com/) | ? | ? | ⚠ Screenshot cizí fotky, práva nejasná. Zjištěno z metadat stažení. |
| `klementinum-library.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `klementinum-tower.jpg` | ≤ 2026-04-12 | ? | Roman Boed | ? | ? | **Roman Boed** | Kredit podle starého README. Pokud je z Flickru/Wikimedia pod CC BY, musí kredit uvádět i licenci. |
| `night-prague.jpg` | ≤ 2026-07-01 | ? | ? | ? | ? | ? |  |
| `old-town-square-horse-carriage-dusk.jpg` | ≤ 2026-07-01 | ? | ? | ? | ? | ? |  |
| `old-town-square-statue.jpg` | ≤ 2026-07-01 | ? | ? | ? | ? | ? |  |
| `old-town-square.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `photo-guests-madonna-breathtaking.jpeg` | ≤ 2026-04-26 | hosté | ? | ? | svolení hostů | – | Ověřit souhlas s použitím na webu (i od lidí na fotce). |
| `photo-guests-mala-strana-from-castle.jpeg` | ≤ 2026-04-26 | hosté | ? | ? | svolení hostů | – | Ověřit souhlas s použitím na webu (i od lidí na fotce). |
| `photo-guests-mala-strana.jpeg` | ≤ 2026-04-26 | hosté | ? | ? | svolení hostů | – | Ověřit souhlas s použitím na webu (i od lidí na fotce). |
| `photo-guests-troja-beautiful-zamek--view.jpeg` | ≤ 2026-04-26 | hosté | ? | ? | svolení hostů | – | Ověřit souhlas s použitím na webu (i od lidí na fotce). |
| `Pinkasovasynagoga-min.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `prague-castle-best.jpg` | ≤ 2026-04-16 | ? | ? | ? | ? | ? |  |
| `prague-castle-cathedral.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `prague-castle-guards-tourist-sunny-day-top-pixabay-original-name__duernsteiner-prague-4925864_1920.jpg` | 2026-10-04 | Pixabay | duernsteiner | [pixabay 4925864](https://pixabay.com/photos/prague-4925864/) | Pixabay Content License | – |  |
| `prague-castle-heart-of-complex-pixabay-original-name__pierre9x6-prague-4313151_1920.jpg` | 2026-10-04 | Pixabay | pierre9x6 | [pixabay 4313151](https://pixabay.com/photos/prague-4313151/) | Pixabay Content License | – |  |
| `prague-castle-near-the-gardens-cobbled-pixabay-original-name__user32212-prague-1978333_1920.jpg` | 2026-10-04 | Pixabay | user32212 | [pixabay 1978333](https://pixabay.com/photos/prague-1978333/) | Pixabay Content License | – |  |
| `prague-castle.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `prague-cathedral-hq.jpg` | ≤ 2026-07-01 | ? | ? | ? | ? | ? |  |
| `prague-hero.jpg` | ≤ 2026-07-01 | ? | ? | ? | ? | ? |  |
| `prague-jewish-quarter-old-detail-image.jpg` | ≤ 2026-07-01 | ? | ? | ? | ? | ? |  |
| `prague-jewish-synagogue.jpg` | ≤ 2026-07-01 | ? | ? | ? | ? | ? |  |
| `prague-old-town-square-tourist.jpg` | ≤ 2026-07-01 | ? | ? | ? | ? | ? |  |
| `prague-old-town-view-summery.jpg` | ≤ 2026-07-01 | ? | ? | ? | ? | ? |  |
| `prague-thousands-towers-sunset.jpg` | ≤ 2026-07-01 | ? | ? | ? | ? | ? |  |
| `prague-view-from-petrin-cherry-blossom-dusk.jpg` | ≤ 2026-07-01 | ? | ? | ? | ? | ? |  |
| `st-vitus-night.png` | ≤ 2026-04-12 | ? | ? | ? | ? | ? |  |
| `stare-zamecke-schody-ceska-vlajka-beautiful-pixabay-original-name__user32212-prague-2211924_1920.jpg` | 2026-10-04 | Pixabay | user32212 | [pixabay 2211924](https://pixabay.com/photos/prague-2211924/) | Pixabay Content License | – |  |
| `stitch/optimized-about-section-variant-2-v2.jpg` | ≤ 2026-04-13 | export z Google Stitch | ? | ? | ? | ? | Původ obrázku v exportu nejasný. |
| `stitch/optimized-about-section-variant-2.jpg` | ≤ 2026-04-13 | export z Google Stitch | ? | ? | ? | ? | Původ obrázku v exportu nejasný. |
| `stitch/prague-tours-blog-header-variant-2.jpg` | ≤ 2026-04-13 | export z Google Stitch | ? | ? | ? | ? | Původ obrázku v exportu nejasný. |
| `strahov-monastery.jpg` | ≤ 2026-04-12 | AI: Gemini (přes Perplexity) | – | [gemini_images/…](https://user-gen-media-assets.s3.amazonaws.com/gemini_images/5355d097-67ed-41fb-9b29-7e54b5d0a700.png) | – (AI výstup) | – | Zjištěno z metadat stažení. AI obrázek skutečného místa. |
| `vltava-bridges-hero.jpg` | ≤ 2026-07-01 | ? | ? | ? | ? | ? |  |
| `young-men-watching-prague-from-bench-viewpoint-view-prague-pixabay-original-name__viktorphotoczky-prague-7852835_1920.jpg` | 2026-10-04 | Pixabay | viktorphotoczky | [pixabay 7852835](https://pixabay.com/photos/prague-7852835/) | Pixabay Content License | – |  |
| `zuzana-portrait.jpg` | ≤ 2026-04-12 | ? | ? | ? | ? | ? | Portrét Zuzany: kdo fotil? |
