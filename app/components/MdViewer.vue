<script>
/**
 * MdViewer.vue - Renders Markdown content as HTML. Essentially a wrapper for
 * the VueShowdown library with a few extensions for parsing certain custom
 * Markdown tags as custom Nuxt components (via the "extentions" prop)
 *
 * -= PROPS (INPUTS) =-
 * @prop {Boolean} toc - A boolean flag to control whether a Table of Contents
 *   is generated or not.
 * @prop {String} text - Markdown string to be converted to HTML.
 * @prop {Number} headerLevel - The header level to start from for the Markdown
 *   content. Used for MD nested deeply in a parent doc. Defaults to `1` -> h1
 * @prop {Boolean} inline - Flag. Enables rendering inline markdown.
 * @prop {Boolean} useRoller - Whether to parse dice sigs as rollable on click
 *
 *
 * -= DEPENDENCIES =-
 * - @component VueShowdown: The Markdown rendering library. Converts MD -> HTML
 * - @component CrossLink: Inserted into HTML in place of <open5e-link> tag in MD
 * - @component InlineRoller: Inserted into HTML
 */
</script>

<template ref="el">
  <VueShowdown
    ref="mdwrapper"
    :vue-template="true"
    :options="{
      tables: true,
      headerLevelStart: headerLevel,
      vueTemplate: true,
      simpleLineBreaks: true,
    }"
    :markdown="text"
    :extensions="extensions"
    :class="inline ? 'markdown-inline' : ''"
  />
</template>

<script setup>
import { VueShowdown } from 'vue-showdown';

const props = defineProps({
  toc: { type: Boolean, default: true },
  text: { type: String, default: 'loading...' },
  headerLevel: { type: Number, default: 1 },
  inline: { type: Boolean },
  useRoller: { type: Boolean, default: false },
});

const crossLinkExtension = {
  type: 'output',
  regex: /<open5e-link src=([^>]+)>([^<]+)<\/open5e-link>/g,
  replace: '<cross-link src="$1">$2</cross-link>',
};

const diceRollerExtension = {
  type: 'output',
  regex: /(\+\d+ to hit|\d+[dD]\d+( *[+-] *\d+)?)/g,
  replace: '<inline-roller signature="$1">$1</inline-roller>',
};

const extensions = computed(() => {
  const list = [crossLinkExtension];
  if (props.useRoller) {
    list.push(diceRollerExtension);
  }
  return list;
});
</script>

<style>
.markdown-inline {
  display: inline;
  :not(table, th, td, tr, thead, tbody) {
    display: inherit;
  }
}
</style>
