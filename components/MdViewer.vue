<template ref="el">
  <vue-showdown
    ref="mdwrapper"
    :vue-template="true"
    :options="{
      tables: true,
      headerLevelStart: headerLevel,
      vueTemplate: true,
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
  inline: { type: Boolean, default: false },
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
  * {
    display: inherit;
  }
}
</style>
