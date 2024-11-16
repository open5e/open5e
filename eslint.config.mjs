import eslintPluginTailwindCss from "eslint-plugin-tailwindcss";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(...eslintPluginTailwindCss.configs["flat/recommended"]);
