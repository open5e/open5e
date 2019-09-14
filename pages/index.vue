<template>
  <section class="container docs-container">
    Open5e aims to be the best open-source resource for 5e content.

    <h1>Welcome to the (new and improved) Open5e!</h1>
    <p>We've just launched a new version of the site that includes an improved search, better spell and monster organization, and more!</p>

    <h3>Bugs &amp; Issues</h3>
    <p>If you notice a bug or want to make a suggestion, join us on Discord to talk about it. Our discord is a place to talk about the redesign as well as rules, tools, art, gaming in general, or anything else on your mind!</p>

        <div class="side-note">
      <h3>Hey! Stuff is missing!</h3>
      <p>Some content you may be expecting was not released as part of the 5e SRD, so we aren’t allowed to include it in this site.</p>
      <p>We are hoping to fill in the gaps using quality homebrew and 3rd party OGL content. Contact us or make a pull request if you know something we should add!</p>
    </div>

  <h3>The API</h3>
  <p>The <a href="https://api.open5e.com">Open5e API</a> includes all monsters and spells from the SRD as well as a search API, so you can easily access any part of the SRD from your app or website.</p>

  <p>The api-beta.open5e.com subdomain will remain indefinitely as the preview location for future API changes.</p>

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

