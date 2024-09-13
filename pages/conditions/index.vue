<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Conditions</h1>
    </div>
    <api-table-nav
      class="w-full"
      :page-number="pageNo"
      :last-page-number="lastPageNo"
      @first="firstPage()"
      @next="nextPage()"
      @prev="prevPage()"
      @last="lastPage()"
    />

    <api-results-table
      :data="results"
      :cols="[
        {
          displayName: 'Name',
          value: (data) => data.name,
          link: (data) => `/conditions/${data.key}`,
        },
      ]"
    />
  </section>
</template>

<script setup>
// fetch page of data from API and pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.conditions,
  params: { fields: ['name', 'key', 'document'].join(','), depth: 1 },
});
const results = computed(() => data.value?.results);

// destructure pagination controls
const { pageNo, lastPageNo, firstPage, lastPage, prevPage, nextPage } =
  paginator;
</script>
