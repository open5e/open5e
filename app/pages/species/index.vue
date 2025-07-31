<template>
  <section class="w-screen sm:w-full">
    <div class="flex">
      <h1 class="my-2">Species</h1>

      <ResultsTablePaginator
        :page-number="pageNo"
        :last-page-number="lastPageNo"
        :items-per-page="itemsPerPage || 1"
        :total-items="data?.count || 1"
        @first="firstPage()"
        @next="nextPage()"
        @prev="prevPage()"
        @last="lastPage()"
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
      v-model="filterState.debouncedFilter"
      :data="data?.results"
      :cols="[
        {
          displayName: 'Name',
          value: (data) => data.name,
          sortValue: 'name',
          link: (data) => `/species/${data.key}`,
        }
      ]"
      :sort-by="sortBy"
      :is-sort-descending="isSortDescending"
      @sort="(sortValue) => setSortState(sortValue)"
    />
  </section>
</template>

<script setup lang="ts">
// Set up filters
const filterState = useFilterState<{ name__icontains: string }>({
  key: 'species',
  fields: {
    name__icontains: '',
  },
});

// State handlers for sorting results table
const { sortBy, isSortDescending, setSortState } = useSortState();

const fields = ['key', 'name', 'document'].join(',');
const docFields = ['name', 'key'].join(',');

const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.species,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  filter: filterState.debouncedFilter,
  params: {
    fields,
    document__fields: docFields,
    subspecies_of__isnull: true,
  },
});

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
