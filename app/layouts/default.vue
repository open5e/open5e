<template>
  <!-- BACKGROUND (visible behind page content at wide screen widths)       -->
  <!-- bg-radial-gradiant arbitrary classes generate the dotted bg pattern  -->
  <div
    class="grid justify-center overflow-hidden bg-fog bg-[radial-gradient(#ddd_1px,transparent_1px)] [background-size:16px_16px] dark:bg-darkness dark:bg-[radial-gradient(#222_1px,transparent_1px)]"
  >
    <div
      class="grid h-full min-h-screen max-w-[1440px] grid-flow-col grid-cols-[14rem_1fr_3.5rem] transition-all sm:ml-0 sm:w-screen sm:overflow-y-auto sm:transition-none"
      :class="showSidebar ? 'ml-0' : '-ml-56'"
    >
      <!-- Sidebar -->
      <aside class="z-50 flex h-full w-56 flex-col overflow-y-auto  text-white dark:bg-charcoal">
         <Navigation @on-link-clicked="hideSidebar"/>
      </aside>

      <!-- Page central column -->
      <div class="content-wrapper w-full grow overflow-y-auto bg-white text-darkness dark:bg-darkness dark:text-white sm:w-full">
        <!-- Site Header -->

        <div class="flex h-12 items-center gap-1 px-2 sm:pl-8">
          <SidebarToggle class="sm:hidden" @click="toggleSidebar" />
          <BreadcrumbLinks class="grow" />
          <EncounterBuilderSummary
            v-if="!isEncounterVisible"
            @show-encounter="showEncounter"
          />
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
            <div class="">
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

      <!-- Right column -->
      <div class="bg-white dark:bg-darkness">
        <ToolBar />
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

const showSidebar = ref(false);
const isEncounterVisible = ref(false);
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
