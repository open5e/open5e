<template>
  <section v-if="section" class="docs-container container">
    <h1>{{ section.name }}</h1>
    <md-viewer :text="section.desc" />
  </section>
</template>

<script setup>
const { data: section } = useFindOne(
  API_ENDPOINTS.sections,
  useRoute().params.id
);
</script>
