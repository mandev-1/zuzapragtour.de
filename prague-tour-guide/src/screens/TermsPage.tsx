'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

const LAST_UPDATED = '2026-04-12';

const TermsPage: React.FC = () => {
  const { language } = useLanguage();
  const isDe = language === 'de';

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 text-on-surface">
      <h1 className="mb-4 font-headline text-3xl text-primary md:text-4xl">
        {isDe ? 'Allgemeine Geschäftsbedingungen (AGB)' : 'Terms & Conditions'}
      </h1>
      <p className="mb-10 text-sm text-on-surface-variant">
        {isDe ? 'Stand:' : 'Last updated:'} {LAST_UPDATED}
      </p>

      <p className="mb-10 leading-relaxed text-on-surface-variant">
        {isDe
          ? 'Diese AGB regeln die vertragliche Beziehung zwischen Ihnen als Kundin/Kunde bzw. Teilnehmerin/Teilnehmer und Ing. Zuzana Manová („wir“, „uns“) für private Führungen und Touren unter der Marke Zuza Prague Tours. Mit der Buchung bzw. der Annahme unseres Angebots erkennen Sie diese Bedingungen an, soweit nicht ausdrücklich etwas anderes vereinbart wurde.'
          : 'These terms govern the contractual relationship between you as client or participant and Ing. Zuzana Manová (“we”, “us”) for private guided tours under the Zuza Prague Tours brand. By booking or accepting our offer, you agree to these terms unless expressly agreed otherwise.'}
      </p>

      <section className="mb-10">
        <h2 className="mb-3 font-headline text-xl text-primary">{isDe ? 'Anbieter' : 'Provider'}</h2>
        <div className="space-y-2 leading-relaxed text-on-surface-variant">
          <p>
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
          <p>
            Email:{' '}
            <a className="text-primary underline-offset-2 hover:underline" href="mailto:zuzanamanova@email.cz">
              zuzanamanova@email.cz
            </a>
            <br />
            {isDe ? 'Telefon / WhatsApp' : 'Phone / WhatsApp'}: +420 721 231 933
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-headline text-xl text-primary">{isDe ? 'Leistungsgegenstand' : 'Services'}</h2>
        <p className="leading-relaxed text-on-surface-variant">
          {isDe
            ? 'Wir erbringen geführte Stadtführungen und Touren in Prag und – nach gesonderter Vereinbarung – in der näheren Umgebung. Umfang, Dauer, Sprache, Treffpunkt und Route ergeben sich aus der Buchungsbestätigung oder einer schriftlichen (E-Mail-)Vereinbarung. Öffentliche Eintritte, Tickets für Museen, Verkehrsmittel oder Verköstigungen sind nur geschuldet, wenn dies ausdrücklich vereinbart und ausgewiesen wurde.'
            : 'We provide guided walking tours in Prague and, by separate agreement, in the wider area. Scope, duration, language, meeting point, and route are set out in the booking confirmation or a written (email) agreement. Admission tickets, public transport, meals, or similar costs are only included if expressly agreed and stated.'}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-headline text-xl text-primary">{isDe ? 'Vertragsschluss' : 'Contract formation'}</h2>
        <p className="leading-relaxed text-on-surface-variant">
          {isDe
            ? 'Anfragen per E-Mail, Telefon, WhatsApp oder über das Formular auf der Website sind unverbindlich. Ein Vertrag kommt erst zustande, wenn wir Ihre Buchung ausdrücklich bestätigen (in der Regel per E-Mail) oder wenn wir die vereinbarte Leistung am vereinbarten Termin erbringen und Sie dies wissen oder billigen müssen.'
            : 'Inquiries by email, phone, WhatsApp, or the website form are non-binding. A contract is formed when we expressly confirm your booking (usually by email) or when we deliver the agreed service at the agreed time with your knowledge or acceptance.'}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-headline text-xl text-primary">{isDe ? 'Preise und Zahlung' : 'Prices and payment'}</h2>
        <ul className="list-disc space-y-3 pl-6 leading-relaxed text-on-surface-variant">
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
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-headline text-xl text-primary">{isDe ? 'Stornierung und Umbuchung' : 'Cancellation and changes'}</h2>
        <ul className="list-disc space-y-3 pl-6 leading-relaxed text-on-surface-variant">
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
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-headline text-xl text-primary">{isDe ? 'Pflichten der Teilnehmenden' : 'Participant obligations'}</h2>
        <ul className="list-disc space-y-3 pl-6 leading-relaxed text-on-surface-variant">
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
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-headline text-xl text-primary">{isDe ? 'Haftung' : 'Liability'}</h2>
        <p className="leading-relaxed text-on-surface-variant">
          {isDe
            ? 'Wir haften unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper oder Gesundheit. Im Übrigen haften wir nur bei leichter Fahrlässigkeit, wenn eine wesentliche Vertragspflicht verletzt wurde; in diesem Fall ist die Haftung auf den typischerweise vorhersehbaren Schaden begrenzt.'
            : 'We have unlimited liability for intent and gross negligence and for injury to life, body, or health. Otherwise we are liable for slight negligence only if an essential contractual duty is breached; in that case liability is limited to typically foreseeable damage.'}
        </p>
        <p className="mt-3 leading-relaxed text-on-surface-variant">
          {isDe
            ? 'Keine Haftung besteht für Umstände außerhalb unseres Einflussbereichs (z. B. Betrieb öffentlicher Verkehrsmittel, Schließung von Sehenswürdigkeiten, Wetter, Streiks, behördliche Maßnahmen, Verspätungen Dritter).'
            : 'We are not liable for circumstances outside our control (e.g. public transport, closure of sights, weather, strikes, official measures, third-party delays).'}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-headline text-xl text-primary">{isDe ? 'Urheber- und Nutzungsrechte' : 'Intellectual property'}</h2>
        <p className="leading-relaxed text-on-surface-variant">
          {isDe
            ? 'Inhalte dieser Website (Texte, Bilder, Layout) sind urheberrechtlich geschützt. Eine weitergehende Nutzung bedarf unserer Zustimmung. Während der Tour aufgenommene Fotos oder Videos zu privaten Zwecken sind in der Regel unproblematisch; kommerzielle Nutzung oder die Belästigung anderer Personen sind untersagt.'
            : 'Content on this website (text, images, layout) is protected by copyright. Further use requires our consent. Photos or videos taken during the tour for private use are generally fine; commercial use or disturbing others is not allowed.'}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-headline text-xl text-primary">
          {isDe ? 'Online-Streitbeilegung (EU-Verbraucher)' : 'Online dispute resolution (EU consumers)'}
        </h2>
        <p className="leading-relaxed text-on-surface-variant">
          {isDe
            ? 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit: '
            : 'The European Commission provides a platform for online dispute resolution: '}
          <a
            className="text-primary underline-offset-2 hover:underline"
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
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-headline text-xl text-primary">{isDe ? 'Schlussbestimmungen' : 'Final provisions'}</h2>
        <ul className="list-disc space-y-3 pl-6 leading-relaxed text-on-surface-variant">
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
      </section>

      <p className="text-sm text-on-surface-variant">
        <Link href="/privacy" className="text-primary underline-offset-2 hover:underline">
          {isDe ? 'Zur Datenschutzerklärung' : 'Privacy Policy'}
        </Link>
      </p>
    </div>
  );
};

export default TermsPage;
