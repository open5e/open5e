<template>
  <section class="docs-container container">
    <div class="flex">
      <h1 class="my-2 w-full">Monsters</h1>
      <api-table-nav
        class="w-full"
        :page-number="pageNo"
        :last-page-number="lastPageNo"
        @first="firstPage()"
        @next="nextPage()"
        @prev="prevPage()"
        @last="lastPage()"
      />
    </div>
    <api-table-filter
      :update-filters="updateFilter"
      :search="{
        name: 'Search Monsters',
        filterField: 'name__icontains',
      }"
      :select-fields="[
        {
          name: 'Type',
          filterField: 'type',
          value: filter.type,
          options: MONSTER_TYPES_LIST.map((monsterType) => ({
            name: monsterType,
            value: monsterType.toLowerCase(),
          })),
        },
        {
          name: 'Size',
          filterField: 'size',
          value: filter.size,
          options: MONSTER_SIZES_LIST.map((monsterSize) => ({
            name: monsterSize,
            value: monsterSize.toLowerCase(),
          })),
        },
        {
          name: 'CR (min)',
          filterField: 'challenge_rating_decimal__gte',
          value: filter.challenge_rating_decimal__gte,
          options: MONSTER_CHALLENGE_RATINGS_MAP.map(([name, value]) => ({
            name: name,
            value: value,
          })),
        },
        {
          name: 'CR (max)',
          filterField: 'challenge_rating_decimal__lte',
          value: filter.challenge_rating_decimal__lte,
          options: MONSTER_CHALLENGE_RATINGS_MAP.map(([name, value]) => ({
            name: name,
            value: value,
          })),
        },
      ]"
    />

    <h3 ref="results" class="sr-only" tabindex="-1" @keyup.esc="focusFilter" />
    <api-results-table
      v-model="debouncedFilter"
      :data="data?.results"
      :cols="[
        {
          displayName: 'Name',
          value: (data) => data.name,
          sortValue: 'name',
          link: (data) => `/monsters/${data.key}`,
        },
        {
          displayName: 'CR',
          value: (data) => data.challenge_rating_text,
          sortValue: 'challenge_rating_decimal',
        },
        {
          displayName: 'Type',
          value: (data) => data.type.name,
          sortValue: 'type',
        },
        {
          displayName: 'Size',
          value: (data) => data.size.name,
          sortValue: 'size',
        },
      ]"
      :sort-by="sortBy"
      :is-sort-descending="isSortDescending"
      @sort="(sortValue) => setSortState(sortValue)"
    />
  </section>
</template>

<script setup>
import { MONSTER_FILTER_LOCAL_STORAGE_KEY } from '~/composables/monsters.ts';
// State handlers for sorting results table
const { sortBy, isSortDescending, setSortState } = useSortState();

// Set up filters
const { filter, debouncedFilter, updateFilter } = useFilterState({
  initialFilters: localStorage.getItem(MONSTER_FILTER_LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(MONSTER_FILTER_LOCAL_STORAGE_KEY))
    : DefaultMonsterFilter,
  localStorageKey: MONSTER_FILTER_LOCAL_STORAGE_KEY,
});

// fields to fetch from API to populate table
const fields = [
  'key',
  'name',
  'document',
  'challenge_rating_text',
  'challenge_rating_decimal',
  'document',
  'type',
  'size',
].join(',');

// fetch page of data from API and pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.monsters,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  filter: filter,
  params: {
    fields,
    document__fields: 'name,key',
    type__fields: 'name',
    size__fields: 'name,key',
    is_subclass: false,
    depth: 1,
  },
});

// destructure pagination controls
const { pageNo, lastPageNo, firstPage, lastPage, prevPage, nextPage } =
  paginator;
</script>
