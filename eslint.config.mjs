import eslintPluginTailwindCss from 'eslint-plugin-tailwindcss';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt([
  {
    files: ['app/**/*.js', 'app/**/*.ts', 'app/**/*.vue'],
    ignores: ['bin'],
    rules: {
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'brace-style': ['error', '1tbs'],
    },
  },
  ...eslintPluginTailwindCss.configs['flat/recommended'],
]).override('nuxt/vue/rules', {
  rules: {
    'eqeqeq': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          normal: 'always',
          component: 'always',
          void: 'always',
        },
      },
    ],
  },
})
  .override('tailwindcss:rules', {
    rules: {
      'tailwindcss/no-custom-classname': 'off', // This will conflict with some of the classnames being used in conjunction with SASS
    },
  });
