<template>
  <main v-if="section" class="docs-container container">
    <h1>{{ section.name }}</h1>
    <section>
      <md-viewer :text="section.desc" />
    </section>
  </main>
  <p v-else>Loading...</p>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return { section: null };
  },

  mounted() {
    const { section } = useRoute().params;
    const url = `${useRuntimeConfig().public.apiUrl}/sections/${section}/`;

    //you will need to enable CORS to make this work
    return axios
      .get(url)
      .then((response) => (this.section = response.data))
      .catch(() => {
        throw showError({
          statusCode: 404,
          message: `${useRoute().path} does not exist`,
        });
      });
  },
};
</script>
