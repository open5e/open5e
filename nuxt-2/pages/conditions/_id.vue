<template>
  <section class="container docs-container">
    <h1>{{condition.name}}</h1>
    <md-viewer :text="condition.desc"></md-viewer>
  </section>
</template>

<script>
import axios from 'axios'
import MdViewer from '~/components/MdViewer';

export default {
  components:{
    MdViewer
  },
  mounted () {
    return axios.get(`${process.env.apiUrl}/conditions/${this.$route.params.id}`) //you will need to enable CORS to make this work
    .then(response => {
      this.condition = response.data
    })
  },
  data () {
    return {
      posts: [],
      errors: [],
      condition: [],
    }
  },
}
</script>

<style lang="scss">
</style>

