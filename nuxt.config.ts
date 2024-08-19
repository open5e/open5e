// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Open5e',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
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
    },
  },
  nitro: {
    preset: 'digital-ocean',
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon'],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'https://api.open5e.com',
    },
  },
  target: 'static',
  ssr: false,
  generate: {
    fallback: '404.html',
  },
  tailwindcss: {
    configPath: '~/tailwind.config.ts',
    cssPath: '~/styles/tailwind.css',
  },
});
