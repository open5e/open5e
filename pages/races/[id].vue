<template>
  <section v-show="loaded" class="docs-container container">
    <h1>{{ race.name }}</h1>
    <md-viewer :text="race.desc" />
    <md-viewer :text="race['asi_desc']" />
    <md-viewer :text="race['speed_desc']" />
    <md-viewer :text="race.vision" />
    <md-viewer :text="race.age" />
    <md-viewer :text="race.alignment" />
    <md-viewer :text="race.size" />
    <md-viewer :text="race.languages" />
    <md-viewer :text="race.traits" />
    <p class="text-sm italic">
      Source:
      <a target="NONE" :href="race.document__url"
        >{{ race.document__title }}
        <Icon name="heroicons:arrow-top-right-on-square-20-solid"></Icon
      ></a>
    </p>

    <h2 v-if="subraceLength > 0">Subraces</h2>
    <div v-for="subrace in race.subraces" :key="subrace.name">
      <h3 class="flex items-center">
        {{ subrace.name }}
        <source-tag
          v-show="race.document__slug"
          class="ml-4"
          :title="race.document__title"
          :text="race.document__slug"
        />
      </h3>
      <md-viewer :header-level="2" :text="subrace.desc" />
      <md-viewer :text="subrace['asi_desc']" />
      <md-viewer :text="subrace.traits" />
      <p class="text-sm italic">
        Source:
        <a target="NONE" :href="subrace.document__url">
          {{ subrace.document__title }}
          <Icon name="heroicons:arrow-top-right-on-square-20-solid" />
        </a>
      </p>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
      errors: [],
      race: [],
      loaded: false,
      subraceLength: 0,
    };
  },
  mounted() {
    const { id } = useRoute().params;
    const url = `${useRuntimeConfig().public.apiUrl}/races/${id}/`;
    return axios
      .get(url) //you will need to enable CORS to make this work
      .then((response) => {
        this.race = response.data;
        this.loaded = true;
        this.subraceLength = this.race.subraces.length;
      })
      .catch(() => {
        throw showError({
          statusCode: 404,
          message: `The page ${useRoute().path} does not exist`,
        });
      });
  },
};
</script>
