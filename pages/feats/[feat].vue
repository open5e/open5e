<template>
  <main v-if="feat" class="docs-container container">
    <h1>
      <span>{{ feat.name }}</span>
      <source-tag
        v-if="feat.document__slug !== 'wotc-srd'"
        :text="feat.document__slug"
        :title="feat.document__title"
      />
    </h1>
    <section>
      <p v-if="feat.prerequisite">
        <b>{{ feat.prerequisite }}</b>
      </p>
      <md-viewer :text="feat.desc" />
      <ul v-if="feat.effects_desc.length > 0">
        <li v-for="point in feat.effects_desc" :key="point.slice(0, 10)">
          {{ point }}
        </li>
      </ul>
    </section>
  </main>
  <p v-else>Loading...</p>
</template>

<script setup>
const { data: feat } = useFindOne(API_ENDPOINTS.feats, useRoute().params.feat);
</script>
