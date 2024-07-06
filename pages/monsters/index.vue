<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Monster List</h1>
      <FilterButton
        :show-clear-button="isAnyFilterSet"
        :filter-count="filterCount"
        :filters-shown="displayFilters"
        @show-filters="displayFilters = !displayFilters"
        @clear-filters="handleClearFilters"
      />
    </div>
    <MonsterFilterBox
      v-if="displayFilters"
      ref="monsterFilterBox"
      v-model="filters"
    />
    <div>
      <div>
        <h3
          ref="results"
          class="sr-only"
          tabindex="-1"
          @keyup.esc="focusFilter"
        ></h3>
      </div>
      <api-results-table
        endpoint="monsters"
        :api-endpoint="API_ENDPOINTS.monsters"
        :cols="['type', 'cr', 'size', 'hit_points']"
        v-model:filters="filters"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import ApiResultsTable from '~/components/ApiResultsTable.vue';
import FilterButton from '~/components/FilterButton.vue';
import MonsterFilterBox from '~/components/MonsterFilterBox.vue';

const empty_filter = copyDefaultMonsterFilter();
const filters = ref(empty_filter);

const displayFilters = ref(false);
const monsterFilterBox = ref(null);

const isAnyFilterSet = computed(() => {
  return Object.values(filters.value).some(
    (value) => value !== undefined && value !== ''
  );
});

const filterCount = computed(() => {
  return Object.values(filters.value).filter(
    (value) => value !== undefined && value !== ''
  ).length;
});

function handleClearFilters() {
  filters.value = copyDefaultMonsterFilter();
}
</script>
