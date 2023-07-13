let zIndex: { [key: number]: string } = {};
for (let i = -1; i <= 100; i++) {
  zIndex[i] = `${i}`;
}

module.exports = {
  content: [
    './app.vue',
    './pages/index.vue',
    './pages/**/*.vue',
    './components/*.vue',
    './components/**/*.vue',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#E74C3C', // scss var $color-fireball
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

        // colors from scss variables
        blood: '#a82315',
        mana: '#166c9c',
        fog: '#f4f4f4',
        smoke: '#d4d4d4',
        granite: '#888',
        // gray: '#767676', // this conflicts with an existing tailwind class
        basalt: '#333',
        darkness: '#111',
      },

      //adds z-index from 1 to 100
      zIndex: zIndex,
    },
  },
  plugins: [],
};
