module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Open5e',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href:'https://fonts.googleapis.com/css?family=Lora:700'},
      { rel: 'stylesheet', href:'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,600,600i,700,700i'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#a82315' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vue-showdown'],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  render: {
    gzip: { 
      threshold: 1024,
    }
  }
}

