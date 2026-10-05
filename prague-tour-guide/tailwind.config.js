/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Editorial blog palette
        ivory: {
          DEFAULT: '#F5EFE4',
          deep: '#EDE4D3',
        },
        paper: {
          DEFAULT: '#FAF6EC',
          warm: '#f5f1ea',
        },
        ink: {
          DEFAULT: '#1A1714',
          soft: '#3A332C',
          mute: '#6B6055',
        },
        rule: {
          DEFAULT: '#D9CFBC',
          soft: '#E8DFCC',
        },
        burgundy: {
          DEFAULT: '#6B1F2A',
          deep: '#4F1620',
        },
        brass: {
          DEFAULT: '#A88654',
          deep: '#8C6A3C',
        },
        // Editorial golds — hero/eyebrow gold on light, lamp gold on dark
        gold: {
          olive: '#7B5800',
          lamp: '#FDC34D',
        },
        sage: {
          DEFAULT: '#8A9282',
        },
        // Journal articles — own palette (design_handoff_blog_orte).
        journal: {
          ink: '#1A1714',
          body: '#2F2A26',
          mute: '#5C5650',
          faint: '#8A847D',
          blue: '#11457E',
          'blue-hover': '#0B3360',
          'blue-tint': '#EEF3F9',
          select: '#DCE6F2',
          burgundy: '#6B1F2A',
          'burgundy-hover': '#4F1620',
          rule: '#E4DFD6',
          panel: '#F6F4EF',
        },
        // /bewerten review page — own palette (design_handoff_bewerten).
        // Desktop = cooler ivory, mobile = warm cream; red/blue shared.
        bewerten: {
          red: '#A3231B',
          'red-hover': '#8A1C15',
          blue: '#2C4F8F',
          'blue-hover': '#223F74',
          gold: '#FFE7A8',
          'on-red': '#FBE3E1',
          'on-blue': '#DCE5F4',
          // desktop
          bg: '#FAF8F4',
          ink: '#1A1613',
          text: '#453d33',
          mute: '#645849',
          rule: '#c7bba6',
          'rule-soft': '#e0d8c9',
          // mobile
          'm-bg': '#F7F0E4',
          'm-card': '#FFFBF4',
          'm-ink': '#2A211B',
          'm-text': '#4A3D33',
          'm-mute': '#6B5A4C',
          'm-card-border': '#EADCC6',
          'm-chip-border': '#E0CFB8',
          'm-rule': '#E3D6C2',
          'm-ornament': '#D9C7AE',
          'm-icon-bg': '#F3E4DC',
        },
        // Existing tokens preserved for non-blog pages
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
        accent: {
          DEFAULT: '#8a1f1f',
          hover: '#6e1818',
          soft: '#f5e6e6',
        },
        primary: '#8a1f1f',
        'on-primary': '#faf8f4',
        'primary-container': '#8a1f1f',
        secondary: '#645849',
        'on-secondary': '#faf8f4',
        'secondary-container': '#e0d8c9',
        'on-secondary-container': '#2b2620',
        tertiary: '#453d33',
        'on-tertiary': '#faf8f4',
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
        'on-error': '#faf8f4',
        'error-container': '#f5e6e6',
        'on-error-container': '#6e1818',
      },
      fontFamily: {
        // Editorial blog font stack — wired to next/font CSS variables
        display: ['var(--font-display)', '"Italiana"', '"Cormorant Garamond"', '"Times New Roman"', 'serif'],
        body: ['var(--font-body)', '"Libre Caslon Text"', '"EB Garamond"', 'Georgia', 'serif'],
        italic: ['var(--font-italic)', '"Cormorant Garamond"', '"EB Garamond"', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', '"Inter Tight"', '"Helvetica Neue"', 'system-ui', 'sans-serif'],
        // /bewerten review page
        hanken: ['var(--font-hanken)', '"Hanken Grotesk"', '"Helvetica Neue"', 'sans-serif'],
        garamond: ['var(--font-garamond)', '"EB Garamond"', 'Georgia', 'serif'],
        // Journal articles
        news: ['var(--font-newsreader)', '"Newsreader"', 'Georgia', 'serif'],
        // Legacy aliases used by non-blog pages — kept intact
        headline: ['var(--font-noto-serif)', '"Noto Serif"', 'Georgia', 'Cambria', 'serif'],
        serif: ['var(--font-noto-serif)', '"Noto Serif"', 'Georgia', 'Cambria', 'serif'],
        label: ['var(--font-jakarta)', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        eyebrow: ['var(--font-jakarta)', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 5vw + 1rem, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2.25rem, 4vw + 0.75rem, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 2.5vw + 0.75rem, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        prose: ['1.0625rem', { lineHeight: '1.75', letterSpacing: '0' }],
        'prose-lg': ['1.1875rem', { lineHeight: '1.7', letterSpacing: '-0.005em' }],
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
        measure: '660px',
        shell: '1320px',
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
        kenburns: {
          '0%': { transform: 'scale(1.06)' },
          '100%': { transform: 'scale(1)' },
        },
        // Mobile menu panel (Header) — fades/slides in when mounted.
        menuIn: {
          '0%': { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.7s ease-out',
        kenburns: 'kenburns 18s ease-out forwards',
        'menu-in': 'menuIn 0.2s ease-out',
        'bewerten-sticky': 'fadeInUp 0.2s ease-out',
      },
      borderRadius: {
        DEFAULT: '0.375rem',
      },
      transitionTimingFunction: {
        // Signature gentle ease used across the premium editorial surfaces.
        brand: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
