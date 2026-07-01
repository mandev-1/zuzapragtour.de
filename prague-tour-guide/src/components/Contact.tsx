'use client';

/**
 * Contact — premium "quiet-luxury editorial" direction (0003 kontakt.html).
 *
 * Serves BOTH /contact and /book (booking variant). The redesign matches the
 * handoff's kontakt.html mockup 1:1 (bilingual): the "Erzählen Sie mir, was Sie
 * interessiert." banner, a personal aside with brand details, and a glass
 * enquiry card whose form has a real Tour <select> (driven by src/data/tours.ts).
 *
 * The real Netlify mechanics are preserved: form name "contact"/"booking",
 * data-netlify, the bot-field honeypot, the field names (name/email/tour/date/
 * message — declared in app/layout.tsx), the POST submit handler + success
 * state, and the #contact-title anchor that header/footer links target.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BRAND } from '../brand';
import { tours } from '../data/tours';
import { Kicker, Reveal, btnClass, SHELL } from './site/SiteUI';

type ContactProps = {
  variant?: 'default' | 'booking';
  selectedTourTitle?: string;
};

const encode = (data: Record<string, string>) =>
  Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

const WA = `https://wa.me/${BRAND.phoneRaw.replace(/[^0-9]/g, '')}`;

const labelClass = 'mb-[0.4rem] block font-sans text-[12px] text-stone-700';
const inputClass =
  'w-full rounded-md border border-stone-200 bg-white/60 px-4 py-3 font-body text-[0.98rem] text-ink placeholder:text-ink-mute transition-colors duration-200 focus:border-ink focus:outline-none';

const Contact: React.FC<ContactProps> = ({ variant = 'default', selectedTourTitle }) => {
  const { t, language } = useLanguage();
  const de = language !== 'en';
  const isBooking = variant === 'booking';

  const undecided = de ? 'Noch unentschlossen' : 'Still undecided';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tour: selectedTourTitle || t(tours[0].titleKey as any),
    date: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    if (!mq.matches) return;
    const id = window.requestAnimationFrame(() => nameInputRef.current?.focus({ preventScroll: true }));
    return () => window.cancelAnimationFrame(id);
  }, []);

  // On desktop, when the guest arrives via the #contact-title anchor (the booking
  // CTAs across the site point at /book#contact-title and /contact#contact-title,
  // which only land on the heading), glide the enquiry card into view a beat after
  // load so the actionable Anfrageformular — not just the title — is what greets them.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash !== '#contact-title') return;
    if (!window.matchMedia('(min-width: 768px)').matches) return;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => {
      const card = formCardRef.current;
      if (!card) return;
      const headerClear = 96; // clear the fixed site header + a little air
      const top = card.getBoundingClientRect().top + window.scrollY - headerClear;
      window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
    }, 300);
    return () => window.clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
      if (res.ok) setSubmitted(true);
      else setSubmitError(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  /* Brand contact details (phone / WhatsApp / e-mail / response time). */
  const details: { icon: string; label: string; value: string; href?: string }[] = [
    { icon: 'call', label: de ? 'Telefon' : 'Phone', value: BRAND.phone, href: `tel:${BRAND.phoneRaw}` },
    { icon: 'chat', label: 'WhatsApp', value: de ? 'Direkt schreiben' : 'Message directly', href: WA },
    { icon: 'mail', label: 'E-Mail', value: BRAND.email, href: `mailto:${BRAND.email}` },
    { icon: 'schedule', label: de ? 'Antwortzeit' : 'Response time', value: de ? 'In der Regel unter 24 Stunden' : 'Usually under 24 hours' },
  ];

  return (
    <div className="premium-inner pb-[clamp(3rem,7vh,6rem)] text-ink antialiased">

      {/* ── Header band (keeps #contact-title anchor) ───────────────── */}
      <header className="relative border-b border-rule pb-[clamp(2.5rem,5vh,4rem)] pt-[clamp(2.5rem,6vw,4.5rem)]">
        <span
          aria-hidden
          className="pointer-events-none absolute z-0 hidden select-none leading-none text-brass opacity-[0.02] min-[1180px]:block"
          style={{ right: 'max(1rem, calc(50vw - 605px))', top: 'clamp(3.5rem, 9vh, 6rem)', fontSize: 'clamp(3.2rem, 6.5vw, 6rem)', transform: 'rotate(-9deg)' }}
        >
          ★
        </span>
        <div className={`relative z-[1] ${SHELL}`}>
          <Kicker>{de ? 'Kontakt & Buchung' : 'Contact & Booking'}</Kicker>
          <h1
            id="contact-title"
            className="mt-4 scroll-mt-28 font-display text-[clamp(2.6rem,6vw,4.6rem)] font-normal leading-[1.02] tracking-[-0.02em] text-ink [text-wrap:balance]"
          >
            {de ? <>Erzählen Sie mir, was Sie <em className="font-italic italic text-burgundy">interessiert</em>.</> : <>Tell me what <em className="font-italic italic text-burgundy">interests</em> you.</>}
          </h1>
          <p className="mt-[1.4rem] max-w-[40rem] font-body text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.65] text-ink-mute">
            {de
              ? 'Keine Agentur, kein Callcenter. Sie schreiben mir, und ich antworte persönlich — in der Regel innerhalb von 24 Stunden.'
              : 'No agency, no call centre. You write to me, and I reply personally — usually within 24 hours.'}
          </p>
        </div>
      </header>

      {/* ── Body: aside (left) + enquiry form (right) ───────────────── */}
      <section className="relative pt-[clamp(2.5rem,5vh,4rem)]">
        <span
          aria-hidden
          className="pointer-events-none absolute z-0 hidden select-none leading-none text-brass opacity-[0.02] min-[1180px]:block"
          style={{ right: 'max(1rem, calc(50vw - 612px))', top: 'clamp(1.5rem, 4vh, 3rem)', fontSize: 'clamp(2.6rem, 5vw, 4.6rem)', transform: 'rotate(7deg)' }}
        >
          ★
        </span>

        <div className={`relative z-[1] ${SHELL}`}>
          <div className="grid grid-cols-1 gap-x-[clamp(2.5rem,6vw,5rem)] gap-y-[clamp(2.5rem,6vw,3.5rem)] lg:grid-cols-[0.85fr_1.15fr] lg:items-start">

            {/* Aside — personal intro + brand details */}
            <Reveal className="order-2 lg:order-1">
              <Kicker>{de ? 'Direkt mit Zuzana' : 'Directly with Zuzana'}</Kicker>
              <p className="mb-[1.2rem] mt-4 font-italic text-[clamp(1.4rem,2.4vw,1.85rem)] italic leading-[1.42] text-burgundy">
                {de ? 'Jede gute Tour beginnt mit einem Gespräch.' : 'Every good tour begins with a conversation.'}
              </p>
              <p className="mb-[1.6rem] max-w-[34rem] font-body text-[1.05rem] leading-[1.7] text-ink-soft">
                {de
                  ? 'Sagen Sie mir, wer mitkommt und was Sie sehen möchten — oder lassen Sie sich einfach von mir leiten. Ich melde mich persönlich bei Ihnen zurück.'
                  : "Tell me who's coming and what you'd like to see — or simply let me guide you. I'll get back to you personally."}
              </p>

              <div className="grid gap-[1.2rem] border-t border-rule pt-[1.6rem]">
                {details.map((d) => {
                  const ext = d.href?.startsWith('http');
                  return (
                    <div key={d.label} className="flex items-start gap-[0.9rem]">
                      <span className="material-symbols-outlined mt-[2px] text-[20px] text-burgundy" aria-hidden>{d.icon}</span>
                      <div>
                        <div className="font-sans text-[10px] uppercase tracking-[0.18em] text-ink-mute">{d.label}</div>
                        <div className="mt-[2px] font-sans text-[0.98rem] text-ink">
                          {d.href ? (
                            <a
                              href={d.href}
                              target={ext ? '_blank' : undefined}
                              rel={ext ? 'noopener noreferrer' : undefined}
                              className="underline underline-offset-4 transition-colors hover:text-burgundy"
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

            {/* Form — glass enquiry card */}
            <Reveal delay={80} className="order-1 lg:order-2">
              <div ref={formCardRef} className="overflow-hidden rounded-xl border border-[rgba(58,51,44,0.08)] bg-white/70 shadow-[0_16px_44px_rgba(26,23,20,0.10)] backdrop-blur-[18px]">
                {submitted ? (
                  <div className="px-6 py-[clamp(3rem,7vw,4.5rem)] text-center">
                    <span className="material-symbols-outlined text-[40px] text-burgundy" aria-hidden style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <h2 className="mt-3 font-display text-[1.8rem] font-normal text-ink">
                      {de ? 'Anfrage gesendet' : 'Request sent'}
                    </h2>
                    <p className="mx-auto mt-2 max-w-[26rem] font-body text-[1rem] leading-[1.6] text-ink-soft">
                      {de
                        ? 'Vielen Dank! Ich melde mich in der Regel innerhalb von 24 Stunden persönlich bei Ihnen.'
                        : "Thank you! I'll get back to you personally, usually within 24 hours."}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="border-b border-rule px-[clamp(1.4rem,3vw,1.8rem)] py-[1.3rem]">
                      <Kicker>{de ? 'Anfrageformular' : 'Enquiry form'}</Kicker>
                    </div>

                    <form
                      name={isBooking ? 'booking' : 'contact'}
                      data-netlify="true"
                      netlify-honeypot="bot-field"
                      className="grid gap-[1.2rem] px-[clamp(1.4rem,3vw,1.8rem)] py-[clamp(1.6rem,3vw,1.9rem)]"
                      onSubmit={handleSubmit}
                    >
                      <input type="hidden" name="form-name" value={isBooking ? 'booking' : 'contact'} />
                      <p className="hidden"><label>Don&apos;t fill this out: <input name="bot-field" /></label></p>

                      <div className="grid grid-cols-1 gap-[1.2rem] sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className={labelClass}>{t('form.name')} *</label>
                          <input ref={nameInputRef} id="name" name="name" type="text" required placeholder={de ? 'Ihr Name' : 'Your name'} value={formData.name} onChange={handleChange} className={inputClass} />
                        </div>
                        <div>
                          <label htmlFor="email" className={labelClass}>{t('form.email')} *</label>
                          <input id="email" name="email" type="email" required placeholder={de ? 'ihre@email.de' : 'you@email.com'} value={formData.email} onChange={handleChange} className={inputClass} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-[1.2rem] sm:grid-cols-2">
                        <div>
                          <label htmlFor="tour" className={labelClass}>Tour</label>
                          <select id="tour" name="tour" value={formData.tour} onChange={handleChange} className={inputClass}>
                            {tours.map((tr) => {
                              const title = t(tr.titleKey as any);
                              return <option key={tr.id} value={title}>{title}</option>;
                            })}
                            <option value={undecided}>{undecided}</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="date" className={labelClass}>{de ? 'Wunschtermin' : 'Preferred date'}</label>
                          <input id="date" name="date" type="text" placeholder={de ? 'z. B. Mai 2026' : 'e.g. May 2026'} value={formData.date} onChange={handleChange} className={inputClass} />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className={labelClass}>{de ? 'Nachricht' : 'Message'}</label>
                        <textarea
                          id="message" name="message" rows={4}
                          value={formData.message} onChange={handleChange}
                          placeholder={de ? 'Erzählen Sie mir von Ihrer Gruppe und was Sie in Prag sehen möchten…' : "Tell me about your group and what you'd like to see in Prague…"}
                          className={`${inputClass} min-h-[120px] resize-y`}
                        />
                      </div>

                      {submitError && (
                        <p className="rounded-md bg-burgundy/5 px-4 py-2.5 text-center font-body text-[0.9rem] text-burgundy-deep">
                          {de
                            ? 'Fehler beim Senden. Bitte versuchen Sie es erneut oder schreiben Sie mir per WhatsApp.'
                            : 'Something went wrong. Please try again or reach me on WhatsApp.'}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        className={`${btnClass('solid')} w-full justify-center disabled:opacity-60`}
                      >
                        {submitting ? (de ? 'Wird gesendet…' : 'Sending…') : (de ? 'Anfrage senden' : 'Send enquiry')}
                        <span className="material-symbols-outlined text-[17px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden>arrow_forward</span>
                      </button>

                      <p className="text-center font-sans text-[12px] text-stone-400">
                        {de ? 'Ihre Daten sind sicher und werden nicht weitergegeben.' : 'Your data is safe and will not be shared.'}
                      </p>
                    </form>
                  </>
                )}
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── Sticky WhatsApp (mobile only) ───────────────────────────── */}
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
