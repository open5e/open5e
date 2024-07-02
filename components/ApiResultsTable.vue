<template>
  <table class="w-full" v-if="results">
    <thead>
      <tr>
        <sortable-table-header
          v-for="column in ['name'].concat(cols)"
          :key="column"
          :title="column"
          :is-sorting-property="sortBy === column"
          :is-sort-descending="isSortDescending"
          @sort="(prop) => updateSortState(prop)"
        />
      </tr>
    </thead>
    <tbody v-if="results">
      <api-result-row
        v-for="item in results"
        :key="item.slug"
        :data="item"
        :endpoint="endpoint"
        :cols="cols"
      />
    </tbody>
    <tbody v-else>
      <tr>
        <td>Loading...</td>
      </tr>
    </tbody>
  </table>
  <button v-on:click="prevPage()">prev</button>
  <button v-on:click="nextPage()">next</button>
</template>

<script setup>
import ApiResultRow from './ApiResultRow.vue';

const sortBy = ref('name');
const isSortDescending = ref(false);

const props = defineProps({
  endpoint: { type: String },
  apiEndpoint: { type: String },
  cols: { type: Array, default: () => [] },
  // TODO: make columns into object with seperate display fields and sort keys
});

// TODO: fields = slug + +name + cols
const { data, pageNo, prevPage, nextPage, isFetching, error } =
  useFindPaginated({
    endpoint: props.apiEndpoint,
    itemsPerPage: 5,
    sortByProperty: sortBy,
    isSortDescending: isSortDescending,
    params: { fields: ['name'].concat(props.cols).join() },
  });

const results = computed(() => data.value?.results);

const updateSortState = (property) => {
  if (property !== sortBy.value) {
    sortBy.value = property;
    isSortDescending.value = false;
  } else {
    isSortDescending.value = !isSortDescending.value;
  }
  console.log(
    'updateSortState',
    property,
    sortBy.value,
    isSortDescending.value
  );
};
</script>
