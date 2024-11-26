<template>
  <section class="docs-container container">
    <h1>Search</h1>
    <hr class="mb-8" />
    <!-- Header -->
    <p class="font-sans text-xl font-bold text-slate-400">
      <span
        v-if="!data"
        class="h-8"
      >Searching Open5e...</span>
      <span v-else-if="!searchText">
        <icon
          name="majesticons:search-line"
          class="mr-2 size-8"
        />
        <span>Search for something to see results...</span>
      </span>
      <span v-else-if="results.inScope">
        <icon
          name="majesticons:scroll-line"
          class="mr-2 size-8"
        />
        <span>{{ results.inScope.length }} results in your sources</span>
        <span
          v-if="results.outScope.length > 0"
          class="font-thin"
        >
          ({{ results.outScope.length }} in other sources)
        </span>
      </span>
    </p>

    <!-- Result list -->
    <ul v-if="results && results.inScope.length > 0">
      <search-result
        v-for="item in results.inScope"
        :key="item.object_pk"
        :result="item"
        :query="searchText"
      />
    </ul>

    <div
      v-if="results && results.outScope.length > 0"
      class="my-2 border-t"
    >
      <button
        class="mt-2 font-sans text-xl font-bold tracking-wide text-indigo-600 hover:text-blood hover:underline dark:text-indigo-200 dark:hover:text-red"
        @click="toggleOtherSources()"
      >
        {{ isOtherSourcesExpanded ? `Showing ` : `Show ` }}
        {{ results.outScope.length }} results from other sources
      </button>
    </div>

    <!-- Out of scope results (hidden by default) -->
    <ul v-if="results && results.outScope.length > 0 && isOtherSourcesExpanded">
      <search-result
        v-for="item in results.outScope"
        :key="item.object_pk"
        :result="item"
        :query="searchText"
      />
    </ul>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const searchText = useQueryParam('text');
const { data } = useSearch(searchText);
const { sources } = useSourcesList();

const results = computed(() => {
  if (!data || !data.value) {
    return;
  }

  // split result based on which from currently selected sources
  const [inScope, outScope] = data.value.reduce(
    ([inScope, outScope], item) =>
      sources.value.includes(item.document.key)
        ? [[...inScope, item], outScope]
        : [inScope, [...outScope, item]],
    [[], []],
  );
  return { inScope, outScope };
});

// state for expanding results from other sources
const isOtherSourcesExpanded = ref(false);
const toggleOtherSources = () => {
  isOtherSourcesExpanded.value = !isOtherSourcesExpanded.value;
};
</script>
