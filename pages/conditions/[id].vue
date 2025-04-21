<template>
  <section
    v-if="condition"
    class="docs-container container"
  >
    <h1>
      <span>{{ condition.name }}</span>
      <source-tag
        v-if="sourceKey"
        :text="sourceKey"
        :title="condition.document.name"
      />
    </h1>
    <md-viewer :text="condition.desc" />
  </section>
</template>

<script setup>
const { data: condition } = useFindOne(
  API_ENDPOINTS.conditions,
  useRoute().params.id,
  { params: { fields: ['name', 'desc', 'document'].join(',') } },
);

// generate source key from page URL - for use with source-tab cmpnt
const sourceKey = computed(() => {
  if (!condition?.value?.document) return;
  return condition.value.document.key;
});
</script>
