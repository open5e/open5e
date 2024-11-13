// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in',
    },
    /*
     ** Headers of the page
     */
    head: {
      title: 'Open5e',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          key: 'description',
          name: 'description',
          content: 'The truly open source for 5e rules and resources',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Lora:700',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,600,600i,700,700i',
        },
      ],
      htmlAttrs: {
        lang: 'en',
      },
      script: [
        {
          type: 'text/javascript',
          innerHTML: `
          if (localStorage.theme === "dark" || (!('theme' in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        `,
        },
      ],
    },
  },
  nitro: {
    preset: 'digital-ocean',
  },
  // vite: {
  //   resolve: {
  //     alias: {
  //       vue: 'vue/dist/vue.esm-bundler',
  //     }
  //   },
  // },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@hebilicious/vue-query-nuxt',
    '@nuxt/test-utils/module',
  ],
  queryClientOptions: {
    defaultOptions: { queries: { staleTime: Infinity } },
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'https://api.open5e.com',
    },
  },
  router: {
    prefetchLinks: false,
  },
  hooks: {
    'vite:extendConfig': (config, { isClient, isServer }) => {
      if (isClient) {
        config.resolve.alias.vue = 'vue/dist/vue.esm-bundler';
      }
    },
  },
  tailwindcss: {
    configPath: '~/tailwind.config.ts',
    cssPath: '~/styles/tailwind.css',
  },
});
