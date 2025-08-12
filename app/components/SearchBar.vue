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
      class="absolute right-1 top-1 flex cursor-pointer items-center"
      @click="doSearch(query)"
    >
      <Icon
        name="majesticons:search-line"
        class="size-8 rounded-full bg-red p-1 text-white hover:bg-red-300"
        aria-hidden="true"
      />
    </button>


    <button 
      class="absolute right-10 top-1 flex items-center rounded-full border border-granite shadow hover:bg-smoke dark:border-white dark:hover:bg-charcoal"
      @click="showSourcesModal = true"
    >
      <Icon name="majesticons:book-open-line" class="size-8 rounded-full p-1 text-black dark:text-white" />
    </button>

    <input
      v-model="query"
      class="w-full rounded-full border border-granite p-2 shadow placeholder:pl-2 placeholder:font-semibold focus:bg-fog focus:outline-none dark:bg-darkness dark:focus:bg-charcoal"
      placeholder="Search Open5e..."
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

</script>

<style>

</style>