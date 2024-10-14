<template>
  <section class="docs-container container">
    <div class="flex">
      <h1 class="my-2">Classes</h1>
      <api-table-nav
        class="w-full"
        :page-number="pageNo"
        :last-page-number="lastPageNo"
        @first="firstPage()"
        @next="nextPage()"
        @prev="prevPage()"
        @last="lastPage()"
      />
    </div>
    <api-table-filter
      :update-filters="update"
      :search="{
        name: 'Search Classes',
        filterField: 'name__contains',
      }"
    />
    <api-results-table
      endpoint="classes"
      :data="data?.results"
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

const { debouncedFilter, update } = useFilterState();

// Fetch a page of classes & pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.classes,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending ?? true,
  filter: debouncedFilter,
  params: {
    is_subclass: false,
    fields: ['key', 'name', 'document'].join(),
    depth: 1,
  },
});

// destructure pagination controls
const { pageNo, lastPageNo, firstPage, lastPage, prevPage, nextPage } =
  paginator;
</script>
