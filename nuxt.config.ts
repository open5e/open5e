import { defineNuxtConfig } from 'nuxt/config';


export default defineNuxtConfig({
  srcDir: 'app/',
  dir: {
    public: '../public',
  },
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
    publicAssets: [
      {
        baseURL: '/',
        dir: 'public'
      }
    ]
  },

  modules: [
    '@nuxt/eslint',
    ['@nuxtjs/tailwindcss', {
      configPath: '~/tailwind.config.ts',
      cssPath: '~/styles/tailwind.css',
    }],
    'nuxt-icon',
    '@hebilicious/vue-query-nuxt',
    '@nuxt/test-utils/module',
  ],
  
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'https://api.open5e.com',
    },
  },

  hooks: {
    'vite:extendConfig': (config, { isClient }) => {
      if (isClient) {
        config.resolve = config.resolve || {};
        config.resolve.alias = {
          ...(Array.isArray(config.resolve.alias)
            ? Object.fromEntries(config.resolve.alias.map(a => [a.find, a.replacement]))
            : config.resolve.alias),
          vue: 'vue/dist/vue.esm-bundler.js',
        };
      }
    },
  },

  typescript: {
    strict: false,
  },

  compatibilityDate: '2024-11-16',
});
