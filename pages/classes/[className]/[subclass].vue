<template>
  <main v-if="subclass && subclass.result" class="docs-container container">
    <h1>
      {{ subclass.result.name }}
      <source-tag
        :title="subclass.result.document__title"
        :text="subclass.result.document__slug"
      />
    </h1>

    <section>
      <md-viewer :text="subclass.result.desc" />
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
