<template>
  <section class="container docs-container">
    <div>
      <h1>{{spell.name}}</h1>
      <p><em>{{spell.level}} {{spell.school}}</em> | ({{classList}})</p>
      <p><label>Range:</label> {{spell.range}}</p>
      <p><label>Casting Time:</label> {{spell.casting_time}} <span v-if="spell.ritual === 'yes'">{{spell.ritual}} (Ritual)</span></p>
      <p><label>Components: {{spell.components}} <span v-if="spell.material">({{spell.material}})</span></label></p>
      <md-viewer :text="spell.desc"></md-viewer>
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
  mounted () {
    return axios.get(`/json/spells/${this.$route.params.id}.json`) //you will need to enable CORS to make this work
    .then(response => {
      this.spell = response.data
      this.classList = response.data.class.join(',')
    })
  },
  data () {
    return {
      spell: [],
    }
  },
  computed: {
    nextSpellId: function () {
      return (this.spell.id + 1)
    },
    prevSpellId: function () {
      return (this.spell.id - 1)
    }
  }
}
</script>

<style scoped>
label {
  font-weight: bold;
}
</style>

