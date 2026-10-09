import React from 'react';
import Link from 'next/link';
import { BRAND } from '../brand';
import '../styles/karlsbruecke-landing.css';

/**
 * /prag/karlsbruecke: landing page "Karlsbrücke und Prager Burg"
 * (design_handoff_karlsbruecke_prager_burg, AIDA flow). German only.
 * Header and footer come from the site layout; the footer's dark CTA band is
 * the design's band, so it is not repeated here.
 */

const BOOK = '/book?tour=Karlsbr%C3%BCcke%20und%20Prager%20Burg#contact-title';
const MAIL = `mailto:${BRAND.email}?subject=Anfrage%20Karlsbr%C3%BCcke%20und%20Prager%20Burg`;
const WA = `https://wa.me/${BRAND.phoneRaw.replace(/\D/g, '')}`;

export const KARLSBRUECKE_FAQ = [
  { q: 'Wird die Tour auf Deutsch gehalten?', a: 'Ja. Die Tour findet auf Deutsch statt und ist auf Ihre Fragen abgestimmt.' },
  { q: 'Lassen sich beide Orte an einem Tag besuchen?', a: 'Ja. Ich plane die Reihenfolge nach Ihrer Zeit, Ihrem Tempo und dem Licht.' },
  { q: 'Sind Eintrittskarten enthalten?', a: 'Nein. Wir klären vorab, welche Eintrittskarten sich für Ihre Zeit lohnen.' },
  { q: 'Kann ich die Route anpassen?', a: 'Ja. Sie sagen mir, was Sie interessiert, und wir planen den Rundgang gemeinsam.' },
];

const Arrow = () => (
  <span aria-hidden className="material-symbols-outlined">arrow_forward</span>
);

