# open5e is now running on Vue.js!

## Check the [Beta Site](https://beta.open5e.com) and [API](https://api.open5e.com) to see what's up! You can find the API repo at [on github](https://github.com/eepMoody/open5e-api).

We have a discord going for discussing the rebuild, and I hope you'll join us! https://discord.gg/9RNE2rY 

Open5e is a community project driven by a small number of volunteers in their spare time. We welcome any and all contributions! Please join our Discord to help out: https://discord.gg/9RNE2rY or check out the issue board if you'd like to see what's being worked on!

# Build and run the UI layer

Open5e uses the Nuxt framework for Vue.js, which takes care of a lot of the architectural work for the frontend layer while allowing a large amount of flexibility.

By default, the UI layer will point to the live API. If you want to change this, you can set an environment variable for "API_URL" and direct it to a local API source. (Usually localhost:8888 if you're using the api at https://github.com/eepMoody/open5e-api

## Build Setup

From /open5e

``` bash
# install dependencies
$ npm install # Or yarn install

# Optional: point it at a real API by setting API_URL=https:someurl.com
# serve with hot reload at localhost:3000. If you 
$ npm run dev
```

Other build options:
```
# build for production and launch server
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
