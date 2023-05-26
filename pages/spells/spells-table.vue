<template>
  <section class="container">
    <div class="filter-header-wrapper">
      <h2 class="filter-header">Spell List</h2>
      <filter-input
        id="filter-spells"
        ref="filter"
        class="filter"
        placeholder="Filter spells..."
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
          {{ spellsListed.length }}
          {{ spellsListed.length === 1 ? 'Result' : 'Results' }}
          <span v-if="filter.length > 0">&nbsp;for {{ filter }}</span>
        </h3>
        <div aria-live="assertive" aria-atomic="true" class="sr-only">
          <span v-if="spells.length && !spellsListed.length">No results.</span>
        </div>
      </div>
      <p v-if="!spells.length">Loading...</p>
      <table v-else class="fiterable-table">
        <caption class="sr-only">
          Column headers with buttons are sortable.
        </caption>
        <thead>
          <tr>
            <th class="spell-table-header" :aria-sort="ariaSort.name">
              <button @click="sort('name')">Name</button>
            </th>
            <th class="spell-table-header" :aria-sort="ariaSort.school">
              <button @click="sort('school')">School</button>
            </th>
            <th class="spell-table-header" :aria-sort="ariaSort.level_int">
              <button @click="sort('level_int')">Level</button>
            </th>
            <th class="spell-table-header hide-mobile">
              <button
                :aria-sort="ariaSort.components"
                @click="sort('components')"
              >
                Component
              </button>
            </th>
            <th class="spell-table-header-class hide-mobile">Class</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="spell in spellsListed" :key="spell.name">
            <th>
              <nuxt-link
                tag="a"
                :params="{ id: spell.slug }"
                :to="`/spells/${spell.slug}`"
              >
                {{ spell.name }}
              </nuxt-link>
              <source-tag
                v-if="
                  spell.document__slug && spell.document__slug !== 'wotc-srd'
                "
                class=""
                :title="spell.document__title"
                :text="spell.document__slug"
              />
            </th>
            <td>{{ spell.school }}</td>
            <td>{{ spell.level_int }}</td>
            <td class="hide-mobile">
              {{ spell.components }}
            </td>
            <td class="hide-mobile">
              <span
                v-for="(spellclass, index) in spell.dnd_class"
                :key="spellclass"
                ><span class="dnd_class" @click="filterByClass(spellclass)">{{
                  spellclass
                }}</span
                ><span v-if="index + 1 < spell.dnd_class.length">, </span></span
              >
            </td>
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
import SourceTag from '~/components/SourceTag.vue';
import { useMainStore } from '~/store';

export default {
  components: {
    FilterInput,
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
    spells: function () {
      return this.store.allSpells;
    },
    spellsListed: {
      get: function () {
        return this.filteredSpells;
      },
      set: function () {
        return this.filteredSpells.sort((a, b) => {
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
    sort: function (prop) {
      if (prop === this.currentSortProperty) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSortProperty = prop;
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
        return this.currentSortDir === 'asc' ? 'ascending' : 'descending';
      }
      return null;
    },
  },
};
</script>

<style scoped lang="scss">
.spell-table-header {
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

.spell-table-header-class {
  vertical-align: baseline;
}

@media (max-width: 600px) {
  .hide-mobile {
    display: none;
  }
}
</style>
