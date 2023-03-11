import { computed, isReadonly, reactive, shallowRef } from "vue";
import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
  createWebHashHistory
} from "vue-router";
import { createError } from "h3";
import { withoutBase, isEqual } from "ufo";
import { callWithNuxt, defineNuxtPlugin, useRuntimeConfig } from "#app/nuxt";
import { showError, clearError, useError } from "#app/composables/error";
import { useRequestEvent } from "#app/composables/ssr";
import { useState } from "#app/composables/state";
import { navigateTo } from "#app/composables/router";
import _routes from "#build/routes";
import routerOptions from "#build/router.options";
import { globalMiddleware, namedMiddleware } from "#build/middleware";
function createCurrentLocation(base, location) {
  const { pathname, search, hash } = location;
  const hashPos = base.indexOf("#");
  if (hashPos > -1) {
    const slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/") {
      pathFromHash = "/" + pathFromHash;
    }
    return withoutBase(pathFromHash, "");
  }
  const path = withoutBase(pathname, base);
  return path + search + hash;
}
export default defineNuxtPlugin(async (nuxtApp) => {
  let routerBase = useRuntimeConfig().app.baseURL;
  if (routerOptions.hashMode && !routerBase.includes("#")) {
    routerBase += "#";
  }
  const history = routerOptions.history?.(routerBase) ?? (process.client ? routerOptions.hashMode ? createWebHashHistory(routerBase) : createWebHistory(routerBase) : createMemoryHistory(routerBase));
  const routes = routerOptions.routes?.(_routes) ?? _routes;
  const initialURL = process.server ? nuxtApp.ssrContext.url : createCurrentLocation(routerBase, window.location);
  const router = createRouter({
    ...routerOptions,
    history,
    routes
  });
  nuxtApp.vueApp.use(router);
  const previousRoute = shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const _route = shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _route.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    if (to.matched[0]?.components?.default === from.matched[0]?.components?.default) {
      syncCurrentRoute();
    }
  });
  const route = {};
  for (const key in _route.value) {
    route[key] = computed(() => _route.value[key]);
  }
  nuxtApp._route = reactive(route);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  const error = useError();
  try {
    if (process.server) {
      await router.push(initialURL);
    }
    await router.isReady();
  } catch (error2) {
    await callWithNuxt(nuxtApp, showError, [error2]);
  }
  const initialLayout = useState("_layout");
  router.beforeEach(async (to, from) => {
    to.meta = reactive(to.meta);
    if (nuxtApp.isHydrating && initialLayout.value && !isReadonly(to.meta.layout)) {
      to.meta.layout = initialLayout.value;
    }
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry of componentMiddleware) {
          middlewareEntries.add(entry);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry of middlewareEntries) {
      const middleware = typeof entry === "string" ? nuxtApp._middleware.named[entry] || await namedMiddleware[entry]?.().then((r) => r.default || r) : entry;
      if (!middleware) {
        if (process.dev) {
          throw new Error(`Unknown route middleware: '${entry}'. Valid middleware: ${Object.keys(namedMiddleware).map((mw) => `'${mw}'`).join(", ")}.`);
        }
        throw new Error(`Unknown route middleware: '${entry}'.`);
      }
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      if (process.server || !nuxtApp.payload.serverRendered && nuxtApp.isHydrating) {
        if (result === false || result instanceof Error) {
          const error2 = result || createError({
            statusCode: 404,
            statusMessage: `Page Not Found: ${initialURL}`
          });
          await callWithNuxt(nuxtApp, showError, [error2]);
          return false;
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    if (process.client && !nuxtApp.isHydrating && error.value) {
      await callWithNuxt(nuxtApp, clearError);
    }
    if (to.matched.length === 0) {
      await callWithNuxt(nuxtApp, showError, [createError({
        statusCode: 404,
        fatal: false,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else if (process.server) {
      const currentURL = to.fullPath || "/";
      if (!isEqual(currentURL, initialURL, { trailingSlash: true })) {
        const event = await callWithNuxt(nuxtApp, useRequestEvent);
        const options = { redirectCode: event.node.res.statusCode !== 200 ? event.node.res.statusCode || 302 : 302 };
        await callWithNuxt(nuxtApp, navigateTo, [currentURL, options]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace({
        ...router.resolve(initialURL),
        name: void 0,
        // #4920, #$4982
        force: true
      });
    } catch (error2) {
      await callWithNuxt(nuxtApp, showError, [error2]);
    }
  });
  return { provide: { router } };
});
