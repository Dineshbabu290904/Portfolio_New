/** @type {import('tailwindcss').Config} */

// Theme colors are stored as space-separated RGB channels in CSS variables
// (see src/index.css) so Tailwind opacity modifiers like `bg-primary/10` work.
const themeColor = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable dark mode via class strategy
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: themeColor('primary'),
          light: themeColor('primary-light'),
          dark: themeColor('primary-dark'),
          50: 'rgb(var(--c-primary) / 0.5)',
        },
        secondary: {
          DEFAULT: themeColor('secondary'),
          light: themeColor('secondary-light'),
          dark: themeColor('secondary-dark'),
          50: 'rgb(var(--c-secondary) / 0.5)',
        },
        accent: {
          DEFAULT: themeColor('accent'),
          50: 'rgb(var(--c-accent) / 0.5)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', '"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Bricolage Grotesque Variable"', '"Bricolage Grotesque"', '"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', '"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 12s ease-in-out infinite',
        'shimmer': 'shimmer 1.6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-shift': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
