<template>
  <section class="container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Spell List</h1>
    </div>
    <PageNav
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
      <table v-if="data" class="filterable-table">
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
              :current-sort-dir="ariaSort.school"
              @sort="(dir) => sort('school', dir)"
              >School</sortable-table-header
            >
            <sortable-table-header
              :current-sort-dir="ariaSort.level_int"
              @sort="(dir) => sort('level_int', dir)"
              >Level</sortable-table-header
            >
            <sortable-table-header
              class="hide-mobile"
              :current-sort-dir="ariaSort.components"
              @sort="(dir) => sort('components', dir)"
              >Components</sortable-table-header
            >
            <th class="spell-table-header-class hide-mobile">Class</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="spell in spellPage" :key="spell.slug">
            <th>
              <nuxt-link
                tag="a"
                :params="{ id: spell.slug }"
                :to="`/spells/${spell.slug}`"
                class="mr-2"
                :prefetch="false"
              >
                {{ spell.name }}
              </nuxt-link>
              <source-tag
                v-if="
                  spell.document__slug && spell.document__slug !== 'wotc-srd'
                "
                class="hide-mobile ml-0"
                :title="spell.document__title"
                :text="spell.document__slug"
              />
            </th>
            <td>{{ capitalize(spell.school) }}</td>
            <td>{{ spell.level_int }}</td>
            <td class="hide-mobile">
              {{ spell.components }}
            </td>
            <td class="hide-mobile">
              <span
                v-for="(spellclass, index) in spell.spell_lists"
                :key="spellclass"
              >
                <!-- the item in the spell_list list -->
                <span class="spell_lists">{{ capitalize(spellclass) }}</span>
                <!-- comma after any item that isn't the last -->
                <span v-if="index + 1 < spell.spell_lists.length">, </span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>Loading...</p>
    </div>
    <PageNav
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
import SourceTag from '~/components/SourceTag.vue';
const { data } = useAllSpells();

const PAGE_SIZE = 50;

const currentSortProperty = ref('name');
const currentSortDir = ref('ascending');

const pageNumber = ref(0);

const spellPage = computed(() => {
  if (!data.value) {
    return [];
  }

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

const ariaSort = computed(() => {
  return {
    name: getAriaSort('name'),
    school: getAriaSort('school'),
    level_int: getAriaSort('level_int'),
    components: getAriaSort('components'),
  };
});

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const sort = (prop, dir) => {
  currentSortProperty.value = prop;
  currentSortDir.value = dir;
};

const getAriaSort = (columName) => {
  if (currentSortProperty.value === columName) {
    return currentSortDir.value === 'ascending' ? 'ascending' : 'descending';
  }
  return null;
};
</script>

<style scoped lang="scss">
@media (max-width: 600px) {
  .hide-mobile {
    display: none;
  }
}
</style>
