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
      :select-fields="filterSelectFieldsDefinition"
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
import { magicItemTableColumnDefinitions } from '@/helpers';
import {
  MAGIC_ITEM_FILTER_DEFAULTS,
  MAGIC_ITEMS_RARITES,
  MAGIC_ITEMS_TYPES,
} from '@/constants';

// Set up filters
const filterState = useFilterState<MagicItemFilterState>({
  key: 'magicItems',
  fields: MAGIC_ITEM_FILTER_DEFAULTS,
});

const filterSelectFieldsDefinition = [
  {
    name: 'Rarity',
    filterField: 'rarity',
    options: MAGIC_ITEMS_RARITES.map((rarity) => ({
      name: rarity,
      value: rarity.toLowerCase().split(' ').join('-'),
    })),
  },
  {
    name: 'Category',
    filterField: 'category',
    options: MAGIC_ITEMS_TYPES.map((type) => ({
      name: type,
      value: type.toLowerCase().split(' ').join('-'),
    })),
    isLeastPriority: true,
  },
];

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
