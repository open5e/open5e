<template>
  <section class="container">
    <div>
        <div class="monster-block" v-bind:key="spell.name" v-for="spell in spells">
          <nuxt-link tag="h2" :params="{id: spell.id}" :to="`/spells/view/${spell.id}`">{{spell.name}}</nuxt-link>
        </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  mounted () {
    return axios.get(`http://localhost:8000/spells`) //you will need to enable CORS to make this work
    .then(response => {
      this.spells = response.data.results
    })
  },
  data () {
    return {
      spells: [],
    }
  },
}
</script>

<style>
.monster-block {
  margin-top: 1rem;
}
</style>

