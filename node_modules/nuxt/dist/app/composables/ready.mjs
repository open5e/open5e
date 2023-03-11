import { useNuxtApp } from "../nuxt.mjs";
import { requestIdleCallback } from "../compat/idle-callback.mjs";
export const onNuxtReady = (callback) => {
  if (process.server) {
    return;
  }
  const nuxtApp = useNuxtApp();
  if (nuxtApp.isHydrating) {
    nuxtApp.hooks.hookOnce("app:suspense:resolve", () => {
      requestIdleCallback(callback);
    });
  } else {
    requestIdleCallback(callback);
  }
};
