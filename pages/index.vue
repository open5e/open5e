<template>
  <section class="container docs-container">

    <h1>Welcome to the new Open5e!</h1>
    <p>Open5e aims to be the best open-source resource for 5e content.</p>
    <p>We've just launched a new version of the site that includes an improved search, better spell and monster organization, and more!</p>

    <h2>Supporting and Contributing</h2>
    
    <h3>Contribute on Github</h3>
    <p>The Open5e <a href="https://github.com/eepMoody/open5e">site</a> and <a href="https://github.com/eepMoody/open5e">API</a> are both open-source on Github! Join us as a contributor and help develop new features and tools. 
    </p>
    <h4>Our tech stack</h4>
    <p>Want to know what you'd be getting into?</p>
    <p><b>DRF API server.</b> Python-based Django Rest Framework, hosted on DigitalOcean.</p>
    <p><b>VueJs UI layer.</b> A Vue.js single-page app hosted on Heroku.</p>

    <a href="https://github.com/eepMoody/open5e" class="external-button"><img src="/img/github-website-button.png"/></a>
    <a href="https://github.com/eepMoody/open5e-api" class="external-button"><img src="/img/github-api-button.png"/></a>
    
    <h3>Support us on Patreon</h3>
    <p>Help keep our digital lights on and keep this site <b>ad-free!</b> We count on donations and patrons to pay for our server costs, and to fund an increasing effort to fill out flavor text and add art.</p>
    <p>If you're interested in using art for your project, donate today! All art will be served via the API and available for use in projects consuming it.</p>
    <a href="https://www.patreon.com/open5e" class="external-button"><img src="/img/patron-button.png"/></a>

    <h3>Join the Discord</h3>
    <p>Join us to chat, talk about development, and share neat homebrew. We don't bite!</p>
    <a href="https://discord.gg/z48BAsD" class="external-button"><img src="/img/discord-button.png"/></a>

    <h2>The API</h2>
    <div class="side-note">
      <h3>Hey! Stuff is missing!</h3>
      <p>Some content you may be expecting was not released as part of the 5e SRD, so we aren’t allowed to include it in this site.</p>
      <p>We are hoping to fill in the gaps using quality homebrew and 3rd party OGL content. Contact us or make a pull request if you know something we should add!</p>
    </div>
    <p>The <a href="https://api.open5e.com">Open5e API</a> includes all monsters and spells from the SRD as well as a search API, so you can easily access any part of the SRD from your app or website.</p>

    <p>The api-beta.open5e.com subdomain will remain indefinitely as the preview location for future API changes.</p>

    <p>We will also start working on creating more supporting art for the 5e SRD.</p>

    <h2>Bugs &amp; Issues</h2>
    <p>If you notice a bug or want to make a suggestion, join us on Discord to talk about it. Our discord is a place to talk about the redesign as well as rules, tools, art, gaming in general, or anything else on your mind!</p>
    
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

<style lang="scss">
.monster-block, .spell-block {
  margin-top: 1rem;
}

.external-button {
  margin-top: 0.6rem;
  zoom: 40%;
  display: inline-block;
  &:hover {
    opacity: 0.9;
  }
}
</style>

