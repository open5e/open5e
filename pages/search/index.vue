<template>
  <section class="docs-container container">
    <h1>
      <span>Search results for </span>
      <span class="ml-2 font-thin uppercase text-granite before:content-['_']">
        {{ searchString }}
      </span>
    </h1>
    <hr />
    <p v-if="loading" class="font-sans text-3xl font-bold text-slate-400">
      Searching Open5e...
    </p>
    <p v-else-if="results?.length === 0" class="text-slate-400">
      <Icon name="majesticons:scroll-line" class="mr-2 h-8 w-8" />
      <span class="text-3xl font-bold">No results</span>
    </p>
    <div v-if="results && !loading">
      <!-- SEARCH RESULTS -->
      <p class="mb-6 text-xl font-bold tracking-wide text-granite">
        {{ `${sortedResults.inScope?.length} results in your sources ` }}
      </p>
      <ul>
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
        v-show="!isOtherSourcesExpanded && sortedResults.outOfScope?.length > 0"
        class="mb-4 text-indigo-600 hover:text-blood hover:underline dark:text-indigo-200 dark:hover:text-red"
        @click="toggleOtherSources"
      >
        {{
          `Show ${sortedResults.outOfScope?.length} additional results from other sources `
        }}
      </button>
      <ul v-if="isOtherSourcesExpanded && sortedResults.outOfScope?.length > 0">
        <header class="mb-6 text-xl font-bold tracking-wide text-granite">
          {{
            `${sortedResults.outOfScope?.length} results from other sources `
          }}
        </header>
        <li
          v-for="result in sortedResults.outOfScope"
          :key="result.slug"
          class="search-result mb-8"
        >
          <search-preview :result="result" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useMainStore } from '~/store';
const store = useMainStore();
const sources = computed(() => store.sourceSelection);
const route = useRoute();

// search state - true when data is loading
const loading = ref(false);

// UI state – controls whether sources from other sources are visible
const isOtherSourcesExpanded = ref(false);
const toggleOtherSources = () => {
  isOtherSourcesExpanded.value = !isOtherSourcesExpanded.value;
};
// get initial values from query params & API
const searchString = ref(route.query.text);
const results = ref(await getSearchResults(searchString.value));
const sortedResults = computed(() =>
  sortResults(sources.value, results.value, searchString.value)
);

// Watch the query param, re-reun search if it ever changes
watch(
  () => route.query.text,
  async (newQuery) => {
    searchString.value = newQuery;
    results.value = await getSearchResults(searchString.value);
  }
);

// Watch the results, and re-sort them thi
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
  isOtherSourcesExpanded.value = false;
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
  return { inScope, outOfScope };
}

/* sorts the results as follows:
 * 1st: results whose title begin with the query text
 * 2nd: results whose title contains the query text
 * 3rd: results everything else */

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
