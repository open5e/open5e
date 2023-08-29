<template>
  <main v-if="section" class="docs-container container">
    <h1>{{ section.name }}</h1>
    <section>
      <md-viewer :text="section.desc" />
    </section>
  </main>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      section: undefined,
    };
  },
  mounted() {
    const { section } = useRoute().params;
    const url = `${useRuntimeConfig().public.apiUrl}/sections/${section}/`;
    return axios
      .get(url)
      .then((response) => {
        this.section = response.data;
      })
      .catch(() => {
        throw showError({
          statusCode: 404,
          message: `The route ${useRoute().path} does not exist`,
        });
      });
  },
};
</script>
