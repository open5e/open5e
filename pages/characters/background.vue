<template>
  <section class="container docs-container">
    <md-viewer :src="`/markdown${file}.md`"></md-viewer>
  </section>
</template>

<script>
import MdViewer from '~/components/MdViewer';
import { useMainStore } from "~/store"

export default {
  components: {
    MdViewer
  },
  setup() {
    const store = useMainStore()
    return { store }
  },
  data: function () {
    return {
      file: useRoute().path
    }
  },
  mounted() {
    this.store.loadBackgrounds();
  },
  methods: {
    updateFilter: function (val) {
      this.filter = val;
    },
  },
  computed: {
    backgroundsList: function () {
      return this.store.allBackgrounds;
    }
  }
}
</script>



<style></style>

