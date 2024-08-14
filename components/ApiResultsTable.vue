<template>
  <div>
    <div class="flex w-full flex-wrap justify-end align-middle">
      <api-table-nav
        :page-number="pageNo"
        :last-page-number="lastPageNo"
        @first="firstPage()"
        @next="nextPage()"
        @prev="prevPage()"
        @last="lastPage()"
      />
    </div>

    <table v-if="results" class="m-0 w-full">
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
      <tbody v-if="results && results.length > 0">
        <api-result-row
          v-for="item in results"
          :key="item.slug"
          :data="item"
          :endpoint="endpoint"
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
    <div class="flex w-full flex-wrap justify-end align-middle">
      <div
        v-show="results && results.length > 0"
        class="flex w-full justify-start italic text-blood md:w-1/2"
      >
        Page {{ pageNo }} of {{ lastPageNo }}
      </div>
      <api-table-nav
        :page-number="pageNo"
        :last-page-number="lastPageNo"
        @first="firstPage()"
        @next="nextPage()"
        @prev="prevPage()"
        @last="lastPage()"
      />
    </div>
  </div>
</template>

<script setup>
import ApiResultRow from './ApiResultRow.vue';

const sortBy = ref('name');
const isSortDescending = ref(false);

const props = defineProps({
  endpoint: { type: String, required: true },
  apiEndpoint: { type: String, required: true },
  itemsPerPage: { type: Number, default: 50 },
  cols: { type: Array, default: () => [] },
});

const filter = defineModel({ default: () => ({}), type: Object });

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

const updateSortState = (property) => {
  if (property !== sortBy.value) {
    sortBy.value = property;
    isSortDescending.value = false;
  } else {
    isSortDescending.value = !isSortDescending.value;
  }
};
</script>
