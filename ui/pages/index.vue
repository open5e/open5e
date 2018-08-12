<template>
  <section class="container docs-container">
    Open5e aims to be the best open-source resource for 5e content.

    <div class="side-note">
      <h3>Hey! Stuff is missing!</h3>
      <p>Some content you may be expecting was not released as part of the 5e SRD, so we aren’t allowed to include it in this site.</p>
      <p>We are hoping to fill in the gaps using quality homebrew and 3rd party OGL content. Contact us or make a pull request if you know something we should add!</p>
    </div>

    <h1>Join us in creating the new Open5e!</h1>
    <p>We’re starting on a new version of the site with lots of new, highly-requested features like: better search, more art, tokens, inline rollers, and more!</p>

    <p>If you enjoy Open5e, join us on Discord to talk about it. Our discord is a place to talk about the redesign as well as rules, tools, art, gaming in general, or anything else on your mind!</p>

    <p>We will also start working on creating more supporting art for the 5e SRD.</p>

    <h2>Classes</h2>
      <ul>
        <nuxt-link tag="li" to="/classes/barbarian">Barbarian</nuxt-link>
        <nuxt-link tag="li" to="/classes/bard">Bard</nuxt-link>
        <nuxt-link tag="li" to="/classes/cleric">Cleric</nuxt-link>
        <nuxt-link tag="li" to="/classes/druid">Druid</nuxt-link>
        <nuxt-link tag="li" to="/classes/fighter">Fighter</nuxt-link>
        <nuxt-link tag="li" to="/classes/monk">Monk</nuxt-link>
        <nuxt-link tag="li" to="/classes/paladin">Paladin</nuxt-link>
        <nuxt-link tag="li" to="/classes/ranger">Ranger</nuxt-link>
        <nuxt-link tag="li" to="/classes/rogue">Rogue</nuxt-link>
        <nuxt-link tag="li" to="/classes/sorcerer">Sorcerer</nuxt-link>
        <nuxt-link tag="li" to="/classes/warlock">Warlock</nuxt-link>
        <nuxt-link tag="li" to="/classes/wizard">Wizard</nuxt-link>
      </ul>

    <h2>Combat</h2>
    <div class="docs-toc">
      <ul>
        <li><nuxt-link tag="a" to="/combat/actions">Actions in Combat</nuxt-link></li>
        <li><nuxt-link tag="a" to="/combat/attacking">Attacking</nuxt-link></li>
        <li><nuxt-link tag="a" to="/combat/combat-sequence">Combat Sequence</nuxt-link></li>
        <li><nuxt-link tag="a" to="/combat/cover">Cover</nuxt-link></li>
        <li><nuxt-link tag="a" to="/combat/damage-and-healing">Damage &amp; Healing</nuxt-link></li>
        <li><nuxt-link tag="a" to="/combat/mounted-combat">Mounted combat</nuxt-link></li>
        <li><nuxt-link tag="a" to="/combat/movement-in-combat">Movement in Combat</nuxt-link></li>
        <li><nuxt-link tag="a" to="/combat/underwater-combat">Underwater COmbat</nuxt-link></li>
      </ul>
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
    this.getMonsters();
    this.getSpells();
  },
  data () {
    return {
      monsters: [],
      spells: [],
    }
  },
  methods: {
    getMonsters: function () {
      return axios.get(`http://localhost:8000/monsters`) //you will need to enable CORS to make this work
      .then(response => {
        this.monsters = response.data.results
      })
    },
    getSpells: function () {
      return axios.get(`http://localhost:8000/spells`) //you will need to enable CORS to make this work
      .then(response => {
        this.spells = response.data.results
      })
    }
  }
}
</script>

<style>
.monster-block, .spell-block {
  margin-top: 1rem;
}
</style>

