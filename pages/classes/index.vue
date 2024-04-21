<template>
  <section class="docs-container container">
    <h1>Classes</h1>
    <div class="docs-toc">
      <ul v-if="classes">
        <li v-for="charClass in classes" :key="charClass.slug">
          <nuxt-link :to="`/classes/${charClass.slug}`">
            {{ charClass.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { useMainStore } from '../../store/index';
const store = useMainStore();
store.loadClasses();

const classes = computed(() => {
  return [...store.classes];
});
</script>

<style></style>
