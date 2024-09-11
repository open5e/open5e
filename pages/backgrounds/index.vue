<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Backgrounds</h1>
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
      endpoint="backgrounds"
      :cols="[
        {
          displayName: 'Name',
          value: (data) => data.name,
          sortValue: 'name',
          link: (data) => `/backgrounds/${data.key}`,
        },
      ]"
      :sort-by="sortBy"
      :is-sort-descending="isSortDescending"
      @sort="(sortValue) => setSortState(sortValue)"
    />
  </section>
</template>

<script setup>
// state handlers for sorting results table
const { sortBy, isSortDescending, setSortState } = useSortState();

// fetch page of data from API and pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.backgrounds,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  params: { fields: ['name', 'key', 'document'], depth: 1 },
});
const results = computed(() => data.value?.results);

// destructure pagination controls
const { pageNo, lastPageNo, firstPage, lastPage, prevPage, nextPage } =
  paginator;
</script>
