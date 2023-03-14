module.exports = {
    /*
    ** Headers of the page
    */
    pageTransition: {
        name: 'fade',
        mode: 'out-in'
    },
    head: {
        title: 'Open5e',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'The truly open source for 5e rules and resources'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lora:700'},
            {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,600,600i,700,700i'}
        ]
    },
    /*
    ** Customize the progress bar color
    */
    loading: {color: '#a82315'},
    /*
    ** Build configuration
    */
    build: {
        transpile: [
            '@sindresorhus/slugify',
            '@sindresorhus/transliterate',
            'hast-util-select',
            'lodash-es'
        ],
        extend (config, {isDev}) {
            if (isDev && process.client) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
            config.resolve.alias['vue'] = 'vue/dist/vue.common'
        }
    },
    modules: [
        ['vue-scrollto/nuxt', { duration: 300 }],
        ['@nuxtjs/google-analytics', {
            id: 'UA-73129463-3'
        }]
    ],
    render: {
        compressor: {
            threshold: 1024
        }
    },
    env: {
        apiUrl: process.env.API_URL || 'https://api.open5e.com'
    }
}

