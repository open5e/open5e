<template>
  <section class="docs-container container">
    <h1>Gameplay Mechanics</h1>
    <div class="flex w-full flex-wrap pt-2 text-lg" v-if="sections.length == 0">
      <div class="flex w-full">
        There are no items for this category that align with the corresponding
        sources you selected.
      </div>
      <div class="flex w-full pt-2">
        Please edit your selected sources for more results.
      </div>
    </div>
    <div class="docs-toc" v-else>
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
