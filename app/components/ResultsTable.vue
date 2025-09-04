<script lang="ts">
/**
 * ResultsTable.vue - Displays a sortable list of data returned by the Open5e
 * API. Used on top-level pages where lists of results can be viewed.
 *
 * -= PROPS (INPUTS) =-
 * @prop {Object} data - API data to display
 * @prop {Number} [itemsPerPage=50] - The number of API results to display per page
 * @prop {Array} col - Array of column definitions, each containing:
 *   @property {String} field - The field name (used for sorting)
 *   @property {String} displayName - The name to display in the column header
 * @prop {String} [sortBy="name"] – The column to sort by (compares against col.field)
 * @prop {Boolean} isSortDescending – Controls sort direction
 *
 * -= EMITS (OUTPUTS) =-
 * @emits {String} sort – Emit the sorting value when a column is sorted
 *
 * -= DEPENDENCIES =-
 * This component uses the following sub-components
 * @component ResultsTableRow -> render table rows (refac'd into own cmpnt for readibility)
 * @component ResultsTableHeader -> captures logic for column headers
 */
</script>

<template>
  <div class="w-full">
    <table
      v-if="data && !isLoading"
      class="m-0 w-full"
    >
      <thead>
        <tr>
          <ResultsTableHeader
            v-for="col in cols"
            :key="col.sortValue || col.displayName"
            :title="col.displayName"
            :sort-by="col.sortValue"
            :is-least-priority="col.isLeastPriority"
            :is-sorting-property="sortBy === col.sortValue"
            :is-sort-descending="isSortDescending"
            @sort="onSort(col.sortValue)"
          />
        </tr>
      </thead>
      <tbody v-if="data && data.length > 0">
        <ResultsTableRow
          v-for="item in data"
          :key="item.key"
          :data="item"
          :cols="cols"
        />
      </tbody>
      <tbody v-else-if="data">
        <tr>
          <td>No results match your search.</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td>Loading...</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts" generic="T extends Open5eData">
import type { Open5eData } from '@/types';

// generic props interface that works with any API endpoint
interface ResultsTableProps<T extends Open5eData> {
  data?: T[] | null           // API data (paginated)
  cols: TableColumn<T>[]      // column definitions
  sortBy?: string             // column to sort results by
  isSortDescending?: boolean  // sort direction
  isLoading?: boolean         // load state
  error?: Error | null        // error state
};

// type interface for the `cols` prop
interface TableColumn<T extends Open5eData> {
  displayName: string;
  value: (data: T) => string | number;
  sortValue?: string;
  link?: (data: T) => string;
  isLeastPriority?: boolean;
};

// define component props using inferred types
withDefaults(defineProps<ResultsTableProps<T>>(), {
  data: null,
  sortBy: 'name',
  isSortDescending: false,
  isLoading: false,
  error: null
});

const emit = defineEmits(['sort']);

const onSort = (sortValue?: string) => {
  if (sortValue) emit('sort', sortValue);
};
</script>
