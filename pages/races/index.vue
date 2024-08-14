<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Races</h1>
    </div>
    <api-results-table
      endpoint="races"
      :api-endpoint="API_ENDPOINTS.races"
      :cols="['document__title', 'document__slug']"
    />
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';
</script>
