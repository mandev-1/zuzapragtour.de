# Component source — reference

Simplified React source for every Zuza Prague Tours design-system component (props contract `.d.ts`, usage `.prompt.md`, implementation `.jsx`). Styling is via the CSS custom properties in `../tokens/`. Compiled together these are `../_ds_bundle.js` (`window.ZuzaPragueToursDesignSystem_748186`).

---

## Badge
_components/core/Badge_

Small uppercase pill. Signature use is the gold "certified expert" capsule in the hero; also works as a metadata tag.

```jsx
<Badge variant="gold" icon="star">Zertifizierte Expertin</Badge>
<Badge variant="outline">Private Gruppe</Badge>
```

Variants: `gold` (default tint), `burgundy`, `solid` (ink), `outline`.

```ts
// Badge.d.ts
import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default 'gold' */
  variant?: 'gold' | 'burgundy' | 'solid' | 'outline';
  /** Optional leading Material Symbols glyph (filled). */
  icon?: string;
  children?: React.ReactNode;
}

/** Small pill label — e.g. the certified-expert capsule. */
export function Badge(props: BadgeProps): JSX.Element;
export default Badge;
```

```jsx
// Badge.jsx
import React from 'react';

/**
 * Badge — small pill label. The brand's signature use is the tinted
 * "Zertifizierte Expertin" capsule with a gold star. Variants:
 *  · gold (default) — gold-on-tint capsule
 *  · burgundy — accent-tinted
 *  · solid — solid ink pill
 *  · outline — hairline outline pill
 */
export function Badge({ children, variant = 'gold', icon, className = '', style = {}, ...rest }) {
  const variants = {
    gold:     { background: 'rgba(123,88,0,0.10)', color: 'var(--gold-olive)' },
    burgundy: { background: 'var(--accent-soft)', color: 'var(--burgundy)' },
    solid:    { background: 'var(--ink)', color: 'var(--paper)' },
    outline:  { background: 'transparent', color: 'var(--ink-soft)', boxShadow: 'inset 0 0 0 1px var(--rule)' },
  };
  return (
    <span
      className={`zpt-badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.3rem 0.75rem',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-xs)',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {icon && <span className="material-symbols-outlined" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>{icon}</span>}
      {children}
    </span>
  );
}

export default Badge;
```

---

## Button
_components/core/Button_

Primary action control — use for any call-to-action (booking, enquiry, navigation). `primary` is the burgundy gradient hero/CTA button; `ink` and `outline` are the quieter editorial choices; `onDark` sits on the dark ink sections.

```jsx
<Button variant="primary" size="lg" icon="arrow_forward">Anfrage senden</Button>
<Button variant="outline">Touren erkunden</Button>
<Button variant="link" icon="chevron_right">Details</Button>
```

Variants: `primary` (gradient + glow), `accent` (solid burgundy), `ink` (solid near-black), `outline` (hairline, fills on hover), `onDark` (paper on dark), `link` (underlined text). Sizes: `sm` / `md` / `lg`. Pass `href` to render an anchor, `icon` for a trailing Material Symbol (`iconLeading` to flip side).

```ts
// Button.d.ts
import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual register. @default 'primary' */
  variant?: 'primary' | 'accent' | 'ink' | 'outline' | 'onDark' | 'link';
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Material Symbols glyph name rendered alongside the label (e.g. 'arrow_forward'). */
  icon?: string;
  /** Place the icon before the label instead of after. @default false */
  iconLeading?: boolean;
  /** Render as an <a> with this href instead of a <button>. */
  href?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

/**
 * Primary action control for Zuza Prague Tours.
 *
 * @startingPoint section="Core" subtitle="Buttons in every brand variant" viewport="700x150"
 */
export function Button(props: ButtonProps): JSX.Element;
export default Button;
```

```jsx
// Button.jsx
import React from 'react';

