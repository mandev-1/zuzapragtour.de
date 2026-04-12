import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

const TermsPage: React.FC = () => {
  const { language } = useLanguage();
  const isDe = language === 'de';
  const title = isDe ? 'AGB | Zuza Prague Tours' : 'Terms & Conditions | Zuza Prague Tours';
  const desc = isDe ? 'Allgemeine Geschäftsbedingungen für Zuza Prague Tours.' : 'Terms and Conditions for Zuza Prague Tours.';

  return (
    <div className="legal-page container" style={{ padding: '2rem 1rem' }}>
      <Helmet>
        <html lang={language} />
        <title>{title}</title>
        <meta name="description" content={desc} />
  <link rel="canonical" href={`https://zuzapragtour.de/terms`} />
      </Helmet>
      <h1>{isDe ? 'Allgemeine Geschäftsbedingungen (AGB)' : 'Terms & Conditions'}</h1>

      <section>
        <h2>{isDe ? 'Anbieter' : 'Provider'}</h2>
        <p>
          Ing. Zuzana Manová<br />
          IČ: 18897398<br />
          {isDe ? 'Rechtsform: Gewerbetreibende (Fyzická osoba podnikající dle živnostenského zákona)' : 'Legal form: Sole trader (Fyzická osoba podnikající dle živnostenského zákona)'}<br />
          {isDe ? 'Gründungsdatum' : 'Established'}: 1. 6. 1991
        </p>
      </section>

      <section>
        <h2>{isDe ? 'Leistungen' : 'Services'}</h2>
        <p>{isDe ? 'Geführte Touren in Prag und Umgebung, individuell oder für Gruppen, gemäß Beschreibung/Absprachen.' : 'Guided tours in Prague and surroundings, private or group, as described or agreed.'}</p>
      </section>

      <section>
        <h2>{isDe ? 'Buchung & Zahlung' : 'Booking & Payment'}</h2>
        <ul>
          <li>{isDe ? 'Anfragen per E-Mail/Telefon. Eine Buchung gilt als bestätigt nach schriftlicher Bestätigung.' : 'Inquiries via email/phone. A booking is confirmed after written confirmation.'}</li>
          <li>{isDe ? 'Zahlungsmodalitäten werden individuell vereinbart (z. B. Barzahlung, Überweisung).' : 'Payment terms are agreed individually (e.g., cash, bank transfer).'} </li>
        </ul>
      </section>

      <section>
        <h2>{isDe ? 'Stornierung' : 'Cancellation'}</h2>
        <ul>
          <li>{isDe ? 'Bis 7 Tage vor Tourbeginn: kostenlose Stornierung.' : 'Up to 7 days before the tour: free cancellation.'}</li>
          <li>{isDe ? 'Wetter/Katastrophen/Höhere Gewalt: flexible Umbuchung oder Erstattung nach Absprache.' : 'Weather/disruption/force majeure: flexible rebooking or refund as agreed.'}</li>
        </ul>
      </section>

      <section>
        <h2>{isDe ? 'Pflichten der Teilnehmer' : 'Participant Duties'}</h2>
        <ul>
          <li>{isDe ? 'Angemessene Kleidung/Schuhe und Einhaltung örtlicher Regeln.' : 'Wear appropriate clothing/footwear and respect local rules.'}</li>
          <li>{isDe ? 'Pünktlichkeit am Treffpunkt.' : 'Be on time at the meeting point.'}</li>
        </ul>
      </section>

      <section>
        <h2>{isDe ? 'Haftung' : 'Liability'}</h2>
        <p>{isDe ? 'Haftung im gesetzlichen Rahmen. Keine Haftung für Umstände außerhalb unserer Kontrolle (z. B. Wetter, Verkehr, behördliche Maßnahmen).' : 'Liability within statutory limits. No liability for circumstances beyond our control (e.g., weather, traffic, official measures).'}</p>
      </section>

      <section>
        <h2>{isDe ? 'Schlussbestimmungen' : 'Final Provisions'}</h2>
        <ul>
          <li>{isDe ? 'Es gilt tschechisches Recht.' : 'Czech law applies.'}</li>
          <li>{isDe ? 'Gerichtsstand nach gesetzlichen Regelungen.' : 'Jurisdiction according to statutory rules.'}</li>
          <li>{isDe ? 'Änderungen/Ergänzungen bedürfen der Textform.' : 'Changes/amendments require text form.'}</li>
        </ul>
      </section>
    </div>
  );
};

export default TermsPage;
