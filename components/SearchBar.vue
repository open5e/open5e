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
    <div
      class="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-2"
    >
      <Icon
        name="majesticons:search-line"
        class="size-8 rounded-full bg-red-900/25 p-1 text-white hover:bg-red-900/50"
        aria-hidden="true"
        @click="doSearch(query)"
      />
    </div>
    <input
      v-model="query"
      class="w-full bg-red-700 p-4 placeholder:font-semibold placeholder:text-white/80 focus:border-0 focus:bg-red-800 focus:outline-none dark:bg-red-800 dark:focus:bg-red-600"
      placeholder="Search Open5e..."
      @keyup.enter="doSearch(query)"
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
</script>

<style>

</style>