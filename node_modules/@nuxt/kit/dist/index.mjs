import { promises, existsSync, readFileSync } from 'node:fs';
import { defu } from 'defu';
import { applyDefaults } from 'untyped';
import { dirname, join, normalize, relative, isAbsolute, resolve, basename, parse } from 'pathe';
import consola from 'consola';
import { getContext } from 'unctx';
import satisfies from 'semver/functions/satisfies.js';
import lodashTemplate from 'lodash.template';
import { genSafeVariableName, genDynamicImport, genImport } from 'knitwork';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { interopDefault } from 'mlly';
import jiti from 'jiti';
import { globby } from 'globby';
import { resolveAlias as resolveAlias$1 } from 'pathe/utils';
import ignore from 'ignore';
import { loadConfig } from 'c12';
import { NuxtConfigSchema } from '@nuxt/schema';
import { resolvePackageJSON, readPackageJSON } from 'pkg-types';
import { kebabCase, pascalCase } from 'scule';
import hash from 'hash-sum';

const logger = consola;
function useLogger(scope) {
  return scope ? logger.withScope(scope) : logger;
}

const nuxtCtx = getContext("nuxt");
function useNuxt() {
  const instance = nuxtCtx.tryUse();
  if (!instance) {
    throw new Error("Nuxt instance is unavailable!");
  }
  return instance;
}
function tryUseNuxt() {
  return nuxtCtx.tryUse();
}

async function checkNuxtCompatibility(constraints, nuxt = useNuxt()) {
  const issues = [];
  if (constraints.nuxt) {
    const nuxtVersion = getNuxtVersion(nuxt);
    const nuxtSemanticVersion = nuxtVersion.replace(/-[0-9]+\.[0-9a-f]{7,8}/, "");
    if (!satisfies(nuxtSemanticVersion, constraints.nuxt, { includePrerelease: true })) {
      issues.push({
        name: "nuxt",
        message: `Nuxt version \`${constraints.nuxt}\` is required but currently using \`${nuxtVersion}\``
      });
    }
  }
  if (isNuxt2(nuxt)) {
    const bridgeRequirement = constraints.bridge;
    const hasBridge = !!nuxt.options.bridge;
    if (bridgeRequirement === true && !hasBridge) {
      issues.push({
        name: "bridge",
        message: "Nuxt bridge is required"
      });
    } else if (bridgeRequirement === false && hasBridge) {
      issues.push({
        name: "bridge",
        message: "Nuxt bridge is not supported"
      });
    }
  }
  await nuxt.callHook("kit:compatibility", constraints, issues);
  issues.toString = () => issues.map((issue) => ` - [${issue.name}] ${issue.message}`).join("\n");
  return issues;
}
async function assertNuxtCompatibility(constraints, nuxt = useNuxt()) {
  const issues = await checkNuxtCompatibility(constraints, nuxt);
  if (issues.length) {
    throw new Error("Nuxt compatibility issues found:\n" + issues.toString());
  }
  return true;
}
async function hasNuxtCompatibility(constraints, nuxt = useNuxt()) {
  const issues = await checkNuxtCompatibility(constraints, nuxt);
  return !issues.length;
}
function isNuxt2(nuxt = useNuxt()) {
  return getNuxtVersion(nuxt).startsWith("2.");
}
function isNuxt3(nuxt = useNuxt()) {
  return getNuxtVersion(nuxt).startsWith("3.");
}
function getNuxtVersion(nuxt = useNuxt()) {
  const version = (nuxt?._version || nuxt?.version || nuxt?.constructor?.version || "").replace(/^v/g, "");
  if (!version) {
    throw new Error("Cannot determine nuxt version! Is current instance passed?");
  }
  return version;
}

