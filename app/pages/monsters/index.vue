<template>
  <section class="docs-container container">
    <div class="flex w-full">
      <h1 class="my-2 text-nowrap">
        Monsters
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
        name: 'Search Monsters',
        filterField: 'name__icontains',
      }"
      :select-fields="filterSelectFieldsDefinition"
    />

    <ResultsTable
      :data="data?.results"
      :cols="monsterTableColumnDefinitions"
      :sort-by="sortBy"
      :is-sort-descending="isSortDescending"
      @sort="(sortValue) => setSortState(sortValue)"
    >
      <template #actions="{ data }">
        <div class="hidden justify-end gap-2 lg:flex">
          <EncounterBuilderAddButton :monster="data" />
        </div>
      </template>
    </ResultsTable>
  </section>
</template>

<script setup lang="ts">
import type { MonsterFilterState } from '@/types';
import { monsterTableColumnDefinitions } from '@/helpers';

import {
  MONSTER_CHALLENGE_RATINGS_MAP,
  MONSTER_TYPES_LIST,
  MONSTER_SIZES_LIST,
  MONSTER_FILTER_DEFAULTS
} from '@/constants';

const filterSelectFieldsDefinition = [
  {
    name: 'Type',
    filterField: 'type',
    options: MONSTER_TYPES_LIST.map((monsterType) => ({
      name: monsterType,
      value: monsterType.toLowerCase(),
    })),
  },
  {
    name: 'Size',
    filterField: 'size',
    options: MONSTER_SIZES_LIST.map((monsterSize) => ({
      name: monsterSize,
      value: monsterSize.toLowerCase(),
    })),
    isLeastPriority: true,
  },
  {
    name: 'CR (min)',
    filterField: 'challenge_rating_decimal__gte',
    options: MONSTER_CHALLENGE_RATINGS_MAP.map(([name, value]) => ({
      name: name,
      value: value.toString(),
    })),
  },
  {
    name: 'CR (max)',
    filterField: 'challenge_rating_decimal__lte',
    options: MONSTER_CHALLENGE_RATINGS_MAP.map(([name, value]) => ({
      name: name,
      value: value.toString(),
    })),
  },
];
// Set up filters
const filterState = useFilterState<MonsterFilterState>({
  key: 'monsters',
  fields: MONSTER_FILTER_DEFAULTS,
});

// State handlers for sorting results table
const { sortBy, isSortDescending, setSortState } = useSortState();

// fields to fetch from API to populate table
const fields = [
  'key',
  'name',
  'document',
  'challenge_rating_decimal',
  'type',
  'size',
].join(',');

// fetch page of data from API and pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.monsters,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  filter: filterState.debouncedFilter,
  params: {
    fields,
    document__fields: 'name,key',
    type__fields: 'name',
    size__fields: 'name',
  },
});

const debouncedFilter = computed(() => filterState.debouncedFilter);

// Expose values to template
defineExpose({
  filterState,
  debouncedFilter,
  MONSTER_CHALLENGE_RATINGS_MAP,
});


</script>
