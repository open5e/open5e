<template>
  <section class="container">
    <div>
        <div v-bind:key="monster.name" v-for="monster in monsters">
          <h2>{{monster.name}}</h2> 
          <p>AC {{monster.armor_class}}</p>
          <p>STR {{monster.strength}} (+{{Math.floor(( monster.strength - 10 ) / 2)}})</p>
        </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import axios from 'axios'

export default {
  components: {
    AppLogo
  },
  mounted () {
    return axios.get(`http://localhost:8000/monsters`) //you will need to enable CORS to make this work
    .then(response => {
      this.monsters = response.data.results
    })
  },
  data () {
    return {
      posts: [],
      errors: [],
      monsters: [],
    }
  },
}
</script>

<style>
</style>

