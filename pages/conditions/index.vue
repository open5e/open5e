<template>
  <section class="docs-container container">
    <h1>Conditions</h1>
    <div class="docs-toc">
      <ul v-if="conditions">
        <li v-for="condition in conditions" :key="condition.slug">
          <nuxt-link :to="`/conditions/${condition.slug}`">
            {{ condition.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { useMainStore } from '../../store/index';
const store = useMainStore();
store.loadConditions();

const conditions = computed(() => {
  return [...store.conditions];
});
</script>

<style></style>
