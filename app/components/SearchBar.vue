<script>
/**
 * SearchBar.vue - UI for interacting with Open5e search. Allows users to type 
 * a search query. When the SearchBar is activated the user is redirected to 
 * the `/search` page with the query param populated with their query text
 *
 * -= EMITS =-
 * @emit 'on-search': emits when
 */
</script>

<template>
  <div class="relative">
    <button
      class="absolute right-1 top-1 z-20 flex cursor-pointer items-center"
      @click="doSearch(query)"
    >
      <Icon
        name="majesticons:search-line"
        class="size-8 rounded-full bg-red p-1 text-white hover:bg-red-300"
        aria-hidden="true"
      />
    </button>

    <button 
      class="absolute right-10 top-1 flex items-center text-granite hover:text-black dark:hover:text-white"
      @click="showSourcesModal = true"
    >
      <Icon name="ion:options" class="z-40 size-8 rounded-full bg-transparent p-1" />
      <span class="absolute left-1 top-[1.625rem] z-10 size-6 rounded-full border border-granite bg-white p-[0.1rem] text-xs font-bold text-black dark:z-30 dark:bg-black dark:text-white">{{ sources.length }}</span>
    </button>

    <input
      v-model="query"
      class="z-10 w-full rounded-full border border-granite p-2 pl-4 shadow placeholder:text-sm placeholder:text-granite focus:bg-fog focus:outline-none dark:bg-darkness dark:focus:bg-charcoal"
      placeholder="Search Sources..." 
      @keyup.enter="doSearch(query)"
    />

    <ModalSourceSelector
      :show="showSourcesModal"
      @close="showSourcesModal = false"
    />
  </div>

</template>

<script setup>
const emit = defineEmits(['on-search']);
const router = useRouter();

const query = ref('');

function doSearch(query) {
  emit('on-search');
  router.push({ name: 'search', query: { text: query } });
}

const showSourcesModal = ref(false);
const { sources } = useSourcesList();
</script>