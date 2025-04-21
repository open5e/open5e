<template>
  <section class="docs-container container">
    <div class="flex justify-between">
      <h1 class="my-2 w-full">
        Magic Items
      </h1>

      <ApiTableNav
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
        name: 'Search Magic Items',
        filterField: 'name__icontains',
      }"
      :select-fields="[
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
        },
      ]"
      :checkbox-fields="[
        {
          name: 'Attunement',
          filterField: 'requires_attunement',
        },
      ]"
    />

    <ApiResultsTable
      v-model="debouncedFilter"
      :data="data?.results"
      :cols="[
        {
          displayName: 'Name',
          value: (data) => data.name,
          sortValue: 'name',
          link: (data) => `/magic-items/${data.key}`,
        },
        {
          displayName: 'Category',
          value: (data) => data.category.name,
          sortValue: 'category',
        },
        {
          displayName: 'Rarity',
          value: (data) => data.rarity.name,
          sortValue: 'rarity',
        },
        {
          displayName: 'Requires Attunement',
          value: (data) => data.requires_attunement,
          sortValue: 'requires_attunement',
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
const filterState = useFilterState<MagicItemFilter>({
  key: 'magicItems',
  fields: DefaultMagicItemFilter,
});

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
