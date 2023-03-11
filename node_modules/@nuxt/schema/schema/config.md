 

# `components`

# `imports`

## `global`
- **Type**: `boolean`
- **Default**: `false`


## `dirs`
- **Type**: `array`
- **Default**: `[]`

> An array of custom directories that will be auto-imported. Note that this option will not override the default directories (~/composables, ~/utils).


# `pages`
- **Type**: `boolean`
- **Default**: `undefined`

> Whether to use the vue-router integration in Nuxt 3. If you do not provide a value it will be enabled if you have a `pages/` directory in your source folder.


# `telemetry`
- **Type**: `boolean`
- **Default**: `undefined`

> Manually disable nuxt telemetry.


# `vue`

## `compilerOptions`
- **Type**: `@vueCompilerCoreCompilerOptions`
- **Default**: `{}`

> Options for the Vue compiler that will be passed at build time.


# `app`

## `baseURL`
- **Type**: `string`
- **Default**: `"/"`

> The base path of your Nuxt application.


This can be set at runtime by setting the NUXT_APP_BASE_URL environment variable.


## `buildAssetsDir`
- **Type**: `string`
- **Default**: `"/_nuxt/"`

> The folder name for the built site assets, relative to `baseURL` (or `cdnURL` if set). This is set at build time and should not be customized at runtime.


## `cdnURL`
- **Type**: `string`
- **Default**: `""`

> An absolute URL to serve the public folder from (production-only).


This can be set to a different value at runtime by setting the `NUXT_APP_CDN_URL` environment variable.


## `head`

## `layoutTransition`
- **Type**: `SrcTypesConfigNuxtAppConfig['layoutTransition']`
- **Default**: `false`

> Default values for layout transitions.


This can be overridden with `definePageMeta` on an individual page. Only JSON-serializable values are allowed.


## `pageTransition`
- **Type**: `SrcTypesConfigNuxtAppConfig['pageTransition']`
- **Default**: `false`

> Default values for page transitions.


This can be overridden with `definePageMeta` on an individual page. Only JSON-serializable values are allowed.


## `keepalive`
- **Type**: `SrcTypesConfigNuxtAppConfig['keepalive']`
- **Default**: `false`

> Default values for KeepAlive configuration between pages.


This can be overridden with `definePageMeta` on an individual page. Only JSON-serializable values are allowed.


## `rootId`
- **Type**: `string`
- **Default**: `"__nuxt"`

> Customize Nuxt root element id.


## `rootTag`
- **Type**: `string`
- **Default**: `"div"`

> Customize Nuxt root element tag.


# `plugins`
- **Type**: `(SrcTypesNuxtNuxtPlugin | string)[]`
- **Default**: `[]`

> An array of nuxt app plugins.


Each plugin can be a string (which can be an absolute or relative path to a file). If it ends with `.client` or `.server` then it will be automatically loaded only in the appropriate context.
It can also be an object with `src` and `mode` keys.


# `css`
- **Type**: `string[]`
- **Default**: `[]`

> You can define the CSS files/modules/libraries you want to set globally (included in every page).


Nuxt will automatically guess the file type by its extension and use the appropriate pre-processor. You will still need to install the required loader if you need to use them.


# `builder`
- **Type**: `'vite' | 'webpack' | { bundle: (nuxt: SrcTypesNuxtNuxt) => Promise<void> }`
- **Default**: `"@nuxt/vite-builder"`

> The builder to use for bundling the Vue part of your application.


# `sourcemap`

# `build`

## `transpile`
- **Type**: `Array<string | RegExp | ((ctx: { isClient?: boolean; isServer?: boolean; isDev: boolean }) => string | RegExp | false)>`
- **Default**: `[]`

> If you want to transpile specific dependencies with Babel, you can add them here. Each item in transpile can be a package name, a function, a string or regex object matching the dependency's file name.


You can also use a function to conditionally transpile. The function will receive an object ({ isDev, isServer, isClient, isModern, isLegacy }).


## `templates`
- **Type**: `array`
- **Default**: `[]`

> You can provide your own templates which will be rendered based on Nuxt configuration. This feature is specially useful for using with modules.


