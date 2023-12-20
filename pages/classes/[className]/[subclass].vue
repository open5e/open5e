<template>
  <main v-if="subclass" class="docs-container container">
    <h1>
      {{ subclass.name }}
      <source-tag
        :title="subclass.document__title"
        :text="subclass.document__slug"
      />
    </h1>

    <section>
      <md-viewer :text="subclass.desc" />
    </section>
  </main>
  <p v-else>Loading...</p>
</template>

<script setup>
const classData = await useFetchArticle({
  slug: useRoute().params.className,
  category: 'classes',
});
const slug = useRoute().params.subclass;
const subclass = classData.archetypes.find(
  (subclass) => subclass.slug === slug
);
if (!subclass) {
  showError({ statusCode: 404, message: `${useRoute().path} does not exist` });
}
</script>
