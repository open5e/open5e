import "#internal/nitro/virtual/polyfill";
import { nitroApp } from "../app.mjs";
export const handler = async function(event, context) {
  const method = event.method || "get";
  const r = await nitroApp.localCall({
    event,
    url: event.url,
    context,
    headers: event.headers,
    method,
    query: event.query,
    body: event.body
  });
  return {
    statusCode: r.status,
    headers: normalizeOutgoingHeaders(r.headers),
    body: r.body.toString()
  };
};
function normalizeOutgoingHeaders(headers) {
  return Object.fromEntries(
    Object.entries(headers).map(([k, v]) => [
      k,
      Array.isArray(v) ? v.join(",") : v
    ])
  );
}
