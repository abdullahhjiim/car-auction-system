/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './app/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        primary: ['Open Sans'],
        secondary: ['Inter'],
        tertiary: ['Great Vibes'],
        alexandria: ['Alexandria'],
      },
      colors: {
        // primary: '#B20A0B',
        primary: '#B11E24',
        secondary: '#F2F2F2',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwindcss-all'), require('@tailwindcss/typography')],

});
