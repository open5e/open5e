<template>
  <section class="docs-container container">
    <h1>{{ condition.name }}</h1>
    <md-viewer :text="condition.desc" />
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
      errors: [],
      condition: [],
    };
  },
  mounted() {
    const { id } = useRoute().params;
    const url = `${useRuntimeConfig().public.apiUrl}/conditions/${id}/`;
    return axios
      .get(url) //you will need to enable CORS to make this work
      .then((response) => (this.condition = response.data))
      .catch(() => {
        throw showError({
          statusCode: 404,
          message: `${useRoute().path} does not exist`,
        });
      });
  },
};
</script>
