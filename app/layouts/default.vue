<template>
  <!-- BACKGROUND (visible behind page content at wide screen widths)       -->
  <!-- bg-radial-gradiant arbitrary classes generate the dotted bg pattern  -->
  <div
    class="grid min-h-screen justify-center overflow-hidden bg-white bg-[radial-gradient(#ddd_1px,transparent_1px)] [background-size:16px_16px] dark:bg-darkness dark:bg-[radial-gradient(#222_1px,transparent_1px)]"
  >
    <div class="flex h-full max-w-[1440px] sm:mx-0 sm:w-screen">
      <!-- Left sidebar -->
      <aside
        class="absolute z-50 flex h-full w-56 flex-col overflow-y-auto text-white transition-transform dark:bg-charcoal sm:relative sm:transition-none"
        :class="isNavbarVisible ? 'translate-x-2' : '-translate-x-full sm:translate-x-2'"
      >
         <Navigation @on-link-clicked="hideSidebars" />
      </aside>

      <!-- Page central column -->
      <div 
        class="w-screen flex-1 overflow-hidden bg-white pl-2 transition-transform dark:bg-darkness sm:p-0 sm:transition-none"
        :class="isNavbarVisible ? 'translate-x-56 sm:translate-x-0' : ''"
      >
        <div class="content-wrapper h-full overflow-y-auto  overflow-x-hidden  text-darkness dark:text-white">

          <!-- Site Header: Mobile -->
          <header class="flex justify-between sm:hidden">
            <SidebarToggle class="m-2 flex-none" @click="toggleSidebar" />

            <NuxtLink
              to="/"
              class="p-2 pb-0 text-center font-serif text-2xl text-red dark:text-white"
            >
              Open5e
            </NuxtLink>

            <ToolBarToggle class="my-2 mr-4 flex-none" @btn-clicked="toggleToolbar" />
          </header>
          
          <div class="-mt-3 grid h-min w-full justify-center gap-1 px-2 text-lg sm:m-4 sm:justify-start sm:pl-4">
            <BreadcrumbLinks class="grow" />
          </div>

          <PageNotifications class="z-60" />

          <!-- Main content -->
          <nuxt-page
            class="main-content pt-auto ml-0 mr-1 shrink-0 grow  p-4 text-darkness dark:text-white sm:px-8"
          />
        </div>
      </div>

      <!-- Right sidebar -->
      <div
        class="absolute right-0 z-50 border-white bg-white px-1 transition-transform dark:bg-darkness sm:relative sm:w-auto sm:px-2"
        :class="isToolbarVisible ? 'translate-x-0 ' : 'translate-x-full sm:translate-x-0'"
      >
        <ToolBar
          v-if="!isEncounterVisible"
          @encounter-builder-clicked="toggleEncounter"
        />
        <div 
          v-else
          class="h-min border-granite sm:border-l"
        >
          <EncounterBuilder @hide-encounter="isEncounterVisible = false" />
        </div>
      </div>
    </div>
    
    <AppFooter />

    <!-- Shade: fades out main content when sidebar expanded on mobile -->
    <div
      v-show="isNavbarVisible || isToolbarVisible"
      class="fixed left-0 top-0 z-48 size-full bg-basalt/50 sm:hidden"
      @click="hideSidebars"
    />
  </div>
</template>

<script setup lang="ts">
// App UI State
const isToolbarVisible = ref(false);
const toggleToolbar = () => (isToolbarVisible.value = !isToolbarVisible.value);
const isNavbarVisible = ref(false);
const toggleSidebar = () => (isNavbarVisible.value = !isNavbarVisible.value);
const isEncounterVisible = ref(false);
const toggleEncounter = () => (isEncounterVisible.value = !isEncounterVisible.value);
const hideSidebars = () => {
  isNavbarVisible.value = false;
  isToolbarVisible.value = false;
  isEncounterVisible.value = false;
};

</script>

<style>
.main-content {
  a {
    @apply text-indigo-600 hover:text-blood hover:underline dark:text-indigo-200 dark:hover:text-red;
  }
}
</style>