/**
 * Button — the brand's primary action control.
 *
 * Variants map to the two registers seen on the live site:
 *  · primary  → burgundy signature gradient + soft glow (marketing CTAs)
 *  · accent   → solid accent burgundy
 *  · ink      → solid near-black (editorial forms & quiet CTAs)
 *  · outline  → hairline ink border, fills ink on hover
 *  · onDark   → paper fill for dark sections
 *  · link     → underlined accent text link
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconLeading = false,
  href,
  type = 'button',
  disabled = false,
  fullWidth = false,
  className = '',
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.8125rem' },
    md: { padding: '0.75rem 1.5rem', fontSize: '0.9375rem' },
    lg: { padding: '0.875rem 2rem', fontSize: '1.0625rem' },
  };

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: fullWidth ? '100%' : 'auto',
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    lineHeight: 1.1,
    letterSpacing: '0.005em',
    textDecoration: 'none',
    border: '1px solid transparent',
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.55 : 1,
    transition: 'background-color var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out), opacity var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
    whiteSpace: 'nowrap',
    ...sizes[size],
  };

  const variants = {
    primary: { background: 'var(--grad-burgundy)', color: '#fff', boxShadow: 'var(--shadow-cta)' },
    accent:  { background: 'var(--accent)', color: 'var(--paper)' },
    ink:     { background: 'var(--ink)', color: 'var(--paper)' },
    outline: { background: 'transparent', color: 'var(--ink)', borderColor: 'var(--ink)' },
    onDark:  { background: 'var(--paper)', color: 'var(--ink)' },
    link:    { background: 'transparent', color: 'var(--accent)', padding: 0, borderRadius: 0, textUnderlineOffset: '4px', textDecoration: 'underline', textDecorationColor: 'var(--brass)' },
  };

  const styles = { ...base, ...variants[variant], ...style };

  const glyph = icon ? (
    <span className="material-symbols-outlined" style={{ fontSize: size === 'lg' ? 20 : 18 }}>{icon}</span>
  ) : null;

  const content = (
    <>
      {iconLeading && glyph}
      {children}
      {!iconLeading && glyph}
    </>
  );

  const Tag = href ? 'a' : 'button';
  const tagProps = href ? { href } : { type, disabled };

  return (
    <Tag className={`zpt-button ${className}`} style={styles} {...tagProps} {...rest}>
      {content}
    </Tag>
  );
}

export default Button;
```

---

## Eyebrow
_components/core/Eyebrow_

Tracked uppercase kicker that precedes almost every section heading on the brand. Pair with a serif headline directly below.

```jsx
<Eyebrow tone="gold" icon="star">Zertifizierte Expertin</Eyebrow>
<Eyebrow tone="onDark">Von meinen Gästen</Eyebrow>
```

Tones: `brass` (default), `burgundy`, `gold` (marketing eyebrow), `onDark` (lamp gold on ink sections), `mute`.

```ts
// Eyebrow.d.ts
import * as React from 'react';

export interface EyebrowProps extends React.HTMLAttributes<HTMLElement> {
  /** Color register. @default 'brass' */
  tone?: 'brass' | 'burgundy' | 'gold' | 'onDark' | 'mute';
  /** Optional leading Material Symbols glyph (rendered filled). */
  icon?: string;
  /** Element tag. @default 'span' */
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

/** Tracked uppercase kicker label above headings. */
export function Eyebrow(props: EyebrowProps): JSX.Element;
export default Eyebrow;
```

```jsx
// Eyebrow.jsx
import React from 'react';

/**
 * Eyebrow — the tracked, uppercase kicker that sits above headings.
 * Tone controls color: 'brass' (default, on paper), 'burgundy',
 * 'gold' (marketing), 'onDark' (stone-on-ink), 'mute'.
 */
