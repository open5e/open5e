<template>
  <section class="docs-container container">
    <div class="flex">
      <h1 class="my-2 w-full">Feats</h1>

      <ApiTableNav
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

    <ApiResultsTable
      :data="data?.results"
      :cols="[
        {
          displayName: 'Name',
          value: (data) => data.name,
          sortValue: 'name',
          link: (data) => `/feats/${data.key}`,
        },
      ]"
      :sort-by="sortBy"
      :is-sort-descending="isSortDescending"
      @sort="(sortValue) => setSortState(sortValue)"
    />
  </section>
</template>

<script setup>
const { sortBy, isSortDescending, setSortState } = useSortState();

// fetch page of data from API and pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.feats,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  params: {
    fields: ['key', 'name', 'document'].join(','),
    document__fields: ['name', 'key'].join(','),
    depth: 1,
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
