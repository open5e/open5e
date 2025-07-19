<template>
  <section class="docs-container container">
    <div class="flex">
      <h1 class="my-2">
        Classes
      </h1>
      <ResultsTablePaginator
        class="w-full"
        :page-number="pageNo"
        :last-page-number="lastPageNo"
        :items-per-page="itemsPerPage || 1"
        :total-items="data?.count || 1"
        @first="firstPage()"
        @next="nextPage()"
        @prev="prevPage()"
        @last="lastPage()"
      />
    </div>

    <ResultsTableFilter
      :filter-state="filterState"
      :search="{
        name: 'Search Classes',
        filterField: 'name__contains',
      }"
    />
    <ResultsTable
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

<script setup lang="ts">
// Set up filters
const filterState = useFilterState<{ name__contains: string }>({
  key: 'classes',
  fields: { name__contains: '' },
});

// state handlers for sorting results table
const { sortBy, isSortDescending, setSortState } = useSortState();

// Fetch a page of classes & pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.classes,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending ?? true,
  filter: filterState.debouncedFilter,
  params: {
    is_subclass: false,
    fields: ['key', 'name', 'document'].join(),
    document__fields: ['name', 'key'].join(),
  },
});

// destructure pagination controls
const {
  pageNo,
  lastPageNo,
  itemsPerPage,
  firstPage,
  lastPage,
  prevPage,
  nextPage,
} = paginator;
</script>
