<template>
  <section class="container docs-container">
    <div class="filter-header-wrapper">
      <h2 class="filter-header">Monster List</h2>
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
      <table v-else class="fiterable-table">
        <caption class="sr-only">
          Column headers with buttons are sortable.
        </caption>
        <thead>
          <tr>
            <th class="monster-table-header" :aria-sort="ariaSort.name">
              <button @click="sort('name')">Name</button>
            </th>
            <th class="monster-table-header" :aria-sort="ariaSort.type">
              <button @click="sort('type')">Type</button>
            </th>
            <th
              class="monster-table-header"
              :aria-sort="ariaSort.challenge_rating"
            >
              <button @click="sort('challenge_rating')">CR</button>
            </th>
            <th class="monster-table-header" :aria-sort="ariaSort.size">
              <button @click="sort('size')">Size</button>
            </th>
            <th class="monster-table-header" :aria-sort="ariaSort.hit_points">
              <button @click="sort('hit_points')">Hit Points</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="monster in monstersListed" :key="monster.slug">
            <th>
              <nuxt-link
                tag="a"
                :params="{ id: monster.slug }"
                :to="`/monsters/${monster.slug}`"
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
      currentSortDir: 'asc',
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
          if (this.currentSortDir === 'desc') {
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
  beforeCreate() {
    this.store.loadMonsterList();
  },
  methods: {
    updateFilter: function (val) {
      this.filter = val;
    },
    monsterListLength: function () {
      return Object.keys(this.monstersListed).length;
    },
    sort: function (prop) {
      if (prop === this.currentSortProperty) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
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
        return this.currentSortDir === 'asc' ? 'ascending' : 'descending';
      }
      return null;
    },
  },
};
</script>

<style scoped lang="scss">
.monster-table-header {
  text-decoration: underline;
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
