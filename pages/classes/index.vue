<template>
  <section class="docs-container container">
    <h1>Classes</h1>
    <div v-if="classes" class="docs-toc">
      <ul>
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
const { data: classes } = useFindMany(API_ENDPOINTS.classes);
</script>

<style></style>
