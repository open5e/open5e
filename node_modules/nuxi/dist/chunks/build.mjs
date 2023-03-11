import { c as consola } from '../shared/nuxi.70a5067d.mjs';
import { w as writeTypes } from '../shared/nuxi.effe3d4b.mjs';
import { l as loadKit } from '../shared/nuxi.050e8c71.mjs';
import { c as clearDir } from '../shared/nuxi.a7f0f387.mjs';
import { o as overrideEnv } from '../shared/nuxi.d21ab543.mjs';
import { a as showVersions } from '../shared/nuxi.5d0135ea.mjs';
import { d as defineNuxtCommand } from '../shared/nuxi.c68ce99d.mjs';
import { r as resolve, a as relative } from '../shared/nuxi.ffb4843d.mjs';
import '../shared/nuxi.849bcf65.mjs';
import 'util';
import 'path';
import 'fs';
import 'os';
import 'tty';
import 'node:fs';
import '../shared/nuxi.a685c563.mjs';
import '../shared/nuxi.285f10ac.mjs';
import 'node:module';
import 'node:url';
import 'assert';
import '../shared/nuxi.a3b9dacd.mjs';

const buildCommand = defineNuxtCommand({
  meta: {
    name: "build",
    usage: "npx nuxi build [--prerender] [--dotenv] [rootDir]",
    description: "Build nuxt for production deployment"
  },
  async invoke(args) {
    overrideEnv("production");
    const rootDir = resolve(args._[0] || ".");
    showVersions(rootDir);
    const { loadNuxt, buildNuxt, useNitro } = await loadKit(rootDir);
    const nuxt = await loadNuxt({
      rootDir,
      dotenv: {
        cwd: rootDir,
        fileName: args.dotenv
      },
      defaults: {
        experimental: {
          payloadExtraction: args.prerender ? true : void 0
        }
      },
      overrides: {
        _generate: args.prerender
      }
    });
    const nitro = useNitro?.();
    await clearDir(nuxt.options.buildDir);
    await writeTypes(nuxt);
    nuxt.hook("build:error", (err) => {
      consola.error("Nuxt Build Error:", err);
      process.exit(1);
    });
    await buildNuxt(nuxt);
    if (args.prerender) {
      if (!nuxt.options.ssr) {
        consola.warn("HTML content not prerendered because `ssr: false` was set. You can read more in `https://nuxt.com/docs/getting-started/deployment#static-hosting`.");
      }
      const dir = nitro?.options.output.publicDir;
      const publicDir = dir ? relative(process.cwd(), dir) : ".output/public";
      consola.success(`You can now deploy \`${publicDir}\` to any static hosting!`);
    }
  }
});

export { buildCommand as default };
