<template>
  <section class="docs-container container">
    <div class="flex">
      <h1 class="my-2 w-screen sm:w-full">
        Spells
      </h1>

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
        name: 'Search Spells',
        filterField: 'name__contains',
      }"
      :select-fields="spellFilterSelectFieldsDefinition"
    />

    <!-- RESULTS TABLE -->
    <ResultsTable
      :data="data?.results"
      :cols="spellTableColumnDefinitions"
      :sort-by="sortBy"
      :is-sort-descending="isSortDescending"
      @sort="(sortValue) => setSortState(sortValue)"
    />
  </section>
</template>

<script setup lang="ts">
import type { SpellFilterState } from '@/types';
import {
  spellFilterDefaults,
  spellFilterSelectFieldsDefinition,
  spellTableColumnDefinitions,
} from '@/helpers';

// Set up filters
const filterState = useFilterState<SpellFilterState>({
  key: 'spells',
  fields: spellFilterDefaults,
});

// State handlers for sorting results table
const { sortBy, isSortDescending, setSortState } = useSortState();

// Fetch a page of results and pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.spells,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  filter: filterState.debouncedFilter,
  params: {
    fields: ['key', 'name', 'document', 'level', 'school', 'classes'].join(','),
    document__fields: ['name', 'key'].join(','),
    classes__fields: ['name'].join(','),
    school__fields: ['name', 'key'].join(','),
  },
});

</script>
