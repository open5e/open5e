<template>
  <div class="overflow-hidden text-darkness">
    <SourcesModal :show="showModal" @close="showModal = false" />
    <div
      class="grid h-screen w-screen grid-flow-col bg-white transition-all dark:bg-darkness sm:ml-0 sm:grid-cols-[14rem_1fr] sm:overflow-y-auto sm:transition-none"
      :class="showSidebar ? 'ml-0' : '-ml-56'"
    >
      <!-- Sidebar -->
      <div
        class="z-50 flex w-56 flex-col overflow-y-auto bg-slate-700 text-white dark:bg-slate-900"
      >
        <!-- Logo -->
        <nuxt-link
          to="/"
          class="bg-red p-5 font-serif text-3xl text-white hover:text-white"
        >
          Open5e
        </nuxt-link>

        <!-- SOURCE MODAL -->
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
        <!-- SEARCH BAR -->
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
        <a href="https://www.patreon.com/open5e">
          <img
            src="/img/patron-badge.png"
            class="block w-full"
            alt="Become a patron! Keep Open5e ad free!"
          />
        </a>
      </div>

      <!-- Page central column -->
      <div
        class="content-wrapper w-screen overflow-y-auto bg-white text-darkness dark:bg-darkness dark:text-white sm:w-full"
      >
        <!-- Site Header -->

        <div class="flex h-12 align-middle">
          <sidebar-toggle @click="toggleSidebar" />
          <breadcrumb-links class="flex-grow" />
          <theme-switcher class="inline-block" />
        </div>

        <!-- Shade: fades out main content when sidebar expanded on mobile -->
        <div
          v-show="showSidebar"
          class="fixed left-0 top-0 z-48 h-full w-full bg-basalt/50 sm:hidden"
          @click="hideSidebar"
        />

        <!-- Main page content -->
        <nuxt-page
          class="main-content pt-auto mx-0 w-full px-4 py-4 pb-0 text-darkness dark:text-white sm:px-8"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useMainStore } from '../store/index';
import { useRoute } from 'nuxt/app';
import { computed } from 'vue';

export default {
  setup() {
    const store = useMainStore();

    const crumbs = computed(() => {
      let url = '';

      return useRoute()
        .fullPath.split('/')
        .map((segment) => {
          // ignore initial & trailing slashes
          if (segment === '' || segment === '/') {
            return;
          }

          // rebuild link urls segment by segment
          url += `/${segment}`;

          // seperate segment title & query params
          const [title, queryParams] = segment.split('?');

          // extract & format the search params if on the /search route
          const searchParam =
            title === 'search' &&
            queryParams.split('text=')[1].split('+').join(' ');

          // return a
          return {
            url,
            title: title // format crumb title
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' '),
            subtitle: searchParam,
          };
        })
        .filter((breadcrumb) => breadcrumb);
    });
    provide('crumbs', crumbs);

    const BASE_TITLE = 'Open5e';

    const title = computed(() => {
      if (crumbs.value.length === 0) {
        return BASE_TITLE;
      }
      return (
        crumbs.value
          .map((crumb) => crumb.title)
          .toReversed()
          .join(' - ') + ` - ${BASE_TITLE}`
      );
    });
    useHead({ title: title });
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

.main-content {
  a {
    @apply text-indigo-600 hover:text-blood hover:underline dark:text-indigo-200 dark:hover:text-red;
  }
}
</style>