async function compileTemplate(template, ctx) {
  const data = { ...ctx, options: template.options };
  if (template.src) {
    try {
      const srcContents = await promises.readFile(template.src, "utf-8");
      return lodashTemplate(srcContents, {})(data);
    } catch (err) {
      console.error("Error compiling template: ", template);
      throw err;
    }
  }
  if (template.getContents) {
    return template.getContents(data);
  }
  throw new Error("Invalid template: " + JSON.stringify(template));
}
const serialize = (data) => JSON.stringify(data, null, 2).replace(/"{(.+)}"(?=,?$)/gm, (r) => JSON.parse(r).replace(/^{(.*)}$/, "$1"));
const importSources = (sources, { lazy = false } = {}) => {
  if (!Array.isArray(sources)) {
    sources = [sources];
  }
  return sources.map((src) => {
    if (lazy) {
      return `const ${genSafeVariableName(src)} = ${genDynamicImport(src, { comment: `webpackChunkName: ${JSON.stringify(src)}` })}`;
    }
    return genImport(src, genSafeVariableName(src));
  }).join("\n");
};
const importName = genSafeVariableName;
const templateUtils = { serialize, importName, importSources };

function defineNuxtModule(definition) {
  if (!definition.meta) {
    definition.meta = {};
  }
  if (definition.meta.configKey === void 0) {
    definition.meta.configKey = definition.meta.name;
  }
  async function getOptions(inlineOptions, nuxt = useNuxt()) {
    const configKey = definition.meta.configKey || definition.meta.name;
    const _defaults = definition.defaults instanceof Function ? definition.defaults(nuxt) : definition.defaults;
    let _options = defu(inlineOptions, nuxt.options[configKey], _defaults);
    if (definition.schema) {
      _options = await applyDefaults(definition.schema, _options);
    }
    return Promise.resolve(_options);
  }
  async function normalizedModule(inlineOptions, nuxt) {
    if (!nuxt) {
      nuxt = tryUseNuxt() || this.nuxt;
    }
    const uniqueKey = definition.meta.name || definition.meta.configKey;
    if (uniqueKey) {
      nuxt.options._requiredModules = nuxt.options._requiredModules || {};
      if (nuxt.options._requiredModules[uniqueKey]) {
        return false;
      }
      nuxt.options._requiredModules[uniqueKey] = true;
    }
    if (definition.meta.compatibility) {
      const issues = await checkNuxtCompatibility(definition.meta.compatibility, nuxt);
      if (issues.length) {
        logger.warn(`Module \`${definition.meta.name}\` is disabled due to incompatibility issues:
${issues.toString()}`);
        return;
      }
    }
    nuxt2Shims(nuxt);
    const _options = await getOptions(inlineOptions, nuxt);
    if (definition.hooks) {
      nuxt.hooks.addHooks(definition.hooks);
    }
    await definition.setup?.call(null, _options, nuxt);
  }
  normalizedModule.getMeta = () => Promise.resolve(definition.meta);
  normalizedModule.getOptions = getOptions;
  return normalizedModule;
}
const NUXT2_SHIMS_KEY = "__nuxt2_shims_key__";
function nuxt2Shims(nuxt) {
  if (!isNuxt2(nuxt) || nuxt[NUXT2_SHIMS_KEY]) {
    return;
  }
  nuxt[NUXT2_SHIMS_KEY] = true;
  nuxt.hooks = nuxt;
  if (!nuxtCtx.tryUse()) {
    nuxtCtx.set(nuxt);
    nuxt.hook("close", () => nuxtCtx.unset());
  }
  let virtualTemplates;
  nuxt.hook("builder:prepared", (_builder, buildOptions) => {
    virtualTemplates = buildOptions.templates.filter((t) => t.getContents);
    for (const template of virtualTemplates) {
      buildOptions.templates.splice(buildOptions.templates.indexOf(template), 1);
    }
  });
  nuxt.hook("build:templates", async (templates) => {
    const context = {
      nuxt,
      utils: templateUtils,
      app: {
        dir: nuxt.options.srcDir,
        extensions: nuxt.options.extensions,
        plugins: nuxt.options.plugins,
        templates: [
          ...templates.templatesFiles,
          ...virtualTemplates
        ],
        templateVars: templates.templateVars
      }
    };
    for await (const template of virtualTemplates) {
      const contents = await compileTemplate({ ...template, src: "" }, context);
      await promises.mkdir(dirname(template.dst), { recursive: true });
      await promises.writeFile(template.dst, contents);
    }
  });
}

