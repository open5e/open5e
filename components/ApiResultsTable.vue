<template>
  <div class="flex w-full flex-wrap justify-end align-middle">
    <api-table-nav
      @first="firstPage()"
      @next="nextPage()"
      @prev="prevPage()"
      @last="lastPage()"
    />
  </div>

  <table class="m-0 w-full" v-if="results">
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
  <div class="flex w-full flex-wrap justify-end align-middle">
    <div
      v-if="data"
      class="flex w-full justify-start italic text-blood md:w-1/2"
    >
      Page {{ pageNo }} of {{ lastPageNo }}
    </div>
    <api-table-nav
      @first="firstPage()"
      @next="nextPage()"
      @prev="prevPage()"
      @last="lastPage()"
    />
  </div>
</template>

<script setup>
import ApiResultRow from './ApiResultRow.vue';

const sortBy = ref('name');
const isSortDescending = ref(false);

const props = defineProps({
  endpoint: { type: String },
  apiEndpoint: { type: String },
  itemsPerPage: { type: Number, default: 50 },
  cols: { type: Array, default: () => [] },
  filter: { type: Object, default: () => ({}) },
  // TODO: make columns into object with seperate display fields and sort keys
});

const filter = defineModel('filter', { default: () => ({}) });

const { data, pageNo, firstPage, prevPage, nextPage, lastPage, lastPageNo } =
  useFindPaginated({
    endpoint: props.apiEndpoint,
    itemsPerPage: props.itemsPerPage,
    sortByProperty: sortBy,
    isSortDescending: isSortDescending,
    filter: filter,
    params: {
      fields: ['slug', 'name'].concat(props.cols).join(),
    },
  });

const results = computed(() => data.value?.results);

watch(filter, () => {
  console.log('filter changed', filter.value);
});

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
