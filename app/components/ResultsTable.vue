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
  <div>
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
      <tbody v-if="results && results.length > 0">
        <ResultsTableRow
          v-for="item in results"
          :key="item.key"
          :data="item"
          :cols="cols"
        />
      </tbody>
      <tbody v-else-if="results">
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

<script setup lang="ts">

// infer type from `data` prop, but declare that the `key` field exists
type APIResults = EndpointToFindOneTypeMap[keyof EndpointToFindOneTypeMap] & { key: string; };

// generic props interface that works with any API endpoint
interface ResultsTableProps<T extends APIResults = APIResults> {
  /** The paginated API response data */
  data?: T[] | null
  /** Array of column definitions */
  cols: TableColumn<T>[]
  /** The current sort field */
  sortBy?: string
  /** Whether sorting is in descending order */
  isSortDescending?: boolean
  /** Loading state */
  isLoading?: boolean
  /** Error state */
  error?: Error | null
}

// type interface for the `cols` prop
interface TableColumn<T extends APIResults = APIResults> {
  /** The name to display in the column header */
  displayName: string;
  /** Function to extract/transform the value to display */
  value: (data: T) => string | number;
  /** The field name used for sorting (optional) */
  sortValue?: string;
  /** Function to generate a link for this cell (optional) */
  link?: (data: T) => string;
  /** Whether this column has lower priority in responsive layouts */
  isLeastPriority?: boolean;
};

const props = withDefaults(defineProps<ResultsTableProps>(), {
  data: null,
  sortBy: 'name',
  isSortDescending: false,
  isLoading: false,
  error: null
});

const emit = defineEmits(['sort']);

const results = computed(() => {
  if (!props.data || typeof props.data !== 'object') return [];
  return props.data;
});

const onSort = (sortValue?: string) => {
  if (!sortValue) emit('sort', sortValue);
};
</script>
