<template>
  <section class="docs-container container">
    <h1>Races</h1>
    <div
      v-if="races && races.length == 0"
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
    <api-results-table :data="races" endpoint="races" />
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';
const { data: races } = useFindMany(API_ENDPOINTS.races, {
  fields: ['name', 'slug', 'document__title', 'document__slug'].join(),
});
</script>
