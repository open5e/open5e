<template>
  <section class="docs-container container">
    <h1>Classes</h1>
    <api-results-table v-if="classes" endpoint="classes" :data="classes" />
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';
const { data: classes } = useFindMany(API_ENDPOINTS.classes, {
  fields: ['name', 'slug', 'document__title', 'document__slug'].join(),
});
</script>