export function Eyebrow({ children, tone = 'brass', icon, as = 'span', className = '', style = {}, ...rest }) {
  const colors = {
    brass: 'var(--brass-deep)',
    burgundy: 'var(--burgundy)',
    gold: 'var(--gold-olive)',
    onDark: 'var(--gold-lamp)',
    mute: 'var(--ink-mute)',
  };
  const Tag = as;
  return (
    <Tag
      className={`zpt-eyebrow ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-eyebrow)',
        fontWeight: 500,
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: colors[tone],
        ...style,
      }}
      {...rest}
    >
      {icon && <span className="material-symbols-outlined" style={{ fontSize: 13, fontVariationSettings: "'FILL' 1" }}>{icon}</span>}
      {children}
    </Tag>
  );
}

export default Eyebrow;
```

---

## Field
_components/core/Field_

Labelled form control used in the contact / booking forms. Serif body input on a hairline border that darkens to ink on focus.

```jsx
<Field label="Name" name="name" required />
<Field label="Nachricht" name="message" as="textarea" rows={4}
       placeholder="Erzählen Sie mir, was Sie interessiert…" />
```

Props: `label`, `as` (`input` | `textarea`), `type`, `required`, `placeholder`, `rows`, `hint`.

```ts
// Field.d.ts
import * as React from 'react';

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Field label shown above the control. */
  label?: string;
  name?: string;
  /** Input type when `as="input"`. @default 'text' */
  type?: string;
  /** Control element. @default 'input' */
  as?: 'input' | 'textarea';
  required?: boolean;
  placeholder?: string;
  /** Rows for textarea. @default 4 */
  rows?: number;
  /** Small helper text below the control. */
  hint?: string;
}

/** Labelled text input / textarea matching the editorial contact form. */
export function Field(props: FieldProps): JSX.Element;
export default Field;
```

```jsx
// Field.jsx
import React from 'react';

/**
 * Field — labelled form control matching the editorial contact form.
 * Renders a stacked label + input (or textarea). Hairline border that
 * darkens to ink on focus. Set `as="textarea"` for the message field.
 */
export function Field({
  label,
  name,
  type = 'text',
  as = 'input',
  required = false,
  placeholder,
  rows = 4,
  hint,
  className = '',
  style = {},
  ...rest
}) {
  const controlStyle = {
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--stone-200)',
    background: 'transparent',
    padding: '0.75rem 1rem',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    color: 'var(--ink)',
    outline: 'none',
    transition: 'border-color var(--dur-fast) var(--ease-out)',
    resize: as === 'textarea' ? 'none' : undefined,
  };
  const onFocus = (e) => { e.target.style.borderColor = 'var(--ink)'; };
  const onBlur = (e) => { e.target.style.borderColor = 'var(--stone-200)'; };

  return (
    <label className={`zpt-field ${className}`} style={{ display: 'block', ...style }}>
      {label && (
        <span style={{ display: 'block', marginBottom: '0.375rem', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--stone-700)' }}>
          {label}{required && ' *'}
        </span>
      )}
      {as === 'textarea' ? (
        <textarea name={name} rows={rows} required={required} placeholder={placeholder} style={controlStyle} onFocus={onFocus} onBlur={onBlur} {...rest} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} style={controlStyle} onFocus={onFocus} onBlur={onBlur} {...rest} />
      )}
      {hint && <span style={{ display: 'block', marginTop: '0.375rem', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--stone-400)' }}>{hint}</span>}
    </label>
  );
}

export default Field;
```

---

## Icon
_components/core/Icon_

Material Symbols Outlined icon wrapper. Use for all iconography — never hand-roll SVGs. Default outline; set `fill` for the solid star.

```jsx
<Icon name="schedule" size={12} />
<Icon name="star" fill color="var(--gold-olive)" size={16} />
```

Common glyphs on the brand: star, schedule, group, place, call, arrow_forward, chevron_right, open_in_new.

```ts
// Icon.d.ts
import * as React from 'react';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Material Symbols glyph name, e.g. 'arrow_forward'. */
  name: string;
  /** Pixel size. @default 20 */
  size?: number;
  /** Use the filled variant (FILL 1). @default false */
  fill?: boolean;
  /** Optional weight axis 100–700. */
  weight?: number;
  /** CSS color. */
  color?: string;
}

/** Material Symbols icon wrapper. */
export function Icon(props: IconProps): JSX.Element;
export default Icon;
```

```jsx
// Icon.jsx
import React from 'react';

/**
 * Icon — thin wrapper over the Material Symbols Outlined webfont.
 * Pass the glyph `name` (e.g. "schedule"). `fill` toggles the solid
 * variant (used for the gold star); `size` is in px.
 */
export function Icon({ name, size = 20, fill = false, weight, color, className = '', style = {}, ...rest }) {
  const fvs = [
    `'FILL' ${fill ? 1 : 0}`,
    weight ? `'wght' ${weight}` : null,
    `'opsz' 24`,
  ].filter(Boolean).join(', ');

  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontSize: size, color, fontVariationSettings: fvs, ...style }}
      aria-hidden="true"
      {...rest}
    >
      {name}
    </span>
  );
}

export default Icon;
```

---

## Callout
_components/editorial/Callout_

Paper-ground aside with a brass left rule for "did you know" notes and tips inside article body copy.

```jsx
<Callout label="Tipp">
  Buchen Sie die Burg-Tour <strong>vor 10 Uhr</strong>, um den Andrang zu vermeiden.
</Callout>
```

```ts
// Callout.d.ts
import * as React from 'react';

export interface CalloutProps {
  /** Tracked uppercase label. @default 'Vorab in einer Zeile' */
  label?: string;
  children?: React.ReactNode;
}

/** Paper aside with a brass left rule — for tips and asides in articles. */
export function Callout(props: CalloutProps): JSX.Element;
export default Callout;
```

```jsx
// Callout.jsx
import React from 'react';

/**
 * Callout — paper aside with a 3px brass left rule and a tracked
 * uppercase label preceded by a short brass dash. Body in serif.
 */
export function Callout({ label = 'Vorab in einer Zeile', children, className = '', style = {} }) {
  return (
    <aside
      className={`zpt-callout ${className}`}
      style={{
        margin: '2.5em 0',
        padding: '1.75rem 2rem',
        background: 'var(--paper)',
        border: '1px solid var(--rule-soft)',
        borderLeft: '3px solid var(--brass)',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.625rem', fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 500, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--brass-deep)' }}>
        <span aria-hidden="true" style={{ display: 'block', height: 1, width: 14, background: 'var(--brass)' }} />
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
        {children}
      </div>
    </aside>
  );
}

export default Callout;
```

---

## Ornament
_components/editorial/Ornament_

Decorative divider — two brass hairlines around a small fleuron. Separates passages in long editorial articles.

```jsx
<Ornament />
<Ornament glyph="„" />
```

```ts
// Ornament.d.ts
import * as React from 'react';

export interface OrnamentProps {
  /** Center glyph. @default '❦' */
  glyph?: string;
}

/** Brass-ruled fleuron divider between article passages. */
export function Ornament(props: OrnamentProps): JSX.Element;
export default Ornament;
```

```jsx
// Ornament.jsx
import React from 'react';

/**
 * Ornament — centered section divider: two brass hairlines flanking a
 * small italic glyph (default the Cormorant ❦ fleuron).
 */
export function Ornament({ glyph = '❦', className = '', style = {} }) {
  const line = { display: 'block', width: 80, height: 1, background: 'var(--brass)', opacity: 0.5 };
  return (
    <div className={`zpt-ornament ${className}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, margin: '3.5rem 0', ...style }}>
      <span aria-hidden="true" style={line} />
      <span aria-hidden="true" style={{ fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontSize: 24, color: 'var(--brass)' }}>{glyph}</span>
      <span aria-hidden="true" style={line} />
    </div>
  );
}

