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
const { data: conditions } = useFindMany(API_ENDPOINTS.conditions);
</script>

<style></style>
