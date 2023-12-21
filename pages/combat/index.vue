<template>
  <section class="docs-container container">
    <h1>Combat</h1>
    <div
      v-if="combatSections.length == 0"
      class="flex w-full flex-wrap pt-2 text-lg"
    >
      <div class="flex w-full">
        There are no items for this category that align with the corresponding
        sources you selected.
      </div>
      <div class="flex w-full pt-2">
        Please edit your selected sources for more results.
      </div>
    </div>
    <div v-else class="docs-toc">
      <ul v-if="combatSections">
        <li v-for="section in combatSections" :key="section.slug">
          <nuxt-link tag="a" :to="`/combat/${section.slug}`">
            {{ section.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { useMainStore } from '~/store';

export default {
  setup() {
    const store = useMainStore();
    return { store };
  },
  computed: {
    combatSections: function () {
      return this.store.allCombatSections;
    },
  },
};
</script>

<style></style>
