<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Races</h1>
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
      :data="results"
      :cols="[
        {
          displayName: 'Name',
          value: (data) => data.name,
          link: (data) => `/races/${data.key}`,
        },
      ]"
    />
  </section>
</template>

<script setup>
const { sortBy, isSortDescending, setSortState } = useSortState();

// fetch page of data from API and pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.races,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  params: {
    fields: ['name', 'key', 'document'].join(','),
    subrace_of__isnull: true,
    depth: 1,
  },
});
const results = computed(() => data.value?.results);

const { pageNo, lastPageNo, firstPage, lastPage, prevPage, nextPage } =
  paginator;
</script>
