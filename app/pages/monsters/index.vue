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
      :select-fields="monsterFilterSelectFieldsDefinition"
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
import {
  monsterTableColumnDefinitions,
  monsterFilterSelectFieldsDefinition
} from '@/helpers';

import {
  MONSTER_CHALLENGE_RATINGS_MAP,
  MONSTER_FILTER_DEFAULTS
} from '@/constants';

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
