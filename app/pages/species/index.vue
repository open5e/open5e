<template>
  <section class="w-screen sm:w-full">
    <div class="flex">
      <h1 class="my-2">Species</h1>

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
        name: 'Search Species',
        filterField: 'name__icontains',
      }"
    />

    <ResultsTable
      :data="data?.results"
      :cols="speciesTableColumnDefinitions"
      :sort-by="sortBy"
      :is-sort-descending="isSortDescending"
      @sort="(sortValue) => setSortState(sortValue)"
    />
  </section>
</template>

<script setup lang="ts">
import { speciesApiParams, speciesTableColumnDefinitions } from '@/helpers';

useSeoIndex({ title: 'Species' });

// Set up filters
const filterState = useFilterState<{ name__icontains: string }>({
  key: 'species',
  fields: { name__icontains: '' },
});

// State handlers for sorting results table
const { sortBy, isSortDescending, setSortState } = useSortState();

const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.species,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  filter: filterState.debouncedFilter,
  params: speciesApiParams,
});

</script>
