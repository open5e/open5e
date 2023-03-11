import fs from "fs";
import { createRequire } from "module";
const _require = createRequire(import.meta.url);
const RUNTIME_CLIENT_RUNTIME_PATH = "/@vite-plugin-checker-runtime";
const RUNTIME_CLIENT_ENTRY_PATH = "/@vite-plugin-checker-runtime-entry";
const composePreambleCode = (base = "/", config) => `
import { inject } from "${base}${RUNTIME_CLIENT_RUNTIME_PATH.slice(1)}";
inject({
  overlayConfig: ${JSON.stringify(config)},
  base: "${base}",
});
`;
const WS_CHECKER_ERROR_EVENT = "vite-plugin-checker:error";
const WS_CHECKER_RECONNECT_EVENT = "vite-plugin-checker:reconnect";
const runtimeSourceFilePath = import.meta.url.endsWith(".ts") ? _require.resolve("../@runtime/main.js") : _require.resolve("../../@runtime/main.js");
const runtimeCode = `${fs.readFileSync(runtimeSourceFilePath, "utf-8")};`;
export {
  RUNTIME_CLIENT_ENTRY_PATH,
  RUNTIME_CLIENT_RUNTIME_PATH,
  WS_CHECKER_ERROR_EVENT,
  WS_CHECKER_RECONNECT_EVENT,
  composePreambleCode,
  runtimeCode,
  runtimeSourceFilePath
};
//# sourceMappingURL=index.js.map