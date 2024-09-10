<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Classes</h1>
    </div>
    <api-results-table
      endpoint="classes"
      :api-endpoint="API_ENDPOINTS.classes"
      :params="{ is_subclass: false }"
      :cols="[
        {
          displayName: 'Class',
          value: (data) => data.name,
          sortValue: 'name',
          link: (data) => `/classes/${data.key}`,
        },
      ]"
    />
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';
</script>
