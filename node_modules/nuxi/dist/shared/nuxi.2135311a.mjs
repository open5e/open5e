import { m as magenta, c as cyan } from './nuxi.a3b9dacd.mjs';

function showHelp(meta) {
  const sections = [];
  if (meta) {
    if (meta.usage) {
      sections.push(magenta("> ") + "Usage: " + cyan(meta.usage));
    }
    if (meta.description) {
      sections.push(magenta("\u22EE ") + meta.description);
    }
  }
  sections.push(`Use ${cyan("npx nuxi [command] --help")} to see help for each command`);
  console.log(sections.join("\n\n") + "\n");
}

export { showHelp as s };
