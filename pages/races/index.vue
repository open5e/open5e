<template>
  <section class="docs-container container">
    <h1>Races</h1>
    <div v-if="races.length == 0" class="flex w-full flex-wrap pt-2 text-lg">
      <div class="flex w-full">
        There are no items for this category that align with the corresponding
        sources you selected.
      </div>
      <div class="flex w-full pt-2">
        Please edit your selected sources for more results.
      </div>
    </div>
    <div v-else class="docs-toc">
      <ul>
        <li v-for="race in races" :key="race.name">
          <nuxt-link tag="a" :to="`/races/${race.slug}`">
            {{ race.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { useMainStore } from '../../store/index';

export default {
  setup() {
    const store = useMainStore();
    store.loadRaces();
    return { store };
  },

  computed: {
    races: function () {
      return [...this.store.races];
    },
  },
};
</script>
