<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Running a Game</h1>
    </div>
    <api-results-table
      v-model="filter"
      endpoint="running"
      :api-endpoint="API_ENDPOINTS.sections"
      :fields="['name', 'key']"
      :cols="[
        {
          displayName: 'Name',
          value: (data) => data.name,
          sortValue: 'name',
          link: (data) => `/sections/${data.key}`,
        },
      ]"
    />
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';

const filter = ref({
  parent__in: 'Rules',
});
</script>
