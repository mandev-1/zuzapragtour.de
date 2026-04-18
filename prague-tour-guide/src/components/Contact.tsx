import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

type ContactProps = {
  variant?: 'default' | 'booking';
  selectedTourTitle?: string;
};

const encode = (data: Record<string, string>) =>
  Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

const inputClass =
  'w-full rounded-md border border-stone-200 bg-transparent px-4 py-3 font-body text-sm text-ink placeholder:text-stone-400 transition-colors focus:border-ink focus:outline-none';

const Contact: React.FC<ContactProps> = ({ variant = 'default', selectedTourTitle }) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', date: '', phone: '', message: '' });
  const [submitting,  setSubmitting]  = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    if (!mq.matches) return;
    const id = window.requestAnimationFrame(() => nameInputRef.current?.focus({ preventScroll: true }));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(false);
    const formName = isBooking ? 'booking' : 'contact';
    const payload: Record<string, string> = { 'form-name': formName, 'bot-field': '', ...formData };
    if (isBooking && selectedTourTitle) payload['tourTitle'] = selectedTourTitle;
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(payload),
      });
      if (res.ok) setSubmitted(true);
      else        setSubmitError(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const isBooking = variant === 'booking';

  return (
    <div className="bg-paper pb-24">

      {/* Header */}
      <div className="border-b border-stone-200 px-5 py-10 text-center md:py-14">
        <p className="mb-3 font-eyebrow text-eyebrow uppercase text-stone-500">
          {isBooking ? t('contact.booking.header.title') : t('contact.header.title')}
        </p>
        <h1 id="contact-title" className="scroll-mt-24 font-headline text-display-md text-ink">
          {isBooking ? t('contact.booking.header.title') : t('contact.header.title')}
        </h1>
        <p className="mx-auto mt-4 max-w-prose font-body text-prose text-stone-600">
          {isBooking ? t('contact.booking.header.subtitle') : t('contact.header.subtitle')}
        </p>
      </div>

      {/* Main grid */}
      <div className="mx-auto grid max-w-editorial grid-cols-1 gap-12 px-5 py-12 md:px-10 lg:grid-cols-12 lg:gap-16 lg:py-16">

        {/* Form */}
        <motion.div
          className="order-1 lg:order-2 lg:col-span-7"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        >
          {submitted ? (
            <div className="border border-green-200 bg-green-50 px-6 py-14 text-center">
              <h2 className="mb-2 font-headline text-2xl text-green-800">
                {language === 'de' ? 'Anfrage gesendet!' : 'Message sent!'}
              </h2>
              <p className="mx-auto max-w-sm font-body text-sm leading-relaxed text-green-700">
                {language === 'de'
                  ? 'Vielen Dank! Ich melde mich in der Regel innerhalb von 24 Stunden bei Ihnen.'
                  : 'Thank you! I usually respond within 24 hours.'}
              </p>
            </div>
          ) : (
            <div className="border border-stone-200">
              <div className="border-b border-stone-200 px-6 py-4">
                <p className="font-eyebrow text-eyebrow uppercase text-stone-500">
                  {isBooking ? t('form.booking.title') : t('form.title')}
                </p>
              </div>

              <form
                name={isBooking ? 'booking' : 'contact'}
                data-netlify="true"
                netlify-honeypot="bot-field"
                className="space-y-5 p-6"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value={isBooking ? 'booking' : 'contact'} />
                <p className="hidden"><label>Don't fill this out: <input name="bot-field" /></label></p>

                {isBooking && selectedTourTitle && (
                  <>
                    <input type="hidden" name="tourTitle" value={selectedTourTitle} />
                    <div className="border-l-2 border-stone-300 py-1 pl-4">
                      <p className="font-eyebrow text-eyebrow uppercase text-stone-400">{t('form.selectedTour')}</p>
                      <p className="font-body text-sm text-ink">{selectedTourTitle}</p>
                    </div>
                  </>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block font-label text-sm text-stone-700">{t('form.name')} *</label>
                    <input ref={nameInputRef} id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block font-label text-sm text-stone-700">{t('form.email')} *</label>
                    <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="date" className="mb-1.5 block font-label text-sm text-stone-700">{t('form.date')}</label>
                    <input
                      id="date" name="date" type="text"
                      placeholder={language === 'de' ? 'z. B. Mai 2025' : 'e.g. May 2025'}
                      value={formData.date} onChange={handleChange} className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block font-label text-sm text-stone-700">{t('form.phone.optional')}</label>
                    <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block font-label text-sm text-stone-700">
                    {isBooking ? t('form.booking.message') : t('form.message')}
                  </label>
                  <textarea
                    id="message" name="message" rows={4}
                    value={formData.message} onChange={handleChange}
                    placeholder={isBooking ? t('form.booking.messagePlaceholderShort') : t('form.messagePlaceholder')}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {submitError && (
                  <p className="bg-red-50 px-4 py-2 text-center font-body text-sm text-red-700">
                    {language === 'de'
                      ? 'Fehler beim Senden. Bitte versuchen Sie es erneut oder schreiben Sie mir per WhatsApp.'
                      : 'Something went wrong. Please try again or reach me on WhatsApp.'}
                  </p>
                )}

                <button
                  type="submit" disabled={submitting}
                  className="w-full rounded-md bg-ink py-3.5 font-label text-sm font-medium text-paper transition-colors hover:bg-ink-soft disabled:opacity-60"
                >
                  {submitting
                    ? (language === 'de' ? 'Wird gesendet…' : 'Sending…')
                    : (isBooking ? t('form.booking.submit') : t('form.submit'))}
                </button>
                <p className="text-center font-label text-xs text-stone-400">
                  {language === 'de' ? 'Ihre Daten sind sicher und werden nicht weitergegeben' : 'Your data is safe and will not be shared'}
                </p>
              </form>
            </div>
          )}
        </motion.div>

        {/* Sidebar */}
        <motion.div
          className="order-2 space-y-8 lg:order-1 lg:col-span-5"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-start gap-4">
            <img
              src="/images/zuzana-portrait.jpg" alt="Zuzana Manová"
              className="h-16 w-16 flex-shrink-0 rounded-sm object-cover md:h-20 md:w-20"
              style={{ objectPosition: 'center 20%' }}
            />
            <div>
              <h2 className="font-headline text-lg text-ink md:text-xl">
                {isBooking ? t('contact.booking.intro.title') : t('contact.intro.title')}
              </h2>
              <p className="mt-1 font-body text-sm leading-relaxed text-stone-600">
                {isBooking ? t('contact.booking.intro.text') : t('contact.intro.text')}
              </p>
            </div>
          </div>

          {isBooking && selectedTourTitle && /jewish|jüdisch/i.test(selectedTourTitle) && (
            <div className="border-l-2 border-stone-300 py-1 pl-4">
              <h3 className="mb-1 font-headline text-sm text-ink">{t('contact.jewish.credential.title')}</h3>
              <p className="font-body text-sm leading-relaxed text-stone-600">{t('contact.jewish.credential.text')}</p>
            </div>
          )}

          <div className="space-y-5 border-t border-stone-200 pt-6">
            <div>
              <p className="mb-0.5 font-eyebrow text-eyebrow uppercase text-stone-400">{t('contact.phone.title')}</p>
              <a href="tel:+420721231933" className="font-label text-sm text-ink underline-offset-4 hover:underline">+420 721 231 933</a>
            </div>
            <div>
              <p className="mb-0.5 font-eyebrow text-eyebrow uppercase text-stone-400">WhatsApp</p>
              <a href="https://wa.me/420721231933" target="_blank" rel="noopener noreferrer"
                className="font-label text-sm text-ink underline-offset-4 hover:underline">
                {isBooking ? t('contact.booking.phone.whatsapp') : t('contact.phone.whatsapp')}
              </a>
            </div>
            <div>
              <p className="mb-0.5 font-eyebrow text-eyebrow uppercase text-stone-400">{t('contact.email.title')}</p>
              <a href="mailto:zuzanamanova@email.cz" className="font-label text-sm text-ink underline-offset-4 hover:underline">
                zuzanamanova@email.cz
              </a>
            </div>
            <div>
              <p className="mb-0.5 font-eyebrow text-eyebrow uppercase text-stone-400">{t('contact.response.title')}</p>
              <p className="font-body text-sm text-stone-600">{t('contact.response.text')}</p>
            </div>
          </div>

          <div className="border-t border-stone-200 pt-6">
            <blockquote className="font-headline text-base italic leading-relaxed text-ink">
              <span aria-hidden>&ldquo;</span>{t('contact.review.quote')}<span aria-hidden>&rdquo;</span>
            </blockquote>
            <p className="mt-3 font-eyebrow text-eyebrow uppercase text-stone-400">— {t('contact.review.author')}</p>
          </div>
        </motion.div>
      </div>

      {/* FAQ */}
      <section className="border-t border-stone-200">
        <div className="mx-auto max-w-prose px-5 py-14 md:px-10">
          <h2 className="mb-8 font-headline text-xl text-ink">{t('contact.faq.title')}</h2>
          <div className="divide-y divide-stone-200">
            {(
              [
                { q: 'contact.faq.q1', a: 'contact.faq.a1' },
                { q: 'contact.faq.q2', a: 'contact.faq.a2' },
                { q: 'contact.faq.q3', a: 'contact.faq.a3' },
              ] as const
            ).map(({ q, a }) => (
              <details key={q} className="group py-1">
                <summary className="cursor-pointer list-none py-4 font-headline text-base text-ink">
                  {t(q as any)}
                </summary>
                <p className="pb-4 font-body text-sm leading-relaxed text-stone-600">{t(a as any)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky WhatsApp (mobile only) */}
      <a
        href="https://wa.me/420721231933"
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#25d366] px-6 py-3 font-label text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 md:hidden"
        aria-label="WhatsApp"
      >
        {t('contact.whatsapp.sticky')}
      </a>
    </div>
  );
};

export default Contact;
