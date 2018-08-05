<template>
  <section class="container">
    <div>
        <div class="monster-block" v-bind:key="monster.name" v-for="monster in monsters">
          <nuxt-link tag="h2" :params="{id: monster.id}" :to="`/monsters/view/${monster.id}`">{{monster.name}}</nuxt-link>
        </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import StatBonus from '~/components/StatBonus.vue'

export default {
  components: {
    StatBonus
  },
  mounted () {
    return axios.get(`http://localhost:8000/monsters`) //you will need to enable CORS to make this work
    .then(response => {
      this.monsters = response.data.results
    })
  },
  data () {
    return {
      monsters: [],
    }
  },
}
</script>

<style>
.monster-block {
  margin-top: 1rem;
}
</style>

