import { e as execa } from '../shared/nuxi.a8fc08e2.mjs';
import { s as showHelp } from '../shared/nuxi.2135311a.mjs';
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
import '../shared/nuxi.a3b9dacd.mjs';
import 'tty';

const devtools = defineNuxtCommand({
  meta: {
    name: "enable",
    usage: "npx nuxi devtools enable|disable [rootDir]",
    description: "Enable or disable features in a Nuxt project"
  },
  async invoke(args) {
    const [command, _rootDir = "."] = args._;
    const rootDir = resolve(_rootDir);
    if (!["enable", "disable"].includes(command)) {
      console.error(`Unknown command \`${command}\`.`);
      showHelp(this.meta);
      process.exit(1);
    }
    await execa("npx", ["@nuxt/devtools@latest", command, rootDir], { stdio: "inherit", cwd: rootDir });
  }
});

export { devtools as default };
