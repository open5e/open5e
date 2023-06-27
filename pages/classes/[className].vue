<template>
  <main v-if="!loading" class="container docs-container">
    <h1>{{ className }}</h1>

    <section>
      <h2>Class Features</h2>
      <p>As a {{ className }} you gain the following features.</p>
      <h3>Hit Points</h3>
      <p>
        <span class="font-bold">Hit Dice: </span>
        {{ classDetails.hit_dice }} per {{ className }} level
      </p>
      <p>
        <span class="font-bold">Hit Points at 1st Level: </span>
        {{ classDetails.hp_at_1st_level }}
      </p>
      <p>
        <span class="font-bold">Hit Points at Higher Levels: </span>
        {{ classDetails.hp_at_higher_levels }}
      </p>

      <h3>Proficiencies</h3>
      <p>
        <span class="font-bold">Armor: </span>
        {{ classDetails.prof_armor }}
      </p>
      <p>
        <span class="font-bold">Weapons: </span>
        {{ classDetails.prof_weapons }}
      </p>
      <p>
        <span class="font-bold">Tools: </span>
        {{ classDetails.prof_tools }}
      </p>
      <p>
        <span class="font-bold">Saving Throws: </span>
        {{ classDetails.prof_saving_throws }}
      </p>
      <p>
        <span class="font-bold">Skills: </span>
        {{ classDetails.prof_skills }}
      </p>

      <h3>The {{ className }}</h3>
      <md-viewer :text="classDetails.table" />
    </section>

    <section>
      <h2>Class Abilities</h2>
      <md-viewer :text="classDetails.desc" />
    </section>

    <section>
      <h2>{{ className }} {{ classDetails.subtypes_name }}</h2>
      <ul v-for="archetype in classDetails.archetypes" :key="archetype">
        <li>{{ archetype.name }}</li>
      </ul>
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
      loading: false,
      className: '',
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
      if (!this.$route.params.section) {
        return;
      }
      this.loading = true;
      const url = `${useRuntimeConfig().public.apiUrl}/classes/`;
      axios.get(url + this.$route.params.className).then((res) => {
        this.classDetails = res.data;
        this.className = res.data.name;
        this.loading = false;
      });
    },
  },
};
</script>
