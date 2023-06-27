<template>
  <section class="container docs-container">
    <h1>Gameplay Mechanics</h1>
    <div class="docs-toc">
      <ul v-if="sections">
        <li v-for="section in sections" :key="section.name">
          <nuxt-link tag="a" :to="`/gameplay-mechanics/${section.slug}`">
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
    sections: function () {
      return this.store.allMechanicsSections;
    },
  },
};
</script>
<style></style>
