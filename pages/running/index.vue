<template>
  <section class="docs-container container">
    <h1>Running a Game</h1>
    <api-results-table v-if="sections" :data="sections" endpoint="running" />
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';
const { data: sections } = useSections('Rules');
</script>
