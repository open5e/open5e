<template>
  <section class="docs-container container">
    <div class="flex">
      <h1 class="my-2 w-full">
        Monsters
      </h1>

      <ApiTableNav
        class="w-full"
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

    <ApiTableFilter
      :filter-state="filterState"
      :search="{
        name: 'Search Monsters',
        filterField: 'name__icontains',
      }"
      :select-fields="[
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
            value: value,
          })),
        },
        {
          name: 'CR (max)',
          filterField: 'challenge_rating_decimal__lte',
          options: MONSTER_CHALLENGE_RATINGS_MAP.map(([name, value]) => ({
            name: name,
            value: value,
          })),
        },
      ]"
    />

    <h3
      ref="results"
      class="sr-only"
      tabindex="-1"
      @keyup.esc="focusFilter"
    />

    <ApiResultsTable
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
          isLeastPriority: true,
        },
      ]"
      :sort-by="sortBy"
      :is-sort-descending="isSortDescending"
      @sort="(sortValue) => setSortState(sortValue)"
    />
  </section>
</template>

<script setup lang="ts">
// Set up filters
const filterState = useFilterState<MonsterFilter>({
  key: 'monsters',
  fields: DefaultMonsterFilter,
});

// State handlers for sorting results table
const { sortBy, isSortDescending, setSortState } = useSortState();

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
  filter: filterState.debouncedFilter,
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
