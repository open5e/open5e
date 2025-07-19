<template>
  <section class="docs-container container">
    <div class="flex">
      <h1 class="my-2">
        Conditions
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

    <ResultsTable
      :data="data?.results"
      :cols="[
        {
          displayName: 'Name',
          value: (data) => data.name,
          link: (data) => `/conditions/${data.key}`,
        },
      ]"
    />
  </section>
</template>

<script setup>
// fetch page of data from API and pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.conditions,
  params: {
    fields: ['name', 'key', 'document'].join(','),
    documents__fields: ['name', 'key'].join(','),
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
