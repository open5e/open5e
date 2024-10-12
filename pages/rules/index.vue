<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Rules</h1>
    </div>
    <api-table-nav
      :page-number="pageNo"
      :last-page-number="lastPageNo"
      @first="firstPage()"
      @next="nextPage()"
      @prev="prevPage()"
      @last="lastPage()"
    />

    <api-results-table
      :data="data?.results"
      :cols="[
        {
          displayName: 'Name',
          value: (data) => data.name,
          link: (data) => `/rules/${data.key}`,
        },
      ]"
      :sort-by="sortBy"
      :is-sort-descending="isSortDescending"
      @sort="(sortValue) => setSortState(sortValue)"
    />
  </section>
</template>

<script setup>
const { sortBy, isSortDescending, setSortState } = useSortState();

// fetch a page of data from API, and pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.rules,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  params: {
    fields: ['name', 'key', 'document'].join(','),
    depth: 1,
  },
});

const { pageNo, lastPageNo, firstPage, lastPage, prevPage, nextPage } =
  paginator;
</script>
