<template>
  <section class="docs-container container">
    <div>
      <h1>Sources</h1>
      <ul>
        <li v-for="document in documents" :key="document.name">
          {{ document.name }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const { data: documents } = useDocuments();
</script>