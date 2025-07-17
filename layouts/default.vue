<template>
  <!-- BACKGROUND (visible behind page content at wide screen widths)       -->
  <!-- bg-radial-gradiant arbitrary classes generate the dotted bg pattern  -->
  <div
    class="grid justify-center overflow-hidden bg-fog bg-[radial-gradient(#ddd_1px,transparent_1px)] [background-size:16px_16px] dark:bg-darkness dark:bg-[radial-gradient(#222_1px,transparent_1px)]"
  >
    <ModalSourceSelector
      :show="showModal"
      @close="showModal = false"
    />
    <div
      class="bg-dark m-auto grid h-full min-h-screen max-w-[1440px] grid-flow-col transition-all sm:ml-0 sm:w-screen sm:grid-cols-[14rem_1fr] sm:overflow-y-auto sm:transition-none"
      :class="showSidebar ? 'ml-56' : '-ml-56'"
    >
      <!-- Sidebar -->
      <div
        class="z-50 flex h-full w-56 flex-col overflow-y-auto bg-slate-700 text-white dark:bg-charcoal"
      >
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="bg-red p-5 font-serif text-3xl text-white hover:text-white"
        >
          Open5e
        </NuxtLink>

        <!-- SOURCE MODAL -->
        <button
          class="cursor-pointer bg-red-600 px-4 py-2 text-left hover:bg-red-400 dark:bg-red-700 dark:hover:bg-red-600"
          @click="showModal = true"
        >
          <span v-if="documents && no_selected_sources > 0">
            {{ no_selected_sources }} of {{ no_available_sources }} sources
          </span>
          <span
            v-else
            class="after:content-['_']"
          >Select Sources</span>

          <span v-if="isLoadingData">
            <Icon name="line-md:loading-twotone-loop" />
          </span>
          <span v-else>
            <Icon
              name="heroicons:pencil-square"
              class="size-5 text-white"
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
              class="size-8 rounded-full bg-red-900/25 p-1 text-white hover:bg-red-900/50"
              aria-hidden="true"
              @click="doSearch(searchText)"
            />
          </div>
          <input
            v-model="searchText"
            class="w-full bg-red-700 p-4 placeholder:font-semibold placeholder:text-white/80 focus:border-0 focus:bg-red-800 focus:outline-none dark:bg-red-800 dark:focus:bg-red-600"
            placeholder="Search Open5e"
            @keyup.enter="doSearch(searchText)"
          />
        </div>

        <!-- Sidebar Navigation -->
        <NavMenu />

        <!-- Report Issue UI -->
        <ModalReportIssue />

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
          <SidebarToggle
            class="sm:hidden"
            @click="toggleSidebar"
          />
          <BreadcrumbLinks class="grow" />
          <EncounterBuilderSummary
            v-if="!isEncounterVisible"
            @show-encounter="showEncounter"
          />
          <ThemeSwitcher />
        </div>

        <!-- Shade: fades out main content when sidebar expanded on mobile -->
        <div
          v-show="showSidebar"
          class="fixed left-0 top-0 z-48 size-full bg-basalt/50 sm:hidden"
          @click="hideSidebar"
        />

        <PageNotifications />

        <!-- Main content -->
        <div class="flex flex-col">
          <div class="flex">
            <div class="flex-1">
              <nuxt-page
                class="main-content pt-auto mx-0 w-full p-4 text-darkness dark:text-white sm:px-8"
              />
            </div>
            <div
              v-if="isEncounterVisible"
              class="top-0 hidden w-80 shrink-0 border-l lg:block"
            >
              <EncounterBuilder @hide-encounter="isEncounterVisible = false" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app';
import { computed } from 'vue';
import EncounterBuilder from '~/components/EncounterBuilder.vue';
import EncounterBuilderSummary from '~/components/EncounterBuilderSummary.vue';

// Generate page title from Breadcrumbs
const BASE_TITLE = 'Open5e';
const crumbs = useBreadcrumbs();
const title = computed(() => {
  if (crumbs.value.length === 0) return BASE_TITLE;
  return `${crumbs.value.at(-1).title} – ${BASE_TITLE}`;
});
useHead({ title: title });

const showSidebar = ref(false);
const isEncounterVisible = ref(false);
const route = useRoute();
watch(
  () => route.path,
  () => (showSidebar.value = false),
);

const searchText = ref(route.query.text);

const showModal = ref(false);
const { sources } = useSourcesList();

const no_selected_sources = computed(() => sources.value.length);

const { data: documents } = useDocuments({ fields: 'none' });

const no_available_sources = computed(() => documents.value?.length ?? 0);

const isLoadingData = useIsFetching();

const router = useRouter();

function doSearch(searchText) {
  router.push({ name: 'search', query: { text: searchText } });
  showSidebar.value = false;
}

const toggleSidebar = () => (showSidebar.value = !showSidebar.value);
const hideSidebar = () => (showSidebar.value = false);
const showEncounter = () => (isEncounterVisible.value = true);
</script>

<style>
.main-content {
  a {
    @apply text-indigo-600 hover:text-blood hover:underline dark:text-indigo-200 dark:hover:text-red;
  }
}
</style>
