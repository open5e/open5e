import { promises } from 'node:fs';
import { createApp, eventHandler, toNodeListener, lazyEventHandler } from './index2.mjs';
import { listen } from './index.mjs';
import { w as writeTypes } from '../shared/nuxi.effe3d4b.mjs';
import { l as loadKit } from '../shared/nuxi.050e8c71.mjs';
import { c as clearDir } from '../shared/nuxi.a7f0f387.mjs';
import { o as overrideEnv } from '../shared/nuxi.d21ab543.mjs';
import { d as defineNuxtCommand } from '../shared/nuxi.c68ce99d.mjs';
import { r as resolve, j as join } from '../shared/nuxi.ffb4843d.mjs';
import '../shared/nuxi.817cfca8.mjs';
import '../shared/nuxi.4d4de9c7.mjs';
import 'node:crypto';
import '../shared/nuxi.a685c563.mjs';
import 'node:http';
import 'node:https';
import 'node:util';
import 'node:os';
import '../shared/nuxi.a3b9dacd.mjs';
import 'tty';
import 'node:net';
import 'http';
import 'https';
import 'node:child_process';
import 'node:path';
import '../shared/nuxi.285f10ac.mjs';
import 'node:module';
import 'node:url';
import '../shared/nuxi.70a5067d.mjs';
import '../shared/nuxi.849bcf65.mjs';
import 'util';
import 'path';
import 'fs';
import 'os';

const analyze = defineNuxtCommand({
  meta: {
    name: "analyze",
    usage: "npx nuxi analyze [rootDir]",
    description: "Build nuxt and analyze production bundle (experimental)"
  },
  async invoke(args) {
    overrideEnv("production");
    const rootDir = resolve(args._[0] || ".");
    const statsDir = join(rootDir, ".nuxt/stats");
    const { loadNuxt, buildNuxt } = await loadKit(rootDir);
    const nuxt = await loadNuxt({
      rootDir,
      config: {
        build: {
          analyze: true
        }
      }
    });
    await clearDir(nuxt.options.buildDir);
    await writeTypes(nuxt);
    await buildNuxt(nuxt);
    const app = createApp();
    const serveFile = (filePath) => lazyEventHandler(async () => {
      const contents = await promises.readFile(filePath, "utf-8");
      return eventHandler((event) => {
        event.node.res.end(contents);
      });
    });
    console.warn("Do not deploy analyze results! Use `nuxi build` before deploying.");
    console.info("Starting stats server...");
    app.use("/client", serveFile(join(statsDir, "client.html")));
    app.use("/nitro", serveFile(join(statsDir, "nitro.html")));
    app.use(eventHandler(() => `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <title>Nuxt Bundle Stats (experimental)</title>
    </head>
      <h1>Nuxt Bundle Stats (experimental)</h1>
      <ul>
        <li>
          <a href="/nitro">Nitro server bundle stats</a>
        </li>
        <li>
          <a href="/client">Client bundle stats</a>
        </li>
      </ul>
    </html>
    `));
    await listen(toNodeListener(app));
    return "wait";
  }
});

export { analyze as default };
