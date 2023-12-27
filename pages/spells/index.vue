<template>
  <section class="container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Spell List</h1>
    </div>
    <PageNav
      :list-length="filteredSpells.length"
      list-wording="spells listed."
      :page-number="pageNumber"
      :page-count="pageCount"
      @first="pageNumber = 0"
      @last="pageNumber = pageCount - 1"
      @next="pageNumber++"
      @prev="pageNumber--"
    />
    <div>
      <p v-if="!spells.length">Loading...</p>
      <table v-else class="filterable-table">
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
          <tr v-for="spell in spellsListed" :key="spell.slug">
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
                <span class="spell_lists" @click="filterByClass(spellclass)">{{
                  capitalize(spellclass)
                }}</span>
                <!-- comma after any item that isn't the last -->
                <span v-if="index + 1 < spell.spell_lists.length">, </span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <PageNav
      :list-length="filteredSpells.length"
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

<script>
import FilterInput from '~/components/FilterInput.vue';
import PageNav from '~/components/PageNav.vue';
import SourceTag from '~/components/SourceTag.vue';
import { useMainStore } from '~/store';

export default {
  components: {
    PageNav,
    SourceTag,
  },
  setup() {
    const store = useMainStore();
    return { store };
  },
  data() {
    return {
      filter: '',
      currentSortProperty: 'name',
      currentSortDir: 'ascending',
      pageNumber: 0,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.spells.length / 50);
    },
    spells: function () {
      return this.store.allSpells;
    },
    spellsListed: {
      get: function () {
        let start = this.pageNumber * 50;
        let end = start + 50;
        return this.filteredSpells.slice(start, end);
      },
      set: function () {
        return this.filteredSpells.sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === 'descending') {
            modifier = -1;
          }
          if (a[this.currentSortProperty] < b[this.currentSortProperty]) {
            return -1 * modifier;
          }
          if (a[this.currentSortProperty] > b[this.currentSortProperty]) {
            return 1 * modifier;
          }
          return 0;
        });
      },
    },
    filteredSpells: function () {
      return this.spells.filter((spell) => {
        return spell.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1;
      });
    },
    ariaSort: function () {
      return {
        name: this.getAriaSort('name'),
        school: this.getAriaSort('school'),
        level_int: this.getAriaSort('level_int'),
        components: this.getAriaSort('components'),
      };
    },
  },
  mounted() {
    this.store.loadSpells();
  },
  methods: {
    updateFilter: function (val) {
      this.filter = val;
    },
    spellListLength: function () {
      return Object.keys(this.spellsListed).length;
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    sort: function (prop, dir) {
      this.currentSortProperty = prop;
      this.currentSortDir = dir;
      this.spellsListed = {};
    },
    onFilterEnter: function () {
      this.$refs.results.focus();
    },
    focusFilter: function () {
      this.$refs.filter.$refs.input.focus();
    },
    getAriaSort(columName) {
      if (this.currentSortProperty === columName) {
        return this.currentSortDir === 'ascending' ? 'ascending' : 'descending';
      }
      return null;
    },
  },
};
</script>

<style scoped lang="scss">
@media (max-width: 600px) {
  .hide-mobile {
    display: none;
  }
}
</style>
