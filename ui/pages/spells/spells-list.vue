<template>
  <section class="container">
    <h2>Spell Lists</h2>
      <div class="two-column">
        <h3>By class</h3>
        <ul class="list--items">
          <li v-bind:key="dnd_class" v-for="dnd_class in classes">
            <nuxt-link tag="a" 
            :params="{class: dnd_class}" 
            :to="`/spells/spells-by-class/${dnd_class}`">
              {{dnd_class}}
            </nuxt-link>
          </li>
        </ul>
        <h3>By school</h3>
        <ul class="list--items">
          <li v-bind:key="school" v-for="school in schools">
            <nuxt-link tag="a" 
            :params="{class: school}" 
            :to="`/spells/spells-by-school/${school}`">
              {{school}}
            </nuxt-link>
          </li>
        </ul>
      </div>
    <h2 class="filter-header">
      All spells
      <filter-input v-on:input="updateFilter" placeholder="Filter spells..."></filter-input>
    </h2>     
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
    return axios.get(`http://localhost:8000/spells/?fields=slug,name&limit=1000`) //you will need to enable CORS to make this work
    .then(response => {
      this.spells = response.data.results
    })
  },
  data () {
    return {
      spells: [],
      filter: '', 
      classes: ['Bard','Cleric','Druid','Paladin','Ranger','Sorcerer','Warlock','Wizard',],
      schools: ['Abjuration','Conjuration','Divination','Enchantment','Evocation','Illusion','Necromancy','Transmutation',],
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

</style>

