import { getCurrentInstance, inject, onUnmounted } from "vue";
import { sendRedirect } from "h3";
import { hasProtocol, joinURL, parseURL } from "ufo";
import { useNuxtApp, useRuntimeConfig } from "../nuxt.mjs";
import { createError } from "./error.mjs";
import { useState } from "./state.mjs";
import { setResponseStatus } from "./ssr.mjs";
export const useRouter = () => {
  return useNuxtApp()?.$router;
};
export const useRoute = () => {
  if (getCurrentInstance()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
export const onBeforeRouteLeave = (guard) => {
  const unsubscribe = useRouter().beforeEach((to, from, next) => {
    if (to === from) {
      return;
    }
    return guard(to, from, next);
  });
  onUnmounted(unsubscribe);
};
export const onBeforeRouteUpdate = (guard) => {
  const unsubscribe = useRouter().beforeEach(guard);
  onUnmounted(unsubscribe);
};
export const defineNuxtRouteMiddleware = (middleware) => middleware;
export const addRouteMiddleware = (name, middleware, options = {}) => {
  const nuxtApp = useNuxtApp();
  if (options.global || typeof name === "function") {
    nuxtApp._middleware.global.push(typeof name === "function" ? name : middleware);
  } else {
    nuxtApp._middleware.named[name] = middleware;
  }
};
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
export const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = hasProtocol(toPath, true);
  if (isExternal && !options?.external) {
    throw new Error("Navigating to external URL is not allowed by default. Use `navigateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  if (process.client && !isExternal && isProcessingMiddleware()) {
    return to;
  }
  const router = useRouter();
  if (process.server) {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      if (isProcessingMiddleware() && !isExternal) {
        setResponseStatus(options?.redirectCode || 302);
        return to;
      }
      const redirectLocation = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, options?.redirectCode || 302));
    }
  }
  if (isExternal) {
    if (options?.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return options?.replace ? router.replace(to) : router.push(to);
};
export const abortNavigation = (err) => {
  if (process.dev && !isProcessingMiddleware()) {
    throw new Error("abortNavigation() is only usable inside a route middleware handler.");
  }
  if (err) {
    throw createError(err);
  }
  return false;
};
export const setPageLayout = (layout) => {
  if (process.server) {
    if (process.dev && getCurrentInstance() && useState("_layout").value !== layout) {
      console.warn("[warn] [nuxt] `setPageLayout` should not be called to change the layout on the server within a component as this will cause hydration errors.");
    }
    useState("_layout").value = layout;
  }
  const nuxtApp = useNuxtApp();
  if (process.dev && nuxtApp.isHydrating && useState("_layout").value !== layout) {
    console.warn("[warn] [nuxt] `setPageLayout` should not be called to change the layout during hydration as this will cause hydration errors.");
  }
  const inMiddleware = isProcessingMiddleware();
  if (inMiddleware || process.server || nuxtApp.isHydrating) {
    const unsubscribe = useRouter().beforeResolve((to) => {
      to.meta.layout = layout;
      unsubscribe();
    });
  }
  if (!inMiddleware) {
    useRoute().meta.layout = layout;
  }
};
