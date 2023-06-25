<template>
  <section class="container docs-container">
    <h1>{{ className.charAt(0).toUpperCase() + className.slice(1) }}</h1>
    <p v-if="loading">Loading...</p>
    <div v-else>
      <md-viewer :text="classDetails.desc" />
    </div>
  </section>
</template>

<script>
import MdViewer from '~/components/MdViewer';
import axios from 'axios';

export default {
  components: { MdViewer },
  data() {
    return {
      loading: false,
      className: this.$route.params.className,
      classDetails: null,
    };
  },

  created() {
    // Re-fetch class data when the url params change
    this.$watch(
      () => this.$route.params,
      () => this.fetchClassData(),
      { immediate: true }
    );
  },

  methods: {
    fetchClassData() {
      this.loading = true;
      const url = `${useRuntimeConfig().public.apiUrl}/classes/`;
      axios.get(url + this.$route.params.className).then((res) => {
        this.classDetails = res.data;
        this.loading = false;
      });
    },
  },
};
</script>

<style></style>
