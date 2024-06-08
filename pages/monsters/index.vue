<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Monster List</h1>
      <FilterButton @showFilters="displayFilters = !displayFilters" />
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
      <!-- <span style="display:block">Sorting by sort={{ currentSortProperty }}, dir={{ currentSortDir }}</span> -->
      <table v-if="monsters && monsters.length > 0" class="filterable-table">
        <caption class="sr-only">
          Column headers with buttons are sortable.
        </caption>
        <thead>
          <tr>
            <sortable-table-header
              :current-sort-dir="ariaSort.name"
              @sort="(dir) => sort('name', dir)"
              >Name</sortable-table-header
            >
            <sortable-table-header
              :current-sort-dir="ariaSort.type"
              @sort="(dir) => sort('type', dir)"
              >Type</sortable-table-header
            >
            <sortable-table-header
              :current-sort-dir="ariaSort.challenge_rating"
              @sort="(dir) => sort('cr', dir)"
              >CR</sortable-table-header
            >
            <sortable-table-header
              :current-sort-dir="ariaSort.size"
              @sort="(dir) => sort('size', dir)"
              >Size</sortable-table-header
            >
            <sortable-table-header
              :current-sort-dir="ariaSort.hit_points"
              @sort="(dir) => sort('hit_points', dir)"
              >Hit Points</sortable-table-header
            >
          </tr>
        </thead>
        <tbody>
          <!-- TODO: FIX SORTING -->
          <tr v-for="monster in sorted_monsters" :key="monster.slug">
            <th>
              <nuxt-link
                tag="a"
                :params="{ id: monster.slug }"
                :to="`/monsters/${monster.slug}`"
                :prefetch="false"
              >
                {{ monster.name }}
              </nuxt-link>
              <source-tag
                v-if="
                  monster.document__slug &&
                  monster.document__slug !== 'wotc-srd'
                "
                class=""
                :title="monster.document__title"
                :text="monster.document__slug"
              />
            </th>
            <td>{{ monster.type }}</td>
            <td><fraction-renderer :challenge="monster.challenge_rating" /></td>
            <td>{{ monster.size }}</td>
            <td>{{ monster.hit_points }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else-if="monsters && monsters.length === 0">No results.</p>
      <p v-else>Loading...</p>
    </div>
  </section>
</template>

<script setup>
import FilterButton from '~/components/FilterButton.vue';
import FractionRenderer from '~/components/FractionRenderer.vue';
import SourceTag from '~/components/SourceTag.vue';
import SortableTableHeader from '~/components/SortableTableHeader.vue';
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

const { data: monsters } = useAllMonsters(filters);
const filtered_monsters = computed(() => {
  return monsters.value ? filterMonsters(monsters.value, filters.value) : [];
});
const sorted_monsters = computed(() => {
  return sortByField(
    filtered_monsters.value,
    currentSortProperty.value,
    currentSortDir.value
  );
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

function sort(prop, value) {
  currentSortDir.value = value;
  currentSortProperty.value = prop;
}

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