const _require = jiti(process.cwd(), { interopDefault: true, esmResolve: true });
function isNodeModules(id) {
  return /[/\\]node_modules[/\\]/.test(id);
}
function clearRequireCache(id) {
  if (isNodeModules(id)) {
    return;
  }
  const entry = getRequireCacheItem(id);
  if (!entry) {
    delete _require.cache[id];
    return;
  }
  if (entry.parent) {
    entry.parent.children = entry.parent.children.filter((e) => e.id !== id);
  }
  for (const child of entry.children) {
    clearRequireCache(child.id);
  }
  delete _require.cache[id];
}
function scanRequireTree(id, files = /* @__PURE__ */ new Set()) {
  if (isNodeModules(id) || files.has(id)) {
    return files;
  }
  const entry = getRequireCacheItem(id);
  if (!entry) {
    files.add(id);
    return files;
  }
  files.add(entry.id);
  for (const child of entry.children) {
    scanRequireTree(child.id, files);
  }
  return files;
}
function getRequireCacheItem(id) {
  try {
    return _require.cache[id];
  } catch (e) {
  }
}
function requireModulePkg(id, opts = {}) {
  return requireModule(join(id, "package.json"), opts);
}
function resolveModule(id, opts = {}) {
  return normalize(_require.resolve(id, {
    paths: [].concat(
      // @ts-ignore
      global.__NUXT_PREPATHS__,
      opts.paths || [],
      process.cwd(),
      // @ts-ignore
      global.__NUXT_PATHS__
    ).filter(Boolean)
  }));
}
function tryResolveModule(path, opts = {}) {
  try {
    return resolveModule(path, opts);
  } catch (error) {
    if (error?.code !== "MODULE_NOT_FOUND") {
      throw error;
    }
  }
  return null;
}
function requireModule(id, opts = {}) {
  const resolvedPath = resolveModule(id, opts);
  if (opts.clearCache && !isNodeModules(id)) {
    clearRequireCache(resolvedPath);
  }
  const requiredModule = _require(resolvedPath);
  return requiredModule;
}
function importModule(id, opts = {}) {
  const resolvedPath = resolveModule(id, opts);
  if (opts.interopDefault !== false) {
    return import(pathToFileURL(resolvedPath).href).then(interopDefault);
  }
  return import(pathToFileURL(resolvedPath).href);
}
function tryImportModule(id, opts = {}) {
  try {
    return importModule(id, opts).catch(() => void 0);
  } catch {
  }
}
function tryRequireModule(id, opts = {}) {
  try {
    return requireModule(id, opts);
  } catch (e) {
  }
}

function isIgnored(pathname) {
  const nuxt = tryUseNuxt();
  if (!nuxt) {
    return false;
  }
  if (!nuxt._ignore) {
    nuxt._ignore = ignore(nuxt.options.ignoreOptions);
    const resolvedIgnore = nuxt.options.ignore.flatMap((s) => resolveGroupSyntax(s));
    nuxt._ignore.add(resolvedIgnore);
    const nuxtignoreFile = join(nuxt.options.rootDir, ".nuxtignore");
    if (existsSync(nuxtignoreFile)) {
      nuxt._ignore.add(readFileSync(nuxtignoreFile, "utf-8"));
    }
  }
  const cwds = nuxt.options._layers?.map((layer2) => layer2.cwd).sort((a, b) => b.length - a.length);
  const layer = cwds?.find((cwd) => pathname.startsWith(cwd));
  const relativePath = relative(layer ?? nuxt.options.rootDir, pathname);
  if (relativePath.startsWith("..")) {
    return false;
  }
  return !!(relativePath && nuxt._ignore.ignores(relativePath));
}
function resolveGroupSyntax(group) {
  let groups = [group];
  while (groups.some((group2) => group2.includes("{"))) {
    groups = groups.flatMap((group2) => {
      const [head, ...tail] = group2.split("{");
      if (tail.length) {
        const [body, ...rest] = tail.join("{").split("}");
        return body.split(",").map((part) => `${head}${part}${rest.join("")}`);
      }
      return group2;
    });
  }
  return groups;
}

