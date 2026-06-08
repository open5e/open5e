<script lang="ts">
/**
 * MdViewer.vue - Renders Markdown content as HTML. Essentially a wrapper for
 * the VueShowdown library with a few extensions for parsing certain custom
 * Markdown tags as custom Nuxt components (via the "extensions" prop)
 *
 * -= PROPS (INPUTS) =-
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
    :class="inline ? 'markdown markdown-inline' : 'markdown'"
  />
</template>

<script setup lang="ts">
import { VueShowdown } from 'vue-showdown';
import type { CrossReferenceLink } from '@/types';

const props = defineProps<{
  text?: string,
  headerLevel?: number,
  inline?: boolean,
  useRoller?: boolean,
  crossreferences?: CrossReferenceLink[],
}>();

const crossLinkExtension = computed(() => {
  if (!props.crossreferences?.length) return null;

  const anchors = props.crossreferences.map(r => r.anchor);
  const pattern = anchors.map(a => a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');

  return {
    type: 'output',
    regex: new RegExp(`(${pattern})`, 'g'),
    replace: (match: string) => {
      const ref = props.crossreferences!.find(r => r.anchor === match);
      return ref ? `<cross-link class="inline" to="${ref.url}">${match}</cross-link>` : match;
    },
  };
});

const diceRollerExtension = {
  type: 'output',
  regex: /(\+\d+ to hit|\d+[dD]\d+( *[+-] *\d+)?)/g,
  replace: '<inline-roller signature="$1">$1</inline-roller>',
};

const extensions = computed(() => {
  const list = [];
  if (crossLinkExtension.value) list.push(crossLinkExtension.value);
  if (props.useRoller) list.push(diceRollerExtension);
  return list;
});
</script>

<style>
.markdown {
  a { display: inline };
  ul {
    list-style-type: disc;
    margin-left: 1rem;
  }
}

.markdown-inline {
  display: inline;
  p, div {
    display: inherit;
  }
}
</style>
