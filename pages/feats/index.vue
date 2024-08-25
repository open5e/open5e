<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Feats</h1>
    </div>
    <api-results-table
      endpoint="feats"
      :api-endpoint="API_ENDPOINTS.feats"
      :cols="['document__title', 'document__slug']"
    />
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';
</script>
