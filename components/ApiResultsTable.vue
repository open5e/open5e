<template>
  <table class="w-full" v-if="results">
    <thead>
      <tr>
        <sortable-table-header
          v-if="false"
          v-for="column in ['name'].concat(cols)"
          :key="column"
          :title="column"
          :is-sorting-property="sortBy === column && sortDir"
          @sort="(prop) => updateSortState(prop)"
        />
        <!-- TODO: fix sorting -->
        <th
          v-for="column in ['name'].concat(cols)"
          :key="column"
          :title="column"
        >
          {{ column }}
        </th>
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

const props = defineProps({
  endpoint: { type: String },
  apiEndpoint: { type: String },
  cols: { type: Array, default: () => [] },
  fields: { type: Array, default: () => ['slug', 'name'] },
});

const { data, pageNo, prevPage, nextPage, isFetching, error } =
  useFindPaginated({
    endpoint: props.apiEndpoint,
    itemsPerPage: 5,
    params: { fields: props.fields.join() },
  });

const results = computed(() => data.value?.results);

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
</script>
