import { parseURL } from "ufo";
import { defineNuxtPlugin } from "#app/nuxt";
import { loadPayload, isPrerendered } from "#app/composables/payload";
import { useRouter } from "#app/composables/router";
export default defineNuxtPlugin((nuxtApp) => {
  if (!isPrerendered()) {
    return;
  }
  nuxtApp.hooks.hook("link:prefetch", (url) => {
    if (!parseURL(url).protocol) {
      return loadPayload(url);
    }
  });
  useRouter().beforeResolve(async (to, from) => {
    if (to.path === from.path) {
      return;
    }
    const payload = await loadPayload(to.path);
    if (!payload) {
      return;
    }
    Object.assign(nuxtApp.static.data, payload.data);
  });
});
