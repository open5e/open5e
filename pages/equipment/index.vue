<template>
  <section>
    <div class="flex">
      <h1 class="my-2 w-full">
        Equipment
      </h1>

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

    <ResultsTable
      v-model="filterState.debouncedFilter"
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

<script setup lang="ts">
// Set up filters
const filterState = useFilterState<{ name__icontains: string }>({
  key: 'equipment',
  fields: {
    name__icontains: '',
  },
});

// State handlers for sorting results table
const { sortBy, isSortDescending, setSortState } = useSortState();

const fields = ['key', 'name', 'document', 'category'].join(',');
const docFields = ['name', 'key'].join(',');
const categoryFields = ['name'].join(',');

const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.equipment,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  filter: filterState.debouncedFilter,
  params: {
    fields,
    document__fields: docFields,
    category__fields: categoryFields,
    is_magic_item: false,
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
