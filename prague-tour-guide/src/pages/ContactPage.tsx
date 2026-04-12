import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Contact from '../components/Contact';
import { useLanguage } from '../context/LanguageContext';

const ContactPage: React.FC = () => {
  const { language } = useLanguage();
  useEffect(() => {
    if (window.location.hash === '#contact-title') {
      const el = document.getElementById('contact-title');
      if (el) {
        // Minor timeout ensures layout is ready before scrolling
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
      }
    }
  }, []);

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
      ? 'Prag Tour buchen, Prag Reiseführerin Kontakt, Prag Stadtführung Kontakt, Zuzana Manova, geführte Tour Prag für Deutsche, private Prag-Touren mit deutschem Guide'
      : 'book Prague tour, contact Prague tour guide, Prague tour booking, Zuzana Manova contact';
  return (
    <>
      <Helmet>
        <html lang={language} />
        <title id="contact-title">{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
  <link rel="canonical" href="https://zuzapragtour.de/contact" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
  <meta property="og:url" content="https://zuzapragtour.de/contact" />
      </Helmet>
      <Contact />
    </>
  );
};

export default ContactPage;