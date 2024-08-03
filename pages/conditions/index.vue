<template>
  <section class="docs-container container">
    <h1>Conditions</h1>
    <api-results-table
      v-if="conditions"
      :data="conditions"
      endpoint="conditions"
    />
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';

const { data: conditions } = useFindMany(API_ENDPOINTS.conditions, {
  fields: ['name', 'slug', 'document__title', 'document__slug'].join(),
});
</script>

<style></style>
