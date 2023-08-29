<template>
  <section class="docs-container container">
    <h1>{{ section.name }}</h1>
    <md-viewer :text="section.desc" />
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
      errors: [],
      section: [],
    };
  },
  mounted() {
    const { id } = useRoute().params;
    const url = `${useRuntimeConfig().public.apiUrl}/sections/${id}/`;
    return axios
      .get(url) //you will need to enable CORS to make this work
      .then((response) => (this.section = response.data))
      .catch(() => {
        throw showError({
          statusCode: 404,
          message: `The page ${useRoute().path} does not exist`,
        });
      });
  },
};
</script>
