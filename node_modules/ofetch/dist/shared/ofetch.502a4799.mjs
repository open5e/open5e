import destr from 'destr';
import { withBase, withQuery } from 'ufo';

class FetchError extends Error {
  constructor() {
    super(...arguments);
    this.name = "FetchError";
  }
}
function createFetchError(request, error, response) {
  let message = "";
  if (error) {
    message = error.message;
  }
  if (request && response) {
    message = `${message} (${response.status} ${response.statusText} (${request.toString()}))`;
  } else if (request) {
    message = `${message} (${request.toString()})`;
  }
  const fetchError = new FetchError(message);
  Object.defineProperty(fetchError, "request", {
    get() {
      return request;
    }
  });
  Object.defineProperty(fetchError, "response", {
    get() {
      return response;
    }
  });
  Object.defineProperty(fetchError, "data", {
    get() {
      return response && response._data;
    }
  });
  Object.defineProperty(fetchError, "status", {
    get() {
      return response && response.status;
    }
  });
  Object.defineProperty(fetchError, "statusText", {
    get() {
      return response && response.statusText;
    }
  });
  Object.defineProperty(fetchError, "statusCode", {
    get() {
      return response && response.status;
    }
  });
  Object.defineProperty(fetchError, "statusMessage", {
    get() {
      return response && response.statusText;
    }
  });
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  //  Gateway Timeout
]);
function createFetch(globalOptions) {
  const { fetch, Headers } = globalOptions;
  function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && retryStatusCodes.has(responseCode)) {
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(
      context.request,
      context.error,
      context.response
    );
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: { ...globalOptions.defaults, ..._options },
      response: void 0,
      error: void 0
    };
    if (context.options.onRequest) {
      await context.options.onRequest(context);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query || context.options.params) {
        context.request = withQuery(context.request, {
          ...context.options.params,
          ...context.options.query
        });
      }
      if (context.options.body && isPayloadMethod(context.options.method) && isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers);
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      }
    }
    context.response = await fetch(
      context.request,
      context.options
    ).catch(async (error) => {
      context.error = error;
      if (context.options.onRequestError) {
        await context.options.onRequestError(context);
      }
      return onError(context);
    });
    const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
    if (responseType === "json") {
      const data = await context.response.text();
      const parseFunction = context.options.parseResponse || destr;
      context.response._data = parseFunction(data);
    } else if (responseType === "stream") {
      context.response._data = context.response.body;
    } else {
      context.response._data = await context.response[responseType]();
    }
    if (context.options.onResponse) {
      await context.options.onResponse(context);
    }
    if (context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await context.options.onResponseError(context);
      }
      return onError(context);
    }
    return context.response;
  };
  const $fetch = function $fetch2(request, options) {
    return $fetchRaw(request, options).then((r) => r._data);
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = fetch;
  $fetch.create = (defaultOptions = {}) => createFetch({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

export { FetchError as F, createFetchError as a, createFetch as c };
