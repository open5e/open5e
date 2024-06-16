<template>
  <section class="docs-container container">
    <h1>Equipment</h1>

    <div v-if="equipmentSections" class="docs-toc">
      <ul>
        <li v-for="section in equipmentSections" :key="section.slug">
          <nuxt-link tag="a" :to="`/equipment/${section.slug}`">
            {{ section.name }}
          </nuxt-link>
        </li>
      </ul>
      <div
        v-if="equipmentSections.length == 0"
        class="flex w-full flex-wrap pt-2 text-lg"
      >
        <div vclass="flex w-full">
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
const { data: equipmentSections } = useSections('Equipment');
</script>
