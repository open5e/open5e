import { promises } from 'node:fs';
import { c as consola } from './nuxi.70a5067d.mjs';
import { d as dirname } from './nuxi.ffb4843d.mjs';

async function clearDir(path) {
  await promises.rm(path, { recursive: true, force: true });
  await promises.mkdir(path, { recursive: true });
}
async function rmRecursive(paths) {
  await Promise.all(paths.filter((p) => typeof p === "string").map(async (path) => {
    consola.debug("Removing recursive path", path);
    await promises.rm(path, { recursive: true, force: true }).catch(() => {
    });
  }));
}
async function touchFile(path) {
  const time = /* @__PURE__ */ new Date();
  await promises.utimes(path, time, time).catch(() => {
  });
}
function findup(rootDir, fn) {
  let dir = rootDir;
  while (dir !== dirname(dir)) {
    const res = fn(dir);
    if (res) {
      return res;
    }
    dir = dirname(dir);
  }
  return null;
}

export { clearDir as c, findup as f, rmRecursive as r, touchFile as t };
