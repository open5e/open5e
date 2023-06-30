<template>
  <main v-if="section" class="docs-container container">
    <h1>{{ title }}</h1>
    <section>
      <md-viewer :text="section.desc" />
    </section>
  </main>
  <p v-else>Loading...</p>
</template>

<script>
import axios from 'axios';
import MdViewer from '~/components/MdViewer';
export default {
  components: { MdViewer },
  data() {
    return {
      title: '',
      section: null,
    };
  },

  mounted() {
    const url = `${useRuntimeConfig().public.apiUrl}/sections/${
      this.$route.params.section
    }`;

    //you will need to enable CORS to make this work
    return axios.get(url).then((response) => {
      this.section = response.data;
      this.title = response.data.name;
    });
  },
};
</script>

<style></style>
