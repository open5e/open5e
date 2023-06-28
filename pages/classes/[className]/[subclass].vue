<template>
  <main v-if="subclass" class="container docs-container">
    <h1>{{ subclass.name }}</h1>
    <section>
      <md-viewer :text="subclass.desc" />
    </section>
  </main>
  <p v-else>Loading...</p>
</template>

<script>
import MdViewer from '~/components/MdViewer';
import axios from 'axios';

export default {
  components: { MdViewer },
  data() {
    return {
      subclass: null,
    };
  },

  mounted() {
    const url = `${useRuntimeConfig().public.apiUrl}classes/${
      this.$route.params.className
    }`;
    //you will need to enable CORS to make this work
    return axios.get(url).then((response) => {
      this.subclass = response.data.archetypes.find(
        (subclass) => subclass.slug === this.$route.params.subclass
      );
    });
  },
};
</script>
