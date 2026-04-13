import React, { useState } from 'react';
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tourLine = formData.tourInterest
      ? `${t('form.tourInterest')}: ${formData.tourInterest}\n`
      : '';
    const groupLine = formData.groupSize
      ? `${t('form.groupSize')}: ${formData.groupSize}\n`
      : '';
    const subject = encodeURIComponent(
      variant === 'booking'
        ? `Booking Request${formData.tourInterest ? ` – ${formData.tourInterest}` : ''} from ${formData.name}`
        : `Tour Inquiry from ${formData.name}`,
    );
    const body = encodeURIComponent(
      `${tourLine}${groupLine}${t('form.name')}: ${formData.name}\n${t('form.email')}: ${formData.email}\n${formData.phone ? `${t('form.phone')}: ${formData.phone}\n` : ''}${t('form.date')}: ${formData.date}\n\n${t('form.message')}:\n${formData.message}`,
    );
    window.location.href = `mailto:zuzanamanova@email.cz?subject=${subject}&body=${body}`;
  };

  const isBooking = variant === 'booking';
  const selectClass =
    'w-full appearance-none rounded-lg border-0 bg-surface-container-low px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/40';
  const inputClass =
    'w-full rounded-lg border-0 bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/40';

  return (
    <div className="bg-surface pb-20">
      {/* ── Compact hero with social proof ──────────────────────── */}
      <div className="border-b border-outline-variant/15 bg-surface-container-low py-8 text-center md:py-10">
        <h1
          id="contact-title"
          className="mb-2 scroll-mt-24 font-headline text-3xl text-primary md:text-4xl"
        >
          {isBooking ? t('contact.booking.header.title') : t('contact.header.title')}
        </h1>
        <p className="mx-auto max-w-2xl text-base text-on-surface-variant">
          {isBooking ? t('contact.booking.header.subtitle') : t('contact.header.subtitle')}
        </p>

        {/* TripAdvisor trust strip */}
        <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-4 text-sm">
          <a
            href="https://www.tripadvisor.de/Attraction_Review-g274707-d10450040-Reviews-Zuza_Prague_Tours-Prague_Bohemia.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 font-label font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:shadow"
          >
            <span className="text-secondary-container">★★★★★</span>
            {t('footer.tripadvisor.trustLine')}
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">{t('footer.reviewCount')}</span>
          </a>
          <span className="hidden text-slate-300 md:inline">|</span>
          <span className="flex items-center gap-1.5 font-label text-slate-500">
            <span
              className="material-symbols-outlined text-base text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            {t('footer.certified')}
          </span>
        </div>
      </div>

      {/* ── Main two-column layout ─────────────────────────────── */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-10 lg:grid-cols-12 lg:gap-16 lg:py-14">
        {/* Left sidebar */}
        <motion.div
          className="space-y-7 lg:col-span-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
        >
          {/* Zuzana photo + intro */}
          <div className="flex items-start gap-4">
            <img
              src="/images/zuzana-portrait.jpg"
              alt="Zuzana Manová"
              className="h-20 w-20 flex-shrink-0 rounded-full object-cover shadow-md ring-2 ring-primary/20"
            />
            <div>
              <h2 className="font-headline text-xl text-primary">
                {isBooking ? t('contact.booking.intro.title') : t('contact.intro.title')}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
                {isBooking ? t('contact.booking.intro.text') : t('contact.intro.text')}
              </p>
            </div>
          </div>

          {/* Selected tour badge (booking variant) */}
          {isBooking && selectedTourTitle && (
            <div className="rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-3 font-label text-sm">
              <strong>{t('form.selectedTour')}:</strong> {selectedTourTitle}
            </div>
          )}

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

          {/* Contact details */}
          <div className="space-y-5">
            <a
              href="tel:+420721231933"
              className="flex items-center gap-4 rounded-lg p-2 transition hover:bg-surface-container-low"
            >
              <span className="material-symbols-outlined text-2xl text-primary">call</span>
              <div>
                <p className="font-label font-semibold text-on-surface">
                  {t('contact.phone.title')}
                </p>
                <p className="text-sm text-primary">+420 721 231 933</p>
              </div>
            </a>

            <a
              href="https://wa.me/420721231933"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-lg p-2 transition hover:bg-surface-container-low"
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
              className="flex items-center gap-4 rounded-lg p-2 transition hover:bg-surface-container-low"
            >
              <span className="material-symbols-outlined text-2xl text-primary">mail</span>
              <div>
                <p className="font-label font-semibold text-on-surface">{t('contact.email.title')}</p>
                <p className="text-sm text-primary">zuzanamanova@email.cz</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-2">
              <span className="material-symbols-outlined text-2xl text-primary">schedule</span>
              <div>
                <p className="font-label font-semibold text-on-surface">
                  {t('contact.response.title')}
                </p>
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

        {/* Right column: form */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="overflow-hidden rounded-xl border border-outline-variant/15 bg-surface-container-lowest shadow-lg">
            <div className="bg-primary px-6 py-5 text-on-primary">
              <h2 className="font-headline text-lg">
                {isBooking ? t('form.booking.title') : t('form.title')}
              </h2>
            </div>

            <form className="space-y-4 p-6" onSubmit={handleSubmit}>
              {/* Name + Email side by side on desktop */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block font-label text-sm font-semibold text-on-surface"
                  >
                    {t('form.name')} *
                  </label>
                  <input
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
                  <label
                    htmlFor="email"
                    className="mb-1 block font-label text-sm font-semibold text-on-surface"
                  >
                    {t('form.email')} *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Tour Interest + Group Size dropdowns */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="tourInterest"
                    className="mb-1 block font-label text-sm font-semibold text-on-surface"
                  >
                    {t('form.tourInterest')}
                  </label>
                  <select
                    id="tourInterest"
                    name="tourInterest"
                    value={formData.tourInterest}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">{t('form.tourInterest.placeholder')}</option>
                    {TOUR_KEYS.map((key) => (
                      <option key={key} value={t(key as any)}>
                        {t(key as any)}
                      </option>
                    ))}
                    <option value={t('form.tourInterest.notSure')}>
                      {t('form.tourInterest.notSure')}
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="groupSize"
                    className="mb-1 block font-label text-sm font-semibold text-on-surface"
                  >
                    {t('form.groupSize')}
                  </label>
                  <select
                    id="groupSize"
                    name="groupSize"
                    value={formData.groupSize}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">{t('form.groupSize.placeholder')}</option>
                    {GROUP_SIZES.map((key) => (
                      <option key={key} value={t(key as any)}>
                        {t(key as any)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date + Phone side by side */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="date"
                    className="mb-1 block font-label text-sm font-semibold text-on-surface"
                  >
                    {t('form.date')}
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1 block font-label text-sm font-semibold text-on-surface"
                  >
                    {t('form.phone.optional')}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block font-label text-sm font-semibold text-on-surface"
                >
                  {isBooking ? t('form.booking.message') : t('form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={
                    isBooking
                      ? t('form.booking.messagePlaceholderShort')
                      : t('form.messagePlaceholder')
                  }
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit + security hint */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-base font-bold text-on-primary shadow-md transition-all hover:opacity-90 active:scale-[0.99]"
              >
                <span className="material-symbols-outlined text-lg">send</span>
                {isBooking ? t('form.booking.submit') : t('form.submit')}
              </button>
              <p className="flex items-center justify-center gap-1 text-center font-label text-xs text-slate-400">
                <span className="material-symbols-outlined text-sm">lock</span>
                {language === 'de'
                  ? 'Ihre Daten sind sicher und werden nicht weitergegeben'
                  : 'Your data is safe and will not be shared'}
              </p>
            </form>
          </div>
        </motion.div>
      </div>

      {/* ── FAQ section ────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-8 pb-16">
        <h2 className="mb-8 text-center font-headline text-3xl text-primary">
          {t('contact.faq.title')}
        </h2>
        <div className="space-y-6">
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
              <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-headline text-lg text-on-surface">
                {t(q as any)}
                <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <p className="px-6 pb-5 leading-relaxed text-on-surface-variant">{t(a as any)}</p>
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
