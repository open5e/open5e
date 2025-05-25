<template>
  <main
    v-if="feat"
    class="docs-container container"
  >
    <h1>
      <span>{{ feat.name }}</span>
      <source-tag
        :text="sourceKey"
        :title="feat.document.name"
      />
    </h1>
    <section>
      <p v-if="feat.prerequisite">
        <span class="font-bold after:content-['._']">Prerequistes</span>
        <span>{{ feat.prerequisite }}</span>
      </p>
      <md-viewer
        :text="feat.desc"
        class="list-disc"
      />
    </section>
  </main>
  <p v-else>
    Loading...
  </p>
</template>

<script setup>
const { data: feat } = useFindOne(API_ENDPOINTS.feats, useRoute().params.id, {
  fields: ['name', 'desc', 'prerequisite', 'document'],
});

// generate source key from page URL - for use with source-tab cmpnt
const sourceKey = computed(() => {
  if (!feat?.value?.document) return;
  return feat.value.document.key;
});
</script>