Templates are rendered using [`lodash.template`](https://lodash.com/docs/4.17.15#template).


## `analyze`
- **Type**: `boolean | WebpackBundleAnalyzerBundleAnalyzerPluginOptions | RollupPluginVisualizerPluginVisualizerOptions`
- **Default**: `false`

> Nuxt uses `webpack-bundle-analyzer` to visualize your bundles and how to optimize them.


Set to `true` to enable bundle analysis, or pass an object with options: [for webpack](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin) or [for vite](https://github.com/btd/rollup-plugin-visualizer#options).


# `extends`
- **Type**: `string|string[]`
- **Default**: `null`

> Extend project from multiple local or remote sources.


Value should be either a string or array of strings pointing to source directories or config path relative to current config.
You can use `github:`, `gitlab:`, `bitbucket:` or `https://` to extend from a remote git repository.


# `theme`
- **Type**: `string`
- **Default**: `null`

> Extend project from a local or remote source.


Value should be a string pointing to source directory or config path relative to current config.
You can use `github:`, `gitlab:`, `bitbucket:` or `https://` to extend from a remote git repository.


# `rootDir`
- **Type**: `string`
- **Default**: `"/<rootDir>"`

> Define the root directory of your application.


This property can be overwritten (for example, running `nuxt ./my-app/` will set the `rootDir` to the absolute path of `./my-app/` from the current/working directory.
It is normally not needed to configure this option.


# `workspaceDir`
- **Type**: `string`
- **Default**: `"/<rootDir>"`

> Define the workspace directory of your application.


Often this is used when in a monorepo setup. Nuxt will attempt to detect your workspace directory automatically, but you can override it here.
It is normally not needed to configure this option.


# `srcDir`
- **Type**: `string`
- **Default**: `"/<rootDir>"`

> Define the source directory of your Nuxt application.


If a relative path is specified, it will be relative to the `rootDir`.


# `serverDir`
- **Type**: `string`
- **Default**: `"/<rootDir>/server"`

> Define the server directory of your Nuxt application, where Nitro routes, middleware and plugins are kept.


If a relative path is specified, it will be relative to your `rootDir`.


# `buildDir`
- **Type**: `string`
- **Default**: `"/<rootDir>/.nuxt"`

> Define the directory where your built Nuxt files will be placed.


Many tools assume that `.nuxt` is a hidden directory (because it starts with a `.`). If that is a problem, you can use this option to prevent that.


# `modulesDir`
- **Type**: `array`
- **Default**: `["/<rootDir>/node_modules","/Users/daniel/code/nuxt.js/packages/schema/node_modules"]`

> Used to set the modules directories for path resolving (for example, webpack's `resolveLoading`, `nodeExternals` and `postcss`).


The configuration path is relative to `options.rootDir` (default is current working directory).
Setting this field may be necessary if your project is organized as a yarn workspace-styled mono-repository.


# `dev`
- **Type**: `boolean`
- **Default**: `false`

> Whether Nuxt is running in development mode.


Normally, you should not need to set this.


# `test`
- **Type**: `boolean`
- **Default**: `false`

> Whether your app is being unit tested.


# `debug`
- **Type**: `boolean`
- **Default**: `false`

> Set to `true` to enable debug mode.


At the moment, it prints out hook names and timings on the server, and logs hook arguments as well in the browser.


# `ssr`
- **Type**: `boolean`
- **Default**: `true`

> Whether to enable rendering of HTML - either dynamically (in server mode) or at generate time. If set to `false` generated pages will have no content.


# `modules`
- **Type**: `(SrcTypesModuleNuxtModule | string | [SrcTypesModuleNuxtModule | string, Record<string, any>])[]`
- **Default**: `[]`

> Modules are Nuxt extensions which can extend its core functionality and add endless integrations.


Each module is either a string (which can refer to a package, or be a path to a file), a tuple with the module as first string and the options as a second object, or an inline module function.
Nuxt tries to resolve each item in the modules array using node require path (in `node_modules`) and then will be resolved from project `srcDir` if `~` alias is used.


# `dir`

## `assets`
- **Type**: `string`
- **Default**: `"assets"`

> The assets directory (aliased as `~assets` in your build).


## `layouts`
- **Type**: `string`
- **Default**: `"layouts"`

> The layouts directory, each file of which will be auto-registered as a Nuxt layout.


## `middleware`
- **Type**: `string`
- **Default**: `"middleware"`

> The middleware directory, each file of which will be auto-registered as a Nuxt middleware.


## `pages`
- **Type**: `string`
- **Default**: `"pages"`

> The directory which will be processed to auto-generate your application page routes.


## `plugins`
- **Type**: `string`
- **Default**: `"plugins"`

> The plugins directory, each file of which will be auto-registered as a Nuxt plugin.


## `public`
- **Type**: `string`
- **Default**: `"public"`

> The directory containing your static files, which will be directly accessible via the Nuxt server and copied across into your `dist` folder when your app is generated.


## `static`
- **Type**: `string`
- **Default**: `"public"`


# `extensions`
- **Type**: `array`
- **Default**: `[".js",".jsx",".mjs",".ts",".tsx",".vue"]`

> The extensions that should be resolved by the Nuxt resolver.


# `alias`

# `ignoreOptions`
- **Type**: `any`
- **Default**: `{}`

> Pass options directly to `node-ignore` (which is used by Nuxt to ignore files).


# `ignorePrefix`
- **Type**: `string`
- **Default**: `"-"`

> Any file in `pages/`, `layouts/`, `middleware/` or `store/` will be ignored during building if its filename starts with the prefix specified by `ignorePrefix`.


# `ignore`
- **Type**: `array`
- **Default**: `["**/*.stories.{js,ts,jsx,tsx}","**/*.{spec,test}.{js,ts,jsx,tsx}","**/*.d.ts",".output","**/-*.*"]`

> More customizable than `ignorePrefix`: all files matching glob patterns specified inside the `ignore` array will be ignored in building.


# `watchers`

## `rewatchOnRawEvents`
- **Type**: `any`
- **Default**: `{}`

> An array of event types, which, when received, will cause the watcher to restart.


## `webpack`

### `aggregateTimeout`
- **Type**: `number`
- **Default**: `1000`


## `chokidar`

### `ignoreInitial`
- **Type**: `boolean`
- **Default**: `true`


# `hooks`
- **Type**: `SrcTypesHooksNuxtHooks`
- **Default**: `null`

> Hooks are listeners to Nuxt events that are typically used in modules, but are also available in `nuxt.config`.


Internally, hooks follow a naming pattern using colons (e.g., build:done).
For ease of configuration, you can also structure them as an hierarchical object in `nuxt.config` (as below).


# `runtimeConfig`

# `appConfig`
- **Type**: `SrcTypesConfigAppConfig`
- **Default**: `{}`

> Additional app configuration


For programmatic usage and type support, you can directly provide app config with this option. It will be merged with `app.config` file as default value.


# `devServer`

## `https`
- **Type**: `false | { key: string; cert: string }`
- **Default**: `false`

> Whether to enable HTTPS.


## `port`
- **Type**: `number`
- **Default**: `3000`

> Dev server listening port


## `host`
- **Type**: `string`
- **Default**: `""`

> Dev server listening host


## `url`
- **Type**: `string`
- **Default**: `"http://localhost:3000"`

> Listening dev server URL.


This should not be set directly as it will always be overridden by the dev server with the full URL (for module and internal use).


# `experimental`

## `asyncEntry`
- **Type**: `boolean`
- **Default**: `false`

> Set to true to generate an async entry point for the Vue bundle (for module federation support).


## `reactivityTransform`
- **Type**: `boolean`
- **Default**: `false`

> Enable Vue's reactivity transform


## `externalVue`
- **Type**: `boolean`
- **Default**: `true`

> Externalize `vue`, `@vue/*` and `vue-router` when building.


## `treeshakeClientOnly`
- **Type**: `boolean`
- **Default**: `true`

> Tree shakes contents of client-only components from server bundle.


## `emitRouteChunkError`
- **Type**: `boolean | 'reload'`
- **Default**: `false`

> Emit `app:chunkError` hook when there is an error loading vite/webpack chunks.


You can set this to `reload` to perform a hard reload of the new route when a chunk fails to load when navigating to a new route.


## `viteNode`
- **Type**: `boolean`
- **Default**: `true`

> Use vite-node for on-demand server chunk loading


## `viteServerDynamicImports`
- **Type**: `boolean`
- **Default**: `true`

> Split server bundle into multiple chunks and dynamically import them.


## `inlineSSRStyles`
- **Type**: `boolean | ((id?: string) => boolean)`
- **Default**: `true`

> Inline styles when rendering HTML (currently vite only).


You can also pass a function that receives the path of a Vue component and returns a boolean indicating whether to inline the styles for that component.


## `noScripts`
- **Type**: `boolean`
- **Default**: `false`

> Turn off rendering of Nuxt scripts and JS resource hints.


## `payloadExtraction`
- **Type**: `boolean`
- **Default**: `false`

> When this option is enabled (by default) payload of pages generated with `nuxt generate` are extracted


## `crossOriginPrefetch`
- **Type**: `boolean`
- **Default**: `false`

> Enable cross-origin prefetch using the Speculation Rules API.


## `writeEarlyHints`
- **Type**: `boolean`
- **Default**: `false`

> Write early hints when using node server.


## `componentIslands`
- **Type**: `boolean`
- **Default**: `false`

> Experimental component islands support with <NuxtIsland> and .island.vue files.


## `configSchema`
- **Type**: `boolean`
- **Default**: `false`

> Enable experimental config schema support


# `generate`

## `routes`
- **Type**: `array`
- **Default**: `[]`

> The routes to generate.


If you are using the crawler, this will be only the starting point for route generation. This is often necessary when using dynamic routes.
It is preferred to use `nitro.prerender.routes`.


## `exclude`
- **Type**: `array`
- **Default**: `[]`

> This option is no longer used. Instead, use `nitro.prerender.ignore`.


# `_majorVersion`
- **Type**: `number`
- **Default**: `3`


# `_legacyGenerate`
- **Type**: `boolean`
- **Default**: `false`


# `_start`
- **Type**: `boolean`
- **Default**: `false`


# `_build`
- **Type**: `boolean`
- **Default**: `false`


# `_generate`
- **Type**: `boolean`
- **Default**: `false`


# `_prepare`
- **Type**: `boolean`
- **Default**: `false`


# `_cli`
- **Type**: `boolean`
- **Default**: `false`


# `_requiredModules`
- **Type**: `any`
- **Default**: `{}`


# `_nuxtConfigFile`
- **Type**: `any`
- **Default**: `{}`


# `_nuxtConfigFiles`
- **Type**: `array`
- **Default**: `[]`


# `appDir`
- **Type**: `string`
- **Default**: `""`


# `_installedModules`
- **Type**: `array`
- **Default**: `[]`


# `_modules`
- **Type**: `array`
- **Default**: `[]`


# `nitro`

## `routeRules`

# `routeRules`
- **Type**: `NitropackNitroConfig['routeRules']`
- **Default**: `{}`

> Global route options applied to matching server routes.


# `serverHandlers`
- **Type**: `NitropackNitroEventHandler[]`
- **Default**: `[]`

> Nitro server handlers.


Each handler accepts the following options: - handler: The path to the file defining the handler. - route: The route under which the handler is available. This follows the conventions of https://github.com/unjs/radix3. - method: The HTTP method of requests that should be handled. - middleware: Specifies whether it is a middleware handler. - lazy: Specifies whether to use lazy loading to import the handler.


# `devServerHandlers`
- **Type**: `NitropackNitroDevEventHandler[]`
- **Default**: `[]`

> Nitro development-only server handlers.


# `postcss`

## `plugins`

### `postcss-import`

### `postcss-url`
- **Type**: `any`
- **Default**: `{}`

> https://github.com/postcss/postcss-url


### `autoprefixer`
- **Type**: `any`
- **Default**: `{}`

> https://github.com/postcss/autoprefixer


### `cssnano`
- **Type**: `boolean`
- **Default**: `true`


# `router`

## `options`
- **Type**: `SrcTypesRouterRouterConfigSerializable`
- **Default**: `{}`

> Additional options passed to `vue-router`.


Note: Only JSON serializable options should be passed by nuxt config.
For more control, you can use `app/router.options.ts` file.


# `typescript`

## `strict`
- **Type**: `boolean`
- **Default**: `true`

> TypeScript comes with certain checks to give you more safety and analysis of your program. Once you’ve converted your codebase to TypeScript, you can start enabling these checks for greater safety. [Read More](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html#getting-stricter-checks)


## `includeWorkspace`
- **Type**: `boolean`
- **Default**: `false`

> Include parent workspace in the Nuxt project. Mostly useful for themes and module authors.


## `typeCheck`
- **Type**: `boolean | 'build'`
- **Default**: `false`

> Enable build-time type checking.


If set to true, this will type check in development. You can restrict this to build-time type checking by setting it to `build`. Requires to install `typescript` and `vue-tsc` as dev dependencies.


## `tsConfig`
- **Type**: `PkgTypesReadPackageJSON`
- **Default**: `{}`

> You can extend generated `.nuxt/tsconfig.json` using this option.


## `shim`
- **Type**: `boolean`
- **Default**: `true`

> Generate a `*.vue` shim.


We recommend instead either enabling [**Take Over Mode**](https://vuejs.org/guide/typescript/overview.html#volar-takeover-mode) or adding TypeScript Vue Plugin (Volar)** 👉 [[Download](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)].


# `vite`

## `root`
- **Type**: `string`
- **Default**: `"/<rootDir>"`


## `mode`
- **Type**: `string`
- **Default**: `"production"`


## `logLevel`
- **Type**: `string`
- **Default**: `"info"`


## `define`

## `resolve`

### `extensions`
- **Type**: `array`
- **Default**: `[".mjs",".js",".ts",".jsx",".tsx",".json",".vue"]`


## `publicDir`
- **Type**: `string`
- **Default**: `"/<rootDir>/public"`


## `vue`

### `isProduction`
- **Type**: `boolean`
- **Default**: `true`


### `template`

#### `compilerOptions`

## `vueJsx`

## `optimizeDeps`

### `exclude`
- **Type**: `array`
- **Default**: `["vue-demi"]`


## `esbuild`

### `jsxFactory`
- **Type**: `string`
- **Default**: `"h"`


### `jsxFragment`
- **Type**: `string`
- **Default**: `"Fragment"`


### `tsconfigRaw`
- **Type**: `string`
- **Default**: `"{}"`


## `clearScreen`
- **Type**: `boolean`
- **Default**: `false`


## `build`

### `assetsDir`
- **Type**: `string`
- **Default**: `"_nuxt/"`


### `emptyOutDir`
- **Type**: `boolean`
- **Default**: `false`


## `server`

### `fs`

#### `allow`
- **Type**: `array`
- **Default**: `["/<rootDir>/.nuxt","/<rootDir>","/<rootDir>","/<rootDir>","/<rootDir>/node_modules","/Users/daniel/code/nuxt.js/packages/schema/node_modules"]`


# `webpack`

## `analyze`
- **Type**: `boolean | WebpackBundleAnalyzerBundleAnalyzerPluginOptions`
- **Default**: `false`

> Nuxt uses `webpack-bundle-analyzer` to visualize your bundles and how to optimize them.


Set to `true` to enable bundle analysis, or pass an object with options: [for webpack](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin) or [for vite](https://github.com/btd/rollup-plugin-visualizer#options).


## `profile`
- **Type**: `boolean`
- **Default**: `false`

> Enable the profiler in webpackbar.


It is normally enabled by CLI argument `--profile`.


## `extractCSS`
- **Type**: `boolean | MiniCssExtractPluginPluginOptions`
- **Default**: `true`

> Enables Common CSS Extraction using [Vue Server Renderer guidelines](https://ssr.vuejs.org/guide/css.html).


Using [extract-css-chunks-webpack-plugin](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin/) under the hood, your CSS will be extracted into separate files, usually one per component. This allows caching your CSS and JavaScript separately and is worth trying if you have a lot of global or shared CSS.


## `cssSourceMap`
- **Type**: `boolean`
- **Default**: `false`

> Enables CSS source map support (defaults to `true` in development).


## `serverURLPolyfill`
- **Type**: `string`
- **Default**: `"url"`

> The polyfill library to load to provide URL and URLSearchParams.


Defaults to `'url'` ([see package](https://www.npmjs.com/package/url)).


## `filenames`

### `app`
- **Type**: `function`
- **Default**: `undefined`

```ts
() => any
```


### `chunk`
- **Type**: `function`
- **Default**: `undefined`

```ts
() => any
```


### `css`
- **Type**: `function`
- **Default**: `undefined`

```ts
() => any
```


### `img`
- **Type**: `function`
- **Default**: `undefined`

```ts
() => any
```


### `font`
- **Type**: `function`
- **Default**: `undefined`

```ts
() => any
```


### `video`
- **Type**: `function`
- **Default**: `undefined`

```ts
() => any
```


## `loaders`

### `file`

#### `esModule`
- **Type**: `boolean`
- **Default**: `false`


### `fontUrl`

#### `esModule`
- **Type**: `boolean`
- **Default**: `false`


#### `limit`
- **Type**: `number`
- **Default**: `1000`


### `imgUrl`

#### `esModule`
- **Type**: `boolean`
- **Default**: `false`


#### `limit`
- **Type**: `number`
- **Default**: `1000`


### `pugPlain`
- **Type**: `any`
- **Default**: `{}`


### `vue`

#### `productionMode`
- **Type**: `boolean`
- **Default**: `true`


#### `transformAssetUrls`

##### `video`
- **Type**: `string`
- **Default**: `"src"`


##### `source`
- **Type**: `string`
- **Default**: `"src"`


##### `object`
- **Type**: `string`
- **Default**: `"src"`


##### `embed`
- **Type**: `string`
- **Default**: `"src"`


#### `compilerOptions`

### `css`

#### `importLoaders`
- **Type**: `number`
- **Default**: `0`


#### `url`

##### `filter`
- **Type**: `function`
- **Default**: `undefined`

```ts
() => any
```


#### `esModule`
- **Type**: `boolean`
- **Default**: `false`


### `cssModules`

#### `importLoaders`
- **Type**: `number`
- **Default**: `0`


#### `url`

##### `filter`
- **Type**: `function`
- **Default**: `undefined`

```ts
() => any
```


#### `esModule`
- **Type**: `boolean`
- **Default**: `false`


#### `modules`

##### `localIdentName`
- **Type**: `string`
- **Default**: `"[local]_[hash:base64:5]"`


### `less`
- **Type**: `any`
- **Default**: `{"sourceMap":false}`


### `sass`

#### `sassOptions`

##### `indentedSyntax`
- **Type**: `boolean`
- **Default**: `true`


### `scss`
- **Type**: `any`
- **Default**: `{"sourceMap":false}`


### `stylus`
- **Type**: `any`
- **Default**: `{"sourceMap":false}`


### `vueStyle`
- **Type**: `any`
- **Default**: `{"sourceMap":false}`


## `plugins`
- **Type**: `array`
- **Default**: `[]`

> Add webpack plugins.


## `terser`
- **Type**: `false | TerserWebpackPluginBasePluginOptions & TerserWebpackPluginDefinedDefaultMinimizerAndOptions<any>`
- **Default**: `{}`

> Terser plugin options.


Set to false to disable this plugin, or pass an object of options.


## `aggressiveCodeRemoval`
- **Type**: `boolean`
- **Default**: `false`

> Hard-replaces `typeof process`, `typeof window` and `typeof document` to tree-shake bundle.


## `optimizeCSS`
- **Type**: `false | CssMinimizerWebpackPluginBasePluginOptions & CssMinimizerWebpackPluginDefinedDefaultMinimizerAndOptions<any>`
- **Default**: `false`

> OptimizeCSSAssets plugin options.


Defaults to true when `extractCSS` is enabled.


## `optimization`

### `runtimeChunk`
- **Type**: `string`
- **Default**: `"single"`


### `minimize`
- **Type**: `boolean`
- **Default**: `true`

> Set minimize to `false` to disable all minimizers. (It is disabled in development by default).


### `minimizer`
- **Type**: `any`
- **Default**: `{}`

> You can set minimizer to a customized array of plugins.


### `splitChunks`

#### `chunks`
- **Type**: `string`
- **Default**: `"all"`


#### `automaticNameDelimiter`
- **Type**: `string`
- **Default**: `"/"`


#### `cacheGroups`
- **Type**: `any`
- **Default**: `{}`


## `postcss`

### `execute`
- **Type**: `undefined`
- **Default**: `undefined`


### `postcssOptions`

#### `config`
- **Type**: `any`
- **Default**: `{}`


#### `plugins`

### `sourceMap`
- **Type**: `undefined`
- **Default**: `undefined`


### `implementation`
- **Type**: `undefined`
- **Default**: `undefined`


### `order`
- **Type**: `string`
- **Default**: `""`


## `devMiddleware`

### `stats`
- **Type**: `string`
- **Default**: `"none"`


## `hotMiddleware`
- **Type**: `WebpackHotMiddlewareMiddlewareOptions & { client?: WebpackHotMiddlewareClientOptions }`
- **Default**: `{}`

> See [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware) for available options.


## `friendlyErrors`
- **Type**: `boolean`
- **Default**: `true`

> Set to `false` to disable the overlay provided by [FriendlyErrorsWebpackPlugin](https://github.com/nuxt/friendly-errors-webpack-plugin).


## `warningIgnoreFilters`
- **Type**: `Array<(warn: WebpackWebpackError) => boolean>`
- **Default**: `[]`

> Filters to hide build warnings.
