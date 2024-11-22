<template>
  <div>
    <table v-if="data" class="m-0 w-full">
      <thead>
        <tr>
          <sortable-table-header
            v-for="col in cols"
            :key="col.field"
            :title="col.displayName"
            :sort-by="col.sortValue"
            :is-sorting-property="sortBy === col.sortValue"
            :is-sort-descending="isSortDescending"
            @sort="onSort(col.sortValue)"
          />
        </tr>
      </thead>
      <tbody v-if="results && results.length > 0">
        <api-result-row
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

const onSort = (sortValue) => emit('sort', sortValue);
</script>
