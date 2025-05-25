<script>
/**
 * ApiResultsTable.vue - Displays a sortable list of data returned by the Open5e
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
 * @component ApiResultRow -> render table rows (refac'd into own cmpnt for readibility)
 * @component SortableTableHeader -> captures logic for column headers
 */
</script>

<template>
  <div>
    <table
      v-if="data"
      class="m-0 w-full"
    >
      <thead>
        <tr>
          <SortableTableHeader
            v-for="col in cols"
            :key="col.field"
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
        <ApiResultRow
          v-for="item in results"
          :key="item.key ?? item.slug"
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

<script setup>
const emit = defineEmits(['sort']);

const props = defineProps({
  data: { type: Object, default: () => {} },
  itemsPerPage: { type: Number, default: 50 },
  cols: { type: Array, default: () => [] },
  sortBy: { type: String, default: 'name' },
  isSortDescending: { type: Boolean },
});

const results = computed(() => props.data);

const onSort = sortValue => emit('sort', sortValue);
</script>
