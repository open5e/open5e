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

    <!-- Display condition descriptions as a list if API rtns more than one -->
    <div v-if="condition.descriptions.length > 1">
      <p class="my-4 italic">
        <span>The </span>
        <span class="font-bold">{{ condition.name }}</span>
        <span> condition has multiple definitions in different rulebooks.</span>
      </p>
      <dl class="grid gap-6">
        <div v-for="description in condition.descriptions" :key="description.document">
          <dt class="text-xl font-bold text-granite">
            {{ description.gamesystem }}
          </dt>
          <dd class="mt-0">
            <MdViewer :text="description.desc"/>
          </dd>
        </div>
      </dl>
    </div>

    <!-- Display conditions with a single description as they are -->
    <v-else>
      <MdViewer :text="condition.descriptions[0].desc" />
    </v-else>
  </section>
</template>

<script setup>
const { data: condition } = useFindOne(
  API_ENDPOINTS.conditions,
  useRoute().params.id,
  { 
    params: { 
      fields: ['name', 'descriptions', 'document'].join(','),
      document__fields: ['key', 'display_name'].join(',')
    } 
  },
);

usePageMetadata({ title: computed(() => condition.value?.name) });

// generate source key from page URL - for use with source-tab cmpnt
const sourceKey = computed(() => {
  if (!condition?.value?.document) return;
  return condition.value.document.key;
});
</script>
