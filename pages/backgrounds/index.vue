<template>
  <section class="docs-container container">
    <h1>Backgrounds</h1>
    <div
      v-if="backgrounds.length == 0"
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
      <ul v-if="backgrounds">
        <li v-for="background in backgrounds" :key="background.slug">
          <nuxt-link tag="a" :to="`/backgrounds/${background.slug}`">
            {{ background.name }}
          </nuxt-link>
          <source-tag
            v-if="background.document__slug !== 'wotc-srd'"
            :text="background.document__slug"
            :title="background.document__title"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { useMainStore } from '~/store';
import SourceTag from '~/components/SourceTag.vue';
const store = useMainStore();

const backgrounds = computed(() => store.allBackgrounds);

onBeforeMount(() => {
  store.loadBackgrounds();
});
</script>
