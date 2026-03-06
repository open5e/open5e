<template>
  <section class="docs-container container">
    <div class="flex justify-between">
      <h1 class="my-2 w-full">
        Magic Items
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
        name: 'Search Magic Items',
        filterField: 'name__icontains',
      }"
      :select-fields="magicItemFilterSelectFieldsDefinition"
      :checkbox-fields="filterCheckboxFieldsDefinition"
    />

    <ResultsTable
      :data="data?.results"
      :cols="magicItemTableColumnDefinitions"
      :sort-by="sortBy"
      :is-sort-descending="isSortDescending"
      @sort="(sortValue) => setSortState(sortValue)"
    />
  </section>
</template>

<script setup lang="ts">
import type { MagicItemFilterState } from '@/types';
import {
  magicItemFilterDefaults,
  magicItemFilterSelectFieldsDefinition,
  magicItemTableColumnDefinitions,
} from '@/helpers';

// Set up filters
const filterState = useFilterState<MagicItemFilterState>({
  key: 'magicItems',
  fields: magicItemFilterDefaults,
});

const filterCheckboxFieldsDefinition = [{
  name: 'Attunement',
  filterField: 'requires_attunement',
}];

// State handlers for sorting results table
const { sortBy, isSortDescending, setSortState } = useSortState();

// fields to fetch from API to populate table
const fields = [
  'key',
  'name',
  'document',
  'category',
  'rarity',
  'requires_attunement',
].join(',');

// fetch page of data from API and pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.magicitems,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  filter: filterState.debouncedFilter,
  params: {
    is_magic_item: true,
    fields,
    document__fields: ['name', 'key'].join(','),
    category__fields: ['name', 'key'].join(','),
    rarity__fields: ['name', 'rank'].join(','),
  },
});
</script>
