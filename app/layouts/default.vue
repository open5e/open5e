<template>
  <!-- BACKGROUND (visible behind page content at wide screen widths)       -->
  <!-- bg-radial-gradiant arbitrary classes generate the dotted bg pattern  -->
  <div
    class="grid justify-center overflow-hidden bg-fog bg-[radial-gradient(#ddd_1px,transparent_1px)] [background-size:16px_16px] dark:bg-darkness dark:bg-[radial-gradient(#222_1px,transparent_1px)]"
  >
    <!-- Shade: fades out main content when sidebar expanded on mobile -->
    <div
      v-show="showSidebar || isToolbarVisible"
      class="fixed left-0 top-0 z-48 size-full bg-basalt/50 sm:hidden"
      @click="hideSidebars"
    />
    
    <div
      class="grid h-full min-h-screen max-w-[1440px] grid-flow-col grid-cols-[14rem_1fr_3.5rem] transition-all sm:mx-0 sm:w-screen sm:overflow-y-auto sm:transition-none"
      :class="`
        ${showSidebar ? 'ml-0' : '-ml-56'} 
        ${isToolbarVisible ? '-mr-2' : '-mr-16'}`"
    >
      <!-- Sidebar -->
      <aside class="z-50 flex h-full w-56 flex-col overflow-y-auto  text-white dark:bg-charcoal">
         <Navigation @on-link-clicked="hideSidebars" />
      </aside>

      <!-- Page central column -->
      <div class="content-wrapper w-full grow overflow-y-auto bg-white text-darkness dark:bg-darkness dark:text-white sm:w-full">
        <!-- Site Header -->

        <div class="flex h-12 items-center gap-1 px-2 sm:pl-8">
          <SidebarToggle class="sm:hidden" @click="toggleSidebar" />
          <BreadcrumbLinks class="grow" />
          <ToolBarToggle
            v-if="!isToolbarVisible"
            class="block sm:hidden"
            @btn-clicked="toggleToolbar"
          />
        </div>

        <PageNotifications />

        <!-- Main content -->
        <div class="flex grow">
          <nuxt-page
            class="main-content pt-auto mx-0 grow p-4 text-darkness dark:text-white sm:px-8"
          />
          <div
            v-if="isEncounterVisible"
            class="top-0 block w-80 flex-initial shrink-0 border-l"
          >
            <EncounterBuilder @hide-encounter="isEncounterVisible = false" />
          </div>
        </div>
      </div>

      <!-- Right column -->
      <div 
        class="z-50 bg-white dark:bg-darkness"
      >
        <ToolBar @encounter-builder-clicked="showEncounter"/>
      </div>

    </div>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// Generate page title from Breadcrumbs
const BASE_TITLE = 'Open5e';
const crumbs = useBreadcrumbs();
const title = computed(() => {
  if (crumbs.value.length === 0) return BASE_TITLE;
  return `${crumbs.value.at(-1).title} – ${BASE_TITLE}`;
});
useHead({ title: title });

const isToolbarVisible = ref(false);
const toggleToolbar = () => (isToolbarVisible.value = !isToolbarVisible.value);
const showSidebar = ref(false);
const toggleSidebar = () => (showSidebar.value = !showSidebar.value);
const isEncounterVisible = ref(false);
const hideSidebars = () => {
  showSidebar.value = false;
  isToolbarVisible.value = false;
  isEncounterVisible.value = false;
};
const showEncounter = () => (isEncounterVisible.value = true);
</script>

<style>
.main-content {
  a {
    @apply text-indigo-600 hover:text-blood hover:underline dark:text-indigo-200 dark:hover:text-red;
  }
}
</style>
