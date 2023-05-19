<template>
  <section class="container docs-container">
    <md-viewer :src="`/markdown${file}.md`"></md-viewer>
  </section>
</template>

<script>
import MdViewer from '~/components/MdViewer';

export default {
  components: {
    MdViewer
  },
  data: function () {
    return {
      file: useRoute().path
    }
  }
}
</script>

<style></style>

