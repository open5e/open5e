<template>
  <section class="container docs-container">
    <md-viewer :src="`/markdown${file}.md`"></md-viewer>
  </section>
</template>

<script>
import MdViewer from '~/components/MdViewer';
import VueRouter from 'vue-router'
import { mapMutations, mapActions } from 'vuex'

export default {
  components: {
    MdViewer
  },
  data: function () {
    return {
      file: this.$router.currentRoute.path
    }
  },
  mounted() {
    this.$store.dispatch('LOAD_BACKGROUNDS')
  },
  methods: {
    updateFilter: function(val) {
      this.filter = val;
    },
  }, 
  computed: {
     ...mapActions({
       LOAD_BACKGROUNDS: 'LOAD_BACKGROUNDS'
     }),
     backgroundsList () {
      return this.$store.getters.allBackgrounds
     },
  }
}
</script>



<style>
</style>

