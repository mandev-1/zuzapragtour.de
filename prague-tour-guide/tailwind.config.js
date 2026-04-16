/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        // --- New editorial palette (Phase 1) ---
        // Ink: near-black, warm. Used for primary text + solid dark sections.
        ink: {
          DEFAULT: '#1a1613',
          soft: '#2a2420',
        },
        // Paper: warm off-white page background. Never pure white.
        paper: {
          DEFAULT: '#faf8f4',
          warm: '#f5f1ea',
        },
        // Stone: warm-gray neutral scale. The workhorse.
        stone: {
          50: '#faf8f4',
          100: '#f0ebe2',
          200: '#e0d8c9',
          300: '#c7bba6',
          400: '#a89880',
          500: '#857563',
          600: '#645849',
          700: '#453d33',
          800: '#2b2620',
          900: '#1a1613',
        },
        // Accent: the ONE color used for primary CTAs and editorial highlights.
        // Kept maroon for brand continuity — can switch to ink for zero-color version.
        accent: {
          DEFAULT: '#8a1f1f',
          hover: '#6e1818',
          soft: '#f5e6e6',
        },

        // --- Legacy aliases (will be removed once all components migrated) ---
        // DO NOT use these in new code. Kept only to prevent breakage of existing components.
        primary: '#8a1f1f',
        'on-primary': '#ffffff',
        'primary-container': '#8a1f1f',
        secondary: '#645849',
        'on-secondary': '#ffffff',
        'secondary-container': '#e0d8c9',
        'on-secondary-container': '#2b2620',
        tertiary: '#453d33',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#645849',
        background: '#faf8f4',
        'on-background': '#1a1613',
        surface: '#faf8f4',
        'on-surface': '#1a1613',
        'on-surface-variant': '#645849',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f5f1ea',
        'surface-container': '#f0ebe2',
        'surface-container-high': '#e0d8c9',
        'surface-container-highest': '#c7bba6',
        'surface-dim': '#e0d8c9',
        'surface-tint': '#8a1f1f',
        'inverse-on-surface': '#faf8f4',
        outline: '#857563',
        'outline-variant': '#c7bba6',
        error: '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#f5e6e6',
        'on-error-container': '#6e1818',
      },
      fontFamily: {
        // Headlines get real serif treatment.
        headline: ['"Noto Serif"', 'Georgia', 'Cambria', 'serif'],
        // Body text: switch to a clean sans for readability.
        // Keep Noto Serif available as `serif` for deliberate editorial pull-quotes.
        body: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Noto Serif"', 'Georgia', 'Cambria', 'serif'],
        label: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        // Small caps / eyebrow labels.
        eyebrow: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Editorial display scale for hero + section heads.
        'display-xl': ['clamp(2.75rem, 5vw + 1rem, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2.25rem, 4vw + 0.75rem, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 2.5vw + 0.75rem, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        // Editorial body prose (slightly larger than default for long-form reading).
        prose: ['1.0625rem', { lineHeight: '1.75', letterSpacing: '0' }],
        'prose-lg': ['1.1875rem', { lineHeight: '1.7', letterSpacing: '-0.005em' }],
        // Eyebrow labels (small, uppercase, tracked out).
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.15em' }],
      },
      letterSpacing: {
        eyebrow: '0.15em',
        'tight-display': '-0.025em',
      },
      maxWidth: {
        'prose-narrow': '36rem',
        prose: '44rem',
        editorial: '72rem',
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(2.5rem) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(1rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.7s ease-out',
      },
      borderRadius: {
        // Using Tailwind defaults — your previous overrides were making every
        // component feel timid and inconsistent.
        DEFAULT: '0.375rem',
        // `lg`, `xl`, `full` now inherit Tailwind defaults (0.5rem, 0.75rem, 9999px).
      },
    },
  },
  plugins: [],
};
