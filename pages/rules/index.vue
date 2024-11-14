<template>
  <section class="docs-container container">
    <div class="flex">
      <h1 class="my-2">Rules</h1>

      <ApiTableNav
        class="w-full"
        :page-number="pageNo"
        :last-page-number="lastPageNo"
        @first="firstPage()"
        @next="nextPage()"
        @prev="prevPage()"
        @last="lastPage()"
      />
    </div>

    <ApiTableFilter
      :filter="filter"
      :search="{
        name: 'Search Rules',
        filterField: 'name__contains',
      }"
    />

    <ApiResultsTable
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

const filter = useFilterState({
  initialFilters: {
    name__contains: '',
  },
});

// fetch a page of data from API, and pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.rules,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  filter: filter.debouncedFilter,
  params: {
    fields: ['name', 'key', 'document'].join(','),
    document__fields: ['name', 'key'].join(','),
    depth: 1,
  },
});

const { pageNo, lastPageNo, firstPage, lastPage, prevPage, nextPage } =
  paginator;
</script>
