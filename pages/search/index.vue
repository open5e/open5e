<template>
  <section class="docs-container container">
    <h1>Search results</h1>
    <hr />
    <h3 v-if="loading" class="font-sans font-bold text-slate-400">
      Searching Open5e...
    </h3>
    <h3 v-else-if="noValue" class="font-sans font-bold text-slate-400">
      <Icon name="majesticons:search-line" class="mr-2 h-8 w-8" />
      Search for something to see results...
    </h3>
    <h3
      v-else-if="results.length == 0"
      class="font-sans font-bold text-slate-400"
    >
      <Icon name="majesticons:scroll-line" class="mr-2 h-8 w-8" />
      No results
    </h3>
    <div
      v-for="result in results"
      :key="result.slug"
      class="search-result mb-8"
    >
      <!-- Result summary for creatures including mini statblock -->
      <div v-if="result.route == 'monsters/'" class="result-summary">
        <nuxt-link
          tag="a"
          :params="{ id: result.slug }"
          :to="`/${result.route}${result.slug}`"
          class="font-bold"
        >
          {{ result.name }}
        </nuxt-link>
        <span> CR{{ result.challenge_rating }} </span>
        <span class="title-case">{{ result.type }} | </span>
        <em>{{ result.hit_points }}hp, AC {{ result.armor_class }}</em>
        <source-tag
          v-if="result.document_slug !== 'wotc-srd'"
          class="source-tag"
          :title="result.document_title"
          :text="result.document_slug"
        />
        <div>
          <stat-bar
            class="mt-1 border-t pt-1"
            :stats="{
              str: result.strength,
              dex: result.dexterity,
              con: result.constitution,
              int: result.intelligence,
              wis: result.wisdom,
              cha: result.charisma,
            }"
          />
        </div>
      </div>

      <!-- Result summary for spells including basic spell info -->
      <div v-else-if="result.route == 'spells/'" class="result-summary">
        <nuxt-link
          tag="a"
          :params="{ id: result.slug }"
          :to="`/${result.route}${result.slug}`"
          class="font-bold"
        >
          {{ result.name }}
        </nuxt-link>
        {{ result.level }} {{ result.school }} spell | {{ result.dnd_class }}
        <source-tag
          v-if="result.document_slug !== 'wotc-srd'"
          class="source-tag"
          :title="result.document_title"
          :text="result.document_slug"
        />
        <p v-html="result.highlighted" />
      </div>

      <!-- Result summary for magic items -->
      <div v-else-if="result.route == 'magicitems/'" class="result-summary">
        <nuxt-link
          tag="a"
          :params="{ id: result.slug }"
          :to="`/magic-items/${result.slug}`"
          class="font-bold"
        >
          {{ result.name }}
        </nuxt-link>
        {{ result.type }}, {{ result.rarity }}
        <source-tag
          v-if="result.document_slug !== 'wotc-srd'"
          class="source-tag"
          :title="result.document_title"
          :text="result.document_slug"
        />
        <p v-html="result.highlighted" />
      </div>

      <!-- Result summary for everything else -->
      <div v-else class="result-summary">
        <nuxt-link
          tag="a"
          :params="{ id: result.slug }"
          :to="`/${result.route}${result.slug}`"
          class="font-bold"
        >
          {{ result.name }}
        </nuxt-link>
        <source-tag
          v-if="result.document_slug !== 'wotc-srd'"
          class="source-tag"
          :title="result.document_title"
          :text="result.document_slug"
        />
        <p v-html="result.highlighted" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';
const route = useRoute();

// search state
const loading = ref(false);
const noValue = ref(false);

// get initial values from query params & API
const searchString = ref(route.query.text);
const results = ref(await getSearchResults(searchString.value));

// Watch the query param. Run search again if it changes
watch(
  () => route.query.text,
  async (newQuery) => {
    searchString.value = newQuery;
    results.value = await getSearchResults(searchString.value);
  }
);

// getSearchResults queries the /search API endpoint
async function getSearchResults(query) {
  if (query === '') {
    return;
  }
  loading.value = true;
  const { apiUrl } = useRuntimeConfig().public;
  const endpoint = `${apiUrl}/search/?text=${query}`;
  const response = await $fetch(endpoint);
  loading.value = false;
  noValue.value = response.results.length === 0;
  return sortResults(query, response.results);
}

// sorts results returned by API
function sortResults(search, results) {
  const term = search.toUpperCase();
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
