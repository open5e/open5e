<template>
  <section class="container docs-container">
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

<script>
import { useMainStore } from '../../store/index';

export default {
  setup() {
    const store = useMainStore();
    store.loadClasses();
    return { store };
  },

  computed: {
    classes: function () {
      return [...this.store.classes];
    },
  },
};
</script>

<style></style>