export default Ornament;
```

---

## PullQuote
_components/editorial/PullQuote_

Large italic pull quote with a burgundy left rule and decorative quote glyph. Use to lift a sentence out of article body copy.

```jsx
<PullQuote attribution="Zuzana">
  Prag ist eine vielschichtige Geschichte — lassen Sie uns diese gemeinsam lesen.
</PullQuote>
```

```ts
// PullQuote.d.ts
import * as React from 'react';

export interface PullQuoteProps {
  children?: React.ReactNode;
  /** Source line shown below the quote (tracked uppercase). */
  attribution?: string;
}

/** Large burgundy-ruled italic pull quote with a decorative glyph. */
export function PullQuote(props: PullQuoteProps): JSX.Element;
export default PullQuote;
```

```jsx
// PullQuote.jsx
import React from 'react';

/**
 * PullQuote — large italic quote with a 2px burgundy left rule and an
 * oversized decorative „ glyph at brass / 30% opacity.
 */
export function PullQuote({ children, attribution, className = '', style = {} }) {
  return (
    <blockquote
      className={`zpt-pullquote ${className}`}
      style={{ position: 'relative', margin: '3em 0', padding: '0.25rem 0 0.25rem 2.5rem', borderLeft: '2px solid var(--burgundy)', ...style }}
    >
      <span aria-hidden="true" style={{ position: 'absolute', top: '-0.15em', left: '0.05em', fontFamily: 'var(--font-display)', fontSize: 100, lineHeight: 1, color: 'var(--brass)', opacity: 0.3, pointerEvents: 'none' }}>„</span>
      <p style={{ margin: '0 0 1rem', fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontSize: 30, fontWeight: 400, lineHeight: 1.3, letterSpacing: '-0.005em', color: 'var(--ink)' }}>
        {children}
      </p>
      {attribution && (
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--ink-mute)' }}>
          — {attribution}
        </div>
      )}
    </blockquote>
  );
}

