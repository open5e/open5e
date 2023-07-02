<template>
  <section class="docs-container container">
    <md-viewer :src="`/markdown${file}.md`" />
  </section>
</template>

<script>
import MdViewer from '~/components/MdViewer';
import { useMainStore } from '~/store';

export default {
  components: {
    MdViewer,
  },
  setup() {
    const store = useMainStore();
    return { store };
  },
  data: function () {
    return {
      file: useRoute().path,
    };
  },
  computed: {
    backgroundsList: function () {
      return this.store.allBackgrounds;
    },
  },
  mounted() {
    this.store.loadBackgrounds();
  },
  methods: {
    updateFilter: function (val) {
      this.filter = val;
    },
  },
};
</script>

<style></style>
