<template>
  <section class="container">
    <h2 class="filter-header">
      Spell Table HERE
      <!-- <button style="text-decoration:underline;" v-on:click="getSpellsByProperty('letter')">Alphabetical</button>
      <button style="text-decoration:underline;" v-on:click="getSpellsByProperty('dnd_class')">Class</button> -->
      <filter-input v-on:input="updateFilter" placeholder="Filter spells..."></filter-input>
    </h2>     
    <div>
        <table>
    <thead>
      <tr>
        <th v-on:click="sort('name')">Name</th>
        <th v-on:click="sort('school')">School</th>
        <th v-on:click="sort('level')">Level</th>
        <th v-on:click="sort('components')">Components</th>
        <th v-on:click="sort('concentration')">Concentration</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="spell in spellsListed" :key="spell.name">
        <td>{{spell.name}}</td>
        <td>{{spell.school}}</td>
        <td>{{spell.level}}</td>
        <td>{{spell.components}}</td>
        <td>{{spell.concentration}}</td>
      </tr>
    </tbody>
  </table>
    </div>
   <span style="display:none;"> sort={{currentSortProperty}}, dir={{currentSortDir}}</span>
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
    return axios.get(`${process.env.apiUrl}/spells/?fields=slug,name,dnd_class,school,level,concentration,components&limit=1000`) //you will need to enable CORS to make this work
    .then(response => {
      this.spells = response.data.results
    })
  },
  data () {
    return {
      spells: [],
      filter: '', 
      currentSortProperty:'name',
      currentSortDir:'asc'
    }
  },
  methods: {
    updateFilter: function(val) {
      this.filter = val;
    },
    spellListLength: function() { 
      return Object.keys(this.spellsListed).length; 
    },
    sort:function(prop) {
        if(prop === this.currentSortProperty) {
        this.currentSortPropertyDir = this.currentSortDir==='asc'?'desc':'asc';
        }
        this.currentSortProperty = prop;
        this.spellsListed = {};
    }
  },
  computed: {
    // a computed getter
    spellsListed:{
       get: function(){    
          return this.filteredSpells
        },
        set: function () {
            return this.filteredSpells.sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'desc') modifier = -1;
                if(a[this.currentSortProperty] < b[this.currentSortProperty]) return -1 * modifier;
                if(a[this.currentSortProperty] > b[this.currentSortProperty]) return 1 * modifier;
                return 0;
            });
        }
    },
    filteredSpells: function() { 
      return this.spells.filter(spell => { 
         return spell.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1 
      }) 
    }
  }
}
</script>

<style scoped>

</style>

