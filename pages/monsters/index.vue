<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Monster List</h1>
      <filter-button
        :show-clear-button="canClearFilter"
        :filter-count="enabeledFiltersCount"
        :filter-shown="displayFilter"
        @show-filter="displayFilter = !displayFilter"
        @clear-filter="clear"
      />
    </div>

    <monster-filter-box
      v-if="displayFilter"
      ref="monsterFilterBox"
      :filter="filter"
      :update-filter="update"
    />

    <api-table-nav
      class="w-full"
      :page-number="pageNo"
      :last-page-number="lastPageNo"
      @first="firstPage()"
      @next="nextPage()"
      @prev="prevPage()"
      @last="lastPage()"
    />

    <h3 ref="results" class="sr-only" tabindex="-1" @keyup.esc="focusFilter" />
    <api-results-table
      v-model="debouncedFilter"
      :data="results"
      endpoint="monsters"
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
// State handlers for sorting results table
const { sortBy, isSortDescending, setSortState } = useSortState();

// Set up filters
const displayFilter = ref(false);
const {
  filter,
  debouncedFilter,
  canClearFilter,
  enabeledFiltersCount,
  clear,
  update,
} = useFilterState(DefaultMonsterFilter);

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
  params: { fields, is_subclass: false, depth: 1 },
});
const results = computed(() => data.value?.results);

// destructure pagination controls
const { pageNo, lastPageNo, firstPage, lastPage, prevPage, nextPage } =
  paginator;
</script>
