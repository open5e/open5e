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
        <button
          class="cursor-pointer bg-red-600 px-4 py-2 text-left hover:bg-red-400 dark:bg-red-700 dark:hover:bg-red-600"
          @click="showModal = true"
        >
          <span v-if="documents && no_selected_sources > 0">
            {{ no_selected_sources }} of {{ no_available_sources }} sources
          </span>
          <span v-else class="after:content-['_']">Select Sources</span>

          <span v-if="isLoadingData">
            <icon name="line-md:loading-twotone-loop" />
          </span>
          <span v-else>
            <icon
              name="heroicons:pencil-square"
              class="h-5 w-5 text-white"
              aria-hidden="true"
            />
          </span>
        </button>

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

        <!-- Sidebar Navigation -->
        <NavBar />

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

        <div class="flex h-12 items-center gap-1 px-2 sm:pl-8">
          <SidebarToggle class="sm:hidden" @click="toggleSidebar" />
          <BreadcrumbLinks class="flex-grow" />
          <ThemeSwitcher />
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

// Generate page title from Breadcrumbs
const BASE_TITLE = 'Open5e';
const crumbs = useBreadcrumbs();
const title = computed(() => {
  if (crumbs.value.length === 0) return BASE_TITLE;
  return `${crumbs.value.at(-1).title} – ${BASE_TITLE}`;
});
useHead({ title: title });

const showSidebar = ref(false);
const route = useRoute();
watch(
  () => route.path,
  () => (showSidebar.value = false)
);

const searchText = ref(route.query.text);

const showModal = ref(false);
const { sources } = useSourcesList();

const no_selected_sources = computed(() => sources.value.length);

const { data: documents } = useDocuments({
  fields: 'none', // we only need to document count, so we can omit all fields
  depth: 0,
});

const no_available_sources = computed(() => documents.value?.length ?? 0);

const isLoadingData = useIsFetching();

const router = useRouter();

function doSearch(searchText) {
  router.push({ name: 'search', query: { text: searchText } });
  showSidebar.value = false;
}

const toggleSidebar = () => (showSidebar.value = !showSidebar.value);
const hideSidebar = () => (showSidebar.value = false);
</script>

<style lang="scss">
@import '../assets/main';

.main-content {
  a {
    @apply text-indigo-600 hover:text-blood hover:underline dark:text-indigo-200 dark:hover:text-red;
  }
}
</style>
