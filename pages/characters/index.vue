<template>
  <section class="docs-container container">
    <h1>Creating Characters</h1>
    <api-results-table :data="sections" endpoint="characters" />
    <div
      v-if="sections && sections.length === 0"
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
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';
const { data: sections } = useSections('Characters', 'Character Advancement');
</script>
