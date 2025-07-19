<template>
  <section class="docs-container container">
    <h1>Welcome to Open5e!</h1>
    <p>The best open-source resource for 5e content.</p>

    <h2>Projects we love</h2>
    <h3>Slyflourish A.K.A. "The Lazy DM"</h3>
    <p>
      <a href="https://slyflourish.com/lazydm/">The Lazy Dungeon Master</a> is a
      masterwork of a guide for anyone aspiring to run Dungeons & Dragons or any
      RPG. Check out
      <a href="https://slyflourish.com/top_advice.html">
        How to Be a Great D&D Dungeon Master
      </a>
      , even if you're an expert. I can guarantee you'll learn something.
    </p>
    <p>
      I'd also like to recommend
      <a href="https://slyflourish.com/playing_dnd_can_save_your_life.html">Playing D&D Can Save Your Life</a>, an inspiring take on the role of fantasy and play in mental health.
    </p>

    <h3>LegendKeeper</h3>
    <p>
      <a href="https://www.legendkeeper.com/">Legendkeeper</a> is a campaign
      manager based around maps that I've personally supported from their days
      on Patreon, and they've added a ton of great features recently. If you're
      looking to manage a campaign and like thinking visually, they're going to
      be right up your alley.
    </p>

    <h2>Supporting and Contributing</h2>

    <h3>Contribute on Github</h3>
    <p>
      The Open5e <a href="https://github.com/open5e/open5e">site</a> and
      <a href="https://github.com/open5e/open5e-api">API</a> are both
      open-source on Github! Join us as a contributor and help develop new
      features and tools.
    </p>
    <div class="side-note">
      <h3>Hey! Stuff is missing!</h3>
      <p>
        Some content you may be expecting was not released as part of the 5e
        SRD, so we aren’t allowed to include it in this site.
      </p>
      <p>
        We are hoping to fill in the gaps using quality homebrew and 3rd party
        OGL content. Contact us or make a pull request if you know something we
        should add!
      </p>
    </div>
    <h4>Our tech stack</h4>
    <p>Want to know what you'd be getting into?</p>
    <p><b>DRF API server.</b> A powerful Python-based REST Framework.</p>
    <p>
      <b>VueJs UI layer.</b> A Vue.js single-page app, using the Nuxt framework.
    </p>

    <a
      href="https://github.com/open5e/open5e"
      class="external-button mr-2"
    >
      <img
        src="/img/github-website-button.png"
        alt="Open5e site repo"
      />
    </a>
    <a
      href="https://github.com/open5e/open5e-api"
      class="external-button"
    >
      <img
        src="/img/github-api-button.png"
        alt="Open5e API Repo"
      />
    </a>

    <h3>Support us on Patreon</h3>
    <p>
      Help keep our digital lights on and keep this site <b>ad-free</b> We count
      on donations and patrons to pay for our server costs, and to fund an
      increasing effort to fill out flavor text and add art.
    </p>
    <a
      href="https://www.patreon.com/open5e"
      class="external-button"
    >
      <img
        class="rounded-lg"
        src="/img/patron-button.png"
        alt="Become a patron! Keep Open5e ad free!"
      />
    </a>

    <h3>Join the Discord</h3>
    <p>
      Join us to chat, talk about development, and share neat homebrew. We don't
      bite!
    </p>
    <a
      href="https://discord.gg/QXqF6gSVqB"
      class="external-button"
    >
      <img
        src="/img/discord-button.png"
        alt="Join our discord"
      />
    </a>

    <h2>The API</h2>

    <p>
      The <a href="https://api.open5e.com">Open5e API</a> includes all monsters
      and spells from the SRD and other OGL sources as well as a search API, so
      you can easily access any part of the SRD from your app or website.
    </p>

    <h2>Bugs &amp; Issues</h2>
    <p>
      If you notice a bug or want to make a suggestion, join us on
      <a href="https://discord.gg/z48BAsD">Discord</a> to talk about it. Our
      discord is a place to talk about the redesign as well as rules, tools,
      art, gaming in general, or anything else on your mind!
    </p>
  </section>
</template>

<style lang="scss">
.external-button {
  margin-top: 0.6rem;
  zoom: 40%;
  display: inline-block;

  &:hover {
    opacity: 0.9;
  }
}
</style>
