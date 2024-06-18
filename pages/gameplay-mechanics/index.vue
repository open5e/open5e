<template>
  <section class="docs-container container">
    <h1>Gameplay Mechanics</h1>
    <api-results-table
      v-if="sections"
      :data="sections"
      endpoint="gameplay-mechanics"
    />
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';
const { data: sections } = useSections('Gameplay Mechanics');
</script>
