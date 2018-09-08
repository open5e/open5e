<template>
  <section class="container docs-container">
    <h2>Monster List</h2>     
    <input type="text" v-model="filter"> 
    <div :class="{'three-column': !filter}">
    <p v-if="!monsterListLength" >No results</p> 
      <ul class="list--items" 
        v-bind:key="letter[0].name.charAt(0)" 
        v-for="(letter, key) in monstersByLetter">

        <h3 v-if="!filter">{{key.toUpperCase()}}</h3>
          <li v-bind:key="monster.name" v-for="monster in letter">
            <nuxt-link tag="a" 
              :params="{id: slugify(monster.name)}" 
              :to="`/monsters/view/${monster.slug}`">

              {{monster.name}}
            </nuxt-link>
          </li>
      </ul>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import StatBonus from '~/components/StatBonus.vue'

export default {
  components: {
    StatBonus
  },
  mounted () {
    return axios.get(`/json/monster-index.json`) //you will need to enable CORS to make this work
    .then(response => {
      console.log(response.data);
      this.monsters = response.data
    })
  },
  data () {
    return {
      monsters: [],
      filter: '',
    }
  },
  methods: {
    slugify: function(text) {
        return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    }
  },  
  computed: {
    monstersByLetter: function () {
      let letters = {};
      for (let i = 0; i < this.filteredMonsters.length; i++){ 
        let firstLetter = this.filteredMonsters[i].name.charAt(0).toLowerCase(); 
        if (!(firstLetter in letters)) {
          letters[firstLetter] = [];
        }
        letters[firstLetter].push(this.filteredMonsters[i]); 
      }
      console.log(letters);
      return letters
    },
    filteredMonsters: function() { 
      return this.monsters.filter(monster => { 
         return monster.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1 
      }) 
    }, 
    columnClassObject: function() { 
      return { 
        'three-column': !this.filter, 
      } 
    }, 
    monsterListLength: function() { 
      return Object.keys(this.monstersByLetter).length; 
    } 
  }
}
</script>

<style>
.monster-block {
  margin-top: 1rem;
}
</style>

