import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

const PrivacyPage: React.FC = () => {
  const { language } = useLanguage();

  const isDe = language === 'de';
  const title = isDe ? 'Datenschutz | Zuza Prague Tours' : 'Privacy Policy | Zuza Prague Tours';
  const desc = isDe ? 'Datenschutzerklärung für Zuza Prague Tours.' : 'Privacy policy for Zuza Prague Tours.';

  return (
    <div className="legal-page container" style={{ padding: '2rem 1rem' }}>
      <Helmet>
        <html lang={language} />
        <title>{title}</title>
        <meta name="description" content={desc} />
  <link rel="canonical" href={`https://zuzapragtour.de/privacy`} />
      </Helmet>
      <h1>{isDe ? 'Datenschutz' : 'Privacy Policy'}</h1>

      <section>
        <h2>{isDe ? 'Verantwortliche Stelle' : 'Controller'}</h2>
        <p>
          Ing. Zuzana Manová<br />
          IČ: 18897398<br />
          {isDe ? 'Rechtsform: Gewerbetreibende (Fyzická osoba podnikající dle živnostenského zákona)' : 'Legal form: Sole trader (Fyzická osoba podnikající dle živnostenského zákona)'}<br />
          {isDe ? 'Gründungsdatum' : 'Established'}: 1. 6. 1991
        </p>
        <p>
          Email: <a href="mailto:zuzanamanova@email.cz">zuzanamanova@email.cz</a>
        </p>
      </section>

      <section>
        <h2>{isDe ? 'Erhobene Daten und Zwecke' : 'Data We Collect and Purposes'}</h2>
        <ul>
          <li>{isDe ? 'Kontaktinformationen, die Sie im Formular angeben (Name, E-Mail, Telefon, Nachricht), um Ihre Anfrage zu beantworten und Touren zu organisieren.' : 'Contact information you provide (name, email, phone, message) to respond to your inquiry and organize tours.'}</li>
          <li>{isDe ? 'Optionale Metadaten (z. B. Datum der bevorzugten Tour) zur Terminplanung.' : 'Optional metadata (e.g., preferred tour date) for scheduling.'}</li>
          <li>{isDe ? 'Server-Logs (sicherheitsrelevante technische Daten) zur Sicherstellung des Betriebs.' : 'Server logs (security-related technical data) to ensure site operation.'}</li>
        </ul>
      </section>

      <section>
        <h2>{isDe ? 'Rechtsgrundlagen' : 'Legal Bases'}</h2>
        <ul>
          <li>{isDe ? 'Art. 6 Abs. 1 lit. b DSGVO (Vertrag/Anbahnung): Beantwortung von Anfragen, Buchungen, Organisation von Führungen.' : 'GDPR Art. 6(1)(b) (Contract/Pre-contract): responding to inquiries, bookings, organizing tours.'}</li>
          <li>{isDe ? 'Art. 6 Abs. 1 lit. f DSGVO (Berechtigte Interessen): Betrieb, Sicherheit, Verbesserung der Website.' : 'GDPR Art. 6(1)(f) (Legitimate interests): site operation, security, improvement.'}</li>
        </ul>
      </section>

      <section>
        <h2>{isDe ? 'Speicherdauer' : 'Retention'}</h2>
        <p>{isDe ? 'Wir speichern personenbezogene Daten nur so lange, wie es für die genannten Zwecke erforderlich ist oder gesetzliche Pflichten bestehen.' : 'We retain personal data only as long as necessary for the stated purposes or where legal obligations require.'}</p>
      </section>

      <section>
        <h2>{isDe ? 'Ihre Rechte' : 'Your Rights'}</h2>
        <p>{isDe ? 'Sie haben Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und Datenübertragbarkeit im Rahmen der DSGVO.' : 'You have rights to access, rectification, erasure, restriction, objection, and data portability under GDPR.'}</p>
        <p>{isDe ? 'Kontaktieren Sie uns per E-Mail, um Ihre Rechte auszuüben.' : 'Contact us via email to exercise your rights.'}</p>
      </section>

      <section>
        <h2>{isDe ? 'Drittlandtransfer' : 'International Transfers'}</h2>
        <p>{isDe ? 'Wenn wir Dienste Dritter (z. B. Hosting/Analytics) nutzen, stellen wir angemessene Schutzmaßnahmen sicher.' : 'If we use third-party services (e.g., hosting/analytics), we ensure appropriate safeguards.'}</p>
      </section>

      <section>
        <h2>{isDe ? 'Kontakt' : 'Contact'}</h2>
        <p>{isDe ? 'Für Datenschutzanfragen wenden Sie sich bitte an die oben genannte Kontaktadresse.' : 'For privacy inquiries, please contact the address above.'}</p>
      </section>
    </div>
  );
};

export default PrivacyPage;
