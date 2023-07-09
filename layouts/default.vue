<template>
  <div class="overflow-hidden text-darkness">
    <SourcesModal :show="showModal" @close="showModal = false" />
    <div
      class="app-wrapper relative h-screen w-screen bg-white dark:bg-darkness"
      :class="{ 'show-sidebar': showSidebar }"
    >
      <!-- Sidebar -->
      <div
        class="sidebar relative z-50 flex flex-col bg-slate-700 text-white dark:bg-slate-900"
      >
        <!-- Logo -->
        <nuxt-link to="/" class="logo bg-red p-5 text-3xl">Open5e</nuxt-link>

        <div
          class="cursor-pointer bg-red-600 px-4 py-2 hover:bg-red-400 dark:bg-red-700 dark:hover:bg-red-600"
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
          <span v-show="isLoadingData">
            <Icon name="line-md:loading-twotone-loop" />
          </span>
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
            class="w-full bg-red-700 px-4 py-4 placeholder-white/80 placeholder:font-semibold focus:border-0 focus:bg-red-800 focus:outline-none dark:bg-red-800 dark:focus:bg-red-600"
            placeholder="Search Open5e"
            @keyup.enter="doSearch(searchText)"
          />
        </div>

        <!-- Navigation Links -->
        <ul class="text-inherit text-white">
          <li v-for="section in routes" :key="section.title">
            <nav-link :to="section.route"> {{ section.title }} </nav-link>
            <ul
              v-if="section.subroutes"
              v-show="useRoute().path.indexOf(section.route) != -1"
              class="bg-slate-800/30 py-2"
            >
              <li v-for="page in section.subroutes" :key="page.slug">
                <nav-link :to="`${section.route}/${page.slug}`" :indent="true">
                  {{ page.name }}
                </nav-link>
              </li>
            </ul>
          </li>
        </ul>

        <!-- Patron Banner -->
        <a
          class="mt-auto inline-block self-end"
          href="https://www.patreon.com/open5e"
        >
          <img
            src="/img/patron-badge.png"
            class="block w-full"
            alt="Become a patron! Keep Open5e ad free!"
          />
        </a>
      </div>

      <!-- Page central column -->
      <div
        class="content-wrapper bg-white text-darkness dark:bg-darkness dark:text-white"
      >
        <!-- Mobile Header -->
        <div
          class="mobile-header sticky z-60 h-12 flex-row justify-between bg-red text-3xl dark:bg-red-800"
        >
          <div
            class="sidebar-toggle flex h-full w-12 cursor-pointer items-center justify-center hover:bg-blood"
            @click="toggleSidebar"
          />
          <nuxt-link
            to="/"
            class="logo mb-1 self-center font-serif text-lg font-bold text-white"
          >
            Open5e
          </nuxt-link>
          <div class="h-12 w-12" />
        </div>

        <!-- Shade: fades out main content when sidebar expanded on mobile -->
        <div
          v-show="showSidebar"
          class="shade fixed left-0 top-0 z-48 h-full w-full bg-basalt/50"
          @click="hideSidebar"
        />
        <div class="flex">
          <breadcrumb-links class="flex-grow" />
          <theme-switcher class="inline-block" />
        </div>

        <!-- Main page content -->
        <nuxt-page class="page-content text-darkness dark:text-white" />
      </div>
    </div>
  </div>
</template>

<script>
import { useMainStore } from '../store/index';

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
      spellcastingClasses: [
        { name: 'Spells by Class', slug: 'by-class' },
        { name: 'Bard Spells', slug: 'by-class/bard' },
        { name: 'Cleric Spells', slug: 'by-class/cleric' },
        { name: 'Druid Spells', slug: 'by-class/druid' },
        { name: 'Paladin Spells', slug: 'by-class/paladin' },
        { name: 'Ranger Spells', slug: 'by-class/ranger' },
        { name: 'Wizard Spells', slug: 'by-class/wizard' },
        { name: 'Warlock Spells', slug: 'by-class/warlock' },
      ],
    };
  },
  computed: {
    documents: function () {
      return this.store.documents;
    },
    sourceSelection: function () {
      return this.store.sourceSelection;
    },

    isLoadingData: function () {
      return this.store.isLoadingData;
    },

    // returns an array of routes that the cmpnt iterates thru to create nav
    routes: function () {
      return [
        {
          title: 'Characters',
          route: '/characters',
          subroutes: this.store.sections.filter(
            (page) =>
              page.parent === 'Characters' ||
              page.parent === 'Character Advancement'
          ),
        },
        {
          title: 'Classes',
          route: '/classes',
          subroutes: this.store.classes,
        },
        {
          title: 'Races',
          route: '/races',
          subroutes: this.store.races,
        },
        {
          title: 'Backgrounds',
          route: '/backgrounds',
        },
        {
          title: 'Feats',
          route: '/feats',
        },
        {
          title: 'Combat',
          route: '/combat',
          subroutes: this.store.sections.filter(
            (page) => page.parent === 'Combat'
          ),
        },
        {
          title: 'Equipment',
          route: '/equipment',
          subroutes: this.store.sections.filter(
            (page) => page.parent === 'Equipment'
          ),
        },
        {
          title: 'Magic Items',
          route: '/magic-items',
        },
        {
          title: 'Spells',
          route: '/spells',
          subroutes: this.spellcastingClasses,
        },
        {
          title: 'Monsters',
          route: '/monsters',
        },
        {
          title: 'Gameplay Mechanics',
          route: '/gameplay-mechanics',
          subroutes: this.store.sections.filter(
            (page) => page.parent === 'Gameplay Mechanics'
          ),
        },
        {
          title: 'Running a Game',
          route: '/running',
          subroutes: this.store.sections.filter(
            (page) => page.parent === 'Rules'
          ),
        },
        {
          title: 'API Docs',
          route: '/api-docs',
        },
      ];
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

.shade {
  display: none;
}

.app-wrapper {
  display: flex;
  flex-direction: row;
  align-content: stretch;
}

.content-wrapper {
  padding: $content-padding-y $content-padding-x;
  overflow: auto;
  flex-grow: 1;
  max-width: 60rem;
}
.page-content {
  * > a {
    @apply text-indigo-600 hover:text-blood hover:underline dark:text-indigo-200 dark:hover:text-red;
  }
}

.logo {
  font-family: Lora, serif;
  display: block;
}

.mobile-header {
  display: none;
  width: calc(100% + 4rem);
  margin: (-$content-padding-y) (-$content-padding-x) 0;
}

.sidebar {
  width: $sidebar-width;
  min-width: $sidebar-width;
  overflow-y: auto;
}

.sidebar-toggle {
  background-image: url('/img/menu-button.png');
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
}

// These should be refactored using Tailwind breakpoints
@media (max-width: 600px) {
  .shade {
    display: block;
  }

  .app-wrapper {
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
        right: 2rem;
      }
    }
  }
}
</style>
