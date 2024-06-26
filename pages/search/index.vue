<template>
  <section class="docs-container container">
    <h1>Search</h1>
    <hr class="mb-8" />
    <p class="mb-6 font-sans font-bold text-slate-400">
      <span v-if="!data" class="h-8">Searching Open5e...</span>
      <span v-else-if="!searchText">
        <icon name="majesticons:search-line" class="mr-2 h-8 w-8" />
        <span>Search for something to see results...</span>
      </span>
      <span v-else-if="results.inScope.length > 0">
        <icon name="majesticons:scroll-line" class="mr-2 h-8 w-8" />
        <span>{{ results.inScope.length }} results in your sources</span>
      </span>
    </p>

    <ul v-if="results && results.inScope.length > 0">
      <search-result
        v-for="item in results.inScope"
        :key="item.object_pk"
        :result="item"
        :query="searchText"
      />
    </ul>

    <div v-if="results && results.outScope.length > 0">
      <button class="text-mana">
        Show {{ results.outScope.length }} results from other sources
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import SearchResult from '~/components/SearchResult';

const searchText = useQueryParam('text');
const { data } = useSearch(searchText);
const { sources } = useSourcesList();

const results = computed(() => {
  if (!data || !data.value) {
    return;
  }
  const [inScope, outScope] = data.value.reduce(
    ([inScope, outScope], item) =>
      sources.value.includes(item.document.key)
        ? [[...inScope, item], outScope]
        : [inScope, [...outScope, item]],
    [[], []]
  );
  return { inScope, outScope };
});
</script>

<style lang="scss" scoped>
@import './assets/variables';

.search-result {
  margin-bottom: 2rem;

  a {
    font-weight: bold;
  }

  :deep(.highlighted) {
    background-color: lightgoldenrodyellow;
    font-weight: bold;
  }
}

hr {
  margin-bottom: 2rem;
}

.result-highlights {
  font-size: 14px;
  opacity: 0.8;
}
</style>
