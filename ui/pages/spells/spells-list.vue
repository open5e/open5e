<template>
  <section class="container">
    <h2>Spells A-Z</h2>
    <div class="three-column">
    <ul class="list--items" 
      v-bind:key="letter[0].name.charAt(0)" 
      v-for="(letter, key) in spellsByLetter">

      <h3>{{key.toUpperCase()}}</h3>
        <li v-bind:key="spell.name" v-for="spell in letter">
          <nuxt-link tag="a" 
            :params="{id: spell.id}" 
            :to="`/spells/view/${spell.id}`">

            {{spell.name}}
          </nuxt-link>
        </li>
    </ul>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  mounted () {
    return axios.get(`http://localhost:8000/spells/?fields=id,name&limit=1000`) //you will need to enable CORS to make this work
    .then(response => {
      this.spells = response.data.results
    })
  },
  data () {
    return {
      spells: [],
    }
  },
  computed: {
    // a computed getter
    spellsByLetter: function () {
      let letters = {};
      for (let i = 0; i < this.spells.length; i++){
        let firstLetter = this.spells[i].name.charAt(0).toLowerCase();
        if (!(firstLetter in letters)) {
          letters[firstLetter] = [];
        }
        letters[firstLetter].push(this.spells[i]);
      }
      console.log(letters);
      return letters
    }
  }
}
</script>

<style scoped>

</style>

