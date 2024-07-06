<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Equipment</h1>
    </div>
    <api-results-table
      endpoint="characters"
      :api-endpoint="API_ENDPOINTS.sections"
      :cols="['document__title', 'document__slug']"
      v-model:filter="filter"
    />
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';

const filter = ref({
  parent__in: 'Equipment',
});
</script>
