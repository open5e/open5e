<template>
  <section class="docs-container container">
    <div class="grid w-full grid-cols-2">
      <h1 class="my-2 w-screen">Classes</h1>
      
      <ResultsTablePaginator
        class="w-min-content w-full"
        :page-number="pageNo || 1"
        :last-page-number="lastPageNo || 1"
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
      :cols="classTableColumnDefinitions"
      :sort-by="sortBy"
      @sort="(sortValue) => setSortState(sortValue)"
    />
  </section>
</template>

<script setup lang="ts">
import { classTableColumnDefinitions } from '@/helpers';

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
