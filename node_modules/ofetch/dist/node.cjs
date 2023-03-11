'use strict';

const http = require('node:http');
const https = require('node:https');
const nodeFetch = require('node-fetch-native');
const fetch$1 = require('./shared/ofetch.f223b849.cjs');
require('destr');
require('ufo');

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return nodeFetch;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return nodeFetch(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch || createNodeFetch();
const Headers = globalThis.Headers || nodeFetch.Headers;
const ofetch = fetch$1.createFetch({ fetch, Headers });
const $fetch = ofetch;

exports.FetchError = fetch$1.FetchError;
exports.createFetch = fetch$1.createFetch;
exports.createFetchError = fetch$1.createFetchError;
exports.$fetch = $fetch;
exports.Headers = Headers;
exports.createNodeFetch = createNodeFetch;
exports.fetch = fetch;
exports.ofetch = ofetch;
