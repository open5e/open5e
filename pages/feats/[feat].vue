<template>
  <main v-if="feat" class="docs-container container">
    <h1>
      <span>{{ feat.name }}</span>
      <source-tag
        v-if="feat.document__slug !== 'wotc-srd'"
        :text="feat.document__slug"
        :title="feat.document__title"
      />
    </h1>
    <section>
      <p v-if="feat.prerequisite">
        <b>{{ feat.prerequisite }}</b>
      </p>
      <md-viewer :text="feat.desc" />
      <ul v-if="feat.effects_desc.length > 0">
        <li v-for="point in feat.effects_desc" :key="point.slice(0, 10)">
          {{ point }}
        </li>
      </ul>
    </section>
  </main>
  <p v-else>Loading...</p>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return { feat: null };
  },

  mounted() {
    const { feat } = useRoute().params;
    const url = `${useRuntimeConfig().public.apiUrl}/feats/${feat}/`;

    //you will need to enable CORS to make this work
    return axios
      .get(url)
      .then((response) => (this.feat = response.data))
      .catch(() => {
        throw showError({
          statusCode: 404,
          message: `The route ${useRoute().path} does not exist`,
        });
      });
  },
};
</script>
