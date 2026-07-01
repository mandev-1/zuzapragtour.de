/* @ds-bundle: {"format":3,"namespace":"ZuzaPragueToursDesignSystem_748186","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Field","sourcePath":"components/core/Field.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"Callout","sourcePath":"components/editorial/Callout.jsx"},{"name":"Ornament","sourcePath":"components/editorial/Ornament.jsx"},{"name":"PullQuote","sourcePath":"components/editorial/PullQuote.jsx"},{"name":"SectionHeading","sourcePath":"components/editorial/SectionHeading.jsx"},{"name":"StatBlock","sourcePath":"components/editorial/StatBlock.jsx"},{"name":"ReviewCard","sourcePath":"components/marketing/ReviewCard.jsx"},{"name":"TourRow","sourcePath":"components/marketing/TourRow.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"7aecadaff83b","components/core/Button.jsx":"36c194388d46","components/core/Eyebrow.jsx":"a1fd7d735db9","components/core/Field.jsx":"c35e2453cb24","components/core/Icon.jsx":"5f9b4cc1b117","components/editorial/Callout.jsx":"aeaf3cd8191c","components/editorial/Ornament.jsx":"f64c8a825f66","components/editorial/PullQuote.jsx":"7a9247d82cee","components/editorial/SectionHeading.jsx":"678282945775","components/editorial/StatBlock.jsx":"0c88b6befb89","components/marketing/ReviewCard.jsx":"4513e85e1484","components/marketing/TourRow.jsx":"5c6f123f83ed","ui_kits/journal/journal.jsx":"e0b007abb58a","ui_kits/website/site-app.jsx":"4c25386509b8","ui_kits/website/site-home.jsx":"c60a9ca4b64b","ui_kits/website/site/site.js":"adb7f0b41e66"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ZuzaPragueToursDesignSystem_748186 = window.ZuzaPragueToursDesignSystem_748186 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — small pill label. The brand's signature use is the tinted
 * "Zertifizierte Expertin" capsule with a gold star. Variants:
 *  · gold (default) — gold-on-tint capsule
 *  · burgundy — accent-tinted
 *  · solid — solid ink pill
 *  · outline — hairline outline pill
 */
function Badge({
  children,
  variant = 'gold',
  icon,
  className = '',
  style = {},
  ...rest
}) {
  const variants = {
    gold: {
      background: 'rgba(123,88,0,0.10)',
      color: 'var(--gold-olive)'
    },
    burgundy: {
      background: 'var(--accent-soft)',
      color: 'var(--burgundy)'
    },
    solid: {
      background: 'var(--ink)',
      color: 'var(--paper)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--ink-soft)',
      boxShadow: 'inset 0 0 0 1px var(--rule)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `zpt-badge ${className}`,
    style: {
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
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 14,
      fontVariationSettings: "'FILL' 1"
    }
  }, icon), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Button({
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
    sm: {
      padding: '0.5rem 1rem',
      fontSize: '0.8125rem'
    },
    md: {
      padding: '0.75rem 1.5rem',
      fontSize: '0.9375rem'
    },
    lg: {
      padding: '0.875rem 2rem',
      fontSize: '1.0625rem'
    }
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
    ...sizes[size]
  };
  const variants = {
    primary: {
      background: 'var(--grad-burgundy)',
      color: '#fff',
      boxShadow: 'var(--shadow-cta)'
    },
    accent: {
      background: 'var(--accent)',
      color: 'var(--paper)'
    },
    ink: {
      background: 'var(--ink)',
      color: 'var(--paper)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--ink)',
      borderColor: 'var(--ink)'
    },
    onDark: {
      background: 'var(--paper)',
      color: 'var(--ink)'
    },
    link: {
      background: 'transparent',
      color: 'var(--accent)',
      padding: 0,
      borderRadius: 0,
      textUnderlineOffset: '4px',
      textDecoration: 'underline',
      textDecorationColor: 'var(--brass)'
    }
  };
  const styles = {
    ...base,
    ...variants[variant],
    ...style
  };
  const glyph = icon ? /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: size === 'lg' ? 20 : 18
    }
  }, icon) : null;
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, iconLeading && glyph, children, !iconLeading && glyph);
  const Tag = href ? 'a' : 'button';
  const tagProps = href ? {
    href
  } : {
    type,
    disabled
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: `zpt-button ${className}`,
    style: styles
  }, tagProps, rest), content);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Eyebrow — the tracked, uppercase kicker that sits above headings.
 * Tone controls color: 'brass' (default, on paper), 'burgundy',
 * 'gold' (marketing), 'onDark' (stone-on-ink), 'mute'.
 */
function Eyebrow({
  children,
  tone = 'brass',
  icon,
  as = 'span',
  className = '',
  style = {},
  ...rest
}) {
  const colors = {
    brass: 'var(--brass-deep)',
    burgundy: 'var(--burgundy)',
    gold: 'var(--gold-olive)',
    onDark: 'var(--gold-lamp)',
    mute: 'var(--ink-mute)'
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: `zpt-eyebrow ${className}`,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.4rem',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-eyebrow)',
      fontWeight: 500,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: colors[tone],
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 13,
      fontVariationSettings: "'FILL' 1"
    }
  }, icon), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Field — labelled form control matching the editorial contact form.
 * Renders a stacked label + input (or textarea). Hairline border that
 * darkens to ink on focus. Set `as="textarea"` for the message field.
 */
