import "#internal/nitro/virtual/polyfill";
import { serve } from "https://deno.land/std/http/server.ts";
import { requestHasBody, useRequestBody } from "../utils.mjs";
import { nitroApp } from "../app.mjs";
serve((request) => {
  return handleRequest(request);
});
async function handleRequest(request) {
  const url = new URL(request.url);
  let body;
  if (requestHasBody(request)) {
    body = await useRequestBody(request);
  }
  const r = await nitroApp.localCall({
    url: url.pathname + url.search,
    host: url.hostname,
    protocol: url.protocol,
    headers: Object.fromEntries(request.headers.entries()),
    method: request.method,
    redirect: request.redirect,
    body
  });
  return new Response(r.body || void 0, {
    // @ts-ignore TODO: Should be HeadersInit instead of string[][]
    headers: normalizeOutgoingHeaders(r.headers),
    status: r.status,
    statusText: r.statusText
  });
}
function normalizeOutgoingHeaders(headers) {
  return Object.entries(headers).map(([k, v]) => [
    k,
    Array.isArray(v) ? v.join(",") : v
  ]);
}
