import { c as createFetch } from './shared/ofetch.502a4799.mjs';
export { F as FetchError, a as createFetchError } from './shared/ofetch.502a4799.mjs';
import 'destr';
import 'ufo';

const _globalThis = function() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw new Error("unable to locate global object");
}();
const fetch = _globalThis.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!")));
const Headers = _globalThis.Headers;
const ofetch = createFetch({ fetch, Headers });
const $fetch = ofetch;

export { $fetch, Headers, createFetch, fetch, ofetch };
