<template>
  <section class="docs-container container">
    <h1>{{ section.name }}</h1>
    <md-viewer :text="section.desc" />
  </section>
</template>

<script setup>
const section = await useFetchArticle({
  slug: useRoute().params.id,
  category: 'sections',
});
</script>
