<template>
  <section class="container docs-container">
    <h1>{{section.name}}</h1>
    <md-viewer :text="section.desc"></md-viewer>
    <h2 v-if="section.slug === 'backgrounds'">Character backgrounds</h2>
    <article v-for="background in backgroundsList" v-bind:key="background.slug" v-if="section.slug === 'backgrounds'">
      <h3>{{background.name}}</h3>
      <p>{{background.desc}}</p>
      <p v-if="background.languages"><b>Languages.</b> {{background.languages}}</p>
      <p v-if="background.tool_proficiencies"><b>Tool proficiencies.</b> {{background.tool_proficiencies}}</p>
      <p v-if="background.skill_proficiencies"><b>Skill proficiencies.</b> {{background.skill_proficiencies}}</p>
      <p><b>Equipment.</b> {{background.equipment}}</p>
      <h4>Special feature: {{background.feature}}</h4>
      <p>{{background.feature_desc}}</p>
    </article>
  </section>
</template>

<script>
import axios from 'axios'
import MdViewer from '~/components/MdViewer';

import { mapMutations, mapActions } from 'vuex'

export default {
  components: {
    MdViewer
  },
  data: function () {
    return {
      file: this.$router.currentRoute.path,
      posts: [],
      errors: [],
      section: [],
    }
  },
  beforeCreate() {
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
  },
  mounted () {
    return axios.get(`${process.env.apiUrl}/sections/${this.$route.params.id}`) //you will need to enable CORS to make this work
    .then(response => {
      this.section = response.data
    })
  },
}
</script>

<style lang="scss">
</style>

