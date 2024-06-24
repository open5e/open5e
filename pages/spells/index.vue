<template>
  <section class="container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Spell List</h1>
    </div>
    <page-nav
      v-if="data"
      :list-length="data.length"
      list-wording="spells listed."
      :page-number="pageNumber"
      :page-count="pageCount"
      @first="pageNumber = 0"
      @last="pageNumber = pageCount - 1"
      @next="pageNumber++"
      @prev="pageNumber--"
    />
    <div>
      <api-results-table
        v-if="data"
        endpoint="spells"
        :data="spellPage"
        :cols="['school', 'level_int', 'components', 'dnd_class']"
      />
      <p v-else>Loading...</p>
    </div>
    <page-nav
      v-if="data"
      :list-length="data.length"
      list-wording="spells listed."
      :page-number="pageNumber"
      :page-count="pageCount"
      @first="pageNumber = 0"
      @last="pageNumber = pageCount - 1"
      @next="pageNumber++"
      @prev="pageNumber--"
    />
  </section>
</template>

<script setup>
import PageNav from '~/components/PageNav.vue';
import ApiResultsTable from '~/components/ApiResultsTable.vue';

const { data } = useAllSpells({
  fields: [
    'name',
    'slug',
    'school',
    'level_int',
    'components',
    'dnd_class',
  ].join(),
});

const PAGE_SIZE = 50;

const currentSortProperty = ref('name');
const currentSortDir = ref('ascending');

const pageNumber = ref(0);

const spellPage = computed(() => {
  if (!data.value) {
    return [];
  }

  console.log(data.value);
  return sortByField(
    data.value,
    currentSortProperty.value,
    currentSortDir.value
  ).slice(
    pageNumber.value * PAGE_SIZE,
    pageNumber.value * PAGE_SIZE + PAGE_SIZE
  );
});

const pageCount = computed(() =>
  data.value ? Math.ceil(data.value.length / PAGE_SIZE) : 0
);
</script>

<style scoped lang="scss">
@media (max-width: 600px) {
  .hide-mobile {
    display: none;
  }
}
</style>