function Field({
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
    resize: as === 'textarea' ? 'none' : undefined
  };
  const onFocus = e => {
    e.target.style.borderColor = 'var(--ink)';
  };
  const onBlur = e => {
    e.target.style.borderColor = 'var(--stone-200)';
  };
  return /*#__PURE__*/React.createElement("label", {
    className: `zpt-field ${className}`,
    style: {
      display: 'block',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginBottom: '0.375rem',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      color: 'var(--stone-700)'
    }
  }, label, required && ' *'), as === 'textarea' ? /*#__PURE__*/React.createElement("textarea", _extends({
    name: name,
    rows: rows,
    required: required,
    placeholder: placeholder,
    style: controlStyle,
    onFocus: onFocus,
    onBlur: onBlur
  }, rest)) : /*#__PURE__*/React.createElement("input", _extends({
    name: name,
    type: type,
    required: required,
    placeholder: placeholder,
    style: controlStyle,
    onFocus: onFocus,
    onBlur: onBlur
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: '0.375rem',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      color: 'var(--stone-400)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Field.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Icon — thin wrapper over the Material Symbols Outlined webfont.
 * Pass the glyph `name` (e.g. "schedule"). `fill` toggles the solid
 * variant (used for the gold star); `size` is in px.
 */
function Icon({
  name,
  size = 20,
  fill = false,
  weight,
  color,
  className = '',
  style = {},
  ...rest
}) {
  const fvs = [`'FILL' ${fill ? 1 : 0}`, weight ? `'wght' ${weight}` : null, `'opsz' 24`].filter(Boolean).join(', ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `material-symbols-outlined ${className}`,
    style: {
      fontSize: size,
      color,
      fontVariationSettings: fvs,
      ...style
    },
    "aria-hidden": "true"
  }, rest), name);
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/editorial/Callout.jsx
try { (() => {
/**
 * Callout — paper aside with a 3px brass left rule and a tracked
 * uppercase label preceded by a short brass dash. Body in serif.
 */
function Callout({
  label = 'Vorab in einer Zeile',
  children,
  className = '',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("aside", {
    className: `zpt-callout ${className}`,
    style: {
      margin: '2.5em 0',
      padding: '1.75rem 2rem',
      background: 'var(--paper)',
      border: '1px solid var(--rule-soft)',
      borderLeft: '3px solid var(--brass)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.625rem',
      marginBottom: '0.625rem',
      fontFamily: 'var(--font-sans)',
      fontSize: 10,
      fontWeight: 500,
      letterSpacing: '0.24em',
      textTransform: 'uppercase',
      color: 'var(--brass-deep)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'block',
      height: 1,
      width: 14,
      background: 'var(--brass)'
    }
  }), label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 17,
      lineHeight: 1.6,
      color: 'var(--ink-soft)'
    }
  }, children));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/Callout.jsx", error: String((e && e.message) || e) }); }

// components/editorial/Ornament.jsx
try { (() => {
/**
 * Ornament — centered section divider: two brass hairlines flanking a
 * small italic glyph (default the Cormorant ❦ fleuron).
 */
function Ornament({
  glyph = '❦',
  className = '',
  style = {}
}) {
  const line = {
    display: 'block',
    width: 80,
    height: 1,
    background: 'var(--brass)',
    opacity: 0.5
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `zpt-ornament ${className}`,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      margin: '3.5rem 0',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: line
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontFamily: 'var(--font-italic)',
      fontStyle: 'italic',
      fontSize: 24,
      color: 'var(--brass)'
    }
  }, glyph), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: line
  }));
}
Object.assign(__ds_scope, { Ornament });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/Ornament.jsx", error: String((e && e.message) || e) }); }

// components/editorial/PullQuote.jsx
try { (() => {
/**
 * PullQuote — large italic quote with a 2px burgundy left rule and an
 * oversized decorative „ glyph at brass / 30% opacity.
 */
function PullQuote({
  children,
  attribution,
  className = '',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("blockquote", {
    className: `zpt-pullquote ${className}`,
    style: {
      position: 'relative',
      margin: '3em 0',
      padding: '0.25rem 0 0.25rem 2.5rem',
      borderLeft: '2px solid var(--burgundy)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: '-0.15em',
      left: '0.05em',
      fontFamily: 'var(--font-display)',
      fontSize: 100,
      lineHeight: 1,
      color: 'var(--brass)',
      opacity: 0.3,
      pointerEvents: 'none'
    }
  }, "\u201E"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 1rem',
      fontFamily: 'var(--font-italic)',
      fontStyle: 'italic',
      fontSize: 30,
      fontWeight: 400,
      lineHeight: 1.3,
      letterSpacing: '-0.005em',
      color: 'var(--ink)'
    }
  }, children), attribution && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
      color: 'var(--ink-mute)'
    }
  }, "\u2014 ", attribution));
}
Object.assign(__ds_scope, { PullQuote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/PullQuote.jsx", error: String((e && e.message) || e) }); }

// components/editorial/SectionHeading.jsx
try { (() => {
/**
 * SectionHeading — eyebrow + serif headline pairing used to open
 * nearly every section. The headline renders in Italiana display;
 * wrap a word in <em> (or pass `emphasis`) for the Cormorant italic
 * burgundy accent. Optional `lead` sets supporting copy.
 */
function SectionHeading({
  eyebrow,
  eyebrowTone = 'brass',
  eyebrowIcon,
  title,
  emphasis,
  lead,
  align = 'left',
  onDark = false,
  className = '',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `zpt-section-heading ${className}`,
    style: {
      textAlign: align,
      maxWidth: align === 'center' ? '44rem' : undefined,
      marginInline: align === 'center' ? 'auto' : undefined,
      ...style
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.4rem',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-eyebrow)',
      fontWeight: 500,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: onDark ? 'var(--gold-lamp)' : eyebrowTone === 'burgundy' ? 'var(--burgundy)' : eyebrowTone === 'gold' ? 'var(--gold-olive)' : 'var(--brass-deep)'
    }
  }, eyebrowIcon && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 13,
      fontVariationSettings: "'FILL' 1"
    }
  }, eyebrowIcon), eyebrow)), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-display-md)',
      fontWeight: 400,
      lineHeight: 'var(--leading-tight)',
      letterSpacing: '0.005em',
      color: onDark ? 'var(--paper)' : 'var(--ink)'
    }
  }, title, emphasis && /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontFamily: 'var(--font-italic)',
      fontStyle: 'italic',
      fontWeight: 400,
      color: onDark ? 'var(--gold-lamp)' : 'var(--burgundy)'
    }
  }, emphasis))), lead && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '1rem 0 0',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      lineHeight: 'var(--leading-relaxed)',
      color: onDark ? 'var(--stone-300)' : 'var(--ink-mute)',
      maxWidth: '40rem',
      marginInline: align === 'center' ? 'auto' : undefined
    }
  }, lead));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/editorial/StatBlock.jsx
try { (() => {
/**
 * StatBlock — a single headline metric: large Italiana numeral in
 * burgundy above a tracked uppercase label. Used in the about strip
 * (40+ years, 4.9k tours, 5.0 rating).
 */
function StatBlock({
  value,
  label,
  onDark = false,
  className = '',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `zpt-statblock ${className}`,
    style: style
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2)',
      fontWeight: 400,
      lineHeight: 1,
      color: onDark ? 'var(--gold-lamp)' : 'var(--burgundy)'
    }
  }, value), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0.4rem 0 0',
      fontFamily: 'var(--font-sans)',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: onDark ? 'var(--stone-300)' : 'var(--ink-warm)'
    }
  }, label));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ReviewCard.jsx
