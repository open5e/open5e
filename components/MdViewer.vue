<template>
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

<script>
import axios from 'axios';
import { VueShowdown } from 'vue-showdown';
export default {
  name: 'MdViewer',
  components: { VueShowdown },
  props: {
    src: { type: String || undefined, default: undefined },
    toc: { type: Boolean, default: true },
    text: { type: String, default: 'loading...' },
    headerLevel: { type: Number, default: 1 },
    inline: { type: Boolean, default: false },
  },
  data() {
    return { sourceText: '' };
  },
  computed: {
    mdText: function () {
      return this.sourceText ? this.sourceText : this.text;
    },

    insertCrossLinks: () => [
      {
        type: 'output',
        regex: /<open5e-link src=([^>]+)>([^<]+)<\/open5e-link>/g,
        replace: '<cross-link src="$1">$2</cross-link>',
      },
    ],
  },
  mounted() {
    if (!this.src) {
      return;
    }
    axios.get(this.src).then((response) => {
      this.sourceText = response.data;
      this.scrollToRoute();
    });
  },
  methods: {
    scrollToRoute: function () {
      if (!this.$route.hash) {
        return;
      }
      this.$nextTick(() => {
        const hash = this.$route.hash;
        const container = this.$el.querySelector(hash);
        container.scrollIntoView({ behavior: 'smooth' });
      });
    },
  },
};
</script>

<style>
.markdown-inline {
  display: inline;
  * {
    display: inherit;
  }
}
</style>
