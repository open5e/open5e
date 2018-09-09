<template>
  <section class="container docs-container">
    <h1>{{section.name}}</h1>
    <vue-markdown :source="section.desc" :watches="['source']"></vue-markdown>
  </section>
</template>

<script>
import axios from 'axios'
import VueMarkdown from 'vue-markdown'

export default {
  components:{
    VueMarkdown,
  },
  mounted () {
    return axios.get(`/json/sections/${this.$route.params.id}.json`) //you will need to enable CORS to make this work
    .then(response => {
      this.section = response.data
    })
  },
  data () {
    return {
      posts: [],
      errors: [],
      section: [],
    }
  },
}
</script>

<style lang="scss">
</style>

