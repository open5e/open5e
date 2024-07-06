<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Magic Item List</h1>
    </div>
    <api-results-table
      endpoint="magic-items"
      :api-endpoint="API_ENDPOINTS.magicitems"
      :cols="['type', 'rarity', 'requires_attunement']"
      v-model:filters="filters"
    />
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';
</script>
