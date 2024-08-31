<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Monster List</h1>
      <filter-button
        :show-clear-button="canClearFilter"
        :filter-count="enabeledFiltersCount"
        :filter-shown="displayFilter"
        @show-filter="displayFilter = !displayFilter"
        @clear-filter="clear"
      />
    </div>
    <monster-filter-box
      v-if="displayFilter"
      ref="monsterFilterBox"
      :filter="filter"
      :update-filter="update"
    />
    <div>
      <div>
        <h3
          ref="results"
          class="sr-only"
          tabindex="-1"
          @keyup.esc="focusFilter"
        />
      </div>
      <api-results-table
        v-model="debouncedFilter"
        endpoint="monsters"
        :api-endpoint="API_ENDPOINTS.monsters"
        :fields="['challenge_rating_decimal']"
        :cols="[
          {
            displayName: 'Name',
            value: (data) => data.name,
            sortValue: 'name',
            link: (data) => `/monsters/${data.key}`,
          },
          {
            displayName: 'CR',
            value: (data) => data.challenge_rating_decimal,
            sortValue: 'challenge_rating_decimal',
          },
        ]"
      />
    </div>
  </section>
</template>

<script setup>
import ApiResultsTable from '~/components/ApiResultsTable.vue';
import FilterButton from '~/components/FilterButton.vue';
import MonsterFilterBox from '~/components/MonsterFilterBox.vue';

const displayFilter = ref(false);

const {
  filter,
  debouncedFilter,
  canClearFilter,
  enabeledFiltersCount,
  clear,
  update,
} = useFilterState(DefaultMonsterFilter);
</script>
