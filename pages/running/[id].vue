<template>
  <section class="container docs-container">
    <h1>{{ section.name }}</h1>
    <md-viewer :text="section.desc"></md-viewer>
  </section>
</template>

<script>
import axios from 'axios'
import MdViewer from '~/components/MdViewer';

export default {
  components: {
    MdViewer
  },
  mounted() {
    return axios.get(`${this.$nuxt.$config.public.apiUrl}/sections/${this.$route.params.id}`) //you will need to enable CORS to make this work
      .then(response => {
        this.section = response.data
      })
  },
  data() {
    return {
      posts: [],
      errors: [],
      section: [],
    }
  },
}
</script>

<style lang="scss"></style>

