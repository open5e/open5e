<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Magic Item List</h1>
      <filter-button
        :show-clear-button="canClearFilter"
        :filter-count="enabeledFiltersCount"
        :filter-shown="displayFilter"
        @show-filter="displayFilter = !displayFilter"
        @clear-filter="clear"
      />
    </div>
    <magic-item-filter-box
      v-if="displayFilter"
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
        endpoint="magic-items"
        :api-endpoint="API_ENDPOINTS.magicitems"
        :fields="['category', 'rarity']"
        :params="{ is_magic_item: true }"
        :cols="[
          {
            displayName: 'Name',
            value: (data) => data.name,
            sortValue: 'name',
            link: (data) => `/magic-items/${data.key}`,
          },
          {
            displayName: 'Category',
            value: (data) => data.category.name,
            sortValue: 'category.name',
          },
          {
            displayName: 'Rarity',
            value: (data) => data.rarity.name,
            sortValue: 'rarity.name',
          },
        ]"
      />
    </div>
  </section>
</template>

<script setup>
const displayFilter = ref(false);

const {
  filter,
  debouncedFilter,
  canClearFilter,
  enabeledFiltersCount,
  clear,
  update,
} = useFilterState(DefaultMagicItemFilter);
</script>
