import { eventHandler, getMethod, isError, createError, getRequestHeader, setResponseHeader, readRawBody, readBody, createApp, toNodeListener } from 'h3';
import { n as normalizeBaseKey, a as normalizeKey, s as stringify } from './shared/unstorage.c2211058.mjs';

const MethodToTypeMap = {
  GET: "read",
  HEAD: "read",
  PUT: "write",
  DELETE: "write"
};
function createH3StorageHandler(storage, opts = {}) {
  return eventHandler(async (event) => {
    const method = getMethod(event);
    const _path = opts.resolvePath?.(event) ?? event.path;
    const isBaseKey = _path.endsWith(":") || _path.endsWith("/");
    const key = isBaseKey ? normalizeBaseKey(_path) : normalizeKey(_path);
    try {
      await opts.authorize?.({
        type: MethodToTypeMap[method],
        event,
        key
      });
    } catch (error) {
      const _httpError = isError(error) ? error : createError({
        statusMessage: error.message,
        statusCode: 401,
        ...error
      });
      throw _httpError;
    }
    if (method === "GET") {
      if (isBaseKey) {
        const keys = await storage.getKeys(key);
        return keys.map((key2) => key2.replace(/:/g, "/"));
      }
      const isRaw = getRequestHeader(event, "accept") === "application/octet-stream";
      if (isRaw) {
        const value = await storage.getItemRaw(key);
        return value;
      } else {
        const value = await storage.getItem(key);
        return stringify(value);
      }
    }
    if (method === "HEAD") {
      const _hasItem = await storage.hasItem(key);
      event.node.res.statusCode = _hasItem ? 200 : 404;
      if (_hasItem) {
        const meta = await storage.getMeta(key);
        if (meta.mtime) {
          setResponseHeader(
            event,
            "last-modified",
            new Date(meta.mtime).toUTCString()
          );
        }
      }
      return "";
    }
    if (method === "PUT") {
      const isRaw = getRequestHeader(event, "content-type") === "application/octet-stream";
      if (isRaw) {
        const value = await readRawBody(event);
        await storage.setItemRaw(key, value);
      } else {
        const value = await readBody(event);
        await storage.setItem(key, value);
      }
      return "OK";
    }
    if (method === "DELETE") {
      await (isBaseKey ? storage.clear(key) : storage.removeItem(key));
      return "OK";
    }
    throw createError({
      statusCode: 405,
      statusMessage: `Method Not Allowed: ${method}`
    });
  });
}
function createStorageServer(storage, options = {}) {
  const app = createApp();
  const handler = createH3StorageHandler(storage, options);
  app.use(handler);
  return {
    handle: toNodeListener(app)
  };
}

export { createH3StorageHandler, createStorageServer };
