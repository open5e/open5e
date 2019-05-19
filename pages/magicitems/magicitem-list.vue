<template>
  <section class="container">
    <h2 class="filter-header">
      <span>Magic Item List</span>
      <filter-input v-on:input="updateFilter" placeholder="Filter items..."></filter-input>
    </h2>     
    <div :class="{'three-column': !filter}">
    <p v-if="!itemListLength" >No results</p> 
      <ul class="list--items" 
        v-bind:key="letter[0].name.charAt(0)" 
        v-for="(letter, key) in itemsByLetter">

        <h3 v-if="!filter">{{key.toUpperCase()}}</h3>
          <li v-bind:key="item.name" v-for="item in letter">
            <nuxt-link tag="a" 
            :params="{id: item.slug}" 
            :to="`/magicitems/${item.slug}`">
              {{item.name}}
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
    console.log(process.env.apiUrl)
    return axios.get(`${process.env.apiUrl}/magicitems/?fields=slug,name&limit=1000`) //you will need to enable CORS to make this work
    .then(response => {
      this.items = response.data.results
    })
  },
  data () {
    return {
      items: [],
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
    itemsByLetter: function () {
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
      return this.items.filter(item => { 
         return item.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1 
      }) 
    }, 
    columnClassObject: function() { 
      return { 
        'three-column': !this.filter, 
      } 
    }, 
    itemListLength: function() { 
      return Object.keys(this.itemsByLetter).length; 
    } 
  }
}
</script>

<style scoped>

</style>

