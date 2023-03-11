import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { f as findup } from './nuxi.a7f0f387.mjs';
import { r as resolve } from './nuxi.ffb4843d.mjs';

const packageManagerLocks = {
  yarn: "yarn.lock",
  npm: "package-lock.json",
  pnpm: "pnpm-lock.yaml"
};
function getPackageManager(rootDir) {
  return findup(rootDir, (dir) => {
    for (const name in packageManagerLocks) {
      const path = packageManagerLocks[name];
      if (path && existsSync(resolve(dir, path))) {
        return name;
      }
    }
  });
}
function getPackageManagerVersion(name) {
  return execSync(`${name} --version`).toString("utf8").trim();
}

export { getPackageManagerVersion as a, getPackageManager as g, packageManagerLocks as p };
