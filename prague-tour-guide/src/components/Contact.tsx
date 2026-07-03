'use client';

/**
 * Contact — senior-optimized "Kontakt & Buchung" flow (0005 facelift).
 *
 * Rebuilt 1:1 from the handoff prototype (Zuza Prague Tours.dc.html · #/kontakt),
 * the conversion surface deliberately tuned for 50–70-year-old German travellers.
 * Serves BOTH /contact and /book (booking variant).
 *
 * Left: eyebrow + Cormorant lead + intro, a portrait trust card, and contact
 * rows with 22px burgundy icons (phone at 1.25rem). Right: a frosted-glass card
 * with three numbered steps — (1) a single-column radio-card tour picker (real
 * radios, visible ring+dot, explicit selected state), (2) required Name/E-Mail +
 * optional phone, (3) optional date + message — then a ★★★★★ trust row, a large
 * burgundy submit, a lock/privacy line, and a phone-first block. Success state is
 * a filled check + thank-you + phone.
 *
 * Real Netlify mechanics preserved: form name "contact"/"booking", data-netlify,
 * the bot-field honeypot, the field names (name/email/phone/tour/date/message —
 * declared in app/layout.tsx), the POST submit + success state, and the
 * #contact-title anchor that header/footer links target.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BRAND } from '../brand';
import { tours } from '../data/tours';
import { Kicker, Reveal, Stars, btnClass, GLASS_CARD_STYLE, SHELL } from './site/SiteUI';

type ContactProps = {
  variant?: 'default' | 'booking';
  selectedTourTitle?: string;
};

const encode = (data: Record<string, string>) =>
  Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

const WA = `https://wa.me/${BRAND.phoneRaw.replace(/[^0-9]/g, '')}`;

const inputClass =
  'w-full box-border rounded-md border border-stone-400 bg-white px-[1.05rem] py-[0.95rem] font-body text-[1.05rem] text-ink outline-none transition-[border-color,box-shadow] duration-300 focus:border-burgundy focus:shadow-[0_0_0_3px_rgba(107,31,42,0.14)]';
const fieldLabelClass = 'mb-[0.45rem] block font-sans text-[1rem] font-medium text-ink';

const Contact: React.FC<ContactProps> = ({ variant = 'default', selectedTourTitle }) => {
  const { t, language } = useLanguage();
  const de = language !== 'en';
  const isBooking = variant === 'booking';

  const undecidedTitle = de ? 'Ich bin noch unentschlossen' : 'I’m still undecided';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tour: selectedTourTitle || '',
    date: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const formCardRef = useRef<HTMLDivElement>(null);

  // On desktop, when the guest arrives via the #contact-title anchor (booking
  // CTAs across the site point at /book#contact-title), glide the enquiry card
  // into view a beat after load so the actionable form greets them.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash !== '#contact-title') return;
    if (!window.matchMedia('(min-width: 768px)').matches) return;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => {
      const card = formCardRef.current;
      if (!card) return;
      const top = card.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
    }, 300);
    return () => window.clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));

  const selectTour = (title: string) => setFormData((f) => ({ ...f, tour: title }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(false);
    const formName = isBooking ? 'booking' : 'contact';
    const payload: Record<string, string> = { 'form-name': formName, 'bot-field': '', ...formData };
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(payload),
      });
      if (res.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else setSubmitError(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  /* Radio-card tour options — real tours + an "undecided" choice. */
  const tourOptions = tours
    .map((tr) => ({
      key: tr.id,
      title: t(tr.titleKey as any),
      meta: `${t(tr.durationKey as any)} · ${
        tr.id === 'custom' ? (de ? 'ganz nach Ihren Wünschen' : 'entirely to your wishes') : de ? 'Privat' : 'Private'
      }`,
    }))
    .concat([
      {
        key: 'unentschlossen',
        title: undecidedTitle,
        meta: de ? 'Zuzana berät Sie gern — ganz unverbindlich' : 'Zuzana will gladly advise you — no obligation',
      },
    ]);

  /* Brand contact details (phone / WhatsApp / e-mail / response time). */
  const details: { icon: string; label: string; value: string; href?: string; big?: boolean }[] = [
    { icon: 'call', label: de ? 'Telefon' : 'Phone', value: BRAND.phone, href: `tel:${BRAND.phoneRaw}`, big: true },
    { icon: 'chat', label: 'WhatsApp', value: de ? 'Direkt schreiben' : 'Message directly', href: WA },
    { icon: 'mail', label: 'E-Mail', value: BRAND.email, href: `mailto:${BRAND.email}` },
    { icon: 'schedule', label: de ? 'Antwortzeit' : 'Response time', value: de ? 'In der Regel unter 24 Stunden' : 'Usually under 24 hours' },
  ];

  const StepHead: React.FC<{ n: number; children: React.ReactNode }> = ({ n, children }) => (
    <div className="mb-[0.4rem] flex items-baseline gap-[0.85rem]">
      <span aria-hidden className="font-display text-[1.6rem] leading-none text-brass-deep">{n}</span>
      <span className="font-sans text-[1.15rem] font-semibold text-ink">{children}</span>
    </div>
  );

  return (
    <div className="premium-inner text-ink antialiased">
      {/* ── Banner (keeps #contact-title anchor) ─────────────────────── */}
      <header className="border-b border-rule pb-[clamp(2.5rem,5vh,4rem)] pt-[clamp(2.5rem,6vw,4.5rem)]">
        <div className={SHELL}>
          <Kicker>{de ? 'Kontakt & Buchung' : 'Contact & booking'}</Kicker>
          <h1
            id="contact-title"
            className="mt-4 scroll-mt-28 font-display text-[clamp(2.6rem,6vw,4.4rem)] font-normal leading-[1.04] tracking-[-0.015em] text-ink [text-wrap:balance]"
          >
            {de ? (
              <>Erzählen Sie mir, was Sie <em className="font-italic italic text-burgundy">interessiert</em>.</>
            ) : (
              <>Tell me what <em className="font-italic italic text-burgundy">interests</em> you.</>
            )}
          </h1>
          <p className="mt-[1.4rem] max-w-[40rem] font-body text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.65] text-ink-mute">
            {de
              ? 'Keine Agentur, kein Callcenter. Sie schreiben mir, und ich antworte persönlich — in der Regel innerhalb von 24 Stunden.'
              : 'No agency, no call centre. You write to me, and I reply personally — usually within 24 hours.'}
          </p>
        </div>
      </header>

      {/* ── Body: aside (left) + enquiry form (right) ────────────────── */}
      <section className="pb-[clamp(4rem,9vh,7rem)] pt-[clamp(2.5rem,5vh,4rem)]">
        <div className={SHELL}>
          <div className="grid grid-cols-1 gap-x-[clamp(2.5rem,6vw,5rem)] gap-y-[clamp(2.5rem,6vw,3.5rem)] lg:grid-cols-[0.85fr_1.15fr] lg:items-start">

            {/* Aside — personal intro, portrait trust card, contact rows (sticky on desktop) */}
            <div className="lg:sticky lg:top-[100px] lg:self-start">
              <Reveal>
              <Kicker>{de ? 'Direkt mit Zuzana' : 'Directly with Zuzana'}</Kicker>
              <p className="mb-[1.2rem] mt-4 font-italic text-[clamp(1.4rem,2.4vw,1.85rem)] italic leading-[1.42] text-burgundy">
                {de ? 'Jede gute Tour beginnt mit einem Gespräch.' : 'Every good tour begins with a conversation.'}
              </p>
              <p className="mb-[1.6rem] font-body text-[1.05rem] leading-[1.7] text-ink-soft">
                {de
                  ? 'Sagen Sie mir, wer mitkommt und was Sie sehen möchten — oder lassen Sie sich einfach von mir leiten. Ich melde mich persönlich bei Ihnen zurück.'
                  : "Tell me who's coming and what you'd like to see — or simply let me guide you. I'll get back to you personally."}
              </p>

              {/* Portrait trust card */}
              <div className="mb-[1.6rem] flex items-center gap-[1.1rem] rounded-lg border border-rule bg-white px-[1.2rem] py-[1.1rem]">
                <img
                  src="/images/zuzana-portrait.jpg"
                  alt="Ing. Zuzana Manová"
                  className="h-[72px] w-[72px] shrink-0 rounded-full object-cover [object-position:center_18%]"
                  loading="lazy"
                />
                <div>
                  <div className="font-sans text-[1.08rem] font-semibold text-ink">Ing. Zuzana Manová</div>
                  <div className="mt-[0.2rem] font-sans text-[0.95rem] leading-[1.45] text-ink-soft">
                    {de
                      ? 'Ihre persönliche Ansprechpartnerin — zertifiziert, deutschsprachig, seit 1986.'
                      : 'Your personal contact — certified, German-speaking, since 1986.'}
                  </div>
                </div>
              </div>

              <div className="grid gap-[1.35rem] border-t border-rule pt-[1.6rem]">
                {details.map((d) => {
                  const ext = d.href?.startsWith('http');
                  return (
                    <div key={d.label} className="flex items-start gap-4">
                      <span className="material-symbols-outlined mt-[2px] text-[22px] text-burgundy" aria-hidden>{d.icon}</span>
                      <div>
                        <div className="font-sans text-[11.5px] uppercase tracking-[0.14em] text-ink-mute">{d.label}</div>
                        <div className={`mt-[0.15rem] font-sans ${d.big ? 'text-[1.25rem] font-semibold' : 'text-[1.1rem]'} text-ink`}>
                          {d.href ? (
                            <a
                              href={d.href}
                              target={ext ? '_blank' : undefined}
                              rel={ext ? 'noopener noreferrer' : undefined}
                              className="text-ink no-underline transition-colors hover:text-burgundy"
                            >
                              {d.value}
                            </a>
                          ) : (
                            d.value
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              </Reveal>
            </div>

            {/* Enquiry — frosted-glass card */}
            <Reveal delay={80}>
              <div ref={formCardRef} style={GLASS_CARD_STYLE} className="overflow-hidden">
                {submitted ? (
                  <div className="px-[1.8rem] py-[3.5rem] text-center">
                    <span className="material-symbols-outlined text-[52px] text-[color:var(--success)]" aria-hidden style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <h2 className="mb-[0.6rem] mt-[0.8rem] font-display text-[2.1rem] font-normal text-ink">
                      {de ? 'Vielen Dank für Ihre Anfrage!' : 'Thank you for your enquiry!'}
                    </h2>
                    <p className="mx-auto mb-[1.6rem] max-w-[28rem] font-body text-[1.15rem] leading-[1.65] text-ink-soft">
                      {de
                        ? 'Ihre Nachricht ist angekommen. Zuzana antwortet Ihnen persönlich — in der Regel innerhalb von 24 Stunden.'
                        : "Your message has arrived. Zuzana will reply personally — usually within 24 hours."}
                    </p>
                    <div className="inline-block border-t border-rule pt-[1.3rem] text-center">
                      <div className="font-sans text-[1rem] text-ink-soft">
                        {de ? 'Sie haben es eilig? Rufen Sie gern an:' : 'In a hurry? Feel free to call:'}
                      </div>
                      <a href={`tel:${BRAND.phoneRaw}`} className="mt-[0.35rem] inline-block font-sans text-[1.3rem] font-semibold text-burgundy no-underline">
                        {BRAND.phone}
                      </a>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="border-b border-rule px-[1.9rem] py-[1.5rem]">
                      <div className="font-display text-[1.55rem] text-ink">{de ? 'Unverbindliche Anfrage' : 'No-obligation enquiry'}</div>
                      <div className="mt-[0.3rem] font-sans text-[1rem] leading-[1.5] text-ink-soft">
                        {de
                          ? 'Kostenlos und ohne Verpflichtung — Zuzana antwortet Ihnen persönlich.'
                          : 'Free and without obligation — Zuzana answers you personally.'}
                      </div>
                    </div>

                    <form
                      name={isBooking ? 'booking' : 'contact'}
                      data-netlify="true"
                      netlify-honeypot="bot-field"
                      className="grid gap-[1.9rem] px-[clamp(1.4rem,3vw,1.9rem)] py-[clamp(1.6rem,3vw,2.1rem)]"
                      onSubmit={handleSubmit}
                    >
                      <input type="hidden" name="form-name" value={isBooking ? 'booking' : 'contact'} />
                      <input type="hidden" name="tour" value={formData.tour} />
                      <p className="hidden"><label>Don&apos;t fill this out: <input name="bot-field" /></label></p>

                      {/* Step 1 — tour picker */}
                      <div>
                        <StepHead n={1}>{de ? 'Welche Tour interessiert Sie?' : 'Which tour interests you?'}</StepHead>
                        <p className="mb-[0.9rem] ml-[2.45rem] mt-0 font-sans text-[0.95rem] leading-[1.5] text-ink-soft">
                          {de
                            ? 'Eine Auswahl genügt — Sie können alles später mit Zuzana anpassen.'
                            : 'One choice is enough — you can adjust everything later with Zuzana.'}
                        </p>
                        <div role="radiogroup" aria-label={de ? 'Tour auswählen' : 'Select a tour'} className="grid grid-cols-1 gap-[0.65rem]">
                          {tourOptions.map((opt) => {
                            const sel = formData.tour === opt.title;
                            return (
                              <label
                                key={opt.key}
                                onClick={() => selectTour(opt.title)}
                                className={`relative flex min-h-[64px] cursor-pointer items-center gap-4 rounded-md border bg-white px-[1.15rem] py-[0.9rem] transition-[border-color,background-color,box-shadow] duration-300 ease-brand focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-[2px] focus-within:outline-burgundy ${
                                  sel
                                    ? 'border-burgundy bg-[#FDFBF7] shadow-[0_0_0_1px_var(--burgundy),0_8px_24px_rgba(26,23,20,0.08)]'
                                    : 'border-stone-400'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="tourChoice"
                                  checked={sel}
                                  onChange={() => selectTour(opt.title)}
                                  className="absolute h-px w-px opacity-0"
                                />
                                <span aria-hidden className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border-2 bg-white ${sel ? 'border-burgundy' : 'border-stone-400'}`}>
                                  <span className={`h-[13px] w-[13px] rounded-full transition-colors duration-300 ${sel ? 'bg-burgundy' : 'bg-transparent'}`} />
                                </span>
                                <div className="min-w-0 flex-1">
                                  <div className={`font-sans text-[1.08rem] font-semibold leading-[1.35] transition-colors duration-300 ${sel ? 'text-burgundy' : 'text-ink'}`}>{opt.title}</div>
                                  <div className="mt-[0.15rem] font-sans text-[0.92rem] leading-[1.4] text-ink-soft">{opt.meta}</div>
                                </div>
                                <span aria-hidden className={`material-symbols-outlined ml-auto shrink-0 text-[24px] text-burgundy transition-opacity duration-300 ${sel ? 'opacity-100' : 'opacity-0'}`} style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step 2 — contact details */}
                      <div className="border-t border-rule pt-[1.6rem]">
                        <StepHead n={2}>{de ? 'Wie erreiche ich Sie?' : 'How can I reach you?'}</StepHead>
                        <p className="mb-4 ml-[2.45rem] mt-0 font-sans text-[0.95rem] leading-[1.5] text-ink-soft">
                          <span className="text-burgundy">*</span> {de ? 'Pflichtfeld — alles andere ist freiwillig.' : 'Required — everything else is optional.'}
                        </p>
                        <div className="grid gap-[1.15rem]">
                          <label className="block">
                            <span className={fieldLabelClass}>{t('form.name')} <span aria-hidden className="text-burgundy">*</span></span>
                            <input name="name" type="text" required autoComplete="name" placeholder={de ? 'Vor- und Nachname' : 'First and last name'} value={formData.name} onChange={handleChange} className={inputClass} />
                          </label>
                          <label className="block">
                            <span className={fieldLabelClass}>{t('form.email')} <span aria-hidden className="text-burgundy">*</span></span>
                            <input name="email" type="email" required autoComplete="email" placeholder={de ? 'ihre@email.de' : 'you@email.com'} value={formData.email} onChange={handleChange} className={inputClass} />
                          </label>
                          <label className="block">
                            <span className={fieldLabelClass}>
                              {de ? 'Telefon' : 'Phone'} <span className="font-normal text-ink-mute">{de ? '(freiwillig — falls Sie einen Rückruf wünschen)' : '(optional — if you’d like a callback)'}</span>
                            </span>
                            <input name="phone" type="tel" autoComplete="tel" placeholder={de ? 'z. B. +49 170 1234567' : 'e.g. +49 170 1234567'} value={formData.phone} onChange={handleChange} className={inputClass} />
                          </label>
                        </div>
                      </div>

                      {/* Step 3 — wishes */}
                      <div className="border-t border-rule pt-[1.6rem]">
                        <StepHead n={3}>
                          {de ? 'Ihre Wünsche' : 'Your wishes'} <span className="font-normal text-ink-mute">{de ? '(freiwillig)' : '(optional)'}</span>
                        </StepHead>
                        <div className="mt-[0.9rem] grid gap-[1.15rem]">
                          <label className="block">
                            <span className={fieldLabelClass}>{de ? 'Wunschtermin' : 'Preferred date'}</span>
                            <input name="date" type="text" placeholder={de ? 'z. B. Mai 2026 — oder noch offen' : 'e.g. May 2026 — or still open'} value={formData.date} onChange={handleChange} className={inputClass} />
                          </label>
                          <label className="block">
                            <span className={fieldLabelClass}>{de ? 'Ihre Nachricht' : 'Your message'}</span>
                            <textarea
                              name="message" rows={4}
                              value={formData.message} onChange={handleChange}
                              placeholder={de ? 'Erzählen Sie mir gern, wer mitkommt und was Sie besonders interessiert…' : "Tell me who's coming and what interests you most…"}
                              className={`${inputClass} resize-y leading-[1.6]`}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Trust + submit + phone-first */}
                      <div className="grid gap-4 border-t border-rule pt-[1.5rem]">
                        <div className="flex flex-wrap items-center justify-center gap-[0.55rem]">
                          <Stars size={17} />
                          <span className="font-sans text-[0.98rem] text-ink-soft">
                            {de ? '5,0 von 5 · über 4.900 Gäste seit 1986' : '5.0 of 5 · over 4,900 guests since 1986'}
                          </span>
                        </div>

                        {submitError && (
                          <p className="rounded-md bg-burgundy/5 px-4 py-2.5 text-center font-body text-[0.9rem] text-burgundy-deep">
                            {de
                              ? 'Fehler beim Senden. Bitte versuchen Sie es erneut oder schreiben Sie mir per WhatsApp.'
                              : 'Something went wrong. Please try again or reach me on WhatsApp.'}
                          </p>
                        )}

                        <button type="submit" disabled={submitting} className={`${btnClass('solid')} w-full justify-center disabled:opacity-60`}>
                          {submitting ? (de ? 'Wird gesendet…' : 'Sending…') : de ? 'Unverbindliche Anfrage senden' : 'Send a no-obligation enquiry'}
                          <span className="material-symbols-outlined text-[17px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden>arrow_forward</span>
                        </button>

                        <p className="m-0 flex items-center justify-center gap-[0.45rem] text-center font-sans text-[0.95rem] text-ink-soft">
                          <span className="material-symbols-outlined text-[16px] text-brass-deep" aria-hidden>lock</span>
                          {de ? 'Unverbindlich & kostenlos · Ihre Daten werden vertraulich behandelt' : 'No obligation & free · your data is treated confidentially'}
                        </p>

                        <div className="border-t border-rule-soft pt-[1.15rem] text-center">
                          <div className="font-sans text-[1rem] text-ink-soft">
                            {de ? 'Sie möchten lieber persönlich sprechen?' : 'Prefer to speak in person?'}
                          </div>
                          <a href={`tel:${BRAND.phoneRaw}`} className="mt-[0.35rem] inline-block font-sans text-[1.35rem] font-semibold text-burgundy no-underline">
                            {BRAND.phone}
                          </a>
                          <div className="mt-[0.3rem] font-sans text-[0.95rem] text-ink-mute">
                            {de ? 'Ich spreche Deutsch — auch per ' : 'I speak German & English — also via '}
                            <a href={WA} target="_blank" rel="noopener noreferrer" className="text-burgundy">WhatsApp</a>.
                          </div>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── Sticky WhatsApp (mobile only) ────────────────────────────── */}
      <a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#25d366] px-6 py-3 font-sans text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 md:hidden"
        aria-label="WhatsApp"
      >
        <span className="material-symbols-outlined text-[18px]" aria-hidden>chat</span>
        {t('contact.whatsapp.sticky')}
      </a>
    </div>
  );
};

export default Contact;
