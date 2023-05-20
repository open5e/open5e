<template>
  <section class="container docs-container">
    <h1>{{ section.name }}</h1>
    <md-viewer :text="section.desc" />
    <h2 v-show="section.slug === 'backgrounds'">Character backgrounds</h2>
    <article
      v-for="background in backgroundsList"
      v-show="section.slug === 'backgrounds'"
      :key="background.slug"
    >
      <h3>{{ background.name }}</h3>
      <p>{{ background.desc }}</p>
      <p v-show="background.languages">
        <b>Languages.</b> {{ background.languages }}
      </p>
      <p v-show="background.tool_proficiencies">
        <b>Tool proficiencies.</b> {{ background.tool_proficiencies }}
      </p>
      <p v-show="background.skill_proficiencies">
        <b>Skill proficiencies.</b> {{ background.skill_proficiencies }}
      </p>
      <p><b>Equipment.</b> {{ background.equipment }}</p>
      <h4>Special feature: {{ background.feature }}</h4>
      <p>{{ background.feature_desc }}</p>
    </article>
  </section>
</template>

<script>
import axios from 'axios';
import MdViewer from '~/components/MdViewer';
import { useMainStore } from '~/store';

export default {
  components: {
    MdViewer,
  },
  setup() {
    const store = useMainStore();
    return { store };
  },
  data: function () {
    return {
      file: useRoute().path,
      posts: [],
      errors: [],
      section: [],
    };
  },
  computed: {
    backgroundsList() {
      return this.store.allBackgrounds;
    },
  },
  beforeCreate() {
    this.store.loadBackgrounds();
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
  methods: {
    updateFilter: function (val) {
      this.filter = val;
    },
  },
};
</script>

<style lang="scss"></style>
