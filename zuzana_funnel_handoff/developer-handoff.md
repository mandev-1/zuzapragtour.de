# Zuzana Manová – Prag Führungen | Developer Handoff

## Goal
Build a long-form German landing page that moves visitors through AIDA (Attention → Interest → Desire → Action) and generates **unverbindliche Anfragen**. An inquiry is not a confirmed booking.

## Brand / design tokens
- Cream background: `#F8F4EB`
- Burgundy accent/primary CTA: `#792A39`
- Ink text: `#171514`
- Stone borders: `#DED5C9`
- Muted text: `#6F6863`
- Soft rose surface: `#F3E8E5`
- Heading font: refined serif (e.g. Cormorant Garamond / equivalent); body/UI: clean sans (e.g. Inter / equivalent)
- Mood: premium European editorial, warm authentic photography, generous whitespace, restrained line icons, light borders; avoid heavy shadows, fake urgency, fake reviews, oversized gradients.

## Main route / page sections
1. Header: TOUR​EN · ÜBER ZUZANA · JOURNAL · KONTAKT; main CTA `Tour anfragen`.
2. Hero: H1 `Prag entdecken – mit einer Stadtführerin, die die Stadt wirklich kennt.`; intro `Erleben Sie berühmte Sehenswürdigkeiten und verborgene Geschichten Prags – persönlich, entspannt und auf Deutsch. Mit einer Führung, die sich an Ihren Interessen orientiert.`; CTA `Private Tour anfragen`; secondary `Unsere Touren entdecken ↓`.
3. Trust/USP strip: `Persönlich & individuell`, `Prag auf Deutsch entdecken`, `Raum für Ihre Fragen`, `Tour nach Ihren Interessen`. Publish only claims that are true.
4. Interest/problem: `Prag ist voller Geschichten. Man muss nur wissen, wo man sie findet.` Copy about context, historic lanes, room for questions.
5. Benefits: better understanding of Prague, relaxed pace, personal experience.
6. Tour cards: `Karlsbrücke & Altstadt`, `Prager Burg`, `Verstecktes Prag`, optional `Ihre individuelle Tour`. Titles, duration, price and tour details are content-managed; do not invent.
7. Feature/itinerary section: concrete route highlights and tour-specific detail.
8. How it works: submit inquiry → personal response → agree details. Do not promise the booking is confirmed on form submit.
9. Guide section: `Ich bin Zuzana. Und ich freue mich darauf, Ihnen mein Prag zu zeigen.` Replace generic bio with real approved biography and authentic portrait.
10. Audience fit / use cases.
11. Testimonials: only true, authorized reviews with source. No placeholder or fake stars in production.
12. Gallery / practical info: duration, price/pricing model, language, meeting point, group size, accessibility; only confirmed facts.
13. FAQ: binding status, price, dates, customization, weather, children, meeting point, response time.
14. Inquiry form.
15. Final CTA: `Ihr Prag. Ihr Tempo. Ihre persönliche Führung.` / `Private Tour anfragen`.
16. Footer with contact and legal pages.

## Primary CTA labels
- Homepage/header: `Private Tour anfragen` / `Tour anfragen`
- Tour card: `Tour entdecken`
- Tour detail: `Diese Tour anfragen`
- Submit: `Unverbindliche Anfrage senden`
- Success page: `Weitere Touren entdecken`

## Form fields
- `tourSlug` (prefilled from query `?tour=<slug>`, validated against published tours)
- `preferredDate` (optional per business flow)
- `dateFlexible` (boolean)
- `partySize` (select/range agreed with client)
- `language` (default Deutsch; only languages actually offered)
- `name` (required)
- `email` (required and validated on server)
- `message` (optional, length-limited)
- privacy notice/link, legal wording approved by responsible party

Keep fields to a minimum. If submit fails, keep the entered values. Provide inline accessible errors and a general summary. Disable duplicate submission while pending. Do not require a marketing opt-in to process an inquiry unless there is a separate lawful need.

