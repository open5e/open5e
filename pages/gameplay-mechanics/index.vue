<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Gameplay Mechanics</h1>
    </div>
    <api-results-table
      v-model="filter"
      endpoint="gameplay-mechanics"
      :api-endpoint="API_ENDPOINTS.sections"
      :cols="['document__title', 'document__slug']"
    />
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';

const filter = ref({
  parent__in: 'Gameplay Mechanics',
});
</script>
