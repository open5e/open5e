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
    <table
      v-if="magic_items && magic_items.length != 0"
      class="filterable-table"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Rarity</th>
          <th>Attunement</th>
        </tr>
      </thead>
      <tbody>
        <api-result-row
          v-for="item in magic_items"
          :key="item.slug"
          :data="item"
          endpoint="magic-items"
          :cols="['type', 'rarity', 'requires_attunement']"
        />
      </tbody>
    </table>

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
import ApiResultRow from '~/components/ApiResultRow.vue';
const displayFilters = ref(false);
const magic_items_filters = ref({
  name: null,
  rarity: null,
  type: null,
  isAttunementRequired: null,
});

const { data: magic_items } = useMagicItems(magic_items_filters.value);
</script>

<style scoped lang="scss">
.letter-list {
  break-inside: avoid-column;

  &:first-child h3 {
    margin-top: 0;
  }
}
</style>
