/* @ds-bundle: {"format":3,"namespace":"ZuzaPragueToursDesignSystem_748186","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Field","sourcePath":"components/core/Field.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"Callout","sourcePath":"components/editorial/Callout.jsx"},{"name":"Ornament","sourcePath":"components/editorial/Ornament.jsx"},{"name":"PullQuote","sourcePath":"components/editorial/PullQuote.jsx"},{"name":"SectionHeading","sourcePath":"components/editorial/SectionHeading.jsx"},{"name":"StatBlock","sourcePath":"components/editorial/StatBlock.jsx"},{"name":"ReviewCard","sourcePath":"components/marketing/ReviewCard.jsx"},{"name":"TourRow","sourcePath":"components/marketing/TourRow.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"7aecadaff83b","components/core/Button.jsx":"36c194388d46","components/core/Eyebrow.jsx":"a1fd7d735db9","components/core/Field.jsx":"c35e2453cb24","components/core/Icon.jsx":"5f9b4cc1b117","components/editorial/Callout.jsx":"aeaf3cd8191c","components/editorial/Ornament.jsx":"f64c8a825f66","components/editorial/PullQuote.jsx":"7a9247d82cee","components/editorial/SectionHeading.jsx":"678282945775","components/editorial/StatBlock.jsx":"0c88b6befb89","components/marketing/ReviewCard.jsx":"4513e85e1484","components/marketing/TourRow.jsx":"5c6f123f83ed","handoff/ui_kits/website/site-app.jsx":"4c25386509b8","handoff/ui_kits/website/site-home.jsx":"c60a9ca4b64b","handoff/ui_kits/website/site/site.js":"adb7f0b41e66","ui_kits/journal/journal.jsx":"e0b007abb58a","ui_kits/website/site-app.jsx":"4c25386509b8","ui_kits/website/site-home.jsx":"c60a9ca4b64b","ui_kits/website/site/journal-content-1.js":"2e9b5e727d2c","ui_kits/website/site/journal-content-2.js":"44a8cfa25025","ui_kits/website/site/journal-content-3.js":"1ace3f8edf2c","ui_kits/website/site/journal.js":"2fef36d3095e","ui_kits/website/site/site.js":"adb7f0b41e66"},"inlinedExternals":[],"unexposedExports":[]} */

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

// handoff/ui_kits/website/site-app.jsx
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "handoff/ui_kits/website/site-app.jsx", error: String((e && e.message) || e) }); }

// handoff/ui_kits/website/site-home.jsx
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "handoff/ui_kits/website/site-home.jsx", error: String((e && e.message) || e) }); }

// handoff/ui_kits/website/site/site.js
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "handoff/ui_kits/website/site/site.js", error: String((e && e.message) || e) }); }

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

