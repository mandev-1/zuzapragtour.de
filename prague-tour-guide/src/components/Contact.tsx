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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link with form data
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

  return (
    <div className="contact">
      <div className="contact-header">
        <h1 id="contact-title">
          {variant === 'booking' ? t('contact.booking.header.title') : t('contact.header.title')}
        </h1>
        <p>
          {variant === 'booking' ? t('contact.booking.header.subtitle') : t('contact.header.subtitle')}
        </p>
      </div>

      <div className="container">
        <div className="contact-grid">
          <motion.div
            className="contact-info-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>{variant === 'booking' ? t('contact.booking.intro.title') : t('contact.intro.title')}</h2>
            <p>{variant === 'booking' ? t('contact.booking.intro.text') : t('contact.intro.text')}</p>

            {variant === 'booking' && selectedTourTitle && (
              <div className="selected-tour" style={{ margin: '1rem 0', padding: '0.75rem 1rem', background: '#f6f7f9', borderRadius: 8, border: '1px solid #e5e7eb' }}>
                <strong>{t('form.selectedTour')}:</strong> {selectedTourTitle}
              </div>
            )}

            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-icon">📞</div>
                <div>
                  <h3>{t('contact.phone.title')}</h3>
                  <a href="tel:+420721231933">+420 721 231 933</a>
                  <br />
                  <a
                    href="https://wa.me/420721231933"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-link"
                  >
                    💬 {variant === 'booking' ? t('contact.booking.phone.whatsapp') : t('contact.phone.whatsapp')}
                  </a>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">✉️</div>
                <div>
                  <h3>{t('contact.email.title')}</h3>
                  <a href="mailto:zuzanamanova@email.cz">
                    zuzanamanova@email.cz
                  </a>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">📍</div>
                <div>
                  <h3>{t('contact.location.title')}</h3>
                  <p>{t('contact.location.text')}</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">⏰</div>
                <div>
                  <h3>{t('contact.response.title')}</h3>
                  <p>{t('contact.response.text')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>{variant === 'booking' ? t('form.booking.title') : t('form.title')}</h2>

              <div className="form-group">
                <label htmlFor="name">{t('form.name')} *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">{t('form.email')} *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">{t('form.phone')}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">{t('form.date')}</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">{variant === 'booking' ? t('form.booking.message') : t('form.message')} *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={variant === 'booking' ? t('form.booking.messagePlaceholder') : t('form.messagePlaceholder')}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                {variant === 'booking' ? t('form.booking.submit') : t('form.submit')}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;