<template>
  <main v-if="section" class="docs-container container">
    <h1>{{ section.name }}</h1>
    <section>
      <md-viewer :text="section.desc" />
    </section>
  </main>
  <p v-else>Loading...</p>
</template>

<script setup>
const { data: section } = useFindOne(
  API_ENDPOINTS.sections,
  useRoute().params.section
);
</script>
