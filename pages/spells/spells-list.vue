<template>
  <section class="container">
    <h2 class="filter-header">
      Spell List 
      <button style="text-decoration:underline;" v-on:click="getSpellsByProperty('letter')">Alphabetical</button>
      <button style="text-decoration:underline;" v-on:click="getSpellsByProperty('dnd_class')">Class</button>
      <filter-input v-on:input="updateFilter" placeholder="Filter spells..."></filter-input>
    </h2>     
    <!--  <div :class="{'three-column': !filter}" v-if="spellsArrangedByProperty === 'letter'">
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
    </div> -->

    <div :class="{'three-column': !filter}" v-if="spellsArrangedByProperty">
    <p v-if="!spellListLength" >No results</p> 
      <ul class="list--items" 
        v-bind:key="letter.name" 
        v-for="(letter, key) in spellsListed">

        <h3 v-if="!filter">{{key}}</h3>
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
    return axios.get(`${process.env.apiUrl}/spells/?fields=slug,name,dnd_class,school&limit=1000`) //you will need to enable CORS to make this work
    .then(response => {
      this.spells = response.data.results
    })
  },
  data () {
    return {
      spells: [],
      filter: '', 
      spellsArrangedByProperty: 'letter'
    }
  },
  methods: {
    updateFilter: function(val) {
      this.filter = val;
    },
    getSpellsByProperty: function(property){
      console.log(property);
      if(property === 'letter'){
        let letters = {};
        for (let i = 0; i < this.filteredSpells.length; i++){ 
          let firstLetter = this.filteredSpells[i].name.charAt(0).toLowerCase(); 
          if (!(firstLetter in letters)) {
            letters[firstLetter] = [];
          }
          letters[firstLetter].push(this.filteredSpells[i]); 
        }
        this.spellsListed = letters;
        this.spellsArrangedByProperty= 'letters';
      }
      if(property === 'dnd_class'){
        let classes = {};
        for (let i = 0; i < this.filteredSpells.length; i++){
          this.filteredSpells[i].dnd_class.split(',').reduce((acc, single_class) => {
            var className = single_class.trim()
            if(!classes[className]){
              classes[className] = [];
            }
            classes[className].push(this.filteredSpells[i]);
          },{})
        }
        console.log(classes);
         this.spellsListed = classes;
         this.spellsArrangedByProperty= 'dnd_class';
      }
    }, 
    spellListLength: function() { 
      return Object.keys(this.spellsListed).length; 
    } 
  },
  computed: {
    // a computed getter
    spellsListed:{
       get: function(){
       let letters = {};
       for (let i = 0; i < this.filteredSpells.length; i++){ 
              let firstLetter = this.filteredSpells[i].name.charAt(0).toLowerCase(); 
              if (!(firstLetter in letters)) {
                letters[firstLetter] = [];
              }
              letters[firstLetter].push(this.filteredSpells[i]); 
            }
          return letters;
         },
      set: function (newValue) {
        alert('setter!!!' + newValue[0]);
        return newValue
      }
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
    }
  }
}
</script>

<style scoped>

</style>