async function resolvePath(path, opts = {}) {
  const _path = path;
  path = normalize(path);
  if (isAbsolute(path) && existsSync(path) && !await isDirectory(path)) {
    return path;
  }
  const nuxt = tryUseNuxt();
  const cwd = opts.cwd || (nuxt ? nuxt.options.rootDir : process.cwd());
  const extensions = opts.extensions || (nuxt ? nuxt.options.extensions : [".ts", ".mjs", ".cjs", ".json"]);
  const modulesDir = nuxt ? nuxt.options.modulesDir : [];
  path = resolveAlias(path);
  if (!isAbsolute(path)) {
    path = resolve(cwd, path);
  }
  let _isDir = false;
  if (existsSync(path)) {
    _isDir = await isDirectory(path);
    if (!_isDir) {
      return path;
    }
  }
  for (const ext of extensions) {
    const pathWithExt = path + ext;
    if (existsSync(pathWithExt)) {
      return pathWithExt;
    }
    const pathWithIndex = join(path, "index" + ext);
    if (_isDir && existsSync(pathWithIndex)) {
      return pathWithIndex;
    }
  }
  const resolveModulePath = tryResolveModule(_path, { paths: [cwd, ...modulesDir] });
  if (resolveModulePath) {
    return resolveModulePath;
  }
  return path;
}
async function findPath(paths, opts, pathType = "file") {
  if (!Array.isArray(paths)) {
    paths = [paths];
  }
  for (const path of paths) {
    const rPath = await resolvePath(path, opts);
    if (await existsSensitive(rPath)) {
      const _isDir = await isDirectory(rPath);
      if (!pathType || pathType === "file" && !_isDir || pathType === "dir" && _isDir) {
        return rPath;
      }
    }
  }
  return null;
}
function resolveAlias(path, alias) {
  if (!alias) {
    alias = tryUseNuxt()?.options.alias || {};
  }
  return resolveAlias$1(path, alias);
}
function createResolver(base) {
  if (!base) {
    throw new Error("`base` argument is missing for createResolver(base)!");
  }
  base = base.toString();
  if (base.startsWith("file://")) {
    base = dirname(fileURLToPath(base));
  }
  return {
    resolve: (...path) => resolve(base, ...path),
    resolvePath: (path, opts) => resolvePath(path, { cwd: base, ...opts })
  };
}
async function existsSensitive(path) {
  if (!existsSync(path)) {
    return false;
  }
  const dirFiles = await promises.readdir(dirname(path));
  return dirFiles.includes(basename(path));
}
async function isDirectory(path) {
  return (await promises.lstat(path)).isDirectory();
}
async function resolveFiles(path, pattern, opts = {}) {
  const files = await globby(pattern, { cwd: path, followSymbolicLinks: opts.followSymbolicLinks ?? true });
  return files.map((p) => resolve(path, p)).filter((p) => !isIgnored(p)).sort();
}

