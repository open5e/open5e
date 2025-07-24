<template>
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
</template>

<script setup>
const emit = defineEmits(['on-search']);

const route = useRoute();
const router = useRouter();

const searchText = ref(route.query.text);

function doSearch(searchText) {
  emit('on-search');
  router.push({ name: 'search', query: { text: searchText } });
}
</script>

<style>

</style>