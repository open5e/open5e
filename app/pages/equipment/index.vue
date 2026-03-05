<template>
  <section class="w-screen sm:w-full">
    <div class="flex">
      <h1 class="my-2">
        Equipment
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
        name: 'Search Equipment',
        filterField: 'name__icontains',
      }"
      :select-fields="equipmentFilterSelectFieldsDefinition"
    />

    <ResultsTable
      :data="data?.results"
      :cols="equipmentTableColumnDefinitions"
      :sort-by="sortBy"
      :is-sort-descending="isSortDescending"
      @sort="(sortValue) => setSortState(sortValue)"
    />
  </section>
</template>

<script setup lang="ts">
import {
  equipmentTableColumnDefinitions,
  equipmentFilterSelectFieldsDefinition
} from '@/helpers';

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

</script>
