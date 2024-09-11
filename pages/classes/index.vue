<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Classes</h1>
    </div>
    <div class="flex w-full flex-wrap justify-end">
      <api-table-nav
        :page-number="pageNo"
        :last-page-number="lastPageNo"
        @first="firstPage()"
        @next="nextPage()"
        @prev="prevPage()"
        @last="lastPage()"
      />
    </div>

    <api-results-table
      endpoint="classes"
      :data="results"
      :cols="[
        {
          displayName: 'Class',
          value: (data) => data.name,
          sortValue: 'name',
          link: (data) => `/classes/${data.key}`,
        },
      ]"
      :sort-by="sortBy"
      @sort="(sortValue) => setSortState(sortValue)"
    />
  </section>
</template>

<script setup>
// state handlers for sorting results table
const { sortBy, isSortDescending, setSortState } = useSortState();

// Fetch a page of classes & pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.classes,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending ?? true,
  params: {
    is_subclass: false,
    fields: ['key', 'name', 'document'].join(),
    depth: 1,
  },
});
const results = computed(() => data.value?.results);

// destructure pagination controls
const { pageNo, lastPageNo, firstPage, lastPage, prevPage, nextPage } =
  paginator;
</script>
