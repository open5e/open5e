<template>
  <section class="docs-container container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Monster List</h1>
      <FilterButton @showFilters="displayFilters = !displayFilters" />
    </div>
    <!-- FILTER BOX -->
    <div
      v-if="displayFilters"
      class="filter-header-wrapper flex flex-wrap bg-smoke px-2"
    >
      <div class="bg-blue flex w-full flex-wrap align-middle">
        <label for="hpLow" class="pt-1 font-bold md:w-1/6">MONSTER NAME:</label>
        <input
          id="monsterName"
          v-model="filters.name"
          name="monsterName"
          class="mt-2 w-1/2 rounded-md px-2 ring-1 ring-blood focus:ring-2 focus:ring-blood md:w-5/6"
        />
        <span class="flex w-full font-bold">CHALLENGE RATING</span>
        <div class="flex w-full px-1 md:w-1/2">
          <label for="challengeRtgLow" class="w-1/2">From:</label>
          <select
            id="challengeRtgLow"
            v-model="filters.challengeLow"
            name="challengeRtgLow"
            class="w-1/2 rounded-md ring-1 ring-blood focus:ring-2 focus:ring-blood"
          >
            <option
              v-for="rtg in monsterChallengeRatings"
              :key="rtg"
              class=""
              v-text="rtg"
            ></option>
          </select>
        </div>
        <div class="flex w-full px-1 md:w-1/2">
          <label for="challengeRtgHigh" class="w-1/2">To:</label>
          <select
            id="challengeRtgHigh"
            v-model="filters.challengeHigh"
            name="challengeRtgHigh"
            class="w-1/2 rounded-md ring-1 ring-blood focus:ring-2 focus:ring-blood"
          >
            <option
              v-for="rtg in monsterChallengeRatings"
              :key="rtg"
              v-text="rtg"
            ></option>
          </select>
        </div>
      </div>
      <div class="flex w-full flex-wrap">
        <span class="flex w-full font-bold">HIT POINTS</span>
        <div class="flex w-full px-1 md:w-1/2">
          <label for="hpLow" class="w-1/2">From (low):</label>
          <input
            id="hpLow"
            v-model="filters.hpLow"
            name="hpLow"
            class="w-1/2 rounded-md px-2 ring-1 ring-blood focus:ring-2 focus:ring-blood"
          />
        </div>
        <div class="flex w-full px-1 md:w-1/2">
          <label for="hpHigh" class="w-1/2">To (high):</label>
          <input
            id="hpHigh"
            v-model="filters.hpHigh"
            name="hpHigh"
            class="w-1/2 rounded-md px-2 ring-1 ring-blood focus:ring-2 focus:ring-blood"
          />
        </div>
      </div>
      <div class="flex w-full flex-wrap pr-1 pt-4 md:w-1/2">
        <label for="hpLow" class="w-1/2 font-bold">SIZE:</label>
        <select
          id="hpLow"
          v-model="filters.size"
          name="hpLow"
          class="w-1/2 rounded-md ring-1 ring-blood focus:ring-2 focus:ring-blood"
        >
          <option
            v-for="size in monsterSizes"
            :key="size"
            v-text="size"
          ></option>
        </select>
      </div>
      <div class="flex w-full flex-wrap pt-4 md:w-1/2">
        <div class="flex w-full px-1">
          <label for="hpLow" class="w-full font-bold">TYPE:</label>
          <select
            id="hpLow"
            v-model="filters.type"
            name="hpLow"
            class="w-full rounded-md ring-1 ring-blood focus:ring-2 focus:ring-blood"
          >
            <option
              v-for="monsterType in monsterTypes"
              :key="monsterType"
              v-text="monsterType"
            ></option>
          </select>
        </div>
      </div>
      <div class="flex w-full flex-wrap pt-4">
        <div class="flex w-full justify-end">
          <button
            class="rounded-md bg-fog p-1 text-blood outline outline-1 outline-blood hover:bg-blood hover:text-fog"
            @click="clearFilters()"
          >
            <Icon name="heroicons:x-mark" class="mb-1 mr-1" />
            Clear Filters
          </button>
        </div>
      </div>
    </div>
    <!-- END FILTER BOX -->
    <div>
      <div>
        <h3
          ref="results"
          class="sr-only"
          tabindex="-1"
          @keyup.esc="focusFilter"
        >
          <!-- {{ monstersListed.length }}
          {{ monstersListed.length === 1 ? 'Result' : 'Results' }}
          <span v-if="filter.length > 0">&nbsp;for {{ filter }}</span> -->
        </h3>
        <div aria-live="assertive" aria-atomic="true" class="sr-only">
          <!-- <span v-if="monstersList.length && !monstersListed.length"
            >No results.</span
          > -->
        </div>
      </div>
      <!-- <span style="display:block">Sorting by sort={{ currentSortProperty }}, dir={{ currentSortDir }}</span> -->
      <p v-if="!monsterList.length">Loading...</p>
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
          <tr v-for="monster in sortedMonsters" :key="monster.slug">
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
  </section>
