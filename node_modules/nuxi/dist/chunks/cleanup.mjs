import { c as cleanupNuxtDirs } from '../shared/nuxi.18154af7.mjs';
import { d as defineNuxtCommand } from '../shared/nuxi.c68ce99d.mjs';
import { r as resolve } from '../shared/nuxi.ffb4843d.mjs';
import 'node:fs';
import '../shared/nuxi.70a5067d.mjs';
import '../shared/nuxi.849bcf65.mjs';
import 'util';
import 'path';
import 'fs';
import 'os';
import 'tty';
import '../shared/nuxi.a7f0f387.mjs';

const cleanup = defineNuxtCommand({
  meta: {
    name: "cleanup",
    usage: "npx nuxi clean|cleanup",
    description: "Cleanup generated nuxt files and caches"
  },
  async invoke(args) {
    const rootDir = resolve(args._[0] || ".");
    await cleanupNuxtDirs(rootDir);
  }
});

export { cleanup as default };