async function installModule(moduleToInstall, _inlineOptions, _nuxt) {
  const nuxt = useNuxt();
  const { nuxtModule, inlineOptions } = await normalizeModule(moduleToInstall, _inlineOptions);
  const res = await nuxtModule(inlineOptions, nuxt);
  if (res === false) {
    return;
  }
  if (typeof moduleToInstall === "string") {
    nuxt.options.build.transpile.push(moduleToInstall);
  }
  nuxt.options._installedModules = nuxt.options._installedModules || [];
  nuxt.options._installedModules.push({
    meta: await nuxtModule.getMeta?.(),
    entryPath: typeof moduleToInstall === "string" ? resolveAlias(moduleToInstall) : void 0
  });
}
async function normalizeModule(nuxtModule, inlineOptions) {
  const nuxt = useNuxt();
  if (typeof nuxtModule === "string") {
    const _src = resolveModule(resolveAlias(nuxtModule), { paths: nuxt.options.modulesDir });
    const isESM = _src.endsWith(".mjs");
    try {
      nuxtModule = isESM ? await importModule(_src) : requireModule(_src);
    } catch (error) {
      console.error(`Error while requiring module \`${nuxtModule}\`: ${error}`);
      throw error;
    }
  }
  if (typeof nuxtModule !== "function") {
    throw new TypeError("Nuxt module should be a function: " + nuxtModule);
  }
  return { nuxtModule, inlineOptions };
}

async function loadNuxtConfig(opts) {
  globalThis.defineNuxtConfig = (c) => c;
  const result = await loadConfig({
    name: "nuxt",
    configFile: "nuxt.config",
    rcFile: ".nuxtrc",
    extend: { extendKey: ["theme", "extends"] },
    dotenv: true,
    globalRc: true,
    ...opts
  });
  delete globalThis.defineNuxtConfig;
  const { configFile, layers = [], cwd } = result;
  const nuxtConfig = result.config;
  nuxtConfig.rootDir = nuxtConfig.rootDir || cwd;
  nuxtConfig._nuxtConfigFile = configFile;
  nuxtConfig._nuxtConfigFiles = [configFile];
  for (const layer of layers) {
    layer.config = layer.config || {};
    layer.config.rootDir = layer.config.rootDir ?? layer.cwd;
    layer.config.srcDir = resolve(layer.config.rootDir, layer.config.srcDir);
  }
  const _layers = layers.filter((layer) => layer.configFile && !layer.configFile.endsWith(".nuxtrc"));
  nuxtConfig._layers = _layers;
  if (!_layers.length) {
    _layers.push({
      cwd,
      config: {
        rootDir: cwd,
        srcDir: cwd
      }
    });
  }
  return await applyDefaults(NuxtConfigSchema, nuxtConfig);
}

function extendNuxtSchema(def) {
  const nuxt = useNuxt();
  nuxt.hook("schema:extend", (schemas) => {
    schemas.push(typeof def === "function" ? def() : def);
  });
}

async function loadNuxt(opts) {
  opts.cwd = opts.cwd || opts.rootDir;
  opts.overrides = opts.overrides || opts.config || {};
  const resolveOpts = { paths: opts.cwd };
  opts.overrides.dev = !!opts.dev;
  const nearestNuxtPkg = await Promise.all(["nuxt3", "nuxt", "nuxt-edge"].map((pkg2) => resolvePackageJSON(pkg2, { url: opts.cwd }).catch(() => null))).then((r) => r.filter(Boolean).sort((a, b) => b.length - a.length)[0]);
  if (!nearestNuxtPkg) {
    throw new Error(`Cannot find any nuxt version from ${opts.cwd}`);
  }
  const pkg = await readPackageJSON(nearestNuxtPkg);
  const majorVersion = parseInt((pkg.version || "").split(".")[0]);
  if (majorVersion === 3) {
    const { loadNuxt: loadNuxt3 } = await importModule(pkg._name || pkg.name, resolveOpts);
    const nuxt2 = await loadNuxt3(opts);
    return nuxt2;
  }
  const { loadNuxt: loadNuxt2 } = await tryImportModule("nuxt-edge", resolveOpts) || await importModule("nuxt", resolveOpts);
  const nuxt = await loadNuxt2({
    rootDir: opts.cwd,
    for: opts.dev ? "dev" : "build",
    configOverrides: opts.overrides,
    ready: opts.ready,
    envConfig: opts.dotenv
    // TODO: Backward format conversion
  });
  return nuxt;
}
async function buildNuxt(nuxt) {
  const resolveOpts = { paths: nuxt.options.rootDir };
  if (nuxt.options._majorVersion === 3) {
    const { build: build2 } = await tryImportModule("nuxt3", resolveOpts) || await importModule("nuxt", resolveOpts);
    return build2(nuxt);
  }
  const { build } = await tryImportModule("nuxt-edge", resolveOpts) || await importModule("nuxt", resolveOpts);
  return build(nuxt);
}

