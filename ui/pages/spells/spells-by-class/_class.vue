<template>
  <section class="container">
    <h2 class="filter-header">
      {{this.$route.params.class}} Spell List 
      <filter-input v-on:input="updateFilter" placeholder="Filter spells..."></filter-input>
    </h2>     
    <div>
    <p v-if="!spellListLength" >No results</p> 
      <ul class="list--items" 
        v-bind:key="level[0].level_int" 
        v-for="(level, key) in spellsByLevel">

        <h3 v-if="!filter">{{key}}</h3>
          <li v-bind:key="spell.name" v-for="spell in level">
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
    return axios.get(`http://localhost:8000/spells/?fields=slug,name,level&limit=1000&ordering=level_int,name&search=${this.$route.params.class}`) //you will need to enable CORS to make this work
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
    spellsByLevel: function () {
      let levels = {};
      for (let i = 0; i < this.filteredSpells.length; i++){ 
        let level = this.filteredSpells[i].level;
        if (!(level in levels)) {
          levels[level] = [];
        }
        levels[level].push(this.filteredSpells[i]); 
      }
      return levels
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
      return this.filteredSpells.length;
    } 
  }
}
</script>

<style scoped>

</style>

