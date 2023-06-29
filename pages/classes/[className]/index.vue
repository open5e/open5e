<template>
  <main v-if="classDetails" class="container docs-container">
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
      <h2>{{ classDetails.subtypes_name }}</h2>
      <ul v-for="archetype in classDetails.archetypes" :key="archetype">
        <li>
          <nuxt-link :to="`${classDetails.slug}/${archetype.slug}`" tag="a">
            {{ archetype.name }}
          </nuxt-link>
        </li>
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
      className: '',
      classDetails: null,
      url: '',
    };
  },

  mounted() {
    const url = `${useRuntimeConfig().public.apiUrl}classes/${
      this.$route.params.className
    }`;
    //you will need to enable CORS to make this work
    return axios.get(url).then((response) => {
      this.classDetails = response.data;
      this.className = response.data.name;
    });
  },
};
</script>