function addImports(imports) {
  assertNuxtCompatibility({ bridge: true });
  useNuxt().hook("imports:extend", (_imports) => {
    _imports.push(...Array.isArray(imports) ? imports : [imports]);
  });
}
function addImportsDir(dirs) {
  assertNuxtCompatibility({ bridge: true });
  useNuxt().hook("imports:dirs", (_dirs) => {
    for (const dir of Array.isArray(dirs) ? dirs : [dirs]) {
      _dirs.push(dir);
    }
  });
}
function addImportsSources(presets) {
  assertNuxtCompatibility({ bridge: true });
  useNuxt().hook("imports:sources", (_presets) => {
    for (const preset of Array.isArray(presets) ? presets : [presets]) {
      _presets.push(preset);
    }
  });
}

function extendWebpackConfig(fn, options = {}) {
  const nuxt = useNuxt();
  if (options.dev === false && nuxt.options.dev) {
    return;
  }
  if (options.build === false && nuxt.options.build) {
    return;
  }
  nuxt.hook("webpack:config", (configs) => {
    if (options.server !== false) {
      const config = configs.find((i) => i.name === "server");
      if (config) {
        fn(config);
      }
    }
    if (options.client !== false) {
      const config = configs.find((i) => i.name === "client");
      if (config) {
        fn(config);
      }
    }
  });
}
function extendViteConfig(fn, options = {}) {
  const nuxt = useNuxt();
  if (options.dev === false && nuxt.options.dev) {
    return;
  }
  if (options.build === false && nuxt.options.build) {
    return;
  }
  if (options.server !== false && options.client !== false) {
    return nuxt.hook("vite:extend", ({ config }) => fn(config));
  }
  nuxt.hook("vite:extendConfig", (config, { isClient, isServer }) => {
    if (options.server !== false && isServer) {
      return fn(config);
    }
    if (options.client !== false && isClient) {
      return fn(config);
    }
  });
}
function addWebpackPlugin(plugin, options) {
  extendWebpackConfig((config) => {
    config.plugins = config.plugins || [];
    if (Array.isArray(plugin)) {
      config.plugins.push(...plugin);
    } else {
      config.plugins.push(plugin);
    }
  }, options);
}
function addVitePlugin(plugin, options) {
  extendViteConfig((config) => {
    config.plugins = config.plugins || [];
    if (Array.isArray(plugin)) {
      config.plugins.push(...plugin);
    } else {
      config.plugins.push(plugin);
    }
  }, options);
}

async function addComponentsDir(dir) {
  const nuxt = useNuxt();
  await assertNuxtCompatibility({ nuxt: ">=2.13" }, nuxt);
  nuxt.options.components = nuxt.options.components || [];
  nuxt.hook("components:dirs", (dirs) => {
    dirs.push(dir);
  });
}
async function addComponent(opts) {
  const nuxt = useNuxt();
  await assertNuxtCompatibility({ nuxt: ">=2.13" }, nuxt);
  nuxt.options.components = nuxt.options.components || [];
  const component = {
    export: opts.export || "default",
    chunkName: "components/" + kebabCase(opts.name),
    global: opts.global ?? false,
    kebabName: kebabCase(opts.name || ""),
    pascalName: pascalCase(opts.name || ""),
    prefetch: false,
    preload: false,
    mode: "all",
    shortPath: opts.filePath,
    ...opts
  };
  nuxt.hook("components:extend", (components) => {
    const existingComponent = components.find((c) => (c.pascalName === component.pascalName || c.kebabName === component.kebabName) && c.mode === component.mode);
    if (existingComponent) {
      const name = existingComponent.pascalName || existingComponent.kebabName;
      console.warn(`Overriding ${name} component.`);
      Object.assign(existingComponent, component);
    } else {
      components.push(component);
    }
  });
}

