import { buildNuxt } from '@nuxt/kit';
import { c as consola } from '../shared/nuxi.70a5067d.mjs';
import { c as clearDir } from '../shared/nuxi.a7f0f387.mjs';
import { l as loadKit } from '../shared/nuxi.050e8c71.mjs';
import { w as writeTypes } from '../shared/nuxi.effe3d4b.mjs';
import { d as defineNuxtCommand } from '../shared/nuxi.c68ce99d.mjs';
import { r as resolve, a as relative } from '../shared/nuxi.ffb4843d.mjs';
import '../shared/nuxi.849bcf65.mjs';
import 'util';
import 'path';
import 'fs';
import 'os';
import 'tty';
import 'node:fs';
import '../shared/nuxi.285f10ac.mjs';
import 'node:module';
import 'node:url';
import '../shared/nuxi.a685c563.mjs';

const prepare = defineNuxtCommand({
  meta: {
    name: "prepare",
    usage: "npx nuxi prepare",
    description: "Prepare nuxt for development/build"
  },
  async invoke(args) {
    process.env.NODE_ENV = process.env.NODE_ENV || "production";
    const rootDir = resolve(args._[0] || ".");
    const { loadNuxt } = await loadKit(rootDir);
    const nuxt = await loadNuxt({ rootDir, config: { _prepare: true } });
    await clearDir(nuxt.options.buildDir);
    await buildNuxt(nuxt);
    await writeTypes(nuxt);
    consola.success("Types generated in", relative(process.cwd(), nuxt.options.buildDir));
  }
});

export { prepare as default };
