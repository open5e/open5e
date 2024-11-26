import eslintPluginTailwindCss from 'eslint-plugin-tailwindcss';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt([
  {
    ignores: ['bin'],
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
          /* Vue advises that void tags omit the terminal slash, but this
           * conflicts with Prettier */
          // void: 'never',
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