const KarlsbrueckePage: React.FC = () => (
  <>
    <article className="kb">
      {/* ── 1 · Aufmerksamkeit ───────────────────────────────── */}
      <section id="aufmerksamkeit" className="kb-section kb-section--hero">
        <nav aria-label="Breadcrumb" className="kb-crumb">
          <Link href="/">Start</Link> / <Link href="/tours">Stadtführung Prag</Link> / Karlsbrücke und Prager Burg
        </nav>
        <span className="kb-kicker">Prag Stadtführer auf Deutsch</span>
        <h1 className="kb-h1">
          Karlsbrücke und Prager Burg mit einer <em>Stadtführerin</em> erleben
        </h1>
        <p className="kb-lead">
          Zwei Orte, die fast jeder Prag-Besucher sehen will. Mit einer zertifizierten Expertin sehen Sie dabei mehr als die Fotomotive.
        </p>
        <div className="kb-byline">Von {BRAND.personName} · Aktualisiert Oktober 2026</div>
        <figure className="kb-hero">
          <picture>
            <source
              type="image/webp"
              sizes="(max-width: 1100px) 100vw, 1060px"
              srcSet="/images/hero/prague-hero-640.webp 640w, /images/hero/prague-hero-1080.webp 1080w, /images/hero/prague-hero-1600.webp 1600w"
            />
            <img
              src="/images/hero/prague-hero-1600.jpg"
              alt="Die Karlsbrücke und die Prager Burg in der Abenddämmerung"
              width={1600}
              height={1066}
              fetchPriority="high"
            />
          </picture>
        </figure>
        <div className="kb-btns">
          <Link href={BOOK} className="kb-btn kb-btn--primary">
            Tour anfragen
            <Arrow />
          </Link>
          <a href={MAIL} className="kb-btn kb-btn--outline">E-Mail schreiben</a>
        </div>
      </section>

      {/* ── 2 · Interesse ────────────────────────────────────── */}
      <section id="interesse" className="kb-section">
        <h2 className="kb-h2">Was eine private Führung anders macht</h2>
        <p className="kb-p">
          Eine Gruppe folgt meist einer Fahne und hört einen Satz pro Station. Bei einer privaten Tour bestimmen Sie das Tempo und die Fragen. Ich habe vierzig Jahre Erfahrung darin, Prag so zu erklären, dass es hängen bleibt.
        </p>
        <ul className="kb-facts">
          <li className="kb-fact">
            <div className="kb-fact__value">1986</div>
            <p className="kb-fact__text">Seit diesem Jahr führe ich Gäste durch Prag.</p>
          </li>
          <li className="kb-fact">
            <div className="kb-fact__value">Zertifiziert</div>
            <p className="kb-fact__text">Offizielle tschechische Stadtführer-Zertifizierung und Akkreditierung des Jüdischen Museums.</p>
          </li>
          <li className="kb-fact">
            <div className="kb-fact__value">4,9 / 5</div>
            <p className="kb-fact__text">Bewertung auf TripAdvisor aus 14 Bewertungen.</p>
          </li>
        </ul>
      </section>

      {/* ── 3 · Verlangen ────────────────────────────────────── */}
      <section id="verlangen" className="kb-section">
        <div className="kb-split">
          <figure className="kb-figure">
            <img
              src="/images/web/charles-bridge-night-empty-lesser-town-towers-4x5.webp"
              alt="Die Karlsbrücke bei Nacht mit den Kleinseitner Brückentürmen"
              width={866}
              height={1083}
              loading="lazy"
              decoding="async"
            />
            <figcaption>Die Brücke am Abend</figcaption>
          </figure>
          <div>
            <span className="kb-label">Karlsbrücke</span>
            <h2 className="kb-h2">Die Brücke erzählt mehr als ihre Fotos</h2>
            <p className="kb-p">
              Der Bau der Karlsbrücke begann 1357 unter Karl IV. Sie ersetzte die Judithbrücke, die 1342 bei einem Hochwasser zerstört worden war. Auf ihr stehen 30 Heiligenstatuen, die meisten aus dem Barock.
            </p>
            <p className="kb-p">
              Ich zeige Ihnen, welche Figur welche Geschichte trägt, und erkläre die beiden Brückentürme. Die Kampa-Seite unter den Bögen zeige ich Ihnen auch, wenn Sie fotografieren möchten.
            </p>
          </div>
        </div>

        <div className="kb-split">
          <figure className="kb-figure">
            <img
              src="/images/web/charles-bridge-from-top-beautiful-tourist-amazing-pixabay-original-name__rainhard2-prague-7594788_1920.webp"
              alt="Blick vom Altstädter Brückenturm über die Karlsbrücke zur Kleinseite und zur Prager Burg"
              width={1400}
              height={933}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: '40% 50%' }}
            />
          </figure>
          <div>
            <span className="kb-label">Prager Burg</span>
            <h2 className="kb-h2">Höfe, Dom und das Goldene Gässchen</h2>
            <p className="kb-p">
              Die Prager Burg ist einer der größten zusammenhängenden Burgkomplexe der Welt. Sie war über Jahrhunderte Sitz böhmischer Könige und beherbergt heute den Amtssitz des tschechischen Präsidenten.
            </p>
            <p className="kb-p">
              Wir besuchen den Veitsdom mit der Wenzelskapelle und gehen durch das Goldene Gässchen, dessen kleine Häuser im späten 16. Jahrhundert entstanden.
            </p>
          </div>
        </div>

        <div className="kb-route">
          <div className="kb-route__label">So kann der Tag aussehen</div>
          <p>
            Man überquert die Karlsbrücke Richtung Kleinseite und steigt dann durch die Gassen bergauf. Die Nerudova-Straße führt zum Burgviertel hinauf. Der Anstieg ist moderat, der Weg führt über Kopfsteinpflaster. Mit Fotostopps und Erklärungen sollten Sie mehr Zeit einplanen.
          </p>
          <p>
            Tipp: Die Burg passt gut an den Vormittag. Die Brücke ist am späten Nachmittag und in der blauen Stunde besonders eindrucksvoll.
          </p>
        </div>

        <blockquote className="kb-quote">
          <p>„Zuzanas persönliche Geschichte mit der Stadt macht diese Führung zu etwas völlig Einzigartigem. Absolut unvergesslich.“</p>
          <footer>Thomas K. · TripAdvisor</footer>
        </blockquote>
      </section>

      {/* ── 4 · Einwände ─────────────────────────────────────── */}
      <section id="einwaende" className="kb-section">
        <h2 className="kb-h2">Häufige Fragen</h2>
        <div className="kb-faq">
          {KARLSBRUECKE_FAQ.map(({ q, a }) => (
            <div key={q}>
              <h3>{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5 · Handlung ─────────────────────────────────────── */}
      <section id="handlung" className="kb-cta-wrap">
        <div className="kb-cta">
          <div className="kb-cta__kicker">Private Tour Karlsbrücke und Prager Burg</div>
          <h2 className="kb-cta__h2">Planen wir Ihren Tag in Prag</h2>
          <p className="kb-cta__text">
            Schreiben Sie mir Ihren Reisetermin und Ihre Wünsche. Ich melde mich mit einem Vorschlag für Ihre Route.
          </p>
          <div className="kb-btns">
            <Link href={BOOK} className="kb-btn kb-btn--cream">
              Tour anfragen
              <Arrow />
            </Link>
            <a href={MAIL} className="kb-btn kb-btn--outline-light">E-Mail schreiben</a>
          </div>
          <div className="kb-cta__links">
            <a href={WA} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href={`tel:${BRAND.phoneRaw}`}>{BRAND.phone}</a>
          </div>
        </div>
      </section>

      {/* ── Autorin ──────────────────────────────────────────── */}
      <aside className="kb-author-wrap">
        <div className="kb-author">
          <img src="/images/hero/zuzana-portrait-360.webp" alt="Zuzana Manová" width={88} height={88} loading="lazy" decoding="async" />
          <div className="kb-author__body">
            <div className="kb-author__name">{BRAND.personName}</div>
            <p className="kb-author__bio">
              Zertifizierte Stadtführerin und Expertin für das Jüdische Viertel. Seit 1986 führt sie Gäste durch Prag.
            </p>
            <Link href="/zuzana-manova" className="kb-author__link">Über Zuzana</Link>
          </div>
        </div>
      </aside>
    </article>

    {/* ── Mobile Kontaktleiste (CSS: only below 768px) ─────────── */}
    <nav className="kb-bar" aria-label="Kontakt" data-track-section="mobile-bar">
      <Link href={BOOK} className="kb-bar__main">Tour anfragen</Link>
      <a href={WA} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="kb-bar__wa">WhatsApp</a>
      <a href={MAIL} aria-label="E-Mail">E-Mail</a>
    </nav>
  </>
);

export default KarlsbrueckePage;
