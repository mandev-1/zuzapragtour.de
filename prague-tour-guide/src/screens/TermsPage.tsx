'use client';

/**
 * TermsPage — /terms (Allgemeine Geschäftsbedingungen / Terms & Conditions).
 *
 * Premium "quiet-luxury editorial" treatment: the shared PageBanner header
 * band over the warm-white `premium-inner` ground, then a narrow, centred
 * (~720px) prose column with hairline-separated sections and restrained
 * fade-up reveals. The chrome is deliberately identical to PrivacyPage so the
 * two legal pages read as a matched pair. All legal copy is preserved verbatim
 * and bilingual (EN/DE). Visual source of truth: 0003 handoff site/terms.html.
 */

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { PageBanner, Reveal } from '../components/site/SiteUI';

const LAST_UPDATED = '2026-04-12';

/* Shared literal class strings (kept static so Tailwind JIT can see them).
   Values mirror PrivacyPage so the two legal pages render identically. */
const SECTION = 'mt-[clamp(2rem,4vh,3rem)] border-t border-rule pt-[clamp(2rem,4vh,3rem)]';
const H2 = 'mb-[0.85rem] font-display text-[clamp(1.5rem,2.6vw,2rem)] font-normal leading-[1.15] text-ink';
const P = 'font-body text-[1.05rem] leading-[1.75] text-ink-soft';
const UL =
  'list-disc space-y-3 pl-[1.3rem] font-body text-[1.05rem] leading-[1.7] text-ink-soft marker:text-brass';
const LINK =
  'rounded-sm text-burgundy underline decoration-burgundy/40 underline-offset-2 transition-colors hover:decoration-burgundy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy';

