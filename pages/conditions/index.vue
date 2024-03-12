<template>
  <section class="docs-container container">
    <h1>Conditions</h1>
    <div class="docs-toc">
      <ul v-if="conditions">
        <li v-for="condition in conditions" :key="condition.slug">
          <nuxt-link :to="`/conditions/${condition.slug}`">
            {{ condition.name }}
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
    store.loadConditions();
    return { store };
  },

  computed: {
    conditions: function () {
      return [...this.store.conditions];
    },
  },
};
</script>

<style></style>
