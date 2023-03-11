import "#internal/nitro/virtual/polyfill";
import { withQuery } from "ufo";
import { nitroApp } from "../app.mjs";
export async function lambda(event, context) {
  const query = {
    ...event.queryStringParameters,
    ...event.multiValueQueryStringParameters
  };
  const url = withQuery(event.path, query);
  const method = event.httpMethod || "get";
  const r = await nitroApp.localCall({
    event,
    url,
    context,
    headers: normalizeIncomingHeaders(event.headers),
    method,
    query,
    body: event.body
    // TODO: handle event.isBase64Encoded
  });
  return {
    statusCode: r.status,
    headers: normalizeOutgoingHeaders(r.headers),
    body: r.body.toString()
  };
}
function normalizeIncomingHeaders(headers) {
  return Object.fromEntries(
    Object.entries(headers || {}).map(([key, value]) => [
      key.toLowerCase(),
      value
    ])
  );
}
function normalizeOutgoingHeaders(headers) {
  return Object.fromEntries(
    Object.entries(headers).map(([k, v]) => [
      k,
      Array.isArray(v) ? v.join(",") : v
    ])
  );
}
