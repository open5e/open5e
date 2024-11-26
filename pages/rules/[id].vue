<template>
  <section
    v-if="ruleset"
    class="docs-container container"
  >
    <h1>{{ ruleset.name }}</h1>
    <md-viewer :text="ruleset.desc" />
    <div
      v-for="rule in ruleset.rules"
      :key="rule.name"
    >
      <h2>{{ rule.name }}</h2>
      <md-viewer :text="rule.desc" />
    </div>
  </section>
</template>

<script setup>
const { data: ruleset } = useFindOne(API_ENDPOINTS.rules, useRoute().params.id);
</script>
