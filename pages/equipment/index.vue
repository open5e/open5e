<template>
  <section class="docs-container container">
    <h1>Equipment</h1>
    <div class="docs-toc">
      <ul v-if="equipmentSections">
        <li v-for="section in equipmentSections" :key="section.slug">
          <nuxt-link tag="a" :to="`/equipment/${section.slug}`">
            {{ section.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { useMainStore } from '~/store';

export default {
  setup() {
    const store = useMainStore();
    return { store };
  },
  computed: {
    equipmentSections: function () {
      return this.store.allEquipmentSections;
    },
  },
};
</script>

<style></style>
