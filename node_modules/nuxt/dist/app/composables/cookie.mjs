import { ref, watch } from "vue";
import { parse, serialize } from "cookie-es";
import { appendHeader } from "h3";
import destr from "destr";
import { isEqual } from "ohash";
import { useNuxtApp } from "../nuxt.mjs";
import { useRequestEvent } from "./ssr.mjs";
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
export function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  const cookie = ref(cookies[name] ?? opts.default?.());
  if (process.client) {
    const callback = () => {
      writeClientCookie(name, cookie.value, opts);
    };
    if (opts.watch) {
      watch(cookie, callback, { deep: opts.watch !== "shallow" });
    } else {
      callback();
    }
  } else if (process.server) {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (!isEqual(cookie.value, cookies[name])) {
        writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
      }
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:redirected", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  if (process.server) {
    return parse(useRequestEvent()?.req.headers.cookie || "", opts);
  } else if (process.client) {
    return parse(document.cookie, opts);
  }
}
function serializeCookie(name, value, opts = {}) {
  if (value === null || value === void 0) {
    return serialize(name, value, { ...opts, maxAge: -1 });
  }
  return serialize(name, value, opts);
}
function writeClientCookie(name, value, opts = {}) {
  if (process.client) {
    document.cookie = serializeCookie(name, value, opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    appendHeader(event, "Set-Cookie", serializeCookie(name, value, opts));
  }
}
