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
          displayName: 'Components',
          value: (data) => formatComponents(data),
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
const fields = [
  'name',
  'document',
  'level',
  'school',
  'verbal',
  'material',
  'material_consumed',
  'somatic',
  'concentration',
];

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

// helper function for formatting spell components
const formatComponents = (data) => {
  const { verbal, somatic, material, material_consumed: consumed } = data;
  let components = [];
  if (verbal) {
    components.push('V');
  }
  if (somatic) {
    components.push('S');
  }
  if (material) {
    components.push(consumed ? 'M*' : 'M');
  }
  return components.join(', ');
};
</script>
