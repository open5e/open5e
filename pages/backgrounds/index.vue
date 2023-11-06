<template>
  <section class="docs-container container">
    <h1>Backgrounds</h1>
    <div
      class="flex w-full flex-wrap pt-2 text-lg"
      v-if="backgrounds.length == 0"
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

<script>
import { useMainStore } from '~/store';
import SourceTag from '~/components/SourceTag.vue';

export default {
  components: { SourceTag },
  setup() {
    const store = useMainStore();
    return { store };
  },

  computed: {
    backgrounds: function () {
      return this.store.allBackgrounds;
    },
  },

  beforeMount() {
    this.store.loadBackgrounds();
  },
};
</script>
