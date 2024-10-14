<template>
  <section class="docs-container container">
    <div class="flex">
      <h1 class="my-2 w-full">Spells</h1>
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
      :update-filters="update"
      :search="{
        name: 'Search Spells',
        filterField: 'name__contains',
      }"
      :select-fields="[
        {
          name: 'Level',
          filterField: 'level',
          options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => ({
            name: level,
            value: level,
          })),
        },
        {
          name: 'School',
          filterField: 'school__key',
          options: [
            'Abjuration',
            'Conjuration',
            'Divination',
            'Enchantment',
            'Evocation',
            'Illusion',
            'Necromancy',
            'Transmutation',
          ].map((school) => ({
            name: school,
            value: school.toLowerCase(),
          })),
        },
        {
          name: 'Class',
          filterField: 'classes__key__in',
          options: [
            'Bard',
            'Cleric',
            'Druid',
            'Sorcerer',
            'Warlock',
            'Wizard',
          ].map((className) => ({
            name: className,
            value: 'srd_' + className.toLowerCase(),
          })),
        },
      ]"
    />

    <!-- RESULTS TABLE -->
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
const fields = ['name', 'document', 'level', 'school', 'classes'];

const { debouncedFilter, update } = useFilterState();

// Fetch a page of results and pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.spells,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  filter: debouncedFilter,
  params: { fields, depth: 1 },
});

// destructure pagination controls
const { pageNo, lastPageNo, firstPage, lastPage, prevPage, nextPage } =
  paginator;
</script>
