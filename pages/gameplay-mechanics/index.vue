<template>
  <section class="docs-container container">
    <h1>Gameplay Mechanics</h1>

    <div v-if="sections" class="docs-toc">
      <ul>
        <li v-for="section in sections" :key="section.name">
          <nuxt-link tag="a" :to="`/gameplay-mechanics/${section.slug}`">
            {{ section.name }}
          </nuxt-link>
        </li>
      </ul>
      <div
        v-if="sections.length == 0"
        class="flex w-full flex-wrap pt-2 text-lg"
      >
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
const { data: sections } = useSections('Gameplay Mechanics');
</script>
