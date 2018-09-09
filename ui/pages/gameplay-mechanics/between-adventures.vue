<template>
  <section class="container docs-container">
    <md-viewer :src="`/markdown${file}.md`"></md-viewer>
  </section>
</template>

<script>
import MdViewer from '~/components/MdViewer';
import VueRouter from 'vue-router'

export default {
  components: {
    MdViewer
  },
  data: function () {
    return {
      file: this.$router.currentRoute.path
    }
  }
}
</script>

<style>
</style>

