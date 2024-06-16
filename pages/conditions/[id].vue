<template>
  <section v-if="condition" class="docs-container container">
    <h1>{{ condition.name }}</h1>
    <md-viewer :text="condition.desc" />
  </section>
</template>

<script setup>
const { data: condition } = useFindOne(
  API_ENDPOINTS.conditions,
  useRoute().params.id
);
</script>
