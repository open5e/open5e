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
        { key: 'description', name: 'description', content: 'Free and open-source library of 5e rules, monsters, spells, etc. Powered by the Open5e API' },
        
        // Open Graph metadata
        { property: 'og:title', content: 'Open5e'},
        { property: 'og:site:name', content: 'Open5e' },
        { property: 'og:description', content: 'Free and open-source library of 5e rules, monsters, spells, etc. Powered by the Open5e API'},
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://open5e.com' },
        { property: 'og:image', content: 'https://open5e.com/img/logo.png'},
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' },

        // Twitter metadata
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Open5e' },
        { name: 'twitter:description', content: 'Free and open-source library of 5e rules, monsters, spells, etc. Powered by the Open5e API' },
        { name: 'twitter:image', content: 'https://open5e.com/img/logo.png'} 
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

  vue: {
    runtimeCompiler: true
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
    '@nuxt/test-utils/module',
  ],
  
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'https://api.open5e.com',
    },
  },

  typescript: {
    // typeCheck: true,
    strict: true
  },
  imports: {
    autoImport: true,
    global: true,
  },

  compatibilityDate: '2024-11-16',
});
