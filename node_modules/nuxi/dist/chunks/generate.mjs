import buildCommand from './build.mjs';
import { d as defineNuxtCommand } from '../shared/nuxi.c68ce99d.mjs';
import '../shared/nuxi.70a5067d.mjs';
import '../shared/nuxi.849bcf65.mjs';
import 'util';
import 'path';
import 'fs';
import 'os';
import 'tty';
import '../shared/nuxi.effe3d4b.mjs';
import 'node:fs';
import '../shared/nuxi.a685c563.mjs';
import '../shared/nuxi.285f10ac.mjs';
import 'node:module';
import 'node:url';
import '../shared/nuxi.ffb4843d.mjs';
import '../shared/nuxi.050e8c71.mjs';
import '../shared/nuxi.a7f0f387.mjs';
import '../shared/nuxi.d21ab543.mjs';
import '../shared/nuxi.5d0135ea.mjs';
import 'assert';
import '../shared/nuxi.a3b9dacd.mjs';

const generate = defineNuxtCommand({
  meta: {
    name: "generate",
    usage: "npx nuxi generate [rootDir] [--dotenv]",
    description: "Build Nuxt and prerender static routes"
  },
  async invoke(args) {
    args.prerender = true;
    await buildCommand.invoke(args);
  }
});

export { generate as default };
