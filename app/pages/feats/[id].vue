<template>
  <main
    v-if="feat"
    class="docs-container container"
  >
    <h1>
      <span>{{ feat.name }}</span>
      <SourceTag
        :text="sourceKey"
        :title="feat.document.name"
      />
    </h1>
    <section>
      <p v-if="feat.prerequisite">
        <span class="font-bold after:content-['._']">Prerequistes</span>
        <span>{{ feat.prerequisite }}</span>
      </p>

      <MdViewer :text="feat.desc" />

      <ul v-if="feat.benefits" class="ml-4 mt-2 list-disc">
        <li v-for="(benefit, index) in feat.benefits" :key="index">
          <MdViewer :text="benefit.desc" :inline="true"/>
        </li>
      </ul>
    </section>
  </main>
  <p v-else>
    Loading...
  </p>
</template>

<script setup lang="ts">
const featId = useQueryParameter('id');
const { data: feat } = useFindOne(API_ENDPOINTS.feats, featId, {
  params: {
    fields: ['name', 'desc', 'prerequisite', 'document', 'benefits'].join(','),
  },
});

useSeoMeta({ title: () => `${feat.value?.name} | Open5e` });

// generate source key from page URL - for use with source-tag cmpnt
const sourceKey = computed(() => {
  if (!feat?.value?.document) return;
  return feat.value.document.key;
});
</script>