## Inquiry processing requirements
1. Validate all fields server-side (Zod or equivalent), not only in the browser.
2. Apply rate limiting and appropriate spam protection.
3. Persist inquiry in DB/CRM and generate an inquiry ID before reporting success.
4. Notify Zuzana and send a transactional receipt email to the visitor.
5. Email confirmation must say the inquiry was received, not that a reservation is confirmed.
6. Log delivery status and operational errors without logging unnecessary personal data.
7. Keep credentials/secrets server-side only.

### Suggested customer confirmation (German)
Subject: `Vielen Dank für Ihre Anfrage bei Zuzana Manová`

`Guten Tag {name},\n\nVielen Dank für Ihre Anfrage zur Führung „{tourTitle}“. Ihre Nachricht ist bei mir angekommen. Ich prüfe Ihre Angaben und melde mich mit den nächsten Schritten.\n\nBitte beachten Sie: Dies ist eine Eingangsbestätigung und noch keine bestätigte Buchung.\n\nHerzliche Grüße\nZuzana Manová\nPrag Führungen`

## Suggested routes
- `/` landing page
- `/touren` tour index
- `/touren/[slug]` detail page
- `/ueber-zuzana` guide profile
- `/journal` and `/journal/[slug]` (phase 2)
- `/kontakt`
- `/anfrage?tour=<slug>`
- `/anfrage-erfolgreich`
- `/datenschutz`, `/impressum`, cookie settings if needed

## Suggested component tree
- `SiteHeader`, `SiteFooter`
- `HeroSection`, `TrustBar`, `SplitFeatureSection`
- `TourGrid`, `TourCard`, `TourDetailHero`, `TourFacts`, `Itinerary`
- `GuideProfile`, `TestimonialCard`, `PhotoGallery`
- `FAQAccordion`, `InquiryForm`, `FinalCTA`
- analytics helper/provider

## Analytics events
- `page_view`
- `tour_view` (`tour_slug`)
- `cta_click` (`cta_id`, `cta_location`, `destination`)
- `inquiry_start` (`tour_slug`, `form_location`)
- `inquiry_submit` only after server persistence success (`tour_slug`, `form_variant`)
- `inquiry_error` (generic error category; no field values)
- `qualified_lead` (if available from CRM, ideally aggregated/server-side)
- `booking_confirmed` (once actually confirmed)

Never send name, email, message, phone, or other direct personal data to analytics. Configure analytics and cookies according to the reviewed privacy/consent plan.

## SEO / performance
- Unique German title + description for homepage and every tour detail.
- Canonicals, Open Graph, sitemap, robots.txt, meaningful heading hierarchy.
- Structured data only when it reflects actual content; do not add fake review ratings.
- `next/image`, correct dimensions and prioritization for hero LCP image; lazy-load below-fold imagery.
- Test mobile layout, accessibility, and Core Web Vitals.

## Accessibility
- Semantic HTML, keyboard operation, visible focus states, adequate contrast.
- Form labels programmatically connected; inline errors and error summary.
- FAQ accordion keyboard-accessible with `aria-expanded`.
- Proper alt text; empty alt for purely decorative imagery.
- Respect reduced-motion and avoid hover-only interactions.

## Launch acceptance checklist
- [ ] All placeholders replaced or intentionally removed.
- [ ] German copy proofread; no unverified claims.
- [ ] Actual tours, durations, pricing, languages, meeting point and limitations approved.
- [ ] Only real, approved testimonials are used.
- [ ] Desktop/tablet/mobile layouts reviewed.
- [ ] CTA and prefilled tour links work.
- [ ] Server-side form validation, persistence, spam protection and error states tested.
- [ ] Both internal notification and customer receipt email tested.
- [ ] Success page says inquiry received, not booking confirmed.
- [ ] Analytics events tested and contain no PII.
- [ ] SEO metadata, canonical, sitemap, robots and Open Graph checked.
- [ ] Impressum, Datenschutz and consent implementation reviewed by responsible party.
- [ ] End-to-end test completed before launch.

## Items requiring client confirmation
- Official logo/wordmark, real portrait and authorized city photography.
- Final tour catalog: titles, route, length, prices, language, group sizes and meeting point.
- Exact qualification/certification wording.
- Real testimonials plus source and permission/valid use.
- Who receives inquiries, expected response time, and operational schedule.
- Legal contact, data retention, privacy wording and analytics consent settings.
- Domain, hosting and production access.
