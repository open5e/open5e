<template>
  <section class="container docs-container">
    <h1>{{race.name}}</h1>
    <vue-markdown :source="race.desc"></vue-markdown>
    <vue-markdown :source="race['asi-desc']"></vue-markdown>
    <vue-markdown :source="race['speed-desc']"></vue-markdown>
    <vue-markdown :source="race.vision"></vue-markdown>
    <vue-markdown :source="race.age"></vue-markdown>
    <vue-markdown :source="race.alignment"></vue-markdown>
    <vue-markdown :source="race.size"></vue-markdown>
    <vue-markdown :source="race.languages"></vue-markdown>
    <vue-markdown :source="race.traits"></vue-markdown>

    <h2 v-if="race.subtypes">Subraces</h2>
    <div v-for="subrace in race.subtypes" v-bind:key="subrace.name">
      <h3>{{subrace.name}}</h3>
      <vue-markdown :source="subrace.desc"></vue-markdown>
      <vue-markdown :source="subrace['asi-desc']"></vue-markdown>
      <vue-markdown :source="subrace.traits"></vue-markdown>
    </div>
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
    return axios.get(`/json/races/${this.$route.params.id}.json`) //you will need to enable CORS to make this work
    .then(response => {
      this.race = response.data
      console.log(response.data)
    })
  },
  data () {
    return {
      posts: [],
      errors: [],
      race: [],
    }
  },
}
</script>

<style lang="scss">
</style>

