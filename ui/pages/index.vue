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
    
  </section>
</template>

<script>
import axios from 'axios'
import StatBonus from '~/components/StatBonus.vue'

export default {
  components: {
    StatBonus
  },
  data () {
    return {
      monsters: [],
      spells: [],
    }
  },
}
</script>

<style>
.monster-block, .spell-block {
  margin-top: 1rem;
}
</style>

