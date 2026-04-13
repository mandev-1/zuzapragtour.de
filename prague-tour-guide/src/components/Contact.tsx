import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

type ContactProps = {
  variant?: 'default' | 'booking';
  selectedTourTitle?: string;
};

const Contact: React.FC<ContactProps> = ({ variant = 'default', selectedTourTitle }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      variant === 'booking'
        ? `Booking Request${selectedTourTitle ? ` – ${selectedTourTitle}` : ''} from ${formData.name}`
        : `Tour Inquiry from ${formData.name}`
    );
    const body = encodeURIComponent(
      `${selectedTourTitle ? `${t('form.selectedTour')}: ${selectedTourTitle}\n` : ''}` +
        `${t('form.name')}: ${formData.name}\n${t('form.email')}: ${formData.email}\n${t('form.phone')}: ${formData.phone}\n${t('form.date')}: ${formData.date}\n\n${t('form.message')}:\n${formData.message}`
    );
    window.location.href = `mailto:zuzanamanova@email.cz?subject=${subject}&body=${body}`;
  };

  const inputClass =
    'w-full rounded-lg border-0 bg-surface-container-low px-4 py-3 pl-12 text-sm text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/40';

  return (
    <div className="bg-surface pb-20">
      <div className="border-b border-outline-variant/15 bg-surface-container-low py-14 text-center">
        <h1
          id="contact-title"
          className="mb-4 scroll-mt-24 font-headline text-4xl text-primary md:text-5xl"
        >
          {variant === 'booking' ? t('contact.booking.header.title') : t('contact.header.title')}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-on-surface-variant">
          {variant === 'booking' ? t('contact.booking.header.subtitle') : t('contact.header.subtitle')}
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-8 py-16 lg:grid-cols-12">
        <motion.div
          className="space-y-8 lg:col-span-5"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="mb-3 font-headline text-2xl text-primary">
              {variant === 'booking' ? t('contact.booking.intro.title') : t('contact.intro.title')}
            </h2>
            <p className="leading-relaxed text-on-surface-variant">
              {variant === 'booking' ? t('contact.booking.intro.text') : t('contact.intro.text')}
            </p>
          </div>

          {variant === 'booking' && selectedTourTitle && (
            <div className="rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-3 font-label text-sm">
              <strong>{t('form.selectedTour')}:</strong> {selectedTourTitle}
            </div>
          )}

          {variant === 'booking' && selectedTourTitle && /jewish|jüdisch/i.test(selectedTourTitle) && (
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

          <div className="space-y-6">
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-3xl text-primary">call</span>
              <div>
                <h3 className="font-label font-semibold text-on-surface">{t('contact.phone.title')}</h3>
                <a href="tel:+420721231933" className="text-primary hover:underline">
                  +420 721 231 933
                </a>
                <br />
                <a
                  href="https://wa.me/420721231933"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-secondary hover:underline"
                >
                  {variant === 'booking' ? t('contact.booking.phone.whatsapp') : t('contact.phone.whatsapp')}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="material-symbols-outlined text-3xl text-primary">mail</span>
              <div>
                <h3 className="font-label font-semibold text-on-surface">{t('contact.email.title')}</h3>
                <a href="mailto:zuzanamanova@email.cz" className="text-primary hover:underline">
                  zuzanamanova@email.cz
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="material-symbols-outlined text-3xl text-primary">location_on</span>
              <div>
                <h3 className="font-label font-semibold text-on-surface">{t('contact.location.title')}</h3>
                <p className="text-on-surface-variant">{t('contact.location.text')}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="material-symbols-outlined text-3xl text-primary">schedule</span>
              <div>
                <h3 className="font-label font-semibold text-on-surface">{t('contact.response.title')}</h3>
                <p className="text-on-surface-variant">{t('contact.response.text')}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="overflow-hidden rounded-xl border border-outline-variant/15 bg-surface-container-lowest shadow-lg">
            <div className="bg-primary px-8 py-6 text-on-primary">
              <h2 className="font-headline text-xl">{variant === 'booking' ? t('form.booking.title') : t('form.title')}</h2>
            </div>
            <form className="space-y-5 p-8" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="mb-1 block font-label text-sm font-semibold text-on-surface">
                  {t('form.name')} *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border-0 bg-surface-container-low px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block font-label text-sm font-semibold text-on-surface">
                  {t('form.email')} *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border-0 bg-surface-container-low px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1 block font-label text-sm font-semibold text-on-surface">
                  {t('form.phone')}
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">phone</span>
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
              <div>
                <label htmlFor="date" className="mb-1 block font-label text-sm font-semibold text-on-surface">
                  {t('form.date')}
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">calendar_today</span>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block font-label text-sm font-semibold text-on-surface">
                  {variant === 'booking' ? t('form.booking.message') : t('form.message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={variant === 'booking' ? t('form.booking.messagePlaceholder') : t('form.messagePlaceholder')}
                  className="w-full rounded-lg border-0 bg-surface-container-low px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary py-4 text-lg font-bold text-on-primary shadow-md transition-all hover:opacity-90 active:scale-[0.99]"
              >
                {variant === 'booking' ? t('form.booking.submit') : t('form.submit')}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      <section className="mx-auto max-w-3xl px-8 pb-16">
        <h2 className="mb-8 text-center font-headline text-3xl text-primary">{t('contact.faq.title')}</h2>
        <div className="space-y-6">
          {([
            { q: 'contact.faq.q1', a: 'contact.faq.a1' },
            { q: 'contact.faq.q2', a: 'contact.faq.a2' },
            { q: 'contact.faq.q3', a: 'contact.faq.a3' },
          ] as const).map(({ q, a }) => (
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
              <p className="px-6 pb-5 leading-relaxed text-on-surface-variant">
                {t(a as any)}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
