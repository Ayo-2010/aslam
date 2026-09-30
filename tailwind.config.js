/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#0B3D2E',
          50: '#F1F7F4',
          100: '#DCEBE3',
          200: '#B9D7C7',
          300: '#8DBCA5',
          400: '#5D9C81',
          500: '#3C7F64',
          600: '#145A43',
          700: '#0B3D2E',
          800: '#092F24',
          900: '#07231B',
        },
        gold: {
          DEFAULT: '#C9A227',
          light: '#E5D18A',
          // Darkened to clear WCAG AA (>=4.5:1) against white and light tints,
          // while staying recognisably gold. Used for all small accent text.
          dark: '#7A5E12',
        },
        ink: '#17201C',
        muted: '#66736D',
        canvas: '#F7F9F7',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        container: '80rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(11, 61, 46, 0.04), 0 8px 24px -12px rgba(11, 61, 46, 0.14)',
        'card-hover': '0 2px 4px rgba(11, 61, 46, 0.06), 0 20px 40px -16px rgba(11, 61, 46, 0.28)',
        header: '0 1px 0 rgba(11, 61, 46, 0.08), 0 6px 20px -12px rgba(11, 61, 46, 0.3)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.5s ease both',
        'slide-down': 'slide-down 0.25s cubic-bezier(0.22, 1, 0.36, 1) both',
        'scale-in': 'scale-in 0.2s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