try { (() => {
/**
 * ReviewCard — testimonial card: italic serif quote, then an avatar
 * (initial in a stone disc) with the author name and tracked source.
 */
function ReviewCard({
  quote,
  author,
  source,
  className = '',
  style = {}
}) {
  const initial = (author || '?').trim().charAt(0);
  return /*#__PURE__*/React.createElement("div", {
    className: `zpt-review-card ${className}`,
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: 'var(--canvas)',
      padding: '1.5rem',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-md)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 1.5rem',
      fontFamily: 'var(--font-body)',
      fontStyle: 'italic',
      fontSize: 14,
      lineHeight: 1.6,
      color: 'var(--ink-warm)'
    }
  }, "\u201C", quote, "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 999,
      background: '#E4E2DE',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 14,
      color: 'var(--ink-warm)'
    }
  }, initial)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 12,
      color: 'var(--ink-2)'
    }
  }, author), source && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--gold-olive)'
    }
  }, source))));
}
Object.assign(__ds_scope, { ReviewCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ReviewCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/TourRow.jsx
try { (() => {
/**
 * TourRow — the numbered, hover-reactive tour line from the homepage
 * highlights list. Big italic numeral, title + meta chips on the left,
 * description + a "Details →" link on the right. Hovering lifts the
 * row to white and turns the numeral & title burgundy.
 */
function TourRow({
  num,
  title,
  duration,
  meta,
  description,
  href = '#',
  ctaLabel = 'Details',
  last = false,
  className = '',
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: `zpt-tour-row ${className}`,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      padding: '1.5rem 2rem',
      background: hover ? 'var(--surface-card)' : 'var(--canvas)',
      borderBottom: last ? 'none' : '1px solid rgba(224,191,188,0.35)',
      transition: 'background var(--dur-base) var(--ease-out)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-italic)',
      fontStyle: 'italic',
      fontSize: 30,
      color: hover ? 'var(--crimson)' : 'var(--rose)',
      transition: 'color var(--dur-base) var(--ease-out)'
    }
  }, num), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-headline)',
      fontSize: 20,
      fontWeight: 700,
      color: hover ? 'var(--crimson)' : 'var(--ink-2)',
      transition: 'color var(--dur-base) var(--ease-out)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginTop: '0.25rem'
    }
  }, duration && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: 'var(--font-sans)',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--gold-olive)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 12
    }
  }, "schedule"), duration), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: 'var(--font-sans)',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--ink-warm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 12
    }
  }, "group"), meta)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem'
    }
  }, description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: '20rem',
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      lineHeight: 1.5,
      color: 'var(--ink-warm)'
    }
  }, description), /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--crimson)',
      textDecoration: 'none',
      whiteSpace: 'nowrap'
    }
  }, ctaLabel, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 18,
      transform: hover ? 'translateX(3px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-out)'
    }
  }, "chevron_right"))));
}
Object.assign(__ds_scope, { TourRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/TourRow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/journal/journal.jsx
try { (() => {
/* Zuza Prague Tours — Editorial Journal article (single post recreation) */
const DSJ = window.ZuzaPragueToursDesignSystem_748186;
const {
  PullQuote: PQ,
  Callout: CO,
  Ornament: OR,
  Button: BtnJ
} = DSJ;
const IMGJ = '../../assets/images/';
function Masthead() {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid var(--rule)',
      background: 'rgba(245,239,228,0.9)',
      backdropFilter: 'blur(10px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--shell)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      gap: 32,
      padding: '18px 48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--ink-mute)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Prag \xB7 Mai 2026"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 4,
      height: 4,
      borderRadius: 999,
      background: 'var(--burgundy)'
    }
  }), /*#__PURE__*/React.createElement("span", null, "Editorial \u2116\xA047")), /*#__PURE__*/React.createElement("a", {
    style: {
      textAlign: 'center',
      fontFamily: 'var(--font-italic)',
      fontSize: 24,
      fontStyle: 'italic',
      letterSpacing: '0.01em',
      color: 'var(--ink)',
      textDecoration: 'none'
    }
  }, "Zuza ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--burgundy)'
    }
  }, "&"), " Pragtour"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 28,
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--ink-soft)'
    }
  }, /*#__PURE__*/React.createElement("a", null, "Touren"), /*#__PURE__*/React.createElement("a", null, "Journal"), /*#__PURE__*/React.createElement("a", null, "\xDCber"), /*#__PURE__*/React.createElement("a", null, "Reservieren"))));
}
function P({
  children
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 19,
      lineHeight: 1.72,
      color: 'var(--ink-soft)',
      margin: '0 0 1.5em'
    }
  }, children);
}
function Article() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ivory)',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement(Masthead, null), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--shell)',
      margin: '0 auto',
      padding: '4rem 48px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '52rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'center',
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--brass-deep)',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("span", null, "Reisef\xFChrer"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 1,
      background: 'var(--brass)'
    }
  }), /*#__PURE__*/React.createElement("span", null, "9 Minuten Lesezeit")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '0 0 1.5rem',
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(2.5rem,5vw,4rem)',
      fontWeight: 400,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      color: 'var(--ink)'
    }
  }, "Die beste Zeit, um ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontFamily: 'var(--font-italic)',
      fontStyle: 'italic',
      color: 'var(--burgundy)'
    }
  }, "Prag"), " zu besuchen"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 2rem',
      fontFamily: 'var(--font-italic)',
      fontStyle: 'italic',
      fontSize: 24,
      lineHeight: 1.4,
      color: 'var(--ink-mute)'
    }
  }, "Jede Jahreszeit erz\xE4hlt eine andere Geschichte. Hier ist, wann die Stadt sich Ihnen am ehrlichsten zeigt."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      paddingBottom: 40,
      borderBottom: '1px solid var(--rule)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: IMGJ + 'zuzana-portrait.jpg',
    alt: "Zuzana",
    style: {
      width: 44,
      height: 44,
      borderRadius: 999,
      objectFit: 'cover',
      objectPosition: 'center 20%'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--ink)'
    }
  }, "Zuzana Manov\xE1"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-mute)'
    }
  }, "Zertifizierte Stadtf\xFChrerin")))), /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: '3rem 0 0'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: IMGJ + 'autumn-prague.jpg',
    alt: "Prag im Herbst",
    style: {
      width: '100%',
      height: 480,
      objectFit: 'cover',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: 12,
      paddingLeft: 16,
      borderLeft: '1px solid var(--brass)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontStyle: 'italic',
      color: 'var(--ink-mute)'
    }
  }, "Die Altstadt im Oktoberlicht \u2014 meine liebste Stunde des Jahres."))), /*#__PURE__*/React.createElement("article", {
    style: {
      maxWidth: '44rem',
      margin: '0 auto',
      padding: '3.5rem 24px 2rem'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 19,
      lineHeight: 1.72,
      color: 'var(--ink-soft)',
      margin: '0 0 1.5em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '5.4em',
      fontWeight: 500,
      lineHeight: 0.85,
      float: 'left',
      margin: '0.05em 0.08em 0 -0.04em',
      color: 'var(--burgundy)'
    }
  }, "P"), "rag ver\xE4ndert sich mit dem Licht. Im Fr\xFChnebel des M\xE4rz wirkt die Karlsbr\xFCcke wie eine Radierung; im Hochsommer gl\xFCht sie golden und ist voller Menschen. Nach vierzig Jahren wei\xDF ich: Es gibt keine falsche Zeit \u2014 nur unterschiedliche St\xE4dte."), /*#__PURE__*/React.createElement(P, null, "Die meisten Reisef\xFChrer empfehlen Mai und September. Sie haben nicht unrecht. Aber sie verschweigen, dass der Januar seine eigene, stille Sch\xF6nheit hat \u2014 wenn die Touristen fort sind und der Schnee die D\xE4cher der Kleinseite gl\xE4ttet."), /*#__PURE__*/React.createElement(PQ, {
    attribution: "Zuzana"
  }, "Kommen Sie im November. Die Stadt geh\xF6rt dann wieder denen, die sie lieben."), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 32,
      fontWeight: 400,
      lineHeight: 1.2,
      color: 'var(--ink)',
      margin: '2em 0 0.75em'
    }
  }, "Fr\xFChling, wenn die G\xE4rten ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontFamily: 'var(--font-italic)',
      fontStyle: 'italic',
      color: 'var(--burgundy)'
    }
  }, "erwachen")), /*#__PURE__*/React.createElement(P, null, "Die Palastg\xE4rten unter der Burg \xF6ffnen Anfang April. Es ist die Zeit, in der ich meine l\xE4ngsten Touren plane \u2014 f\xFCnf Stunden, weil man einfach nicht aufh\xF6ren m\xF6chte zu gehen."), /*#__PURE__*/React.createElement(CO, {
    label: "Tipp f\xFCr Fr\xFChbucher"
  }, "Die Burgg\xE4rten sind ", /*#__PURE__*/React.createElement("strong", null, "vor 10 Uhr"), " fast leer. Beginnen Sie dort, bevor die Reisegruppen eintreffen."), /*#__PURE__*/React.createElement(OR, null), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 32,
      fontWeight: 400,
      lineHeight: 1.2,
      color: 'var(--ink)',
      margin: '2em 0 0.75em'
    }
  }, "Winter, die ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontFamily: 'var(--font-italic)',
      fontStyle: 'italic',
      color: 'var(--burgundy)'
    }
  }, "ehrlichste"), " Jahreszeit"), /*#__PURE__*/React.createElement(P, null, "Wenn Sie Prag wirklich kennenlernen m\xF6chten, kommen Sie zwischen Dreik\xF6nig und Ostern. Die Caf\xE9s geh\xF6ren wieder den Einheimischen, und die Geschichten, die ich erz\xE4hle, hallen in leeren Gassen nach.")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '44rem',
      margin: '0 auto 4rem',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper)',
      border: '1px solid var(--rule)',
      textAlign: 'center',
      padding: 40
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 1em',
      fontFamily: 'var(--font-italic)',
      fontStyle: 'italic',
      fontSize: 24,
      fontWeight: 500,
      color: 'var(--burgundy)'
    }
  }, "M\xF6chten Sie Prag in Ihrer Jahreszeit sehen?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 1.5rem',
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      color: 'var(--ink-mute)'
    }
  }, "Begrenzte Verf\xFCgbarkeit f\xFCr private F\xFChrungen. Schreiben Sie mir, und wir finden den richtigen Tag."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(BtnJ, {
    variant: "accent",
    style: {
      borderRadius: 'var(--radius-pill)'
    }
  }, "Tour reservieren"), /*#__PURE__*/React.createElement(BtnJ, {
    variant: "link",
    style: {
      color: 'var(--burgundy)'
    }
  }, "Alle Touren ansehen")))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--paper)',
      borderTop: '1px solid var(--rule)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--shell)',
      margin: '0 auto',
      padding: '4rem 48px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 2rem',
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      letterSpacing: '0.24em',
      textTransform: 'uppercase',
      color: 'var(--ink-mute)'
    }
  }, "Weiterlesen im Journal"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 32
    }
  }, [['hidden-gems.jpg', 'Versteckte Höfe der Altstadt', 'Sieben Innenhöfe, die kein Reiseführer kennt.'], ['kafka.jpg', 'Auf Kafkas Spuren', 'Ein Spaziergang durch das deutsche Prag.'], ['night-prague.jpg', 'Prag nach Einbruch der Dunkelheit', 'Warum die Stadt nachts am schönsten ist.']].map(([img, t, d]) => /*#__PURE__*/React.createElement("a", {
    key: t,
    style: {
      cursor: 'pointer',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: IMGJ + img,
    alt: "",
    style: {
      width: '100%',
      height: 200,
      objectFit: 'cover',
      borderRadius: 2,
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: '0 0 0.5rem',
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      fontWeight: 400,
      color: 'var(--ink)'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      lineHeight: 1.55,
      color: 'var(--ink-mute)'
    }
  }, d)))))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Article, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/journal/journal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-app.jsx
