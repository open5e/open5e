<template>
  <div class="app-wrapper">
    <div class="sidebar">
      <div class="sticky-header">
        <nuxt-link tag="h1" to="/">Open5e</nuxt-link>
        <input class="input-search" 
          placeholder="Search Open5e"
          v-model="searchText" 
          v-on:keyup.enter="doSearch(searchText)">
      </div>  
      <ul v-show="sections[0] != 'loading'">
        <nuxt-link tag="li" to="/spells/spells-list">Spells</nuxt-link>
        <nuxt-link tag="li" to="/monsters/monster-list">Monsters</nuxt-link>
        <nuxt-link tag="li" to="/magicitems/magicitem-list">Magic Items</nuxt-link>
        <nuxt-link tag="li" to="/characters/">Characters</nuxt-link>
        <ul>
          <nuxt-link tag="li" :to="`/sections/${section.slug}`" v-for="section in sectionGroups.Characters" v-bind:key="section.slug">
            {{section.name}}
          </nuxt-link>
          <nuxt-link tag="li" to="/characters/races/">Races</nuxt-link>
          <ul>
            <nuxt-link v-for="race in races" v-bind:key="race.slug" tag="li" :to="`/characters/races/${race.slug}`">
              {{race.name}}
            </nuxt-link>
          </ul>
          <nuxt-link tag="li" to="/classes/">Classes</nuxt-link>
          <ul>
            <nuxt-link v-for="charClass in classes" v-bind:key="charClass.slug" tag="li" :to="`/classes/${charClass.slug}`">
              {{charClass.name}}
            </nuxt-link>
          </ul>
        </ul>
        <nuxt-link tag="li" to="/combat/">Combat</nuxt-link>
        <ul>
          <nuxt-link tag="li" to="/combat/actions">Actions in Combat</nuxt-link>
          <nuxt-link tag="li" to="/combat/attacking">Attacking</nuxt-link>
          <nuxt-link tag="li" to="/combat/combat-sequence">Combat Sequence</nuxt-link>
          <nuxt-link tag="li" to="/combat/cover">Cover</nuxt-link>
          <nuxt-link tag="li" to="/combat/damage-and-healing">Damage &amp; Healing</nuxt-link>
          <nuxt-link tag="li" to="/combat/mounted-combat">Mounted combat</nuxt-link>
          <nuxt-link tag="li" to="/combat/movement-in-combat">Movement in Combat</nuxt-link>
          <nuxt-link tag="li" to="/combat/underwater-combat">Underwater COmbat</nuxt-link>
        </ul>
        <nuxt-link tag="li" to="/gameplay-mechanics/">Gameplay Mechanics</nuxt-link>
        <ul>
          <nuxt-link tag="li" to="/gameplay-mechanics/ability-scores">Ability Scores</nuxt-link>
          <nuxt-link tag="li" to="/gameplay-mechanics/between-adventures">Between Adventures</nuxt-link>
          <nuxt-link tag="li" to="/gameplay-mechanics/conditions">Conditions</nuxt-link>
          <nuxt-link tag="li" to="/gameplay-mechanics/environment">Environment</nuxt-link>
          <nuxt-link tag="li" to="/gameplay-mechanics/movement">Movement</nuxt-link>
          <nuxt-link tag="li" to="/gameplay-mechanics/objects">Objects</nuxt-link>
          <nuxt-link tag="li" to="/gameplay-mechanics/rest">Rest</nuxt-link>
          <nuxt-link tag="li" to="/gameplay-mechanics/saving-throws">Saving Throws</nuxt-link>
          <nuxt-link tag="li" to="/gameplay-mechanics/time">Time</nuxt-link>
        </ul>
      </ul>
    </div>
    <div class="content-wrapper">
      <ol class="breadcrumb">
        <li v-for="item in crumbs" v-bind:key="item" class="breadcrumb-item">
          <nuxt-link :to="item.path" active-class="active">
            {{ item.breadcrumb }}
          </nuxt-link>
        </li>
      </ol>
      <nuxt/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

Array.prototype.groupBy = function(prop) {
  return this.reduce(function(groups, item) {
    const val = item[prop]
    groups[val] = groups[val] || []
    groups[val].push(item)
    return groups
  }, {})
}

const breadcrumbs = {
  // You should use / + name for the root route
  '/spells': 'Spells',
  // And just name of the page for child routes
  'profile-account': 'Account' 
}

export default {
  methods: {
    doSearch: function (searchText) {
      this.$router.push({ name: 'search', query: { text: searchText }})
    }
  },
  data() {
    return {
      searchText: this.$route.query.text,
      classes: ['loading'],
      races: ['loading'],
      sections: ['loading'],
      
    }
    
  },
  computed: {
    sectionGroups: function() {
      let groupedSections = this.sections.groupBy('parent');
      return groupedSections;
    },
    crumbs () {
      let crumbs = []
      this.$route.matched.forEach((item) => {
        if (breadcrumbs[item.name] || breadcrumbs[item.path]) {
          item.breadcrumb = breadcrumbs[item.name] || breadcrumbs[item.path]
          crumbs.push(item)
        }
      })

      return crumbs
    }
  },
  created () {
    axios.get(`/json/section-index.json`) //you will need to enable CORS to make this work
    .then(response => {
      this.sections = response.data
    })

    axios.get(`/json/class-index.json`) //you will need to enable CORS to make this work
    .then(response => {
      this.classes = response.data
    })

    axios.get(`/json/race-index.json`) //you will need to enable CORS to make this work
    .then(response => {
      this.races = response.data
    })
  },
}
</script>

<style lang="scss">
@import '../assets/main';

.app-wrapper {
  display: flex;
  flex-direction: row;
  align-content: stretch;
  height: 100vh;
  width: 100vw;
  background: $color-fog;
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 2;
}

.content-wrapper {
  padding: 2rem 1rem;
  overflow: auto;
  flex-grow: 1;
  background: white;
  max-width: 60rem;
}

.input-search {
  width: 100%;
  background: $color-blood;
  color: white;
  padding: 1rem;
  border: none;
  font-size: $font-size-base;
  outline: none;
  &::placeholder {
    color: white;
    opacity: 0.5;
  }
}

.sidebar {
  color: white;
  background-color: $color-basalt;
  width: 14rem;
  min-width: 14rem;
  overflow-y: auto;
  font-size: 15px;

  
  h1 {
    display: block;
    background-color: #E74C3C; 
    padding: 1rem 3rem 1rem 1rem;
    cursor: pointer;
    margin-top: 0;
  }

  ul {
    padding: $pad-sm $pad-md $pad-sm $pad-xs;
    list-style: none;
    li {
      padding: $pad-md $pad-md;
      opacity: 0.8;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }
      &.nuxt-link-active {
        font-weight: bold;
        opacity: 1;
      }
    }
    ul {
      background-color: $color-darkness;
      opacity: 0.8;
      padding: $pad-sm $pad-md $pad-sm $pad-lg;
      margin: 0 -1rem;
      
      li {
        padding: $pad-sm $pad-md;
      }
    }
  }
}
</style>

