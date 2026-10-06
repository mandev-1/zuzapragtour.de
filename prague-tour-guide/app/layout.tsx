import React from 'react';
import type { Metadata } from 'next';
import { Italiana, Libre_Caslon_Text, Cormorant_Garamond, Inter_Tight, Hanken_Grotesk, EB_Garamond, Newsreader, Noto_Serif, Plus_Jakarta_Sans } from 'next/font/google';
import { LanguageProvider } from '../src/context/LanguageContext';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import BlogPromo from '../src/components/BlogPromo';
import ScrollToTop from '../src/components/ScrollToTop';
import AbTracker from '../src/components/AbTracker';
import Script from 'next/script';
import { ADSENSE_CLIENT, ADSENSE_ENABLED } from '../src/config/adsense';
import '../src/index.css';
import '../src/styles/site-tokens.css';
import '../src/styles/blog-content.css';
import '../src/styles/blog-map.css';
import '../src/styles/journal-index.css';
import '../src/styles/home-ab.css';
import '../src/styles/site-premium.css';

// Font loading: only Italiana (the home hero H1, i.e. the LCP text) is
// preloaded. Every other face loads when a page first uses it, so on a slow
// mobile connection the preloads don't compete with the hero image.
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
  preload: false,
});

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-italic',
  display: 'swap',
  preload: false,
});

const interTight = Inter_Tight({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: false,
});

// /bewerten review page + journal articles (UI text)
const hanken = Hanken_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-hanken',
  display: 'swap',
  preload: false,
});

const ebGaramond = EB_Garamond({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-garamond',
  display: 'swap',
  preload: false,
});

// Journal articles (design_handoff_blog_orte) — variable font incl. optical size
const newsreader = Newsreader({
  style: ['normal', 'italic'],
  axes: ['opsz'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-newsreader',
  display: 'swap',
  preload: false,
});

// Legacy faces (footer, widgets) — self-hosted instead of a render-blocking
// Google Fonts stylesheet.
const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-noto-serif',
  display: 'swap',
  preload: false,
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  preload: false,
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
      // data-ab / data-ab-qa are added by the ab-home edge function (A/B test).
      suppressHydrationWarning
      className={`${italiana.variable} ${libreCaslon.variable} ${cormorant.variable} ${interTight.variable} ${hanken.variable} ${ebGaramond.variable} ${newsreader.variable} ${notoSerif.variable} ${plusJakarta.variable}`}
    >
      <head>
        {/* Icon font subset (~4 KB, font-display: block): fetch it with the page,
            not after the CSS, so icons appear without delay. */}
        <link rel="preload" href="/fonts/material-symbols-subset.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <meta property="og:title" content="..." />
        <meta property="og:description" content="..." />
        <meta property="og:image" content="https://your-site.com/new-thumbnail.jpg" />
        <meta property="og:url" content="https://your-site.com/page" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {ADSENSE_ENABLED && (
          <>
            {/* AdSense site verification — required to activate the account */}
            <meta name="google-adsense-account" content={ADSENSE_CLIENT} />
            {/* lazyOnload: fetched once the page is idle, so it never competes
                with the hero image for bandwidth. */}
            <Script
              id="adsbygoogle-loader"
              async
              strategy="lazyOnload"
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
          <AbTracker />
        </LanguageProvider>
      </body>
    </html>
  );
}
