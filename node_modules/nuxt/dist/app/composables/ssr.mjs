import { useNuxtApp } from "../nuxt.mjs";
export function useRequestHeaders(include) {
  if (process.client) {
    return {};
  }
  const headers = useNuxtApp().ssrContext?.event.node.req.headers ?? {};
  if (!include) {
    return headers;
  }
  return Object.fromEntries(include.map((key) => key.toLowerCase()).filter((key) => headers[key]).map((key) => [key, headers[key]]));
}
export function useRequestEvent(nuxtApp = useNuxtApp()) {
  return nuxtApp.ssrContext?.event;
}
export function useRequestFetch() {
  if (process.client) {
    return globalThis.$fetch;
  }
  const event = useNuxtApp().ssrContext?.event;
  return event?.$fetch || globalThis.$fetch;
}
export function setResponseStatus(code, message) {
  const event = process.server && useRequestEvent();
  if (event) {
    event.node.res.statusCode = code;
    if (message) {
      event.node.res.statusMessage = message;
    }
  }
}
