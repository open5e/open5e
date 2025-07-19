const zIndex: { [key: number]: string } = {};
for (let i = -1; i <= 100; i++) {
  zIndex[i] = `${i}`;
}

module.exports = {
  content: [
    './app/app.vue',
    './app/pages/index.vue',
    './app/pages/**/*.vue',
    './app/components/*.vue',
    './app/components/**/*.vue',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['"Source Sans Pro"', 'sans-serif'],
      serif: ['"Lora"', 'serif'],
    },
    extend: {
      fontfamily: {
        headers: ['"Lora"', 'serif'],
      },
      colors: {
        red: {
          DEFAULT: '#E74C3C', // color-fireball
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

        fireball: '#e74c3c',
        blood: '#a82315',
        mana: '#166c9c',
        fog: '#f4f4f4',
        smoke: '#d4d4d4',
        granite: '#888',
        // gray: '#767676', // this conflicts with an existing tailwind class
        basalt: '#333',
        charcoal: '#222',
        darkness: '#111',
      },

      // adds z-index from 1 to 100
      zIndex: zIndex,

      animation: {
        'pulse-orange': 'pulse-orange 2s ease-in-out infinite',
        'pulse-orange-dark': 'pulse-orange-dark 2s ease-in-out infinite',
      },
      keyframes: (theme: (path: string) => string) => ({
        'pulse-orange': {
          '0%, 100%': { backgroundColor: theme('colors.orange.200') },
          '50%': { backgroundColor: theme('colors.orange.300') },
        },
        'pulse-orange-dark': {
          '0%, 100%': { backgroundColor: theme('colors.orange.700') },
          '50%': { backgroundColor: theme('colors.orange.600') },
        },
      }),
    },
  },
  plugins: [],
};
