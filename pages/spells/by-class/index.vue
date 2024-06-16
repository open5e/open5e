<template>
  <main class="container">
    <h1>Spells by Class</h1>
    <ul class="docs-toc">
      <li v-for="[name, slug] in available_classes" :key="name">
        <nuxt-link tag="a" :href="`/spells/by-class/${slug}`">
          {{ name }}
        </nuxt-link>
      </li>
    </ul>
  </main>
</template>

<script setup>
const available_classes = [
  ['Bard', 'bard'],
  ['Cleric', 'cleric'],
  ['Sorcerer', 'sorcerer'],
  ['Wizard', 'wizard'],
  ['Druid', 'druid'],
  ['Paladin', 'paladin'],
  ['Warlock', 'warlock'],
];
</script>
<style></style>
