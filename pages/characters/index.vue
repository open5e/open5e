<template>
  <section class="docs-container container">
    <h1>Creating Characters</h1>
    <div class="docs-toc">
      <ul v-if="charSections">
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
