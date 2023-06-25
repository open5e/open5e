<template>
  <section class="docs-container container">
    <md-viewer :src="`/markdown${file}.md`" />
  </section>
</template>

<script>
import MdViewer from '~/components/MdViewer';

export default {
  components: {
    MdViewer,
  },
  data: function () {
    return {
      file: useRoute().path,
    };
  },
};
</script>

<style></style>
