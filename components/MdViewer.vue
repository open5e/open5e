<template ref="el">
  <VueShowdown
    ref="mdwrapper"
    :vue-template="true"
    :options="{
      tables: true,
      headerLevelStart: headerLevel,
      vueTemplate: true,
    }"
    :markdown="mdText"
    :extensions="insertCrossLinks"
    :class="inline ? 'markdown-inline' : ''"
  />
</template>

<script setup>
import axios from 'axios';
import { VueShowdown } from 'vue-showdown';
const props = defineProps({
  src: { type: String || undefined, default: undefined },
  toc: { type: Boolean, default: true },
  text: { type: String, default: 'loading...' },
  headerLevel: { type: Number, default: 1 },
  inline: { type: Boolean, default: false },
});

const sourceText = ref('');
const el = ref(null);

const mdText = computed(() => {
  return sourceText.value ? sourceText.value : props.text;
});
const insertCrossLinks = computed(() => [
  {
    type: 'output',
    regex: /<open5e-link src=([^>]+)>([^<]+)<\/open5e-link>/g,
    replace: '<cross-link src="$1">$2</cross-link>',
  },
]);

onMounted(() => {
  if (!props.src) {
    return;
  }
  axios.get(props.src).then((response) => {
    sourceText.value = response.data;
    scrollToRoute();
  });
});
function scrollToRoute() {
  if (!useRoute().hash) {
    return;
  }
  nextTick(() => {
    const hash = useRoute().hash;
    const container = el.querySelector(hash);
    container.scrollIntoView({ behavior: 'smooth' });
  });
}
</script>

<style>
.markdown-inline {
  display: inline;
  * {
    display: inherit;
  }
}
</style>
