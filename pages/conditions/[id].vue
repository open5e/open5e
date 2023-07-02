<template>
  <section class="docs-container container">
    <h1>{{ condition.name }}</h1>
    <md-viewer :text="condition.desc" />
  </section>
</template>

<script>
import axios from 'axios';
import MdViewer from '~/components/MdViewer';

export default {
  components: {
    MdViewer,
  },
  data() {
    return {
      posts: [],
      errors: [],
      condition: [],
    };
  },
  mounted() {
    return axios
      .get(
        `${useRuntimeConfig().public.apiUrl}/conditions/${
          this.$route.params.id
        }`
      ) //you will need to enable CORS to make this work
      .then((response) => {
        this.condition = response.data;
      });
  },
};
</script>

<style lang="scss"></style>
