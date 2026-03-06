<template>
  <section class="w-screen sm:w-full">
    <div class="flex">
      <h1 class="my-2">Conditions</h1>

      <ResultsTablePaginator
        :page-number="paginator.pageNo || 1"
        :last-page-number="paginator.lastPageNo || 1"
        :items-per-page="paginator.itemsPerPage || 1"
        :total-items="data?.count || 1"
        @first="paginator.firstPage()"
        @next="paginator.nextPage()"
        @prev="paginator.prevPage()"
        @last="paginator.lastPage()"
      />
    </div>

    <ResultsTableFilter
      :filter-state="filterState"
      :search="{
        name: 'Search Conditions',
        filterField: 'name__contains',
      }"
    />

    <ResultsTable
      :data="data?.results"
      :cols="conditionTableColumnDefinitions"
      :sort-by="sortBy"
      :is-sort-descending="isSortDescending"
      @sort="(sortValue) => setSortState(sortValue)"
    />
  </section>
</template>

<script setup lang="ts">
import {
  conditionsApiParams,
  conditionTableColumnDefinitions,
} from '@/helpers/resultsTableConfig';

// Set up filters
const filterState = useFilterState<{ name__contains: string }>({
  key: 'conditions',
  fields: { name__contains: '' },
});

const { sortBy, isSortDescending, setSortState } = useSortState();

// fetch a page of data from API, and pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.conditions,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  filter: filterState.debouncedFilter,
  params: conditionsApiParams,
});

</script>