try { (() => {
/* Zuza Prague Tours — Tours & Book screens + App shell */
const {
  useState: useStateB
} = React;
const DSB = window.ZuzaPragueToursDesignSystem_748186;
const {
  Button: BtnB,
  Icon: IconB,
  Eyebrow: EyebrowB,
  SectionHeading: SHB,
  Field: FieldB
} = DSB;
const TOURS_FULL = [{
  roman: 'I',
  title: 'Die Prager Burg & St.-Veits-Dom',
  duration: '3,5 Stunden',
  tags: ['Privatführung', 'Tiefgang'],
  desc: 'Tausend Jahre Macht, Glaube und Architektur auf dem größten zusammenhängenden Burgareal der Welt.'
}, {
  roman: 'II',
  title: 'Altstadt & Jüdisches Viertel',
  duration: '4 Stunden',
  tags: ['Private Gruppe', 'Akkreditiert'],
  desc: 'Das mittelalterliche Herz Prags und das bewegende Erbe des Josefov, geführt mit Museums-Akkreditierung.'
}, {
  roman: 'III',
  title: 'Individuelle Privattour',
  duration: 'Flexibel',
  tags: ['Maßgeschneidert'],
  desc: 'Sagen Sie mir, was Sie interessiert, und ich baue den Rundgang darum. Wenn Sie es noch nicht wissen, umso besser.'
}, {
  roman: 'IV',
  title: 'Verstecktes Prag',
  duration: '2,5 Stunden',
  tags: ['Versteckte Juwelen'],
  desc: 'Höfe, Gassen und Geschichten abseits der Touristenpfade — das Prag, das die Einheimischen lieben.'
}, {
  roman: 'V',
  title: 'Prag & deutsches Erbe',
  duration: '2,75 Stunden',
  tags: ['Deutschsprachig'],
  desc: 'Auf den Spuren der deutschsprachigen Geschichte Prags, von Kafka bis zur Prager deutschen Literatur.'
}];
function ToursScreen({
  go
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: 'var(--paper)',
      color: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      maxWidth: 'var(--shell-editorial)',
      margin: '0 auto',
      padding: '4rem 2.5rem 3rem'
    }
  }, /*#__PURE__*/React.createElement(EyebrowB, {
    tone: "mute",
    style: {
      marginBottom: 24
    }
  }, "Touren \xB7 Privatf\xFChrungen"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '0 0 2rem',
      maxWidth: '44rem',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-display-lg)',
      fontWeight: 400,
      lineHeight: 1.1,
      color: 'var(--ink)'
    }
  }, "Jede Tour beginnt mit Ihrer Neugier."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: '36rem',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-lg)',
      lineHeight: 1.6,
      color: 'var(--stone-700)'
    }
  }, "Keine festen Skripte, keine Massen. Nur Sie, Prag und vierzig Jahre Geschichten. W\xE4hlen Sie einen Ausgangspunkt \u2014 den Rest gestalten wir gemeinsam.")), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--shell-editorial)',
      margin: '0 auto',
      padding: '0 2.5rem 5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--stone-200)'
    }
  }, TOURS_FULL.map(t => /*#__PURE__*/React.createElement("article", {
    key: t.roman,
    style: {
      display: 'grid',
      gridTemplateColumns: '4rem minmax(0,1fr) auto',
      gap: 40,
      borderBottom: '1px solid var(--stone-200)',
      padding: '3.5rem 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 20,
      color: 'var(--stone-400)'
    }
  }, t.roman, "."), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '44rem'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 0.75rem',
      fontFamily: 'var(--font-display)',
      fontSize: 28,
      fontWeight: 400,
      lineHeight: 1.15,
      color: 'var(--ink)'
    }
  }, t.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 1.25rem',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      lineHeight: 1.7,
      color: 'var(--stone-700)'
    }
  }, t.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 24,
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--stone-500)'
    }
  }, /*#__PURE__*/React.createElement("span", null, t.duration), t.tags.map(tag => /*#__PURE__*/React.createElement("span", {
    key: tag
  }, tag)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => go('book'),
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--accent)',
      cursor: 'pointer',
      textDecoration: 'underline',
      textUnderlineOffset: 4,
      whiteSpace: 'nowrap'
    }
  }, "Anfrage senden \u2192"), /*#__PURE__*/React.createElement("a", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--stone-500)',
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    }
  }, "Tour ansehen")))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--ink)',
      color: 'var(--paper)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--shell-editorial)',
      margin: '0 auto',
      padding: '5rem 2.5rem',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(EyebrowB, {
    tone: "onDark",
    style: {
      marginBottom: 16,
      color: 'var(--stone-400)'
    }
  }, "Bereit zu beginnen?"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 auto 1.5rem',
      maxWidth: '40rem',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-display-md)',
      fontWeight: 400,
      color: 'var(--paper)'
    }
  }, "Erz\xE4hlen Sie mir, was Sie interessiert."), /*#__PURE__*/React.createElement(BtnB, {
    variant: "onDark",
    onClick: () => go('book')
  }, "Tour buchen"))));
}
function BookScreen() {
  const [sent, setSent] = useStateB(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper)',
      paddingBottom: 96,
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid var(--stone-200)',
      padding: '3.5rem 1.25rem',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(EyebrowB, {
    tone: "mute",
    style: {
      marginBottom: 12
    }
  }, "Tour buchen"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-display-md)',
      fontWeight: 400,
      color: 'var(--ink)'
    }
  }, "Ihre Anfrage"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '1rem auto 0',
      maxWidth: '40rem',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      color: 'var(--stone-600)'
    }
  }, "Erz\xE4hlen Sie mir von Ihrer Gruppe und Ihren Interessen. Ich melde mich in der Regel innerhalb von 24 Stunden.")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--shell-editorial)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '5fr 7fr',
      gap: 64,
      padding: '4rem 2.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/images/zuzana-portrait.jpg",
    alt: "Zuzana",
    style: {
      width: 80,
      height: 80,
      borderRadius: 2,
      objectFit: 'cover',
      objectPosition: 'center 20%',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 20,
      color: 'var(--ink)'
    }
  }, "Direkt mit Zuzana"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0.25rem 0 0',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      lineHeight: 1.6,
      color: 'var(--stone-600)'
    }
  }, "Keine Agentur, kein Callcenter \u2014 Sie schreiben mir, und ich antworte pers\xF6nlich."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      borderTop: '1px solid var(--stone-200)',
      paddingTop: 24
    }
  }, [['Telefon', '+420 721 231 933'], ['WhatsApp', 'Direkt schreiben'], ['E-Mail', 'zuzanamanova@email.cz'], ['Antwortzeit', 'In der Regel < 24 Stunden']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 2px',
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--stone-400)'
    }
  }, k), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--ink)'
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--stone-200)',
      paddingTop: 24
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 16,
      fontStyle: 'italic',
      lineHeight: 1.5,
      color: 'var(--ink)'
    }
  }, "\u201CDie beste Reiseentscheidung, die wir getroffen haben.\u201D"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0.75rem 0 0',
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--stone-400)'
    }
  }, "\u2014 Monika H."))), /*#__PURE__*/React.createElement("div", null, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid #cfe3d4',
      background: '#f1f7f2',
      padding: '3.5rem 1.5rem',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 0.5rem',
      fontFamily: 'var(--font-display)',
      fontSize: 24,
      color: 'var(--success)'
    }
  }, "Anfrage gesendet!"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 auto',
      maxWidth: '24rem',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: '#3f6b4a'
    }
  }, "Vielen Dank! Ich melde mich in der Regel innerhalb von 24 Stunden bei Ihnen.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--stone-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid var(--stone-200)',
      padding: '1rem 1.5rem'
    }
  }, /*#__PURE__*/React.createElement(EyebrowB, {
    tone: "mute"
  }, "Anfrageformular")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      padding: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(FieldB, {
    label: "Name",
    name: "name",
    required: true,
    placeholder: "Ihr Name"
  }), /*#__PURE__*/React.createElement(FieldB, {
    label: "E-Mail",
    name: "email",
    type: "email",
    required: true,
    placeholder: "ihre@email.de"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(FieldB, {
    label: "Wunschtermin",
    name: "date",
    placeholder: "z. B. Mai 2026"
  }), /*#__PURE__*/React.createElement(FieldB, {
    label: "Telefon (optional)",
    name: "phone",
    type: "tel"
  })), /*#__PURE__*/React.createElement(FieldB, {
    label: "Nachricht",
    name: "message",
    as: "textarea",
    rows: 4,
    placeholder: "Erz\xE4hlen Sie mir von Ihrer Gruppe und was Sie in Prag sehen m\xF6chten\u2026"
  }), /*#__PURE__*/React.createElement(BtnB, {
    variant: "ink",
    fullWidth: true,
    onClick: () => setSent(true)
  }, "Anfrage senden"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      textAlign: 'center',
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--stone-400)'
    }
  }, "Ihre Daten sind sicher und werden nicht weitergegeben."))))));
}
function App() {
  const [screen, setScreen] = useStateB('home');
  const go = s => {
    setScreen(s);
    window.scrollTo({
      top: 0
    });
  };
  const {
    Header,
    Footer,
    Home
  } = window.ZPTSite;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, {
    screen: screen,
    go: go
  }), screen === 'home' && /*#__PURE__*/React.createElement(Home, {
    go: go
  }), screen === 'tours' && /*#__PURE__*/React.createElement(ToursScreen, {
    go: go
  }), screen === 'book' && /*#__PURE__*/React.createElement(BookScreen, {
    go: go
  }), /*#__PURE__*/React.createElement(Footer, {
    go: go
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-home.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Zuza Prague Tours — Marketing website UI kit
   Composes the design-system primitives into the live site's three core
   surfaces: Home, Tours, and Book. Interactive nav switches screens. */
const {
  useState
} = React;
const DS = window.ZuzaPragueToursDesignSystem_748186;
const {
  Button,
  Icon,
  Eyebrow,
  Badge,
  SectionHeading,
  StatBlock,
  TourRow,
  ReviewCard,
  Field
} = DS;
const IMG = '../../assets/images/';
const NAV = [{
  id: 'home',
  label: 'Startseite'
}, {
  id: 'tours',
  label: 'Touren'
}, {
  id: 'book',
  label: 'Tour buchen'
}];

/* ── Shared chrome ───────────────────────────────────────────── */
function Header({
  screen,
  go
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid var(--stone-200)',
      background: 'rgba(250,246,236,0.95)',
      backdropFilter: 'blur(10px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--shell-editorial)',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem'
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => go('home'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 999,
      background: 'var(--ink)',
      color: 'var(--paper)',
      fontFamily: 'var(--font-headline)',
      fontSize: 14,
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, "Z"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      fontWeight: 500,
      letterSpacing: '-0.01em',
      color: 'var(--ink)'
    }
  }, "Zuzana Manov\xE1")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 32
    }
  }, ['tours', 'home'].map(() => null), /*#__PURE__*/React.createElement("a", {
    onClick: () => go('tours'),
    style: navLink(screen === 'tours')
  }, "Touren"), /*#__PURE__*/React.createElement("a", {
    style: navLink(false)
  }, "\xDCber Zuzana"), /*#__PURE__*/React.createElement("a", {
    style: navLink(false)
  }, "Blog"), /*#__PURE__*/React.createElement("a", {
    style: navLink(false)
  }, "Kontakt"), /*#__PURE__*/React.createElement("a", {
    href: "tel:+420721231933",
    style: navLink(false)
  }, "+420 721 231 933"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    onClick: () => go('book')
  }, "Tour buchen"))));
}
function navLink(active) {
  return {
    fontFamily: 'var(--font-label)',
    fontSize: 14,
    letterSpacing: '0.01em',
    color: active ? 'var(--ink)' : 'var(--stone-500)',
    cursor: 'pointer',
    textDecoration: 'none'
  };
}
function Footer({
  go
}) {
  return /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--shell-editorial)',
      margin: '0 auto',
      display: 'flex',
      flexWrap: 'wrap',
      gap: 24,
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '3rem 2rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "mute",
    style: {
      color: 'var(--stone-500)'
    }
  }, "Zertifizierte Expertin \xB7 40 Jahre Erfahrung"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0.5rem 0 0',
      fontFamily: 'var(--font-headline)',
      fontSize: 'var(--text-display-md)',
      color: 'var(--paper)'
    }
  }, "Bereit, Prag zu entdecken?")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "tel:+420721231933",
    style: {
      fontFamily: 'var(--font-label)',
      fontSize: 14,
      color: 'var(--stone-300)',
      textDecoration: 'none'
    }
  }, "+420 721 231 933"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--stone-600)'
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("a", {
    style: {
      fontFamily: 'var(--font-label)',
      fontSize: 14,
      color: 'var(--stone-300)',
      textDecoration: 'none',
      cursor: 'pointer'
    }
  }, "WhatsApp"), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "sm",
    onClick: () => go('book')
  }, "Tour buchen")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--shell-editorial)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr',
      gap: 32,
      padding: '3rem 2rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-headline)',
      fontSize: 18,
      color: 'var(--ink)'
    }
  }, "Zuza Prague Tours"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0.75rem 0 1.25rem',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      lineHeight: 1.6,
      color: 'var(--stone-600)',
      maxWidth: '22rem'
    }
  }, "Erleben Sie Prag mit Ihrer deutschsprachigen Expertin und Spezialistin f\xFCr Prag-F\xFChrungen."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-label)',
      fontSize: 12,
      color: 'var(--stone-500)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    fill: true,
    size: 14,
    color: "var(--gold-olive)"
  }), " 4,9 \u2605 TripAdvisor \xB7 @erlebnis_tour_prag")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: footH()
  }, "Kontakt"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("a", {
    style: footLink()
  }, "+420 721 231 933"), /*#__PURE__*/React.createElement("a", {
    style: footLink()
  }, "zuzanamanova@email.cz"), /*#__PURE__*/React.createElement("a", {
    style: footLink()
  }, "WhatsApp"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: footH()
  }, "Schnelllinks"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => go('home'),
    style: footLink()
  }, "Startseite"), /*#__PURE__*/React.createElement("a", {
    onClick: () => go('tours'),
    style: footLink()
  }, "Touren"), /*#__PURE__*/React.createElement("a", {
    style: footLink()
  }, "\xDCber Zuzana"), /*#__PURE__*/React.createElement("a", {
    onClick: () => go('book'),
    style: footLink()
  }, "Tour buchen")))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--stone-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--shell-editorial)',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1.25rem 2rem'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-label)',
      fontSize: 12,
      color: 'var(--stone-400)'
    }
  }, "\xA9 2026 Zuza Prague Tours \u2013 Zuzana Manov\xE1. Alle Rechte vorbehalten"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      fontFamily: 'var(--font-label)',
      fontSize: 12,
      color: 'var(--stone-400)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Datenschutz"), "\xB7", /*#__PURE__*/React.createElement("span", null, "AGB"))))));
}
function footH() {
  return {
    fontFamily: 'var(--font-label)',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--stone-400)',
    margin: '0 0 1rem'
  };
}
function footLink() {
  return {
    fontFamily: 'var(--font-label)',
    fontSize: 14,
    color: 'var(--stone-600)',
    textDecoration: 'none',
    cursor: 'pointer'
  };
}

