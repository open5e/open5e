<template>
  <section class="docs-container container">
    <h1>Races</h1>
    <div class="docs-toc">
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

<style></style>
