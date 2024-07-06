<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Running a Game</h1>
    </div>
    <api-results-table
      endpoint="running"
      :api-endpoint="API_ENDPOINTS.sections"
      :cols="['document__title', 'document__slug']"
      v-model:filters="rulesFilter"
    />
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';

const rulesFilter = ref({
  parent__in: 'Rules',
});
</script>
