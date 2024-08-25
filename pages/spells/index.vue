<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Spells</h1>
    </div>
    <api-results-table
      endpoint="spells"
      :api-endpoint="API_ENDPOINTS.spells"
      :fields="[
        'name',
        'level',
        'school',
        'verbal',
        'material',
        'material_consumed',
        'somatic',
        'concentration',
      ]"
      :cols="[
        {
          displayName: 'Name',
          value: (data) => data.name,
          sortValue: 'name',
          link: (data) => `/spells/${data.key}`,
        },
        {
          displayName: 'Level',
          value: (data) => data.level,
          sortValue: 'level',
        },
        {
          displayName: 'School',
          value: (data) => data.school.name,
          sortValue: 'school',
        },
        {
          displayName: 'Components',
          value: (data) => `
          ${data.verbal ? 'V' : ''}${
            data.verbal && (data.material || data.somatic) ? ',' : ''
          }
          ${data.somatic ? 'S' : ''}${data.material && data.somatic ? ',' : ''} 
          ${data.material ? 'M' : ''}${data.material_consumed ? '*' : ''}`,
        }, // I know this is super ugly but my brain is tired and it works
        {
          displayName: 'Concentration',
          value: (data) => `${data.concentration ? 'yes' : ''}`,
          sortValue: 'concentration',
        },
      ]"
    />
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';
</script>
