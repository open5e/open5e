import { existsSync, promises } from 'node:fs';
import { c as consola } from '../shared/nuxi.70a5067d.mjs';
import { l as loadKit } from '../shared/nuxi.050e8c71.mjs';
import { u as upperFirst } from '../shared/nuxi.e5ae87db.mjs';
import { d as defineNuxtCommand } from '../shared/nuxi.c68ce99d.mjs';
import { r as resolve, d as dirname } from '../shared/nuxi.ffb4843d.mjs';
import '../shared/nuxi.849bcf65.mjs';
import 'util';
import 'path';
import 'fs';
import 'os';
import 'tty';
import '../shared/nuxi.285f10ac.mjs';
import 'node:module';
import 'node:url';

const httpMethods = ["connect", "delete", "get", "head", "options", "post", "put", "trace", "patch"];
const api = ({ name, args }) => ({
  path: `server/api/${name}${applySuffix(args, httpMethods, "method")}.ts`,
  contents: `
export default defineEventHandler((event) => {
  return 'Hello ${name}'
})
`
});
const plugin = ({ name, args }) => ({
  path: `plugins/${name}${applySuffix(args, ["client", "server"], "mode")}.ts`,
  contents: `
export default defineNuxtPlugin((nuxtApp) => {})
  `
});
const component = ({ name, args }) => ({
  path: `components/${name}${applySuffix(args, ["client", "server"], "mode")}.vue`,
  contents: `
<script lang="ts" setup><\/script>

<template>
  <div>
    Component: ${name}
  </div>
</template>

<style scoped></style>
`
});
const composable = ({ name }) => {
  const nameWithUsePrefix = name.startsWith("use") ? name : `use${upperFirst(name)}`;
  return {
    path: `composables/${name}.ts`,
    contents: `
export const ${nameWithUsePrefix} = () => {
  return ref()
}
  `
  };
};
const middleware = ({ name, args }) => ({
  path: `middleware/${name}${applySuffix(args, ["global"])}.ts`,
  contents: `
export default defineNuxtRouteMiddleware((to, from) => {})
`
});
const layout = ({ name }) => ({
  path: `layouts/${name}.vue`,
  contents: `
<script lang="ts" setup><\/script>

<template>
  <div>
    Layout: ${name}
    <slot />
  </div>
</template>

<style scoped></style>
`
});
const page = ({ name }) => ({
  path: `pages/${name}.vue`,
  contents: `
<script lang="ts" setup><\/script>

<template>
  <div>
    Page: foo
  </div>
</template>

<style scoped></style>
`
});
const templates = {
  api,
  plugin,
  component,
  composable,
  middleware,
  layout,
  page
};
function applySuffix(args, suffixes, unwrapFrom) {
  let suffix = "";
  for (const s of suffixes) {
    if (args[s]) {
      suffix += "." + s;
    }
  }
  if (unwrapFrom && args[unwrapFrom] && suffixes.includes(args[unwrapFrom])) {
    suffix += "." + args[unwrapFrom];
  }
  return suffix;
}

const add = defineNuxtCommand({
  meta: {
    name: "add",
    usage: `npx nuxi add [--cwd] [--force] ${Object.keys(templates).join("|")} <name>`,
    description: "Create a new template file."
  },
  async invoke(args) {
    const cwd = resolve(args.cwd || ".");
    const template = args._[0];
    const name = args._[1];
    if (!templates[template]) {
      consola.error(`Template ${template} is not supported. Possible values: ${Object.keys(templates).join(", ")}`);
      process.exit(1);
    }
    if (!name) {
      consola.error("name argument is missing!");
      process.exit(1);
    }
    const kit = await loadKit(cwd);
    const config = await kit.loadNuxtConfig({ cwd });
    const res = templates[template]({ name, args });
    const path = resolve(config.srcDir, res.path);
    if (!args.force && existsSync(path)) {
      consola.error(`File exists: ${path} . Use --force to override or use a different name.`);
      process.exit(1);
    }
    const parentDir = dirname(path);
    if (!existsSync(parentDir)) {
      consola.info("Creating directory", parentDir);
      if (template === "page") {
        consola.info("This enables vue-router functionality!");
      }
      await promises.mkdir(parentDir, { recursive: true });
    }
    await promises.writeFile(path, res.contents.trim() + "\n");
    consola.info(`\u{1FA84} Generated a new ${template} in ${path}`);
  }
});

export { add as default };
