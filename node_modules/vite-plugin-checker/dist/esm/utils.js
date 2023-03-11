import { isMainThread as _isMainThread, threadId } from "worker_threads";
const isInVitestEntryThread = threadId === 1 && process.env["VITEST"];
const isMainThread = _isMainThread || isInVitestEntryThread;
export {
  isInVitestEntryThread,
  isMainThread
};
//# sourceMappingURL=utils.js.map