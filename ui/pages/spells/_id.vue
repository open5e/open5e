<template>
  <section class="container docs-container">
    <div>
      <h1>{{spell.name}}</h1>
      <p><em>{{spell.level}} {{spell.school}}</em> | ({{spell.dnd_class}})</p>
      <p><label>Range:</label> {{spell.range}}</p>
      <p><label>Casting Time:</label> {{spell.casting_time}} <span v-if="spell.ritual === 'yes'">{{spell.ritual}} (Ritual)</span></p>
      <p><label>Components: {{spell.components}} <span v-if="spell.material">({{spell.material}})</span></label></p>
      <p v-html="spell.desc"></p>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import StatBonus from '~/components/StatBonus.vue'

export default {
  components: {
    StatBonus
  },
  mounted () {
    return axios.get(`http://localhost:8000/spells/${this.$route.params.id}`) //you will need to enable CORS to make this work
    .then(response => {
      this.spell = response.data
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
p {
  white-space: pre-wrap;
}
label {
  font-weight: bold;
}
</style>

