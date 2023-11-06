<template>
  <section class="docs-container container">
    <h1>Creating Characters</h1>
    <div
      class="flex w-full flex-wrap pt-2 text-lg"
      v-if="charSections.length == 0"
    >
      <div class="flex w-full">
        There are no items for this category that align with the corresponding
        sources you selected.
      </div>
      <div class="flex w-full pt-2">
        Please edit your selected sources for more results.
      </div>
    </div>
    <div class="docs-toc" v-else>
      <ul>
        <li v-for="section in charSections" :key="section.slug">
          <nuxt-link tag="a" :to="`/characters/${section.slug}`">
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
    charSections: function () {
      return this.store.allCharacterSections;
    },
  },
};
</script>
