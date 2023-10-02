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

<script>
import axios from 'axios';
import SourceTag from '~/components/SourceTag.vue';
export default {
  components: { SourceTag },
  data() {
    return {
      feats: [],
    };
  },

  mounted() {
    const url = `${useRuntimeConfig().public.apiUrl}/feats/`;
    //you will need to enable CORS to make this work
    return axios.get(url).then((response) => {
      this.feats = response.data.results;
    });
  },
};
</script>

<style></style>
