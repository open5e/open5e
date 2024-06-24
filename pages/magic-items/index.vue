<template>
  <section class="container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Magic Item List</h1>
      <filter-button @show-filters="displayFilters = !displayFilters" />
    </div>
    <magic-item-filter-box
      v-if="displayFilters"
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
</script>

<style scoped lang="scss">
.letter-list {
  break-inside: avoid-column;

  &:first-child h3 {
    margin-top: 0;
  }
}
</style>
