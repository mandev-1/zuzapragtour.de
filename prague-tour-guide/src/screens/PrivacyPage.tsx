'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { PageBanner, Reveal } from '../components/site/SiteUI';

const LAST_UPDATED = '2026-04-12';

/* ── Shared prose typography (premium editorial, narrow measure) ── */
const SECTION = 'mt-[clamp(2rem,4vh,3rem)] border-t border-rule pt-[clamp(2rem,4vh,3rem)]';
const H2 = 'font-display text-[clamp(1.5rem,2.6vw,2rem)] font-normal leading-[1.15] text-ink';
const BODY = 'mt-[0.85rem] space-y-[1.1rem]';
const P = 'font-body text-[1.05rem] leading-[1.75] text-ink-soft';
const UL = 'list-disc space-y-3 pl-[1.3rem] font-body text-[1.05rem] leading-[1.7] text-ink-soft marker:text-brass';
const STRONG = 'font-bold text-ink';
const LINK =
  'rounded-sm text-burgundy underline decoration-burgundy/40 underline-offset-2 outline-none transition-colors hover:decoration-burgundy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy';

const PrivacyPage: React.FC = () => {
  const { language } = useLanguage();
  const isDe = language === 'de';

  return (
    <div className="premium-inner">
      <PageBanner
        kicker={isDe ? 'Rechtliches' : 'Legal'}
        title={isDe ? 'Datenschutzerklärung' : 'Privacy Policy'}
      />

      <div className="mx-auto w-full max-w-[720px] px-[clamp(1.5rem,5vw,5rem)] pb-[clamp(4rem,9vh,7rem)] pt-[clamp(2.5rem,5vh,3.5rem)]">
        {/* ── Last updated + lead ─────────────────────────────────── */}
        <Reveal>
          <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-ink-mute">
            {isDe ? 'Stand:' : 'Last updated:'} {LAST_UPDATED}
          </p>
          <p className="mt-[1.4rem] font-body text-[clamp(1.12rem,1.5vw,1.25rem)] leading-[1.7] text-ink-soft">
            {isDe
              ? 'Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Diese Erklärung informiert Sie darüber, welche Daten wir bei der Nutzung unserer Website und bei der Kommunikation mit uns verarbeiten, zu welchen Zwecken und auf welcher Rechtsgrundlage. Maßgeblich ist das anwendbare Datenschutzrecht, insbesondere die DSGVO, soweit Sie in der EU bzw. dem EWR ansässig sind.'
              : 'We take the protection of your personal data seriously. This notice explains what data we process when you use our website or communicate with us, for what purposes, and on what legal basis. Applicable data protection law applies, including the GDPR if you are in the EU or EEA.'}
          </p>
        </Reveal>

        {/* ── Controller ──────────────────────────────────────────── */}
        <Reveal as="section" className={SECTION}>
          <h2 className={H2}>{isDe ? 'Verantwortliche Stelle' : 'Controller'}</h2>
          <div className={BODY}>
            <p className={P}>
              Ing. Zuzana Manová
              <br />
              Zuza Prague Tours
              <br />
              {isDe ? 'Tätigkeitsort' : 'Place of business'}: Prague, Czech Republic
              <br />
              IČ: 18897398
              <br />
              {isDe
                ? 'Rechtsform: selbstständige Gewerbetreibende (tschechisches Einzelunternehmen / živnostenský rejstřík).'
                : 'Legal form: sole trader registered in the Czech trade licensing register (živnostenský rejstřík).'}
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
            <p className="font-body text-[0.95rem] leading-[1.6] text-ink-mute">
              {isDe
                ? 'Für Anfragen zum Datenschutz nutzen Sie bitte dieselbe E-Mail-Adresse und setzen Sie „Datenschutz“ in den Betreff.'
                : 'For privacy requests, please use the same email address and include “Privacy” in the subject line.'}
            </p>
          </div>
        </Reveal>

        {/* ── Categories of personal data ─────────────────────────── */}
        <Reveal as="section" className={SECTION}>
          <h2 className={H2}>{isDe ? 'Welche Daten wir verarbeiten' : 'Categories of personal data'}</h2>
          <div className={BODY}>
            <ul className={UL}>
              <li>
                {isDe
                  ? 'Kontakt- und Buchungsdaten, die Sie uns freiwillig mitteilen (z. B. Name, E-Mail-Adresse, Telefonnummer, gewünschter Tourtermin, Nachrichteninhalt), wenn Sie uns per E-Mail, Telefon, WhatsApp oder über unser Kontakt-/Buchungsformular erreichen.'
                  : 'Contact and booking details you voluntarily provide (e.g. name, email, phone, preferred tour date, message content) when you contact us by email, phone, WhatsApp, or through our contact/booking form.'}
              </li>
              <li>
                {isDe
                  ? 'Technische Informationen beim Aufruf der Website (z. B. IP-Adresse in verkürzter Form, Datum und Uhrzeit des Zugriffs, angeforderte Seite, Browsertyp), soweit diese in Server- oder Hosting-Logs des Anbieters anfallen.'
                  : 'Technical information when you load the website (e.g. truncated IP address, date and time of access, requested page, browser type), insofar as this is recorded in server or hosting logs.'}
              </li>
              <li>
                {isDe
                  ? 'Spracheinstellung der Website: Wir speichern Ihre gewählte Sprache (Deutsch/Englisch) lokal in Ihrem Browser (localStorage, Schlüssel „zpt.lang“), damit die Seite beim nächsten Besuch in derselben Sprache erscheint. Es werden keine Profile erstellt und keine Werbe-Cookies gesetzt.'
                  : 'Website language: we store your selected language (German/English) locally in your browser (localStorage key “zpt.lang”) so the site opens in the same language on your next visit. We do not use this to build profiles or serve advertising cookies.'}
              </li>
            </ul>
          </div>
        </Reveal>

        {/* ── Purposes and legal bases ────────────────────────────── */}
        <Reveal as="section" className={SECTION}>
          <h2 className={H2}>{isDe ? 'Zwecke und Rechtsgrundlagen' : 'Purposes and legal bases'}</h2>
          <div className={BODY}>
            <ul className={UL}>
              <li>
                <strong className={STRONG}>
                  {isDe ? 'Anbahnung und Durchführung von Verträgen:' : 'Contract preparation and performance:'}
                </strong>{' '}
                {isDe
                  ? 'Beantwortung von Anfragen, Terminabstimmung und Organisation von Führungen (Art. 6 Abs. 1 lit. b DSGVO, soweit anwendbar).'
                  : 'responding to inquiries, scheduling, and delivering guided tours (GDPR Art. 6(1)(b), where applicable).'}
              </li>
              <li>
                <strong className={STRONG}>{isDe ? 'Berechtigte Interessen:' : 'Legitimate interests:'}</strong>{' '}
                {isDe
                  ? 'Betrieb und Sicherheit der Website, Missbrauchsbekämpfung, technische Administration (Art. 6 Abs. 1 lit. f DSGVO).'
                  : 'operating and securing the website, preventing abuse, technical administration (GDPR Art. 6(1)(f)).'}
              </li>
              <li>
                <strong className={STRONG}>{isDe ? 'Einwilligung:' : 'Consent:'}</strong>{' '}
                {isDe
                  ? 'Soweit wir eine Einwilligung einholen (z. B. für nicht notwendige Cookies oder Newsletter), ist Art. 6 Abs. 1 lit. a DSGVO maßgeblich; Sie können eine erteilte Einwilligung mit Wirkung für die Zukunft widerrufen.'
                  : 'where we ask for consent (e.g. for non-essential cookies or a newsletter), we rely on GDPR Art. 6(1)(a); you may withdraw consent at any time with future effect.'}{' '}
                {isDe
                  ? '(Derzeit setzen wir keine Marketing-Newsletter-Cookies ohne Ihre ausdrückliche Zustimmung.)'
                  : '(We currently do not use marketing newsletter cookies without your explicit consent.)'}
              </li>
            </ul>
          </div>
        </Reveal>

        {/* ── Hosting and processors ──────────────────────────────── */}
        <Reveal as="section" className={SECTION}>
          <h2 className={H2}>{isDe ? 'Hosting und Auftragsverarbeiter' : 'Hosting and processors'}</h2>
          <div className={BODY}>
            <p className={P}>
              {isDe
                ? 'Die Website wird bei einem Hosting-Anbieter betrieben (derzeit Netlify, Inc., USA). Dabei kann eine Verarbeitung personenbezogener Daten (z. B. technische Logdaten) in einem Drittland stattfinden. Soweit erforderlich stützen wir Übermittlungen auf geeignete Garantien im Sinne der DSGVO (z. B. Standardvertragsklauseln und/oder Angemessenheitsbeschluss, je nach aktuellem Rechtsstand).'
                : 'The site is hosted with a hosting provider (currently Netlify, Inc., USA). This may involve processing personal data (e.g. technical logs) outside the EU/EEA. Where required, we rely on appropriate safeguards under the GDPR (e.g. Standard Contractual Clauses and/or an adequacy decision, depending on current law).'}
            </p>
            <p className={P}>
              {isDe
                ? 'Auf unserer Website können Inhalte von Drittanbietern eingebunden sein (z. B. Bewertungs-Widgets, Karten). Diese Anbieter können eigene Cookies oder ähnliche Technologien verwenden und sind für ihre Datenverarbeitung selbst verantwortlich; bitte beachten Sie deren Datenschutzhinweise.'
                : 'Our site may embed third-party content (e.g. review widgets, maps). Those providers may use their own cookies or similar technologies and are responsible for their own processing; please read their privacy notices.'}
            </p>
          </div>
        </Reveal>

        {/* ── Retention ───────────────────────────────────────────── */}
        <Reveal as="section" className={SECTION}>
          <h2 className={H2}>{isDe ? 'Speicherdauer' : 'Retention'}</h2>
          <div className={BODY}>
            <p className={P}>
              {isDe
                ? 'Wir speichern personenbezogene Daten nur so lange, wie dies für die jeweiligen Zwecke erforderlich ist oder eine gesetzliche Aufbewahrungspflicht besteht (z. B. steuer- oder handelsrechtliche Fristen für Buchhaltungsunterlagen). Anfragen ohne Vertragsabschluss löschen oder anonymisieren wir in der Regel, sobald die Kommunikation abgeschlossen ist, sofern keine berechtigten Interessen oder Pflichten einer längeren Aufbewahrung entgegenstehen.'
                : 'We keep personal data only as long as needed for the relevant purposes or as required by law (e.g. tax or accounting retention periods). If no contract is concluded, we generally delete or anonymise inquiry data once the conversation has ended, unless a legitimate interest or legal duty requires longer retention.'}
            </p>
          </div>
        </Reveal>

        {/* ── Your rights ─────────────────────────────────────────── */}
        <Reveal as="section" className={SECTION}>
          <h2 className={H2}>{isDe ? 'Ihre Rechte' : 'Your rights'}</h2>
          <div className={BODY}>
            <p className={P}>
              {isDe
                ? 'Soweit die DSGVO anwendbar ist, stehen Ihnen insbesondere zu: Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch gegen die Verarbeitung (Art. 21). Liegt die Verarbeitung auf Grundlage einer Einwilligung, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen.'
                : 'Where the GDPR applies, you have the rights of access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20), and objection (Art. 21). Where processing is based on consent, you may withdraw it at any time with future effect.'}
            </p>
            <p className={P}>
              {isDe
                ? 'Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Für Tschechien ist dies insbesondere das Úřad pro ochranu osobních údajů (ÚOOÚ). Wenn Sie in einem anderen EU-/EWR-Staat wohnen, können Sie sich auch dort an die zuständige Behörde wenden.'
                : 'You also have the right to lodge a complaint with a supervisory authority. In the Czech Republic this is notably the Office for Personal Data Protection (ÚOOÚ). If you live in another EU/EEA country, you may contact the authority there.'}
            </p>
          </div>
        </Reveal>

        {/* ── Obligation to provide data ──────────────────────────── */}
        <Reveal as="section" className={SECTION}>
          <h2 className={H2}>{isDe ? 'Pflicht zur Bereitstellung von Daten?' : 'Are you required to provide data?'}</h2>
          <div className={BODY}>
            <p className={P}>
              {isDe
                ? 'Die Nutzung der Website ist ohne aktive Angabe personenbezogener Daten möglich, soweit Sie uns nicht kontaktieren. Für eine Buchungsanfrage benötigen wir die von Ihnen mitgeteilten Kontaktdaten, um Sie zu erreichen.'
                : 'You can browse the website without actively providing personal data unless you contact us. To handle a booking request, we need the contact details you provide so we can respond.'}
            </p>
          </div>
        </Reveal>

        {/* ── Automated decision-making ───────────────────────────── */}
        <Reveal as="section" className={SECTION}>
          <h2 className={H2}>{isDe ? 'Automatisierte Entscheidungen' : 'Automated decision-making'}</h2>
          <div className={BODY}>
            <p className={P}>
              {isDe
                ? 'Wir führen keine ausschließlich automatisierte Entscheidungsfindung im Sinne von Art. 22 DSGVO durch.'
                : 'We do not carry out solely automated decision-making within the meaning of GDPR Art. 22.'}
            </p>
          </div>
        </Reveal>

        {/* ── Changes to this notice ──────────────────────────────── */}
        <Reveal as="section" className={SECTION}>
          <h2 className={H2}>{isDe ? 'Änderungen dieser Erklärung' : 'Changes to this notice'}</h2>
          <div className={BODY}>
            <p className={P}>
              {isDe
                ? 'Wir können diese Datenschutzerklärung anpassen, wenn sich unsere Verarbeitung oder der gesetzliche Rahmen ändert. Die jeweils aktuelle Version ist auf dieser Seite mit Datum abrufbar.'
                : 'We may update this privacy notice if our processing or legal requirements change. The current version is always available on this page with a “last updated” date.'}
            </p>
          </div>
        </Reveal>

        {/* ── Cross-link to Terms ─────────────────────────────────── */}
        <Reveal className={SECTION}>
          <Link
            href="/terms"
            className="group inline-flex items-center gap-[0.5rem] rounded-sm font-body text-[1.05rem] text-burgundy underline decoration-burgundy/40 underline-offset-2 outline-none transition-colors hover:decoration-burgundy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
          >
            {isDe ? 'Zu den Allgemeinen Geschäftsbedingungen (AGB)' : 'Terms & Conditions'}
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

export default PrivacyPage;
