<template>
  <section class="docs-container container">
    <h1>Equipment</h1>
    <api-results-table
      v-if="equipmentSections"
      :data="equipmentSections"
      endpoint="equipment"
    />
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';
const { data: equipmentSections } = useSections('Equipment');
</script>
