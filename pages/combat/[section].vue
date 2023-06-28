<template>
  <main v-if="section" class="container docs-container">
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
  created() {
    // Re-fetch section data when the url params change
    this.$watch(
      () => this.$route.params,
      () => this.fetchSectionData(),
      { immediate: true }
    );
  },
  methods: {
    fetchSectionData() {
      if (!this.$route.params.section) {
        return;
      }
      this.loading = true;
      const url = `${this.$nuxt.$config.public.apiUrl}sections/${this.$route.params.section}`;
      axios.get(url).then((res) => {
        this.section = res.data;
        this.title = res.data.name;
      });
    },
  },
};
</script>

<style></style>