export default PullQuote;
```

---

## SectionHeading
_components/editorial/SectionHeading_

Opens a section: tracked eyebrow over an Italiana headline, with an optional burgundy italic emphasis word and a supporting lead line. Use it everywhere a section begins.

```jsx
<SectionHeading
  eyebrow="Lernen Sie Zuzana kennen"
  title="Prag, erzählt mit"
  emphasis="Leidenschaft"
  lead="Maßgeschneiderte Routen für anspruchsvolle Reisende."
/>
<SectionHeading eyebrow="Von meinen Gästen" title="Fotos von unseren Touren" align="center" onDark />
```

Props: `eyebrow`, `eyebrowTone`, `eyebrowIcon`, `title`, `emphasis`, `lead`, `align`, `onDark`.

```ts
// SectionHeading.d.ts
import * as React from 'react';

export interface SectionHeadingProps {
  /** Tracked uppercase kicker above the title. */
  eyebrow?: string;
  /** @default 'brass' */
  eyebrowTone?: 'brass' | 'burgundy' | 'gold';
  /** Optional filled glyph before the eyebrow. */
  eyebrowIcon?: string;
  /** Main heading text (Italiana display). */
  title: React.ReactNode;
  /** Trailing word rendered in burgundy Cormorant italic. */
  emphasis?: string;
  /** Supporting paragraph below the heading. */
  lead?: React.ReactNode;
  /** @default 'left' */
  align?: 'left' | 'center';
  /** Recolor for dark sections. @default false */
  onDark?: boolean;
}

/**
 * Eyebrow + serif headline section opener.
 *
 * @startingPoint section="Editorial" subtitle="Eyebrow + serif section heading" viewport="700x220"
 */
export function SectionHeading(props: SectionHeadingProps): JSX.Element;
export default SectionHeading;
```

```jsx
// SectionHeading.jsx
import React from 'react';

/**
 * SectionHeading — eyebrow + serif headline pairing used to open
 * nearly every section. The headline renders in Italiana display;
 * wrap a word in <em> (or pass `emphasis`) for the Cormorant italic
 * burgundy accent. Optional `lead` sets supporting copy.
 */
