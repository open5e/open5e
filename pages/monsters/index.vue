<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Monster List</h1>
      <filter-input
        id="filter-monsters"
        ref="filter"
        class="filter"
        placeholder="Filter monsters..."
        @input="updateFilter"
        @keyup.enter="onFilterEnter"
      />
    </div>
    <div>
      <div>
        <h3
          ref="results"
          class="sr-only"
          tabindex="-1"
          @keyup.esc="focusFilter"
        >
          {{ monstersListed.length }}
          {{ monstersListed.length === 1 ? 'Result' : 'Results' }}
          <span v-if="filter.length > 0">&nbsp;for {{ filter }}</span>
        </h3>
        <div aria-live="assertive" aria-atomic="true" class="sr-only">
          <span v-if="monstersList.length && !monstersListed.length"
            >No results.</span
          >
        </div>
      </div>
      <p v-if="!monstersList.length">Loading...</p>
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
              :current-sort-dir="ariaSort.type"
              @sort="(dir) => sort('type', dir)"
              >Type</sortable-table-header
            >
            <sortable-table-header
              :current-sort-dir="ariaSort.challenge_rating"
              @sort="(dir) => sort('challenge_rating', dir)"
              >CR</sortable-table-header
            >
            <sortable-table-header
              :current-sort-dir="ariaSort.size"
              @sort="(dir) => sort('size', dir)"
              >Size</sortable-table-header
            >
            <sortable-table-header
              :current-sort-dir="ariaSort.hit_points"
              @sort="(dir) => sort('hit_points', dir)"
              >Hit Points</sortable-table-header
            >
          </tr>
        </thead>
        <tbody>
          <tr v-for="monster in monstersListed" :key="monster.slug">
            <th>
              <nuxt-link
                tag="a"
                :params="{ id: monster.slug }"
                :to="`/monsters/${monster.slug}`"
                :prefetch="false"
              >
                {{ monster.name }}
              </nuxt-link>
              <source-tag
                v-if="
                  monster.document__slug &&
                  monster.document__slug !== 'wotc-srd'
                "
                class=""
                :title="monster.document__title"
                :text="monster.document__slug"
              />
            </th>
            <td>{{ monster.type }}</td>
            <td><fraction-renderer :challenge="monster.challenge_rating" /></td>
            <td>{{ monster.size }}</td>
            <td>{{ monster.hit_points }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <span style="display: none"
      >Sorting by sort={{ currentSortProperty }}, dir={{ currentSortDir }}</span
    >
  </section>
</template>

<script>
import FilterInput from '~/components/FilterInput.vue';
import FractionRenderer from '~/components/FractionRenderer.vue';
import SourceTag from '~/components/SourceTag.vue';
import SortableTableHeader from '~/components/SortableTableHeader.vue';
import { useMainStore } from '~/store';

export default {
  components: {
    FilterInput,
    FractionRenderer,
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
    };
  },
  computed: {
    monstersList() {
      return this.store.allMonsters;
    },
    monstersListed: {
      get: function () {
        this.filteredMonsters.forEach(
          (monster) =>
            (monster.challenge_rating = eval(monster.challenge_rating))
        );
        return this.filteredMonsters;
      },
      set: function () {
        return this.filteredMonsters.sort((a, b) => {
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
    filteredMonsters: function () {
      return this.monstersList.filter((monster) => {
        return (
          monster.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1
        );
      });
    },
    ariaSort: function () {
      return {
        name: this.getAriaSort('name'),
        type: this.getAriaSort('type'),
        challenge_rating: this.getAriaSort('challenge_rating'),
        size: this.getAriaSort('size'),
        hit_points: this.getAriaSort('hit_points'),
      };
    },
  },
  mounted() {
    this.store.loadMonsters();
  },
  methods: {
    updateFilter: function (val) {
      this.filter = val;
    },
    monsterListLength: function () {
      return Object.keys(this.monstersListed).length;
    },
    sort: function (prop, value) {
      this.currentSortDir = value;
      this.currentSortProperty = prop;
      this.monstersListed = {};
    },
    onFilterEnter: function () {
      this.$refs.results.focus();
    },
    focusFilter: function () {
      this.$refs.filter.$refs.input.focus();
    },
    getAriaSort(columName) {
      if (this.currentSortProperty === columName) {
        return this.currentSortDir;
      }
      return null;
    },
  },
};
</script>

<style scoped lang="scss">
.monster-table-header {
  cursor: pointer;
  vertical-align: baseline;

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    text-decoration: underline;
    font-weight: bold;
  }
}

.monster-table-header-class {
  vertical-align: baseline;
}
</style>