</template>

<script>
import FilterButton from '~/components/FilterButton.vue';
import FractionRenderer from '~/components/FractionRenderer.vue';
import SourceTag from '~/components/SourceTag.vue';
import SortableTableHeader from '~/components/SortableTableHeader.vue';
import { useMainStore } from '~/store';

export default {
  components: {
    FilterButton,
    FractionRenderer,
    SourceTag,
  },
  setup() {
    const store = useMainStore();
    return { store };
  },
  data() {
    return {
      currentSortDir: 'ascending',
      currentSortProperty: 'name',
      displayFilters: false,
      filters: {
        challengeLow: null,
        challengeHigh: null,
        hpLow: null,
        hpHigh: null,
        name: null,
        size: null,
        type: null,
      },
    };
  },
  computed: {
    monsterList() {
      return this.store.allMonsters;
    },
    sortedMonsters() {
      return this.filteredMonsters().sort((a, b) => {
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
    (this.monsterChallengeRatings =
      this.store.getMonsterFields.challengeRatings),
      (this.monsterSizes = this.store.getMonsterFields.monsterSizes),
      (this.monsterTypes = this.store.getMonsterFields.monsterTypes);
  },
  methods: {
    clearFilters() {
      this.filters = {
        challengeLow: null,
        challengeHigh: null,
        hpLow: null,
        hpHigh: null,
        name: null,
        size: null,
        type: null,
      };
    },
    challengeConversion(cr) {
      if (cr.includes('/')) {
        let crFraction = cr.split('/');
        return crFraction[0] / crFraction[1];
      } else {
        return parseInt(cr);
      }
    },
    // FILTER BY CHALLENGE RATING
    filterByChallengeHigh(monsters, challengeRating) {
      if (challengeRating !== null) {
        // DURING THE FILTER WE CONVERT ANY STRINGS INTO NUMBERS SO WE CAN COMPARE
        return monsters.filter((monster) => {
          if (
            this.challengeConversion(monster.challenge_rating) <=
            this.challengeConversion(challengeRating)
          ) {
            console.log(monster);
            return monster;
          }
        });
      } else {
        return monsters;
      }
    },
    filterByChallengeLow(monsters, challengeRating) {},
    // FILTER BY NAME
    filterByName(monsters, nameFilter) {
      if (nameFilter !== null) {
        return monsters.filter((monster) => {
          if (monster.name.toLowerCase().includes(nameFilter.toLowerCase())) {
            return monster;
          }
        });
      } else {
        return monsters;
      }
    },
    // FILTER BY SIZE
    filterBySize(monsters, sizeFilter) {
      if (sizeFilter !== null) {
        return monsters.filter((monster) => {
          if (monster.size === sizeFilter) {
            return monster;
          }
        });
      } else {
        return monsters;
      }
    },
    filterByType(monsters, typeFilter) {
      if (typeFilter !== null) {
        return monsters.filter((monster) => {
          if (monster.type === typeFilter) {
            return monster;
          }
        });
      } else {
        return monsters;
      }
    },
    // FILTER BY CHALLENGE RATING
    async filterChallengeLow(monsters) {
      if (this.filters.challengeLow !== null) {
      }
    },
    sort: function (prop, value) {
      this.currentSortDir = value;
      this.currentSortProperty = prop;
      this.monsterSort = {};
    },
    // onFilterEnter: function () {
    //   this.$refs.results.focus();
    // },
    // focusFilter: function () {
    //   this.$refs.filter.$refs.input.focus();
    // },
    filteredMonsters() {
      let filteredByName = this.filterByName(
        this.store.allMonsters,
        this.filters.name
      );
      let filteredByChallengeHigh = this.filterByChallengeHigh(
        filteredByName,
        this.filters.challengeHigh
      );
      // let filteredByChallengeLow   = this.filterByChallengeLow(filteredByChallengeHigh, this.filters.challengeLow)
      // let filteredByHpHigh         = this.filterByHpHigh(filteredByChallengeLow, this.filters.hpHigh)
      // let filteredByHpLow          = this.filterByHpLow(filteredByHpHigh, this.filters.hpLow)
      // let filteredBySize           = this.filterBySize(filteredByHpLow, this.filters.size)
      // let filteredByType           = this.filterByType(filteredBySize, this.filters.type)
      return filteredByChallengeHigh;
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
<!--  -->
