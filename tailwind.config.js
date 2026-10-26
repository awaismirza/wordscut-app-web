/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111316',
        graphite: '#23272f',
        slate: '#5b6472',
        mist: '#f4f6f8',
        line: '#dfe5ea',
        teal: '#0f766e',
        coral: '#e65f48',
        paper: '#ffffff',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        display: [
          'Inter Tight',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      boxShadow: {
        soft: '0 24px 80px rgba(17, 19, 22, 0.10)',
        line: '0 1px 0 rgba(17, 19, 22, 0.08)',
      },
    },
  },
  plugins: [],
}
