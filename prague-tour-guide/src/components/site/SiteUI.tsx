'use client';

/**
 * SiteUI — shared "premium editorial" primitives for the marketing site.
 *
 * Ported from the 0003 handoff's site.css chrome so every redesigned page
 * (home, tours, tour-detail, zuzana, kontakt, privacy, terms, blog, article)
 * shares one consistent vocabulary: Kicker eyebrows, the animated ULink,
 * the uppercase-tracked Btn, Stat blocks, the inner-page PageBanner, and the
 * scroll-Reveal (IntersectionObserver + 1.5s fail-safe + reduced-motion).
 *
 * Tokens come from tailwind.config.js (burgundy/brass/ivory/ink/rule/gold-*)
 * and the next/font families (font-display/body/italic/sans). Inner pages add
 * the warm-white faint-geometry ground by putting `premium-inner` on their
 * root element (styled in src/styles/site-premium.css).
 */

import React from 'react';
import Link from 'next/link';

/* ── Kicker / eyebrow ─────────────────────────────────────────── */
export function Kicker({
  children,
  center,
  solo,
  tone = 'brass',
  className = '',
}: {
  children: React.ReactNode;
  center?: boolean;
  solo?: boolean;
  tone?: 'brass' | 'lamp';
  className?: string;
}) {
  const line = tone === 'lamp' ? 'bg-gold-lamp' : 'bg-brass/70';
  const text = tone === 'lamp' ? 'text-gold-lamp' : 'text-brass-deep';
  return (
    <span
      className={`inline-flex items-center gap-[0.9rem] font-sans text-[11px] font-medium uppercase tracking-[0.28em] ${text} ${center ? 'justify-center' : ''} ${className}`}
    >
      {!solo && <span className={`h-px w-7 ${line}`} aria-hidden />}
      {children}
      {center && !solo && <span className={`h-px w-7 ${line}`} aria-hidden />}
    </span>
  );
}

/* ── Animated underline link ──────────────────────────────────── */
export function ULink({
  href,
  children,
  className = '',
  onDark = false,
  arrow = true,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
  arrow?: boolean;
}) {
  const external = /^https?:|^tel:|^mailto:/.test(href);
  const cls = `group relative inline-flex items-center gap-[0.55rem] whitespace-nowrap pb-1 font-sans text-xs font-semibold uppercase tracking-[0.16em] ${onDark ? 'text-ivory' : 'text-ink'} after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-current after:transition-transform after:duration-300 after:ease-brand after:content-[''] hover:after:origin-right hover:after:scale-x-0 ${className}`;
  const inner = (
    <>
      {children}
      {arrow && (
        <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
          arrow_forward
        </span>
      )}
    </>
  );
  return external ? (
    <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/* ── Button (uppercase-tracked marketing button) ──────────────── */
const BTN_BASE = `group inline-flex items-center gap-[0.7rem] border font-sans font-semibold uppercase tracking-[0.18em] transition-[background-color,color,border-color] duration-300 ease-brand`;
const BTN_VARIANT = {
  ink: 'border-ink text-ink hover:bg-ink hover:text-paper',
  cream: 'border-ivory text-ivory hover:bg-ivory hover:text-ink',
  solid: 'border-burgundy bg-burgundy text-ivory hover:border-burgundy-deep hover:bg-burgundy-deep',
} as const;

export function btnClass(variant: keyof typeof BTN_VARIANT = 'ink', sm = false) {
  return `${BTN_BASE} ${sm ? 'px-[1.4rem] py-[0.8rem] text-[11px]' : 'px-[1.9rem] py-[1.05rem] text-xs'} ${BTN_VARIANT[variant]}`;
}

export function Btn({
  href,
  children,
  variant = 'ink',
  sm = false,
  arrow = false,
  className = '',
  onClick,
  type,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: keyof typeof BTN_VARIANT;
  sm?: boolean;
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}) {
  const cls = `${btnClass(variant, sm)} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && (
        <span className="material-symbols-outlined text-[17px] transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
      )}
    </>
  );
  if (!href) {
    return (
      <button type={type ?? 'button'} onClick={onClick} className={cls}>
        {inner}
      </button>
    );
  }
  const external = /^https?:|^tel:|^mailto:/.test(href);
  return external ? (
    <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls} onClick={onClick}>
      {inner}
    </Link>
  );
}

/* ── Stat block ───────────────────────────────────────────────── */
export function Stat({ n, label }: { n: React.ReactNode; label: React.ReactNode }) {
  return (
    <div>
      <div className="font-display text-[clamp(2rem,3.4vw,2.9rem)] leading-none text-burgundy">{n}</div>
      <div className="mt-[0.6rem] font-sans text-[10px] uppercase tracking-[0.2em] text-ink-mute">{label}</div>
    </div>
  );
}

/* ── Scroll reveal (IntersectionObserver + fail-safe) ─────────── */
type RevealTag = 'div' | 'section' | 'figure' | 'li' | 'article';
export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: RevealTag;
}) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
    const failsafe = window.setTimeout(() => setShown(true), 1500); // never stay hidden
    return () => { io.disconnect(); window.clearTimeout(failsafe); };
  }, []);
  return (
    <Tag
      ref={ref as React.Ref<any>}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-[opacity,transform] duration-[900ms] ease-brand motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:!transition-none ${shown ? 'translate-y-0 opacity-100' : 'translate-y-[26px] opacity-0'} ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ── Section heading (kicker + display H2) ────────────────────── */
export function SectionHeading({
  kicker,
  children,
  center,
  tone = 'brass',
  className = '',
}: {
  kicker?: React.ReactNode;
  children: React.ReactNode;
  center?: boolean;
  tone?: 'brass' | 'lamp';
  className?: string;
}) {
  return (
    <div className={`${center ? 'text-center' : ''} ${className}`}>
      {kicker && <Kicker center={center} tone={tone}>{kicker}</Kicker>}
      <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] font-normal leading-[1.04] tracking-[-0.015em] text-ink">
        {children}
      </h2>
    </div>
  );
}

/* ── Inner-page header band ───────────────────────────────────── */
export function PageBanner({
  kicker,
  title,
  sub,
  className = '',
}: {
  kicker?: React.ReactNode;
  title: React.ReactNode;
  sub?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={`border-b border-rule pb-[clamp(2.5rem,5vh,4rem)] pt-[clamp(2.5rem,6vw,4.5rem)] ${className}`}>
      <div className="mx-auto w-full max-w-[1240px] px-[clamp(1.5rem,5vw,5rem)]">
        {kicker && <Kicker>{kicker}</Kicker>}
        <h1 className="mt-4 font-display text-[clamp(2.6rem,6vw,4.6rem)] font-normal leading-[1.02] tracking-[-0.02em] text-ink">
          {title}
        </h1>
        {sub && (
          <p className="mt-[1.4rem] max-w-[40rem] font-body text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.65] text-ink-mute">
            {sub}
          </p>
        )}
      </div>
    </header>
  );
}

/* Shared editorial shell width helper (max-w 1240px, fluid gutters). */
export const SHELL = 'mx-auto w-full max-w-[1240px] px-[clamp(1.5rem,5vw,5rem)]';
