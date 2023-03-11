import { e as execa } from '../shared/nuxi.a8fc08e2.mjs';
import { t as tryResolveModule } from '../shared/nuxi.285f10ac.mjs';
import { l as loadKit } from '../shared/nuxi.050e8c71.mjs';
import { w as writeTypes } from '../shared/nuxi.effe3d4b.mjs';
import { d as defineNuxtCommand } from '../shared/nuxi.c68ce99d.mjs';
import { r as resolve } from '../shared/nuxi.ffb4843d.mjs';
import 'node:buffer';
import 'node:path';
import 'node:child_process';
import 'node:process';
import '../shared/nuxi.f1d29136.mjs';
import 'child_process';
import 'path';
import '../shared/nuxi.849bcf65.mjs';
import 'fs';
import 'assert';
import 'events';
import 'buffer';
import 'stream';
import 'util';
import 'node:url';
import 'node:os';
import 'node:module';
import 'node:fs';
import '../shared/nuxi.a685c563.mjs';

const typecheck = defineNuxtCommand({
  meta: {
    name: "typecheck",
    usage: "npx nuxi typecheck [rootDir]",
    description: "Runs `vue-tsc` to check types throughout your app."
  },
  async invoke(args) {
    process.env.NODE_ENV = process.env.NODE_ENV || "production";
    const rootDir = resolve(args._[0] || ".");
    const { loadNuxt, buildNuxt } = await loadKit(rootDir);
    const nuxt = await loadNuxt({ rootDir, config: { _prepare: true } });
    await writeTypes(nuxt);
    await buildNuxt(nuxt);
    await nuxt.close();
    const hasLocalInstall = tryResolveModule("typescript", rootDir) && tryResolveModule("vue-tsc/package.json", rootDir);
    if (hasLocalInstall) {
      await execa("vue-tsc", ["--noEmit"], { preferLocal: true, stdio: "inherit", cwd: rootDir });
    } else {
      await execa("npx", "-p vue-tsc -p typescript vue-tsc --noEmit".split(" "), { stdio: "inherit", cwd: rootDir });
    }
  }
});

export { typecheck as default };
