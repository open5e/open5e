## Open5e.com is a site for browsing and finding open D&D content

![Web status](https://img.shields.io/website?down_message=Down&label=Open5e%20Site&up_message=Up&url=https%3A%2F%2Fopen5e.com) 

## Getting oriented

Open5e is a community project driven by a small number of volunteers in their spare time. We welcome any and all contributions! 

Useful places to check out:

- [Our discord](https://discord.gg/9RNE2rY) where we discuss the project and generally pal around. Bring your best memes.
- [The project org homepage](https://github.com/open5e) which has links to our roadmaps and other resources
- [The API repo](https://github.com/open5e/open5e-api) if you're more interested in python
- [The website!](https://open5e.com) published from this repo

# Developing on the Website (this repo)

Open5e uses the Nuxt3 framework for Vue3, which takes care of a lot of the architectural work for the frontend layer while allowing a large amount of flexibility.

## Build Setup

After cloning this repo, from /open5e

```bash
# install dependencies
$ npm install # Or yarn install

# Optional: point it at a real API by setting API_URL=https:someurl.com
# serve with hot reload at localhost:3000. If you
$ npm run dev
```
By default, the UI layer will point to the live API. If you want to change this, you can set an environment variable for "API_URL" and direct it to a local API source. (Usually localhost:8888 if you're using the api at https://github.com/eepMoody/open5e-api

Other build options:

```
# build for production and launch server
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
