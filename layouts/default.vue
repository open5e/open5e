<template>
  <div class="layout">
    <div class="app-wrapper" :class="{ 'show-sidebar': showSidebar }">
      <div class="sidebar">
        <nuxt-link to="/" class="logo"> Open5e </nuxt-link>
        <input
          v-model="searchText"
          class="input-search"
          placeholder="Search Open5e"
          @keyup.enter="doSearch(searchText)"
        />
        <ul v-if="sections && races && classes">
          <!-- Characters -->
          <li>
            <nuxt-link to="/characters/"> Characters </nuxt-link>
            <ul v-show="useRoute().path.indexOf('/characters') != -1">
              <li v-for="section in charSections" :key="section.slug">
                <nuxt-link :to="`/characters/${section.slug}`">
                  {{ section.name }}
                </nuxt-link>
              </li>
            </ul>
          </li>
          <!-- Classes -->
          <li>
            <nuxt-link to="/classes"> Classes </nuxt-link>
            <ul v-show="useRoute().path.indexOf('/classes') != -1">
              <li v-for="charClass in classes" :key="charClass.slug">
                <nuxt-link
                  :class="{
                    'router-link-active':
                      useRoute().path.indexOf(`/classes/${charClass.slug}`) ===
                      0,
                  }"
                  :to="`/classes/${charClass.slug}`"
                >
                  {{ charClass.name }}
                </nuxt-link>
              </li>
            </ul>
          </li>
          <!-- Races -->
          <li>
            <nuxt-link to="/races"> Races </nuxt-link>
            <ul v-if="races" v-show="useRoute().path.indexOf('/races') != -1">
              <li v-for="race in races" :key="race.slug">
                <nuxt-link :to="`/races/${race.slug}`">
                  {{ race.name }}
                </nuxt-link>
              </li>
            </ul>
          </li>

          <!-- Backgrounds -->
          <li>
            <nuxt-link
              to="/backgrounds"
              :class="{
                'router-link-active':
                  useRoute().path.indexOf('/backgrounds') === 0,
              }"
            >
              Backgrounds
            </nuxt-link>
          </li>

          <li>
            <nuxt-link
              to="/feats"
              tag="a"
              :class="{
                'router-link-active': useRoute().path.indexOf('/feats') === 0,
              }"
            >
              Feats
            </nuxt-link>
          </li>

          <!-- Combat -->
          <li v-if="combatSections.length > 0">
            <nuxt-link to="/combat/"> Combat </nuxt-link>
            <ul
              v-if="combatSections"
              v-show="useRoute().path.indexOf('/combat/') != -1"
            >
              <li v-for="section in sectionGroups.Combat" :key="section.slug">
                <nuxt-link :to="`/combat/${section.slug}`">
                  {{ section.name }}
                </nuxt-link>
              </li>
            </ul>
          </li>

          <!-- Equipment -->
          <li>
            <nuxt-link to="/equipment/"> Equipment </nuxt-link>
            <ul v-show="useRoute().path.indexOf('/equipment/') != -1">
              <li
                v-for="section in sectionGroups.Equipment"
                :key="section.slug"
              >
                <nuxt-link :to="`/equipment/${section.slug}`">
                  {{ section.name }}
                </nuxt-link>
              </li>
            </ul>
          </li>
          <!-- Magic Items -->
          <li>
            <nuxt-link
              :class="{
                'router-link-active':
                  useRoute().path.indexOf('/magicitems') === 0,
              }"
              to="/magicitems/magicitem-list"
            >
              Magic Items
            </nuxt-link>
          </li>
          <!-- Spells -->
          <li>
            <nuxt-link
              :class="{
                'router-link-active': useRoute().path.indexOf('/spells') === 0,
              }"
              to="/spells/spells-table"
            >
              Spells
            </nuxt-link>
            <ul v-show="useRoute().path.indexOf('/spells/') !== -1">
              <li>
                <nuxt-link to="/spells/by-class/bard"> Bard Spells </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/spells/by-class/cleric">
                  Cleric Spells
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/spells/by-class/druid">
                  Druid Spells
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/spells/by-class/paladin">
                  Paladin Spells
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/spells/by-class/sorcerer">
                  Sorcerer Spells
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/spells/by-class/wizard">
                  Wizard Spells
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/spells/by-class/warlock">
                  Warlock Spells
                </nuxt-link>
              </li>
            </ul>
          </li>
          <!-- Monsters -->
          <li>
            <nuxt-link
              :class="{
                'router-link-active':
                  useRoute().path.indexOf('/monsters') === 0,
              }"
              to="/monsters/monster-list"
            >
              Monsters
            </nuxt-link>
          </li>
          <!-- Gameplay Mechanics -->
          <li>
            <nuxt-link to="/gameplay-mechanics/">
              Gameplay Mechanics
            </nuxt-link>
            <ul v-show="useRoute().path.indexOf('/gameplay-mechanics/') !== -1">
              <li v-for="section in mechanicsSections" :key="section.slug">
                <nuxt-link :to="`/gameplay-mechanics/${section.slug}`">
                  {{ section.name }}
                </nuxt-link>
              </li>
            </ul>
          </li>
          <!-- Running a Game -->
          <li>
            <nuxt-link to="/running/">Running a Game</nuxt-link>
            <ul v-show="useRoute().path.indexOf('/running') != -1">
              <li v-for="section in sectionGroups.Rules" :key="section.slug">
                <nuxt-link :to="`/running/${section.slug}`">
                  {{ section.name }}
                </nuxt-link>
              </li>
            </ul>
          </li>
          <li>
            <nuxt-link to="/api-docs"> API Docs </nuxt-link>
          </li>
        </ul>
        <a class="sidebar-link" href="https://www.patreon.com/open5e">
          <img
            src="/img/patron-badge.png"
            class="sidebar-image"
            alt="Become a patron! Keep Open5e ad free!"
          />
        </a>
      </div>
      <div class="content-wrapper">
        <div class="mobile-header">
          <div class="sidebar-toggle" @click="toggleSidebar" />
          <nuxt-link to="/" class="logo"> Open5e </nuxt-link>
          <div class="spacer" />
        </div>
        <ol class="breadcrumb">
          <li v-for="item in crumbs" :key="item" class="breadcrumb-item">
            <nuxt-link :to="item.path" active-class="active">
              {{ item.breadcrumb }}
            </nuxt-link>
          </li>
        </ol>
        <div v-show="showSidebar" class="shade" @click="hideSidebar" />
        <nuxt-page />
        <footer>
          <a href="/legal/">Content provided under the OGL 1.0a</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { useMainStore } from '../store/index';

