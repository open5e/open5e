<template>
  <nav class="flex w-full grow flex-col overflow-hidden bg-white text-black dark:bg-darkness dark:text-white">
    <NuxtLink
      to="/"
      class="bg-red p-5 text-center font-serif text-3xl text-white hover:text-white"
      @click="$emit('on-link-clicked')"
    >
      Open5e
    </NuxtLink>

    <SearchBar class="ml-2 mt-2" @on-search="$emit('on-link-clicked')" />

    <ul v-for="{ sectionTitle, pages } in paths" :key="sectionTitle" class="grid border-granite pl-2 sm:gap-2 sm:border-r sm:pl-0">
      <p class="mx-4 mt-2 text-sm font-bold">{{ sectionTitle }}</p>
      <li 
        v-for="{ title, path, icon } in pages" :key="title"
        class="group flex items-center gap-2 rounded px-2 py-1 transition-all hover:bg-fog hover:underline dark:hover:bg-charcoal"
        :class="path.includes(activeBaseRoute) && activeBaseRoute !== '' ? 'pl-6' : ''"
      >
        <NuxtLink :to="path" class="inline-block w-full" @click="$emit('on-link-clicked')">
          <Icon :name="icon ?? ''" class="mx-4 size-8 text-red"/>
          <span class=" ">{{ title }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>

defineEmits(['on-link-clicked']);

const activeBaseRoute = computed(() => useRoute().path.split('/')[1]);

const paths = [
  {
    sectionTitle: 'GM Resources',
    pages: [
      {
        title: 'Monsters',
        path: '/monsters',
        icon: 'game-icons:spiked-dragon-head',
      },
      {
        title: 'Magic Items',
        path: '/magic-items',
        icon: 'game-icons:cut-diamond',
      },
    ],
  },
  {
    sectionTitle: 'Character Resources',
    pages: [
      {
        title: 'Classes',
        path: '/classes',
        icon: 'game-icons:axe-sword'
      },
      {
        title: 'Species',
        path: '/species',
        icon: 'material-symbols:groups-rounded',
      },

      {
        title: 'Spells',
        path: '/spells',
        icon: 'game-icons:fire-spell-cast',
      },
      {
        title: 'Backgrounds',
        path: '/backgrounds',
        icon: 'streamline-sharp:landscape-2-solid'
      },
      {
        title: 'Feats',
        path: '/feats',
        icon: 'game-icons:skills',
      },
      {
        title: 'Equipment',
        path: '/equipment',
        icon: 'game-icons:swap-bag'
      },
    ],
  },
  {
    sectionTitle: 'Misc. Resources',
    pages: [
      {
        title: 'Rules',
        path: '/rules',
        icon: 'game-icons:dice-twenty-faces-twenty'
      },
      {
        title: 'Conditions',
        path: '/conditions',
        icon: 'mdi-heart-pulse'
      },
    ],
  },
  {
    sectionTitle: 'Open5e Documents',
    pages: [
      {
        title: 'Sources',
        path: '/sources',
        icon: 'game-icons:bookmark',
      },
      {
        title: 'API Docs',
        path: '/api-docs',
        icon: 'majesticons:curly-braces'
      },
    ],
  }
];


</script>