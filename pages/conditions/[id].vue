<template>
  <section class="docs-container container">
    <h1>{{ condition.name }}</h1>
    <md-viewer :text="condition.desc" />
  </section>
</template>

<script setup>
const condition = await useFetchArticle({
  slug: useRoute().params.id,
  category: 'conditions',
});
</script>
