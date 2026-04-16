import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

type ContactProps = {
  variant?: 'default' | 'booking';
  selectedTourTitle?: string;
};

const TOUR_KEYS = [
  'tour.castle.title',
  'tour.oldtown.title',
  'tour.hidden.title',
  'tour.german.title',
  'tour.havel.title',
  'tour.custom.title',
] as const;

const GROUP_SIZES = [
  'form.groupSize.1',
  'form.groupSize.2',
  'form.groupSize.3',
  'form.groupSize.4',
  'form.groupSize.5',
  'form.groupSize.6plus',
] as const;

const encode = (data: Record<string, string>) =>
  Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

const Contact: React.FC<ContactProps> = ({ variant = 'default', selectedTourTitle }) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    groupSize: '',
    tourInterest: selectedTourTitle || '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  /** Focus first field on desktop only — avoids opening the software keyboard on phones. */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    if (!mq.matches) return;
    const id = window.requestAnimationFrame(() => {
      nameInputRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(false);
    const formName = isBooking ? 'booking' : 'contact';
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': formName, 'bot-field': '', ...formData }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const isBooking = variant === 'booking';
  const selectClass =
    'w-full appearance-none rounded-lg border-0 bg-surface-container-low px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/40';
  const inputClass =
    'w-full rounded-lg border-0 bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/40';

  return (
    <div className="bg-surface pb-24">
      {/* ── Compact hero ──────────────────────────────────────── */}
      <div className="border-b border-outline-variant/15 bg-surface-container-low px-4 py-6 text-center md:py-10">
        <h1
          id="contact-title"
          className="mb-2 scroll-mt-24 font-headline text-2xl text-primary md:text-4xl"
        >
          {isBooking ? t('contact.booking.header.title') : t('contact.header.title')}
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-on-surface-variant md:text-base">
          {isBooking ? t('contact.booking.header.subtitle') : t('contact.header.subtitle')}
        </p>

        {/* Trust strip */}
        <div className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
          <a
            href="https://www.tripadvisor.de/Attraction_Review-g274707-d10450040-Reviews-Zuza_Prague_Tours-Prague_Bohemia.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 font-label text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:shadow md:text-sm md:px-4"
          >
            <span className="text-secondary-container">★★★★★</span>
            {t('footer.tripadvisor.trustLine')}
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">{t('footer.reviewCount')}</span>
          </a>
          <span className="flex items-center gap-1.5 font-label text-xs text-slate-500 md:text-sm">
            <span
              className="material-symbols-outlined text-sm text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            {t('footer.certified')}
          </span>
        </div>
      </div>

      {/* ── Main layout: form first on mobile ─────────────────── */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-8 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:py-14">

        {/* RIGHT column: FORM — order-first on mobile, right on desktop */}
        <motion.div
          className="order-1 lg:order-2 lg:col-span-7"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {submitted ? (
            /* ── Success state ── */
            <div className="flex flex-col items-center justify-center rounded-xl border border-green-200 bg-green-50 px-6 py-14 text-center shadow-sm">
              <span
                className="material-symbols-outlined mb-4 text-5xl text-green-600"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <h2 className="mb-2 font-headline text-2xl text-green-800">
                {language === 'de' ? 'Anfrage gesendet!' : 'Message sent!'}
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-green-700">
                {language === 'de'
                  ? 'Vielen Dank! Ich melde mich in der Regel innerhalb von 24 Stunden bei Ihnen.'
                  : 'Thank you! I usually respond within 24 hours.'}
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-outline-variant/15 bg-surface-container-lowest shadow-lg">
              <div className="bg-primary px-5 py-4 text-on-primary md:px-6 md:py-5">
                <h2 className="font-headline text-lg">
                  {isBooking ? t('form.booking.title') : t('form.title')}
                </h2>
              </div>

              <form
                name={isBooking ? 'booking' : 'contact'}
                data-netlify="true"
                netlify-honeypot="bot-field"
                className="space-y-4 p-4 sm:p-6"
                onSubmit={handleSubmit}
              >
                {/* Honeypot — hidden from humans */}
                <input type="hidden" name="form-name" value={isBooking ? 'booking' : 'contact'} />
                <p className="hidden">
                  <label>Don't fill this out: <input name="bot-field" /></label>
                </p>

                {/* Selected tour badge (booking variant) */}
                {isBooking && selectedTourTitle && (
                  <div className="rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-2.5 font-label text-sm">
                    <strong>{t('form.selectedTour')}:</strong> {selectedTourTitle}
                  </div>
                )}

                {/* Name + Email */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1 block font-label text-sm font-semibold text-on-surface">
                      {t('form.name')} *
                    </label>
                    <input
                      ref={nameInputRef}
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1 block font-label text-sm font-semibold text-on-surface">
                      {t('form.email')} *
                    </label>
                    <input
                      id="email" name="email" type="email" required
                      value={formData.email} onChange={handleChange} className={inputClass}
                    />
                  </div>
                </div>

                {/* Tour Interest + Group Size */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="tourInterest" className="mb-1 block font-label text-sm font-semibold text-on-surface">
                      {t('form.tourInterest')}
                    </label>
                    <select id="tourInterest" name="tourInterest" value={formData.tourInterest} onChange={handleChange} className={selectClass}>
                      <option value="">{t('form.tourInterest.placeholder')}</option>
                      {TOUR_KEYS.map((key) => (
                        <option key={key} value={t(key as any)}>{t(key as any)}</option>
                      ))}
                      <option value={t('form.tourInterest.notSure')}>{t('form.tourInterest.notSure')}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="groupSize" className="mb-1 block font-label text-sm font-semibold text-on-surface">
                      {t('form.groupSize')}
                    </label>
                    <select id="groupSize" name="groupSize" value={formData.groupSize} onChange={handleChange} className={selectClass}>
                      <option value="">{t('form.groupSize.placeholder')}</option>
                      {GROUP_SIZES.map((key) => (
                        <option key={key} value={t(key as any)}>{t(key as any)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date + Phone */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="date" className="mb-1 block font-label text-sm font-semibold text-on-surface">
                      {t('form.date')}
                    </label>
                    <input id="date" name="date" type="date" value={formData.date} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1 block font-label text-sm font-semibold text-on-surface">
                      {t('form.phone.optional')}
                    </label>
                    <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="mb-1 block font-label text-sm font-semibold text-on-surface">
                    {isBooking ? t('form.booking.message') : t('form.message')}
                  </label>
                  <textarea
                    id="message" name="message" rows={3}
                    value={formData.message} onChange={handleChange}
                    placeholder={isBooking ? t('form.booking.messagePlaceholderShort') : t('form.messagePlaceholder')}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {submitError && (
                  <p className="rounded-lg bg-red-50 px-4 py-2 text-center text-sm text-red-700">
                    {language === 'de'
                      ? 'Fehler beim Senden. Bitte versuchen Sie es erneut oder schreiben Sie mir per WhatsApp.'
                      : 'Something went wrong. Please try again or reach me on WhatsApp.'}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-base font-bold text-on-primary shadow-md transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
                >
                  {submitting ? (
                    <span className="material-symbols-outlined animate-spin text-lg">refresh</span>
                  ) : (
                    <span className="material-symbols-outlined text-lg">send</span>
                  )}
                  {submitting
                    ? (language === 'de' ? 'Wird gesendet…' : 'Sending…')
                    : (isBooking ? t('form.booking.submit') : t('form.submit'))}
                </button>
                <p className="flex items-center justify-center gap-1 text-center font-label text-xs text-slate-400">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  {language === 'de'
                    ? 'Ihre Daten sind sicher und werden nicht weitergegeben'
                    : 'Your data is safe and will not be shared'}
                </p>
              </form>
            </div>
          )}
        </motion.div>

        {/* LEFT column: SIDEBAR — order-second on mobile, left on desktop */}
        <motion.div
          className="order-2 lg:order-1 lg:col-span-5 space-y-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Zuzana photo + intro */}
          <div className="flex items-start gap-4">
            <img
              src="/images/zuzana-portrait.jpg"
              alt="Zuzana Manová"
              className="h-16 w-16 flex-shrink-0 rounded-full object-cover shadow-md ring-2 ring-primary/20 md:h-20 md:w-20"
            />
            <div>
              <h2 className="font-headline text-lg text-primary md:text-xl">
                {isBooking ? t('contact.booking.intro.title') : t('contact.intro.title')}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
                {isBooking ? t('contact.booking.intro.text') : t('contact.intro.text')}
              </p>
            </div>
          </div>

          {/* Jewish Quarter credential (booking variant) */}
          {isBooking && selectedTourTitle && /jewish|jüdisch/i.test(selectedTourTitle) && (
            <div className="rounded-xl border border-secondary/25 bg-gradient-to-br from-surface-container-low to-surface-container-lowest p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl text-secondary">verified</span>
                <h3 className="font-headline text-base font-semibold text-on-surface">
                  {t('contact.jewish.credential.title')}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                {t('contact.jewish.credential.text')}
              </p>
            </div>
          )}

          {/* Contact options */}
          <div className="space-y-1">
            <a
              href="tel:+420721231933"
              className="flex items-center gap-4 rounded-lg p-3 transition hover:bg-surface-container-low"
            >
              <span className="material-symbols-outlined text-2xl text-primary">call</span>
              <div>
                <p className="font-label font-semibold text-on-surface">{t('contact.phone.title')}</p>
                <p className="text-sm text-primary">+420 721 231 933</p>
              </div>
            </a>
            <a
              href="https://wa.me/420721231933"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-lg p-3 transition hover:bg-surface-container-low"
            >
              <span className="material-symbols-outlined text-2xl text-green-600">chat</span>
              <div>
                <p className="font-label font-semibold text-on-surface">WhatsApp</p>
                <p className="text-sm text-green-700">
                  {isBooking ? t('contact.booking.phone.whatsapp') : t('contact.phone.whatsapp')}
                </p>
              </div>
            </a>
            <a
              href="mailto:zuzanamanova@email.cz"
              className="flex items-center gap-4 rounded-lg p-3 transition hover:bg-surface-container-low"
            >
              <span className="material-symbols-outlined text-2xl text-primary">mail</span>
              <div>
                <p className="font-label font-semibold text-on-surface">{t('contact.email.title')}</p>
                <p className="text-sm text-primary">zuzanamanova@email.cz</p>
              </div>
            </a>
            <div className="flex items-center gap-4 p-3">
              <span className="material-symbols-outlined text-2xl text-primary">schedule</span>
              <div>
                <p className="font-label font-semibold text-on-surface">{t('contact.response.title')}</p>
                <p className="text-sm text-on-surface-variant">{t('contact.response.text')}</p>
              </div>
            </div>
          </div>

          {/* Featured review */}
          <div className="rounded-xl border border-outline-variant/20 bg-white p-5 shadow-sm">
            <div className="mb-2 text-secondary-container">★★★★★</div>
            <blockquote className="text-sm italic leading-relaxed text-on-surface-variant">
              {t('contact.review.quote')}
            </blockquote>
            <p className="mt-2 font-label text-xs font-semibold text-slate-400">
              — {t('contact.review.author')}
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── FAQ section ────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-8">
        <h2 className="mb-8 text-center font-headline text-3xl text-primary">
          {t('contact.faq.title')}
        </h2>
        <div className="space-y-4">
          {(
            [
              { q: 'contact.faq.q1', a: 'contact.faq.a1' },
              { q: 'contact.faq.q2', a: 'contact.faq.a2' },
              { q: 'contact.faq.q3', a: 'contact.faq.a3' },
            ] as const
          ).map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-xl border border-outline-variant/20 bg-surface-container-lowest"
            >
              <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-headline text-base text-on-surface">
                {t(q as any)}
                <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <p className="px-5 pb-5 leading-relaxed text-on-surface-variant">{t(a as any)}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Sticky WhatsApp button (mobile only) ───────────────── */}
      <a
        href="https://wa.me/420721231933"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#25d366] px-6 py-3 font-label text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 md:hidden"
        aria-label="WhatsApp"
      >
        <span className="material-symbols-outlined text-lg">chat</span>
        {t('contact.whatsapp.sticky')}
      </a>
    </div>
  );
};

export default Contact;
