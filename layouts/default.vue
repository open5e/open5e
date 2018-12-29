<template>
  <div>
    <div class="app-wrapper" :class="{ 'show-sidebar': showSidebar }">
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
          <ul v-show="containsCurrentRoute(['/characters/', '/classes/']) || containsAnyString(sectionGroups.Characters)">
            <nuxt-link tag="li" :to="`/sections/${section.slug}`" v-for="section in sectionGroups.Characters" v-bind:key="section.slug">
              {{section.name}}
            </nuxt-link>
            <nuxt-link tag="li" to="/characters/races/">Races</nuxt-link>
            <ul v-show="$nuxt.$route.path.indexOf('/characters/races/') === 0">
              <nuxt-link v-for="race in races" v-bind:key="race.slug" tag="li" :to="`/characters/races/${race.slug}`">
                {{race.name}}
              </nuxt-link>
            </ul>
            <nuxt-link tag="li" to="/classes/">Classes</nuxt-link>
            <ul v-show="$nuxt.$route.path.indexOf('/classes/') === 0">
              <nuxt-link v-for="charClass in classes" v-bind:key="charClass.slug" tag="li" :to="`/classes/${charClass.slug}`">
                {{charClass.name}}
              </nuxt-link>
            </ul>
          </ul>
          <nuxt-link tag="li" to="/gameplay-mechanics/">Gameplay Mechanics</nuxt-link>
          <ul v-show="$nuxt.$route.path.indexOf('/gameplay-mechanics/') === 0 || containsAnyString(sectionGroups.Rules)">
            <nuxt-link tag="li" to="/gameplay-mechanics/ability-scores">Ability Scores</nuxt-link>
            <nuxt-link tag="li" to="/gameplay-mechanics/between-adventures">Between Adventures</nuxt-link>
            <nuxt-link tag="li" to="/gameplay-mechanics/conditions">Conditions</nuxt-link>
            <nuxt-link tag="li" to="/gameplay-mechanics/environment">Environment</nuxt-link>
            <nuxt-link tag="li" to="/gameplay-mechanics/movement">Movement</nuxt-link>
            <nuxt-link tag="li" to="/gameplay-mechanics/rest">Rest</nuxt-link>
            <nuxt-link tag="li" to="/gameplay-mechanics/saving-throws">Saving Throws</nuxt-link>
            <nuxt-link tag="li" to="/gameplay-mechanics/time">Time</nuxt-link>
            <nuxt-link tag="li" :to="`/sections/${section.slug}`" v-for="section in sectionGroups.Rules" v-bind:key="section.slug">
              {{section.name}}
            </nuxt-link>
          </ul>
          <nuxt-link tag="li" to="/combat/">Combat</nuxt-link>
          <ul v-show="$nuxt.$route.path.indexOf('/combat/') === 0">
            <nuxt-link tag="li" to="/combat/actions">Actions in Combat</nuxt-link>
            <nuxt-link tag="li" to="/combat/attacking">Attacking</nuxt-link>
            <nuxt-link tag="li" to="/combat/combat-sequence">Combat Sequence</nuxt-link>
            <nuxt-link tag="li" to="/combat/cover">Cover</nuxt-link>
            <nuxt-link tag="li" to="/combat/damage-and-healing">Damage &amp; Healing</nuxt-link>
            <nuxt-link tag="li" to="/combat/mounted-combat">Mounted combat</nuxt-link>
            <nuxt-link tag="li" to="/combat/movement-in-combat">Movement in Combat</nuxt-link>
            <nuxt-link tag="li" to="/combat/underwater-combat">Underwater COmbat</nuxt-link>
          </ul>
          <nuxt-link tag="li" to="/sections/equipment/">Equipment</nuxt-link>
          <ul v-show="containsAnyString(sectionGroups.Equipment)">
            <nuxt-link tag="li" :to="`/sections/${section.slug}`" v-for="section in sectionGroups.Equipment" v-bind:key="section.slug">
              {{section.name}}
            </nuxt-link>
          </ul>
        </ul>
      </div>
      <div class="content-wrapper">
        <div class="mobile-header">
          <div class="sidebar-toggle" @click="toggleSidebar"></div>
          <nuxt-link tag="h1" to="/">Open5e</nuxt-link>
          <div class="spacer"></div>
        </div>
        <ol class="breadcrumb">
          <li v-for="item in crumbs" v-bind:key="item" class="breadcrumb-item">
            <nuxt-link :to="item.path" active-class="active">
              {{ item.breadcrumb }}
            </nuxt-link>
          </li>
        </ol>
        <div class="shade" v-show="showSidebar" @click="hideSidebar"></div>
        <nuxt />
      </div>
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
    },
    containsCurrentRoute: function(routes) {
      var currentRoute = this.$nuxt.$route.path;
      for(var i = 0; i < routes.length; i++) {
        if (currentRoute.indexOf(routes[i]) === 0) return true;
      }
      return false;
    },
    containsAnyString: function(strings) {
      var contains = false
      if (typeof strings !== 'undefined' ) {
        for (var i = 0; i < strings.length; i++) {
          if (this.$nuxt.$route.path.indexOf(strings[i].slug) !== -1){
            contains = true;
          }
        }
        return contains;
      }
    },
    toggleSidebar: function() {
      this.showSidebar = !this.showSidebar;
    },
    hideSidebar: function() {
      this.showSidebar = false
    }
  },
  data() {
    return {
      searchText: this.$route.query.text,
      classes: ['loading'],
      races: ['loading'],
      sections: ['loading'],
      showSidebar: false,
    }
    
  },
  computed: {
    sectionGroups: function() {
      let groupedSections = this.sections.groupBy('parent');
      console.log(groupedSections);
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

.shade {
  display: none;
}

.app-wrapper {
  display: flex;
  flex-direction: row;
  align-content: stretch;
  height: 100vh;
  width: 100vw;
  background: $color-fog;
  position: relative;
}

.content-wrapper {
  padding: $content-padding-y $content-padding-x;
  overflow: auto;
  flex-grow: 1;
  background: white;
  max-width: 60rem;
  .sticky-header {
    position: sticky;
    top: 0;
    z-index: 999;
  }
}

.input-search {
  width: 100%;
  background: $color-blood;
  color: white;
  padding: 1rem;
  border: none;
  font-size: $font-size-base;
  outline: none;
}

.mobile-header {
  display: none;
  width: calc(100% + 4rem);
  top: -1rem;
  height: 3rem;
  background-color: $color-fireball;
  position: sticky;
  color: white;
  flex-direction: row;
  justify-content: space-between;
  margin: (-$content-padding-y) (-$content-padding-x) 0;
  z-index: 6000;


  .sidebar-toggle {
    display: flex;
    height: 100%;
    width: 3rem;
    justify-content: center;
    align-items: center;
    background-image: url('/img/menu-button.png');
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;

    &:hover{
      background-color: $color-blood;
      cursor: pointer;
    }
  }

  h1 {
    display: inline-block;
    margin: 0;
    padding: 0;
  }

  .spacer {
    width: 3rem;
    height: 3rem;
  }
}

.sidebar {
  color: white;
  background-color: $color-basalt;
  width: $sidebar-width;
  min-width: $sidebar-width;
  overflow-y: auto;
  font-size: 15px;
  position: relative;
  z-index: 1000;

  
  h1 {
    display: block;
    background-color: $color-fireball; 
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

@media (max-width: 600px) {

  .shade {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba($color-basalt, .5);
    z-index: 500;
  }
  .app-wrapper {
    position: relative;
    margin-left: calc(-100vw+3rem);
    transition: margin-left 250ms ease;

    .mobile-header {
      display: flex;
    }

    .content-wrapper {
      min-width: 100vw;
    }
    
    .sidebar {
      min-width: calc(100vw - 3rem);
    }
  }
  .app-wrapper.show-sidebar {
    margin-left: 0;
  }
}
</style>

