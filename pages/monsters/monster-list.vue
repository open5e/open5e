<template>
  <section class="container docs-container">
    <h2 class="filter-header">
      <span>Monster List</span>
      <filter-input
        placeholder="Filter monsters..."
        @input="updateFilter"
      />
    </h2>
    <div>
      <p v-if="!monstersList.length">
        Loading...
      </p>
      <table
        v-else
        class="fiterable-table"
      >
        <thead>
          <tr>
            <th
              class="monster-table-header"
              @click="sort('name')"
            >
              Name
            </th>
            <th
              class="monster-table-header"
              @click="sort('type')"
            >
              Type
            </th>
            <th
              class="monster-table-header"
              @click="sort('challenge_rating')"
            >
              CR
            </th>
            <th
              class="monster-table-header"
              @click="sort('size')"
            >
              Size
            </th>
            <th
              class="monster-table-header"
              @click="sort('hit_points')"
            >
              Hit Points
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="monster in monstersListed"
            :key="monster.slug"
          >
            <td>
              <nuxt-link
                tag="a"
                :params="{ id: monster.slug }"
                :to="`/monsters/${monster.slug}`"
              >
                {{ monster.name
                }}
              </nuxt-link>
              <source-tag
                v-if="monster.document__slug && monster.document__slug !== 'wotc-srd'"
                class=""
                :title="monster.document__title"
                :text="monster.document__slug"
              />
            </td>
            <td>{{ monster.type }}</td>
            <td><fraction-renderer :challenge="monster.challenge_rating" /></td>
            <td>{{ monster.size }}</td>
            <td>{{ monster.hit_points }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <span style="display:none;">Sorting by sort={{ currentSortProperty }}, dir={{ currentSortDir }}</span>
  </section>
</template>

<script>
import FilterInput from '~/components/FilterInput.vue'
import FractionRenderer from '~/components/FractionRenderer.vue'
import SourceTag from '~/components/SourceTag.vue'
import { useMainStore } from '~/store'

export default {
  components: {
    FilterInput,
    FractionRenderer,
    SourceTag
  },
  setup() {
    const store = useMainStore()
    return { store }
  },
  data() {
    return {
      filter: '',
      currentSortProperty: 'challenge_rating',
      currentSortDir: 'asc'
    }
  },
  computed: {
    monstersList() {
      return this.store.allMonsters
    },
    monstersListed: {
      get: function () {
        this.filteredMonsters.forEach(monster => monster.challenge_rating = eval(monster.challenge_rating));
        return this.filteredMonsters
      },
      set: function () {
        return this.filteredMonsters.sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === 'desc') {
            modifier = -1
          }
          if (a[this.currentSortProperty] < b[this.currentSortProperty]) {
            return -1 * modifier
          }
          if (a[this.currentSortProperty] > b[this.currentSortProperty]) {
            return 1 * modifier
          }
          return 0;
        });
      }
    },
    filteredMonsters: function () {
      return this.monstersList
        .filter(monster => {
          return monster.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1
        })
    }
  },
  beforeCreate() {
    this.store.loadMonsterList()
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
    }
  }
}
</script>

<style scoped>
.monster-table-header {
  text-decoration: underline;
  cursor: pointer;
  vertical-align: baseline;
}

.monster-table-header-class {
  vertical-align: baseline;
}
</style>

