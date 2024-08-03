<p align="center">
  <img src="logo.png" width="200px" align="center" alt="Open5e logo" />
  <h1 align="center">Open5e</h1>
  <p align="center">
    <a href="https://open5e.com">https://open5e.com</a>
    <br/>
    Site for browsing open D&D 5e content
  </p>
</p>
<br />

<p align="center">
<a href="https://api.open5e.com" rel="nofollow"><img src="https://img.shields.io/website?down_message=Down&label=Open5e%20API&up_message=Up&url=https%3A%2F%2Fapi.open5e.com" alt="API"></a>
<a href="https://open5e.com" rel="nofollow"><img src="https://img.shields.io/website?down_message=Down&label=Open5e&up_message=Up&url=https%3A%2F%2Fopen5e.com" alt="homepage"></a>
</p>

<div align="center">
    <a href="https://api.open5e.com">API</a>
    <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
    <a href="https://discord.gg/9RNE2rY">Discord</a>
    <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
    <a href="https://www.patreon.com/open5e">Patreon</a>
</div>

<br/>

# Introduction

Open5e is a community project driven by a small number of volunteers in their spare time. We welcome any and all contributions!

Useful places to check out:

- [Our discord](https://discord.gg/9RNE2rY) where we discuss the project and generally pal around. Bring your best memes.
- [The project org homepage](https://github.com/open5e) which has links to our roadmaps and other resources

# Development

Open5e uses the Nuxt3 framework for Vue3, which takes care of a lot of the architectural work for the frontend layer while allowing a large amount of flexibility.

5e game content is fetched from the [open5e API](https://github.com/eepMoody/open5e-api) running at https://api.open5e.com. This can be redirected using the environment variable `API_URL`.

## Build Setup

Install dependencies.
```bash
npm install
```

Run the page in development mode.
```bash
npm run dev
```

Build for production and launch server.
```bash
npm start
```

Generate static project for publishing.
```bash
npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
