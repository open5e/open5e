<template>
  <section class="docs-container container">
    <h1>Running a Game</h1>
    <div
      v-if="Object.keys(sectionGroups).length == 0"
      class="flex w-full flex-wrap pt-2 text-lg"
    >
      <div class="flex w-full">
        There are no items for this category that align with the corresponding
        sources you selected.
      </div>
      <div class="flex w-full pt-2">
        Please edit your selected sources for more results.
      </div>
    </div>
    <div v-else class="docs-toc">
      <span v-if="$route.hash">{{ $route.hash }}</span>
      <ul>
        <li v-for="section in sectionGroups.Rules" :key="section.slug">
          <nuxt-link tag="a" :to="`/running/${section.slug}`">
            {{ section.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { useMainStore } from '~/store';
const store = useMainStore();

function groupBy(arr, prop) {
  return arr.reduce(function (groups, item) {
    const val = item[prop];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {});
}

const sectionGroups = computed(() => {
  let groupedSections = groupBy(store.allSections, 'parent');
  return groupedSections;
});
</script>
