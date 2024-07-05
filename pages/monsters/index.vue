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
        >
          <!-- {{ monstersListed.length }}
          {{ monstersListed.length === 1 ? 'Result' : 'Results' }}
          <span v-if="filter.length > 0">&nbsp;for {{ filter }}</span> -->
        </h3>
        <div aria-live="assertive" aria-atomic="true" class="sr-only">
          <span v-if="monsters && monsters.length === 0">No results.</span>
        </div>
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

const currentSortDir = ref('ascending');
const currentSortProperty = ref('name');
const empty_filter = copyDefaultMonsterFilter();
const filters = ref(empty_filter);

const { data: monsters } = useAllMonsters({
  fields: ['slug', 'name', 'cr', 'type', 'size', 'hit_points'].join(),
});
const filtered_monsters = computed(() => {
  return monsters.value ? filterMonsters(monsters.value, filters.value) : [];
});

const ariaSort = computed(() => {
  return {
    name: getAriaSort('name'),
    type: getAriaSort('type'),
    challenge_rating: getAriaSort('cr'),
    size: getAriaSort('size'),
    hit_points: getAriaSort('hit_points'),
  };
});

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

function getAriaSort(columName) {
  if (currentSortProperty.value === columName) {
    return currentSortDir.value;
  }
  return null;
}
</script>

<style scoped lang="scss">
.monster-table-header {
  cursor: pointer;
  vertical-align: baseline;

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    text-decoration: underline;
    font-weight: bold;
  }
}

.monster-table-header-class {
  vertical-align: baseline;
}
</style>
