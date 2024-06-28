<template>
  <table class="w-full">
    <thead>
      <tr>
        <sortable-table-header
          v-for="column in ['name'].concat(cols)"
          :key="column"
          :title="column"
          :is-sorting-property="sortBy === column && sortDir"
          @sort="(prop) => updateSortState(prop)"
        />
      </tr>
    </thead>
    <tbody>
      <api-result-row
        v-for="item in sortedData"
        :key="item.slug"
        :data="item"
        :endpoint="endpoint"
        :cols="cols"
      />
    </tbody>
  </table>
</template>

<script setup>
import ApiResultRow from './ApiResultRow.vue';

const props = defineProps({
  endpoint: { type: String, default: '' },
  cols: { type: Array, default: () => [] },
  data: { type: Array, default: () => [] },
});

const sortBy = ref('name');
const sortDir = ref('ascending');

const updateSortState = (property) => {
  if (property !== sortBy.value) {
    sortBy.value = property;
    sortDir.value = 'ascending';
  } else {
    sortDir.value = sortDir.value === 'ascending' ? 'descending' : 'ascending';
  }
};

// re-sort data whenever sortBy or sortDir state updated
const sortedData = computed(() =>
  sortByField(props.data, sortBy.value, sortDir.value)
);
</script>
