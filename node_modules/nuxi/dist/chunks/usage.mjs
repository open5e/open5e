import { c as cyan } from '../shared/nuxi.a3b9dacd.mjs';
import { s as showHelp } from '../shared/nuxi.2135311a.mjs';
import { d as defineNuxtCommand, c as commands } from '../shared/nuxi.c68ce99d.mjs';
import 'tty';

const usage = defineNuxtCommand({
  meta: {
    name: "help",
    usage: "nuxt help",
    description: "Show help"
  },
  invoke(_args) {
    const sections = [];
    sections.push(`Usage: ${cyan(`npx nuxi ${Object.keys(commands).join("|")} [args]`)}`);
    console.log(sections.join("\n\n") + "\n");
    showHelp({});
  }
});

export { usage as default };
