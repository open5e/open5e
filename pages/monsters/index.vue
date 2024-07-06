<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Monster List</h1>
      <FilterButton
        :show-clear-button="canClearFilter"
        :filter-count="enabeledFiltersCount"
        :filter-shown="displayFilter"
        @show-filter="displayFilter = !displayFilter"
        @clear-filter="clear"
      />
    </div>
    <MonsterFilterBox
      v-if="displayFilter"
      ref="monsterFilterBox"
      v-model="filter"
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
        v-model:filter="filter"
      />
    </div>
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';
import FilterButton from '~/components/FilterButton.vue';
import MonsterFilterBox from '~/components/MonsterFilterBox.vue';

const displayFilter = ref(false);

const { filter, canClearFilter, enabeledFiltersCount, clear } =
  useFilterState(DefaultMonsterFilter);
</script>
