<template>
  <section class="container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Magic Item List</h1>
      <filter-input
        id="filter-items"
        ref="filter"
        class="filter"
        placeholder="Filter items..."
        @input="updateFilter"
        @keyup.enter="onFilterEnter"
      />
    </div>
    <h2 ref="results" class="sr-only" tabindex="-1" @keyup.esc="focusFilter">
      {{ itemListLength }}
      {{ itemListLength === 1 ? 'Result' : 'Results' }}
      <span v-if="filter.length > 0">&nbsp;for {{ filter }}</span>
    </h2>
    <div :class="{ 'three-column': !filter }">
      <p v-if="!items.length">Loading...</p>
      <div v-else aria-live="assertive" aria-atomic="true">
        <p v-if="!itemListLength">No results</p>
      </div>
      <div v-if="filter">
        <ul class="list--items">
          <li v-for="item in filteredItems" :key="item.name">
            <nuxt-link
              tag="a"
              :params="{ id: item.slug }"
              :to="`/magic-items/${item.slug}`"
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
      <div v-else>
        <div
          v-for="(letter, key) in itemsByLetter"
          :key="letter[0].name.charAt(0)"
          class="letter-list"
        >
          <h3>
            {{ key.toUpperCase() }}
          </h3>
          <ul class="list--items">
            <li v-for="item in letter" :key="item.name">
              <nuxt-link
                tag="a"
                :params="{ id: item.slug }"
                :to="`/magic-items/${item.slug}`"
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
      </div>
    </div>
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
    };
  },
  computed: {
    items: function () {
      return [...this.store.allMagicItems].sort((a, b) =>
        a.slug.localeCompare(b.slug)
      );
    },
    // a computed getter
    itemsByLetter: function () {
      let letters = {};
      for (let i = 0; i < this.filteredItems.length; i++) {
        let firstLetter = this.filteredItems[i].name.charAt(0).toLowerCase();
        if (!(firstLetter in letters)) {
          letters[firstLetter] = [];
        }
        letters[firstLetter].push(this.filteredItems[i]);
      }
      return letters;
    },
    filteredItems: function () {
      return this.items.filter((item) => {
        return item.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1;
      });
    },
    columnClassObject: function () {
      return {
        'three-column': !this.filter,
      };
    },
    itemListLength: function () {
      return Object.keys(this.itemsByLetter).length;
    },
  },
  mounted() {
    this.store.loadMagicItems();
  },
  methods: {
    updateFilter: function (val) {
      this.filter = val;
    },
    updateSources: function (val) {
      this.store.setSources(val);
    },
    onFilterEnter: function () {
      this.$refs.results.focus();
    },
    focusFilter: function () {
      this.$refs.filter.$refs.input.focus();
    },
  },
};
</script>

<style scoped lang="scss">
.letter-list {
  break-inside: avoid-column;

  &:first-child h3 {
    margin-top: 0;
  }
}
</style>
