<template>
  <section class="container">
    <div class="filter-header-wrapper">
      <h1 class="filter-header">Magic Item List</h1>
      <FilterButton @showFilters="displayFilters = !displayFilters" />
    </div>
    <MagicItemFilterBox v-if="displayFilters" v-model="magic_items_filters" />
    <div v-if="magic_items" class="flex w-full italic text-blood">
      Displaying {{ magic_items.length }} magic items
    </div>
    <hr class="color-blood mx-auto" />
    <div v-if="magic_items && magic_items.length != 0" class="three-column">
      <div>
        <div
          v-for="(letter, key) in magic_items_by_letter"
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

    <div
      v-else-if="magic_items && magic_items.length === 0"
      aria-live="assertive"
      aria-atomic="true"
    >
      <p>No results</p>
    </div>
    <p v-else>Loading...</p>
  </section>
</template>

<script setup>
import FilterButton from '~/components/FilterButton.vue';
import SourceTag from '~/components/SourceTag.vue';

const displayFilters = ref(false);
const magic_items_filters = ref({
  name: null,
  rarity: null,
  type: null,
  isAttunementRequired: null,
});

const { data: magic_items } = useMagicItems(magic_items_filters.value);

const magic_items_by_letter = computed(() => {
  return (magic_items.value ?? []).reduce((acc, item) => {
    const firstLetter = item.name.charAt(0).toLowerCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {});
});
</script>

<style scoped lang="scss">
.letter-list {
  break-inside: avoid-column;

  &:first-child h3 {
    margin-top: 0;
  }
}
</style>
