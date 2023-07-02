<template>
  <main v-if="subclass" class="docs-container container">
    <h1>
      {{ subclass.name }}
      <source-tag
        :title="subclass.document__title"
        :text="subclass.document__slug"
      />
    </h1>

    <section>
      <md-viewer :text="subclass.desc" />
    </section>
  </main>
  <p v-else>Loading...</p>
</template>

<script>
import MdViewer from '~/components/MdViewer.vue';
import SourceTag from '~/components/SourceTag.vue';
import axios from 'axios';

export default {
  components: { MdViewer, SourceTag },
  data() {
    return {
      subclass: null,
    };
  },

  mounted() {
    const url = `${useRuntimeConfig().public.apiUrl}/classes/${
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