Array.prototype.groupBy = function (prop) {
  return this.reduce(function (groups, item) {
    const val = item[prop];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {});
};

const breadcrumbs = {
  // You should use / + name for the root route
  '/spells': 'Spells',
  // And just name of the page for child routes
  'profile-account': 'Account',
};

export default {
  setup() {
    const store = useMainStore();
    return { store };
  },
  data() {
    return {
      searchText: this.$route.query.text,
      showSidebar: false,
    };
  },
  computed: {
    classes: function () {
      return this.store.classes;
    },
    sections: function () {
      return this.store.sections;
    },
    races: function () {
      return this.store.races;
    },
    sectionGroups: function () {
      let groupedSections = this.sections.groupBy('parent');
      return groupedSections;
    },
    charSections: function () {
      if (!this.sectionGroups.hasOwnProperty('Characters')) {
        return [];
      }

      let results = this.sectionGroups['Characters'].concat(
        this.sectionGroups['Character Advancement']
      );

      return results.sort(function (a, b) {
        if (a.slug < b.slug) {
          return -1;
        } else if (a.slug > b.slug) {
          return 1;
        } else {
          return 0;
        }
      });
    },
    combatSections: function () {
      return this.sectionGroups['Combat'] ?? [];
    },

    mechanicsSections: function () {
      return this.sectionGroups['Gameplay Mechanics'] ?? [];
    },

    crumbs() {
      let crumbs = [];
      this.$route.matched.forEach((item) => {
        if (breadcrumbs[item.name] || breadcrumbs[item.path]) {
          item.breadcrumb = breadcrumbs[item.name] || breadcrumbs[item.path];
          crumbs.push(item);
        }
      });

      return crumbs;
    },
  },
  watch: {
    $route(to, from) {
      this.showSidebar = false;
    },
  },
  beforeCreate() {
    this.store.loadClasses();
    this.store.loadSections();
    this.store.loadRaces();
  },
  methods: {
    doSearch: function (searchText) {
      this.$router.push({ name: 'search', query: { text: searchText } });
      this.showSidebar = false;
    },
    containsCurrentRoute: function (routes) {
      var currentRoute = useRoute().path;
      for (var i = 0; i < routes.length; i++) {
        if (currentRoute.search(routes[i])) {
          return true;
        }
      }
      return false;
    },
    containsAnyString: function (strings) {
      var contains = false;
      if (typeof strings !== 'undefined') {
        for (var i = 0; i < strings.length; i++) {
          if (useRoute().path.indexOf(strings[i].slug) !== -1) {
            contains = true;
          }
        }
        return contains;
      }
    },
    toggleSidebar: function () {
      this.showSidebar = !this.showSidebar;
    },
    hideSidebar: function () {
      this.showSidebar = false;
    },
  },
};
</script>

<style lang="scss">
@import '../assets/main';

.layout {
  overflow: hidden;
}

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
  position: sticky;
  top: 0;
  width: 100%;
  background: $color-blood;
  color: white;
  padding: 1rem;
  border: none;
  font-size: $font-size-base;
  outline: none;
  z-index: 2;

  &::placeholder {
    color: white;
    opacity: 0.6;
  }
}

