import * as vite from 'vite';
import { resolve, dirname, normalize, join, relative, isAbsolute } from 'pathe';
import { useNuxt, logger, resolvePath, resolveModule, requireModule, isIgnored, addVitePlugin } from '@nuxt/kit';
import replace from '@rollup/plugin-replace';
import { resolve as resolve$1, findStaticImports, parseStaticImport, sanitizeFilePath } from 'mlly';
import { joinURL, parseURL, parseQuery, withoutLeadingSlash, withTrailingSlash } from 'ufo';
import { filename } from 'pathe/utils';
import { resolveTSConfig } from 'pkg-types';
import vuePlugin from '@vitejs/plugin-vue';
import viteJsxPlugin from '@vitejs/plugin-vue-jsx';
import { getPort } from 'get-port-please';
import { defu } from 'defu';
import { toNodeListener, createApp, defineEventHandler, defineLazyEventHandler, eventHandler, createError } from 'h3';
import MagicString from 'magic-string';
import 'node:fs';
import { hash } from 'ohash';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { createUnplugin } from 'unplugin';
import { stripLiteral } from 'strip-literal';
import { ViteNodeServer } from 'vite-node/server';
import fse from 'fs-extra';
import { normalizeViteManifest } from 'vue-bundle-renderer';
import { ExternalsDefaults, isExternal } from 'externality';
import escapeRegExp from 'escape-string-regexp';
import { genObjectFromRawEntries } from 'knitwork';
import { walk } from 'estree-walker';

function cacheDirPlugin(rootDir, name) {
  const optimizeCacheDir = resolve(rootDir, "node_modules/.cache/vite", name);
  return {
    name: "nuxt:cache-dir",
    configResolved(resolvedConfig) {
      resolvedConfig.optimizeCacheDir = optimizeCacheDir;
    }
  };
}

function chunkErrorPlugin(options) {
  return {
    name: "nuxt:chunk-error",
    transform(code, id) {
      if (id !== "\0vite/preload-helper" || code.includes("nuxt.preloadError")) {
        return;
      }
      const s = new MagicString(code);
      s.replace(/__vitePreload/g, "___vitePreload");
      s.append(`
export const __vitePreload = (...args) => ___vitePreload(...args).catch(err => {
  const e = new Event("nuxt.preloadError");
  e.payload = err;
  window.dispatchEvent(e);
  throw err;
})`);
      return {
        code: s.toString(),
        map: options.sourcemap ? s.generateMap({ source: id, includeContent: true }) : void 0
      };
    }
  };
}

function uniq(arr) {
  return Array.from(new Set(arr));
}
const IS_CSS_RE = /\.(?:css|scss|sass|postcss|less|stylus|styl)(\?[^.]+)?$/;
function isCSS(file) {
  return IS_CSS_RE.test(file);
}
function hashId(id) {
  return "$id_" + hash(id);
}

function devStyleSSRPlugin(options) {
  return {
    name: "nuxt:dev-style-ssr",
    apply: "serve",
    enforce: "post",
    transform(code, id) {
      if (!isCSS(id) || !code.includes("import.meta.hot")) {
        return;
      }
      let moduleId = id;
      if (moduleId.startsWith(options.srcDir)) {
        moduleId = moduleId.slice(options.srcDir.length);
      }
      const selector = joinURL(options.buildAssetsURL, moduleId);
      return code + `
document.querySelectorAll(\`link[href="${selector}"]\`).forEach(i=>i.remove())`;
    }
  };
}

const VITE_ASSET_RE = /__VITE_ASSET__|__VITE_PUBLIC_ASSET__/;
const CSS_RE = /\.(css|less|sass|scss|styl|stylus|pcss|postcss|sss)$/;
function runtimePathsPlugin(options) {
  return {
    name: "nuxt:runtime-paths-dep",
    enforce: "post",
    transform(code, id) {
      const { pathname, search } = parseURL(decodeURIComponent(pathToFileURL(id).href));
      if (CSS_RE.test(pathname)) {
        return;
      }
      if (pathname.endsWith(".vue")) {
        if (search && parseQuery(search).type === "style") {
          return;
        }
      }
      if (VITE_ASSET_RE.test(code)) {
        const s = new MagicString(code);
        s.prepend('import "#build/paths.mjs";');
        return {
          code: s.toString(),
          map: options.sourcemap ? s.generateMap({ source: id, includeContent: true }) : void 0
        };
      }
    }
  };
}

