<template>
  <section class="docs-container container">
    <div class="flex">
      <h1 class="my-2">
        Rules
      </h1>

      <ResultsTablePaginator
        class="w-full"
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
        name: 'Search Rules',
        filterField: 'name__contains',
      }"
    />

    <ResultsTable
      :data="data?.results"
      :cols="[
        {
          displayName: 'Name',
          value: (data) => data.name,
          link: (data) => `/rules/${data.key}`,
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
const filterState = useFilterState<{ name__contains: string }>({
  key: 'rules',
  fields: {
    name__contains: '',
  },
});

const { sortBy, isSortDescending, setSortState } = useSortState();

// fetch a page of data from API, and pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.rules,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  filter: filterState.debouncedFilter,
  params: {
    fields: ['name', 'key', 'document'].join(','),
    document__fields: ['name', 'key'].join(','),
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
