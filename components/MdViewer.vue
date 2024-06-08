<template ref="el">
  <VueShowdown
    ref="mdwrapper"
    :vue-template="true"
    :options="{
      tables: true,
      headerLevelStart: headerLevel,
      vueTemplate: true,
    }"
    :markdown="text"
    :extensions="insertCrossLinks"
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
});

const insertCrossLinks = [
  {
    type: 'output',
    regex: /<open5e-link src=([^>]+)>([^<]+)<\/open5e-link>/g,
    replace: '<cross-link src="$1">$2</cross-link>',
  },
];
</script>

<style>
.markdown-inline {
  display: inline;
  * {
    display: inherit;
  }
}
</style>
