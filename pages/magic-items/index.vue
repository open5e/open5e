<template>
  <section class="container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Magic Item List</h1>
      <FilterButton
        :show-clear-button="isAnyFilterSet"
        :filter-count="filterCount"
        :filters-shown="displayFilters"
        @show-filters="displayFilters = !displayFilters"
        @clear-filters="handleClearFilters"
      />
    </div>
    <magic-item-filter-box
      v-if="displayFilters"
      ref="itemFilterBox"
      v-model="magic_items_filters"
    />
    <div v-if="magic_items" class="flex w-full italic text-blood">
      Displaying {{ magic_items.length }} magic items
    </div>
    <hr class="color-blood mx-auto" />
    <api-results-table
      v-if="magic_items && magic_items.length > 0"
      endpoint="magic-items"
      :data="magic_items"
      :cols="['type', 'rarity', 'requires_attunement']"
    />

    <div
      v-else-if="magic_items && magic_items.length === 0"
      aria-live="assertive"
      aria-atomic="true"
    >
      <p>No results</p>
    </div>
    <p v-else>Loading...</p>
  </section>
</template>

<script setup>
import FilterButton from '~/components/FilterButton.vue';
import { ref, computed } from 'vue';

const displayFilters = ref(false);
const magic_items_filters = ref({
  name: null,
  rarity: null,
  type: null,
  isAttunementRequired: null,
});

const { data: magic_items } = useMagicItems(magic_items_filters.value, {
  fields: [
    'slug',
    'name',
    'type',
    'rarity',
    'requires_attunement',
    'document__title',
    'document__slug',
  ].join(),
});

const isAnyFilterSet = computed(() => {
  return Object.values(magic_items_filters.value).some(
    (value) => value !== null
  );
});

const filterCount = computed(() => {
  return Object.values(magic_items_filters.value).filter(
    (value) => value !== null
  ).length;
});

const itemFilterBox = ref(null);

function handleClearFilters() {
  if (itemFilterBox.value) {
    itemFilterBox.value.clearFilters();
  }
}
</script>

<style scoped lang="scss">
.letter-list {
  break-inside: avoid-column;

  &:first-child h3 {
    margin-top: 0;
  }
}
</style>
