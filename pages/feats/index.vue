<template>
  <section class="docs-container container">
    <h1>Feats</h1>
    <api-results-table v-if="feats" :data="feats" endpoint="feats" />
    <p v-else>Loading</p>
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';
const { data: feats } = useFindMany(API_ENDPOINTS.feats);
</script>

<style></style>
