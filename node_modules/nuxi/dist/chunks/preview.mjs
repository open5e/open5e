import { existsSync, promises } from 'node:fs';
import { dirname, relative } from 'node:path';
import { e as execa } from '../shared/nuxi.a8fc08e2.mjs';
import { s as setupDotenv } from '../shared/nuxi.cb8e73b6.mjs';
import { c as consola } from '../shared/nuxi.70a5067d.mjs';
import { d as defineNuxtCommand } from '../shared/nuxi.c68ce99d.mjs';
import { r as resolve } from '../shared/nuxi.ffb4843d.mjs';
import 'node:buffer';
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
import 'node:fs/promises';
import 'crypto';
import 'module';
import 'perf_hooks';
import 'vm';
import 'url';
import 'process';
import 'v8';
import 'tty';

const preview = defineNuxtCommand({
  meta: {
    name: "preview",
    usage: "npx nuxi preview|start [--dotenv] [rootDir]",
    description: "Launches nitro server for local testing after `nuxi build`."
  },
  async invoke(args) {
    process.env.NODE_ENV = process.env.NODE_ENV || "production";
    const rootDir = resolve(args._[0] || ".");
    const nitroJSONPaths = [".output/nitro.json", "nitro.json"].map((p) => resolve(rootDir, p));
    const nitroJSONPath = nitroJSONPaths.find((p) => existsSync(p));
    if (!nitroJSONPath) {
      consola.error("Cannot find `nitro.json`. Did you run `nuxi build` first? Search path:\n", nitroJSONPaths);
      process.exit(1);
    }
    const outputPath = dirname(nitroJSONPath);
    const nitroJSON = JSON.parse(await promises.readFile(nitroJSONPath, "utf-8"));
    consola.info("Node.js version:", process.versions.node);
    consola.info("Preset:", nitroJSON.preset);
    consola.info("Working dir:", relative(process.cwd(), outputPath));
    if (!nitroJSON.commands.preview) {
      consola.error("Preview is not supported for this build.");
      process.exit(1);
    }
    const envExists = args.dotenv ? existsSync(resolve(rootDir, args.dotenv)) : existsSync(rootDir);
    if (envExists) {
      consola.info("Loading `.env`. This will not be loaded when running the server in production.");
      await setupDotenv({ cwd: rootDir, fileName: args.dotenv });
    }
    consola.info("Starting preview command:", nitroJSON.commands.preview);
    const [command, ...commandArgs] = nitroJSON.commands.preview.split(" ");
    consola.log("");
    await execa(command, commandArgs, { stdio: "inherit", cwd: outputPath });
  }
});

export { preview as default };
