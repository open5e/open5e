<template>
  <section class="container docs-container">
    <h2 class="filter-header">
      <span>Monster List</span>
      <filter-input v-on:input="updateFilter" placeholder="Filter monsters..."></filter-input>
    </h2>     
    <div>
        <table>
    <thead>
      <tr>
        <th class="monster-table-header" v-on:click="sort('name')">Name</th>
        <th class="monster-table-header" v-on:click="sort('type')">Type</th>
        <th class="monster-table-header" v-on:click="sort('challenge_rating')">CR</th>
        <th class="monster-table-header" v-on:click="sort('size')">Size</th>
          <th class="monster-table-header" v-on:click="sort('hit_points')">Hit Points</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="monster in monstersListed" :key="monster.name">
        <td>   <nuxt-link tag="a" 
            :params="{id: monster.slug}" 
            :to="`/monsters/${monster.slug}`">{{monster.name}}</nuxt-link>
        </td>
        <td>{{monster.type}}</td>
        <td>{{monster.challenge_rating}}</td>
        <td>{{monster.size}}</td>
        <td>{{monster.hit_points}}</td>
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
    return axios.get(`/json/monster-index.json`) //you will need to enable CORS to make this work
    .then(response => {
      this.monsters = response.data
    })
  },
  data () {
    return {
      monsters: [],
      filter: '', 
      currentSortProperty:'challenge_rating',
      currentSortDir:'asc'
    }
  },
  methods: {
    updateFilter: function(val) {
      this.filter = val;
    },
    monsterListLength: function() { 
      return Object.keys(this.monstersListed).length; 
    },
    sort:function(prop) {
        if(prop === this.currentSortProperty) {
           this.currentSortDir = this.currentSortDir === 'asc'?'desc':'asc';
        }
        this.currentSortProperty = prop;
        this.monstersListed = {};
    }
  }, 
  computed: {
     monstersListed:{
       get: function(){
          this.filteredMonsters.forEach(monster => monster.challenge_rating = eval(monster.challenge_rating));
          return this.filteredMonsters
        },
        set: function () {
            return this.filteredMonsters.sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'desc') modifier = -1;
                if(a[this.currentSortProperty] < b[this.currentSortProperty]) return -1 * modifier;
                if(a[this.currentSortProperty] > b[this.currentSortProperty]) return 1 * modifier;
                return 0;
            });
        }
    },
    filteredMonsters: function() { 
      return this.monsters.filter(monster => { 
         return monster.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1 
      }) 
    }
  }
}
</script>

<style scoped>
    .monster-table-header{
        text-decoration: underline;
        cursor: pointer;
        vertical-align: baseline;
    }

    .monster-table-header-class{
        vertical-align: baseline;
    }
</style>

