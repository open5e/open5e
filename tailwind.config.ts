module.exports = {
  content: [
    './app.vue',
    './pages/index.vue',
    './pages/**/*.vue',
    './components/*.vue',
    './components/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#E74C3C',
          50: '#FBE2DF',
          100: '#F9D1CD',
          200: '#F4B0A9',
          300: '#F08F85',
          400: '#EB6D60',
          500: '#E74C3C',
          600: '#D12B1A',
          700: '#9F2114',
          800: '#6D160D',
          900: '#3B0C07',
          950: '#220704',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
