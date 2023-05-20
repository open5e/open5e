<template>
  <section class="container docs-container">
    <p v-if="loading">
      Loading...
    </p>
    <div v-else>
      <h1>{{ spell.name }}</h1>
      <p><em>{{ spell.level }} {{ spell.school }}</em> | {{ spell.dnd_class }}</p>
      <p><label>Range:</label> {{ spell.range }}</p>
      <p>
        <label>Casting Time:</label> {{ spell.casting_time }} <span v-if="spell.ritual === 'yes'">{{ spell.ritual }}
          (Ritual)</span>
      </p>
      <p>
        <label>Duration:</label> {{ spell.duration }} <span v-if="spell.concentration === 'yes'">(Concentration)</span>
      </p>
      <p><label>Components: {{ spell.components }} <span v-if="spell.material">({{ spell.material }})</span></label></p>
      <md-viewer :text="spell.desc" />
      <p v-if="spell.higher_level">
        <label>At higher levels:</label> {{ spell.higher_level }}
      </p>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import StatBonus from '~/components/StatBonus.vue'
import MdViewer from '~/components/MdViewer';

export default {
  components: {
    StatBonus,
    MdViewer
  },
  data() {
    return {
      spell: [],
      classList: [],
      loading: true
    }
  },
  computed: {
    nextSpellId: function () {
      return (this.spell.id + 1)
    },
    prevSpellId: function () {
      return (this.spell.id - 1)
    }
  },
  mounted() {
    return axios.get(`${this.$nuxt.$config.public.apiUrl}/spells/${this.$route.params.id}`) //you will need to enable CORS to make this work
      .then(response => {
        this.spell = response.data;
        this.loading = false
      })
  }
}
</script>

<style scoped>
label {
  font-weight: bold;
}
</style>

