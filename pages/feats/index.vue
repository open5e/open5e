<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Feats</h1>
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
      :data="data?.results"
      :cols="[
        {
          displayName: 'Name',
          value: (data) => data.name,
          sortValue: 'name',
          link: (data) => `/feats/${data.key}`,
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

// fetch page of data from API and pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.feats,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  params: { fields: ['key', 'name', 'document'].join(','), depth: 1 },
});

const { pageNo, lastPageNo, firstPage, lastPage, prevPage, nextPage } =
  paginator;
</script>
