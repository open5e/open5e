<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Spell List</h1>
    </div>
    <api-results-table
      endpoint="spells"
      :api-endpoint="API_ENDPOINTS.spells"
      :cols="['school', 'spell_level', 'components', 'dnd_class']"
    />
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';
</script>
