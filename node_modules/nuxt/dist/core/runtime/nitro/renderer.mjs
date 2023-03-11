import { createRenderer, renderResourceHeaders } from "vue-bundle-renderer/runtime";
import { appendHeader, getQuery, writeEarlyHints, readBody, createError } from "h3";
import devalue from "@nuxt/devalue";
import destr from "destr";
import { joinURL } from "ufo";
import { renderToString as _renderToString } from "vue/server-renderer";
import { useRuntimeConfig, defineRenderHandler, getRouteRules } from "#internal/nitro";
import { hash } from "ohash";
import { useNitroApp } from "#internal/nitro/app";
import { appRootId, appRootTag } from "#internal/nuxt.config.mjs";
import { buildAssetsURL, publicAssetsURL } from "#paths";
globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const getClientManifest = () => import("#build/dist/server/client.manifest.mjs").then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getStaticRenderedHead = () => import("#head-static").then((r) => r.default || r);
const getServerEntry = () => import("#build/dist/server/server.mjs").then((r) => r.default || r);
const getSSRStyles = lazyCachedFunction(() => import("#build/dist/server/styles.mjs").then((r) => r.default || r));
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString(input, context) {
    const html = await _renderToString(input, context);
    if (process.dev && process.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return `<${appRootTag} id="${appRootId}">${html}</${appRootTag}>`;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const options = {
    manifest,
    renderToString: () => `<${appRootTag} id="${appRootId}"></${appRootTag}>`,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig();
    ssrContext.payload = {
      serverRendered: false,
      config: {
        public: config.public,
        app: config.app
      },
      data: {},
      state: {}
    };
    ssrContext.renderMeta = ssrContext.renderMeta ?? getStaticRenderedHead;
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
async function getIslandContext(event) {
  const url = event.node.req.url?.substring("/__nuxt_island".length + 1) || "";
  const [componentName, hashId] = url.split("?")[0].split(":");
  const context = event.node.req.method === "GET" ? getQuery(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr(context.props) || {}
  };
  return ctx;
}
const PAYLOAD_CACHE = process.env.NUXT_PAYLOAD_EXTRACTION && process.env.prerender ? /* @__PURE__ */ new Map() : null;
const PAYLOAD_URL_RE = /\/_payload(\.[a-zA-Z0-9]+)?.js(\?.*)?$/;
const PRERENDER_NO_SSR_ROUTES = /* @__PURE__ */ new Set(["/index.html", "/200.html", "/404.html"]);
export default defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.node.req.url?.startsWith("/__nuxt_error") ? getQuery(event) : null;
  if (ssrError && ssrError.statusCode) {
    ssrError.statusCode = parseInt(ssrError.statusCode);
  }
  if (ssrError && event.node.req.socket.readyState !== "readOnly") {
    throw createError("Cannot directly render error page!");
  }
  const islandContext = process.env.NUXT_COMPONENT_ISLANDS && event.node.req.url?.startsWith("/__nuxt_island") ? await getIslandContext(event) : void 0;
  let url = ssrError?.url || islandContext?.url || event.node.req.url;
  const isRenderingPayload = PAYLOAD_URL_RE.test(url);
  if (isRenderingPayload) {
    url = url.substring(0, url.lastIndexOf("/")) || "/";
    event.node.req.url = url;
    if (process.env.prerender && PAYLOAD_CACHE.has(url)) {
      return PAYLOAD_CACHE.get(url);
    }
  }
  const routeOptions = getRouteRules(event);
  const ssrContext = {
    url,
    event,
    runtimeConfig: useRuntimeConfig(),
    noSSR: !!process.env.NUXT_NO_SSR || !!event.node.req.headers["x-nuxt-no-ssr"] || routeOptions.ssr === false || (process.env.prerender ? PRERENDER_NO_SSR_ROUTES.has(url) : false),
    error: !!ssrError,
    nuxt: void 0,
    /* NuxtApp */
    payload: ssrError ? { error: ssrError } : {},
    islandContext
  };
  const _PAYLOAD_EXTRACTION = process.env.prerender && process.env.NUXT_PAYLOAD_EXTRACTION && !ssrContext.noSSR;
  const payloadURL = _PAYLOAD_EXTRACTION ? joinURL(useRuntimeConfig().app.baseURL, url, "_payload.js") : void 0;
  if (process.env.prerender) {
    ssrContext.payload.prerenderedAt = Date.now();
  }
  const renderer = process.env.NUXT_NO_SSR || ssrContext.noSSR ? await getSPARenderer() : await getSSRRenderer();
  if (process.env.NUXT_EARLY_HINTS && !isRenderingPayload && !process.env.prerender) {
    const { link } = renderResourceHeaders({}, renderer.rendererContext);
    writeEarlyHints(event, link);
  }
  const _rendered = await renderer.renderToString(ssrContext).catch((error) => {
    throw !ssrError && ssrContext.payload?.error || error;
  });
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext });
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response2 = renderPayloadResponse(ssrContext);
    if (process.env.prerender) {
      PAYLOAD_CACHE.set(url, response2);
    }
    return response2;
  }
  if (_PAYLOAD_EXTRACTION) {
    appendHeader(event, "x-nitro-prerender", joinURL(url, "_payload.js"));
    PAYLOAD_CACHE.set(url, renderPayloadResponse(ssrContext));
  }
  const renderedMeta = await ssrContext.renderMeta?.() ?? {};
  const inlinedStyles = process.env.NUXT_INLINE_STYLES ? await renderInlineStyles(ssrContext.modules ?? ssrContext._registeredComponents ?? []) : "";
  const htmlContext = {
    island: Boolean(islandContext),
    htmlAttrs: normalizeChunks([renderedMeta.htmlAttrs]),
    head: normalizeChunks([
      renderedMeta.headTags,
      _PAYLOAD_EXTRACTION ? `<link rel="modulepreload" href="${payloadURL}">` : null,
      _rendered.renderResourceHints(),
      _rendered.renderStyles(),
      inlinedStyles,
      ssrContext.styles
    ]),
    bodyAttrs: normalizeChunks([renderedMeta.bodyAttrs]),
    bodyPrepend: normalizeChunks([
      renderedMeta.bodyScriptsPrepend,
      ssrContext.teleports?.body
    ]),
    body: process.env.NUXT_COMPONENT_ISLANDS && islandContext ? [] : [_rendered.html],
    bodyAppend: normalizeChunks([
      process.env.NUXT_NO_SCRIPTS ? void 0 : _PAYLOAD_EXTRACTION ? `<script type="module">import p from "${payloadURL}";window.__NUXT__={...p,...(${devalue(splitPayload(ssrContext).initial)})}<\/script>` : `<script>window.__NUXT__=${devalue(ssrContext.payload)}<\/script>`,
      _rendered.renderScripts(),
      // Note: bodyScripts may contain tags other than <script>
      renderedMeta.bodyScripts
    ])
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  if (process.env.NUXT_COMPONENT_ISLANDS && islandContext) {
    const _tags = htmlContext.head.flatMap((head2) => extractHTMLTags(head2));
    const head = {
      link: _tags.filter((tag) => tag.tagName === "link" && tag.attrs.rel === "stylesheet" && tag.attrs.href.includes("scoped") && !tag.attrs.href.includes("pages/")).map((tag) => ({
        key: "island-link-" + hash(tag.attrs.href),
        ...tag.attrs
      })),
      style: _tags.filter((tag) => tag.tagName === "style" && tag.innerHTML).map((tag) => ({
        key: "island-style-" + hash(tag.innerHTML),
        innerHTML: tag.innerHTML
      }))
    };
    const islandResponse = {
      id: islandContext.id,
      head,
      html: ssrContext.teleports["nuxt-island"].replace(/<!--.*-->/g, ""),
      state: ssrContext.payload.state
    };
    await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
    const response2 = {
      body: JSON.stringify(islandResponse, null, 2),
      statusCode: event.node.res.statusCode,
      statusMessage: event.node.res.statusMessage,
      headers: {
        "content-type": "application/json;charset=utf-8",
        "x-powered-by": "Nuxt"
      }
    };
    return response2;
  }
  const response = {
    body: renderHTMLDocument(htmlContext),
    statusCode: event.node.res.statusCode,
    statusMessage: event.node.res.statusMessage,
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
  return response;
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  return chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html>
<html ${joinAttrs(html.htmlAttrs)}>
<head>${joinTags(html.head)}</head>
<body ${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body>
</html>`;
}
const HTML_TAG_RE = /<(?<tag>[a-z]+)(?<rawAttrs> [^>]*)?>(?:(?<innerHTML>[\s\S]*?)<\/\k<tag>)?/g;
const HTML_TAG_ATTR_RE = /(?<name>[a-z]+)="(?<value>[^"]*)"/g;
function extractHTMLTags(html) {
  const tags = [];
  for (const tagMatch of html.matchAll(HTML_TAG_RE)) {
    const attrs = {};
    for (const attrMatch of tagMatch.groups.rawAttrs?.matchAll(HTML_TAG_ATTR_RE) || []) {
      attrs[attrMatch.groups.name] = attrMatch.groups.value;
    }
    const innerHTML = tagMatch.groups.innerHTML || "";
    tags.push({ tagName: tagMatch.groups.tag, attrs, innerHTML });
  }
  return tags;
}
async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(`<style>${style}</style>`);
      }
    }
  }
  return Array.from(inlinedStyles).join("");
}
function renderPayloadResponse(ssrContext) {
  return {
    body: `export default ${devalue(splitPayload(ssrContext).payload)}`,
    statusCode: ssrContext.event.node.res.statusCode,
    statusMessage: ssrContext.event.node.res.statusMessage,
    headers: {
      "content-type": "text/javascript;charset=UTF-8",
      "x-powered-by": "Nuxt"
    }
  };
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}