/* ── Home ────────────────────────────────────────────────────── */
const TOURS = [{
  num: '01',
  title: 'Altstadt & Jüdisches Viertel',
  duration: '4 Stunden',
  meta: 'Private Gruppe',
  desc: 'Ein tiefes Eintauchen in das mittelalterliche Herz Prags, auf den Spuren von 1.000 Jahren Legenden.'
}, {
  num: '02',
  title: 'Das alchemistische Prag',
  duration: '3 Stunden',
  meta: 'Versteckte Juwelen',
  desc: 'Entdecken Sie die mystische Seite der Prager Geschichte, von der Astrologie bis zur Alchemie.'
}, {
  num: '03',
  title: 'Böhmische Kunst & Architektur',
  duration: '5 Stunden',
  meta: 'Expertenfokus',
  desc: 'Ein kuratierter Spaziergang durch Jugendstil, Kubismus und die barocke Pracht der Kleinseite.'
}];
const REVIEWS = [{
  quote: 'Zuzanas persönliche Geschichte mit der Stadt macht diese Führung zu etwas völlig Einzigartigem. Absolut unvergesslich.',
  author: 'Thomas K.',
  source: 'TripAdvisor'
}, {
  quote: 'Ein absolutes Highlight unserer Europareise. Ihr Wissen über Architektur und Geschichte ist unübertroffen.',
  author: 'Monika H.',
  source: 'TourHQ Verifiziert'
}, {
  quote: 'Perfekt für unsere Familie. Sie hat die Kinder mit lokalen Legenden fasziniert.',
  author: 'Familie Schneider',
  source: 'Private Buchung'
}];
function Home({
  go
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--canvas)',
      color: 'var(--ink-2)'
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight: '78vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      padding: '4rem 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG + 'charles-bridge-hero.jpg',
    alt: "Karlsbr\xFCcke",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to right, var(--canvas), rgba(251,249,245,0.6) 45%, transparent)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 10,
      maxWidth: 'var(--shell-editorial)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 32,
      alignItems: 'center',
      width: '100%',
      padding: '0 2rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "gold",
    icon: "star"
  }, "Zertifizierte Expertin"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-headline)',
      fontSize: 'clamp(2.5rem,5vw,4.25rem)',
      lineHeight: 1.08,
      fontWeight: 700,
      color: 'var(--ink-2)'
    }
  }, "Entdecken Sie", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: 'italic',
      color: 'var(--crimson)'
    }
  }, "Prag"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: 'italic'
    }
  }, "mit Zuzana Manov\xE1")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 20,
      lineHeight: 1.55,
      color: 'var(--ink-warm)',
      maxWidth: '32rem'
    }
  }, "Erleben Sie die Magie Prags mit den Augen einer zertifizierten lokalen Expertin."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    icon: "arrow_forward",
    onClick: () => go('book')
  }, "Anfrage senden"), /*#__PURE__*/React.createElement(Button, {
    variant: "onDark",
    size: "lg",
    style: {
      background: 'rgba(255,255,255,0.8)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(224,191,188,0.3)'
    },
    onClick: () => go('tours')
  }, "Touren erkunden"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -48,
      left: -48,
      width: 256,
      height: 256,
      background: 'rgba(123,88,0,0.10)',
      borderRadius: 999,
      filter: 'blur(48px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 10,
      background: '#fff',
      padding: 16,
      borderRadius: 12,
      boxShadow: 'var(--shadow-xl)',
      transform: 'rotate(2deg)',
      maxWidth: 360,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG + 'zuzana-portrait.jpg',
    alt: "Zuzana Manov\xE1",
    style: {
      borderRadius: 8,
      aspectRatio: '4/5',
      objectFit: 'cover',
      objectPosition: 'center 20%',
      width: '100%',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: -24,
      right: -24,
      padding: 16,
      borderRadius: 8,
      boxShadow: 'var(--shadow-lg)',
      color: '#fff',
      maxWidth: 240,
      background: 'var(--grad-burgundy)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-headline)',
      fontStyle: 'italic',
      fontSize: 16,
      lineHeight: 1.35
    }
  }, "\u201CPrag ist eine vielschichtige Geschichte, lassen Sie uns diese gemeinsam lesen.\u201D"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0.5rem 0 0',
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      opacity: 0.8
    }
  }, "\u2014 Zuzana")))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '3rem 0',
      background: 'var(--canvas-alt)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--shell-editorial)',
      margin: '0 auto',
      padding: '0 2rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 48,
      gap: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Beliebte Touren",
    eyebrowTone: "gold",
    title: "Ausgew\xE4hlte Erlebnisse"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: '28rem',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      lineHeight: 1.6,
      color: 'var(--ink-warm)'
    }
  }, "Ma\xDFgeschneiderte Routen f\xFCr anspruchsvolle Reisende, mit Fokus auf Authentizit\xE4t, Geschichte und dem lokalen Puls der Stadt.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 4
    }
  }, TOURS.map((t, i) => /*#__PURE__*/React.createElement(TourRow, _extends({
    key: t.num
  }, t, {
    description: t.desc,
    onClick: () => go('book'),
    href: "#",
    last: i === TOURS.length - 1
  })))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '4rem 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--shell-editorial)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '5fr 7fr',
      gap: 48,
      alignItems: 'center',
      padding: '0 2rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: -40,
      transform: 'translateY(-50%)',
      zIndex: 0,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-headline)',
      fontStyle: 'italic',
      fontSize: '8rem',
      lineHeight: 1,
      color: 'rgba(228,226,222,0.5)',
      userSelect: 'none'
    }
  }, "Zuzana")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 10,
      borderRadius: 12,
      overflow: 'hidden',
      aspectRatio: '3/4',
      boxShadow: 'var(--shadow-xl)',
      background: '#eae8e4'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG + 'zuzana-portrait.jpg',
    alt: "Zuzana Manov\xE1",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center 20%'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: -24,
      right: -24,
      width: 192,
      height: 192,
      border: '4px solid rgba(123,88,0,0.2)',
      borderRadius: 8,
      zIndex: 0
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Lernen Sie Zuzana kennen",
    eyebrowTone: "burgundy",
    title: "Prag, erz\xE4hlt mit",
    emphasis: "Leidenschaft"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      lineHeight: 1.65,
      color: 'var(--ink-warm)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "Ich bin Ing. Zuzana Manov\xE1 \u2013 deutschsprachige Prag-Expertin und zertifizierte Stadtf\xFChrerin. Seit 1986 f\xFChre ich Besucher durch Prag."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "Als Spezialistin f\xFCr Prager Geschichte besitze ich die offizielle tschechische Zertifizierung und eine Akkreditierung des J\xFCdischen Museums in Prag.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 40,
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "40+",
    label: "Jahre Erfahrung"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "4,9k",
    label: "Touren kuratiert"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "5,0",
    label: "Sterne Bewertung"
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '3.5rem 0',
      background: 'var(--ink)',
      color: 'var(--paper)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--shell-editorial)',
      margin: '0 auto',
      padding: '0 2rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Von meinen G\xE4sten",
    title: "Fotos von unseren Touren",
    align: "center",
    onDark: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gridAutoRows: '180px',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: galCell(2, 2)
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG + 'guest-tourguide.jpg',
    style: galImg(),
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    style: galCell(1, 1)
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG + 'guest-night.jpeg',
    style: galImg(),
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    style: galCell(1, 1)
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG + 'guest-food.jpeg',
    style: galImg(),
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    style: galCell(2, 1)
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG + 'boat-vltava.jpg',
    style: galImg(),
    alt: ""
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '3.5rem 0',
      background: 'var(--canvas-mute)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--shell-editorial)',
      margin: '0 auto',
      padding: '0 2rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: 4,
      marginBottom: 8
    }
  }, [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement(Icon, {
    key: i,
    name: "star",
    fill: true,
    size: 18,
    color: "var(--gold-olive)"
  }))), /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Unvergessliche Erinnerungen",
    align: "center"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24
    }
  }, REVIEWS.map((r, i) => /*#__PURE__*/React.createElement(ReviewCard, _extends({
    key: i
  }, r)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '3.5rem 2rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '64rem',
      margin: '0 auto',
      borderRadius: 'var(--radius-2xl)',
      padding: '4rem 2rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-xl)',
      background: 'var(--grad-burgundy)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.1
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG + 'prague-castle.jpg',
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      mixBlendMode: 'overlay'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-headline)',
      fontSize: 'clamp(2rem,4vw,3rem)',
      fontWeight: 700,
      color: '#fff',
      lineHeight: 1.1
    }
  }, "Bereit, Prag zu entdecken?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: '36rem',
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      color: 'rgba(255,255,255,0.85)'
    }
  }, "Begrenzte Verf\xFCgbarkeit f\xFCr private Buchungen. Kontaktieren Sie Zuzana noch heute, um Ihre individuelle Reiseroute zu planen."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "onDark",
    style: {
      color: 'var(--crimson)'
    },
    onClick: () => go('book')
  }, "Anfrage senden"), /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    style: {
      color: '#fff',
      textDecorationColor: 'rgba(255,255,255,0.5)',
      padding: '0.75rem 1rem'
    },
    onClick: () => go('tours')
  }, "Touren erkunden"))))));
}
function galCell(c, r) {
  return {
    gridColumn: `span ${c}`,
    gridRow: `span ${r}`,
    overflow: 'hidden',
    borderRadius: 8
  };
}
function galImg() {
  return {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };
}
window.ZPTSite = {
  Header,
  Footer,
  Home
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site/site.js
try { (() => {
/* ============================================================
   Zuza Prague Tours — full site, shared behavior
   Injects header + footer, marks the current page, handles the
   solid-on-scroll header, scroll reveals, and the mobile menu.
   Each page: <body class="home|inner" data-page="tours"> and empty
   <header class="nav ..." id="nav"></header> + <footer id="footer">.
   ============================================================ */
(function () {
  var FUNNEL = '../review-funnel.html';
  var NAV = [{
    key: 'tours',
    label: 'Touren',
    href: 'tours.html'
  }, {
    key: 'zuzana',
    label: 'Über Zuzana',
    href: 'zuzana.html'
  }, {
    key: 'blog',
    label: 'Journal',
    href: 'blog.html'
  }, {
    key: 'kontakt',
    label: 'Kontakt',
    href: 'kontakt.html'
  }];
  var page = document.body.dataset.page || '';

  /* ---- Header ---- */
  var nav = document.getElementById('nav');
  if (nav) {
    var links = NAV.map(function (n) {
      var cur = n.key === page ? ' current' : '';
      return '<a class="' + cur.trim() + '" href="' + n.href + '">' + n.label + '</a>';
    }).join('');
    nav.innerHTML = '<a class="nav__brand" href="index.html">Zuza <b>&amp;</b> Pragtour</a>' + '<nav class="nav__links">' + links + '<a href="kontakt.html" class="nav__cta">Tour buchen</a>' + '</nav>' + '<details class="m-menu"><summary aria-label="Menü öffnen"><span></span><span></span><span></span></summary>' + '<div class="m-menu__panel">' + NAV.map(function (n) {
      return '<a href="' + n.href + '">' + n.label + '</a>';
    }).join('') + '<a href="kontakt.html">Tour buchen</a>' + '</div>' + '</details>';
  }

  /* ---- Footer ---- */
  var footer = document.getElementById('footer');
  if (footer) {
    footer.innerHTML = '<div class="shell">' + '<div class="footer__top">' + '<div>' + '<div class="footer__brand">Zuza <b>&amp;</b> Pragtour</div>' + '<p class="tag">Erleben Sie Prag mit Ihrer deutschsprachigen Expertin und Spezialistin für Prag-Führungen.</p>' + '<a class="btn cream sm" href="tours.html" style="display:flex;width:-webkit-fit-content;width:fit-content;margin-bottom:1.1rem">Meine Touren ansehen <span class="material-symbols-outlined">arrow_forward</span></a>' + '<a class="ulink" style="color:var(--gold-lamp)" href="https://www.tripadvisor.de" target="_blank" rel="noopener">4,9 ★ TripAdvisor</a>' + '</div>' + '<div class="footer__col"><h4>Kontakt</h4>' + '<a href="tel:+420721231933">+420 721 231 933</a>' + '<a href="mailto:zuzanamanova@email.cz">zuzanamanova@email.cz</a>' + '<a href="https://wa.me/420721231933" target="_blank" rel="noopener">WhatsApp</a>' + '</div>' + '<div class="footer__col"><h4>Schnelllinks</h4>' + '<a href="index.html">Startseite</a>' + '<a href="tours.html">Touren</a>' + '<a href="zuzana.html">Über Zuzana</a>' + '<a href="blog.html">Journal</a>' + '<a href="kontakt.html">Tour buchen</a>' + '</div>' + '<div class="footer__col"><h4>Mehr</h4>' + '<a href="' + FUNNEL + '">Bewertung abgeben</a>' + '<a href="https://www.instagram.com/erlebnis_tour_prag/" target="_blank" rel="noopener">@erlebnis_tour_prag</a>' + '<a href="https://www.tripadvisor.de" target="_blank" rel="noopener">TripAdvisor</a>' + '</div>' + '</div>' + '<div class="footer__bottom">' + '<p>© 2026 Zuza Prague Tours – Zuzana Manová. Alle Rechte vorbehalten.</p>' + '<div style="display:flex;gap:1.5rem">' + '<a href="privacy.html">Datenschutz</a><a href="terms.html">AGB</a>' + '</div>' + '</div>' + '</div>';
  }

  /* ---- Solid-on-scroll (home only; inner pages ship solid) ---- */
  if (nav && document.body.classList.contains('home')) {
    var onScroll = function () {
      nav.classList.toggle('solid', window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
  }

  /* ---- Scroll reveals (with fail-safe) ---- */
  var reveals = document.querySelectorAll('.reveal');
  var revealAll = function () {
    reveals.forEach(function (el) {
      el.classList.add('in');
    });
  };
  if (!('IntersectionObserver' in window)) {
    revealAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -6% 0px'
    });
    reveals.forEach(function (el) {
      io.observe(el);
    });
    setTimeout(revealAll, 1500);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site/site.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.Ornament = __ds_scope.Ornament;

__ds_ns.PullQuote = __ds_scope.PullQuote;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.ReviewCard = __ds_scope.ReviewCard;

__ds_ns.TourRow = __ds_scope.TourRow;

})();
