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
      v-else-if="orderedResults.length == 0"
      class="font-sans font-bold text-slate-400"
    >
      <Icon name="majesticons:scroll-line" class="mr-2 h-8 w-8" />
      No results
    </h3>
    <div
      v-for="result in orderedResults"
      v-show="!loading && !noValue"
      :key="result.slug"
      class="search-result"
    >
      <!-- Result summary for creatures including mini statblock -->
      <div v-if="result.route == 'monsters/'" class="result-summary">
        <nuxt-link
          tag="a"
          :params="{ id: result.slug }"
          :to="`/${result.route}${result.slug}`"
        >
          {{ result.name }}
        </nuxt-link>
        <span> CR{{ result.challenge_rating }} </span
        ><span class="title-case">{{ result.type }} | </span>
        <em>{{ result.hit_points }}hp, AC {{ result.armor_class }}</em>
        <source-tag
          v-if="result.document_slug !== 'wotc-srd'"
          class="source-tag"
          :title="result.document_title"
          :text="result.document_slug"
        />
        <div>
          <stat-bar
            class="top-border"
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
        <p class="result-highlights" v-html="result.highlighted" />
      </div>

      <!-- Result summary for magic items -->
      <div v-else-if="result.route == 'magicitems/'" class="result-summary">
        <nuxt-link
          tag="a"
          :params="{ id: result.slug }"
          :to="`/magic-items/${result.slug}`"
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
        <p class="result-highlights" v-html="result.highlighted" />
      </div>

      <!-- Result summary for everything else -->
      <div v-else class="result-summary">
        <nuxt-link
          tag="a"
          :params="{ id: result.slug }"
          :to="`/${result.route}${result.slug}`"
        >
          {{ result.name }}
        </nuxt-link>
        <source-tag
          v-if="result.document_slug !== 'wotc-srd'"
          class="source-tag"
          :title="result.document_title"
          :text="result.document_slug"
        />
        <p class="result-highlights" v-html="result.highlighted" />
      </div>
    </div>
  </section>
</template>

<script setup>
import axios from 'axios';
import StatBar from '~/components/StatBar';
import SourceTag from '~/components/SourceTag';

function sortFunction(a, b) {
  var textA = a.name.toUpperCase();
  var textB = b.name.toUpperCase();
  return textA < textB ? -1 : textA > textB ? 1 : 0;
}

const results = ref([]);
const text = ref(useRoute().query.text);
const loading = ref(true);
const noValue = ref(true);
const orderedResults = computed(() => {
  // Abort early if there is no search term
  if (!text.value) {
    return results.value;
  }

  let tmp = results.value.slice();
  const term = text.value.toUpperCase();
  let first = [];
  let next = [];
  let others = [];
  for (var i = 0; i < tmp.length; i++) {
    if (tmp[i].name.toUpperCase().indexOf(term) == 0) {
      first.push(tmp[i]);
    } else if (tmp[i].name.toUpperCase().indexOf(term) != -1) {
      next.push(tmp[i]);
    } else {
      others.push(tmp[i]);
    }
  }

  first.sort(function (a, b) {
    return sortFunction(a, b);
  });
  next.sort(function (a, b) {
    return sortFunction(a, b);
  });
  others.sort(function (a, b) {
    return sortFunction(a, b);
  });
  return first.concat(next).concat(others);
});

watch(
  () => useRoute().query.text,
  () => {
    getSearchResults();
  }
);

onMounted(() => {
  getSearchResults();
});

function getSearchResults() {
  if (useRoute().query.text == '') {
    noValue.value = true;
    loading.value = false;
    return;
  } else {
    loading.value = true;
    noValue.value = false;
    return axios
      .get(
        `${useRuntimeConfig().public.apiUrl}/search/?text=${
          useRoute().query.text
        }`
      ) //you will need to enable CORS to make this work
      .then((response) => {
        results.value = response.data.results;
        loading.value = false;
      });
  }
}
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

.top-border {
  margin-top: 0.35rem;
  padding-top: 0.25rem;
  border-top: 1px solid rgba($color-smoke, 0.5);
  font-size: 14px;
  opacity: 0.7;
}

hr {
  margin-bottom: 2rem;
}

.result-highlights {
  font-size: 14px;
  opacity: 0.8;
}
</style>
