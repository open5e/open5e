<template>
  <section class="container">
    <h2 class="filter-header">
      <span>Magic Item List</span>
      <filter-input
        placeholder="Filter items..."
        @input="updateFilter"
      />
    </h2>
    <div :class="{ 'three-column': !filter }">
      <p v-if="!items.length">
        Loading...
      </p>
      <p v-else-if="!itemListLength">
        No results
      </p>
      <ul
        v-for="(letter, key) in itemsByLetter"
        :key="letter[0].name.charAt(0)"
        class="list--items"
      >
        <h3 v-if="!filter">
          {{ key.toUpperCase() }}
        </h3>
        <li
          v-for="item in letter"
          :key="item.name"
        >
          <nuxt-link
            tag="a"
            :params="{ id: item.slug }"
            :to="`/magicitems/${item.slug}`"
          >
            {{ item.name }}
          </nuxt-link>
          <source-tag
            v-if="item.document__slug && item.document__slug !== 'wotc-srd'"
            class=""
            :title="item.document__title"
            :text="item.document__slug"
          />
        </li>
      </ul>
    </div>
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
    const store = useMainStore()
    return { store }
  },
  data() {
    return {
      filter: '',
    }
  },
  computed: {
    items: function () {
      return this.store.allMagicItems;
    },
    // a computed getter
    itemsByLetter: function () {
      let letters = {};
      for (let i = 0; i < this.filteredSpells.length; i++) {
        let firstLetter = this.filteredSpells[i].name.charAt(0).toLowerCase();
        if (!(firstLetter in letters)) {
          letters[firstLetter] = [];
        }
        letters[firstLetter].push(this.filteredSpells[i]);
      }
      return letters
    },
    filteredSpells: function () {
      return this.items.filter(item => {
        return item.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1
      })
    },
    columnClassObject: function () {
      return {
        'three-column': !this.filter,
      }
    },
    itemListLength: function () {
      return Object.keys(this.itemsByLetter).length;
    }
  },
  beforeCreate() {
    this.store.loadMagicItems()
  },
  methods: {
    updateFilter: function (val) {
      this.filter = val;
    }
  }
}
</script>

<style scoped></style>

