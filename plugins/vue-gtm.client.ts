import VueGtag, { trackRouter } from 'vue-gtag-next';

export default defineNuxtPlugin((nuxtApp) => {
  // only initialise analytics on production
  if (
    process.env.NODE_ENV !== 'development'
    && process.env.NODE_ENV !== 'test'
  ) {
    nuxtApp.vueApp.use(VueGtag, {
      property: {
        id: 'G-MZ24B95RZB',
      },
    });
    trackRouter(useRouter());
  }
});
