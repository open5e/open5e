<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Spells</h1>
    </div>

    <api-table-nav
      :page-number="pageNo"
      :last-page-number="lastPageNo"
      @first="firstPage()"
      @next="nextPage()"
      @prev="prevPage()"
      @last="lastPage()"
    />

    <api-results-table
      :data="data?.results"
      :cols="[
        {
          displayName: 'Name',
          value: (data) => data.name,
          sortValue: 'name',
          link: (data) => `/spells/${data.key}`,
        },
        {
          displayName: 'Level',
          value: (data) => data.level,
          sortValue: 'level',
        },
        {
          displayName: 'School',
          value: (data) => data.school.name,
          sortValue: 'school',
        },
        {
          displayName: 'Classes',
          value: (data) => {
            return data.classes.map((c) => c.name).join(', ');
          },
        },
        {
          displayName: 'Concentration',
          value: (data) => (data.concentration ? '√' : '-'),
          sortValue: 'concentration',
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

// fields to fetch from API to populate table
const fields = ['name', 'document', 'level', 'school', 'verbal', 'classes'];

// Fetch a page of results and pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.spells,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  params: { fields, depth: 1 },
});

// destructure pagination controls
const { pageNo, lastPageNo, firstPage, lastPage, prevPage, nextPage } =
  paginator;
</script>
