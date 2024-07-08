<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Magic Item List</h1>
      <FilterButton
        :show-clear-button="canClearFilter"
        :filter-count="enabeledFiltersCount"
        :filter-shown="displayFilter"
        @show-filter="displayFilter = !displayFilter"
        @clear-filter="clear"
      />
    </div>
    <MagicItemFilterBox
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
        endpoint="magic-items"
        :api-endpoint="API_ENDPOINTS.magicitems"
        :cols="['type', 'rarity', 'requires_attunement']"
        v-model:filter="filter"
      />
    </div>
  </section>
</template>

<script setup>
import FilterButton from '~/components/FilterButton.vue';

const displayFilter = ref(false);

const { filter, canClearFilter, enabeledFiltersCount, clear } = useFilterState(
  DefaultMagicItemFilter
);
</script>
