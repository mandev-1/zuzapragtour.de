import React from 'react';
import { Helmet } from 'react-helmet-async';
import Contact from '../components/Contact';
import { useLanguage } from '../context/LanguageContext';
import { getFAQSchema } from '../utils/seo';

const contactFAQ = getFAQSchema([
  {
    question: 'How do I book a tour?',
    answer:
      'You can book by filling out the contact form, sending an email to zuzanamanova@email.cz, calling +420 721 231 933, or messaging on WhatsApp. Response within 24 hours.',
  },
  {
    question: 'What is the cancellation policy?',
    answer:
      'Free cancellation up to 48 hours before the tour. For cancellations within 48 hours, contact directly to find a solution such as rescheduling.',
  },
  {
    question: 'What should I wear and bring?',
    answer:
      'Wear comfortable walking shoes (Prague has cobblestones). In summer, bring water and sunscreen. In winter, dress warmly in layers. No guidebook needed.',
  },
]);

const ContactPage: React.FC = () => {
  const { language } = useLanguage();

  const title =
    language === 'de'
      ? 'Kontakt – Tour in Prag buchen | +420 721 231 933'
      : 'Contact Zuzana - Book Your Prague Tour | +420 721 231 933';
  const description =
    language === 'de'
      ? 'Kontaktieren Sie Zuzana zur Buchung Ihrer Prag-Tour. Rufen Sie an unter +420 721 231 933, WhatsApp oder E‑Mail. Schnelle Antwort innerhalb von 24 Stunden. Geführte Tour Prag für Deutsche – private Prag-Touren mit deutschem Guide.'
      : 'Contact Zuzana to book your Prague tour. Call +420 721 231 933, WhatsApp, or email. Quick response within 24 hours.';
  const keywords =
    language === 'de'
      ? 'Prag Tour buchen, Prag Reiseführerin Kontakt, Prag Stadtführung Kontakt, Zuzana Manová, geführte Tour Prag für Deutsche, private Prag-Touren mit deutschem Guide'
      : 'book Prague tour, contact Prague tour guide, Prague tour booking, Zuzana Manová contact';
  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href="https://zuzapragtour.de/contact" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://zuzapragtour.de/contact" />
        <script type="application/ld+json">{JSON.stringify(contactFAQ)}</script>
      </Helmet>
      <Contact />
    </>
  );
};

export default ContactPage;