export function SectionHeading({
  eyebrow,
  eyebrowTone = 'brass',
  eyebrowIcon,
  title,
  emphasis,
  lead,
  align = 'left',
  onDark = false,
  className = '',
  style = {},
}) {
  return (
    <div
      className={`zpt-section-heading ${className}`}
      style={{ textAlign: align, maxWidth: align === 'center' ? '44rem' : undefined, marginInline: align === 'center' ? 'auto' : undefined, ...style }}
    >
      {eyebrow && (
        <div style={{ marginBottom: '0.5rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            fontFamily: 'var(--font-sans)', fontSize: 'var(--text-eyebrow)', fontWeight: 500,
            letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase',
            color: onDark ? 'var(--gold-lamp)' : eyebrowTone === 'burgundy' ? 'var(--burgundy)' : eyebrowTone === 'gold' ? 'var(--gold-olive)' : 'var(--brass-deep)',
          }}>
            {eyebrowIcon && <span className="material-symbols-outlined" style={{ fontSize: 13, fontVariationSettings: "'FILL' 1" }}>{eyebrowIcon}</span>}
            {eyebrow}
          </span>
        </div>
      )}
      <h2 style={{
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-display-md)',
        fontWeight: 400,
        lineHeight: 'var(--leading-tight)',
        letterSpacing: '0.005em',
        color: onDark ? 'var(--paper)' : 'var(--ink)',
      }}>
        {title}
        {emphasis && (
          <> <em style={{ fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontWeight: 400, color: onDark ? 'var(--gold-lamp)' : 'var(--burgundy)' }}>{emphasis}</em></>
        )}
      </h2>
      {lead && (
        <p style={{
          margin: '1rem 0 0',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          lineHeight: 'var(--leading-relaxed)',
          color: onDark ? 'var(--stone-300)' : 'var(--ink-mute)',
          maxWidth: '40rem',
          marginInline: align === 'center' ? 'auto' : undefined,
        }}>
          {lead}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
```

---

## StatBlock
_components/editorial/StatBlock_

A single proof-point metric: oversized burgundy numeral above a tracked label. Lay several in a row.

```jsx
<StatBlock value="40+" label="Jahre Erfahrung" />
<StatBlock value="4,9k" label="Touren kuratiert" />
<StatBlock value="5,0" label="Sterne Bewertung" />
```

```ts
// StatBlock.d.ts
import * as React from 'react';

export interface StatBlockProps {
  /** The metric, e.g. '40+'. */
  value: React.ReactNode;
  /** Tracked uppercase caption. */
  label: string;
  /** Recolor for dark sections. @default false */
  onDark?: boolean;
}

/** Single headline statistic — burgundy numeral over an uppercase label. */
export function StatBlock(props: StatBlockProps): JSX.Element;
export default StatBlock;
```

```jsx
// StatBlock.jsx
import React from 'react';

/**
 * StatBlock — a single headline metric: large Italiana numeral in
 * burgundy above a tracked uppercase label. Used in the about strip
 * (40+ years, 4.9k tours, 5.0 rating).
 */
export function StatBlock({ value, label, onDark = false, className = '', style = {} }) {
  return (
    <div className={`zpt-statblock ${className}`} style={style}>
      <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, lineHeight: 1, color: onDark ? 'var(--gold-lamp)' : 'var(--burgundy)' }}>
        {value}
      </p>
      <p style={{ margin: '0.4rem 0 0', fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: onDark ? 'var(--stone-300)' : 'var(--ink-warm)' }}>
        {label}
      </p>
    </div>
  );
}

export default StatBlock;
```

---

## ReviewCard
_components/marketing/ReviewCard_

Guest testimonial card — italic serif quote over an avatar + author + source. Lay three across in the social-proof band.

```jsx
<ReviewCard
  quote="Zuzanas persönliche Geschichte mit der Stadt macht diese Führung einzigartig."
  author="Thomas K." source="TripAdvisor" />
```

```ts
// ReviewCard.d.ts
import * as React from 'react';

export interface ReviewCardProps {
  /** The testimonial text (rendered in quotes). */
  quote: string;
  /** Guest name — its first letter seeds the avatar. */
  author: string;
  /** Source/platform line, e.g. 'TripAdvisor'. */
  source?: string;
}

/** Guest testimonial card with avatar initial and source line. */
export function ReviewCard(props: ReviewCardProps): JSX.Element;
export default ReviewCard;
```

```jsx
// ReviewCard.jsx
import React from 'react';

/**
 * ReviewCard — testimonial card: italic serif quote, then an avatar
 * (initial in a stone disc) with the author name and tracked source.
 */
export function ReviewCard({ quote, author, source, className = '', style = {} }) {
  const initial = (author || '?').trim().charAt(0);
  return (
    <div
      className={`zpt-review-card ${className}`}
      style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        background: 'var(--canvas)', padding: '1.5rem', borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-md)', ...style,
      }}
    >
      <p style={{ margin: '0 0 1.5rem', fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: 14, lineHeight: 1.6, color: 'var(--ink-warm)' }}>
        &ldquo;{quote}&rdquo;
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: 40, height: 40, borderRadius: 999, background: '#E4E2DE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14, color: 'var(--ink-warm)' }}>{initial}</span>
        </div>
        <div>
          <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 12, color: 'var(--ink-2)' }}>{author}</p>
          {source && <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-olive)' }}>{source}</p>}
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
```

---

## TourRow
_components/marketing/TourRow_

Numbered tour highlight row — stack several inside a tinted band to form the homepage "Selected Experiences" list. Hover lifts the row to white and turns the numeral + title burgundy.

```jsx
<TourRow num="01" title="Altstadt & Jüdisches Viertel"
  duration="4 Stunden" meta="Private Gruppe"
  description="Ein tiefes Eintauchen in das mittelalterliche Herz Prags."
  href="/book?tour=..." />
