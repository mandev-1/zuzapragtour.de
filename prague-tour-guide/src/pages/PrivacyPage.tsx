import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { BRAND } from '../brand';

const LAST_UPDATED = '2026-04-12';

const PrivacyPage: React.FC = () => {
  const { language } = useLanguage();

  const isDe = language === 'de';
  const title = isDe ? `Datenschutz | ${BRAND.siteName}` : `Privacy Policy | ${BRAND.siteName}`;
  const desc = isDe
    ? 'Datenschutzerklärung: Verarbeitung personenbezogener Daten bei Zuza Prague Tours (Ing. Zuzana Manová).'
    : 'Privacy policy: how Zuza Prague Tours (Ing. Zuzana Manová) processes personal data.';

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 text-on-surface">
      <Helmet>
        <html lang={language} />
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`${BRAND.domain}/privacy`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={`${BRAND.domain}/privacy`} />
      </Helmet>

      <h1 className="mb-4 font-headline text-3xl text-primary md:text-4xl">
        {isDe ? 'Datenschutzerklärung' : 'Privacy Policy'}
      </h1>
      <p className="mb-10 text-sm text-on-surface-variant">
        {isDe ? 'Stand:' : 'Last updated:'} {LAST_UPDATED}
      </p>

      <p className="mb-10 leading-relaxed text-on-surface-variant">
        {isDe
          ? 'Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Diese Erklärung informiert Sie darüber, welche Daten wir bei der Nutzung unserer Website und bei der Kommunikation mit uns verarbeiten, zu welchen Zwecken und auf welcher Rechtsgrundlage. Maßgeblich ist das anwendbare Datenschutzrecht, insbesondere die DSGVO, soweit Sie in der EU bzw. dem EWR ansässig sind.'
          : 'We take the protection of your personal data seriously. This notice explains what data we process when you use our website or communicate with us, for what purposes, and on what legal basis. Applicable data protection law applies, including the GDPR if you are in the EU or EEA.'}
      </p>

      <section className="mb-10">
        <h2 className="mb-3 font-headline text-xl text-primary">{isDe ? 'Verantwortliche Stelle' : 'Controller'}</h2>
        <div className="space-y-3 leading-relaxed text-on-surface-variant">
          <p>
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
          <p>
            Email:{' '}
            <a className="text-primary underline-offset-2 hover:underline" href="mailto:zuzanamanova@email.cz">
              zuzanamanova@email.cz
            </a>
            <br />
            {isDe ? 'Telefon / WhatsApp' : 'Phone / WhatsApp'}: +420 721 231 933
          </p>
          <p className="text-sm">
            {isDe
              ? 'Für Anfragen zum Datenschutz nutzen Sie bitte dieselbe E-Mail-Adresse und setzen Sie „Datenschutz“ in den Betreff.'
              : 'For privacy requests, please use the same email address and include “Privacy” in the subject line.'}
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-headline text-xl text-primary">
          {isDe ? 'Welche Daten wir verarbeiten' : 'Categories of personal data'}
        </h2>
        <ul className="list-disc space-y-3 pl-6 leading-relaxed text-on-surface-variant">
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
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-headline text-xl text-primary">{isDe ? 'Zwecke und Rechtsgrundlagen' : 'Purposes and legal bases'}</h2>
        <ul className="list-disc space-y-3 pl-6 leading-relaxed text-on-surface-variant">
          <li>
            <strong className="text-on-surface">{isDe ? 'Anbahnung und Durchführung von Verträgen:' : 'Contract preparation and performance:'}</strong>{' '}
            {isDe
              ? 'Beantwortung von Anfragen, Terminabstimmung und Organisation von Führungen (Art. 6 Abs. 1 lit. b DSGVO, soweit anwendbar).'
              : 'responding to inquiries, scheduling, and delivering guided tours (GDPR Art. 6(1)(b), where applicable).'}
          </li>
          <li>
            <strong className="text-on-surface">{isDe ? 'Berechtigte Interessen:' : 'Legitimate interests:'}</strong>{' '}
            {isDe
              ? 'Betrieb und Sicherheit der Website, Missbrauchsbekämpfung, technische Administration (Art. 6 Abs. 1 lit. f DSGVO).'
              : 'operating and securing the website, preventing abuse, technical administration (GDPR Art. 6(1)(f)).'}
          </li>
          <li>
            <strong className="text-on-surface">{isDe ? 'Einwilligung:' : 'Consent:'}</strong>{' '}
            {isDe
              ? 'Soweit wir eine Einwilligung einholen (z. B. für nicht notwendige Cookies oder Newsletter), ist Art. 6 Abs. 1 lit. a DSGVO maßgeblich; Sie können eine erteilte Einwilligung mit Wirkung für die Zukunft widerrufen.'
              : 'where we ask for consent (e.g. for non-essential cookies or a newsletter), we rely on GDPR Art. 6(1)(a); you may withdraw consent at any time with future effect.'}{' '}
            {isDe
              ? '(Derzeit setzen wir keine Marketing-Newsletter-Cookies ohne Ihre ausdrückliche Zustimmung.)'
              : '(We currently do not use marketing newsletter cookies without your explicit consent.)'}
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-headline text-xl text-primary">{isDe ? 'Hosting und Auftragsverarbeiter' : 'Hosting and processors'}</h2>
        <p className="leading-relaxed text-on-surface-variant">
          {isDe
            ? 'Die Website wird bei einem Hosting-Anbieter betrieben (derzeit Netlify, Inc., USA). Dabei kann eine Verarbeitung personenbezogener Daten (z. B. technische Logdaten) in einem Drittland stattfinden. Soweit erforderlich stützen wir Übermittlungen auf geeignete Garantien im Sinne der DSGVO (z. B. Standardvertragsklauseln und/oder Angemessenheitsbeschluss, je nach aktuellem Rechtsstand).'
            : 'The site is hosted with a hosting provider (currently Netlify, Inc., USA). This may involve processing personal data (e.g. technical logs) outside the EU/EEA. Where required, we rely on appropriate safeguards under the GDPR (e.g. Standard Contractual Clauses and/or an adequacy decision, depending on current law).'}
        </p>
        <p className="mt-3 leading-relaxed text-on-surface-variant">
          {isDe
            ? 'Auf unserer Website können Inhalte von Drittanbietern eingebunden sein (z. B. Bewertungs-Widgets, Karten). Diese Anbieter können eigene Cookies oder ähnliche Technologien verwenden und sind für ihre Datenverarbeitung selbst verantwortlich; bitte beachten Sie deren Datenschutzhinweise.'
            : 'Our site may embed third-party content (e.g. review widgets, maps). Those providers may use their own cookies or similar technologies and are responsible for their own processing; please read their privacy notices.'}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-headline text-xl text-primary">{isDe ? 'Speicherdauer' : 'Retention'}</h2>
        <p className="leading-relaxed text-on-surface-variant">
          {isDe
            ? 'Wir speichern personenbezogene Daten nur so lange, wie dies für die jeweiligen Zwecke erforderlich ist oder eine gesetzliche Aufbewahrungspflicht besteht (z. B. steuer- oder handelsrechtliche Fristen für Buchhaltungsunterlagen). Anfragen ohne Vertragsabschluss löschen oder anonymisieren wir in der Regel, sobald die Kommunikation abgeschlossen ist, sofern keine berechtigten Interessen oder Pflichten einer längeren Aufbewahrung entgegenstehen.'
            : 'We keep personal data only as long as needed for the relevant purposes or as required by law (e.g. tax or accounting retention periods). If no contract is concluded, we generally delete or anonymise inquiry data once the conversation has ended, unless a legitimate interest or legal duty requires longer retention.'}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-headline text-xl text-primary">{isDe ? 'Ihre Rechte' : 'Your rights'}</h2>
        <p className="leading-relaxed text-on-surface-variant">
          {isDe
            ? 'Soweit die DSGVO anwendbar ist, stehen Ihnen insbesondere zu: Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch gegen die Verarbeitung (Art. 21). Liegt die Verarbeitung auf Grundlage einer Einwilligung, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen.'
            : 'Where the GDPR applies, you have the rights of access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20), and objection (Art. 21). Where processing is based on consent, you may withdraw it at any time with future effect.'}
        </p>
        <p className="mt-3 leading-relaxed text-on-surface-variant">
          {isDe
            ? 'Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Für Tschechien ist dies insbesondere das Úřad pro ochranu osobních údajů (ÚOOÚ). Wenn Sie in einem anderen EU-/EWR-Staat wohnen, können Sie sich auch dort an die zuständige Behörde wenden.'
            : 'You also have the right to lodge a complaint with a supervisory authority. In the Czech Republic this is notably the Office for Personal Data Protection (ÚOOÚ). If you live in another EU/EEA country, you may contact the authority there.'}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-headline text-xl text-primary">{isDe ? 'Pflicht zur Bereitstellung von Daten?' : 'Are you required to provide data?'}</h2>
        <p className="leading-relaxed text-on-surface-variant">
          {isDe
            ? 'Die Nutzung der Website ist ohne aktive Angabe personenbezogener Daten möglich, soweit Sie uns nicht kontaktieren. Für eine Buchungsanfrage benötigen wir die von Ihnen mitgeteilten Kontaktdaten, um Sie zu erreichen.'
            : 'You can browse the website without actively providing personal data unless you contact us. To handle a booking request, we need the contact details you provide so we can respond.'}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-headline text-xl text-primary">{isDe ? 'Automatisierte Entscheidungen' : 'Automated decision-making'}</h2>
        <p className="leading-relaxed text-on-surface-variant">
          {isDe
            ? 'Wir führen keine ausschließlich automatisierte Entscheidungsfindung im Sinne von Art. 22 DSGVO durch.'
            : 'We do not carry out solely automated decision-making within the meaning of GDPR Art. 22.'}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-headline text-xl text-primary">{isDe ? 'Änderungen dieser Erklärung' : 'Changes to this notice'}</h2>
        <p className="leading-relaxed text-on-surface-variant">
          {isDe
            ? 'Wir können diese Datenschutzerklärung anpassen, wenn sich unsere Verarbeitung oder der gesetzliche Rahmen ändert. Die jeweils aktuelle Version ist auf dieser Seite mit Datum abrufbar.'
            : 'We may update this privacy notice if our processing or legal requirements change. The current version is always available on this page with a “last updated” date.'}
        </p>
      </section>

      <p className="text-sm text-on-surface-variant">
        <Link to="/terms" className="text-primary underline-offset-2 hover:underline">
          {isDe ? 'Zu den Allgemeinen Geschäftsbedingungen (AGB)' : 'Terms & Conditions'}
        </Link>
      </p>
    </div>
  );
};

export default PrivacyPage;
