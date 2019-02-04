<template>
  <section class="container">
    <h2 class="filter-header">
      Spell List 
      <filter-input v-on:input="updateFilter" placeholder="Filter spells..."></filter-input>
    </h2>     
    <nuxt-link tag="a" class="table-link" to="/spells/spell-tables">(View As Table)</nuxt-link>
    <div :class="{'three-column': !filter}">
    <p v-if="!spellListLength" >No results</p> 
      <ul class="list--items" 
        v-bind:key="letter[0].name.charAt(0)" 
        v-for="(letter, key) in spellsByLetter">

        <h3 v-if="!filter">{{key.toUpperCase()}}</h3>
          <li v-bind:key="spell.name" v-for="spell in letter">
            <nuxt-link tag="a" 
            :params="{id: spell.slug}" 
            :to="`/spells/${spell.slug}`">
              {{spell.name}}
            </nuxt-link>
          </li>
      </ul>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import FilterInput from '~/components/FilterInput.vue'
export default {
  components: {
    FilterInput
  },
  mounted () {
    return axios.get(`${process.env.apiUrl}/spells/?fields=slug,name&limit=1000`) //you will need to enable CORS to make this work
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
  methods: {
    updateFilter: function(val) {
      this.filter = val;
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
.table-link{
  font-size: 0.5em;
  text-decoration: underline;
}
</style>
