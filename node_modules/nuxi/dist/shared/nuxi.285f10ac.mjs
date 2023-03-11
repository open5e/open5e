import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { n as normalize, d as dirname } from './nuxi.ffb4843d.mjs';

function getModulePaths(paths) {
  return [].concat(
    // @ts-expect-error global object
    global.__NUXT_PREPATHS__,
    paths,
    process.cwd(),
    // @ts-expect-error global object
    global.__NUXT_PATHS__
  ).filter(Boolean);
}
const _require = createRequire(process.cwd());
function resolveModule(id, paths) {
  return normalize(_require.resolve(id, { paths: getModulePaths(paths) }));
}
function tryResolveModule(id, paths) {
  try {
    return resolveModule(id, paths);
  } catch {
    return null;
  }
}
function requireModule(id, paths) {
  return _require(resolveModule(id, paths));
}
function tryRequireModule(id, paths) {
  try {
    return requireModule(id, paths);
  } catch {
    return null;
  }
}
function importModule(id, paths) {
  const resolvedPath = resolveModule(id, paths);
  return import(pathToFileURL(resolvedPath).href);
}
function getNearestPackage(id, paths) {
  while (dirname(id) !== id) {
    try {
      return requireModule(id + "/package.json", paths);
    } catch {
    }
    id = dirname(id);
  }
  return null;
}

export { tryRequireModule as a, getNearestPackage as b, getModulePaths as g, importModule as i, tryResolveModule as t };
