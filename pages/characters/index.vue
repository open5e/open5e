<template>
  <section class="docs-container container">
    <h1>Creating Characters</h1>
    <div
      v-if="charSections.length == 0"
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

<script setup>
import { useMainStore } from '~/store';
const store = useMainStore();

const charSections = computed(() => {
  return store.allCharacterSections;
});
</script>