function addTemplate(_template) {
  const nuxt = useNuxt();
  const template = normalizeTemplate(_template);
  nuxt.options.build.templates = nuxt.options.build.templates.filter((p) => normalizeTemplate(p).filename !== template.filename);
  nuxt.options.build.templates.push(template);
  return template;
}
function normalizeTemplate(template) {
  if (!template) {
    throw new Error("Invalid template: " + JSON.stringify(template));
  }
  if (typeof template === "string") {
    template = { src: template };
  } else {
    template = { ...template };
  }
  if (template.src) {
    if (!existsSync(template.src)) {
      throw new Error("Template not found: " + template.src);
    }
    if (!template.filename) {
      const srcPath = parse(template.src);
      template.filename = template.fileName || `${basename(srcPath.dir)}.${srcPath.name}.${hash(template.src)}${srcPath.ext}`;
    }
  }
  if (!template.src && !template.getContents) {
    throw new Error("Invalid template. Either getContents or src options should be provided: " + JSON.stringify(template));
  }
  if (!template.filename) {
    throw new Error("Invalid template. Either filename should be provided: " + JSON.stringify(template));
  }
  if (template.filename.endsWith(".d.ts")) {
    template.write = true;
  }
  if (!template.dst) {
    const nuxt = useNuxt();
    template.dst = resolve(nuxt.options.buildDir, template.filename);
  }
  return template;
}
function updateTemplates(options) {
  return useNuxt().hooks.callHook("builder:generateApp", options);
}

