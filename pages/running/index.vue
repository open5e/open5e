<template>
  <section class="container docs-container">
    <h1>Running a Game</h1>
    <div class="docs-toc">
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

<script>
import { useMainStore } from '~/store';

Array.prototype.groupBy = function (prop) {
  return this.reduce(function (groups, item) {
    const val = item[prop];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {});
};

export default {
  setup() {
    const store = useMainStore();
    return { store };
  },
  computed: {
    sectionGroups: function () {
      let groupedSections = this.store.allSections.groupBy('parent');
      return groupedSections;
    },
  },
  beforeCreate() {
    this.store.loadClasses();
    this.store.loadSections();
    this.store.loadRaces();
  },
};
</script>

<style></style>
