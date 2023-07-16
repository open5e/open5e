<template>
  <div>
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
    />
  </div>
</template>

<script>
import axios from 'axios';
import { VueShowdown } from 'vue-showdown';
export default {
  name: 'MdViewer',
  components: { VueShowdown },
  props: {
    src: {
      type: String || undefined,
      default: undefined,
    },
    toc: {
      type: Boolean,
      default: true,
    },
    text: {
      type: String,
      default: 'loading...',
    },
    headerLevel: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      sourceText: '',
    };
  },
  computed: {
    mdText: function () {
      if (this.sourceText) {
        return this.sourceText;
      } else {
        return this.text;
      }
    },
    // Showdown extension for inserting cross-links into markdown
    insertCrossLinks: () => [
      {
        type: 'output',
        regex: /<(spell|monster):(\w+)>(\w+)<\/(spell|monster)>/g,
        replace: '<cross-link href="/$1s/$2">$3</cross-link>',
      },
    ],
  },
  mounted() {
    if (this.src) {
      axios.get(this.src).then((response) => {
        this.sourceText = response.data;
        this.scrollToRoute();
      });
    }
  },
  methods: {
    scrollToRoute: function () {
      if (this.$route.hash) {
        this.$nextTick(() => {
          const hash = this.$route.hash;
          const container = this.$el.querySelector(hash);
          container.scrollIntoView({ behavior: 'smooth' });
        });
      }
    },
  },
};
</script>

<style lang="scss"></style>
