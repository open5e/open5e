import { joinURL, hasProtocol } from "ufo";
import { useNuxtApp, useRuntimeConfig } from "../nuxt.mjs";
import { useHead } from "./head.mjs";
export function loadPayload(url, opts = {}) {
  if (process.server) {
    return null;
  }
  const payloadURL = _getPayloadURL(url, opts);
  const nuxtApp = useNuxtApp();
  const cache = nuxtApp._payloadCache = nuxtApp._payloadCache || {};
  if (cache[url]) {
    return cache[url];
  }
  cache[url] = _importPayload(payloadURL).then((payload) => {
    if (!payload) {
      delete cache[url];
      return null;
    }
    return payload;
  });
  return cache[url];
}
export function preloadPayload(url, opts = {}) {
  const payloadURL = _getPayloadURL(url, opts);
  useHead({
    link: [
      { rel: "modulepreload", href: payloadURL }
    ]
  });
}
function _getPayloadURL(url, opts = {}) {
  const u = new URL(url, "http://localhost");
  if (u.search) {
    throw new Error("Payload URL cannot contain search params: " + url);
  }
  if (u.host !== "localhost" || hasProtocol(u.pathname, true)) {
    throw new Error("Payload URL must not include hostname: " + url);
  }
  const hash = opts.hash || (opts.fresh ? Date.now() : "");
  return joinURL(useRuntimeConfig().app.baseURL, u.pathname, hash ? `_payload.${hash}.js` : "_payload.js");
}
async function _importPayload(payloadURL) {
  if (process.server) {
    return null;
  }
  const res = await import(
    /* webpackIgnore: true */
    /* @vite-ignore */
    payloadURL
  ).catch((err) => {
    console.warn("[nuxt] Cannot load payload ", payloadURL, err);
  });
  return res?.default || null;
}
export function isPrerendered() {
  const nuxtApp = useNuxtApp();
  return !!nuxtApp.payload.prerenderedAt;
}
