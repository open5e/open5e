<template>
  <section class="container">
    <h2 class="filter-header">
      <span class="title-case">{{filter}} spells</span>
      <p class="class-selector">
        <!-- <label>Select a class: </label>
        <select v-model="filter">
          <option :key="charClass" :value="charClass" :selected="charClass.toLowerCase() == filter" v-for='charClass in available_classes'>{{charClass}}</option>
        </select> -->
      </p>
    </h2>     
    <div :class="'three-column'">
    <p v-if="!spellListLength" >No results</p> 
      <ul class="list--items" 
        v-bind:key="level.lvl" 
        v-for="(level) in spellsByLevel">

        <h3>{{level.lvlText}}</h3>
          <li v-bind:key="spell.name" v-for="spell in level.spells">
            <nuxt-link tag="a" 
            :params="{id: spell.slug}" 
            :to="`/spells/${spell.slug}`">
              {{spell.name}}
            </nuxt-link>
            <source-tag v-if="spell.document__slug && spell.document__slug !== 'wotc-srd'" class="" :title="spell.document__title" :text="spell.document__slug"></source-tag>
          </li>
      </ul>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import FilterInput from '~/components/FilterInput.vue'
import SourceTag from '~/components/SourceTag.vue'
import * as _ from 'underscore'
export default {
  components: {
    FilterInput,
    SourceTag
  },
  mounted () {
    this.filter = this.$route.params.charclass
    return axios.get(`${process.env.apiUrl}/spells/?fields=slug,name,level_int,level,dnd_class,document__slug&limit=1000`) //you will need to enable CORS to make this work
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
      for (let i = 0; i < this.filteredSpells.length; i++){ 
        let spellLevel = this.filteredSpells[i].level_int;
        var found=false
        for (let j = 0; j < levels.length; j++) {
          if (levels[j].lvl == spellLevel){
            levels[j].spells.push(this.filteredSpells[i]);
            found=true
          }
        }
        if (!found) {
          levels.push({lvl: spellLevel, lvlText: this.filteredSpells[i].level, spells: [this.filteredSpells[i]]});
        }
      }
      if (levels.length > 0) {
        levels = levels.sort(function (a, b) { return a.lvl - b.lvl });
      } else { return false }
      return levels
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