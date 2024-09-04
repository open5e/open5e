<template>
  <main v-if="background" class="docs-container container">
    <section>
      <div>
        <h1 class="inline">{{ background.name }}</h1>
        <source-tag
          :title="background.document.name"
          :text="background.document.name"
        />
      </div>
      <md-viewer :text="background.desc" />
    </section>
    <ul>
      <li v-for="benefit in background.benefits" :key="benefit.name">
        <h2>{{ benefit.name }}</h2>
        <md-viewer :text="benefit.desc" />
      </li>
    </ul>
  </main>
  <p v-else>Loading...</p>
</template>

<script setup>
const { data: background } = useFindOne(
  API_ENDPOINTS.backgrounds,
  useRoute().params.id
);
</script>
