/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eefcf8',
          100: '#d8f8ed',
          200: '#b3efd9',
          300: '#84e4c1',
          400: '#4cd09f',
          500: '#1ea97b',
          600: '#178b65',
          700: '#136f53',
          800: '#125844',
          900: '#104839',
        },
        secondary: {
          50: '#fff7e6',
          100: '#ffebbf',
          200: '#ffd98a',
          300: '#ffc257',
          400: '#ffab2f',
          500: '#f08b17',
          600: '#d16e0f',
          700: '#aa510f',
          800: '#8a4214',
          900: '#723714',
        },
        background: {
          light: '#f7f9fc',
          dark: '#0b1720',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(12, 33, 46, 0.08)',
        medium: '0 18px 40px rgba(12, 33, 46, 0.12)',
        glow: '0 0 0 1px rgba(255, 255, 255, 0.2), 0 20px 50px rgba(16, 72, 57, 0.18)',
      },
      borderRadius: {
        xl: '1.25rem',
      },
    },
  },
  plugins: [],
};
