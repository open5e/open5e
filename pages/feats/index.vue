<template>
  <section class="docs-container container">
    <h1>Feats</h1>
    <div v-if="feats.length > 0" class="docs-toc">
      <ul>
        <li v-for="feat in feats" :key="feat.slug">
          <nuxt-link tag="a" :to="`/feats/${feat.slug}`">
            {{ feat.name }}
          </nuxt-link>
          <source-tag
            v-if="feat.document__slug !== 'wotc-srd'"
            :text="feat.document__slug"
            :title="feat.document__title"
          />
        </li>
      </ul>
    </div>
    <p v-else>Loading</p>
  </section>
</template>

<script setup>
import axios from 'axios';
import SourceTag from '~/components/SourceTag.vue';

const feats = ref([]);

onMounted(async () => {
  const url = `${useRuntimeConfig().public.apiUrl}/feats/`;
  //you will need to enable CORS to make this work
  const response = await axios.get(url);
  feats.value = response.data.results;
});
</script>

<style></style>
