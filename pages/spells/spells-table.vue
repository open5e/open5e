<template>
  <section class="container">
    <h2 class="filter-header">
      Spell List
      <!-- <button style="text-decoration:underline;" v-on:click="getSpellsByProperty('letter')">Alphabetical</button>
      <button style="text-decoration:underline;" v-on:click="getSpellsByProperty('dnd_class')">Class</button> -->
      <filter-input v-on:input="updateFilter" placeholder="Filter spells..."></filter-input>
    </h2>     
    <div>
        <table>
    <thead>
      <tr>
        <th class="spell-table-header" v-on:click="sort('name')">Name</th>
        <th class="spell-table-header" v-on:click="sort('school')">School</th>
        <th class="spell-table-header" v-on:click="sort('level')">Level</th>
        <th class="spell-table-header" v-on:click="sort('components')">Component</th>
        <th class="spell-table-header-class">Class</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="spell in spellsListed" :key="spell.name">
        <td>   <nuxt-link tag="a" 
            :params="{id: spell.slug}" 
            :to="`/spells/${spell.slug}`">{{spell.name}}</nuxt-link>
        </td>
        <td>{{spell.school}}</td>
        <td>{{spell.level}}</td>
        <td>{{spell.components}}</td>
        <td><span v-for="(spellclass, index) in spell.dnd_class" :key="spellclass"><span class="dnd_class" v-on:click="filterByClass(spellclass)">{{spellclass}}</span><span v-if="index+1 < spell.dnd_class.length">, </span></span></td>
      </tr>
    </tbody>
  </table>
    </div>
   <span style="display:none;">Sorting by sort={{currentSortProperty}}, dir={{currentSortDir}}</span>
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
      // Until api sends arrays this will work to sort spells by class.
      this.spells.map((item)=>{
          item.dnd_class = item.dnd_class.split(",");
          for(var i = 0; i < item.dnd_class.length; i++){
              item.dnd_class[i].trim();
          }
      })
    //
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
           this.currentSortDir = this.currentSortDir === 'asc'?'desc':'asc';
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
    .spell-table-header{
        text-decoration: underline;
        cursor: pointer;
        vertical-align: baseline;
    }

    .spell-table-header-class{
        vertical-align: baseline;
    }
</style>

