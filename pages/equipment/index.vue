<template>
  <section>
    <div class="flex">
      <h1 class="my-2 w-full">Equipment</h1>
      <api-table-nav
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

    <api-results-table
      v-model="debouncedFilter"
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
const { debouncedFilter, update } = useFilterState();

const fields = ['key', 'name', 'document', 'category'].join(',');
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.equipment,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  filter: debouncedFilter,
  params: { fields, is_magic_item: false, depth: 1 },
});

const { pageNo, lastPageNo, firstPage, lastPage, prevPage, nextPage } =
  paginator;
</script>
