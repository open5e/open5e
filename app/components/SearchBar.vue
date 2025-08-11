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
      class="absolute inset-y-0 right-1 flex cursor-pointer items-center"
    >
      <Icon
        name="majesticons:search-line"
        class="size-8 rounded-full bg-red p-1 text-white hover:bg-red-300"
        aria-hidden="true"
        @click="doSearch(query)"
      />
    </div>
    <input
      v-model="query"
      class="w-full rounded-full border border-granite p-2 placeholder:font-semibold focus:bg-fog  focus:outline-none dark:bg-darkness dark:focus:bg-charcoal"
      placeholder="Search..."
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