footer {
  margin-top: 1rem;
  font-size: 0.8rem;
  display: block;
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid $color-fog;
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

  a {
    color: white;
  }

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

    &:hover {
      background-color: $color-blood;
      cursor: pointer;
    }
  }

  .logo {
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
  display: flex;
  flex-direction: column;

  a {
    color: white;
  }

  .sidebar-link {
    display: inline-block;
    align-self: flex-end;
    margin-top: auto;
  }

  .sidebar-image {
    width: 100%;
    display: block;
  }

  .logo {
    display: block;
    background-color: $color-fireball;
    padding: 1rem 3rem 1rem 1rem;
    cursor: pointer;
    margin-top: 0;
    font-family: Lora, serif;
    font-weight: 600;
    font-size: 2em;
  }

  ul {
    padding: $pad-sm $pad-md $pad-sm $pad-xs;
    list-style: none;

    li {
      a {
        opacity: 0.8;

        &:hover {
          opacity: 1;
        }

        &.router-link-active {
          font-weight: bold;
          opacity: 1;
        }
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

  > ul > li > a {
    display: block;
    padding: $pad-md $pad-md;
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
    background: rgba($color-basalt, 0.5);
    z-index: 500;
  }

  .app-wrapper {
    position: relative;
    margin-left: -$sidebar-width;
    transition: margin-left 250ms ease;

    .mobile-header {
      display: flex;
    }

    .container {
      padding: 0;
    }

    .content-wrapper {
      min-width: 100vw;
    }

    .sidebar {
      min-width: $sidebar-width;
    }
  }

  .app-wrapper.show-sidebar {
    margin-left: 0;
  }
}

@media (min-width: 1200px) {
  .app-wrapper {
    .content-wrapper {
      max-width: calc(100vw - 24rem);
      overflow-x: visible;

      .side-note {
        // position: absolute;
        right: 2rem;
      }
    }
  }
}
</style>
