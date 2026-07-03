import React from 'react';
import type { Metadata } from 'next';
import { Italiana, Libre_Caslon_Text, Cormorant_Garamond, Inter_Tight } from 'next/font/google';
import { LanguageProvider } from '../src/context/LanguageContext';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import BlogPromo from '../src/components/BlogPromo';
import ScrollToTop from '../src/components/ScrollToTop';
import Script from 'next/script';
import { ADSENSE_CLIENT, ADSENSE_ENABLED } from '../src/config/adsense';
import '../src/index.css';
import '../src/styles/site-tokens.css';
import '../src/styles/blog-content.css';
import '../src/styles/blog-map.css';
import '../src/styles/site-premium.css';
import '../src/styles/review-funnel.css';

const italiana = Italiana({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const libreCaslon = Libre_Caslon_Text({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-italic',
  display: 'swap',
});

const interTight = Inter_Tight({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

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
    <html
      lang="de"
      className={`${italiana.variable} ${libreCaslon.variable} ${cormorant.variable} ${interTight.variable}`}
    >
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
        {ADSENSE_ENABLED && (
          <>
            {/* AdSense site verification — required to activate the account */}
            <meta name="google-adsense-account" content={ADSENSE_CLIENT} />
            <Script
              id="adsbygoogle-loader"
              async
              strategy="afterInteractive"
              crossOrigin="anonymous"
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            />
          </>
        )}
      </head>
      <body>
        {/* Netlify Forms hidden declarations */}
        <form name="contact" data-netlify="true" hidden>
          <input name="name" /><input name="email" /><input name="phone" /><input name="tour" /><input name="date" /><input name="message" />
        </form>
        <form name="booking" data-netlify="true" hidden>
          <input name="name" /><input name="email" /><input name="phone" /><input name="tour" /><input name="date" /><input name="message" />
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
