<template>
  <section class="docs-container container">
    <h1>Combat</h1>
    <div class="docs-toc">
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
