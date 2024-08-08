<template>
  <div class="overflow-hidden text-darkness">
    <sources-modal :show="showModal" @close="showModal = false" />
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
          <span v-if="documents">
            {{ no_selected_sources }} of {{ no_avilable_sources }} sources
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

        <!-- Report Issue UI -->
        <report-issue />

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

        <page-notifications />

        <!-- Main page content -->
        <nuxt-page
          class="main-content pt-auto mx-0 w-full px-4 py-4 pb-0 text-darkness dark:text-white sm:px-8"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'nuxt/app';
import { computed } from 'vue';

const spellcastingClasses = [
  { name: 'Spells by Class', slug: 'by-class' },
  { name: 'Bard Spells', slug: 'by-class/bard' },
  { name: 'Cleric Spells', slug: 'by-class/cleric' },
  { name: 'Druid Spells', slug: 'by-class/druid' },
  { name: 'Paladin Spells', slug: 'by-class/paladin' },
  { name: 'Ranger Spells', slug: 'by-class/ranger' },
  { name: 'Wizard Spells', slug: 'by-class/wizard' },
  { name: 'Warlock Spells', slug: 'by-class/warlock' },
];
const showSidebar = ref(false);

const $route = useRoute();

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
      let searchParam = '';
      if (title === 'search' && queryParams) {
        searchParam = queryParams.split('text=')[1].split('+').join(' ');
      }

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
  const crumb_titles = crumbs.value.map((crumb) => crumb.title);
  const reversed_titles = [...crumb_titles].reverse();

  return reversed_titles.join(' - ') + ` - ${BASE_TITLE}`;
});
useHead({ title: title });
const searchText = ref($route.query.text);

watch(
  () => $route.path,
  () => {
    showSidebar.value = false;
  }
);

const showModal = ref(false);
const { sources } = useSourcesList();

const no_selected_sources = computed(() => sources.value.length);
const { data: documents } = useDocuments();
const { data: classes } = useFindMany(API_ENDPOINTS.classes, {
  fields: ['name', 'slug'].join(),
});
const { data: races } = useFindMany(API_ENDPOINTS.races, {
  fields: ['name', 'slug'].join(),
});
const { data: combat_sections } = useSections('Combat');
const { data: equipment_sections } = useSections('Equipment');
const { data: gameplay_sections } = useSections('Gameplay Mechanics');
const { data: rules_sections } = useSections('Rules');

const { data: character_sections } = useSections(
  'Characters',
  'Character Advancement'
);

const no_avilable_sources = computed(() => documents.value?.length ?? 0);

const isLoadingData = useIsFetching();

const routes = computed(() => [
  {
    title: 'Characters',
    route: '/characters',
    subroutes: character_sections.value ?? [],
  },
  {
    title: 'Classes',
    route: '/classes',
    subroutes: classes.value ?? [],
  },
  {
    title: 'Conditions',
    route: '/conditions',
  },
  {
    title: 'Races',
    route: '/races',
    subroutes: races.value ?? [],
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
    subroutes: combat_sections.value ?? [],
  },
  {
    title: 'Equipment',
    route: '/equipment',
    subroutes: equipment_sections.value ?? [],
  },
  {
    title: 'Magic Items',
    route: '/magic-items',
  },
  {
    title: 'Spells',
    route: '/spells',
    subroutes: spellcastingClasses,
  },
  {
    title: 'Monsters',
    route: '/monsters',
  },
  {
    title: 'Gameplay Mechanics',
    route: '/gameplay-mechanics',
    subroutes: gameplay_sections.value ?? [],
  },
  {
    title: 'Running a Game',
    route: '/running',
    subroutes: rules_sections.value ?? [],
  },
  {
    title: 'API Docs',
    route: '/api-docs',
  },
]);

const $router = useRouter();

function doSearch(searchText) {
  $router.push({ name: 'search', query: { text: searchText } });
  showSidebar.value = false;
}

function toggleSidebar() {
  showSidebar.value = !showSidebar.value;
}
function hideSidebar() {
  showSidebar.value = false;
}
</script>

<style lang="scss">
@import '../assets/main';

.main-content {
  a {
    @apply text-indigo-600 hover:text-blood hover:underline dark:text-indigo-200 dark:hover:text-red;
  }
}
</style>
