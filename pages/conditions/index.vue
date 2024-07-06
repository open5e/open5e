<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Conditions</h1>
    </div>
    <api-results-table
      endpoint="conditions"
      :api-endpoint="API_ENDPOINTS.conditions"
      :cols="['document__title', 'document__slug']"
    />
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';
</script>
