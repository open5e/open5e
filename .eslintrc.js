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
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended',
    'prettier',
  ],
  // required to lint *.vue files
  plugins: ['vue', '@typescript-eslint'],
  // add your custom rules here
  rules: {
    eqeqeq: 'off',
    curly: 'error',
    quotes: ['error', 'single'],
    'vue/multi-word-component-names': 'off',
  },
};
