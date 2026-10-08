'use client';

/**
 * FloatingContact — the facelift handoff's floating booking UI
 * (design_handoff_blog_facelift), on articles with `floatingCta`.
 *
 *   ≥ 1400 px  side card next to the reading column ("float-card")
 *   1024–1399  pill in the bottom-right corner ("float-chip")
 *   < 1024     bar at the bottom: Tour anfragen · WhatsApp · E-Mail ("mobile-bar")
 *
 * Shown once the hero is mostly scrolled past, while no in-article CTA (an
 * <aside> with a /book link) is on screen and the footer is still away; it
 * simply fades in and out. The data-track-section values let the admin
 * compare the three variants.
 */

import React from 'react';
import { AVATAR_SRC } from '../site/Portrait';
import { BRAND } from '../../brand';

type Variant = 'card' | 'chip' | 'bar';

const variantFor = (w: number): Variant => (w >= 1400 ? 'card' : w >= 1024 ? 'chip' : 'bar');

const WA = `https://wa.me/${BRAND.phoneRaw.replace(/\D/g, '')}`;
const BOOK = '/book#contact-title';

export default function FloatingContact() {
  const [variant, setVariant] = React.useState<Variant | null>(null);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const update = () => {
      setVariant(variantFor(window.innerWidth));
      const vh = window.innerHeight;
      const art = document.querySelector('article');
      const hero = art?.querySelector(':scope > figure');
      const past = hero ? hero.getBoundingClientRect().bottom < vh * 0.35 : window.scrollY > 600;
      const ctaInView = Array.from(document.querySelectorAll('article aside'))
        .filter((a) => a.querySelector('a[href*="/book"]') && a.getClientRects().length)
        .some((a) => {
          const r = a.getBoundingClientRect();
          return r.top < vh && r.bottom > 0;
        });
      const footers = document.querySelectorAll('footer');
      const foot = footers[footers.length - 1];
      const nearEnd = foot ? foot.getBoundingClientRect().top < vh + 200 : false;
      setShow(past && !ctaInView && !nearEnd);
    };
    update();
    const t = window.setTimeout(update, 400);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  if (!variant) return null;
  const on = show ? ' is-shown' : '';
  const hidden = !show || undefined;

  if (variant === 'card') {
    return (
      <aside className={`j-float-card${on}`} aria-label="Private Tour mit Zuzana" aria-hidden={hidden} data-track-section="float-card">
        <div className="j-float-card__who">
          <img src={AVATAR_SRC} alt="Ing. Zuzana Manová" />
          <div>
            <div className="j-float-card__name">Ing. Zuzana Manová</div>
            <div className="j-float-card__role">Staatlich geprüfte Stadtführerin</div>
          </div>
        </div>
        <p className="j-float-card__pitch">Ich zeige Ihnen Prag persönlich, auf Deutsch und nur für Ihre eigene Gruppe.</p>
        <a className="j-float-card__btn" href={BOOK} tabIndex={show ? 0 : -1}>Unverbindlich anfragen</a>
        <div className="j-float-card__row">
          <a href={`tel:${BRAND.phoneRaw}`} className="j-float-card__tel" tabIndex={show ? 0 : -1}>{BRAND.phone}</a>
          <a href={WA} className="j-float-card__wa" tabIndex={show ? 0 : -1}>WhatsApp</a>
        </div>
        <a href={`mailto:${BRAND.email}`} className="j-float-card__mail" tabIndex={show ? 0 : -1}>{BRAND.email}</a>
      </aside>
    );
  }

  if (variant === 'chip') {
    return (
      <a href={BOOK} className={`j-float-chip${on}`} aria-label="Private Tour mit Zuzana anfragen" aria-hidden={hidden} tabIndex={show ? 0 : -1} data-track-section="float-chip">
        <img src={AVATAR_SRC} alt="" />
        <span className="j-float-chip__text">
          <span className="j-float-chip__t">Prag mit Zuzana</span>
          <span className="j-float-chip__s">Private Tour anfragen</span>
        </span>
      </a>
    );
  }

  return (
    <nav className={`j-float-bar${on}`} aria-label="Kontakt" aria-hidden={hidden} data-track-section="mobile-bar">
      <a href={BOOK} className="j-float-bar__main" tabIndex={show ? 0 : -1}>Tour anfragen</a>
      <a href={WA} tabIndex={show ? 0 : -1}>WhatsApp</a>
      <a href={`mailto:${BRAND.email}`} tabIndex={show ? 0 : -1}>E-Mail</a>
    </nav>
  );
}
