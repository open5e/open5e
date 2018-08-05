<template>
  <section class="container">
    <div>
      <h2>{{spell.name}}</h2>
      <p>A {{spell.level}} {{spell.dnd_class}} spell</p>
      <p><label>Range:</label> {{spell.range}}</p>
      <p><label>Casting Time:</label> {{spell.casting_time}} <span v-if="spell.ritual === 'yes'">{{spell.ritual}} (Ritual)</span></p>
      <p><label>Components: {{spell.components}} ({{spell.material}})</label></p>
      <p v-html="spell.desc"></p>
    </div>
    <nuxt-link tag="button" v-if="spell.id > 1" :to="`/spells/view/${prevSpellId}`">Previous</nuxt-link>
    <nuxt-link tag="button" :to="`/spells/view/${nextSpellId}`">Next</nuxt-link>
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

<style>
p {
  width: 60rem;
}
</style>