function addLayout(template, name) {
  const nuxt = useNuxt();
  const { filename, src } = addTemplate(template);
  const layoutName = kebabCase(name || parse(filename).name).replace(/["']/g, "");
  if (isNuxt2(nuxt)) {
    const layout = nuxt.options.layouts[layoutName];
    if (layout) {
      return logger.warn(
        `Not overriding \`${layoutName}\` (provided by \`${layout}\`) with \`${src || filename}\`.`
      );
    }
    nuxt.options.layouts[layoutName] = `./${filename}`;
    if (name === "error") {
      this.addErrorLayout(filename);
    }
    return;
  }
  nuxt.hook("app:templates", (app) => {
    if (layoutName in app.layouts) {
      const relativePath = relative(nuxt.options.srcDir, app.layouts[layoutName].file);
      return logger.warn(
        `Not overriding \`${layoutName}\` (provided by \`~/${relativePath}\`) with \`${src || filename}\`.`
      );
    }
    app.layouts[layoutName] = {
      file: join("#build", filename),
      name: layoutName
    };
  });
}

function extendPages(cb) {
  const nuxt = useNuxt();
  if (isNuxt2(nuxt)) {
    nuxt.hook("build:extendRoutes", cb);
  } else {
    nuxt.hook("pages:extend", cb);
  }
}
function extendRouteRules(route, rule, options = {}) {
  const nuxt = useNuxt();
  for (const opts of [nuxt.options, nuxt.options.nitro]) {
    if (!opts.routeRules) {
      opts.routeRules = {};
    }
    opts.routeRules[route] = options.override ? defu(rule, opts.routeRules[route]) : defu(opts.routeRules[route], rule);
  }
}
function addRouteMiddleware(input, options = {}) {
  const nuxt = useNuxt();
  const middlewares = Array.isArray(input) ? input : [input];
  nuxt.hook("app:resolve", (app) => {
    for (const middleware of middlewares) {
      const find = app.middleware.findIndex((item) => item.name === middleware.name);
      if (find >= 0) {
        if (options.override === true) {
          app.middleware[find] = middleware;
        } else {
          console.warn(`'${middleware.name}' middleware already exists at '${app.middleware[find].path}'. You can set \`override: true\` to replace it.`);
        }
      } else {
        app.middleware.push(middleware);
      }
    }
  });
}

function normalizePlugin(plugin) {
  if (typeof plugin === "string") {
    plugin = { src: plugin };
  } else {
    plugin = { ...plugin };
  }
  if (!plugin.src) {
    throw new Error("Invalid plugin. src option is required: " + JSON.stringify(plugin));
  }
  plugin.src = normalize(resolveAlias(plugin.src));
  if (plugin.ssr) {
    plugin.mode = "server";
  }
  if (!plugin.mode) {
    const [, mode = "all"] = plugin.src.match(/\.(server|client)(\.\w+)*$/) || [];
    plugin.mode = mode;
  }
  return plugin;
}
function addPlugin(_plugin, opts = {}) {
  const nuxt = useNuxt();
  const plugin = normalizePlugin(_plugin);
  nuxt.options.plugins = nuxt.options.plugins.filter((p) => normalizePlugin(p).src !== plugin.src);
  nuxt.options.plugins[opts.append ? "push" : "unshift"](plugin);
  return plugin;
}
function addPluginTemplate(plugin, opts = {}) {
  const normalizedPlugin = typeof plugin === "string" ? { src: plugin } : { ...plugin, src: addTemplate(plugin).dst };
  return addPlugin(normalizedPlugin, opts);
}

function normalizeHandlerMethod(handler) {
  const [, method = void 0] = handler.handler.match(/\.(get|head|patch|post|put|delete|connect|options|trace)(\.\w+)*$/) || [];
  return {
    method,
    ...handler,
    handler: normalize(handler.handler)
  };
}
function addServerHandler(handler) {
  useNuxt().options.serverHandlers.push(normalizeHandlerMethod(handler));
}
function addDevServerHandler(handler) {
  useNuxt().options.devServerHandlers.push(handler);
}
function addServerPlugin(plugin) {
  const nuxt = useNuxt();
  nuxt.options.nitro.plugins = nuxt.options.nitro.plugins || [];
  nuxt.options.nitro.plugins.push(normalize(plugin));
}
function addPrerenderRoutes(routes) {
  const nuxt = useNuxt();
  if (!Array.isArray(routes)) {
    routes = [routes];
  }
  routes = routes.filter(Boolean);
  if (!routes.length) {
    return;
  }
  nuxt.hook("prerender:routes", (ctx) => {
    for (const route of routes) {
      ctx.routes.add(route);
    }
  });
}
function useNitro() {
  const nuxt = useNuxt();
  if (!nuxt._nitro) {
    throw new Error("Nitro is not initialized yet. You can call `useNitro()` only after `ready` hook.");
  }
  return nuxt._nitro;
}

export { addComponent, addComponentsDir, addDevServerHandler, addImports, addImportsDir, addImportsSources, addLayout, addPlugin, addPluginTemplate, addPrerenderRoutes, addRouteMiddleware, addServerHandler, addServerPlugin, addTemplate, addVitePlugin, addWebpackPlugin, assertNuxtCompatibility, buildNuxt, checkNuxtCompatibility, clearRequireCache, compileTemplate, createResolver, defineNuxtModule, extendNuxtSchema, extendPages, extendRouteRules, extendViteConfig, extendWebpackConfig, findPath, getNuxtVersion, getRequireCacheItem, hasNuxtCompatibility, importModule, installModule, isIgnored, isNodeModules, isNuxt2, isNuxt3, loadNuxt, loadNuxtConfig, logger, normalizePlugin, normalizeTemplate, nuxtCtx, requireModule, requireModulePkg, resolveAlias, resolveFiles, resolveModule, resolvePath, scanRequireTree, templateUtils, tryImportModule, tryRequireModule, tryResolveModule, tryUseNuxt, updateTemplates, useLogger, useNitro, useNuxt };
