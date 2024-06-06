<template>
  <section class="docs-container container">
    <h1>Combat</h1>
    <div v-if="combatSections" class="docs-toc">
      <ul>
        <li v-for="section in combatSections" :key="section.slug">
          <nuxt-link tag="a" :to="`/combat/${section.slug}`">
            {{ section.name }}
          </nuxt-link>
        </li>
      </ul>
      <div v-if="combatSections.length == 0">
        <div class="flex w-full">
          There are no items for this category that align with the corresponding
          sources you selected.
        </div>
        <div class="flex w-full pt-2">
          Please edit your selected sources for more results.
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { data: combatSections } = useSections('Combat');
</script>

<style></style>