const pureAnnotationsPlugin = createUnplugin((options) => {
  const FUNCTION_RE = new RegExp(`(?<!\\/\\* #__PURE__ \\*\\/ )\\b(${options.functions.join("|")})\\s*\\(`, "g");
  const FUNCTION_RE_SINGLE = new RegExp(`(?<!\\/\\* #__PURE__ \\*\\/ )\\b(${options.functions.join("|")})\\s*\\(`);
  return {
    name: "nuxt:pure-annotations",
    enforce: "post",
    transformInclude(id) {
      const { pathname, search } = parseURL(decodeURIComponent(pathToFileURL(id).href));
      const { type } = parseQuery(search);
      if (pathname.endsWith(".vue") && (type === "script" || !search)) {
        return true;
      }
      if (pathname.match(/\.((c|m)?j|t)sx?$/g)) {
        return true;
      }
    },
    transform(code, id) {
      if (!FUNCTION_RE_SINGLE.test(code)) {
        return;
      }
      const s = new MagicString(code);
      const strippedCode = stripLiteral(code);
      for (const match of strippedCode.matchAll(FUNCTION_RE)) {
        s.overwrite(match.index, match.index + match[0].length, "/* #__PURE__ */ " + match[0]);
      }
      if (s.hasChanged()) {
        return {
          code: s.toString(),
          map: options.sourcemap ? s.generateMap({ source: id, includeContent: true }) : void 0
        };
      }
    }
  };
});

let _distDir = dirname(fileURLToPath(import.meta.url));
if (_distDir.match(/(chunks|shared)$/)) {
  _distDir = dirname(_distDir);
}
const distDir = _distDir;
resolve(distDir, "..");

function createIsExternal(viteServer, rootDir) {
  const externalOpts = {
    inline: [
      /virtual:/,
      /\.ts$/,
      ...ExternalsDefaults.inline || [],
      ...Array.isArray(viteServer.config.ssr.noExternal) ? viteServer.config.ssr.noExternal : []
    ],
    external: [
      ...viteServer.config.ssr.external || [],
      /node_modules/
    ],
    resolve: {
      type: "module",
      extensions: [".ts", ".js", ".json", ".vue", ".mjs", ".jsx", ".tsx", ".wasm"]
    }
  };
  return (id) => isExternal(id, rootDir, externalOpts);
}

function transpile(envs) {
  const nuxt = useNuxt();
  const transpile2 = [];
  for (let pattern of nuxt.options.build.transpile) {
    if (typeof pattern === "function") {
      const result = pattern(envs);
      if (result) {
        pattern = result;
      }
    }
    if (typeof pattern === "string") {
      transpile2.push(new RegExp(escapeRegExp(normalize(pattern))));
    } else if (pattern instanceof RegExp) {
      transpile2.push(pattern);
    }
  }
  return transpile2;
}

function viteNodePlugin(ctx) {
  const invalidates = /* @__PURE__ */ new Set();
  function markInvalidate(mod) {
    if (!mod.id) {
      return;
    }
    if (invalidates.has(mod.id)) {
      return;
    }
    invalidates.add(mod.id);
    markInvalidates(mod.importers);
  }
  function markInvalidates(mods) {
    if (!mods) {
      return;
    }
    for (const mod of mods) {
      markInvalidate(mod);
    }
  }
  return {
    name: "nuxt:vite-node-server",
    enforce: "post",
    configureServer(server) {
      function invalidateVirtualModules() {
        for (const [id, mod] of server.moduleGraph.idToModuleMap) {
          if (id.startsWith("virtual:")) {
            markInvalidate(mod);
          }
        }
        for (const plugin of ctx.nuxt.options.plugins) {
          markInvalidates(server.moduleGraph.getModulesByFile(typeof plugin === "string" ? plugin : plugin.src));
        }
        for (const template of ctx.nuxt.options.build.templates) {
          markInvalidates(server.moduleGraph.getModulesByFile(template?.src));
        }
      }
      server.middlewares.use("/__nuxt_vite_node__", toNodeListener(createViteNodeApp(ctx, invalidates)));
      ctx.nuxt.hook("app:templatesGenerated", () => {
        invalidateVirtualModules();
      });
      server.watcher.on("all", (event, file) => {
        markInvalidates(server.moduleGraph.getModulesByFile(normalize(file)));
        if (event === "add" || event === "unlink") {
          invalidateVirtualModules();
        }
      });
    }
  };
}
function getManifest(ctx) {
  const css = Array.from(ctx.ssrServer.moduleGraph.urlToModuleMap.keys()).filter((i) => isCSS(i));
  const manifest = normalizeViteManifest({
    "@vite/client": {
      file: "@vite/client",
      css,
      module: true,
      isEntry: true
    },
    [ctx.entry]: {
      file: ctx.entry,
      isEntry: true,
      module: true,
      resourceType: "script"
    }
  });
  return manifest;
}
function createViteNodeApp(ctx, invalidates = /* @__PURE__ */ new Set()) {
  const app = createApp();
  app.use("/manifest", defineEventHandler(() => {
    const manifest = getManifest(ctx);
    return manifest;
  }));
  app.use("/invalidates", defineEventHandler(() => {
    const ids = Array.from(invalidates);
    invalidates.clear();
    return ids;
  }));
  app.use("/module", defineLazyEventHandler(() => {
    const viteServer = ctx.ssrServer;
    const node = new ViteNodeServer(viteServer, {
      deps: {
        inline: [
          /\/(nuxt|nuxt3)\//,
          /^#/,
          ...transpile({ isServer: true, isDev: ctx.nuxt.options.dev })
        ]
      },
      transformMode: {
        ssr: [/.*/],
        web: []
      }
    });
    const isExternal = createIsExternal(viteServer, ctx.nuxt.options.rootDir);
    node.shouldExternalize = async (id) => {
      const result = await isExternal(id);
      if (result?.external) {
        return resolve$1(result.id, { url: ctx.nuxt.options.modulesDir });
      }
      return false;
    };
    return eventHandler(async (event) => {
      const moduleId = decodeURI(event.node.req.url).substring(1);
      if (moduleId === "/") {
        throw createError({ statusCode: 400 });
      }
      const module = await node.fetchModule(moduleId).catch((err) => {
        const errorData = {
          code: "VITE_ERROR",
          id: moduleId,
          stack: "",
          ...err
        };
        throw createError({ data: errorData });
      });
      return module;
    });
  }));
  return app;
}
async function initViteNodeServer(ctx) {
  const viteNodeServerOptions = {
    baseURL: `${ctx.nuxt.options.devServer.url}__nuxt_vite_node__`,
    root: ctx.nuxt.options.srcDir,
    entryPath: ctx.entry,
    base: ctx.ssrServer.config.base || "/_nuxt/"
  };
  process.env.NUXT_VITE_NODE_OPTIONS = JSON.stringify(viteNodeServerOptions);
  const serverResolvedPath = resolve(distDir, "runtime/vite-node.mjs");
  const manifestResolvedPath = resolve(distDir, "runtime/client.manifest.mjs");
  await fse.writeFile(
    resolve(ctx.nuxt.options.buildDir, "dist/server/server.mjs"),
    `export { default } from ${JSON.stringify(pathToFileURL(serverResolvedPath).href)}`
  );
  await fse.writeFile(
    resolve(ctx.nuxt.options.buildDir, "dist/server/client.manifest.mjs"),
    `export { default } from ${JSON.stringify(pathToFileURL(manifestResolvedPath).href)}`
  );
}

