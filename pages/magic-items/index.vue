<template>
  <section class="container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Magic Item List</h1>
      <FilterButton @showFilters="displayFilters = !displayFilters" />
    </div>
    <!-- FILTER -->
    <div
      v-if="displayFilters"
      class="filter-header-wrapper flex flex-wrap bg-smoke px-2"
    >
      <div class="bg-blue flex w-full flex-wrap align-middle">
        <label for="hpLow" class="w-full pt-1 font-bold md:w-1/6"
          >ITEM NAME:</label
        >
        <input
          id="itemName"
          v-model="filters.name"
          name="itemName"
          class="mt-2 w-full rounded-md px-2 ring-1 ring-blood focus:ring-2 focus:ring-blood md:w-5/6"
        />
        <div class="flex w-full flex-wrap">
          <div class="mt-2 flex w-full flex-wrap md:w-1/2">
            <span class="mr-2 w-full font-bold">RARITY:</span>
            <select
              id="rarity"
              v-model="filters.rarity"
              name="rarity"
              class="flex w-full rounded-md ring-1 ring-blood focus:ring-2 focus:ring-blood"
            >
              <option
                v-for="rtg in itemRarities"
                :key="rtg"
                class=""
                v-text="rtg"
              ></option>
            </select>
          </div>
          <div class="mt-2 flex w-full flex-wrap md:w-1/2">
            <span class="mr-2 w-full font-bold md:ml-2">TYPE:</span>
            <select
              id="type"
              v-model="filters.type"
              name="type"
              class="flex w-full rounded-md ring-1 ring-blood focus:ring-2 focus:ring-blood md:ml-2"
            >
              <option
                v-for="rtg in itemTypes"
                :key="rtg"
                class=""
                v-text="rtg"
              ></option>
            </select>
          </div>
          <div class="mt-4 flex w-full md:w-1/2">
            <span class="mr-2 font-bold">REQUIRES ATTUNEMENT:</span>
            <input
              id="attunement"
              v-model="filters.attunement"
              type="checkbox"
              name="attunement"
              class="mb-1 accent-blood"
            />
          </div>
          <div class="mt-4 flex w-full justify-end md:w-1/2">
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
    </div>
    <!-- END FILTER -->
    <div class="flex w-full italic text-blood">
      Displaying {{ filteredItems().length }} magic items
    </div>
    <hr class="color-blood mx-auto" />
    <div class="three-column">
      <p v-if="!items.length">Loading...</p>
      <div v-else aria-live="assertive" aria-atomic="true">
        <p v-if="!itemListLength">No results</p>
      </div>
      <div>
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
import FilterButton from '~/components/FilterButton.vue';
import SourceTag from '~/components/SourceTag.vue';
import { useMainStore } from '~/store';

export default {
  components: {
    FilterButton,
    SourceTag,
  },
  setup() {
    const store = useMainStore();
    return { store };
  },
  data() {
    return {
      displayFilters: false,
      // filter: "",
      filters: {
        attunement: false,
        name: null,
        rarity: null,
        type: null,
      },
      itemRarities: ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary'],
      itemTypes: [
        'Armor',
        'Potion',
        'Ring',
        'Rod',
        'Scroll',
        'Staff',
        'Wand',
        'Weapon',
        'Wondrous Item',
      ],
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
      for (let i = 0; i < this.filteredItems().length; i++) {
        let firstLetter = this.filteredItems()[i].name.charAt(0).toLowerCase();
        if (!(firstLetter in letters)) {
          letters[firstLetter] = [];
        }
        letters[firstLetter].push(this.filteredItems()[i]);
      }
      return letters;
    },
    itemListLength: function () {
      return Object.keys(this.itemsByLetter).length;
    },
  },
  mounted() {
    this.store.loadMagicItems();
  },
  methods: {
    clearFilters() {
      this.filters = {
        attunement: false,
        name: null,
        rarity: null,
        type: null,
      };
    },
    filterByAttunement(itemsToFilter) {
      if (this.filters.attunement == false) {
        return itemsToFilter;
      } else {
        return itemsToFilter.filter((item) => {
          return item.requires_attunement == 'requires attunement';
        });
      }
    },
    filterByName(itemsToFilter) {
      if (this.filters.name == null) {
        return itemsToFilter;
      } else {
        return itemsToFilter.filter((item) =>
          item.name.toLowerCase().includes(this.filters.name.toLowerCase())
        );
      }
    },
    filterByRarity(itemsToFilter) {
      if (this.filters.rarity == null) {
        return itemsToFilter;
      } else {
        return itemsToFilter.filter(
          (item) =>
            item.rarity.toLowerCase() == this.filters.rarity.toLowerCase()
        );
      }
    },
    filterByType(itemsToFilter) {
      if (this.filters.type == null) {
        return itemsToFilter;
      } else {
        return itemsToFilter.filter(
          (item) => item.type.toLowerCase() == this.filters.type.toLowerCase()
        );
      }
    },
    filteredItems: function () {
      let allItems = this.items;
      let nameFiltered = this.filterByName(allItems);
      let rareFiltered = this.filterByRarity(nameFiltered);
      let typeFiltered = this.filterByType(rareFiltered);
      let attuneFiltered = this.filterByAttunement(typeFiltered);
      return attuneFiltered;
    },
    updateSources: function (val) {
      this.store.setSources(val);
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
