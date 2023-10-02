<template>
  <main v-if="classData" class="docs-container container">
    <h1>{{ classData.name }}</h1>

    <section>
      <h2>Class Features</h2>
      <p>As a {{ classData.name }} you gain the following features.</p>
      <h3>Hit Points</h3>
      <p>
        <span class="font-bold">Hit Dice: </span>
        {{ classData.hit_dice }} per {{ classData.name }} level
      </p>
      <p>
        <span class="font-bold">Hit Points at 1st Level: </span>
        {{ classData.hp_at_1st_level }}
      </p>
      <p>
        <span class="font-bold">Hit Points at Higher Levels: </span>
        {{ classData.hp_at_higher_levels }}
      </p>

      <h3>Proficiencies</h3>
      <p>
        <span class="font-bold">Armor: </span>
        {{ classData.prof_armor }}
      </p>
      <p>
        <span class="font-bold">Weapons: </span>
        {{ classData.prof_weapons }}
      </p>
      <p>
        <span class="font-bold">Tools: </span>
        {{ classData.prof_tools }}
      </p>
      <p>
        <span class="font-bold">Saving Throws: </span>
        {{ classData.prof_saving_throws }}
      </p>
      <p>
        <span class="font-bold">Skills: </span>
        {{ classData.prof_skills }}
      </p>

      <h3>The {{ className }}</h3>
      <md-viewer :text="classData.table" />
    </section>

    <section>
      <h2>Class Abilities</h2>
      <md-viewer :text="classData.desc" />
    </section>
    <section>
      <h2>{{ classData.subtypes_name }}</h2>
      <ul v-for="archetype in classData.archetypes" :key="archetype">
        <li>
          <nuxt-link :to="`${classData.slug}/${archetype.slug}`" tag="a">
            {{ archetype.name }}
          </nuxt-link>
        </li>
      </ul>
    </section>
  </main>

  <p v-else>Loading...</p>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return { classData: undefined };
  },
  mounted() {
    const { className } = useRoute().params;
    const url = `${useRuntimeConfig().public.apiUrl}/classes/${className}/`;
    //you will need to enable CORS to make this work
    return axios
      .get(url)
      .then((response) => (this.classData = response.data))
      .catch(() => {
        throw showError({
          statusCode: 404,
          message: `${useRoute().path} does not exist`,
        });
      });
  },
};
</script>
