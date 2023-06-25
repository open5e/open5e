<template>
  <div class="layout">
    <SourcesModal :show="showModal" @close="showModal = false" />
    <div class="app-wrapper" :class="{ 'show-sidebar': showSidebar }">
      <div class="sidebar">
        <nuxt-link to="/" class="logo"> Open5e </nuxt-link>
        <div
          class="cursor-pointer bg-red-600 px-4 py-2 hover:bg-red-400"
          @click="showModal = true"
        >
          <span v-if="documents.length">
            {{ sourceSelection.length }} of {{ documents.length }} sources
            <Icon
              name="heroicons:pencil-square"
              class="h-5 w-5 text-white"
              aria-hidden="true"
            />
          </span>
          <span v-else>Loading sources...</span>
          <span v-show="isLoadingData"
            ><Icon name="line-md:loading-twotone-loop"
          /></span>
        </div>
        <div class="relative">
          <div
            class="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-2"
          >
            <Icon
              name="majesticons:search-line"
              class="h-8 w-8 rounded-full bg-red-900/25 p-1 text-white hover:bg-red-900/50"
              aria-hidden="true"
              @click="doSearch(searchText)"
            />
          </div>
          <input
            v-model="searchText"
            class="w-full bg-red-700 px-4 py-4 placeholder-white/80 placeholder:font-semibold focus:border-0 focus:bg-red-800 focus:outline-none"
            placeholder="Search Open5e"
            @keyup.enter="doSearch(searchText)"
          />
        </div>
        <ul v-if="sections && races && classes">
          <!-- Characters -->
          <li>
            <nuxt-link to="/characters/"> Characters </nuxt-link>
            <ul
              v-show="
                useRoute().path.indexOf('/characters') != -1 ||
                containsAnyString(charSections)
              "
            >
              <li v-for="section in charSections" :key="section.slug">
                <nuxt-link :to="`/sections/${section.slug}`">
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
                <nuxt-link :to="`/classes/${charClass.slug}`">
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
          <!-- Combat -->
          <li>
            <nuxt-link to="/combat/"> Combat </nuxt-link>
            <ul v-show="useRoute().path.indexOf('/combat/') != -1">
              <li>
                <nuxt-link to="/combat/actions"> Actions in Combat </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/combat/attacking"> Attacking </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/combat/combat-sequence">
                  Combat Sequence
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/combat/cover"> Cover </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/combat/damage-and-healing">
                  Damage &amp; Healing
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/combat/mounted-combat">
                  Mounted combat
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/combat/movement-in-combat">
                  Movement in Combat
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/combat/underwater-combat">
                  Underwater Combat
                </nuxt-link>
              </li>
            </ul>
          </li>
          <!-- Equipment -->
          <li>
            <nuxt-link to="/sections/equipment/"> Equipment </nuxt-link>
            <ul v-show="containsAnyString(sectionGroups.Equipment)">
              <li
                v-for="section in sectionGroups.Equipment"
                :key="section.slug"
              >
                <nuxt-link :to="`/sections/${section.slug}`">
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
              <li>
                <nuxt-link to="/gameplay-mechanics/ability-scores">
                  Ability Scores
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/gameplay-mechanics/between-adventures">
                  Between Adventures
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/gameplay-mechanics/conditions">
                  Conditions
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/gameplay-mechanics/environment">
                  Environment
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/gameplay-mechanics/movement">
                  Movement
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/gameplay-mechanics/rest"> Rest </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/gameplay-mechanics/saving-throws">
                  Saving Throws
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/gameplay-mechanics/time"> Time </nuxt-link>
              </li>
            </ul>
          </li>
          <!-- Running a Game -->
          <li>
            <nuxt-link to="/running/"> Appendixes </nuxt-link>
            <ul
              v-show="
                useRoute().path.indexOf('/running') != -1 ||
                containsAnyString(sectionGroups.Characters)
              "
            >
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
        <a class="sidebar-link" href="https://www.patreon.com/open5e"
          ><img
            src="/img/patron-badge.png"
            class="sidebar-image"
            alt="Become a patron! Keep Open5e ad free!"
        /></a>
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
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';

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
      showModal: false,
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
    documents: function () {
      return this.store.documents;
    },
    sourceSelection: function () {
      return this.store.sourceSelection;
    },
    sectionGroups: function () {
      let groupedSections = this.sections.groupBy('parent');
      return groupedSections;
    },
    isLoadingData: function () {
      return this.store.isLoadingData;
    },
    charSections: function () {
      if (this.sectionGroups.hasOwnProperty('Characters')) {
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
      } else {
        return [];
      }
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
  mounted() {
    this.store.loadClasses();
    this.store.loadSections();
    this.store.loadRaces();
    this.store.initializeSources();
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
    z-index: 40;
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
  z-index: 60;

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
  @apply bg-slate-700 text-white;
  width: $sidebar-width;
  min-width: $sidebar-width;
  overflow-y: auto;
  font-size: 15px;
  position: relative;
  z-index: 50;
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

  // General sidebar styling
  ul {
    li {
      a {
        &:hover {
          opacity: 1;
          @apply hover:bg-slate-800/40;
        }

        &.router-link-active {
          font-weight: bold;
          opacity: 1;
          @apply bg-slate-900/60;
        }
      }
    }
  }
  // Style the root elements of the sidebar only
  > ul > li {
    a {
      display: block;
      @apply px-4 py-3;
    }
    // and the child elements of the sidebar (eg classes under "class")
    ul {
      @apply bg-slate-800/30 py-2;
      & > li > a {
        @apply py-1 pl-8 pr-4;
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
    background: rgba($color-basalt, 0.5);
    z-index: 48;
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
