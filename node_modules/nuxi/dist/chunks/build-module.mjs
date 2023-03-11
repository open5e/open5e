import { e as execa } from '../shared/nuxi.a8fc08e2.mjs';
import { c as consola } from '../shared/nuxi.70a5067d.mjs';
import { t as tryResolveModule } from '../shared/nuxi.285f10ac.mjs';
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
import 'os';
import 'tty';
import 'node:module';

const MODULE_BUILDER_PKG = "@nuxt/module-builder";
const buildModule = defineNuxtCommand({
  meta: {
    name: "build-module",
    usage: "npx nuxi build-module [--stub] [rootDir]",
    description: `Helper command for using ${MODULE_BUILDER_PKG}`
  },
  async invoke(args) {
    const rootDir = resolve(args._[0] || ".");
    const hasLocal = tryResolveModule(`${MODULE_BUILDER_PKG}/package.json`, rootDir);
    const execArgs = Object.entries({
      "--stub": args.stub
    }).filter(([, value]) => value).map(([key]) => key);
    let cmd = "nuxt-module-build";
    if (!hasLocal) {
      consola.warn(`Cannot find locally installed version of \`${MODULE_BUILDER_PKG}\` (>=0.2.0). Falling back to \`npx ${MODULE_BUILDER_PKG}\``);
      cmd = "npx";
      execArgs.unshift(MODULE_BUILDER_PKG);
    }
    await execa(cmd, execArgs, { preferLocal: true, stdio: "inherit", cwd: rootDir });
  }
});

export { buildModule as default };
