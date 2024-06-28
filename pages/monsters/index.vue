<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Monster List</h1>
      <FilterButton @show-filters="displayFilters = !displayFilters" />
    </div>
    <MonsterFilterBox v-if="displayFilters" v-model="filters" />
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
        v-if="monsters && monsters.length > 0"
        endpoint="monsters"
        :data="filtered_monsters"
        :cols="['type', 'cr', 'size', 'hit_points']"
      />
      <p v-else-if="monsters && monsters.length === 0">No results.</p>
      <p v-else>Loading...</p>
    </div>
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';
import FilterButton from '~/components/FilterButton.vue';
import MonsterFilterBox from '~/components/MonsterFilterBox.vue';

const currentSortDir = ref('ascending');
const currentSortProperty = ref('name');
const filters = ref({
  challengeLow: null,
  challengeHigh: null,
  hpLow: null,
  hpHigh: null,
  name: null,
  size: null,
  type: null,
});

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

function getAriaSort(columName) {
  if (currentSortProperty.value === columName) {
    return currentSortDir.value;
  }
  return null;
}

const displayFilters = ref(false);
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
