<template>
  <section class="docs-container container">
    <h1>Races</h1>
    <div
      v-if="races && races.length == 0"
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
    <div class="docs-toc">
      <ul>
        <li v-for="race in races" :key="race.name">
          <nuxt-link tag="a" :to="`/races/${race.slug}`">
            {{ race.name }}
          </nuxt-link>
          <source-tag
            v-if="race.document__slug !== 'wotc-srd'"
            :text="race.document__slug"
            :title="race.document__title"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const { data: races } = useFindMany(API_ENDPOINTS.races);
</script>