const TermsPage: React.FC = () => {
  const { language } = useLanguage();
  const isDe = language === 'de';

  return (
    <div className="premium-inner">
      <PageBanner
        kicker={isDe ? 'Rechtliches' : 'Legal'}
        title={isDe ? 'Allgemeine Geschäftsbedingungen (AGB)' : 'Terms & Conditions'}
      />

      <div className="mx-auto w-full max-w-[720px] px-[clamp(1.5rem,5vw,5rem)] pb-[clamp(4rem,9vh,7rem)] pt-[clamp(2.5rem,5vh,3.5rem)]">
        {/* ── Last updated + lead ─────────────────────────────────── */}
        <Reveal>
          <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-ink-mute">
            {isDe ? 'Stand:' : 'Last updated:'} {LAST_UPDATED}
          </p>
          <p className="mt-[1.4rem] font-body text-[clamp(1.12rem,1.5vw,1.25rem)] leading-[1.7] text-ink-soft">
            {isDe
              ? 'Diese AGB regeln die vertragliche Beziehung zwischen Ihnen als Kundin/Kunde bzw. Teilnehmerin/Teilnehmer und Ing. Zuzana Manová („wir“, „uns“) für private Führungen und Touren unter der Marke Zuza Prague Tours. Mit der Buchung bzw. der Annahme unseres Angebots erkennen Sie diese Bedingungen an, soweit nicht ausdrücklich etwas anderes vereinbart wurde.'
              : 'These terms govern the contractual relationship between you as client or participant and Ing. Zuzana Manová (“we”, “us”) for private guided tours under the Zuza Prague Tours brand. By booking or accepting our offer, you agree to these terms unless expressly agreed otherwise.'}
          </p>
        </Reveal>

        {/* ── Anbieter / Provider ─────────────────────────────────── */}
        <Reveal as="section" className={SECTION}>
          <h2 className={H2}>{isDe ? 'Anbieter' : 'Provider'}</h2>
          <div className="space-y-[1.1rem]">
            <p className={P}>
              Ing. Zuzana Manová · Zuza Prague Tours
              <br />
              {isDe ? 'Tätigkeitsort' : 'Place of business'}: Prague, Czech Republic
              <br />
              IČ: 18897398
              <br />
              {isDe
                ? 'Rechtsform: selbstständige Gewerbetreibende (tschechisches Einzelunternehmen).'
                : 'Legal form: sole trader (Czech trade licence).'}
              <br />
              {isDe ? 'Gewerbeanmeldung seit' : 'Registered since'}: 1 June 1991
            </p>
            <p className={P}>
              Email:{' '}
              <a className={LINK} href="mailto:zuzanamanova@email.cz">
                zuzanamanova@email.cz
              </a>
              <br />
              {isDe ? 'Telefon / WhatsApp' : 'Phone / WhatsApp'}: +420 721 231 933
            </p>
          </div>
        </Reveal>

        {/* ── Leistungsgegenstand / Services ──────────────────────── */}
        <Reveal as="section" className={SECTION}>
          <h2 className={H2}>{isDe ? 'Leistungsgegenstand' : 'Services'}</h2>
          <p className={P}>
            {isDe
              ? 'Wir erbringen geführte Stadtführungen und Touren in Prag und – nach gesonderter Vereinbarung – in der näheren Umgebung. Umfang, Dauer, Sprache, Treffpunkt und Route ergeben sich aus der Buchungsbestätigung oder einer schriftlichen (E-Mail-)Vereinbarung. Öffentliche Eintritte, Tickets für Museen, Verkehrsmittel oder Verköstigungen sind nur geschuldet, wenn dies ausdrücklich vereinbart und ausgewiesen wurde.'
              : 'We provide guided walking tours in Prague and, by separate agreement, in the wider area. Scope, duration, language, meeting point, and route are set out in the booking confirmation or a written (email) agreement. Admission tickets, public transport, meals, or similar costs are only included if expressly agreed and stated.'}
          </p>
        </Reveal>

        {/* ── Vertragsschluss / Contract formation ────────────────── */}
        <Reveal as="section" className={SECTION}>
          <h2 className={H2}>{isDe ? 'Vertragsschluss' : 'Contract formation'}</h2>
          <p className={P}>
            {isDe
              ? 'Anfragen per E-Mail, Telefon, WhatsApp oder über das Formular auf der Website sind unverbindlich. Ein Vertrag kommt erst zustande, wenn wir Ihre Buchung ausdrücklich bestätigen (in der Regel per E-Mail) oder wenn wir die vereinbarte Leistung am vereinbarten Termin erbringen und Sie dies wissen oder billigen müssen.'
              : 'Inquiries by email, phone, WhatsApp, or the website form are non-binding. A contract is formed when we expressly confirm your booking (usually by email) or when we deliver the agreed service at the agreed time with your knowledge or acceptance.'}
          </p>
        </Reveal>

        {/* ── Preise und Zahlung / Prices and payment ─────────────── */}
        <Reveal as="section" className={SECTION}>
          <h2 className={H2}>{isDe ? 'Preise und Zahlung' : 'Prices and payment'}</h2>
          <ul className={UL}>
            <li>
              {isDe
                ? 'Preise werden vor Vertragsschluss mitgeteilt und gelten in der bestätigten Höhe. Sofern nicht anders vereinbart, sind die Preise in EUR oder CZK nach Absprache zu entrichten.'
                : 'Prices are communicated before the contract is concluded and apply as confirmed. Unless otherwise agreed, payment is in EUR or CZK as arranged.'}
            </li>
            <li>
              {isDe
                ? 'Zahlungsmodalitäten (z. B. Barzahlung vor Ort, Überweisung, Zahlungslink) werden individuell vereinbart und in der Buchungsbestätigung festgehalten.'
                : 'Payment methods (e.g. cash on site, bank transfer, payment link) are agreed individually and stated in the booking confirmation.'}
            </li>
            <li>
              {isDe
                ? 'Bei Zahlungsverzug können wir gesetzliche Verzugsfolgen geltend machen und die Leistung nach angemessener Frist verweigern, soweit dies rechtlich zulässig ist.'
                : 'In case of late payment we may charge statutory default consequences and refuse performance after a reasonable period where permitted by law.'}
            </li>
          </ul>
        </Reveal>

        {/* ── Stornierung und Umbuchung / Cancellation and changes ── */}
        <Reveal as="section" className={SECTION}>
          <h2 className={H2}>{isDe ? 'Stornierung und Umbuchung' : 'Cancellation and changes'}</h2>
          <ul className={UL}>
            <li>
              {isDe
                ? 'Stornierung durch Sie: Bis 7 Tage vor vereinbartem Beginn der Tour ist die Stornierung in der Regel kostenfrei, sofern nicht ausdrücklich etwas anderes vereinbart wurde (z. B. bei Sonder- oder Gruppenarrangements).'
                : 'Cancellation by you: cancellation is generally free of charge up to 7 days before the agreed start, unless something different was expressly agreed (e.g. special or group arrangements).'}
            </li>
            <li>
              {isDe
                ? 'Bei späterer Absage oder Nichterscheinen kann ein Ausfallhonorar in angemessener Höhe berechnet werden, soweit wir den Termin nicht anderweitig vergeben können.'
                : 'For late cancellation or no-show, a reasonable cancellation fee may apply if we cannot fill the slot elsewhere.'}
            </li>
            <li>
              {isDe
                ? 'Stornierung oder Änderung durch uns: Bei höherer Gewalt, behördlichen Anordnungen, Krankheit oder anderen wichtigen Gründen können wir einen Termin absagen oder verschieben. Bereits geleistete Zahlungen werden in diesem Fall erstattet oder angerechnet, soweit keine entstandenen Kosten entgegenstehen.'
                : 'Cancellation or changes by us: we may cancel or reschedule due to force majeure, official orders, illness, or other important reasons. Payments already made will be refunded or credited unless unavoidable costs have been incurred.'}
            </li>
            <li>
              {isDe
                ? 'Wetter: Leichte Witterung berechtigt nicht zur kostenlosen Absage; bei extremen, die Sicherheit beeinträchtigenden Verhältnissen suchen wir eine faire Lösung (z. B. Ersatztermin).'
                : 'Weather: light weather does not automatically justify free cancellation; in extreme conditions affecting safety we will seek a fair solution (e.g. a new date).'}
            </li>
          </ul>
        </Reveal>

        {/* ── Pflichten der Teilnehmenden / Participant obligations ── */}
        <Reveal as="section" className={SECTION}>
          <h2 className={H2}>{isDe ? 'Pflichten der Teilnehmenden' : 'Participant obligations'}</h2>
          <ul className={UL}>
            <li>
              {isDe
                ? 'Pünktliches Erscheinen am vereinbarten Treffpunkt; bei Verspätung verkürzt sich die Tour entsprechend, ohne Anspruch auf Preisminderung, sofern nicht ausnahmsweise anderes vereinbart.'
                : 'Arrive on time at the agreed meeting point; if you are late, the tour duration may be shortened without a price reduction unless exceptionally agreed otherwise.'}
            </li>
            <li>
              {isDe
                ? 'Angemessene Kleidung und Schuhe für längere Spaziergänge; Befolgen Sie Anweisungen zu Sicherheit und öffentlicher Ordnung.'
                : 'Wear appropriate clothing and footwear for walking; follow instructions regarding safety and public order.'}
            </li>
            <li>
              {isDe
                ? 'Sie sind für ausreichende Reise- und Unfallversicherung selbst verantwortlich, soweit Sie dies wünschen.'
                : 'You are responsible for travel and accident insurance if you wish to have cover.'}
            </li>
          </ul>
        </Reveal>

        {/* ── Haftung / Liability ─────────────────────────────────── */}
        <Reveal as="section" className={SECTION}>
          <h2 className={H2}>{isDe ? 'Haftung' : 'Liability'}</h2>
          <div className="space-y-[1.1rem]">
            <p className={P}>
              {isDe
                ? 'Wir haften unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper oder Gesundheit. Im Übrigen haften wir nur bei leichter Fahrlässigkeit, wenn eine wesentliche Vertragspflicht verletzt wurde; in diesem Fall ist die Haftung auf den typischerweise vorhersehbaren Schaden begrenzt.'
                : 'We have unlimited liability for intent and gross negligence and for injury to life, body, or health. Otherwise we are liable for slight negligence only if an essential contractual duty is breached; in that case liability is limited to typically foreseeable damage.'}
            </p>
            <p className={P}>
              {isDe
                ? 'Keine Haftung besteht für Umstände außerhalb unseres Einflussbereichs (z. B. Betrieb öffentlicher Verkehrsmittel, Schließung von Sehenswürdigkeiten, Wetter, Streiks, behördliche Maßnahmen, Verspätungen Dritter).'
                : 'We are not liable for circumstances outside our control (e.g. public transport, closure of sights, weather, strikes, official measures, third-party delays).'}
            </p>
          </div>
        </Reveal>

        {/* ── Urheber- und Nutzungsrechte / Intellectual property ── */}
        <Reveal as="section" className={SECTION}>
          <h2 className={H2}>{isDe ? 'Urheber- und Nutzungsrechte' : 'Intellectual property'}</h2>
          <p className={P}>
            {isDe
              ? 'Inhalte dieser Website (Texte, Bilder, Layout) sind urheberrechtlich geschützt. Eine weitergehende Nutzung bedarf unserer Zustimmung. Während der Tour aufgenommene Fotos oder Videos zu privaten Zwecken sind in der Regel unproblematisch; kommerzielle Nutzung oder die Belästigung anderer Personen sind untersagt.'
              : 'Content on this website (text, images, layout) is protected by copyright. Further use requires our consent. Photos or videos taken during the tour for private use are generally fine; commercial use or disturbing others is not allowed.'}
          </p>
        </Reveal>

        {/* ── Online-Streitbeilegung / Online dispute resolution ── */}
        <Reveal as="section" className={SECTION}>
          <h2 className={H2}>
            {isDe ? 'Online-Streitbeilegung (EU-Verbraucher)' : 'Online dispute resolution (EU consumers)'}
          </h2>
          <p className={P}>
            {isDe
              ? 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit: '
              : 'The European Commission provides a platform for online dispute resolution: '}
            <a
              className={LINK}
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://ec.europa.eu/consumers/odr
            </a>
            {isDe
              ? ' Wir sind weder verpflichtet noch bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen, es sei denn, wir sind dazu gesetzlich verpflichtet.'
              : ' We are neither obliged nor willing to participate in dispute resolution before a consumer arbitration board unless we are legally required to do so.'}
          </p>
        </Reveal>

        {/* ── Schlussbestimmungen / Final provisions ──────────────── */}
        <Reveal as="section" className={SECTION}>
          <h2 className={H2}>{isDe ? 'Schlussbestimmungen' : 'Final provisions'}</h2>
          <ul className={UL}>
            <li>
              {isDe
                ? 'Es gilt das Recht der Tschechischen Republik unter Ausschluss des Kollisionsrechts, soweit zwingendes Verbraucherschutzrecht Ihres Wohnsitzstaates in der EU dem nicht entgegensteht.'
                : 'The law of the Czech Republic applies to the exclusion of conflict-of-law rules, insofar as mandatory consumer protection law of your EU country of residence does not provide otherwise.'}
            </li>
            <li>
              {isDe
                ? 'Zuständig sind die gesetzlich bestimmten Gerichte, sofern nicht ein ausschließlicher Gerichtsstand für Verbraucher vorgeht.'
                : 'Courts have jurisdiction as provided by law, subject to any mandatory jurisdiction rules for consumers.'}
            </li>
            <li>
              {isDe
                ? 'Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Regelungen unberührt.'
                : 'If any provision is invalid, the remaining provisions stay in effect.'}
            </li>
            <li>
              {isDe
                ? 'Änderungen und Ergänzungen dieser AGB bedürfen der Textform (z. B. E-Mail), soweit nicht gesetzlich etwas anderes vorschreibt.'
                : 'Changes and additions to these terms require text form (e.g. email), unless the law requires otherwise.'}
            </li>
          </ul>
        </Reveal>

        {/* ── Cross-link to Privacy ───────────────────────────────── */}
        <Reveal className={SECTION}>
          <Link
            href="/privacy"
            className="group inline-flex items-center gap-[0.5rem] rounded-sm font-body text-[1.05rem] text-burgundy underline decoration-burgundy/40 underline-offset-2 transition-colors hover:decoration-burgundy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
          >
            {isDe ? 'Zur Datenschutzerklärung' : 'Privacy Policy'}
            <span
              className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-[3px]"
              aria-hidden
            >
              arrow_forward
            </span>
          </Link>
        </Reveal>
      </div>
    </div>
  );
};

export default TermsPage;
