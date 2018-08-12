<template>
  <section class="container">
    <h2>Spells List</h2>     
    <input type="text" v-model="filter"> 
    <div :class="{'three-column': !filter}">
    <p v-if="!spellListLength" >No results</p> 
      <ul class="list--items" 
        v-bind:key="letter[0].name.charAt(0)" 
        v-for="(letter, key) in spellsByLetter">

        <h3 v-if="!filter">{{key.toUpperCase()}}</h3>
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
      filter: '', 
    }
  },
  computed: {
    // a computed getter
    spellsByLetter: function () {
      let letters = {};
      for (let i = 0; i < this.filteredSpells.length; i++){ 
        let firstLetter = this.filteredSpells[i].name.charAt(0).toLowerCase(); 
        if (!(firstLetter in letters)) {
          letters[firstLetter] = [];
        }
        letters[firstLetter].push(this.filteredSpells[i]); 
      }
      console.log(letters);
      return letters
    },
    filteredSpells: function() { 
      return this.spells.filter(spell => { 
         return spell.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1 
      }) 
    }, 
    columnClassObject: function() { 
      return { 
        'three-column': !this.filter, 
      } 
    }, 
    spellListLength: function() { 
      return Object.keys(this.spellsByLetter).length; 
    } 
  }
}
</script>

<style scoped>

</style>

