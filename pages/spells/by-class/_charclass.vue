<template>
  <section class="container">
    <h2 class="filter-header">
      <span class="title-case">{{filter}} spells</span>
      <p class="class-selector">
        <label>Select a class: </label>
        <select v-model="filter">
          <option :key="charClass" :value="charClass" :selected="charClass.toLowerCase() == filter" v-for='charClass in available_classes'>{{charClass}}</option>
        </select>
      </p>
    </h2>     
    <nuxt-link tag="a" class="table-link" to="/spells/spell-tables">(View As Table)</nuxt-link>
    <div :class="'three-column'">
    <p v-if="!spellListLength" >No results</p> 
      <ul class="list--items" 
        v-bind:key="level.lvl" 
        v-for="(level, key) in spellsByLevel">

        <h3 v-if="level.lvl !== 'Can'">{{level.lvl}}-level</h3>
        <h3 v-if="level.lvl == 'Can'">Cantrips</h3>
          <li v-bind:key="spell.name" v-for="spell in level.spells">
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
import * as _ from 'underscore'
export default {
  components: {
    FilterInput
  },
  mounted () {
    this.filter = this.$route.params.charclass
    return axios.get(`${process.env.apiUrl}/spells/?fields=slug,name,level,dnd_class&limit=1000`) //you will need to enable CORS to make this work
    .then(response => {
      this.spells = response.data.results
    })
  },
  data () {
    return {
      spells: [],
      filter: "", 
      available_classes: ['Bard', 'Cleric', 'Sorcerer', 'Wizard', 'Druid', 'Paladin', 'Warlock' ],
    }
  },
  methods: {
    updateFilter: function(val) {
      this.filter = val;
    }
  },
  computed: {
    spellsByLevel: function () {
      let levels = [];
      let sortedLevels = [];
      for (let i = 0; i < this.filteredSpells.length; i++){ 
        let spellLevel = this.filteredSpells[i].level.slice(0,3);
        var found=false
        for (let j = 0; j < levels.length; j++) {
          if (levels[j].lvl == spellLevel){
            levels[j].spells.push(this.filteredSpells[i]);
            found=true
          }
        }
        if (!found) {
          levels.push({lvl: spellLevel, spells: [this.filteredSpells[i]]});
        }
      }
      if (levels) {
        sortedLevels = levels.sort(function (a, b) {
          return ('' + a.lvl).localeCompare(b.lvl);
        });
      } else { return false }
      return sortedLevels
    },
    filteredSpells: function() { 
      if (this.filter){
        return this.spells.filter(spell => { 
          return spell.dnd_class.toLowerCase().indexOf(this.$data.filter.toLowerCase()) > -1 
        }) 
      }
      else 
      return this.spells;
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

<style lang="scss" scoped>
.table-link{
  font-size: 0.5em;
  text-decoration: underline;
}
.title-case {
  text-transform: capitalize;
}

.class-selector {
  font-size: 1rem;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  flex-grow: 1;
  text-align: right;
}
</style>