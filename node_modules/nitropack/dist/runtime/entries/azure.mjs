import "#internal/nitro/virtual/polyfill";
import { parseURL } from "ufo";
import { nitroApp } from "../app.mjs";
export async function handle(context, req) {
  let url;
  if (req.headers["x-ms-original-url"]) {
    const parsedURL = parseURL(req.headers["x-ms-original-url"]);
    url = parsedURL.pathname + parsedURL.search;
  } else {
    url = "/api/" + (req.params.url || "");
  }
  const { body, status, statusText, headers } = await nitroApp.localCall({
    url,
    headers: req.headers,
    method: req.method,
    // https://github.com/Azure/azure-functions-host/issues/293
    body: req.rawBody
  });
  context.res = {
    status,
    headers,
    body: body ? body.toString() : statusText
  };
}
