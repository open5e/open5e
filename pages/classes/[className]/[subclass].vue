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
const { data: subclass } = useSubclass(
  useRoute().params.className,
  useRoute().params.subclass
);
</script>
