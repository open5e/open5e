<template>
  <section class="docs-container container">
    <div class="flex">
      <h1 class="my-2 w-screen sm:w-full">
        Spells
      </h1>

      <ResultsTablePaginator
        :page-number="paginator.pageNo || 1"
        :last-page-number="paginator.lastPageNo || 1"
        :items-per-page="paginator.itemsPerPage || 1"
        :total-items="data?.count || 1"
        @first="paginator.firstPage()"
        @next="paginator.nextPage()"
        @prev="paginator.prevPage()"
        @last="paginator.lastPage()"
      />
    </div>

    <ResultsTableFilter
      :filter-state="filterState"
      :search="{
        name: 'Search Spells',
        filterField: 'name__contains',
      }"
      :select-fields="filterSelectFieldsDefinition"
    />

    <!-- RESULTS TABLE -->
    <ResultsTable
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
          isLeastPriority: true,
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
    level: '',
    school__key: '',
    classes__key__in: '',
  },
});

const SCHOOLS = ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'];
const CLASSES = ['Bard', 'Cleric', 'Druid', 'Sorcerer', 'Warlock', 'Wizard'];
    
const filterSelectFieldsDefinition = [
  {
    name: 'Level',
    filterField: 'level',
    options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => ({
      name: level.toString(),
      value: level.toString(),
    })),
  },
  {
    name: 'School',
    filterField: 'school__key',
    options: SCHOOLS.map((school) => ({
      name: school,
      value: school.toLowerCase(),
    })),
  },
  {
    name: 'Class',
    filterField: 'classes__key__in',
    options: CLASSES.map((className) => ({
      name: className,
      value: 'srd_' + className.toLowerCase(),
    })),
    isLeastPriority: true,
  },
];

// State handlers for sorting results table
const { sortBy, isSortDescending, setSortState } = useSortState();

// Fetch a page of results and pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.spells,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  filter: filterState.debouncedFilter,
  params: {
    fields: ['key', 'name', 'document', 'level', 'school', 'classes'].join(','),
    document__fields: ['name', 'key'].join(','),
    classes__fields: ['name'].join(','),
    school__fields: ['name', 'key'].join(','),
  },
});

</script>
