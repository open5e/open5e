<template>
  <section class="docs-container container">
    <h1>{{ section.name }}</h1>
    <md-viewer :text="section.desc" />
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
      section: [],
    };
  },
  mounted() {
    return axios
      .get(
        `${this.$nuxt.$config.public.apiUrl}/sections/${this.$route.params.id}`
      ) //you will need to enable CORS to make this work
      .then((response) => {
        this.section = response.data;
      });
  },
};
</script>

<style lang="scss"></style>
