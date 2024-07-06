<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Spell List</h1>
    </div>
    <api-results-table
      endpoint="spells"
      :api-endpoint="API_ENDPOINTS.spells"
      :cols="['school', 'level_int', 'components', 'dnd_class']"
      v-model:filters="filters"
    />
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';
</script>
