<template>
  <section class="docs-container container">
    <h1>Combat</h1>
    <api-results-table
      v-if="combatSections"
      :data="combatSections"
      endpoint="combat"
    />
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';
const { data: combatSections } = useSections('Combat');
</script>

<style></style>
