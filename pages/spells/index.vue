<template>
  <section class="docs-container container">
    <div class="flex">
      <h1 class="my-2 w-full">
        Spells
      </h1>

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

    <ApiTableFilter
      :filter-state="filterState"
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
    <ApiResultsTable
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
const filterState = useFilterState<SpellFilter>({
  key: 'spells',
  fields: {
    name__contains: '',
    school__key: '',
    classes__key__in: '',
  },
});

// State handlers for sorting results table
const { sortBy, isSortDescending, setSortState } = useSortState();

// fields to fetch from API to populate table
const fields = [
  'key',
  'name',
  'document',
  'level',
  'school',
  'classes',
  'concentration',
].join(',');

// Fetch a page of results and pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.spells,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  filter: filterState.debouncedFilter,
  params: {
    fields,
    document__fields: ['name', 'key'].join(','),
    classes__fields: ['name'].join(','),
    school__fields: ['name', 'key'].join(','),
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
