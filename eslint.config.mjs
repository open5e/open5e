import eslintPluginTailwindCss from "eslint-plugin-tailwindcss";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt([
  {
    ignores: ['bin'],
  },
  ...eslintPluginTailwindCss.configs["flat/recommended"]
]).override('tailwindcss:rules', {
  rules: {
    'tailwindcss/no-custom-classname': 'off'
  }
});
