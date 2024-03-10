<template>
  <section class="docs-container container">
    <h1>Search results</h1>
    <hr />
    <p v-if="loading" class="font-sans text-3xl font-bold text-slate-400">
      Searching Open5e...
    </p>
    <p v-else-if="results.length === 0" class="text-slate-400">
      <Icon name="majesticons:scroll-line" class="mr-2 h-8 w-8" />
      <span class="text-3xl font-bold">No results</span>
    </p>

    <!-- SEARCH RESULTS -->
    <p class="mb-6 text-xl font-bold tracking-wide text-granite">
      {{ `${sortedResults.inScope.length} results in your sources ` }}
    </p>
    <ul v-if="results">
      <li
        v-for="result in sortedResults.inScope"
        :key="result.slug"
        class="search-result mb-8"
      >
        <search-preview :result="result" />
      </li>
    </ul>

    <!-- SEARCH RESULTS FROM OTHER SOURCES -->
    <button
      class="mb-6 text-xl font-bold tracking-wide text-granite"
      @click="toggleOtherSources"
    >
      {{
        `Show ${sortedResults.outOfScope.length} results from other sources `
      }}
    </button>
    <ul v-if="isOtherSourcesExpanded">
      <li
        v-for="result in sortedResults.outOfScope"
        :key="result.slug"
        class="search-result mb-8"
      >
        <search-preview :result="result" />
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useMainStore } from '~/store';
const store = useMainStore();
const sources = computed(() => store.sourceSelection);

const route = useRoute();

// search state
const loading = ref(false);

// get initial values from query params & API
const searchString = ref(route.query.text);
const results = ref(await getSearchResults(searchString.value));
const sortedResults = computed(() =>
  sortResults(sources.value, results.value, searchString.value)
);

const isOtherSourcesExpanded = ref(false);
const toggleOtherSources = () => {
  isOtherSourcesExpanded.value = !isOtherSourcesExpanded.value;
};

// Watch the query param. Run search again if it changes
watch(
  () => route.query.text,
  async (newQuery) => {
    searchString.value = newQuery;
    results.value = await getSearchResults(searchString.value);
  }
);

// Watch the results. Re-sort them when they change
watch(
  () => [results],
  async (newResults) => {
    sortedResults.value = sortResults(
      sources.value,
      newResults,
      searchString.value
    );
  }
);

// getSearchResults queries the /search API endpoint
async function getSearchResults(query) {
  if (!query) {
    return;
  }
  loading.value = true;
  const { apiUrl } = useRuntimeConfig().public;
  const endpoint = `${apiUrl}/search/?text=${query}`;
  const response = await $fetch(endpoint);
  loading.value = false;
  return response.results;
}

// sorts results returned by API
function sortResults(sources, results, query) {
  const sorted = sortByRelevance(query, results);
  const split = splitResultsBySource(sources, sorted);
  return split;
}

// splits an arr of results into arrs that are within and outside of sources
function splitResultsBySource(sources = [], results) {
  const inScope = [];
  const outOfScope = [];

  results.forEach((result) => {
    if (sources.includes(result.document_slug)) {
      inScope.push(result);
    } else {
      outOfScope.push(result);
    }
  });
  return {
    inScope,
    outOfScope,
  };
}

function sortByRelevance(query, results) {
  const term = query.toUpperCase();
  const first = []; // query matches start of the title
  const next = []; // query matches some part of the title
  const other = []; // query doens't match title

  results.forEach((result) => {
    const index = result.name.toUpperCase().indexOf(term);
    // sort result into appropriate array
    // TODO: rmv curly-braces once PR #461 is approved
    if (index === 0) {
      first.push(result);
    } else if (index !== -1) {
      next.push(result);
    } else {
      other.push(result);
    }
  });
  return [...first, ...next, ...other];
}
</script>

<style lang="scss">
.highlighted {
  background-color: lightgoldenrodyellow;
  font-weight: bold;
}
</style>
