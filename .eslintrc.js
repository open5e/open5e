module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'espree',
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/strongly-recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue/recommended',
    'prettier',
    // 'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
  ],
  // required to lint *.vue files
  plugins: ['vue', '@typescript-eslint', 'tailwindcss'],
  // add your custom rules here
  rules: {
    eqeqeq: 'off',
    quotes: ['error', 'single'],
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          normal: 'always',
          component: 'always',
          /* Vue advises that void tags omit the terminal slash, but this
           * conflicts with Prettier */
          // void: 'never',
          void: 'always',
        },
      },
    ],
    // there are lots of custom classes in the codebase
    'tailwindcss/no-custom-classname': 'off',
  },
};
