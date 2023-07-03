<template>
  <main class="container">
    <h1>Spells by Class</h1>
    <ul class="docs-toc">
      <li v-for="className in available_classes" :key="className">
        <nuxt-link tag="a" :href="`/spells/by-class/${className}`">
          {{ className }}
        </nuxt-link>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  data() {
    return {
      available_classes: [
        'Bard',
        'Cleric',
        'Sorcerer',
        'Wizard',
        'Druid',
        'Paladin',
        'Warlock',
      ],
    };
  },
};
</script>
<style></style>
