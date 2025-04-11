module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  // required to lint *.vue files
  plugins: ['vue', '@typescript-eslint'],
  // add your custom rules here
  rules: {
    eqeqeq: 'off',
    // curly: 'error',
    // sometimes you need to use double quotes. ie. string contains apostrophes
    // quotes: ['error', 'single'],
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
  },
};
