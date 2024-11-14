<template>
  <section>
    <div class="flex">
      <h1 class="my-2 w-full">Equipment</h1>

      <ApiTableNav
        :page-number="pageNo"
        :last-page-number="lastPageNo"
        @first="firstPage()"
        @next="nextPage()"
        @prev="prevPage()"
        @last="lastPage()"
      />
    </div>

    <ApiTableFilter
      :filter="filter"
      :search="{
        name: 'Search Equipment',
        filterField: 'name__icontains',
      }"
      :select-fields="[
        {
          name: 'Category',
          filterField: 'category',
          options: [
            'Adventuring Gear',
            'Ammunition',
            'Armor',
            'Drawn Vehicle',
            'Poison',
            'Ring',
            'Rod',
            'Shield',
            'Staff',
            'Tools',
            'Trade Goods',
            'Wand',
            'Waterborne Vehicle',
            'Weapon',
          ].map((category) => ({
            name: category,
            value: category.toLowerCase().split(' ').join('-'),
          })),
        },
      ]"
    />

    <ApiResultsTable
      v-model="filter.debouncedFilter"
      :data="data?.results"
      :cols="[
        {
          displayName: 'Name',
          value: (data) => data.name,
          sortValue: 'name',
          link: (data) => `/equipment/${data.key}`,
        },
        {
          displayName: 'Category',
          value: (data) => data.category.name,
          sortValue: 'category',
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

// Set up filters
const filter = useFilterState({
  initialFilters: {
    name__icontains: '',
  },
});

const fields = ['key', 'name', 'document', 'category'].join(',');
const docFields = ['name', 'key'].join(',');
const categoryFields = ['name'].join(',');

const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.equipment,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  filter: filter.debouncedFilter,
  params: {
    fields,
    document__fields: docFields,
    category__fields: categoryFields,
    is_magic_item: false,
    depth: 1,
  },
});

const { pageNo, lastPageNo, firstPage, lastPage, prevPage, nextPage } =
  paginator;
</script>
