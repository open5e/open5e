<template>
  <section v-if="condition" class="docs-container container">
    <h1>
      <span>{{ condition.name }}</span>
      <source-tag :text="sourceKey" :title="condition.document.name" />
    </h1>
    <md-viewer :text="condition.desc" />
  </section>
</template>

<script setup>
const { data: condition } = useFindOne(
  API_ENDPOINTS.conditions,
  useRoute().params.id,
  {
    fields: ['name', 'desc', 'document'],
  }
);

// generate source key from page URL - for use with source-tab cmpnt
const sourceKey = computed(() =>
  condition.value.document.url
    .split('/')
    .filter((exists) => exists)
    .pop()
);
</script>
