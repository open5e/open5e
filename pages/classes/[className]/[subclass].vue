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
import axios from 'axios';
export default {
  data() {
    return { subclass: null };
  },
  mounted() {
    const { className, subclass } = useRoute().params;
    const url = `${useRuntimeConfig().public.apiUrl}/classes/${className}/`;

    //you will need to enable CORS to make this work
    return axios
      .get(url)
      .then((response) => {
        this.subclass = response.data.archetypes.find(
          (subclass) => subclass.slug === this.$route.params.subclass
        );
        if (!this.subclass) {
          navigateTo(`/classes/${className}`, { statusCode: '404' });
        }
      })
      .catch(() => {
        throw showError({
          statusCode: 404,
          message: `${useRoute().path} does not exist`,
        });
      });
  },
};
</script>
