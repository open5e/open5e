import "#internal/nitro/virtual/polyfill";
import { withQuery } from "ufo";
import { nitroApp } from "../app.mjs";
export async function handler(event, context) {
  const query = {
    ...event.queryStringParameters,
    ...event.multiValueQueryStringParameters
  };
  const url = withQuery(
    event.path || event.rawPath,
    query
  );
  const method = event.httpMethod || event.requestContext?.http?.method || "get";
  if ("cookies" in event && event.cookies) {
    event.headers.cookie = event.cookies.join(";");
  }
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
  if ("cookies" in event || "rawPath" in event) {
    const outgoingCookies = r.headers["set-cookie"];
    const cookies = Array.isArray(outgoingCookies) ? outgoingCookies : outgoingCookies?.split(",") || [];
    return {
      cookies,
      statusCode: r.status,
      headers: normalizeOutgoingHeaders(r.headers, true),
      body: r.body.toString()
    };
  }
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
function normalizeOutgoingHeaders(headers, stripCookies = false) {
  const entries = stripCookies ? Object.entries(headers).filter(([key]) => !["set-cookie"].includes(key)) : Object.entries(headers);
  return Object.fromEntries(
    entries.map(([k, v]) => [k, Array.isArray(v) ? v.join(",") : v])
  );
}
