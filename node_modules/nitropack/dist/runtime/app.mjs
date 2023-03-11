import {
  createApp,
  createRouter,
  eventHandler,
  lazyEventHandler,
  toNodeListener,
  fetchWithEvent
} from "h3";
import { createFetch, Headers } from "ofetch";
import destr from "destr";
import {
  createCall,
  createFetch as createLocalFetch
} from "unenv/runtime/fetch/index";
import { createHooks } from "hookable";
import { useRuntimeConfig } from "./config.mjs";
import { cachedEventHandler } from "./cache.mjs";
import { createRouteRulesHandler, getRouteRulesForPath } from "./route-rules.mjs";
import { plugins } from "#internal/nitro/virtual/plugins";
import errorHandler from "#internal/nitro/virtual/error-handler";
import { handlers } from "#internal/nitro/virtual/server-handlers";
function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(process.env.DEBUG),
    onError: errorHandler
  });
  const router = createRouter();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createLocalFetch(localCall, globalThis.fetch);
  const $fetch = createFetch({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: $fetch });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
export const nitroApp = createNitroApp();
export const useNitroApp = () => nitroApp;