<TourRow num="02" title="Das alchemistische Prag" duration="3 Stunden" meta="Versteckte Juwelen" last />
```

```ts
// TourRow.d.ts
import * as React from 'react';

export interface TourRowProps {
  /** Two-digit numeral, e.g. '01'. */
  num: string;
  title: string;
  /** Duration chip, e.g. '4 Stunden'. */
  duration?: string;
  /** Group/meta chip, e.g. 'Private Gruppe'. */
  meta?: string;
  /** Short description shown on the right (desktop). */
  description?: string;
  href?: string;
  /** CTA link label. @default 'Details' */
  ctaLabel?: string;
  /** Drop the bottom hairline on the final row. @default false */
  last?: boolean;
}

/**
 * Numbered, hover-reactive tour row from the homepage highlights list.
 *
 * @startingPoint section="Marketing" subtitle="Numbered tour highlight row" viewport="700x130"
 */
export function TourRow(props: TourRowProps): JSX.Element;
export default TourRow;
```

```jsx
// TourRow.jsx
import React from 'react';

/**
 * TourRow — the numbered, hover-reactive tour line from the homepage
 * highlights list. Big italic numeral, title + meta chips on the left,
 * description + a "Details →" link on the right. Hovering lifts the
 * row to white and turns the numeral & title burgundy.
 */
export function TourRow({
  num,
  title,
  duration,
  meta,
  description,
  href = '#',
  ctaLabel = 'Details',
  last = false,
  className = '',
  style = {},
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      className={`zpt-tour-row ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
        gap: '1rem', padding: '1.5rem 2rem', background: hover ? 'var(--surface-card)' : 'var(--canvas)',
        borderBottom: last ? 'none' : '1px solid rgba(224,191,188,0.35)',
        transition: 'background var(--dur-base) var(--ease-out)',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <span style={{ fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontSize: 30, color: hover ? 'var(--crimson)' : 'var(--rose)', transition: 'color var(--dur-base) var(--ease-out)' }}>
          {num}
        </span>
        <div>
          <h3 style={{ margin: 0, fontFamily: 'var(--font-headline)', fontSize: 20, fontWeight: 700, color: hover ? 'var(--crimson)' : 'var(--ink-2)', transition: 'color var(--dur-base) var(--ease-out)' }}>
            {title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.25rem' }}>
            {duration && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-olive)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 12 }}>schedule</span>{duration}
              </span>
            )}
            {meta && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-warm)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 12 }}>group</span>{meta}
              </span>
            )}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {description && (
          <p style={{ margin: 0, maxWidth: '20rem', fontFamily: 'var(--font-body)', fontSize: 12, lineHeight: 1.5, color: 'var(--ink-warm)' }}>
            {description}
          </p>
        )}
        <a href={href} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700, color: 'var(--crimson)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          {ctaLabel}
          <span className="material-symbols-outlined" style={{ fontSize: 18, transform: hover ? 'translateX(3px)' : 'none', transition: 'transform var(--dur-base) var(--ease-out)' }}>chevron_right</span>
        </a>
      </div>
    </div>
  );
}

export default TourRow;
```
