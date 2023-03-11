import fsExtra from "fs-extra";
import { createRequire } from "module";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { writeFile, access, readFile, rm } from "fs/promises";
const { copy, mkdir } = fsExtra;
const _require = createRequire(import.meta.url);
const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
let proxyApiPath;
let createProgramFunction;
try {
  proxyApiPath = _require.resolve("vue-tsc/out/index");
  createProgramFunction = "createProgram";
} catch (e) {
  proxyApiPath = _require.resolve("vue-tsc/out/proxy");
  createProgramFunction = "createProgramProxy";
}
async function prepareVueTsc() {
  const targetTsDir = path.resolve(_dirname, "typescript-vue-tsc");
  const vueTscFlagFile = path.resolve(targetTsDir, "vue-tsc-resolve-path");
  let shouldBuildFixture = true;
  try {
    await access(targetTsDir);
    const targetTsVersion = _require(path.resolve(targetTsDir, "package.json")).version;
    const currTsVersion = _require("typescript/package.json").version;
    await access(vueTscFlagFile);
    const fixtureFlagContent = await readFile(vueTscFlagFile, "utf8");
    if (targetTsVersion === currTsVersion && fixtureFlagContent === proxyApiPath) {
      shouldBuildFixture = false;
    }
  } catch (e) {
    shouldBuildFixture = true;
  }
  if (shouldBuildFixture) {
    await rm(targetTsDir, { force: true, recursive: true });
    await mkdir(targetTsDir);
    const sourceTsDir = path.resolve(_require.resolve("typescript"), "../..");
    await copy(sourceTsDir, targetTsDir);
    await writeFile(vueTscFlagFile, proxyApiPath);
    await overrideTscJs(_require.resolve(path.resolve(targetTsDir, "lib/tsc.js")));
  }
  return { targetTsDir };
}
async function overrideTscJs(tscJsPath) {
  let result = await readFile(tscJsPath, "utf8");
  const tryReplace = (search, replace) => {
    const before = result;
    result = result.replace(search, replace);
    if (before === result) {
      throw "Search string not found: " + JSON.stringify(search.toString());
    }
  };
  tryReplace(/supportedTSExtensions = .*(?=;)/, (s) => s + '.concat([[".vue"]])');
  tryReplace(/supportedJSExtensions = .*(?=;)/, (s) => s + '.concat([[".vue"]])');
  tryReplace(/allSupportedExtensions = .*(?=;)/, (s) => s + '.concat([[".vue"]])');
  tryReplace(
    /function createProgram\(.+\) {/,
    (s) => s + ` return require(${JSON.stringify(proxyApiPath)}).${createProgramFunction}(...arguments);`
  );
  tryReplace(`ts.executeCommandLine(ts.sys, ts.noop, ts.sys.args);`, `module.exports = ts`);
  await writeFile(tscJsPath, result);
}
export {
  prepareVueTsc
};
//# sourceMappingURL=prepareVueTsc.js.map