async function buildClient(ctx) {
  const clientConfig = vite.mergeConfig(ctx.config, {
    entry: ctx.entry,
    base: ctx.nuxt.options.dev ? joinURL(ctx.nuxt.options.app.baseURL.replace(/^\.\//, "/") || "/", ctx.nuxt.options.app.buildAssetsDir) : "./",
    experimental: {
      renderBuiltUrl: (filename, { type, hostType }) => {
        if (hostType !== "js" || type === "asset") {
          return { relative: true };
        }
        return { runtime: `globalThis.__publicAssetsURL(${JSON.stringify(filename)})` };
      }
    },
    css: {
      devSourcemap: ctx.nuxt.options.sourcemap.client
    },
    define: {
      "process.server": false,
      "process.client": true,
      "module.hot": false
    },
    optimizeDeps: {
      entries: [ctx.entry]
    },
    resolve: {
      alias: {
        "#build/plugins": resolve(ctx.nuxt.options.buildDir, "plugins/client"),
        "#internal/nitro": resolve(ctx.nuxt.options.buildDir, "nitro.client.mjs")
      },
      dedupe: ["vue"]
    },
    build: {
      sourcemap: ctx.nuxt.options.sourcemap.client ? ctx.config.build?.sourcemap ?? true : false,
      manifest: true,
      outDir: resolve(ctx.nuxt.options.buildDir, "dist/client"),
      rollupOptions: {
        input: ctx.entry
      }
    },
    plugins: [
      cacheDirPlugin(ctx.nuxt.options.rootDir, "client"),
      vuePlugin(ctx.config.vue),
      viteJsxPlugin(ctx.config.vueJsx),
      devStyleSSRPlugin({
        srcDir: ctx.nuxt.options.srcDir,
        buildAssetsURL: joinURL(ctx.nuxt.options.app.baseURL, ctx.nuxt.options.app.buildAssetsDir)
      }),
      runtimePathsPlugin({
        sourcemap: ctx.nuxt.options.sourcemap.client
      }),
      viteNodePlugin(ctx),
      pureAnnotationsPlugin.vite({
        sourcemap: ctx.nuxt.options.sourcemap.client,
        functions: ["defineComponent", "defineAsyncComponent", "defineNuxtLink", "createClientOnly"]
      })
    ],
    appType: "custom",
    server: {
      middlewareMode: true
    }
  });
  if (!ctx.nuxt.options.dev) {
    clientConfig.server.hmr = false;
  }
  if (ctx.nuxt.options.experimental.emitRouteChunkError) {
    clientConfig.plugins.push(chunkErrorPlugin({ sourcemap: ctx.nuxt.options.sourcemap.client }));
  }
  clientConfig.build.rollupOptions = defu(clientConfig.build.rollupOptions, {
    output: {
      chunkFileNames: ctx.nuxt.options.dev ? void 0 : withoutLeadingSlash(join(ctx.nuxt.options.app.buildAssetsDir, "[name].[hash].js")),
      entryFileNames: ctx.nuxt.options.dev ? "entry.js" : withoutLeadingSlash(join(ctx.nuxt.options.app.buildAssetsDir, "[name].[hash].js"))
    }
  });
  if (clientConfig.server && clientConfig.server.hmr !== false) {
    const hmrPortDefault = 24678;
    const hmrPort = await getPort({
      port: hmrPortDefault,
      ports: Array.from({ length: 20 }, (_, i) => hmrPortDefault + 1 + i)
    });
    clientConfig.server = defu(clientConfig.server, {
      https: ctx.nuxt.options.devServer.https,
      hmr: {
        protocol: ctx.nuxt.options.devServer.https ? "wss" : "ws",
        port: hmrPort
      }
    });
  }
  if (ctx.nuxt.options.build.analyze) {
    clientConfig.plugins.push(...await import('../chunks/analyze.mjs').then((r) => r.analyzePlugin(ctx)));
  }
  await ctx.nuxt.callHook("vite:extendConfig", clientConfig, { isClient: true, isServer: false });
  if (ctx.nuxt.options.dev) {
    const viteServer = await vite.createServer(clientConfig);
    ctx.clientServer = viteServer;
    await ctx.nuxt.callHook("vite:serverCreated", viteServer, { isClient: true, isServer: false });
    const transformHandler = viteServer.middlewares.stack.findIndex((m) => m.handle instanceof Function && m.handle.name === "viteTransformMiddleware");
    viteServer.middlewares.stack.splice(transformHandler, 0, {
      route: "",
      handle: (req, res, next) => {
        if (req._skip_transform) {
          req.url = joinURL("/__skip_vite", req.url);
        }
        next();
      }
    });
    const viteMiddleware = defineEventHandler(async (event) => {
      const originalURL = event.node.req.url;
      const viteRoutes = viteServer.middlewares.stack.map((m) => m.route).filter((r) => r.length > 1);
      if (!originalURL.startsWith(clientConfig.base) && !viteRoutes.some((route) => originalURL.startsWith(route))) {
        event.node.req._skip_transform = true;
      }
      await new Promise((resolve2, reject) => {
        viteServer.middlewares.handle(event.node.req, event.node.res, (err) => {
          event.node.req.url = originalURL;
          return err ? reject(err) : resolve2(null);
        });
      });
    });
    await ctx.nuxt.callHook("server:devHandler", viteMiddleware);
    ctx.nuxt.hook("close", async () => {
      await viteServer.close();
    });
  } else {
    logger.info("Building client...");
    const start = Date.now();
    logger.restoreAll();
    await vite.build(clientConfig);
    logger.wrapAll();
    await ctx.nuxt.callHook("vite:compiled");
    logger.success(`Client built in ${Date.now() - start}ms`);
  }
}

function ssrStylesPlugin(options) {
  const cssMap = {};
  const idRefMap = {};
  const relativeToSrcDir = (path) => relative(options.srcDir, path);
  const warnCache = /* @__PURE__ */ new Set();
  return {
    name: "ssr-styles",
    resolveId: {
      order: "pre",
      async handler(id, importer, options2) {
        if (!id.endsWith(".vue")) {
          return;
        }
        const res = await this.resolve(id, importer, { ...options2, skipSelf: true });
        if (res) {
          return {
            ...res,
            moduleSideEffects: false
          };
        }
      }
    },
    generateBundle(outputOptions) {
      const emitted = {};
      for (const file in cssMap) {
        const { files, inBundle } = cssMap[file];
        if (!files.length || !inBundle) {
          continue;
        }
        const base = typeof outputOptions.assetFileNames === "string" ? outputOptions.assetFileNames : outputOptions.assetFileNames({
          type: "asset",
          name: `${filename(file)}-styles.mjs`,
          source: ""
        });
        emitted[file] = this.emitFile({
          type: "asset",
          name: `${filename(file)}-styles.mjs`,
          source: [
            ...files.map((css, i) => `import style_${i} from './${relative(dirname(base), this.getFileName(css))}';`),
            `export default [${files.map((_, i) => `style_${i}`).join(", ")}]`
          ].join("\n")
        });
      }
      for (const key in emitted) {
        options.chunksWithInlinedCSS.add(key);
      }
      this.emitFile({
        type: "asset",
        fileName: "styles.mjs",
        source: [
          "const interopDefault = r => r.default || r || []",
          `export default ${genObjectFromRawEntries(
            Object.entries(emitted).map(([key, value]) => [key, `() => import('./${this.getFileName(value)}').then(interopDefault)`])
          )}`
        ].join("\n")
      });
    },
    renderChunk(_code, chunk) {
      if (!chunk.facadeModuleId) {
        return null;
      }
      const id = relativeToSrcDir(chunk.facadeModuleId);
      for (const file in chunk.modules) {
        const relativePath = relativeToSrcDir(file);
        if (relativePath in cssMap) {
          cssMap[relativePath].inBundle = cssMap[relativePath].inBundle ?? !!id;
        }
      }
      return null;
    },
    async transform(code, id) {
      const { pathname, search } = parseURL(decodeURIComponent(pathToFileURL(id).href));
      const query = parseQuery(search);
      if (!pathname.match(/\.(vue|((c|m)?j|t)sx?)$/g) || query.macro) {
        return;
      }
      if (options.shouldInline && !options.shouldInline(id)) {
        return;
      }
      const relativeId = relativeToSrcDir(id);
      cssMap[relativeId] = cssMap[relativeId] || { files: [] };
      let styleCtr = 0;
      for (const i of findStaticImports(code)) {
        const { type } = parseQuery(i.specifier);
        if (type !== "style" && !i.specifier.endsWith(".css")) {
          continue;
        }
        const resolved = await this.resolve(i.specifier, id);
        if (!resolved) {
          continue;
        }
        if (!await this.resolve(resolved.id + "?inline&used")) {
          if (!warnCache.has(resolved.id)) {
            warnCache.add(resolved.id);
            this.warn(`[nuxt] Cannot extract styles for \`${i.specifier}\`. Its styles will not be inlined when server-rendering.`);
          }
          continue;
        }
        const ref = this.emitFile({
          type: "chunk",
          name: `${filename(id)}-styles-${++styleCtr}.mjs`,
          id: resolved.id + "?inline&used"
        });
        idRefMap[relativeToSrcDir(resolved.id)] = ref;
        cssMap[relativeId].files.push(ref);
      }
    }
  };
}

async function writeManifest(ctx, css = []) {
  const clientDist = resolve(ctx.nuxt.options.buildDir, "dist/client");
  const serverDist = resolve(ctx.nuxt.options.buildDir, "dist/server");
  const devClientManifest = {
    "@vite/client": {
      isEntry: true,
      file: "@vite/client",
      css,
      module: true,
      resourceType: "script"
    },
    [ctx.entry]: {
      isEntry: true,
      file: ctx.entry,
      module: true,
      resourceType: "script"
    }
  };
  const clientManifest = ctx.nuxt.options.dev ? devClientManifest : await fse.readJSON(resolve(clientDist, "manifest.json"));
  const buildAssetsDir = withTrailingSlash(withoutLeadingSlash(ctx.nuxt.options.app.buildAssetsDir));
  const BASE_RE = new RegExp(`^${escapeRegExp(buildAssetsDir)}`);
  for (const key in clientManifest) {
    if (clientManifest[key].file) {
      clientManifest[key].file = clientManifest[key].file.replace(BASE_RE, "");
    }
    for (const item of ["css", "assets"]) {
      if (clientManifest[key][item]) {
        clientManifest[key][item] = clientManifest[key][item].map((i) => i.replace(BASE_RE, ""));
      }
    }
  }
  await fse.mkdirp(serverDist);
  const manifest = normalizeViteManifest(clientManifest);
  await ctx.nuxt.callHook("build:manifest", manifest);
  await fse.writeFile(resolve(serverDist, "client.manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
  await fse.writeFile(resolve(serverDist, "client.manifest.mjs"), "export default " + JSON.stringify(manifest, null, 2), "utf8");
  if (!ctx.nuxt.options.dev) {
    await fse.rm(resolve(clientDist, "manifest.json"), { force: true });
  }
}

async function buildServer(ctx) {
  const _resolve = (id) => resolveModule(id, { paths: ctx.nuxt.options.modulesDir });
  const helper = ctx.nuxt.options.nitro.imports !== false ? "" : "globalThis.";
  const entry = ctx.nuxt.options.ssr ? ctx.entry : await resolvePath(resolve(ctx.nuxt.options.appDir, "entry-spa"));
  const serverConfig = vite.mergeConfig(ctx.config, {
    entry,
    base: ctx.nuxt.options.dev ? joinURL(ctx.nuxt.options.app.baseURL.replace(/^\.\//, "/") || "/", ctx.nuxt.options.app.buildAssetsDir) : void 0,
    experimental: {
      renderBuiltUrl: (filename, { type, hostType }) => {
        if (hostType !== "js") {
          return { relative: true };
        }
        if (type === "public") {
          return { runtime: `${helper}__publicAssetsURL(${JSON.stringify(filename)})` };
        }
        if (type === "asset") {
          const relativeFilename = filename.replace(withTrailingSlash(withoutLeadingSlash(ctx.nuxt.options.app.buildAssetsDir)), "");
          return { runtime: `${helper}__buildAssetsURL(${JSON.stringify(relativeFilename)})` };
        }
      }
    },
    css: {
      devSourcemap: ctx.nuxt.options.sourcemap.server
    },
    define: {
      "process.server": true,
      "process.client": false,
      "typeof window": '"undefined"',
      "typeof document": '"undefined"',
      "typeof navigator": '"undefined"',
      "typeof location": '"undefined"',
      "typeof XMLHttpRequest": '"undefined"'
    },
    optimizeDeps: {
      entries: ctx.nuxt.options.ssr ? [ctx.entry] : []
    },
    resolve: {
      alias: {
        "#build/plugins": resolve(ctx.nuxt.options.buildDir, "plugins/server"),
        ...ctx.nuxt.options.experimental.externalVue || ctx.nuxt.options.dev ? {} : {
          "@vue/reactivity": _resolve(`@vue/reactivity/dist/reactivity.cjs${ctx.nuxt.options.dev ? "" : ".prod"}.js`),
          "@vue/shared": _resolve(`@vue/shared/dist/shared.cjs${ctx.nuxt.options.dev ? "" : ".prod"}.js`),
          "vue-router": _resolve(`vue-router/dist/vue-router.cjs${ctx.nuxt.options.dev ? "" : ".prod"}.js`),
          "vue/server-renderer": _resolve("vue/server-renderer"),
          "vue/compiler-sfc": _resolve("vue/compiler-sfc"),
          vue: _resolve(`vue/dist/vue.cjs${ctx.nuxt.options.dev ? "" : ".prod"}.js`)
        }
      }
    },
    ssr: {
      external: ctx.nuxt.options.experimental.externalVue ? ["#internal/nitro", "#internal/nitro/utils", "vue", "vue-router"] : ["#internal/nitro", "#internal/nitro/utils"],
      noExternal: [
        ...transpile({ isServer: true, isDev: ctx.nuxt.options.dev }),
        // TODO: Use externality for production (rollup) build
        /\/esm\/.*\.js$/,
        /\.(es|esm|esm-browser|esm-bundler).js$/,
        "/__vue-jsx",
        "#app",
        /^nuxt(\/|$)/,
        /(nuxt|nuxt3)\/(dist|src|app)/
      ]
    },
    build: {
      sourcemap: ctx.nuxt.options.sourcemap.server ? ctx.config.build?.sourcemap ?? true : false,
      outDir: resolve(ctx.nuxt.options.buildDir, "dist/server"),
      ssr: true,
      rollupOptions: {
        input: entry,
        external: ["#internal/nitro", ...ctx.nuxt.options.experimental.externalVue ? ["vue", "vue-router"] : []],
        output: {
          entryFileNames: "server.mjs",
          format: "module",
          generatedCode: {
            constBindings: true
          }
        },
        onwarn(warning, rollupWarn) {
          if (warning.code && ["UNUSED_EXTERNAL_IMPORT"].includes(warning.code)) {
            return;
          }
          rollupWarn(warning);
        }
      }
    },
    server: {
      // https://github.com/vitest-dev/vitest/issues/229#issuecomment-1002685027
      preTransformRequests: false,
      hmr: false
    },
    plugins: [
      cacheDirPlugin(ctx.nuxt.options.rootDir, "server"),
      vuePlugin(ctx.config.vue),
      viteJsxPlugin(ctx.config.vueJsx),
      pureAnnotationsPlugin.vite({
        sourcemap: ctx.nuxt.options.sourcemap.server,
        functions: ["defineComponent", "defineAsyncComponent", "defineNuxtLink", "createClientOnly"]
      })
    ]
  });
  if (ctx.nuxt.options.experimental.inlineSSRStyles) {
    const chunksWithInlinedCSS = /* @__PURE__ */ new Set();
    serverConfig.plugins.push(ssrStylesPlugin({
      srcDir: ctx.nuxt.options.srcDir,
      chunksWithInlinedCSS,
      shouldInline: typeof ctx.nuxt.options.experimental.inlineSSRStyles === "function" ? ctx.nuxt.options.experimental.inlineSSRStyles : void 0
    }));
    ctx.nuxt.hook("build:manifest", (manifest) => {
      for (const key in manifest) {
        const entry2 = manifest[key];
        const shouldRemoveCSS = chunksWithInlinedCSS.has(key);
        if (shouldRemoveCSS) {
          entry2.css = [];
        }
      }
    });
  }
  await ctx.nuxt.callHook("vite:extendConfig", serverConfig, { isClient: false, isServer: true });
  const onBuild = () => ctx.nuxt.callHook("vite:compiled");
  if (!ctx.nuxt.options.dev) {
    const start = Date.now();
    logger.info("Building server...");
    logger.restoreAll();
    await vite.build(serverConfig);
    logger.wrapAll();
    await writeManifest(ctx);
    await onBuild();
    logger.success(`Server built in ${Date.now() - start}ms`);
    return;
  }
  await writeManifest(ctx);
  if (!ctx.nuxt.options.ssr) {
    await onBuild();
    return;
  }
  const viteServer = await vite.createServer(serverConfig);
  ctx.ssrServer = viteServer;
  await ctx.nuxt.callHook("vite:serverCreated", viteServer, { isClient: false, isServer: true });
  ctx.nuxt.hook("close", () => viteServer.close());
  await viteServer.pluginContainer.buildStart({});
  if (ctx.config.devBundler !== "legacy") {
    await initViteNodeServer(ctx);
  } else {
    logger.info("Vite server using legacy server bundler...");
    await import('../chunks/dev-bundler.mjs').then((r) => r.initViteDevBundler(ctx, onBuild));
  }
}

const PREFIX = "virtual:nuxt:";
function virtual(vfs) {
  const extensions = ["", ".ts", ".vue", ".mjs", ".cjs", ".js", ".json"];
  const resolveWithExt = (id) => {
    for (const ext of extensions) {
      const rId = id + ext;
      if (rId in vfs) {
        return rId;
      }
    }
    return null;
  };
  return {
    name: "virtual",
    resolveId(id, importer) {
      if (process.platform === "win32" && isAbsolute(id)) {
        id = resolve(id);
      }
      const resolvedId = resolveWithExt(id);
      if (resolvedId) {
        return PREFIX + resolvedId;
      }
      if (importer && !isAbsolute(id)) {
        const importerNoPrefix = importer.startsWith(PREFIX) ? importer.slice(PREFIX.length) : importer;
        const importedDir = dirname(importerNoPrefix);
        const resolved = resolveWithExt(join(importedDir, id));
        if (resolved) {
          return PREFIX + resolved;
        }
      }
      return null;
    },
    load(id) {
      if (!id.startsWith(PREFIX)) {
        return null;
      }
      const idNoPrefix = id.slice(PREFIX.length);
      if (idNoPrefix in vfs) {
        return {
          code: vfs[idNoPrefix],
          map: null
        };
      }
    }
  };
}

async function warmupViteServer(server, entries, isServer) {
  const warmedUrls = /* @__PURE__ */ new Set();
  const warmup = async (url) => {
    if (warmedUrls.has(url)) {
      return;
    }
    warmedUrls.add(url);
    try {
      await server.transformRequest(url, { ssr: isServer });
    } catch (e) {
      logger.debug("Warmup for %s failed with: %s", url, e);
    }
    const mod = await server.moduleGraph.getModuleByUrl(url, isServer);
    const deps = mod?.ssrTransformResult?.deps || Array.from(mod?.importedModules || []).map((m) => m.url);
    await Promise.all(deps.map((m) => warmup(m.replace("/@id/__x00__", "\0"))));
  };
  await Promise.all(entries.map((entry) => warmup(entry)));
}

function resolveCSSOptions(nuxt) {
  const css = {
    postcss: {
      plugins: []
    }
  };
  const lastPlugins = ["autoprefixer", "cssnano"];
  css.postcss.plugins = Object.entries(nuxt.options.postcss.plugins).sort((a, b) => lastPlugins.indexOf(a[0]) - lastPlugins.indexOf(b[0])).filter(([, opts]) => opts).map(([name, opts]) => {
    const plugin = requireModule(name, {
      paths: [
        ...nuxt.options.modulesDir,
        distDir
      ]
    });
    return plugin(opts);
  });
  return css;
}

const keyedFunctions = [
  "useState",
  "useFetch",
  "useAsyncData",
  "useLazyAsyncData",
  "useLazyFetch"
];
const KEYED_FUNCTIONS_RE = new RegExp(`(${keyedFunctions.join("|")})`);
const stringTypes = ["Literal", "TemplateLiteral"];
const composableKeysPlugin = createUnplugin((options) => {
  return {
    name: "nuxt:composable-keys",
    enforce: "post",
    transformInclude(id) {
      const { pathname, search } = parseURL(decodeURIComponent(pathToFileURL(id).href));
      return !pathname.match(/node_modules\/nuxt3?\//) && pathname.match(/\.(m?[jt]sx?|vue)/) && parseQuery(search).type !== "style" && !parseQuery(search).macro;
    },
    transform(code, id) {
      if (!KEYED_FUNCTIONS_RE.test(code)) {
        return;
      }
      const { 0: script = code, index: codeIndex = 0 } = code.match(/(?<=<script[^>]*>)[\S\s.]*?(?=<\/script>)/) || { index: 0, 0: code };
      const s = new MagicString(code);
      let imports;
      let count = 0;
      const relativeID = isAbsolute(id) ? relative(options.rootDir, id) : id;
      walk(this.parse(script, {
        sourceType: "module",
        ecmaVersion: "latest"
      }), {
        enter(_node) {
          if (_node.type !== "CallExpression" || _node.callee.type !== "Identifier") {
            return;
          }
          const node = _node;
          const name = "name" in node.callee && node.callee.name;
          if (!name || !keyedFunctions.includes(name) || node.arguments.length >= 4) {
            return;
          }
          imports = imports || detectImportNames(script);
          if (imports.has(name)) {
            return;
          }
          switch (name) {
            case "useState":
              if (node.arguments.length >= 2 || stringTypes.includes(node.arguments[0]?.type)) {
                return;
              }
              break;
            case "useFetch":
            case "useLazyFetch":
              if (node.arguments.length >= 3 || stringTypes.includes(node.arguments[1]?.type)) {
                return;
              }
              break;
            case "useAsyncData":
            case "useLazyAsyncData":
              if (node.arguments.length >= 3 || stringTypes.includes(node.arguments[0]?.type) || stringTypes.includes(node.arguments[node.arguments.length - 1]?.type)) {
                return;
              }
              break;
          }
          const endsWithComma = code.slice(codeIndex + node.start, codeIndex + node.end - 1).trim().endsWith(",");
          s.appendLeft(
            codeIndex + node.end - 1,
            (node.arguments.length && !endsWithComma ? ", " : "") + "'$" + hash(`${relativeID}-${++count}`) + "'"
          );
        }
      });
      if (s.hasChanged()) {
        return {
          code: s.toString(),
          map: options.sourcemap ? s.generateMap({ source: id, includeContent: true }) : void 0
        };
      }
    }
  };
});
const NUXT_IMPORT_RE = /nuxt|#app|#imports/;
function detectImportNames(code) {
  const imports = findStaticImports(code);
  const names = /* @__PURE__ */ new Set();
  for (const i of imports) {
    if (NUXT_IMPORT_RE.test(i.specifier)) {
      continue;
    }
    const { namedImports, defaultImport, namespacedImport } = parseStaticImport(i);
    for (const name in namedImports || {}) {
      names.add(namedImports[name]);
    }
    if (defaultImport) {
      names.add(defaultImport);
    }
    if (namespacedImport) {
      names.add(namespacedImport);
    }
  }
  return names;
}

async function bundle(nuxt) {
  const useAsyncEntry = nuxt.options.experimental.asyncEntry || nuxt.options.vite.devBundler === "vite-node" && nuxt.options.dev;
  const entry = await resolvePath(resolve(nuxt.options.appDir, useAsyncEntry ? "entry.async" : "entry"));
  const ctx = {
    nuxt,
    entry,
    config: vite.mergeConfig(
      {
        resolve: {
          alias: {
            ...nuxt.options.alias,
            "#app": nuxt.options.appDir,
            // We need this resolution to be present before the following entry, but it
            // will be filled in client/server configs
            "#build/plugins": "",
            "#build": nuxt.options.buildDir,
            "web-streams-polyfill/ponyfill/es2018": "unenv/runtime/mock/empty",
            // Cannot destructure property 'AbortController' of ..
            "abort-controller": "unenv/runtime/mock/empty"
          }
        },
        optimizeDeps: {
          include: ["vue"],
          exclude: ["nuxt/app"]
        },
        css: resolveCSSOptions(nuxt),
        build: {
          copyPublicDir: false,
          rollupOptions: {
            output: {
              sanitizeFileName: sanitizeFilePath,
              // https://github.com/vitejs/vite/tree/main/packages/vite/src/node/build.ts#L464-L478
              assetFileNames: nuxt.options.dev ? void 0 : (chunk) => withoutLeadingSlash(join(nuxt.options.app.buildAssetsDir, `${sanitizeFilePath(filename(chunk.name))}.[hash].[ext]`))
            }
          },
          watch: {
            exclude: nuxt.options.ignore
          }
        },
        plugins: [
          composableKeysPlugin.vite({ sourcemap: nuxt.options.sourcemap.server || nuxt.options.sourcemap.client, rootDir: nuxt.options.rootDir }),
          replace({
            ...Object.fromEntries([";", "(", "{", "}", " ", "	", "\n"].map((d) => [`${d}global.`, `${d}globalThis.`])),
            preventAssignment: true
          }),
          virtual(nuxt.vfs)
        ],
        vue: {
          reactivityTransform: nuxt.options.experimental.reactivityTransform
        },
        server: {
          watch: { ignored: isIgnored },
          fs: {
            allow: [
              nuxt.options.appDir,
              ...nuxt.options._layers.map((l) => l.config.rootDir)
            ]
          }
        }
      },
      nuxt.options.vite
    )
  };
  if (!nuxt.options.dev) {
    ctx.config.server.watch = void 0;
    ctx.config.build.watch = void 0;
  }
  await nuxt.callHook("vite:extend", ctx);
  if (ctx.nuxt.options.typescript.typeCheck === true || ctx.nuxt.options.typescript.typeCheck === "build" && !ctx.nuxt.options.dev) {
    const checker = await import('vite-plugin-checker').then((r) => r.default);
    addVitePlugin(checker({
      vueTsc: {
        tsconfigPath: await resolveTSConfig(ctx.nuxt.options.rootDir)
      }
    }), { client: !nuxt.options.ssr, server: nuxt.options.ssr });
  }
  nuxt.hook("vite:serverCreated", (server, env) => {
    ctx.nuxt.hook("app:templatesGenerated", () => {
      for (const [id, mod] of server.moduleGraph.idToModuleMap) {
        if (id.startsWith("virtual:")) {
          server.moduleGraph.invalidateModule(mod);
        }
      }
    });
    if (nuxt.options.vite.warmupEntry !== false && // https://github.com/nuxt/nuxt/issues/14898
    !(env.isServer && ctx.nuxt.options.vite.devBundler !== "legacy")) {
      const start = Date.now();
      warmupViteServer(server, [join("/@fs/", ctx.entry)], env.isServer).then(() => logger.info(`Vite ${env.isClient ? "client" : "server"} warmed up in ${Date.now() - start}ms`)).catch(logger.error);
    }
  });
  await buildClient(ctx);
  await buildServer(ctx);
}

export { bundle as b, createIsExternal as c, hashId as h, isCSS as i, uniq as u, writeManifest as w };
