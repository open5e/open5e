<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Creating Characters</h1>
    </div>
    <api-results-table
      v-model="characterFilter"
      endpoint="characters"
      :api-endpoint="API_ENDPOINTS.sections"
      :cols="['document__title', 'document__slug']"
    />
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';

const characterFilter = ref({
  parent__in: 'Characters, Character Advancement',
});
</script>