// ui_kits/website/site/journal-content-1.js
try { (() => {
/* Zuza Prague Tours — Journal content (1/3). Articles 1–5.
   Real, practical Prague guides in Zuzana's voice. Map points use
   real coordinates [lat, lng]; route:true draws a walking line. */
window.JOURNAL = window.JOURNAL || [];
window.JOURNAL.push({
  slug: 'beste-reisezeit',
  category: 'Reiseführer',
  title: 'Die beste Zeit, um <em>Prag</em> zu besuchen',
  titlePlain: 'Die beste Zeit, um Prag zu besuchen',
  cardBlurb: 'Jede Jahreszeit erzählt eine andere Geschichte — und warum der November mein Geheimtipp ist.',
  readTime: '9 Min.',
  date: 'Mai 2026',
  hero: 'autumn-prague.jpg',
  heroCap: 'Die Altstadt im Oktoberlicht — meine liebste Stunde des Jahres.',
  standfirst: 'Jede Jahreszeit erzählt eine andere Geschichte. Hier ist, wann die Stadt sich Ihnen am ehrlichsten zeigt.',
  meta: [{
    k: 'Saison',
    v: 'Ganzjährig'
  }, {
    k: 'Beste Monate',
    v: 'Mai · Sep · Nov'
  }, {
    k: 'Tageszeit',
    v: 'Früh'
  }, {
    k: 'Niveau',
    v: 'Gemütlich'
  }],
  railFacts: {
    title: 'Auf einen Blick',
    items: [{
      k: 'Frühling',
      v: 'Gärten erwachen'
    }, {
      k: 'Sommer',
      v: 'Früh starten'
    }, {
      k: 'Herbst',
      v: 'Bestes Licht'
    }, {
      k: 'Winter',
      v: 'Am ruhigsten'
    }]
  },
  blocks: [{
    t: 'p',
    first: true,
    html: 'Prag verändert sich mit dem Licht. Im Frühnebel des März wirkt die Karlsbrücke wie eine Radierung; im Hochsommer glüht sie golden und ist voller Menschen. Nach vierzig Jahren weiß ich: Es gibt keine falsche Zeit — nur unterschiedliche Städte.'
  }, {
    t: 'p',
    html: 'Die meisten Reiseführer empfehlen Mai und September, und sie haben nicht unrecht. Doch sie verschweigen, dass jede Jahreszeit ihren eigenen Vorzug hat — wenn man weiß, wann man wohin geht.'
  }, {
    t: 'h2',
    html: 'Frühling, wenn die Gärten <em>erwachen</em>'
  }, {
    t: 'p',
    html: 'Die Palastgärten unter der Burg öffnen Anfang April. Es ist die Zeit, in der ich meine längsten Touren plane — fünf Stunden, weil man einfach nicht aufhören möchte zu gehen. Flieder über barocken Terrassen, und noch genug Ruhe, um sie zu genießen.'
  }, {
    t: 'callout',
    label: 'Tipp für Frühbucher',
    html: '<p>Die Burggärten und der Wallenstein-Garten sind <strong>vor 10 Uhr</strong> fast leer. Beginnen Sie dort, bevor die Reisegruppen eintreffen.</p>'
  }, {
    t: 'h2',
    html: 'Sommer — früh oder gar nicht'
  }, {
    t: 'p',
    html: 'Der Juli ist warm und voll. Mein Rat: Starten Sie um 8 Uhr. Bis die Tagesausflügler die Altstadt erreichen, haben wir die Karlsbrücke bereits hinter uns und sitzen im Schatten eines Hofes. Am späten Nachmittag gehört die Stadt dann wieder den Flaneuren.'
  }, {
    t: 'h2',
    html: 'Herbst, die <em>fotogenste</em> Jahreszeit'
  }, {
    t: 'p',
    html: 'Oktober ist mein persönlicher Favorit. Das Laub auf der Kampa-Insel, der Dunst über der Moldau, das tiefe Licht auf den Sandsteinfassaden. Die Sommerhitze ist fort, die Weihnachtsmenge noch nicht da.'
  }, {
    t: 'quote',
    html: 'Kommen Sie im November. Die Stadt gehört dann wieder denen, die sie lieben.',
    by: 'Zuzana'
  }, {
    t: 'h2',
    html: 'Winter, die ehrlichste Stadt'
  }, {
    t: 'p',
    html: 'Zwischen Dreikönig und Ostern gehören die Cafés wieder den Einheimischen, und die Geschichten, die ich erzähle, hallen in leeren Gassen nach. Ziehen Sie sich warm an, planen Sie Pausen in alten Kaffeehäusern ein — und lassen Sie sich Zeit.'
  }, {
    t: 'map',
    title: 'Meine Lieblingsorte durchs Jahr',
    route: false,
    list: true,
    cap: 'Vier Orte, die in ihrer jeweiligen Saison am schönsten sind. Tippen Sie auf einen Punkt.',
    points: [{
      coord: [50.0897, 14.4060],
      label: 'Wallenstein-Garten',
      note: 'Frühling: barocke Terrassen, frei zugänglich, vor 10 Uhr fast leer.'
    }, {
      coord: [50.0855, 14.4080],
      label: 'Kampa-Insel',
      note: 'Herbst: Laub an der Moldau, das schönste Licht der Stadt.'
    }, {
      coord: [50.0835, 14.3954],
      label: 'Petřín-Hügel',
      note: 'Sommer: Obstgärten und kühle Höhenluft über der Stadt.'
    }, {
      coord: [50.0640, 14.4178],
      label: 'Vyšehrad',
      note: 'Winter: still, weit, fast ohne Touristen — meine Wintertour.'
    }]
  }, {
    t: 'ornament'
  }, {
    t: 'p',
    html: 'Wenn Sie mir sagen, wann Sie kommen, baue ich die Route um die Jahreszeit herum. Das ist der Unterschied zwischen einer Tour und <em>Ihrer</em> Tour.'
  }],
  related: ['48-stunden-prag', 'aussichtspunkte', 'versteckte-hoefe']
}, {
  slug: '48-stunden-prag',
  category: 'Reiserouten',
  title: '48 Stunden in <em>Prag</em>',
  titlePlain: '48 Stunden in Prag',
  cardBlurb: 'Ein durchdachter Spaziergang für ein Wochenende — von der Burg bis zur Moldau, ohne Hetze.',
  readTime: '11 Min.',
  date: 'April 2026',
  hero: 'vltava-bridges-hero.jpg',
  heroCap: 'Die Moldau und ihre Brücken — das Rückgrat jeder guten Prag-Route.',
  standfirst: 'Zwei Tage reichen für das Wesentliche — wenn man die Reihenfolge richtig wählt und früh aufsteht.',
  meta: [{
    k: 'Dauer',
    v: '2 Tage'
  }, {
    k: 'Strecke',
    v: '~7 km'
  }, {
    k: 'Beste Zeit',
    v: 'Mai–Okt'
  }, {
    k: 'Niveau',
    v: 'Aktiv'
  }],
  railFacts: {
    title: 'Auf einen Blick',
    items: [{
      k: 'Tag 1',
      v: 'Die Höhen'
    }, {
      k: 'Tag 2',
      v: 'Die Tiefe'
    }, {
      k: 'Start',
      v: 'Vor 9 Uhr'
    }, {
      k: 'Tickets',
      v: 'Vorab buchen'
    }]
  },
  blocks: [{
    t: 'p',
    first: true,
    html: 'Die häufigste Frage, die ich höre: „Wir haben nur ein Wochenende — was sollen wir sehen?“ Hier ist die Route, die ich Freunden gebe. Sie folgt nicht der Landkarte, sondern dem Licht und den Menschenmengen.'
  }, {
    t: 'h2',
    html: 'Tag eins — die <em>Höhen</em>'
  }, {
    t: 'p',
    html: 'Beginnen Sie oben, auf der Prager Burg, möglichst vor 9 Uhr. Von dort führt der Weg bergab durch die Kleinseite, über die Karlsbrücke (die am Morgen noch atmen kann) bis in die Altstadt. So gehen Sie mit dem Strom statt gegen ihn — und gegen das Licht.'
  }, {
    t: 'callout',
    label: 'Reihenfolge ist alles',
    html: '<p>Die meisten Besucher laufen die Strecke andersherum und stehen mittags im Gedränge auf der Brücke. Gehen Sie <strong>von oben nach unten</strong> und <strong>von Ost nach West am Morgen</strong> — die Sonne im Rücken, die Menge vor Ihnen.</p>'
  }, {
    t: 'map',
    title: 'Tag 1 · von der Burg zur Altstadt',
    route: true,
    list: true,
    cap: 'Bergab und ostwärts: rund 3,5 km, gut einen halben Tag mit Pausen.',
    points: [{
      coord: [50.0911, 14.4016],
      label: 'Prager Burg',
      note: '8:30 Uhr, vor dem Andrang. St.-Veits-Dom zuerst.'
    }, {
      coord: [50.0879, 14.4030],
      label: 'Kleinseitner Ring',
      note: 'St.-Niklas-Kirche, dann hinab Richtung Fluss.'
    }, {
      coord: [50.0863, 14.4067],
      label: 'Lennon-Mauer',
      note: 'Ein kurzer Abstecher auf der Kampa-Insel.'
    }, {
      coord: [50.0865, 14.4114],
      label: 'Karlsbrücke',
      note: 'Am Vormittag noch begehbar. Ostwärts laufen.'
    }, {
      coord: [50.0875, 14.4213],
      label: 'Altstädter Ring',
      note: 'Astronomische Uhr, Teynkirche, Mittagspause.'
    }]
  }, {
    t: 'h2',
    html: 'Tag zwei — die <em>Tiefe</em>'
  }, {
    t: 'p',
    html: 'Der zweite Tag gehört den Schichten unter der Oberfläche: das jüdische Viertel Josefov am Morgen (akkreditierte Führung empfohlen), das Pulver­tor und das Jugendstil-Repräsentationshaus, und am Nachmittag ein Aufstieg auf den Petřín für den Blick zurück über alles, was Sie gesehen haben.'
  }, {
    t: 'p',
    html: 'Wer noch Kraft hat, schließt mit einem Spaziergang nach Vyšehrad ab — der zweiten Burg der Stadt, fast ohne Touristen, mit dem Friedhof der tschechischen Dichter und Komponisten.'
  }, {
    t: 'quote',
    html: 'Zwei Tage sind genug, um sich zu verlieben. Sie sind nie genug, um zu gehen.',
    by: 'Zuzana'
  }, {
    t: 'ornament'
  }, {
    t: 'p',
    html: 'Diese Route lässt sich in jede Richtung dehnen oder stauchen. Schreiben Sie mir, wie viel Zeit Sie haben — und wie schnell Sie gehen.'
  }],
  related: ['prager-burg', 'aussichtspunkte', 'karlsbruecke-statuen']
}, {
  slug: 'prager-burg',
  category: 'Wahrzeichen',
  title: 'Die Prager Burg: ein <em>Rundgang</em>',
  titlePlain: 'Die Prager Burg: ein Rundgang',
  cardBlurb: 'Tausend Jahre auf einem Hügel — wie man den größten Burgkomplex der Welt richtig erläuft.',
  readTime: '10 Min.',
  date: 'März 2026',
  hero: 'st-vitus-night.png',
  heroCap: 'Der St.-Veits-Dom bei Nacht — das Herz der Burg.',
  standfirst: 'Der größte zusammenhängende Burgkomplex der Welt lässt sich nicht „abhaken“. Aber er lässt sich lesen.',
  meta: [{
    k: 'Areal',
    v: 'Größtes der Welt'
  }, {
    k: 'Dauer',
    v: '2–3 Std.'
  }, {
    k: 'Beste Zeit',
    v: 'Vor 10 Uhr'
  }, {
    k: 'Niveau',
    v: 'Etwas Steigung'
  }],
  railFacts: {
    title: 'Auf einen Blick',
    items: [{
      k: 'Gegründet',
      v: '9. Jahrhundert'
    }, {
      k: 'Dom',
      v: 'St. Veit'
    }, {
      k: 'Ticket',
      v: '2 Tage gültig'
    }, {
      k: 'Areal',
      v: 'Eintritt frei'
    }]
  },
  blocks: [{
    t: 'p',
    first: true,
    html: 'Die Prager Burg ist kein Gebäude, sondern eine kleine Stadt: Kirchen, Paläste, Gassen und Gärten, gewachsen über elf Jahrhunderte. Wer ohne Plan hineingeht, sieht alles und versteht nichts. Wer die Schichten kennt, liest tausend Jahre an einem Vormittag.'
  }, {
    t: 'h2',
    html: 'Früh kommen, oben <em>beginnen</em>'
  }, {
    t: 'p',
    html: 'Seien Sie zur Öffnung da. Der erste Burghof ist still, die Wachablösung noch ungestört. Von dort arbeiten wir uns durch die Höfe bis zum St.-Veits-Dom — und treten ein, bevor die Reisegruppen die Tore füllen.'
  }, {
    t: 'callout',
    label: 'Praktisches',
    html: '<p>Mehrere Rundgang-Tickets, gültig zwei Tage; der Zugang zum Areal selbst ist frei, die Innenräume sind kostenpflichtig.</p><ul><li><strong>Sicherheitskontrolle</strong> an den Eingängen — etwas Zeit einplanen.</li><li><strong>Vor 10 Uhr</strong> oder nach 15 Uhr ist es am ruhigsten.</li><li>Preise und Öffnungszeiten ändern sich saisonal — ich prüfe sie vor jeder Tour.</li></ul>'
  }, {
    t: 'map',
    title: 'Rundgang über das Burgareal',
    route: true,
    list: true,
    cap: 'Von Ost nach West, leicht bergab — etwa 1,5 km, zwei bis drei Stunden mit Innenräumen.',
    points: [{
      coord: [50.0894, 14.3984],
      label: 'Hradschiner Platz',
      note: 'Start am Haupttor mit der Wachablösung.'
    }, {
      coord: [50.0909, 14.4006],
      label: 'St.-Veits-Dom',
      note: 'Mucha-Fenster, Wenzelskapelle, das Grab des hl. Johannes Nepomuk.'
    }, {
      coord: [50.0908, 14.4022],
      label: 'Alter Königspalast',
      note: 'Der Vladislav-Saal und der Ort des Prager Fenstersturzes.'
    }, {
      coord: [50.0911, 14.4030],
      label: 'St.-Georgs-Basilika',
      note: 'Die älteste erhaltene Kirche der Burg, romanisch und schlicht.'
    }, {
      coord: [50.0920, 14.4045],
      label: 'Goldenes Gässchen',
      note: 'Winzige Häuschen, Alchemisten-Legenden, Kafkas Schreibstube (Nr. 22).'
    }]
  }, {
    t: 'h2',
    html: 'Das eine Fenster, das man <em>nicht</em> verpassen darf'
  }, {
    t: 'p',
    html: 'Im St.-Veits-Dom, links vom Eingang, leuchtet ein Glasfenster von Alfons Mucha. Es ist kein mittelalterliches Glas, sondern Jugendstil von 1931 — und im Nachmittagslicht beginnt es zu glühen. Die meisten laufen daran vorbei. Wir nicht.'
  }, {
    t: 'quote',
    html: 'Eine Burg ist kein Stein. Sie ist die Summe der Menschen, die durch sie hindurchgingen.',
    by: 'Zuzana'
  }, {
    t: 'ornament'
  }, {
    t: 'p',
    html: 'Die Burg lohnt eine eigene, ruhige Tour — gerade weil so viele sie im Eiltempo durchqueren. Lassen Sie uns die Zeit nehmen, die sie verdient.'
  }],
  related: ['48-stunden-prag', 'mala-strana', 'aussichtspunkte']
}, {
  slug: 'josefov',
  category: 'Geschichte',
  title: 'Josefov: das <em>jüdische</em> Viertel',
  titlePlain: 'Josefov: das jüdische Viertel',
  cardBlurb: 'Sechs Synagogen, ein alter Friedhof und tausend Jahre Geschichte — geführt mit Akkreditierung.',
  readTime: '12 Min.',
  date: 'Februar 2026',
  hero: 'josefov.jpg',
  heroCap: 'Die Klausen-Synagoge am Alten Jüdischen Friedhof.',
  standfirst: 'Das kleinste Viertel Prags trägt die schwerste Geschichte. Es will langsam gelesen werden.',
  meta: [{
    k: 'Stätten',
    v: '6'
  }, {
    k: 'Dauer',
    v: '2–3 Std.'
  }, {
    k: 'Geschlossen',
    v: 'Schabbat'
  }, {
    k: 'Niveau',
    v: 'Gemütlich'
  }],
  railFacts: {
    title: 'Auf einen Blick',
    items: [{
      k: 'Verwaltung',
      v: 'Jüd. Museum'
    }, {
      k: 'Ticket',
      v: 'Kombiticket'
    }, {
      k: 'Kippa',
      v: 'Am Eingang'
    }, {
      k: 'Fotos',
      v: 'Teils untersagt'
    }]
  },
  blocks: [{
    t: 'p',
    first: true,
    html: 'Josefov ist auf der Karte winzig — ein paar Gassen zwischen Altstädter Ring und Fluss. Doch kein anderer Teil Prags verlangt so viel Aufmerksamkeit. Hier liegen tausend Jahre jüdischen Lebens, jüdischer Gelehrsamkeit und jüdischen Leids dicht beieinander.'
  }, {
    t: 'p',
    html: 'Ich führe dieses Viertel mit der Akkreditierung des Jüdischen Museums in Prag. Das ist kein Formalismus — es bedeutet, dass ich die Räume betreten und ihre Geschichten mit der nötigen Sorgfalt erzählen darf.'
  }, {
    t: 'h2',
    html: 'Was das <em>Museum</em> umfasst'
  }, {
    t: 'p',
    html: 'Die meisten Stätten gehören zum Jüdischen Museum und teilen sich ein Kombiticket: die Pinkas-Synagoge mit den Namen der 80.000 böhmischen und mährischen Opfer der Schoa, der Alte Jüdische Friedhof mit seinen verschobenen Grabsteinen, die Klausen-, die Maisel- und die prächtige Spanische Synagoge.'
  }, {
    t: 'callout',
    label: 'Vor dem Besuch',
    html: '<ul><li>Die <strong>Alt-Neu-Synagoge</strong> wird separat verwaltet und hat eigene Zeiten.</li><li><strong>Freitagnachmittag und samstags</strong> (Schabbat) sind die Stätten geschlossen.</li><li>Männer erhalten am Eingang eine <strong>Kippa</strong>; um respektvolle Kleidung wird gebeten.</li><li>Fotografieren ist in mehreren Innenräumen nicht gestattet.</li></ul>'
  }, {
    t: 'map',
    title: 'Die Stationen von Josefov',
    route: true,
    list: true,
    cap: 'Ein kompakter Rundgang von etwa 1 km — aber planen Sie zwei bis drei Stunden ein.',
    points: [{
      coord: [50.0902, 14.4181],
      label: 'Alt-Neu-Synagoge',
      note: 'Europas älteste aktive Synagoge, um 1270. Heimat der Golem-Legende.'
    }, {
      coord: [50.0897, 14.4167],
      label: 'Pinkas-Synagoge',
      note: 'Die handgeschriebenen Namen der Schoa-Opfer. Der stillste Raum Prags.'
    }, {
      coord: [50.0888, 14.4170],
      label: 'Alter Jüdischer Friedhof',
      note: 'Bis zu zwölf Schichten Gräber, über 12.000 Steine.'
    }, {
      coord: [50.0905, 14.4196],
      label: 'Spanische Synagoge',
      note: 'Maurischer Prunk im Inneren — atemberaubend restauriert.'
    }]
  }, {
    t: 'quote',
    html: 'Hier spricht man nicht über Steine. Man spricht über Menschen, die einmal hier wohnten.',
    by: 'Zuzana'
  }, {
    t: 'h2',
    html: 'Der <em>Golem</em> und die Wahrheit dahinter'
  }, {
    t: 'p',
    html: 'Jeder kennt die Legende vom Golem, den Rabbi Löw aus Moldau-Lehm geformt haben soll. Ich erzähle sie gern — aber ich erzähle auch, warum eine verfolgte Gemeinde eine Geschichte über einen unbesiegbaren Beschützer brauchte. Legenden sind selten nur Legenden.'
  }, {
    t: 'ornament'
  }, {
    t: 'p',
    html: 'Josefov ist kein Ort zum Abhaken. Wenn Sie es mit mir besuchen, gehen wir langsam und sprechen leise. Manche Geschichten verlangen das.'
  }],
  related: ['48-stunden-prag', 'kafka', 'versteckte-hoefe'],
  note: 'Fotos des jüdischen Viertels sind Eigentum des Jüdischen Museums in Prag und sollten in Produktion entsprechend gekennzeichnet werden.'
}, {
  slug: 'versteckte-hoefe',
  category: 'Verstecktes Prag',
  title: 'Versteckte <em>Höfe</em> & Passagen',
  titlePlain: 'Versteckte Höfe und Passagen',
  cardBlurb: 'Sieben Innenhöfe und Durchgänge, die kein Reiseführer kennt — und wie Sie hineinkommen.',
  readTime: '8 Min.',
  date: 'Januar 2026',
  hero: 'hidden-gems.jpg',
  heroCap: 'Ein stiller Innenhof, wenige Schritte vom Trubel entfernt.',
  standfirst: 'Die Prager Altstadt hat ein zweites, verborgenes Erdgeschoss — wenn man weiß, durch welche Tür man geht.',
  meta: [{
    k: 'Strecke',
    v: '~2 km'
  }, {
    k: 'Dauer',
    v: '2 Std.'
  }, {
    k: 'Beste Zeit',
    v: 'Vormittag'
  }, {
    k: 'Niveau',
    v: 'Gemütlich'
  }],
  railFacts: {
    title: 'Auf einen Blick',
    items: [{
      k: 'Höfe',
      v: 'Tagsüber offen'
    }, {
      k: 'Wohnhöfe',
      v: 'Privat — leise'
    }, {
      k: 'Licht',
      v: 'Früh am besten'
    }, {
      k: 'Eintritt',
      v: 'Frei'
    }]
  },
  blocks: [{
    t: 'p',
    first: true,
    html: 'Prag ist eine Stadt der Durchgänge. Hinter unscheinbaren Fassaden öffnen sich Höfe, Glasdach-Passagen und Gärten, die kaum ein Tagesbesucher je sieht. Man muss nur den Mut haben, durch eine offene Tür zu gehen.'
  }, {
    t: 'h2',
    html: 'Die Kunst, eine <em>Tür</em> zu öffnen'
  }, {
    t: 'p',
    html: 'Viele dieser Höfe sind tagsüber öffentlich zugänglich, auch wenn nichts es ankündigt. Das Repräsentationshaus, die Klementinum-Höfe, die Passagen rund um den Wenzelsplatz — sie alle verbergen Ruheinseln zwei Schritte neben dem Strom.'
  }, {
    t: 'callout',
    label: 'Knigge für Höfe',
    html: '<ul><li>Sind die Tore offen, ist der Hof in der Regel <strong>tagsüber zugänglich</strong>.</li><li>Wohnhöfe sind privat — <strong>leise sein</strong>, nicht in Fenster fotografieren.</li><li>Die schönsten Lichtmomente sind <strong>am frühen Vormittag</strong>.</li></ul>'
  }, {
    t: 'map',
    title: 'Höfe & Passagen der Altstadt',
    route: true,
    list: true,
    cap: 'Ein loser Rundgang; die meisten Stationen liegen wenige Gehminuten auseinander.',
    points: [{
      coord: [50.0865, 14.4163],
      label: 'Klementinum',
      note: 'Barocke Höfe und die schönste Bibliothek der Stadt.'
    }, {
      coord: [50.0872, 14.4205],
      label: 'Passagen am Altstädter Ring',
      note: 'Glasüberdachte Durchgänge zwischen den Gassen.'
    }, {
      coord: [50.0879, 14.4283],
      label: 'Repräsentationshaus',
      note: 'Jugendstil-Innenhof und Café, oft übersehen.'
    }, {
      coord: [50.0820, 14.4255],
      label: 'Passagen am Wenzelsplatz',
      note: 'Lucerna-Passage mit dem auf dem Kopf hängenden Pferd.'
    }]
  }, {
    t: 'quote',
    html: 'Die schönsten Orte Prags haben keine Schilder. Sie haben nur offene Türen.',
    by: 'Zuzana'
  }, {
    t: 'p',
    html: 'Mein Favorit bleibt die Lucerna-Passage mit David Černýs Skulptur des heiligen Wenzel, der auf einem toten, kopfüber hängenden Pferd reitet — eine ironische Antwort auf das berühmte Reiterstandbild draußen auf dem Platz.'
  }, {
    t: 'ornament'
  }, {
    t: 'p',
    html: 'Auf meinen Touren durch das verborgene Prag verbringen wir mehr Zeit abseits der Hauptgassen als auf ihnen. Genau dort beginnt die Stadt zu flüstern.'
  }],
  related: ['kaffeehaeuser', 'mala-strana', 'jugendstil-kubismus']
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site/journal-content-1.js", error: String((e && e.message) || e) }); }

// ui_kits/website/site/journal-content-2.js
try { (() => {
/* Zuza Prague Tours — Journal content (2/3). Articles 6–10. */
window.JOURNAL = window.JOURNAL || [];
window.JOURNAL.push({
  slug: 'karlsbruecke-statuen',
  category: 'Wahrzeichen',
  title: 'Die <em>Karlsbrücke</em> und ihre Statuen',
  titlePlain: 'Die Karlsbrücke und ihre Statuen',
  cardBlurb: 'Dreißig Heilige, eine Legende und worauf man auf der berühmtesten Brücke Europas wirklich achten sollte.',
  readTime: '9 Min.',
  date: 'Mai 2026',
  hero: 'charles-bridge-statue.jpg',
  heroCap: 'Eine der dreißig barocken Statuen, die die Brücke säumen.',
  standfirst: 'Jeder überquert sie. Kaum jemand liest sie. Dabei erzählt jede der dreißig Statuen ihre eigene Geschichte.',
  meta: [{
    k: 'Länge',
    v: '516 m'
  }, {
    k: 'Erbaut ab',
    v: '1357'
  }, {
    k: 'Statuen',
    v: '30'
  }, {
    k: 'Beste Zeit',
    v: 'Vor 8 Uhr'
  }],
  railFacts: {
    title: 'Auf einen Blick',
    items: [{
      k: 'Auftraggeber',
      v: 'Karl IV.'
    }, {
      k: 'Stil der Statuen',
      v: 'Barock'
    }, {
      k: 'Eintritt',
      v: 'Frei'
    }, {
      k: 'Türme',
      v: 'Beidseitig besteigbar'
    }]
  },
  blocks: [{
    t: 'p',
    first: true,
    html: 'Karl IV. ließ den Grundstein 1357 legen — der Überlieferung nach am 9. Juli um 5:31 Uhr, einer Palindrom-Zahlenreihe (1357 9, 7 5 31), die der Brücke Glück bringen sollte. Sie steht bis heute. Das nenne ich gute Astrologie.'
  }, {
    t: 'p',
    html: 'Die dreißig Statuen kamen erst Jahrhunderte später, im Barock. Die meisten, die Sie heute sehen, sind Kopien — die Originale stehen geschützt im Lapidarium. Doch ihre Geschichten sind echt geblieben.'
  }, {
    t: 'h2',
    html: 'Die Statue, die jeder <em>berührt</em>'
  }, {
    t: 'p',
    html: 'Am Geländer, etwa in der Mitte, glänzt eine Bronzetafel am Sockel des heiligen Johannes Nepomuk. Die Legende sagt, er wurde von dieser Stelle in die Moldau gestürzt. Wer die Tafel berührt, kehrt nach Prag zurück — heißt es. Ich verrate Ihnen, welche Stelle die echte ist und welche der Tourismus erfunden hat.'
  }, {
    t: 'callout',
    label: 'Wann Sie kommen sollten',
    html: '<p>Die Brücke ist nie geschlossen — und genau deshalb sollten Sie die Tageszeit wählen:</p>',
    list: ['<strong>Vor 8 Uhr:</strong> fast leer, weiches Licht, Fotos ohne Menschenmengen.', '<strong>Mittags:</strong> dichtes Gedränge — meine Touren meiden diese Stunde.', '<strong>Abenddämmerung:</strong> die Laternen gehen an, die Burg leuchtet auf.']
  }, {
    t: 'map',
    title: 'Was man auf der Brücke nicht verpassen darf',
    route: true,
    list: true,
    cap: 'Von Ost nach West, gegen das Morgenlicht — gut 500 Meter, in Ruhe eine halbe Stunde.',
    points: [{
      coord: [50.0863, 14.4137],
      label: 'Altstädter Brückenturm',
      note: 'Besteigbar — der klassische Blick über die Brücke zur Burg.'
    }, {
      coord: [50.0869, 14.4123],
      label: 'Kruzifix mit hebräischer Inschrift',
      note: 'Eine schmerzhafte, wichtige Geschichte, die ich vor Ort erzähle.'
    }, {
      coord: [50.0865, 14.4112],
      label: 'Hl. Johannes Nepomuk',
      note: 'Die berührte Bronzetafel. Hier trennen wir Legende von Wahrheit.'
    }, {
      coord: [50.0860, 14.4101],
      label: 'Ritter Bruncvík',
      note: 'Das Schwert, das angeblich in der Brücke verborgen liegt.'
    }, {
      coord: [50.0876, 14.4090],
      label: 'Kleinseitner Brückentürme',
      note: 'Das Tor zur Kleinseite — und der Weg hinauf zur Burg.'
    }]
  }, {
    t: 'quote',
    html: 'Eine Brücke ist nie nur ein Weg über das Wasser. Sie ist der Ort, an dem eine Stadt sich selbst begegnet.',
    by: 'Zuzana'
  }, {
    t: 'ornament'
  }, {
    t: 'p',
    html: 'Auf meiner Tour gehen wir die Brücke früh und langsam — bevor sie der Stadt gehört, gehört sie noch uns.'
  }],
  related: ['prager-burg', 'mala-strana', '48-stunden-prag']
}, {
  slug: 'kaffeehaeuser',
  category: 'Kultur',
  title: 'Prags <em>Kaffeehäuser</em>',
  titlePlain: 'Prags Kaffeehäuser',
  cardBlurb: 'Wo Dichter, Revolutionäre und Studenten saßen — und wo der Kaffee heute noch nach Geschichte schmeckt.',
  readTime: '8 Min.',
  date: 'April 2026',
  hero: 'kafka.jpg',
  heroCap: 'Marmortische und Spiegel — das Kaffeehaus als zweites Wohnzimmer.',
  standfirst: 'Das Wiener Kaffeehaus hat einen kleineren, klügeren Bruder in Prag. Hier wurde Literatur gemacht — und Geschichte.',
  meta: [{
    k: 'Tradition seit',
    v: '19. Jh.'
  }, {
    k: 'Ältestes',
    v: 'Slavia, 1884'
  }, {
    k: 'Niveau',
    v: 'Gemütlich'
  }, {
    k: 'Beste Zeit',
    v: 'Vormittag'
  }],
  railFacts: {
    title: 'Gut zu wissen',
    items: [{
      k: 'Trinkgeld',
      v: '~10 %'
    }, {
      k: 'Spezialität',
      v: 'Větrník, Medovník'
    }, {
      k: 'Bezahlen',
      v: 'Karte üblich'
    }, {
      k: 'Reservierung',
      v: 'Abends ratsam'
    }]
  },
  blocks: [{
    t: 'p',
    first: true,
    html: 'Es gab eine Zeit, in der man in Prag keine Wohnung brauchte, sondern ein Stammcafé. Dort wurde gelesen, gestritten, geliebt und konspiriert. Der Kaffee war Nebensache; der Tisch war alles.'
  }, {
    t: 'h2',
    html: 'Das <em>literarische</em> Café'
  }, {
    t: 'p',
    html: 'Im Café Slavia, gegenüber dem Nationaltheater, saß Rilke; später traf sich hier die Dissidentenszene um Václav Havel. Die Fensterplätze blicken auf die Moldau und die Burg — bestellen Sie einen Kaffee und bleiben Sie eine Stunde. Niemand wird Sie drängen.'
  }, {
    t: 'p',
    html: 'Das Café Louvre, eine Treppe hoch an der Národní, zählte Einstein und Kafka zu seinen Gästen. Bis heute ist es hell, hoch und herrlich altmodisch — mit einem eigenen Billardsaal.'
  }, {
    t: 'map',
    title: 'Eine Kaffeehaus-Runde',
    route: false,
    list: true,
    cap: 'Vier Institutionen, über die Altstadt verteilt — jede einen Halt wert.',
    points: [{
      coord: [50.0812, 14.4131],
      label: 'Café Slavia',
      note: 'Seit 1884. Moldaublick, Theaternähe, Dissidenten-Geschichte.'
    }, {
      coord: [50.0817, 14.4170],
      label: 'Café Louvre',
      note: 'Seit 1902. Einstein und Kafka diskutierten hier.'
    }, {
      coord: [50.0873, 14.4258],
      label: 'Grand Café Orient',
      note: 'Das einzige kubistische Café der Welt — im Haus zur Schwarzen Madonna.'
    }, {
      coord: [50.0895, 14.4310],
      label: 'Café Imperial',
      note: 'Art-déco-Kacheln vom Boden bis zur Decke.'
    }]
  }, {
    t: 'callout',
    label: 'Bestellen wie ein Einheimischer',
    html: '<p>Zum Kaffee gehört Gebäck. Bitten Sie um einen <strong>Větrník</strong> (Brandteig mit Karamell) oder ein Stück <strong>Medovník</strong> (Honigkuchen). Und sagen Sie „dobrý den“ beim Eintreten — es öffnet Türen.</p>'
  }, {
    t: 'quote',
    html: 'Im Kaffeehaus ist man allein, aber nicht einsam. Das ist seine ganze Kunst.',
    by: 'Zuzana'
  }, {
    t: 'ornament'
  }, {
    t: 'p',
    html: 'Ich baue gern eine Kaffeepause in jede Tour ein — nicht als Unterbrechung, sondern als Teil der Geschichte. Hier ruht man, wo Prag dachte.'
  }],
  related: ['kafka', 'versteckte-hoefe', 'jugendstil-kubismus']
}, {
  slug: 'kafka',
  category: 'Literatur',
  title: 'Auf <em>Kafkas</em> Spuren',
  titlePlain: 'Auf Kafkas Spuren',
  cardBlurb: 'Ein Spaziergang durch das deutsche Prag — von der Geburtsstätte bis zur Schreibstube in der Burg.',
  readTime: '10 Min.',
  date: 'März 2026',
  hero: 'kafka.jpg',
  heroCap: 'Das Prag, in dem Kafka lebte, schrieb und nie wirklich ankam.',
  standfirst: '„Prag lässt nicht los. Dieses Mütterchen hat Krallen.“ Kein Schriftsteller war so mit dieser Stadt verwoben wie er.',
  meta: [{
    k: 'Strecke',
    v: '~3 km'
  }, {
    k: 'Dauer',
    v: '2,5 Std.'
  }, {
    k: 'Sprache',
    v: 'Deutsch'
  }, {
    k: 'Niveau',
    v: 'Gemütlich'
  }],
  railFacts: {
    title: 'Auf einen Blick',
    items: [{
      k: 'Lebte',
      v: '1883–1924'
    }, {
      k: 'Sprache',
      v: 'Deutsch'
    }, {
      k: 'Beruf',
      v: 'Versicherungsjurist'
    }, {
      k: 'Grab',
      v: 'Neuer Jüd. Friedhof'
    }]
  },
  blocks: [{
    t: 'p',
    first: true,
    html: 'Franz Kafka verbrachte fast sein ganzes Leben in einem Radius von wenigen hundert Metern um den Altstädter Ring. Er schrieb auf Deutsch in einer mehrheitlich tschechischen Stadt, war Jude in einem katholischen Kaiserreich — ein Mensch zwischen allen Welten. Genau das macht seine Spur durch Prag so dicht.'
  }, {
    t: 'h2',
    html: 'Geboren am <em>Rand</em> des Rings'
  }, {
    t: 'p',
    html: 'Sein Geburtshaus stand am heutigen Franz-Kafka-Platz, direkt neben der Kirche St. Niklas. Von hier sind es nur Minuten zum Gymnasium, zur Universität und zur Versicherung, in der er tagsüber arbeitete — das Schreiben blieb der Nacht vorbehalten.'
  }, {
    t: 'callout',
    label: 'Wussten Sie schon?',
    html: '<p>Kafka mietete sich zeitweise ein winziges Haus im <strong>Goldenen Gässchen Nr. 22</strong> auf der Burg, um ungestört zu schreiben. Seine Schwester Ottla hatte es angemietet. Heute ist es ein Buchladen.</p>'
  }, {
    t: 'map',
    title: 'Kafkas Prag — ein Rundgang',
    route: true,
    list: true,
    cap: 'Die zentralen Stationen, gut zu Fuß. Das Grab liegt weiter östlich in Žižkov.',
    points: [{
      coord: [50.0884, 14.4197],
      label: 'Geburtshaus',
      note: 'Am Franz-Kafka-Platz, neben St. Niklas. Eine Büste markiert die Stelle.'
    }, {
      coord: [50.0870, 14.4205],
      label: 'Altstädter Ring',
      note: 'Sein Zuhause, seine Bühne — und sein Käfig, wie er selbst schrieb.'
    }, {
      coord: [50.0833, 14.4205],
      label: 'Drehender Kafka-Kopf',
      note: 'David Černýs kinetische Skulptur am Quadrio — modernes Wahrzeichen.'
    }, {
      coord: [50.0920, 14.4045],
      label: 'Goldenes Gässchen Nr. 22',
      note: 'Seine Schreibstube auf der Burg, heute ein Buchladen.'
    }]
  }, {
    t: 'quote',
    html: 'Ein Buch muss die Axt sein für das gefrorene Meer in uns. Kafka schrieb das mit Mitte zwanzig — hier, in dieser Stadt.',
    by: 'Zuzana'
  }, {
    t: 'h2',
    html: 'Das deutsche <em>Prag</em>'
  }, {
    t: 'p',
    html: 'Kafka gehörte zur deutschsprachigen jüdischen Minderheit — derselben Welt wie Max Brod, Franz Werfel und Egon Erwin Kisch. Auf Deutsch erzähle ich diese Geschichte besonders gern, weil sie von Sprache, Heimat und Fremdsein zugleich handelt.'
  }, {
    t: 'ornament'
  }, {
    t: 'p',
    html: 'Kafkas Grab liegt auf dem Neuen Jüdischen Friedhof in Žižkov, gut mit der Metro erreichbar. Wer mag, schließt die Tour dort ab — ein stiller, würdiger Schlusspunkt.'
  }],
  related: ['josefov', 'kaffeehaeuser', 'jugendstil-kubismus']
}, {
  slug: 'mala-strana',
  category: 'Viertel',
  title: 'Die <em>Kleinseite</em>: Gassen & Gärten',
  titlePlain: 'Die Kleinseite: Gassen und Gärten',
  cardBlurb: 'Barocke Paläste, versteckte Gärten und die stillste Seite der Moldau — unter der Burg.',
  readTime: '9 Min.',
  date: 'Februar 2026',
  hero: 'night-prague.jpg',
  heroCap: 'Die Kleinseite bei Nacht — barocke Kuppeln und Laternenlicht.',
  standfirst: 'Zwischen Burg und Fluss liegt das barocke Herz Prags — ein Viertel der Paläste, Gärten und schmalen Geheimnisse.',
  meta: [{
    k: 'Epoche',
    v: 'Barock'
  }, {
    k: 'Strecke',
    v: '~2,5 km'
  }, {
    k: 'Dauer',
    v: '2,75 Std.'
  }, {
    k: 'Beste Zeit',
    v: 'Spätnachmittag'
  }],
  railFacts: {
    title: 'Auf einen Blick',
    items: [{
      k: 'Tschechisch',
      v: 'Malá Strana'
    }, {
      k: 'Gegründet',
      v: '1257'
    }, {
      k: 'Wahrzeichen',
      v: 'St.-Niklas-Kirche'
    }, {
      k: 'Gärten',
      v: 'Mai–Okt geöffnet'
    }]
  },
  blocks: [{
    t: 'p',
    first: true,
    html: 'Die meisten Besucher eilen über die Kleinseite hinweg — von der Karlsbrücke schnurstracks hinauf zur Burg. Dabei ist gerade dieses Viertel zum Verweilen gemacht: barocke Paläste, in denen heute Botschaften residieren, und Gärten, die sich hinter unscheinbaren Toren verbergen.'
  }, {
    t: 'h2',
    html: 'Die <em>Kuppel</em>, die alles überragt'
  }, {
    t: 'p',
    html: 'St. Niklas auf dem Kleinseitner Ring ist das vollendetste Barockgebäude der Stadt. Die Kuppel, die Fresken, die Akustik — Mozart spielte auf dieser Orgel. Treten Sie ein, auch wenn Sie keine Kirchen mögen. Diese ist anders.'
  }, {
    t: 'callout',
    label: 'Versteckte Gärten',
    html: '<p>Drei Gärten lohnen den Umweg — meist von Mai bis Oktober geöffnet:</p>',
    list: ['<strong>Wallenstein-Garten:</strong> frei zugänglich, mit Pfauen und einer Tropfsteinwand.', '<strong>Vrtba-Garten:</strong> barocke Terrassen mit dem schönsten Blick aufs Viertel.', '<strong>Die Palastgärten unter der Burg:</strong> eine grüne Treppe zum Hradschin.']
  }, {
    t: 'map',
    title: 'Ein Bummel über die Kleinseite',
    route: true,
    list: true,
    cap: 'Vom Brückenturm hinauf, mit Abstechern in die Gärten — rund 2,5 km.',
    points: [{
      coord: [50.0879, 14.4032],
      label: 'Kleinseitner Ring & St. Niklas',
      note: 'Das barocke Zentrum des Viertels.'
    }, {
      coord: [50.0863, 14.4067],
      label: 'Lennon-Mauer',
      note: 'Seit 1980 ein wandelbares Mosaik aus Freiheit und Farbe.'
    }, {
      coord: [50.0855, 14.4080],
      label: 'Kampa-Insel',
      note: '„Das Prager Venedig“ am Mühlkanal Čertovka.'
    }, {
      coord: [50.0897, 14.4060],
      label: 'Wallenstein-Garten',
      note: 'Frei zugänglich, mit Pfauen und barocker Loggia.'
    }]
  }, {
    t: 'quote',
    html: 'Die Kleinseite belohnt die Langsamen. Wer rennt, sieht nur Mauern; wer schlendert, findet Türen.',
    by: 'Zuzana'
  }, {
    t: 'ornament'
  }, {
    t: 'p',
    html: 'Am schönsten ist das Viertel im Spätnachmittagslicht, wenn die Tagesgäste schon zur Burg hinauf sind. Dann gehört die Kleinseite wieder sich selbst.'
  }],
  related: ['prager-burg', 'karlsbruecke-statuen', 'versteckte-hoefe']
}, {
  slug: 'aussichtspunkte',
  category: 'Reiseführer',
  title: 'Die schönsten <em>Aussichten</em>',
  titlePlain: 'Die schönsten Aussichtspunkte',
  cardBlurb: 'Sechs Orte, an denen sich die „Stadt der hundert Türme“ von ihrer besten Seite zeigt.',
  readTime: '7 Min.',
  date: 'Januar 2026',
  hero: 'vltava-bridges-hero.jpg',
  heroCap: 'Die hundert Türme Prags, von oben gelesen.',
  standfirst: 'Prag versteht man erst von oben. Hier sind die Punkte, an denen sich die Stadt selbst erklärt.',
  meta: [{
    k: 'Aussichtspunkte',
    v: '6'
  }, {
    k: 'Höchster',
    v: 'Petřín, 327 m'
  }, {
    k: 'Beste Zeit',
    v: 'Goldene Stunde'
  }, {
    k: 'Niveau',
    v: 'Etwas Steigung'
  }],
  railFacts: {
    title: 'Gut zu wissen',
    items: [{
      k: 'Petřín-Bahn',
      v: 'Mit Tramticket'
    }, {
      k: 'Letná',
      v: 'Frei, immer offen'
    }, {
      k: 'Türme',
      v: 'Eintritt ca. 150 CZK'
    }, {
      k: 'Tipp',
      v: 'Sonnenuntergang'
    }]
  },
  blocks: [{
    t: 'p',
    first: true,
    html: 'Man nennt Prag die „Stadt der hundert Türme“ — tatsächlich sind es weit mehr. Doch ihren Rhythmus erkennt man erst aus der Höhe: wie die Moldau die Stadt teilt, wie die Burg über allem thront, wie rote Dächer bis zum Horizont fließen.'
  }, {
    t: 'h2',
    html: 'Der <em>klassische</em> Blick'
  }, {
    t: 'p',
    html: 'Vom Petřín-Hügel — bequem mit der Standseilbahn erreichbar — sehen Sie die ganze Stadt auf einen Blick. Der kleine Aussichtsturm, ein Echo des Eiffelturms von 1891, setzt noch einen drauf. Kommen Sie zur goldenen Stunde.'
  }, {
    t: 'callout',
    label: 'Mein Geheimtipp',
    html: '<p>Der <strong>Letná-Park</strong> mit dem riesigen Metronom (wo einst Stalins Denkmal stand) bietet den schönsten Blick auf die Brücken der Moldau — und einen Biergarten gleich daneben. Frei zugänglich, Tag und Nacht.</p>'
  }, {
    t: 'map',
    title: 'Sechs Aussichtspunkte',
    route: false,
    list: true,
    cap: 'Über die Stadt verteilt — keine Route, sondern eine Sammlung. Tippen Sie sich durch.',
    points: [{
      coord: [50.0835, 14.3954],
      label: 'Petřín-Aussichtsturm',
      note: 'Der Rundumblick. Mit der Standseilbahn erreichbar.'
    }, {
      coord: [50.0955, 14.4170],
      label: 'Letná & Metronom',
      note: 'Der beste Brückenblick. Biergarten inklusive.'
    }, {
      coord: [50.0863, 14.4137],
      label: 'Altstädter Brückenturm',
      note: 'Brückenhöhe, direkt über dem Trubel.'
    }, {
      coord: [50.0640, 14.4178],
      label: 'Vyšehrad',
      note: 'Die zweite Burg, ruhig und weit, mit Blick flussabwärts.'
    }, {
      coord: [50.0786, 14.4399],
      label: 'Riegrovy sady',
      note: 'Wo die Einheimischen mit Bier den Sonnenuntergang feiern.'
    }, {
      coord: [50.0905, 14.3995],
      label: 'Hradschiner Platz',
      note: 'Vor der Burg, frei zugänglich — der Postkartenblick.'
    }]
  }, {
    t: 'quote',
    html: 'Erst von oben versteht man, warum diese Stadt jeden Eroberer verführt und keinen behalten hat.',
    by: 'Zuzana'
  }, {
    t: 'ornament'
  }, {
    t: 'p',
    html: 'Auf Wunsch lege ich meine Touren so, dass wir zur richtigen Stunde am richtigen Aussichtspunkt stehen. Timing ist in Prag alles.'
  }],
  related: ['48-stunden-prag', 'beste-reisezeit', 'mala-strana']
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site/journal-content-2.js", error: String((e && e.message) || e) }); }

// ui_kits/website/site/journal-content-3.js
try { (() => {
/* Zuza Prague Tours — Journal content (3/3). Articles 11–15. */
window.JOURNAL = window.JOURNAL || [];
window.JOURNAL.push({
  slug: 'prag-mit-kindern',
  category: 'Familien',
  title: 'Prag mit <em>Kindern</em>',
  titlePlain: 'Prag mit Kindern',
  cardBlurb: 'Ein Tag voller Entdeckungen — Spiegellabyrinth, Standseilbahn, Inseln und Legenden, die Kinder fesseln.',
  readTime: '8 Min.',
  date: 'Juni 2026',
  hero: 'guest-tourguide.jpg',
  heroCap: 'Prag wird zum Abenteuer, wenn man es als Geschichte erzählt.',
  standfirst: 'Kinder brauchen keine Jahreszahlen — sie brauchen Drachen, Ritter und Geheimgänge. Davon hat Prag reichlich.',
  meta: [{
    k: 'Geeignet',
    v: 'Ab ca. 4 J.'
  }, {
    k: 'Dauer',
    v: 'Halber Tag'
  }, {
    k: 'Strecke',
    v: '~2 km + Bahn'
  }, {
    k: 'Niveau',
    v: 'Entspannt'
  }],
  railFacts: {
    title: 'Auf einen Blick',
    items: [{
      k: 'Standseilbahn',
      v: 'Mit Tramticket'
    }, {
      k: 'Spiegellabyrinth',
      v: 'Ca. 90 CZK'
    }, {
      k: 'Zoo Troja',
      v: 'Eigener Halbtag'
    }, {
      k: 'Pausen',
      v: 'Reichlich Eis'
    }]
  },
  blocks: [{
    t: 'p',
    first: true,
    html: 'Ich habe Generationen von Kindern durch Prag geführt, und eines habe ich gelernt: Eine Tour mit Kindern erzählt dieselbe Stadt — nur durch andere Augen. Die Astronomische Uhr ist kein technisches Wunder, sondern ein Theater aus Figuren. Die Burg ist kein Machtzentrum, sondern ein Drachenversteck.'
  }, {
    t: 'h2',
    html: 'Oben anfangen — mit der <em>Bahn</em>'
  }, {
    t: 'p',
    html: 'Die Standseilbahn auf den Petřín ist schon das erste Abenteuer. Oben warten ein begehbarer Aussichtsturm (299 Stufen — eine Mutprobe!) und ein Spiegellabyrinth, das garantiert für Gelächter sorgt. Von hier geht es bergab, mit Pausen für Eis.'
  }, {
    t: 'callout',
    label: 'Mit Kindern unterwegs',
    html: '<p>Ein paar Dinge, die den Tag retten:</p>',
    list: ['<strong>Tempo drosseln:</strong> ein Vormittag, drei Höhepunkte — nicht mehr.', '<strong>Legenden statt Daten:</strong> Golem, Drachen und der Wassermann der Moldau wirken Wunder.', '<strong>Der Zoo Troja</strong> verdient einen eigenen halben Tag — er zählt zu den schönsten Europas.']
  }, {
    t: 'map',
    title: 'Ein kindgerechter Tag',
    route: false,
    list: true,
    cap: 'Locker geplant, mit viel Luft für Pausen. Der Zoo liegt nördlich und lohnt einen eigenen Ausflug.',
    points: [{
      coord: [50.0848, 14.3960],
      label: 'Spiegellabyrinth Petřín',
      note: 'Verzerrspiegel und ein Mini-Schlachtgemälde — großer Spaß.'
    }, {
      coord: [50.0835, 14.3954],
      label: 'Aussichtsturm Petřín',
      note: '299 Stufen oder Aufzug — der „kleine Eiffelturm“.'
    }, {
      coord: [50.0855, 14.4080],
      label: 'Kampa-Insel',
      note: 'Wiese zum Toben, Krabben-Skulpturen, Blick aufs Wasser.'
    }, {
      coord: [50.1015, 14.4340],
      label: 'Technisches Nationalmuseum',
      note: 'Flugzeuge, Lokomotiven, Autos zum Staunen — bei Regen ideal.'
    }]
  }, {
    t: 'quote',
    html: 'Erzähl einem Kind von einem Drachen, und es wird sich an die Burg ein Leben lang erinnern.',
    by: 'Zuzana'
  }, {
    t: 'ornament'
  }, {
    t: 'p',
    html: 'Ich passe Tempo, Länge und Geschichten dem Alter Ihrer Kinder an. Sagen Sie mir, wie alt sie sind — den Rest übernehme ich.'
  }],
  related: ['aussichtspunkte', 'prager-burg', '48-stunden-prag']
}, {
  slug: 'kutna-hora',
  category: 'Tagesausflug',
  title: 'Tagesausflug nach <em>Kutná Hora</em>',
  titlePlain: 'Tagesausflug nach Kutná Hora',
  cardBlurb: 'Eine Stunde von Prag: das berühmte Knochenhaus und eine der schönsten Kathedralen Böhmens.',
  readTime: '9 Min.',
  date: 'Mai 2026',
  hero: 'boat-vltava.jpg',
  heroCap: 'Hinaus aus Prag — nach Böhmen, ins mittelalterliche Silberland.',
  standfirst: 'Im Mittelalter machte Silber Kutná Hora fast so reich wie Prag. Heute ist es der lohnendste Tagesausflug der Stadt.',
  meta: [{
    k: 'Entfernung',
    v: '~70 km'
  }, {
    k: 'Anfahrt',
    v: 'Zug, ~55 Min.'
  }, {
    k: 'Dauer',
    v: 'Ganzer Tag'
  }, {
    k: 'Beste Zeit',
    v: 'Mai–Sept'
  }],
  railFacts: {
    title: 'Anreise & Praktisches',
    items: [{
      k: 'Ab',
      v: 'Praha hl. n.'
    }, {
      k: 'Umsteigen',
      v: 'Kutná Hora hl. n.'
    }, {
      k: 'Ossarium',
      v: 'Sedlec'
    }, {
      k: 'UNESCO',
      v: 'Seit 1995'
    }]
  },
  blocks: [{
    t: 'p',
    first: true,
    html: 'Eine knappe Stunde mit dem Zug, und Sie stehen in einer Stadt, die einst Königen das Silber für ihre Münzen lieferte. Kutná Hora ist UNESCO-Welterbe — und ein perfekter Kontrast zur Großstadt: mittelalterliche Gassen, eine Kathedrale wie aus Spitze, und ein Ort, der niemanden kalt lässt.'
  }, {
    t: 'h2',
    html: 'Das <em>Knochenhaus</em> von Sedlec'
  }, {
    t: 'p',
    html: 'Die Beinhaus-Kapelle in Sedlec ist mit den Gebeinen von etwa 40.000 Menschen geschmückt — ein Kronleuchter aus allen Knochen des menschlichen Körpers, Girlanden aus Schädeln. Es klingt makaber, ist aber zutiefst andächtig: ein mittelalterliches Nachdenken über die Gleichheit im Tod.'
  }, {
    t: 'callout',
    label: 'So planen Sie den Tag',
    html: '<p>Die Anreise ist einfacher, als sie klingt:</p>',
    list: ['<strong>Zug</strong> ab Prag Hauptbahnhof bis Kutná Hora hl. n. (~55 Min.).', 'Vom Bahnhof ein <strong>Lokalzug oder kurzer Fußweg</strong> nach Sedlec (Ossarium).', 'Dann <strong>Bus oder Spaziergang</strong> ins historische Zentrum zur St.-Barbara-Kathedrale.', 'Ein <strong>Kombiticket</strong> deckt mehrere Stätten ab.']
  }, {
    t: 'map',
    title: 'Die Stationen in Kutná Hora',
    route: true,
    list: true,
    cap: 'Vom Ossarium in Sedlec ins Zentrum — Bus oder ein längerer Spaziergang verbinden beide.',
    points: [{
      coord: [49.9607, 15.2885],
      label: 'Beinhaus Sedlec',
      note: 'Die berühmte Knochen-Kapelle. Früh kommen, sie ist klein.'
    }, {
      coord: [49.9618, 15.2876],
      label: 'Kathedrale Mariä Himmelfahrt',
      note: 'Sedlec — gotisch-barock, frisch restauriert, gleich nebenan.'
    }, {
      coord: [49.9484, 15.2682],
      label: 'Welscher Hof',
      note: 'Die mittelalterliche Münzprägestätte im Zentrum.'
    }, {
      coord: [49.9447, 15.2628],
      label: 'St.-Barbara-Kathedrale',
      note: 'Das Meisterwerk — drei zeltartige Türme, dem Bergbau geweiht.'
    }]
  }, {
    t: 'quote',
    html: 'Kutná Hora zeigt, was Prag hätte sein können — und macht die Rückkehr in die Hauptstadt umso schöner.',
    by: 'Zuzana'
  }, {
    t: 'ornament'
  }, {
    t: 'p',
    html: 'Ich begleite Sie gern für den ganzen Tag — von der Zugfahrt bis zum letzten Turm. So wird aus einem Ausflug eine Geschichte mit rotem Faden.'
  }],
  related: ['beste-reisezeit', '48-stunden-prag', 'prager-burg']
}, {
  slug: 'weihnachtsmaerkte',
  category: 'Saison',
  title: 'Prager <em>Weihnachtsmärkte</em>',
  titlePlain: 'Prager Weihnachtsmärkte',
  cardBlurb: 'Glühwein, Trdelník und Lichterglanz — ein Winterführer durch die schönsten Märkte der Stadt.',
  readTime: '7 Min.',
  date: 'November 2025',
  hero: 'night-prague.jpg',
  heroCap: 'Der Altstädter Ring im Advent — Prags hellste Wochen.',
  standfirst: 'Im Advent wird Prag zur Bühne. Hier sind die Märkte, die sich lohnen — und einer, den nur Einheimische kennen.',
  meta: [{
    k: 'Saison',
    v: 'Ende Nov–6. Jan'
  }, {
    k: 'Märkte',
    v: '5 große'
  }, {
    k: 'Beste Zeit',
    v: 'Werktags abends'
  }, {
    k: 'Niveau',
    v: 'Gemütlich'
  }],
  railFacts: {
    title: 'Gut zu wissen',
    items: [{
      k: 'Glühwein',
      v: 'Svařák'
    }, {
      k: 'Spezialität',
      v: 'Trdelník, Klobása'
    }, {
      k: 'Bezahlen',
      v: 'Bargeld & Karte'
    }, {
      k: 'Wärmstens',
      v: 'Handschuhe!'
    }]
  },
  blocks: [{
    t: 'p',
    first: true,
    html: 'Von Ende November bis zum Dreikönigstag verwandeln Lichterketten, Tannenduft und der Dampf über den Glühweinkesseln die Stadt. Die großen Märkte sind ein Fest — aber das Geheimnis liegt darin, zu wissen, wann man wohin geht.'
  }, {
    t: 'h2',
    html: 'Der <em>große</em> und der <em>schöne</em>'
  }, {
    t: 'p',
    html: 'Der Markt auf dem Altstädter Ring ist der größte und festlichste, mit einem riesigen Baum und der Kulisse der Teynkirche. Der Markt auf dem Wenzelsplatz ist praktischer und nahe den Geschäften. Doch mein Favorit liegt höher oben.'
  }, {
    t: 'callout',
    label: 'Mein Lieblingsmarkt',
    html: '<p>Der kleine Markt <strong>auf dem Burgareal</strong> (St.-Georgs-Platz) ist der stimmungsvollste: weniger Gedränge, Blick über die Dächer und im Dunkeln festlich beleuchtet. Verbinden Sie ihn mit einer späten Burgtour.</p>'
  }, {
    t: 'map',
    title: 'Die Weihnachtsmärkte der Stadt',
    route: false,
    list: true,
    cap: 'Fünf Märkte, alle gut zu Fuß oder mit der Tram verbunden.',
    points: [{
      coord: [50.0875, 14.4213],
      label: 'Altstädter Ring',
      note: 'Der große, festliche — Baum, Bühne, Teynkirche.'
    }, {
      coord: [50.0820, 14.4255],
      label: 'Wenzelsplatz',
      note: 'Praktisch, zentral, nahe den Geschäften.'
    }, {
      coord: [50.0888, 14.4283],
      label: 'Platz der Republik',
      note: 'Vor dem Repräsentationshaus, etwas ruhiger.'
    }, {
      coord: [50.0905, 14.4030],
      label: 'Prager Burg',
      note: 'Mein Favorit: klein, hoch gelegen, am stimmungsvollsten.'
    }, {
      coord: [50.0753, 14.4378],
      label: 'Náměstí Míru',
      note: 'Der Markt der Einheimischen in Vinohrady.'
    }]
  }, {
    t: 'quote',
    html: 'Trinken Sie den ersten Glühwein nicht auf dem größten Platz. Trinken Sie ihn dort, wo die Prager ihn trinken.',
    by: 'Zuzana'
  }, {
    t: 'ornament'
  }, {
    t: 'p',
    html: 'Eine Adventstour bei Einbruch der Dunkelheit ist etwas Besonderes — die Märkte, die Lichter, die Geschichten. Schreiben Sie mir früh; der Dezember ist schnell ausgebucht.'
  }],
  related: ['beste-reisezeit', 'aussichtspunkte', 'kaffeehaeuser']
}, {
  slug: 'jugendstil-kubismus',
  category: 'Architektur',
  title: 'Jugendstil & <em>Kubismus</em>',
  titlePlain: 'Jugendstil und Kubismus',
  cardBlurb: 'Ein Architektur-Spaziergang durch Prags kühnstes Jahrhundert — von Mucha bis zur kubistischen Fassade.',
  readTime: '10 Min.',
  date: 'April 2026',
  hero: 'autumn-prague.jpg',
  heroCap: 'Prag trägt sein 20. Jahrhundert offen zur Schau — wenn man hinsieht.',
  standfirst: 'Prag besitzt etwas, das keine andere Stadt hat: kubistische Architektur. Dazu Jugendstil in seiner reinsten Form.',
  meta: [{
    k: 'Epoche',
    v: '1900–1925'
  }, {
    k: 'Strecke',
    v: '~3 km'
  }, {
    k: 'Dauer',
    v: '2,5 Std.'
  }, {
    k: 'Einzigartig',
    v: 'Kubismus'
  }],
  railFacts: {
    title: 'Auf einen Blick',
    items: [{
      k: 'Jugendstil',
      v: 'Mucha, Obecní dům'
    }, {
      k: 'Kubismus',
      v: 'Gočár, Janák'
    }, {
      k: 'Nur in Prag',
      v: 'Kubist. Bauten'
    }, {
      k: 'Café',
      v: 'Grand Orient'
    }]
  },
  blocks: [{
    t: 'p',
    first: true,
    html: 'Anfang des 20. Jahrhunderts war Prag eine Stadt im Aufbruch. Der Jugendstil schmückte ihre Boulevards mit Blüten und goldenen Mosaiken — und dann taten junge tschechische Architekten etwas, das es nirgendwo sonst gab: Sie übersetzten den Kubismus der Malerei in Stein.'
  }, {
    t: 'h2',
    html: 'Das <em>Jugendstil</em>-Juwel'
  }, {
    t: 'p',
    html: 'Das Repräsentationshaus (Obecní dům) ist Gesamtkunstwerk pur: Mosaiken, Mosaike, ein Konzertsaal mit Mucha-Bezug und ein Café, in dem die Zeit stehen geblieben ist. Nebenan steht der gotische Pulverturm — der Kontrast ist das eigentliche Erlebnis.'
  }, {
    t: 'callout',
    label: 'Was Kubismus in Architektur heißt',
    html: '<p>Statt glatter Wände: <strong>geknickte, kristalline Flächen</strong>, schräge Fenster, kantige Details — sogar Möbel und ein Café. Das <strong>Haus zur Schwarzen Madonna</strong> ist das berühmteste Beispiel und beherbergt heute das einzige kubistische Café der Welt.</p>'
  }, {
    t: 'map',
    title: 'Architektur-Spaziergang',
    route: true,
    list: true,
    cap: 'Von der Jugendstil-Pracht zur kubistischen Kühnheit — rund 3 km durch die Neustadt.',
    points: [{
      coord: [50.0879, 14.4283],
      label: 'Repräsentationshaus',
      note: 'Jugendstil-Gesamtkunstwerk neben dem Pulverturm.'
    }, {
      coord: [50.0873, 14.4258],
      label: 'Haus zur Schwarzen Madonna',
      note: 'Kubismus pur — mit dem Grand Café Orient im ersten Stock.'
    }, {
      coord: [50.0833, 14.4270],
      label: 'Mucha-Museum',
      note: 'Die goldenen Plakate des Jugendstil-Meisters.'
    }, {
      coord: [50.0834, 14.4213],
      label: 'Kubistische Laterne',
      note: 'Die einzige kubistische Straßenlaterne der Welt, am Jungmann-Platz.'
    }, {
      coord: [50.0832, 14.4355],
      label: 'Hauptbahnhof',
      note: 'Die alte Jugendstil-Halle von Josef Fanta, oft übersehen.'
    }]
  }, {
    t: 'quote',
    html: 'Andere Städte haben Kubismus an die Wand gehängt. Prag hat darin gewohnt.',
    by: 'Zuzana'
  }, {
    t: 'ornament'
  }, {
    t: 'p',
    html: 'Diese Tour ist für alle, die schon „die Brücke und die Burg“ gesehen haben und Prags überraschendere Seite suchen. Ich zeige Ihnen die Stadt, an der die meisten vorbeigehen.'
  }],
  related: ['kaffeehaeuser', 'versteckte-hoefe', 'kafka']
}, {
  slug: 'essen-wie-einheimische',
  category: 'Kulinarik',
  title: 'Wo <em>Einheimische</em> essen',
  titlePlain: 'Wo Einheimische essen',
  cardBlurb: 'Abseits der Touristenfallen am Ring: die Viertel und Gerichte, die Prag wirklich ausmachen.',
  readTime: '8 Min.',
  date: 'März 2026',
  hero: 'guest-food.jpeg',
  heroCap: 'Böhmische Küche, ehrlich serviert — abseits der Hauptplätze.',
  standfirst: 'Die Regel ist einfach: Je näher am Altstädter Ring, desto schlechter und teurer das Essen. Gehen wir also weiter.',
  meta: [{
    k: 'Faustregel',
    v: '2 Tram-Stopps weg'
  }, {
    k: 'Viertel',
    v: 'Karlín, Vinohrady'
  }, {
    k: 'Mittagsmenü',
    v: 'Polední menu'
  }, {
    k: 'Niveau',
    v: 'Genießen'
  }],
  railFacts: {
    title: 'Tisch-Knigge',
    items: [{
      k: 'Trinkgeld',
      v: '~10 %'
    }, {
      k: 'Mittags',
      v: 'Bestes Preis-Wert'
    }, {
      k: 'Bier',
      v: 'Erst „ano“ sagen'
    }, {
      k: 'Reservieren',
      v: 'Abends ratsam'
    }]
  },
  blocks: [{
    t: 'p',
    first: true,
    html: 'Ich werde oft gefragt, wo man „echt tschechisch“ isst. Meine Antwort beginnt immer mit einer Richtung: weg vom Altstädter Ring. Zwei, drei Tramstopps genügen, und die Preise halbieren sich, während die Qualität steigt.'
  }, {
    t: 'h2',
    html: 'Die <em>Viertel</em>, nicht die Adressen'
  }, {
    t: 'p',
    html: 'Konkrete Lokale kommen und gehen — deshalb gebe ich Ihnen lieber die Viertel an die Hand. <strong>Karlín</strong> ist Prags Feinschmecker-Bezirk geworden; <strong>Vinohrady</strong> ist elegant und entspannt; <strong>Žižkov</strong> hat die meisten Kneipen pro Kopf in Europa; <strong>Holešovice</strong> ist jung und kreativ, mit einer Markthalle in einer alten Fabrik.'
  }, {
    t: 'callout',
    label: 'Was Sie probieren sollten',
    html: '<p>Jenseits von Gulasch und Knödel:</p>',
    list: ['<strong>Svíčková:</strong> Rinderlende in Rahmsoße mit Preiselbeeren — das Nationalgericht.', '<strong>Chlebíčky:</strong> belegte Brötchen, das tschechische Fingerfood.', '<strong>Polední menu:</strong> das günstige Mittagsmenü, das die Einheimischen lieben.', '<strong>Ein „desítka“:</strong> ein leichtes 10°-Bier, perfekt zum Mittag.']
  }, {
    t: 'map',
    title: 'Die Genussviertel Prags',
    route: false,
    list: true,
    cap: 'Keine Adressen, sondern Reviere — fragen Sie mich vor Ort nach dem tagesaktuellen Tipp.',
    points: [{
      coord: [50.0930, 14.4490],
      label: 'Karlín',
      note: 'Prags Feinschmecker-Viertel — moderne Bistros und Bäckereien.'
    }, {
      coord: [50.0775, 14.4380],
      label: 'Vinohrady',
      note: 'Elegant und ruhig: Weinbars, Brunch, Parks.'
    }, {
      coord: [50.0875, 14.4500],
      label: 'Žižkov',
      note: 'Die Kneipenhochburg — bodenständig und lebendig.'
    }, {
      coord: [50.0680, 14.4150],
      label: 'Náplavka',
      note: 'Die Moldau-Uferpromenade mit Samstags-Bauernmarkt.'
    }]
  }, {
    t: 'quote',
    html: 'Eine Stadt schmeckt man nicht auf ihrem Hauptplatz. Man schmeckt sie dort, wo sie wohnt.',
    by: 'Zuzana'
  }, {
    t: 'ornament'
  }, {
    t: 'p',
    html: 'Eine kulinarische Runde lässt sich wunderbar mit einem Spaziergang verbinden. Sagen Sie mir, was Sie mögen — und ob Sie Bier oder Wein bevorzugen.'
  }],
  related: ['kaffeehaeuser', 'versteckte-hoefe', 'beste-reisezeit']
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site/journal-content-3.js", error: String((e && e.message) || e) }); }

// ui_kits/website/site/journal.js
try { (() => {
/* ============================================================
   Zuza Prague Tours — Journal engine (magazine build)
   Renders article.html?slug=… and the blog index from
   window.JOURNAL. Features: numbered Leaflet maps + dotted
   walking routes (Carto Positron tiles) with a synced itinerary,
   meta facts bar, "Gut zu wissen" fact boxes, galleries, a sticky
   scroll-spy table of contents, a reading-progress bar and a
   back-to-top button. Pairs with article.css.
   ============================================================ */
(function () {
  var IMG = '../../../assets/images/';
  var J = window.JOURNAL || [];
  var bySlug = {};
  J.forEach(function (a) {
    bySlug[a.slug] = a;
  });
  function qparam(k) {
    return new URLSearchParams(location.search).get(k);
  }
  function stripTags(s) {
    return (s || '').replace(/<[^>]+>/g, '');
  }
  function slugify(s) {
    return stripTags(s).toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  /* ---------- block → HTML ---------- */
  function stopsList(points) {
    return '<ol class="stops">' + points.map(function (p, i) {
      return '<li><span class="n">' + (i + 1) + '</span><div><div class="t">' + p.label + '</div>' + (p.note ? '<div class="d">' + p.note + '</div>' : '') + '</div></li>';
    }).join('') + '</ol>';
  }
  function renderBlocks(blocks, ctx) {
    return (blocks || []).map(function (b) {
      switch (b.t) {
        case 'p':
          return '<p' + (b.first ? ' class="first"' : '') + '>' + b.html + '</p>';
        case 'h2':
          var id = slugify(b.html);
          ctx.toc.push({
            id: id,
            label: stripTags(b.html)
          });
          return '<h2 id="' + id + '">' + b.html + '</h2>';
        case 'quote':
          return '<blockquote class="pq"><p>' + b.html + '</p>' + (b.by ? '<span class="by">— ' + b.by + '</span>' : '') + '</blockquote>';
        case 'callout':
          return '<aside class="callout"><div class="l">' + (b.label || 'Tipp') + '</div>' + (b.html || '') + (b.list ? '<ul>' + b.list.map(function (li) {
            return '<li>' + li + '</li>';
          }).join('') + '</ul>' : '') + '</aside>';
        case 'list':
          return '<ul>' + b.items.map(function (li) {
            return '<li>' + li + '</li>';
          }).join('') + '</ul>';
        case 'facts':
          return '<div class="facts"><div class="facts__h">' + (b.title || 'Gut zu wissen') + '</div><div class="facts__b">' + b.items.map(function (it) {
            return '<div class="facts__row"><span class="facts__k">' + it.k + '</span><span class="facts__v">' + it.v + '</span></div>';
          }).join('') + '</div></div>';
        case 'ornament':
          return '<div class="ornament"><span class="r"></span><span class="g">&#10086;</span><span class="r"></span></div>';
        case 'figure':
          return '<figure class="a-figure" style="margin:2.4em 0"><img src="' + IMG + b.img + '" alt="' + (b.alt || '') + '">' + (b.cap ? '<figcaption>' + b.cap + '</figcaption>' : '') + '</figure>';
        case 'gallery':
          return '<figure class="gallery2"><div class="gallery2__row">' + b.images.map(function (g) {
            return '<img src="' + IMG + g.img + '" alt="' + (g.alt || '') + '">';
          }).join('') + '</div>' + (b.cap ? '<figcaption>' + b.cap + '</figcaption>' : '') + '</figure>';
        case 'map':
          var idx = ctx.maps.length;
          ctx.maps.push(b);
          return '<div class="jmap-wrap">' + '<div class="jmap-title">' + (b.title || 'Karte') + '</div>' + '<div class="jmap" id="jmap-' + idx + '"></div>' + (b.cap ? '<div class="jmap-cap">' + b.cap + '</div>' : '') + (b.list && b.points ? stopsList(b.points) : '') + '</div>';
        default:
          return '';
      }
    }).join('');
  }

  /* ---------- Leaflet ---------- */
  function initMap(node, spec) {
    if (typeof L === 'undefined') {
      fallbackMap(node, spec);
      return;
    }
    var map = L.map(node, {
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);
    var pts = spec.points || [],
      latlngs = [];
    pts.forEach(function (p, i) {
      var icon = L.divIcon({
        className: 'jmark-wrap',
        html: '<span class="jmark">' + (i + 1) + '</span>',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15]
      });
      L.marker(p.coord, {
        icon: icon
      }).addTo(map).bindPopup('<span class="pop-t">' + (i + 1) + '. ' + p.label + '</span>' + (p.note ? '<span class="pop-n">' + p.note + '</span>' : ''));
      latlngs.push(p.coord);
    });
    if (spec.route && latlngs.length > 1) {
      L.polyline(latlngs, {
        color: '#6B1F2A',
        weight: 3,
        opacity: 0.85,
        dashArray: '1 9',
        lineCap: 'round'
      }).addTo(map);
    }
    if (latlngs.length > 1) {
      map.fitBounds(latlngs, {
        padding: [45, 45],
        maxZoom: 16
      });
    } else if (latlngs.length === 1) {
      map.setView(latlngs[0], spec.zoom || 15);
    } else if (spec.center) {
      map.setView(spec.center, spec.zoom || 14);
    }
  }
  function fallbackMap(node, spec) {
    node.style.height = 'auto';
    node.style.padding = '1.4rem';
    node.innerHTML = '<ul style="margin:0;padding:0;list-style:none;font-family:var(--font-body);color:var(--ink-soft)">' + (spec.points || []).map(function (p, i) {
      return '<li style="padding:.3rem 0"><strong>' + (i + 1) + '. ' + p.label + '</strong>' + (p.note ? ' — ' + p.note : '') + '</li>';
    }).join('') + '</ul>';
  }

  /* ---------- related ---------- */
  function relatedCards(slugs) {
    return (slugs || []).map(function (s) {
      var a = bySlug[s];
      if (!a) return '';
      return '<a class="mcard" href="article.html?slug=' + a.slug + '"><img src="' + IMG + a.hero + '" alt=""><span class="cat">' + a.category + '</span><h4 class="display">' + a.titlePlain + '</h4><p>' + (a.cardBlurb || '') + '</p></a>';
    }).join('');
  }

  /* ---------- ARTICLE ---------- */
  function renderArticle() {
    var root = document.getElementById('articleRoot');
    if (!root) return;
    var a = bySlug[qparam('slug')] || J[0];
    if (!a) {
      root.innerHTML = '<div class="shell j-empty">Beitrag nicht gefunden. <a href="blog.html" style="color:var(--burgundy)">Zum Journal</a></div>';
      return;
    }
    document.title = a.titlePlain + ' · Zuza Prague Tours';
    var ctx = {
      maps: [],
      toc: []
    };
    var body = renderBlocks(a.blocks, ctx);
    var related = a.related && a.related.length ? a.related : J.filter(function (x) {
      return x.slug !== a.slug;
    }).slice(0, 3).map(function (x) {
      return x.slug;
    });
    var metaBar = a.meta ? '<div class="a-meta">' + a.meta.map(function (m) {
      return '<div><div class="k">' + m.k + '</div><div class="v">' + m.v + '</div></div>';
    }).join('') + '</div>' : '';
    var toc = ctx.toc.length > 1 ? '<nav class="toc"><div class="toc__h">Inhalt</div><ol>' + ctx.toc.map(function (h) {
      return '<li><a class="toc__link" href="#' + h.id + '" data-target="' + h.id + '">' + h.label + '</a></li>';
    }).join('') + '</ol></nav>' : '';
    var railFacts = a.railFacts ? '<div class="facts"><div class="facts__h">' + (a.railFacts.title || 'Auf einen Blick') + '</div><div class="facts__b">' + a.railFacts.items.map(function (it) {
      return '<div class="facts__row"><span class="facts__k">' + it.k + '</span><span class="facts__v">' + it.v + '</span></div>';
    }).join('') + '</div></div>' : '';
    root.innerHTML = '<article>' + '<header class="a-head"><div class="shell shell--prose">' + '<span class="crumb"><a href="blog.html">Journal</a> <span>/</span> ' + a.category + '</span>' + '<div class="a-kick"><span>' + a.category + '</span><span class="r"></span><span>' + a.readTime + ' Lesezeit</span></div>' + '<h1>' + a.title + '</h1>' + '<p class="a-stand">' + a.standfirst + '</p>' + '<div class="a-byline"><img src="' + IMG + 'zuzana-portrait.jpg" alt="Zuzana Manová"><div><div class="n">Ing. Zuzana Manová</div><div class="r">Zertifizierte Stadtführerin · ' + a.date + '</div></div></div>' + metaBar + '</div><div class="shell"><figure class="a-figure"><img src="' + IMG + a.hero + '" alt="' + a.titlePlain + '">' + (a.heroCap ? '<figcaption>' + a.heroCap + '</figcaption>' : '') + '</figure></div></header>' + '<div class="a-body"><div class="shell"><div class="a-layout">' + '<div class="a-col">' + body + '</div>' + '<aside class="a-rail"><div class="a-rail__sticky">' + toc + railFacts + '<a class="btn solid a-rail__cta" href="kontakt.html">Tour anfragen</a></div></aside>' + '</div></div></div>' + '</article>' + '<section class="a-foot"><div class="shell"><div class="a-foot__cta">' + '<h3>' + (a.ctaTitle || 'Möchten Sie das selbst erleben?') + '</h3>' + '<p>' + (a.ctaText || 'Begrenzte Verfügbarkeit für private Führungen. Schreiben Sie mir, und wir finden den richtigen Tag.') + '</p>' + '<a href="kontakt.html" class="btn solid">Tour anfragen <span class="material-symbols-outlined">arrow_forward</span></a>' + '</div></div></section>' + '<section class="a-more"><div class="shell"><span class="kicker">Weiterlesen im Journal</span><div class="a-more__grid">' + relatedCards(related) + '</div></div></section>';
    ctx.maps.forEach(function (spec, i) {
      var n = document.getElementById('jmap-' + i);
      if (n) initMap(n, spec);
    });
    setupReading(ctx.toc);
  }

  /* ---------- reading progress + scroll-spy + back-to-top ---------- */
  function setupReading(toc) {
    var bar = document.querySelector('.read-progress');
    var top = document.querySelector('.to-top');
    var art = document.querySelector('article');
    var links = [].slice.call(document.querySelectorAll('.toc__link'));
    var heads = toc.map(function (h) {
      return document.getElementById(h.id);
    }).filter(Boolean);
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        if (bar && art) {
          var start = art.offsetTop,
            h = art.offsetHeight - window.innerHeight;
          var p = h > 0 ? (window.scrollY - start) / h : 0;
          bar.style.width = Math.max(0, Math.min(1, p)) * 100 + '%';
        }
        if (top) top.classList.toggle('show', window.scrollY > window.innerHeight);
        if (heads.length) {
          var active = heads[0],
            mid = 140;
          for (var i = 0; i < heads.length; i++) {
            if (heads[i].getBoundingClientRect().top <= mid) active = heads[i];
          }
          links.forEach(function (l) {
            l.classList.toggle('active', l.dataset.target === active.id);
          });
        }
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    onScroll();
    if (top) top.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    // smooth-scroll TOC clicks (offset for fixed nav)
    links.forEach(function (l) {
      l.addEventListener('click', function (e) {
        var t = document.getElementById(l.dataset.target);
        if (!t) return;
        e.preventDefault();
        window.scrollTo({
          top: t.getBoundingClientRect().top + window.scrollY - 84,
          behavior: 'smooth'
        });
      });
    });
  }

  /* ---------- BLOG INDEX ---------- */
  function renderIndex() {
    var grid = document.getElementById('journalGrid');
    if (!grid) return;
    var feat = document.getElementById('journalFeature');
    var list = J.slice();
    var lead = list.shift();
    if (feat && lead) {
      feat.innerHTML = '<a class="j-feature" href="article.html?slug=' + lead.slug + '"><div class="j-feature__media"><img src="' + IMG + lead.hero + '" alt=""></div><div><span class="cat">' + lead.category + '</span><h2>' + lead.title + '</h2><p>' + (lead.cardBlurb || lead.standfirst) + '</p><span class="meta">' + lead.readTime + ' Lesezeit · ' + lead.date + '</span></div></a>';
    }
    grid.innerHTML = list.map(function (a, i) {
      var d = i % 3 === 1 ? ' d1' : i % 3 === 2 ? ' d2' : '';
      return '<a class="post reveal' + d + '" href="article.html?slug=' + a.slug + '"><div class="post__media"><img src="' + IMG + a.hero + '" alt=""></div><span class="cat">' + a.category + '</span><h3 class="display">' + a.titlePlain + '</h3><p>' + (a.cardBlurb || '') + '</p><span class="meta">' + a.readTime + ' · ' + a.date + '</span></a>';
    }).join('');
    var cards = grid.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px -6% 0px'
      });
      cards.forEach(function (c) {
        io.observe(c);
      });
      setTimeout(function () {
        cards.forEach(function (c) {
          c.classList.add('in');
        });
      }, 1500);
    } else {
      cards.forEach(function (c) {
        c.classList.add('in');
      });
    }
  }
  function boot() {
    renderArticle();
    renderIndex();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);else boot();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site/journal.js", error: String((e && e.message) || e) }); }

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
