import React from 'react';
import type { Metadata } from 'next';
import { LanguageProvider } from '../src/context/LanguageContext';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import BlogPromo from '../src/components/BlogPromo';
import ScrollToTop from '../src/components/ScrollToTop';
import '../src/index.css';

export const metadata: Metadata = {
  title: {
    default: 'Prag-Stadtführerin Zuzana Manová | ZuzaPragTour',
    template: '%s | ZuzaPragTour',
  },
  description:
    'Zuzana Manová – deutschsprachige Prag-Expertin & Spezialistin für private Stadtführungen seit 1986. Zertifizierte Führungen durch Altstadt, Karlsbrücke, Prager Burg & Jüdisches Viertel. Über 40 Jahre Erfahrung.',
  metadataBase: new URL('https://zuzapragtour.de'),
  alternates: {
    canonical: '/',
    languages: { de: '/', en: '/' },
  },
  openGraph: {
    siteName: 'Zuza Prague Tours',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,500;0,700;1,400;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body>
        {/* Netlify Forms hidden declarations */}
        <form name="contact" data-netlify="true" hidden>
          <input name="name" /><input name="email" /><input name="message" />
        </form>
        <form name="booking" data-netlify="true" hidden>
          <input name="name" /><input name="email" /><input name="tour" /><input name="message" />
        </form>
        <LanguageProvider>
          <Header />
          <main className="pt-[65px] lg:pt-[73px]">
            {children}
          </main>
          <Footer />
          <BlogPromo />
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
