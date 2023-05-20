<template>
  <section class="container">
    <h2 class="filter-header">
      Spell List
      <!-- <button style="text-decoration:underline;" v-on:click="getSpellsByProperty('letter')">Alphabetical</button>
      <button style="text-decoration:underline;" v-on:click="getSpellsByProperty('dnd_class')">Class</button> -->
      <filter-input
        placeholder="Filter spells..."
        @input="updateFilter"
      />
    </h2>
    <div>
      <p v-if="!spells.length">
        Loading...
      </p>
      <table
        v-else
        class="fiterable-table"
      >
        <thead>
          <tr>
            <th
              class="spell-table-header"
              @click="sort('name')"
            >
              Name
            </th>
            <th
              class="spell-table-header"
              @click="sort('school')"
            >
              School
            </th>
            <th
              class="spell-table-header"
              @click="sort('level_int')"
            >
              Level
            </th>
            <th
              class="spell-table-header hide-mobile"
              @click="sort('components')"
            >
              Component
            </th>
            <th class="spell-table-header-class hide-mobile">
              Class
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="spell in spellsListed"
            :key="spell.name"
          >
            <td>
              <nuxt-link
                tag="a"
                :params="{ id: spell.slug }"
                :to="`/spells/${spell.slug}`"
              >
                {{ spell.name
                }}
              </nuxt-link>
              <source-tag
                v-if="spell.document__slug && spell.document__slug !== 'wotc-srd'"
                class=""
                :title="spell.document__title"
                :text="spell.document__slug"
              />
            </td>
            <td>{{ spell.school }}</td>
            <td>{{ spell.level_int }}</td>
            <td class="hide-mobile">
              {{ spell.components }}
            </td>
            <td class="hide-mobile">
              <span
                v-for="(spellclass, index) in spell.dnd_class"
                :key="spellclass"
              ><span
                class="dnd_class"
                @click="filterByClass(spellclass)"
              >{{ spellclass }}</span><span
                v-if="index + 1 < spell.dnd_class.length"
              >, </span></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <span style="display:none;">Sorting by sort={{ currentSortProperty }}, dir={{ currentSortDir }}</span>
  </section>
</template>

<script>
import FilterInput from '~/components/FilterInput.vue'
import SourceTag from '~/components/SourceTag.vue'
import { useMainStore } from '~/store'

export default {
  components: {
    FilterInput,
    SourceTag
  },
  setup() {
    const store = useMainStore();
    return { store }
  },
  data() {
    return {
      filter: '',
      currentSortProperty: 'name',
      currentSortDir: 'asc'
    }
  },
  computed: {
    spells: function () {
      return this.store.allSpells
    },
    spellsListed: {
      get: function () {
        return this.filteredSpells
      },
      set: function () {
        return this.filteredSpells.sort((a, b) => {
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
    filteredSpells: function () {
      return this.spells.filter(spell => {
        return spell.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1
      })
    }
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
    }
  }
}
</script>

<style scoped>
.spell-table-header {
  text-decoration: underline;
  cursor: pointer;
  vertical-align: baseline;
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

